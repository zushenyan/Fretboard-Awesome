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

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
		this._tuning = _MusicTheory.MusicTheory.STANDARD_GUITAR_TUNING;
		this._notation = "#";
		this._fretboardLength = 12;
		this._stringStartGauge = 6;
		this._orientation = _Config.Config.ORI_VERTICAL;
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

	_createClass(EleFretboard, [{
		key: "init",
		value: function init() {
			var tuning = arguments.length <= 0 || arguments[0] === undefined ? this.getTuning() : arguments[0];
			var notation = arguments.length <= 1 || arguments[1] === undefined ? this.getNotation() : arguments[1];
			var fretboardLength = arguments.length <= 2 || arguments[2] === undefined ? this.getFretboardLength() : arguments[2];
			var stringStartGauge = arguments.length <= 3 || arguments[3] === undefined ? this.getStringStartGauge() : arguments[3];
			var orientation = arguments.length <= 4 || arguments[4] === undefined ? this.getOrientation() : arguments[4];

			this.setTuning(tuning);
			this.setNotation(notation);
			this.setFretboardLength(fretboardLength);
			this.setStringStartGauge(stringStartGauge);
			this.setOrientation(orientation);
			return this;
		}
	}, {
		key: "_recreateStrings",
		value: function _recreateStrings() {
			this._uiFretboard.innerHTML = "";
			this._eleStrings = [];
			for (var i = 0; i < this.getTuning().length; i++) {
				var result = new _EleString.EleString().init(this.getTuning()[i], this.getNotation(), this.getFretboardLength(), this.getStringStartGauge() - i, this.getOrientation());
				this._eleStrings.push(result);
				this._uiFretboard.appendChild(result.getEle());
			}
			this.markKeys(this.getMarkKeys());
			this.markInlays(this.getMarkInlays());
		}

		/**
  	@param {string} tuning - in what key we are tuning.
  */
	}, {
		key: "setTuning",
		value: function setTuning(tuning) {
			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
			}
			this._tuning = _MusicTheory.MusicTheory.convertAccidental(tuning, this.getNotation());
			this._recreateStrings();
		}
	}, {
		key: "getTuning",
		value: function getTuning() {
			return this._tuning;
		}
	}, {
		key: "setNotation",

		/**
  	@param {string} notation - in either "#" or "b".
  */
		value: function setNotation(notation) {
			if (!(typeof notation === "string" || notation instanceof String)) {
				throw new TypeError("parameter notation should be typef of string: " + notation);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			this._notation = notation;
			this.setTuning(this.getTuning());
		}
	}, {
		key: "getNotation",
		value: function getNotation() {
			return this._notation;
		}

		/**
  	@param {number} length - how long should the fretboard be.
  */
	}, {
		key: "setFretboardLength",
		value: function setFretboardLength(length) {
			if (typeof length !== "number" || length < 0) {
				throw new TypeError("parameter length should be greater than 0:" + length);
			}
			this._fretboardLength = length;
			this._recreateStrings();
		}
	}, {
		key: "getFretboardLength",
		value: function getFretboardLength() {
			return this._fretboardLength;
		}
	}, {
		key: "setStringStartGauge",

		/**
  	@param {number} startGauge - how thick is the leftest string. The following strings' thickness will be in descended order.
  */
		value: function setStringStartGauge(startGauge) {
			if (typeof startGauge !== "number" || startGauge < 0) {
				throw new TypeError("parameter startGauge should be greater than -1:" + startGauge);
			}
			// for(let i = 0; i < this._eleStrings.length; i++){
			// 	this._eleStrings[i].setStringStartGauge(startGauge - i);
			// }
			this._stringStartGauge = startGauge;
			this._recreateStrings();
		}
	}, {
		key: "getStringStartGauge",
		value: function getStringStartGauge() {
			return this._stringStartGauge;
		}

		/**
  	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
  */
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL: " + orientation);
			}
			// for(let i = 0; i < this._eleStrings.length; i++){
			// 	this._eleStrings[i].setOrientation(orientation);
			// }
			this._orientation = orientation;
			this._recreateStrings();
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
		key: "getStringGauges",
		value: function getStringGauges() {
			var result = [];
			for (var i = 0; i < this._eleStrings.length; i++) {
				result.push(this._eleStrings[i].getStringGauge());
			}
			return result;
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
			var result = [];
			for (var i = 0; i < this._eleStrings.length; i++) {
				var r = this._eleStrings[i].markKeys(target);
				result.push(r);
			}
			this._markKeys = target;
			return result;
		}
	}, {
		key: "getMarkKeys",
		value: function getMarkKeys() {
			return this._markKeys;
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
			var length = this._eleStrings.length;
			var mid = Math.round(length / 2 - 1);
			mid = mid < 0 ? 0 : mid > length ? length : mid;
			this._markInlays = targetFrets;
			if (this._eleStrings[mid]) {
				return this._eleStrings[mid].markInlays(targetFrets);
			} else {
				return null;
			}
		}
	}, {
		key: "getMarkInlays",
		value: function getMarkInlays() {
			return this._markInlays;
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

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Note2 = require("./Note");

var _Config = require("./Config");

var EleNote = (function (_Note) {
	_inherits(EleNote, _Note);

	function EleNote() {
		_classCallCheck(this, EleNote);

		_get(Object.getPrototypeOf(EleNote.prototype), "constructor", this).call(this);

		this._stringGauge = 12;
		this._orientation = _Config.Config.ORI_VERTICAL;

		this._uiNote = document.createElement("div");
		this._uiString = document.createElement("div");
		this._uiNoteTextContainer = document.createElement("div");
		this._uiNoteText = document.createElement("div");

		this._uiNoteTextContainer.classList.add("fa-note");
		this._uiNoteText.classList.add("fa-note-text");
		this._uiString.classList.add("fa-string-image");
		this._uiNote.classList.add("fa-fret");

		this._uiNoteTextContainer.appendChild(this._uiNoteText);
		this._uiNote.appendChild(this._uiString);
		this._uiNote.appendChild(this._uiNoteTextContainer);
	}

	/**
 	@param {string} note - format "d#", "E", "G#".
 	@param {string} notation - either be "#" or "b".
 	@param {string} bgColor - color format in string.
 	@param {number} gauge - how thick the string will be displayed, unit in px.
 	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
 */

	_createClass(EleNote, [{
		key: "init",
		value: function init() {
			var note = arguments.length <= 0 || arguments[0] === undefined ? this.getNoteName() : arguments[0];
			var notation = arguments.length <= 1 || arguments[1] === undefined ? this.getNotetation() : arguments[1];
			var bgColor = arguments.length <= 2 || arguments[2] === undefined ? this.getBgColor() : arguments[2];
			var gauge = arguments.length <= 3 || arguments[3] === undefined ? this.getStringGauge() : arguments[3];
			var orientation = arguments.length <= 4 || arguments[4] === undefined ? this.getOrientation() : arguments[4];

			_get(Object.getPrototypeOf(EleNote.prototype), "init", this).call(this, note, notation);
			this.setNoteName(note, notation);
			this.setBgColor(bgColor);
			this.setStringGauge(gauge);
			this.setOrientation(orientation);
			this.hide();
			return this;
		}
	}, {
		key: "getEle",
		value: function getEle() {
			return this._uiNote;
		}

		/**
  	@override
  */
	}, {
		key: "setNoteName",
		value: function setNoteName(noteName) {
			if (!(typeof noteName === "string" || noteName instanceof String)) {
				throw new TypeError("parameter noteName should be type of string: " + noteName);
			}
			_get(Object.getPrototypeOf(EleNote.prototype), "setNoteName", this).call(this, noteName);
			this._uiNoteText.innerHTML = "";
			this._uiNoteText.appendChild(document.createTextNode(this.getNoteName()));
		}

		/**
  	@param {string} notation - either be "#" or "b".
  */
	}, {
		key: "setNotation",
		value: function setNotation(notation) {
			if (!(typeof notation === "string" || notation instanceof String)) {
				throw new TypeError("parameter notation should be typef of string: " + notation);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			_get(Object.getPrototypeOf(EleNote.prototype), "setNotation", this).call(this, notation);
			this.setNoteName(this.getNoteName());
		}

		/**
  	@param {string} bgColor - color format in string.
  */
	}, {
		key: "setBgColor",
		value: function setBgColor(bgColor) {
			if (!(typeof bgColor === "string" || bgColor instanceof String)) {
				throw new TypeError("parameter bgColor should be type of string: " + bgColor);
			}
			this._uiNoteTextContainer.style.backgroundColor = bgColor;
		}
	}, {
		key: "getBgColor",
		value: function getBgColor() {
			return this._uiNoteTextContainer.style.backgroundColor;
		}

		/**
  	@param {number} gauge - how thick the string will be displayed, unit in px.
  */
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

		/**
  	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
  */
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

		this._tune = "A";
		this._notation = "#";
		this._stringLength = 12;
		this._stringGauge = 6;
		this._orientation = _Config.Config.ORI_VERTICAL;
		this._markKeys = [];
		this._markInlays = [];

		this._eleNotes = []; // array of EleNote
		this._uiString = document.createElement("div");
		this._uiString.classList.add("fa-string");
	}

	/**
 	@param {string} tune - format "d#", "E", "G#".
 	@param {string} notation - either be "#" or "b".
 	@param {number} stringLength - how long should the fretboard be.
 	@param {number} gauge - how thick the string will be displayed, unit in px.
 	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
 */

	_createClass(EleString, [{
		key: "init",
		value: function init() {
			var tune = arguments.length <= 0 || arguments[0] === undefined ? this.getTune() : arguments[0];
			var notation = arguments.length <= 1 || arguments[1] === undefined ? this.getNotation() : arguments[1];
			var stringLength = arguments.length <= 2 || arguments[2] === undefined ? this.getStringLength() : arguments[2];
			var stringGauge = arguments.length <= 3 || arguments[3] === undefined ? this.getStringGauge() : arguments[3];
			var orientation = arguments.length <= 4 || arguments[4] === undefined ? this.getOrientation() : arguments[4];

			this.setTune(tune);
			this.setNotation(notation);
			this.setStringLength(stringLength);
			this.setStringGauge(stringGauge);
			this.setOrientation(orientation);
			return this;
		}
	}, {
		key: "_recreateNotes",
		value: function _recreateNotes() {
			var notes = _MusicTheory.MusicTheory.tuning(this.getTune(), this.getStringLength() + 1, this.getNotation(), false);
			this._uiString.innerHTML = "";
			this._eleNotes = [];
			for (var i = 0; i < notes.length; i++) {
				var result = new _EleNote.EleNote().init(notes[i], this.getNotation(), "white", this.getStringGauge(), this.getOrientation());
				this._eleNotes.push(result);
				this._uiString.appendChild(result.getEle());
			}
			this.markKeys(this.getMarkKeys());
			this.markInlays(this.getMarkInlays());
		}

		/**
  	@param {string} tune - in what key we are tuning.
  */
	}, {
		key: "setTune",
		value: function setTune(tune) {
			if (!(typeof tune === "string" || tune instanceof String)) {
				throw new TypeError("parameter tune should be string: " + tune);
			}
			this._tune = _MusicTheory.MusicTheory.convertAccidental(tune, this.getNotation());
			this._recreateNotes();
		}
	}, {
		key: "getTune",
		value: function getTune() {
			return this._tune;
		}

		/**
  	@param {string} notation - in either "#" or "b".
  */
	}, {
		key: "setNotation",
		value: function setNotation(notation) {
			if (!(typeof notation === "string" || notation instanceof String)) {
				throw new TypeError("parameter notation should be typef of string: " + notation);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			this._notation = notation;
			this.setTune(this.getTune());
		}
	}, {
		key: "getNotation",
		value: function getNotation() {
			return this._notation;
		}

		/**
  	@param {number} length - how long should the fretboard be.
  */
	}, {
		key: "setStringLength",
		value: function setStringLength(length) {
			if (typeof length !== "number" || length < 0) {
				throw new TypeError("parameter length should be greater than 0:" + length);
			}
			this._stringLength = length;
			this._recreateNotes();
		}
	}, {
		key: "getStringLength",
		value: function getStringLength() {
			return this._stringLength;
		}
	}, {
		key: "setStringGauge",

		/**
  	@param {number} gauge - how thick the string will be displayed, unit in px.
  */
		value: function setStringGauge(gauge) {
			if (typeof gauge !== "number" || gauge < 0) {
				throw new TypeError("parameter gauge should be greater than 0:" + gauge);
			}
			for (var i = 0; i < this._eleNotes.length; i++) {
				this._eleNotes[i].setStringGauge(gauge);
			}
			this._stringGauge = gauge;
			this._recreateNotes();
		}
	}, {
		key: "getStringGauge",
		value: function getStringGauge() {
			return this._stringGauge;
		}

		/**
  	@param {number} orientation - which orientation the string will be displayed. Should be either Config.ORI_VERTICAL or Config.ORI_HORIZONTAL;
  */
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
			this._recreateNotes();
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
			this._markKeys = target;
			return result;

			function resetDisplay() {
				for (var i = 0; i < this._eleNotes.length; i++) {
					this._eleNotes[i].hide();
					this._eleNotes[i].setBgColor("white");
				}
			}
		}
	}, {
		key: "getMarkKeys",
		value: function getMarkKeys() {
			return this._markKeys;
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
  	@param {array} targetFrets - indicates which frets you want to mark inlays. Will ignore if target fret doesn't exist.
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
			targetFrets = trimArray(targetFrets, this.getStringLength());
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
			this._markInlays = targetFrets;
			return result;

			function clearInlays() {
				for (var i = 0; i < this._eleNotes.length; i++) {
					this._eleNotes[i].removeInlays();
				}
			}

			function trimArray(arr, number) {
				arr = findUnique(arr.sort(function (a, b) {
					return a - b;
				}));
				arr = arr.filter(function (value) {
					return value <= number;
				});
				return arr;

				function findUnique(arr) {
					return arr.reduce(function (a, r) {
						if (a.indexOf(r) < 0) {
							a.push(r);
						}
						return a;
					}, []);
				}
			}
		}
	}, {
		key: "getMarkInlays",
		value: function getMarkInlays() {
			return this._markInlays;
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

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EleFretboard2 = require("./EleFretboard");

var _Config = require("./Config");

var _MusicTheory = require("./MusicTheory");

var FretboardAwesome = (function (_EleFretboard) {
	_inherits(FretboardAwesome, _EleFretboard);

	function FretboardAwesome() {
		_classCallCheck(this, FretboardAwesome);

		_get(Object.getPrototypeOf(FretboardAwesome.prototype), "constructor", this).call(this);
		this._domId = "";
		this._viewportSize = _Config.Config.VIEWPORT_SIZE_DEFAULT;

		this._isDragging = false;
		this._scrollPosition = { x: 0, y: 0 };

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

	_createClass(FretboardAwesome, [{
		key: "init",
		value: function init(targetId) {
			var tuning = arguments.length <= 1 || arguments[1] === undefined ? this.getTuning() : arguments[1];
			var notation = arguments.length <= 2 || arguments[2] === undefined ? this.getNotation() : arguments[2];
			var fretboardLength = arguments.length <= 3 || arguments[3] === undefined ? this.getFretboardLength() : arguments[3];
			var stringStartGauge = arguments.length <= 4 || arguments[4] === undefined ? this.getStringStartGauge() : arguments[4];
			var orientation = arguments.length <= 5 || arguments[5] === undefined ? this.getOrientation() : arguments[5];
			var viewportSize = arguments.length <= 6 || arguments[6] === undefined ? this.getViewportSize() : arguments[6];

			initUI.call(this, targetId);
			_get(Object.getPrototypeOf(FretboardAwesome.prototype), "init", this).call(this, tuning, notation, fretboardLength, stringStartGauge, orientation);
			this._updateTuningUI();
			this.setViewportSize(viewportSize);
			this.setOrientation(orientation);
			return this;

			function initUI(targetId) {
				this._uiMainContainer = document.getElementById(targetId);

				this._uiMainContainer.classList.add("fa-container");
				this._uiTuningContainer.classList.add("fa-tuning");
				this._uiViewportContainer.classList.add("fa-viewport");

				this._uiViewportContainer.appendChild(this.getEle());
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
						ele.scrollLeft;
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
  	@override
  */
	}, {
		key: "setTuning",
		value: function setTuning(tuning) {
			_get(Object.getPrototypeOf(FretboardAwesome.prototype), "setTuning", this).call(this, tuning);
			this._updateTuningUI();
		}

		/**
  	@override
  */
	}, {
		key: "setFretboardLength",
		value: function setFretboardLength(length) {
			_get(Object.getPrototypeOf(FretboardAwesome.prototype), "setFretboardLength", this).call(this, length);
			this.setViewportSize(this.getViewportSize());
		}

		/**
  	@private
  */
	}, {
		key: "_updateTuningUI",
		value: function _updateTuningUI() {
			var tuning = this.getTuning();
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

		/**
  	@override
  */
	}, {
		key: "setOrientation",
		value: function setOrientation(orientation) {
			if (!(orientation === _Config.Config.ORI_VERTICAL || orientation === _Config.Config.ORI_HORIZONTAL)) {
				throw new TypeError("parameter orientation should be either FretboardAwesome.ORI_VERTICAL or FretboardAwesome.ORI_HORIZONTAL: " + orientation);
			}
			var className = orientation === _Config.Config.ORI_VERTICAL ? _Config.Config.ORI_VERTICAL : _Config.Config.ORI_HORIZONTAL;
			this._uiMainContainer.classList.remove(_Config.Config.ORI_VERTICAL);
			this._uiMainContainer.classList.remove(_Config.Config.ORI_HORIZONTAL);
			this._uiMainContainer.classList.add(className);
			_get(Object.getPrototypeOf(FretboardAwesome.prototype), "setOrientation", this).call(this, orientation);
			this.setViewportSize(this.getViewportSize());
		}
	}, {
		key: "setViewportSize",
		value: function setViewportSize(size) {
			if (typeof size !== "number" || size < 0) {
				throw new TypeError("parameter size should be typeof of number greater than 0: " + size);
			}
			var width = this.getEle().scrollWidth;
			var height = this.getEle().scrollHeight;
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
})(_EleFretboard2.EleFretboard);

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
  	@param {string, array} note - accept a string in specified notation, see normalize() for more info.
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

		this._noteName = "A";
		this._notation = "#";
	}

	_createClass(Note, [{
		key: "init",
		value: function init(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];

			this.setNotation(notation);
			this.setNoteName(note);
			return this;
		}

		/**
  	@param {string} note - only takes string. The format should be "d#", "E", "cb"...
  */
	}, {
		key: "setNoteName",
		value: function setNoteName(note) {
			if (!(typeof note === "string" || note instanceof String)) {
				throw new TypeError("parameter note should be type of string: " + note);
			}
			this._noteName = _MusicTheory.MusicTheory.convertAccidental(note, this.getNotation());
		}
	}, {
		key: "getNoteName",
		value: function getNoteName() {
			return this._noteName;
		}

		/**
  	@param {string} notation - only takes string. The format should either be "#" or "b".
  */
	}, {
		key: "setNotation",
		value: function setNotation(notation) {
			if (!(typeof notation === "string" || notation instanceof String)) {
				throw new TypeError("parameter notation should be type of string: " + notation);
			}
			if (!(notation === "#" || notation === "b")) {
				throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
			}
			this._notation = notation;
			this.setNoteName(this.getNoteName(), this.getNotation());
		}
	}, {
		key: "getNotation",
		value: function getNotation() {
			return this._notation;
		}
	}]);

	return Note;
})();

exports.Note = Note;

},{"./MusicTheory":8}]},{},[7])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0Fic3RyYWN0RnJldGJvYXJkLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9Db25maWcuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZUZyZXRib2FyZC5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlTm90ZS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRWxlU3RyaW5nLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9GcmV0Ym9hcmRBd2Vzb21lLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9NYWluLmpzIiwiL1VzZXJzL3p1c2hlbnlhbi9Eb2N1bWVudHMvR2l0aHViL0ZyZXRib2FyZC1Bd2Vzb21lL3NyYy9iYWJlbC9NdXNpY1RoZW9yeS5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvTm90ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNHYSxpQkFBaUI7QUFDbEIsVUFEQyxpQkFBaUIsR0FDaEI7d0JBREQsaUJBQWlCOztBQUU1QixNQUFHLElBQUksQ0FBQyxX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QUksQ0FBQyxTQUFTLEdBQUcseUJBQVksaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0dBQ3pFOzs7U0FFVSx1QkFBRTtBQUFFLFVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztHQUFFOzs7Ozs7O1NBSzVCLHFCQUFDLFFBQVEsRUFBQztBQUNwQixPQUFHLEVBQUUsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsWUFBWSxNQUFNLENBQUEsQUFBQyxFQUFDO0FBQ2hFLFVBQU0sSUFBSSxTQUFTLENBQUMsK0NBQStDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDaEY7QUFDRCxPQUFHLEVBQUUsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssR0FBRyxDQUFBLEFBQUMsRUFBQztBQUMxQyxVQUFNLElBQUksU0FBUyxDQUFDLGtEQUFrRCxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ25GO0FBQ0QsT0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDMUIsT0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7R0FDekQ7OztTQUVVLHVCQUFFO0FBQUUsVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0dBQUU7OztRQXRDM0IsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcblx0QGFic3RyYWN0XG4qL1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0RnJldGJvYXJke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdGlmKHRoaXMuY29uc3RydWN0b3IgPT09IEFic3RyYWN0RnJldGJvYXJkKXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0J3MgYW4gYWJzdHJhY3QgY2xhc3Mgc2hvdWxkJyBiZSBpbnN0YW50aWF0ZWRcIik7XG5cdFx0fVxuXHRcdHRoaXMuX3R1bmluZyA9IFtdO1xuXHRcdHRoaXMuX3N0cmluZ3MgPSBbXTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvdmVyd3JpdHRlbiBpbml0IG9yIEdURk9cIik7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuaW5nIC0gYXJyYXkgb2Ygc3RyaW5nLiBFYWNoIGVsZW1lbnQgc2hvdWxkIHByZXNlbnQgaW4gZm9ybWF0IGxpa2UgdGhpcyBcIkUjXCIsIFwiY1wiLCBcImRiXCIuLi5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgdGhlIGFycmF5IHNob3VsZCBmdW5jdGlvbiByZXR1cm4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gc2hvdWxkIGJlIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVTdGFydCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHQqL1xuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVTdGFydCA9IGZhbHNlLCBub3RlVHlwZSA9IE5vdGUpe1xuXHRcdHRocm93IG5ldyBFcnJvcihcIm92ZXJ3cml0dGVuIHNldFR1bmluZyBvciBHVEZPXCIpO1xuXHR9XG5cblx0Z2V0VHVuaW5nKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3R1bmluZztcblx0fVxuXG5cdGdldFN0cmluZ3MoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RyaW5ncztcblx0fVxufVxuIiwiZXhwb3J0IGxldCBDb25maWcgPSB7XG5cdEZSRVRfSEVJR0hUX0RFRkFVTFQ6IFwiODBcIixcblx0RlJFVF9XSURUSF9ERURBVUxUOiBcIjQwXCIsXG5cdFZJRVdQT1JUX1NJWkVfREVGQVVMVDogOTk5OTksXG5cdE9SSV9WRVJUSUNBTDogXCJ2ZXJ0aWNhbFwiLFxuXHRPUklfSE9SSVpPTlRBTDogXCJob3Jpem9udGFsXCJcbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge0Fic3RyYWN0RnJldGJvYXJkfSBmcm9tIFwiLi9BYnN0cmFjdEZyZXRib2FyZFwiO1xuaW1wb3J0IHtFbGVTdHJpbmd9IGZyb20gXCIuL0VsZVN0cmluZ1wiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRWxlRnJldGJvYXJkIGV4dGVuZHMgQWJzdHJhY3RGcmV0Ym9hcmR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl90dW5pbmcgPSBNdXNpY1RoZW9yeS5TVEFOREFSRF9HVUlUQVJfVFVOSU5HO1xuXHRcdHRoaXMuX25vdGF0aW9uID0gXCIjXCI7XG5cdFx0dGhpcy5fZnJldGJvYXJkTGVuZ3RoID0gMTI7XG5cdFx0dGhpcy5fc3RyaW5nU3RhcnRHYXVnZSA9IDY7XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBDb25maWcuT1JJX1ZFUlRJQ0FMO1xuXHRcdHRoaXMuX21hcmtLZXlzID0gW107XG5cdFx0dGhpcy5fbWFya0lubGF5cyA9IFtdO1xuXG5cdFx0dGhpcy5fZWxlU3RyaW5ncyA9IFtdOyAvLyBhcnJheSBvZiBlbGVTdHJpbmdcblx0XHR0aGlzLl91aUZyZXRib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGhpcy5fdWlGcmV0Ym9hcmQuY2xhc3NMaXN0LmFkZChcImZhLWZyZXRib2FyZFwiKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5lIC0gZm9ybWF0IFwiZCNcIiwgXCJFXCIsIFwiRyNcIi5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGZyZXRib2FyZExlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgZnJldGJvYXJkIGJlLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBnYXVnZSAtIGhvdyB0aGljayB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLCB1bml0IGluIHB4LlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBvcmllbnRhdGlvbiAtIHdoaWNoIG9yaWVudGF0aW9uIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQuIFNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw7XG5cdCovXG5cdGluaXQoXG5cdFx0dHVuaW5nID0gdGhpcy5nZXRUdW5pbmcoKSxcblx0XHRub3RhdGlvbiA9IHRoaXMuZ2V0Tm90YXRpb24oKSxcblx0XHRmcmV0Ym9hcmRMZW5ndGggPSB0aGlzLmdldEZyZXRib2FyZExlbmd0aCgpLFxuXHRcdHN0cmluZ1N0YXJ0R2F1Z2UgPSB0aGlzLmdldFN0cmluZ1N0YXJ0R2F1Z2UoKSxcblx0XHRvcmllbnRhdGlvbiA9IHRoaXMuZ2V0T3JpZW50YXRpb24oKSl7XG5cblx0XHR0aGlzLnNldFR1bmluZyh0dW5pbmcpO1xuXHRcdHRoaXMuc2V0Tm90YXRpb24obm90YXRpb24pO1xuXHRcdHRoaXMuc2V0RnJldGJvYXJkTGVuZ3RoKGZyZXRib2FyZExlbmd0aCk7XG5cdFx0dGhpcy5zZXRTdHJpbmdTdGFydEdhdWdlKHN0cmluZ1N0YXJ0R2F1Z2UpO1xuXHRcdHRoaXMuc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0X3JlY3JlYXRlU3RyaW5ncygpe1xuXHRcdHRoaXMuX3VpRnJldGJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0dGhpcy5fZWxlU3RyaW5ncyA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFR1bmluZygpLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlU3RyaW5nKCkuaW5pdCh0aGlzLmdldFR1bmluZygpW2ldLCB0aGlzLmdldE5vdGF0aW9uKCksIHRoaXMuZ2V0RnJldGJvYXJkTGVuZ3RoKCksIHRoaXMuZ2V0U3RyaW5nU3RhcnRHYXVnZSgpIC0gaSwgdGhpcy5nZXRPcmllbnRhdGlvbigpKTtcblx0XHRcdHRoaXMuX2VsZVN0cmluZ3MucHVzaChyZXN1bHQpO1xuXHRcdFx0dGhpcy5fdWlGcmV0Ym9hcmQuYXBwZW5kQ2hpbGQocmVzdWx0LmdldEVsZSgpKTtcblx0XHR9XG5cdFx0dGhpcy5tYXJrS2V5cyh0aGlzLmdldE1hcmtLZXlzKCkpO1xuXHRcdHRoaXMubWFya0lubGF5cyh0aGlzLmdldE1hcmtJbmxheXMoKSk7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuaW5nIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0Ki9cblx0c2V0VHVuaW5nKHR1bmluZyl7XG5cdFx0aWYoISh0dW5pbmcgaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0dW5pbmcgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXk6IFwiICsgdHVuaW5nKTtcblx0XHR9XG5cdFx0dGhpcy5fdHVuaW5nID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodHVuaW5nLCB0aGlzLmdldE5vdGF0aW9uKCkpO1xuXHRcdHRoaXMuX3JlY3JlYXRlU3RyaW5ncygpO1xuXHR9XG5cblx0Z2V0VHVuaW5nKCl7IHJldHVybiB0aGlzLl90dW5pbmc7IH07XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gaW4gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHQqL1xuXHRzZXROb3RhdGlvbihub3RhdGlvbil7XG5cdFx0aWYoISh0eXBlb2Ygbm90YXRpb24gPT09IFwic3RyaW5nXCIgfHwgbm90YXRpb24gaW5zdGFuY2VvZiBTdHJpbmcpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIHR5cGVmIG9mIHN0cmluZzogXCIgKyBub3RhdGlvbik7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8IG5vdGF0aW9uID09PSBcImJcIikpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgZWl0aGVyICcjJyBvciAnYic6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9ub3RhdGlvbiA9IG5vdGF0aW9uO1xuXHRcdHRoaXMuc2V0VHVuaW5nKHRoaXMuZ2V0VHVuaW5nKCkpO1xuXHR9XG5cblx0Z2V0Tm90YXRpb24oKXsgcmV0dXJuIHRoaXMuX25vdGF0aW9uOyB9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgZnJldGJvYXJkIGJlLlxuXHQqL1xuXHRzZXRGcmV0Ym9hcmRMZW5ndGgobGVuZ3RoKXtcblx0XHRpZih0eXBlb2YgbGVuZ3RoICE9PSBcIm51bWJlclwiIHx8IGxlbmd0aCA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBsZW5ndGggc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwOlwiICsgbGVuZ3RoKTtcblx0XHR9XG5cdFx0dGhpcy5fZnJldGJvYXJkTGVuZ3RoID0gbGVuZ3RoO1xuXHRcdHRoaXMuX3JlY3JlYXRlU3RyaW5ncygpO1xuXHR9XG5cblx0Z2V0RnJldGJvYXJkTGVuZ3RoKCl7IHJldHVybiB0aGlzLl9mcmV0Ym9hcmRMZW5ndGg7IH07XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtudW1iZXJ9IHN0YXJ0R2F1Z2UgLSBob3cgdGhpY2sgaXMgdGhlIGxlZnRlc3Qgc3RyaW5nLiBUaGUgZm9sbG93aW5nIHN0cmluZ3MnIHRoaWNrbmVzcyB3aWxsIGJlIGluIGRlc2NlbmRlZCBvcmRlci5cblx0Ki9cblx0c2V0U3RyaW5nU3RhcnRHYXVnZShzdGFydEdhdWdlKXtcblx0XHRpZih0eXBlb2Ygc3RhcnRHYXVnZSAhPT0gXCJudW1iZXJcIiB8fCBzdGFydEdhdWdlIDwgMCl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHN0YXJ0R2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAtMTpcIiArIHN0YXJ0R2F1Z2UpO1xuXHRcdH1cblx0XHQvLyBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGg7IGkrKyl7XG5cdFx0Ly8gXHR0aGlzLl9lbGVTdHJpbmdzW2ldLnNldFN0cmluZ1N0YXJ0R2F1Z2Uoc3RhcnRHYXVnZSAtIGkpO1xuXHRcdC8vIH1cblx0XHR0aGlzLl9zdHJpbmdTdGFydEdhdWdlID0gc3RhcnRHYXVnZTtcblx0XHR0aGlzLl9yZWNyZWF0ZVN0cmluZ3MoKTtcblx0fVxuXG5cdGdldFN0cmluZ1N0YXJ0R2F1Z2UoKXsgcmV0dXJuIHRoaXMuX3N0cmluZ1N0YXJ0R2F1Z2U7IH1cblxuXHQvKipcblx0XHRAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSB3aGljaCBvcmllbnRhdGlvbiB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLiBTaG91bGQgYmUgZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ29uZmlnLk9SSV9IT1JJWk9OVEFMO1xuXHQqL1xuXHRzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbil7XG5cdFx0aWYoIShvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCB8fCBvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG9yaWVudGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw6IFwiICsgb3JpZW50YXRpb24pO1xuXHRcdH1cblx0XHQvLyBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlU3RyaW5ncy5sZW5ndGg7IGkrKyl7XG5cdFx0Ly8gXHR0aGlzLl9lbGVTdHJpbmdzW2ldLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHQvLyB9XG5cdFx0dGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblx0XHR0aGlzLl9yZWNyZWF0ZVN0cmluZ3MoKTtcblx0fVxuXG5cdGdldE9yaWVudGF0aW9uKCl7IHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjsgfVxuXG5cdGdldEVsZSgpeyByZXR1cm4gdGhpcy5fdWlGcmV0Ym9hcmQ7IH1cblx0Z2V0U3RyaW5ncygpeyByZXR1cm4gdGhpcy5fZWxlU3RyaW5nczsgfVxuXHRnZXRTdHJpbmdHYXVnZXMoKXtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoOyBpKyspe1xuXHRcdFx0cmVzdWx0LnB1c2godGhpcy5fZWxlU3RyaW5nc1tpXS5nZXRTdHJpbmdHYXVnZSgpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHRcdHRvIG1ha2Ugc3BlY2lmaWVkIGtleXMgdmlzaWJsZS5cblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXQgLSBtYWtlIHRhcmdldCBrZXlzIHZpc2libGUuIGZvcm1hdDogW3trZXk6IFwiQyNcIiwgY29sb3I6IFwieWVsbG93XCJ9LCB7a2V5OiBcIkQjXCIsIGNvbG9yOiBcImJsdWVcIn0sIC4uLl1cblx0XHRAcmV0dXJuIHthcnJheX0gLSByZXR1cm4gd2hhdCBrZXkgd2FzIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0tleXModGFyZ2V0KXtcblx0XHRpZighKHRhcmdldCBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHRhcmdldCBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0YXJnZXQpO1xuXHRcdH1cblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLl9lbGVTdHJpbmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCByID0gdGhpcy5fZWxlU3RyaW5nc1tpXS5tYXJrS2V5cyh0YXJnZXQpO1xuXHRcdFx0cmVzdWx0LnB1c2gocik7XG5cdFx0fVxuXHRcdHRoaXMuX21hcmtLZXlzID0gdGFyZ2V0O1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRNYXJrS2V5cygpeyByZXR1cm4gdGhpcy5fbWFya0tleXM7IH1cblxuXHQvKipcblx0XHRAcGFyYW0ge2FycmF5fSB0YXJnZXRGcmV0cyAtIGluZGljYXRlcyB3aGljaCBmcmV0cyB5b3Ugd2FudCB0byBtYXJrIGlubGF5cy4gV2lsbCB0aHJvdyBlcnJvciBpZiB0YXJnZXQgZnJldCBkb2Vzbid0IGV4aXN0LlxuXHRcdEZvciBzaW1wbGljaXR5LCB1c2UgaHVtYW4gaW5kZXggY29udmVudGlvbiBvbiBhcnJheSwgZG9uJ3QgdXNlIGNvbXB1dGVyIGZpZWxkIGNvbnZlbnRpb24uIEZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCB0byBtYXJrIGluYWx5c1xuXHRcdG9uIGZyZXQgMSwgMywgNSwgcGFzcyBbMSwgMywgNV0sIGRvbid0IHRyeSBbMCwgMiwgNF0uXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gcmV0dXJucyBlbGVtZW50cyB3aGljaCB3ZXJlIGJlaW5nIG1hcmtlZC5cblx0Ki9cblx0bWFya0lubGF5cyh0YXJnZXRGcmV0cyl7XG5cdFx0aWYoISh0YXJnZXRGcmV0cyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHRhcmdldEZyZXRzIHNob3VsZCBiZSB0eXBlIG9mIGFycmF5IHdpdGggbnVtYmVyOiBcIiArIHRhcmdldEZyZXRzKTtcblx0XHR9XG5cdFx0bGV0IGxlbmd0aCA9IHRoaXMuX2VsZVN0cmluZ3MubGVuZ3RoO1xuXHRcdGxldCBtaWQgPSBNYXRoLnJvdW5kKGxlbmd0aCAvIDIgLSAxKTtcblx0XHRtaWQgPSBtaWQgPCAwID8gMCA6XG5cdFx0XHRcdFx0bWlkID4gbGVuZ3RoID8gbGVuZ3RoIDogbWlkO1xuXHRcdHRoaXMuX21hcmtJbmxheXMgPSB0YXJnZXRGcmV0cztcblx0XHRpZih0aGlzLl9lbGVTdHJpbmdzW21pZF0pe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2VsZVN0cmluZ3NbbWlkXS5tYXJrSW5sYXlzKHRhcmdldEZyZXRzKTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldE1hcmtJbmxheXMoKXsgcmV0dXJuIHRoaXMuX21hcmtJbmxheXM7IH07XG59XG4iLCJpbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9Db25maWdcIjtcblxuZXhwb3J0IGNsYXNzIEVsZU5vdGUgZXh0ZW5kcyBOb3Rle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IDEyO1xuXHRcdHRoaXMuX29yaWVudGF0aW9uID0gQ29uZmlnLk9SSV9WRVJUSUNBTDtcblxuXHRcdHRoaXMuX3VpTm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGhpcy5fdWlTdHJpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTm90ZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0dGhpcy5fdWlOb3RlVGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmEtbm90ZVwiKTtcblx0XHR0aGlzLl91aU5vdGVUZXh0LmNsYXNzTGlzdC5hZGQoXCJmYS1ub3RlLXRleHRcIik7XG5cdFx0dGhpcy5fdWlTdHJpbmcuY2xhc3NMaXN0LmFkZChcImZhLXN0cmluZy1pbWFnZVwiKTtcblx0XHR0aGlzLl91aU5vdGUuY2xhc3NMaXN0LmFkZChcImZhLWZyZXRcIik7XG5cblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3VpTm90ZVRleHQpO1xuXHRcdHRoaXMuX3VpTm90ZS5hcHBlbmRDaGlsZCh0aGlzLl91aVN0cmluZyk7XG5cdFx0dGhpcy5fdWlOb3RlLmFwcGVuZENoaWxkKHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIpO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGUgLSBmb3JtYXQgXCJkI1wiLCBcIkVcIiwgXCJHI1wiLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIGVpdGhlciBiZSBcIiNcIiBvciBcImJcIi5cblx0XHRAcGFyYW0ge3N0cmluZ30gYmdDb2xvciAtIGNvbG9yIGZvcm1hdCBpbiBzdHJpbmcuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGdhdWdlIC0gaG93IHRoaWNrIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQsIHVuaXQgaW4gcHguXG5cdFx0QHBhcmFtIHtudW1iZXJ9IG9yaWVudGF0aW9uIC0gd2hpY2ggb3JpZW50YXRpb24gdGhlIHN0cmluZyB3aWxsIGJlIGRpc3BsYXllZC4gU2hvdWxkIGJlIGVpdGhlciBDb25maWcuT1JJX1ZFUlRJQ0FMIG9yIENvbmZpZy5PUklfSE9SSVpPTlRBTDtcblx0Ki9cblx0aW5pdChcblx0XHRub3RlID0gdGhpcy5nZXROb3RlTmFtZSgpLFxuXHRcdG5vdGF0aW9uID0gdGhpcy5nZXROb3RldGF0aW9uKCksXG5cdFx0YmdDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigpLFxuXHRcdGdhdWdlID0gdGhpcy5nZXRTdHJpbmdHYXVnZSgpLFxuXHRcdG9yaWVudGF0aW9uID0gdGhpcy5nZXRPcmllbnRhdGlvbigpKXtcblx0XHRcdFxuXHRcdHN1cGVyLmluaXQobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0Tm90ZU5hbWUobm90ZSwgbm90YXRpb24pO1xuXHRcdHRoaXMuc2V0QmdDb2xvcihiZ0NvbG9yKTtcblx0XHR0aGlzLnNldFN0cmluZ0dhdWdlKGdhdWdlKTtcblx0XHR0aGlzLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLmhpZGUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEVsZSgpeyByZXR1cm4gdGhpcy5fdWlOb3RlOyB9XG5cblx0LyoqXG5cdFx0QG92ZXJyaWRlXG5cdCovXG5cdHNldE5vdGVOYW1lKG5vdGVOYW1lKXtcblx0XHRpZighKHR5cGVvZiBub3RlTmFtZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlTmFtZSBpbnN0YW5jZW9mIFN0cmluZykpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RlTmFtZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZU5hbWUpO1xuXHRcdH1cblx0XHRzdXBlci5zZXROb3RlTmFtZShub3RlTmFtZSk7XG5cdFx0dGhpcy5fdWlOb3RlVGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdHRoaXMuX3VpTm90ZVRleHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5nZXROb3RlTmFtZSgpKSk7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdCovXG5cdHNldE5vdGF0aW9uKG5vdGF0aW9uKXtcblx0XHRpZighKHR5cGVvZiBub3RhdGlvbiA9PT0gXCJzdHJpbmdcIiB8fCBub3RhdGlvbiBpbnN0YW5jZW9mIFN0cmluZykpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgdHlwZWYgb2Ygc3RyaW5nOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdFx0aWYoIShub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT09IFwiYlwiKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIG5vdGF0aW9uIHNob3VsZCBiZSBlaXRoZXIgJyMnIG9yICdiJzogXCIgKyBub3RhdGlvbik7XG5cdFx0fVxuXHRcdHN1cGVyLnNldE5vdGF0aW9uKG5vdGF0aW9uKTtcblx0XHR0aGlzLnNldE5vdGVOYW1lKHRoaXMuZ2V0Tm90ZU5hbWUoKSk7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gYmdDb2xvciAtIGNvbG9yIGZvcm1hdCBpbiBzdHJpbmcuXG5cdCovXG5cdHNldEJnQ29sb3IoYmdDb2xvcil7XG5cdFx0aWYoISh0eXBlb2YgYmdDb2xvciA9PT0gXCJzdHJpbmdcIiB8fCBiZ0NvbG9yIGluc3RhbmNlb2YgU3RyaW5nKSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGJnQ29sb3Igc2hvdWxkIGJlIHR5cGUgb2Ygc3RyaW5nOiBcIiArIGJnQ29sb3IpO1xuXHRcdH1cblx0XHR0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG5cdH1cblxuXHRnZXRCZ0NvbG9yKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGdhdWdlIC0gaG93IHRoaWNrIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQsIHVuaXQgaW4gcHguXG5cdCovXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHRpZih0eXBlb2YgZ2F1Z2UgIT09IFwibnVtYmVyXCIgfHwgZ2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgZ2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwOlwiICsgZ2F1Z2UpO1xuXHRcdH1cblx0XHRpZih0aGlzLmdldE9yaWVudGF0aW9uKCkgPT09IENvbmZpZy5PUklfVkVSVElDQUwpe1xuXHRcdFx0dGhpcy5fdWlTdHJpbmcuc3R5bGUuaGVpZ2h0ID0gQ29uZmlnLkZSRVRfSEVJR0hUX0RFRkFVTFQgKyBcInB4XCI7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5zdHlsZS53aWR0aCA9IGdhdWdlLnRvU3RyaW5nKCkgKyBcInB4XCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5nZXRPcmllbnRhdGlvbigpID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpe1xuXHRcdFx0dGhpcy5fdWlTdHJpbmcuc3R5bGUuaGVpZ2h0ID0gZ2F1Z2UudG9TdHJpbmcoKSArIFwicHhcIjtcblx0XHRcdHRoaXMuX3VpU3RyaW5nLnN0eWxlLndpZHRoID0gQ29uZmlnLkZSRVRfSEVJR0hUX0RFRkFVTFQgKyBcInB4XCI7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ3aGF0cyB0aGUgc29yY2VyeT8gXCIgKyBnYXVnZSk7XG5cdFx0fVxuXHRcdHRoaXMuX3N0cmluZ0dhdWdlID0gZ2F1Z2U7XG5cdH1cblxuXHRnZXRTdHJpbmdHYXVnZSgpe1xuXHRcdHJldHVybiB0aGlzLl9zdHJpbmdHYXVnZTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBvcmllbnRhdGlvbiAtIHdoaWNoIG9yaWVudGF0aW9uIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQuIFNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw7XG5cdCovXG5cdHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKXtcblx0XHRpZighKG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMIHx8IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgb3JpZW50YXRpb24gc2hvdWxkIGJlIGVpdGhlciBDb25maWcuT1JJX1ZFUlRJQ0FMIG9yIENvbmZpZy5PUklfSE9SSVpPTlRBTDogXCIgKyBvcmllbnRhdGlvbik7XG5cdFx0fVxuXHRcdGlmKHRoaXMuX29yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbil7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cdFx0dGhpcy5zZXRTdHJpbmdHYXVnZSh0aGlzLmdldFN0cmluZ0dhdWdlKCkpO1xuXHR9XG5cblx0Z2V0T3JpZW50YXRpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG5cdH1cblxuXHRzaG93KCl7IHRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7IH1cblx0aGlkZSgpeyB0aGlzLl91aU5vdGVUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpOyB9XG5cdGlzVmlzaWJsZSgpeyByZXR1cm4gIXRoaXMuX3VpTm90ZVRleHRDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKTsgfVxuXG5cdC8qXG5cdFx0dGhlIFwiZG90XCIgb24gMyw1LDcsOSwxMi4uLiBndWl0YXIgZnJldHNcblx0Ki9cblx0bWFya0lubGF5cygpeyB0aGlzLl91aU5vdGUuY2xhc3NMaXN0LmFkZChcImlubGF5c1wiKTsgfVxuXHRyZW1vdmVJbmxheXMoKXsgdGhpcy5fdWlOb3RlLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmxheXNcIik7IH1cblx0aGFzSW5sYXlzKCl7IHJldHVybiB0aGlzLl91aU5vdGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5sYXlzXCIpOyB9O1xufVxuIiwiaW1wb3J0IHtNdXNpY1RoZW9yeX0gZnJvbSBcIi4vTXVzaWNUaGVvcnlcIjtcbmltcG9ydCB7RWxlTm90ZX0gZnJvbSBcIi4vRWxlTm90ZVwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRWxlU3RyaW5ne1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX3R1bmUgPSBcIkFcIjtcblx0XHR0aGlzLl9ub3RhdGlvbiA9IFwiI1wiO1xuXHRcdHRoaXMuX3N0cmluZ0xlbmd0aCA9IDEyO1xuXHRcdHRoaXMuX3N0cmluZ0dhdWdlID0gNjtcblx0XHR0aGlzLl9vcmllbnRhdGlvbiA9IENvbmZpZy5PUklfVkVSVElDQUw7XG5cdFx0dGhpcy5fbWFya0tleXMgPSBbXTtcblx0XHR0aGlzLl9tYXJrSW5sYXlzID0gW107XG5cblx0XHR0aGlzLl9lbGVOb3RlcyA9IFtdOyAvLyBhcnJheSBvZiBFbGVOb3RlXG5cdFx0dGhpcy5fdWlTdHJpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpU3RyaW5nLmNsYXNzTGlzdC5hZGQoXCJmYS1zdHJpbmdcIik7XG5cdH1cblxuXHQvKipcblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuZSAtIGZvcm1hdCBcImQjXCIsIFwiRVwiLCBcIkcjXCIuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdHJpbmdMZW5ndGggLSBob3cgbG9uZyBzaG91bGQgdGhlIGZyZXRib2FyZCBiZS5cblx0XHRAcGFyYW0ge251bWJlcn0gZ2F1Z2UgLSBob3cgdGhpY2sgdGhlIHN0cmluZyB3aWxsIGJlIGRpc3BsYXllZCwgdW5pdCBpbiBweC5cblx0XHRAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSB3aGljaCBvcmllbnRhdGlvbiB0aGUgc3RyaW5nIHdpbGwgYmUgZGlzcGxheWVkLiBTaG91bGQgYmUgZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ29uZmlnLk9SSV9IT1JJWk9OVEFMO1xuXHQqL1xuXHRpbml0KFxuXHRcdHR1bmUgPSB0aGlzLmdldFR1bmUoKSxcblx0XHRub3RhdGlvbiA9IHRoaXMuZ2V0Tm90YXRpb24oKSxcblx0XHRzdHJpbmdMZW5ndGggPSB0aGlzLmdldFN0cmluZ0xlbmd0aCgpLFxuXHRcdHN0cmluZ0dhdWdlID0gdGhpcy5nZXRTdHJpbmdHYXVnZSgpLFxuXHRcdG9yaWVudGF0aW9uID0gdGhpcy5nZXRPcmllbnRhdGlvbigpKXtcblxuXHRcdHRoaXMuc2V0VHVuZSh0dW5lKTtcblx0XHR0aGlzLnNldE5vdGF0aW9uKG5vdGF0aW9uKTtcblx0XHR0aGlzLnNldFN0cmluZ0xlbmd0aChzdHJpbmdMZW5ndGgpO1xuXHRcdHRoaXMuc2V0U3RyaW5nR2F1Z2Uoc3RyaW5nR2F1Z2UpO1xuXHRcdHRoaXMuc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0X3JlY3JlYXRlTm90ZXMoKXtcblx0XHRsZXQgbm90ZXMgPSBNdXNpY1RoZW9yeS50dW5pbmcodGhpcy5nZXRUdW5lKCksIHRoaXMuZ2V0U3RyaW5nTGVuZ3RoKCkgKyAxLCB0aGlzLmdldE5vdGF0aW9uKCksIGZhbHNlKTtcblx0XHR0aGlzLl91aVN0cmluZy5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdHRoaXMuX2VsZU5vdGVzID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCByZXN1bHQgPSBuZXcgRWxlTm90ZSgpLmluaXQobm90ZXNbaV0sIHRoaXMuZ2V0Tm90YXRpb24oKSwgXCJ3aGl0ZVwiLCB0aGlzLmdldFN0cmluZ0dhdWdlKCksIHRoaXMuZ2V0T3JpZW50YXRpb24oKSk7XG5cdFx0XHR0aGlzLl9lbGVOb3Rlcy5wdXNoKHJlc3VsdCk7XG5cdFx0XHR0aGlzLl91aVN0cmluZy5hcHBlbmRDaGlsZChyZXN1bHQuZ2V0RWxlKCkpO1xuXHRcdH1cblx0XHR0aGlzLm1hcmtLZXlzKHRoaXMuZ2V0TWFya0tleXMoKSk7XG5cdFx0dGhpcy5tYXJrSW5sYXlzKHRoaXMuZ2V0TWFya0lubGF5cygpKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSB0dW5lIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0Ki9cblx0c2V0VHVuZSh0dW5lKXtcblx0XHRpZighKHR5cGVvZiB0dW5lID09PSBcInN0cmluZ1wiIHx8IHR1bmUgaW5zdGFuY2VvZiBTdHJpbmcpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdHVuZSBzaG91bGQgYmUgc3RyaW5nOiBcIiArIHR1bmUpO1xuXHRcdH1cblx0XHR0aGlzLl90dW5lID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodHVuZSwgdGhpcy5nZXROb3RhdGlvbigpKTtcblx0XHR0aGlzLl9yZWNyZWF0ZU5vdGVzKCk7XG5cdH1cblxuXHRnZXRUdW5lKCl7IHJldHVybiB0aGlzLl90dW5lOyB9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGF0aW9uIC0gaW4gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHQqL1xuXHRzZXROb3RhdGlvbihub3RhdGlvbil7XG5cdFx0aWYoISh0eXBlb2Ygbm90YXRpb24gPT09IFwic3RyaW5nXCIgfHwgbm90YXRpb24gaW5zdGFuY2VvZiBTdHJpbmcpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIHR5cGVmIG9mIHN0cmluZzogXCIgKyBub3RhdGlvbik7XG5cdFx0fVxuXHRcdGlmKCEobm90YXRpb24gPT09IFwiI1wiIHx8IG5vdGF0aW9uID09PSBcImJcIikpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgZWl0aGVyICcjJyBvciAnYic6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9ub3RhdGlvbiA9IG5vdGF0aW9uO1xuXHRcdHRoaXMuc2V0VHVuZSh0aGlzLmdldFR1bmUoKSk7XG5cdH1cblxuXHRnZXROb3RhdGlvbigpeyByZXR1cm4gdGhpcy5fbm90YXRpb247IH1cblxuXHQvKipcblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgc2hvdWxkIHRoZSBmcmV0Ym9hcmQgYmUuXG5cdCovXG5cdHNldFN0cmluZ0xlbmd0aChsZW5ndGgpe1xuXHRcdGlmKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIgfHwgbGVuZ3RoIDwgMCl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIGxlbmd0aCBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIDA6XCIgKyBsZW5ndGgpO1xuXHRcdH1cblx0XHR0aGlzLl9zdHJpbmdMZW5ndGggPSBsZW5ndGg7XG5cdFx0dGhpcy5fcmVjcmVhdGVOb3RlcygpO1xuXHR9XG5cblx0Z2V0U3RyaW5nTGVuZ3RoKCl7IHJldHVybiB0aGlzLl9zdHJpbmdMZW5ndGg7IH07XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGdhdWdlIC0gaG93IHRoaWNrIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQsIHVuaXQgaW4gcHguXG5cdCovXG5cdHNldFN0cmluZ0dhdWdlKGdhdWdlKXtcblx0XHRpZih0eXBlb2YgZ2F1Z2UgIT09IFwibnVtYmVyXCIgfHwgZ2F1Z2UgPCAwKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgZ2F1Z2Ugc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwOlwiICsgZ2F1Z2UpO1xuXHRcdH1cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlTm90ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0U3RyaW5nR2F1Z2UoZ2F1Z2UpO1xuXHRcdH1cblx0XHR0aGlzLl9zdHJpbmdHYXVnZSA9IGdhdWdlO1xuXHRcdHRoaXMuX3JlY3JlYXRlTm90ZXMoKTtcblx0fVxuXG5cdGdldFN0cmluZ0dhdWdlKCl7IHJldHVybiB0aGlzLl9zdHJpbmdHYXVnZTsgfVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBvcmllbnRhdGlvbiAtIHdoaWNoIG9yaWVudGF0aW9uIHRoZSBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWQuIFNob3VsZCBiZSBlaXRoZXIgQ29uZmlnLk9SSV9WRVJUSUNBTCBvciBDb25maWcuT1JJX0hPUklaT05UQUw7XG5cdCovXG5cdHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKXtcblx0XHRpZighKG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMIHx8IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgb3JpZW50YXRpb24gc2hvdWxkIGJlIGVpdGhlciBDb25maWcuT1JJX1ZFUlRJQ0FMIG9yIENvbmZpZy5PUklfSE9SSVpPTlRBTDogXCIgKyBvcmllbnRhdGlvbik7XG5cdFx0fVxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVOb3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLl9lbGVOb3Rlc1tpXS5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0fVxuXHRcdHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cdFx0dGhpcy5fcmVjcmVhdGVOb3RlcygpO1xuXHR9XG5cblx0Z2V0T3JpZW50YXRpb24oKXsgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uOyB9XG5cblx0LyoqXG5cdFx0dG8gbWFrZSBzcGVjaWZpZWQga2V5cyB2aXNpYmxlLlxuXHRcdEBwYXJhbSB7YXJyYXl9IHRhcmdldCAtIG1ha2UgdGFyZ2V0IGtleXMgdmlzaWJsZS4gZm9ybWF0OiBbe2tleTogXCJDI1wiLCBjb2xvcjogXCJ5ZWxsb3dcIn0sIHtrZXk6IFwiRCNcIiwgY29sb3I6IFwiYmx1ZVwifSwgLi4uXVxuXHRcdEByZXR1cm4ge2FycmF5fSAtIHJldHVybiB3aGF0IGtleSB3YXMgYmVpbmcgbWFya2VkLlxuXHQqL1xuXHRtYXJrS2V5cyh0YXJnZXQpe1xuXHRcdGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgQXJyYXkpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdGFyZ2V0IHNob3VsZCBiZSB0eXBlIG9mIGFycmF5OiBcIiArIHRhcmdldCk7XG5cdFx0fVxuXHRcdHJlc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Lmxlbmd0aDsgaSsrKXtcblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9lbGVOb3Rlcy5sZW5ndGg7IGorKyl7XG5cdFx0XHRcdGxldCBrZXkxID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodGFyZ2V0W2ldLmtleSk7XG5cdFx0XHRcdGxldCBrZXkyID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwodGhpcy5fZWxlTm90ZXNbal0uZ2V0Tm90ZU5hbWUoKSk7XG5cdFx0XHRcdGlmKGtleTEgPT09IGtleTIpe1xuXHRcdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2pdLnNob3coKTtcblx0XHRcdFx0XHR0aGlzLl9lbGVOb3Rlc1tqXS5zZXRCZ0NvbG9yKHRhcmdldFtpXS5jb2xvcik7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5fZWxlTm90ZXNbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX21hcmtLZXlzID0gdGFyZ2V0O1xuXHRcdHJldHVybiByZXN1bHQ7XG5cblx0XHRmdW5jdGlvbiByZXNldERpc3BsYXkoKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVOb3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2ldLmhpZGUoKTtcblx0XHRcdFx0dGhpcy5fZWxlTm90ZXNbaV0uc2V0QmdDb2xvcihcIndoaXRlXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldE1hcmtLZXlzKCl7IHJldHVybiB0aGlzLl9tYXJrS2V5czsgfVxuXG5cdGdldEVsZSgpeyByZXR1cm4gdGhpcy5fdWlTdHJpbmc7IH1cblx0Z2V0RWxlTm90ZXMoKXsgcmV0dXJuIHRoaXMuX2VsZU5vdGVzOyB9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHthcnJheX0gdGFyZ2V0RnJldHMgLSBpbmRpY2F0ZXMgd2hpY2ggZnJldHMgeW91IHdhbnQgdG8gbWFyayBpbmxheXMuIFdpbGwgaWdub3JlIGlmIHRhcmdldCBmcmV0IGRvZXNuJ3QgZXhpc3QuXG5cdFx0Rm9yIHNpbXBsaWNpdHksIHVzZSBodW1hbiBpbmRleCBjb252ZW50aW9uIG9uIGFycmF5LCBkb24ndCB1c2UgY29tcHV0ZXIgZmllbGQgY29udmVudGlvbi4gRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IHRvIG1hcmsgaW5hbHlzXG5cdFx0b24gZnJldCAxLCAzLCA1LCBwYXNzIFsxLCAzLCA1XSwgZG9uJ3QgdHJ5IFswLCAyLCA0XS5cblx0XHRAcmV0dXJuIHthcnJheX0gLSByZXR1cm5zIGVsZW1lbnRzIHdoaWNoIHdlcmUgYmVpbmcgbWFya2VkLlxuXHQqL1xuXHRtYXJrSW5sYXlzKHRhcmdldEZyZXRzKXtcblx0XHRpZighKHRhcmdldEZyZXRzIGluc3RhbmNlb2YgQXJyYXkpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdGFyZ2V0RnJldHMgc2hvdWxkIGJlIHR5cGUgb2YgYXJyYXkgd2l0aCBudW1iZXI6IFwiICsgdGFyZ2V0RnJldHMpO1xuXHRcdH1cblx0XHRjbGVhcklubGF5cy5jYWxsKHRoaXMpO1xuXHRcdHRhcmdldEZyZXRzID0gdHJpbUFycmF5KHRhcmdldEZyZXRzLCB0aGlzLmdldFN0cmluZ0xlbmd0aCgpKTtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRhcmdldEZyZXRzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGxldCBpbmRleCA9IHRhcmdldEZyZXRzW2ldIC0gMTtcblx0XHRcdGlmKHRoaXMuX2VsZU5vdGVzW2luZGV4XSl7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2luZGV4XS5tYXJrSW5sYXlzKCk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuX2VsZU5vdGVzW2luZGV4XSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0YXJnZXQgZnJldCBkb2Vzbid0IGV4aXN0LiB0YXJnZXRGcmV0czogXCIgKyB0YXJnZXRGcmV0cyArIFwiLCBmcmV0IGxlbmd0aDogXCIgKyB0aGlzLl9lbGVOb3Rlcy5sZW5ndGggKyBcIiwgdHJhbnNsYXRlZCBpbmRleDogXCIgKyBpbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX21hcmtJbmxheXMgPSB0YXJnZXRGcmV0cztcblx0XHRyZXR1cm4gcmVzdWx0O1xuXG5cdFx0ZnVuY3Rpb24gY2xlYXJJbmxheXMoKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVOb3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHRoaXMuX2VsZU5vdGVzW2ldLnJlbW92ZUlubGF5cygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaW1BcnJheShhcnIsIG51bWJlcil7XG5cdFx0XHRhcnIgPSBmaW5kVW5pcXVlKGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuXHRcdFx0XHRyZXR1cm4gYSAtIGI7XG5cdFx0XHR9KSk7XG5cdFx0XHRhcnIgPSBhcnIuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPD0gbnVtYmVyO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gYXJyO1xuXG5cdFx0XHRmdW5jdGlvbiBmaW5kVW5pcXVlKGFycil7XG5cdFx0XHRcdHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIHIpe1xuXHRcdFx0XHRcdGlmKGEuaW5kZXhPZihyKSA8IDApe1xuXHRcdFx0XHRcdFx0YS5wdXNoKHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0fSwgW10pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldE1hcmtJbmxheXMoKXsgcmV0dXJuIHRoaXMuX21hcmtJbmxheXM7IH07XG59XG4iLCJpbXBvcnQge0VsZUZyZXRib2FyZH0gZnJvbSBcIi4vRWxlRnJldGJvYXJkXCI7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuXG5leHBvcnQgY2xhc3MgRnJldGJvYXJkQXdlc29tZSBleHRlbmRzIEVsZUZyZXRib2FyZHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX2RvbUlkID0gXCJcIjtcblx0XHR0aGlzLl92aWV3cG9ydFNpemUgPSBDb25maWcuVklFV1BPUlRfU0laRV9ERUZBVUxUO1xuXG5cdFx0dGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuX3Njcm9sbFBvc2l0aW9uID0ge3g6IDAsIHk6IDB9O1xuXG5cdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpVmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lciA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0XHRAb3ZlcnJpZGVcblx0XHRAcGFyYW0ge3N0cmluZ30gdGFyZ2V0SWQgLSB0aGUgZG9tIGVsZW1lbnQgd2hpY2ggeW91IHdhbnQgaXQgdG8gZ2VuZXJhdGUgRnJldGJvYXJkQXdlc29tZS5cblx0XHRAcGFyYW0ge3N0cmluZ30gdHVuaW5nIC0gaW4gd2hhdCBrZXkgd2UgYXJlIHR1bmluZy5cblx0XHRAcGFyYW0ge3N0cmluZ30gbm90YXRpb24gLSBlaXRoZXIgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHBhcmFtIHtudW1iZXJ9IGZyZXRib2FyZExlbmd0aCAtIGhvdyBsb25nIHNob3VsZCB0aGUgZnJldGJvYXJkIGJlLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSBzdHJpbmdTdGFydEdhdWdlIC0gYXQgd2hhdCB0aGlja25lc3Mgd2lsbCB0aGUgc3RyaW5nIHN0YXJ0IGRlY3JlYXNpbmcuXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uIC0gZWl0aGVyIENvbmZpZy5PUklfVkVSVElDQUwgb3IgQ09ORklHX09SSV9IT1JJWk9OVEFMLlxuXHRcdEBwYXJhbSB7bnVtYmVyfSB2aWV3cG9ydCAtIGxpbWl0IGhvdyBsb25nIHRoZSBmcmV0Ym9hcmQgdXNlciBjYW4gdmlldyBpbiBwaXhlbCB1bml0LlxuXHQqL1xuXHRpbml0KFxuXHRcdHRhcmdldElkLFxuXHRcdHR1bmluZyA9IHRoaXMuZ2V0VHVuaW5nKCksXG5cdFx0bm90YXRpb24gPSB0aGlzLmdldE5vdGF0aW9uKCksXG5cdFx0ZnJldGJvYXJkTGVuZ3RoID0gdGhpcy5nZXRGcmV0Ym9hcmRMZW5ndGgoKSxcblx0XHRzdHJpbmdTdGFydEdhdWdlID0gdGhpcy5nZXRTdHJpbmdTdGFydEdhdWdlKCksXG5cdFx0b3JpZW50YXRpb24gPSB0aGlzLmdldE9yaWVudGF0aW9uKCksXG5cdFx0dmlld3BvcnRTaXplID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKSl7XG5cblx0XHRpbml0VUkuY2FsbCh0aGlzLCB0YXJnZXRJZCk7XG5cdFx0c3VwZXIuaW5pdCh0dW5pbmcsIG5vdGF0aW9uLCBmcmV0Ym9hcmRMZW5ndGgsIHN0cmluZ1N0YXJ0R2F1Z2UsIG9yaWVudGF0aW9uKTtcblx0XHR0aGlzLl91cGRhdGVUdW5pbmdVSSgpO1xuXHRcdHRoaXMuc2V0Vmlld3BvcnRTaXplKHZpZXdwb3J0U2l6ZSk7XG5cdFx0dGhpcy5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRmdW5jdGlvbiBpbml0VUkodGFyZ2V0SWQpe1xuXHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuXG5cdFx0XHR0aGlzLl91aU1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhLWNvbnRhaW5lclwiKTtcblx0XHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS10dW5pbmdcIik7XG5cdFx0XHR0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYS12aWV3cG9ydFwiKTtcblxuXHRcdFx0dGhpcy5fdWlWaWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmdldEVsZSgpKTtcblx0XHRcdGFkZERyYWdFdmVudCh0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyKTtcblxuXHRcdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyKTtcblx0XHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyKTtcblxuXHRcdFx0ZnVuY3Rpb24gYWRkRHJhZ0V2ZW50KGVsZSl7XG5cdFx0XHRcdGxldCBpc0RyYWdnaW5nID0gZmFsc2U7XG5cdFx0XHRcdGxldCBwcmV2aW91c1ggPSAwO1xuXHRcdFx0XHRsZXQgcHJldmlvdXNZID0gMDtcblxuXHRcdFx0XHRlbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnRG93bik7XG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdFx0ZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGRyYWdVcCk7XG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkcmFnVXApO1xuXG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBkcmFnRG93bik7XG5cdFx0XHRcdGVsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdFx0ZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBkcmFnVXApO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGRyYWdEb3duKGUpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpc0RyYWdnaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRwcmV2aW91c1ggPSBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYO1xuXHRcdFx0XHRcdHByZXZpb3VzWSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBkcmFnTW92ZShlKXtcblx0XHRcdFx0XHRlbGUuc2Nyb2xsTGVmdDtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYoaXNEcmFnZ2luZyl7XG5cdFx0XHRcdFx0XHRsZXQgbmV3WCA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG5cdFx0XHRcdFx0XHRsZXQgbmV3WSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdFx0XHRsZXQgb2Zmc2V0WCA9IG5ld1ggLSBwcmV2aW91c1g7XG5cdFx0XHRcdFx0XHRsZXQgb2Zmc2V0WSA9IG5ld1kgLSBwcmV2aW91c1k7XG5cdFx0XHRcdFx0XHRlbGUuc2Nyb2xsTGVmdCAtPSBvZmZzZXRYO1xuXHRcdFx0XHRcdFx0ZWxlLnNjcm9sbFRvcCAtPSBvZmZzZXRZO1xuXHRcdFx0XHRcdFx0cHJldmlvdXNYID0gZS5jaGFuZ2VkVG91Y2hlcyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA6IGUuY2xpZW50WDtcblx0XHRcdFx0XHRcdHByZXZpb3VzWSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnVuY3Rpb24gZHJhZ1VwKGUpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpc0RyYWdnaW5nID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0XHRAb3ZlcnJpZGVcblx0Ki9cblx0c2V0VHVuaW5nKHR1bmluZyl7XG5cdFx0c3VwZXIuc2V0VHVuaW5nKHR1bmluZyk7XG5cdFx0dGhpcy5fdXBkYXRlVHVuaW5nVUkoKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBvdmVycmlkZVxuXHQqL1xuXHRzZXRGcmV0Ym9hcmRMZW5ndGgobGVuZ3RoKXtcblx0XHRzdXBlci5zZXRGcmV0Ym9hcmRMZW5ndGgobGVuZ3RoKTtcblx0XHR0aGlzLnNldFZpZXdwb3J0U2l6ZSh0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKTtcblx0fVxuXG5cdC8qKlxuXHRcdEBwcml2YXRlXG5cdCovXG5cdF91cGRhdGVUdW5pbmdVSSgpe1xuXHRcdGxldCB0dW5pbmcgPSB0aGlzLmdldFR1bmluZygpO1xuXHRcdHRoaXMuX3VpVHVuaW5nQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHR1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRsZXQgd3JhcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRsZXQgdGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdHdyYXBwZXJEaXYuY2xhc3NMaXN0LmFkZChcImZhLWtleXRleHQtY29udGFpbmVyXCIpO1xuXHRcdFx0dGV4dFNwYW4uY2xhc3NMaXN0LmFkZChcImZhLWtleXRleHRcIik7XG5cdFx0XHR0ZXh0U3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0dW5pbmdbaV0pKTtcblx0XHRcdHdyYXBwZXJEaXYuYXBwZW5kQ2hpbGQodGV4dFNwYW4pO1xuXHRcdFx0dGhpcy5fdWlUdW5pbmdDb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlckRpdik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QG92ZXJyaWRlXG5cdCovXG5cdHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKXtcblx0XHRpZighKG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX1ZFUlRJQ0FMIHx8IG9yaWVudGF0aW9uID09PSBDb25maWcuT1JJX0hPUklaT05UQUwpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgb3JpZW50YXRpb24gc2hvdWxkIGJlIGVpdGhlciBGcmV0Ym9hcmRBd2Vzb21lLk9SSV9WRVJUSUNBTCBvciBGcmV0Ym9hcmRBd2Vzb21lLk9SSV9IT1JJWk9OVEFMOiBcIiArIG9yaWVudGF0aW9uKTtcblx0XHR9XG5cdFx0bGV0IGNsYXNzTmFtZSA9IChvcmllbnRhdGlvbiA9PT0gQ29uZmlnLk9SSV9WRVJUSUNBTCA/IENvbmZpZy5PUklfVkVSVElDQUwgOiBDb25maWcuT1JJX0hPUklaT05UQUwpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKENvbmZpZy5PUklfVkVSVElDQUwpO1xuXHRcdHRoaXMuX3VpTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKENvbmZpZy5PUklfSE9SSVpPTlRBTCk7XG5cdFx0dGhpcy5fdWlNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHRzdXBlci5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XG5cdFx0dGhpcy5zZXRWaWV3cG9ydFNpemUodGhpcy5nZXRWaWV3cG9ydFNpemUoKSk7XG5cdH1cblxuXHRzZXRWaWV3cG9ydFNpemUoc2l6ZSl7XG5cdFx0aWYodHlwZW9mIHNpemUgIT09IFwibnVtYmVyXCIgfHwgc2l6ZSA8IDApe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBzaXplIHNob3VsZCBiZSB0eXBlb2Ygb2YgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwOiBcIiArIHNpemUpO1xuXHRcdH1cblx0XHRsZXQgd2lkdGggPSB0aGlzLmdldEVsZSgpLnNjcm9sbFdpZHRoO1xuXHRcdGxldCBoZWlnaHQgPSB0aGlzLmdldEVsZSgpLnNjcm9sbEhlaWdodDtcblx0XHRpZih0aGlzLmdldE9yaWVudGF0aW9uKCkgPT09IENvbmZpZy5PUklfVkVSVElDQUwpe1xuXHRcdFx0aGVpZ2h0ID0gKGhlaWdodCA8PSBzaXplKSA/IFwiYXV0b1wiIDogKHNpemUudG9TdHJpbmcoKSArIFwicHhcIik7XG5cdFx0XHR3aWR0aCA9IFwiYXV0b1wiO1xuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuZ2V0T3JpZW50YXRpb24oKSA9PT0gQ29uZmlnLk9SSV9IT1JJWk9OVEFMKXtcblx0XHRcdGhlaWdodCA9IFwiYXV0b1wiO1xuXHRcdFx0d2lkdGggPSAod2lkdGggPD0gc2l6ZSkgPyBcImF1dG9cIiA6IChzaXplLnRvU3RyaW5nKCkgKyBcInB4XCIpO1xuXHRcdH1cblx0XHR0aGlzLl91aVZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fdWlWaWV3cG9ydENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5fdmlld3BvcnRTaXplID0gc2l6ZTtcblx0XHRyZXR1cm4ge3dpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9O1xuXHR9XG5cblx0Z2V0Vmlld3BvcnRTaXplKCl7IHJldHVybiB0aGlzLl92aWV3cG9ydFNpemU7IH1cbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7QWJzdHJhY3RGcmV0Ym9hcmR9IGZyb20gXCIuL0Fic3RyYWN0RnJldGJvYXJkXCI7XG5pbXBvcnQge0VsZU5vdGV9IGZyb20gXCIuL0VsZU5vdGVcIjtcbmltcG9ydCB7RWxlU3RyaW5nfSBmcm9tIFwiLi9FbGVTdHJpbmdcIjtcbmltcG9ydCB7RWxlRnJldGJvYXJkfSBmcm9tIFwiLi9FbGVGcmV0Ym9hcmRcIjtcbmltcG9ydCB7RnJldGJvYXJkQXdlc29tZX0gZnJvbSBcIi4vRnJldGJvYXJkQXdlc29tZVwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG4oZnVuY3Rpb24od2luKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGZhID0ge1xuXHRcdE11c2ljVGhlb3J5OiBNdXNpY1RoZW9yeSxcblx0XHROb3RlOiBOb3RlLFxuXHRcdEVsZU5vdGU6IEVsZU5vdGUsXG5cdFx0QWJzdHJhY3RGcmV0Ym9hcmQ6IEFic3RyYWN0RnJldGJvYXJkLFxuXHRcdEVsZUZyZXRib2FyZDogRWxlRnJldGJvYXJkLFxuXHRcdEVsZVN0cmluZzogRWxlU3RyaW5nLFxuXHRcdEZyZXRib2FyZEF3ZXNvbWU6IEZyZXRib2FyZEF3ZXNvbWUsXG5cdFx0Q29uZmlnOiBDb25maWdcblx0fVxuXG5cdHdpbi5mYSA9IGZhO1xufSkod2luZG93KTtcbiIsImV4cG9ydCBjbGFzcyBNdXNpY1RoZW9yeSB7XG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nLCBhcnJheX0gbm90ZSAtIGFjY2VwdCBhIHN0cmluZyBpbiBzcGVjaWZpZWQgbm90YXRpb24sIHNlZSBub3JtYWxpemUoKSBmb3IgbW9yZSBpbmZvLlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBjb252ZXJ0VG8gLSBzaG91bGQgZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiIGluIHN0cmluZyB0eXBlLlxuXHRcdEByZXR1cm4ge3N0cmluZ30gLSB3aWxsIHJldHVybiB0aGUgcXVlcnkgcmVzdWx0LlxuXHQqL1xuXHRzdGF0aWMgY29udmVydEFjY2lkZW50YWwobm90ZSwgY29udmVydFRvID0gXCIjXCIpe1xuXHRcdGlmKGNvbnZlcnRUbyAhPT0gXCIjXCIgJiYgY29udmVydFRvICE9PSBcImJcIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udmVydFRvIHNob3VsZCBlaXRoZXIgYmUgJyMnIG9yICdiJyBpbiBzdHJpbmcgdHlwZTogXCIgKyBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRBcnJheShub3RlLCBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRTaW5nbGUobm90ZSwgY29udmVydFRvKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb252ZXJ0QXJyYXkobm90ZXMsIGNvbnZlcnRUbyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjb252ZXJ0U2luZ2xlKG5vdGVzW2ldLCBjb252ZXJ0VG8pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydFNpbmdsZShub3RlLCBjb252ZXJ0VG8pe1xuXHRcdFx0bGV0IHJlc3VsdCA9IE11c2ljVGhlb3J5Lm5vcm1hbGl6ZShub3RlKTtcblx0XHRcdGxldCBzYW1lTm90YXRpb24gPSByZXN1bHRbMV0gPT09IGNvbnZlcnRUbztcblx0XHRcdGlmKHJlc3VsdC5sZW5ndGggPT09IDEgfHwgc2FtZU5vdGF0aW9uKXtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydFRvID09PSBcIiNcIil7XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVFtpXSA9PT0gcmVzdWx0KXtcblx0XHRcdFx0XHRcdHJldHVybiBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0VG8gPT09IFwiYlwiKXtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlBbaV0gPT09IHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFUW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90IGZvdW5kOiBcIiArIHJlc3VsdCArIFwiIFwiICsgY29udmVydFRvKTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihcIndoYXQncyB0aGUgc29yY2VyeT8gXCIgKyByZXN1bHQgKyBcIiBcIiArIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmcsIGFycmF5fSBub3RlIC0gYWNjZXB0cyBzdHJpbmcgb2YgYXJyYXkgb2Ygc3RyaW5ncy4gc3RyaW5nIHNob3VsZCBiZSB3aXRoaW4gMiBjaGFyYWN0ZXJzIGxvbmcgYW5kIHdyaXR0ZW4gaW4gZmFzaGlvbiBsaWtlIFwiQ2JcIiwgXCJEXCIsIFwiRCNcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0IGlmIHlvdSBpbnB1dCBcIkNiYmJiYlwiLCB0aGUgZnVuY3Rpb24gd2lsbCBzdGlsbCBkbyB0aGUgcGFyc2UgYW5kIHJldHVybiBcIkNiXCIgYXMgdGhlIHJlc3VsdC5cblx0XHRAcmV0dXJuIHtudWxsLCBzdHJpbmd9IC0gd2lsbCByZXR1cm4gbnVsbCBpZiBubyBwYXR0ZXJuIGlzIGZvdW5kLCBvciByZXR1cm4gYSBzdHJpbmcgd2l0aCBjYXBpdGFsaXplZCBmaXJzdCBsZXR0ZXIgd2l0aGluIDIgbGVuZ3RoLlxuXHQqL1xuXHRzdGF0aWMgbm9ybWFsaXplKG5vdGUpe1xuXHRcdGlmKHR5cGVvZiBub3RlID09PSBcInN0cmluZ1wiIHx8IG5vdGUgaW5zdGFuY2VvZiBTdHJpbmcpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZVNpbmdsZShub3RlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIG5vcm1hbGl6ZUFycmF5KG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBub3RlIHNodW9sZCBiZSBlaXRoZXIgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3M6IFwiICsgbm90ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkobm90ZXMpe1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobm9ybWFsaXplU2luZ2xlKG5vdGVzW2ldKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZSArIFwiIFtcIiArIG5vdGVzICsgXCJdXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZShub3RlKXtcblx0XHRcdGxldCBzaGFycFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX1NIQVJQLmV4ZWMobm90ZSk7XG5cdFx0XHRsZXQgZmxhdFJlc3VsdCA9IE11c2ljVGhlb3J5Lk5PVEFUSU9OX0ZMQVQuZXhlYyhub3RlKTtcblx0XHRcdHNoYXJwUmVzdWx0ID0gc2hhcnBSZXN1bHQgPyBzaGFycFJlc3VsdFswXSA6IG51bGw7XG5cdFx0XHRmbGF0UmVzdWx0ID0gZmxhdFJlc3VsdCA/IGZsYXRSZXN1bHRbMF0gOiBudWxsO1xuXHRcdFx0aWYoc2hhcnBSZXN1bHQgfHwgZmxhdFJlc3VsdCl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSAoc2hhcnBSZXN1bHQubGVuZ3RoID4gZmxhdFJlc3VsdC5sZW5ndGgpID8gc2hhcnBSZXN1bHQgOiBmbGF0UmVzdWx0O1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHRbMF0udG9VcHBlckNhc2UoKSArIHJlc3VsdC5zbGljZSgxKTtcblx0XHRcdFx0cmVzdWx0ID0gKHJlc3VsdCA9PT0gXCJDYlwiKSA/IFwiQlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdChyZXN1bHQgPT09IFwiQiNcIikgPyBcIkNcIiA6XG5cdFx0XHRcdFx0XHRcdFx0XHQocmVzdWx0ID09PSBcIkZiXCIpID8gXCJFXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCA9PT0gXCJFI1wiKSA/IFwiRlwiIDpcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdDtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGU6IFwiICsgbm90ZSArIFwiIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHBhdHRlcm4uXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBzdGFydEtleSAtIHRoZSBrZXkgeW91IHdhbnQgdG8gc3RhcnQgd2l0aC4gRm9ybWF0IHNob3VsZCBiZSBcIkMjXCIsIFwiZFwiLCBcImViXCIuLi5cblx0XHRAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gaG93IGxvbmcgdGhlIGFycmF5IHNob3VsZCBmdW5jdGlvbiByZXR1cm4uXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vcmF0aW9uIC0gZWl0aGVyIFwiI1wiIG9yIFwiYlwiLlxuXHRcdEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZU9wZW5GcmV0IC0gd2hldGhlciB0byBpbmNsdWRlIHRoZSBzdGFydCBrZXkuXG5cdFx0QHJldHVybiB7YXJyYXl9IC0gYW4gYXJyYXkgd2l0aCBzdHJpbmcgY29udGFpbnMgdGhlIHNlcXVlbmNlIG9mIGtleXMuXG5cdCovXG5cdHN0YXRpYyB0dW5pbmcoc3RhcnRLZXkgPSBcIkNcIiwgbGVuZ3RoID0gNywgbm90YXRpb24gPSBcIiNcIiwgaW5jbHVkZU9wZW5GcmV0ID0gdHJ1ZSl7XG5cdFx0aWYoKHR5cGVvZiBzdGFydEtleSA9PT0gXCJzdHJpbmdcIiB8fCBzdGFydEtleSBpbnN0YW5jZW9mIFN0cmluZykgJiZcblx0XHRcdFx0KG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpICYmXG5cdFx0XHRcdCh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDApICYmXG5cdFx0XHRcdCh0eXBlb2YgaW5jbHVkZU9wZW5GcmV0ID09PSBcImJvb2xlYW5cIikpe1xuXHRcdFx0c3RhcnRLZXkgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbChzdGFydEtleSwgbm90YXRpb24pO1xuXHRcdFx0bGV0IHN0YXJ0SW5kZXggPSAwO1xuXHRcdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdFx0aWYobm90YXRpb24gPT09IFwiI1wiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAuaW5kZXhPZihzdGFydEtleSk7XG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YXJ0SW5kZXgsIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbGVuZ3RoOyBpKyssIGNvdW50ZXIrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goaW5maW5pdGVJbmRleGluZyhNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQLCBpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYobm90YXRpb24gPT09IFwiYlwiKXtcblx0XHRcdFx0c3RhcnRJbmRleCA9IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVC5pbmRleE9mKHN0YXJ0S2V5KTtcblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhcnRJbmRleCwgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW5ndGg7IGkrKywgY291bnRlcisrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChpbmZpbml0ZUluZGV4aW5nKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVCwgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5jbHVkZU9wZW5GcmV0ID8gcmVzdWx0IDogcmVzdWx0LnNsaWNlKDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJvbmUgb2YgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkOiBcIiArIFwiXFxuXCIgKyBzdGFydEtleSArIFwiXFxuXCIgKyBsZW5ndGggKyBcIlxcblwiICsgbm90YXRpb24gKyBcIlxcblwiICsgaW5jbHVkZU9wZW5GcmV0KTtcblx0XHR9XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwid2hhdCdzIHRoZSBzb3JjZXJ5PyBcIiArIHN0YXJ0S2V5ICsgXCIgXCIgKyBsZW5ndGggKyBcIiBcIiArIG5vdGF0aW9uICsgXCIgXCIgKyBpbmNsdWRlT3BlbkZyZXQpO1xuXG5cdFx0ZnVuY3Rpb24gaW5maW5pdGVJbmRleGluZyhhcnJheSwgaW5kZXgpe1xuXHRcdFx0aW5kZXggPSBpbmRleCAlIGFycmF5Lmxlbmd0aDtcblx0XHRcdHJldHVybiBhcnJheVtpbmRleF07XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldCBOT1RBVElPTl9TSEFSUCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddIz8vOyB9XG5cdHN0YXRpYyBnZXQgTk9UQVRJT05fRkxBVCgpIHsgcmV0dXJuIC9eW2EtZ3xBLUddYj8vOyB9XG5cblx0c3RhdGljIGdldCBLRVlTX0FDQ0lERU5UQUxTX1NIQVJQKCl7IHJldHVybiBbXCJBXCIsIFwiQSNcIiwgXCJCXCIsIFwiQ1wiLCBcIkMjXCIsIFwiRFwiLCBcIkQjXCIsIFwiRVwiLCBcIkZcIiwgXCJGI1wiLCBcIkdcIiwgXCJHI1wiXTsgfVxuXHRzdGF0aWMgZ2V0IEtFWVNfQUNDSURFTlRBTFNfRkxBVCgpeyByZXR1cm4gW1wiQVwiLCBcIkJiXCIsIFwiQlwiLCBcIkNcIiwgXCJEYlwiLCBcIkRcIiwgXCJFYlwiLCBcIkVcIiwgXCJGXCIsIFwiR2JcIiwgXCJHXCIsIFwiQWJcIl07IH1cblxuXHRzdGF0aWMgZ2V0IFNUQU5EQVJEX0dVSVRBUl9TVFJJTkdTKCl7IHJldHVybiA2OyB9XG5cdHN0YXRpYyBnZXQgU1RBTkRBUkRfR1VJVEFSX1RVTklORygpeyByZXR1cm4gW1wiRVwiLCBcIkFcIiwgXCJEXCIsIFwiR1wiLCBcIkJcIiwgXCJFXCJdOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuXG5leHBvcnQgY2xhc3MgTm90ZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fbm90ZU5hbWUgPSBcIkFcIjtcblx0XHR0aGlzLl9ub3RhdGlvbiA9IFwiI1wiO1xuXHR9XG5cblx0aW5pdChub3RlLCBub3RhdGlvbiA9IFwiI1wiKXtcblx0XHR0aGlzLnNldE5vdGF0aW9uKG5vdGF0aW9uKTtcblx0XHR0aGlzLnNldE5vdGVOYW1lKG5vdGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdFx0QHBhcmFtIHtzdHJpbmd9IG5vdGUgLSBvbmx5IHRha2VzIHN0cmluZy4gVGhlIGZvcm1hdCBzaG91bGQgYmUgXCJkI1wiLCBcIkVcIiwgXCJjYlwiLi4uXG5cdCovXG5cdHNldE5vdGVOYW1lKG5vdGUpIHtcblx0XHRpZighKHR5cGVvZiBub3RlID09PSBcInN0cmluZ1wiIHx8IG5vdGUgaW5zdGFuY2VvZiBTdHJpbmcpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90ZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZSk7XG5cdFx0fVxuXHRcdHRoaXMuX25vdGVOYW1lID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwobm90ZSwgdGhpcy5nZXROb3RhdGlvbigpKTtcblx0fVxuXG5cdGdldE5vdGVOYW1lKCl7IHJldHVybiB0aGlzLl9ub3RlTmFtZTsgfVxuXG5cdC8qKlxuXHRcdEBwYXJhbSB7c3RyaW5nfSBub3RhdGlvbiAtIG9ubHkgdGFrZXMgc3RyaW5nLiBUaGUgZm9ybWF0IHNob3VsZCBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdCovXG5cdHNldE5vdGF0aW9uKG5vdGF0aW9uKXtcblx0XHRpZighKHR5cGVvZiBub3RhdGlvbiA9PT0gXCJzdHJpbmdcIiB8fCBub3RhdGlvbiBpbnN0YW5jZW9mIFN0cmluZykpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciBub3RhdGlvbiBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90YXRpb24pO1xuXHRcdH1cblx0XHRpZighKG5vdGF0aW9uID09PSBcIiNcIiB8fCBub3RhdGlvbiA9PT0gXCJiXCIpKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90YXRpb24gc2hvdWxkIGJlIGVpdGhlciAnIycgb3IgJ2InOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdFx0dGhpcy5fbm90YXRpb24gPSBub3RhdGlvbjtcblx0XHR0aGlzLnNldE5vdGVOYW1lKHRoaXMuZ2V0Tm90ZU5hbWUoKSwgdGhpcy5nZXROb3RhdGlvbigpKTtcblx0fVxuXG5cdGdldE5vdGF0aW9uKCl7IHJldHVybiB0aGlzLl9ub3RhdGlvbjsgfVxufVxuIl19
