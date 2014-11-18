package org.wakanda.qa.test.rest.ds.compute;

import static org.junit.Assert.*;

import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class Min extends AbstractTestCase {



	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}



	@Test
	public void testMinForTypeLong() throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals(Constants.EXPECTED_LONG_MIN, actual);

			}
		});

	}

	@Test
	public void testMinForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Byte actual = Byte.parseByte(source);
				assertEquals(Constants.EXPECTED_BYTE_MIN, actual);

			}
		});
	}

	@Test
	public void testMinForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Short actual = Short.parseShort(source);
				assertEquals(Constants.EXPECTED_WORD_MIN, actual);

			}
		});
	}

	@Test
	public void testMinForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals(Constants.EXPECTED_LONG64_MIN, actual);

			}
		});
	}

	@Test
	public void testMinForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_DURATION_MIN, actual);

			}
		});
	}

	@Test
	public void testMinOfTypeNumber() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Double actual = Double.parseDouble(source);
				assertEquals(Constants.EXPECTED_NUMBER_MIN, actual);

			}
		});
	}

	@Test
	public void testMinOfTypeString() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.STRING.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();
				assertEquals(Constants.EXPECTED_STRING_MIN, actual);

			}
		});
	}

	@Test
	public void testMinOfTypeDate() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DATE.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();

				assertEquals(Constants.EXPECTED_DATE_MIN.substring(0, 11),
						actual.substring(0, 11));

			}
		});
	}
	@Test
	public void testMinOfTypeUuid() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.UUID.getArray()).compute(Constants.MIN);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();
				// logger.debug("actual : " + actual);
				// logger.debug("expected : " +
				// String.valueOf(EXPECTED_STRING_MIN));
				assertEquals(Constants.EXPECTED_UUID_MIN,actual);

			}
		});
	}
}
