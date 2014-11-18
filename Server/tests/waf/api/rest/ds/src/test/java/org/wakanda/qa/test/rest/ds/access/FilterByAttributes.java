/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.commons.server.rest.DataClass;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.domain.EntitiesResult;
import org.wakanda.qa.commons.server.rest.util.Method;
import org.wakanda.qa.commons.server.rest.util.MyGson;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Attributes;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;
import org.wakanda.qa.test.rest.ds.extend.TestParam;
import org.wakanda.qa.test.rest.ds.settings.Settings;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(value = JUnitParamsRunner.class)
public class FilterByAttributes extends AbstractTestCase {

	private static final String DC_ATTRIBUTE = "Attributes";

	private class TestParameterBuilder extends
			org.wakanda.qa.test.rest.ds.extend.TestParameterBuilder {

		private static final int DEFAULT_PARAMS_LENGTH = 8;

		private TestParameterBuilder(int size, String expectedIndex) {
			super(size, expectedIndex);
		}

		private TestParameterBuilder(String expectedIndex) {
			super(DEFAULT_PARAMS_LENGTH, expectedIndex);
		}

		@Override
		protected String getDataClass(int i) {
			return DC_ATTRIBUTE;
		}

		@Override
		protected String[] getAttributes(int i) {
			String[] all = getDataClassAttributes(getDataClass(i));
			int size = i + 1;
			String[] attributes = new String[size];
			attributes[0] = all[0];
			for (int j = 1; j < size; j++) {
				attributes[j] = all[j];
			}
			return attributes;
		}

		@Override
		protected NameValuePair[] getParams(int i) {
			Map<String, NameValuePair[]> atVsPm = getRequestParametersByAttribute(getDataClass(i));
			String[] attributes = getAttributes(i);
			NameValuePair[] params = null;
			for (String attribute : attributes) {
				params = ArrayUtils.addAll(params, atVsPm.get(attribute));
			}
			return params;
		}
	}

