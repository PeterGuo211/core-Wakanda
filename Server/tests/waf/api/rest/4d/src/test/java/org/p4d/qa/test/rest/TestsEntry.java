package org.p4d.qa.test.rest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.p4d.qa.test.rest.access.CaseSensitivity;
import org.p4d.qa.test.rest.access.FilterByAttributes;
import org.p4d.qa.test.rest.access.Navigation;
import org.p4d.qa.test.rest.access.Table4D;
import org.p4d.qa.test.rest.access.TableKey;
import org.p4d.qa.test.rest.crud.Update;
/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ CaseSensitivity.class, Navigation.class, TableKey.class,
		Table4D.class, FilterByAttributes.class, Update.class})

public class TestsEntry {

}