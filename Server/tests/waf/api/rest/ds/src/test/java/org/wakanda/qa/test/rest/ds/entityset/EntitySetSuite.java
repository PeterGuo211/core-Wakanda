package org.wakanda.qa.test.rest.ds.entityset;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ AccessEntitySet.class, CreateEntitySet.class,
		RemoveEntitySet.class, SavedFilter.class, SavedOrderBy.class, SubEntitySet.class })
public class EntitySetSuite {

}
