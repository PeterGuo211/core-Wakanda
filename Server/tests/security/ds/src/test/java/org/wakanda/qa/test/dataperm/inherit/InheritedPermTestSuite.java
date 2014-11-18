package org.wakanda.qa.test.dataperm.inherit;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.dataperm.inherit.method.Execute;
import org.wakanda.qa.test.dataperm.inherit.method.Promote;



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
	Promote.class,
	Force.class,
	OverridePerm.class
	})
public class InheritedPermTestSuite {
	
}
