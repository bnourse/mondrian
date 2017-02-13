var current_color = "white";
var save_data = {};

window.addEventListener("load", function() {

	addPaletteListeners();
	addSquareListeners();
	addSaveListener();

});

function addPaletteListeners() {
	palettes = document.getElementsByClassName("color");

	for(i=0; i<palettes.length; i++) {
		palettes[i].addEventListener("click", paletteClicked);
	}
}

function paletteClicked(e) {
	var styles = window.getComputedStyle(e.target, null);
	var palette_color = styles.getPropertyValue("background-color");
	current_color = palette_color;
}

function addSquareListeners() {
	var squares = document.getElementsByClassName("row");

	for(i=0; i<squares.length; i++) {
		squares[i].addEventListener("click", squareClicked);
	}
}

function squareClicked(e) {
	e.target.style.backgroundColor = current_color;
}

function addSaveListener() {
	document.getElementById("save_button").addEventListener("click", saveClicked)
}

function saveClicked(e) {
	var squares = document.getElementsByClassName("row");
	for(i=0; i<squares.length; i++) {
		var styles = window.getComputedStyle(squares[i], null);
		var color = styles.getPropertyValue("background-color");
		save_data[squares[i].id] = color;
	}
	sendSaveData();
}

function sendSaveData() {
	xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/save";
	xhr.open("post", url, true);
	//xhr.setRequestHeader("Content-type", "application/json");
	// xhr.onreadystatechange = function () { 
	//     if (xhr.readyState == 4 && xhr.status == 200) {
	//         var json = JSON.parse(xhr.responseText);
	//         console.log(json.email + ", " + json.password)
	//     }
	// }
	var data = JSON.stringify(save_data);
	xhr.send(data);
}
