const Player = require("./player.js")
const Ship = require("./ship.js")
const drawBoard = require("./handleUI.js")

import './style.css'


function main() {
    const player = new Player()
    const playerBoard = player.getBoardObject()

    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    playerBoard.placeShip(carrier, 0, 0, false)
    playerBoard.placeShip(battleship, 1, 1)
    playerBoard.placeShip(cruiser, 2, 5, false)
    playerBoard.placeShip(submarine, 9, 0, true)
    playerBoard.placeShip(destroyer, 2, 6, true)
    //playerBoard.prettyPrint()

    drawBoard(playerBoard.getBoard())



    const computer = new Player()
    const computerBoard = computer.getBoardObject()
    //computerBoard.prettyPrint()

}

main()
