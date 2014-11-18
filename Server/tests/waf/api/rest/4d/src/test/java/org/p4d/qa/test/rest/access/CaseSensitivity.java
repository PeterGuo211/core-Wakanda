package org.p4d.qa.test.rest.access;


import org.apache.http.HttpStatus;
import org.junit.Test;
import org.p4d.qa.test.rest.extend.AbstractTestCase;



/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class CaseSensitivity extends AbstractTestCase {
	
	
	@Test
	public void testDataClassNameIsCaseSensitive() throws Exception {
		
		
		
		String url = "/casesensitive/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url,getSessionHttpContext());
		
		url = "/CaseSeNsItIvE/";
		assertEqualsStatusCode(HttpStatus.SC_OK, url,getSessionHttpContext());

		url = "/CASESENSITIVE/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url, getSessionHttpContext());
		
	}
	

    @Test
	public void testDataClassAttributeNameIsCaseSensitive() throws Exception {

    	

		
		String url = "/CaseSeNsItIvE/AS_STRING_1";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url,getSessionHttpContext());
		
		url = "/CaseSeNsItIvE/as_string_1";
		assertEqualsStatusCode(HttpStatus.SC_OK, url,getSessionHttpContext());

		url = "/CaseSeNsItIvE/aS_stRinG_1";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url,getSessionHttpContext());
		
	}
   

}


//http://localhost:8081/rest/CaseSeNsItIvE