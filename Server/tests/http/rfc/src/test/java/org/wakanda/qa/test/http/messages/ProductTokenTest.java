package org.wakanda.qa.test.http.messages;

import static org.junit.Assert.assertTrue;
import static org.wakanda.qa.test.http.HttpRegEx.*;

import java.util.regex.Pattern;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpHead;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all tests related with the product token.
 * 
 * @author Ouissam
 * 
 */
public class ProductTokenTest extends AbstractTestCase {
	

	/**
	 * <b>Implements:</b> ProductToken00
	 * <p/>
	 * Check that Product Token sent by server matches the pattern (product =
	 * token ["/" product-version])
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616-3.8) & SPEC698 (RFC2616-14.38)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProductTokenPattern() throws Exception {
		// product-version = token
		String productVersion = TOKEN;
		// product = token ["/" product-version]
		String product = TOKEN + "(/" + productVersion + ")?";

		// Server = "Server" ":" 1*( product | comment )
		// Most fields using product tokens also allow sub-products which form a
		// significant part of the application to be listed, separated by white
		// space.
		//String server = "(" + product + "|" + COMMENT + ")+";
		String productToken = product + "|" + COMMENT;
		String server = "(" + productToken + ")([ ](" + productToken +"))*";

		HttpHead request = new HttpHead("/");
		HttpResponse response = executeRequest(request);
		Header hServer = response.getFirstHeader(HttpHeaders.SERVER);
		if (hServer != null) {
			String vServer = hServer.getValue();
			logger.debug(vServer);
			assertTrue("Server does not respect the Product token pattern",
					Pattern.matches(server, vServer));
		}

	}

}
