(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
	@abstract
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractFretboard = (function () {
	function AbstractFretboard() {
		_classCallCheck(this, AbstractFretboard);

		if (this.constructor === AbstractFretboard) {
			throw new Error("It's an abstract class should' be instantiated");
		}
		this._tuning = [];
		this._strings = [];
	}

	_createClass(AbstractFretboard, [{
		key: "init",
		value: function init() {
			throw new Error("overwritten init or GTFO");
		}

		/**
  	@param {string} tuning - array of string. Each element should present in format like this "E#", "c", "db"...
  	@param {number} length - how long the array should function return.
  	@param {string} notation - should be either "#" or "b".
  	@param {boolean} includeStart - whether to include the start key.
  */
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var noteType = arguments.length <= 4 || arguments[4] === undefined ? Note : arguments[4];

			throw new Error("overwritten setTuning or GTFO");
		}
	}, {
		key: "getTuning",
		value: function getTuning() {
			return this._tuning;
		}
	}, {
		key: "getStrings",
		value: function getStrings() {
			return this._strings;
		}
	}]);

	return AbstractFretboard;
})();

exports.AbstractFretboard = AbstractFretboard;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MusicTheory = require("./MusicTheory");

var _AbstractFretboard2 = require("./AbstractFretboard");

var _EleString = require("./EleString");

