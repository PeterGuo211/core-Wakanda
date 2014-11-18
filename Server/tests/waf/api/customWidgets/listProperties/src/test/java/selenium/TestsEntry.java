package selenium;


import org.junit.runner.RunWith;
import org.junit.runners.Suite;


@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesListAPI.class,
	TestCasesListEvent_onChange.class,
	TestCasesListEvent_onInsert.class,
	TestCasesListEvent_onRemove.class,
	TestCasesListEvent_onMove.class,
	TestCasesListEvent_onModify.class
})
public class TestsEntry {
	
}

