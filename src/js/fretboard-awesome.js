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
var Config = {
	FRET_HEIGHT_DEFAULT: "80",
	FRET_WIDTH_DEDAULT: "40",
	ORI_VERTICAL: "vertical",
	ORI_HORIZONTAL: "horizontal"
};
exports.Config = Config;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MusicTheory = require("./MusicTheory");

var _AbstractFretboard2 = require("./AbstractFretboard");

var _EleString = require("./EleString");

var _Config = require("./Config");

var EleFretboard = (function (_AbstractFretboard) {
	_inherits(EleFretboard, _AbstractFretboard);

	function EleFretboard() {
		_classCallCheck(this, EleFretboard);

		_get(Object.getPrototypeOf(EleFretboard.prototype), "constructor", this).call(this);
		this._uiFretboard = document.createElement("div");
		this._eleStrings = []; // array of eleString
		this._lastLength = -1;
		this._currentNotation = "";
		this._orientation = _Config.Config.ORI_VERTICAL;
		this._startGauge = 6;
	}

	_createClass(EleFretboard, [{
		key: "init",
		value: function init(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var startGauge = arguments.length <= 4 || arguments[4] === undefined ? 12 : arguments[4];
			var orientation = arguments.length <= 5 || arguments[5] === undefined ? _Config.Config.ORI_VERTICAL : arguments[5];

			initUI.call(this);
			this.setTuning(tuning, length, notation, includeOpenFret);
			this.setOrientation(orientation);
			this.setStringGauge(startGauge);
			return this;

			function initUI() {
				this._uiFretboard.classList.add("fa-fretboard");
			}
		}

		/**
  	@param {string} tune - in what key we are tuning.
  	@param {number} length - how long should the result be.
  	@param {string} notation - in either "#" or "b".
  	@param {boolean} includeOpenFret - whether to include the start key.
  */
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter length should be a number which is greater than 0: " + length);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
			}
			if (typeof includeOpenFret !== "boolean") {
				throw new TypeError("parameter includeOpenFret should be type of boolean: " + includeOpenFret);
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
						var result = new _EleString.EleString().init(tuning[i], length, notation, includeOpenFret, this.getStartGauge() - i, this.getOrientation());
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
		value: function setStringGauge(startGauge, orientation) {
			if (typeof startGauge !== "number" || startGauge < 0) {
				throw new TypeError("parameter startGauge should be greater than -1:" + startGauge);
			}
			for (var i = 0; i < this._eleStrings.length; i++) {
				this._eleStrings[i].setStringGauge(startGauge - i);
			}
			this._startGauge = startGauge;
		}
	}, {
		key: "getStringGauge",
		value: function getStringGauge() {
			var result = [];
			for (var i = 0; i < this._eleStrings.length; i++) {
				result.push(this._eleStrings[i].getStringGauge());
			}
			return result;
		}
	}, {
		key: "getStartGauge",
		value: function getStartGauge() {
			return this._startGauge;
		}
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
			}
			for (var i = 0; i < this._eleStrings.length; i++) {
				this._eleStrings[i].setOrientation(orientation);
			}
			this._orientation = orientation;
		}
	}, {
		key: "getOrientation",
		value: function getOrientation() {
			return this._orientation;
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
	}, {
		key: "getCurrentNotation",
		value: function getCurrentNotation() {
			return this._currentNotation;
		}
	}, {
		key: "markInlays",
		value: function markInlays(arr) {
			var mid = this._eleStrings.length / 2 - 1;
			mid = mid < 0 ? 0 : mid;
			return this._eleStrings[mid].markInlays(arr);
		}
	}]);

	return EleFretboard;
})(_AbstractFretboard2.AbstractFretboard);

exports.EleFretboard = EleFretboard;

},{"./AbstractFretboard":1,"./Config":2,"./EleString":5,"./MusicTheory":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Note2 = require("./Note");

var _Config = require("./Config");

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
		this._uiNoteText.classList.add("fa-note-text");
		this._uiString.classList.add("fa-string-image");
		this._uiNote.classList.add("fa-fret");

		this._uiNoteTextContainer.appendChild(this._uiNoteText);
		this._uiNote.appendChild(this._uiString);
		this._uiNote.appendChild(this._uiNoteTextContainer);

		this._stringGauge = 3;
		this._orientation = _Config.Config.ORI_VERTICAL;
	}

	/**
 	@param {string} note - format "d#", "E", "G#".
 	@param {string} notation - either be "#" or "b".
 	@param {string} bgColor - color format in string.
 	@param {number} stringGauge - how thick the string will be displayed, unit in px.
 	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
 */

	_createClass(EleNote, [{
		key: "init",
		value: function init(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];
			var bgColor = arguments.length <= 2 || arguments[2] === undefined ? "white" : arguments[2];
			var stringGauge = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];
			var orientation = arguments.length <= 4 || arguments[4] === undefined ? _Config.Config.ORI_VERTICAL : arguments[4];

			_get(Object.getPrototypeOf(EleNote.prototype), "init", this).call(this, note, notation);
			this.setNoteName(note, notation);
			this.setBgColor(bgColor);
			this.setStringGauge(stringGauge);
			this.setOrientation(orientation);
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
			if (typeof gauge !== "number" || gauge < 0) {
				throw new TypeError("parameter gauge should be greater than 0:" + gauge);
			}
			if (this.getOrientation() === _Config.Config.ORI_VERTICAL) {
				this._uiString.style.height = _Config.Config.FRET_HEIGHT_DEFAULT + "px";
				this._uiString.style.width = gauge.toString() + "px";
			} else if (this.getOrientation() === _Config.Config.ORI_HORIZONTAL) {
				this._uiString.style.height = gauge.toString() + "px";
				this._uiString.style.width = _Config.Config.FRET_HEIGHT_DEFAULT + "px";
			} else {
				throw new Error("whats the sorcery? " + gauge);
			}
			this._stringGauge = gauge;
		}
	}, {
		key: "getStringGauge",
		value: function getStringGauge() {
			return this._stringGauge;
		}
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
			}
			if (this._orientation === orientation) {
				return;
			}
			this._orientation = orientation;
			this.setStringGauge(this.getStringGauge());
		}
	}, {
		key: "getOrientation",
		value: function getOrientation() {
			return this._orientation;
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

},{"./Config":2,"./Note":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _MusicTheory = require("./MusicTheory");

var _EleNote = require("./EleNote");

var _Config = require("./Config");

var EleString = (function () {
	function EleString() {
		_classCallCheck(this, EleString);

		this._uiString = document.createElement("ul");
		this._eleNotes = []; // array of EleNote
		this._tuning = "";
		this._stringGauge = 0;
		this._orientation = _Config.Config.ORI_VERTICAL;
	}

	_createClass(EleString, [{
		key: "init",
		value: function init(tuning) {
			var length = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var stringGauge = arguments.length <= 4 || arguments[4] === undefined ? 6 : arguments[4];
			var orientation = arguments.length <= 5 || arguments[5] === undefined ? _Config.Config.ORI_VERTICAL : arguments[5];

			initUI.call(this);
			this.setTuning(tuning, length, notation, includeOpenFret);
			this.setOrientation(orientation);
			this.setStringGauge(stringGauge);
			return this;

			function initUI() {
				this._uiString.classList.add("fa-string");
			}
		}

		/**
  	@param {string} tuning - in what key we are tuning.
  	@param {number} length - how long should the result be.
  	@param {string} notation - in either "#" or "b".
  	@param {boolean} includeOpenFret - whether to include the start key.
  */
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			if (!(typeof tuning === "string" || tuning instanceof String)) {
				throw new TypeError("parameter tuning should be string: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter length should be a number which is greater than 0: " + length);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			if (typeof includeOpenFret !== "boolean") {
				throw new TypeError("parameter includeOpenFret should be type of boolean: " + includeOpenFret);
			}
			// if parameter length is equal to the length passed last time, then only updates the text inside these notes.
			var notes = _MusicTheory.MusicTheory.tuning(tuning, length, notation, includeOpenFret);
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
						var result = new _EleNote.EleNote().init(notes[i], notation, "white", this.getStringGauge(), this.getOrientation());
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
	}, {
		key: "setStringGauge",
		value: function setStringGauge(gauge) {
			if (typeof gauge !== "number" || gauge < 0) {
				throw new TypeError("parameter gauge should be greater than 0:" + gauge);
			}
			for (var i = 0; i < this._eleNotes.length; i++) {
				this._eleNotes[i].setStringGauge(gauge);
			}
			this._stringGauge = gauge;
		}
	}, {
		key: "getStringGauge",
		value: function getStringGauge() {
			return this._stringGauge;
		}
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
			}
			for (var i = 0; i < this._eleNotes.length; i++) {
				this._eleNotes[i].setOrientation(orientation);
			}
			this._orientation = orientation;
		}
	}, {
		key: "getOrientation",
		value: function getOrientation() {
			return this._orientation;
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

		/**
  	@param {array} targetFrets - indicates which frets you want to mark inlays. Will throw error if target fret doesn't exist.
  	For simplicity, use human index convention on array, don't use computer field convention. For example, if you want to mark inalys
  	on fret 1, 3, 5, pass [1, 3, 5], don't try [0, 2, 4].
  	@return {array} - returns elements which were being marked.
  */
	}, {
		key: "markInlays",
		value: function markInlays(targetFrets) {
			if (!(targetFrets instanceof Array)) {
				throw new TypeError("parameter targetFrets should be type of array with number: " + targetFrets);
			}
			clearInlays.call(this);
			targetFrets = findUnique(targetFrets);
			var result = [];
			for (var i = 0; i < targetFrets.length; i++) {
				var index = targetFrets[i] - 1;
				if (this._eleNotes[index]) {
					this._eleNotes[index].markInlays();
					result.push(this._eleNotes[index]);
				} else {
					throw new Error("target fret doesn't exist. targetFrets: " + targetFrets + ", fret length: " + this._eleNotes.length + ", translated index: " + index);
				}
			}
			return result;

			function clearInlays() {
				for (var i = 0; i < this._eleNotes.length; i++) {
					this._eleNotes[i].removeInlays();
				}
			}

			function findUnique(arr) {
				return arr.reduce(function (a, r) {
					if (a.indexOf(r) < 0) {
						a.push(r);
					}
					return a;
				}, []);
			}
		}
	}]);

	return EleString;
})();

exports.EleString = EleString;

},{"./Config":2,"./EleNote":4,"./MusicTheory":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _EleFretboard = require("./EleFretboard");

var _Config = require("./Config");

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
		value: function init(targeId, tuning, length, notation, includeStart, startGauge, orientation) {
			initUI.call(this, targeId, tuning, length, notation, includeStart, startGauge, orientation);
			this._updateTuningUI();
			return this;

			function initUI(targetId, tuning, length, notation, includeStart, startGauge, orientation) {
				this._uiMainContainer = document.getElementById(targetId);

				this._uiMainContainer.classList.add("fa-container");
				this._uiTuningContainer.classList.add("fa-tuning");
				this._eleFretboard = new _EleFretboard.EleFretboard().init(tuning, length, notation, includeStart, startGauge, orientation);

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
	}, {
		key: "setTuning",
		value: function setTuning() {
			var tuning = arguments.length <= 0 || arguments[0] === undefined ? MusicTheory.STANDARD_GUITAR_TUNING : arguments[0];
			var length = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

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
			this._eleFretboard.setTuning(tuning, length, notation, includeStart);
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
				wrapperDiv.classList.add("fa-keytext-container");
				textSpan.classList.add("fa-keytext");
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
	}, {
		key: "getCurrentNotation",
		value: function getCurrentNotation() {
			return this._eleFretboard.getCurrentNotation();
		}
	}, {
		key: "markInlays",
		value: function markInlays(arr) {
			return this._eleFretboard.markInlays(arr);
		}
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either FretboardAwesome.ORI_VERTICAL or FretboardAwesome.ORI_HORIZONTAL: " + orientation);
			}
			this._uiMainContainer.classList.remove(_Config.Config.ORI_VERTICAL);
			this._uiMainContainer.classList.remove(_Config.Config.ORI_HORIZONTAL);
			var className = orientation === _Config.Config.ORI_VERTICAL ? _Config.Config.ORI_VERTICAL : _Config.Config.ORI_HORIZONTAL;
			this._uiMainContainer.classList.add(className);
			this._eleFretboard.setOrientation(orientation);
		}
	}, {
		key: "getOrientation",
		value: function getOrientation() {
			var ori = this._uiMainContainer.classList.contains("vertical") ? _Config.Config.ORI_VERTICAL : this._uiMainContainer.classList.contains("horizontal") ? _Config.Config.ORI_HORIZONTAL : -1;
			return ori;
		}
	}]);

	return FretboardAwesome;
})();

