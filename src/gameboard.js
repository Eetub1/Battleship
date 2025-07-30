const Ship = require("./ship")

class Gameboard {
    constructor(boardSize=10) {
        this.boardSize = boardSize
        this.board = []
        this.allShipsSunk = false
        this.ships = []
    }

    getBoard() {return this.board}

    getBoardSize() {return this.boardSize}

    getIsGameOver() {return this.allShipsSunk}

    setGameBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push([])
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i].push("O")
            }
        }
    }

    checkifAllShipsSunk() {
        const allSunk = this.ships.every(ship => ship.getIsShipSunk() === true)
        if (allSunk) this.allShipsSunk = true
    }

    prettyPrint() {
        for (let i = 0; i < this.boardSize; i++) {
            console.log(this.board[i].join(""))
        }
    }

    receiveAttack(y, x) {
        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return
        if (this.board[y][x] === "M" || this.board[y][x] === "H") return
        if (this.board[y][x] === "O") {
            this.board[y][x] = "M"
        } else {
            const shipSymbol = this.board[y][x]
            const shipThatWasHit = this.ships.find(s => s.getSymbol() === shipSymbol)
            shipThatWasHit.hit()
            this.board[y][x] = "H"

            this.checkifAllShipsSunk()
        }
    }

    placeShip(ship, y, x, horizontal=true) {
        const doesShipExist = this.ships.some(s => s.name === ship.name)
        if (doesShipExist) return false

        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return false
        if (horizontal) {
            if (x + ship.getShipLength() > this.boardSize) return false
            let xCopy = x
            for (let i = 0; i < ship.getShipLength(); i++) {
                if (this.board[y][xCopy] !== "O") return false
                xCopy++
            }
            for (let i = 0; i < ship.getShipLength(); i++) {
                this.board[y][x] = ship.getSymbol()
                x++
            }
            this.ships.push(ship)
            return true
        }
        if (y + ship.getShipLength() > this.boardSize) return false
        let yCopy = y
        for (let i = 0; i < ship.getShipLength(); i++) {
            if (this.board[yCopy][x] !== "O") return false
            yCopy++
        }
        for (let i = 0; i < ship.getShipLength(); i++) {
            this.board[y][x] = ship.getSymbol()
            y++
        }
        this.ships.push(ship)
        return true
    }

}

function main() {
    const board = new Gameboard()
    board.setGameBoard()

    const cruiser = new Ship(3, "Cruiser")
    console.log(board.placeShip(cruiser, 2, 5, false))

    const destroyer = new Ship(2, "Destroyer")
    console.log(board.placeShip(destroyer, 2, 5, true))

    board.prettyPrint()
}

main()

module.exports = Gameboard