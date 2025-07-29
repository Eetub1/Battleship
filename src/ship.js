class Ship {
    constructor(shipLength, hitAmount, isSunk=false) {
        this.shipLength = shipLength,
        this.hitAmount = hitAmount,
        this.isSunk = isSunk
    } 

    hit() {
        if (this.hitAmount === this.shipLength) return 
        hitAmount++
    }

    isSunk() {
        if (this.hitAmount === this.shipLength) {
            this.isSunk = true
        }
    }
}

module.exports = Ship