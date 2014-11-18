package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesPopover_general.class,
	TestCasesPopoverAPI.class,
	TestCasesPopoverEvents.class
})
public class TestSuiteRuntimePopover {}
