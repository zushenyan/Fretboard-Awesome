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
	VIEWPORT_SIZE_DEFAULT: 99999,
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

},{"./AbstractFretboard":1,"./Config":2,"./EleString":5,"./MusicTheory":8}],4:[function(require,module,exports){
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

},{"./Config":2,"./Note":9}],5:[function(require,module,exports){
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
  	@param {number} length - how long should the fretboard be.
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
				}
			this._tuning = _MusicTheory.MusicTheory.convertAccidental(tuning, notation);
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

},{"./Config":2,"./EleNote":4,"./MusicTheory":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _EleFretboard = require("./EleFretboard");

var _Config = require("./Config");

var _MusicTheory = require("./MusicTheory");

var FretboardAwesome = (function () {
	function FretboardAwesome() {
		_classCallCheck(this, FretboardAwesome);

		this._domId = "";
		this._uiTuningContainer = document.createElement("div");
		this._uiViewportContainer = document.createElement("div");
		this._uiMainContainer = null;
		this._eleFretboard = null;

		this._viewportSize = _Config.Config.VIEWPORT_SIZE_DEFAULT;
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

	_createClass(FretboardAwesome, [{
		key: "init",
		value: function init(targetId) {
			var tuning = arguments.length <= 1 || arguments[1] === undefined ? _MusicTheory.MusicTheory.STANDARD_GUITAR_TUNING : arguments[1];
			var length = arguments.length <= 2 || arguments[2] === undefined ? 15 : arguments[2];
			var notation = arguments.length <= 3 || arguments[3] === undefined ? "#" : arguments[3];
			var includeOpenFret = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
			var startGauge = arguments.length <= 5 || arguments[5] === undefined ? 6 : arguments[5];
			var orientation = arguments.length <= 6 || arguments[6] === undefined ? _Config.Config.ORI_VERTICAL : arguments[6];
			var viewportSize = arguments.length <= 7 || arguments[7] === undefined ? _Config.Config.VIEWPORT_SIZE_DEFAULT : arguments[7];

			initUI.call(this, targetId, tuning, length, notation, includeOpenFret, startGauge, orientation, viewportSize);
			this._updateTuningUI();
			this.setViewportSize(viewportSize);
			this.setOrientation(orientation);
			return this;

			function initUI(targetId, tuning, length, notation, includeOpenFret, startGauge, orientation, viewportSize) {
				this._uiMainContainer = document.getElementById(targetId);

				this._uiMainContainer.classList.add("fa-container");
				this._uiTuningContainer.classList.add("fa-tuning");
				this._uiViewportContainer.classList.add("fa-viewport");
				this._eleFretboard = new _EleFretboard.EleFretboard().init(tuning, length, notation, includeOpenFret, startGauge, orientation);

				this._uiViewportContainer.appendChild(this._eleFretboard.getEle());
				addDragEvent(this._uiViewportContainer);

				this._uiMainContainer.appendChild(this._uiTuningContainer);
				this._uiMainContainer.appendChild(this._uiViewportContainer);

				function addDragEvent(ele) {
					var isDragging = false;
					var previousX = 0;
					var previousY = 0;

					ele.addEventListener("mousedown", dragDown);
					ele.addEventListener("mousemove", dragMove);
					ele.addEventListener("mouseup", dragUp);
					window.addEventListener("mouseup", dragUp);

					ele.addEventListener("touchstart", dragDown);
					ele.addEventListener("touchmove", dragMove);
					ele.addEventListener("touchend", dragUp);

					function dragDown(e) {
						e.preventDefault();
						isDragging = true;
						previousX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
						previousY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
					}

					function dragMove(e) {
						e.preventDefault();
						if (isDragging) {
							var newX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
							var newY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
							var offsetX = newX - previousX;
							var offsetY = newY - previousY;
							ele.scrollLeft -= offsetX;
							ele.scrollTop -= offsetY;
							previousX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
							previousY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
						}
					}

					function dragUp(e) {
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
	}, {
		key: "setTuning",
		value: function setTuning() {
			var tuning = arguments.length <= 0 || arguments[0] === undefined ? _MusicTheory.MusicTheory.STANDARD_GUITAR_TUNING : arguments[0];
			var length = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeOpenFret = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
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
			if (!(typeof stringGauge !== "number") && stringGauge < 0) {
				throw new TypeError("parameter stringGauge should be a number which is greater than -1: " + stringGauge);
			}
			this._eleFretboard.setTuning(tuning, length, notation, includeOpenFret);
			this._updateTuningUI();
		}

		/**
  	@private
  */
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
			this.setViewportSize(this.getViewportSize());
		}
	}, {
		key: "getOrientation",
		value: function getOrientation() {
			var ori = this._uiMainContainer.classList.contains("vertical") ? _Config.Config.ORI_VERTICAL : this._uiMainContainer.classList.contains("horizontal") ? _Config.Config.ORI_HORIZONTAL : -1;
			return ori;
		}
	}, {
		key: "setViewportSize",
		value: function setViewportSize(size) {
			if (typeof size !== "number" || size < 0) {
				throw new TypeError("parameter size should be typeof of number greater than 0: " + size);
			}
			var width = this._eleFretboard.getEle().scrollWidth;
			var height = this._eleFretboard.getEle().scrollHeight;
			if (this.getOrientation() === _Config.Config.ORI_VERTICAL) {
				height = height <= size ? "auto" : size.toString() + "px";
				width = "auto";
			} else if (this.getOrientation() === _Config.Config.ORI_HORIZONTAL) {
				height = "auto";
				width = width <= size ? "auto" : size.toString() + "px";
			}
			this._uiViewportContainer.style.width = width;
			this._uiViewportContainer.style.height = height;
			this._viewportSize = size;
			return { width: width, height: height };
		}
	}, {
		key: "getViewportSize",
		value: function getViewportSize() {
			return this._viewportSize;
		}
	}]);

	return FretboardAwesome;
})();

exports.FretboardAwesome = FretboardAwesome;

},{"./Config":2,"./EleFretboard":3,"./MusicTheory":8}],7:[function(require,module,exports){
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

},{"./AbstractFretboard":1,"./Config":2,"./EleFretboard":3,"./EleNote":4,"./EleString":5,"./FretboardAwesome":6,"./MusicTheory":8,"./Note":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./MusicTheory":8}]},{},[7])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0Fic3RyYWN0RnJldGJvYXJkLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9Db25maWcuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZUZyZXRib2FyZC5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlTm90ZS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlU3RyaW5nLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9GcmV0Ym9hcmRBd2Vzb21lLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9NYWluLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9NdXNpY1RoZW9yeS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvTm90ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNHYSxpQkFBaUI7QUFDbEIsVUFEQyxpQkFBaUIsR0FDaEI7d0JBREQsaUJBQWlCOztBQUU1QixNQUFHLElBQUksQ0FBQyxX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TSxFQUFDO0FBQ3JELFFBQUksQ0FBQyxTQUFTLEdBQUcseUJBQVksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELE1BQ0k7QUFDSixVQUFNLElBQUksU0FBUyxDQUFDLDJDQUEyQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hFO0dBQ0Q7OztTQUVVLHVCQUFFO0FBQUUsVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0dBQUU7OztRQXZCM0IsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcblx0QGFic3RyYWN0XG4qL1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0RnJldGJvYXJke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdGlmKHRoaXMuY29uc3RydWN0b3IgPT09IEFic3RyYWN0RnJldGJvYXJkKXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0J3MgYW4gYWJzdHJhY3QgY2xhc3Mgc2hvdWxkJyBiZSBpbnN0YW50aWF0ZWRcIik7XG5cdFx0fVxuXHRcdHRoaXMuX3R1bmluZyA9IFtdO1xuXHRcdHRoaXMuX3N0cmluZ3MgPSBbXTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvdmVyd3JpdHRlbiBpbml0IG9yIEdURk9cIik7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuaW5nIC0gYXJyYXkgb2Ygc3RyaW5nLiBFYWNoIGVsZW1lbnQgc2hvdWxkIHByZXNlbnQgaW4gZm9ybWF0IGxpa2UgdGhpcyBcIkUjXCIsIFwiY1wiLCBcImRiXCIuLi5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgdGhlIGFycmF5IHNob3VsZCBmdW5jdGlvbiByZXR1cm4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gc2hvdWxkIGJlIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVTdGFydCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVTdGFydCA9IGZhbHNlLCBub3RlVHlwZSA9IE5vdGUpe1xuXHRcdHRocm93IG5ldyBFcnJvcihcIm92ZXJ3cml0dGVuIHNldFR1bmluZyBvciBHVEZPXCIpO1xuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3R1bmluZztcblx0fVxuXG5cdGdldFN0cmluZ3MoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RyaW5ncztcblx0fVxufVxuIiwiZXhwb3J0IGxldCBDb25maWcgPSB7XG5cdEZSRVRfSEVJR0hUX0RFRkFVTFQ6IFwiODBcIixcblx0RlJFVF9XSURUSF9ERURBVUxUOiBcIjQwXCIsXG5cdFZJRVdQT1JUX1NJWkVfREVGQVVMVDogOTk5OTksXG5cdE9SSV9WRVJUSUNBTDogXCJ2ZXJ0aWNhbFwiLFxuXHRPUklfSE9SSVpPTlRBTDogXCJob3Jpem9udGFsXCJcbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge0Fic3RyYWN0RnJldGJvYXJkfSBmcm9tIFwiLi9BYnN0cmFjdEZyZXRib2FyZFwiO1xuaW1wb3J0IHtFbGVTdHJpbmd9IGZyb20gXCIuL0VsZVN0cmluZ1wiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRWxlRnJldGJvYXJkIGV4dGVuZHMgQWJzdHJhY3RGcmV0Ym9hcmR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91aUZyZXRib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGhpcy5fZWxlU3RyaW5ncyA9IFtdOyAvLyBhcnJheSBvZiBlbGVTdHJpbmdcblx0XHR0aGlzLl9sYXN0TGVuZ3RoID0gLTE7XG5cdFx0dGhpcy5fY3VycmVudE5vdGF0aW9uID0gXCJcIjtcblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUw7XG5cdFx0dGhpcy5fc3RhcnRHYXVnZSA9IDY7XG5cdH1cblxuXHRpbml0KHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlT3BlbkZyZXQgPSBmYWxzZSwgc3RhcnRHYXVnZSA9IDEyLCBvcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUwpe1xuXHRcdGluaXRVSS5jYWxsKHRoaXMpO1xuXHRcdHRoaXMuc2V0VHVuaW5nKHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR0aGlzLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKHN0YXJ0R2F1Z2UpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdFVJKCl7XG5cdFx0XHR0aGlzLl91aUZyZXRib2FyZC5jbGFzc0xpc3QuYWRkKFwiZmEtZnJldGJvYXJkXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5lIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgc2hvdWxkIHRoZSByZXN1bHQgYmUuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gaW4gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZU9wZW5GcmV0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdCovXG5cdHNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gZmFsc2Upe1xuXHRcdGlmKCEodHVuaW5nIGluc3RhbmNlb2YgQXJyYXkpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdHVuaW5nIHNob3VsZCBiZSB0eXBlIG9mIGFycmF5OiBcIiArIHR1bmluZyk7XG5cdFx0fVxuXHRcdGlmKCEodHlwZW9mIGxlbmd0aCAhPT0gXCJudW1iZXJcIikgJiYgbGVuZ3RoIDwgMSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgd2hpY2ggaXMgZ3JlYXRlciB0aGFuIDA6IFwiICsgbGVuZ3RoKTtcblx0XHR9XG5cdFx0aWYoIShub3RhdGlvbiA9PT0gXCIjXCIgfHwgIG5vdGF0aW9uID09PSBcImJcIikpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vdGF0aW9uIHNob3VsZCBlaXRoZXIgYmUgJyMnIG9yICdiJyBpbiBzdHJpbmcgdHlwZTogXCIgKyBub3RhdGlvbik7XG5cdFx0fVxuXHRcdGlmKHR5cGVvZiBpbmNsdWRlT3BlbkZyZXQgIT09IFwiYm9vbGVhblwiKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgaW5jbHVkZU9wZW5GcmV0IHNob3VsZCBiZSB0eXBlIG9mIGJvb2xlYW46IFwiICsgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR9XG5cdFx0Ly8gaWYgcGFyYW1ldGVyIGxlbmd0aCBpcyBlcXVhbCB0byB0aGUgbGVuZ3RoIHBhc3NlZCBsYXN0IHRpbWUsIHRoZW4gb25seSB1cGRhdGVzIHRoZSB0ZXh0IGluc2lkZSB0aGVzZSBub3Rlcy5cblx0XHRpZigodHVuaW5nLmxlbmd0aCA9PT0gdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGgpICYmXG5cdFx0XHRcdCh0aGlzLl9sYXN0TGVuZ3RoID09PSBsZW5ndGgpKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0dW5pbmcubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR0aGlzLl9lbGVTdHJpbmdzW2ldLnNldFR1bmluZyh0dW5pbmdbaV0sIGxlbmd0aCwgbm90YXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiBub3QgdGhlbiByZWNyZWF0ZSBldmVyeXRoaW5nLlxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLl91aUZyZXRib2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fZWxlU3RyaW5ncyA9IFtdO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHR1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlU3RyaW5nKCkuaW5pdCh0dW5pbmdbaV0sIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVPcGVuRnJldCwgdGhpcy5nZXRTdGFydEdhdWdlKCkgLSBpLCB0aGlzLmdldE9yaWVudGF0aW9uKCkpO1xuXHRcdFx0XHR0aGlzLl9lbGVTdHJpbmdzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuYXBwZW5kQ2hpbGQocmVzdWx0LmdldEVsZSgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fbGFzdExlbmd0aCA9IGxlbmd0aDtcblx0XHR0aGlzLl9jdXJyZW50Tm90YXRpb24gPSBub3RhdGlvbjtcblx0fVxuXG5cdC8qKlxuXHRcdHRvIG1ha2Ugc3BlY2lmaWVkIGtleXMgdmlzaWJsZS5cblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXQgLSBtYWtlIHRhcmdldCBrZXlzIHZpc2libGUuIGZvcm1hdDogW3trZXk6IFwiQyNcIiwgY29sb3I6IFwieWVsbG93XCJ9LCB7a2V5OiBcIkQjXCIsIGNvbG9yOiBcImJsdWVcIn0sIC4uLl1cblx0XHRAcmV0dXJuIHthcnJheX0gLSByZXR1cm4gd2hhdCBrZXkgd2FzIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0tleXModGFyZ2V0KXtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCByID0gdGhpcy5fZWxlU3RyaW5nc1tpXS5tYXJrS2V5cyh0YXJnZXQpO1xuXHRcdFx0cmVzdWx0LnB1c2gocik7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge251bWJlcn0gc3RhcnRHYXVnZSAtIGhvdyB0aGljayBpcyB0aGUgbGVmdGVzdCBzdHJpbmcuIFRoZSBmb2xsb3dpbmcgc3RyaW5ncycgdGhpY2tuZXNzIHdpbGwgYmUgaW4gZGVzY2VuZGVkIG9yZGVyLlxuXHQqL1xuXHRzZXRTdHJpbmdHYXVnZShzdGFydEdhdWdlLCBvcmllbnRhdGlvbil7XG5cdFx0aWYodHlwZW9mIHN0YXJ0R2F1Z2UgIT09IFwibnVtYmVyXCIgfHwgc3RhcnRHYXVnZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzdGFydEdhdWdlIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gLTE6XCIgKyBzdGFydEdhdWdlKTtcblx0XHR9XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlU3RyaW5nc1tpXS5zZXRTdHJpbmdHYXVnZShzdGFydEdhdWdlIC0gaSk7XG5cdFx0fVxuXHRcdHRoaXMuX3N0YXJ0R2F1Z2UgPSBzdGFydEdhdWdlO1xuXHR9XG5cblx0Z2V0U3RyaW5nR2F1Z2UoKXtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoOyBpKyspe1xuXHRcdFx0cmVzdWx0LnB1c2godGhpcy5fZWxlU3RyaW5nc1tpXS5nZXRTdHJpbmdHYXVnZSgpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldFN0YXJ0R2F1Z2UoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RhcnRHYXVnZTtcblx0fVxuXG5cdHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKXtcblx0XHRpZighKG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMIHx8IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgb3JpZW50YXRpb24gc2hvdWxkIGJlIGVpdGhlciBDb25maWcuT1JJX1ZFUlRJQ0FMIG9yIENvbmZpZy5PUklfSE9SSVpPTlRBTDogXCIgKyBvcmllbnRhdGlvbik7XG5cdFx0fVxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2VsZVN0cmluZ3NbaV0uc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXHR9XG5cblx0Z2V0T3JpZW50YXRpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG5cdH1cblxuXHRnZXRFbGUoKXtcblx0XHRyZXR1cm4gdGhpcy5fdWlGcmV0Ym9hcmQ7XG5cdH1cblxuXHRnZXRTdHJpbmdzKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2VsZVN0cmluZ3M7XG5cdH1cblxuXHRnZXRUdW5pbmcoKXtcblx0XHRsZXQgdHVuaW5nID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoOyBpKyspe1xuXHRcdFx0dHVuaW5nLnB1c2godGhpcy5fZWxlU3RyaW5nc1tpXS5nZXRUdW5pbmcoKSk7XG5cdFx0fVxuXHRcdHJldHVybiB0dW5pbmc7XG5cdH1cblxuXHRnZXRDdXJyZW50Tm90YXRpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudE5vdGF0aW9uO1xuXHR9XG5cblx0bWFya0lubGF5cyhhcnIpe1xuXHRcdGxldCBtaWQgPSB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aCAvIDIgLSAxO1xuXHRcdG1pZCA9IG1pZCA8IDAgPyAwIDogbWlkO1xuXHRcdHJldHVybiB0aGlzLl9lbGVTdHJpbmdzW21pZF0ubWFya0lubGF5cyhhcnIpO1xuXHR9XG59XG4iLCJpbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9Db25maWdcIjtcblxuZXhwb3J0IGNsYXNzIEVsZU5vdGUgZXh0ZW5kcyBOb3Rle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl91aU5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0dGhpcy5fdWlTdHJpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuXHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhLW5vdGVcIik7XG5cdFx0dGhpcy5fdWlOb3RlVGV4dC5jbGFzc0xpc3QuYWRkKFwiZmEtbm90ZS10ZXh0XCIpO1xuXHRcdHRoaXMuX3VpU3RyaW5nLmNsYXNzTGlzdC5hZGQoXCJmYS1zdHJpbmctaW1hZ2VcIik7XG5cdFx0dGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5hZGQoXCJmYS1mcmV0XCIpO1xuXG5cdFx0dGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl91aU5vdGVUZXh0KTtcblx0XHR0aGlzLl91aU5vdGUuYXBwZW5kQ2hpbGQodGhpcy5fdWlTdHJpbmcpO1xuXHRcdHRoaXMuX3VpTm90ZS5hcHBlbmRDaGlsZCh0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyKTtcblxuXHRcdHRoaXMuX3N0cmluZ0dhdWdlID0gMztcblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUw7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gbm90ZSAtIGZvcm1hdCBcImQjXCIsIFwiRVwiLCBcIkcjXCIuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBiZ0NvbG9yIC0gY29sb3IgZm9ybWF0IGluIHN0cmluZy5cblx0XHRAcGFyYW0ge251bWJlcn0gc3RyaW5nR2F1Z2UgLSBob3cgdGhpY2sgdGhlIHN0cmluZyB3aWxsIGJlIGRpc3BsYXllZCwgdW5pdCBpbiBweC5cblx0XHRAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSB3aGljaCBvcmllbnRhdGlvbiB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLiBTaG91bGQgYmUgZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ29uZmlnLk9SSV9IT1JJWk9OVEFMO1xuXHQqL1xuXHRpbml0KG5vdGUsIG5vdGF0aW9uID0gXCIjXCIsIGJnQ29sb3IgPSBcIndoaXRlXCIsIHN0cmluZ0dhdWdlID0gMTIsIG9yaWVudGF0aW9uID0gQ29uZmlnLk9SSV9WRVJUSUNBTCl7XG5cdFx0c3VwZXIuaW5pdChub3RlLCBub3RhdGlvbik7XG5cdFx0dGhpcy5zZXROb3RlTmFtZShub3RlLCBub3RhdGlvbik7XG5cdFx0dGhpcy5zZXRCZ0NvbG9yKGJnQ29sb3IpO1xuXHRcdHRoaXMuc2V0U3RyaW5nR2F1Z2Uoc3RyaW5nR2F1Z2UpO1xuXHRcdHRoaXMuc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpTm90ZTtcblx0fVxuXG5cdHNldE5vdGVOYW1lKG5vdGVOYW1lLCBub3RhdGlvbil7XG5cdFx0aWYodHlwZW9mIG5vdGVOYW1lID09PSBcInN0cmluZ1wiIHx8IG5vdGVOYW1lIGluc3RhbmNlb2YgU3RyaW5nIHx8IG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PSBcImJcIil7XG5cdFx0XHRzdXBlci5zZXROb3RlTmFtZShub3RlTmFtZSwgbm90YXRpb24pO1xuXHRcdFx0dGhpcy5fdWlOb3RlVGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fdWlOb3RlVGV4dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmdldE5vdGVOYW1lKCkpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG5vdGVOYW1lIHNob3VsZCBiZSB0eXBlIG9mIHN0cmluZzogXCIgKyBub3RlTmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0QmdDb2xvcihiZ0NvbG9yKXtcblx0XHRpZih0eXBlb2YgYmdDb2xvciA9PT0gXCJzdHJpbmdcIiB8fCBiZ0NvbG9yIGluc3RhbmNlb2YgU3RyaW5nKXtcblx0XHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGJnQ29sb3Igc2hvdWxkIGJlIHR5cGUgb2Ygc3RyaW5nOiBcIiArIGJnQ29sb3IpO1xuXHRcdH1cblx0fVxuXG5cdGdldEJnQ29sb3IoKXtcblx0XHRyZXR1cm4gdGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cdH1cblxuXHRzZXRTdHJpbmdHYXVnZShnYXVnZSl7XG5cdFx0aWYodHlwZW9mIGdhdWdlICE9PSBcIm51bWJlclwiIHx8IGdhdWdlIDwgMCl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGdhdWdlIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gMDpcIiArIGdhdWdlKTtcblx0XHR9XG5cdFx0aWYodGhpcy5nZXRPcmllbnRhdGlvbigpID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMKXtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLnN0eWxlLmhlaWdodCA9IENvbmZpZy5GUkVUX0hFSUdIVF9ERUZBVUxUICsgXCJweFwiO1xuXHRcdFx0dGhpcy5fdWlTdHJpbmcuc3R5bGUud2lkdGggPSBnYXVnZS50b1N0cmluZygpICsgXCJweFwiO1xuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuZ2V0T3JpZW50YXRpb24oKSA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKXtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLnN0eWxlLmhlaWdodCA9IGdhdWdlLnRvU3RyaW5nKCkgKyBcInB4XCI7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5zdHlsZS53aWR0aCA9IENvbmZpZy5GUkVUX0hFSUdIVF9ERUZBVUxUICsgXCJweFwiO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwid2hhdHMgdGhlIHNvcmNlcnk/IFwiICsgZ2F1Z2UpO1xuXHRcdH1cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IGdhdWdlO1xuXHR9XG5cblx0Z2V0U3RyaW5nR2F1Z2UoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RyaW5nR2F1Z2U7XG5cdH1cblxuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw6IFwiICsgb3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHRpZih0aGlzLl9vcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXHRcdHRoaXMuc2V0U3RyaW5nR2F1Z2UodGhpcy5nZXRTdHJpbmdHYXVnZSgpKTtcblx0fVxuXG5cdGdldE9yaWVudGF0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuXHR9XG5cblx0c2hvdygpeyB0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpOyB9XG5cdGhpZGUoKXsgdGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTsgfVxuXHRpc1Zpc2libGUoKXsgcmV0dXJuICF0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIik7IH1cblxuXHQvKlxuXHRcdHRoZSBcImRvdFwiIG9uIDMsNSw3LDksMTIuLi4gZ3VpdGFyIGZyZXRzXG5cdCovXG5cdG1hcmtJbmxheXMoKXsgdGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5hZGQoXCJpbmxheXNcIik7IH1cblx0cmVtb3ZlSW5sYXlzKCl7IHRoaXMuX3VpTm90ZS5jbGFzc0xpc3QucmVtb3ZlKFwiaW5sYXlzXCIpOyB9XG5cdGhhc0lubGF5cygpeyByZXR1cm4gdGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5jb250YWlucyhcImlubGF5c1wiKTsgfTtcbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge0VsZU5vdGV9IGZyb20gXCIuL0VsZU5vdGVcIjtcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9Db25maWdcIjtcblxuZXhwb3J0IGNsYXNzIEVsZVN0cmluZ3tcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl91aVN0cmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblx0XHR0aGlzLl9lbGVOb3RlcyA9IFtdOyAvLyBhcnJheSBvZiBFbGVOb3RlXG5cdFx0dGhpcy5fdHVuaW5nID0gXCJcIjtcblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IDA7XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMO1xuXHR9XG5cblx0aW5pdCh0dW5pbmcsIGxlbmd0aCA9IDEyLCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlT3BlbkZyZXQgPSBmYWxzZSwgc3RyaW5nR2F1Z2UgPSA2LCBvcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUwpe1xuXHRcdGluaXRVSS5jYWxsKHRoaXMpO1xuXHRcdHRoaXMuc2V0VHVuaW5nKHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR0aGlzLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKHN0cmluZ0dhdWdlKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGluaXRVSSgpe1xuXHRcdFx0dGhpcy5fdWlTdHJpbmcuY2xhc3NMaXN0LmFkZChcImZhLXN0cmluZ1wiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuaW5nIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgc2hvdWxkIHRoZSBmcmV0Ym9hcmQgYmUuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gaW4gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZU9wZW5GcmV0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdCovXG5cdHNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gZmFsc2Upe1xuXHRcdGlmKCEodHlwZW9mIHR1bmluZyA9PT0gXCJzdHJpbmdcIiB8fCB0dW5pbmcgaW5zdGFuY2VvZiBTdHJpbmcpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdHVuaW5nIHNob3VsZCBiZSBzdHJpbmc6IFwiICsgdHVuaW5nKTtcblx0XHR9XG5cdFx0aWYoISh0eXBlb2YgbGVuZ3RoICE9PSBcIm51bWJlclwiKSAmJiBsZW5ndGggPCAxKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlciB3aGljaCBpcyBncmVhdGVyIHRoYW4gMDogXCIgKyBsZW5ndGgpO1xuXHRcdH1cblx0XHRpZighKG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIGVpdGhlciAnIycgb3IgJ2InOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdFx0aWYodHlwZW9mIGluY2x1ZGVPcGVuRnJldCAhPT0gXCJib29sZWFuXCIpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBpbmNsdWRlT3BlbkZyZXQgc2hvdWxkIGJlIHR5cGUgb2YgYm9vbGVhbjogXCIgKyBpbmNsdWRlT3BlbkZyZXQpO1xuXHRcdH1cblx0XHQvLyBpZiBwYXJhbWV0ZXIgbGVuZ3RoIGlzIGVxdWFsIHRvIHRoZSBsZW5ndGggcGFzc2VkIGxhc3QgdGltZSwgdGhlbiBvbmx5IHVwZGF0ZXMgdGhlIHRleHQgaW5zaWRlIHRoZXNlIG5vdGVzLlxuXHRcdGxldCBub3RlcyA9IE11c2ljVGhlb3J5LnR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0aWYodGhpcy5fZWxlTm90ZXMubGVuZ3RoID09PSBub3Rlcy5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0Tm90ZU5hbWUobm90ZXNbaV0sIG5vdGF0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gaWYgbm90IHRoZW4gcmVjcmVhdGUgZXZlcnl0aGluZy5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHR0aGlzLl9lbGVOb3RlcyA9IFtdO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0bGV0IHJlc3VsdCA9IG5ldyBFbGVOb3RlKCkuaW5pdChub3Rlc1tpXSwgbm90YXRpb24sIFwid2hpdGVcIiwgdGhpcy5nZXRTdHJpbmdHYXVnZSgpLCB0aGlzLmdldE9yaWVudGF0aW9uKCkpO1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlcy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMuX3VpU3RyaW5nLmFwcGVuZENoaWxkKHJlc3VsdC5nZXRFbGUoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3R1bmluZyA9IE11c2ljVGhlb3J5LmNvbnZlcnRBY2NpZGVudGFsKHR1bmluZywgbm90YXRpb24pO1xuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3R1bmluZztcblx0fVxuXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHRpZih0eXBlb2YgZ2F1Z2UgIT09IFwibnVtYmVyXCIgfHwgZ2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgZ2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwOlwiICsgZ2F1Z2UpO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0U3RyaW5nR2F1Z2UoZ2F1Z2UpO1xuXHRcdH1cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IGdhdWdlO1xuXHR9XG5cblx0Z2V0U3RyaW5nR2F1Z2UoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RyaW5nR2F1Z2U7XG5cdH1cblxuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw6IFwiICsgb3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXHR9XG5cblx0Z2V0T3JpZW50YXRpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG5cdH1cblxuXHQvKipcblx0XHR0byBtYWtlIHNwZWNpZmllZCBrZXlzIHZpc2libGUuXG5cdFx0QHBhcmFtIHthcnJheX0gdGFyZ2V0IC0gbWFrZSB0YXJnZXQga2V5cyB2aXNpYmxlLiBmb3JtYXQ6IFt7a2V5OiBcIkMjXCIsIGNvbG9yOiBcInllbGxvd1wifSwge2tleTogXCJEI1wiLCBjb2xvcjogXCJibHVlXCJ9LCAuLi5dXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJuIHdoYXQga2V5IHdhcyBiZWluZyBtYXJrZWQuXG5cdCovXG5cdG1hcmtLZXlzKHRhcmdldCl7XG5cdFx0aWYoISh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0YXJnZXQgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXk6IFwiICsgdGFyZ2V0KTtcblx0XHR9XG5cdFx0cmVzZXREaXNwbGF5LmNhbGwodGhpcyk7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0YXJnZXQubGVuZ3RoOyBpKyspe1xuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMuX2VsZU5vdGVzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0bGV0IGtleTEgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbCh0YXJnZXRbaV0ua2V5KTtcblx0XHRcdFx0bGV0IGtleTIgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbCh0aGlzLl9lbGVOb3Rlc1tqXS5nZXROb3RlTmFtZSgpKTtcblx0XHRcdFx0aWYoa2V5MSA9PT0ga2V5Mil7XG5cdFx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbal0uc2hvdygpO1xuXHRcdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2pdLnNldEJnQ29sb3IodGFyZ2V0W2ldLmNvbG9yKTtcblx0XHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLl9lbGVOb3Rlc1tqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdGZ1bmN0aW9uIHJlc2V0RGlzcGxheSgpe1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZU5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uaGlkZSgpO1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5zZXRCZ0NvbG9yKFwid2hpdGVcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0RWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpU3RyaW5nO1xuXHR9XG5cblx0Z2V0RWxlTm90ZXMoKXtcblx0XHRyZXR1cm4gdGhpcy5fZWxlTm90ZXM7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXRGcmV0cyAtIGluZGljYXRlcyB3aGljaCBmcmV0cyB5b3Ugd2FudCB0byBtYXJrIGlubGF5cy4gV2lsbCB0aHJvdyBlcnJvciBpZiB0YXJnZXQgZnJldCBkb2Vzbid0IGV4aXN0LlxuXHRcdEZvciBzaW1wbGljaXR5LCB1c2UgaHVtYW4gaW5kZXggY29udmVudGlvbiBvbiBhcnJheSwgZG9uJ3QgdXNlIGNvbXB1dGVyIGZpZWxkIGNvbnZlbnRpb24uIEZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCB0byBtYXJrIGluYWx5c1xuXHRcdG9uIGZyZXQgMSwgMywgNSwgcGFzcyBbMSwgMywgNV0sIGRvbid0IHRyeSBbMCwgMiwgNF0uXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJucyBlbGVtZW50cyB3aGljaCB3ZXJlIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0lubGF5cyh0YXJnZXRGcmV0cyl7XG5cdFx0aWYoISh0YXJnZXRGcmV0cyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHRhcmdldEZyZXRzIHNob3VsZCBiZSB0eXBlIG9mIGFycmF5IHdpdGggbnVtYmVyOiBcIiArIHRhcmdldEZyZXRzKTtcblx0XHR9XG5cdFx0Y2xlYXJJbmxheXMuY2FsbCh0aGlzKTtcblx0XHR0YXJnZXRGcmV0cyA9IGZpbmRVbmlxdWUodGFyZ2V0RnJldHMpO1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGFyZ2V0RnJldHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0bGV0IGluZGV4ID0gdGFyZ2V0RnJldHNbaV0gLSAxO1xuXHRcdFx0aWYodGhpcy5fZWxlTm90ZXNbaW5kZXhdKXtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaW5kZXhdLm1hcmtJbmxheXMoKTtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5fZWxlTm90ZXNbaW5kZXhdKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRhcmdldCBmcmV0IGRvZXNuJ3QgZXhpc3QuIHRhcmdldEZyZXRzOiBcIiArIHRhcmdldEZyZXRzICsgXCIsIGZyZXQgbGVuZ3RoOiBcIiArIHRoaXMuX2VsZU5vdGVzLmxlbmd0aCArIFwiLCB0cmFuc2xhdGVkIGluZGV4OiBcIiArIGluZGV4KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdGZ1bmN0aW9uIGNsZWFySW5sYXlzKCl7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5yZW1vdmVJbmxheXMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5kVW5pcXVlKGFycil7XG5cdFx0XHRyZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCByKXtcblx0XHRcdFx0aWYoYS5pbmRleE9mKHIpIDwgMCl7XG5cdFx0XHRcdFx0YS5wdXNoKHIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0fSwgW10pO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtFbGVGcmV0Ym9hcmR9IGZyb20gXCIuL0VsZUZyZXRib2FyZFwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHtNdXNpY1RoZW9yeX0gZnJvbSBcIi4vTXVzaWNUaGVvcnlcIjtcblxuZXhwb3J0IGNsYXNzIEZyZXRib2FyZEF3ZXNvbWV7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fZG9tSWQgPSBcIlwiO1xuXHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl91aU1haW5Db250YWluZXIgPSBudWxsO1xuXHRcdHRoaXMuX2VsZUZyZXRib2FyZCA9IG51bGw7XG5cblx0XHR0aGlzLl92aWV3cG9ydFNpemUgPSBDb25maWcuVklFV1BPUlRfU0laRV9ERUZBVUxUO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHRhcmdldElkIC0gdGhlIGRvbSBlbGVtZW50IHdoaWNoIHlvdSB3YW50IGl0IHRvIGdlbmVyYXRlIEZyZXRib2FyZEF3ZXNvbWUuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHR1bmluZyAtIGluIHdoYXQga2V5IHdlIGFyZSB0dW5pbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgZnJldGJvYXJkIGJlLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVPcGVuRnJldCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgZmlyc3Qgb3BlbiBmcmV0LlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdGFydEdhdWdlIC0gYXQgd2hhdCB0aGlja25lc3Mgd2lsbCB0aGUgc3RyaW5nIHN0YXJ0IGRlY3JlYXNpbmcuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uIC0gZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ09ORklHX09SSV9IT1JJWk9OVEFMLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSB2aWV3cG9ydCAtIGxpbWl0IGhvdyBsb25nIHRoZSBmcmV0Ym9hcmQgdXNlciBjYW4gdmlldyBpbiBwaXhlbCB1bml0LlxuXHQqL1xuXHRpbml0KHRhcmdldElkLFxuXHRcdFx0dHVuaW5nID0gTXVzaWNUaGVvcnkuU1RBTkRBUkRfR1VJVEFSX1RVTklORyxcblx0XHRcdGxlbmd0aCA9IDE1LFxuXHRcdFx0bm90YXRpb24gPSBcIiNcIixcblx0XHRcdGluY2x1ZGVPcGVuRnJldCA9IGZhbHNlLFxuXHRcdFx0c3RhcnRHYXVnZSA9IDYsXG5cdFx0XHRvcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUwsXG5cdFx0XHR2aWV3cG9ydFNpemUgPSBDb25maWcuVklFV1BPUlRfU0laRV9ERUZBVUxUKXtcblx0XHRpbml0VUkuY2FsbCh0aGlzLCB0YXJnZXRJZCwgdHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlT3BlbkZyZXQsIHN0YXJ0R2F1Z2UsIG9yaWVudGF0aW9uLCB2aWV3cG9ydFNpemUpO1xuXHRcdHRoaXMuX3VwZGF0ZVR1bmluZ1VJKCk7XG5cdFx0dGhpcy5zZXRWaWV3cG9ydFNpemUodmlld3BvcnRTaXplKTtcblx0XHR0aGlzLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGluaXRVSSh0YXJnZXRJZCwgdHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlT3BlbkZyZXQsIHN0YXJ0R2F1Z2UsIG9yaWVudGF0aW9uLCB2aWV3cG9ydFNpemUpe1xuXHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuXG5cdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhLWNvbnRhaW5lclwiKTtcblx0XHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS10dW5pbmdcIik7XG5cdFx0XHR0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS12aWV3cG9ydFwiKTtcblx0XHRcdHRoaXMuX2VsZUZyZXRib2FyZCA9IG5ldyBFbGVGcmV0Ym9hcmQoKS5pbml0KHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZU9wZW5GcmV0LCBzdGFydEdhdWdlLCBvcmllbnRhdGlvbik7XG5cblx0XHRcdHRoaXMuX3VpVmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlRnJldGJvYXJkLmdldEVsZSgpKTtcblx0XHRcdGFkZERyYWdFdmVudCh0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyKTtcblxuXHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyKTtcblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyKTtcblxuXHRcdFx0ZnVuY3Rpb24gYWRkRHJhZ0V2ZW50KGVsZSl7XG5cdFx0XHRcdGxldCBpc0RyYWdnaW5nID0gZmFsc2U7XG5cdFx0XHRcdGxldCBwcmV2aW91c1ggPSAwO1xuXHRcdFx0XHRsZXQgcHJldmlvdXNZID0gMDtcblxuXHRcdFx0XHRlbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnRG93bik7XG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdFx0ZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGRyYWdVcCk7XG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkcmFnVXApO1xuXG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBkcmFnRG93bik7XG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdFx0ZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBkcmFnVXApO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGRyYWdEb3duKGUpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpc0RyYWdnaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRwcmV2aW91c1ggPSBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYO1xuXHRcdFx0XHRcdHByZXZpb3VzWSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBkcmFnTW92ZShlKXtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYoaXNEcmFnZ2luZyl7XG5cdFx0XHRcdFx0XHRsZXQgbmV3WCA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG5cdFx0XHRcdFx0XHRsZXQgbmV3WSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdFx0XHRsZXQgb2Zmc2V0WCA9IG5ld1ggLSBwcmV2aW91c1g7XG5cdFx0XHRcdFx0XHRsZXQgb2Zmc2V0WSA9IG5ld1kgLSBwcmV2aW91c1k7XG5cdFx0XHRcdFx0XHRlbGUuc2Nyb2xsTGVmdCAtPSBvZmZzZXRYO1xuXHRcdFx0XHRcdFx0ZWxlLnNjcm9sbFRvcCAtPSBvZmZzZXRZO1xuXHRcdFx0XHRcdFx0cHJldmlvdXNYID0gZS5jaGFuZ2VkVG91Y2hlcyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA6IGUuY2xpZW50WDtcblx0XHRcdFx0XHRcdHByZXZpb3VzWSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnVuY3Rpb24gZHJhZ1VwKGUpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpc0RyYWdnaW5nID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuZSAtIGluIHdoYXQga2V5IHdlIGFyZSB0dW5pbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgcmVzdWx0IGJlLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGluIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVPcGVuRnJldCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nID0gTXVzaWNUaGVvcnkuU1RBTkRBUkRfR1VJVEFSX1RVTklORywgbGVuZ3RoID0gMTIsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVPcGVuRnJldCA9IGZhbHNlKXtcblx0XHRpZighKHR1bmluZyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHR1bmluZyBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0dW5pbmcpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIpICYmIGxlbmd0aCA8IDEpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAwOiBcIiArIGxlbmd0aCk7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8IG5vdGF0aW9uID09PSBcImJcIikpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgZWl0aGVyICcjJyBvciAnYic6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHRpZih0eXBlb2YgaW5jbHVkZU9wZW5GcmV0ICE9PSBcImJvb2xlYW5cIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGluY2x1ZGVPcGVuRnJldCBzaG91bGQgYmUgdHlwZSBvZiBib29sZWFuOiBcIiArIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0fVxuXHRcdGlmKCEodHlwZW9mIHN0cmluZ0dhdWdlICE9PSBcIm51bWJlclwiKSAmJiBzdHJpbmdHYXVnZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzdHJpbmdHYXVnZSBzaG91bGQgYmUgYSBudW1iZXIgd2hpY2ggaXMgZ3JlYXRlciB0aGFuIC0xOiBcIiArIHN0cmluZ0dhdWdlKTtcblx0XHR9XG5cdFx0dGhpcy5fZWxlRnJldGJvYXJkLnNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVPcGVuRnJldCk7XG5cdFx0dGhpcy5fdXBkYXRlVHVuaW5nVUkoKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwcml2YXRlXG5cdCovXG5cdF91cGRhdGVUdW5pbmdVSSgpe1xuXHRcdGxldCB0dW5pbmcgPSB0aGlzLl9lbGVGcmV0Ym9hcmQuZ2V0VHVuaW5nKCk7XG5cdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdHVuaW5nLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCB3cmFwcGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGxldCB0ZXh0U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdFx0d3JhcHBlckRpdi5jbGFzc0xpc3QuYWRkKFwiZmEta2V5dGV4dC1jb250YWluZXJcIik7XG5cdFx0XHR0ZXh0U3Bhbi5jbGFzc0xpc3QuYWRkKFwiZmEta2V5dGV4dFwiKTtcblx0XHRcdHRleHRTcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHR1bmluZ1tpXSkpO1xuXHRcdFx0d3JhcHBlckRpdi5hcHBlbmRDaGlsZCh0ZXh0U3Bhbik7XG5cdFx0XHR0aGlzLl91aVR1bmluZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyRGl2KTtcblx0XHR9XG5cdH1cblxuXHRtYXJrS2V5cyh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLl9lbGVGcmV0Ym9hcmQubWFya0tleXModGFyZ2V0KTtcblx0fVxuXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHR0aGlzLl9lbGVGcmV0Ym9hcmQuc2V0U3RyaW5nR2F1Z2UoZ2F1Z2UpO1xuXHR9XG5cblx0Z2V0Q3VycmVudE5vdGF0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2VsZUZyZXRib2FyZC5nZXRDdXJyZW50Tm90YXRpb24oKTtcblx0fVxuXG5cdG1hcmtJbmxheXMoYXJyKXtcblx0XHRyZXR1cm4gdGhpcy5fZWxlRnJldGJvYXJkLm1hcmtJbmxheXMoYXJyKTtcblx0fVxuXG5cdHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKXtcblx0XHRpZighKG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMIHx8IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgb3JpZW50YXRpb24gc2hvdWxkIGJlIGVpdGhlciBGcmV0Ym9hcmRBd2Vzb21lLk9SSV9WRVJUSUNBTCBvciBGcmV0Ym9hcmRBd2Vzb21lLk9SSV9IT1JJWk9OVEFMOiBcIiArIG9yaWVudGF0aW9uKTtcblx0XHR9XG5cdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoQ29uZmlnLk9SSV9WRVJUSUNBTCk7XG5cdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoQ29uZmlnLk9SSV9IT1JJWk9OVEFMKTtcblx0XHRsZXQgY2xhc3NOYW1lID0gb3JpZW50YXRpb24gPT09IENvbmZpZy5PUklfVkVSVElDQUwgPyBDb25maWcuT1JJX1ZFUlRJQ0FMIDogQ29uZmlnLk9SSV9IT1JJWk9OVEFMO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0dGhpcy5fZWxlRnJldGJvYXJkLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLnNldFZpZXdwb3J0U2l6ZSh0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKTtcblx0fVxuXG5cdGdldE9yaWVudGF0aW9uKCl7XG5cdFx0bGV0IG9yaSA9IHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSA/IENvbmZpZy5PUklfVkVSVElDQUwgOlxuXHRcdFx0XHRcdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaG9yaXpvbnRhbFwiKSA/IENvbmZpZy5PUklfSE9SSVpPTlRBTCA6XG5cdFx0XHRcdFx0XHRcdC0xO1xuXHRcdHJldHVybiBvcmk7XG5cdH1cblxuXHRzZXRWaWV3cG9ydFNpemUoc2l6ZSl7XG5cdFx0aWYodHlwZW9mIHNpemUgIT09IFwibnVtYmVyXCIgfHwgc2l6ZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzaXplIHNob3VsZCBiZSB0eXBlb2Ygb2YgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwOiBcIiArIHNpemUpO1xuXHRcdH1cblx0XHRsZXQgd2lkdGggPSB0aGlzLl9lbGVGcmV0Ym9hcmQuZ2V0RWxlKCkuc2Nyb2xsV2lkdGg7XG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuX2VsZUZyZXRib2FyZC5nZXRFbGUoKS5zY3JvbGxIZWlnaHQ7XG5cdFx0aWYodGhpcy5nZXRPcmllbnRhdGlvbigpID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMKXtcblx0XHRcdGhlaWdodCA9IChoZWlnaHQgPD0gc2l6ZSkgPyBcImF1dG9cIiA6IChzaXplLnRvU3RyaW5nKCkgKyBcInB4XCIpO1xuXHRcdFx0d2lkdGggPSBcImF1dG9cIjtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmdldE9yaWVudGF0aW9uKCkgPT09IENvbmZpZy5PUklfSE9SSVpPTlRBTCl7XG5cdFx0XHRoZWlnaHQgPSBcImF1dG9cIjtcblx0XHRcdHdpZHRoID0gKHdpZHRoIDw9IHNpemUpID8gXCJhdXRvXCIgOiAoc2l6ZS50b1N0cmluZygpICsgXCJweFwiKTtcblx0XHR9XG5cdFx0dGhpcy5fdWlWaWV3cG9ydENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuX3VpVmlld3BvcnRDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuX3ZpZXdwb3J0U2l6ZSA9IHNpemU7XG5cdFx0cmV0dXJuIHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fTtcblx0fVxuXG5cdGdldFZpZXdwb3J0U2l6ZSgpe1xuXHRcdHJldHVybiB0aGlzLl92aWV3cG9ydFNpemU7XG5cdH1cbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7QWJzdHJhY3RGcmV0Ym9hcmR9IGZyb20gXCIuL0Fic3RyYWN0RnJldGJvYXJkXCI7XG5pbXBvcnQge0VsZU5vdGV9IGZyb20gXCIuL0VsZU5vdGVcIjtcbmltcG9ydCB7RWxlU3RyaW5nfSBmcm9tIFwiLi9FbGVTdHJpbmdcIjtcbmltcG9ydCB7RWxlRnJldGJvYXJkfSBmcm9tIFwiLi9FbGVGcmV0Ym9hcmRcIjtcbmltcG9ydCB7RnJldGJvYXJkQXdlc29tZX0gZnJvbSBcIi4vRnJldGJvYXJkQXdlc29tZVwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG4oZnVuY3Rpb24od2luKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGZhID0ge1xuXHRcdE11c2ljVGhlb3J5OiBNdXNpY1RoZW9yeSxcblx0XHROb3RlOiBOb3RlLFxuXHRcdEVsZU5vdGU6IEVsZU5vdGUsXG5cdFx0QWJzdHJhY3RGcmV0Ym9hcmQ6IEFic3RyYWN0RnJldGJvYXJkLFxuXHRcdEVsZUZyZXRib2FyZDogRWxlRnJldGJvYXJkLFxuXHRcdEVsZVN0cmluZzogRWxlU3RyaW5nLFxuXHRcdEZyZXRib2FyZEF3ZXNvbWU6IEZyZXRib2FyZEF3ZXNvbWUsXG5cdFx0Q29uZmlnOiBDb25maWdcblx0fVxuXG5cdHdpbi5mYSA9IGZhO1xufSkod2luZG93KTtcbiIsImV4cG9ydCBjbGFzcyBNdXNpY1RoZW9yeSB7XG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RlIC0gYWNjZXB0IGEgc3RyaW5nIGluIHNwZWNpZmllZCBub3RhdGlvbiwgc2VlIG5vcm1hbGl6ZSgpIGZvciBtb3JlIGluZm8uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IGNvbnZlcnRUbyAtIHNob3VsZCBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIgaW4gc3RyaW5nIHR5cGUuXG5cdFx0QHJldHVybiB7c3RyaW5nfSAtIHdpbGwgcmV0dXJuIHRoZSBxdWVyeSByZXN1bHQuXG5cdCovXG5cdHN0YXRpYyBjb252ZXJ0QWNjaWRlbnRhbChub3RlLCBjb252ZXJ0VG8gPSBcIiNcIil7XG5cdFx0aWYoY29udmVydFRvICE9PSBcIiNcIiAmJiBjb252ZXJ0VG8gIT09IFwiYlwiKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJjb252ZXJ0VG8gc2hvdWxkIGVpdGhlciBiZSAnIycgb3IgJ2InIGluIHN0cmluZyB0eXBlOiBcIiArIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHRcdGlmKG5vdGUgaW5zdGFuY2VvZiBBcnJheSl7XG5cdFx0XHRyZXR1cm4gY29udmVydEFycmF5KG5vdGUsIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRyZXR1cm4gY29udmVydFNpbmdsZShub3RlLCBjb252ZXJ0VG8pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNvbnZlcnRBcnJheShub3RlcywgY29udmVydFRvKXtcblx0XHRcdHRyeXtcblx0XHRcdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNvbnZlcnRTaW5nbGUobm90ZXNbaV0sIGNvbnZlcnRUbykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGUgKyBcIiBbXCIgKyBub3RlcyArIFwiXVwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb252ZXJ0U2luZ2xlKG5vdGUsIGNvbnZlcnRUbyl7XG5cdFx0XHRsZXQgcmVzdWx0ID0gTXVzaWNUaGVvcnkubm9ybWFsaXplKG5vdGUpO1xuXHRcdFx0bGV0IHNhbWVOb3RhdGlvbiA9IHJlc3VsdFsxXSA9PT0gY29udmVydFRvO1xuXHRcdFx0aWYocmVzdWx0Lmxlbmd0aCA9PT0gMSB8fCBzYW1lTm90YXRpb24pe1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0VG8gPT09IFwiI1wiKXtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0aWYoTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFUW2ldID09PSByZXN1bHQpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlBbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKGNvbnZlcnRUbyA9PT0gXCJiXCIpe1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19TSEFSUC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0aWYoTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19TSEFSUFtpXSA9PT0gcmVzdWx0KXtcblx0XHRcdFx0XHRcdHJldHVybiBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVRbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3QgZm91bmQ6IFwiICsgcmVzdWx0ICsgXCIgXCIgKyBjb252ZXJ0VG8pO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwid2hhdCdzIHRoZSBzb3JjZXJ5PyBcIiArIHJlc3VsdCArIFwiIFwiICsgY29udmVydFRvKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZywgYXJyYXl9IG5vdGUgLSBhY2NlcHRzIHN0cmluZyBvZiBhcnJheSBvZiBzdHJpbmdzLiBzdHJpbmcgc2hvdWxkIGJlIHdpdGhpbiAyIGNoYXJhY3RlcnMgbG9uZyBhbmQgd3JpdHRlbiBpbiBmYXNoaW9uIGxpa2UgXCJDYlwiLCBcIkRcIiwgXCJEI1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgaWYgeW91IGlucHV0IFwiQ2JiYmJiXCIsIHRoZSBmdW5jdGlvbiB3aWxsIHN0aWxsIGRvIHRoZSBwYXJzZSBhbmQgcmV0dXJuIFwiQ2JcIiBhcyB0aGUgcmVzdWx0LlxuXHRcdEByZXR1cm4ge251bGwsIHN0cmluZ30gLSB3aWxsIHJldHVybiBudWxsIGlmIG5vIHBhdHRlcm4gaXMgZm91bmQsIG9yIHJldHVybiBhIHN0cmluZyB3aXRoIGNhcGl0YWxpemVkIGZpcnN0IGxldHRlciB3aXRoaW4gMiBsZW5ndGguXG5cdCovXG5cdHN0YXRpYyBub3JtYWxpemUobm90ZSl7XG5cdFx0aWYodHlwZW9mIG5vdGUgPT09IFwic3RyaW5nXCIgfHwgbm90ZSBpbnN0YW5jZW9mIFN0cmluZyl7XG5cdFx0XHRyZXR1cm4gbm9ybWFsaXplU2luZ2xlKG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlIGlmKG5vdGUgaW5zdGFuY2VvZiBBcnJheSl7XG5cdFx0XHRyZXR1cm4gbm9ybWFsaXplQXJyYXkobm90ZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IG5vdGUgc2h1b2xkIGJlIGVpdGhlciBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5nczogXCIgKyBub3RlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBub3JtYWxpemVBcnJheShub3Rlcyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChub3JtYWxpemVTaW5nbGUobm90ZXNbaV0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlKG5vdGUpe1xuXHRcdFx0bGV0IHNoYXJwUmVzdWx0ID0gTXVzaWNUaGVvcnkuTk9UQVRJT05fU0hBUlAuZXhlYyhub3RlKTtcblx0XHRcdGxldCBmbGF0UmVzdWx0ID0gTXVzaWNUaGVvcnkuTk9UQVRJT05fRkxBVC5leGVjKG5vdGUpO1xuXHRcdFx0c2hhcnBSZXN1bHQgPSBzaGFycFJlc3VsdCA/IHNoYXJwUmVzdWx0WzBdIDogbnVsbDtcblx0XHRcdGZsYXRSZXN1bHQgPSBmbGF0UmVzdWx0ID8gZmxhdFJlc3VsdFswXSA6IG51bGw7XG5cdFx0XHRpZihzaGFycFJlc3VsdCB8fCBmbGF0UmVzdWx0KXtcblx0XHRcdFx0bGV0IHJlc3VsdCA9IChzaGFycFJlc3VsdC5sZW5ndGggPiBmbGF0UmVzdWx0Lmxlbmd0aCkgPyBzaGFycFJlc3VsdCA6IGZsYXRSZXN1bHQ7XG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdFswXS50b1VwcGVyQ2FzZSgpICsgcmVzdWx0LnNsaWNlKDEpO1xuXHRcdFx0XHRyZXN1bHQgPSAocmVzdWx0ID09PSBcIkNiXCIpID8gXCJCXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCA9PT0gXCJCI1wiKSA/IFwiQ1wiIDpcblx0XHRcdFx0XHRcdFx0XHRcdChyZXN1bHQgPT09IFwiRmJcIikgPyBcIkVcIiA6XG5cdFx0XHRcdFx0XHRcdFx0XHQocmVzdWx0ID09PSBcIkUjXCIpID8gXCJGXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0O1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90ZTogXCIgKyBub3RlICsgXCIgaXMgbm90IGFuIGFjY2VwdGFibGUgcGF0dGVybi5cIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IHN0YXJ0S2V5IC0gdGhlIGtleSB5b3Ugd2FudCB0byBzdGFydCB3aXRoLiBGb3JtYXQgc2hvdWxkIGJlIFwiQyNcIiwgXCJkXCIsIFwiZWJcIi4uLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBob3cgbG9uZyB0aGUgYXJyYXkgc2hvdWxkIGZ1bmN0aW9uIHJldHVybi5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm9yYXRpb24gLSBlaXRoZXIgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtib29sZWFufSBpbmNsdWRlT3BlbkZyZXQgLSB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlIHN0YXJ0IGtleS5cblx0XHRAcmV0dXJuIHthcnJheX0gLSBhbiBhcnJheSB3aXRoIHN0cmluZyBjb250YWlucyB0aGUgc2VxdWVuY2Ugb2Yga2V5cy5cblx0Ki9cblx0c3RhdGljIHR1bmluZyhzdGFydEtleSA9IFwiQ1wiLCBsZW5ndGggPSA3LCBub3RhdGlvbiA9IFwiI1wiLCBpbmNsdWRlT3BlbkZyZXQgPSB0cnVlKXtcblx0XHRpZigodHlwZW9mIHN0YXJ0S2V5ID09PSBcInN0cmluZ1wiIHx8IHN0YXJ0S2V5IGluc3RhbmNlb2YgU3RyaW5nKSAmJlxuXHRcdFx0XHQobm90YXRpb24gPT09IFwiI1wiIHx8IG5vdGF0aW9uID09PSBcImJcIikgJiZcblx0XHRcdFx0KHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCkgJiZcblx0XHRcdFx0KHR5cGVvZiBpbmNsdWRlT3BlbkZyZXQgPT09IFwiYm9vbGVhblwiKSl7XG5cdFx0XHRzdGFydEtleSA9IE11c2ljVGhlb3J5LmNvbnZlcnRBY2NpZGVudGFsKHN0YXJ0S2V5LCBub3RhdGlvbik7XG5cdFx0XHRsZXQgc3RhcnRJbmRleCA9IDA7XG5cdFx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0XHRpZihub3RhdGlvbiA9PT0gXCIjXCIpe1xuXHRcdFx0XHRzdGFydEluZGV4ID0gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19TSEFSUC5pbmRleE9mKHN0YXJ0S2V5KTtcblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhcnRJbmRleCwgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW5ndGg7IGkrKywgY291bnRlcisrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChpbmZpbml0ZUluZGV4aW5nKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAsIGkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihub3RhdGlvbiA9PT0gXCJiXCIpe1xuXHRcdFx0XHRzdGFydEluZGV4ID0gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFULmluZGV4T2Yoc3RhcnRLZXkpO1xuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFydEluZGV4LCBjb3VudGVyID0gMDsgY291bnRlciA8IGxlbmd0aDsgaSsrLCBjb3VudGVyKyspe1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGluZmluaXRlSW5kZXhpbmcoTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFULCBpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBpbmNsdWRlT3BlbkZyZXQgPyByZXN1bHQgOiByZXN1bHQuc2xpY2UoMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIm9uZSBvZiB0aGUgZm9sbG93aW5nIHBhcmFtZXRlciBpcyBub3QgdmFsaWQ6IFwiICsgXCJcXG5cIiArIHN0YXJ0S2V5ICsgXCJcXG5cIiArIGxlbmd0aCArIFwiXFxuXCIgKyBub3RhdGlvbiArIFwiXFxuXCIgKyBpbmNsdWRlT3BlbkZyZXQpO1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ3aGF0J3MgdGhlIHNvcmNlcnk/IFwiICsgc3RhcnRLZXkgKyBcIiBcIiArIGxlbmd0aCArIFwiIFwiICsgbm90YXRpb24gKyBcIiBcIiArIGluY2x1ZGVPcGVuRnJldCk7XG5cblx0XHRmdW5jdGlvbiBpbmZpbml0ZUluZGV4aW5nKGFycmF5LCBpbmRleCl7XG5cdFx0XHRpbmRleCA9IGluZGV4ICUgYXJyYXkubGVuZ3RoO1xuXHRcdFx0cmV0dXJuIGFycmF5W2luZGV4XTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PVEFUSU9OX1NIQVJQKCkgeyByZXR1cm4gL15bYS1nfEEtR10jPy87IH1cblx0c3RhdGljIGdldCBOT1RBVElPTl9GTEFUKCkgeyByZXR1cm4gL15bYS1nfEEtR11iPy87IH1cblxuXHRzdGF0aWMgZ2V0IEtFWVNfQUNDSURFTlRBTFNfU0hBUlAoKXsgcmV0dXJuIFtcIkFcIiwgXCJBI1wiLCBcIkJcIiwgXCJDXCIsIFwiQyNcIiwgXCJEXCIsIFwiRCNcIiwgXCJFXCIsIFwiRlwiLCBcIkYjXCIsIFwiR1wiLCBcIkcjXCJdOyB9XG5cdHN0YXRpYyBnZXQgS0VZU19BQ0NJREVOVEFMU19GTEFUKCl7IHJldHVybiBbXCJBXCIsIFwiQmJcIiwgXCJCXCIsIFwiQ1wiLCBcIkRiXCIsIFwiRFwiLCBcIkViXCIsIFwiRVwiLCBcIkZcIiwgXCJHYlwiLCBcIkdcIiwgXCJBYlwiXTsgfVxuXG5cdHN0YXRpYyBnZXQgU1RBTkRBUkRfR1VJVEFSX1NUUklOR1MoKXsgcmV0dXJuIDY7IH1cblx0c3RhdGljIGdldCBTVEFOREFSRF9HVUlUQVJfVFVOSU5HKCl7IHJldHVybiBbXCJFXCIsIFwiQVwiLCBcIkRcIiwgXCJHXCIsIFwiQlwiLCBcIkVcIl07IH1cbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5cbmV4cG9ydCBjbGFzcyBOb3RlIHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl9ub3RlTmFtZSA9IFwiXCI7XG5cdH1cblxuXHRpbml0KG5vdGUsIG5vdGF0aW9uID0gXCIjXCIpe1xuXHRcdHRoaXMuc2V0Tm90ZU5hbWUobm90ZSwgbm90YXRpb24pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGUgLSBvbmx5IHRha2VzIHN0cmluZy4gVGhlIGZvcm1hdCBzaG91bGQgYmUgXCJkI1wiLCBcIkVcIiwgXCJjYlwiLi4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gb25seSB0YWtlcyBzdHJpbmcuIFRoZSBmb3JtYXQgc2hvdWxkIGVpdGhlciBiZSBcIiNcIiBvciBcImJcIi5cblx0Ki9cblx0c2V0Tm90ZU5hbWUobm90ZSwgbm90YXRpb24gPSBcIiNcIikge1xuXHRcdGlmKHR5cGVvZiBub3RlID09PSBcInN0cmluZ1wiIHx8IG5vdGUgaW5zdGFuY2VvZiBTdHJpbmcpe1xuXHRcdFx0dGhpcy5fbm90ZU5hbWUgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbChub3RlLCBub3RhdGlvbik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RlIHNob3VsZCBiZSB0eXBlIG9mIHN0cmluZzogXCIgKyBub3RlKTtcblx0XHR9XG5cdH1cblxuXHRnZXROb3RlTmFtZSgpeyByZXR1cm4gdGhpcy5fbm90ZU5hbWU7IH1cbn1cbiJdfQ==
