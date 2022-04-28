
/////
/////// IMPORTANT: To visualize the game correctly, it is necessary to open a local server, otherwise it will only show an infinite loading screen, 
/////// so instead of directly opening the html file, click on "Go Live"
/////


let s;
let scl = 20;
let food;
let wellcome = prompt("Username");
let splash = document.querySelector('.intro')
let inter = document.querySelector('.SplScrn')
let SpanEl = document.querySelectorAll('.Sneki')
let txtAnim;
let Sto = 0
let pauseState
let pauseToF = false
let keyaaaa

//to define buttons

let easyButt;
let mediumButt;
let hardButt;
let secretButt
let secretButtTWO
let cashButt = document.getElementById('St')
let cButt
let instButt
let pauseButt = document.querySelector('.theToggler')

//Timer stuff

let TimerCount = 0
let minutesCount = 0
let timeDisplay = document.getElementById('Tim')
let fullTime = null

//All variables (score, higscore, frameRate, sound and some secrets)

var score = 0
var fr;
var highscore = 0;
var mode
var clickNum = 0
var hos = 0
var song01 = document.getElementById("firstSongEver")
var song02 = document.getElementById("secondSong")
var song03 = document.getElementById("thirdSong")
var dSound = document.getElementById("Died")
var secretSound = document.getElementById("SUPERSECRET")
let initSong = document.getElementById('menuSong')

//For the text displays

const div = document.getElementById("SScore")
const div2 = document.getElementById("User")
const div3 = document.getElementById("high")

//sets timeouts for the splash screen animation to work

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{

        SpanEl.forEach((span, idx)=>{

            setTimeout(()=>{

                span.classList.add('active')

            }, (idx + 1) * 500)

        })

        setTimeout(()=>{

            SpanEl.forEach((span, idx)=>{

                setTimeout(()=>{
    
                    span.classList.remove('active')
                    span.classList.add('fade')
    
                }, (idx + 1) * 50)
    
            }, 2000)

        })

        setTimeout(()=>{

            splash.style.top = '-100vh'

        }, 2300)

    })

})

//Make two numbers appear on the timer (00:00)

function twoNum(numbers){

    //show a 0 before the time gets to 10

    if(numbers < 10){

        return '0' + numbers 

    }

    return numbers

}

//Set the timer

function GameTimer(){

    TimerCount++

    //minutes counter

    if(TimerCount === 60){

        TimerCount = 0
        minutesCount++

    }

    //time display using the "twoNum" function

    timeDisplay.textContent = "Time: "+twoNum(minutesCount)+":"+twoNum(TimerCount)


}

//timer settings

function startTime(){

    fullTime = setInterval(GameTimer, 1000)

}

function stopTime(){

    clearInterval(GameTimer)

}

//Difficulties

function eMode(){

    //Setting Framerate based on user input and to play the song of each difficulty level

    song01 = document.getElementById("firstSongEver")
    mode=1
    frameRate(10)
    song01.play()
    pauseState = 1
    
    startTime()

}
function miMode(){

    song02 = document.getElementById("secondSong")
    mode=1;
    frameRate(17)
    song02.play()
    pauseState = 2

    startTime()

}
function hMode(){

    song03 = document.getElementById("thirdSong")
    mode=1;
    frameRate(30)
    song03.play()
    pauseState = 3

    startTime()

}

//To load background image for the main menu canvas

function preload(){

back = loadImage('/Snake/Game/bgGif.gif')

}

//to init the game

function setup(){

    //Game mode initializer so that every time the page reloads, it goes to the main menu

    mode = 0;

    //Button constructor
    
    easyButt = createButton('EASY')
    mediumButt = createButton('MEDIUM')
    hardButt = createButton('HARD')
    retryButt = createButton('RETRY')
    secretButt = createButton('PROCEED WITH CAUTION')
    instButt = createButton('INSTRUCTIONS')
    secretButtTWO = createButton(' ')

    //Instructions

    let insCol = color(158, 66, 245)

    instButt.mousePressed(Ins)
    instButt.position(430,830)
    instButt.style('outline: none'); instButt.style('border: solid #3a1959'); instButt.style('background-color', insCol); instButt.size(150,35); instButt.style('border-radius: 10px'); 
    instButt.style('font-family: VT323, monospace'); instButt.style('color: #dedede'); instButt.style('font-size: 25px'); instButt.style('font-weight: bold');

    //to paint the game area

    createCanvas(600,600);
 
    //snake instance

    s = new Snake();

    //init food

    pickLocationOfFood();
        
}

