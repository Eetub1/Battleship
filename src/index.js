const Player = require("./player.js")
const Ship = require("./ship.js")
const GameBoard = require("./gameboard.js")
const {setDivText, togglePlayAgainBtn, setDivHTML} = require("./handleUI.js")
import './style.css'

//code for DOM manipulation
//=================================================================================

const computerBoardContainer = document.getElementById("computerBoardContainer")
const playerBoardContainer = document.getElementById("playerBoardContainer")

const rotateBtn = document.getElementById("shipRotationBtn")
rotateBtn.addEventListener("click", toggleRotation)

const turnDiv = document.getElementById("turnDiv")
const infoText = document.getElementById("infoText")
const nameDialog = document.getElementById("nameDialog")
const playAgainBtn = document.getElementById("playAgainBtn")
playAgainBtn.addEventListener("click", playAgain)

const submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const form = document.forms.nameForm
    const name = form.name.value
    if (name.trim() === "") return
    playerName = name
    turn = playerName
    nameDialog.close()
    main()
})

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

function startGame() {
    setDivText(infoText, "Game started!")
    drawBoard(playerArray, "player")
    drawBoard(computerArray, "computer")
    setDivText(turnDiv, `It's ${turn}'s turn`)
}

function setComputer() {
    computer = new Player("Computer")
    computerName = computer.getName()
    computerBoard = computer.getBoardObject()
    computerArray = computerBoard.getBoard()
    computerShips = createShips()
    computerBoard.placeShipsRandomly(computerShips)
}

//tää handleUI
function clearHighlights() {
    const cells = document.querySelectorAll(".placeShipCellDiv")
    cells.forEach(cell => {
        cell.classList.remove("validPlacement", "invalidPlacement")
    })
}

//handleUI
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

//Code related to game logic
//==================================================================================
const constants = {
    EMPTY_CELL: "O",
    HIT_CELL: "H",
    MISSED_CELL: "M"
}

let player
let playerName
let playerBoard
let playerArray

let computer
let computerName
let computerBoard
let computerArray

let computerShips
let playerShips
let turn

let horizontal = false
let currentShip
let isCurrentSquareValidForShip = false
let currentShipArrayIndex = 0

function switchTurn () {
    turn = turn === playerName? computerName : playerName
}

function createShips() {
    return [
        new Ship(5), 
        new Ship(4, "Battleship"), 
        new Ship(3, "Cruiser"), 
        new Ship(3, "Submarine"), 
        new Ship(2, "Destroyer")]
}

function setShips() {
    playerShips = createShips()
    currentShip = playerShips[0]
    isCurrentSquareValidForShip = false
    currentShipArrayIndex = 0
    setDivText(infoText, `Place your ${currentShip.getShipName()}`)
    drawBoard(playerArray, "placement")
    setComputer()
    drawBoard(computerArray, "computer")
}

function playAgain() {
    togglePlayAgainBtn()
    setDivText(turnDiv, "")
    setMainDiv()
    playerBoard = new GameBoard()
    playerBoard.setGameBoard()
    playerArray = playerBoard.getBoard()
    setShips()
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

//helper function only needs constant object as parameter
function validateCoordinates(y, x, array) {
    if (y >= array.length || x >= array.length || y < 0 || x < 0) return false
    if (array[y][x] === constants.MISSED_CELL || array[y][x] === constants.HIT_CELL) return false
    return true
}

function handleClick(event) {
    if (turn !== playerName) return
    if (!checkIfGameOver()) {
        const clickInfo = event.target.id.split("-")
        const whoseBoardWasClicked = clickInfo[2]
        if (whoseBoardWasClicked === playerName) return
        const y = parseInt(clickInfo[0])
        const x = parseInt(clickInfo[1])
        if (!computerBoard.receiveAttack(y, x)) return
        drawBoard(computerArray, "computer")
        if (checkIfGameOver()) return
        switchTurn()
        setDivText(turnDiv, "Calculating response...")
        calculateComputerHit()
    }
}
let wasPreviousAttackHit = false
let huntMode = true
let previousHitCoordinates

//in the cell store each hit cell with an object that has info if 
//the cells top right bottom and left adjacent cells have been struck
//array should be updated every time there is a hit
let hitCells = []

const intelligenceLevel = {
    DUMB: "D",
    SMART: "S"
}
let computerIntelligence = intelligenceLevel.SMART

function updateHitCells() {
    hitCells.push({
        "y": previousHitCoordinates[0],
        "x": previousHitCoordinates[1]
    })
    for (const hit of hitCells) {
        console.log(hit["y"], hit["x"]);
    }
    console.log("TÄällä ollaa");
}

//this can be made alot smarter TODO
function calculateSmartAttack() {
    let [y,x] = previousHitCoordinates
    if (validateCoordinates(y - 1, x, playerArray)) return [y - 1, x]
    if (validateCoordinates(y, x + 1, playerArray)) return [y, x + 1]
    if (validateCoordinates(y + 1, x, playerArray)) return [y + 1, x]
    if (validateCoordinates(y, x - 1, playerArray)) return [y, x - 1]
    else return generateRandomCoordinates(playerArray.length)
}

function calculateComputerHit() {
    setTimeout(() => {
        let y,x
        if (computerIntelligence === intelligenceLevel.DUMB || huntMode === true) {
            [y,x] = generateRandomCoordinates(playerArray.length)
        } else {
            [y,x] = calculateSmartAttack()
        }
        playerBoard.receiveAttack(y, x)

        //if the attack was a hit on a boat
        if (computerIntelligence === intelligenceLevel.SMART) {
            if (playerArray[y][x] === constants.HIT_CELL) {
                wasPreviousAttackHit = true
                huntMode = false
                previousHitCoordinates = [y,x]
                updateHitCells()
            } else {
                wasPreviousAttackHit = false
                huntMode = true
            }
        }
        console.log("Oliko tietokoneen viime isku osuma: ",wasPreviousAttackHit);
        console.log("Koordinaatit: ", previousHitCoordinates);
        console.log("");

        drawBoard(playerArray, "player")
        if (!checkIfGameOver()) {
            switchTurn()
            setDivText(turnDiv, `It's ${turn}'s turn`)
        }
    }, 50)
}/*Math.floor(Math.random() * 500) + 500*/

function checkIfGameOver() {
    const isOver = computerBoard.getIsGameOver() === true || playerBoard.getIsGameOver() === true
    if (isOver) {
        if (turn === playerName) setDivText(turnDiv, "Congratulations! You won the game!")
        else setDivText(turnDiv, "Game over! Computer won!")
        togglePlayAgainBtn()
    }
    return isOver
}

function toggleRotation() {
    horizontal = horizontal? false : true
}

function placePlayerShip(event) {
    if (isCurrentSquareValidForShip) {
        const [y,x] = event.target.id.split("-").map(str => parseInt(str))
        playerBoard.placeShip(currentShip, y, x, horizontal)
        if (currentShipArrayIndex + 1 < playerShips.length) {
            currentShipArrayIndex++
            currentShip = playerShips[currentShipArrayIndex]
            setDivText(infoText, `Place your ${currentShip.getShipName()}`)
            drawBoard(playerArray, "placement")
        } else {
            startGame()
        }
    }
}

function main() {
    player = new Player("Eetu")
    playerBoard = player.getBoardObject()
    playerArray = playerBoard.getBoard()
    setShips()
}

//the whole program starts from the opening of this modal
nameDialog.showModal()
