package org.wakanda.wastudio.button;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.button.api.TestCasesButtonAPI;
import org.wakanda.wastudio.button.runtime.ButtonEvents;
import org.wakanda.wastudio.button.runtime.TestCasesButtonEvents;
@RunWith(Suite.class)
@Suite.SuiteClasses({
    ButtonEvents.class,
    TestCasesButtonEvents.class,
    TestCasesButtonAPI.class})
public class TestsEntry{
    }
