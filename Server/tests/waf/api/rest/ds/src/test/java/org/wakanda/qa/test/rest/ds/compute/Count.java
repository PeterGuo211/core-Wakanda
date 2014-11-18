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
public class Count extends AbstractTestCase {


	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}



	@Test
	public void testCountForTypeLong() throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});

	}

	@Test
	public void testCountForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountOfTypeNumber() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountOfTypeString() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.STRING.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT, actual);

			}
		});
	}

	@Test
	public void testCountOfTypeDate() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DATE.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);

				assertEquals(Constants.EXPECTED_COUNT,actual);

			}
		});
	}
	@Test
	public void testCountOfTypeUuid() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.UUID.getArray()).compute(Constants.COUNT);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_COUNT,actual);

			}
		});
	}

}
