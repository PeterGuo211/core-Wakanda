package org.wakanda.qa.test.dataperm.simple.method;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
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
public class Promote extends AbstractSecurityTestCase {

	@Override
	protected User getDefaultUser() throws Exception {
		return new User("execute");
	}

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.PERM;
	}

	/**
	 * Check that "Promote" action is not performed for "Read" permission when
	 * no group is associated with "Promote" permission.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testPromoteActionIsNotPerformedForReadPermissionWhenPromotePermissionIsBlank()
			throws Throwable {
		// request
		String dataClass = "NonPromoteRead";
		String method = "nonPromoteRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		check(request, getDefaultUser(), HttpStatus.SC_INTERNAL_SERVER_ERROR,
				new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws ClientProtocolException, IOException {
						assertFirstErrorEquals(response, ErrorCode.NO_PERM_READ);
					}
				});

	}

	/**
	 * Check that method is promoted to perform "Read" action when this last is
	 * associated with the "Promote" action group.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testPromoteActionIsPerformedForReadAction() throws Throwable {
		// request
		String dataClass = "PromoteRead";
		String method = "promoteRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		check(request, getDefaultUser(), HttpStatus.SC_OK,
				new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertEquals("true",
								MyDS.getMethodStringResult(response));
					}
				});
	}

	/**
	 * Check that "Promote" action is not performed for "Create" permission when
	 * no group is associated with "Promote" permission.
	 * @throws Throwable 
	 */
	@Test
	// @Ignore
	public void testPromoteActionIsNotPerformedForCreatePermissionWhenWhenPromotePermissionIsBlank()
			throws Throwable {
		// request
		String dataClass = "NonPromoteCreate";
		String method = "nonPromoteCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		check(request, getDefaultUser(), HttpStatus.SC_INTERNAL_SERVER_ERROR,
				new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertFirstErrorEquals(response, ErrorCode.CANNOT_SAVE_ENTITY);
					}
				});
	}

	/**
	 * Check that method is promoted to perform "Create" action when this last
	 * is associated with the "Promote" action group.
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateAction() throws Throwable {
		// request
		String dataClass = "PromoteCreate";
		String method = "promoteCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		check(request, getDefaultUser(), HttpStatus.SC_OK,
				new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertEquals("true",
								MyDS.getMethodStringResult(response));
					}
				});
	}

	/**
	 * Check that "Promote" action is not performed for "Update" permission when
	 * no group is associated with "Promote" permission.
	 * @throws Throwable 
	 */
	@Test
	// @Ignore
	public void testPromoteActionIsNotPerformedForUpdatePermissionWhenPromotePermissionIsBlank()
			throws Throwable {
		// request
		String dataClass = "NonPromoteUpdate";
		String method = "nonPromoteUpdate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, getDefaultUser(), HttpStatus.SC_INTERNAL_SERVER_ERROR,
				new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertFirstErrorEquals(response, ErrorCode.CANNOT_SAVE_ENTITY);
					}
				});
	}

	/**
	 * Check that method is promoted to perform "Update" action when this last
	 * is associated with the "Promote" action group.
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateAction() throws Throwable {
		// request
		String dataClass = "PromoteUpdate";
		String method = "promoteUpdate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, getDefaultUser(), HttpStatus.SC_OK,
				new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertEquals("true",
								MyDS.getMethodStringResult(response));
					}
				});
	}

	/**
	 * Check that "Promote" action is not performed for "Remove" permission when
	 * no group is associated with "Promote" permission.
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsNotPerformedForRemovePermissionWhenPromotePermissionIsBlank()
			throws Throwable {
		// request
		String dataClass = "NonPromoteRemove";
		String method = "nonPromoteRemove";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, getDefaultUser(), HttpStatus.SC_INTERNAL_SERVER_ERROR,
				new ResponseHandler() {
					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertFirstErrorEquals(response, ErrorCode.NO_PERM_DELETE);
					}
				});
	}

	/**
	 * Check that method is promoted to perform "Remove" action when this last
	 * is associated with the "Promote" action group.
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveAction() throws Throwable {
		// request
		String dataClass = "PromoteRemove";
		String method = "promoteRemove";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, getDefaultUser(), HttpStatus.SC_OK,
				new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						assertEquals("true",
								MyDS.getMethodStringResult(response));
					}
				});
	}

}
