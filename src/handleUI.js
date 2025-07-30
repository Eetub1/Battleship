function drawBoard(array, left=true) {
    const player1BoardContainer = document.getElementById("player1BoardContainer")
    const player2BoardContainer = document.getElementById("player2BoardContainer")
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
            cellDiv.setAttribute("id", `${i}-${j}`)
            cellDiv.addEventListener("click", (event) => calculateHit(event))
            rowDiv.appendChild(cellDiv)
        }
        if (left) {
            player1BoardContainer.appendChild(rowDiv)
        } else {
            player2BoardContainer.appendChild(rowDiv)
        }
    }
}

function calculateHit(event) {
    console.log(event.target);
    const coordinates = event.target.id.split("-")
    console.log(coordinates);
}

module.exports = drawBoard