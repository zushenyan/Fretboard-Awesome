import {Note} from "./Note";
import {FretboardAwesomeConfig} from "./FretboardAwesomeConfig";

export class EleNote extends Note{
	constructor(){
		super();
		this._uiLi = document.createElement("li");
		this._uiSpan = document.createElement("span");

		this._uiLi.classList.add("fa-note");
		this._uiLi.appendChild(this._uiSpan);
	}

	/*
		@{string} note - format "d#", "E", "G#".
		@{string} notation - either be "#" or "b".
		@{string} bgColor - color format in string.
		@{boolean} visible - to show this element note or not.
	*/
	init(note, notation = "#", bgColor = "white", visible = false){
		super.init(note, notation);
		this.setNoteName(note, notation);
		this.setBgColor(bgColor);
		this.setVisible(visible);

		return this;
	}

	getEle(){
		return this._uiLi;
	}

	setNoteName(noteName, notation){
		if(typeof noteName === "string" || noteName instanceof String || notation === "#" || notation == "b"){
			super.setNoteName(noteName, notation);
			this._uiSpan.innerHTML = "";
			this._uiSpan.appendChild(document.createTextNode(this.getNoteName()));
		}
		else {
			throw new TypeError("parameter noteName should be type of string: " + noteName);
		}
	}

	setBgColor(bgColor){
		if(typeof bgColor === "string" || bgColor instanceof String){
			this._uiLi.style.backgroundColor = bgColor;
		}
		else {
			throw new TypeError("parameter bgColor should be type of string: " + bgColor);
		}
	}

	getBgColor(){
		return this._uiLi.style.backgroundColor;
	}

	setVisible(visible){
		if(typeof visible !== "boolean"){
			throw new TypeError("parameter visible should be type of boolean: " + visible);
		}
		if(visible){
			this._uiLi.classList.remove("hide");
		}
		else{
			this._uiLi.classList.add("hide");
		}
	}

	getVisible(){
		return this._uiList.classList.contains("hide");
	}

	/*
		the "dot" on 3,5,7,9,12... guitar frets
	*/
	markInlays(){ this._uiLi.classList.add("inlays"); }
	removeInlays(){ this._uiLi.classList.remove("inlays"); }
	hasInlays(){ return this._uiLi.classList.contains("inlays"); };
}
