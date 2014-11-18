package org.wakanda.debuggerchrome;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.common.server.AdminCommand;
@RunWith(Suite.class)
@Suite.SuiteClasses({
	NominalTestCases.class,
	Console.class,
	DebuggerCommands.class,
	Watcher.class,
	AutoCompletionConsole.class,
	AutoCompletionWatchExpression.class
	})	
public class TestsEntry{
	

	
}
