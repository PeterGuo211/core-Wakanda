/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder.HttpMethod;
import org.wakanda.qa.commons.server.rest.util.Method;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;
import org.wakanda.qa.test.rest.ds.settings.Settings;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class DataClassMethod extends AbstractTestCase {

	private HttpRequest buildRequest(String dc, Method method,
			HttpMethod httpMethod) throws Throwable {
		RESTRequestBuilder rb = new RESTRequestBuilder(httpMethod);
		rb.addDataClass(dc).addMethod(method);
		HttpRequest request = rb.buildRequest();
		return request;
	}

	private void checkEntities(final Method method, HttpMethod httpMethod,
			final String testResource) throws Throwable {
		HttpRequest request = buildRequest("Method", method, httpMethod);
		logger.debug(request.getRequestLine());
		check(request, new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals(testResource, response,
						org.wakanda.qa.test.rest.ds.domain.Method.class);
			}
		});
	}

	private void checkEntities(final Method method, final String testResource)
			throws Throwable {
		checkEntities(method, HttpMethod.GET, testResource);
	}

	private void checkResult(final Method method, HttpMethod httpMethod,
			final String testResource) throws Throwable {
		HttpRequest request = buildRequest("Method", method, httpMethod);
		logger.debug(request.getRequestLine());
		check(request, new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				String expected = Settings.getExpectedContent(testResource);
				String actual = EntityUtils.toString(response.getEntity());
				assertEquals(expected, actual);
			}
		});
	}
	
	private void checkResult(final Method method,
			final String testResource) throws Throwable {
		checkResult(method, HttpMethod.GET, testResource);
	}

	@Test
	public void testDataClassMethodThatHasNoParamAndReturnsEntityCollection()
			throws Throwable {
		Method method = new Method("mcls_getec", null);
		checkEntities(method, "16");
	}

	@Test
	public void testDataClassMethodThatHasParamAndReturnsEntityCollectionUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getec", ArrayUtils.toArray("2"));
		checkEntities(method, "17");
	}

	@Test
	public void testDataClassMethodThatHasParamAndReturnsEntityCollectionUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getec", ArrayUtils.toArray("2"));
		checkEntities(method, HttpMethod.POST, "17");
	}

	@Test
	public void testDataClassMethodThatHasNoParamAndReturnsArray()
			throws Throwable {
		Method method = new Method("mcls_getar", null);
		checkResult(method, "18");
	}

	@Test
	public void testDataClassMethodThatHasParamAndReturnsArrayUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getar", ArrayUtils.toArray("2"));
		checkResult(method, "19");
	}

	@Test
	public void testDataClassMethodThatHasParamAndReturnsArrayUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getar", ArrayUtils.toArray("2"));
		checkResult(method, HttpMethod.POST, "19");
	}
	
	@Test
	public void testDataClassMethodThatHasNoParamAndReturnsString()
			throws Throwable {
		Method method = new Method("mcls_getString", null);
		checkResult(method, "20");
	}
	
	@Test
	public void testDataClassMethodThatHasParamAndReturnsStringUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getString", ArrayUtils.toArray("string_param", "1"));
		checkResult(method, "21");
	}
	
	@Test
	public void testDataClassMethodThatHasParamAndReturnsStringUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcls_param_getString", ArrayUtils.toArray("\"string_param\"", "1"));
		checkResult(method, HttpMethod.POST, "21");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasNoParamAndReturnsEntityCollection()
			throws Throwable {
		Method method = new Method("mcol_getec", null);
		checkEntities(method, "16");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsEntityCollectionUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getec", ArrayUtils.toArray("2"));
		checkEntities(method, "17");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsEntityCollectionUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getec", ArrayUtils.toArray("2"));
		checkEntities(method, HttpMethod.POST, "17");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasNoParamAndReturnsArray()
			throws Throwable {
		Method method = new Method("mcol_getar", null);
		checkResult(method, "18");
	}

	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsArrayUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getar", ArrayUtils.toArray("2"));
		checkResult(method, "19");
	}

	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsArrayUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getar", ArrayUtils.toArray("2"));
		checkResult(method, HttpMethod.POST, "19");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasNoParamAndReturnsString()
			throws Throwable {
		Method method = new Method("mcol_getString", null);
		checkResult(method, "22");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsStringUsingGetMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getString", ArrayUtils.toArray("string_param", "1"));
		checkResult(method, "23");
	}
	
	@Test
	public void testEntityCollectionMethodThatHasParamAndReturnsStringUsingPostMethod()
			throws Throwable {
		Method method = new Method("mcol_param_getString", ArrayUtils.toArray("\"string_param\"", "1"));
		checkResult(method, HttpMethod.POST, "23");
	}

}
