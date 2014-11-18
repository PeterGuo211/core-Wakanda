package org.wakanda.qa.test.dataperm.simple.method;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URI;

import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpRequestBase;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.util.MyDS;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.ErrorCode;
import org.wakanda.qa.test.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.test.dataperm.settings.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Execute extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.PERM;
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.EXECUTE;
	}

	@Override
	protected String getDataClassName() {
		return "Execute";
	}

	@Override
	protected String getDataClassMethodName() {
		return "secured";
	}

	@Override
	protected User getAllowedUser() {
		return new User("execute");
	}

	/**
	 * Check that "Execute" action is performed when no privileges are required.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testExecuteActionIsPerformedWhenNoPermission() throws Throwable {
		// Build request
		HttpRequestBase request = (HttpRequestBase) getDefaultRequest();
		URI noPermURI = new URI(request
				.getURI()
				.toString()
				.replace(getDataClassName(), getNoPermDataClassName())
				.replace(getDataClassMethodName(),
						getNoPermDataClassMethodName()));
		request.setURI(noPermURI);

		check(request, Targets.NO_PERM, null, HttpStatus.SC_OK,
				new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertEquals("true",
								MyDS.getMethodStringResult(response));

					}
				});
	}

	/**
	 * Check that "Execute" action is not performed when the request is devoid
	 * of authentication elements ie. session cookie or autorization header.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenRequestIsDevoidOfAuth()
			throws Throwable {
		check(null, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});

	}

	/**
	 * Check that "Execute" action is not performed when the user is not
	 * authenticated ie. does not even exist.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenNotAuthenticated()
			throws Throwable {
		// Get the user that does not belong to solution directory
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Execute" action is not performed when the user is
	 * authenticated but not allowed.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenAuthenticatedButNotAllowed()
			throws Throwable {

		check(getAuthenticatedButNotAllowedUser(),
				new ResponseHandler() {

					public void handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
						assertIsUnauthorized(response);
						assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);

					}
				});
	}

	/**
	 * Check that "Execute" action is performed when the user is authenticated
	 * and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsPerformedWhenAuthenticatedAndAllowed()
			throws Throwable {
		
		check(getAllowedUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

}
