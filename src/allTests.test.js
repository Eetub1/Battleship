const Ship = require("./ship.js")
const Gameboard = require("./gameboard.js")

describe("Testing the ship class", () => {
    const ship = new Ship(5)
    test("Testing ship's attributes", () => {
        expect(ship.hitAmount).toBe(0)
        expect(ship.isSunk()).toBe(false)
    })

    const ship2 = new Ship(2)
    ship2.hit()
    ship2.hit()
    test("Testing if ship is sunk now", () => {
        expect(ship2.isSunk()).toBe(true)
    })
})

describe("Testing the Gameboard class", () => {
    const board = new Gameboard()
    board.setGameBoard()
    test("Testing board's attributes", () => {
        expect(board.boardSize).toBe(10)
        expect(board.allShipsSunk).toBe(false)
    })

    const ship = new Ship(5)
    describe("Tests for placing a ship on the board", () => {
        test("Placing a ship", () => {
            expect(board.placeShip(ship, 10, 10)).toBe(false)
            expect(board.placeShip(ship, -1, -1)).toBe(false)

            expect(board.placeShip(ship, 0, 0)).toBe(true)
            expect(board.placeShip(ship, 5, 5)).toBe(true)
            expect(board.placeShip(ship, 5, 6)).toBe(false)

            expect(board.placeShip(ship, 1, 0, false)).toBe(true)
            expect(board.placeShip(ship, 5, 4, false)).toBe(true)
            expect(board.placeShip(ship, 6, 0, false)).toBe(false)

            //putting a ship where there is already one
            expect(board.placeShip(ship, 0, 4)).toBe(false)
            expect(board.placeShip(ship, 5, 4, false)).toBe(false)

            board.prettyPrint()
        })
    })
})