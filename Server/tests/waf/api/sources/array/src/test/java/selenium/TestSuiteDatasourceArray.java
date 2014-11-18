package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCases_datasourcePrimaryKey.class,
	TestCases_numberPrimaryKey.class,
	TestCases_stringPrimaryKey.class
})
public class TestSuiteDatasourceArray {}
