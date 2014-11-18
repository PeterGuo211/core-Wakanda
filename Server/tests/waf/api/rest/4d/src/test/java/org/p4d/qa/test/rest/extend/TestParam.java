/**
 * 
 */
package org.p4d.qa.test.rest.extend;

import org.apache.http.HttpRequest;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class TestParam {
	
	private HttpRequest request;
	private String expected;
	
	public TestParam(HttpRequest request, String expected) {
		super();
		this.request = request;
		this.expected = expected;
	}

	public HttpRequest getRequest() {
		return request;
	}

	public String getExpected() {
		return expected;
	}

}
