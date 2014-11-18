package org.wakanda.qa.test.http.cache;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.wakanda.qa.test.http.HttpRegEx.RFC1123_DATE;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpTrace;
import org.apache.http.impl.cookie.DateUtils;
import org.apache.http.util.EntityUtils;
import org.junit.After;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;

import com.google.gson.Gson;

/**
 * This manages all test cases related with the server cache.
 * 
 * @author Ouissam
 * 
 */
public class CacheTest extends AbstractTestCase {

	private String generetedURL = null;

	@Override
	public void before() throws Exception {
		super.before();
		// generate a resource and store it in the application web folder
		String generated = "/toCheckCache" + RandomStringUtils.randomNumeric(3)
				+ ".tmp";
		byte[] content = RandomStringUtils.random(1024).getBytes();
		String filePath = Settings.getCacheFolder() + generated;
		FileUtils.writeByteArrayToFile(new File(filePath), content);
		setGeneratedURL("/cache" + generated);
		//logger.debug("Resource generated");
	}

	@After
	public void after(){
		// delete the generated resource
		new File(getDefaultProjectWebFolderPath() + getGeneratedURL()).delete();
		//logger.debug("Resource removed");
	}

	/**
	 * <b>Implements:</b> Cache01
	 * <p/>
	 * Check that server creates cache entry for a cacheable response.
	 * <p/>
	 * <b>Refrences:</b> Functional specification 6/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCacheEntryExistence() throws Exception {
		String url = getGeneratedURL();
		// there should be no entry in the server cache
		CacheEntry entry = getServerCacheEntry(url);
		assertNull(
				"Resource should not be cached when no response has been genereted yet",
				entry);
		// request & response
		executeRequest(new HttpGet(url));
		// there should be an entry in the server cache
		entry = getServerCacheEntry(url);
		assertNotNull(
				"Resource should be cached now that response has been genereted",
				entry);
	}

	/**
	 * <b>Implements:</b> Cache02
	 * <p/>
	 * Check that when "Expires" header is sent (with dynamic response so far), it does contains the date of the response.
	 * <p/>
	 * <b>Refrences:</b> Functional specification 6/Lot 1 & SPEC698 (RFC2616)
	 * 14.21
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatWhenExpiresHeaderIsSentContainsTheRightValue() throws Exception {
		// "Expires" header is sent only with a dynamic entity so far
		HttpResponse response = executeRequest(new HttpGet("/checkURI/"));
		Header expiresH = response.getFirstHeader(HttpHeaders.EXPIRES);
		Header dateH = response.getFirstHeader(HttpHeaders.DATE);

		// check header existence
		assertNotNull("Expires header is missing", expiresH);
		assertNotNull("Date header is missing", dateH);

		// the "Expires" field value should matches the RFC1123 format.
		String actual = expiresH.getValue();
		assertTrue("Header value is unconform to the RFC 1123",
				actual.matches(RFC1123_DATE));
		
		// "Expires" header value should be the same as the "Date" header value.
		String expected = dateH.getValue();
		assertEquals("Wrong header value", expected, expiresH.getValue());
		
	}

	/**
	 * <b>Implements:</b> Cache03
	 * <p/>
	 * Check that server sends "Cache-Control" header with value equals to
	 * "must-revalidate, max-age=0"
	 * <p/>
	 * <b>Refrences:</b> Functional specification 6/Lot 1 & SPEC698 = RFC2616
	 * 14.9
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatWhenCacheControlHeaderIsSentContainsTheRightValue() throws Exception {
		// "Expires" header is sent only with a dynamic entity so far
		HttpResponse response = executeRequest(new HttpGet("/checkURI/"));
		Header cacheControl = response
				.getFirstHeader(HttpHeaders.CACHE_CONTROL);

		// check existence
		assertNotNull("Cache-Control header is missing", cacheControl);

		// check value
		String expected = "must-revalidate, max-age=0";
		assertEquals("Wrong header value", expected, cacheControl.getValue());
	}

	/**
	 * <b>Implements:</b> Cache04
	 * <p/>
	 * Check that server sends Last-Modified-Date header with correct value.
	 * <p/>
	 * <b>Refrences:</b> SPEC596 & SPEC698 = RFC2616 13.3.4/13.3.4/14.29
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatLastModifiedHeaderIsSentAndContainsTheRightValue() throws Exception {
		String url = getGeneratedURL();
		testLastModifiedHeader(url);
	}

	/**
	 * <b>Implements:</b> Cache05
	 * <p/>
	 * Check that Last-Modified header value is updated when corresponding
	 * resource content has changed.
	 * <p/>
	 * <b>Refrences:</b> SPEC596 & SPEC698 = RFC2616 13.3.4/13.3.4/14.29
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatLastModifiedDateHeaderIsSynchWheneverTheFileIsModified() throws Exception {
		// get new url
		String url = getGeneratedURL();

		// check last modified business logic before editing
		testLastModifiedHeader(url);

		// waiting before editing file...
		File file = new File(getDefaultProjectWebFolderPath() + url);

		// get the lmd of the file
		Date lmd01 = new Date(file.lastModified());
		//logger.debug("Before : " + lmd01);

		// wait before editing the file
		//logger.debug("Waiting 2 sec before editing the file...");
		Thread.sleep(2000);
		Writer wr = new OutputStreamWriter(new FileOutputStream(file));
		wr.append(
				RandomStringUtils.random(10));
		wr.close();

		// get the lmd of the file
		Date lmd02 = new Date(file.lastModified());
		//logger.debug("After : " + lmd02);
		assertTrue(
				"Last modified date (2) should be greater than Last Modified date (1)",
				lmd02.after(lmd01));

		// check last modified business logic after editing
		testLastModifiedHeader(url);
	}

	/**
	 * <b>Implements:</b> Cache06
	 * <p/>
	 * Check that response to TRACE method is not cached.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 9.8
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatResponseToTRACEMethodIsNotCached() throws Exception {
		String url = getGeneratedURL();
		HttpTrace request = new HttpTrace(url);
		HttpResponse response = executeRequest(request);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// there should be no entry in the server cache
		CacheEntry entry = getServerCacheEntry(url);
		assertNull("Response must not be cached", entry);
	}

	/**
	 * <b>Implements:</b> Cache07
	 * <p/>
	 * Check the Last-Modified validator using If-Modified-Since: The server
	 * checks that validator against the current validator for the entity, and,
	 * if they match it responds with a special status code 304 (Not Modified)
	 * and no entity-body.
	 * <p/>
	 * <b>Reference:</b> SPEC596 (RFC2616) 13.3.1 / 14.25
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenCacheValidatorDoesNotMatchUsingIfModifiedSince()
			throws Exception {
		// get generated url
		String url = getGeneratedURL();

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		HttpGet request = new HttpGet(url);
		
		HttpResponse response1 = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response1);
		
		String lmd = response1.getFirstHeader(validator)
				.getValue();

		// build conditional request
		request.addHeader(HttpHeaders.IF_MODIFIED_SINCE, lmd);

		// get the response
		HttpResponse response2 = executeRequest(request);

		// check status code
		assertEqualsStatusCode(HttpStatus.SC_NOT_MODIFIED, response2);

		// check content
		assertNull(response2.getEntity());

	}

	/**
	 * <b>Implements:</b> Cache08
	 * <p/>
	 * Check the Last-Modified validator using If-Modified-Since: The server
	 * checks that validator against the current validator for the entity, and,
	 * if they dont match returns a full response (including entity-body).
	 * <p/>
	 * <b>Reference:</b> SPEC596 (RFC2616) 13.3.1 / 14.25
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenCacheValidatorMatchesUsingIfModifiedSince()
			throws Exception {
		// get generated url
		String url = getGeneratedURL();

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		HttpGet request = new HttpGet(url);
		
		HttpResponse response1 = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response1);
		
		String lmds = response1.getFirstHeader(validator)
				.getValue();
		Date lmd = DateUtils.parseDate(lmds,
				new String[] { DateUtils.PATTERN_RFC1123 });
		// logger.debug(lmd);

		// build conditional request
		Date toSend = org.apache.commons.lang3.time.DateUtils
				.addSeconds(lmd, -1);
		// logger.debug(toSend);
		request.addHeader(HttpHeaders.IF_MODIFIED_SINCE,
				DateUtils.formatDate(toSend, DateUtils.PATTERN_RFC1123));

		// get the response
		HttpResponse response2 = executeRequest(request);

		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response2);

		// check content not null
		assertNotNull(response2.getEntity());
	}

	/**
	 * <b>Implements:</b> Cache09
	 * <p/>
	 * Check the Last-Modified validator using If-Unmodified-Since: The server
	 * checks that validator against the current validator for the entity, and,
	 * if they match it responds with a special status code 412 (Precondition
	 * Failed).
	 * <p/>
	 * <b>Reference:</b> SPEC596 (RFC2616) 13.3.1 + SPEC698 (RFC2616) 14.28
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenCacheValidatorDoesNotMatchUsingIfUnmodifiedSince()
			throws Exception {
		// get generated url
		String url = getGeneratedURL();

		HttpGet request = new HttpGet(url);

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		HttpResponse response1 = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response1);
		
		String slmd = response1.getFirstHeader(validator)
				.getValue();
		//logger.debug(slmd);
		Date lmd = DateUtils.parseDate(slmd,
				new String[] { DateUtils.PATTERN_RFC1123 });

		// date value as condition
		Date cond = org.apache.commons.lang3.time.DateUtils.addSeconds(lmd, -1);
		String sCond = DateUtils.formatDate(cond, DateUtils.PATTERN_RFC1123);

		//logger.debug(sCond);

		// build conditional request
		request.addHeader(HttpHeaders.IF_UNMODIFIED_SINCE, sCond);

		// get the response
		HttpResponse response2 = executeRequest(request);

		// check status code
		assertEqualsStatusCode(HttpStatus.SC_PRECONDITION_FAILED, response2);

	}

	/**
	 * <b>Implements:</b> Cache10
	 * <p/>
	 * Check the Last-Modified validator using If-Unmodified-Since: The server
	 * checks that validator against the current validator for the entity, and,
	 * if they dont match returns a full response (including entity-body).
	 * <p/>
	 * <b>Reference:</b> SPEC596 (RFC2616) 13.3.1 / 14.28
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenCacheValidatorMatchesUsingIfUnmodifiedSince()
			throws Exception {
		// get generated url
		String url = getGeneratedURL();

		HttpGet request = new HttpGet(url);

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		
		HttpResponse response1 = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response1);
		
		String slmd = response1.getFirstHeader(validator)
				.getValue();

		// build conditional request
		request.addHeader(HttpHeaders.IF_UNMODIFIED_SINCE, slmd);

		// get the response
		HttpResponse response2 = executeRequest(request);

		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response2);
		// check content
		assertNotNull(response2.getEntity());
	}

	/**
	 * Private method that checks the Last-Modified-Date header existence and
	 * value for specified url.
	 * 
	 * @param url
	 * @throws Exception
	 */
	private void testLastModifiedHeader(String url) throws Exception {
		// request & response
		HttpResponse response = executeRequest(new HttpGet(url));
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		String headerName = HttpHeaders.LAST_MODIFIED;
		Header lastModifiedDate = response.getFirstHeader(headerName);
		// check header existence
		assertNotNull("\"" + headerName + "\" header is missing !", lastModifiedDate);
		// check header value
		Date toFormat = new Date(
				new File(getDefaultProjectWebFolderPath() + url).lastModified());
		// the header value should matches the RFC1123 format.
		String actual = lastModifiedDate.getValue();
		assertTrue("Header value is unconform to the RFC 1123",
				actual.matches(RFC1123_DATE));
		// the header value should equals the last date of modification of the file.
		String expected = DateUtils.formatDate(toFormat,
				DateUtils.PATTERN_RFC1123);
		assertEquals("Wrong header value", expected,
				lastModifiedDate.getValue());
	}

