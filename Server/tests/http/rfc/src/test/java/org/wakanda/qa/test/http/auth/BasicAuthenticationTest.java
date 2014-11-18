package org.wakanda.qa.test.http.auth;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import org.apache.http.Header;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicHttpRequest;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all test cases related with the basic authentication.
 * 
 * @author Ouissam
 */
public class BasicAuthenticationTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> BasicAuthen01
	 * <p/>
	 * Check that if the server receives a request for an access-protected
	 * object, and an acceptable Authorization header is not sent, the server
	 * responds with a "401 Unauthorized" status code.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617
	 * 
	 * @throws Exception
	 */
	@Test
	public void testBasicAuthReturns401WhenNoAuthHeader() throws Exception {
		String url = "/authBasic/";
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * <b>Implements:</b> BasicAuthen02
	 * <p/>
	 * Check that unauthorized response includes a WWW-Authenticate header field
	 * containing at least one challenge applicable to the requested resource.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617
	 * 
	 * @throws Exception
	 */
	@Test
	public void testBasicAuthChallengeFormatIsCorrect() throws Exception {
		String url = "/authBasic/";
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		// check WWW-Authenticate header
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);

		BasicScheme authscheme = new BasicScheme();
		authscheme.getSchemeName();
		try {
			authscheme.processChallenge(challenge);
			assertEquals("Wrong realm value", "Basic Realm",
					authscheme.getRealm());

		} catch (MalformedChallengeException e) {
			fail("Malformed challenge: " + e.getMessage());
		}
	}

	/**
	 * <b>Implements:</b> BasicAuthen03
	 * <p/>
	 * Check that server will service the request only if it can validate the
	 * user-ID and password for the protection space of the Request-URI.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testBasicAuthShouldSuccess() throws Exception {
		// set credentials
		String user = "testUser";
		String pass = "testPass";
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, pass);

		// build authen response header
		Header challenge = new BasicHeader(AUTH.WWW_AUTH,
				"Basic realm=\"Basic Realm\"");
		BasicScheme authscheme = new BasicScheme();
		authscheme.processChallenge(challenge);

		// send authorized request & get the response
		HttpRequest request = new BasicHttpRequest("GET", "/authBasic/");

		Header authResponse = authscheme.authenticate(creds, request, null);
		request.addHeader(authResponse);

		HttpResponse response = executeRequest(request);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}
	/**
	 * <b>Implements:</b> BasicAuthen04
	 * <p/>
	 * Check that server will not service the request if it can't validate the
	 * user-ID and password for the protection space of the Request-URI.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testBasicAuthShouldFail() throws Exception {
		// set credentials
		String user = "wrongUser";
		String pass = "wrongPass";
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, pass);

		// build authen response header
		Header challenge = new BasicHeader(AUTH.WWW_AUTH,
				"Basic realm=\"Basic Realm\"");
		BasicScheme authscheme = new BasicScheme();
		authscheme.processChallenge(challenge);

		// send authorized request & get the response
		HttpRequest request = new BasicHttpRequest("GET", "/authBasic/");
		Header authResponse = authscheme.authenticate(creds, request, null);
		request.addHeader(authResponse);

		HttpResponse response = executeRequest(request);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

}
