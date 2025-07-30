const Player = require("./player.js")
const Ship = require("./ship.js")
//const drawBoard = require("./handleUI.js")

import './style.css'


function drawBoard(array, left=true) {
    const player1BoardContainer = document.getElementById("player1BoardContainer")
    const player2BoardContainer = document.getElementById("player2BoardContainer")
    const size = array.length

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
            cellDiv.setAttribute("id", `${i}-${j}`)
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
    console.log(event.target);
    const coordinates = event.target.id.split("-")
    console.log(coordinates);
}

function main() {
    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    //player
    const player = new Player("Eetu")
    const playerBoard = player.getBoardObject()
    playerBoard.placeShip(carrier, 0, 0, false)
    playerBoard.placeShip(battleship, 1, 1)
    playerBoard.placeShip(cruiser, 2, 5, false)
    playerBoard.placeShip(submarine, 9, 0, true)
    playerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(playerBoard.getBoard())

    //computer
    const computer = new Player("Computer")
    const computerBoard = computer.getBoardObject()
    computerBoard.placeShip(carrier, 3, 9, false)
    computerBoard.placeShip(battleship, 4, 4)
    computerBoard.placeShip(cruiser, 7, 3, false)
    computerBoard.placeShip(submarine, 0, 3, true)
    computerBoard.placeShip(destroyer, 2, 6, true)
    drawBoard(computerBoard.getBoard(), false)

    //loop that runs the game logic
    /*while(computerBoard.getIsGameOver() === false && playerBoard.getIsGameOver() === false) {


        //change turn
        //draw both boards again

    }*/

    //outside the loop game endscreen settings
}

main()
