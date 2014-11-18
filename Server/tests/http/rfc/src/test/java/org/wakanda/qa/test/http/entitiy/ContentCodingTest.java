package org.wakanda.qa.test.http.entitiy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import java.util.zip.Inflater;
import java.util.zip.InflaterInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpResponseInterceptor;
import org.apache.http.HttpStatus;
import org.apache.http.client.entity.GzipDecompressingEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ResponseContentEncoding;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.HttpEntityWrapper;
import org.apache.http.entity.StringEntity;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;
import org.wakanda.qa.test.http.Constants;
import org.wakanda.qa.test.http.Utils;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * @author Ouissam
 * 
 *         This class manages all test cases related with content coding.
 * 
 */

public class ContentCodingTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> ContentCoding01
	 * <p/>
	 * Check that server is able to compress with "deflate" encoding.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.5 & SPEC698 (RFC2616) 14.11 + 14.3
	 * & Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testDeflateContentCodingIsSupportedAndTheContentHasBeenTransformed()
			throws Exception {
		// send request with "Accept-Encoding" header field.
		String url = "/tocompress.html";
		String ce = "deflate";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();
		try {
			// check the response content
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			Header ceHeader = entity.getContentEncoding();
			assertNotNull("Missing \"Content-Encoding\" header", ceHeader);
			assertEquals("Wrong \"Content-Encoding\" header value", ce,
					ceHeader.getValue().toLowerCase());

			// uncompress content
			response.setEntity(new DecompressingEntity(entity, ce));

			// check the content integrity
			byte[] actuals = EntityUtils.toByteArray(response.getEntity());
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);

			Assert.assertArrayEquals("Wrong coding", expecteds, actuals);
		} finally {
			// Release all resources
			EntityUtils.consume(entity);
		}
	}

	/**
	 * <b>Implements:</b> ContentCoding02
	 * <p/>
	 * Check that server is able to compress with "gzip" encoding.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.5 & SPEC698 (RFC2616) 14.11 + 14.3
	 * & Functional specifications 3/Lot 1
	 */
	@Test
	public void testGzipContentCodingIsSupportedAndTheContentHasBeenTransformed()
			throws Exception {

		// send request with "Accept-Encoding" header field.
		String url = "/tocompress.html";
		String ce = "gzip";

		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();

		try {
			// check the response content
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			Header ceHeader = entity.getContentEncoding();
			assertNotNull("Missing \"Content-Encoding\" header", ceHeader);
			assertEquals("Wrong \"Content-Encoding\" header value", ce,
					ceHeader.getValue());

			// uncompress content
			HttpContext context = new BasicHttpContext();
			HttpResponseInterceptor interceptor = new ResponseContentEncoding();
			interceptor.process(response, context);
			entity = response.getEntity();
			Assert.assertNotNull(entity);
			Assert.assertTrue(entity instanceof GzipDecompressingEntity);
			
			// check the content integrity
			byte[] actuals = EntityUtils.toByteArray(entity);
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);

			Assert.assertArrayEquals("Wrong coding", expecteds, actuals);
		} finally {
			request.abort();
		}
	}

	/**
	 * <b>Implements:</b> ContentCoding03
	 * <p/>
	 * Check that server is able to compress with "x-gzip" encoding.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.5 & SPEC698 (RFC2616) 14.11 + 14.3
	 * & Functional specifications 3/Lot 1
	 */
	@Test
	public void testXGzipContentCodingIsSupported() throws Exception {
		// send request with "Accept-Encoding" header field.
		String url = "/tocompress.html";
		String ce = "x-gzip";

		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();
		try {
			// check the response content
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			Header ceHeader = entity.getContentEncoding();
			assertNotNull("Missing \"Content-Encoding\" header", ceHeader);
			assertEquals("Wrong \"Content-Encoding\" header value", ce,
					ceHeader.getValue());

			// uncompress content
			HttpContext context = new BasicHttpContext();
			HttpResponseInterceptor interceptor = new ResponseContentEncoding();
			interceptor.process(response, context);
			entity = response.getEntity();
			Assert.assertNotNull(entity);
			Assert.assertTrue(entity instanceof GzipDecompressingEntity);

			// check the content integrity
			byte[] actuals = EntityUtils.toByteArray(entity);
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);

			Assert.assertArrayEquals("Wrong coding", expecteds, actuals);
		} finally {
			request.abort();
		}
	}

	/**
	 * <b>Implements:</b> ContentCoding04
	 * <p/>
	 * Check that identity encoding does not transform the content.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.5 & SPEC698 (RFC2616) 14.11 + 14.3
	 * & Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testIdentityContentCodingIsSupportedAndTheContentHasntBeenTransformed()
			throws Exception {
		String url = "/tocompress.html";
		String ce = "identity";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();

		try {
			// check status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check that CE header is missing
			Header ceHeader = entity.getContentEncoding();
			assertNull(
					"No \"Content-Encoding\" header should be returned for \"identity\" content-coding",
					ceHeader);

			// check that content has not been transformed
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);
			byte[] actuals = EntityUtils.toByteArray(entity);
			Assert.assertArrayEquals(
					"Identity content-coding should not transform the content",
					expecteds, actuals);
		} finally {
			EntityUtils.consume(entity);
		}

	}

	/**
	 * <b>Implements:</b> ContentCoding05
	 * <p/>
	 * Check that identity encoding is the default one ie. the server responds
	 * with identity format when "Accept-Encoding" field value is empty.
	 * <p/>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testIdentityContentCodingIsDefaultAndTheContentHasntBeenTransformed()
			throws Exception {
		String url = "/tocompress.html";
		String ce = "";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();

		try {
			// check status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check that CE header is missing
			Header ceHeader = entity.getContentEncoding();
			assertNull(
					"No \"Content-Encoding\" header should be returned for \"identity\" content-coding",
					ceHeader);

			// check that content has not been transformed
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);
			byte[] actuals = EntityUtils.toByteArray(entity);
			Assert.assertArrayEquals(
					"Identity content-coding should not transform the content",
					expecteds, actuals);

		} finally {
			EntityUtils.consume(entity);
		}

	}

	/**
	 * <b>Implements:</b> ContentCoding06
	 * <p/>
	 * Check that identity content-coding is the one chosen when client request
	 * for any available content-coding format.
	 * <p/>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.3 & Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseContentCodingWhenClientRequestForAnyAvailableContentCoding()
			throws Exception {
		String url = "/tocompress.html";
		String ce = "*";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request, false);
		HttpEntity entity = response.getEntity();

		try {
			// check status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check that CE header is missing
			Header ceHeader = entity.getContentEncoding();
			assertNull(
					"No \"Content-Encoding\" header should be returned for \"identity\" content-coding",
					ceHeader);

			// check that content has not been transformed
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);
			byte[] actuals = EntityUtils.toByteArray(entity);
			Assert.assertArrayEquals(
					"Identity content-coding should not transform the content",
					expecteds, actuals);
		} finally {
			EntityUtils.consume(entity);
		}

	}

	/**
	 * <b>Implements:</b> ContentCoding07
	 * <p/>
	 * Check that the content-coding value is case-insensitive
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.5
	 */
	@Test
	public void testContentCodingValueIsCaseInsensitive() {
		String url = "tocompress.html";
		String[] formats = Settings.getSupportedContentCoding();
		for (String ce : formats) {
			try {
				// Get response when ce value in lower case
				HttpGet request0 = new HttpGet(url);
				request0.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
				HttpResponse response0 = executeRequest(request0);
				Header ceHeader0 = response0.getEntity().getContentEncoding();
				String ceValue0 = ceHeader0 != null ? ceHeader0.getValue()
						: null;

				// Get response when ce value in upper case
				HttpGet request1 = new HttpGet(url);
				request1.addHeader(HttpHeaders.ACCEPT_ENCODING,
						ce.toUpperCase());
				HttpResponse response1 = executeRequest(request0);

				Header ceHeader1 = response1.getEntity().getContentEncoding();
				String ceValue1 = ceHeader1 != null ? ceHeader1.getValue()
						: null;

				// compare both of responses
				assertEqualsStatusCode(HttpStatus.SC_OK, response1);
				assertEquals(ce
						+ " content coding format should be case-insensitive",
						ceValue1, ceValue0);

			} catch (Exception e) {
				fail(e.getMessage());
			}
		}
	}

	/**
	 * <b>Implements:</b> ContentCoding08
	 * <p/>
	 * Check that server returns 406 (Not Acceptable) status code when it cannot
	 * send a response which is acceptable according to the Accept-Encoding
	 * header.
	 * <p/>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturns406WhenContentCodingIsUnknown()
			throws Exception {
		String url = "/tocompress.html";
		String ce = "whatever";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request);

		assertEquals("Compress coding should not be supported for now (406)",
				HttpStatus.SC_NOT_ACCEPTABLE, response.getStatusLine()
						.getStatusCode());

	}

	/**
	 * <b>Implements:</b> ContentCoding09
	 * <p/>
	 * Check that the server return 406 Not Acceptable for "compress" format.
	 * <p/>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.3 & Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCompressContentCodingIsNotSupportedAndReturnsNotAcceptableStatusCode()
			throws Exception {

		String url = "/tocompress.html";
		String ce = "compress";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request);

		assertEquals("Compress coding should not be supported for now (406)",
				HttpStatus.SC_NOT_ACCEPTABLE, response.getStatusLine()
						.getStatusCode());

	}

	/**
	 * <b>Implements:</b> ContentCoding10
	 * <p/>
	 * Check that the server return 406 Not Acceptable for "x-compress" format.
	 * <p/>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.3 & Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	public void testXCompressContentCodingIsNotSupportedAndReturnsNotAcceptableStatusCode()
			throws Exception {

		String url = "/tocompress.html";
		String ce = "x-compress";
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		HttpResponse response = executeRequest(request);

		assertEquals("x-compress coding should not be supported for now (406)",
				HttpStatus.SC_NOT_ACCEPTABLE, response.getStatusLine()
						.getStatusCode());

	}

	/**
	 * <b>Implements:</b> ContentCoding11
	 * <p/>
	 * Check that server should respond with a status code of 415 (Unsupported
	 * Media Type) if the content-coding of an entity in a request message is
	 * not acceptable
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWith415WhenRequestEntityContentCodingIsNotAcceptable()
			throws Exception {
		String ce = "unknown";
		HttpPost request = new HttpPost("/echoBody/");
		StringEntity entity = new StringEntity("whatever");
		entity.setContentEncoding(ce);
		request.setEntity(entity);
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE, response);
	}

	/**
	 * <b>Implements:</b> ContentCoding12
	 * <p/>
	 * Check that server accepts a request entity encoded with "deflate".
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRecognizesDeflateEncodedRequestEntity()
			throws Exception {

		String ce = "deflate";
		String charset = Constants.UTF_8;
		String mt = Constants.PLAIN_TEXT_TYPE;
		String ct = mt + Constants.CHARSET_PARAM + charset;

		byte[] expecteds = "Hello".getBytes();// RandomStringUtils.random(125).getBytes(charset);

		// logger.debug("Origin data length: " + expecteds.length);

		// Create the compressor with highest level of compression
		Deflater compressor = new Deflater();
		compressor.setLevel(Deflater.BEST_COMPRESSION);

		// Give the compressor the data to compress
		compressor.setInput(expecteds);
		compressor.finish();

		// Create an expandable byte array to hold the compressed data.
		// You cannot use an array that's the same size as the orginal because
		// there is no guarantee that the compressed data will be smaller than
		// the uncompressed data.
		ByteArrayOutputStream bos = new ByteArrayOutputStream(expecteds.length);

		// Compress the data
		byte[] buf = new byte[1024];
		while (!compressor.finished()) {
			int count = compressor.deflate(buf);
			bos.write(buf, 0, count);
		}
		try {
			bos.close();
		} catch (IOException e) {
		}

		// Get the compressed data
		byte[] compressedData = bos.toByteArray();

		// logger.debug("Compressed data length: " + compressedData.length);
		// logger.debug("Compressed data as string: "
		// + new String(compressedData, "UTF-8"));

		// entity
		ByteArrayEntity reqEntity = new ByteArrayEntity(compressedData);
		reqEntity.setContentType(ct);
		reqEntity.setContentEncoding(ce);

		// request
		HttpPost request = new HttpPost("/echoBody/");
		request.setEntity(reqEntity);

		// response
		HttpResponse response = executeRequest(request, false);
		HttpEntity resEntity = response.getEntity();

		try {
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			byte[] actuals = EntityUtils.toByteArray(resEntity);
			// logger.debug("Response data length: " + actuals.length);
			// logger.debug("Response data as string: " + new String(actuals,
			// "UTF-8"));

			// Create the decompressor and give it the data to compress
			Inflater decompressor = new Inflater();
			decompressor.setInput(compressedData);

			// Create an expandable byte array to hold the decompressed data
			ByteArrayOutputStream bos1 = new ByteArrayOutputStream(
					compressedData.length);

			// Decompress the data
			byte[] buf1 = new byte[1024];
			while (!decompressor.finished()) {
				try {
					int count = decompressor.inflate(buf1);
					bos1.write(buf1, 0, count);
				} catch (DataFormatException e) {
				}
			}
			try {
				bos1.close();
			} catch (IOException e) {
			}

			// Get the decompressed data
			// byte[] decompressedData = bos1.toByteArray();
			// logger.debug("Decompressed data length: " +
			// decompressedData.length);
			// logger.debug("Decompressed data as string: "
			// + new String(decompressedData));
			Assert.assertArrayEquals("Wrong response content", expecteds,
					actuals);
		} finally {
			EntityUtils.consume(resEntity);
		}

	}

	/**
	 * <b>Implements:</b> ContentCoding13
	 * <p/>
	 * Check that server accepts a request entity encoded with "gzip".
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRecognizesGzipEncodedRequestEntity()
			throws Exception {

		String ce = "gzip";
		String charset = Constants.UTF_8;
		String mt = Constants.PLAIN_TEXT_TYPE;
		String ct = mt + Constants.CHARSET_PARAM + charset;

		byte[] expecteds = "Hello".getBytes();// RandomStringUtils.random(125).getBytes(charset);

		// logger.debug("Origin data length: " + expecteds.length);

		// Create an expandable byte array to hold the compressed data.
		ByteArrayOutputStream bos = new ByteArrayOutputStream(expecteds.length);

		// Compress the data
		GZIPOutputStream gzipper = new GZIPOutputStream(bos);
		gzipper.write(expecteds);
		gzipper.close();

		// Get the compressed data
		byte[] compressedData = bos.toByteArray();

		// logger.debug("Compressed data length: " + compressedData.length);
		// logger.debug("Compressed data as string: "
		// + new String(compressedData, "UTF-8"));

		// entity
		ByteArrayEntity reqEntity = new ByteArrayEntity(compressedData);
		reqEntity.setContentType(ct);
		reqEntity.setContentEncoding(ce);

		// request
		HttpPost request = new HttpPost("/echoBody/");
		request.setEntity(reqEntity);

		// response
		HttpResponse response = executeRequest(request, false);
		HttpEntity resEntity = response.getEntity();
		byte[] actuals = EntityUtils.toByteArray(resEntity);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// logger.debug("Response data length: " + actuals.length);
		// logger.debug("Response data as string: " + new String(actuals,
		// "UTF-8"));
		Assert.assertArrayEquals("Wrong response content", expecteds, actuals);

	}

	/**
	 * <b>Implements:</b> ContentCoding14
	 * <p/>
	 * Check that server accepts a request entity encoded with "x-gzip".
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRecognizesXGzipEncodedRequestEntity()
			throws Exception {

		String ce = "x-gzip";
		String charset = Constants.UTF_8;
		String mt = Constants.PLAIN_TEXT_TYPE;
		String ct = mt + Constants.CHARSET_PARAM + charset;

		byte[] expecteds = RandomStringUtils.random(125).getBytes(charset);

		// logger.debug("Origin data length: " + expecteds.length);

		// Create an expandable byte array to hold the compressed data.
		ByteArrayOutputStream bos = new ByteArrayOutputStream(expecteds.length);

		// Compress the data
		GZIPOutputStream gzipper = new GZIPOutputStream(bos);
		gzipper.write(expecteds);
		gzipper.close();

		// Get the compressed data
		byte[] compressedData = bos.toByteArray();

		// logger.debug("Compressed data length: " + compressedData.length);

		// entity
		ByteArrayEntity reqEntity = new ByteArrayEntity(compressedData);
		reqEntity.setContentType(ct);
		reqEntity.setContentEncoding(ce);

		// request
		HttpPost request = new HttpPost("/echoBody/");
		request.setEntity(reqEntity);

		// response
		HttpResponse response = executeRequest(request, false);
		HttpEntity resEntity = response.getEntity();
		byte[] actuals = EntityUtils.toByteArray(resEntity);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		Assert.assertArrayEquals("Wrong response content", expecteds, actuals);

	}

	/**
	 * <b>Implements:</b> ContentCoding15
	 * <p/>
	 * Check that server returns 415 (Unsupported Media Type) for "compress"
	 * format.
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWith415ForCompressFormat()
			throws Exception {
		String ce = "compress";
		HttpPost request = new HttpPost("/echoBody/");
		StringEntity entity = new StringEntity("whatever");
		entity.setContentEncoding(ce);
		request.setEntity(entity);

		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE, response);
	}
	
	@Test
	public void testThatServerRecognizesCompressEncodedRequestEntity()
			throws Exception {

		String ce = "compress";
		String charset = Constants.UTF_8;
		String mt = Constants.PLAIN_TEXT_TYPE;
		String ct = mt + Constants.CHARSET_PARAM + charset;

		byte[] expecteds = "Hello".getBytes();// RandomStringUtils.random(125).getBytes(charset);

		// logger.debug("Origin data length: " + expecteds.length);

		// Create an expandable byte array to hold the compressed data.
		ByteArrayOutputStream bos = new ByteArrayOutputStream(expecteds.length);

		// Compress the data
		ZipOutputStream zipper = new ZipOutputStream(bos);
		zipper.putNextEntry(new ZipEntry("Hello"));
		zipper.write(expecteds);
		zipper.closeEntry();
		zipper.close();

		// Get the compressed data
		byte[] compressedData = bos.toByteArray();

		// logger.debug("Compressed data length: " + compressedData.length);
		// logger.debug("Compressed data as string: "
		// + new String(compressedData, "UTF-8"));

		// entity
		ByteArrayEntity reqEntity = new ByteArrayEntity(compressedData);
		reqEntity.setContentType(ct);
		reqEntity.setContentEncoding(ce);

		// request
		HttpPost request = new HttpPost("/echoBody/");
		request.setEntity(reqEntity);

		// response
		HttpResponse response = executeRequest(request, false);
		HttpEntity resEntity = response.getEntity();
		byte[] actuals = EntityUtils.toByteArray(resEntity);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// logger.debug("Response data length: " + actuals.length);
		// logger.debug("Response data as string: " + new String(actuals,
		// "UTF-8"));
		Assert.assertArrayEquals("Wrong response content", expecteds, actuals);

	}

	/**
	 * <b>Implements:</b> ContentCoding16
	 * <p/>
	 * Check that server returns 415 (Unsupported Media Type) for "compress"
	 * format.
	 * <p/>
	 * <b>Reference:</b> SPEC689(RFC2616) 3.5 & SPEC698(RFC2616) 14.11 &
	 * Functional specifications 3/Lot 1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWith415ForXCompressFormat()
			throws Exception {
		String ce = "x-compress";
		HttpPost request = new HttpPost("/echoBody/");
		StringEntity entity = new StringEntity("whatever");
		entity.setContentEncoding(ce);
		request.setEntity(entity);

		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE, response);
	}

	/**
	 * <b>Implements:</b> ContentCoding17
	 * <p/>
	 * Check that server compress only when content length is greater than 1ko
	 * <p/>
	 * <b>Reference:</b> Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServercCompressOnlyWhenLengthGreaterThan1Ko()
			throws Exception {
		String path;
		String url;
		String ce;
		HttpGet request;
		HttpResponse response;
		HttpEntity entity;
		// create a resource with length less than 1ko
		url = "/lessThan1ko.txt";
		path = getDefaultProjectWebFolderPath() + url;
		assertTrue(Utils.createRandomContent(path, 1023));
		// compress
		ce = "gzip";
		request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
		response = executeRequest(request, false);
		entity = response.getEntity();

		try {
			// check the content-encoding
			assertNull(
					"Server should not compress content with length less than or equal 1ko",
					entity.getContentEncoding());

			// check that content has not been transformed
			File file = new File(getDefaultProjectWebFolderPath()
					+ url);
			byte[] expecteds = FileUtils.readFileToByteArray(file);
			byte[] actuals = EntityUtils.toByteArray(response.getEntity());
			Assert.assertArrayEquals(
					"Server should not compress content with length less than or equal 1ko",
					expecteds, actuals);
			// create a resource with length greater 1ko
			url = "/greaterThan1ko.txt";
			path = getDefaultProjectWebFolderPath() + url;
			assertTrue(Utils.createRandomContent(path, 1025));
			// request compress
			request = new HttpGet(url);
			request.addHeader(HttpHeaders.ACCEPT_ENCODING, ce);
			response = executeRequest(request);
			entity = response.getEntity();
			assertNotNull(
					"Server should compress content with length greater than 1ko",
					response.getEntity().getContentEncoding());
			// No need to check out the gzip compression when it has been done
			// an
			// aforementioned test
		} finally {
			EntityUtils.consume(entity);
		}
	}
	
	private String getDefaultProjectWebFolderPath() {
		return Settings.getDefaultProjectWebFolderPath();
	}


}

class DecompressingEntity extends HttpEntityWrapper {

	private String ce;

	public DecompressingEntity(final HttpEntity entity, String format) {
		super(entity);
		this.ce = format;
	}

	@Override
	public InputStream getContent() throws IOException, IllegalStateException {

		InputStream wrappedin = wrappedEntity.getContent();

		if (ce.equals("identity") || ce.equals("") || ce.equals("*")) {
			return wrappedin;
		}
		if (ce.equals("deflate")) {
			return new InflaterInputStream(wrappedin);
		}
		if (ce.equals("gzip") || ce.equals("x-gzip")) {
			return new GZIPInputStream(wrappedin);
		}
		if (ce.equals("compress") || ce.equals("x-compress")) {

		}
		return null;

	}

	@Override
	public long getContentLength() {

		return -1;
	}
}
