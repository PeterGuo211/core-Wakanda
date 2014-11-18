package selenium;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesRadio_general.class,
	TestCasesRadioAPI.class,
	TestCasesRadioEvents.class
})
public class TestSuiteRuntimeRadiogroup {}
