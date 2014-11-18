package org.wakanda.wastudio.icon;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.icon.mixed.component.AdvancedTestCasesIconEvents;
import org.wakanda.wastudio.icon.runtime.IconEvents;
@RunWith(Suite.class)
@Suite.SuiteClasses({
   IconEvents.class,
   //TestCasesIconEvents.class,
   AdvancedTestCasesIconEvents.class
})
public class TestsEntry {
    
}