	private void defaultCheckFilterByAttributes(final TestParam param)
			throws Throwable {
		logger.debug(param.getExpected() + ":"
				+ param.getRequest().getRequestLine().getUri());
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				// Expected
				String source = Settings.getExpectedContent(param.getExpected());
				DataClass<Attributes> dsu = getDSClient().getDataClass(Attributes.class);
				EntitiesResult<Attributes> expected = dsu
						.getEntitiesResult(source);
				// Asserts
				assertEntitiesEquals(expected, response, Attributes.class);
			}
		});
	}

	private String[] getDataClassAttributes(String dc) {
		String[] list = null;
		if (dc.equals(DC_ATTRIBUTE)) {
			list = ArrayUtils.toArray("as_string", "as_number", "ac_string",
					"ac_number", "aa_master2__as_string",
					"aaa_master2__ar_master1__as_number",
					"ar_master2.as_string", "ar_master2.ar_master1.as_number");
		}

		return list;
	}

	private Map<String, NameValuePair[]> getRequestParametersByAttribute(
			String dc) {
		Map<String, NameValuePair[]> fp = new HashMap<String, NameValuePair[]>();
		if (dc.equals(DC_ATTRIBUTE)) {
			fp.put("ar_master2.as_string",
					new BasicNameValuePair[] { new BasicNameValuePair(
							Constants.EXPAND, "ar_master2") });
			fp.put("ar_master2.ar_master1.as_number",
					new BasicNameValuePair[] { new BasicNameValuePair(
							Constants.EXPAND, "ar_master2.ar_master1") });
		}
		return fp;
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnDataClass(TestParam param)
			throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClass()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("03");
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnEntitiesCollection(TestParam param)
			throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnEntitiesCollection()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("04") {
			@Override
			protected NameValuePair[] getParams(int i) {
				String filterString = "\"as_string='filter'\"";
				NameValuePair param = new BasicNameValuePair(Constants.FILTER,
						filterString);
				return ArrayUtils.add(super.getParams(i), param);
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnSpecificEntity(final TestParam param)
			throws Throwable {
		check(param.getRequest(), new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				String source = Settings.getExpectedContent(param.getExpected());
				Attributes expected = MyGson.getGson().fromJson(source,
						Attributes.class);
				// Actual
				Attributes actual = MyGson.fromJson(response, Attributes.class);
				// Asserts
				assertEquals(expected, actual);
			}
		});
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnSpecificEntity()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("05") {
			@Override
			protected String getKey(int i) {
				return String.valueOf(i + 1);
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnEntitySet(TestParam param)
			throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnEntitySet()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("06") {
			@Override
			protected String getEntitySet(int i) {
				DataClass<Attributes> dsu = getDSClient().getDataClass(Attributes.class);
				String eSetUuid = "404";
				try {
					eSetUuid = dsu.createEntitySet();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return eSetUuid;
			}
		};
		return pb.buildParams();

	}

	@Test
	@Parameters
	public void testFilterByAttributeOnDataClassMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClassMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("07") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcls_getec", null);
				return method;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnDataClassMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClassMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("07") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcls_getec", null);
				return method;
			}

			@Override
			protected HttpRequest getRequest(int i) {
				RESTRequestBuilder rb = new RESTRequestBuilder();
				HttpRequest request = null;
				try {
					request = rb.addDataClass(getDataClass(i))
							.addMethod(getMethod(i))
							.addAttributes(getAttributes(i))
							.addParameters(getParams(i)).buildRequest();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return request;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnDataClassMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClassMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("08") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcls_param_getec",
						ArrayUtils.toArray(String.valueOf(i + 1)));
				return method;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnDataClassMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClassMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("08") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcls_param_getec",
						ArrayUtils.toArray(String.valueOf(i + 1)));
				return method;
			}

			@Override
			protected HttpRequest getRequest(int i) {
				RESTRequestBuilder rb = new RESTRequestBuilder();
				HttpRequest request = null;
				try {
					request = rb.addDataClass(getDataClass(i))
							.addMethod(getMethod(i))
							.addAttributes(getAttributes(i))
							.addParameters(getParams(i)).buildRequest();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return request;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnCollectionMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnCollectionMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("09") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcol_getec", null);
				return method;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnCollectionMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnCollectionMethodThatHasNoParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("09") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcol_getec", null);
				return method;
			}

			@Override
			protected HttpRequest getRequest(int i) {
				RESTRequestBuilder rb = new RESTRequestBuilder();
				HttpRequest request = null;
				try {
					request = rb.addDataClass(getDataClass(i))
							.addMethod(getMethod(i))
							.addAttributes(getAttributes(i))
							.addParameters(getParams(i)).buildRequest();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return request;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnCollectionMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnCollectionMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreBeforeMethod()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("10") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcol_param_getec",
						ArrayUtils.toArray(String.valueOf(i + 1)));
				return method;
			}
		};
		return pb.buildParams();
	}

	@Test
	@Parameters
	public void testFilterByAttributeOnCollectionMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod(
			TestParam param) throws Throwable {
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnCollectionMethodThatHasParamAndReturnsEntityCollectionWhenAttributesAreAfterMethod()
			throws Throwable {

		TestParameterBuilder pb = new TestParameterBuilder("10") {
			@Override
			protected Method getMethod(int i) {
				Method method = new Method("mcol_param_getec",
						ArrayUtils.toArray(String.valueOf(i + 1)));
				return method;
			}

			@Override
			protected HttpRequest getRequest(int i) {
				RESTRequestBuilder rb = new RESTRequestBuilder();
				HttpRequest request = null;
				try {
					request = rb.addDataClass(getDataClass(i))
							.addMethod(getMethod(i))
							.addAttributes(getAttributes(i))
							.addParameters(getParams(i)).buildRequest();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return request;
			}
		};
		return pb.buildParams();
	}

}
