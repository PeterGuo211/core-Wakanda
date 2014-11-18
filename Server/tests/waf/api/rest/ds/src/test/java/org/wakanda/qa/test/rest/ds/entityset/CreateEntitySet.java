package org.wakanda.qa.test.rest.ds.entityset;

import static org.junit.Assert.*;

import org.apache.http.HttpResponse;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class CreateEntitySet extends AbstractTestCase{
	
	private  RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}
	
	private  RESTRequestBuilder getDefaultRestRequestBuilderSimple() {
		return getRESTRequestBuilder("Simple", Simple.class);
	}
	
	@Test
	public void testCreateEntitySetQueryingAnIndexedFiledIsSuccessfulWhenDataClassIsComplex() throws Throwable{
		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
		uri.filter("\"ID<3\"").method("entityset");
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String headerValue = response.getHeaders("Content-Location")[0].getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				System.out.println("UUID of the created entityset is : " + a[a.length - 1]);
				

			}
		});
		}
	
	@Test
	public void testCreateEntitySetQueryingANotIndexedFiledIsSuccessfulWhenDataClassIsComplex() throws Throwable{
		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
		uri.filter("\"as_byte<30\"").method("entityset");
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String headerValue = response.getHeaders("Content-Location")[0].getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				System.out.println("UUID of the created entityset is : " + a[a.length - 1]);
				

			}
		});
		}
	
	
	
	@Test
	public void testCreateEntitySetQueryingAnIndexedFiledIsSuccessfulWhenDataClassIsSimple() throws Throwable{
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple();
		uri.filter("\"ID<3\"").method("entityset");
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String headerValue = response.getHeaders("Content-Location")[0].getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				System.out.println("UUID of the created entityset is : " + a[a.length - 1]);
				

			}
		});
		}
	
	@Test
	public void testCreateEntitySetQueryingANotIndexedFiledIsSuccessfulWhenDataClassIsSimple() throws Throwable{
		RESTRequestBuilder uri = getDefaultRestRequestBuilderSimple();
		uri.filter("\"as_long>0\"").method("entityset");
		
		check(uri.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				String headerValue = response.getHeaders("Content-Location")[0].getValue();
				assertNotNull(headerValue);
				assertNotSame("", headerValue);
				String[] a = headerValue.split("/");
				assertNotNull(a);
				assertEquals(5, a.length);
				System.out.println("UUID of the created entityset is : " + a[a.length - 1]);
				

			}
		});
		}
}
	
