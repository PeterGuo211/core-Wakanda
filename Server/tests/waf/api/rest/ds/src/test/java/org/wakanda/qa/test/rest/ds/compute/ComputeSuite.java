package org.wakanda.qa.test.rest.ds.compute;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
@RunWith(Suite.class)
@SuiteClasses({ All.class, Average.class, Count.class, Max.class, Min.class,
		Sum.class })
public class ComputeSuite {

}
