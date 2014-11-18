package org.wakanda.qa.test.http.extend;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.ProtocolVersion;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.commons.server.settings.IConfiguration;
import org.wakanda.qa.test.http.settings.Configuration;
import org.wakanda.qa.test.http.settings.Settings;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author Ouissam
 * 
 */

public class AbstractTestCase extends org.wakanda.qa.commons.server.ut.AbstractTestCase {

	public static final String CR = "\r";
	public static final String LF = "\n";
	public static final String CRLF = CR + LF;

	protected HttpHost getDefaultTarget() {
		return getSettings().getDefaultTarget();
	}

	protected String getDefaultHostHeaderValue() {
		return getDefaultTarget().toHostString();
	}

	protected String[] getSupportedMethods() {
		return Settings.getSupportedMethods();
	}

	/**
	 * Executes a request to the default target.
	 * 
	 * @param request
	 * @param discardEntity
	 *            when true, discards the response entity and so releases the
	 *            system resources.
	 * @return
	 * @throws Exception
	 */
	@Override
	protected HttpResponse executeRequest(HttpRequest request,
			boolean discardEntity) throws Exception {
		return executeRequest(request, getDefaultTarget(), discardEntity);
	}

	/**
	 * Executes a request to the default target and discards the response entity
	 * in order to release system resources.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@Override
	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		return executeRequest(request, true);
	}

	/**
	 * Executes a raw request to the default target
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpSimpleBufferedResponse executeRawRequest(String request) throws Exception {
		return executeRawRequest(getDefaultTarget(), request);
	}

	/**
	 * Executes an authenticated request to the default target using the admin user.
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeAuthenticated(HttpRequest request)
			throws Exception {
		return getRequestor().executeAuthenticated(request, new UsernamePasswordCredentials("admin", "") );
	}
	
	protected void assertEqualsReasonPhrase(String expectedReasonPhrase,
			HttpResponse response) {
		String actualReasonPhrase = response.getStatusLine().getReasonPhrase();
		assertEquals("Wrong Reason Phrase", expectedReasonPhrase,
				actualReasonPhrase);
	}
	
	protected void assertEqualsReasonPhrase(String expectedReasonPhrase,
			HttpSimpleBufferedResponse response) {
		String actualReasonPhrase = response.getStatusLine().getReasonPhrase();
		assertEquals("Wrong Reason Phrase", expectedReasonPhrase,
				actualReasonPhrase);
	}

	protected void assertEqualsProtocolVersion(
			ProtocolVersion expectedProtocolVersion, HttpResponse response) {
		ProtocolVersion actualProtocolVersion = response.getProtocolVersion();
		assertEquals("Wrong Protocol Version", expectedProtocolVersion,
				actualProtocolVersion);
	}

	@Override
	protected IConfiguration getConfiguration() {
		return Configuration.getInstance();
	}


}