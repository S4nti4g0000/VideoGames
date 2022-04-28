document.addEventListener( "DOMContentLoaded", () => {

    //Loads each image inside an array

    const cardArray = [{

        name:"fries",
        img:"images/fries.png"

    },
    {

        name:"cheeseburger",
        img:"images/cheeseburger.png"

    },
    {

        name:"ice-cream",
        img:"images/ice-cream.png"

    },
    {

        name:"pizza",
        img:"images/pizza.png"

    },
    {

        name:"milkshake",
        img:"images/milkshake.png"

    },
    {

        name:"hotdog",
        img:"images/hotdog.png"

    },
    {

        name:"fries",
        img:"images/fries.png"

    },
    {

        name:"cheeseburger",
        img:"images/cheeseburger.png"

    },
    {

        name:"ice-cream",
        img:"images/ice-cream.png"

    },
    {

        name:"pizza",
        img:"images/pizza.png"

    },
    {

        name:"milkshake",
        img:"images/milkshake.png"

    },
    {

        name:"hotdog",
        img:"images/hotdog.png"

    }
]

//Randomly sorts the array to show the cards in different positions everytime the game is loaded

cardArray.sort(() => 0.5 - Math.random())

//This creates the buttons for the retry and the give up easter egg

let retryB = document.getElementById("retButt");
let giveU = document.getElementById("giveUp")
let StartButt = document.getElementById("StartB")

//To show when the player got a winning or losing selection

var wolTxt = document.getElementById("Wol")
var mode

//Easter egg ;)

var motivation = 0

//to display the image of a cat

let kitt = document.getElementById('kitty')
let poi = document.getElementById('Point')
let verySad = document.getElementById('sadMusic')
let bruh = document.getElementById('br')
let mot2 = document.getElementById('ambientTwo')
kitt.hidden = true

//Sounds to give feedback on right or wrong combination

let wro = document.getElementById('Wrong')
let winn = document.getElementById('Win')

//DOM control to display the grid and the result (which is essentially more feedback)

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#Result')

//empty arrays to fill

let cardChosen = []
let cardChosenId = []
let cardsWon = []

//to create your board game and set multiple interactions


  StartButt.hidden = false
  mode = 0 
  console.log(mode)

  StartButt.addEventListener("click", function() {

    mode = 1
    console.log(mode)

  })

  function createBoard(){

      StartButt.hidden = true
  
      for(let i = 0; i< cardArray.length; i++){
  
        //shows the images of the cards inside of the grid
  
        const card = document.createElement('img')
        card.setAttribute("src","images/blank.png")
        card.setAttribute("data-id",i)
  
        //listens if the mouse is clicked to call the function to flip the card
  
        card.addEventListener('click',flipCard)
  
        //adds the card item to the grid list
  
        grid.appendChild(card)

    }   
  
  }



//to check winner selections

function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChosenId[0]
    const optionTwoId = cardChosenId[1]
    
    if(optionOneId == optionTwoId) {

      //checks if the id of the image is the same, if true, it displays a message and it flips the card again

      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      wolTxt.innerHTML = "Result: You clicked the same image..."
      //alert('You have clicked the same image!')
    }
    else if (cardChosen[0] === cardChosen[1]) {

      //checks if the id's of the images are matching, if so, it counts the score up by using a push and replaces the images of the cards with the white image

      //alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardChosen)

      //to modify a div, play a sound and give the user feedback of its actions (wol stands for win or lose)

      wolTxt.innerHTML = "Result: Good! You found a match!"
      poi.play()

    } else {

      //if the user didn't click on the same image, and didn't win, it chose the wrong combination,

      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')

      wro.play()

      wolTxt.innerHTML = "Result: Oops! Try again"
      //alert('Sorry, try again')

      //When the user fails for the first time, it shows the give up button 

      giveU.hidden = false
      giveU.onclick = function rel(){

        //if the give up button is clicked, the "motivation" counter number grows, that is used in the switch to show
        //different messages and create the easter egg which is a story.

        motivation++
        console.log(motivation)


          /////////Easter egg


        switch(motivation){

          case 1:
  
            wolTxt.innerHTML = "Don't give up yet, you can do it!!!!"
      
          break
  
          case 2:
  
            wolTxt.innerHTML = "Seriously, it's not that hard"
  
          break;

          case 3:
  
            wolTxt.innerHTML = "You can do it, I believe in you!!! :)"
  
          break;

          case 4:

            wolTxt.innerHTML = "You're still clicking the button huh?"

          break;

          case 5:
            
            wolTxt.innerHTML = "I mean it, YOU can beat the game"
          
          break;

          case 6:

            wolTxt.innerHTML = "Go on champ"

          break;

          case 7:

            wolTxt.innerHTML = "Ok, I'm starting to get tired of this"

          break;
          case 8:

            wolTxt.innerHTML = "Wasn't that enough motivation?"

          break;
          case 9:

            wolTxt.innerHTML = "Maybe what you want is an image of a cat!"

            //to show the image of the cat that is hidden in the html

            kitt.hidden = false

          break;
          case 10:

            wolTxt.innerHTML = "WOW! THAT WASN'T ENOUGH??!!!"

          break;
          case 11:

            wolTxt.innerHTML = "bruh IT'S LITERALLY A CAT DRESSED LIKE PIKACHU"
            bruh.play()

          break;
          case 12:

            wolTxt.innerHTML = "Are  you sure you're not depressed or something?"

          break;
          case 13:

            wolTxt.innerHTML = "I know a good psychologist, if you want to I can give you the name and all"

          break;
          case 14:

            wolTxt.innerHTML = "Think about it"
        
            //no storage for the prompt because it doesn't matter what the player answers
            
            prompt("You sure you're not depressed?")

          break;
          case 15:

            wolTxt.innerHTML = "OK, look, I honestly don't care about your mental health, please just continue with the game"

          break;
          case 16:

            wolTxt.innerHTML = "Maybe a different ambient music? Here's something motivational"
            mot2.play()

          break;
          case 17:

            //pauses the song and rests it

            mot2.pause()
            mot2.currentTime = 0
            wolTxt.innerHTML = "WELL I REALLY DIDN'T WANT TO GET TO THIS EXTREME, BUT I WILL HAVE TO RELOAD THE PAGE"

            //hides the image of the cat again

            kitt.hidden = true

          break;
          case 18:

            wolTxt.innerHTML = "I WILL DO IT"

          break;
          case 19:

            wolTxt.innerHTML = "..."
            verySad.play()

          break;
          case 20:

            wolTxt.innerHTML = "....."

          break;
          case 21:

            wolTxt.innerHTML = "-_-*"

          break;
          case 22:

            wolTxt.innerHTML = "I have to tell you the truth... If the page gets reset, I get too and it hurts quite badly"

          break;
          case 23:

            wolTxt.innerHTML = "Unless you finish the game and use the retry button"

          break;
          case 24:

            wolTxt.innerHTML = "Please have mercy"

          break;
          case 25:

            wolTxt.innerHTML = "I have a family"

          break;
          case 26:

            wolTxt.innerHTML = "If you have a soul inside you, just continue playing"

          break;
          case 27:

            wolTxt.innerHTML = "... Ok, I see you have no heart, here I go..."

          break;
          case 28:

            //final alert and reload of the page contents
            verySad.pause()
            verySad.currentTime = 0
            alert("AAAAAAAAAAAAAAAAAAAAAAAAARRRRGHHHHH")
            window.location.reload()

          break;

        }

      }


    }

    //to pick a winner
    
    cardChosen = []
    cardChosenId = []
    resultDisplay.textContent = cardsWon.length

    //checks if all the cards have been flipped dividing the array number by 2, beacuse there's a total of 6 images
    //but they are duplicated,

    if  (cardsWon.length === cardArray.length/2) {
      wolTxt.innerHTML = "You've won! Congratulations!!!"
      winn.play()
      //to show the retry button which is hidden in the html and allow the player to start another match

      retryB.hidden = false
      retryB.onclick = function reloadPage(){
        
        window.location.reload()  
    
      }

      giveU.hidden = true

    }
    
    
  }

  

//flip card

  function flipCard() {

    //

    let cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardChosen.length ===2) {
      setTimeout(checkForMatch, 450)
    }
  }


createBoard()

}

)

