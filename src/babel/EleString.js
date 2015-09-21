import {MusicTheory} from "./MusicTheory";
import {EleNote} from "./EleNote";
import {Config} from "./Config";

export class EleString{
	constructor(){
		this._uiString = document.createElement("ul");
		this._eleNotes = []; // array of EleNote
		this._tuning = "";
		this._stringGauge = 0;
		this._orientation = Config.ORI_VERTICAL;
	}

	init(tuning, length = 12, notation = "#", includeOpenFret = false, stringGauge = 6, orientation = Config.ORI_VERTICAL){
		initUI.call(this);
		this.setTuning(tuning, length, notation, includeOpenFret);
		this.setOrientation(orientation);
		this.setStringGauge(stringGauge);
		return this;

		function initUI(){
			this._uiString.classList.add("fa-string");
		}
	}

	/**
		@param {string} tuning - in what key we are tuning.
		@param {number} length - how long should the fretboard be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the start key.
	*/
	setTuning(tuning, length, notation = "#", includeOpenFret = false){
		if(!(typeof tuning === "string" || tuning instanceof String)){
			throw new TypeError("parameter tuning should be string: " + tuning);
		}
		if(!(typeof length !== "number") && length < 1){
			throw new TypeError("parameter length should be a number which is greater than 0: " + length);
		}
		if(!(notation === "#" || notation === "b")){
			throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
		}
		if(typeof includeOpenFret !== "boolean"){
			throw new TypeError("parameter includeOpenFret should be type of boolean: " + includeOpenFret);
		}
		// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
		let notes = MusicTheory.tuning(tuning, length, notation, includeOpenFret);
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
				let result = new EleNote().init(notes[i], notation, "white", this.getStringGauge(), this.getOrientation());
				this._eleNotes.push(result);
				this._uiString.appendChild(result.getEle());
			}
			this._tuning = MusicTheory.convertAccidental(tuning, notation);
		}
	}

	getTuning(){
		return this._tuning;
	}

	setStringGauge(gauge){
		if(typeof gauge !== "number" || gauge < 0){
			throw new TypeError("parameter gauge should be greater than 0:" + gauge);
		}
		for(let i = 0; i < this._eleNotes.length; i++){
			this._eleNotes[i].setStringGauge(gauge);
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
		for(let i = 0; i < this._eleNotes.length; i++){
			this._eleNotes[i].setOrientation(orientation);
		}
		this._orientation = orientation;
	}

	getOrientation(){
		return this._orientation;
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

	/**
		@param {array} targetFrets - indicates which frets you want to mark inlays. Will throw error if target fret doesn't exist.
		For simplicity, use human index convention on array, don't use computer field convention. For example, if you want to mark inalys
		on fret 1, 3, 5, pass [1, 3, 5], don't try [0, 2, 4].
		@return {array} - returns elements which were being marked.
	*/
	markInlays(targetFrets){
		if(!(targetFrets instanceof Array)){
			throw new TypeError("parameter targetFrets should be type of array with number: " + targetFrets);
		}
		clearInlays.call(this);
		targetFrets = findUnique(targetFrets);
		let result = [];
		for(let i = 0; i < targetFrets.length; i++){
			let index = targetFrets[i] - 1;
			if(this._eleNotes[index]){
				this._eleNotes[index].markInlays();
				result.push(this._eleNotes[index]);
			}
			else{
				throw new Error("target fret doesn't exist. targetFrets: " + targetFrets + ", fret length: " + this._eleNotes.length + ", translated index: " + index);
			}
		}
		return result;

		function clearInlays(){
			for(let i = 0; i < this._eleNotes.length; i++){
				this._eleNotes[i].removeInlays();
			}
		}

		function findUnique(arr){
			return arr.reduce(function(a, r){
				if(a.indexOf(r) < 0){
					a.push(r);
				}
				return a;
			}, []);
		}
	}
}
