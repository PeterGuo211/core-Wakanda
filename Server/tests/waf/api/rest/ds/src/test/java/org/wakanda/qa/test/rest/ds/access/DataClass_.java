/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.DataClass;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.domain.EntitiesResult;
import org.wakanda.qa.commons.server.rest.util.MyDS;
import org.wakanda.qa.commons.server.rest.util.MyGson;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
//import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.domain.Stamp;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class DataClass_ extends AbstractTestCase {

	@Test
	public void testEntityModelPropertyIsSentWithRightValue() throws Throwable {
		final String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DataClass<Simple> dsu = getDSClient().getDataClass(Simple.class);
				// Get Response entities
				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);
				// Check property existance and value
				assertEquals(dataClass, actual.getEntityModel());
			}
		});
	}
	
	@Test
	public void testCountPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DataClass<Simple> dsu = getDSClient().getDataClass(Simple.class);
				// Get Response entities
				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);
				// Check property existance and value
				assertEquals(5, actual.getCount());
			}
		});
	}

	@Test
	public void testSentPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DataClass<Simple> dsu = getDSClient().getDataClass(Simple.class);
				// Get Response entities
				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);
				// Check property existance and value
				assertEquals(5, actual.getSent());
			}
		});
	}

	@Test
	public void testFirstPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DataClass<Simple> dsu = getDSClient().getDataClass(Simple.class);
				// Get Response entities
				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);
				// Check property existance and value
				assertEquals(0, actual.getFirst());
			}
		});
	}

	@Test
	public void testEntitiesPropertyIsSentWithAllEntitiesWhenDataClassIsSimple()
			throws Throwable {
		// Parameters
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals("01", response, Simple.class);
			}
		});
	}
	

//	@Test
//	public void testEntitiesPropertyIsSentWithAllEntitiesWhenDataClassIsComplex()
//			throws Throwable {
//		// Parameters
//		String dataClass = "Complex";
//		// Request
//		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();
//		System.out.println(new RESTRequestBuilder(dataClass).getURI());
//		check(request, new ResponseHandler() {
//
//			public void handleResponse(HttpResponse response) throws Throwable {
//				assertEntitiesEquals("02", response, Complex.class);
//			}
//		});
//	}

	@Test
	public void testEntityKeyPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		String key = "1";
		// Request
		RESTRequestBuilder rb = new RESTRequestBuilder();
		HttpRequest request = rb.addDataClass(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get result entitiy
				Simple e = MyGson.fromJson(response, Simple.class);
				// Check status code
				assertEqualsStatusCode(HttpStatus.SC_OK, response);
				// Check property existance and value
				assertEquals("1", e.getKey());
			}
		});
	}

	@Test
	public void testEntityStampPropertyIsSentWithRightValue() throws Throwable {
		final String dataClass = "Stamp";
		String key = "1";
		// Request
		RESTRequestBuilder rb = new RESTRequestBuilder();
		final HttpRequest request = rb.addDataClass(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get result entitiy
				final Stamp e = MyGson.fromJson(response, Stamp.class);
				// Check property existance and value
				assertTrue(e.getStamp() > 0);

				// Update the entity
				e.setASLong(e.getASLong() + 1);
				HttpRequest reqUpdate = MyDS
						.getUpdateRequest(dataClass, e);
				assertEqualsStatusCode(HttpStatus.SC_OK, reqUpdate);

				// Get the entity again
				check(request, new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						// Get result entitiy
						Stamp ne = MyGson.fromJson(response, Stamp.class);
						// Check status code
						assertEqualsStatusCode(HttpStatus.SC_OK, response);
						// Check property existance and value
						assertEquals(Integer.valueOf(e.getStamp() + 1),
								ne.getStamp());

					}
				});

			}
		});
	}

}
