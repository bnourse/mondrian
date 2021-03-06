var current_color = "white";
var save_data = {};

window.addEventListener("load", function() {
	addPaletteListeners();
	addSquareListeners();
	addModalListeners();
	addSaveListener();
	addLoadListener();
	addResetListener();
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
	document.getElementById("save_button").addEventListener("click", saveClicked);
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
	document.getElementById("load_button").addEventListener("click", getSaveToLoad);
}

function getSaveToLoad(e) {
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/savelist";
	xhr.open("get", url, true);
	xhr.addEventListener("load", savelistLoaded);
	xhr.send();
}

function savelistLoaded(e) {
	savenames = JSON.parse(e.target.responseText);
	displaySavelist(savenames);
	addSavelistListeners();
}

function displaySavelist(savenames) {
	modal = document.getElementById("modal");
	modal_body = document.getElementById("modal__body");
	modal_body.innerHTML = getListHtml(savenames);
	modal.style.display = "block";
}

function getListHtml(savenames) {
	listHtml = "<ul> ";
	for (i=0; i<savenames.length; i++) {
		listHtml += "<li><a href=\"#\" class = \"savelist-item\">" 
		listHtml += savenames[i] 
		listHtml += "</a>  </li> ";
	}
	listHtml += "</ul> ";
	return listHtml;
}

function addSavelistListeners() {
	savelistItems = document.getElementsByClassName("savelist-item");
	for (i=0;i<savelistItems.length;i++) {
		savelistItems[i].addEventListener("click",savelistItemClicked);
	}
}

function savelistItemClicked(e) {
	e.preventDefault();
	savename = e.target.innerText;
	loadAndDisplayMondrian(savename);
	document.getElementById("modal").style.display = "none";
}

function loadAndDisplayMondrian(savename) {
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:4567/load?save=" + savename;
	xhr.open("get", url, true);
	xhr.addEventListener("load", loadLoaded);
	xhr.send();
}

function loadLoaded(e) {
	load_data = JSON.parse(e.target.responseText);
	displayLoadedMondrian(load_data);
}

function displayLoadedMondrian(load_data) {
	var squares = document.getElementsByClassName("row");
	for(i=0; i<squares.length; i++) {
		square_id = squares[i].id;
		squares[i].style.backgroundColor = load_data[square_id];
	}
}

function addModalListeners() {
	modalClose = document.getElementById("modal__close");
	modalClose.addEventListener("click", modalCloseClicked);

	modalBackground = document.getElementById("modal");
	modalBackground.addEventListener("click", modalCloseClicked);
}

function modalCloseClicked(e) {
	if (e.target == this) {
		document.getElementById("modal").style.display = "none";
	}
}

function addResetListener () {
	document.getElementById("reset_button").addEventListener("click", resetClicked);
}

function resetClicked (e) {
	e.preventDefault();
	var squares = document.getElementsByClassName("row");
	for(i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = "rgb(255, 255, 255)";
	}
}

