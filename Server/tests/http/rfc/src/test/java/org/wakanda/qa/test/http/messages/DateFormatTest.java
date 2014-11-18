package org.wakanda.qa.test.http.messages;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.wakanda.qa.test.http.HttpRegEx.RFC1123_DATE;

import java.util.Date;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.cookie.DateUtils;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;

/**
 * This class manages all test cases related with the date format.
 * 
 * @author Ouissam
 * 
 */
public class DateFormatTest extends AbstractTestCase {

	
    
	/**
	 * <b>Implements:</b> DateFormat01
	 * <p/>
	 * Check that server supports the RFC1123 date format using "If-Modified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatRFC1123DateFormatIsSupportedUsingIfModifiedSinceHeader() throws Exception {
		testDateFormatUsingIfModifiedSince(DateUtils.PATTERN_RFC1123,
				HttpStatus.SC_NOT_MODIFIED);
	}

	/**
	 * <b>Implements:</b> DateFormat02
	 * <p/>
	 * Check that RFC1036 date format is not supported using "If-Modified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (Yannick) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatRFC1036DateFormatIsUnrecognizedUsingIfModifiedSinceHeader() throws Exception {
		testDateFormatUsingIfModifiedSince(DateUtils.PATTERN_RFC1036, HttpStatus.SC_OK);
	}

	/**
	 * <b>Implements:</b> DateFormat03
	 * <p/>
	 * Check that ANSI date format is not supported using "If-Modified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (Yannick) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatANSIDateFormatIsUnrecognizedUsingIfModifiedSinceHeader() throws Exception {
		testDateFormatUsingIfModifiedSince(DateUtils.PATTERN_ASCTIME, HttpStatus.SC_OK);
	}

	/**
	 * <b>Implements:</b> DateFormat04
	 * <p/>
	 * Check that server does not interpret a date in wrong format when using "If-Modified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotInterpretDateInWrongFormatUsingIfModifiedSinceHeader() throws Exception {
		String wrongFormat = "HH:mm:ss dd MMM yyyy";
		testDateFormatUsingIfModifiedSince(wrongFormat, HttpStatus.SC_OK);
	}

	/**
	 * <b>Implements:</b> DateFormat05
	 * <p/>
	 * Check that server supports the RFC1123 date format using "If-Unmodified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatRFC1123DateFormatIsSupportedUsingIfUnmodifiedSinceHeader() throws Exception {
		testDateFormatUsingIfUnmodifiedSince(DateUtils.PATTERN_RFC1123,
				HttpStatus.SC_PRECONDITION_FAILED);
	}

	/**
	 * <b>Implements:</b> DateFormat06
	 * <p/>
	 * Check that RFC1036 date format is not supported using "If-Unmodified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (Yannick) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatRFC1036DateFormatIsUnrecognizedUsingIfUnmodifiedSinceHeader() throws Exception {
		testDateFormatUsingIfUnmodifiedSince(DateUtils.PATTERN_RFC1036, HttpStatus.SC_OK);
	}

	/**
	 * <b>Implements:</b> DateFormat07
	 * <p/>
	 * Check that ANSI date format is not supported using "If-Unmodified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (Yannick) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatANSIDateFormatIsUnrecognizedUsingIfUnodifiedSinceHeader() throws Exception {
		testDateFormatUsingIfUnmodifiedSince(DateUtils.PATTERN_ASCTIME, HttpStatus.SC_OK);
	}

	/**
	 * <b>Implements:</b> DateFormat08
	 * <p/>
	 * Check that server does not interpret a date in wrong format when using "If-Unmodified-Since" header.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotInterpretDateInWrongFormatUsingIfUnmodifiedSinceHeader() throws Exception {
		String wrongFormat = "HH:mm:ss dd MMM yyyy";
		testDateFormatUsingIfUnmodifiedSince(wrongFormat, HttpStatus.SC_OK);
	}
	
	/**
	 * <b>Implements:</b> DateFormat09
	 * <p/>
	 * Check that "Date" header field value is generated in RFC1123 format.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWithRFC1123DateFormatWithDateHeader() throws Exception {
		HttpGet request = new HttpGet("/");
		HttpResponse response = executeRequest(request);
		String headerName = HttpHeaders.DATE;
		Header header = response.getFirstHeader(headerName);
		assertNotNull("\"" + headerName + "\" is missing !");
		assertTrue(
				"\"" + headerName + "\" value is unconform to the RFC 1123",
					header.getValue().matches(RFC1123_DATE));
	}
	
	/**
	 * <b>Implements:</b> DateFormat10
	 * <p/>
	 * Check that "Last-Modified" header field value is generated in RFC1123 format.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWithRFC1123DateFormatWithLastModifiedHeader() throws Exception {
		HttpGet request = new HttpGet("/");
		HttpResponse response = executeRequest(request);
		String headerName = HttpHeaders.LAST_MODIFIED;
		Header header = response.getFirstHeader(headerName);
		assertNotNull("\"" + headerName + "\" is missing !");
		assertTrue(
				"\"" + headerName + "\" value is unconform to the RFC 1123",
					header.getValue().matches(RFC1123_DATE));
	}
	/**
	 * <b>Implements:</b> DateFormat11
	 * <p/>
	 * Check that "Expires" header field value is generated in RFC1123 format.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.3.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWithRFC1123DateFormatWithExipresHeader() throws Exception {
		HttpGet request = new HttpGet("/checkURI/");
		HttpResponse response = executeRequest(request);
		String headerName = HttpHeaders.EXPIRES;
		Header header = response.getFirstHeader(headerName);
		if (header != null) {
			assertTrue(
					"\"" + headerName + "\" value is unconform to the RFC 1123",
					header.getValue().matches(RFC1123_DATE));
		}
	}

	/**
	 * Private method which checks that a date format is correctly interpreted by the server using If-Modified-Since.
	 * 
	 * @param dateFormat
	 * @param expectedSC
	 * @throws Exception
	 */
	private void testDateFormatUsingIfModifiedSince(String dateFormat, int expectedSC)
			throws Exception {
		// assume that "If-Modified-Since" logic works first.
		testThatIfModifiedSinceLogicWorks(DateUtils.PATTERN_RFC1123, HttpStatus.SC_NOT_MODIFIED, true);
		// test now with current parameters
		testThatIfModifiedSinceLogicWorks(dateFormat, expectedSC, false);
	}
	
