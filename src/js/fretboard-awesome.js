(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Note2 = require("./Note");

var _FretboardAwesomeConfig = require("./FretboardAwesomeConfig");

var EleNote = (function (_Note) {
	_inherits(EleNote, _Note);

	function EleNote() {
		_classCallCheck(this, EleNote);

		_get(Object.getPrototypeOf(EleNote.prototype), "constructor", this).call(this);
		this._uiLi = document.createElement("li");
		this._uiSpan = document.createElement("span");

		this._uiLi.classList.add("fa-note");
		this._uiLi.appendChild(this._uiSpan);
	}

	/*
 	@{string} note - format "d#", "E", "G#".
 	@{string} notation - either be "#" or "b".
 	@{string} bgColor - color format in string.
 	@{boolean} visible - to show this element note or not.
 */

	_createClass(EleNote, [{
		key: "init",
		value: function init(note) {
			var notation = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];
			var bgColor = arguments.length <= 2 || arguments[2] === undefined ? "white" : arguments[2];
			var visible = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			_get(Object.getPrototypeOf(EleNote.prototype), "init", this).call(this, note, notation);
			this.setNoteName(note, notation);
			this.setBgColor(bgColor);
			this.setVisible(visible);

			return this;
		}
	}, {
		key: "getEle",
		value: function getEle() {
			return this._uiLi;
		}
	}, {
		key: "setNoteName",
		value: function setNoteName(noteName, notation) {
			if (typeof noteName === "string" || noteName instanceof String || notation === "#" || notation == "b") {
				_get(Object.getPrototypeOf(EleNote.prototype), "setNoteName", this).call(this, noteName, notation);
				this._uiSpan.innerHTML = "";
				this._uiSpan.appendChild(document.createTextNode(this.getNoteName()));
			} else {
				throw new TypeError("parameter noteName should be type of string: " + noteName);
			}
		}
	}, {
		key: "setBgColor",
		value: function setBgColor(bgColor) {
			if (typeof bgColor === "string" || bgColor instanceof String) {
				this._uiLi.style.backgroundColor = bgColor;
			} else {
				throw new TypeError("parameter bgColor should be type of string: " + bgColor);
			}
		}
	}, {
		key: "getBgColor",
		value: function getBgColor() {
			return this._uiLi.style.backgroundColor;
		}
	}, {
		key: "setVisible",
		value: function setVisible(visible) {
			if (typeof visible !== "boolean") {
				throw new TypeError("parameter visible should be type of boolean: " + visible);
			}
			if (visible) {
				this._uiLi.classList.remove("hide");
			} else {
				this._uiLi.classList.add("hide");
			}
		}
	}, {
		key: "getVisible",
		value: function getVisible() {
			return this._uiList.classList.contains("hide");
		}

		/*
  	the "dot" on 3,5,7,9,12... guitar frets
  */
	}, {
		key: "markInlays",
		value: function markInlays() {
			this._uiLi.classList.add("inlays");
		}
	}, {
		key: "removeInlays",
		value: function removeInlays() {
			this._uiLi.classList.remove("inlays");
		}
	}, {
		key: "hasInlays",
		value: function hasInlays() {
			return this._uiLi.classList.contains("inlays");
		}
	}]);

	return EleNote;
})(_Note2.Note);

