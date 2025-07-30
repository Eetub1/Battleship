const Ship = require("./ship")

class Gameboard {
    constructor(boardSize=10) {
        this.boardSize = boardSize
        this.board = []
        this.allShipsSunk = false
        this.missedShots = []
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
        this.missedShots = [...this.board]
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
            this.missedShots[y][x] = "M"
        } else {
            console.log("Ships", this.ships);
            const shipSymbol = this.board[y][x]
            console.log("Symbol of the ship that was hit", shipSymbol);
            const shipThatWasHit = this.ships.find(s => s.getSymbol() === shipSymbol)
            shipThatWasHit.hit()
            this.board[y][x] = "H"
            console.log("Ships", this.ships);
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
                if (this.board[y][xCopy] === ship.getSymbol()) return false
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
            if (this.board[yCopy][x] === ship.getSymbol()) return false
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

/*function main() {
    const board = new Gameboard()
    board.setGameBoard()

    const carrier = new Ship(5)
    console.log(board.placeShip(carrier, 0, 0))

    const battleship = new Ship(4, "Battleship")
    console.log(board.placeShip(battleship, 5, 5))

    board.receiveAttack(1, 0)
    board.receiveAttack(0, 0)
    board.receiveAttack(0, 1)
    board.receiveAttack(0, 2)
    board.receiveAttack(0, 3)
    board.receiveAttack(0, 4)

    
    console.log(board.placeShip(carrier, 1, 0, false))
    console.log(board.placeShip(carrier, 5, 4, false))

    board.prettyPrint()
}

main()*/

module.exports = Gameboard