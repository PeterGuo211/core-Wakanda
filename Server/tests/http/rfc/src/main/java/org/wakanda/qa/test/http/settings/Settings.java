package org.wakanda.qa.test.http.settings;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.GregorianCalendar;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.http.HttpHeaders;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.wakanda.qa.commons.server.Util;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Settings {


	public static PropertiesConfiguration getSettings() {
		return Util.getPropertiesConfiguration(Settings.class,
				"settings.properties");
	}

	public static PropertiesConfiguration getEntitiesSettings() {
		return Util.getPropertiesConfiguration(Settings.class,
				"entities/entities.properties");
	}

	private static String getAbsolutePath(String relativePath) {
		try {
			URL url = Settings.class.getResource(relativePath);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getSolutionPath() {
		return getAbsolutePath(getSettings().getString("solution"));
	}

	public static String getDefaultProjectWebFolderPath() {
		return getAbsolutePath(getSettings().getString("project1WebFolder"));
	}

	public static int getMultiHostPort() {
		return Integer.parseInt(getSettings().getString("multiHostPort"));
	}

	public static String getDefaultConnectionToken() {
		return getSettings().getString("connection");
	}

	public static String[] getSupportedMethods() {
		return new String[] { "GET", "HEAD", "TRACE" };

	}

	public static String[] getSupportedContentCoding() {
		return new String[] { "gzip", "deflate", "identity", "x-gzip" };
	}

	public static HttpPost getDefaultPostRequest()
			throws ClientProtocolException, IOException {
		HttpPost request = new HttpPost("/rpc/");
		request.addHeader(HttpHeaders.CONTENT_TYPE,
				"application/json-rpc; charset=utf-8");
		long id = GregorianCalendar.getInstance().getTimeInMillis();
		String body = "{\"jsonrpc\":\"2.0\",\"id\":" + id
				+ ",\"method\":\"getCatalog\",\"params\":[[]]}";
		StringEntity entity = new StringEntity(body);
		request.setEntity(entity);
		return request;
	}

	private static String getOrCreateFolderInSolutionWebFolder(String folderName) {
		String folderPath = getDefaultProjectWebFolderPath() + "/" + folderName;
		File folder = new File(folderPath);
		if (!folder.exists())
			folder.mkdir();

		return folderPath;
	}

	public static String getMediaTypeFolder() {
		return getOrCreateFolderInSolutionWebFolder("mediaType");
	}

	public static String getCharsetFolder() {
		return getOrCreateFolderInSolutionWebFolder("charsets");
	}

	public static String getCacheFolder() {
		return getOrCreateFolderInSolutionWebFolder("cache");
	}

}
