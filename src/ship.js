class Ship {
    constructor(shipLength, hitAmount=0, isShipSunk=false, name="") {
        this.shipLength = shipLength,
        this.hitAmount = hitAmount,
        this.isShipSunk = isShipSunk
        this.name = name
    } 

    getShipLength() {return this.shipLength}

    getShipName() {return this.name}

    getHitAmount() {return this.hitAmount}

    hit() {
        if (this.hitAmount < this.shipLength) this.hitAmount++
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