//Instructions alert

function Ins(){

    alert('You can move with the arrow keys \n\nTry to find the secrets of the page and reach the best score/time possible \n\n(Store is still in construction)')

}

//Randomize the food

function pickLocationOfFood(){

    //random food location

    let cols = floor(width/scl);
    let rows = floor(height/scl);

    food = createVector(floor(random(cols)),floor(random(rows)));
    food.mult(scl);

}

function keyPressed(){

    //Read which key is being pressed

    if(keyCode === UP_ARROW){

        s.dir(0,-1);

    }else if(keyCode === DOWN_ARROW || keyCode === 83){

        s.dir(0,1);

    } else if (keyCode === LEFT_ARROW){

        s.dir(-1,0);

    }else if (keyCode === RIGHT_ARROW){

        s.dir(1,0);

    }else if (keyCode === 80){

        buttToggler()

    }

    //first secret, when the key is pressed, music sounds, can be stopped with the "p" key

    if(keyCode === 220){

        //it is necessary to call the sound again here, otherwise, it will not play
        secretSound = document.getElementById("SUPERSECRET")
        secretSound.play()

    }
    if(keyCode === 187){

        secretSound = document.getElementById("SUPERSECRET")
        secretSound.pause()

    }

}

// to paint the main menu, the play area and the death screen

function draw(){

    menuPlay()

    clear()

    //Main menu 

    if(mode == 0){

        stopTime()
        
        pauseButt.hidden = true

        //buttons color

        let eCol = color(99, 255, 133)
        let miCol = color(255, 182, 99)
        let hCol = color(255, 99, 99)

        background(back)

        //starting text
        
        textSize(45)
        textFont('VT323')
        textStyle(BOLD)
        text('Select a Difficulty to Start',52,220)
        fill(255,255,255)
        
        //Everything buttons related (function, color, position, visibility)

        retryButt.hide()

        //to always show the secret button after it's been unlocked

        if( hos === 0){

            secretButt.hide()

        }else secretButt.show()

        easyButt.show()

        //when the button is pressed, the function "eMode" (seen before the setup) is called, same goes for the other buttons

        easyButt.mousePressed(eMode)

        easyButt.position(890,580)
        easyButt.style('outline: none'); easyButt.style('border: solid #63ff85'); easyButt.style('background-color', eCol); easyButt.size(100,35); easyButt.style('border-radius: 10px');
        easyButt.style('font-family: VT323, monospace'); easyButt.style('color: #11361b'); easyButt.style('font-size: 25px'); easyButt.style('font-weight: bold');

        mediumButt.show()

        mediumButt.mousePressed(miMode)

        mediumButt.position(890,630)
        mediumButt.style('outline: none'); mediumButt.style('border: solid #ffb663'); mediumButt.style('background-color', miCol); mediumButt.size(100,35); mediumButt.style('border-radius: 10px'); 
        mediumButt.style('font-family: VT323, monospace'); mediumButt.style('color: #3d2c18'); mediumButt.style('font-size: 25px'); mediumButt.style('font-weight: bold');

        hardButt.show()

        hardButt.mousePressed(hMode)

        hardButt.position(890,680)
        hardButt.style('outline: none'); hardButt.style('border: solid #ff6363'); hardButt.style('background-color', hCol); hardButt.size(100,35); hardButt.style('border-radius: 10px'); 
        hardButt.style('font-family: VT323, monospace'); hardButt.style('color: #3b1717'); hardButt.style('font-size: 25px'); hardButt.style('font-weight: bold');

        secretButtTWO.show()

    }

    //Play screen, actual screen and snake display

    if(mode === 1){

        menuStop()

        pauseButt.hidden = false

        // hide unnecessary buttons

        easyButt.hide()
        mediumButt.hide()
        hardButt.hide()
        retryButt.hide()
        secretButtTWO.hide()

        //pause 

        if(document.querySelector('.theToggler').checked){

            console.log('paused')  
            clearInterval(fullTime)  
        
        }else{

            console.log('unpaused')

        }
        
        //death

        s.death()|

        //background

        background(179, 230, 255);

        //update snake head

        s.update();

        //paint snake head

        s.show();

        /////////food part

        if(s.eat(food)){

        var eatSound = document.getElementById("eatFX")

        eatSound.play()

        pickLocationOfFood();

        //score counter and highscore

        score += 5

        if(score > highscore){

            highscore = score

            //when the player reaches this higscore a secret button is displayed

            if(highscore >= 35 ){

                //variable to show the secret button forever

                hos = 1

                let secCol = color(105, 0, 31)

                secretButt.show()

                secretButt.mousePressed(ricky)

                secretButt.position(70 , 500)
                secretButt.style('outline: none'); secretButt.style('border: dotted #ff034e')
                secretButt.style('background-color', secCol); secretButt.size(400, 45); secretButt.style('border-radius: 10px'); 
                secretButt.style('font-family: VT323, monospace'); secretButt.style('color: #FFFFFF'); secretButt.style('font-size: 25px'); secretButt.style('font-weight: bold');

            }

        }

        //to update the score and highscore onscreen

        div.innerHTML ="SCORE: " + score
        div3.innerHTML ="Highscore: "+ highscore

    }

    //Death Screen

    if(mode == 2){
        
        clearInterval(fullTime)
        clearInterval(GameTimer)
        stopTime()
        alert("Best Time: "+twoNum(minutesCount)+":"+twoNum(TimerCount))
        //timeDisplay = TimerCount

        //Play death sound

        dSound = document.getElementById("Died")
        dSound.play()

        let retCol= color(89, 7, 7)

        //text

        textSize(45)
        textFont('VT323')
        textStyle(BOLD)
        text('You Died',52,300)
        fill(255,255,255)

        //button Style

        secretButtTWO.show()

        retryButt.show()

        retryButt.mousePressed(ret)

        retryButt.position(890,530)
        retryButt.style('outline: none'); retryButt.style('border: solid #fc0377'); retryButt.style('background-color', retCol); retryButt.size(100,35); retryButt.style('border-radius: 10px');
        retryButt.style('font-family: VT323, monospace'); retryButt.style('color: #dedede'); retryButt.style('font-size: 25px'); retryButt.style('font-weight: bold');

        secretButtTWO.mousePressed(ricky)

        secretButtTWO.position(1469,52)
        secretButtTWO.style('outline: none'); secretButtTWO.style('border: solid #fc0377'); secretButtTWO.style('background-color', retCol); secretButtTWO.size(30,50); secretButtTWO.style('border-radius: 10px');
        secretButtTWO.style('font-family: VT323, monospace'); secretButtTWO.style('color: #dedede'); secretButtTWO.style('font-size: 25px'); secretButtTWO.style('font-weight: bold');secretButtTWO.style('opacity: 0');

        //Stop and restart all sounds 

        song01 = document.getElementById("firstSongEver")
        song01.pause()
        song01.currentTime = 0

        song02 = document.getElementById("secondSong")
        song02.pause()
        song02.currentTime = 0

        song03 = document.getElementById("thirdSong")
        song03.pause()
        song03.currentTime = 0

    }

    fill(255, 51, 51);
    rect(food.x,food.y,scl,scl,20,20,20,20);
 
    }

    
}



