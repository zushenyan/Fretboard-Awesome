import {Note} from "./Note";

export class EleNote extends Note{
	constructor(){
		super();

		this._uiNote = document.createElement("li");
		this._uiString = document.createElement("div");
		this._uiNoteTextContainer = document.createElement("div");
		this._uiNoteText = document.createElement("span");

		this._uiNoteTextContainer.classList.add("fa-note");
		this._uiNoteTextContainer.appendChild(this._uiNoteText);
		this._uiString.appendChild(this._uiNoteTextContainer);
		this._uiNote.appendChild(this._uiString);
	}

	/**
		@param {string} note - format "d#", "E", "G#".
		@param {string} notation - either be "#" or "b".
		@param {string} bgColor - color format in string.
		@param {number} stringGauge - how thick the string will be displayed, unit in px.
	*/
	init(note, notation = "#", bgColor = "white", stringGauge = 12){
		super.init(note, notation);
		this.setNoteName(note, notation);
		this.setBgColor(bgColor);
		this.setStringGauge(stringGauge);
		this.hide();
		return this;
	}

	getEle(){
		return this._uiNote;
	}

	setNoteName(noteName, notation){
		if(typeof noteName === "string" || noteName instanceof String || notation === "#" || notation == "b"){
			super.setNoteName(noteName, notation);
			this._uiNoteText.innerHTML = "";
			this._uiNoteText.appendChild(document.createTextNode(this.getNoteName()));
		}
		else {
			throw new TypeError("parameter noteName should be type of string: " + noteName);
		}
	}

	setBgColor(bgColor){
		if(typeof bgColor === "string" || bgColor instanceof String){
			this._uiNoteTextContainer.style.backgroundColor = bgColor;
		}
		else {
			throw new TypeError("parameter bgColor should be type of string: " + bgColor);
		}
	}

	getBgColor(){
		return this._uiNoteTextContainer.style.backgroundColor;
	}

	setStringGauge(gauge){
		if(typeof gauge !== "number" && gauge > -1){
			throw new TypeError("parameter gauge should be greater than -1:" + gauge);
		}
		this._uiString.style.width = gauge + "px";
	}

	getStringGauge(){
		return this._uiString.style.width;
	}

	show(){ this._uiNoteTextContainer.classList.remove("hide"); }
	hide(){ this._uiNoteTextContainer.classList.add("hide"); }
	isVisible(){ return !this._uiNoteTextContainer.classList.contains("hide"); }

	/*
		the "dot" on 3,5,7,9,12... guitar frets
	*/
	markInlays(){ this._uiNote.classList.add("inlays"); }
	removeInlays(){ this._uiNote.classList.remove("inlays"); }
	hasInlays(){ return this._uiNote.classList.contains("inlays"); };
}
