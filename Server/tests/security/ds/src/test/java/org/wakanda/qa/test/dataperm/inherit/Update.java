package org.wakanda.qa.test.dataperm.inherit;

import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.ErrorCode;
import org.wakanda.qa.test.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.test.dataperm.settings.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Update extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.UPDATE_INHERITED;
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.UPDATE;
	}

	@Override
	protected String getDataClassName() {
		return "UpdateInherited";
	}

	@Override
	protected User getAllowedUser() {
		return new User("updateInherited");
	}

	/**
	 * Check that "Update" action is not performed when the permission is
	 * inherited and the request is devoid of authentication elements ie.
	 * session cookie or autorization header.
	 * @throws Throwable 
	 */
	@Test
	public void testUpdateActionIsNotPerformedWhenPermissionInheritedAndRequestIsDevoidOfAuthInfos()
			throws Throwable {
		check(null, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorOfEntityEquals(response, ErrorCode.NO_PERM_UPDATE);
			}
		});
	}

	/**
	 * Check that "Update" action is not performed when the permission is
	 * inherited and the user is not authenticated.
	 * @throws Throwable 
	 */
	@Test
	public void testUpdateActionIsNotPerformedWhenPermissionInheritedAndUserNotAuthenticated()
			throws Throwable {
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Update" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testUpdateActionIsNotPerformedWhenPermissionInheritedAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		check(getAuthenticatedButNotAllowedUser(), new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorOfEntityEquals(response, ErrorCode.NO_PERM_UPDATE);
			}
		});
	}

	/**
	 * Check that "Update" action is not performed when the permission is
	 * inherited and the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testUpdateActionIsPerformedWhenPermissionInheritedAndUserAuthenticatedAndAllowed()
			throws Throwable {
		check(getAllowedUser(), HttpStatus.SC_OK);
	}

}
