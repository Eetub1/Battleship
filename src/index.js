const Player = require("./player.js")
const Ship = require("./ship.js")

import './style.css'

const EMPTY_CELL = "O"
const HIT_CELL = "H"
const MISSED_CELL = "M"

let playerBoard
let computerBoard
let player
let computer
let playerName
let computerName

let playerBoardContainer
let computerBoardContainer
let turnDiv = document.getElementById("turnDiv")
let turn

let ships

const infoDiv = document.getElementById("gameInfoDiv")
const infoText = document.querySelector(".infoText")
const mainDiv = document.getElementById("main")
const nameDialog = document.getElementById("nameDialog")
const submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const form = document.forms.nameForm
    const name = form.name.value
    if (name.trim() === "") return
    playerName = name
    nameDialog.close()
    setMainDiv()
    main()
})

function switchTurn () {
    turn = turn === playerName? computerName : playerName
}

function drawComputerBoard(array) {
    const size = array.length
    computerBoardContainer.textContent = ""

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            switch(array[i][j]) {
                case HIT_CELL:
                    cellDiv.className = "cellDiv green"
                    break
                case MISSED_CELL:
                    cellDiv.className = "cellDiv red"
                    break
                default:
                    cellDiv.className = "cellDiv"
                    break
            }
            //cellDiv.textContent = array[i][j]
            cellDiv.setAttribute("id", `${i}-${j}-${computerName}`)
            cellDiv.addEventListener("click", (event) => handleClick(event))
            rowDiv.appendChild(cellDiv)
        }
        computerBoardContainer.appendChild(rowDiv)
    }
}

function drawPlayerBoard(array) {
    const size = array.length
    playerBoardContainer.textContent = ""

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            switch(array[i][j]) {
                case EMPTY_CELL:
                   cellDiv.className = "cellDiv"
                   break
                case HIT_CELL:
                    cellDiv.className = "cellDiv green"
                    break
                case MISSED_CELL:
                    cellDiv.className = "cellDiv red"
                    break
                default:
                    cellDiv.className = "cellDiv blue"
                    break
            }
            //cellDiv.textContent = array[i][j]
            cellDiv.setAttribute("id", `${i}-${j}-${playerName}`)
            cellDiv.addEventListener("click", (event) => handleClick(event))
            rowDiv.appendChild(cellDiv)
        }
        playerBoardContainer.appendChild(rowDiv)
    }
}

function generateRandomCoordinates(range) {
    let y,x
    let areCoordinatesValid = false
    while (!areCoordinatesValid) {
        y = Math.floor(Math.random() * range)
        x = Math.floor(Math.random() * range)
        areCoordinatesValid = validateCoordinates(y, x, playerBoard.getBoard())
        if (!areCoordinatesValid) console.log("Ei tärpänny!");
    }
    return [y,x]
}

function calculateComputerHit() {
    setTimeout(() => {
        const [y,x] = generateRandomCoordinates(playerBoard.getBoard().length)
        playerBoard.receiveAttack(y, x)
        drawPlayerBoard(playerBoard.getBoard())
        if (!checkIfGameOver()) {
            switchTurn()
            turnDiv.textContent = `It's ${turn}'s turn`
        }
    }, 750)
}

function validateCoordinates(y, x, array) {
    if (y >= array.length || x >= array.length || y < 0 || x < 0) return false
    if (array[y][x] === MISSED_CELL || array[y][x] === HIT_CELL) return false
    return true
}

function handleClick(event) {
    if (turn !== playerName) return
    if (!checkIfGameOver()) {
        const clickInfo = event.target.id.split("-")
        const y = parseInt(clickInfo[0])
        const x = parseInt(clickInfo[1])
        const whoseBoardWasClicked = clickInfo[2]

        if (whoseBoardWasClicked === playerName) return
        if (!computerBoard.receiveAttack(y, x)) return
        drawComputerBoard(computerBoard.getBoard(), false)
        if (checkIfGameOver()) return
        switchTurn()

        turnDiv.textContent = "Calculating response..."
        calculateComputerHit()
    }
}

function checkIfGameOver() {
    const isOver = computerBoard.getIsGameOver() === true || playerBoard.getIsGameOver() === true
    if (isOver) turnDiv.textContent = "The game is over"
    return isOver
}

/*function setMainDiv() {
    mainDiv.innerHTML = `

        <div>
            <div class="text">
                <p>Your board</p>
            </div>
            <div id="playerBoardContainer"></div>
        </div>

        <div>
            <div class="text">
                <p>Computer board</p>
            </div>
            <div id="computerBoardContainer"></div>
        </div>
    `

    playerBoardContainer = document.getElementById("playerBoardContainer")
    computerBoardContainer = document.getElementById("computerBoardContainer")
}*/

