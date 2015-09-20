import {Note} from "./Note";
import {Config} from "./Config";

export class EleNote extends Note{
	constructor(){
		super();

		this._uiNote = document.createElement("li");
		this._uiString = document.createElement("div");
		this._uiNoteTextContainer = document.createElement("div");
		this._uiNoteText = document.createElement("span");

		this._uiNoteTextContainer.classList.add("fa-note");
		this._uiNoteText.classList.add("fa-note-text");
		this._uiString.classList.add("fa-string-image");
		this._uiNote.classList.add("fa-fret");

		this._uiNoteTextContainer.appendChild(this._uiNoteText);
		this._uiNote.appendChild(this._uiString);
		this._uiNote.appendChild(this._uiNoteTextContainer);

		this._stringGauge = 3;
		this._orientation = Config.ORI_VERTICAL;
	}

	/**
		@param {string} note - format "d#", "E", "G#".
		@param {string} notation - either be "#" or "b".
		@param {string} bgColor - color format in string.
		@param {number} stringGauge - how thick the string will be displayed, unit in px.
		@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
	*/
	init(note, notation = "#", bgColor = "white", stringGauge = 12, orientation = Config.ORI_VERTICAL){
		super.init(note, notation);
		this.setNoteName(note, notation);
		this.setBgColor(bgColor);
		this.setStringGauge(stringGauge);
		this.setOrientation(orientation);
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
		if(typeof gauge !== "number" || gauge < 0){
			throw new TypeError("parameter gauge should be greater than 0:" + gauge);
		}
		if(this.getOrientation() === Config.ORI_VERTICAL){
			this._uiString.style.height = Config.FRET_HEIGHT_DEFAULT + "px";
			this._uiString.style.width = gauge.toString() + "px";
		}
		else if(this.getOrientation() === Config.ORI_HORIZONTAL){
			this._uiString.style.height = gauge.toString() + "px";
			this._uiString.style.width = Config.FRET_HEIGHT_DEFAULT + "px";
		}
		else{
			throw new Error("whats the sorcery? " + gauge);
		}
		this._stringGauge = gauge;
	}

	getStringGauge(){
		return this._stringGauge;
	}

	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
		}
		if(this._orientation === orientation){
			return;
		}
		this._orientation = orientation;
		this.setStringGauge(this.getStringGauge());
	}

	getOrientation(){
		return this._orientation;
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
