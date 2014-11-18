package org.wakanda.qa.test.dataperm.inherit;

import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.junit.Test;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.test.dataperm.settings.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Remove extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.REMOVE_INHERITED;
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.REMOVE;
	}

	@Override
	protected String getDataClassName() {
		return "RemoveInherited";
	}

	@Override
	protected User getAllowedUser() {
		return new User("removeInherited");
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the request is devoid of authentication elements (Session
	 * cookie or Autorization header).
	 * @throws Throwable 
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndRequestIsDevoidOfAuthInfos()
			throws Throwable {
		check(null, HttpStatus.SC_UNAUTHORIZED, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
				assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);

			}
		});
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the user is not authenticated ie. does not exist.
	 * @throws Throwable 
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndUserNotAuthenticated()
			throws Throwable {
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		check(getAuthenticatedButNotAllowedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Remove" action is performed when the permission is inherited
	 * and the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testRemoveActionIsPerformedWhenPermissionInheritedAndUserAuthenticatedAndAllowed()
			throws Throwable {
		check(getAllowedUser(), HttpStatus.SC_OK);
	}

}
