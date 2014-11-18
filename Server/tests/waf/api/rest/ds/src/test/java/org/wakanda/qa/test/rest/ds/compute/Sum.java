package org.wakanda.qa.test.rest.ds.compute;

import static org.junit.Assert.assertEquals;

import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class Sum extends AbstractTestCase {



	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}




	@Test
	public void testSumForTypeLong() throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals(actual, Constants.EXPECTED_LONG_SUM);

			}
		});

	}

	@Test
	public void testSumForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Byte actual = Byte.parseByte(source);
				assertEquals(actual, Constants.EXPECTED_BYTE_SUM);

			}
		});
	}

	@Test
	public void testSumForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Short actual = Short.parseShort(source);
				assertEquals(Constants.EXPECTED_WORD_SUM,actual);

			}
		});
	}

	@Test
	public void testSumForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Long actual = Long.parseLong(source);
				assertEquals( Constants.EXPECTED_LONG64_SUM,actual);

			}
		});
	}

	@Test
	public void testSumForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				Integer actual = Integer.parseInt(source);
				assertEquals( Constants.EXPECTED_DURATION_SUM,actual);

			}
		});
	}
	
	@Test
	public void testSumOfLargeNumbers() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.SUM);

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String source = EntityUtils.toString(response.getEntity());
				String actual = String.valueOf(source);
				assertEquals( "null",actual);

			}
		});
	}

}
