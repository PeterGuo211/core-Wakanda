/**
 * 
 */
package org.wakanda.qa.widgets.slider;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.slider.api.TestCasesSliderAPI;
import org.wakanda.qa.widgets.slider.runtime.TestCasesSliderEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSliderAPI.class,
	TestCasesSliderEvents.class
	
})
public class TestsEntry {

}
