/**
 * 
 */
package org.wakanda.qa.test.rest.ds.extend;

import org.apache.http.HttpRequest;

/**
 * @author soufiane.tigrioui@4d.com
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
