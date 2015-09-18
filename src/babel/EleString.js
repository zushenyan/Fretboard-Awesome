import {MusicTheory} from "./MusicTheory";
import {EleNote} from "./EleNote";

export class EleString{
	constructor(){
		this._uiString = document.createElement("ul");
		this._eleNotes = []; // array of EleNote
		this._tuning = "";
	}

	init(tuning, length, notation, includeStart, stringGauge){
		initUI.call(this);
		this.setTuning(tuning, length, notation, includeStart, stringGauge);
		return this;

		function initUI(){
			this._uiString.classList.add("fa-string");
		}
	}

	/**
		@param {string} tuning - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeStart - whether to include the start key.
		@param {number} stringGauge - how thick the string will be displayed, unit in px.
	*/
	setTuning(tuning, length, notation = "#", includeStart = false, stringGauge = 12){
		if(!(typeof tuning === "string" || tuning instanceof String)){
			throw new TypeError("parameter tuning should be string: " + tuning);
		}
		if(!(typeof length !== "number") && length < 1){
			throw new TypeError("parameter length should be a number which is greater than 0: " + length);
		}
		if(!(notation === "#" || notation === "b")){
			throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
		}
		if(typeof includeStart !== "boolean"){
			throw new TypeError("parameter includeStart should be type of boolean: " + includeStart);
		}
		if(!(typeof stringGauge !== "number") && stringGauge < 0){
			throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
		}
		// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
		let notes = MusicTheory.tuning(tuning, length, notation, includeStart);
		if(this._eleNotes.length === notes.length){
			for(let i = 0; i < notes.length; i++){
				this._eleNotes[i].setNoteName(notes[i], notation);
			}
		}
		// if not then recreate everything.
		else {
			this._uiString.innerHTML = "";
			this._eleNotes = [];
			for(let i = 0; i < notes.length; i++){
				let result = new EleNote().init(notes[i], notation, "white", stringGauge);
				this._eleNotes.push(result);
				this._uiString.appendChild(result.getEle());
			}
			this._tuning = MusicTheory.convertAccidental(tuning, notation);
		}
	}

	getTuning(){
		return this._tuning;
	}

	/**
		to make specified keys visible.
		@param {array} target - make target keys visible. format: [{key: "C#", color: "yellow"}, {key: "D#", color: "blue"}, ...]
		@return {array} - return what key was being marked.
	*/
	markKeys(target){
		if(!(target instanceof Array)){
			throw new TypeError("parameter target should be type of array: " + target);
		}
		resetDisplay.call(this);
		let result = [];
		for(let i = 0; i < target.length; i++){
			for(let j = 0; j < this._eleNotes.length; j++){
				let key1 = MusicTheory.convertAccidental(target[i].key);
				let key2 = MusicTheory.convertAccidental(this._eleNotes[j].getNoteName());
				if(key1 === key2){
					this._eleNotes[j].show();
					this._eleNotes[j].setBgColor(target[i].color);
					result.push(this._eleNotes[j]);
				}
			}
		}
		return result;

		function resetDisplay(){
			for(let i = 0; i < this._eleNotes.length; i++){
				this._eleNotes[i].hide();
				this._eleNotes[i].setBgColor("white");
			}
		}
	}

	getEle(){
		return this._uiString;
	}

	getEleNotes(){
		return this._eleNotes;
	}
}
