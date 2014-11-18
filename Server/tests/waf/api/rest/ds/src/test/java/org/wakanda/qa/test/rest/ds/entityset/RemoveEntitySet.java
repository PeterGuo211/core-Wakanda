package org.wakanda.qa.test.rest.ds.entityset;

import static org.junit.Assert.*;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class RemoveEntitySet extends AbstractTestCase {

	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}
	
	private RESTRequestBuilder getDefaultRestRequestBuilderSimple() {
		return getRESTRequestBuilder("Simple", Simple.class);
	}

	
	@Test
	public void testRemoveToEntitySetIsSuccessfulWhenCreatedForAQueryWithNonIndexedAttributeWhenDataClassIsComplex()
			throws Throwable {
		// build rest query with entityset method
		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
		uri.filter("\"as_byte<30\"").method("entityset");

		check(uri.buildRequest(), new ResponseHandler() {

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

			}
		});
	}
	
	@Test
	public void testRemoveToEntitySetIsSuccessfulWhenCreatedForAQueryWithIndexedAttributeWhenDataClassIsComplex()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder();

		uri.filter("\"ID<30\"").method("entityset");

		check(uri.buildRequest(), new ResponseHandler() {

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
				RESTRequestBuilder uri2 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID.toString()).method("release");
				checkEntities("25-3", uri2);
				
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID.toString());
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());

			}
		});
	}
	
	@Test
	public void testEntitySetIsSuccessfullyRemoveAfterTimeoutofFiveSecondsWhenDataClassIsComplex()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilder();

		uri.filter("\"ID<30\"").method("entityset").timeout(5);
		System.out.println(uri.getURI());
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String UUID = new String("");
				String headerValue = response.getHeaders("Content-Location")[0]
						.getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID = a[a.length - 1];
				System.out
						.println("UUID of the created entityset is : " + UUID);

				Thread.sleep(15000);
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilder()
						.addEntitySet(UUID);
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());

			}
		});
	}
	
	
	
	@Test
	public void testRemoveToEntitySetIsSuccessfulWhenCreatedForAQueryWithNonIndexedAttributeWhenDataClassIsSimple()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple();
		uri.filter("\"as_long>0\"").method("entityset");

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String UUID = new String("");
				String headerValue = response.getHeaders("Content-Location")[0]
						.getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID = a[a.length - 1];
				System.out
						.println("UUID of the created entityset is : " + UUID);
				RESTRequestBuilder uri2 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID).method("release");
				checkEntities("25-3", uri2);
				
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID);
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());

			}
		});
	}
	
	@Test
	public void testRemoveToEntitySetIsSuccessfulWhenCreatedForAQueryWithIndexedAttributeWhenDataClassIsSimple()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple();

		uri.filter("\"ID<3\"").method("entityset");

		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String UUID = new String("");
				String headerValue = response.getHeaders("Content-Location")[0]
						.getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID = a[a.length - 1];
				System.out
						.println("UUID of the created entityset is : " + UUID);
				RESTRequestBuilder uri2 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID).method("release");
				checkEntities("25-3", uri2);
				
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID);
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());

			}
		});
	}
	
	@Test
	public void testEntitySetIsSuccessfullyRemoveAfterTimeoutofFiveSecondsWhenDataClassIsSimple()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple();

		uri.filter("\"ID<3\"").method("entityset").timeout(5);
		System.out.println(uri.getURI());
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String UUID = new String("");
				String headerValue = response.getHeaders("Content-Location")[0]
						.getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				UUID = a[a.length - 1];
				System.out
						.println("UUID of the created entityset is : " + UUID);

				Thread.sleep(15000);
				RESTRequestBuilder uri3 = getDefaultRestRequestBuilderSimple()
						.addEntitySet(UUID);
				assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, uri3.buildRequest());

			}
		});
	}
	

}
