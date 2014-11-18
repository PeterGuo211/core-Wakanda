package org.wakanda.qa.test.http.messages;

import static junitparams.JUnitParamsRunner.$;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assume.assumeNotNull;
import static org.junit.Assume.assumeThat;
import static org.junit.Assume.assumeTrue;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.cookie.DateUtils;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * This class manages all test cases related with headers.
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class HeaderTest extends AbstractTestCase {

	
	/**
	 * <b>Implements:</b> Headers01
	 * <p/>
	 * Check that server correctly parses a request header field.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testHeaderFieldsFormat(String header) throws Exception {
		String request = "GET / HTTP/1.1" + CRLF + HttpHeaders.HOST + ":"
				+ getDefaultHostHeaderValue() + CRLF + header + CRLF + CRLF;

		HttpSimpleBufferedResponse response = executeRawRequest(request);
		// The server must respond with 200 OK
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		Header cnxHeader = response.getOriginalResponse().getFirstHeader(HTTP.CONN_DIRECTIVE);
		// The server should not interpret the header sent so either the
		// connection header is not sent or its value equals Keep-Alive
		// otherwise it will send Close token instead.
		if (cnxHeader == null) {
			return;
		} else {
			String actual = cnxHeader.getValue();
			String expected = HTTP.CONN_KEEP_ALIVE;
			assertTrue("Server does not respect the header fields format",
					actual.equalsIgnoreCase(expected));
		}

	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestHeaderFieldsFormat() {
		// list of bad "Connection" header fields
		return $($(HTTP.CONN_DIRECTIVE + ":"), $(HTTP.CONN_CLOSE + ":"
				+ HTTP.CONN_DIRECTIVE), $(HTTP.CONN_DIRECTIVE + " "
				+ HTTP.CONN_CLOSE), $(HTTP.CONN_DIRECTIVE + ":" + CRLF
				+ HTTP.CONN_CLOSE));
	}

	/**
	 * <b>Implements:</b> Headers02
	 * <p/>
	 * Check that server ignores any amount of LWS before a header field value.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testServerIgnoresLWSBeforeHeaderValue(String headerFieldValue)
			throws Exception {
		// request
		String request = "GET / HTTP/1.1" + CRLF + HttpHeaders.HOST + ":"
				+ getDefaultHostHeaderValue() + CRLF + HTTP.CONN_DIRECTIVE
				+ ":" + headerFieldValue + CRLF + CRLF;
		// response
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		Header cnxHeader = response.getOriginalResponse().getFirstHeader(HTTP.CONN_DIRECTIVE);
		assertNotNull(cnxHeader);
		String expected = HTTP.CONN_CLOSE;
		String actual = cnxHeader.getValue();
		assertTrue("Server should ignore any LWS before header value",
				actual.equalsIgnoreCase(expected));

	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestServerIgnoresLWSBeforeHeaderValue() {
		// list of well formated Connection header values
		return $($(" " + HTTP.CONN_CLOSE), $("\t" + HTTP.CONN_CLOSE), $(CRLF
				+ " " + HTTP.CONN_CLOSE), $(CRLF + "\t" + HTTP.CONN_CLOSE));
	}
	
	/**
	 * <b>Implements:</b> Headers04
	 * <p/>
	 * Check that server combines the multiple header fields into one
	 * "field-name: field-value" pair.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatMultipleHeaderFieldsAreCombinedIntoOneHeaderFieldsPair()
			throws Exception {
		String aeName = HttpHeaders.ACCEPT_ENCODING;
		String ceName = HttpHeaders.CONTENT_ENCODING;

		Header header1 = new BasicHeader(aeName, "deflate;q=0.1");
		Header header2 = new BasicHeader(aeName, "gzip;q=0.5");
		Header header3 = new BasicHeader(aeName, "identity;q=0");

		String url = "/tocompress.html";
		HttpGet request = new HttpGet(url);
		request.addHeader(header1);
		request.addHeader(header2);
		request.addHeader(header3);

		HttpResponse response = executeRequest(request);
		HttpEntity entity = response.getEntity();

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertNotNull("Response should have content", entity);

		Header ceHeader = entity.getContentEncoding();
		assertNotNull("\"" + ceName + "\" header is missing", ceHeader);

		String expected = "gzip";
		String actual = ceHeader.getValue();
		assertEquals("wrong \"" + ceName + "\" header value", expected, actual);
	}

	/**
	 * <b>Implements:</b> Headers03
	 * <p/>
	 * Check that Header fields could be extended over multiple lines preceded
	 * by at least one space or horizontal-tab.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHeaderValueCouldBeExtendedOverMultipleLine()
			throws Exception {

		// Request with the "Accept-Encoding" header field in one line.
		String request0 = "GET /tocompress.html HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.ACCEPT_ENCODING
				+ ": deflate;q=0.5,identity;q=0.1,gzip" + CRLF + CRLF;
		HttpSimpleBufferedResponse response0 = executeRawRequest(request0);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response0);

		// Request with the "Accept-Encoding" header field extended over 2 lines
		// by preceding the second line with an HT, in this case the server is
		// supposed to return gzip.
		String request1 = "GET /tocompress.html HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.ACCEPT_ENCODING + ": deflate;q=0.5," + CRLF
				+ " identity;q=0.1," + CRLF + " gzip" + CRLF + CRLF;
		HttpSimpleBufferedResponse response1 = executeRawRequest(request1);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response1);

		// Check the content encoding
		Header cd0 = response0.getEntity().getContentEncoding();
		Header cd1 = response1.getEntity().getContentEncoding();

		assertNotNull("Content-Encoding should not be null (identity)", cd0);
		assertNotNull("Content-Encoding should not be null (identity)", cd1);

		String expected = "gzip";
		assertEquals("Wrong Content-Encoding", expected, cd0.getValue());
		assertEquals("Wrong Content-Encoding", expected, cd1.getValue());
	}

	

	/**
	 * <b>Implements:</b> Headers05
	 * <p/>
	 * Check that "Connection" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatConnectionHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		String request00 = "GET / HTTP/1.1" + CRLF + HttpHeaders.HOST + ":"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		HttpSimpleBufferedResponse response00 = executeRawRequest(request00);
		int actualsc = response00.getStatusCode();
		assumeThat(actualsc, is(HttpStatus.SC_OK));
		Header cnxHeader = response00.getOriginalResponse().getFirstHeader(HTTP.CONN_DIRECTIVE);
		if (cnxHeader != null) {
			String actualCnxVal = cnxHeader.getValue();
			String expectedCnxVal = HTTP.CONN_KEEP_ALIVE;
			assumeTrue(actualCnxVal.equalsIgnoreCase(expectedCnxVal));
		}

		// check now the case-sensitivity
		String headerName = "cOnNeCtIoN";
		String expected = HTTP.CONN_CLOSE;
		HttpGet request01 = new HttpGet("/");
		request01.addHeader(headerName, expected);

		HttpResponse response01 = executeRequest(request01);
		assertEqualsStatusCode(HttpStatus.SC_OK, response01);

		cnxHeader = response01.getFirstHeader(HTTP.CONN_DIRECTIVE);
		assertNotNull(cnxHeader);
		String actual = cnxHeader.getValue();
		assertTrue("Headers value must be case insensitive",
				actual.equalsIgnoreCase(expected));
	}

	/**
	 * <b>Implements:</b> Headers06
	 * <p/>
	 * Check that "Accept" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatAcceptHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// create a file with xml extension
		String filename = "file.html";
		File file = new File(Settings.getMediaTypeFolder() + "/"
				+ filename);
		if (!file.exists()) {
			file.createNewFile();
		}
		// request
		HttpGet request = new HttpGet("/mediaType/" + filename);
		String fieldName = "aCcEpT";
		// Client accepts only text/xml
		request.addHeader(fieldName, "text/xml");

		// response
		HttpResponse response = executeRequest(request);
		// should relay with 406 cause the client does not accept text/html
		// media type.
		assertEqualsStatusCode(HttpStatus.SC_NOT_ACCEPTABLE, response);
	}

	/**
	 * <b>Implements:</b> Headers07
	 * <p/>
	 * Check that "Accept-Charset" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatAcceptCharsetHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		HttpPost request = Settings.getDefaultPostRequest();
		HttpResponse response = executeRequest(request);
		// server should replay with 200 if no header "Accept-Charset" was sent.
		int actual = response.getStatusLine().getStatusCode();
		assumeThat(actual, is(HttpStatus.SC_OK));

		// check now the case-sensitivity
		String headerName = "aCcEpT-cHaRsEt";
		String charset = "Unknown";
		request.addHeader(headerName, charset);
		response = executeRequest(request);
		// server should replay with 406 if it does interpret the
		// "aCcEpT-cHaRsEt" header.
		assertEqualsStatusCode(HttpStatus.SC_NOT_ACCEPTABLE, response);
	}

	/**
	 * <b>Implements:</b> Headers08
	 * <p/>
	 * Check that "Accept-Encoding" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatAcceptEncodingHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		String headerName = HttpHeaders.ACCEPT_ENCODING;
		String headerValue = "gzip";
		HttpGet request0 = new HttpGet("/tocompress.html");
		request0.addHeader(headerName, headerValue);
		HttpResponse response = executeRequest(request0);
		int actual = response.getStatusLine().getStatusCode();
		assumeThat(actual, is(HttpStatus.SC_OK));
		Header ceHeader = response.getEntity().getContentEncoding();
		assumeNotNull(ceHeader);
		assumeThat(headerValue, is(ceHeader.getValue()));

		// check now the case-sensitivity.
		headerName = "aCcEpT-eNcOdInG";
		HttpGet request1 = new HttpGet("/tocompress.html");
		request1 = new HttpGet("/tocompress.html");
		request1.addHeader(headerName, headerValue);
		response = executeRequest(request1);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		ceHeader = response.getEntity().getContentEncoding();
		assertNotNull("Missing \"Content-Encoding\" header", ceHeader);
		assertEquals("Wrong \"Content-Encoding\" header value", headerValue,
				ceHeader.getValue());
	}

	/**
	 * <b>Implements:</b> Headers09
	 * <p/>
	 * Check that "Authorization" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatAuthorizationHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		String user = "testUser";
		String pass = "testPass";
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, pass);
		Header challenge = new BasicHeader(AUTH.WWW_AUTH,
				"Basic realm=\"Basic Realm\"");
		BasicScheme authscheme = new BasicScheme();
		authscheme.processChallenge(challenge);

		HttpRequest request0 = new BasicHttpRequest("GET", "/authBasic/");
		Header authResponse0 = authscheme.authenticate(creds, request0, null);
		request0.addHeader(authResponse0);

		HttpResponse response = executeRequest(request0);
		int actual = response.getStatusLine().getStatusCode();
		assumeThat(actual, is(HttpStatus.SC_OK));

		// check now the case-sensitivity.
		HttpRequest request1 = new BasicHttpRequest("GET", "/authBasic/");
		String headerName = "aUtHoRiZaTiOn";
		BasicHeader authResponse1 = new BasicHeader(headerName,
				authResponse0.getValue());
		request1.addHeader(authResponse1);
		response = executeRequest(request1);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

	/**
	 * <b>Implements:</b> Headers10
	 * <p/>
	 * Check that "Content-Length" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */

	@Override
	protected Map<String, Long> getUnitTestsTimeout() {
		Map<String, Long> hash = new HashMap<String, Long>();
		hash.put("testThatContentLengthHeaderFieldNameIsCaseInsensitive",
				new Long(30000));
		return hash;
	}

	@Test
	public void testThatContentLengthHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		String headerName = HttpHeaders.CONTENT_LENGTH;
		String request00 = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + HTTP.IDENTITY_CODING
				+ CRLF + HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT
				+ CRLF + headerName + ":" + "5" + CRLF + CRLF + "123456789";

		HttpSimpleBufferedResponse response = executeRawRequest(request00);
		HttpEntity entity = response.getEntity();
		try {
			int actualsc = response.getStatusCode();
			assumeThat(actualsc, is(HttpStatus.SC_OK));
			assumeNotNull(entity);

			String expectedContent = "12345";
			String actualContent = EntityUtils.toString(entity);
			logger.debug(actualContent);
			assumeThat(actualContent, is(expectedContent));

			// check now the case-sensitivity
			headerName = "cOnTeNt-LeNgTh";
			String request01 = "POST /echoBody/ HTTP/1.1" + CRLF
					+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue()
					+ CRLF + HttpHeaders.TRANSFER_ENCODING + ":"
					+ HTTP.IDENTITY_CODING + CRLF + HttpHeaders.CONTENT_TYPE
					+ ":" + ContentType.DEFAULT_TEXT + CRLF + headerName + ":"
					+ "5" + CRLF + CRLF + "123456789";

			response = executeRawRequest(request01);
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			entity = response.getEntity();
			assertNotNull(entity);
			actualContent = EntityUtils.toString(entity);
			logger.debug(actualContent);
			assertEquals("Wrong content", expectedContent, actualContent);
		} finally {
			EntityUtils.consume(entity);
		}
	}

	/**
	 * <b>Implements:</b> Headers11
	 * <p/>
	 * Check that "Content-Type" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatContentTypeHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the standard behavior is true
		String mt = "whatever/whatever";
		String request00 = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.CONTENT_TYPE + ":" + mt + CRLF
				+ HttpHeaders.CONTENT_LENGTH + ":" + "5" + CRLF + CRLF
				+ "12345";
		HttpSimpleBufferedResponse response = executeRawRequest(request00);
		int actualsc = response.getStatusCode();
		assumeThat(actualsc, is(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE));

		// check now the case-sensitivity
		String headerName = "CoNtEnT-tYpE";
		String request01 = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ headerName + ":" + mt + CRLF + HttpHeaders.CONTENT_LENGTH
				+ ":" + "5" + CRLF + CRLF + "12345";
		response = executeRawRequest(request01);
		assertEqualsStatusCode(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE, response);

	}

	/**
	 * <b>Implements:</b> Headers12
	 * <p/>
	 * Check that "Host" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderFieldNameIsCaseInsensitive() throws Exception {
		// assume that the next passes
		String request = "GET / HTTP/1.1" + CRLF + CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		int actualsc = response.getStatusCode();
		assumeThat(actualsc, is(HttpStatus.SC_BAD_REQUEST));

		// check now the case-sensitivity
		String headerName = "HoSt";
		request = "GET / HTTP/1.1" + CRLF + headerName + ":"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

	/**
	 * <b>Implements:</b> Headers13
	 * <p/>
	 * Check that "If-Modified-Since" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatIfModifiedSinceHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the next passes
		HttpGet request00 = new HttpGet("/");
		String lmd = executeRequest(request00)
				.getFirstHeader(HttpHeaders.LAST_MODIFIED).getValue();
		request00.addHeader(HttpHeaders.IF_MODIFIED_SINCE, lmd);
		HttpResponse response = executeRequest(request00);
		int actualsc = response.getStatusLine().getStatusCode();
		assumeThat(actualsc, is(HttpStatus.SC_NOT_MODIFIED));

		// check now the case-sensitivity
		HttpGet request01 = new HttpGet("/");
		String headerName = "iF-mOdIfIeD-sInCe";
		request01.addHeader(headerName, lmd);
		response = executeRequest(request01);
		assertEqualsStatusCode(HttpStatus.SC_NOT_MODIFIED, response);
	}

	/**
	 * <b>Implements:</b> Headers14
	 * <p/>
	 * Check that "If-Unmodified-Since" header field name is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatIfUnmodifiedSinceHeaderFieldNameIsCaseInsensitive()
			throws Exception {
		// assume that the next passes
		HttpGet request00 = new HttpGet("/");
		String slmd = executeRequest(request00)
				.getFirstHeader(HttpHeaders.LAST_MODIFIED).getValue();
		Date lmd = DateUtils.parseDate(slmd,
				new String[] { DateUtils.PATTERN_RFC1123 });
		Date cond = org.apache.commons.lang3.time.DateUtils.addSeconds(lmd, -1);
		String sCond = DateUtils.formatDate(cond, DateUtils.PATTERN_RFC1123);
		request00.addHeader(HttpHeaders.IF_UNMODIFIED_SINCE, sCond);
		HttpResponse response = executeRequest(request00);
		int actualsc = response.getStatusLine().getStatusCode();
		assumeThat(actualsc, is(HttpStatus.SC_PRECONDITION_FAILED));

		// check now the case-sensitivity
		HttpGet request01 = new HttpGet("/");
		String headerName = "iF-uNmOdIfIeD-sInCe";
		request01.addHeader(headerName, sCond);
		response = executeRequest(request01);
		assertEqualsStatusCode(HttpStatus.SC_PRECONDITION_FAILED, response);
	}
}
