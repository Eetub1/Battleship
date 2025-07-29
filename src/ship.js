class Ship {
    constructor(shipLength, hitAmount=0, isShipSunk=false, name="") {
        this.shipLength = shipLength,
        this.hitAmount = hitAmount,
        this.isShipSunk = isShipSunk
        this.name = name
    } 

    hit() {
        if (this.hitAmount === this.shipLength) return 
        hitAmount++
    }

    isSunk() {
        if (this.hitAmount === this.shipLength) {
            this.isShipSunk = true
            return true
        }
        return false
    }
}

module.exports = Ship