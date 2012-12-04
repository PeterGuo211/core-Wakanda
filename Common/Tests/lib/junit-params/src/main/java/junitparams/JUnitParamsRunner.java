package junitparams;

import java.util.*;


import org.junit.runner.*;
import org.junit.runner.notification.*;
import org.junit.runners.*;
import org.junit.runners.model.*;

/**
 * <h1>JUnitParams</h1><br/>
 * <p>
 * JUnit runner for parameterised tests. Annotate your test class with
 * <code>&#064;RunWith(JUnitParamsRunner.class)</code> and place
 * <code>&#064;Parameters</code> annotation on each test method which requires
 * parameters.
 * </p>
 * <br/>
 * <h2>Contents</h2> <b> <a href="#1">1. Parameterising tests</a><br/>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#a">a. Parameterising tests via values
 * in annotation</a><br/>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#b">b. Parameterising tests via a
 * method that returns parameter values</a><br/>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#c">c. Parameterising tests via
 * external classes</a><br/>
 * <a href="#2">2. Using JUnitParams together with Spring</a><br/>
 * <a href="#2">3. Other options</a><br/>
 * </b><br/>
 * <h3 id="1">1. Parameterising tests</h3> <h4 id="a">a. Parameterising tests
 * via values in annotation</h4>
 * <p>
 * Parameterising tests with values defined in annotations:
 * 
 * <pre>
 *   &#064;Test
 *   &#064;Parameters({ "20, Tarzan", "0, Jane" })
 *   public void testReadyToLiveInJungle(int yearsInJungle, String person) {
 *       ...
 *   }
 * </pre>
 * 
 * </p>
 * <h4 id="b">b. Parameterising tests via a method that returns parameter values
 * </h4>
 * <p>
 * Tests can also be parameterised using a method that provides values:
 * 
 * <pre>
 *   &#064;Test
 *   &#064;Parameters(method = "cartoonCharacters")
 *   public void testReadyToLiveInJungle(int yearsInJungle, String person) {
 *       ...
 *   }
 *   private Object[] cartoonCharacters() {
 *      return $(
 *          $(0, "Tarzan"),
 *          $(20, "Jane")
 *      );
 *   }
 * </pre>
 * 
 * Where <code>$(...)</code> is a static method defined in
 * <code>JUnitParamsRunner</code> class, which returns its parameters as a
 * <code>Object[]</code> array.
 * </p>
 * <p>
 * The <code>method</code> argument of a <code>@Parameters</code> annotation can
 * be ommited if the method that provides parameters has a the same name as the
 * test, but prefixed by <code>parametersFor</code>. So our example would look
 * like this:
 * 
 * <pre>
 *   &#064;Test
 *   &#064;Parameters
 *   public void testReadyToLiveInJungle(int yearsInJungle, String person) {
 *       ...
 *   }
 *   private Object[] parametersForCartoonCharacters() {
 *      return $(
 *          $(0, "Tarzan"),
 *          $(20, "Jane")
 *      );
 *   }
 * </pre>
 * 
 * </p>
 * <p>
 * The <code>method</code> argument can accept more than one method, so you can
 * divide your parameter sets into categories e.g. positive and negative cases.
 * </p>
 * <h4 id="c">c. Parameterising tests via external classes</h4>
 * <p>
 * For more complex cases you may want to externalise the method that provides
 * parameters or use more than one method to provide parameters to a single test
 * method. You can easily do that like this:
 * 
 * <pre>
 *   &#064;Test
 *   &#064;Parameters(source = CartoonCharactersProvider.class)
 *   public void testReadyToLiveInJungle(int yearsInJungle, String person) {
 *       ...
 *   }
 *   ...
 *   class CartoonCharactersProvider {
 *      public static Object[] provideCartoonCharactersManually() {
 *          return $(
 *              $(0, "Tarzan"),
 *              $(20, "Jane")
 *          );
 *      }
 *      public static Object[] provideCartoonCharactersFromDB() {
 *          return cartoonsRepository.loadCharacters();
 *      }
 *   }
 * </pre>
 * 
 * All methods starting with <code>provide</code> are used as parameter
 * providers.
 * </p>
 * 
 * <h3 id="2">2. Usage with Spring</h3>
 * <p>
 * You can easily use JUnitParams together with Spring. The only problem is that
 * Spring's test framework is based on JUnit runners, and JUnit allows only one
 * runner to be run at once. Which would normally mean that you could use only
 * one of Spring or JUnitParams. Luckily we can cheat Spring a little by adding
 * this to your test class:
 * 
 * <pre>
 * private TestContextManager testContextManager;
 * 
 * &#064;Before
 * public void init() throws Exception {
 *     this.testContextManager = new TestContextManager(getClass());
 *     this.testContextManager.prepareTestInstance(this);
 * }
 * </pre>
 * 
 * This lets you use in your tests anything that Spring provides in its test
 * framework.
 * </p>
 * 
 * <h3 id="1">3. Other options</h3> <h4>Customizing how parameter objects are
 * shown in IDE</h4>
 * <p>
 * Tests show up in your IDE as a tree with test class name being the root, test
 * methods being nodes, and parameter sets being the leaves. If you want to
 * customize the way an parameter object is shown, create a <b>toString</b>
 * method for it.
 * </p>
 * <h4>Empty parameter sets</h4>
 * <p>
 * If you create a parameterised test, but won't give it any parameter sets, it
 * will be ignored and you'll be warned about it.
 * </p>
 * <h4>Parameterised test with no parameters</h4>
 * <p>
 * If for some reason you want to have a normal non-parameterised method to be
 * annotated with @Parameters, then fine, you can do it. But it will be ignored
 * then, since there won't be any params for it, and parameterised tests need
 * parameters to execute properly (parameters are a part of test setup, right?)
 * </p>
 * <h4>JUnit Rules</h4>
 * <p>
 * The runner for parameterised test is trying to keep all the @Rule's running,
 * but if something doesn't work - let me know. It's pretty tricky, since the
 * rules in JUnit are chained, but the chain is kind of... unstructured, so
 * sometimes I need to guess how to call the next element in chain. If you have
 * your own rule, make sure it has a field of type Statement which is the next
 * statement in chain to call.
 * </p>
 * <h4>Test inheritance</h4>
 * <p>
 * Although usually a bad idea, since it makes tests less readable, sometimes
 * inheritance is the best way to remove repetitions from tests. JUnitParams is
 * fine with inheritance - you can define a common test in the superclass, and
 * have separate parameters provider methods in the subclasses. Also the other
 * way around is ok, you can define parameter providers in superclass and have
 * tests in subclasses uses them as their input.
 * </p>
 * <h4>Collections</h4>
 * <p>
 * Instead of using ugly Object[][] for parameters (even though it's much nicer
 * with my $(...) method), sometimes you may prefer to have parameter sets in
 * Collections. JUnitParams likes collections as well, so you can return any
 * Iterable from your parameters provider method. The Iterable elements must be
 * Object[] containing consecutive params, but for this $(...) is better than
 * anything else. So a method may look like this:<br/>
 * 
 * <pre>
 * private List&lt;Object[]&gt; parametersForCartoonCharacters() {
 *     return Arrays.asList(
 *             $(0, &quot;Tarzan&quot;),
 *             $(20, &quot;Jane&quot;)
 *             );
 * }
 * </pre>
 * 
 * There is also a simplified version - if your test method has just one
 * parameter, you can return just an Object[] or Iterable with param values,
 * without the need to encapsulate them in Object[]. So you may do this:<br/>
 * 
 * <pre>
 * private List&lt;String&gt; parametersForCartoonCharacters() {
 *     return Arrays.asList(&quot;Tarzan&quot;, &quot;Jane&quot;, &quot;Scooby&quot;, &quot;Donald&quot;);
 * }
 * </pre>
 * 
 * </p>
 * 
 * @author Pawel Lipinski (lipinski.pawel@gmail.com)
 */
