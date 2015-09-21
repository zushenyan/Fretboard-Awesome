import {EleFretboard} from "./EleFretboard";
import {Config} from "./Config";
import {MusicTheory} from "./MusicTheory";

export class FretboardAwesome{
	constructor(){
		this._domId = "";
		this._uiTuningContainer = document.createElement("div");
		this._uiViewportContainer = document.createElement("div");
		this._uiMainContainer = null;
		this._eleFretboard = null;

		this._viewportSize = Config.VIEWPORT_SIZE_DEFAULT;
	}

	/**
		@param {string} targetId - the dom element which you want it to generate FretboardAwesome.
		@param {string} tuning - in what key we are tuning.
		@param {number} length - how long should the fretboard be.
		@param {string} notation - either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the first open fret.
		@param {number} startGauge - at what thickness will the string start decreasing.
		@param {string} orientation - either Config.ORI_VERTICAL or CONFIG_ORI_HORIZONTAL.
		@param {number} viewport - limit how long the fretboard user can view in pixel unit.
	*/
	init(targetId,
			tuning = MusicTheory.STANDARD_GUITAR_TUNING,
			length = 15,
			notation = "#",
			includeOpenFret = false,
			startGauge = 6,
			orientation = Config.ORI_VERTICAL,
			viewportSize = Config.VIEWPORT_SIZE_DEFAULT){
		initUI.call(this, targetId, tuning, length, notation, includeOpenFret, startGauge, orientation, viewportSize);
		this._updateTuningUI();
		this.setViewportSize(viewportSize);
		this.setOrientation(orientation);
		return this;

		function initUI(targetId, tuning, length, notation, includeOpenFret, startGauge, orientation, viewportSize){
			this._uiMainContainer = document.getElementById(targetId);

			this._uiMainContainer.classList.add("fa-container");
			this._uiTuningContainer.classList.add("fa-tuning");
			this._uiViewportContainer.classList.add("fa-viewport");
			this._eleFretboard = new EleFretboard().init(tuning, length, notation, includeOpenFret, startGauge, orientation);

			this._uiViewportContainer.appendChild(this._eleFretboard.getEle());
			addDragEvent(this._uiViewportContainer);

			this._uiMainContainer.appendChild(this._uiTuningContainer);
			this._uiMainContainer.appendChild(this._uiViewportContainer);

			function addDragEvent(ele){
				let isDragging = false;
				let previousX = 0;
				let previousY = 0;

				ele.addEventListener("mousedown", dragDown);
				ele.addEventListener("mousemove", dragMove);
				ele.addEventListener("mouseup", dragUp);
				window.addEventListener("mouseup", dragUp);

				ele.addEventListener("touchstart", dragDown);
				ele.addEventListener("touchmove", dragMove);
				ele.addEventListener("touchend", dragUp);

				function dragDown(e){
					e.preventDefault();
					isDragging = true;
					previousX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
					previousY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
				}

				function dragMove(e){
					e.preventDefault();
					if(isDragging){
						let newX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
						let newY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
						let offsetX = newX - previousX;
						let offsetY = newY - previousY;
						ele.scrollLeft -= offsetX;
						ele.scrollTop -= offsetY;
						previousX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
						previousY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
					}
				}

				function dragUp(e){
					e.preventDefault();
					isDragging = false;
				}
			}
		}
	}

	/**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the result be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the start key.
	*/
	setTuning(tuning = MusicTheory.STANDARD_GUITAR_TUNING, length = 12, notation = "#", includeOpenFret = false){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
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
		if(!(typeof stringGauge !== "number") && stringGauge < 0){
			throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
		}
		this._eleFretboard.setTuning(tuning, length, notation, includeOpenFret);
		this._updateTuningUI();
	}

	/**
		@private
	*/
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
		this.setViewportSize(this.getViewportSize());
	}

	getOrientation(){
		let ori = this._uiMainContainer.classList.contains("vertical") ? Config.ORI_VERTICAL :
							this._uiMainContainer.classList.contains("horizontal") ? Config.ORI_HORIZONTAL :
							-1;
		return ori;
	}

	setViewportSize(size){
		if(typeof size !== "number" || size < 0){
			throw new TypeError("parameter size should be typeof of number greater than 0: " + size);
		}
		let width = this._eleFretboard.getEle().scrollWidth;
		let height = this._eleFretboard.getEle().scrollHeight;
		if(this.getOrientation() === Config.ORI_VERTICAL){
			height = (height <= size) ? "auto" : (size.toString() + "px");
			width = "auto";
		}
		else if(this.getOrientation() === Config.ORI_HORIZONTAL){
			height = "auto";
			width = (width <= size) ? "auto" : (size.toString() + "px");
		}
		this._uiViewportContainer.style.width = width;
		this._uiViewportContainer.style.height = height;
		this._viewportSize = size;
		return {width: width, height: height};
	}

	getViewportSize(){
		return this._viewportSize;
	}
}
