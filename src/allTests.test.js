const Ship = require("./ship.js")

describe("Testing the ship class", () => {
    const ship = new Ship(5, 0)
    test("Testing ship's attributes", () => {
        expect(ship.hitAmount).toBe(0)
    })
})