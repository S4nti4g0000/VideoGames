
const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

//to randomly display the image of the mole

function randomSquare() {
  
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

//detects if the mouse clicks on the mole and adds to the score

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})


//randomly moves the mole around the grid every 500 miliseconds
function moveMole() {
  timerId = setInterval(randomSquare, 500)
}

moveMole()

//count the time left for the plater

function countDown() {
 currentTime--
 timeLeft.textContent = currentTime

  // checks if the time has passed to show the final screen

 if (currentTime == 0) {
   clearInterval(countDownTimerId)
   clearInterval(timerId)
   alert('GAME OVER! Your final score is ' + result)
 }

}

//sets the timer to 1 minute

let countDownTimerId = setInterval(countDown, 1000)

