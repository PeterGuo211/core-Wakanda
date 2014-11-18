package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCases_bugs.class,
	TestCases_domHelperAPI.class,
	TestCases_methodsHelperAPI.class,
	TestCases_observableAPI.class,
	TestCases_packageJson.class,
	TestCases_studioAPI.class
})
public class TestSuiteCustomWidget {}
