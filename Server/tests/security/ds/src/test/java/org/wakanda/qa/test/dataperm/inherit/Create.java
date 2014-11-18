package org.wakanda.qa.test.dataperm.inherit;

import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.junit.Test;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.test.dataperm.settings.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Create extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.CREATE_INHERITED;
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.CREATE;
	}

	@Override
	protected String getDataClassName() {
		return "CreateInherited";
	}

	@Override
	protected Credentials getAllowedUser() {
		return new UsernamePasswordCredentials("createInherited", "createInherited");
	}

	/**
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the request is devoid of authentication elements (Session
	 * cookie or Autorization header).
	 * @throws Throwable 
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenPermissionInheritedAndRequestIsDevoidOfAuthInfos()
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
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the user is not authenticated ie. does not exist.
	 * @throws Throwable 
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenPermissionInheritedAndUserNotAuthenticated()
			throws Throwable {
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenPermissionInheritedAndUserAuthenticatedButNotAllowed()
			throws Throwable {
		check(getAuthenticatedButNotAllowedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Create" action is performed when the permission is inherited
	 * and the user is authenticated and allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testCreateActionIsPerformedWhenPermissionInheritedAndUserAuthenticatedAndAllowed()
			throws Throwable {
		check(getAllowedUser(), HttpStatus.SC_OK);
	}

}
