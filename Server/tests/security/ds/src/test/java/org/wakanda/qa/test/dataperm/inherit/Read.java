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
public class Read extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.READ_INHERITED;
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.READ;
	}

	@Override
	protected String getDataClassName() {
		return "ReadInherited";
	}

	@Override
	protected User getAllowedUser() {
		return new User("readInherited");
	}

	/**
	 * Check that "Read" action is not performed when the permission is
	 * inherited and the request is devoid of authentication elements ie.
	 * session cookie or autorization header.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsNotPerformedWhenPermissionInheritedAndRequestIsDevoidOfAuthInfos()
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
	 * Check that "Read" action is not performed when the permission is
	 * inherited and the user is not authenticated ie. does not exist.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsNotPerformedWhenPermissionInheritedAndUserNotAuthenticated()
			throws Throwable {
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Read" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsNotPerformedWhenPermissionInheritedAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		check(getAuthenticatedButNotAllowedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that read action is performed when the permission is inherited and
	 * the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsPerformedWhenPermissionInheritedAndUserAuthenticatedAndAllowed()
			throws Throwable {
		check(getAllowedUser(), HttpStatus.SC_OK);
	}

}