function startGame() {
    mainDiv.innerHTML = `

        <div>
            <div class="text">
                <p>Your board</p>
            </div>
            <div id="playerBoardContainer"></div>
        </div>

        <div>
            <div class="text">
                <p>Computer board</p>
            </div>
            <div id="computerBoardContainer"></div>
        </div>
    `

    playerBoardContainer = document.getElementById("playerBoardContainer")
    computerBoardContainer = document.getElementById("computerBoardContainer")

    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    computer = new Player("Computer")
    computerName = computer.getName()
    computerBoard = computer.getBoardObject()
    //in here generate random ship placements for the computer

    computerBoard.placeShip(carrier, 3, 9, false)
    computerBoard.placeShip(battleship, 4, 4)
    computerBoard.placeShip(cruiser, 7, 3, false)
    computerBoard.placeShip(submarine, 0, 3, true)
    computerBoard.placeShip(destroyer, 2, 6, true)

    drawPlayerBoard(playerBoard.getBoard())
    drawComputerBoard(computerBoard.getBoard(), false)
    turn = playerName
    turnDiv.textContent = `It's ${turn}'s turn`
    infoDiv.removeAttribute("class")
}

function setMainDiv() {
    mainDiv.innerHTML = `

        <div>
            <div class="text">
                <p></p>
            </div>
            <div id="playerBoardContainer"></div>
            <div id="shipRotationBtnContainer">
                <button id="shipRotationBtn">Change rotation</button>
            </div>
        </div>
    `

    playerBoardContainer = document.getElementById("playerBoardContainer")
    const infoText = document.querySelector(".text")
    infoText.textContent = "Place your ships"
    const rotateBtn = document.getElementById("shipRotationBtn")
    rotateBtn.addEventListener("click", toggleRotation)
}

let currentShipArrayIndex = 0
let horizontal = false
let currentShip
let isCurrentSquareValidForShip = false

function toggleRotation() {
    horizontal = horizontal? false : true
}

function drawShipPlacementBoard(array) {
    const size = array.length
    playerBoardContainer.textContent = ""

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            cellDiv.className = `placeShipCellDiv`
            cellDiv.setAttribute("id", `${i}-${j}`)
            cellDiv.addEventListener("mouseover", (event) => showIsPlacementValid(event))
            cellDiv.addEventListener("click", (event) => placePlayerShip(event)) 
            rowDiv.appendChild(cellDiv)
        }
        playerBoardContainer.appendChild(rowDiv)
    }
}

function clearHighlights() {
    const cells = document.querySelectorAll(".placeShipCellDiv")
    cells.forEach(cell => {
        cell.classList.remove("validPlacement", "invalidPlacement")
    })
}

function showIsPlacementValid(event) {
    clearHighlights()

    const length = currentShip.getShipLength()
    const [y,x] = event.target.id.split("-").map(str => parseInt(str))
    const isValid = playerBoard.validateShipPlacement(length, y, x, horizontal)
    const newCellClass = isValid? "validPlacement" : "invalidPlacement"

    for (let i = 0; i < length; i++) {
        let newX = horizontal? x + i : x
        let newY = horizontal? y : y + i

        const cell = document.getElementById(`${newY}-${newX}`)
        //check if cell exists because x and y can go out of bounds
        //ie. x could be 12 and y = 9 when board length is only 10
        if (cell) cell.classList.add(newCellClass)
    }
    isCurrentSquareValidForShip = isValid
}

function placePlayerShip(event) {
    //the board should be drawn again after each ship placement
    if (isCurrentSquareValidForShip) {
        const [y,x] = event.target.id.split("-").map(str => parseInt(str))
        playerBoard.placeShip(currentShip, y, x, horizontal)
        if (currentShipArrayIndex + 1 < ships.length) {
            currentShipArrayIndex++
            console.log(currentShipArrayIndex);
            currentShip = ships[currentShipArrayIndex]
        } else {
            console.log("Nyt loppu laivat kesken");
            //here call function that draws both boards onscreen
            startGame()
        }
    }
}

function placePlayerShips(ships) {
    currentShip = ships[0]
    drawShipPlacementBoard(playerBoard.getBoard())
}

function main() {

    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D

    ships = [carrier, battleship, cruiser, submarine, destroyer]
    currentShip = ships[0]

    //player
    player = new Player("Eetu")
    playerBoard = player.getBoardObject()
    placePlayerShips(ships)
}

nameDialog.showModal()
