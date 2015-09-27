import {MusicTheory} from "./MusicTheory";
import {AbstractFretboard} from "./AbstractFretboard";
import {EleString} from "./EleString";
import {Config} from "./Config";

export class EleFretboard extends AbstractFretboard{
	constructor(){
		super();
		this._tuning = MusicTheory.STANDARD_GUITAR_TUNING;
		this._notation = "#";
		this._fretboardLength = 12;
		this._stringStartGauge = 6;
		this._orientation = Config.ORI_VERTICAL;
		this._markKeys = [];
		this._markInlays = [];

		this._eleStrings = []; // array of eleString
		this._uiFretboard = document.createElement("div");
		this._uiFretboard.classList.add("fa-fretboard");
	}

	/**
		@param {string} tune - format "d#", "E", "G#".
		@param {string} notation - either be "#" or "b".
		@param {number} fretboardLength - how long should the fretboard be.
		@param {number} gauge - how thick the string will be displayed, unit in px.
		@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
	*/
	init(
		tuning = this.getTuning(),
		notation = this.getNotation(),
		fretboardLength = this.getFretboardLength(),
		stringStartGauge = this.getStringStartGauge(),
		orientation = this.getOrientation()){

		this.setTuning(tuning);
		this.setNotation(notation);
		this.setFretboardLength(fretboardLength);
		this.setStringStartGauge(stringStartGauge);
		this.setOrientation(orientation);
		return this;
	}

	_recreateStrings(){
		this._uiFretboard.innerHTML = "";
		this._eleStrings = [];
		for(let i = 0; i < this.getTuning().length; i++){
			let result = new EleString().init(this.getTuning()[i], this.getNotation(), this.getFretboardLength(), this.getStringStartGauge() - i, this.getOrientation());
			this._eleStrings.push(result);
			this._uiFretboard.appendChild(result.getEle());
		}
		this.markKeys(this.getMarkKeys());
		this.markInlays(this.getMarkInlays());
	}

	/**
		@param {string} tuning - in what key we are tuning.
	*/
	setTuning(tuning){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
		}
		this._tuning = MusicTheory.convertAccidental(tuning, this.getNotation());
		this._recreateStrings();
	}

	getTuning(){ return this._tuning; };

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
		this.setTuning(this.getTuning());
	}

	getNotation(){ return this._notation; }

	/**
		@param {number} length - how long should the fretboard be.
	*/
	setFretboardLength(length){
		if(typeof length !== "number" || length < 0){
			throw new TypeError("parameter length should be greater than 0:" + length);
		}
		this._fretboardLength = length;
		this._recreateStrings();
	}

	getFretboardLength(){ return this._fretboardLength; };

	/**
		@param {number} startGauge - how thick is the leftest string. The following strings' thickness will be in descended order.
	*/
	setStringStartGauge(startGauge){
		if(typeof startGauge !== "number" || startGauge < 0){
			throw new TypeError("parameter startGauge should be greater than -1:" + startGauge);
		}
		// for(let i = 0; i < this._eleStrings.length; i++){
		// 	this._eleStrings[i].setStringStartGauge(startGauge - i);
		// }
		this._stringStartGauge = startGauge;
		this._recreateStrings();
	}

	getStringStartGauge(){ return this._stringStartGauge; }

	/**
		@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
	*/
	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
		}
		// for(let i = 0; i < this._eleStrings.length; i++){
		// 	this._eleStrings[i].setOrientation(orientation);
		// }
		this._orientation = orientation;
		this._recreateStrings();
	}

	getOrientation(){ return this._orientation; }

	getEle(){ return this._uiFretboard; }
	getStrings(){ return this._eleStrings; }
	getStringGauges(){
		let result = [];
		for(let i = 0; i < this._eleStrings.length; i++){
			result.push(this._eleStrings[i].getStringGauge());
		}
		return result;
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
		let result = [];
		for(let i = 0 ; i < this._eleStrings.length; i++){
			let r = this._eleStrings[i].markKeys(target);
			result.push(r);
		}
		this._markKeys = target;
		return result;
	}

	getMarkKeys(){ return this._markKeys; }

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
		let length = this._eleStrings.length;
		let mid = Math.round(length / 2 - 1);
		mid = mid < 0 ? 0 :
					mid > length ? length : mid;
		this._markInlays = targetFrets;
		if(this._eleStrings[mid]){
			return this._eleStrings[mid].markInlays(targetFrets);
		}
		else{
			return null;
		}
	}

	getMarkInlays(){ return this._markInlays; };
}
