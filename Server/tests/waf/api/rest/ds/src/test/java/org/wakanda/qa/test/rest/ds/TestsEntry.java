package org.wakanda.qa.test.rest.ds;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.rest.ds.access.DataAccessSuite;
import org.wakanda.qa.test.rest.ds.compute.ComputeSuite;
import org.wakanda.qa.test.rest.ds.cud.DataHandlingSuite;
import org.wakanda.qa.test.rest.ds.entityset.EntitySetSuite;
import org.wakanda.qa.test.rest.ds.generalinfos.GeneralinfosSuite;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({DataAccessSuite.class, DataHandlingSuite.class, ComputeSuite.class,
	EntitySetSuite.class, GeneralinfosSuite.class })
public class TestsEntry {

}
