const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
playerDisplay.textContent = 'black'
let playerGo = 'black'
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('square-id', i)
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        const row = Math.floor( (63 - i) /8) +1;
        square.classList.add((i+row) % 2 === 0 ? 'brown' : 'beige')
        if (i <=15) {
            square.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        }
        gameBoard.append(square)
    })
}
createBoard()

const allSquares = document.querySelectorAll('#gameboard .square')
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart (e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}
function dragOver(e) {
    e.preventDefault()
}
function dragDrop(e) {
    e.stopPropagation()
    const taken = e.target.classList.contains('piece')
    if (taken) {
        e.target.parentNode.append(draggedElement)
        e.target.remove()
    }
    else {
        e.target.append(draggedElement)
    }
    changePlayer()
}

function changePlayer () {
    if (playerGo === "black") {
        playerGo === "white"
        playerDisplay.textContent = "white"
    }
    else {
        playerGo === "black"
        playerDisplay.textContent = "black"
    }
}