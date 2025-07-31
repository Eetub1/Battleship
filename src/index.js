const Player = require("./player.js")
const Ship = require("./ship.js")
//const drawBoard = require("./handleUI.js")

import './style.css'

const player1BoardContainer = document.getElementById("player1BoardContainer")
const player2BoardContainer = document.getElementById("player2BoardContainer")
const turnDiv = document.getElementById("turnDiv")

let playerBoard
let computerBoard
let turn = "player1"

function changeTurn() {
    turn = turn === "player1" ? "player2" : "player1"
}

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
                cellDiv.setAttribute("id", `${i}-${j}-player1`)
            } else {
                cellDiv.setAttribute("id", `${i}-${j}-player2`)
            }
            cellDiv.addEventListener("click", (event) => calculateHit(event))
            rowDiv.appendChild(cellDiv)
        }
        if (left) {
            player1BoardContainer.appendChild(rowDiv)
        } else {
            player2BoardContainer.appendChild(rowDiv)
        }
    }
}

function calculateHit(event) {
    if (computerBoard.getIsGameOver() === false && playerBoard.getIsGameOver() === false) {
        console.log(event.target);
        const clickInfo = event.target.id.split("-")
        console.log(clickInfo);

        //make it so that a correct square must be clicked before the turn is allowed to be switched
        if (turn === "player1") {
            const wasMoveCorrect = computerBoard.receiveAttack(parseInt(clickInfo[0]), parseInt(clickInfo[1]))
            if (!wasMoveCorrect) return
            if (clickInfo[2] === "player1") return
            console.log("Oliko siirto korrekti: ", wasMoveCorrect);
            drawBoard(computerBoard.getBoard(), false)
        } else {
            const wasMoveCorrect = playerBoard.receiveAttack(parseInt(clickInfo[0]), parseInt(clickInfo[1]))
            if (!wasMoveCorrect) return
            if (clickInfo[2] === "player2") return
            drawBoard(playerBoard.getBoard())
        }
        if (computerBoard.getIsGameOver() === false && playerBoard.getIsGameOver() === false) {
            changeTurn()
            turnDiv.textContent = `It's ${turn}'s turn`
        } else {
            turnDiv.textContent = `Congratulations, ${turn} won the game!`
        }
    } else {
        //when game is over, we come here
        console.log("The game is over!")
    }
}

function main() {
    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    //player
    const player = new Player("Eetu")
    playerBoard = player.getBoardObject()
    playerBoard.placeShip(carrier, 0, 0, false)
    playerBoard.placeShip(battleship, 1, 1)
    playerBoard.placeShip(cruiser, 2, 5, false)
    playerBoard.placeShip(submarine, 9, 0, true)
    playerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(playerBoard.getBoard())

    //computer
    const computer = new Player("Computer")
    computerBoard = computer.getBoardObject()
    computerBoard.placeShip(carrier, 3, 9, false)
    computerBoard.placeShip(battleship, 4, 4)
    computerBoard.placeShip(cruiser, 7, 3, false)
    computerBoard.placeShip(submarine, 0, 3, true)
    computerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(computerBoard.getBoard(), false)
}

main()
