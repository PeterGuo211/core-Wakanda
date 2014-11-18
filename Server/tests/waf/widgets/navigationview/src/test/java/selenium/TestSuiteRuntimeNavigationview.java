package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesNavigation_general.class,
	TestCasesNavigationAPI.class,
	TestCasesNavigationEvents.class
})
public class TestSuiteRuntimeNavigationview {}
