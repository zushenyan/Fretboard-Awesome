import {EleFretboard} from "./EleFretboard";
import {Config} from "./Config";

export class FretboardAwesome{
	constructor(){
		this._domId = "";
		this._uiTuningContainer = document.createElement("div");
		this._uiMainContainer = null;
		this._eleFretboard = null;
	}

	init(targeId, tuning, length, notation, includeStart, startGauge, orientation){
		initUI.call(this, targeId, tuning, length, notation, includeStart, startGauge, orientation);
		this._updateTuningUI();
		return this;

		function initUI(targetId, tuning, length, notation, includeStart, startGauge, orientation){
			this._uiMainContainer = document.getElementById(targetId);

			this._uiMainContainer.classList.add("fa-container");
			this._uiTuningContainer.classList.add("fa-tuning");
			this._eleFretboard = new EleFretboard().init(tuning, length, notation, includeStart, startGauge, orientation);

			this._uiMainContainer.appendChild(this._uiTuningContainer);
			this._uiMainContainer.appendChild(this._eleFretboard.getEle());

			this.setOrientation(orientation);
		}
	}

	/**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeStart - whether to include the start key.
	*/
	setTuning(tuning = MusicTheory.STANDARD_GUITAR_TUNING, length = 12, notation = "#", includeStart = false){
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
		this._eleFretboard.setTuning(tuning, length, notation, includeStart);
		this._updateTuningUI();
	}

	_updateTuningUI(){
		let tuning = this._eleFretboard.getTuning();
		this._uiTuningContainer.innerHTML = "";
		for(let i = 0; i < tuning.length; i++){
			let wrapperDiv = document.createElement("div");
			let textSpan = document.createElement("span");
			wrapperDiv.classList.add("fa-keytext-container");
			textSpan.classList.add("fa-keytext");
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

	getCurrentNotation(){
		return this._eleFretboard.getCurrentNotation();
	}

	markInlays(arr){
		return this._eleFretboard.markInlays(arr);
	}

	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either FretboardAwesome.ORI_VERTICAL or FretboardAwesome.ORI_HORIZONTAL: " + orientation);
		}
		this._uiMainContainer.classList.remove(Config.ORI_VERTICAL);
		this._uiMainContainer.classList.remove(Config.ORI_HORIZONTAL);
		let className = orientation === Config.ORI_VERTICAL ? Config.ORI_VERTICAL : Config.ORI_HORIZONTAL;
		this._uiMainContainer.classList.add(className);
		this._eleFretboard.setOrientation(orientation);
	}

	getOrientation(){
		let ori = this._uiMainContainer.classList.contains("vertical") ? Config.ORI_VERTICAL :
							this._uiMainContainer.classList.contains("horizontal") ? Config.ORI_HORIZONTAL :
							-1;
		return ori;
	}
}
