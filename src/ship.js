class Ship {
    constructor(shipLength, name="Carrier") {
        this.shipLength = shipLength
        this.hitAmount = 0
        this.isShipSunk = false
        this.name = name
        this.symbol = this.setSymbol()
    } 

    getShipLength() {return this.shipLength}

    getShipName() {return this.name}

    getHitAmount() {return this.hitAmount}

    getSymbol() {return this.symbol}

    getIsShipSunk() {return this.isShipSunk}

    setSymbol() {
        switch (this.name) {
            case "Carrier":
                return "C"
            case "Battleship":
                return "B"
            case "Cruiser":
                return "R"
            case "Submarine":
                return "S"
            case "Destroyer":
                return "D"
        }
    }

    setIsSunk() {
        if (this.hitAmount === this.shipLength) {
            console.log("I have been sunk!");
            this.isShipSunk = true
            return true
        }
        return false
    }

    hit() {
        if (this.hitAmount < this.shipLength) {
            this.hitAmount++
            this.setIsSunk()
        }
    }
}

/*function main() {

}

main()*/
 
module.exports = Ship