	private String getDefaultProjectWebFolderPath() {
		return Settings.getDefaultProjectWebFolderPath();
	}

	/**
	 * Returns the cache entry from the server cache if it exsits or null
	 * otherwise.
	 * 
	 * @param url
	 * @return
	 * @throws ParseException
	 * @throws IOException
	 */
	private CacheEntry getServerCacheEntry(String url) throws Exception {
		CacheInfo cacheInfo = getServerCacheInfo();
		for (CacheEntry entry : cacheInfo.getCachedObjects()) {
			if (entry.getUrl().equals(url)) {
				return entry;
			}
		}
		return null;
	}

	/**
	 * Returns the cache server informations.
	 * 
	 * @return
	 * @throws ParseException
	 * @throws IOException
	 */
	private CacheInfo getServerCacheInfo() throws Exception {
		HttpGet request = new HttpGet("/cache");
		HttpResponse response = executeAuthenticated(request);
		String content = EntityUtils.toString(response.getEntity());
		CacheInfo cacheInfo = new Gson().fromJson(content, CacheInfo.class);
		return cacheInfo;
	}

	private void setGeneratedURL(String toBeCachedURL) {
		this.generetedURL = toBeCachedURL;
	}

	private String getGeneratedURL() {
		return generetedURL;
	}

}

