import {EleFretboard} from "./EleFretboard";
import {Config} from "./Config";
import {MusicTheory} from "./MusicTheory";

export class FretboardAwesome extends EleFretboard{
	constructor(){
		super();
		this._domId = "";
		this._viewportSize = Config.VIEWPORT_SIZE_DEFAULT;

		this._isDragging = false;
		this._scrollPosition = {x: 0, y: 0};

		this._uiTuningContainer = document.createElement("div");
		this._uiViewportContainer = document.createElement("div");
		this._uiMainContainer = null;
	}

	/**
		@override
		@param {string} targetId - the dom element which you want it to generate FretboardAwesome.
		@param {string} tuning - in what key we are tuning.
		@param {string} notation - either "#" or "b".
		@param {number} fretboardLength - how long should the fretboard be.
		@param {number} stringStartGauge - at what thickness will the string start decreasing.
		@param {string} orientation - either Config.ORI_VERTICAL or CONFIG_ORI_HORIZONTAL.
		@param {number} viewport - limit how long the fretboard user can view in pixel unit.
	*/
	init(
		targetId,
		tuning = this.getTuning(),
		notation = this.getNotation(),
		fretboardLength = this.getFretboardLength(),
		stringStartGauge = this.getStringStartGauge(),
		orientation = this.getOrientation(),
		viewportSize = this.getViewportSize()){

		initUI.call(this, targetId);
		super.init(tuning, notation, fretboardLength, stringStartGauge, orientation);
		this._updateTuningUI();
		this.setViewportSize(viewportSize);
		this.setOrientation(orientation);
		return this;

		function initUI(targetId){
			this._uiMainContainer = document.getElementById(targetId);

			this._uiMainContainer.classList.add("fa-container");
			this._uiTuningContainer.classList.add("fa-tuning");
			this._uiViewportContainer.classList.add("fa-viewport");

			this._uiViewportContainer.appendChild(this.getEle());
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
					ele.scrollLeft;
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
		@override
	*/
	setTuning(tuning){
		super.setTuning(tuning);
		this._updateTuningUI();
	}

	/**
		@override
	*/
	setFretboardLength(length){
		super.setFretboardLength(length);
		this.setViewportSize(this.getViewportSize());
	}

	/**
		@private
	*/
	_updateTuningUI(){
		let tuning = this.getTuning();
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

	/**
		@override
	*/
	setOrientation(orientation){
		if(!(orientation === Config.ORI_VERTICAL || orientation === Config.ORI_HORIZONTAL)){
			throw new TypeError("parameter orientation should be either FretboardAwesome.ORI_VERTICAL or FretboardAwesome.ORI_HORIZONTAL: " + orientation);
		}
		let className = (orientation === Config.ORI_VERTICAL ? Config.ORI_VERTICAL : Config.ORI_HORIZONTAL);
		this._uiMainContainer.classList.remove(Config.ORI_VERTICAL);
		this._uiMainContainer.classList.remove(Config.ORI_HORIZONTAL);
		this._uiMainContainer.classList.add(className);
		super.setOrientation(orientation);
		this.setViewportSize(this.getViewportSize());
	}

	setViewportSize(size){
		if(typeof size !== "number" || size < 0){
			throw new TypeError("parameter size should be typeof of number greater than 0: " + size);
		}
		let width = this.getEle().scrollWidth;
		let height = this.getEle().scrollHeight;
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

	getViewportSize(){ return this._viewportSize; }
}
