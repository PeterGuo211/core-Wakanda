/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Scope extends AbstractTestCase {

	@Test
	public void testDataClassWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/ScopePublicOnServer/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}


	@Test
	public void testDataClassWithScopePublicIsReachable() throws Exception {
		String url = "/ScopePublic/";
		assertEqualsStatusCode(HttpStatus.SC_OK, url);
	}

	@Test
	public void testDataClassMethodWithScopePrivateIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/mcls_scope_private";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassMethodWithScopeProtectedIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/mcls_scope_protected";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassMethodWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/mcls_scope_public_on_server";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassMethodWithScopePublicIsReachable()
			throws Exception {
		String url = "/ScopePublic/mcls_scope_public";
		assertEqualsStatusCode(HttpStatus.SC_OK, url);
	}

	@Test
	public void testDataClassAttributeWithScopePrivateIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/as_scope_private";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassAttributeWithScopeProtectedIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/as_scope_protected";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassAttributeWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/ScopePublic/as_scope_public_on_server";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassAttributeWithScopePublicIsReachable()
			throws Exception {
		String url = "/ScopePublic/as_scope_public";
		assertEqualsStatusCode(HttpStatus.SC_OK, url);
	}

}