/**
 * Class that represents a cache entry in the server.
 * 
 */
class CacheEntry {

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public boolean isStatic() {
		return isStatic;
	}

	public void setStatic(boolean isStatic) {
		this.isStatic = isStatic;
	}

	public int getNbLoads() {
		return nbLoads;
	}

	public void setNbLoads(int nbLoads) {
		this.nbLoads = nbLoads;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public int getDataSize() {
		return dataSize;
	}

	public void setDataSize(int dataSize) {
		this.dataSize = dataSize;
	}

	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}

	public int getMaxAge() {
		return maxAge;
	}

	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	private String url;
	private String mimeType;
	private boolean isStatic;
	private int nbLoads;

	private Date lastModified;
	private int dataSize;
	private Date entryDate;
	private int maxAge;
	private Date expirationDate;

}

/**
 * Class that respresents cache informations of the server.
 * 
 */
class CacheInfo {
	public int getCacheUsage() {
		return cacheUsage;
	}

	public void setCacheUsage(int cacheUsage) {
		this.cacheUsage = cacheUsage;
	}

	public int getNumOfLoads() {
		return numOfLoads;
	}

	public void setNumOfLoads(int numOfLoads) {
		this.numOfLoads = numOfLoads;
	}

	public int getCurrentSize() {
		return currentSize;
	}

	public void setCurrentSize(int currentSize) {
		this.currentSize = currentSize;
	}

	public int getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(int maxSize) {
		this.maxSize = maxSize;
	}

	public int getObjectMaxSize() {
		return objectMaxSize;
	}

	public void setObjectMaxSize(int objectMaxSize) {
		this.objectMaxSize = objectMaxSize;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public int getNbCachedObjects() {
		return nbCachedObjects;
	}

	public void setNbCachedObjects(int nbCachedObjects) {
		this.nbCachedObjects = nbCachedObjects;
	}

	public void setCachedObjects(CacheEntry[] cachedObjects) {
		this.cachedObjects = cachedObjects;
	}

	public CacheEntry[] getCachedObjects() {
		return cachedObjects;
	}

	private int cacheUsage;
	private int numOfLoads;
	private int currentSize;
	private int maxSize;
	private int objectMaxSize;
	private boolean enabled;
	private int nbCachedObjects;
	private CacheEntry[] cachedObjects;
}
