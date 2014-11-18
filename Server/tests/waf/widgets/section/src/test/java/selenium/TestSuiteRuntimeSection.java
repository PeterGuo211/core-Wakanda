package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSection_general.class,
	TestCasesSectionAPI.class,
	TestCasesSectionEvents.class
})
public class TestSuiteRuntimeSection {}
