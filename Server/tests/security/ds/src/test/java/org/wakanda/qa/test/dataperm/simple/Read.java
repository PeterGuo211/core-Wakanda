package org.wakanda.qa.test.dataperm.simple;

import static org.junit.Assert.assertNotNull;

import java.net.URI;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.client.methods.HttpRequestBase;
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
		return Targets.PERM;
	}

	@Override
	protected String getDataClassName() {
		return "Read";
	}

	@Override
	protected RESTAction getRESTAction() {
		return RESTAction.READ;
	}

	@Override
	protected User getAllowedUser() {
		return new User("read");
	}

	/**
	 * Check that "Read" action is performed when no privileges are required.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testReadActionIsPerformedWhenNoPermission() throws Throwable {
		// Build request
		HttpRequestBase request = (HttpRequestBase) getDefaultRequest();
		request.setURI(new URI(request.getURI().toString()
				.replace(getDataClassName(), getNoPermDataClassName())));
		check(request, Targets.NO_PERM, null, HttpStatus.SC_OK);
	}

	/**
	 * Check that "Read" action is not performed when the request is devoid of
	 * authentication elements ie. session cookie or autorization header.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsNotPerformedWhenRequestIsDevoidOfAuth()
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
	 * Check that "Read" action is not performed when the user is not
	 * authenticated ie. does not even exist.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testReadActionIsNotPerformedWhenNotAuthenticated()
			throws Throwable {
		// Get the user that does not belong to solution directory
		check(getNonAuthenticatedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Read" action is not performed when the user is authenticated
	 * but not allowed.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testReadActionIsNotPerformedWhenAuthenticatedButNotAllowed()
			throws Throwable {
		// Get an authenticated but not allowed user
		check(getAuthenticatedButNotAllowedUser(), HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that "Read" action is performed when the user is authenticated and
	 * allowed.
	 * @throws Throwable 
	 */
	@Test
	public void testReadActionIsPerformedWhenAuthenticatedAndAllowed()
			throws Throwable {
		// Get the user allowed
		check(getAllowedUser(), HttpStatus.SC_OK);
	}

}