//Retry function


function ret(){

    mode = 0
    score = 0
    div.innerHTML ="Score: 0"

    minutesCount = 0
    TimerCount = 0

    timeDisplay.textContent = "Time: "+twoNum(minutesCount)+":"+twoNum(TimerCount)

}

//To show "You Died" overlay

function deatOn(){

    document.getElementById("shim").style.display = "block"

}

//play the menu song

function menuPlay(){

    initSong = document.getElementById('menuSong')
    initSong.play()

}

//stop and restar the menu song

function menuStop(){

    initSong = document.getElementById('menuSong')
    initSong.pause()
    initSong.currentTime = 0

}

eMode()
miMode()
hMode()


//function for the secret button to work

function ricky(){

    //var to add the window.open

    var windowRef

    //var to display the new window as a pop-up

    var feat = "popup"

    //to open a pop-up window with the secret video

    windowRef = window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Youtube_WindowName", feat)

    //counter so if the secret button is clicked 3 times it will display other videos

    clickNum++
    
    //console.log(clickNum)
    
    //switch based on the counter

    switch(clickNum){

        case 3:
            windowRef = window.open("https://www.youtube.com/watch?v=mHzsc8vxs9M", "Youtube_WindowName", feat)
        break
        case 4:
            windowRef = window.open("https://www.youtube.com/watch?v=D4zqMxQOnP4", "Youtube_WindowName", feat)
        break
        case 5:
            windowRef = window.open("https://www.youtube.com/watch?v=d1IftmQwPTw", "Youtube_WindowName", feat)
        break

    }

    if (clickNum === 5){

        clickNum = 0

    }

}


