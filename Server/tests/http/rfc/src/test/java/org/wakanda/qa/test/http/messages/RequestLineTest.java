package org.wakanda.qa.test.http.messages;

import static org.junit.Assert.assertTrue;
import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.http.HttpStatus;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class implements all test cases related with the request line.
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class RequestLineTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> RequestLine01
	 * <p/>
	 * Check that server ignores any empty line(s) received where a Request-Line
	 * is expected.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerIgnoresEmptyLinesWhereRequestLineIsExpected()
			throws Exception {
		String request = CRLF + CRLF + CRLF + "GET / HTTP/1.0" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}
	
	/**
	 * <b>Implements:</b> RequestLine02
	 * <p/>
	 * Check that server returns 400 (Bad Request) when URI and protocol version
	 * are missing.
	 * <p/> 
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturnsBadRequestWhenURIAndProtocolVersionIsMissing() throws Exception {
		String request = "GET" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> RequestLine03
	 * <p/>
	 * Check that server returns 400 (Bad Request) when protocol version is
	 * missing.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturnsBadRequestWhenProtocolVersionIsMissing() throws Exception {
		String request = "GET /whatever " + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> RequestLine04
	 * <p/>
	 * Check that server returns 400 (Bad Request) when request line contains
	 * more elements than expected.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturnsBadRequestWhenRequestLineContainsMoreElements() throws Exception {
		String request = "GET /whatever HTTP/1.1 Ooooops" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> RequestLine05
	 * <p/>
	 * Check that server accepts any amount of SP or HT characters between
	 * fields between request line elements.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1 & RFC2616 19.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerAcceptsAnyAmountSpacesBetweenRequestLineElements()
			throws Exception {
		String request = "GET\t   /    HTTP/1.0" + CRLF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

	/**
	 * <b>Implements:</b> RequestLine06
	 * <p/>
	 * Check that server recognizes a single LF as line terminator.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRecognizesSingleLineFeedAsLineTerminator()
			throws Exception {
		String request = "GET / HTTP/1.0" +LF
						+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

	/**
	 * <b>Implements:</b> RequestLine07
	 * <p/>
	 * Check that the server rejects the request when its request line elements
	 * are inversed.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method="getSupportedMethods")
	public void testWhenInversePositionOfRequestLineElements(String method) throws Exception {
		String request = method + " HTTP/1.1 /" + CRLF
				+ "Host:" + getDefaultHostHeaderValue() + CRLF
				+ CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		int unexpected = HttpStatus.SC_OK;
		int actual = response.getStatusCode();
		assertTrue("[" + method + "] The server must not accept inverse position of request line elments", actual!=unexpected);
	}

	/**
	 * <b>Implements:</b> RequestLine08
	 * <p/>
	 * Check that the server rejects a request line when no space between its
	 * elements.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method="getSupportedMethods")
	public void testWhenNoSpaceBetweenRequestLineElements(String method) throws Exception {
		String request = method+"/HTTP/1.1" + CRLF
				+ "Host:" + getDefaultHostHeaderValue() + CRLF
				+ CRLF;
		
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		int unexpected = HttpStatus.SC_OK;
		int actual = response.getStatusCode();
		assertTrue("[" + method + "] There must be spaces between request line elments", actual!=unexpected);
	}

	/**
	 * <b>Implements:</b> RequestLine09
	 * <p/>
	 * Check that carriage return and line feed are not allowed between request
	 * line elements.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.1.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method="getSupportedMethods")
	public void testWhenCRLFBetweenRequestLineElements(String method) throws Exception {
		String request = method + CRLF + "/" + CRLF + "HTTP/1.1" + CRLF
				+ "Host:" + getDefaultHostHeaderValue() + CRLF
				+ CRLF;
		
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		int unexpected = HttpStatus.SC_OK;
		int actual = response.getStatusCode();
		assertTrue("[" + method + "]CRLF are not allowed between request line elments", actual!=unexpected);
	}

}
