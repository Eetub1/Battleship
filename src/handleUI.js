function setDivText(div, text) {
    div.textContent = text
}
 
function toggleElement(elem) {
    elem.classList.toggle("hidden")
}

function setDivHTML(div, html) {
    div.innerHTML = html
}

module.exports = {
    setDivText,
    toggleElement,
    setDivHTML
}