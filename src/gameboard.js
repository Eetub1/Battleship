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
        console.log(ship.shipLength)
        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return false
        if (horizontal) {
            if (x + ship.shipLength > this.boardSize) return false
            let xCopy = x
            for (let i = 0; i < ship.shipLength; i++) {
                if (this.board[y][xCopy] === "S") return false
                xCopy++
            }
            for (let i = 0; i < ship.shipLength; i++) {
                this.board[y][x] = "S"
                x++
            }
            return true
        }
        if (y + ship.shipLength > this.boardSize) return false
        let yCopy = y
        for (let i = 0; i < ship.shipLength; i++) {
            if (this.board[yCopy][x] === "S") return false
            yCopy++
        }
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
    console.log(board.placeShip(destroyer, 0, 0))
    console.log(board.placeShip(destroyer, 5, 5))
    console.log(board.placeShip(destroyer, 1, 0, false))
    console.log(board.placeShip(destroyer, 5, 4, false))

    board.prettyPrint()
}

main()*/

module.exports = Gameboard