var EleFretboard = (function (_AbstractFretboard) {
	_inherits(EleFretboard, _AbstractFretboard);

	function EleFretboard() {
		_classCallCheck(this, EleFretboard);

		_get(Object.getPrototypeOf(EleFretboard.prototype), "constructor", this).call(this);
		this._uiFretboard = document.createElement("div");
		this._eleStrings = []; // array of eleString
		this._lastLength = -1;
	}

	_createClass(EleFretboard, [{
		key: "init",
		value: function init(tuning, length, notation, includeStart) {
			if (notation === undefined) notation = "#";
			var startGauge = arguments.length <= 4 || arguments[4] === undefined ? 12 : arguments[4];

			initUI.call(this);
			this.setTuning(tuning, length, notation, includeStart, startGauge);
			return this;

			function initUI() {
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
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length, notation, includeStart, startGauge) {
			if (notation === undefined) notation = "#";
			if (includeStart === undefined) includeStart = false;

			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter length should be a number which is greater than 0: " + length);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
			}
			if (typeof includeStart !== "boolean") {
				throw new TypeError("parameter includeStart should be type of boolean: " + includeStart);
			}
			if (!(typeof stringGauge !== "number") && stringGauge < 0) {
				throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
			}
			// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
			if (tuning.length === this._eleStrings.length && this._lastLength === length) {
				for (var i = 0; i < tuning.length; i++) {
					this._eleStrings[i].setTuning(tuning[i], length, notation);
				}
			}
			// if not then recreate everything.
			else {
					this._uiFretboard.innerHTML = "";
					this._eleStrings = [];
					for (var i = 0; i < tuning.length; i++) {
						var result = new _EleString.EleString().init(tuning[i], length, notation, includeStart, startGauge - i);
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
	}, {
		key: "markKeys",
		value: function markKeys(target) {
			var result = [];
			for (var i = 0; i < this._eleStrings.length; i++) {
				var r = this._eleStrings[i].markKeys(target);
				result.push(r);
			}
			return result;
		}

		/**
  	@param {number} startGauge - how thick is the leftest string. The following strings' thickness will be in descended order.
  */
	}, {
		key: "setStringGauge",
		value: function setStringGauge(startGauge) {
			for (var i = 0; i > this._eleStrings.length; i++) {
				this._eleStrings[i].setStringGauge(startGauge - i);
			}
		}
	}, {
		key: "getEle",
		value: function getEle() {
			return this._uiFretboard;
		}
	}, {
		key: "getStrings",
		value: function getStrings() {
			return this._eleStrings;
		}
	}, {
		key: "getTuning",
		value: function getTuning() {
			var tuning = [];
			for (var i = 0; i < this._eleStrings.length; i++) {
				tuning.push(this._eleStrings[i].getTuning());
			}
			return tuning;
		}
	}]);

	return EleFretboard;
})(_AbstractFretboard2.AbstractFretboard);

exports.EleFretboard = EleFretboard;

},{"./AbstractFretboard":1,"./EleString":4,"./MusicTheory":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Note2 = require("./Note");

var EleNote = (function (_Note) {
	_inherits(EleNote, _Note);

	function EleNote() {
		_classCallCheck(this, EleNote);

		_get(Object.getPrototypeOf(EleNote.prototype), "constructor", this).call(this);

		this._uiNote = document.createElement("li");
		this._uiString = document.createElement("div");
		this._uiNoteTextContainer = document.createElement("div");
		this._uiNoteText = document.createElement("span");

		this._uiNoteTextContainer.classList.add("fa-note");
		this._uiNoteTextContainer.appendChild(this._uiNoteText);
		this._uiString.appendChild(this._uiNoteTextContainer);
		this._uiNote.appendChild(this._uiString);
	}

	/**
 	@param {string} note - format "d#", "E", "G#".
 	@param {string} notation - either be "#" or "b".
 	@param {string} bgColor - color format in string.
 	@param {number} stringGauge - how thick the string will be displayed, unit in px.
 */

	_createClass(EleNote, [{
		key: "init",
		value: function init(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];
			var bgColor = arguments.length <= 2 || arguments[2] === undefined ? "white" : arguments[2];
			var stringGauge = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];

			_get(Object.getPrototypeOf(EleNote.prototype), "init", this).call(this, note, notation);
			this.setNoteName(note, notation);
			this.setBgColor(bgColor);
			this.setStringGauge(stringGauge);
			this.hide();
			return this;
		}
	}, {
		key: "getEle",
		value: function getEle() {
			return this._uiNote;
		}
	}, {
		key: "setNoteName",
		value: function setNoteName(noteName, notation) {
			if (typeof noteName === "string" || noteName instanceof String || notation === "#" || notation == "b") {
				_get(Object.getPrototypeOf(EleNote.prototype), "setNoteName", this).call(this, noteName, notation);
				this._uiNoteText.innerHTML = "";
				this._uiNoteText.appendChild(document.createTextNode(this.getNoteName()));
			} else {
				throw new TypeError("parameter noteName should be type of string: " + noteName);
			}
		}
	}, {
		key: "setBgColor",
		value: function setBgColor(bgColor) {
			if (typeof bgColor === "string" || bgColor instanceof String) {
				this._uiNoteTextContainer.style.backgroundColor = bgColor;
			} else {
				throw new TypeError("parameter bgColor should be type of string: " + bgColor);
			}
		}
	}, {
		key: "getBgColor",
		value: function getBgColor() {
			return this._uiNoteTextContainer.style.backgroundColor;
		}
	}, {
		key: "setStringGauge",
		value: function setStringGauge(gauge) {
			if (typeof gauge !== "number" && gauge > -1) {
				throw new TypeError("parameter gauge should be greater than -1:" + gauge);
			}
			this._uiString.style.width = gauge + "px";
		}
	}, {
		key: "getStringGauge",
		value: function getStringGauge() {
			return this._uiString.style.width;
		}
	}, {
		key: "show",
		value: function show() {
			this._uiNoteTextContainer.classList.remove("hide");
		}
	}, {
		key: "hide",
		value: function hide() {
			this._uiNoteTextContainer.classList.add("hide");
		}
	}, {
		key: "isVisible",
		value: function isVisible() {
			return !this._uiNoteTextContainer.classList.contains("hide");
		}

		/*
  	the "dot" on 3,5,7,9,12... guitar frets
  */
	}, {
		key: "markInlays",
		value: function markInlays() {
			this._uiNote.classList.add("inlays");
		}
	}, {
		key: "removeInlays",
		value: function removeInlays() {
			this._uiNote.classList.remove("inlays");
		}
	}, {
		key: "hasInlays",
		value: function hasInlays() {
			return this._uiNote.classList.contains("inlays");
		}
	}]);

	return EleNote;
})(_Note2.Note);

exports.EleNote = EleNote;

},{"./Note":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _MusicTheory = require("./MusicTheory");

var _EleNote = require("./EleNote");

var EleString = (function () {
	function EleString() {
		_classCallCheck(this, EleString);

		this._uiString = document.createElement("ul");
		this._eleNotes = []; // array of EleNote
		this._tuning = "";
	}

	_createClass(EleString, [{
		key: "init",
		value: function init(tuning, length, notation, includeStart, stringGauge) {
			initUI.call(this);
			this.setTuning(tuning, length, notation, includeStart, stringGauge);
			return this;

			function initUI() {
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
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var stringGauge = arguments.length <= 4 || arguments[4] === undefined ? 12 : arguments[4];

			if (!(typeof tuning === "string" || tuning instanceof String)) {
				throw new TypeError("parameter tuning should be string: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter length should be a number which is greater than 0: " + length);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			if (typeof includeStart !== "boolean") {
				throw new TypeError("parameter includeStart should be type of boolean: " + includeStart);
			}
			if (!(typeof stringGauge !== "number") && stringGauge < 0) {
				throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
			}
			// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
			var notes = _MusicTheory.MusicTheory.tuning(tuning, length, notation, includeStart);
			if (this._eleNotes.length === notes.length) {
				for (var i = 0; i < notes.length; i++) {
					this._eleNotes[i].setNoteName(notes[i], notation);
				}
			}
			// if not then recreate everything.
			else {
					this._uiString.innerHTML = "";
					this._eleNotes = [];
					for (var i = 0; i < notes.length; i++) {
						var result = new _EleNote.EleNote().init(notes[i], notation, "white", stringGauge);
						this._eleNotes.push(result);
						this._uiString.appendChild(result.getEle());
					}
					this._tuning = _MusicTheory.MusicTheory.convertAccidental(tuning, notation);
				}
		}
	}, {
		key: "getTuning",
		value: function getTuning() {
			return this._tuning;
		}

		/**
  	to make specified keys visible.
  	@param {array} target - make target keys visible. format: [{key: "C#", color: "yellow"}, {key: "D#", color: "blue"}, ...]
  	@return {array} - return what key was being marked.
  */
	}, {
		key: "markKeys",
		value: function markKeys(target) {
			if (!(target instanceof Array)) {
				throw new TypeError("parameter target should be type of array: " + target);
			}
			resetDisplay.call(this);
			var result = [];
			for (var i = 0; i < target.length; i++) {
				for (var j = 0; j < this._eleNotes.length; j++) {
					var key1 = _MusicTheory.MusicTheory.convertAccidental(target[i].key);
					var key2 = _MusicTheory.MusicTheory.convertAccidental(this._eleNotes[j].getNoteName());
					if (key1 === key2) {
						this._eleNotes[j].show();
						this._eleNotes[j].setBgColor(target[i].color);
						result.push(this._eleNotes[j]);
					}
				}
			}
			return result;

			function resetDisplay() {
				for (var i = 0; i < this._eleNotes.length; i++) {
					this._eleNotes[i].hide();
					this._eleNotes[i].setBgColor("white");
				}
			}
		}
	}, {
		key: "getEle",
		value: function getEle() {
			return this._uiString;
		}
	}, {
		key: "getEleNotes",
		value: function getEleNotes() {
			return this._eleNotes;
		}
	}]);

	return EleString;
})();

exports.EleString = EleString;

},{"./EleNote":3,"./MusicTheory":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _EleFretboard = require("./EleFretboard");

var FretboardAwesome = (function () {
	function FretboardAwesome() {
		_classCallCheck(this, FretboardAwesome);

		this._domId = "";
		this._uiTuningContainer = document.createElement("div");
		this._uiMainContainer = null;
		this._eleFretboard = null;
	}

	_createClass(FretboardAwesome, [{
		key: "init",
		value: function init(targeId, tuning, length, notation, includeStart, startGauge) {
			initUI.call(this, targeId, tuning, length, notation, includeStart, startGauge);
			this._updateTuningUI();
			return this;

			function initUI(targetId, tuning, length, notation, includeStart, startGauge) {
				this._uiMainContainer = document.getElementById(targetId);

				this._uiMainContainer.classList.add("fa-container");
				this._uiTuningContainer.classList.add("fa-tuning");
				this._eleFretboard = new _EleFretboard.EleFretboard().init(tuning, length, notation, includeStart, startGauge);

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
	}, {
		key: "setTuning",
		value: function setTuning() {
			var tuning = arguments.length <= 0 || arguments[0] === undefined ? MusicTheory.STANDARD_GUITAR_TUNING : arguments[0];
			var length = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var startGauge = arguments.length <= 4 || arguments[4] === undefined ? 12 : arguments[4];

			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter length should be a number which is greater than 0: " + length);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			if (typeof includeStart !== "boolean") {
				throw new TypeError("parameter includeStart should be type of boolean: " + includeStart);
			}
			if (!(typeof stringGauge !== "number") && stringGauge < 0) {
				throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
			}
			this._eleFretboard.setTuning(tuning, length, notation, includeStart, startGauge);
			this._updateTuningUI();
		}
	}, {
		key: "_updateTuningUI",
		value: function _updateTuningUI() {
			var tuning = this._eleFretboard.getTuning();
			this._uiTuningContainer.innerHTML = "";
			for (var i = 0; i < tuning.length; i++) {
				var wrapperDiv = document.createElement("div");
				var textSpan = document.createElement("span");
				textSpan.appendChild(document.createTextNode(tuning[i]));
				wrapperDiv.appendChild(textSpan);
				this._uiTuningContainer.appendChild(wrapperDiv);
			}
		}
	}, {
		key: "markKeys",
		value: function markKeys(target) {
			return this._eleFretboard.markKeys(target);
		}
	}, {
		key: "setStringGauge",
		value: function setStringGauge(gauge) {
			this._eleFretboard.setStringGauge(gauge);
		}
	}]);

	return FretboardAwesome;
})();

exports.FretboardAwesome = FretboardAwesome;

},{"./EleFretboard":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MusicTheory = (function () {
	function MusicTheory() {
		_classCallCheck(this, MusicTheory);
	}

	_createClass(MusicTheory, null, [{
		key: "convertAccidental",

		/**
  	@param {string} note - accept a string in specified notation, see normalize() for more info.
  	@param {string} convertTo - should either be "#" or "b" in string type.
  	@return {string} - will return the query result.
  */
		value: function convertAccidental(note) {
			var convertTo = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];

			if (convertTo !== "#" && convertTo !== "b") {
				throw new TypeError("convertTo should either be '#' or 'b' in string type: " + convertTo);
			}
			if (note instanceof Array) {
				return convertArray(note, convertTo);
			} else {
				return convertSingle(note, convertTo);
			}

			function convertArray(notes, convertTo) {
				try {
					var result = [];
					for (var i = 0; i < notes.length; i++) {
						result.push(convertSingle(notes[i], convertTo));
					}
					return result;
				} catch (e) {
					throw new Error(e + " [" + notes + "]");
				}
			}

			function convertSingle(note, convertTo) {
				var result = MusicTheory.normalize(note);
				var sameNotation = result[1] === convertTo;
				if (result.length === 1 || sameNotation) {
					return result;
				} else if (convertTo === "#") {
					for (var i = 0; i < MusicTheory.KEYS_ACCIDENTALS_FLAT.length; i++) {
						if (MusicTheory.KEYS_ACCIDENTALS_FLAT[i] === result) {
							return MusicTheory.KEYS_ACCIDENTALS_SHARP[i];
						}
					}
				} else if (convertTo === "b") {
					for (var i = 0; i < MusicTheory.KEYS_ACCIDENTALS_SHARP.length; i++) {
						if (MusicTheory.KEYS_ACCIDENTALS_SHARP[i] === result) {
							return MusicTheory.KEYS_ACCIDENTALS_FLAT[i];
						}
					}
				} else {
					throw new Error("not found: " + result + " " + convertTo);
				}
				throw new Error("what's the sorcery? " + result + " " + convertTo);
			}
		}

		/**
  	@param {string, array} note - accepts string of array of strings. string should be within 2 characters long and written in fashion like "Cb", "D", "D#",
  									 if you input "Cbbbbb", the function will still do the parse and return "Cb" as the result.
  	@return {null, string} - will return null if no pattern is found, or return a string with capitalized first letter within 2 length.
  */
	}, {
		key: "normalize",
		value: function normalize(note) {
			if (typeof note === "string" || note instanceof String) {
				return normalizeSingle(note);
			} else if (note instanceof Array) {
				return normalizeArray(note);
			} else {
				throw new TypeError("argument note shuold be either string or array of strings: " + note);
			}

			function normalizeArray(notes) {
				try {
					var result = [];
					for (var i = 0; i < notes.length; i++) {
						result.push(normalizeSingle(notes[i]));
					}
					return result;
				} catch (e) {
					throw new Error(e + " [" + notes + "]");
				}
			}

			function normalizeSingle(note) {
				var sharpResult = MusicTheory.NOTATION_SHARP.exec(note);
				var flatResult = MusicTheory.NOTATION_FLAT.exec(note);
				sharpResult = sharpResult ? sharpResult[0] : null;
				flatResult = flatResult ? flatResult[0] : null;
				if (sharpResult || flatResult) {
					var result = sharpResult.length > flatResult.length ? sharpResult : flatResult;
					result = result[0].toUpperCase() + result.slice(1);
					result = result === "Cb" ? "B" : result === "B#" ? "C" : result === "Fb" ? "E" : result === "E#" ? "F" : result;
					return result;
				} else {
					throw new Error("note: " + note + " is not an acceptable pattern.");
				}
			}
		}

		/**
  	@param {string} startKey - the key you want to start with. Format should be "C#", "d", "eb"...
  	@param {number} length - how long the array should function return.
  	@param {string} noration - either "#" or "b".
  	@param {boolean} includeStart - whether to include the start key.
  	@return {array} - an array with string contains the sequence of keys.
  */
	}, {
		key: "tuning",
		value: function tuning() {
			var startKey = arguments.length <= 0 || arguments[0] === undefined ? "C" : arguments[0];
			var length = arguments.length <= 1 || arguments[1] === undefined ? 7 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

			if ((typeof startKey === "string" || startKey instanceof String) && (notation === "#" || notation === "b") && (typeof length === "number" && length > 0) && typeof includeStart === "boolean") {
				startKey = MusicTheory.convertAccidental(startKey, notation);
				var startIndex = 0;
				var result = [];
				if (notation === "#") {
					startIndex = MusicTheory.KEYS_ACCIDENTALS_SHARP.indexOf(startKey);
					for (var i = startIndex, counter = 0; counter < length; i++, counter++) {
						result.push(infiniteIndexing(MusicTheory.KEYS_ACCIDENTALS_SHARP, i));
					}
				} else if (notation === "b") {
					startIndex = MusicTheory.KEYS_ACCIDENTALS_FLAT.indexOf(startKey);
					for (var i = startIndex, counter = 0; counter < length; i++, counter++) {
						result.push(infiniteIndexing(MusicTheory.KEYS_ACCIDENTALS_FLAT, i));
					}
				}
				return includeStart ? result : result.slice(1);
			} else {
				throw new TypeError("one of the following parameter is not valid: " + "\n" + startKey + "\n" + length + "\n" + notation + "\n" + includeStart);
			}
			throw new Error("what's the sorcery? " + startKey + " " + length + " " + notation + " " + includeStart);

			function infiniteIndexing(array, index) {
				index = index % array.length;
				return array[index];
			}
		}
	}, {
		key: "NOTATION_SHARP",
		get: function get() {
			return (/^[a-g|A-G]#?/
			);
		}
	}, {
		key: "NOTATION_FLAT",
		get: function get() {
			return (/^[a-g|A-G]b?/
			);
		}
	}, {
		key: "KEYS_ACCIDENTALS_SHARP",
		get: function get() {
			return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
		}
	}, {
		key: "KEYS_ACCIDENTALS_FLAT",
		get: function get() {
			return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
		}
	}, {
		key: "STANDARD_GUITAR_STRINGS",
		get: function get() {
			return 6;
		}
	}, {
		key: "STANDARD_GUITAR_TUNING",
		get: function get() {
			return ["E", "A", "D", "G", "B", "E"];
		}
	}]);

	return MusicTheory;
})();

exports.MusicTheory = MusicTheory;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _MusicTheory = require("./MusicTheory");

var Note = (function () {
	function Note() {
		_classCallCheck(this, Note);

		this._noteName = "";
	}

	_createClass(Note, [{
		key: "init",
		value: function init(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];

			this.setNoteName(note, notation);
			return this;
		}

		/**
  	@param {string} note - only takes string. The format should be "d#", "E", "cb"...
  	@param {string} notation - only takes string. The format should either be "#" or "b".
  */
	}, {
		key: "setNoteName",
		value: function setNoteName(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];

			if (typeof note === "string" || note instanceof String) {
				this._noteName = _MusicTheory.MusicTheory.convertAccidental(note, notation);
			} else {
				throw new TypeError("parameter note should be type of string: " + note);
			}
		}
	}, {
		key: "getNoteName",
		value: function getNoteName() {
			return this._noteName;
		}
	}]);

	return Note;
})();

exports.Note = Note;

},{"./MusicTheory":6}],8:[function(require,module,exports){
"use strict";

var _MusicTheory = require("./MusicTheory");

var _Note = require("./Note");

var _AbstractFretboard = require("./AbstractFretboard");

var _EleNote = require("./EleNote");

var _EleString = require("./EleString");

var _EleFretboard = require("./EleFretboard");

var _FretboardAwesome = require("./FretboardAwesome");

(function (win) {
	"use strict";

	var fa = {
		MusicTheory: _MusicTheory.MusicTheory,
		Note: _Note.Note,
		EleNote: _EleNote.EleNote,
		AbstractFretboard: _AbstractFretboard.AbstractFretboard,
		EleFretboard: _EleFretboard.EleFretboard,
		EleString: _EleString.EleString,
		FretboardAwesome: _FretboardAwesome.FretboardAwesome
	};

	win.fa = fa;
})(window);

},{"./AbstractFretboard":1,"./EleFretboard":2,"./EleNote":3,"./EleString":4,"./FretboardAwesome":5,"./MusicTheory":6,"./Note":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0Fic3RyYWN0RnJldGJvYXJkLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9FbGVGcmV0Ym9hcmQuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZU5vdGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZVN0cmluZy5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRnJldGJvYXJkQXdlc29tZS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvTXVzaWNUaGVvcnkuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL05vdGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL2ZyZXRib2FyZC1hd2Vzb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0dhLGlCQUFpQjtBQUNsQixVQURDLGlCQUFpQixHQUNoQjt3QkFERCxpQkFBaUI7O0FBRTVCLE1BQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsRUFBQztBQUN6QyxTQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENB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QyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0QsTUFDSTtBQUNKLFVBQU0sSUFBSSxTQUFTLENBQUMsMkNBQTJDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEU7R0FDRDs7O1NBRVUsdUJBQUU7QUFBRSxVQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7R0FBRTs7O1FBdkIzQixJQUFJOzs7Ozs7OzsyQkNGUyxlQUFlOztvQkFDdEIsUUFBUTs7aUNBQ0sscUJBQXFCOzt1QkFDL0IsV0FBVzs7eUJBQ1QsYUFBYTs7NEJBQ1YsZ0JBQWdCOztnQ0FDWixvQkFBb0I7O0FBRW5ELENBQUMsVUFBUyxHQUFHLEVBQUM7QUFDYixhQUFZLENBQUM7O0FBRWIsS0FBSSxFQUFFLEdBQUc7QUFDUixhQUFXLDBCQUFhO0FBQ3hCLE1BQUksWUFBTTtBQUNWLFNBQU8sa0JBQVM7QUFDaEIsbUJBQWlCLHNDQUFtQjtBQUNwQyxjQUFZLDRCQUFjO0FBQzFCLFdBQVMsc0JBQVc7QUFDcEIsa0JBQWdCLG9DQUFrQjtFQUNsQyxDQUFBOztBQUVELElBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQ1osQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuXHRAYWJzdHJhY3RcbiovXG5leHBvcnQgY2xhc3MgQWJzdHJhY3RGcmV0Ym9hcmR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0aWYodGhpcy5jb25zdHJ1Y3RvciA9PT0gQWJzdHJhY3RGcmV0Ym9hcmQpe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSXQncyBhbiBhYnN0cmFjdCBjbGFzcyBzaG91bGQnIGJlIGluc3RhbnRpYXRlZFwiKTtcblx0XHR9XG5cdFx0dGhpcy5fdHVuaW5nID0gW107XG5cdFx0dGhpcy5fc3RyaW5ncyA9IFtdO1xuXHR9XG5cblx0aW5pdCgpe1xuXHRcdHRocm93IG5ldyBFcnJvcihcIm92ZXJ3cml0dGVuIGluaXQgb3IgR1RGT1wiKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5pbmcgLSBhcnJheSBvZiBzdHJpbmcuIEVhY2ggZWxlbWVudCBzaG91bGQgcHJlc2VudCBpbiBmb3JtYXQgbGlrZSB0aGlzIFwiRSNcIiwgXCJjXCIsIFwiZGJcIi4uLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBob3cgbG9uZyB0aGUgYXJyYXkgc2hvdWxkIGZ1bmN0aW9uIHJldHVybi5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBzaG91bGQgYmUgZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVN0YXJ0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdCovXG5cdHNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZVN0YXJ0ID0gZmFsc2UsIG5vdGVUeXBlID0gTm90ZSl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwib3ZlcndyaXR0ZW4gc2V0VHVuaW5nIG9yIEdURk9cIik7XG5cdH1cblxuXHRnZXRUdW5pbmcoKXtcblx0XHRyZXR1cm4gdGhpcy5fdHVuaW5nO1xuXHR9XG5cblx0Z2V0U3RyaW5ncygpe1xuXHRcdHJldHVybiB0aGlzLl9zdHJpbmdzO1xuXHR9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtBYnN0cmFjdEZyZXRib2FyZH0gZnJvbSBcIi4vQWJzdHJhY3RGcmV0Ym9hcmRcIjtcbmltcG9ydCB7RWxlU3RyaW5nfSBmcm9tIFwiLi9FbGVTdHJpbmdcIjtcblxuZXhwb3J0IGNsYXNzIEVsZUZyZXRib2FyZCBleHRlbmRzIEFic3RyYWN0RnJldGJvYXJke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdWlGcmV0Ym9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX2VsZVN0cmluZ3MgPSBbXTsgLy8gYXJyYXkgb2YgZWxlU3RyaW5nXG5cdFx0dGhpcy5fbGFzdExlbmd0aCA9IC0xO1xuXHR9XG5cblx0aW5pdCh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlID0gMTIpe1xuXHRcdGluaXRVSS5jYWxsKHRoaXMpO1xuXHRcdHRoaXMuc2V0VHVuaW5nKHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGluaXRVSSgpe1xuXHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuY2xhc3NMaXN0LmFkZChcImZhLWZyZXRib2FyZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuZSAtIGluIHdoYXQga2V5IHdlIGFyZSB0dW5pbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgcmVzdWx0IGJlLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGluIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVTdGFydCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdHJpbmdHYXVnZSAtIGhvdyB0aGljayB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLCB1bml0IGluIHB4LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVTdGFydCA9IGZhbHNlLCBzdGFydEdhdWdlKXtcblx0XHRpZighKHR1bmluZyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHR1bmluZyBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0dW5pbmcpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIpICYmIGxlbmd0aCA8IDEpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAwOiBcIiArIGxlbmd0aCk7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8ICBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJub3RhdGlvbiBzaG91bGQgZWl0aGVyIGJlICcjJyBvciAnYicgaW4gc3RyaW5nIHR5cGU6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHRpZih0eXBlb2YgaW5jbHVkZVN0YXJ0ICE9PSBcImJvb2xlYW5cIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGluY2x1ZGVTdGFydCBzaG91bGQgYmUgdHlwZSBvZiBib29sZWFuOiBcIiArIGluY2x1ZGVTdGFydCk7XG5cdFx0fVxuXHRcdGlmKCEodHlwZW9mIHN0cmluZ0dhdWdlICE9PSBcIm51bWJlclwiKSAmJiBzdHJpbmdHYXVnZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzdHJpbmdHYXVnZSBzaG91bGQgYmUgYSBudW1iZXIgd2hpY2ggaXMgZ3JlYXRlciB0aGFuIC0xOiBcIiArIHN0cmluZ0dhdWdlKTtcblx0XHR9XG5cdFx0Ly8gaWYgcGFyYW1ldGVyIGxlbmd0aCBpcyBlcXVhbCB0byB0aGUgbGVuZ3RoIHBhc3NlZCBsYXN0IHRpbWUsIHRoZW4gb25seSB1cGRhdGVzIHRoZSB0ZXh0IGluc2lkZSB0aGVzZSBub3Rlcy5cblx0XHRpZigodHVuaW5nLmxlbmd0aCA9PT0gdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGgpICYmXG5cdFx0XHRcdCh0aGlzLl9sYXN0TGVuZ3RoID09PSBsZW5ndGgpKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0dW5pbmcubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR0aGlzLl9lbGVTdHJpbmdzW2ldLnNldFR1bmluZyh0dW5pbmdbaV0sIGxlbmd0aCwgbm90YXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiBub3QgdGhlbiByZWNyZWF0ZSBldmVyeXRoaW5nLlxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLl91aUZyZXRib2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fZWxlU3RyaW5ncyA9IFtdO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHR1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlU3RyaW5nKCkuaW5pdCh0dW5pbmdbaV0sIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVTdGFydCwgc3RhcnRHYXVnZSAtIGkpO1xuXHRcdFx0XHR0aGlzLl9lbGVTdHJpbmdzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuYXBwZW5kQ2hpbGQocmVzdWx0LmdldEVsZSgpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2xhc3RMZW5ndGggPSBsZW5ndGg7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0dG8gbWFrZSBzcGVjaWZpZWQga2V5cyB2aXNpYmxlLlxuXHRcdEBwYXJhbSB7YXJyYXl9IHRhcmdldCAtIG1ha2UgdGFyZ2V0IGtleXMgdmlzaWJsZS4gZm9ybWF0OiBbe2tleTogXCJDI1wiLCBjb2xvcjogXCJ5ZWxsb3dcIn0sIHtrZXk6IFwiRCNcIiwgY29sb3I6IFwiYmx1ZVwifSwgLi4uXVxuXHRcdEByZXR1cm4ge2FycmF5fSAtIHJldHVybiB3aGF0IGtleSB3YXMgYmVpbmcgbWFya2VkLlxuXHQqL1xuXHRtYXJrS2V5cyh0YXJnZXQpe1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoOyBpKyspe1xuXHRcdFx0bGV0IHIgPSB0aGlzLl9lbGVTdHJpbmdzW2ldLm1hcmtLZXlzKHRhcmdldCk7XG5cdFx0XHRyZXN1bHQucHVzaChyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdGFydEdhdWdlIC0gaG93IHRoaWNrIGlzIHRoZSBsZWZ0ZXN0IHN0cmluZy4gVGhlIGZvbGxvd2luZyBzdHJpbmdzJyB0aGlja25lc3Mgd2lsbCBiZSBpbiBkZXNjZW5kZWQgb3JkZXIuXG5cdCovXG5cdHNldFN0cmluZ0dhdWdlKHN0YXJ0R2F1Z2Upe1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPiB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2VsZVN0cmluZ3NbaV0uc2V0U3RyaW5nR2F1Z2Uoc3RhcnRHYXVnZSAtIGkpO1xuXHRcdH1cblx0fVxuXG5cdGdldEVsZSgpe1xuXHRcdHJldHVybiB0aGlzLl91aUZyZXRib2FyZDtcblx0fVxuXG5cdGdldFN0cmluZ3MoKXtcblx0XHRyZXR1cm4gdGhpcy5fZWxlU3RyaW5ncztcblx0fVxuXG5cdGdldFR1bmluZygpe1xuXHRcdGxldCB0dW5pbmcgPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0dW5pbmcucHVzaCh0aGlzLl9lbGVTdHJpbmdzW2ldLmdldFR1bmluZygpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHR1bmluZztcblx0fVxufVxuIiwiaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9Ob3RlXCI7XG5cbmV4cG9ydCBjbGFzcyBFbGVOb3RlIGV4dGVuZHMgTm90ZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fdWlOb3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRoaXMuX3VpU3RyaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aU5vdGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS1ub3RlXCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fdWlOb3RlVGV4dCk7XG5cdFx0dGhpcy5fdWlTdHJpbmcuYXBwZW5kQ2hpbGQodGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lcik7XG5cdFx0dGhpcy5fdWlOb3RlLmFwcGVuZENoaWxkKHRoaXMuX3VpU3RyaW5nKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RlIC0gZm9ybWF0IFwiZCNcIiwgXCJFXCIsIFwiRyNcIi5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IGJnQ29sb3IgLSBjb2xvciBmb3JtYXQgaW4gc3RyaW5nLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdHJpbmdHYXVnZSAtIGhvdyB0aGljayB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLCB1bml0IGluIHB4LlxuXHQqL1xuXHRpbml0KG5vdGUsIG5vdGF0aW9uID0gXCIjXCIsIGJnQ29sb3IgPSBcIndoaXRlXCIsIHN0cmluZ0dhdWdlID0gMTIpe1xuXHRcdHN1cGVyLmluaXQobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0Tm90ZU5hbWUobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0QmdDb2xvcihiZ0NvbG9yKTtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKHN0cmluZ0dhdWdlKTtcblx0XHR0aGlzLmhpZGUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEVsZSgpe1xuXHRcdHJldHVybiB0aGlzLl91aU5vdGU7XG5cdH1cblxuXHRzZXROb3RlTmFtZShub3RlTmFtZSwgbm90YXRpb24pe1xuXHRcdGlmKHR5cGVvZiBub3RlTmFtZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlTmFtZSBpbnN0YW5jZW9mIFN0cmluZyB8fCBub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT0gXCJiXCIpe1xuXHRcdFx0c3VwZXIuc2V0Tm90ZU5hbWUobm90ZU5hbWUsIG5vdGF0aW9uKTtcblx0XHRcdHRoaXMuX3VpTm90ZVRleHQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdHRoaXMuX3VpTm90ZVRleHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5nZXROb3RlTmFtZSgpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RlTmFtZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZU5hbWUpO1xuXHRcdH1cblx0fVxuXG5cdHNldEJnQ29sb3IoYmdDb2xvcil7XG5cdFx0aWYodHlwZW9mIGJnQ29sb3IgPT09IFwic3RyaW5nXCIgfHwgYmdDb2xvciBpbnN0YW5jZW9mIFN0cmluZyl7XG5cdFx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBiZ0NvbG9yIHNob3VsZCBiZSB0eXBlIG9mIHN0cmluZzogXCIgKyBiZ0NvbG9yKTtcblx0XHR9XG5cdH1cblxuXHRnZXRCZ0NvbG9yKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXHR9XG5cblx0c2V0U3RyaW5nR2F1Z2UoZ2F1Z2Upe1xuXHRcdGlmKHR5cGVvZiBnYXVnZSAhPT0gXCJudW1iZXJcIiAmJiBnYXVnZSA+IC0xKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgZ2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAtMTpcIiArIGdhdWdlKTtcblx0XHR9XG5cdFx0dGhpcy5fdWlTdHJpbmcuc3R5bGUud2lkdGggPSBnYXVnZSArIFwicHhcIjtcblx0fVxuXG5cdGdldFN0cmluZ0dhdWdlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpU3RyaW5nLnN0eWxlLndpZHRoO1xuXHR9XG5cblx0c2hvdygpeyB0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpOyB9XG5cdGhpZGUoKXsgdGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTsgfVxuXHRpc1Zpc2libGUoKXsgcmV0dXJuICF0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIik7IH1cblxuXHQvKlxuXHRcdHRoZSBcImRvdFwiIG9uIDMsNSw3LDksMTIuLi4gZ3VpdGFyIGZyZXRzXG5cdCovXG5cdG1hcmtJbmxheXMoKXsgdGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5hZGQoXCJpbmxheXNcIik7IH1cblx0cmVtb3ZlSW5sYXlzKCl7IHRoaXMuX3VpTm90ZS5jbGFzc0xpc3QucmVtb3ZlKFwiaW5sYXlzXCIpOyB9XG5cdGhhc0lubGF5cygpeyByZXR1cm4gdGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5jb250YWlucyhcImlubGF5c1wiKTsgfTtcbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge0VsZU5vdGV9IGZyb20gXCIuL0VsZU5vdGVcIjtcblxuZXhwb3J0IGNsYXNzIEVsZVN0cmluZ3tcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl91aVN0cmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblx0XHR0aGlzLl9lbGVOb3RlcyA9IFtdOyAvLyBhcnJheSBvZiBFbGVOb3RlXG5cdFx0dGhpcy5fdHVuaW5nID0gXCJcIjtcblx0fVxuXG5cdGluaXQodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQsIHN0cmluZ0dhdWdlKXtcblx0XHRpbml0VUkuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVTdGFydCwgc3RyaW5nR2F1Z2UpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdFVJKCl7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5jbGFzc0xpc3QuYWRkKFwiZmEtc3RyaW5nXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5pbmcgLSBpbiB3aGF0IGtleSB3ZSBhcmUgdHVuaW5nLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBob3cgbG9uZyBzaG91bGQgdGhlIHJlc3VsdCBiZS5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBpbiBlaXRoZXIgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtib29sZWFufSBpbmNsdWRlU3RhcnQgLSB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlIHN0YXJ0IGtleS5cblx0XHRAcGFyYW0ge251bWJlcn0gc3RyaW5nR2F1Z2UgLSBob3cgdGhpY2sgdGhlIHN0cmluZyB3aWxsIGJlIGRpc3BsYXllZCwgdW5pdCBpbiBweC5cblx0Ki9cblx0c2V0VHVuaW5nKHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlU3RhcnQgPSBmYWxzZSwgc3RyaW5nR2F1Z2UgPSAxMil7XG5cdFx0aWYoISh0eXBlb2YgdHVuaW5nID09PSBcInN0cmluZ1wiIHx8IHR1bmluZyBpbnN0YW5jZW9mIFN0cmluZykpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0dW5pbmcgc2hvdWxkIGJlIHN0cmluZzogXCIgKyB0dW5pbmcpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIpICYmIGxlbmd0aCA8IDEpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAwOiBcIiArIGxlbmd0aCk7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8IG5vdGF0aW9uID09PSBcImJcIikpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgZWl0aGVyICcjJyBvciAnYic6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHRpZih0eXBlb2YgaW5jbHVkZVN0YXJ0ICE9PSBcImJvb2xlYW5cIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGluY2x1ZGVTdGFydCBzaG91bGQgYmUgdHlwZSBvZiBib29sZWFuOiBcIiArIGluY2x1ZGVTdGFydCk7XG5cdFx0fVxuXHRcdGlmKCEodHlwZW9mIHN0cmluZ0dhdWdlICE9PSBcIm51bWJlclwiKSAmJiBzdHJpbmdHYXVnZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzdHJpbmdHYXVnZSBzaG91bGQgYmUgYSBudW1iZXIgd2hpY2ggaXMgZ3JlYXRlciB0aGFuIC0xOiBcIiArIHN0cmluZ0dhdWdlKTtcblx0XHR9XG5cdFx0Ly8gaWYgcGFyYW1ldGVyIGxlbmd0aCBpcyBlcXVhbCB0byB0aGUgbGVuZ3RoIHBhc3NlZCBsYXN0IHRpbWUsIHRoZW4gb25seSB1cGRhdGVzIHRoZSB0ZXh0IGluc2lkZSB0aGVzZSBub3Rlcy5cblx0XHRsZXQgbm90ZXMgPSBNdXNpY1RoZW9yeS50dW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQpO1xuXHRcdGlmKHRoaXMuX2VsZU5vdGVzLmxlbmd0aCA9PT0gbm90ZXMubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2ldLnNldE5vdGVOYW1lKG5vdGVzW2ldLCBub3RhdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIGlmIG5vdCB0aGVuIHJlY3JlYXRlIGV2ZXJ5dGhpbmcuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fZWxlTm90ZXMgPSBbXTtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlTm90ZSgpLmluaXQobm90ZXNbaV0sIG5vdGF0aW9uLCBcIndoaXRlXCIsIHN0cmluZ0dhdWdlKTtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR0aGlzLl91aVN0cmluZy5hcHBlbmRDaGlsZChyZXN1bHQuZ2V0RWxlKCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fdHVuaW5nID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodHVuaW5nLCBub3RhdGlvbik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3R1bmluZztcblx0fVxuXG5cdC8qKlxuXHRcdHRvIG1ha2Ugc3BlY2lmaWVkIGtleXMgdmlzaWJsZS5cblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXQgLSBtYWtlIHRhcmdldCBrZXlzIHZpc2libGUuIGZvcm1hdDogW3trZXk6IFwiQyNcIiwgY29sb3I6IFwieWVsbG93XCJ9LCB7a2V5OiBcIkQjXCIsIGNvbG9yOiBcImJsdWVcIn0sIC4uLl1cblx0XHRAcmV0dXJuIHthcnJheX0gLSByZXR1cm4gd2hhdCBrZXkgd2FzIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0tleXModGFyZ2V0KXtcblx0XHRpZighKHRhcmdldCBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHRhcmdldCBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0YXJnZXQpO1xuXHRcdH1cblx0XHRyZXNldERpc3BsYXkuY2FsbCh0aGlzKTtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRhcmdldC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBqKyspe1xuXHRcdFx0XHRsZXQga2V5MSA9IE11c2ljVGhlb3J5LmNvbnZlcnRBY2NpZGVudGFsKHRhcmdldFtpXS5rZXkpO1xuXHRcdFx0XHRsZXQga2V5MiA9IE11c2ljVGhlb3J5LmNvbnZlcnRBY2NpZGVudGFsKHRoaXMuX2VsZU5vdGVzW2pdLmdldE5vdGVOYW1lKCkpO1xuXHRcdFx0XHRpZihrZXkxID09PSBrZXkyKXtcblx0XHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tqXS5zaG93KCk7XG5cdFx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbal0uc2V0QmdDb2xvcih0YXJnZXRbaV0uY29sb3IpO1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuX2VsZU5vdGVzW2pdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXG5cdFx0ZnVuY3Rpb24gcmVzZXREaXNwbGF5KCl7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2ldLnNldEJnQ29sb3IoXCJ3aGl0ZVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRFbGUoKXtcblx0XHRyZXR1cm4gdGhpcy5fdWlTdHJpbmc7XG5cdH1cblxuXHRnZXRFbGVOb3Rlcygpe1xuXHRcdHJldHVybiB0aGlzLl9lbGVOb3Rlcztcblx0fVxufVxuIiwiaW1wb3J0IHtFbGVGcmV0Ym9hcmR9IGZyb20gXCIuL0VsZUZyZXRib2FyZFwiO1xuXG5leHBvcnQgY2xhc3MgRnJldGJvYXJkQXdlc29tZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl9kb21JZCA9IFwiXCI7XG5cdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lciA9IG51bGw7XG5cdFx0dGhpcy5fZWxlRnJldGJvYXJkID0gbnVsbDtcblx0fVxuXG5cdGluaXQodGFyZ2VJZCwgdHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQsIHN0YXJ0R2F1Z2Upe1xuXHRcdGluaXRVSS5jYWxsKHRoaXMsIHRhcmdlSWQsIHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlKTtcblx0XHR0aGlzLl91cGRhdGVUdW5pbmdVSSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdFVJKHRhcmdldElkLCB0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVTdGFydCwgc3RhcnRHYXVnZSl7XG5cdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG5cblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmEtY29udGFpbmVyXCIpO1xuXHRcdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhLXR1bmluZ1wiKTtcblx0XHRcdHRoaXMuX2VsZUZyZXRib2FyZCA9IG5ldyBFbGVGcmV0Ym9hcmQoKS5pbml0KHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlKTtcblxuXHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyKTtcblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9lbGVGcmV0Ym9hcmQuZ2V0RWxlKCkpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5lIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgc2hvdWxkIHRoZSByZXN1bHQgYmUuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gaW4gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVN0YXJ0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IHN0cmluZ0dhdWdlIC0gaG93IHRoaWNrIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQsIHVuaXQgaW4gcHguXG5cdCovXG5cdHNldFR1bmluZyh0dW5pbmcgPSBNdXNpY1RoZW9yeS5TVEFOREFSRF9HVUlUQVJfVFVOSU5HLCBsZW5ndGggPSAxMiwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZVN0YXJ0ID0gZmFsc2UsIHN0YXJ0R2F1Z2UgPSAxMil7XG5cdFx0aWYoISh0dW5pbmcgaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0dW5pbmcgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXk6IFwiICsgdHVuaW5nKTtcblx0XHR9XG5cdFx0aWYoISh0eXBlb2YgbGVuZ3RoICE9PSBcIm51bWJlclwiKSAmJiBsZW5ndGggPCAxKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlciB3aGljaCBpcyBncmVhdGVyIHRoYW4gMDogXCIgKyBsZW5ndGgpO1xuXHRcdH1cblx0XHRpZighKG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIGVpdGhlciAnIycgb3IgJ2InOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdFx0aWYodHlwZW9mIGluY2x1ZGVTdGFydCAhPT0gXCJib29sZWFuXCIpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBpbmNsdWRlU3RhcnQgc2hvdWxkIGJlIHR5cGUgb2YgYm9vbGVhbjogXCIgKyBpbmNsdWRlU3RhcnQpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBzdHJpbmdHYXVnZSAhPT0gXCJudW1iZXJcIikgJiYgc3RyaW5nR2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgc3RyaW5nR2F1Z2Ugc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAtMTogXCIgKyBzdHJpbmdHYXVnZSk7XG5cdFx0fVxuXHRcdHRoaXMuX2VsZUZyZXRib2FyZC5zZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQsIHN0YXJ0R2F1Z2UpO1xuXHRcdHRoaXMuX3VwZGF0ZVR1bmluZ1VJKCk7XG5cdH1cblxuXHRfdXBkYXRlVHVuaW5nVUkoKXtcblx0XHRsZXQgdHVuaW5nID0gdGhpcy5fZWxlRnJldGJvYXJkLmdldFR1bmluZygpO1xuXHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHR1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRsZXQgd3JhcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRsZXQgdGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdHRleHRTcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHR1bmluZ1tpXSkpO1xuXHRcdFx0d3JhcHBlckRpdi5hcHBlbmRDaGlsZCh0ZXh0U3Bhbik7XG5cdFx0XHR0aGlzLl91aVR1bmluZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyRGl2KTtcblx0XHR9XG5cdH1cblxuXHRtYXJrS2V5cyh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLl9lbGVGcmV0Ym9hcmQubWFya0tleXModGFyZ2V0KTtcblx0fVxuXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHR0aGlzLl9lbGVGcmV0Ym9hcmQuc2V0U3RyaW5nR2F1Z2UoZ2F1Z2UpO1xuXHR9XG59XG4iLCJleHBvcnQgY2xhc3MgTXVzaWNUaGVvcnkge1xuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gbm90ZSAtIGFjY2VwdCBhIHN0cmluZyBpbiBzcGVjaWZpZWQgbm90YXRpb24sIHNlZSBub3JtYWxpemUoKSBmb3IgbW9yZSBpbmZvLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBjb252ZXJ0VG8gLSBzaG91bGQgZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiIGluIHN0cmluZyB0eXBlLlxuXHRcdEByZXR1cm4ge3N0cmluZ30gLSB3aWxsIHJldHVybiB0aGUgcXVlcnkgcmVzdWx0LlxuXHQqL1xuXHRzdGF0aWMgY29udmVydEFjY2lkZW50YWwobm90ZSwgY29udmVydFRvID0gXCIjXCIpe1xuXHRcdGlmKGNvbnZlcnRUbyAhPT0gXCIjXCIgJiYgY29udmVydFRvICE9PSBcImJcIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udmVydFRvIHNob3VsZCBlaXRoZXIgYmUgJyMnIG9yICdiJyBpbiBzdHJpbmcgdHlwZTogXCIgKyBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRBcnJheShub3RlLCBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRTaW5nbGUobm90ZSwgY29udmVydFRvKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb252ZXJ0QXJyYXkobm90ZXMsIGNvbnZlcnRUbyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjb252ZXJ0U2luZ2xlKG5vdGVzW2ldLCBjb252ZXJ0VG8pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydFNpbmdsZShub3RlLCBjb252ZXJ0VG8pe1xuXHRcdFx0bGV0IHJlc3VsdCA9IE11c2ljVGhlb3J5Lm5vcm1hbGl6ZShub3RlKTtcblx0XHRcdGxldCBzYW1lTm90YXRpb24gPSByZXN1bHRbMV0gPT09IGNvbnZlcnRUbztcblx0XHRcdGlmKHJlc3VsdC5sZW5ndGggPT09IDEgfHwgc2FtZU5vdGF0aW9uKXtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydFRvID09PSBcIiNcIil7XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVFtpXSA9PT0gcmVzdWx0KXtcblx0XHRcdFx0XHRcdHJldHVybiBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0VG8gPT09IFwiYlwiKXtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlBbaV0gPT09IHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFUW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90IGZvdW5kOiBcIiArIHJlc3VsdCArIFwiIFwiICsgY29udmVydFRvKTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihcIndoYXQncyB0aGUgc29yY2VyeT8gXCIgKyByZXN1bHQgKyBcIiBcIiArIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmcsIGFycmF5fSBub3RlIC0gYWNjZXB0cyBzdHJpbmcgb2YgYXJyYXkgb2Ygc3RyaW5ncy4gc3RyaW5nIHNob3VsZCBiZSB3aXRoaW4gMiBjaGFyYWN0ZXJzIGxvbmcgYW5kIHdyaXR0ZW4gaW4gZmFzaGlvbiBsaWtlIFwiQ2JcIiwgXCJEXCIsIFwiRCNcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0IGlmIHlvdSBpbnB1dCBcIkNiYmJiYlwiLCB0aGUgZnVuY3Rpb24gd2lsbCBzdGlsbCBkbyB0aGUgcGFyc2UgYW5kIHJldHVybiBcIkNiXCIgYXMgdGhlIHJlc3VsdC5cblx0XHRAcmV0dXJuIHtudWxsLCBzdHJpbmd9IC0gd2lsbCByZXR1cm4gbnVsbCBpZiBubyBwYXR0ZXJuIGlzIGZvdW5kLCBvciByZXR1cm4gYSBzdHJpbmcgd2l0aCBjYXBpdGFsaXplZCBmaXJzdCBsZXR0ZXIgd2l0aGluIDIgbGVuZ3RoLlxuXHQqL1xuXHRzdGF0aWMgbm9ybWFsaXplKG5vdGUpe1xuXHRcdGlmKHR5cGVvZiBub3RlID09PSBcInN0cmluZ1wiIHx8IG5vdGUgaW5zdGFuY2VvZiBTdHJpbmcpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZVNpbmdsZShub3RlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZUFycmF5KG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBub3RlIHNodW9sZCBiZSBlaXRoZXIgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3M6IFwiICsgbm90ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkobm90ZXMpe1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobm9ybWFsaXplU2luZ2xlKG5vdGVzW2ldKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZSArIFwiIFtcIiArIG5vdGVzICsgXCJdXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZShub3RlKXtcblx0XHRcdGxldCBzaGFycFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX1NIQVJQLmV4ZWMobm90ZSk7XG5cdFx0XHRsZXQgZmxhdFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX0ZMQVQuZXhlYyhub3RlKTtcblx0XHRcdHNoYXJwUmVzdWx0ID0gc2hhcnBSZXN1bHQgPyBzaGFycFJlc3VsdFswXSA6IG51bGw7XG5cdFx0XHRmbGF0UmVzdWx0ID0gZmxhdFJlc3VsdCA/IGZsYXRSZXN1bHRbMF0gOiBudWxsO1xuXHRcdFx0aWYoc2hhcnBSZXN1bHQgfHwgZmxhdFJlc3VsdCl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSAoc2hhcnBSZXN1bHQubGVuZ3RoID4gZmxhdFJlc3VsdC5sZW5ndGgpID8gc2hhcnBSZXN1bHQgOiBmbGF0UmVzdWx0O1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHRbMF0udG9VcHBlckNhc2UoKSArIHJlc3VsdC5zbGljZSgxKTtcblx0XHRcdFx0cmVzdWx0ID0gKHJlc3VsdCA9PT0gXCJDYlwiKSA/IFwiQlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdChyZXN1bHQgPT09IFwiQiNcIikgPyBcIkNcIiA6XG5cdFx0XHRcdFx0XHRcdFx0XHQocmVzdWx0ID09PSBcIkZiXCIpID8gXCJFXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCA9PT0gXCJFI1wiKSA/IFwiRlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdDtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGU6IFwiICsgbm90ZSArIFwiIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHBhdHRlcm4uXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBzdGFydEtleSAtIHRoZSBrZXkgeW91IHdhbnQgdG8gc3RhcnQgd2l0aC4gRm9ybWF0IHNob3VsZCBiZSBcIkMjXCIsIFwiZFwiLCBcImViXCIuLi5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgdGhlIGFycmF5IHNob3VsZCBmdW5jdGlvbiByZXR1cm4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vcmF0aW9uIC0gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVN0YXJ0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gYW4gYXJyYXkgd2l0aCBzdHJpbmcgY29udGFpbnMgdGhlIHNlcXVlbmNlIG9mIGtleXMuXG5cdCovXG5cdHN0YXRpYyB0dW5pbmcoc3RhcnRLZXkgPSBcIkNcIiwgbGVuZ3RoID0gNywgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZVN0YXJ0ID0gdHJ1ZSl7XG5cdFx0aWYoKHR5cGVvZiBzdGFydEtleSA9PT0gXCJzdHJpbmdcIiB8fCBzdGFydEtleSBpbnN0YW5jZW9mIFN0cmluZykgJiZcblx0XHRcdFx0KG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpICYmXG5cdFx0XHRcdCh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDApICYmXG5cdFx0XHRcdCh0eXBlb2YgaW5jbHVkZVN0YXJ0ID09PSBcImJvb2xlYW5cIikpe1xuXHRcdFx0c3RhcnRLZXkgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbChzdGFydEtleSwgbm90YXRpb24pO1xuXHRcdFx0bGV0IHN0YXJ0SW5kZXggPSAwO1xuXHRcdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdFx0aWYobm90YXRpb24gPT09IFwiI1wiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAuaW5kZXhPZihzdGFydEtleSk7XG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YXJ0SW5kZXgsIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbGVuZ3RoOyBpKyssIGNvdW50ZXIrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goaW5maW5pdGVJbmRleGluZyhNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQLCBpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYobm90YXRpb24gPT09IFwiYlwiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVC5pbmRleE9mKHN0YXJ0S2V5KTtcblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhcnRJbmRleCwgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW5ndGg7IGkrKywgY291bnRlcisrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChpbmZpbml0ZUluZGV4aW5nKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVCwgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5jbHVkZVN0YXJ0ID8gcmVzdWx0IDogcmVzdWx0LnNsaWNlKDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJvbmUgb2YgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkOiBcIiArIFwiXFxuXCIgKyBzdGFydEtleSArIFwiXFxuXCIgKyBsZW5ndGggKyBcIlxcblwiICsgbm90YXRpb24gKyBcIlxcblwiICsgaW5jbHVkZVN0YXJ0KTtcblx0XHR9XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwid2hhdCdzIHRoZSBzb3JjZXJ5PyBcIiArIHN0YXJ0S2V5ICsgXCIgXCIgKyBsZW5ndGggKyBcIiBcIiArIG5vdGF0aW9uICsgXCIgXCIgKyBpbmNsdWRlU3RhcnQpO1xuXG5cdFx0ZnVuY3Rpb24gaW5maW5pdGVJbmRleGluZyhhcnJheSwgaW5kZXgpe1xuXHRcdFx0aW5kZXggPSBpbmRleCAlIGFycmF5Lmxlbmd0aDtcblx0XHRcdHJldHVybiBhcnJheVtpbmRleF07XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldCBOT1RBVElPTl9TSEFSUCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddIz8vOyB9XG5cdHN0YXRpYyBnZXQgTk9UQVRJT05fRkxBVCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddYj8vOyB9XG5cblx0c3RhdGljIGdldCBLRVlTX0FDQ0lERU5UQUxTX1NIQVJQKCl7IHJldHVybiBbXCJBXCIsIFwiQSNcIiwgXCJCXCIsIFwiQ1wiLCBcIkMjXCIsIFwiRFwiLCBcIkQjXCIsIFwiRVwiLCBcIkZcIiwgXCJGI1wiLCBcIkdcIiwgXCJHI1wiXTsgfVxuXHRzdGF0aWMgZ2V0IEtFWVNfQUNDSURFTlRBTFNfRkxBVCgpeyByZXR1cm4gW1wiQVwiLCBcIkJiXCIsIFwiQlwiLCBcIkNcIiwgXCJEYlwiLCBcIkRcIiwgXCJFYlwiLCBcIkVcIiwgXCJGXCIsIFwiR2JcIiwgXCJHXCIsIFwiQWJcIl07IH1cblxuXHRzdGF0aWMgZ2V0IFNUQU5EQVJEX0dVSVRBUl9TVFJJTkdTKCl7IHJldHVybiA2OyB9XG5cdHN0YXRpYyBnZXQgU1RBTkRBUkRfR1VJVEFSX1RVTklORygpeyByZXR1cm4gW1wiRVwiLCBcIkFcIiwgXCJEXCIsIFwiR1wiLCBcIkJcIiwgXCJFXCJdOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuXG5leHBvcnQgY2xhc3MgTm90ZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fbm90ZU5hbWUgPSBcIlwiO1xuXHR9XG5cblx0aW5pdChub3RlLCBub3RhdGlvbiA9IFwiI1wiKXtcblx0XHR0aGlzLnNldE5vdGVOYW1lKG5vdGUsIG5vdGF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RlIC0gb25seSB0YWtlcyBzdHJpbmcuIFRoZSBmb3JtYXQgc2hvdWxkIGJlIFwiZCNcIiwgXCJFXCIsIFwiY2JcIi4uLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIG9ubHkgdGFrZXMgc3RyaW5nLiBUaGUgZm9ybWF0IHNob3VsZCBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdCovXG5cdHNldE5vdGVOYW1lKG5vdGUsIG5vdGF0aW9uID0gXCIjXCIpIHtcblx0XHRpZih0eXBlb2Ygbm90ZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlIGluc3RhbmNlb2YgU3RyaW5nKXtcblx0XHRcdHRoaXMuX25vdGVOYW1lID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwobm90ZSwgbm90YXRpb24pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90ZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Tm90ZU5hbWUoKXsgcmV0dXJuIHRoaXMuX25vdGVOYW1lOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9Ob3RlXCI7XG5pbXBvcnQge0Fic3RyYWN0RnJldGJvYXJkfSBmcm9tIFwiLi9BYnN0cmFjdEZyZXRib2FyZFwiO1xuaW1wb3J0IHtFbGVOb3RlfSBmcm9tIFwiLi9FbGVOb3RlXCI7XG5pbXBvcnQge0VsZVN0cmluZ30gZnJvbSBcIi4vRWxlU3RyaW5nXCI7XG5pbXBvcnQge0VsZUZyZXRib2FyZH0gZnJvbSBcIi4vRWxlRnJldGJvYXJkXCI7XG5pbXBvcnQge0ZyZXRib2FyZEF3ZXNvbWV9IGZyb20gXCIuL0ZyZXRib2FyZEF3ZXNvbWVcIjtcblxuKGZ1bmN0aW9uKHdpbil7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBmYSA9IHtcblx0XHRNdXNpY1RoZW9yeTogTXVzaWNUaGVvcnksXG5cdFx0Tm90ZTogTm90ZSxcblx0XHRFbGVOb3RlOiBFbGVOb3RlLFxuXHRcdEFic3RyYWN0RnJldGJvYXJkOiBBYnN0cmFjdEZyZXRib2FyZCxcblx0XHRFbGVGcmV0Ym9hcmQ6IEVsZUZyZXRib2FyZCxcblx0XHRFbGVTdHJpbmc6IEVsZVN0cmluZyxcblx0XHRGcmV0Ym9hcmRBd2Vzb21lOiBGcmV0Ym9hcmRBd2Vzb21lXG5cdH1cblxuXHR3aW4uZmEgPSBmYTtcbn0pKHdpbmRvdyk7XG4iXX0=
