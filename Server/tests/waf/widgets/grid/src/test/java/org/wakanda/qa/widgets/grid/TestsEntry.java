package org.wakanda.qa.widgets.grid;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.grid.api.TestCasesGridAPI;
import org.wakanda.qa.widgets.grid.runtime.TestCasesGridEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesGridAPI.class,
	TestCasesGridEvents.class
})
public class TestsEntry {
	
}
