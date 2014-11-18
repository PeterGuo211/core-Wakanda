package org.wakanda.qa.test.dataperm.inherit;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.Credentials;
import org.junit.Test;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.ErrorCode;
import org.wakanda.qa.test.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.test.dataperm.settings.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Force extends AbstractSecurityTestCase {

	/**
	 * Check that when "Force" option is checked for a "Read" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceReadPermissionThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_READ;
		// DataClass
		String dataClass = "ForceRead";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		// User
		Credentials credentials = new User("read");

		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);
	}

	/**
	 * Check that when "Force" option is checked for a "Read" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceReadPermissionThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_READ;
		// DataClass
		String dataClass = "ForceRead";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		// User
		Credentials credentials = new User("readInherited");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for a "Create" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceCreatePermissionThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_CREATE;
		// DataClass
		String dataClass = "ForceCreate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.CREATE,
				dataClass);
		// User
		Credentials credentials = new User("create");

		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);

	}

	/**
	 * Check that when "Force" option is checked for a "Create" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceCreatePermissionThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_CREATE;
		// DataClass
		String dataClass = "ForceCreate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.CREATE,
				dataClass);
		// User
		Credentials credentials = new User("createInherited");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceUpdatePermissionThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_UPDATE;
		// DataClass
		String dataClass = "ForceUpdate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		// User
		Credentials credentials = new User("update");

		check(request, target, credentials, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorOfEntityEquals(response, ErrorCode.NO_PERM_UPDATE);
			}
		});

	}

	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceUpdatePermissionThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_UPDATE;
		// DataClass
		String dataClass = "ForceUpdate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		// User
		Credentials credentials = new User("updateInherited");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceRemovePermissionThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_REMOVE;
		// DataClass
		String dataClass = "ForceRemove";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		// User
		Credentials credentials = new User("remove");

		check(request, target, credentials, HttpStatus.SC_UNAUTHORIZED);

	}

	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceRemovePermissionThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_REMOVE;
		// DataClass
		String dataClass = "ForceRemove";
		// Request
		HttpRequest request = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		// User
		Credentials credentials = new User("removeInherited");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at
	 * Model level, DataClasses take on that access rights and the individual
	 * setting is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceExecutePermissionFromModelThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_MODEL;
		// DataClass & Method
		String dataClass = "ForceExecuteModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");

		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at
	 * Model level, DataClasses take on that access rights and the individual
	 * setting is ignored.
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testWhenForceExecutePermissionFromModelThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_MODEL;
		// DataClass & Method
		String dataClass = "ForceExecuteModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("executeInheritedModel");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at
	 * DataClass level, DataClass methods take on that access rights and the
	 * individual setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForceExecutePermissionFromDataClassThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForceExecuteDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");

		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_EXEC);
			}
		});
	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at
	 * DataClass level, DataClass methods take on that access rights and the
	 * individual setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForceExecutePermissionFromDataClassThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForceExecuteDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("executeInheritedDataClass");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for an "Promote" action at
	 * Model level, DataClasses take on that access rights and the individual
	 * setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForcePromotePermissionFromModelThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_MODEL;
		// DataClass & Method
		String dataClass = "ForcePromoteModel";
		String method = "promoteRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");
		
		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_READ);
			}
		});
	}

	/**
	 * Check that when "Force" option is checked for an "Promote" action at
	 * Model level, DataClasses take on that access rights and the individual
	 * setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForcePromotePermissionFromModelThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_MODEL;
		// DataClass & Method
		String dataClass = "ForcePromoteModel";
		String method = "promoteCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");

		check(request, target, credentials, HttpStatus.SC_OK);
	}

	/**
	 * Check that when "Force" option is checked for an "Promote" action at
	 * DataClass level, DataClass methods take on that access rights and the
	 * individual setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForcePromotePermissionFromDataClassThatOriginalGroupDoesNotHaveAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForcePromoteDataClass";
		String method = "promoteRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");

		check(request, target, credentials, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertIsUnauthorized(response);
				assertFirstErrorEquals(response, ErrorCode.NO_PERM_READ);
			}
		});

	}

	/**
	 * Check that when "Force" option is checked for an "Promote" action at
	 * DataClass level, DataClass methods take on that access rights and the
	 * individual setting is ignored.
	 * @throws Throwable 
	 */
	@Test
	public void testWhenForcePromotePermissionFromDataClassThatForcedGroupHasAccessRights()
			throws Throwable {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForcePromoteDataClass";
		String method = "promoteCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		Credentials credentials = new User("execute");
		
		check(request, target, credentials, HttpStatus.SC_OK);
	}

}
