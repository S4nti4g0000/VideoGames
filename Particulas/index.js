
//array to fill with the particles

let bubbles = []; 

function setup() {
    // creates the workspace
    createCanvas(1200,800);
}

// function to detect the clicking and dragging of the mouse so the bubbles can be drawn

function mouseDragged(){

    //will be used later to make the particles shake
    let r = random(10, 50);
    //creates the class bubble
    let b = new Bubble(mouseX, mouseY, r);
    //method to add items to the array of the bubbles
    bubbles.push(b);
}



function draw() {
    background(0);

    //loop to draw the particles in the canvas
    for(let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].show();
    }
}


class Bubble {
    // checks position of the mouse in the screen
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    // particle shake using random
    move() {
        this.x = this.x + random(-2, 2);
        this.y = this.y + random(-2, 2);
    }
    // shows the particle in screen
    show() {
        // color, size, fill and shape of the particles
        stroke(255);
        strokeWeight(4);
        noFill();
        ellipse(this.x, this.y, this.r * 2);
    }

}