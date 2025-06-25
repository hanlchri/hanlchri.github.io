

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class EmployeeTest1.
 *
 * @author  mr Hanley
 * @version 1.0
 * 
 */
public class EmployeeTest1
{
    /**
     * Default constructor for test class EmployeeTest1
     */
    public EmployeeTest1()
    {
        
    }

    /**
     * Sets up the test fixture.
     *
     * Called before every test case method.
     */
    @Before
    public void setUp()
    {
    }

    /**
     * Tears down the test fixture.
     *
     * Called after every test case method.
     */
    @After
    public void tearDown()
    {
    }

    
    @Test
    public void test2argConstructor()
    {
        Employee employee1 = new Employee("Larry Ellison", 100000);
        assertEquals(100000, employee1.getSalary(), 0.0);
        assertEquals("Larry Ellison", employee1.getName());
    }

    @Test
    public void testRaiseSalary()
    {
        Employee emp2 = new Employee("Marissa Mayer", 1.5e6);
        emp2.raise(10);
        assertEquals(1.65e6, emp2.getSalary(), 0.01);
    }
}



