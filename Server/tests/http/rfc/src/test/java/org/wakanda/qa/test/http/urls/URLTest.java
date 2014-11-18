package org.wakanda.qa.test.http.urls;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.net.URI;
import java.util.BitSet;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.WWWFormURLEncoder;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * This class manages all test cases related with the URL.
 * 
 * @author Ouissam
 * 
 */
public class URLTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> URL01
	 * <p/>
	 * Check that server can handle an URL greater than 4Ko
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (Yannick) 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerHandlesURLGreaterThan4ko() throws Exception {
		String url = "/echoURL/?param="
				+ RandomStringUtils.random(4097, 32, 127, true, true);
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request, false);
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEquals(url, content);

	}

	/**
	 * <b>Implements:</b> URL02
	 * <p/>
	 * Check that server is case insensitive when dealing with URIs.
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (Yannick) 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatURLIsCaseInsensitive() throws Exception {

		String url = "simple.html";

		// expected
		String request1 = "GET " + url + " HTTP/1.1" + CRLF + "Host:"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		HttpSimpleBufferedResponse response1 = executeRawRequest(request1);
		int exSC = response1.getStatusCode();
		byte[] exContent = EntityUtils.toByteArray(response1.getEntity());

		// actual
		String request2 = "GET " + url.toUpperCase() + " HTTP/1.1" + CRLF
				+ "Host:" + getDefaultHostHeaderValue() + CRLF + CRLF;
		HttpSimpleBufferedResponse response2 = executeRawRequest(request2);
		int acSC = response2.getStatusCode();
		byte[] acContent = EntityUtils.toByteArray(response2.getEntity());

		// check
		assertEquals("URLs should be case-insensitive", exSC, acSC);

		Assert.assertArrayEquals("Response content should be the same",
				exContent, acContent);
	}

	/**
	 * <b>Implements:</b> URL03
	 * <p/>
	 * Check that server can decode and interpret properly a request URI encoded
	 * with "% HEX HEX" of RFC2396
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (RFC2616) 5.1.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatURLEncodedWithRFC2396IsSupported() throws Exception {
		String path = "/ébah& ça# alors@.html";
		String filePath = Settings.getDefaultProjectWebFolderPath() + path;
		File file = new File(filePath);
		String expected = "HEX Encoded URL is supported";
		FileUtils.writeStringToFile(file, expected);
		assertTrue((new File(filePath)).exists());
		try {
			logger.debug("Non encoded: " + path);
			// Encode the URL using RFC2396 encoding
			//String encodedPath = RFC1738URLEncoder.encodePath(path);
			URIBuilder ub = new URIBuilder();
			ub.setPath(path);
			URI uri = ub.build();
			logger.debug("Encoded: " + uri);
			logger.debug("Encoded by firefox: " + "/%C3%A9bah&%20%C3%A7a%23%20alors@.html");

			// Request
			HttpGet request = new HttpGet(uri);

			// Response
			HttpResponse response = executeRequest(request, false);
			// Content
			String actual = EntityUtils.toString(response.getEntity());
			logger.debug(actual);

			assertEquals(
					"Server does not support URL encoded using % HEX HEX encoding",
					HttpStatus.SC_OK, response.getStatusLine().getStatusCode());
			assertEquals(expected, actual);
		} finally {
			file.delete();
		}
	}

	/**
	 * <b>Implements:</b> URL04
	 * <p/>
	 * Check that server can decode and interpret properly a request URI encoded
	 * with "% HEX HEX" of application/x-www-form-urlencoded
	 * <p/>
	 * <b>Reference:</b>
	 * http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatURLEncodedWith_Application_x_www_form_urlencoded_IsSupported()
			throws Exception {

		String qs = "param 1=valeur/1&param@2=valeur{2}&param#3=valeur<3>&param&4=valeur[3]";
		logger.debug("Non encoded: " + qs);

		// Encode the URL using application/x-www-form-urlencoded
		BitSet safe = WWWFormURLEncoder.getDefaultSafeCharacters();
		safe.set('&');
		safe.set('=');
		String encodedQs = WWWFormURLEncoder.encode(qs, safe);
		logger.debug("Encoded: " + encodedQs);

		// Request
		String url = "/echoQueryString/?" + encodedQs;
		HttpGet request = new HttpGet(url);
		logger.debug("URI: " + request.getURI());

		// Response
		HttpResponse response = executeRequest(request, false);

		// Content
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);

		assertEquals(HttpStatus.SC_OK, response.getStatusLine().getStatusCode());

		assertEquals(
				"Server does not support URL encoded using % HEX HEX encoding",
				qs, content);
	}
}
