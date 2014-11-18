package org.wakanda.qa.test.rest.ds.entityset;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class SavedOrderBy extends AbstractTestCase {

	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}
	private RESTRequestBuilder getDefaultRestRequestBuilderSimple() {
		return getRESTRequestBuilder("Simple", Simple.class);
	}
	
	@Test
	public void testSavedOrderByExists() throws Throwable{
		
		// build rest query with entityset property
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().timeout(20);
		uri.filter("\"ID<4\"").savedfilter("\"ID<4\"").orderby("salary").savedorderby("salary").method("entityset");
		logger.debug(uri);
		//verify that server returns OK 200
		assertEqualsStatusCode(HttpStatus.SC_OK, uri.buildRequest());
		
	}
	
	@Test
	public void testSavedOrderByPerformsActionSuccessfullyWhenDataClassIsComplex() throws Throwable{
		RESTRequestBuilder uri2 = getDefaultRestRequestBuilder();
//http://localhost:8081/rest/Complex/?$filter=%22ID%3C4%22&$savedfilter=%22ID%3C4%22&$orderby=%22as_byte%22&$savedorderby=%22as_byte%22&$method=entityset
		// build rest query with saveFilder proprety
		uri2.filter("\"ID<4\"").savedfilter("\"ID<4\"").orderby("salary").savedorderby("salary").method("entityset");
		check(uri2.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				StringBuilder UUID = new StringBuilder("");
				StringBuilder headerValue = new StringBuilder("");
				// get header value containing the link to the created entity set
				
				headerValue.append(response.getHeaders("Content-Location")[0]
						.getValue());
				// verify that header is not null or empty string
				
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				// get the uuid of the entity set
				
				String[] a = headerValue.toString().split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID.append(a[a.length - 1]);
				logger.debug("UUID of the created entityset is : " + UUID);

				
				// build the rest uri to query the entity to release the entityset
				
				RESTRequestBuilder uri2 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID.toString()).method("release");
				checkEntities("25-3", uri2);
				
				//check that entity is removed
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID.toString());
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());
				
				//give a new birth to the entity using the saved filter
				RESTRequestBuilder uri4 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID.toString()).savedfilterquery("\"ID=3\"");
				
				assertEqualsStatusCode(HttpStatus.SC_OK, uri4.buildRequest());

			}
		});

		
		
	}
	
	@Test
	public void testSavedFilterPerformsActionSuccessfullyWhenDataClassIsSimple() throws Throwable{
		
		RESTRequestBuilder uri2 = getDefaultRestRequestBuilderSimple();

		// build rest query with saveFilder proprety
		uri2.filter("\"ID<4\"").savedfilter("\"ID<4\"").orderby("salary").savedorderby("salary").method("entityset");
		check(uri2.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				StringBuilder UUID = new StringBuilder("");
				StringBuilder headerValue = new StringBuilder("");
				// get header value containing the link to the created entity set
				
				headerValue.append(response.getHeaders("Content-Location")[0]
						.getValue());
				// verify that header is not null or empty string
				
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				// get the uuid of the entity set
				
				String[] a = headerValue.toString().split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID.append(a[a.length - 1]);
				logger.debug("UUID of the created entityset is : " + UUID);
				
				// build the rest uri to query the entity to release the entityset
				
				RESTRequestBuilder uri2 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID.toString()).method("release");
				checkEntities("25-3", uri2);
				
				//check that entity is removed
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID.toString());
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());
				
				//give a new birth to the entity using the saved filter
				RESTRequestBuilder uri4 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID.toString()).savedfilterquery("\"ID=3\"");
				
				assertEqualsStatusCode(HttpStatus.SC_OK, uri4.buildRequest());

			}
		});

		
		
	}

	


}
