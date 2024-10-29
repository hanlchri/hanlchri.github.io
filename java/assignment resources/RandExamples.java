/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  File:    RandExamples.java
  Date:    3/25/2007
  Author:  mr. Hanley
  Purpose: Demonstrate the Random class
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
import java.util.Random;

public class RandExamples {

    static Random r = new Random();  //create a Random object with seed=
    
    public static void main(String[] args) {
        for(int i=0; i<25; i++){
            int x = r.nextInt(1000);
            System.out.println("x = " + x);
            try {
                Thread.sleep(200);             
            }catch(Exception e){
                
            }
        }
        //Use nextInt
        int number = r.nextInt(10);
        System.out.println("r.nextInt(10); number = " + number);
        int number1 = r.nextInt(5);
        System.out.println("r.nextInt(5) number1 = " + number1);

        int number2 = r.nextInt(3)+1;
        System.out.println("r.nextInt(3)+1 number2 = " + number2);

        //nextBoolean
        boolean yes = r.nextBoolean();
        System.out.println("r.nextBoolean() yes = " + yes);


        //nextDouble
        double m = r.nextDouble();  //gives us a number between 0 and 1(non-inclusive)
        System.out.println("r.nextDouble() m = " + m);

        double n = r.nextDouble();
        System.out.println("r.nextDouble() n = " + n);


    }
}
