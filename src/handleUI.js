function setDivText(div, text) {
    div.textContent = text
} 

function togglePlayAgainBtn() {
    playAgainBtn.classList.toggle("hidden")
}

function setDivHTML(div, html) {
    div.innerHTML = html
}

module.exports = {
    setDivText,
    togglePlayAgainBtn,
    setDivHTML
}