const Ship = require("./ship")

class Gameboard {
    constructor(boardSize=10) {
        this.boardSize = boardSize
        this.board = []
        this.allShipsSunk = false
        this.ships = []
        this.constants = {
            EMPTY_CELL: "O",
            HIT_CELL: "H",
            MISSED_CELL: "M"
        }
    }

    getBoard() {return this.board}

    getBoardSize() {return this.boardSize}

    getIsGameOver() {return this.allShipsSunk}

    setGameBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push([])
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i].push(this.constants.EMPTY_CELL)
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

    validateAttack(y, x) {
        const value = this.board[y][x]
        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return false
        if (value === this.constants.MISSED_CELL || value === this.constants.HIT_CELL) return false
        return true
    }

    //this can be deleted
    shipStatsHelperFunc() {
        for (const ship of this.ships) {
            console.log(`Pituus: ${ship.getShipLength()} Osumat: ${ship.getHitAmount()} Onko tuhottu: ${ship.getIsShipSunk()}`);
        }
        console.log(" ");
    }

    markHit(y, x) {
        const shipSymbol = this.board[y][x]
        const shipThatWasHit = this.ships.find(s => s.getSymbol() === shipSymbol)
        shipThatWasHit.hit()
        this.shipStatsHelperFunc()
        this.board[y][x] = this.constants.HIT_CELL
        this.checkifAllShipsSunk()
    }

    receiveAttack(y, x) {
        const wasAttackValid = this.validateAttack(y, x)
        if (!wasAttackValid) return

        const value = this.board[y][x]
        if (value === this.constants.EMPTY_CELL) {
            this.board[y][x] = this.constants.MISSED_CELL
            return true
        } else {
            this.markHit(y, x)
            return true
        }
    }

    validateShipPlacement(length, y, x, horizontal=true) {
        if (horizontal) {
            if (x + length > this.boardSize) return false
            for (let i = 0; i < length; i++) {
                if (this.board[y][x] !== this.constants.EMPTY_CELL) return false
                x++
            }
            return true
        } 
        if (y + length > this.boardSize) return false
        for (let i = 0; i < length; i++) {
            if (this.board[y][x] !== this.constants.EMPTY_CELL) return false
            y++
        }
        return true
    }

    placeShip(ship, y, x, horizontal=true) {
        const length = ship.getShipLength()
        const doesShipExist = this.ships.some(s => s.name === ship.name)
        if (doesShipExist) return false

        if (y >= this.boardSize || x >= this.boardSize || y < 0 || x < 0) return false
        if (horizontal) {
            if (this.validateShipPlacement(length, y, x, true)) {
                for (let i = 0; i < length; i++) {
                    this.board[y][x] = ship.getSymbol()
                    x++
            }
            this.ships.push(ship)
            return true
            }
        }
        if (this.validateShipPlacement(length, y, x, false)) {
            for (let i = 0; i < length; i++) {
                this.board[y][x] = ship.getSymbol()
                y++
            }
            this.ships.push(ship)
            return true
        }
    }

    placeShipsRandomly(ships) {
        for (const ship of ships) {
            while (true) {
                let y = Math.floor(Math.random() * this.boardSize)
                let x = Math.floor(Math.random() * this.boardSize)
                let num = Math.floor(Math.random() * 2)
                let horizontal = num === 0 ? true : false
                if (this.placeShip(ship, y, x, horizontal)) break
            }
        }
    }
}

/*function main() {
    const board = new Gameboard()
    board.setGameBoard()

    const cruiser = new Ship(3, "Cruiser")
    console.log(board.placeShip(cruiser, 2, 5, false))

    const destroyer = new Ship(2, "Destroyer")
    console.log(board.placeShip(destroyer, 2, 5, true))

    board.prettyPrint()
}

main()*/

module.exports = Gameboard
