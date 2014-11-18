package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesDesktopRouting_HTTP.class,
	TestCasesDesktopRouting_HTTPS.class,
	TestCasesTabletRouting_HTTP.class,
	TestCasesTabletRouting_HTTPS.class,
	TestCasesSmartphoneRouting_HTTP.class,
	TestCasesSmartphoneRouting_HTTPS.class
})
public class TestSuiteWapageRouting {}
