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
public class Max extends AbstractTestCase {


	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}



	@Test
	public void testMAXForTypeLong() throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals(Constants.EXPECTED_LONG_MAX, actual);

			}
		});

	}

	@Test
	public void testMAXForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Byte actual = Byte.parseByte(source);
				assertEquals(Constants.EXPECTED_BYTE_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Short actual = Short.parseShort(source);
				assertEquals(Constants.EXPECTED_WORD_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals(Constants.EXPECTED_LONG64_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_DURATION_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXOfTypeNumber() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Double actual = Double.parseDouble(source);
				assertEquals(Constants.EXPECTED_NUMBER_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXOfTypeString() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.STRING.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();
				assertEquals(Constants.EXPECTED_STRING_MAX, actual);

			}
		});
	}

	@Test
	public void testMAXOfTypeDate() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DATE.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();

				assertEquals(Constants.EXPECTED_DATE_MAX.substring(0, 11),
						actual.substring(0, 11));

			}
		});
	}
	@Test
	public void testMAXOfTypeUuid() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.UUID.getArray()).compute(Constants.MAX);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String actual = EntityUtils.toString(response.getEntity())
						.toString();

				assertEquals(Constants.EXPECTED_UUID_MAX,actual);

			}
		});
	}

}
