package org.wakanda.qa.test.rest.ds.access;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ CaseSensitivity.class, DataClass_.class, DataClassKey.class,
		DataClassMethod.class, FilterByAttributes.class, Scope.class })
public class DataAccessSuite {

}
