package org.wakanda.qa.test.http.entitiy;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	ContentCodingTest.class, 
	MediaTypeTest.class,
	CharSetTest.class, 
	TransferCodingTest.class, 
	MessageLengthTest.class,
	RangeTest.class
	})
public class EntitiyTestSuite {
}
