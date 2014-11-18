package org.wakanda.qa.test.dataperm;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.dataperm.inherit.InheritedPermTestSuite;
import org.wakanda.qa.test.dataperm.simple.SimplePermTestSuite;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ SimplePermTestSuite.class, InheritedPermTestSuite.class })
public class TestsEntry {
	
}
