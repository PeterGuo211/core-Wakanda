package org.wakanda.qa.test.http;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.lang3.SystemUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.wakanda.qa.test.http.settings.Configuration;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * @author Ouissam
 * 
 */
public class MediaTypeUtil{

	//private static Logger logger = Logger.getLogger(MediaType.class);
	
	//private static IHttpSettings settings = Configuration.getInstance().getHttpSettings();

	final static char[] MULTIPART_CHARS = "-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			.toCharArray();

	public static void main(String[] args) throws Exception {
		new MediaTypeUtil().getMimeTypesXMLFilePath();
	}


	/**
	 * Returns a map of supported extensions with their corresponding media
	 * types.
	 * 
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> getMediaTypeMap() throws Exception {

		File mimeTypesFile = new File(getMimeTypesXMLFilePath());

		Map<String, String> map = new HashMap<String, String>();
		if (mimeTypesFile.exists()) {
			// Create a factory
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			// Use the factory to create a builder
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(mimeTypesFile);
			// Get a list of all elements in the document
			NodeList list = doc.getElementsByTagName("*");

			for (int i = 2; i < list.getLength(); i++) {
				Element element = (Element) list.item(i);

				String contentType = element.getAttribute("contentType");
				String[] extensions = element.getAttribute("extensions").split(
						"\\s*;\\s*");
				for (int y = 0; y < extensions.length; y++) {
					String ext = extensions[y];
					if (!ext.equals("")){
						String contentTypes_  = map.get(ext);
						String contentTypes = contentTypes_ == null ? contentType : contentTypes_ + ";" + contentType;
						map.put(extensions[y], contentTypes);
					}
				}
			}

		} else {
			String message = "MediaType mapping file not found: "
					+ mimeTypesFile.getCanonicalPath();
			throw new Exception(message);
		}
		return map;

	}

	/**
	 * Sets all resources corresponding with different extensions in the web
	 * folder of the solution.
	 * 
	 * @throws Exception
	 */
	public void setMediaTypeResources() throws Exception {

		for (Entry<String, String> entry : getMediaTypeMap().entrySet()) {
			String extension = entry.getKey();
			// String contentType = entry.getValue();
			String filePath = Settings.getMediaTypeFolder() + "/file."
					+ extension;
			File file = new File(filePath);
			if (!file.exists()) {
				file.createNewFile();
				//logger.debug("Created: " + filePath);
			}
		}

	}

	/**
	 * Remove all resources corresponding with different extensions in the web
	 * folder of the solution.
	 * 
	 * @throws Exception
	 */
	public void removeMediaTypeResources() throws Exception {
		for (Entry<String, String> entry : getMediaTypeMap().entrySet()) {
			String extension = entry.getKey();
			// String contentType = entry.getValue();
			String filePath = Settings.getMediaTypeFolder() + "/file."
					+ extension;
			File file = new File(filePath);
			if (file.exists()) {
				file.delete();
				//logger.debug("Removed: " + filePath);
			}
		}

	}

	private String getMimeTypesXMLFilePath() throws IOException{
		String path;
		String serverDirPath;
		String serverPath = Configuration.getInstance().getServerAdminSettings().getServerPath();
		if (serverPath != null) {
			// When Jenkins environement
			// Calculate the path to the server directory depending on the OS.
			if (SystemUtils.IS_OS_MAC) {
				serverDirPath = serverPath + "/../..";
			} else {
				serverDirPath = serverPath + "/..";
			}
			// When Mac or Linux Replace [\\ ] by [ ]
			if (SystemUtils.IS_OS_MAC || SystemUtils.IS_OS_LINUX) {
				serverDirPath = serverDirPath.replace("\\ ", " ");
			}
		} else {
			// otherwise use the server located within the project directory
			serverDirPath = System.getProperty("user.dir")
					+ "/Wakanda Server";
			if (SystemUtils.IS_OS_MAC)
				serverDirPath += ".app";
		}

		String relatPathFromServerDir = Settings.getEntitiesSettings()
		.getString("mimeTypes0");
		path = serverDirPath + "/" + relatPathFromServerDir;

		File tmp = new File(path);
		String cpath = tmp.getCanonicalPath();
		tmp = new File(cpath);
		
		// if the file is not found using server location.
		if (!tmp.exists()) {
			// then get the file from the local perforce workspace
			path = Settings.getEntitiesSettings().getString("mimeTypes1");
			tmp = new File(path);
		}

		File canonicalfile = tmp.getCanonicalFile();

		// logger.debug("Calculated path to MediaTypes.xml : " + canonicalfile);
		// + (canonicalfile.exists() ? " exists" : " does not exist"));
		return canonicalfile.getCanonicalPath();
	}

}
