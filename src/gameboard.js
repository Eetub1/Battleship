const Ship = require("./ship")

class Gameboard {
    constructor(boardSize=10) {
        this.boardSize = boardSize
        this.board = []
        this.allShipsSunk = false
    }

    setGameBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push([])
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i].push("O")
            }
        }
    }

    prettyPrint() {
        for (let i = 0; i < this.boardSize; i++) {
            console.log(this.board[i].join(""))
        }
    }

    getBoard() {return this.board}

    receiveAttack(x, y) {

    }

    placeShip(ship, y, x, horizontal=true) {
        //also need to check if there is already a ship present here
        //go in a loop the same way as you place the shipTokens, checking
        //if there is a token in the spot where you try to place a ship
        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return false
        if (horizontal) {
            if (x + ship.shipLength > this.boardSize) return false
            for (let i = 0; i < ship.shipLength; i++) {
                this.board[y][x] = "S"
                x++
            }
            return true
        }
        if (y + ship.shipLength >= this.boardSize) return false
        for (let i = 0; i < ship.shipLength; i++) {
            this.board[y][x] = "S"
            y++
        }
        return true
    }

}

/*function main() {
    const board = new Gameboard()
    board.setGameBoard()

    const destroyer = new Ship(5)
    console.log(board.placeShip(destroyer, 6, 0));

    board.prettyPrint()
    //console.log(board.getBoard());
}

main()*/

module.exports = Gameboard