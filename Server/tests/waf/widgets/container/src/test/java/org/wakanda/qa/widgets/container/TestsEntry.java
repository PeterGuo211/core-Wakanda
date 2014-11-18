package org.wakanda.qa.widgets.container;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.container.api.TestCasesContainerAPI;
import org.wakanda.qa.widgets.container.mixed.component.AdvancedTestCasesContainerAPI;
import org.wakanda.qa.widgets.container.runtime.TestCasesContainerEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesContainerAPI.class,
	TestCasesContainerEvents.class,
	AdvancedTestCasesContainerAPI.class
})
public class TestsEntry {
}
