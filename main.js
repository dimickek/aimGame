const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('.board')
const timeEl = document.querySelector('#time')
let time = 0
let plusTime = 0
let score = 0
let colors = [
  '#fc9003',
  '#0082ba',
  '#237091',
  '#23916b',
  '#912e23',
  '#552391',
  '#912344',
  '#372391',
  '#6e9123',
]

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
    bonus()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function bonus() {
  if (score === 5) {
    plusTime = confirm('You have good aim, you want take 10 second?')
    if (plusTime === true) {
      time = time + 10
    }
  } else if (score === 30) {
    plusTime = confirm('Wow, it`s fantastic, you want take 10 second again?')
    if (plusTime === true) {
      time = time + 10
      board.classList.add('blue')
    }
  } else if (score === 60) {
    plusTime = confirm('Wow, it`s good job, you want take 20 seconds?')
    if (plusTime === true) {
      time = time + 20
      board.classList.remove('blue')
      board.classList.add('moreBlue')
    }
  } else if (score === 100) {
    alert('It`s imposible, please, take me your autograph')
    board.classList.add('big')
    board.classList.remove('blue')
    board.classList.remove('moreBlue')
  }
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class = 'primary'>${score}</span></h1>`
  board.classList.remove('big')
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = getRandomColor(colors)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `${color}`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(arr) {
  let color = Math.floor(Math.random() * arr.length)
  return arr[color]
}
