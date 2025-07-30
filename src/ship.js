class Ship {
    constructor(shipLength, name="Carrier") {
        this.shipLength = shipLength,
        this.hitAmount = 0,
        this.isShipSunk = false
        this.name = name
        this.symbol = this.setSymbol()
        //C - Carrier
        //B - Battleship
        //R - Cruiser
        //S - Submarine
        //D - Destroyer
    } 

    getShipLength() {return this.shipLength}

    getShipName() {return this.name}

    getHitAmount() {return this.hitAmount}

    getSymbol() {return this.symbol}

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

    hit() {
        if (this.hitAmount < this.shipLength) {
            this.hitAmount++
            this.isSunk()
        }
    }

    isSunk() {
        if (this.hitAmount === this.shipLength) {
            this.isShipSunk = true
            return true
        }
        return false
    }
}

/*function main() {

}

main()*/
 
module.exports = Ship