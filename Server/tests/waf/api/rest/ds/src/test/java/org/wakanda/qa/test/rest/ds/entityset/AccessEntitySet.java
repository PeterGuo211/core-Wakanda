package org.wakanda.qa.test.rest.ds.entityset;

import static org.junit.Assert.*;

import org.apache.http.HttpResponse;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
//import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class AccessEntitySet extends AbstractTestCase {

//	private RESTRequestBuilder getDefaultRestRequestBuilder() {
//		return getRESTRequestBuilder("Complex", Complex.class);
//	}
	private RESTRequestBuilder getDefaultRestRequestBuilderSimple() {
		return getRESTRequestBuilder("Simple", Simple.class);
	}
	
	
//	@Test
//	public void testAccessToEntitySetFiledIsSuccessfulWhenCreatedForAQueryWithIndexedAttributeWhenDCIsComplex()
//			throws Throwable {
//		RESTRequestBuilder uri = getDefaultRestRequestBuilder().timeout(20);
//		uri.filter("\"ID<3\"").method("entityset");
//
//		check(uri.buildRequest(), new ResponseHandler() {
//
//			public void handleResponse(HttpResponse response) throws Throwable {
//				String UUID = new String("");
//				String headerValue = response.getHeaders("Content-Location")[0]
//						.getValue();
//				assertNotNull(headerValue);
//				assertNotSame("", headerValue);
//				String[] a = headerValue.split("/");
//				assertNotNull(a);
//				assertEquals(5, a.length);
//				UUID = a[a.length - 1];
//				System.out
//						.println("UUID of the created entityset is : " + UUID);
//				RESTRequestBuilder uri2 = getDefaultRestRequestBuilder()
//						.addEntitySet(UUID);
//				checkEntities("25-1", uri2);
//
//
//			}
//		});
//	}
	
	
//	@Test
//	public void testAccessToEntitySetFiledIsSuccessfulWhenCreatedForAQueryWithNonIndexedAttributeWhenDCIsComplex()
//			throws Throwable {
//		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
//		uri.filter("\"as_byte<30\"").method("entityset").timeout(20);
//
//		check(uri.buildRequest(), new ResponseHandler() {
//
//			public void handleResponse(HttpResponse response) throws Throwable {
//				String UUID = new String("");
//				String headerValue = response.getHeaders("Content-Location")[0]
//						.getValue();
//				assertNotNull(headerValue);
//				assertNotSame("", headerValue);
//				String[] a = headerValue.split("/");
//				assertNotNull(a);
//				assertEquals(5, a.length);
//				UUID = a[a.length - 1];
//				System.out
//						.println("UUID of the created entityset is : " + UUID);
//				RESTRequestBuilder uri2 = getDefaultRestRequestBuilder()
//						.addEntitySet(UUID);
//				checkEntities("25-2", uri2);
//
//
//			}
//		});
//	}
	
	@Test
	public void testAccessToEntitySetFiledIsSuccessfulWhenCreatedForAQueryWithIndexedAttributeWhenDCIsSimple()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple().timeout(20);
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
						.addEntitySet(UUID);
				checkEntities("25-4", uri2);


			}
		});
	}
	
	@Test
	public void testAccessToEntitySetFiledIsSuccessfulWhenCreatedForAQueryWithNonIndexedAttributeWhenDCIsSimple()
			throws Throwable {
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple().timeout(20);
		uri.filter("\"as_long<0\"").method("entityset");

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
						.addEntitySet(UUID);
				checkEntities("25-5", uri2);


			}
		});
	}

}