package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCases_ClassAPI.class,
	TestCases_InstanceMethod.class
	
})
public class TestsEntry {}
