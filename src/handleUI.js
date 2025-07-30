function drawBoard(array) {
    const playerBoardContainer = document.getElementById("playerBoardContainer")
    const size = array.length

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "boardRowDiv"
        for (let j = 0; j < size; j++) {
            const cellDiv = document.createElement("div")
            if (array[i][j] === "O") {
                cellDiv.className = "cellDiv borderBlack"
            } else {
                cellDiv.className = "cellDiv borderRed"
            }
            cellDiv.textContent = array[i][j]
            rowDiv.appendChild(cellDiv)
        }
        playerBoardContainer.appendChild(rowDiv)
    }
}

module.exports = drawBoard