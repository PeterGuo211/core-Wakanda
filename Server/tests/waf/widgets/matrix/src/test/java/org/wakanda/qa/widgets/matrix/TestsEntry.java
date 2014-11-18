package org.wakanda.qa.widgets.matrix;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.matrix.api.TestCasesMatrixAPI;
import org.wakanda.qa.widgets.matrix.runtime.TestCasesMatrixEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesMatrixAPI.class,
	TestCasesMatrixEvents.class
})
public class TestsEntry {
	}
