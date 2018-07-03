function initialiseLeColorPicker() {
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", updateColor, false);
    colorWell.addEventListener("change", updateColor, false);
    colorWell.select();
}

function updateColor(event) {
    color = event.target.value;
    document.execCommand("foreColor", false, color);
}