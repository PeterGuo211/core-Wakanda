package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCases_API.class,
	TestCases_bugs.class
})
public class TestSuiteCustomWidget {}
