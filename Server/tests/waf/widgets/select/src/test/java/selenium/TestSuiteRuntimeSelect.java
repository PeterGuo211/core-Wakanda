package selenium;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSelectAPI.class,
	TestCasesSelectEvents.class
})
public class TestSuiteRuntimeSelect {}
