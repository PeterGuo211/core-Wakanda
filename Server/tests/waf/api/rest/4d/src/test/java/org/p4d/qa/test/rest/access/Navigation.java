package org.p4d.qa.test.rest.access;


import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.p4d.qa.test.rest.domain.Simple;
import org.p4d.qa.test.rest.extend.AbstractTestCase;;

		/**
		 * @author soufiane.tigrioui@4d.com
		 * 
		 */

public class Navigation extends AbstractTestCase {

	private RESTRequestBuilder getDefaultRESTRequestBuilder() {
		return getRESTRequestBuilder("Simple", Simple.class);
	}


	/**
	 * Test Skip attribute
	 * 
	 * @throws Throwable
	 */
	@Test
	public void testSkipAttribute() throws Throwable {
	
		checkEntities(getDefaultRESTRequestBuilder().skip(5), "03",getSessionHttpContext());
	}



	@Test
	public void testTopAttribute() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().top(5), "03-1",getSessionHttpContext());
	}

	/**
	 * @throws Throwable
	 */
	@Test
	public void testSkipAndTopAttributes() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().skip(2).top(5), "03-2",getSessionHttpContext());
	}
	

	
	@Test
	public void testSkipAndTopAttributesWhenBothAreNegative() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().skip(-2).top(-2), "03-3",getSessionHttpContext());

	}

	@Test
	public void testSkipAttributesWhenNegative() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().skip(-2), "03-3",getSessionHttpContext());

	}
	
	@Test
	public void testTopAttributeWhenNegative() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().top(-2), "03-3",getSessionHttpContext());

	}

	@Test
	public void testTopAttributeWhenEqualToZero() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().top(0), "03-4",getSessionHttpContext());

	}
	
//	@Test
//	public void testSkipAttributeWhenEqualToZero() throws Throwable {
//		
//		checkEntities(getDefaultRESTRequestBuilder().skip(0), "03-6",getSessionHttpContext());
//	}
	
	@Test
	public void testSkipAndTopAttributesWhenBothAreEqualToZero() throws Throwable {
		
		checkEntities(getDefaultRESTRequestBuilder().skip(0).top(0), "03-5",getSessionHttpContext());
	}
	

}
