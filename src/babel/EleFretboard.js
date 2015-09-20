import {MusicTheory} from "./MusicTheory";
import {AbstractFretboard} from "./AbstractFretboard";
import {EleString} from "./EleString";
import {Config} from "./Config";

export class EleFretboard extends AbstractFretboard{
	constructor(){
		super();
		this._uiFretboard = document.createElement("div");
		this._eleStrings = []; // array of eleString
		this._lastLength = -1;
		this._currentNotation = "";
		this._orientation = Config.ORI_VERTICAL;
		this._startGauge = 6;
	}

	init(tuning, length, notation = "#", includeOpenFret = false, startGauge = 12, orientation = Config.ORI_VERTICAL){
		initUI.call(this);
		this.setTuning(tuning, length, notation, includeOpenFret);
		this.setOrientation(orientation);
		this.setStringGauge(startGauge);
		return this;

		function initUI(){
			this._uiFretboard.classList.add("fa-fretboard");
		}
	}

	/**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the start key.
	*/
	setTuning(tuning, length, notation = "#", includeOpenFret = false){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
		}
		if(!(typeof length !== "number") && length < 1){
			throw new TypeError("parameter length should be a number which is greater than 0: " + length);
		}
		if(!(notation === "#" ||  notation === "b")){
			throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
		}
		if(typeof includeOpenFret !== "boolean"){
			throw new TypeError("parameter includeOpenFret should be type of boolean: " + includeOpenFret);
		}
		// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
		if((tuning.length === this._eleStrings.length) &&
				(this._lastLength === length)){
			for(let i = 0; i < tuning.length; i++){
				this._eleStrings[i].setTuning(tuning[i], length, notation);
			}
		}
		// if not then recreate everything.
		else{
			this._uiFretboard.innerHTML = "";
			this._eleStrings = [];
			for(let i = 0; i < tuning.length; i++){
				let result = new EleString().init(tuning[i], length, notation, includeOpenFret, this.getStartGauge() - i, this.getOrientation());
				this._eleStrings.push(result);
				this._uiFretboard.appendChild(result.getEle());
			}
		}
		this._lastLength = length;
		this._currentNotation = notation;
	}

	/**
		to make specified keys visible.
		@param {array} target - make target keys visible. format: [{key: "C#", color: "yellow"}, {key: "D#", color: "blue"}, ...]
		@return {array} - return what key was being marked.
	*/
	markKeys(target){
		let result = [];
		for(let i = 0 ; i < this._eleStrings.length; i++){
			let r = this._eleStrings[i].markKeys(target);
			result.push(r);
		}
		return result;
	}

	/**
		@param {number} startGauge - how thick is the leftest string. The following strings' thickness will be in descended order.
	*/
	setStringGauge(startGauge, orientation){
		if(typeof startGauge !== "number" || startGauge < 0){
			throw new TypeError("parameter startGauge should be greater than -1:" + startGauge);
		}
		for(let i = 0; i < this._eleStrings.length; i++){
			this._eleStrings[i].setStringGauge(startGauge - i);
		}
		this._startGauge = startGauge;
	}

	getStringGauge(){
		let result = [];
		for(let i = 0; i < this._eleStrings.length; i++){
			result.push(this._eleStrings[i].getStringGauge());
		}
		return result;
	}

	getStartGauge(){
		return this._startGauge;
	}

	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
		}
		for(let i = 0; i < this._eleStrings.length; i++){
			this._eleStrings[i].setOrientation(orientation);
		}
		this._orientation = orientation;
	}

	getOrientation(){
		return this._orientation;
	}

	getEle(){
		return this._uiFretboard;
	}

	getStrings(){
		return this._eleStrings;
	}

	getTuning(){
		let tuning = [];
		for(let i = 0; i < this._eleStrings.length; i++){
			tuning.push(this._eleStrings[i].getTuning());
		}
		return tuning;
	}

	getCurrentNotation(){
		return this._currentNotation;
	}

	markInlays(arr){
		let mid = this._eleStrings.length / 2 - 1;
		mid = mid < 0 ? 0 : mid;
		return this._eleStrings[mid].markInlays(arr);
	}
}
