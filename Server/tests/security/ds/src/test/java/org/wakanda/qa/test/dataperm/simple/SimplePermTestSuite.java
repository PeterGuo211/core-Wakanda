package org.wakanda.qa.test.dataperm.simple;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.dataperm.simple.method.Execute;
import org.wakanda.qa.test.dataperm.simple.method.Promote;



/**
 * @author ouissam.gouni@4d.com
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	Read.class,
	Create.class,
	Update.class,
	Remove.class,
	Execute.class,
	Promote.class
	})
public class SimplePermTestSuite {

}
