/**
 * <p>Title: FreqFrame displays a frequency histogram in a JFrame</p>
 *
 * <p>Description: Use the paint method to render stuff to the screen</p>
 *
 * <p>Copyright: Copyright (c) 2008</p>
 *
 * <p>Company: World Wide Pants, Inc</p>
 *
 * @author Hanley
 * @version 1.0
 */

/*  THIS IS THE STUFF I PUT IN CINDY'S FILE

 PUT THIS ABOVE THE MAIN BUT IN THE CLASS
 static FreqFrame f = new FreqFrame();

 - PUT IT IN YOUR MAIN WITH AN IMPORT FOR JAVA.AWT.COLOR AT
 THE TOP


 public static void main(String[] args) {

        //Set the "baby" frame size
         f.setSize(900,600);
         f.setTitle("                           &&&&&&&&&& Cindy Wong's Graphical Frequency Histogram &&&&&&&&&");
         f.setBackground(Color.orange);
         f.setVisible(true);

*/

import java.awt.*;
import javax.swing.*;

public class FreqFrameSolution extends JFrame {

    private int[] frequencies={1,1,1,1,1,1,1,1,1,1,1};

                              // }; //Represents the 11 frequencies for the dice roll
    //2,5,6,7,8,20,9,6,4,0,1
    //200,512,600,710,800,2000,956,300,412,60,50
    private int max; //the largest frequency
    double scale;  //Scales the histogram according to the max 550/max
    Font fo = new Font("Arial",Font.BOLD,18);

    public void paint(Graphics g) {
        //Acts like a movie projector, renders stuff to the screen
        /*
      ----------------------------------------------------------------------
       | 900
       |
600    |
       |     37    37
       |74  --- 37 ---
       |
       |     2      3
       ----------------------------------------------------------------------
      (0,599)
        */
       g.setFont(fo);

       //Draw the bottom line
       g.drawLine(15,565,899,565);
       max = findMax();
       if(max!=0)
           scale = 500.0/max;

       //draw the left line
       g.drawLine(15,565,15,0);

       //draw the numbers
       for(int i=0,x=90; i<11; i++,x=x+74){
           String output = new String(""+(i+2));
           g.drawString(output,x,585);
       }

       //Draw the y axis
       int per10 = max/10;  //figure out how much each y division is worth
       for (int j=1; j<=11; j++) {
           String output = new String(""+j*per10);
           g.drawString(output,20,565-j*50);
       }
       //Draw the bars
       /*int height = (int)((double)frequencies[0]*scale);
       g.setColor(new Color(50,10,150));
       g.fillRect(74,565-height,37,height);
       height = (int)((double)frequencies[1]*scale);
       g.setColor(new Color(150,100,5));
       g.fillRect(74+74,565-height,37,height);
*/
      //Draw the bars with a loop
      for(int i=0,x=74; i<11; i++, x+=74)
      {
          //Find the height
          int height = (int)((double)frequencies[i]*scale);
          // Set a variable color
          g.setColor(new Color(200-i*10,150,i*20));
          //Draw the bar
          g.fillRect(x,565-height,37,height);
      }
    }

    public void setFreq(int[] frequen) {
        frequencies = frequen;
    }

    //Figures out the largest value of the freqencies
    public int findMax() {
        int maximum = frequencies[0]; //Assume the first value is max
        for (int i = 1; i < frequencies.length; i++) {
            //Are we the new champ?
            if (frequencies[i] > maximum) {
                //Assign this value to be the new champ
                maximum = frequencies[i];
            }
        }
        return maximum;
    }
}
