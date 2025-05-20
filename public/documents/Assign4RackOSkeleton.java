/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * S-h-e-n-e-n-d-e-h-o-w-a--H-i-g-h--S-c-h-o-o-l--T-e-c-h-n-o-l-o-g-y--D-e-p-t
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *      FILE:       RackoSkeleton.java
 *      DATE:       Dec 2, 2019
 *      AUTHOR:     mr Hanley
 *      VERSION:    1.0
 *      PURPOSE:    Play the game Rack-O
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * m-r-h-a-n-l-e-y-c-.c-o-m~~~~~~~~~~t-e-a-m-2-0-.-c-o-m~~~~~~~~~~~~~~~~~~~~~~
 */
import java.util.Random;
import java.util.Scanner;

public class RackoSkeleton {
   
    //Make 2 global arrays
    static int[] myCards = new int[10];
    static int[] yourCards = new int[10];
    static String name;
    static Scanner input = new Scanner(System.in);
    static Random r = new Random();
    static int turn = 1;  //Player 1 goes first
    
    public static void main(String[] args) {
        
        System.out.println("HI, Welcome to Rack-O");
        System.out.println("---------------------");
        System.out.println("I will deal each player 10 cards!!!");
        System.out.println("What's your name, partner?");
        name = input.nextLine();
        
        dealCards();
        while(true){
            System.out.println("The top of the discard pile is...");
            
            if(turn == 1){
                //Player 1's turn, myCards
                displayMyHand();
                System.out.println("Which do you want " + name + " discard pile or deck?");
                int choice = input.nextInt();
            }
            else {
                //Player 2's turn, yourCards
                displayYourHand();
            }
        }
    }
    public static void dealCards(){
        
        
    }
    public static void displayMyHand(){
        
        
    }
    
    public static void displayYourHand(){
        
        
    }
    public static boolean checkWinner(){
        //Need to check if someone won the game.....need all of the numbers ascending 
        return false;
    }
}
