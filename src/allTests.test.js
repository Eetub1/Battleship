const Ship = require("./ship.js")
const Gameboard = require("./gameboard.js")

describe("Testing the ship class", () => {
    const ship = new Ship(5)
    test("Testing ship's attributes", () => {
        expect(ship.getHitAmount()).toBe(0)
        expect(ship.isSunk()).toBe(false)
        expect(ship.getShipName()).toBe("Carrier")
        expect(ship.getSymbol()).toBe("C")
    })

    const ship2 = new Ship(2, "Destroyer")
    ship2.hit()
    ship2.hit()
    test("Testing if ship is sunk now", () => {
        expect(ship2.isSunk()).toBe(true)
        expect(ship2.getShipName()).toBe("Destroyer")
        expect(ship2.getSymbol()).toBe("D")
    })
})

describe("Testing the Gameboard class", () => {
    const board = new Gameboard()
    board.setGameBoard()
    test("Testing board's attributes", () => {
        expect(board.getBoardSize()).toBe(10)
        expect(board.getIsGameOver()).toBe(false)
    })

    const ship = new Ship(5)
    describe("Tests for placing a ship on the board", () => {
        test("Placing a ship", () => {
            expect(board.placeShip(ship, 10, 10)).toBe(false)

            //these tests need to be reworked because you can only place one kind of
            //ship only once
            expect(board.placeShip(ship, -1, -1)).toBe(false)

            expect(board.placeShip(ship, 0, 0)).toBe(true)
            /*expect(board.placeShip(ship, 5, 5)).toBe(true)
            expect(board.placeShip(ship, 5, 6)).toBe(false)

            expect(board.placeShip(ship, 1, 0, false)).toBe(true)
            expect(board.placeShip(ship, 5, 4, false)).toBe(true)
            expect(board.placeShip(ship, 6, 0, false)).toBe(false)

            //putting a ship where there's already one
            expect(board.placeShip(ship, 0, 4)).toBe(false)
            expect(board.placeShip(ship, 5, 4, false)).toBe(false)*/
        })
    })

    const ship2 = new Ship(4, "Battleship")
    board.placeShip(ship2, 1, 0)
    describe("Destroying a ship by hitting it", () => {
        test("Test 1", () => {
            expect(ship2.getHitAmount()).toBe(0)
            board.receiveAttack(1, 0)
            expect(ship2.getHitAmount()).toBe(1)
            board.receiveAttack(1, 1)
            board.receiveAttack(1, 2)
            expect(ship2.isSunk()).toBe(false)
            board.receiveAttack(1, 3)
            expect(ship2.getHitAmount()).toBe(4)
            expect(ship2.isSunk()).toBe(true)
        })
    })
})