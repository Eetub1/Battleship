function setElemText(elem, text) {
    elem.textContent = text
}
 
function toggleElementVisibility(elem) {
    elem.classList.toggle("hidden")
}

function setDivHTML(div, html) {
    div.innerHTML = html
}

module.exports = {
    setElemText,
    toggleElementVisibility,
    setDivHTML
}