package org.wakanda.qa.test.dataperm.inherit;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
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
public class OverridePerm extends AbstractSecurityTestCase {

	/**
	 * Check that when "Read" permission is overridden, individual permission is
	 * applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideReadPermissionThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.READ_OVERRIDE;
		// DataClass
		String dataClass = "ReadOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		// User
		User credentials = new User("readInherited");
		
		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that when "Read" permission is overridden, individual permission is
	 * applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideReadPermissionThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.READ_OVERRIDE;
		// DataClass
		String dataClass = "ReadOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		// User
		User credentials = new User("read");
		
		check(request, target, credentials, HttpStatus.SC_OK);

	}

	/**
	 * Check that when "Create" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideCreatePermissionThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.CREATE_OVERRIDE;
		// DataClass
		String dataClass = "CreateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.CREATE,
				dataClass);
		// User
		User credentials = new User("createInherited");
		
		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that when "Create" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideCreatePermissionThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.CREATE_OVERRIDE;
		// DataClass
		String dataClass = "CreateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.CREATE,
				dataClass);
		// User
		User credentials = new User("create");
		
		check(request, target, credentials, HttpStatus.SC_OK);

	}

	/**
	 * Check that when "Update" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideUpdatePermissionThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.UPDATE_OVERRIDE;
		// DataClass
		String dataClass = "UpdateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		// User
		User credentials = new User("updateInherited");
		
		check(request, target, credentials, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorOfEntityEquals(response, ErrorCode.NO_PERM_UPDATE);
			}
		});
	}

	/**
	 * Check that when "Update" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideUpdatePermissionThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.UPDATE_OVERRIDE;
		// DataClass
		String dataClass = "UpdateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		// User
		User credentials = new User("update");
		
		check(request, target, credentials, HttpStatus.SC_OK);

	}

	/**
	 * Check that when "Remove" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideRemovePermissionThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.REMOVE_OVERRIDE;
		// DataClass
		String dataClass = "RemoveOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		// User
		User credentials = new User("removeInherited");
		
		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that when "Remove" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideRemovePermissionThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.REMOVE_OVERRIDE;
		// DataClass
		String dataClass = "RemoveOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		// User
		User credentials = new User("remove");
		
		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromModelThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("executeInheritedModel");
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});

	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromModelThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromDataClassThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("executeInheritedDataClass");
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromDataClassThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");
		
		check(request, target, credentials, HttpStatus.SC_OK);

	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromModelThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideModel";
		String method = "doUnauthRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_READ);
			}
		});
	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromModelThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideModel";
		String method = "doAuthCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");
		
		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromDataClassThatInheritedOneIsNotApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideDataClass";
		String method = "doUnauthRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_READ);
			}
		});
	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromDataClassThatIndividualPermissionIsApplied()
			throws Throwable {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideDataClass";
		String method = "doAuthCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User credentials = new User("execute");
		
		check(request, target, credentials, HttpStatus.SC_OK);
	}

}
