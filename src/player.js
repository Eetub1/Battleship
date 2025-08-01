const Gameboard = require("./gameboard.js")

class Player {
    constructor(name) {
        this.name = name
        this.gameboard = new Gameboard()
        this.gameboard.setGameBoard()
    }

    getBoardObject() {return this.gameboard}

    getName() {return this.name}
}

/*function main() {

}

main()*/

module.exports = Player