exports.EleNote = EleNote;

},{"./FretboardAwesomeConfig":3,"./Note":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _MusicTheory = require("./MusicTheory");

var _Note = require("./Note");

var Fretboard = (function () {
	function Fretboard() {
		_classCallCheck(this, Fretboard);

		this._tuning = [];
		this._strings = [];
	}

	_createClass(Fretboard, [{
		key: "init",
		value: function init(tuning, length, notation, includeStart) {
			this.setTuning(tuning, length, notation, includeStart);
			return this;
		}
	}, {
		key: "setTuning",
		value: function setTuning(tuning, length) {
			var notation = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
			var includeStart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			if (!(tuning instanceof Array)) {
				throw new TypeError("parameter tuning should be type of array: " + tuning);
			}
			if (!(typeof length !== "number") && length < 1) {
				throw new TypeError("parameter tuning should be a number which is greater than 0: " + length);
			}
			if (typeof includeStart !== "boolean") {
				throw new TypeError("includeStart should be type of boolean: " + includeStart);
			}
			if (notation === "#" || notation === "b") {
				this._tuning = _MusicTheory.MusicTheory.convertAccidental(tuning);
				this._strings = [];
				for (var i = 0; i < this._tuning.length; i++) {
					var result = _MusicTheory.MusicTheory.tuning(this._tuning[i], length, notation, includeStart).map(function (value) {
						return new _Note.Note().init(value, notation);
					});
					this._strings.push(result);
				}
			} else {
				throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
			}
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

	return Fretboard;
})();

exports.Fretboard = Fretboard;

},{"./MusicTheory":4,"./Note":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var FretboardAwesomeConfig = {
	NOTE_BG_COLOR: "white"
};
exports.FretboardAwesomeConfig = FretboardAwesomeConfig;

},{}],4:[function(require,module,exports){
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

		/*
  	@{string} note - accept a string in specified notation, see normalize() for more info.
  	@{string} convertTo - should either be "#" or "b" in string type.
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

		/*
  	@{string, array} note - accepts string of array of strings. string should be within 2 characters long and written in fashion like "Cb", "D", "D#",
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

		/*
  	@{string} startKey - the key you want to start with. Format should be "C#", "d", "eb"...
  	@{number} length - how long the array should function return.
  	@{string} noration - either "#" or "b".
  	@{boolean} includeStart - whether to include the start key.
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

},{}],5:[function(require,module,exports){
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

		/*
  	@{string} note - only takes string. The format should be "d#", "E", "cb"...
  	@{string} notation - only takes string. The format should either be "#" or "b".
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

},{"./MusicTheory":4}],6:[function(require,module,exports){
"use strict";

var _MusicTheory = require("./MusicTheory");

var _Note = require("./Note");

var _EleNote = require("./EleNote");

var _Fretboard = require("./Fretboard");

(function (win) {
	"use strict";

	var fa = {
		MusicTheory: _MusicTheory.MusicTheory,
		Note: _Note.Note,
		EleNote: _EleNote.EleNote,
		Fretboard: _Fretboard.Fretboard
	};

	win.fa = fa;
})(window);

},{"./EleNote":1,"./Fretboard":2,"./MusicTheory":4,"./Note":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0VsZU5vdGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL0ZyZXRib2FyZC5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvRnJldGJvYXJkQXdlc29tZUNvbmZpZy5qcyIsIi9Vc2Vycy96dXNoZW55YW4vRG9jdW1lbnRzL0dpdGh1Yi9GcmV0Ym9hcmQtQXdlc29tZS9zcmMvYmFiZWwvTXVzaWNUaGVvcnkuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL05vdGUuanMiLCIvVXNlcnMvenVzaGVueWFuL0RvY3VtZW50cy9HaXRodWIvRnJldGJvYXJkLUF3ZXNvbWUvc3JjL2JhYmVsL2ZyZXRib2FyZC1hd2Vzb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7cUJDQW1CLFFBQVE7O3NDQUNVLDBCQUEwQjs7SUFFbEQsT0FBTztXQUFQLE9BQU87O0FBQ1IsVUFEQyxPQUFPLEdBQ047d0JBREQsT0FBTzs7QUFFbEIsNkJBRlcsT0FBTyw2Q0FFVjtBQUNSLE1BQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxNQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTlDLE1BQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNw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QUFNLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7RnJldGJvYXJkQXdlc29tZUNvbmZpZ30gZnJvbSBcIi4vRnJldGJvYXJkQXdlc29tZUNvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRWxlTm90ZSBleHRlbmRzIE5vdGV7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91aUxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRoaXMuX3VpU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG5cdFx0dGhpcy5fdWlMaS5jbGFzc0xpc3QuYWRkKFwiZmEtbm90ZVwiKTtcblx0XHR0aGlzLl91aUxpLmFwcGVuZENoaWxkKHRoaXMuX3VpU3Bhbik7XG5cdH1cblxuXHQvKlxuXHRcdEB7c3RyaW5nfSBub3RlIC0gZm9ybWF0IFwiZCNcIiwgXCJFXCIsIFwiRyNcIi5cblx0XHRAe3N0cmluZ30gbm90YXRpb24gLSBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdFx0QHtzdHJpbmd9IGJnQ29sb3IgLSBjb2xvciBmb3JtYXQgaW4gc3RyaW5nLlxuXHRcdEB7Ym9vbGVhbn0gdmlzaWJsZSAtIHRvIHNob3cgdGhpcyBlbGVtZW50IG5vdGUgb3Igbm90LlxuXHQqL1xuXHRpbml0KG5vdGUsIG5vdGF0aW9uID0gXCIjXCIsIGJnQ29sb3IgPSBcIndoaXRlXCIsIHZpc2libGUgPSBmYWxzZSl7XG5cdFx0c3VwZXIuaW5pdChub3RlLCBub3RhdGlvbik7XG5cdFx0dGhpcy5zZXROb3RlTmFtZShub3RlLCBub3RhdGlvbik7XG5cdFx0dGhpcy5zZXRCZ0NvbG9yKGJnQ29sb3IpO1xuXHRcdHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpTGk7XG5cdH1cblxuXHRzZXROb3RlTmFtZShub3RlTmFtZSwgbm90YXRpb24pe1xuXHRcdGlmKHR5cGVvZiBub3RlTmFtZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlTmFtZSBpbnN0YW5jZW9mIFN0cmluZyB8fCBub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT0gXCJiXCIpe1xuXHRcdFx0c3VwZXIuc2V0Tm90ZU5hbWUobm90ZU5hbWUsIG5vdGF0aW9uKTtcblx0XHRcdHRoaXMuX3VpU3Bhbi5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5fdWlTcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuZ2V0Tm90ZU5hbWUoKSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90ZU5hbWUgc2hvdWxkIGJlIHR5cGUgb2Ygc3RyaW5nOiBcIiArIG5vdGVOYW1lKTtcblx0XHR9XG5cdH1cblxuXHRzZXRCZ0NvbG9yKGJnQ29sb3Ipe1xuXHRcdGlmKHR5cGVvZiBiZ0NvbG9yID09PSBcInN0cmluZ1wiIHx8IGJnQ29sb3IgaW5zdGFuY2VvZiBTdHJpbmcpe1xuXHRcdFx0dGhpcy5fdWlMaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgYmdDb2xvciBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgYmdDb2xvcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0QmdDb2xvcigpe1xuXHRcdHJldHVybiB0aGlzLl91aUxpLnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblx0fVxuXG5cdHNldFZpc2libGUodmlzaWJsZSl7XG5cdFx0aWYodHlwZW9mIHZpc2libGUgIT09IFwiYm9vbGVhblwiKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgdmlzaWJsZSBzaG91bGQgYmUgdHlwZSBvZiBib29sZWFuOiBcIiArIHZpc2libGUpO1xuXHRcdH1cblx0XHRpZih2aXNpYmxlKXtcblx0XHRcdHRoaXMuX3VpTGkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLl91aUxpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFZpc2libGUoKXtcblx0XHRyZXR1cm4gdGhpcy5fdWlMaXN0LmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIik7XG5cdH1cblxuXHQvKlxuXHRcdHRoZSBcImRvdFwiIG9uIDMsNSw3LDksMTIuLi4gZ3VpdGFyIGZyZXRzXG5cdCovXG5cdG1hcmtJbmxheXMoKXsgdGhpcy5fdWlMaS5jbGFzc0xpc3QuYWRkKFwiaW5sYXlzXCIpOyB9XG5cdHJlbW92ZUlubGF5cygpeyB0aGlzLl91aUxpLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmxheXNcIik7IH1cblx0aGFzSW5sYXlzKCl7IHJldHVybiB0aGlzLl91aUxpLmNsYXNzTGlzdC5jb250YWlucyhcImlubGF5c1wiKTsgfTtcbn1cbiIsImltcG9ydCB7TXVzaWNUaGVvcnl9IGZyb20gXCIuL011c2ljVGhlb3J5XCI7XG5pbXBvcnQge05vdGV9IGZyb20gXCIuL05vdGVcIjtcblxuZXhwb3J0IGNsYXNzIEZyZXRib2FyZHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl90dW5pbmcgPSBbXTtcblx0XHR0aGlzLl9zdHJpbmdzID0gW107XG5cdH1cblxuXHRpbml0KHR1bmluZywgbGVuZ3RoLCBub3RhdGlvbiwgaW5jbHVkZVN0YXJ0KXtcblx0XHR0aGlzLnNldFR1bmluZyh0dW5pbmcsIGxlbmd0aCwgbm90YXRpb24sIGluY2x1ZGVTdGFydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRUdW5pbmcodHVuaW5nLCBsZW5ndGgsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVTdGFydCA9IGZhbHNlKXtcblx0XHRpZighKHR1bmluZyBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyYW1ldGVyIHR1bmluZyBzaG91bGQgYmUgdHlwZSBvZiBhcnJheTogXCIgKyB0dW5pbmcpO1xuXHRcdH1cblx0XHRpZighKHR5cGVvZiBsZW5ndGggIT09IFwibnVtYmVyXCIpICYmIGxlbmd0aCA8IDEpe1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcmFtZXRlciB0dW5pbmcgc2hvdWxkIGJlIGEgbnVtYmVyIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiAwOiBcIiArIGxlbmd0aCk7XG5cdFx0fVxuXHRcdGlmKHR5cGVvZiBpbmNsdWRlU3RhcnQgIT09IFwiYm9vbGVhblwiKXtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmNsdWRlU3RhcnQgc2hvdWxkIGJlIHR5cGUgb2YgYm9vbGVhbjogXCIgKyBpbmNsdWRlU3RhcnQpO1xuXHRcdH1cblx0XHRpZihub3RhdGlvbiA9PT0gXCIjXCIgfHwgIG5vdGF0aW9uID09PSBcImJcIil7XG5cdFx0XHR0aGlzLl90dW5pbmcgPSBNdXNpY1RoZW9yeS5jb252ZXJ0QWNjaWRlbnRhbCh0dW5pbmcpO1xuXHRcdFx0dGhpcy5fc3RyaW5ncyA9IFtdO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3R1bmluZy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBNdXNpY1RoZW9yeS50dW5pbmcodGhpcy5fdHVuaW5nW2ldLCBsZW5ndGgsIG5vdGF0aW9uLCBpbmNsdWRlU3RhcnQpLm1hcCgodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgTm90ZSgpLmluaXQodmFsdWUsIG5vdGF0aW9uKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5fc3RyaW5ncy5wdXNoKHJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwibm90YXRpb24gc2hvdWxkIGVpdGhlciBiZSAnIycgb3IgJ2InIGluIHN0cmluZyB0eXBlOiBcIiArIG5vdGF0aW9uKTtcblx0XHR9XG5cdH1cblxuXHRnZXRUdW5pbmcoKXtcblx0XHRyZXR1cm4gdGhpcy5fdHVuaW5nO1xuXHR9XG5cblx0Z2V0U3RyaW5ncygpe1xuXHRcdHJldHVybiB0aGlzLl9zdHJpbmdzO1xuXHR9XG59XG4iLCJleHBvcnQgbGV0IEZyZXRib2FyZEF3ZXNvbWVDb25maWcgPSB7XG5cdE5PVEVfQkdfQ09MT1I6IFwid2hpdGVcIlxufVxuIiwiZXhwb3J0IGNsYXNzIE11c2ljVGhlb3J5IHtcblx0Lypcblx0XHRAe3N0cmluZ30gbm90ZSAtIGFjY2VwdCBhIHN0cmluZyBpbiBzcGVjaWZpZWQgbm90YXRpb24sIHNlZSBub3JtYWxpemUoKSBmb3IgbW9yZSBpbmZvLlxuXHRcdEB7c3RyaW5nfSBjb252ZXJ0VG8gLSBzaG91bGQgZWl0aGVyIGJlIFwiI1wiIG9yIFwiYlwiIGluIHN0cmluZyB0eXBlLlxuXHRcdEByZXR1cm4ge3N0cmluZ30gLSB3aWxsIHJldHVybiB0aGUgcXVlcnkgcmVzdWx0LlxuXHQqL1xuXHRzdGF0aWMgY29udmVydEFjY2lkZW50YWwobm90ZSwgY29udmVydFRvID0gXCIjXCIpe1xuXHRcdGlmKGNvbnZlcnRUbyAhPT0gXCIjXCIgJiYgY29udmVydFRvICE9PSBcImJcIil7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udmVydFRvIHNob3VsZCBlaXRoZXIgYmUgJyMnIG9yICdiJyBpbiBzdHJpbmcgdHlwZTogXCIgKyBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRpZihub3RlIGluc3RhbmNlb2YgQXJyYXkpe1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRBcnJheShub3RlLCBjb252ZXJ0VG8pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRTaW5nbGUobm90ZSwgY29udmVydFRvKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb252ZXJ0QXJyYXkobm90ZXMsIGNvbnZlcnRUbyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjb252ZXJ0U2luZ2xlKG5vdGVzW2ldLCBjb252ZXJ0VG8pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydFNpbmdsZShub3RlLCBjb252ZXJ0VG8pe1xuXHRcdFx0bGV0IHJlc3VsdCA9IE11c2ljVGhlb3J5Lm5vcm1hbGl6ZShub3RlKTtcblx0XHRcdGxldCBzYW1lTm90YXRpb24gPSByZXN1bHRbMV0gPT09IGNvbnZlcnRUbztcblx0XHRcdGlmKHJlc3VsdC5sZW5ndGggPT09IDEgfHwgc2FtZU5vdGF0aW9uKXtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydFRvID09PSBcIiNcIil7XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfRkxBVFtpXSA9PT0gcmVzdWx0KXtcblx0XHRcdFx0XHRcdHJldHVybiBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0VG8gPT09IFwiYlwiKXtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlAubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKE11c2ljVGhlb3J5LktFWVNfQUNDSURFTlRBTFNfU0hBUlBbaV0gPT09IHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19GTEFUW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90IGZvdW5kOiBcIiArIHJlc3VsdCArIFwiIFwiICsgY29udmVydFRvKTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihcIndoYXQncyB0aGUgc29yY2VyeT8gXCIgKyByZXN1bHQgKyBcIiBcIiArIGNvbnZlcnRUbyk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRAe3N0cmluZywgYXJyYXl9IG5vdGUgLSBhY2NlcHRzIHN0cmluZyBvZiBhcnJheSBvZiBzdHJpbmdzLiBzdHJpbmcgc2hvdWxkIGJlIHdpdGhpbiAyIGNoYXJhY3RlcnMgbG9uZyBhbmQgd3JpdHRlbiBpbiBmYXNoaW9uIGxpa2UgXCJDYlwiLCBcIkRcIiwgXCJEI1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgaWYgeW91IGlucHV0IFwiQ2JiYmJiXCIsIHRoZSBmdW5jdGlvbiB3aWxsIHN0aWxsIGRvIHRoZSBwYXJzZSBhbmQgcmV0dXJuIFwiQ2JcIiBhcyB0aGUgcmVzdWx0LlxuXHRcdEByZXR1cm4ge251bGwsIHN0cmluZ30gLSB3aWxsIHJldHVybiBudWxsIGlmIG5vIHBhdHRlcm4gaXMgZm91bmQsIG9yIHJldHVybiBhIHN0cmluZyB3aXRoIGNhcGl0YWxpemVkIGZpcnN0IGxldHRlciB3aXRoaW4gMiBsZW5ndGguXG5cdCovXG5cdHN0YXRpYyBub3JtYWxpemUobm90ZSl7XG5cdFx0aWYodHlwZW9mIG5vdGUgPT09IFwic3RyaW5nXCIgfHwgbm90ZSBpbnN0YW5jZW9mIFN0cmluZyl7XG5cdFx0XHRyZXR1cm4gbm9ybWFsaXplU2luZ2xlKG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlIGlmKG5vdGUgaW5zdGFuY2VvZiBBcnJheSl7XG5cdFx0XHRyZXR1cm4gbm9ybWFsaXplQXJyYXkobm90ZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IG5vdGUgc2h1b2xkIGJlIGVpdGhlciBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5nczogXCIgKyBub3RlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBub3JtYWxpemVBcnJheShub3Rlcyl7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChub3JtYWxpemVTaW5nbGUobm90ZXNbaV0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihlICsgXCIgW1wiICsgbm90ZXMgKyBcIl1cIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlKG5vdGUpe1xuXHRcdFx0bGV0IHNoYXJwUmVzdWx0ID0gTXVzaWNUaGVvcnkuTk9UQVRJT05fU0hBUlAuZXhlYyhub3RlKTtcblx0XHRcdGxldCBmbGF0UmVzdWx0ID0gTXVzaWNUaGVvcnkuTk9UQVRJT05fRkxBVC5leGVjKG5vdGUpO1xuXHRcdFx0c2hhcnBSZXN1bHQgPSBzaGFycFJlc3VsdCA/IHNoYXJwUmVzdWx0WzBdIDogbnVsbDtcblx0XHRcdGZsYXRSZXN1bHQgPSBmbGF0UmVzdWx0ID8gZmxhdFJlc3VsdFswXSA6IG51bGw7XG5cdFx0XHRpZihzaGFycFJlc3VsdCB8fCBmbGF0UmVzdWx0KXtcblx0XHRcdFx0bGV0IHJlc3VsdCA9IChzaGFycFJlc3VsdC5sZW5ndGggPiBmbGF0UmVzdWx0Lmxlbmd0aCkgPyBzaGFycFJlc3VsdCA6IGZsYXRSZXN1bHQ7XG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdFswXS50b1VwcGVyQ2FzZSgpICsgcmVzdWx0LnNsaWNlKDEpO1xuXHRcdFx0XHRyZXN1bHQgPSAocmVzdWx0ID09PSBcIkNiXCIpID8gXCJCXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCA9PT0gXCJCI1wiKSA/IFwiQ1wiIDpcblx0XHRcdFx0XHRcdFx0XHRcdChyZXN1bHQgPT09IFwiRmJcIikgPyBcIkVcIiA6XG5cdFx0XHRcdFx0XHRcdFx0XHQocmVzdWx0ID09PSBcIkUjXCIpID8gXCJGXCIgOlxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0O1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90ZTogXCIgKyBub3RlICsgXCIgaXMgbm90IGFuIGFjY2VwdGFibGUgcGF0dGVybi5cIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRAe3N0cmluZ30gc3RhcnRLZXkgLSB0aGUga2V5IHlvdSB3YW50IHRvIHN0YXJ0IHdpdGguIEZvcm1hdCBzaG91bGQgYmUgXCJDI1wiLCBcImRcIiwgXCJlYlwiLi4uXG5cdFx0QHtudW1iZXJ9IGxlbmd0aCAtIGhvdyBsb25nIHRoZSBhcnJheSBzaG91bGQgZnVuY3Rpb24gcmV0dXJuLlxuXHRcdEB7c3RyaW5nfSBub3JhdGlvbiAtIGVpdGhlciBcIiNcIiBvciBcImJcIi5cblx0XHRAe2Jvb2xlYW59IGluY2x1ZGVTdGFydCAtIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgc3RhcnQga2V5LlxuXHRcdEByZXR1cm4ge2FycmF5fSAtIGFuIGFycmF5IHdpdGggc3RyaW5nIGNvbnRhaW5zIHRoZSBzZXF1ZW5jZSBvZiBrZXlzLlxuXHQqL1xuXHRzdGF0aWMgdHVuaW5nKHN0YXJ0S2V5ID0gXCJDXCIsIGxlbmd0aCA9IDcsIG5vdGF0aW9uID0gXCIjXCIsIGluY2x1ZGVTdGFydCA9IHRydWUpe1xuXHRcdGlmKCh0eXBlb2Ygc3RhcnRLZXkgPT09IFwic3RyaW5nXCIgfHwgc3RhcnRLZXkgaW5zdGFuY2VvZiBTdHJpbmcpICYmXG5cdFx0XHRcdChub3RhdGlvbiA9PT0gXCIjXCIgfHwgbm90YXRpb24gPT09IFwiYlwiKSAmJlxuXHRcdFx0XHQodHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwKSAmJlxuXHRcdFx0XHQodHlwZW9mIGluY2x1ZGVTdGFydCA9PT0gXCJib29sZWFuXCIpKXtcblx0XHRcdHN0YXJ0S2V5ID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwoc3RhcnRLZXksIG5vdGF0aW9uKTtcblx0XHRcdGxldCBzdGFydEluZGV4ID0gMDtcblx0XHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRcdGlmKG5vdGF0aW9uID09PSBcIiNcIil7XG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX1NIQVJQLmluZGV4T2Yoc3RhcnRLZXkpO1xuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFydEluZGV4LCBjb3VudGVyID0gMDsgY291bnRlciA8IGxlbmd0aDsgaSsrLCBjb3VudGVyKyspe1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGluZmluaXRlSW5kZXhpbmcoTXVzaWNUaGVvcnkuS0VZU19BQ0NJREVOVEFMU19TSEFSUCwgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKG5vdGF0aW9uID09PSBcImJcIil7XG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQuaW5kZXhPZihzdGFydEtleSk7XG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YXJ0SW5kZXgsIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbGVuZ3RoOyBpKyssIGNvdW50ZXIrKyl7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goaW5maW5pdGVJbmRleGluZyhNdXNpY1RoZW9yeS5LRVlTX0FDQ0lERU5UQUxTX0ZMQVQsIGkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGluY2x1ZGVTdGFydCA/IHJlc3VsdCA6IHJlc3VsdC5zbGljZSgxKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwib25lIG9mIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZDogXCIgKyBcIlxcblwiICsgc3RhcnRLZXkgKyBcIlxcblwiICsgbGVuZ3RoICsgXCJcXG5cIiArIG5vdGF0aW9uICsgXCJcXG5cIiArIGluY2x1ZGVTdGFydCk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcihcIndoYXQncyB0aGUgc29yY2VyeT8gXCIgKyBzdGFydEtleSArIFwiIFwiICsgbGVuZ3RoICsgXCIgXCIgKyBub3RhdGlvbiArIFwiIFwiICsgaW5jbHVkZVN0YXJ0KTtcblxuXHRcdGZ1bmN0aW9uIGluZmluaXRlSW5kZXhpbmcoYXJyYXksIGluZGV4KXtcblx0XHRcdGluZGV4ID0gaW5kZXggJSBhcnJheS5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gYXJyYXlbaW5kZXhdO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9UQVRJT05fU0hBUlAoKSB7IHJldHVybiAvXlthLWd8QS1HXSM/LzsgfVxuXHRzdGF0aWMgZ2V0IE5PVEFUSU9OX0ZMQVQoKSB7IHJldHVybiAvXlthLWd8QS1HXWI/LzsgfVxuXG5cdHN0YXRpYyBnZXQgS0VZU19BQ0NJREVOVEFMU19TSEFSUCgpeyByZXR1cm4gW1wiQVwiLCBcIkEjXCIsIFwiQlwiLCBcIkNcIiwgXCJDI1wiLCBcIkRcIiwgXCJEI1wiLCBcIkVcIiwgXCJGXCIsIFwiRiNcIiwgXCJHXCIsIFwiRyNcIl07IH1cblx0c3RhdGljIGdldCBLRVlTX0FDQ0lERU5UQUxTX0ZMQVQoKXsgcmV0dXJuIFtcIkFcIiwgXCJCYlwiLCBcIkJcIiwgXCJDXCIsIFwiRGJcIiwgXCJEXCIsIFwiRWJcIiwgXCJFXCIsIFwiRlwiLCBcIkdiXCIsIFwiR1wiLCBcIkFiXCJdOyB9XG5cblx0c3RhdGljIGdldCBTVEFOREFSRF9HVUlUQVJfU1RSSU5HUygpeyByZXR1cm4gNjsgfVxuXHRzdGF0aWMgZ2V0IFNUQU5EQVJEX0dVSVRBUl9UVU5JTkcoKXsgcmV0dXJuIFtcIkVcIiwgXCJBXCIsIFwiRFwiLCBcIkdcIiwgXCJCXCIsIFwiRVwiXTsgfVxufVxuIiwiaW1wb3J0IHtNdXNpY1RoZW9yeX0gZnJvbSBcIi4vTXVzaWNUaGVvcnlcIjtcblxuZXhwb3J0IGNsYXNzIE5vdGUge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX25vdGVOYW1lID0gXCJcIjtcblx0fVxuXG5cdGluaXQobm90ZSwgbm90YXRpb24gPSBcIiNcIil7XG5cdFx0dGhpcy5zZXROb3RlTmFtZShub3RlLCBub3RhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdEB7c3RyaW5nfSBub3RlIC0gb25seSB0YWtlcyBzdHJpbmcuIFRoZSBmb3JtYXQgc2hvdWxkIGJlIFwiZCNcIiwgXCJFXCIsIFwiY2JcIi4uLlxuXHRcdEB7c3RyaW5nfSBub3RhdGlvbiAtIG9ubHkgdGFrZXMgc3RyaW5nLiBUaGUgZm9ybWF0IHNob3VsZCBlaXRoZXIgYmUgXCIjXCIgb3IgXCJiXCIuXG5cdCovXG5cdHNldE5vdGVOYW1lKG5vdGUsIG5vdGF0aW9uID0gXCIjXCIpIHtcblx0XHRpZih0eXBlb2Ygbm90ZSA9PT0gXCJzdHJpbmdcIiB8fCBub3RlIGluc3RhbmNlb2YgU3RyaW5nKXtcblx0XHRcdHRoaXMuX25vdGVOYW1lID0gTXVzaWNUaGVvcnkuY29udmVydEFjY2lkZW50YWwobm90ZSwgbm90YXRpb24pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJhbWV0ZXIgbm90ZSBzaG91bGQgYmUgdHlwZSBvZiBzdHJpbmc6IFwiICsgbm90ZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Tm90ZU5hbWUoKXsgcmV0dXJuIHRoaXMuX25vdGVOYW1lOyB9XG59XG4iLCJpbXBvcnQge011c2ljVGhlb3J5fSBmcm9tIFwiLi9NdXNpY1RoZW9yeVwiO1xuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9Ob3RlXCI7XG5pbXBvcnQge0VsZU5vdGV9IGZyb20gXCIuL0VsZU5vdGVcIjtcbmltcG9ydCB7RnJldGJvYXJkfSBmcm9tIFwiLi9GcmV0Ym9hcmRcIjtcblxuKGZ1bmN0aW9uKHdpbil7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBmYSA9IHtcblx0XHRNdXNpY1RoZW9yeTogTXVzaWNUaGVvcnksXG5cdFx0Tm90ZTogTm90ZSxcblx0XHRFbGVOb3RlOiBFbGVOb3RlLFxuXHRcdEZyZXRib2FyZDogRnJldGJvYXJkXG5cdH1cblxuXHR3aW4uZmEgPSBmYTtcbn0pKHdpbmRvdyk7XG4iXX0=
