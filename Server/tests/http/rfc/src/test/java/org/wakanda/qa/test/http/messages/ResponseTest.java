package org.wakanda.qa.test.http.messages;

import static org.junit.Assert.fail;

import java.io.InputStream;

import org.apache.http.ConnectionClosedException;
import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.ParseException;
import org.apache.http.conn.OperatedClientConnection;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.impl.DefaultHttpResponseFactory;
import org.apache.http.impl.conn.DefaultClientConnectionOperator;
import org.apache.http.impl.conn.DefaultHttpResponseParser;
import org.apache.http.io.HttpMessageParser;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.message.BasicLineParser;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.CharArrayBuffer;
import org.junit.Assert;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.extend.SessionInputBufferMockup;


/**
 * This class manages all tests related with the response message.
 * 
 * @author Ouissam
 * 
 */
public class ResponseTest extends AbstractTestCase {

	/**
	 * Implements: ResponseFormat01
	 * <p/>
	 * Check that the status line format is correct.
	 * <p/>
	 * Reference: SPEC691 (RFC2616)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testStatusLineFormat() throws Exception {
		HttpHost target = getDefaultTarget();
		HttpRequest request = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		request.addHeader(HttpHeaders.HOST, target.toHostString());
		InputStream in = getResponseSessionInputStream(target, request);
		SessionInputBufferMockup sinb = new SessionInputBufferMockup(in, 16);
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		int i = sinb.readLine(lineBuf);
		if (i == -1) {
			throw new ConnectionClosedException("Client closed connection");
		}
		try {
			BasicLineParser.parseStatusLine(lineBuf.toString(), null);
		} catch (ParseException e) {
			fail("Malformed status line: " + e.getMessage());
		}finally{
			in.close();
		}
	}

	/**
	 * Implements: ResponseFormat02
	 * <p/>
	 * Check that the HTTP protocol version format is correct.
	 * <p/>
	 * Reference: SPEC691 (RFC2616) 6.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProtocolVersionFormat() throws Exception {
		HttpHost target = getDefaultTarget();
		HttpRequest request = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		request.addHeader(HttpHeaders.HOST, target.toHostString());
		InputStream in = getResponseSessionInputStream(target, request);
		SessionInputBufferMockup sinb = new SessionInputBufferMockup(in, 16);
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		int i = sinb.readLine(lineBuf);
		if (i == -1) {
			throw new ConnectionClosedException("Client closed connection");
		}
		try {
			BasicLineParser.parseProtocolVersion(lineBuf.toString(), null);
		} catch (ParseException e) {
			fail("Malformed protocol version: " + e.getMessage());
		}finally{
			in.close();
		}
	}

	/**
	 * Implements: ResponseFormat03
	 * <p/>
	 * Check the response headers format.
	 * <p/>
	 * Reference : SPEC691 (RFC2616) 6.1
	 * 
	 * @throws HttpException
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseHeadersFormat() throws Exception {
		HttpHost target = getDefaultTarget();
		HttpRequest request = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		request.addHeader(HttpHeaders.HOST, target.toHostString());
		InputStream in = getResponseSessionInputStream(target, request);
		SessionInputBufferMockup sinb = new SessionInputBufferMockup(in, 16);
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		try {
			// Skip status line
			int i = sinb.readLine(lineBuf);
			if (i == -1) {
				throw new ConnectionClosedException("Client closed connection");
			}
			// parse headers
			DefaultHttpResponseParser.parseHeaders(sinb, -1, -1,
					BasicLineParser.DEFAULT);
		} catch (HttpException e) {
			fail("Malformed header: " + e.getMessage());
		}finally{
			in.close();
		}
	}

	/**
	 * Implements: ResponseFormat04
	 * <p/>
	 * Check the entire response format.
	 * <p/>
	 * Reference : SPEC691 (RFC2616) 6.1
	 * 
	 * @throws Exception
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseFormat() throws Exception {
		HttpHost target = getDefaultTarget();
		HttpRequest request = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		request.addHeader(HttpHeaders.HOST, target.toHostString());
		InputStream in = getResponseSessionInputStream(target, request);
		SessionInputBufferMockup sinb = new SessionInputBufferMockup(in, 16);
		try {
			HttpMessageParser<?> parser = new DefaultHttpResponseParser(sinb,
					BasicLineParser.DEFAULT, new DefaultHttpResponseFactory(),
					new BasicHttpParams());
			
			

			HttpResponse response = (HttpResponse) parser.parse();
			Assert.assertNotNull(response);

			Header[] headers = response.getAllHeaders();
			Assert.assertNotNull(headers);
		} catch (HttpException e) {
			fail("Malformed response: " + e.getMessage());
		}finally{
			in.close();
		}

	}

	/**
	 * Private method that sends basic request and return the corresponding session inupt buffer.
	 * @return
	 * @throws Exception
	 */
	private InputStream getResponseSessionInputStream(HttpHost target, HttpRequest request) throws Exception {

		SchemeRegistry supportedSchemes = new SchemeRegistry();
		supportedSchemes.register(new Scheme("http", getSettings().getDefaultPort(),
				PlainSocketFactory.getSocketFactory()));

		HttpParams params = new SyncBasicHttpParams();
		HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
		HttpProtocolParams.setUseExpectContinue(params, false);

		// one operator can be used for many connections
		DefaultClientConnectionOperator scop = new DefaultClientConnectionOperator(
				supportedSchemes);

		HttpContext ctx = new BasicHttpContext();

		try {
			OperatedClientConnection conn = scop.createConnection();
			scop.openConnection(conn, target, null, ctx, params);
			conn.sendRequestHeader(request);
			conn.flush();
			InputStream in = conn.getSocket().getInputStream();
			return in;
		} catch (Exception e) {
			return null;
		}
	}
}
