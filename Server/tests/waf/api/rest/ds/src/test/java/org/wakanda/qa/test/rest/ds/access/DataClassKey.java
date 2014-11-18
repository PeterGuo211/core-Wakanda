/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.http.HttpResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.KeyLong;
import org.wakanda.qa.test.rest.ds.domain.KeyLong64;
import org.wakanda.qa.test.rest.ds.domain.KeyNumber;
import org.wakanda.qa.test.rest.ds.domain.KeyString;
import org.wakanda.qa.test.rest.ds.domain.KeyUuid;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;
import org.wakanda.qa.test.rest.ds.extend.TestParam;
import org.wakanda.qa.test.rest.ds.extend.TestParameterBuilder;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class DataClassKey extends AbstractTestCase {

	private static final int DEFAULT_PARAMS_LENGTH = 5;

	@Test
	@Parameters
	public void testDataClassKeyReturnsSpecificEntityWhenPrimaryKeyIsLong(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, KeyLong.class);
			}
		});
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestDataClassKeyReturnsSpecificEntityWhenPrimaryKeyIsLong()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "11") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "372055721", "-725323403",
						"-1794249019", "1801256279", "483100201" };
				return keys[i];
			}

			@Override
			protected String getDataClass(int i) {
				return "KeyLong";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testDataClassKeyReturnsSpecificEntityWhenPrimaryKeyIsLong64(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, KeyLong64.class);
			}
		});
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestDataClassKeyReturnsSpecificEntityWhenPrimaryKeyIsLong64()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "12") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "4634806235403649024",
						"1697811077598806016", "-1034684241813700608",
						"7347888238213726208", "-6365244096491028480" };
				return keys[i];
			}

			@Override
			protected String getDataClass(int i) {
				return "KeyLong64";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testDataClassKeyReturnsSpecificEntityWhenPrimaryKeyNumber(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, KeyNumber.class);
			}
		});
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestDataClassKeyReturnsSpecificEntityWhenPrimaryKeyNumber()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "13") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "1.7482020877088E+308",
						"6.9051890369056e+307", "1.2964215989052e+308",
						"1.515833978587e+308", "5.6542363189279e+307" };
				String[] tempKeys = new String[] { "1.7482020877088038E+308",
						"6.90518903690557e+307", "1.2964215989052045e+308",
						"1.5158339785870165e+308", "5.654236318927929e+307" };
				return tempKeys[i];
			}

			@Override
			protected String getDataClass(int i) {
				return "KeyNumber";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testDataClassKeyReturnsSpecificEntityWhenPrimaryKeyUuid(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, KeyUuid.class);
			}
		});
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestDataClassKeyReturnsSpecificEntityWhenPrimaryKeyUuid()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "14") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] {
						"1CF221B673CF9A48BB85A3AE44AD6A83",
						"EFBDE09788124B419D0C14FCD82747FA",
						"41D21678C633F1489DD9EA698B581DE2",
						"2464FBA940D13C46A8AC097A0A565014",
						"8D7557C5855B3047AED91EBC6EC475AD" };
				return keys[i];
			}

			@Override
			protected String getDataClass(int i) {
				return "KeyUuid";
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testDataClassKeyReturnsSpecificEntityWhenPrimaryKeyString(
			final TestParam param) throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntityEquals(param.getExpected(), response, KeyString.class);
			}
		});
	}

	@SuppressWarnings("unused")
	private TestParam[] parametersForTestDataClassKeyReturnsSpecificEntityWhenPrimaryKeyString()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder(
				DEFAULT_PARAMS_LENGTH, "15") {
			@Override
			protected String getKey(int i) {
				String[] keys = new String[] { "22QS1HQaHi", "bCnToJi7wP",
						"NkQgFwr5BP", "t41G14QQJL", "Sv4kXiGgjp" };
				return keys[i];
			}

			@Override
			protected String getDataClass(int i) {
				return "KeyString";
			}
		};
		return pb.buildParams();
	}

}
