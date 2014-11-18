package org.wakanda.qa.test.http.messages;

import static junitparams.JUnitParamsRunner.$;
import static org.junit.Assert.assertTrue;
import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.ProtocolVersion;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.Utils;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * This class manages all tests related with the HTTP version parameter.
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class HttpVersionTest extends AbstractTestCase {
	
	/**
	 * <b>Implements:</b> HttpVersion01
	 * <p/>
	 * Check that server ignores leading zeros in the request HTTP Version.
	 * <p/>
	 * </b>Reference:</b> SPEC689 (RFC2616) 3.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testServerIgnoresLeadingsZerosInHttpVersion(String major, String minor) throws Exception {
		String request = "GET / HTTP/" + major + "." + minor + CRLF 
					+ "Host:" + getDefaultHostHeaderValue() + CRLF 
					+ CRLF;
		
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		
		HttpVersion exVersion = HttpVersion.HTTP_1_1;
		ProtocolVersion acVersion = response.getOriginalResponse().getStatusLine()
				.getProtocolVersion();
		
		assertTrue("Leading zeros of HTTP version parameter are not ignored.", acVersion.equals(exVersion));

	}
	@SuppressWarnings("unused")
	private Object[] parametersForTestServerIgnoresLeadingsZerosInHttpVersion() {
		return $($("1", "0001"), 
				$("0001", "1")
				);
	}

	/**
	 * <b>Implements:</b> HttpVersion02
	 * <p/>
	 * Check that the server doesn't support HTTP version different from 1.0 and
	 * 1.1
	 * </p>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testHttpVersionGreaterLowerThan_1_1_AreNotSupported(String version)throws Exception {
		String request = "GET / HTTP/" + version + CRLF
				+ "host:" + getSettings().getDefaultTarget().toHostString() + Utils.CRLF + HttpHeaders.CONNECTION + ":"
				+ Settings.getDefaultConnectionToken() + Utils.CRLF + HttpHeaders.USER_AGENT + ":"
				+ getSettings().getUserAgent() + Utils.CRLF	+ CRLF
				+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_HTTP_VERSION_NOT_SUPPORTED, response);
	}
	@SuppressWarnings("unused")
	private Object[] parametersForTestHttpVersionGreaterLowerThan_1_1_AreNotSupported() {
		return $($("1.2"), 
				$("0.999")
				);
	}

	/**
	 * <b>Implements:</b> HttpVersion03
	 * <p/>
	 * Check that Host header is mandatory for 1.1 version
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 14.23
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHostHeaderIsMandatoryIn_1_1_HttpVersion() throws Exception {
		String request = "GET / HTTP/1.1" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> HttpVersion04
	 * <p/>
	 * Check that server should accept and response to a
	 * request in 1.1 version, with the same HTTP version
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void test_1_1_HttpVersionIsSupportedVersionReturnsAResponseIn_1_1_Version()
			throws Exception {
		HttpVersion version = HttpVersion.HTTP_1_1;

		HttpParams params = new SyncBasicHttpParams();
		HttpProtocolParams.setVersion(params, version);

		HttpGet request = new HttpGet("/");
		request.setParams(params);

		HttpResponse response = executeRequest(request);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEqualsProtocolVersion(HttpVersion.HTTP_1_1, response);
	}

	/**
	 * <b>Implements:</b> HttpVersion05
	 * <p/>
	 * Check that server support HTTP version 1.0
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 19.6
	 * 
	 * @throws Exception
	 */
	@Test
	public void test_1_0_HttpVersionAreSupportedVersionReturnsAResponseIn_1_0_Version()	throws Exception {
		HttpVersion version = HttpVersion.HTTP_1_0;

		HttpParams params = new SyncBasicHttpParams();
		HttpProtocolParams.setVersion(params, version);

		HttpGet request = new HttpGet("/");
		request.setParams(params);

		HttpResponse response = executeRequest(request);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEqualsProtocolVersion(HttpVersion.HTTP_1_1, response);
	}

	/**
	 * <b>Implements:</b> HttpVersion06
	 * <p/>
	 * Check that Host header is optional in 1.0 version
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 19.6
	 * 
	 * @throws Exception
	 */

	@Test
	public void testHostHeaderIsOptionalIn_1_0_HttpVersion() throws Exception {
		String request = "GET / HTTP/1.0" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

}
