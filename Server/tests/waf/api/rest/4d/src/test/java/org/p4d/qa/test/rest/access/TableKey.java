package org.p4d.qa.test.rest.access;

import junitparams.Parameters;
import junitparams.JUnitParamsRunner;
import org.apache.http.HttpResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.p4d.qa.test.rest.domain.Keylong;
import org.p4d.qa.test.rest.domain.Keylong64;
import org.p4d.qa.test.rest.domain.Keynumber;
import org.p4d.qa.test.rest.domain.Keystring;
import org.p4d.qa.test.rest.domain.Keyuuid;
import org.p4d.qa.test.rest.extend.AbstractTestCase;
import org.p4d.qa.test.rest.extend.TestParam;
import org.p4d.qa.test.rest.extend.TestParameterBuilder;

import org.wakanda.qa.commons.server.ut.ResponseHandler;


/**
 * @author soufiane.tigrioui@4d.com
 * 
 */

@RunWith(JUnitParamsRunner.class)
public class TableKey extends AbstractTestCase {

	private static final int DEFAULT_PARAMS_LENGTH = 5;

	@Test
	@Parameters
	public void testTableKeyReturnsSpecificEntityWhenPrimaryKeyIsLong(
			final TestParam param) throws Throwable {
		System.out.println("starting test ...");
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, Keylong.class);
			}
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestTableKeyReturnsSpecificEntityWhenPrimaryKeyIsLong()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "04") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "28113", "7905", "7433",
						"27464", "7179" };
				return keys[i];
			}

			@Override
			protected String getTable(int i) {
				return "KeyLong";
			}


		};
		return pb.buildParams();
	}
	
	
	
	
	
	

	@Test
	@Parameters
	public void testTableKeyReturnsSpecificEntityWhenPrimaryKeyIsLong64(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response,
						Keylong64.class);
			}
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestTableKeyReturnsSpecificEntityWhenPrimaryKeyIsLong64()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "05") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "13839", "30258", "19678",
						"17381", "12807" };
				return keys[i];
			}

			@Override
			protected String getTable(int i) {
				return "KeyLong64";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testTableKeyReturnsSpecificEntityWhenPrimaryKeyNumber(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, Keynumber.class);
			}
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestTableKeyReturnsSpecificEntityWhenPrimaryKeyNumber()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "06") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "2895.67", "368.1686", "98.23",
						"145.45", "145.8776" };

				return keys[i];
			}

			@Override
			protected String getTable(int i) {
				return "KeyNumber";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testTableKeyReturnsSpecificEntityWhenPrimaryKeyUuid(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, Keyuuid.class);
			}
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestTableKeyReturnsSpecificEntityWhenPrimaryKeyUuid()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "07") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] {
						"416364666B6720202020202020202020",
						"415A4E444D4420202020202020202020",
						"73797366656B6C412020202020202020",
						"626E7672705049554553202020202020",
						"576C70656F7A68667267202020202020" };
				return keys[i];
			}

			@Override
			protected String getTable(int i) {
				return "KeyUuid";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testTableKeyReturnsSpecificEntityWhenPrimaryKeyString(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, Keystring.class);
			}
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestTableKeyReturnsSpecificEntityWhenPrimaryKeyString()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "08") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "Wncemspdezfjsf", "AZNDMD",
						"vbOIT", "Wlpeozhfrg", "Acdfkg" };
				return keys[i];
			}

			@Override
			protected String getTable(int i) {
				return "KeyString";
			}
		};
		return pb.buildParams();
	}

}
