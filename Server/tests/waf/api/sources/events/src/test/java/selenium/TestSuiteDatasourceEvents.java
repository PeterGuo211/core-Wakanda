package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesArrayEvents.class,
	TestCasesClassEvents.class,
	TestCasesObjectEvents.class,
	TestCasesRelationEvents.class,
	TestCasesVariableEvents.class
})
public class TestSuiteDatasourceEvents {}
