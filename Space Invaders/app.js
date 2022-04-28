const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

//Loop to create the grid

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))
console.log({squares})

//array to set the amount of invaders

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

//Function that shows the invaders and based on the array, determines their ammount

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

//To remove the square of one invader when he gets shot

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')

//to change the direction of the shoooter

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    // 195
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) 
      currentShooterIndex -=1
      break
    // 209
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
  //console.log({currentShooterIndex})
}

//activates the movement of the player

document.addEventListener('keydown', moveShooter)

//to animate the invaders and make them move from left to right

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  console.log(`leftEdge:${leftEdge} - rightEdge:${rightEdge}`)
  remove()

  // Constraint for the right direction (invaders)
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

    // Constraint for the left direction (invaders)
  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  // update the direction of the invaders with their current direction
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  // updates positions
  draw()

  // Detects the collition between the player and the aliens

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  // Game over screen display
  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }

  //If all of the invaders have been removed, the players win, so this checks the ammount of aliens available in the array, and the ones removed
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}

// updates the invaders for them to move at a certain pace, if the number increases, they go faster
invadersId = setInterval(moveInvaders, 600)

//function to create and move the bullet

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex

  // function to move the laser upwards

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    // tracks position of the laser inside the grid
    currentLaserIndex -= width
    console.log({currentLaserIndex})
    squares[currentLaserIndex].classList.add('laser')

    // to detect when an invader has been hit, so the laser can dissappear

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')

      //shows a brief boom where the invader was

      squares[currentLaserIndex].classList.add('boom')

      //to make the effect of the "boom" square and hide itm so when the timer runs out it disappears

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)

      //resets the laser array so it can be used again when the correct key is pressed 

      clearInterval(laserId)

      

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)

      //updates the list of the aliens to show that the one hit by the laser is dead

      aliensRemoved.push(alienRemoved)

      //counter to increase the score when an alien gets killed

      results++

      //display the score in the DOM

      resultsDisplay.innerHTML = results
      console.log({aliensRemoved})

    }

  }

  // key to shoot the laser
  switch(e.key) {
    case 'ArrowUp':

      //interval between each shot
      laserId = setInterval(moveLaser, 600)
  }
}

//listens the moment when the key to shoot is pressed and calls the function

document.addEventListener('keydown', shoot)
