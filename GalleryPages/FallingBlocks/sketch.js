/*+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

    FILE: FallingBlocks.js
  AUTHOR: mr Hanley
    DATE: 1/7/2021
 PURPOSE: Start of a Falling Blocks Video Game
 VERSION: 1.0
 
 Possible Music for this Game: Moby Alice, Whispering Wind
 
 +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/

//Declare a List of Blocks
//Blocks have a Color, upper left x and y, width, height and an x and y velocity
//Also a boolean for when they have to be removed.
//This is the array of blocks that will be falling down the screen
blocks = [];
//1/12/2021 Added Bullets
bullets = [];

numBullets = 0; //limit to 12 bullets on screen

time = 0;
(shipLeft = false), (shipRight = false), (shipUp = false), (shipDown = false);
shipX = 50;
shipY = 600;
const UPPERYLIMIT = 500;
const LOWERYLIMIT = 650;

function preload() {
  //Load SpaceShip Images
  ship1 = loadImage("images/ShipA.png"); // Load the image
  //ship2 = loadImage('images/SpaceShip2.png'); // Load the image
  bullet1 = loadImage("images/Bullets1.png"); // Load the image

  //sounds
  soundFormats("mp3", "ogg");
  laserSnd = loadSound("sounds/Lazer1.mp3");
}

function addBlock() {
  blocks.push(
    new Block(
      random(255), // red
      random(255), // green
      random(255), // blue
      random(400), // ux
      0, // uy
      // random(50), //width
      // random(50), // height
      50,
      50,
      random(1), // x velocity
      random(5) // y velocity
    )
  );
}

function setup() {
  createCanvas(800, 800);
  background(color(255, 255, 153));
  //Add 3 blocks to the blocks array
  addBlock();
  addBlock();
  addBlock();
  addBlock();
  addBlock();
  // blocks.push(new Block(56, 78, 100, random(400), 0, 20, 10, 0, 3));
  // blocks.push(new Block(20, 255, 50, random(400), 0, 30, 30, 0, 4));
  // blocks.push(new Block(240, 178, 0, random(400), 0, 10, 20, -0.5, 3));
  // blocks.push(new Block(112, 78, 10, random(400), 0, 15, 30, -0.71, 5));
  // blocks.push(new Block(0, 0, 0, random(400), 0, 50, 50, -2.1, 3.5));

  //default to ship without flames
  currentShip = ship1;
}

function draw() {
  background(color(255, 255, 153));
  //Render the blocks and let them fall
  for (i = 0; i < blocks.length; i++) {
    display(i);
  }
  //Adjust the location of the blocks
  move();
  image(currentShip, shipX, shipY);
  //image(ship2, 300,600);
  time++;
  if (time % 50 == 0) {
    print(blocks.length);
  }
  if (shipLeft) {
    shipX -= 4;
  } else if (shipRight) {
    shipX += 4;
  }
  if (shipUp) {
    //Are we below UPPER LIMIT
    if (shipY > UPPERYLIMIT) {
      shipY -= 4;
      //currentShip = ship2;
      shipDown = false;
    }
  } else if (shipDown) {
    //Are we below UPPER LIMIT
    if (shipY < LOWERYLIMIT) {
      shipY += 4;
      currentShip = ship1;
      shipUp = false;
    }
  }
  //Added 1/13/2021
  //call to check for ship collision with a block/enemy

  checkObstacleCollisions();
  //Animate any bullets
  for (b = bullets.length - 1; b >= 0; b--) {
    //Move the last bullet (top) upwards
    bullets[b].uPY -= 2;
    //is this bullet off the top?
    if (bullets[b].uPY <= 1) {
      bullets.splice(b, 1);
      numBullets--;
    }
    if (bullets[b] != null) image(bullet1, bullets[b].uPX, bullets[b].uPY);
  }
  checkBulletCollisions();

  //Draw the time and the score
  //draw()
}
//------------------------------------------------------------
//   keyPressed()  Let's move the ship left and right and up
//   and back depending upon which key was pressed.
//------------------------------------------------------------
function keyPressed() {
  switch (keyCode) {
    case ENTER:
    case 32: // space
      addBullet();
      laserSnd.play();
      break;

    case LEFT_ARROW:
    case 65: // a
      shipLeft = true;
      shiftRight = false;
      break;

    case RIGHT_ARROW:
    case 68: // d
      shipRight = true;
      shipLeft = false;
      break;

    case UP_ARROW:
    case 87: // w
      shipUp = true;
      shipDown = false;
      break;

    case DOWN_ARROW:
    case 83: // s
      shipUp = false;
      shipDown = true;
      break;
  }
}

function keyReleased() {
  if (keyCode != 32) {
    shipLeft = shipRight = false;
    shipUp = shipDown = false;
  }
  currentShip = ship1;
}

//Change the blocks positions according to the velocity
function move() {
  for (i = 0; i < blocks.length; i++) {
    blocks[i].uX += blocks[i].xVelocity;
    blocks[i].uY += blocks[i].yVelocity;
    //Did this block go off the right side of the screen?
    if (blocks[i].uX >= width) {
      blocks[i].uX = 20;
    }
    //Did this block go off the left side of the screen?
    if (blocks[i].uX <= 0) {
      blocks[i].uX = width - 20;
    }
    //Did this block go off the bottom of the screen?
    if (blocks[i].uY >= height)
      //blocks[i].removeMe = true;  //Mark this block to be removed
      blocks[i].uY = -3;
  }
  //Remove blocks from bottom
  //removeIt();
}

function display(which) {
  //get the fill color ready...
  fill(blocks[which].redCol, blocks[which].greenCol, blocks[which].blueCol);

  //render the block
  rect(
    blocks[which].uX,
    blocks[which].uY,
    blocks[which].width,
    blocks[which].height
  );
}
//------------------------------------------------------------
//   removeIt()  removes any blocks where the flag removeMe is true
//   I used Shiffman's Video https://www.youtube.com/watch?v=tA_ZgruFF9k
//   He suggests looping from the back of the array to the front and
//   using the splice command to get rid of...
//------------------------------------------------------------
function removeIt() {
  for (j = blocks.length - 1; j >= 0; j--)
    if (blocks[j].removeMe == true) {
      blocks.splice(j, 1);
    }
}
//------------------------------------------------------------
//  addBullet: tries to add a bullet from the space ship
//------------------------------------------------------------
function addBullet() {
  //Are their already 6 bullets?
  if (numBullets == 16) {
    return;
  }
  numBullets++;
  //Start a new bullet from this x position and y position of ship
  blt = new Bullet(bullet1, shipX + 15, shipY - 40, 0, -3, false);
  bullets.push(blt);
}
//------------------------------------------------------------
//  checkBulletCollisions: sees if bullets struck something
//------------------------------------------------------------
function checkBulletCollisions() {
  //Have any of the blocks hit the bullet????
  for (blk = bullets.length - 1; blk >= 0; blk--) {
    //Get this bullets 4 corners
    //Get the bottom rectangle of the bullet
    // x1, y1------------x2
    //|              |
    //|              |
    //|              |
    //y2-------------
    let x1 = bullets[blk].uPX;
    let x2 = bullets[blk].uPX + 10;
    let y1 = bullets[blk].uPY;
    let y2 = bullets[blk].uPY + 20;

    //Loop through all of the blocks...
    for (i = blocks.length - 1; i >= 0; i--) {
      //Lets see if the y coords over lap?
      //Bottom of block
      let bottomYFallingBlock = int(blocks[i].uY + blocks[i].height);
      let topYFallingBlock = int(blocks[i].uY);

      if (
        (bottomYFallingBlock >= y1 && bottomYFallingBlock <= y2) ||
        (topYFallingBlock >= y1 && topYFallingBlock <= y2)
      ) {
        //Y is in range to collide with bottom part of block, let's check X
        let leftXFallingBlock = int(blocks[i].uX);
        let rightXFallingBlock = int(blocks[i].uX + blocks[i].width);
        //         print('-----------------------------');
        //         print('INSIDE Y OVERLAP, Block ' + i);
        //         print('leftXFB = ' + leftXFallingBlock);
        //         print('rightXFB = ' + rightXFallingBlock);

        //         print('_____________________________________');
        //         print(' Bullet AT X1 =' + x1 + ' y1 = ' + y1 + ' x2 = ' + x2 + ' y2 = ' + y2);
        //         print('_____________________________________');
        //         print('X1 GTE left Falling Block = ' + x1 >= leftXFallingBlock);
        //         print('X1 LTE right Falling Block = ' + x1 <= rightXFallingBlock);
        if (
          (x1 >= leftXFallingBlock && x1 <= rightXFallingBlock) ||
          (x2 >= leftXFallingBlock && x2 <= rightXFallingBlock)
        ) {
          print("COLLISION");
          //we have a collision
          //remove both bullet and block
          blocks.splice(i, 1);
          bullets.splice(blk, 1);
          numBullets--;

          // Bullet hell mode :)
          //  addBlock();
          //  addBlock();
        }
      }
    }
  }
}

//Added 1/13/2021
function checkObstacleCollisions() {
  //Get the bottom rectangle of the ship
  // x1------------x2
  //|              |
  //|              |
  //|              |
  //x3-------------x4
  let x1 = shipX + 5;
  let x2 = shipX + 50;
  let y1 = shipY + 38;
  let y2 = shipY + 62;

  //Loop through all of the blocks...
  for (i = 0; i < blocks.length; i++) {
    //Lets see if the y coords over lap?
    //Bottom of block
    let bottomYFallingBlock = int(blocks[i].uY + blocks[i].height);
    let topYFallingBlock = int(blocks[i].uY);

    if (
      (bottomYFallingBlock >= y1 && bottomYFallingBlock <= y2) ||
      (topYFallingBlock >= y1 && topYFallingBlock <= y2)
    ) {
      //Y is in range to collide with bottom part of ship, let's check X
      let leftXFallingBlock = int(blocks[i].uX);
      let rightXFallingBlock = int(blocks[i].uX + blocks[i].width);
      //       print('-----------------------------');
      //       print('INSIDE Y OVERLAP, Block ' + i);
      //       print('leftXFB = ' + leftXFallingBlock);
      //       print('rightXFB = ' + rightXFallingBlock);

      //       print('_____________________________________');
      //       print(' SHIP AT X1 =' + x1 + ' y1 = ' + y1 + ' x2 = ' + x2 + ' y2 = ' + y2);
      //       print('_____________________________________');

      if (
        (leftXFallingBlock >= x1 && leftXFallingBlock <= x2) ||
        (rightXFallingBlock >= x1 && rightXFallingBlock <= x2)
      ) {
        //we have a collision
        //Change the background color
        background(color(255, 56, 78));
      }
    }
  }
}

//------------------------------------------------------------
// Class used to model the falling blocks
//------------------------------------------------------------
class Block {
  constructor(
    redCol,
    greenCol,
    blueCol,
    uX,
    uY,
    width,
    height,
    xVelocity,
    yVelocity,
    removeMe
  ) {
    this.redCol = redCol;
    this.greenCol = greenCol;
    this.blueCol = blueCol;
    this.uX = uX;
    this.uY = uY;
    this.width = width;
    this.height = height;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.removeMe = removeMe;
  }
}
//------------------------------------------------------------
// Class used to model the bullets from the ship
//------------------------------------------------------------
class Bullet {
  constructor(img, uPX, uPY, xVelocity, yVelocity, removeMe) {
    this.img = img;
    this.uPX = uPX;
    this.uPY = uPY;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.removeMe = false;
  }
}
