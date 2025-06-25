

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class CarTest1.
 *
 * @author  (your name)
 * @version (a version number or a date)
 */
public class CarTest1
{
    /**
     * Default constructor for test class CarTest1
     */
    public CarTest1()
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
    public void testAddGasAndDrive()
    {
        Car c1 = new Car(30);
        c1.addGas(10);
        assertEquals(10, c1.getGas(), 0.0);
        c1.drive(120);
        assertEquals(6, c1.getGas(), 0.0);
    }
}

