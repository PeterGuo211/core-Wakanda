package org.wakanda.wastudio.checkbox;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.checkbox.api.TestCasesCheckboxAPI;
import org.wakanda.wastudio.checkbox.runtime.CheckboxEvents;
import org.wakanda.wastudio.checkbox.runtime.TestCasesCheckboxEvents;
@RunWith(Suite.class)
@Suite.SuiteClasses({
	CheckboxEvents.class,
	TestCasesCheckboxAPI.class,
	TestCasesCheckboxEvents.class
	})
public class TestsEntry{
}
