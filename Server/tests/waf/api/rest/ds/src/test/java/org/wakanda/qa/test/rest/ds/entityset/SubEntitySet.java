package org.wakanda.qa.test.rest.ds.entityset;



import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpResponse;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;


public class SubEntitySet extends AbstractTestCase {

	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex(1)", Complex.class);
	}

	
	@Test
	public void testSubEntityCreationIsSuccessful() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
		uri.addTable("ars_slave1")
				.addParameters(
						ArrayUtils.toArray(new BasicNameValuePair(
								Constants.EXPAND, String.valueOf("ars_slave1"))))
				.method("subentityset");
		
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
	public void testSubOrderbyIsSuccessful() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder();
		uri.addTable("ars_slave1")
				.addParameters(
						ArrayUtils.toArray(new BasicNameValuePair(
								Constants.EXPAND, String.valueOf("ars_slave1"))))
				.method("subentityset")
				.addParameters(
						ArrayUtils.toArray(new BasicNameValuePair(
								"$subOrderby",String.valueOf("as_string asc"))));
		
		String u = uri.getURI().toString().replace("+", "%20").substring(6);
		
		RESTRequestBuilder uri2 = new RESTRequestBuilder(u);
	
		
		check(uri2.buildRequest(), new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals2("26", response, Complex.class);
			}
		});
		

	}
	
	

}
