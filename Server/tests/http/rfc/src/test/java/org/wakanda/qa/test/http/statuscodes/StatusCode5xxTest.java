package org.wakanda.qa.test.http.statuscodes;

import static org.junit.Assert.*;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.EnglishReasonPhraseCatalog;
import org.apache.http.message.BasicHttpRequest;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all test cases related with status codes that begin with
 * 5xx (Server Error)
 * 
 * @author Ouissam
 *
 */
public class StatusCode5xxTest extends AbstractTestCase {
	//private static Logger logger = Logger.getLogger(StatusCode5xxTest.class);
	/**
	 * <b>Implements:</b> StatusCode500
	 * <p/>
	 * Check 500 (Internal Server Error) status code
	 * <p/>
	 * <b>Reference:<b> SPEC695 = RFC2616 10.5.1
	 * @throws Exception
	 */
	@Test
	public void testStatusCode500InternalServerError() throws Exception{

		int expected = HttpStatus.SC_INTERNAL_SERVER_ERROR;
		
		/*String url = "/rpc/";
		HttpPost request = new HttpPost(url);
		long id = GregorianCalendar.getInstance().getTimeInMillis();
		String rpcFunction = "whatever";
		String content = "{\"jsonrpc\":\"2.0\",\"id\":" + id + ",\"method\":\"" + rpcFunction +"\",\"params\":\"whatever\"}";
		StringEntity reqEntity = new StringEntity(content);
		request.setEntity(reqEntity);
		logger.debug(content);
		HttpResponse response = executeRequest(request);
		logger.debug(EntityUtils.toString(response.getEntity()));
		assertEqualsStatusCode(expected, response);
		assertEquals(
				"Wrong reason phrase",
				EnglishReasonPhraseCatalog.INSTANCE.getReason(
						expected, null), response.getStatusLine()
				.getReasonPhrase());*/
		
		String url = "/checkInternalError/";
		HttpGet request2 = new HttpGet(url);
		HttpResponse response2 = executeRequest(request2);
		assertEqualsStatusCode(expected, response2);
		assertEquals(
				"Wrong reason phrase",
				EnglishReasonPhraseCatalog.INSTANCE.getReason(
						expected, null), response2.getStatusLine()
				.getReasonPhrase());
		
		
	}
	
	/**
	 * <b>Implements:</b> StatusCode501
	 * <p/>
	 * Check 501 (Not Implemented) status code
	 * <p/>
	 * <b>Reference:<b> SPEC695 = RFC2616 10.5.2
	 * @throws Exception
	 */
	@Test
	public void testStatusCode501NotImplemented() throws Exception{
		int expected = HttpStatus.SC_NOT_IMPLEMENTED;
		HttpRequest request = new BasicHttpRequest("whatever", "/");
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(expected, response);
		assertEquals(
				"Wrong reason phrase",
				EnglishReasonPhraseCatalog.INSTANCE.getReason(
						expected, null), response.getStatusLine()
				.getReasonPhrase());
		
		
	}
}