exports.FretboardAwesome = FretboardAwesome;

},{"./Config":2,"./EleFretboard":3}],7:[function(require,module,exports){
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
  	@param {boolean} includeOpenFret - whether to include the start key.
  	@return {array} - an array with string contains the sequence of keys.
  */
	}, {
		key: "tuning",
		value: function tuning() {
			var startKey = arguments.length <= 0 || arguments[0] === undefined ? "C" : arguments[0];
			var length = arguments.length <= 1 || arguments[1] === undefined ? 7 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

			if ((typeof startKey === "string" || startKey instanceof String) && (notation === "#" || notation === "b") && (typeof length === "number" && length > 0) && typeof includeOpenFret === "boolean") {
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
				return includeOpenFret ? result : result.slice(1);
			} else {
				throw new TypeError("one of the following parameter is not valid: " + "\n" + startKey + "\n" + length + "\n" + notation + "\n" + includeOpenFret);
			}
			throw new Error("what's the sorcery? " + startKey + " " + length + " " + notation + " " + includeOpenFret);

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

},{}],8:[function(require,module,exports){
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

},{"./MusicTheory":7}],9:[function(require,module,exports){
"use strict";

var _MusicTheory = require("./MusicTheory");

var _Note = require("./Note");

var _AbstractFretboard = require("./AbstractFretboard");

var _EleNote = require("./EleNote");

var _EleString = require("./EleString");

var _EleFretboard = require("./EleFretboard");

var _FretboardAwesome = require("./FretboardAwesome");

var _Config = require("./Config");

(function (win) {
	"use strict";

	var fa = {
		MusicTheory: _MusicTheory.MusicTheory,
		Note: _Note.Note,
		EleNote: _EleNote.EleNote,
		AbstractFretboard: _AbstractFretboard.AbstractFretboard,
		EleFretboard: _EleFretboard.EleFretboard,
		EleString: _EleString.EleString,
		FretboardAwesome: _FretboardAwesome.FretboardAwesome,
		Config: _Config.Config
	};

	win.fa = fa;
})(window);

},{"./AbstractFretboard":1,"./Config":2,"./EleFretboard":3,"./EleNote":4,"./EleString":5,"./FretboardAwesome":6,"./MusicTheory":7,"./Note":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0Fic3RyYWN0RnJldGJvYXJkLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9Db25maWcuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZUZyZXRib2FyZC5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlTm90ZS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlU3RyaW5nLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9GcmV0Ym9hcmRBd2Vzb21lLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9NdXNpY1RoZW9yeS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvTm90ZS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvZnJldGJvYXJkLWF3ZXNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0lDR2EsaUJBQWlCO0FBQ2xCLFVBREMsaUJBQWlCLEdBQ2hCO3dCQURELGlCQUFpQjs7QUFFNUIsTUFBRyxJQUFJLENBQUMsV0FBVyxLQUFLLGlCQUFpQixFQUFDO0FBQ3pDLFNBQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztHQUNsRTtBQUNELE1BQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0VBQ25COztjQVBXLGlCQUFpQjs7U0FTekIsZ0JBQUU7QUFDTCxTQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7R0FDNUM7Ozs7Ozs7Ozs7U0FRUSxtQkFBQyxNQUFNLEVBQUUsTUFBTSxFQUF3RDtPQUF0RCxRQUFRLHlEQUFHLEdBQUc7T0FBRSxZQUFZLHlEQUFHLEtBQUs7T0FBRSxRQUFRLHlEQUFHLElBQUk7O0FBQzlFLFNBQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztHQUNqRDs7O1NBRVEscUJBQUU7QUFDVixVQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7R0FDcEI7OztTQUVTLHNCQUFFO0FBQ1gsVUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0dBQ3JCOzs7UUE3QlcsaUJBQWlCOzs7Ozs7Ozs7OztBQ0h2QixJQUFJLE1BQU0sR0FBRztBQUNuQixvQkFBbUIsRUFBRSxJQUFJO0FBQ3pCLG1CQUFrQixFQUFFLElBQUk7QUFDeEIsYUFBWSxFQUFFLFVBQVU7QUFDeEIsZUFBYyxFQUFFLFlBQVk7Q0FDNUIsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQ0x5QixlQUFlOztrQ0FDVCxxQkFBcUI7O3lCQUM3QixhQUFhOztzQkFDaEIsVUFBVTs7SUFFbEIsWUFBWTtXQUFaLFlBQVk7O0FBQ2IsVUFEQyxZQUFZLEdBQ1g7d0JBREQsWUFBWTs7QUFFdkIsNkJBRlcsWUFBWSw2Q0FFZjtBQUNSLE1BQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxNQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDM0IsTUFBSSxDQUFDLFlBQVksR0FBRyxlQUFPLFlBQVksQ0FBQztBQUN4QyxNQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztFQUNyQjs7Y0FUVyxZQUFZOztTQVdwQixjQUFDLE1BQU0sRUFBRSxNQUFNLEVBQThGO09BQTVGLFFBQVEseURBQUcsR0FBRztPQUFFLGVBQWUseURBQUcsS0FBSztPQUFFLFVBQVUseURBQUcsRUFBRTtPQUFFLFdBQVcseURBQUcsZUFBTyxZQUFZOztBQUMvRyxTQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLE9BQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDMUQsT0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxPQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLFVBQU8sSUFBSSxDQUFDOztBQUVaLFlBQVMsTUFBTSxHQUFFO0FBQ2hCLFFBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRDtHQUNEOzs7Ozs7Ozs7O1NBUVEsbUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBMEM7T0FBeEMsUUFBUSx5REFBRyxHQUFHO09BQUUsZUFBZSx5REFBRyxLQUFLOztBQUNoRSxPQUFHLEVBQUUsTUFBTSxZQUFZLEtBQUssQ0FBQSxBQUFDLEVBQUM7QUFDN0IsVUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMzRTtBQUNELE9BQUcsRUFBRSxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUEsQUFBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDOUMsVUFBTSxJQUFJLFNBQVMsQ0FBQywrREFBK0QsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUM5RjtBQUNELE9BQUcsRUFBRSxRQUFRLEtBQUssR0FBRyxJQUFLLFFBQVEsS0FBSyxHQUFHLENBQUEsQUFBQyxFQUFDO0FBQzNDLFVBQU0sSUFBSSxTQUFTLENBQUMsdURBQXVELEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDeEY7QUFDRCxPQUFHLE9BQU8sZUFBZSxLQUFLLFNBQVMsRUFBQztBQUN2QyxVQUFNLElBQUksU0FBUyxDQUFDLHVEQUF1RCxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQy9GOztBQUVELE9BQUcsQUFBQyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUMxQyxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQUFBQyxFQUFDO0FBQy9CLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3JDLFNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDM0Q7SUFDRDs7UUFFRztBQUNILFNBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNqQyxTQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNyQyxVQUFJLE1BQU0sR0FBRywwQkFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUNqSSxVQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixVQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztNQUMvQztLQUNEO0FBQ0QsT0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDMUIsT0FBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztHQUNqQzs7Ozs7Ozs7O1NBT08sa0JBQUMsTUFBTSxFQUFDO0FBQ2YsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNoRCxRQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxVQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2Y7QUFDRCxVQUFPLE1BQU0sQ0FBQztHQUNkOzs7Ozs7O1NBS2Esd0JBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQztBQUN0QyxPQUFHLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFDO0FBQ25ELFVBQU0sSUFBSSxTQUFTLENBQUMsaURBQWlELEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDcEY7QUFDRCxRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDL0MsUUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25EO0FBQ0QsT0FBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7R0FDOUI7OztTQUVhLDBCQUFFO0FBQ2YsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUMvQyxVQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNsRDtBQUNELFVBQU8sTUFBTSxDQUFDO0dBQ2Q7OztTQUVZLHlCQUFFO0FBQ2QsVUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0dBQ3hCOzs7U0FFYSx3QkFBQyxXQUFXLEVBQUM7QUFDMUIsT0FBRyxFQUFFLFdBQVcsS0FBSyxlQUFPLFlBQVksSUFBSSxXQUFXLEtBQUssZUFBTyxjQUFjLENBQUEsQUFBQyxFQUFDO0FBQ2xGLFVBQU0sSUFBSSxTQUFTLENBQUMsdUZBQXVGLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDM0g7QUFDRCxRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDL0MsUUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQ7QUFDRCxPQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztHQUNoQzs7O1NBRWEsMEJBQUU7QUFDZixVQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7R0FDekI7OztTQUVLLGtCQUFFO0FBQ1AsVUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0dBQ3pCOzs7U0FFUyxzQkFBRTtBQUNYLFVBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztHQUN4Qjs7O1NBRVEscUJBQUU7QUFDVixPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQy9DLFVBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzdDO0FBQ0QsVUFBTyxNQUFNLENBQUM7R0FDZDs7O1NBRWlCLDhCQUFFO0FBQ25CLFVBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0dBQzdCOzs7U0FFUyxvQkFBQyxHQUFHLEVBQUM7QUFDZCxPQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLE1BQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDeEIsVUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUM3Qzs7O1FBNUlXLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0xOLFFBQVE7O3NCQUNOLFVBQVU7O0lBRWxCLE9BQU87V0FBUCxPQUFPOztBQUNSLFVBREMsT0FBTyxHQUNOO3dCQURELE9BQU87O0FBRWxCLDZCQUZXLE9BQU8sNkNBRVY7O0FBRVIsTUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVDLE1BQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxNQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxNQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWxELE1BQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELE1BQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMvQyxNQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNoRCxNQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXRDLE1BQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QyxNQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFcEQsTUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsTUFBSSxDQUFDLFlBQVksR0FBRyxlQUFPLFlBQVksQ0FBQztFQUN4Qzs7Ozs7Ozs7OztjQXBCVyxPQUFPOztTQTZCZixjQUFDLElBQUksRUFBeUY7T0FBdkYsUUFBUSx5REFBRyxHQUFHO09BQUUsT0FBTyx5REFBRyxPQUFPO09BQUUsV0FBVyx5REFBRyxFQUFFO09BQUUsV0FBVyx5REFBRyxlQUFPLFlBQVk7O0FBQ2hHLDhCQTlCVyxPQUFPLHNDQThCUCxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzNCLE9BQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE9BQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsT0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxPQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLE9BQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNaLFVBQU8sSUFBSSxDQUFDO0dBQ1o7OztTQUVLLGtCQUFFO0FBQ1AsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0dBQ3BCOzs7U0FFVSxxQkFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDO0FBQzlCLE9BQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsWUFBWSxNQUFNLElBQUksUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFDO0FBQ3BHLCtCQTdDVSxPQUFPLDZDQTZDQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ3RDLFFBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNoQyxRQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUUsTUFDSTtBQUNKLFVBQU0sSUFBSSxTQUFTLENBQUMsK0NBQStDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDaEY7R0FDRDs7O1NBRVMsb0JBQUMsT0FBTyxFQUFDO0FBQ2xCLE9BQUcsT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxNQUFNLEVBQUM7QUFDM0QsUUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0lBQzFELE1BQ0k7QUFDSixVQUFNLElBQUksU0FBUyxDQUFDLDhDQUE4QyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQzlFO0dBQ0Q7OztTQUVTLHNCQUFFO0FBQ1gsVUFBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztHQUN2RDs7O1NBRWEsd0JBQUMsS0FBSyxFQUFDO0FBQ3BCLE9BQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUM7QUFDekMsVUFBTSxJQUFJLFNBQVMsQ0FBQywyQ0FBMkMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUN6RTtBQUNELE9BQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLGVBQU8sWUFBWSxFQUFDO0FBQ2hELFFBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFPLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNoRSxRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNyRCxNQUNJLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLGVBQU8sY0FBYyxFQUFDO0FBQ3ZELFFBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3RELFFBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxlQUFPLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUMvRCxNQUNHO0FBQ0gsVUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMvQztBQUNELE9BQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0dBQzFCOzs7U0FFYSwwQkFBRTtBQUNmLFVBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztHQUN6Qjs7O1NBRWEsd0JBQUMsV0FBVyxFQUFDO0FBQzFCLE9BQUcsRUFBRSxXQUFXLEtBQUssZUFBTyxZQUFZLElBQUksV0FBVyxLQUFLLGVBQU8sY0FBYyxDQUFBLEFBQUMsRUFBQztBQUNsRixVQUFNLElBQUksU0FBUyxDQUFDLHVGQUF1RixHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQzNIO0FBQ0QsT0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBQztBQUNwQyxXQUFPO0lBQ1A7QUFDRCxPQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUNoQyxPQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0dBQzNDOzs7U0FFYSwwQkFBRTtBQUNmLFVBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztHQUN6Qjs7O1NBRUcsZ0JBQUU7QUFBRSxPQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUFFOzs7U0FDekQsZ0JBQUU7QUFBRSxPQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUFFOzs7U0FDakQscUJBQUU7QUFBRSxVQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7R0FBRTs7Ozs7OztTQUtsRSxzQkFBRTtBQUFFLE9BQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUFFOzs7U0FDekMsd0JBQUU7QUFBRSxPQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7R0FBRTs7O1NBQ2pELHFCQUFFO0FBQUUsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7R0FBRTs7O1FBakhwRCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OzJCQ0hNLGVBQWU7O3VCQUNuQixXQUFXOztzQkFDWixVQUFVOztJQUVsQixTQUFTO0FBQ1YsVUFEQyxTQUFTLEdBQ1I7d0JBREQsU0FBUzs7QUFFcEIsTUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLE1BQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxZQUFZLEdBQUcsZUFBTyxZQUFZLENBQUM7RUFDeEM7O2NBUFcsU0FBUzs7U0FTakIsY0FBQyxNQUFNLEVBQTJHO09BQXpHLE1BQU0seURBQUcsRUFBRTtPQUFFLFFBQVEseURBQUcsR0FBRztPQUFFLGVBQWUseURBQUcsS0FBSztPQUFFLFdBQVcseURBQUcsQ0FBQztPQUFFLFdBQVcseURBQUcsZUFBTyxZQUFZOztBQUNwSCxTQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLE9BQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDMUQsT0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxPQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLFVBQU8sSUFBSSxDQUFDOztBQUVaLFlBQVMsTUFBTSxHQUFFO0FBQ2hCLFFBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQztHQUNEOzs7Ozs7Ozs7O1NBUVEsbUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBMEM7T0FBeEMsUUFBUSx5REFBRyxHQUFHO09BQUUsZUFBZSx5REFBRyxLQUFLOztBQUNoRSxPQUFHLEVBQUUsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxNQUFNLENBQUEsQUFBQyxFQUFDO0FBQzVELFVBQU0sSUFBSSxTQUFTLENBQUMscUNBQXFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDcEU7QUFDRCxPQUFHLEVBQUUsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFBLEFBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFDO0FBQzlDLFVBQU0sSUFBSSxTQUFTLENBQUMsK0RBQStELEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDOUY7QUFDRCxPQUFHLEVBQUUsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssR0FBRyxDQUFBLEFBQUMsRUFBQztBQUMxQyxVQUFNLElBQUksU0FBUyxDQUFDLGtEQUFrRCxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ25GO0FBQ0QsT0FBRyxPQUFPLGVBQWUsS0FBSyxTQUFTLEVBQUM7QUFDdkMsVUFBTSxJQUFJLFNBQVMsQ0FBQyx1REFBdUQsR0FBRyxlQUFlLENBQUMsQ0FBQztJQUMvRjs7QUFFRCxPQUFJLEtBQUssR0FBRyx5QkFBWSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDMUUsT0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFDO0FBQ3pDLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3BDLFNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNsRDtJQUNEOztRQUVJO0FBQ0osU0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQzlCLFNBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3BDLFVBQUksTUFBTSxHQUFHLHNCQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUMzRyxVQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixVQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztNQUM1QztBQUNELFNBQUksQ0FBQyxPQUFPLEdBQUcseUJBQVksaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQy9EO0dBQ0Q7OztTQUVRLHFCQUFFO0FBQ1YsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0dBQ3BCOzs7U0FFYSx3QkFBQyxLQUFLLEVBQUM7QUFDcEIsT0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxHQUFHLENBQUMsRUFBQztBQUN6QyxVQUFNLElBQUksU0FBUyxDQUFDLDJDQUEyQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3pFO0FBQ0QsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQzdDLFFBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDO0FBQ0QsT0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7R0FDMUI7OztTQUVhLDBCQUFFO0FBQ2YsVUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0dBQ3pCOzs7U0FFYSx3QkFBQyxXQUFXLEVBQUM7QUFDMUIsT0FBRyxFQUFFLFdBQVcsS0FBSyxlQUFPLFlBQVksSUFBSSxXQUFXLEtBQUssZUFBTyxjQUFjLENBQUEsQUFBQyxFQUFDO0FBQ2xGLFVBQU0sSUFBSSxTQUFTLENBQUMsdUZBQXVGLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDM0g7QUFDRCxRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDN0MsUUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUM7QUFDRCxPQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztHQUNoQzs7O1NBRWEsMEJBQUU7QUFDZixVQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7R0FDekI7Ozs7Ozs7OztTQU9PLGtCQUFDLE1BQU0sRUFBQztBQUNmLE9BQUcsRUFBRSxNQUFNLFlBQVksS0FBSyxDQUFBLEFBQUMsRUFBQztBQUM3QixVQUFNLElBQUksU0FBUyxDQUFDLDRDQUE0QyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzNFO0FBQ0QsZUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDckMsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQzdDLFNBQUksSUFBSSxHQUFHLHlCQUFZLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4RCxTQUFJLElBQUksR0FBRyx5QkFBWSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDMUUsU0FBRyxJQUFJLEtBQUssSUFBSSxFQUFDO0FBQ2hCLFVBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlDLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQy9CO0tBQ0Q7SUFDRDtBQUNELFVBQU8sTUFBTSxDQUFDOztBQUVkLFlBQVMsWUFBWSxHQUFFO0FBQ3RCLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUM3QyxTQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDO0lBQ0Q7R0FDRDs7O1NBRUssa0JBQUU7QUFDUCxVQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7R0FDdEI7OztTQUVVLHVCQUFFO0FBQ1osVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0dBQ3RCOzs7Ozs7Ozs7O1NBUVMsb0JBQUMsV0FBVyxFQUFDO0FBQ3RCLE9BQUcsRUFBRSxXQUFXLFlBQVksS0FBSyxDQUFBLEFBQUMsRUFBQztBQUNsQyxVQUFNLElBQUksU0FBUyxDQUFDLDZEQUE2RCxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQ2pHO0FBQ0QsY0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixjQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLE9BQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUMxQyxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLFFBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQztBQUN4QixTQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ25DLFdBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ25DLE1BQ0c7QUFDSCxXQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxHQUFHLFdBQVcsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUN2SjtJQUNEO0FBQ0QsVUFBTyxNQUFNLENBQUM7O0FBRWQsWUFBUyxXQUFXLEdBQUU7QUFDckIsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQzdDLFNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDakM7SUFDRDs7QUFFRCxZQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUM7QUFDdkIsV0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUMvQixTQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO0FBQ25CLE9BQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDVjtBQUNELFlBQU8sQ0FBQyxDQUFDO0tBQ1QsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQO0dBQ0Q7OztRQTNLVyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OzRCQ0pLLGdCQUFnQjs7c0JBQ3RCLFVBQVU7O0lBRWxCLGdCQUFnQjtBQUNqQixVQURDLGdCQUFnQixHQUNmO3dCQURELGdCQUFnQjs7QUFFM0IsTUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUM3QixNQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztFQUMxQjs7Y0FOVyxnQkFBZ0I7O1NBUXhCLGNBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDO0FBQzdFLFNBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVGLE9BQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN2QixVQUFPLElBQUksQ0FBQzs7QUFFWixZQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUM7QUFDekYsUUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTFELFFBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFFBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ25ELFFBQUksQ0FBQyxhQUFhLEdBQUcsZ0NBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBRTlHLFFBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDM0QsUUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O0FBRS9ELFFBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakM7R0FDRDs7Ozs7Ozs7OztTQVFRLHFCQUFnRztPQUEvRixNQUFNLHlEQUFHLFdBQVcsQ0FBQyxzQkFBc0I7T0FBRSxNQUFNLHlEQUFHLEVBQUU7T0FBRSxRQUFRLHlEQUFHLEdBQUc7T0FBRSxZQUFZLHlEQUFHLEtBQUs7O0FBQ3ZHLE9BQUcsRUFBRSxNQUFNLFlBQVksS0FBSyxDQUFBLEFBQUMsRUFBQztBQUM3QixVQUFNLElBQUksU0FBUyxDQUFDLDRDQUE0QyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzNFO0FBQ0QsT0FBRyxFQUFFLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQSxBQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBQztBQUM5QyxVQUFNLElBQUksU0FBUyxDQUFDLCtEQUErRCxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzlGO0FBQ0QsT0FBRyxFQUFFLFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLEdBQUcsQ0FBQSxBQUFDLEVBQUM7QUFDMUMsVUFBTSxJQUFJLFNBQVMsQ0FBQyxrREFBa0QsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUNuRjtBQUNELE9BQUcsT0FBTyxZQUFZLEtBQUssU0FBUyxFQUFDO0FBQ3BDLFVBQU0sSUFBSSxTQUFTLENBQUMsb0RBQW9ELEdBQUcsWUFBWSxDQUFDLENBQUM7SUFDekY7QUFDRCxPQUFHLEVBQUUsT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFBLEFBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFDO0FBQ3hELFVBQU0sSUFBSSxTQUFTLENBQUMscUVBQXFFLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDekc7QUFDRCxPQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNyRSxPQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7R0FDdkI7OztTQUVjLDJCQUFFO0FBQ2hCLE9BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDNUMsT0FBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDdkMsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDckMsUUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLGNBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDakQsWUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsWUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsY0FBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxRQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hEO0dBQ0Q7OztTQUVPLGtCQUFDLE1BQU0sRUFBQztBQUNmLFVBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDM0M7OztTQUVhLHdCQUFDLEtBQUssRUFBQztBQUNwQixPQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUN6Qzs7O1NBRWlCLDhCQUFFO0FBQ25CLFVBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0dBQy9DOzs7U0FFUyxvQkFBQyxHQUFHLEVBQUM7QUFDZCxVQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQzFDOzs7U0FFYSx3QkFBQyxXQUFXLEVBQUM7QUFDMUIsT0FBRyxFQUFFLFdBQVcsS0FBSyxlQUFPLFlBQVksSUFBSSxXQUFXLEtBQUssZUFBTyxjQUFjLENBQUEsQUFBQyxFQUFDO0FBQ2xGLFVBQU0sSUFBSSxTQUFTLENBQUMsMkdBQTJHLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDL0k7QUFDRCxPQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFPLFlBQVksQ0FBQyxDQUFDO0FBQzVELE9BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQU8sY0FBYyxDQUFDLENBQUM7QUFDOUQsT0FBSSxTQUFTLEdBQUcsV0FBVyxLQUFLLGVBQU8sWUFBWSxHQUFHLGVBQU8sWUFBWSxHQUFHLGVBQU8sY0FBYyxDQUFDO0FBQ2xHLE9BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLE9BQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQy9DOzs7U0FFYSwwQkFBRTtBQUNmLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGVBQU8sWUFBWSxHQUMvRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxlQUFPLGNBQWMsR0FDOUUsQ0FBQyxDQUFDLENBQUM7QUFDUixVQUFPLEdBQUcsQ0FBQztHQUNYOzs7UUFuR1csZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7O0lDSGhCLFdBQVc7VUFBWCxXQUFXO3dCQUFYLFdBQVc7OztjQUFYLFdBQVc7Ozs7Ozs7O1NBTUMsMkJBQUMsSUFBSSxFQUFrQjtPQUFoQixTQUFTLHlEQUFHLEdBQUc7O0FBQzdDLE9BQUcsU0FBUyxLQUFLLEdBQUcsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFDO0FBQ3pDLFVBQU0sSUFBSSxTQUFTLENBQUMsd0RBQXdELEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDMUY7QUFDRCxPQUFHLElBQUksWUFBWSxLQUFLLEVBQUM7QUFDeEIsV0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLE1BQ0c7QUFDSCxXQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEM7O0FBRUQsWUFBUyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQztBQUN0QyxRQUFHO0FBQ0YsU0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3BDLFlBQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO01BQ2hEO0FBQ0QsWUFBTyxNQUFNLENBQUM7S0FDZCxDQUNELE9BQU0sQ0FBQyxFQUFDO0FBQ1AsV0FBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztLQUN4QztJQUNEOztBQUVELFlBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUM7QUFDdEMsUUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxRQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQzNDLFFBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksWUFBWSxFQUFDO0FBQ3RDLFlBQU8sTUFBTSxDQUFDO0tBQ2QsTUFDSSxJQUFHLFNBQVMsS0FBSyxHQUFHLEVBQUM7QUFDekIsVUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDaEUsVUFBRyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFDO0FBQ2xELGNBQU8sV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzdDO01BQ0Q7S0FDRCxNQUNJLElBQUcsU0FBUyxLQUFLLEdBQUcsRUFBQztBQUN6QixVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNqRSxVQUFHLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUM7QUFDbkQsY0FBTyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDNUM7TUFDRDtLQUNELE1BQ0c7QUFDSCxXQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0tBQzFEO0FBQ0QsVUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ25FO0dBQ0Q7Ozs7Ozs7OztTQU9lLG1CQUFDLElBQUksRUFBQztBQUNyQixPQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFDO0FBQ3JELFdBQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQ0ksSUFBRyxJQUFJLFlBQVksS0FBSyxFQUFDO0FBQzdCLFdBQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE1BQ0k7QUFDSixVQUFNLElBQUksU0FBUyxDQUFDLDZEQUE2RCxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzFGOztBQUVELFlBQVMsY0FBYyxDQUFDLEtBQUssRUFBQztBQUM3QixRQUFHO0FBQ0YsU0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3BDLFlBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdkM7QUFDRCxZQUFPLE1BQU0sQ0FBQztLQUNkLENBQ0QsT0FBTSxDQUFDLEVBQUM7QUFDUCxXQUFNLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0Q7O0FBRUQsWUFBUyxlQUFlLENBQUMsSUFBSSxFQUFDO0FBQzdCLFFBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hELFFBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RELGVBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNsRCxjQUFVLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDL0MsUUFBRyxXQUFXLElBQUksVUFBVSxFQUFDO0FBQzVCLFNBQUksTUFBTSxHQUFHLEFBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFJLFdBQVcsR0FBRyxVQUFVLENBQUM7QUFDakYsV0FBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELFdBQU0sR0FBRyxBQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUksR0FBRyxHQUMzQixBQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUksR0FBRyxHQUN2QixBQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUksR0FBRyxHQUN2QixBQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUksR0FBRyxHQUN2QixNQUFNLENBQUM7QUFDWixZQUFPLE1BQU0sQ0FBQztLQUNkLE1BQ0c7QUFDSCxXQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsZ0NBQWdDLENBQUMsQ0FBQztLQUNwRTtJQUNEO0dBQ0Q7Ozs7Ozs7Ozs7O1NBU1ksa0JBQW9FO09BQW5FLFFBQVEseURBQUcsR0FBRztPQUFFLE1BQU0seURBQUcsQ0FBQztPQUFFLFFBQVEseURBQUcsR0FBRztPQUFFLGVBQWUseURBQUcsSUFBSTs7QUFDL0UsT0FBRyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLFlBQVksTUFBTSxDQUFBLEtBQzNELFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLEdBQUcsQ0FBQSxBQUFDLEtBQ3JDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFBLEFBQUMsSUFDekMsT0FBTyxlQUFlLEtBQUssU0FBUyxBQUFDLEVBQUM7QUFDeEMsWUFBUSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0QsUUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLFFBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFHLFFBQVEsS0FBSyxHQUFHLEVBQUM7QUFDbkIsZUFBVSxHQUFHLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEUsVUFBSSxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFDO0FBQ3JFLFlBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDckU7S0FDRCxNQUNJLElBQUcsUUFBUSxLQUFLLEdBQUcsRUFBQztBQUN4QixlQUFVLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRSxVQUFJLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUM7QUFDckUsWUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNwRTtLQUNEO0FBQ0QsV0FBTyxlQUFlLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsTUFDSTtBQUNKLFVBQU0sSUFBSSxTQUFTLENBQUMsK0NBQStDLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ2xKO0FBQ0QsU0FBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQzs7QUFFM0csWUFBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFDO0FBQ3RDLFNBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM3QixXQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQjtHQUNEOzs7T0FFd0IsZUFBRztBQUFFLFVBQU8sZUFBYztLQUFDO0dBQUU7OztPQUM5QixlQUFHO0FBQUUsVUFBTyxlQUFjO0tBQUM7R0FBRTs7O09BRXBCLGVBQUU7QUFBRSxVQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUFFOzs7T0FDaEYsZUFBRTtBQUFFLFVBQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQUU7OztPQUU3RSxlQUFFO0FBQUUsVUFBTyxDQUFDLENBQUM7R0FBRTs7O09BQ2hCLGVBQUU7QUFBRSxVQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztHQUFFOzs7UUExSmpFLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDQUUsZUFBZTs7SUFFNUIsSUFBSTtBQUNMLFVBREMsSUFBSSxHQUNIO3dCQURELElBQUk7O0FBRWYsTUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7RUFDcEI7O2NBSFcsSUFBSTs7U0FLWixjQUFDLElBQUksRUFBaUI7T0FBZixRQUFRLHlEQUFHLEdBQUc7O0FBQ3hCLE9BQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7O1NBTVUscUJBQUMsSUFBSSxFQUFrQjtPQUFoQixRQUFRLHlEQUFHLEdBQUc7O0FBQy9CLE9BQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksWUFBWSxNQUFNLEVBQUM7QUFDckQsUUFBSSxDQUFDLFNBQVMsR0FBRyx5QkFBWSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0QsTUFDSTtBQUNKLFVBQU0sSUFBSSxTQUFTLENBQUMsMkNBQTJDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEU7R0FDRDs7O1NBRVUsdUJBQUU7QUFBRSxVQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7R0FBRTs7O1FBdkIzQixJQUFJOzs7Ozs7OzsyQkNGUyxlQUFlOztvQkFDdEIsUUFBUTs7aUNBQ0sscUJBQXFCOzt1QkFDL0IsV0FBVzs7eUJBQ1QsYUFBYTs7NEJBQ1YsZ0JBQWdCOztnQ0FDWixvQkFBb0I7O3NCQUM5QixVQUFVOztBQUUvQixDQUFDLFVBQVMsR0FBRyxFQUFDO0FBQ2IsYUFBWSxDQUFDOztBQUViLEtBQUksRUFBRSxHQUFHO0FBQ1IsYUFBVywwQkFBYTtBQUN4QixNQUFJLFlBQU07QUFDVixTQUFPLGtCQUFTO0FBQ2hCLG1CQUFpQixzQ0FBbUI7QUFDcEMsY0FBWSw0QkFBYztBQUMxQixXQUFTLHNCQUFXO0FBQ3BCLGtCQUFnQixvQ0FBa0I7QUFDbEMsUUFBTSxnQkFBUTtFQUNkLENBQUE7O0FBRUQsSUFBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FDWixDQUFBLENBQUUsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG5cdEBhYnN0cmFjdFxuKi9cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdEZyZXRib2FyZHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRpZih0aGlzLmNvbnN0cnVjdG9yID09PSBBYnN0cmFjdEZyZXRib2FyZCl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJdCdzIGFuIGFic3RyYWN0IGNsYXNzIHNob3VsZCcgYmUgaW5zdGFudGlhdGVkXCIpO1xuXHRcdH1cblx0XHR0aGlzLl90dW5pbmcgPSBbXTtcblx0XHR0aGlzLl9zdHJpbmdzID0gW107XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwib3ZlcndyaXR0ZW4gaW5pdCBvciBHVEZPXCIpO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHR1bmluZyAtIGFycmF5IG9mIHN0cmluZy4gRWFjaCBlbGVtZW50IHNob3VsZCBwcmVzZW50IGluIGZvcm1hdCBsaWtlIHRoaXMgXCJFI1wiLCBcImNcIiwgXCJkYlwiLi4uXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHRoZSBhcnJheSBzaG91bGQgZnVuY3Rpb24gcmV0dXJuLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIHNob3VsZCBiZSBlaXRoZXIgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtib29sZWFufSBpbmNsdWRlU3RhcnQgLSB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlIHN0YXJ0IGtleS5cblx0Ki9cblx0c2V0VHVuaW5nKHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlU3RhcnQgPSBmYWxzZSwgbm90ZVR5cGUgPSBOb3RlKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvdmVyd3JpdHRlbiBzZXRUdW5pbmcgb3IgR1RGT1wiKTtcblx0fVxuXG5cdGdldFR1bmluZygpe1xuXHRcdHJldHVybiB0aGlzLl90dW5pbmc7XG5cdH1cblxuXHRnZXRTdHJpbmdzKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3N0cmluZ3M7XG5cdH1cbn1cbiIsImV4cG9ydCBsZXQgQ29uZmlnID0ge1xuXHRGUkVUX0hFSUdIVF9ERUZBVUxUOiBcIjgwXCIsXG5cdEZSRVRfV0lEVEhfREVEQVVMVDogXCI0MFwiLFxuXHRPUklfVkVSVElDQUw6IFwidmVydGljYWxcIixcblx0T1JJX0hPUklaT05UQUw6IFwiaG9yaXpvbnRhbFwiXG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtBYnN0cmFjdEZyZXRib2FyZH0gZnJvbSBcIi4vQWJzdHJhY3RGcmV0Ym9hcmRcIjtcbmltcG9ydCB7RWxlU3RyaW5nfSBmcm9tIFwiLi9FbGVTdHJpbmdcIjtcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9Db25maWdcIjtcblxuZXhwb3J0IGNsYXNzIEVsZUZyZXRib2FyZCBleHRlbmRzIEFic3RyYWN0RnJldGJvYXJke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdWlGcmV0Ym9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX2VsZVN0cmluZ3MgPSBbXTsgLy8gYXJyYXkgb2YgZWxlU3RyaW5nXG5cdFx0dGhpcy5fbGFzdExlbmd0aCA9IC0xO1xuXHRcdHRoaXMuX2N1cnJlbnROb3RhdGlvbiA9IFwiXCI7XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMO1xuXHRcdHRoaXMuX3N0YXJ0R2F1Z2UgPSA2O1xuXHR9XG5cblx0aW5pdCh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gZmFsc2UsIHN0YXJ0R2F1Z2UgPSAxMiwgb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMKXtcblx0XHRpbml0VUkuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0dGhpcy5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0dGhpcy5zZXRTdHJpbmdHYXVnZShzdGFydEdhdWdlKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGluaXRVSSgpe1xuXHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuY2xhc3NMaXN0LmFkZChcImZhLWZyZXRib2FyZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuZSAtIGluIHdoYXQga2V5IHdlIGFyZSB0dW5pbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgcmVzdWx0IGJlLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGluIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVPcGVuRnJldCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVPcGVuRnJldCA9IGZhbHNlKXtcblx0XHRpZighKHR1bmluZyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHR1bmluZyBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0dW5pbmcpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIpICYmIGxlbmd0aCA8IDEpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAwOiBcIiArIGxlbmd0aCk7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8ICBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJub3RhdGlvbiBzaG91bGQgZWl0aGVyIGJlICcjJyBvciAnYicgaW4gc3RyaW5nIHR5cGU6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHRpZih0eXBlb2YgaW5jbHVkZU9wZW5GcmV0ICE9PSBcImJvb2xlYW5cIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGluY2x1ZGVPcGVuRnJldCBzaG91bGQgYmUgdHlwZSBvZiBib29sZWFuOiBcIiArIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0fVxuXHRcdC8vIGlmIHBhcmFtZXRlciBsZW5ndGggaXMgZXF1YWwgdG8gdGhlIGxlbmd0aCBwYXNzZWQgbGFzdCB0aW1lLCB0aGVuIG9ubHkgdXBkYXRlcyB0aGUgdGV4dCBpbnNpZGUgdGhlc2Ugbm90ZXMuXG5cdFx0aWYoKHR1bmluZy5sZW5ndGggPT09IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoKSAmJlxuXHRcdFx0XHQodGhpcy5fbGFzdExlbmd0aCA9PT0gbGVuZ3RoKSl7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdHVuaW5nLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dGhpcy5fZWxlU3RyaW5nc1tpXS5zZXRUdW5pbmcodHVuaW5nW2ldLCBsZW5ndGgsIG5vdGF0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gaWYgbm90IHRoZW4gcmVjcmVhdGUgZXZlcnl0aGluZy5cblx0XHRlbHNle1xuXHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdHRoaXMuX2VsZVN0cmluZ3MgPSBbXTtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0dW5pbmcubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRsZXQgcmVzdWx0ID0gbmV3IEVsZVN0cmluZygpLmluaXQodHVuaW5nW2ldLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlT3BlbkZyZXQsIHRoaXMuZ2V0U3RhcnRHYXVnZSgpIC0gaSwgdGhpcy5nZXRPcmllbnRhdGlvbigpKTtcblx0XHRcdFx0dGhpcy5fZWxlU3RyaW5ncy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMuX3VpRnJldGJvYXJkLmFwcGVuZENoaWxkKHJlc3VsdC5nZXRFbGUoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX2xhc3RMZW5ndGggPSBsZW5ndGg7XG5cdFx0dGhpcy5fY3VycmVudE5vdGF0aW9uID0gbm90YXRpb247XG5cdH1cblxuXHQvKipcblx0XHR0byBtYWtlIHNwZWNpZmllZCBrZXlzIHZpc2libGUuXG5cdFx0QHBhcmFtIHthcnJheX0gdGFyZ2V0IC0gbWFrZSB0YXJnZXQga2V5cyB2aXNpYmxlLiBmb3JtYXQ6IFt7a2V5OiBcIkMjXCIsIGNvbG9yOiBcInllbGxvd1wifSwge2tleTogXCJEI1wiLCBjb2xvcjogXCJibHVlXCJ9LCAuLi5dXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJuIHdoYXQga2V5IHdhcyBiZWluZyBtYXJrZWQuXG5cdCovXG5cdG1hcmtLZXlzKHRhcmdldCl7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRsZXQgciA9IHRoaXMuX2VsZVN0cmluZ3NbaV0ubWFya0tleXModGFyZ2V0KTtcblx0XHRcdHJlc3VsdC5wdXNoKHIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtudW1iZXJ9IHN0YXJ0R2F1Z2UgLSBob3cgdGhpY2sgaXMgdGhlIGxlZnRlc3Qgc3RyaW5nLiBUaGUgZm9sbG93aW5nIHN0cmluZ3MnIHRoaWNrbmVzcyB3aWxsIGJlIGluIGRlc2NlbmRlZCBvcmRlci5cblx0Ki9cblx0c2V0U3RyaW5nR2F1Z2Uoc3RhcnRHYXVnZSwgb3JpZW50YXRpb24pe1xuXHRcdGlmKHR5cGVvZiBzdGFydEdhdWdlICE9PSBcIm51bWJlclwiIHx8IHN0YXJ0R2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgc3RhcnRHYXVnZSBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIC0xOlwiICsgc3RhcnRHYXVnZSk7XG5cdFx0fVxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2VsZVN0cmluZ3NbaV0uc2V0U3RyaW5nR2F1Z2Uoc3RhcnRHYXVnZSAtIGkpO1xuXHRcdH1cblx0XHR0aGlzLl9zdGFydEdhdWdlID0gc3RhcnRHYXVnZTtcblx0fVxuXG5cdGdldFN0cmluZ0dhdWdlKCl7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuX2VsZVN0cmluZ3NbaV0uZ2V0U3RyaW5nR2F1Z2UoKSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRTdGFydEdhdWdlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXJ0R2F1Z2U7XG5cdH1cblxuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw6IFwiICsgb3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLl9lbGVTdHJpbmdzW2ldLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR9XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblx0fVxuXG5cdGdldE9yaWVudGF0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuXHR9XG5cblx0Z2V0RWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpRnJldGJvYXJkO1xuXHR9XG5cblx0Z2V0U3RyaW5ncygpe1xuXHRcdHJldHVybiB0aGlzLl9lbGVTdHJpbmdzO1xuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0bGV0IHR1bmluZyA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHR1bmluZy5wdXNoKHRoaXMuX2VsZVN0cmluZ3NbaV0uZ2V0VHVuaW5nKCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHVuaW5nO1xuXHR9XG5cblx0Z2V0Q3VycmVudE5vdGF0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnROb3RhdGlvbjtcblx0fVxuXG5cdG1hcmtJbmxheXMoYXJyKXtcblx0XHRsZXQgbWlkID0gdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGggLyAyIC0gMTtcblx0XHRtaWQgPSBtaWQgPCAwID8gMCA6IG1pZDtcblx0XHRyZXR1cm4gdGhpcy5fZWxlU3RyaW5nc1ttaWRdLm1hcmtJbmxheXMoYXJyKTtcblx0fVxufVxuIiwiaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9Ob3RlXCI7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vQ29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBFbGVOb3RlIGV4dGVuZHMgTm90ZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fdWlOb3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRoaXMuX3VpU3RyaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aU5vdGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS1ub3RlXCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHQuY2xhc3NMaXN0LmFkZChcImZhLW5vdGUtdGV4dFwiKTtcblx0XHR0aGlzLl91aVN0cmluZy5jbGFzc0xpc3QuYWRkKFwiZmEtc3RyaW5nLWltYWdlXCIpO1xuXHRcdHRoaXMuX3VpTm90ZS5jbGFzc0xpc3QuYWRkKFwiZmEtZnJldFwiKTtcblxuXHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fdWlOb3RlVGV4dCk7XG5cdFx0dGhpcy5fdWlOb3RlLmFwcGVuZENoaWxkKHRoaXMuX3VpU3RyaW5nKTtcblx0XHR0aGlzLl91aU5vdGUuYXBwZW5kQ2hpbGQodGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lcik7XG5cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IDM7XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGUgLSBmb3JtYXQgXCJkI1wiLCBcIkVcIiwgXCJHI1wiLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGVpdGhlciBiZSBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge3N0cmluZ30gYmdDb2xvciAtIGNvbG9yIGZvcm1hdCBpbiBzdHJpbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IHN0cmluZ0dhdWdlIC0gaG93IHRoaWNrIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQsIHVuaXQgaW4gcHguXG5cdFx0QHBhcmFtIHtudW1iZXJ9IG9yaWVudGF0aW9uIC0gd2hpY2ggb3JpZW50YXRpb24gdGhlIHN0cmluZyB3aWxsIGJlIGRpc3BsYXllZC4gU2hvdWxkIGJlIGVpdGhlciBDb25maWcuT1JJX1ZFUlRJQ0FMIG9yIENvbmZpZy5PUklfSE9SSVpPTlRBTDtcblx0Ki9cblx0aW5pdChub3RlLCBub3RhdGlvbiA9IFwiI1wiLCBiZ0NvbG9yID0gXCJ3aGl0ZVwiLCBzdHJpbmdHYXVnZSA9IDEyLCBvcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUwpe1xuXHRcdHN1cGVyLmluaXQobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0Tm90ZU5hbWUobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0QmdDb2xvcihiZ0NvbG9yKTtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKHN0cmluZ0dhdWdlKTtcblx0XHR0aGlzLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLmhpZGUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEVsZSgpe1xuXHRcdHJldHVybiB0aGlzLl91aU5vdGU7XG5cdH1cblxuXHRzZXROb3RlTmFtZShub3RlTmFtZSwgbm90YXRpb24pe1xuXHRcdGlmKHR5cGVvZiBub3RlTmFtZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlTmFtZSBpbnN0YW5jZW9mIFN0cmluZyB8fCBub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT0gXCJiXCIpe1xuXHRcdFx0c3VwZXIuc2V0Tm90ZU5hbWUobm90ZU5hbWUsIG5vdGF0aW9uKTtcblx0XHRcdHRoaXMuX3VpTm90ZVRleHQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdHRoaXMuX3VpTm90ZVRleHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5nZXROb3RlTmFtZSgpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RlTmFtZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZU5hbWUpO1xuXHRcdH1cblx0fVxuXG5cdHNldEJnQ29sb3IoYmdDb2xvcil7XG5cdFx0aWYodHlwZW9mIGJnQ29sb3IgPT09IFwic3RyaW5nXCIgfHwgYmdDb2xvciBpbnN0YW5jZW9mIFN0cmluZyl7XG5cdFx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBiZ0NvbG9yIHNob3VsZCBiZSB0eXBlIG9mIHN0cmluZzogXCIgKyBiZ0NvbG9yKTtcblx0XHR9XG5cdH1cblxuXHRnZXRCZ0NvbG9yKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXHR9XG5cblx0c2V0U3RyaW5nR2F1Z2UoZ2F1Z2Upe1xuXHRcdGlmKHR5cGVvZiBnYXVnZSAhPT0gXCJudW1iZXJcIiB8fCBnYXVnZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBnYXVnZSBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIDA6XCIgKyBnYXVnZSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMuZ2V0T3JpZW50YXRpb24oKSA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCl7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5zdHlsZS5oZWlnaHQgPSBDb25maWcuRlJFVF9IRUlHSFRfREVGQVVMVCArIFwicHhcIjtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLnN0eWxlLndpZHRoID0gZ2F1Z2UudG9TdHJpbmcoKSArIFwicHhcIjtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmdldE9yaWVudGF0aW9uKCkgPT09IENvbmZpZy5PUklfSE9SSVpPTlRBTCl7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5zdHlsZS5oZWlnaHQgPSBnYXVnZS50b1N0cmluZygpICsgXCJweFwiO1xuXHRcdFx0dGhpcy5fdWlTdHJpbmcuc3R5bGUud2lkdGggPSBDb25maWcuRlJFVF9IRUlHSFRfREVGQVVMVCArIFwicHhcIjtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIndoYXRzIHRoZSBzb3JjZXJ5PyBcIiArIGdhdWdlKTtcblx0XHR9XG5cdFx0dGhpcy5fc3RyaW5nR2F1Z2UgPSBnYXVnZTtcblx0fVxuXG5cdGdldFN0cmluZ0dhdWdlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3N0cmluZ0dhdWdlO1xuXHR9XG5cblx0c2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pe1xuXHRcdGlmKCEob3JpZW50YXRpb24gPT09IENvbmZpZy5PUklfVkVSVElDQUwgfHwgb3JpZW50YXRpb24gPT09IENvbmZpZy5PUklfSE9SSVpPTlRBTCkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBvcmllbnRhdGlvbiBzaG91bGQgYmUgZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ29uZmlnLk9SSV9IT1JJWk9OVEFMOiBcIiArIG9yaWVudGF0aW9uKTtcblx0XHR9XG5cdFx0aWYodGhpcy5fb3JpZW50YXRpb24gPT09IG9yaWVudGF0aW9uKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKHRoaXMuZ2V0U3RyaW5nR2F1Z2UoKSk7XG5cdH1cblxuXHRnZXRPcmllbnRhdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcblx0fVxuXG5cdHNob3coKXsgdGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTsgfVxuXHRoaWRlKCl7IHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7IH1cblx0aXNWaXNpYmxlKCl7IHJldHVybiAhdGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpOyB9XG5cblx0Lypcblx0XHR0aGUgXCJkb3RcIiBvbiAzLDUsNyw5LDEyLi4uIGd1aXRhciBmcmV0c1xuXHQqL1xuXHRtYXJrSW5sYXlzKCl7IHRoaXMuX3VpTm90ZS5jbGFzc0xpc3QuYWRkKFwiaW5sYXlzXCIpOyB9XG5cdHJlbW92ZUlubGF5cygpeyB0aGlzLl91aU5vdGUuY2xhc3NMaXN0LnJlbW92ZShcImlubGF5c1wiKTsgfVxuXHRoYXNJbmxheXMoKXsgcmV0dXJuIHRoaXMuX3VpTm90ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJpbmxheXNcIik7IH07XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtFbGVOb3RlfSBmcm9tIFwiLi9FbGVOb3RlXCI7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vQ29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBFbGVTdHJpbmd7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fdWlTdHJpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cdFx0dGhpcy5fZWxlTm90ZXMgPSBbXTsgLy8gYXJyYXkgb2YgRWxlTm90ZVxuXHRcdHRoaXMuX3R1bmluZyA9IFwiXCI7XG5cdFx0dGhpcy5fc3RyaW5nR2F1Z2UgPSAwO1xuXHRcdHRoaXMuX29yaWVudGF0aW9uID0gQ29uZmlnLk9SSV9WRVJUSUNBTDtcblx0fVxuXG5cdGluaXQodHVuaW5nLCBsZW5ndGggPSAxMiwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gZmFsc2UsIHN0cmluZ0dhdWdlID0gNiwgb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMKXtcblx0XHRpbml0VUkuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0dGhpcy5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0dGhpcy5zZXRTdHJpbmdHYXVnZShzdHJpbmdHYXVnZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRmdW5jdGlvbiBpbml0VUkoKXtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLmNsYXNzTGlzdC5hZGQoXCJmYS1zdHJpbmdcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHR1bmluZyAtIGluIHdoYXQga2V5IHdlIGFyZSB0dW5pbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgcmVzdWx0IGJlLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGluIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVPcGVuRnJldCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVPcGVuRnJldCA9IGZhbHNlKXtcblx0XHRpZighKHR5cGVvZiB0dW5pbmcgPT09IFwic3RyaW5nXCIgfHwgdHVuaW5nIGluc3RhbmNlb2YgU3RyaW5nKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHR1bmluZyBzaG91bGQgYmUgc3RyaW5nOiBcIiArIHR1bmluZyk7XG5cdFx0fVxuXHRcdGlmKCEodHlwZW9mIGxlbmd0aCAhPT0gXCJudW1iZXJcIikgJiYgbGVuZ3RoIDwgMSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgd2hpY2ggaXMgZ3JlYXRlciB0aGFuIDA6IFwiICsgbGVuZ3RoKTtcblx0XHR9XG5cdFx0aWYoIShub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT09IFwiYlwiKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG5vdGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgJyMnIG9yICdiJzogXCIgKyBub3RhdGlvbik7XG5cdFx0fVxuXHRcdGlmKHR5cGVvZiBpbmNsdWRlT3BlbkZyZXQgIT09IFwiYm9vbGVhblwiKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgaW5jbHVkZU9wZW5GcmV0IHNob3VsZCBiZSB0eXBlIG9mIGJvb2xlYW46IFwiICsgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR9XG5cdFx0Ly8gaWYgcGFyYW1ldGVyIGxlbmd0aCBpcyBlcXVhbCB0byB0aGUgbGVuZ3RoIHBhc3NlZCBsYXN0IHRpbWUsIHRoZW4gb25seSB1cGRhdGVzIHRoZSB0ZXh0IGluc2lkZSB0aGVzZSBub3Rlcy5cblx0XHRsZXQgbm90ZXMgPSBNdXNpY1RoZW9yeS50dW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlT3BlbkZyZXQpO1xuXHRcdGlmKHRoaXMuX2VsZU5vdGVzLmxlbmd0aCA9PT0gbm90ZXMubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2ldLnNldE5vdGVOYW1lKG5vdGVzW2ldLCBub3RhdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIGlmIG5vdCB0aGVuIHJlY3JlYXRlIGV2ZXJ5dGhpbmcuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fZWxlTm90ZXMgPSBbXTtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlTm90ZSgpLmluaXQobm90ZXNbaV0sIG5vdGF0aW9uLCBcIndoaXRlXCIsIHRoaXMuZ2V0U3RyaW5nR2F1Z2UoKSwgdGhpcy5nZXRPcmllbnRhdGlvbigpKTtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR0aGlzLl91aVN0cmluZy5hcHBlbmRDaGlsZChyZXN1bHQuZ2V0RWxlKCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fdHVuaW5nID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodHVuaW5nLCBub3RhdGlvbik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3R1bmluZztcblx0fVxuXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHRpZih0eXBlb2YgZ2F1Z2UgIT09IFwibnVtYmVyXCIgfHwgZ2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgZ2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwOlwiICsgZ2F1Z2UpO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0U3RyaW5nR2F1Z2UoZ2F1Z2UpO1xuXHRcdH1cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IGdhdWdlO1xuXHR9XG5cblx0Z2V0U3RyaW5nR2F1Z2UoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RyaW5nR2F1Z2U7XG5cdH1cblxuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw6IFwiICsgb3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXHR9XG5cblx0Z2V0T3JpZW50YXRpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG5cdH1cblxuXHQvKipcblx0XHR0byBtYWtlIHNwZWNpZmllZCBrZXlzIHZpc2libGUuXG5cdFx0QHBhcmFtIHthcnJheX0gdGFyZ2V0IC0gbWFrZSB0YXJnZXQga2V5cyB2aXNpYmxlLiBmb3JtYXQ6IFt7a2V5OiBcIkMjXCIsIGNvbG9yOiBcInllbGxvd1wifSwge2tleTogXCJEI1wiLCBjb2xvcjogXCJibHVlXCJ9LCAuLi5dXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJuIHdoYXQga2V5IHdhcyBiZWluZyBtYXJrZWQuXG5cdCovXG5cdG1hcmtLZXlzKHRhcmdldCl7XG5cdFx0aWYoISh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0YXJnZXQgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXk6IFwiICsgdGFyZ2V0KTtcblx0XHR9XG5cdFx0cmVzZXREaXNwbGF5LmNhbGwodGhpcyk7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0YXJnZXQubGVuZ3RoOyBpKyspe1xuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMuX2VsZU5vdGVzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0bGV0IGtleTEgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbCh0YXJnZXRbaV0ua2V5KTtcblx0XHRcdFx0bGV0IGtleTIgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbCh0aGlzLl9lbGVOb3Rlc1tqXS5nZXROb3RlTmFtZSgpKTtcblx0XHRcdFx0aWYoa2V5MSA9PT0ga2V5Mil7XG5cdFx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbal0uc2hvdygpO1xuXHRcdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2pdLnNldEJnQ29sb3IodGFyZ2V0W2ldLmNvbG9yKTtcblx0XHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLl9lbGVOb3Rlc1tqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdGZ1bmN0aW9uIHJlc2V0RGlzcGxheSgpe1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZU5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uaGlkZSgpO1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5zZXRCZ0NvbG9yKFwid2hpdGVcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0RWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpU3RyaW5nO1xuXHR9XG5cblx0Z2V0RWxlTm90ZXMoKXtcblx0XHRyZXR1cm4gdGhpcy5fZWxlTm90ZXM7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXRGcmV0cyAtIGluZGljYXRlcyB3aGljaCBmcmV0cyB5b3Ugd2FudCB0byBtYXJrIGlubGF5cy4gV2lsbCB0aHJvdyBlcnJvciBpZiB0YXJnZXQgZnJldCBkb2Vzbid0IGV4aXN0LlxuXHRcdEZvciBzaW1wbGljaXR5LCB1c2UgaHVtYW4gaW5kZXggY29udmVudGlvbiBvbiBhcnJheSwgZG9uJ3QgdXNlIGNvbXB1dGVyIGZpZWxkIGNvbnZlbnRpb24uIEZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCB0byBtYXJrIGluYWx5c1xuXHRcdG9uIGZyZXQgMSwgMywgNSwgcGFzcyBbMSwgMywgNV0sIGRvbid0IHRyeSBbMCwgMiwgNF0uXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJucyBlbGVtZW50cyB3aGljaCB3ZXJlIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0lubGF5cyh0YXJnZXRGcmV0cyl7XG5cdFx0aWYoISh0YXJnZXRGcmV0cyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHRhcmdldEZyZXRzIHNob3VsZCBiZSB0eXBlIG9mIGFycmF5IHdpdGggbnVtYmVyOiBcIiArIHRhcmdldEZyZXRzKTtcblx0XHR9XG5cdFx0Y2xlYXJJbmxheXMuY2FsbCh0aGlzKTtcblx0XHR0YXJnZXRGcmV0cyA9IGZpbmRVbmlxdWUodGFyZ2V0RnJldHMpO1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGFyZ2V0RnJldHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0bGV0IGluZGV4ID0gdGFyZ2V0RnJldHNbaV0gLSAxO1xuXHRcdFx0aWYodGhpcy5fZWxlTm90ZXNbaW5kZXhdKXtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaW5kZXhdLm1hcmtJbmxheXMoKTtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5fZWxlTm90ZXNbaW5kZXhdKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRhcmdldCBmcmV0IGRvZXNuJ3QgZXhpc3QuIHRhcmdldEZyZXRzOiBcIiArIHRhcmdldEZyZXRzICsgXCIsIGZyZXQgbGVuZ3RoOiBcIiArIHRoaXMuX2VsZU5vdGVzLmxlbmd0aCArIFwiLCB0cmFuc2xhdGVkIGluZGV4OiBcIiArIGluZGV4KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdGZ1bmN0aW9uIGNsZWFySW5sYXlzKCl7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5yZW1vdmVJbmxheXMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5kVW5pcXVlKGFycil7XG5cdFx0XHRyZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCByKXtcblx0XHRcdFx0aWYoYS5pbmRleE9mKHIpIDwgMCl7XG5cdFx0XHRcdFx0YS5wdXNoKHIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0fSwgW10pO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtFbGVGcmV0Ym9hcmR9IGZyb20gXCIuL0VsZUZyZXRib2FyZFwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRnJldGJvYXJkQXdlc29tZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl9kb21JZCA9IFwiXCI7XG5cdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lciA9IG51bGw7XG5cdFx0dGhpcy5fZWxlRnJldGJvYXJkID0gbnVsbDtcblx0fVxuXG5cdGluaXQodGFyZ2VJZCwgdHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQsIHN0YXJ0R2F1Z2UsIG9yaWVudGF0aW9uKXtcblx0XHRpbml0VUkuY2FsbCh0aGlzLCB0YXJnZUlkLCB0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVTdGFydCwgc3RhcnRHYXVnZSwgb3JpZW50YXRpb24pO1xuXHRcdHRoaXMuX3VwZGF0ZVR1bmluZ1VJKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRmdW5jdGlvbiBpbml0VUkodGFyZ2V0SWQsIHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlLCBvcmllbnRhdGlvbil7XG5cdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG5cblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmEtY29udGFpbmVyXCIpO1xuXHRcdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhLXR1bmluZ1wiKTtcblx0XHRcdHRoaXMuX2VsZUZyZXRib2FyZCA9IG5ldyBFbGVGcmV0Ym9hcmQoKS5pbml0KHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0LCBzdGFydEdhdWdlLCBvcmllbnRhdGlvbik7XG5cblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl91aVR1bmluZ0NvbnRhaW5lcik7XG5cdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlRnJldGJvYXJkLmdldEVsZSgpKTtcblxuXHRcdFx0dGhpcy5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHR1bmUgLSBpbiB3aGF0IGtleSB3ZSBhcmUgdHVuaW5nLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBob3cgbG9uZyBzaG91bGQgdGhlIHJlc3VsdCBiZS5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBpbiBlaXRoZXIgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtib29sZWFufSBpbmNsdWRlU3RhcnQgLSB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlIHN0YXJ0IGtleS5cblx0Ki9cblx0c2V0VHVuaW5nKHR1bmluZyA9IE11c2ljVGhlb3J5LlNUQU5EQVJEX0dVSVRBUl9UVU5JTkcsIGxlbmd0aCA9IDEyLCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlU3RhcnQgPSBmYWxzZSl7XG5cdFx0aWYoISh0dW5pbmcgaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0dW5pbmcgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXk6IFwiICsgdHVuaW5nKTtcblx0XHR9XG5cdFx0aWYoISh0eXBlb2YgbGVuZ3RoICE9PSBcIm51bWJlclwiKSAmJiBsZW5ndGggPCAxKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlciB3aGljaCBpcyBncmVhdGVyIHRoYW4gMDogXCIgKyBsZW5ndGgpO1xuXHRcdH1cblx0XHRpZighKG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIGVpdGhlciAnIycgb3IgJ2InOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdFx0aWYodHlwZW9mIGluY2x1ZGVTdGFydCAhPT0gXCJib29sZWFuXCIpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBpbmNsdWRlU3RhcnQgc2hvdWxkIGJlIHR5cGUgb2YgYm9vbGVhbjogXCIgKyBpbmNsdWRlU3RhcnQpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBzdHJpbmdHYXVnZSAhPT0gXCJudW1iZXJcIikgJiYgc3RyaW5nR2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgc3RyaW5nR2F1Z2Ugc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAtMTogXCIgKyBzdHJpbmdHYXVnZSk7XG5cdFx0fVxuXHRcdHRoaXMuX2VsZUZyZXRib2FyZC5zZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQpO1xuXHRcdHRoaXMuX3VwZGF0ZVR1bmluZ1VJKCk7XG5cdH1cblxuXHRfdXBkYXRlVHVuaW5nVUkoKXtcblx0XHRsZXQgdHVuaW5nID0gdGhpcy5fZWxlRnJldGJvYXJkLmdldFR1bmluZygpO1xuXHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHR1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRsZXQgd3JhcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRsZXQgdGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdHdyYXBwZXJEaXYuY2xhc3NMaXN0LmFkZChcImZhLWtleXRleHQtY29udGFpbmVyXCIpO1xuXHRcdFx0dGV4dFNwYW4uY2xhc3NMaXN0LmFkZChcImZhLWtleXRleHRcIik7XG5cdFx0XHR0ZXh0U3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0dW5pbmdbaV0pKTtcblx0XHRcdHdyYXBwZXJEaXYuYXBwZW5kQ2hpbGQodGV4dFNwYW4pO1xuXHRcdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlckRpdik7XG5cdFx0fVxuXHR9XG5cblx0bWFya0tleXModGFyZ2V0KXtcblx0XHRyZXR1cm4gdGhpcy5fZWxlRnJldGJvYXJkLm1hcmtLZXlzKHRhcmdldCk7XG5cdH1cblxuXHRzZXRTdHJpbmdHYXVnZShnYXVnZSl7XG5cdFx0dGhpcy5fZWxlRnJldGJvYXJkLnNldFN0cmluZ0dhdWdlKGdhdWdlKTtcblx0fVxuXG5cdGdldEN1cnJlbnROb3RhdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLl9lbGVGcmV0Ym9hcmQuZ2V0Q3VycmVudE5vdGF0aW9uKCk7XG5cdH1cblxuXHRtYXJrSW5sYXlzKGFycil7XG5cdFx0cmV0dXJuIHRoaXMuX2VsZUZyZXRib2FyZC5tYXJrSW5sYXlzKGFycik7XG5cdH1cblxuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgRnJldGJvYXJkQXdlc29tZS5PUklfVkVSVElDQUwgb3IgRnJldGJvYXJkQXdlc29tZS5PUklfSE9SSVpPTlRBTDogXCIgKyBvcmllbnRhdGlvbik7XG5cdFx0fVxuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKENvbmZpZy5PUklfVkVSVElDQUwpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKENvbmZpZy5PUklfSE9SSVpPTlRBTCk7XG5cdFx0bGV0IGNsYXNzTmFtZSA9IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMID8gQ29uZmlnLk9SSV9WRVJUSUNBTCA6IENvbmZpZy5PUklfSE9SSVpPTlRBTDtcblx0XHR0aGlzLl91aU1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdHRoaXMuX2VsZUZyZXRib2FyZC5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdH1cblxuXHRnZXRPcmllbnRhdGlvbigpe1xuXHRcdGxldCBvcmkgPSB0aGlzLl91aU1haW5Db250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWxcIikgPyBDb25maWcuT1JJX1ZFUlRJQ0FMIDpcblx0XHRcdFx0XHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhvcml6b250YWxcIikgPyBDb25maWcuT1JJX0hPUklaT05UQUwgOlxuXHRcdFx0XHRcdFx0XHQtMTtcblx0XHRyZXR1cm4gb3JpO1xuXHR9XG59XG4iLCJleHBvcnQgY2xhc3MgTXVzaWNUaGVvcnkge1xuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gbm90ZSAtIGFjY2VwdCBhIHN0cmluZyBpbiBzcGVjaWZpZWQgbm90YXRpb24sIHNlZSBub3JtYWxpemUoKSBmb3IgbW9yZSBpbmZvLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBjb252ZXJ0VG8gLSBzaG91bGQgZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiIGluIHN0cmluZyB0eXBlLlxuXHRcdEByZXR1cm4ge3N0cmluZ30gLSB3aWxsIHJldHVybiB0aGUgcXVlcnkgcmVzdWx0LlxuXHQqL1xuXHRzdGF0aWMgY29udmVydEFjY2lkZW50YWwobm90ZSwgY29udmVydFRvID0gXCIjXCIpe1xuXHRcdGlmKGNvbnZlcnRUbyAhPT0gXCIjXCIgJiYgY29udmVydFRvICE9PSBcImJcIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udmVydFRvIHNob3VsZCBlaXRoZXIgYmUgJyMnIG9yICdiJyBpbiBzdHJpbmcgdHlwZTogXCIgKyBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRBcnJheShub3RlLCBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRTaW5nbGUobm90ZSwgY29udmVydFRvKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb252ZXJ0QXJyYXkobm90ZXMsIGNvbnZlcnRUbyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjb252ZXJ0U2luZ2xlKG5vdGVzW2ldLCBjb252ZXJ0VG8pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydFNpbmdsZShub3RlLCBjb252ZXJ0VG8pe1xuXHRcdFx0bGV0IHJlc3VsdCA9IE11c2ljVGhlb3J5Lm5vcm1hbGl6ZShub3RlKTtcblx0XHRcdGxldCBzYW1lTm90YXRpb24gPSByZXN1bHRbMV0gPT09IGNvbnZlcnRUbztcblx0XHRcdGlmKHJlc3VsdC5sZW5ndGggPT09IDEgfHwgc2FtZU5vdGF0aW9uKXtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydFRvID09PSBcIiNcIil7XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVFtpXSA9PT0gcmVzdWx0KXtcblx0XHRcdFx0XHRcdHJldHVybiBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0VG8gPT09IFwiYlwiKXtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlBbaV0gPT09IHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFUW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90IGZvdW5kOiBcIiArIHJlc3VsdCArIFwiIFwiICsgY29udmVydFRvKTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihcIndoYXQncyB0aGUgc29yY2VyeT8gXCIgKyByZXN1bHQgKyBcIiBcIiArIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmcsIGFycmF5fSBub3RlIC0gYWNjZXB0cyBzdHJpbmcgb2YgYXJyYXkgb2Ygc3RyaW5ncy4gc3RyaW5nIHNob3VsZCBiZSB3aXRoaW4gMiBjaGFyYWN0ZXJzIGxvbmcgYW5kIHdyaXR0ZW4gaW4gZmFzaGlvbiBsaWtlIFwiQ2JcIiwgXCJEXCIsIFwiRCNcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0IGlmIHlvdSBpbnB1dCBcIkNiYmJiYlwiLCB0aGUgZnVuY3Rpb24gd2lsbCBzdGlsbCBkbyB0aGUgcGFyc2UgYW5kIHJldHVybiBcIkNiXCIgYXMgdGhlIHJlc3VsdC5cblx0XHRAcmV0dXJuIHtudWxsLCBzdHJpbmd9IC0gd2lsbCByZXR1cm4gbnVsbCBpZiBubyBwYXR0ZXJuIGlzIGZvdW5kLCBvciByZXR1cm4gYSBzdHJpbmcgd2l0aCBjYXBpdGFsaXplZCBmaXJzdCBsZXR0ZXIgd2l0aGluIDIgbGVuZ3RoLlxuXHQqL1xuXHRzdGF0aWMgbm9ybWFsaXplKG5vdGUpe1xuXHRcdGlmKHR5cGVvZiBub3RlID09PSBcInN0cmluZ1wiIHx8IG5vdGUgaW5zdGFuY2VvZiBTdHJpbmcpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZVNpbmdsZShub3RlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZUFycmF5KG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBub3RlIHNodW9sZCBiZSBlaXRoZXIgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3M6IFwiICsgbm90ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkobm90ZXMpe1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobm9ybWFsaXplU2luZ2xlKG5vdGVzW2ldKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZSArIFwiIFtcIiArIG5vdGVzICsgXCJdXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZShub3RlKXtcblx0XHRcdGxldCBzaGFycFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX1NIQVJQLmV4ZWMobm90ZSk7XG5cdFx0XHRsZXQgZmxhdFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX0ZMQVQuZXhlYyhub3RlKTtcblx0XHRcdHNoYXJwUmVzdWx0ID0gc2hhcnBSZXN1bHQgPyBzaGFycFJlc3VsdFswXSA6IG51bGw7XG5cdFx0XHRmbGF0UmVzdWx0ID0gZmxhdFJlc3VsdCA/IGZsYXRSZXN1bHRbMF0gOiBudWxsO1xuXHRcdFx0aWYoc2hhcnBSZXN1bHQgfHwgZmxhdFJlc3VsdCl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSAoc2hhcnBSZXN1bHQubGVuZ3RoID4gZmxhdFJlc3VsdC5sZW5ndGgpID8gc2hhcnBSZXN1bHQgOiBmbGF0UmVzdWx0O1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHRbMF0udG9VcHBlckNhc2UoKSArIHJlc3VsdC5zbGljZSgxKTtcblx0XHRcdFx0cmVzdWx0ID0gKHJlc3VsdCA9PT0gXCJDYlwiKSA/IFwiQlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdChyZXN1bHQgPT09IFwiQiNcIikgPyBcIkNcIiA6XG5cdFx0XHRcdFx0XHRcdFx0XHQocmVzdWx0ID09PSBcIkZiXCIpID8gXCJFXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCA9PT0gXCJFI1wiKSA/IFwiRlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdDtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGU6IFwiICsgbm90ZSArIFwiIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHBhdHRlcm4uXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBzdGFydEtleSAtIHRoZSBrZXkgeW91IHdhbnQgdG8gc3RhcnQgd2l0aC4gRm9ybWF0IHNob3VsZCBiZSBcIkMjXCIsIFwiZFwiLCBcImViXCIuLi5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgdGhlIGFycmF5IHNob3VsZCBmdW5jdGlvbiByZXR1cm4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vcmF0aW9uIC0gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZU9wZW5GcmV0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gYW4gYXJyYXkgd2l0aCBzdHJpbmcgY29udGFpbnMgdGhlIHNlcXVlbmNlIG9mIGtleXMuXG5cdCovXG5cdHN0YXRpYyB0dW5pbmcoc3RhcnRLZXkgPSBcIkNcIiwgbGVuZ3RoID0gNywgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gdHJ1ZSl7XG5cdFx0aWYoKHR5cGVvZiBzdGFydEtleSA9PT0gXCJzdHJpbmdcIiB8fCBzdGFydEtleSBpbnN0YW5jZW9mIFN0cmluZykgJiZcblx0XHRcdFx0KG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpICYmXG5cdFx0XHRcdCh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDApICYmXG5cdFx0XHRcdCh0eXBlb2YgaW5jbHVkZU9wZW5GcmV0ID09PSBcImJvb2xlYW5cIikpe1xuXHRcdFx0c3RhcnRLZXkgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbChzdGFydEtleSwgbm90YXRpb24pO1xuXHRcdFx0bGV0IHN0YXJ0SW5kZXggPSAwO1xuXHRcdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdFx0aWYobm90YXRpb24gPT09IFwiI1wiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAuaW5kZXhPZihzdGFydEtleSk7XG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YXJ0SW5kZXgsIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbGVuZ3RoOyBpKyssIGNvdW50ZXIrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goaW5maW5pdGVJbmRleGluZyhNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQLCBpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYobm90YXRpb24gPT09IFwiYlwiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVC5pbmRleE9mKHN0YXJ0S2V5KTtcblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhcnRJbmRleCwgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW5ndGg7IGkrKywgY291bnRlcisrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChpbmZpbml0ZUluZGV4aW5nKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVCwgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5jbHVkZU9wZW5GcmV0ID8gcmVzdWx0IDogcmVzdWx0LnNsaWNlKDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJvbmUgb2YgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkOiBcIiArIFwiXFxuXCIgKyBzdGFydEtleSArIFwiXFxuXCIgKyBsZW5ndGggKyBcIlxcblwiICsgbm90YXRpb24gKyBcIlxcblwiICsgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR9XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwid2hhdCdzIHRoZSBzb3JjZXJ5PyBcIiArIHN0YXJ0S2V5ICsgXCIgXCIgKyBsZW5ndGggKyBcIiBcIiArIG5vdGF0aW9uICsgXCIgXCIgKyBpbmNsdWRlT3BlbkZyZXQpO1xuXG5cdFx0ZnVuY3Rpb24gaW5maW5pdGVJbmRleGluZyhhcnJheSwgaW5kZXgpe1xuXHRcdFx0aW5kZXggPSBpbmRleCAlIGFycmF5Lmxlbmd0aDtcblx0XHRcdHJldHVybiBhcnJheVtpbmRleF07XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldCBOT1RBVElPTl9TSEFSUCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddIz8vOyB9XG5cdHN0YXRpYyBnZXQgTk9UQVRJT05fRkxBVCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddYj8vOyB9XG5cblx0c3RhdGljIGdldCBLRVlTX0FDQ0lERU5UQUxTX1NIQVJQKCl7IHJldHVybiBbXCJBXCIsIFwiQSNcIiwgXCJCXCIsIFwiQ1wiLCBcIkMjXCIsIFwiRFwiLCBcIkQjXCIsIFwiRVwiLCBcIkZcIiwgXCJGI1wiLCBcIkdcIiwgXCJHI1wiXTsgfVxuXHRzdGF0aWMgZ2V0IEtFWVNfQUNDSURFTlRBTFNfRkxBVCgpeyByZXR1cm4gW1wiQVwiLCBcIkJiXCIsIFwiQlwiLCBcIkNcIiwgXCJEYlwiLCBcIkRcIiwgXCJFYlwiLCBcIkVcIiwgXCJGXCIsIFwiR2JcIiwgXCJHXCIsIFwiQWJcIl07IH1cblxuXHRzdGF0aWMgZ2V0IFNUQU5EQVJEX0dVSVRBUl9TVFJJTkdTKCl7IHJldHVybiA2OyB9XG5cdHN0YXRpYyBnZXQgU1RBTkRBUkRfR1VJVEFSX1RVTklORygpeyByZXR1cm4gW1wiRVwiLCBcIkFcIiwgXCJEXCIsIFwiR1wiLCBcIkJcIiwgXCJFXCJdOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuXG5leHBvcnQgY2xhc3MgTm90ZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fbm90ZU5hbWUgPSBcIlwiO1xuXHR9XG5cblx0aW5pdChub3RlLCBub3RhdGlvbiA9IFwiI1wiKXtcblx0XHR0aGlzLnNldE5vdGVOYW1lKG5vdGUsIG5vdGF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RlIC0gb25seSB0YWtlcyBzdHJpbmcuIFRoZSBmb3JtYXQgc2hvdWxkIGJlIFwiZCNcIiwgXCJFXCIsIFwiY2JcIi4uLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIG9ubHkgdGFrZXMgc3RyaW5nLiBUaGUgZm9ybWF0IHNob3VsZCBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdCovXG5cdHNldE5vdGVOYW1lKG5vdGUsIG5vdGF0aW9uID0gXCIjXCIpIHtcblx0XHRpZih0eXBlb2Ygbm90ZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlIGluc3RhbmNlb2YgU3RyaW5nKXtcblx0XHRcdHRoaXMuX25vdGVOYW1lID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwobm90ZSwgbm90YXRpb24pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90ZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Tm90ZU5hbWUoKXsgcmV0dXJuIHRoaXMuX25vdGVOYW1lOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9Ob3RlXCI7XG5pbXBvcnQge0Fic3RyYWN0RnJldGJvYXJkfSBmcm9tIFwiLi9BYnN0cmFjdEZyZXRib2FyZFwiO1xuaW1wb3J0IHtFbGVOb3RlfSBmcm9tIFwiLi9FbGVOb3RlXCI7XG5pbXBvcnQge0VsZVN0cmluZ30gZnJvbSBcIi4vRWxlU3RyaW5nXCI7XG5pbXBvcnQge0VsZUZyZXRib2FyZH0gZnJvbSBcIi4vRWxlRnJldGJvYXJkXCI7XG5pbXBvcnQge0ZyZXRib2FyZEF3ZXNvbWV9IGZyb20gXCIuL0ZyZXRib2FyZEF3ZXNvbWVcIjtcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9Db25maWdcIjtcblxuKGZ1bmN0aW9uKHdpbil7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBmYSA9IHtcblx0XHRNdXNpY1RoZW9yeTogTXVzaWNUaGVvcnksXG5cdFx0Tm90ZTogTm90ZSxcblx0XHRFbGVOb3RlOiBFbGVOb3RlLFxuXHRcdEFic3RyYWN0RnJldGJvYXJkOiBBYnN0cmFjdEZyZXRib2FyZCxcblx0XHRFbGVGcmV0Ym9hcmQ6IEVsZUZyZXRib2FyZCxcblx0XHRFbGVTdHJpbmc6IEVsZVN0cmluZyxcblx0XHRGcmV0Ym9hcmRBd2Vzb21lOiBGcmV0Ym9hcmRBd2Vzb21lLFxuXHRcdENvbmZpZzogQ29uZmlnXG5cdH1cblxuXHR3aW4uZmEgPSBmYTtcbn0pKHdpbmRvdyk7XG4iXX0=
