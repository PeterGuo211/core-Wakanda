package org.wakanda.qa.test.dataperm.inherit.method;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.util.MyDS;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
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

	/**
	 * Check that method is promoted to perform "Read" action when "Promote"
	 * permission is inherited from DataClass
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForReadActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

		// request
		String dataClass = "PromoteInheritedDataClassRead";
		String method = "promoteInheritedDataClassRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Read" action when "Promote"
	 * permission is inherited from Model
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForReadActionWhenPromotePermissionIsInheritedFromModel()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_MODEL_READ;

		// request
		String dataClass = "PromoteInheritedModelRead";
		String method = "promoteInheritedModelRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Create" action when "Promote"
	 * permission is inherited from DataClass
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

		// request
		String dataClass = "PromoteInheritedDataClassCreate";
		String method = "promoteInheritedDataClassCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Create" action when "Promote"
	 * permission is inherited from Model
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateActionWhenPromotePermissionIsInheritedFromModel()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_MODEL_CREATE;
		// request
		String dataClass = "PromoteInheritedModelCreate";
		String method = "promoteInheritedModelCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Update" action when "Promote"
	 * permission is inherited from DataClass
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

		// request
		String dataClass = "PromoteInheritedDataClassUpdate";
		String method = "promoteInheritedDataClassUpdate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Update" action when "Promote"
	 * permission is inherited from Model
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateActionWhenPromotePermissionIsInheritedFromModel()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_MODEL_UPDATE;
		// request
		String dataClass = "PromoteInheritedModelUpdate";
		String method = "promoteInheritedModelUpdate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		
		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Remove" action when "Promote"
	 * permission is inherited from DataClass
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;
		// request
		String dataClass = "PromoteInheritedDataClassRemove";
		String method = "promoteInheritedDataClassRemove";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

	/**
	 * Check that method is promoted to perform "Remove" action when "Promote"
	 * permission is inherited from Model
	 * @throws Throwable 
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveActionWhenPromotePermissionIsInheritedFromModel()
			throws Throwable {
		// host
		HttpHost target = Targets.PROMOTE_INHERITED_MODEL_REMOVE;
		// request
		String dataClass = "PromoteInheritedModelRemove";
		String method = "promoteInheritedModelRemove";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		check(request, target, getDefaultUser(), HttpStatus.SC_OK, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				assertEquals("true", MyDS.getMethodStringResult(response));
			}
		});
	}

}
