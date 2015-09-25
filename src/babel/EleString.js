import {MusicTheory} from "./MusicTheory";
import {EleNote} from "./EleNote";
import {Config} from "./Config";

export class EleString{
	constructor(){
		this._tune = "A";
		this._notation = "#";
		this._stringLength = 12;
		this._stringGauge = 6;
		this._orientation = Config.ORI_VERTICAL;
		this._markKeys = [];
		this._markInlays = [];

		this._eleNotes = []; // array of EleNote
		this._uiString = document.createElement("div");
		this._uiString.classList.add("fa-string");
	}

	/**
		@param {string} tune - format "d#", "E", "G#".
		@param {string} notation - either be "#" or "b".
		@param {number} stringLength - how long should the fretboard be.
		@param {number} gauge - how thick the string will be displayed, unit in px.
		@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
	*/
	init(
		tune = this.getTune(),
		notation = this.getNotation(),
		stringLength = this.getStringLength(),
		stringGauge = this.getStringGauge(),
		orientation = this.getOrientation()){

		this.setTune(tune);
		this.setNotation(notation);
		this.setStringLength(stringLength);
		this.setStringGauge(stringGauge);
		this.setOrientation(orientation);
		return this;
	}

	_recreateNotes(){
		let notes = MusicTheory.tuning(this.getTune(), this.getStringLength() + 1, this.getNotation(), false);
		this._uiString.innerHTML = "";
		this._eleNotes = [];
		for(let i = 0; i < notes.length; i++){
			let result = new EleNote().init(notes[i], this.getNotation(), "white", this.getStringGauge(), this.getOrientation());
			this._eleNotes.push(result);
			this._uiString.appendChild(result.getEle());
		}
		this.markKeys(this.getMarkKeys());
		this.markInlays(this.getMarkInlays());
	}

	/**
		@param {string} tune - in what key we are tuning.
	*/
	setTune(tune){
		if(!(typeof tune === "string" || tune instanceof String)){
			throw new TypeError("parameter tune should be string: " + tune);
		}
		this._tune = MusicTheory.convertAccidental(tune, this.getNotation());
		this._recreateNotes();
	}

	getTune(){ return this._tune; }

	/**
		@param {string} notation - in either "#" or "b".
	*/
	setNotation(notation){
		if(!(typeof notation === "string" || notation instanceof String)){
			throw new TypeError("parameter notation should be typef of string: " + notation);
		}
		if(!(notation === "#" || notation === "b")){
			throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
		}
		this._notation = notation;
		this.setTune(this.getTune());
	}

	getNotation(){ return this._notation; }

	/**
		@param {number} length - how long should the fretboard be.
	*/
	setStringLength(length){
		if(typeof length !== "number" || length < 0){
			throw new TypeError("parameter length should be greater than 0:" + length);
		}
		this._stringLength = length;
		this._recreateNotes();
	}

	getStringLength(){ return this._stringLength; };

	/**
		@param {number} gauge - how thick the string will be displayed, unit in px.
	*/
	setStringGauge(gauge){
		if(typeof gauge !== "number" || gauge < 0){
			throw new TypeError("parameter gauge should be greater than 0:" + gauge);
		}
		for(let i = 0; i < this._eleNotes.length; i++){
			this._eleNotes[i].setStringGauge(gauge);
		}
		this._stringGauge = gauge;
		this._recreateNotes();
	}

	getStringGauge(){ return this._stringGauge; }

	/**
		@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
	*/
	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
		}
		for(let i = 0; i < this._eleNotes.length; i++){
			this._eleNotes[i].setOrientation(orientation);
		}
		this._orientation = orientation;
		this._recreateNotes();
	}

	getOrientation(){ return this._orientation; }

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
		this._markKeys = target;
		return result;

		function resetDisplay(){
			for(let i = 0; i < this._eleNotes.length; i++){
				this._eleNotes[i].hide();
				this._eleNotes[i].setBgColor("white");
			}
		}
	}

	getMarkKeys(){ return this._markKeys; }

	getEle(){ return this._uiString; }
	getEleNotes(){ return this._eleNotes; }

	/**
		@param {array} targetFrets - indicates which frets you want to mark inlays. Will ignore if target fret doesn't exist.
		For simplicity, use human index convention on array, don't use computer field convention. For example, if you want to mark inalys
		on fret 1, 3, 5, pass [1, 3, 5], don't try [0, 2, 4].
		@return {array} - returns elements which were being marked.
	*/
	markInlays(targetFrets){
		if(!(targetFrets instanceof Array)){
			throw new TypeError("parameter targetFrets should be type of array with number: " + targetFrets);
		}
		clearInlays.call(this);
		targetFrets = trimArray(targetFrets, this.getStringLength());
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
		this._markInlays = targetFrets;
		return result;

		function clearInlays(){
			for(let i = 0; i < this._eleNotes.length; i++){
				this._eleNotes[i].removeInlays();
			}
		}

		function trimArray(arr, number){
			arr = findUnique(arr.sort(function(a, b){
				return a - b;
			}));
			arr = arr.filter((value) => {
				return value <= number;
			});
			return arr;

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

	getMarkInlays(){ return this._markInlays; };
}
