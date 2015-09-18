import {EleFretboard} from "./EleFretboard";

export class FretboardAwesome{
	constructor(){
		this._domId = "";
		this._uiTuningContainer = document.createElement("div");
		this._uiMainContainer = null;
		this._eleFretboard = null;
	}

	init(targeId, tuning, length, notation, includeStart, startGauge){
		initUI.call(this, targeId, tuning, length, notation, includeStart, startGauge);
		this._updateTuningUI();
		return this;

		function initUI(targetId, tuning, length, notation, includeStart, startGauge){
			this._uiMainContainer = document.getElementById(targetId);

			this._uiMainContainer.classList.add("fa-container");
			this._uiTuningContainer.classList.add("fa-tuning");
			this._eleFretboard = new EleFretboard().init(tuning, length, notation, includeStart, startGauge);

			this._uiMainContainer.appendChild(this._uiTuningContainer);
			this._uiMainContainer.appendChild(this._eleFretboard.getEle());
		}
	}

	/**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeStart - whether to include the start key.
		@param {number} stringGauge - how thick the string will be displayed, unit in px.
	*/
	setTuning(tuning = MusicTheory.STANDARD_GUITAR_TUNING, length = 12, notation = "#", includeStart = false, startGauge = 12){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
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
		this._eleFretboard.setTuning(tuning, length, notation, includeStart, startGauge);
		this._updateTuningUI();
	}

	_updateTuningUI(){
		let tuning = this._eleFretboard.getTuning();
		this._uiTuningContainer.innerHTML = "";
		for(let i = 0; i < tuning.length; i++){
			let wrapperDiv = document.createElement("div");
			let textSpan = document.createElement("span");
			textSpan.appendChild(document.createTextNode(tuning[i]));
			wrapperDiv.appendChild(textSpan);
			this._uiTuningContainer.appendChild(wrapperDiv);
		}
	}

	markKeys(target){
		return this._eleFretboard.markKeys(target);
	}

	setStringGauge(gauge){
		this._eleFretboard.setStringGauge(gauge);
	}
}
