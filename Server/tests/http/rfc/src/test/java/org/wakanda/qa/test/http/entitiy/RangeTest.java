/**
 * 
 */
package org.wakanda.qa.test.http.entitiy;

import static junitparams.JUnitParamsRunner.$;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.IOException;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.math3.random.RandomDataGenerator;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.test.http.Constants;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class RangeTest extends AbstractTestCase {

	private static String data = null;
	private static int instanceLength = 0;
	private static File resource = null;
	private final static String url = "/toCheckRange.tmp";

	private final static int DEFAULT_PARAMS_LENGTH = 10;

	private static class ByteRangeSpec {

		//private static Logger logger = Logger.getLogger(ByteRangeSpec.class);

		private Integer fbp;
		private Integer lbp;

		public ByteRangeSpec(Integer fbp, Integer lbp) {
			this.fbp = fbp;
			this.lbp = lbp;
		}

		public Integer getFirstBytePosition() {
			return fbp;
		}

		public Integer getLastBytePosition() {
			return lbp;
		}

		public Header getRangeHeader() {
			String rangeSpec = fbp + "-" + (lbp == null ? "" : lbp);
			Header hRange = new BasicHeader(HttpHeaders.RANGE,
					Constants.BYTES_UNIT + "=" + rangeSpec);
			return hRange;
		}

		public static ByteRangeSpec getRandomSatisfiableByteRange(
				int instanceLength, boolean lbpNull) {
			RandomDataGenerator rdg = new RandomDataGenerator();
			Integer fbp = rdg.nextInt(0, instanceLength - 2);
			Integer lbp = lbpNull ? null : rdg.nextInt(fbp.intValue(),
					instanceLength - 1);
			return new ByteRangeSpec(fbp, lbp);
		}

		public static ByteRangeSpec getRandomUnsatisfiableByteRange(int eLength) {
			// fbp should be greather than entity-body length and lesser than
			// the lbp
			RandomDataGenerator rdg = new RandomDataGenerator();
			int minRandom = eLength;
			int maxRandom = eLength * 2;

			Integer fbp = rdg.nextInt(minRandom, maxRandom - 1);
			Integer lbp = rdg.nextInt(fbp, maxRandom);
			return new ByteRangeSpec(fbp, lbp);
		}

		public static ByteRangeSpec getRandomSyntacticallyInvalidRange(
				int eLength) {
			ByteRangeSpec valid = getRandomSatisfiableByteRange(eLength, false);
			// inverse fbp and lbp
			Integer fbp = valid.getLastBytePosition();
			Integer lbp = valid.getFirstBytePosition();
			// if fbp == lbp redo the calculation
			if (fbp.equals(lbp)) {
				return getRandomSyntacticallyInvalidRange(eLength);
			}
			return new ByteRangeSpec(fbp, lbp);
		}
	}

	static {
		// Random content of 256 bytes
		data = RandomStringUtils.randomAscii(256);
		instanceLength = data.length();
		// Write it to a file
		resource = new File(Settings.getDefaultProjectWebFolderPath() + url);

		try {
			FileUtils.writeStringToFile(resource, data);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void checkRange(HttpRequest request, String exHContentRange,
			String exContent) throws Exception {

		logger.debug(request.getFirstHeader(HttpHeaders.RANGE));

		// Get response
		HttpResponse response = executeRequest(request, false);

		// Check status-code
		assertEqualsStatusCode(HttpStatus.SC_PARTIAL_CONTENT, response);

		// Check entity length
		HttpEntity entity = response.getEntity();
		logger.debug("Content Length: " + entity.getContentLength());
		assertEquals(exContent.length(), entity.getContentLength());

		// Check Content-Range header
		Header[] hContentRange = response.getHeaders(HttpHeaders.CONTENT_RANGE);
		assertNotNull(hContentRange);
		assertEquals(1, hContentRange.length);
		String acHContentRange = hContentRange[0].getValue();
		logger.debug(hContentRange[0]);
		assertEquals(exHContentRange, acHContentRange);

		// Check entity content
		String acContent = EntityUtils.toString(entity);
		logger.debug("Content: " + acContent);
		assertEquals(exContent, acContent);

		// Accept-Range header
		Header hAcceptRange = response
				.getFirstHeader(HttpHeaders.ACCEPT_RANGES);
		if (hAcceptRange != null) {
			assertEquals(Constants.BYTES_UNIT, hAcceptRange.getValue());
		}
	}

	/**
	 * <b>Description:</b>
	 * <p>
	 * If a syntactically valid byte-range-set includes at least one byte-
	 * range-spec whose first-byte-pos is less than the current length of the
	 * entity-body, or at least one suffix-byte-range-spec with a non- zero
	 * suffix-length, then the byte-range-set is satisfiable. Otherwise, the
	 * byte-range-set is unsatisfiable. If the byte-range-set is unsatisfiable,
	 * the server SHOULD return a response with a status of 416 (Requested range
	 * not satisfiable). Otherwise, the server SHOULD return a response with a
	 * status of 206 (Partial Content) containing the satisfiable ranges of the
	 * entity-body.
	 * </p>
	 * 
	 * <b>Reference:</b>
	 * <p>
	 * RFC2616 14.35.1, 14.16
	 * </p>
	 * 
	 * @param request
	 * @param exHContentRange
	 * @param exContent
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testThatServerReturns_206_WithTheCorrectPartialEntityBodyIfTheRequestedRangeSpecIsSatisfiable(
			HttpRequest request, String exHContentRange, String exContent)
			throws Exception {
		checkRange(request, exHContentRange, exContent);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatServerReturns_206_WithTheCorrectPartialEntityBodyIfTheRequestedRangeSpecIsSatisfiable() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length - 1; i++) {
			// Range
			ByteRangeSpec range = ByteRangeSpec.getRandomSatisfiableByteRange(
					data.length(), false);
			String rangeSpec = range.getFirstBytePosition() + "-"
					+ range.getLastBytePosition();
			Header hRange = new BasicHeader(HttpHeaders.RANGE,
					Constants.BYTES_UNIT + "=" + rangeSpec);

			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(hRange);

			// Expected
			String exContent = data.substring(range.getFirstBytePosition(),
					range.getLastBytePosition() + 1);
			String exHContentRange = Constants.BYTES_UNIT + " " + rangeSpec
					+ "/" + instanceLength;
			params[i] = $(request, exHContentRange, exContent);
		}

		// When fbp equals lbp
		RandomDataGenerator rdg = new RandomDataGenerator();
		int fbp = rdg.nextInt(0, instanceLength - 1);
		String rangeSpec = fbp + "-" + fbp;
		Header hRange = new BasicHeader(HttpHeaders.RANGE, Constants.BYTES_UNIT
				+ "=" + rangeSpec);
		HttpRequest request = new HttpGet(url);
		request.addHeader(hRange);
		String exContent = data.substring(fbp, fbp + 1);
		String exHContentRange = Constants.BYTES_UNIT + " " + rangeSpec + "/"
				+ instanceLength;
		params[params.length - 1] = $(request, exHContentRange, exContent);
		return params;
	}

	/**
	 * 
	 * <b>Description:</b>
	 * <p>
	 * If the last-byte-pos value is present, it MUST be greater than or equal
	 * to the first-byte-pos in that byte-range-spec, or the byte- range-spec is
	 * syntactically invalid. The recipient of a byte-range- set that includes
	 * one or more syntactically invalid byte-range-spec values MUST ignore the
	 * header field that includes that byte-range- set.
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @param request
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testThatServerIgnoresRangeHeaderFieldIfTheRequestedRangeSpecIsSyntacticallyInvalid(
			HttpRequest request) throws Exception {
		logger.debug(request.getFirstHeader(HttpHeaders.RANGE));
		// Get response
		HttpResponse response = executeRequest(request, false);
		logger.debug(response.getFirstHeader(HttpHeaders.CONTENT_RANGE));
		// Check status-code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// Check content length
		HttpEntity entity = response.getEntity();
		assertEquals(resource.length(), entity.getContentLength());

		// Check entity content
		String acContent = EntityUtils.toString(entity);
		assertEquals(data, acContent);

	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatServerIgnoresRangeHeaderFieldIfTheRequestedRangeSpecIsSyntacticallyInvalid() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length; i++) {
			// Range
			ByteRangeSpec range = ByteRangeSpec
					.getRandomSyntacticallyInvalidRange(instanceLength);
			String invaludRangeSpec = range.getFirstBytePosition() + "-"
					+ range.getLastBytePosition();
			Header hRange = new BasicHeader(HttpHeaders.RANGE,
					Constants.BYTES_UNIT + "=" + invaludRangeSpec);

			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(hRange);

			params[i] = $(request);
		}
		return params;
	}

	/**
	 * <b>Description:</b>
	 * <p>
	 * If the last-byte-pos value is absent, or if the value is greater than or
	 * equal to the current length of the entity-body, last-byte-pos is taken to
	 * be equal to one less than the current length of the entity- body in
	 * bytes.
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @throws Exception
	 * 
	 */
	@Test
	@Parameters
	public void testThatIfLastBytePosValueIsAbsentItIsTakenToBeEqualToOneLessThanTheCurrentLengthOfTheEntityBodyInBytes(
			HttpRequest request, String exHContentRange, String exContent)
			throws Exception {
		checkRange(request, exHContentRange, exContent);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatIfLastBytePosValueIsAbsentItIsTakenToBeEqualToOneLessThanTheCurrentLengthOfTheEntityBodyInBytes() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length; i++) {
			// Range
			ByteRangeSpec range = ByteRangeSpec.getRandomSatisfiableByteRange(
					instanceLength, true);

			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(range.getRangeHeader());

			// Expected
			int exLbp = instanceLength - 1;
			String exContent = data.substring(range.getFirstBytePosition(),
					exLbp + 1);
			String exHContentRange = Constants.BYTES_UNIT + " "
					+ range.getFirstBytePosition() + "-" + exLbp + "/"
					+ instanceLength;
			params[i] = $(request, exHContentRange, exContent);
		}

		return params;
	}

	/**
	 * <b>Description:</b>
	 * <p>
	 * If the last-byte-pos value is absent, or if the value is greater than or
	 * equal to the current length of the entity-body, last-byte-pos is taken to
	 * be equal to one less than the current length of the entity- body in
	 * bytes.
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @throws Exception
	 * 
	 */
	@Test
	@Parameters
	public void testThatIfLastBytePosValueIsGreaterThanOrEqualToTheCurrentLengthOfTheEntityBodyItIsTakenToBeEqualToOneLessThanTheCurrentLengthOfTheEntityBodyInBytes(
			HttpRequest request, String exHContentRange, String exContent)
			throws Exception {
		checkRange(request, exHContentRange, exContent);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatIfLastBytePosValueIsGreaterThanOrEqualToTheCurrentLengthOfTheEntityBodyItIsTakenToBeEqualToOneLessThanTheCurrentLengthOfTheEntityBodyInBytes() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length; i++) {
			// Range
			RandomDataGenerator rdg = new RandomDataGenerator();
			int fbp = rdg.nextInt(0, instanceLength - 1);
			int lbp = rdg.nextInt(instanceLength, instanceLength * 2);
			Header hRange = new ByteRangeSpec(fbp, lbp).getRangeHeader();

			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(hRange);

			// Expected
			int exLbp = instanceLength - 1;
			String exContent = data.substring(fbp, exLbp + 1);
			String exHContentRange = Constants.BYTES_UNIT + " " + fbp + "-"
					+ exLbp + "/" + instanceLength;
			params[i] = $(request, exHContentRange, exContent);
		}
		return params;
	}

	/**
	 * 
	 * <b>Description:</b>
	 * <p>
	 * A suffix-byte-range-spec is used to specify the suffix of the
	 * entity-body, of a length given by the suffix-length value. (That is, this
	 * form specifies the last N bytes of an entity-body.)
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @param request
	 * @param exHContentRange
	 * @param exContent
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testThatServerReturns_206_WithTheCorrectPartialEntityBodyIfTheSuffixByteRangeSpecIsUsed(
			HttpRequest request, String exHContentRange, String exContent)
			throws Exception {
		checkRange(request, exHContentRange, exContent);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatServerReturns_206_WithTheCorrectPartialEntityBodyIfTheSuffixByteRangeSpecIsUsed() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length; i++) {
			// Suffix
			RandomDataGenerator rdg = new RandomDataGenerator();
			int n = rdg.nextInt(1, instanceLength);
			String suffixByteRangeSpec = "-" + n;
			Header hRange = new BasicHeader(HttpHeaders.RANGE,
					Constants.BYTES_UNIT + "=" + suffixByteRangeSpec);
			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(hRange);

			// Expected
			int exFbp = instanceLength - n;
			int exLbp = instanceLength - 1;
			String exContent = data.substring(exFbp, exLbp + 1);
			String exHContentRange = Constants.BYTES_UNIT + " " + exFbp + "-"
					+ exLbp + "/" + instanceLength;
			params[i] = $(request, exHContentRange, exContent);
		}
		return params;
	}

	/**
	 * <b>Description:</b>
	 * <p>
	 * If the entity is shorter than the specified suffix-length, the entire
	 * entity-body is used.
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @param request
	 * @param exHContentRange
	 * @param exContent
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testThatIfTheEntityIsShorterThanTheSpecifiedSuffixLengthTheEntireEntityBodyIsUsed(
			HttpRequest request, String exHContentRange, String exContent)
			throws Exception {
		checkRange(request, exHContentRange, exContent);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatIfTheEntityIsShorterThanTheSpecifiedSuffixLengthTheEntireEntityBodyIsUsed() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length; i++) {
			// Suffix
			RandomDataGenerator rdg = new RandomDataGenerator();
			int n = rdg.nextInt(instanceLength, instanceLength * 2);
			String suffixByteRangeSpec = "-" + n;
			Header hRange = new BasicHeader(HttpHeaders.RANGE,
					Constants.BYTES_UNIT + "=" + suffixByteRangeSpec);
			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(hRange);

			// Expected
			int exFbp = 0;
			int exLbp = instanceLength - 1;
			String exContent = data.substring(exFbp, exLbp + 1);
			String exHContentRange = Constants.BYTES_UNIT + " " + exFbp + "-"
					+ exLbp + "/" + instanceLength;
			params[i] = $(request, exHContentRange, exContent);
		}
		return params;
	}

	/**
	 * <b>Description:</b>
	 * <p>
	 * If a syntactically valid byte-range-set includes at least one byte-
	 * range-spec whose first-byte-pos is less than the current length of the
	 * entity-body, or at least one suffix-byte-range-spec with a non- zero
	 * suffix-length, then the byte-range-set is satisfiable. Otherwise, the
	 * byte-range-set is unsatisfiable. If the byte-range-set is unsatisfiable,
	 * the server SHOULD return a response with a status of 416 (Requested range
	 * not satisfiable).
	 * </p>
	 * 
	 * <b>References:</b>
	 * <p>
	 * RFC2616 14.35.1
	 * </p>
	 * 
	 * @param request
	 * @param exHContentRange
	 * @param exContent
	 * @throws Exception
	 */
	@Test
	@Parameters
	public void testThatServerReturns_416_RequestedRangeNotSatisfiableIfTheRequestedByteRangeSpecIsUnsatisfiable(
			HttpRequest request) throws Exception {
		logger.debug(request.getFirstHeader(HttpHeaders.RANGE));
		// Get response
		HttpResponse response = executeRequest(request);

		// Check status-code
		assertEqualsStatusCode(HttpStatus.SC_REQUESTED_RANGE_NOT_SATISFIABLE,
				response);

		// Check Content-Range header
		String exHContentRange = Constants.BYTES_UNIT + "*/" + instanceLength;
		Header[] hContentRange = response.getHeaders(HttpHeaders.CONTENT_RANGE);
		assertNotNull(hContentRange);
		assertEquals(1, hContentRange.length);
		String acHContentRange = hContentRange[0].getValue();
		logger.debug(HttpHeaders.CONTENT_RANGE + ": " + acHContentRange);
		assertEquals(exHContentRange, acHContentRange);

	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestThatServerReturns_416_RequestedRangeNotSatisfiableIfTheRequestedByteRangeSpecIsUnsatisfiable() {
		Object[] params = new Object[DEFAULT_PARAMS_LENGTH];
		for (int i = 0; i < params.length - 1; i++) {
			// When fbp is greater than the entity-body length
			ByteRangeSpec range = ByteRangeSpec
					.getRandomUnsatisfiableByteRange(instanceLength);
			// Request
			HttpRequest request = new HttpGet(url);
			request.addHeader(range.getRangeHeader());
			params[i] = $(request);
		}

		// When suffix-byte-range-spec is unsatisfiable (N=0)
		HttpRequest request = new HttpGet(url);
		Header hRange = new BasicHeader(HttpHeaders.RANGE, "-0");
		request.addHeader(hRange);

		params[params.length - 1] = $(request);
		return params;
	}
}
