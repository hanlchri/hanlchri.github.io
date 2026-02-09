/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * S-h-e-n-e-n-d-e-h-o-w-a--H-i-g-h--S-c-h-o-o-l--T-e-c-h-n-o-l-o-g-y--D-e-p-t
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * FILE:        ArrayPractice_Copying_Skeleton.java
 * DATE:        Dec 5, 2017
 * AUTHOR:      mr Hanley
 * VERSION:     1.0
 * PURPOSE:     Copy and Consolidate between 3 arrays
 *              1/28/2022: Fixed misspelling of caviar
 *              1/10/2023: Added logic to set the default character display
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * m-r-h-a-n-l-e-y-c-.c-o-m~~~~~~~~~~t-e-a-m-2-0-.-c-o-m~~~~~~~~~~~~~~~~~~~~~~
 */

import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Scanner;

public class ArrayPractice_Copying_Skeleton {

    static final char ur = '\u2557';
    static final char ul = '\u2554';
    static final char top = '\u2550';
    static final char side = '\u2551';
    static final char sideTL = '\u2560';
    static final char sideRL = '\u2563';
    static final char bl = '\u255A';
    static final char br = '\u255D';
    static final char one = '\u2776';
    static final char two = '\u2777';
    static final char thr = '\u2778';
    static final char fou = '\u2779';
    static final char fiv = '\u277A';
    static final char six = '\u277B';
    static final char sev = '\u277C';
    static final char eig = '\u277D';
    //----------------------------------------------------------------
    //---------------- G L O B A L  V A R I A B L E S ------------
    //----------------------------------------------------------------

    final int SIZE = 15;
    Scanner input = new Scanner(System.in);
    String[] tryList = new String[SIZE];
    String[] tried = new String[SIZE];
    String[] no = new String[SIZE];
    int tryNum=0;
    int triedNum=0;
    int noNum=0;
   

    public static void main(String[] args) {
        ArrayPractice_Copying_Skeleton es = new ArrayPractice_Copying_Skeleton();  //invoke constructor
    }

    /**
     *
     * @param text give me a text expression
     * @param totalLength total length of String to be filled
     * @return a String of spaces to "pad" the region where len =
     * total.len-text.len
     */
    public String padding(String text, int totalLength) {
        int difference = totalLength - text.length();
        if (difference > 0) {

            for (int i = 0; i < difference; i++) {
                text += " ";
            }
        }
        return text;
    }

    public ArrayPractice_Copying_Skeleton() {
        PrintStream out = new PrintStream(System.out, true, StandardCharsets.UTF_8);
        System.setOut(out);
        menu();
    }

    public void menu() {

        while (true) {
            Date now = new Date();
            System.out.print("\t\t" + ul);
            for (int i = 0; i < 41; i++) {
                System.out.print(top);
            }
            //_________________________________________");
            System.out.println(ur);
            System.out.println("\t\t" + side + "     ***    Array Copying Menu    ***    " + side);
            System.out.print("\t\t" + sideTL);

            for (int i = 0; i < 41; i++) {
                System.out.print(top);
            }
            //_________________________________________
            System.out.println(sideRL);
            System.out.println("\t\t" + side + "        " + one + " = Display Lists                " + side);
            System.out.println("\t\t" + side + "        " + two + " = Move from First List to 2nd  " + side);
            System.out.println("\t\t" + side + "        " + thr + " = Move from First List to 3rd  " + side);
            System.out.println("\t\t" + side + "        " + fou + " = Consolidate First List       " + side);
            System.out.println("\t\t" + side + "        " + fiv + " = Initialize                   " + side);
            System.out.println("\t\t" + side + "        " + six + " = Clear Tried List             " + side);
            System.out.println("\t\t" + side + "        " + sev + " = Add to Try List              " + side);
            System.out.println("\t\t" + side + "        " + eig + " = Exit                         " + side);
            System.out.println("\t\t" + side + "  Your Selection?                        " + side);
            System.out.print("\t\t" + bl);
            for (int i = 0; i < 41; i++) {
                System.out.print(top);
            }
            //+"_________________________________________
            System.out.println(br);

            int choice = input.nextInt();
            switch (choice) {
                case 1:
                    display();
                    break;
                case 2:
                    //moveToTried();
                    break;
                case 3:
                   // moveToNo();
                    break;
                case 4:
                    //consolidate();
                    break;
                case 5:
                    initialize();
                    break;
                case 6:
                    //clearTried();
                    break;
                case 7:
                   // addTryList();
                    break;
                case 8:
                    System.exit(0);
            }
        }
    }

    public void display() {
        System.out.println("\tInterested----------Tried----------------Not going there!-----");
        for (int i = 0; i < SIZE; i++) {
            System.out.print(i + "\t");

            if (tryList[i] == null || tryList[i].equals("")) {
                System.out.print(padding("{EMPTY}", 20));
            } else {
                System.out.print(padding(tryList[i], 20));
            }

            if (tried[i] == null || tried[i].equals("")) {
                System.out.print(padding("{EMPTY}", 20));
            } else {
                System.out.print(padding(tried[i], 20));
            }
            if (no[i] == null || no[i].equals("")) {
                System.out.print(padding("{EMPTY}", 20));
            } else {
                System.out.print(padding(no[i], 20));
            }
            System.out.println("");
        }
    }

    public void initialize() {
        tryList = new String[]{"Fish Eyes", "Frog Legs", "Alligator", "Sushi", "Buffalo",
            "Cow Tongue", "Shark", "Scrapple", "Cheese Steak", "Seaweed",
            "Vegeratian Korma", "Deep Fried Oreo", "ChickBacRanch Pizza", "Caviar", ""};

        tried = new String[]{"Rice and Beans", "Liver",
            "Paella", "Chicken", "Pizza", "", "", "", "", "", "", "", "", "", "", "", "", ""};
        
        no = new String[SIZE];
        tryNum=14;
        triedNum=5;
        noNum =0;

    }

    public void clearTried() {
        
       
    }

    public void moveToTried() {
        System.out.println("Starting with which item?");
        int start = input.nextInt();
        System.out.println("Ending with which item?");
        int end = input.nextInt();
        

    }
    public void addTryList(){
        System.out.println("Please consolidate first");
        System.out.println("OK, what food to add");
        input.skip("\n");
        String word = input.nextLine();
        
    }

}
