var current_color = "white";
var save_data = {};
//var test2 = '{"savename":"test2","row_1_box_1":"rgb(255, 255, 255)","row_1_box_2":"rgb(0, 0, 204)","row_1_box_3":"rgb(204, 0, 0)","row_1_box_4":"rgb(255, 255, 255)","row_2_box_1":"rgb(255, 236, 0)","row_2_box_2":"rgb(255, 255, 255)","row_2_box_3":"rgb(255, 255, 255)","row_2_box_4":"rgb(255, 255, 255)","row_3_box_1":"rgb(255, 255, 255)","row_3_box_2":"rgb(204, 0, 0)","row_3_box_3":"rgb(255, 255, 255)","row_3_box_4":"rgb(255, 255, 255)","row_4_box_1":"rgb(255, 255, 255)","row_4_box_2":"rgb(255, 255, 255)","row_4_box_3":"rgb(0, 0, 204)","row_4_box_4":"rgb(0, 0, 204)"}';

window.addEventListener("load", function() {

	addPaletteListeners();
	addSquareListeners();
	addSaveListener();
	addLoadListener();
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
	e.preventDefault();
	var squares = document.getElementsByClassName("row");
	for(i=0; i<squares.length; i++) {
		var styles = window.getComputedStyle(squares[i], null);
		var color = styles.getPropertyValue("background-color");
		save_data[squares[i].id] = color;
	}
	sendSaveData();
}

function sendSaveData() {
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/save";
	xhr.open("post", url, true);
	var data = JSON.stringify(save_data);
	xhr.send(data);
}

function addLoadListener() {
	document.getElementById("load_button").addEventListener("click", getSaveToLoad)
}

// function loadClicked(e) {
// 	e.preventDefault();
// 	savename = getSaveToLoad();
// 	debugger;
	
// }

function getSaveToLoad(e) {
	e.preventDefault();

	var xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/savelist"
	xhr.open("get", url, true);
	xhr.addEventListener("load", handleLoadResponse);
	xhr.send();
	// return "1487048257";
	// debugger;
	// return savenames;
}

function handleLoadResponse(e) {
	savenames = JSON.parse(e.target.responseText);
	pickSaveName(savenames);
	debugger;
	loadAndDisplayMondrian(n);
	
}

function pickSaveName(savenames) {
	
}

function loadAndDisplayMondrian(savename) {
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/load?save=" + savename;
	xhr.open("get", url, true);
	xhr.addEventListener("load", function () {
		load_data = JSON.parse(xhr.responseText);
		displayLoadedMondrian(load_data);
	});
	xhr.send();
}

function displayLoadedMondrian(load_data) {
	var squares = document.getElementsByClassName("row");
	for(i=0; i<squares.length; i++) {
		square_id = squares[i].id
		squares[i].style.backgroundColor = load_data[square_id];
	}

}
