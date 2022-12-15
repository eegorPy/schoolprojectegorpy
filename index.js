const $buttonStart = document.querySelector('#start')
const $gamePlace = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$buttonStart.addEventListener('click',startGame)
$gamePlace.addEventListener('click',boxClicking)
$gameTime.addEventListener('input',setGameTime)

function startGame() {
    score = 0
    setGameTime()
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    isGameStarted = true
    $gamePlace.style.backgroundColor = "white"
    $buttonStart.classList.add('hide')
    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)
        if (time <= 0) {
          clearInterval(interval)
          endGame()
        } else {
          $time.textContent = (time - 0.1).toFixed(1)
        }
      }, 100)    
    renderBoxes()
}

function renderBoxes() {
    $gamePlace.innerHTML = ''
    const box = document.createElement('div')
    var boxSize = getRandom(15, 70)
    var gameSize = $gamePlace.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    box.style.cursor = 'pointer'
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.setAttribute('data-box', 'true')
    $gamePlace.insertAdjacentElement('afterbegin',box)
}

function boxClicking(event) { 
    if (!isGameStarted) {
        return 
      }
    if (event.target.dataset.box) {
        score++
        renderBoxes()
    }

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gamePlace.innerHTML = ''
    show($buttonStart)
    $gamePlace.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $buttonStart.classList.remove('hide')
    $gamePlace.innerHTML = ''
    $gamePlace.style.backgroundColor = '#ccc'
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}