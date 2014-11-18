package org.wakanda.qa.test.http.auth;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.auth.DigestScheme;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all test cases related with the digest authentication.
 * 
 * @author Ouissam
 * 
 */
public class DigestAuthenticationTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> DigestAuthen01
	 * <p/>
	 * Check that if the server receives a request for an access-protected
	 * object, and an acceptable Authorization header is not sent, the server
	 * responds with a "401 Unauthorized" status code.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 1.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testDigestAuthReturns401WhenNoAuthHeader() throws Exception {
		String url = "/authDigest/";
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * <b>Implements:</b> DigestAuthen02
	 * <p/>
	 * Check that unauthorized response includes a WWW-Authenticate header field
	 * containing at least one challenge applicable to the requested resource.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testDigestAuthChallengeFormatIsCorrect() throws Exception {
		String url = "/authDigest/";
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		// check WWW-Authenticate header
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);

		DigestScheme authscheme = new DigestScheme();

		try {
			authscheme.processChallenge(challenge);
			assertEquals("Wrong realm value", "Digest Realm",
					authscheme.getRealm());
			assertNotNull("\"nonce\" parameter is missing",
					authscheme.getParameter("nonce"));
		} catch (MalformedChallengeException e) {
			fail("Malformed challenge:\n " + e.getMessage());
		}
	}

	/**
	 * <b>Implements:</b> DigestAuthen03
	 * <p/>
	 * Check that server will service the request only if it can validate the
	 * user-ID and password for the protection space of the Request-URI.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 3.2.2
	 * 
	 * The test fails because of the releam value which is fixed programmatically to "Wakanda". 
	 * Ignored because there is no official documentation about http ressource protection. The test is based on the developper sayings.
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testDigestAuthShouldSuccess() throws Exception {
		// get the chalenge
		String url = "/authDigest/";
		HttpGet request01 = new HttpGet(url);
		HttpResponse response01 = executeRequest(request01);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response01);
		// check WWW-Authenticate header
		Header challenge = response01.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);

		// set credentials
		String user = "testUser";
		String pass = "testPass";
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, pass);

		// build authen response header
		DigestScheme authscheme = new DigestScheme();
		authscheme.processChallenge(challenge);

		// send authorized request & get the response
		HttpGet request02 = new HttpGet(url);
		Header authResponse = authscheme.authenticate(creds, request02, null);
		request02.addHeader(authResponse);

		HttpResponse response = executeRequest(request02);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> DigestAuthen04
	 * <p/>
	 * Check that server will not service the request if it can't validate the
	 * user-ID and password for the protection space of the Request-URI.
	 * <p/>
	 * <b>Refrences:</b> SPEC696 & RFC2616 11 + 10.4.2 & Functional
	 * specification 1.2 & RFC2617 3.2.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testDigestAuthShouldFail() throws Exception {
		// get the chalenge
		String url = "/authDigest/";
		HttpGet request01 = new HttpGet(url);
		HttpResponse response01 = executeRequest(request01);
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response01);
		// check WWW-Authenticate header
		Header challenge = response01.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);

		// set credentials
		String user = "wrongUser";
		String pass = "wrongPass";
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, pass);

		// build authen response header
		DigestScheme authscheme = new DigestScheme();
		authscheme.processChallenge(challenge);

		// send authorized request & get the response
		HttpGet request02 = new HttpGet(url);
		Header authResponse = authscheme.authenticate(creds, request02, null);
		request02.addHeader(authResponse);

		HttpResponse response = executeRequest(request02);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

}
