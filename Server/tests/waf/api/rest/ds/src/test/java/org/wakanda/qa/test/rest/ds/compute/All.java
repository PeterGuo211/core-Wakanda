package org.wakanda.qa.test.rest.ds.compute;


import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class All extends AbstractTestCase {

	private RESTRequestBuilder getDefaultRestRequestBuilder() {
		return getRESTRequestBuilder("Complex", Complex.class);
	}

	@Test
	public void testAllForTypeLong() throws Throwable {
		
		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG.getArray()).compute(Constants.ALL);
		checkEntities("24-1", uri);

	}

	@Test
	public void testAllForTypeByte() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.BYTE.getArray()).compute(Constants.ALL);
		checkEntities("24-2", uri);

	}

	@Test
	public void testAllForTypeWord() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.WORD.getArray()).compute(Constants.ALL);
		checkEntities("24-3", uri);

	}

	@Test
	public void testAllForTypeLong64() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.LONG64.getArray()).compute(Constants.ALL);

		checkEntities("24-4", uri);
	}

	@Test
	public void testAllForTypeDuration() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DURATION.getArray()).compute(Constants.ALL);
		checkEntities("24-5", uri);

	}
	@Ignore
	@Test
	public void testAllOfTypeNumber() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.NUMBER.getArray()).compute(Constants.ALL);
		checkEntities("24-6", uri);

	}

	@Test
	public void testAllOfTypeString() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.STRING.getArray()).compute(Constants.ALL);
		checkEntities("24-7", uri);
	}

	@Test
	public void testAllOfTypeDate() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.DATE.getArray()).compute(Constants.ALL);
		checkEntities("24-8", uri);

	}

	@Test
	public void testAllOfTypeUuid() throws Throwable {

		RESTRequestBuilder uri = getDefaultRestRequestBuilder().addAttributes(
				Attributes.UUID.getArray()).compute(Constants.ALL);
		checkEntities("24-9", uri);


	}

}