	/**
	 * Private method which checks that a date format is correctly interpreted by the server using If-Unmodified-Since.
	 * 
	 * @param dateFormat
	 * @param expectedSC
	 * @throws Exception
	 */
	private void testDateFormatUsingIfUnmodifiedSince(String dateFormat, int expectedSC)
			throws Exception {
		// assume that "If-Unmodified-Since" logic works first.
		testThatIfUnmodifiedSinceLogicWorks(DateUtils.PATTERN_RFC1123, HttpStatus.SC_PRECONDITION_FAILED, true);
		// test now with current parameters
		testThatIfUnmodifiedSinceLogicWorks(dateFormat, expectedSC, false);
	}
	
	private void testThatIfModifiedSinceLogicWorks(String dateFormat, int expectedSC, boolean assume) throws Exception{
		HttpGet request = new HttpGet("/");
		HttpResponse respLmd = executeRequest(request);
		String sLmd = respLmd
				.getFirstHeader(HttpHeaders.LAST_MODIFIED).getValue();
		Date dLmd = DateUtils.parseDate(sLmd);
		String dToSend = DateUtils.formatDate(dLmd, dateFormat);
		request.addHeader(HttpHeaders.IF_MODIFIED_SINCE, dToSend);
		HttpResponse response = executeRequest(request);
		
		assertEqualsStatusCode(expectedSC, response);

		/*if(assume){
			int actualsc = response.getStatusLine().getStatusCode();
			assumeThat(actualsc, is(expectedSC));
		}
		else{
			assertEqualsStatusCode(expectedSC, response);
		}*/
	}
	
	private void testThatIfUnmodifiedSinceLogicWorks(String dateFormat, int expectedSC, boolean assume) throws Exception{
		HttpGet request = new HttpGet("/");
		String slmd = executeRequest(request).getFirstHeader(HttpHeaders.LAST_MODIFIED)
				.getValue();
		Date lmd = DateUtils.parseDate(slmd);
		Date cond = org.apache.commons.lang3.time.DateUtils.addSeconds(lmd, -1);
		String sCond = DateUtils.formatDate(cond, dateFormat);
		request.addHeader(HttpHeaders.IF_UNMODIFIED_SINCE, sCond);
		HttpResponse response = executeRequest(request);
		
		assertEqualsStatusCode(expectedSC, response);
		
		/*if(assume){
			int actualSC = response.getStatusLine().getStatusCode();
			assumeThat(actualSC, is(expectedSC));
		}
		else{
			assertEqualsStatusCode(expectedSC, response);
		}*/
	}

}
