package org.p4d.qa.test.rest.access;

import static org.junit.Assert.*;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.p4d.qa.test.rest.extend.AbstractTestCase;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.Table;
import org.wakanda.qa.commons.server.rest.domain.EntitiesResult;
import org.wakanda.qa.commons.server.rest.util.Gson4D;
import org.wakanda.qa.commons.server.rest.util.MyDS;
import org.wakanda.qa.commons.server.rest.util.MyGson;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.p4d.qa.test.rest.domain.Stamp;

//import org.p4d.qa.test.rest.domain.Complex;
import org.p4d.qa.test.rest.domain.Simple;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class Table4D extends AbstractTestCase {

	
	
	
	/**
	 * Check that count proprety returns the expected value
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testCountPropertyReturnsTheRightValue() throws Throwable {
		
		String dataClass = "Simple";
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();
		
		check(request, new ResponseHandler() {
			
			public void handleResponse(HttpResponse response) throws Throwable {
				Table<Simple> dsu = getDSClient().getTable(Simple.class);
				EntitiesResult<Simple> actual = dsu.getEntitiesResult(response);
				assertEquals(10, actual.getCount());
				
			}
		},getSessionHttpContext());
		
	}
	


	@Test
	public void testEntitiesPropertyIsSentWithAllEntitieseWhenTableIsSimple() throws Throwable{
		
		String table = "Simple";
		HttpRequest request = new RESTRequestBuilder(table).buildRequest();
		check(request,new ResponseHandler() {
			
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals("01", response, Simple.class);
				
			}
		},getSessionHttpContext());
	}
	

	
//	@Test
//	public void testEntitiesPropertyIsSentWithAllEntitiesWhenTableIsComplex() throws Throwable{
//		
//		String table = "Complex";
//		HttpRequest request = new RESTRequestBuilder(table).buildRequest();
//		check(request,new ResponseHandler() {
//			
//			public void handleResponse(HttpResponse response) throws Throwable {
//				assertEntitiesEquals("02", response, Complex.class);
//				
//			}
//		},getSessionHttpContext());
//	}
	

	
	@Test
	public void testEntityKeyPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		String key = "7554";
		RESTRequestBuilder rb = new RESTRequestBuilder();
		HttpRequest request = rb.addTable(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				
				Simple e = Gson4D.fromJson(response, Simple.class);
				assertEqualsStatusCode(HttpStatus.SC_OK, response);
				assertEquals("7554", e.getKey());
			
			}
		},getSessionHttpContext());
	}
	
	@Test
	public void testEntityStampPropertyIsSentWithRightValue() throws Throwable {
		final String dataClass = "Stamp";
		String key = "29985";
		// Request
		RESTRequestBuilder rb = new RESTRequestBuilder();
		final HttpRequest request = rb.addTable(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {

				final Stamp e = MyGson.fromJson(response, Stamp.class);
				assertTrue(e.getStamp() > 0);
				e.setAs_long(e.getAs_long() + 1);
				HttpRequest reqUpdate = MyDS
						.getUpdateRequest(dataClass, e);
				assertEqualsStatusCode(HttpStatus.SC_OK, reqUpdate,getSessionHttpContext());

				check(request, new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws Throwable {
						Stamp ne = MyGson.fromJson(response, Stamp.class);
						assertEqualsStatusCode(HttpStatus.SC_OK, response);
						assertEquals(Integer.valueOf(e.getStamp() + 1),
								ne.getStamp());

					}
				},getSessionHttpContext());

			}
		},getSessionHttpContext());
	}
	
	
	@Test
	public void testEntityModelPropertyIsSentWithRightValue() throws Throwable {
	final String dataClass = "Simple";
	HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

	check(request, new ResponseHandler() {

		public void handleResponse(HttpResponse response) throws Throwable {
			Table<Simple> dsu = getDSClient().getTable(Simple.class);
			EntitiesResult<Simple> actual = dsu
					.getEntitiesResult(response);
			assertEquals(dataClass, actual.getEntityModel());
		}
	},getSessionHttpContext());
	
	}
	
	
	@Test
	public void testSentPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {

				Table<Simple> dsu = getDSClient().getTable(Simple.class);

				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);

				assertEquals(10, actual.getSent());
			}
		},getSessionHttpContext());
	}

	@Test
	public void testFirstPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				Table<Simple> dsu = getDSClient().getTable(Simple.class);
				EntitiesResult<Simple> actual = dsu
						.getEntitiesResult(response);
				assertEquals(0, actual.getFirst());
			}
		},getSessionHttpContext());
	}

}
