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
public class Average extends AbstractTestCase {



	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}




	@Test
	public void testAverageForTypeLong() throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Double actual = Double.parseDouble(source);
				assertEquals( Constants.EXPECTED_LONG_AVERAGE ,actual);

			}
		});

	}

	@Test
	public void testAverageForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Double actual = Double.parseDouble(source);
				assertEquals(Constants.EXPECTED_BYTE_AVERAGE,actual);

			}
		});
	}

	@Test
	public void testAverageForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Double actual = Double.parseDouble(source);
				assertEquals( Constants.EXPECTED_WORD_AVERAGE,actual);

			}
		});
	}

	@Test
	public void testAverageForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals( Constants.EXPECTED_LONG64_AVERAGE,actual);

			}
		});
	}

	@Test
	public void testAverageForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals(Constants.EXPECTED_DURATION_AVERAGE,actual);

			}
		});
	}
	
	@Test
	public void testAverageOfLargeNumbers() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.AVERAGE);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				String actual = String.valueOf(source);
				assertEquals( "null",actual);

			}
		});
	}


}