public class JUnitParamsRunner extends BlockJUnit4ClassRunner {

    private ParameterisedTestClassRunner parameterisedRunner;
    private Description description;

    public JUnitParamsRunner(Class<?> klass) throws InitializationError {
        super(klass);
        parameterisedRunner = new ParameterisedTestClassRunner(getTestClass());
    }

    protected void collectInitializationErrors(List<Throwable> errors) {
        for (Throwable throwable : errors)
            throwable.printStackTrace();
    }

    @Override
    protected void runChild(FrameworkMethod method, RunNotifier notifier) {
        if (handleIgnored(method, notifier))
            return;

        TestMethod testMethod = parameterisedRunner.testMethodFor(method);
        if (parameterisedRunner.shouldRun(testMethod))
            parameterisedRunner.runParameterisedTest(testMethod, methodBlock(method), notifier);
        else
            super.runChild(method, notifier);
    }

    private boolean handleIgnored(FrameworkMethod method, RunNotifier notifier) {
        TestMethod testMethod = parameterisedRunner.testMethodFor(method);
        if (testMethod.isIgnored())
            notifier.fireTestIgnored(describeMethod(method));

        return testMethod.isIgnored();
    }

    @Override
    protected List<FrameworkMethod> computeTestMethods() {
        return parameterisedRunner.computeFrameworkMethods();
    }

    @Override
    protected Statement methodInvoker(FrameworkMethod method, Object test) {
        Statement methodInvoker = parameterisedRunner.parameterisedMethodInvoker(method, test);
        if (methodInvoker == null)
            methodInvoker = super.methodInvoker(method, test);

        return methodInvoker;
    }

    @Override
    public Description getDescription() {
        if (description == null) {
            description = Description.createSuiteDescription(getName(), getTestClass().getAnnotations());
            List<FrameworkMethod> resultMethods = parameterisedRunner.returnListOfMethods();

            for (FrameworkMethod method : resultMethods)
                description.addChild(describeMethod(method));
        }

        return description;
    }

    private Description describeMethod(FrameworkMethod method) {
        Description child = parameterisedRunner.describeParameterisedMethod(method);

        if (child == null)
            child = describeChild(method);

        return child;
    }

    /**
     * Shortcut for returning an array of objects. All parameters passed to this
     * method are returned in an <code>Object[]</code> array.
     * 
     * @param params
     *            Values to be returned in an <code>Object[]</code> array.
     * @return Values passed to this method.
     */
    public static Object[] $(Object... params) {
        return params;
    }
}
