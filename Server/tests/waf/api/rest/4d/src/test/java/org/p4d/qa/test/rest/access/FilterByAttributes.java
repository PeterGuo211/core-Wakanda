package org.p4d.qa.test.rest.access;

/**
 * 
 */

import static org.junit.Assert.assertEquals;



import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.p4d.qa.test.rest.domain.Attributes;
import org.p4d.qa.test.rest.extend.AbstractTestCase;
import org.p4d.qa.test.rest.extend.TestParam;
import org.p4d.qa.test.rest.settings.Settings;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.commons.server.rest.DataClass;
import org.wakanda.qa.commons.server.rest.domain.EntitiesResult;
import org.wakanda.qa.commons.server.rest.util.MyGson;
import org.wakanda.qa.commons.server.ut.ResponseHandler;


/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
@RunWith(value = JUnitParamsRunner.class)
public class FilterByAttributes extends AbstractTestCase {

	private static final String DC_ATTRIBUTE = "Attributes";

	private class TestParameterBuilder extends
			org.p4d.qa.test.rest.extend.TestParameterBuilder {

		private static final int DEFAULT_PARAMS_LENGTH = 3;

		private TestParameterBuilder(int size, String expectedIndex) {
			super(size, expectedIndex);
		}

		private TestParameterBuilder(String expectedIndex) {
			super(DEFAULT_PARAMS_LENGTH, expectedIndex);
		}

		@Override
		protected String getTable(int i) {
			return DC_ATTRIBUTE;
		}

		@Override
		protected String[] getAttributes(int i) {
			String[] all = getDataClassAttributes(getTable(i));
			int size = i + 1;
			String[] attributes = new String[size];
			attributes[0] = all[0];
			for (int j = 1; j < size; j++) {
				attributes[j] = all[j];
			}
			return attributes;
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
		},getSessionHttpContext());
	}

	private String[] getDataClassAttributes(String dc) {
		String[] list = null;
		if (dc.equals(DC_ATTRIBUTE)) {
			list = ArrayUtils.toArray("as_string", "as_number","id_master2");
		}

		return list;
	}

    
	@Test
	@Parameters
	public void testFilterByAttributeOnDataClass(TestParam param)
			throws Throwable {
		System.out.println("starting test ...");
		defaultCheckFilterByAttributes(param);
	}

	
	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnDataClass()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("09");
		return pb.buildParams();
	}
	
	
	@Test
	@Parameters
	public void testFilterByAttributeOnEntitiesCollection(TestParam param)
			throws Throwable {
		System.out.println("starting test ...");
		defaultCheckFilterByAttributes(param);
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnEntitiesCollection()
			throws Throwable {
		System.out.println("parametersForTestFilterByAttributeOnEntitiesCollection");
		TestParameterBuilder pb = new TestParameterBuilder("10") {
			@Override
			protected NameValuePair[] getParams(int i) {
				String filterString = "\"as_string='Acdfkg'\"";
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
		},getSessionHttpContext());
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestFilterByAttributeOnSpecificEntity()
			throws Throwable {
		TestParameterBuilder pb = new TestParameterBuilder("12") {
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

		TestParameterBuilder pb = new TestParameterBuilder("11") {
			@Override
		
			protected String getEntitySet(int i) {
				DataClass<Attributes> dsu = getDSClient().getDataClass(Attributes.class);
				String eSetUuid = "";
				try {
					eSetUuid = dsu.createEntitySet(getSessionHttpContext());
				} catch (Exception e) {
					e.printStackTrace();
				}
				return eSetUuid;
			}
		};
		return pb.buildParams();

	}

}
