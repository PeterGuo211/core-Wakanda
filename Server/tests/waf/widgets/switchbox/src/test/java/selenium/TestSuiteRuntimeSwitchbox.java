package selenium;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSwitchboxAPI.class,
	TestCasesSwitchboxEvents.class
})
public class TestSuiteRuntimeSwitchbox {}
