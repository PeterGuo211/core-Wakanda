package org.wakanda.qa.widgets.component;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.component.api.TestCasesComponentAPI;
import org.wakanda.qa.widgets.component.bugs.TestCasesAdvanced;
import org.wakanda.qa.widgets.component.runtime.TestCasesComponentEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesComponentAPI.class,
	TestCasesComponentEvents.class,
	TestCasesAdvanced.class
})
public class TestsEntry {
}
