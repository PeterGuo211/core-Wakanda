package org.wakanda.qa.test.dataperm.inherit.method;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.Credentials;
import org.apache.http.client.methods.HttpGet;
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

	/**
	 * Check that "Execute" action is not performed when permission is inherited
	 * from the Model and the request is devoid of authentication elements ie.
	 * session cookie or autorization header.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndRequestIsDevoidOfAuthInfos()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_MODEL;
		// request
		String dataClass = "ExecuteInheritedModel";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, target, null, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from Model and the user is not authenticated ie. does not
	 * exist.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndUserNotAuthenticated()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_MODEL;
		// request
		String dataClass = "ExecuteInheritedModel";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// user
		Credentials credentials = getNonAuthenticatedUser();
		
		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED, new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
				assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
			}
		});
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from Model and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_MODEL;
		// request
		String dataClass = "ExecuteInheritedModel";
		String method = "secured";
		String url = "/rest/" + dataClass + "/" + method;
		HttpGet request = new HttpGet(url);
		// user
		Credentials credentials = getAuthenticatedButNotAllowedUser();
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that Execute action is performed when the permission is inherited
	 * from Model and the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsPerformedWhenPermissionInheritedFromModelAndUserAuthenticatedAndAllowed()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_MODEL;
		// request
		String dataClass = "ExecuteInheritedModel";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// user
		User credentials = new User("executeInheritedModel");
		
		check(request, target, credentials, HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the request is devoid of authentication
	 * elements ie. session cookie or autorization header.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndRequestIsDevoidOfAuthInfos()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;
		// request
		String dataClass = "ExecuteInheritedDataClass";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, target, null, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the user is not authenticated ie. does not
	 * exist.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndUserNotAuthenticated()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;
		// request
		String dataClass = "ExecuteInheritedDatClass";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// user
		Credentials credentials = getNonAuthenticatedUser();
		
		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;
		// request
		String dataClass = "ExecuteInheritedDataClass";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// user
		Credentials credentials = getAuthenticatedButNotAllowedUser();
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that Execute action is performed when the permission is inherited
	 * from DataClass and the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testExecuteActionIsPerformedWhenPermissionInheritedFromDataClassAndUserAuthenticatedAndAllowed()
			throws Throwable {
		// host
		HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;
		// request
		String dataClass = "ExecuteInheritedDataClass";
		String method = "secured";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// user
		User credentials = new User("executeInheritedDataClass");

		check(request, target, credentials, HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}
}
