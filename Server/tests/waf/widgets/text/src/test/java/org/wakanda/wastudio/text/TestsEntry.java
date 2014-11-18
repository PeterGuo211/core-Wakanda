package org.wakanda.wastudio.text;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.text.api.TestCasesTextAPI;
import org.wakanda.wastudio.text.runtime.TextEvents;
@RunWith(Suite.class)
@Suite.SuiteClasses({
	TextEvents.class,
	TestCasesTextAPI.class
	//TestCasesTextEvents.class
	})
public class TestsEntry{
	
}
