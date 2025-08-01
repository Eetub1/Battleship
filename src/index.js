const Player = require("./player.js")
const Ship = require("./ship.js")

import './style.css'

const player1BoardContainer = document.getElementById("player1BoardContainer")
const player2BoardContainer = document.getElementById("player2BoardContainer")
const turnDiv = document.getElementById("turnDiv")

let playerBoard
let computerBoard
let player
let computer
let playerName
let computerName

function drawBoard(array, left=true) {
    const size = array.length

    left ? player1BoardContainer.textContent = "" : player2BoardContainer.textContent = ""

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            if (array[i][j] === "O") {
                cellDiv.className = "cellDiv borderBlack"
            } else {
                cellDiv.className = "cellDiv borderRed"
            }
            cellDiv.textContent = array[i][j]
            if (left) {
                cellDiv.setAttribute("id", `${i}-${j}-${playerName}`)
            } else {
                cellDiv.setAttribute("id", `${i}-${j}-${computerName}`)
            }
            cellDiv.addEventListener("click", (event) => handleClick(event))
            rowDiv.appendChild(cellDiv)
        }
        if (left) {
            player1BoardContainer.appendChild(rowDiv)
        } else {
            player2BoardContainer.appendChild(rowDiv)
        }
    }
}

function calculateComputerHit() {
    setTimeout(() => {
        const y = Math.floor(Math.random() * playerBoard.getBoard().length)
        const x = Math.floor(Math.random() * playerBoard.getBoard().length)

        if (!playerBoard.receiveAttack(y, x)) return
        drawBoard(playerBoard.getBoard())
    }, 100)
}

function handleClick(event) {
    if (!checkIfGameOver()) {
        const clickInfo = event.target.id.split("-")
        if (clickInfo[2] === playerName) return

        if (!computerBoard.receiveAttack(parseInt(clickInfo[0]), parseInt(clickInfo[1]))) return
        drawBoard(computerBoard.getBoard(), false)
        checkIfGameOver()

        calculateComputerHit()
        checkIfGameOver()
    }
}

function checkIfGameOver() {
    const isOver = computerBoard.getIsGameOver() === true || playerBoard.getIsGameOver() === true
    if (isOver) turnDiv.textContent = "The game is over"
    return isOver
}

function main() {
    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    //player
    player = new Player("Eetu")
    playerName = player.getName()
    playerBoard = player.getBoardObject()
    playerBoard.placeShip(carrier, 0, 0, false)
    playerBoard.placeShip(battleship, 1, 1)
    playerBoard.placeShip(cruiser, 2, 5, false)
    playerBoard.placeShip(submarine, 9, 0, true)
    playerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(playerBoard.getBoard())

    //computer
    computer = new Player("Computer")
    computerName = computer.getName()
    computerBoard = computer.getBoardObject()
    computerBoard.placeShip(carrier, 3, 9, false)
    computerBoard.placeShip(battleship, 4, 4)
    computerBoard.placeShip(cruiser, 7, 3, false)
    computerBoard.placeShip(submarine, 0, 3, true)
    computerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(computerBoard.getBoard(), false)

    turnDiv.textContent = `It's ${playerName}'s turn`
}

main()
