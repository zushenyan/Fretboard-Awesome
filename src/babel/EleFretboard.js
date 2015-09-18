import {MusicTheory} from "./MusicTheory";
import {AbstractFretboard} from "./AbstractFretboard";
import {EleString} from "./EleString";

export class EleFretboard extends AbstractFretboard{
	constructor(){
		super();
		this._uiFretboard = document.createElement("div");
		this._eleStrings = []; // array of eleString
		this._lastLength = -1;
	}

	init(tuning, length, notation = "#", includeStart, startGauge = 12){
		initUI.call(this);
		this.setTuning(tuning, length, notation, includeStart, startGauge);
		return this;

		function initUI(){
			this._uiFretboard.classList.add("fa-fretboard");
		}
	}

	/**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeStart - whether to include the start key.
		@param {number} stringGauge - how thick the string will be displayed, unit in px.
	*/
	setTuning(tuning, length, notation = "#", includeStart = false, startGauge){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
		}
		if(!(typeof length !== "number") && length < 1){
			throw new TypeError("parameter length should be a number which is greater than 0: " + length);
		}
		if(!(notation === "#" ||  notation === "b")){
			throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
		}
		if(typeof includeStart !== "boolean"){
			throw new TypeError("parameter includeStart should be type of boolean: " + includeStart);
		}
		if(!(typeof stringGauge !== "number") && stringGauge < 0){
			throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
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
				let result = new EleString().init(tuning[i], length, notation, includeStart, startGauge - i);
				this._eleStrings.push(result);
				this._uiFretboard.appendChild(result.getEle());
			}
			this._lastLength = length;
		}
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
	setStringGauge(startGauge){
		for(let i = 0; i > this._eleStrings.length; i++){
			this._eleStrings[i].setStringGauge(startGauge - i);
		}
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
}
