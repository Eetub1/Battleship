const Player = require("./player.js")
const Ship = require("./ship.js")
const GameBoard = require("./gameboard.js")
import './style.css'

const EMPTY_CELL = "O"
const HIT_CELL = "H"
const MISSED_CELL = "M"

const constants = {
    EMPTY_CELL: "O",
    HIT_CELL: "H",
    MISSED_CELL: "M"
}

let playerBoard
let computerBoard
let player
let computer
let playerName
let computerName
let playerArray
let computerArray

const playAgainBtn = document.getElementById("playAgainBtn")
playAgainBtn.addEventListener("click", playAgain)
let playerBoardContainer
let computerBoardContainer
let turnDiv = document.getElementById("turnDiv")
let turn

let ships

const infoText = document.getElementById("infoText")
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

function setTurnDivText(text) {
    turnDiv.textContent = text
}

function setInfoText(text) {
    infoText.textContent = text
}

function playAgain() {
    playAgainBtn.classList.add("hidden")
    setTurnDivText("")
    setMainDiv()
    playerBoard = new GameBoard()
    playerBoard.setGameBoard()
    playerArray = playerBoard.getBoard()

    const carrier = new Ship(5) //C
    const battleship = new Ship(4, "Battleship") //B
    const cruiser = new Ship(3, "Cruiser") //R
    const submarine = new Ship(3, "Submarine") //S
    const destroyer = new Ship(2, "Destroyer") //D
    ships = [carrier, battleship, cruiser, submarine, destroyer]
    currentShip = ships[0]
    isCurrentSquareValidForShip = false
    currentShipArrayIndex = 0
    placePlayerShips(ships)
}

//type is either "player", "computer" or "placement"
//depending on which type of board we want to draw
function drawBoard(array, type) {
    const size = array.length

    if (type === "computer") computerBoardContainer.textContent = ""
    else playerBoardContainer.textContent = ""

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            const value = array[i][j]
            if (type === "placement") {
                if (value !== constants.EMPTY_CELL) cellDiv.className = `placeShipCellDiv green`
                else cellDiv.className = `placeShipCellDiv`
                cellDiv.setAttribute("id", `${i}-${j}`)
                cellDiv.addEventListener("mouseover", (event) => showIsPlacementValid(event))
                cellDiv.addEventListener("click", (event) => placePlayerShip(event)) 
            } else {
                if (type === "player") {
                    switch(value) {
                        case constants.MISSED_CELL:
                            cellDiv.className = "cellDiv red"
                            break
                        case constants.HIT_CELL:
                            cellDiv.className = "cellDiv green"
                            break
                        case constants.EMPTY_CELL:
                            cellDiv.className = "cellDiv"
                            break
                        default:
                            cellDiv.className = "cellDiv blue"
                            break
                    }
                } else {
                    switch(value) {
                        case constants.HIT_CELL:
                            cellDiv.className = "cellDiv green"
                            break
                        case constants.MISSED_CELL:
                            cellDiv.className = "cellDiv red"
                            break
                        default:
                            cellDiv.className = "cellDiv"
                            break
                    }
                }
                cellDiv.setAttribute("id", `${i}-${j}-${type === "player" ? playerName : computerName}`)
                cellDiv.addEventListener("click", (event) => handleClick(event))
            }
            rowDiv.appendChild(cellDiv)
        }
        if (type === "computer") computerBoardContainer.appendChild(rowDiv)
        else playerBoardContainer.appendChild(rowDiv)
    }
}

//helper function
function generateRandomCoordinates(range) {
    let y,x
    let areCoordinatesValid = false
    while (!areCoordinatesValid) {
        y = Math.floor(Math.random() * range)
        x = Math.floor(Math.random() * range)
        areCoordinatesValid = validateCoordinates(y, x, playerArray)
    }
    return [y,x]
}

//voi olla vaikeampi eriyttää toiseen moduuliin
function calculateComputerHit() {
    setTimeout(() => {
        const [y,x] = generateRandomCoordinates(playerArray.length)
        playerBoard.receiveAttack(y, x)
        //drawPlayerBoard(playerArray)
        drawBoard(playerArray, "player")
        if (!checkIfGameOver()) {
            switchTurn()
            setTurnDivText(`It's ${turn}'s turn`)
        }
    }, 50)
}

//helper function only needs constant object as parameter also
function validateCoordinates(y, x, array) {
    if (y >= array.length || x >= array.length || y < 0 || x < 0) return false
    if (array[y][x] === constants.MISSED_CELL || array[y][x] === constants.HIT_CELL) return false
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
        drawBoard(computerArray, "computer")
        //drawComputerBoard(computerArray)
        if (checkIfGameOver()) return
        switchTurn()
        setTurnDivText("Calculating response...")
        calculateComputerHit()
    }
}

function checkIfGameOver() {
    const isOver = computerBoard.getIsGameOver() === true || playerBoard.getIsGameOver() === true
    if (isOver) {
        if (turn === playerName) setTurnDivText("Congratulations! You won the game!")
        else setTurnDivText("Game over! Computer won!")
        playAgainBtn.classList.remove("hidden")
    }
    return isOver
}

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

    setInfoText("Game started!")

    playerBoardContainer = document.getElementById("playerBoardContainer")
    computerBoardContainer = document.getElementById("computerBoardContainer")

    computer = new Player("Computer")
    computerName = computer.getName()
    computerBoard = computer.getBoardObject()
    computerArray = computerBoard.getBoard()
    computerBoard.placeShipsRandomly(ships)

    drawBoard(playerArray, "player")
    //drawPlayerBoard(playerArray)
    drawBoard(computerArray, "computer")
    //drawComputerBoard(computerArray)
    turn = playerName
    setTurnDivText(`It's ${turn}'s turn`)
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
    const rotateBtn = document.getElementById("shipRotationBtn")
    rotateBtn.addEventListener("click", toggleRotation)
}

let horizontal = false
let currentShip
let isCurrentSquareValidForShip = false
let currentShipArrayIndex = 0

function toggleRotation() {
    horizontal = horizontal? false : true
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
    if (isCurrentSquareValidForShip) {
        const [y,x] = event.target.id.split("-").map(str => parseInt(str))
        playerBoard.placeShip(currentShip, y, x, horizontal)
        if (currentShipArrayIndex + 1 < ships.length) {
            currentShipArrayIndex++
            currentShip = ships[currentShipArrayIndex]
            setInfoText(`Place your ${currentShip.getShipName()}`)
            drawBoard(playerArray, "placement")
            //drawShipPlacementBoard(playerArray)
        } else {
            //we ran out of ships to place so we start the game
            startGame()
        }
    }
}

function placePlayerShips(ships) {
    setInfoText(`Place your ${currentShip.getShipName()}`)
    drawBoard(playerArray, "placement")
    //drawShipPlacementBoard(playerArray)
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
    playerArray = playerBoard.getBoard()
    placePlayerShips(ships)
}

//the whole program starts from the opening of this modal
nameDialog.showModal()
