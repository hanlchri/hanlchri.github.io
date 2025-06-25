

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class TestStudent1.
 *
 * @author  (your name)
 * @version (a version number or a date)
 */
public class TestStudent1
{
    /**
     * Default constructor for test class TestStudent1
     */
    public TestStudent1()
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
    public void testConstructoraddQuizavgScore()
    {
        Student s1 = new Student("Billy");
        s1.addQuiz(100);
        s1.addQuiz(96);
        s1.addQuiz(90);
        assertEquals(95, s1.getAverageScore(),0.0);
        assertEquals(286,s1.getTotalScore(),0.0);
    }
}

