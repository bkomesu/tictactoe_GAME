const X_CLASS = "x";
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = $('#board');
const winningMessageElement = $('#winningMessage');
const restartButton = $('#restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn 

startGame()

restartButton.on('click', startGame);

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once : true})
    })
    setBoardHoverClass()
    winningMessageElement.removeClass('show')
}

function handleClick (e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
    swapturns();
    setBoardHoverClass()
    }
}


function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    setTimeout(function() {
        winningMessageElement.addClass('show');
    }, 500);
}

 function isDraw() {
     return [...cellElements].every(cell => {
         return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
     })
 }


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapturns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.removeClass(X_CLASS)
    board.removeClass(CIRCLE_CLASS)
    if (circleTurn){
        board.addClass(CIRCLE_CLASS)
    }else {
        board.addClass(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}










// function myFunction(){
//    $('.cell').addClass("x");
// }