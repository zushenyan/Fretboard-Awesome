import {MusicTheory} from "./MusicTheory";

export class Note {
	constructor(){
		this._noteName = "A";
		this._notation = "#";
	}

	init(note, notation = "#"){
		this.setNotation(notation);
		this.setNoteName(note);
		return this;
	}

	/**
		@param {string} note - only takes string. The format should be "d#", "E", "cb"...
	*/
	setNoteName(note) {
		if(!(typeof note === "string" || note instanceof String)){
			throw new TypeError("parameter note should be type of string: " + note);
		}
		this._noteName = MusicTheory.convertAccidental(note, this.getNotation());
	}

	getNoteName(){ return this._noteName; }

	/**
		@param {string} notation - only takes string. The format should either be "#" or "b".
	*/
	setNotation(notation){
		if(!(typeof notation === "string" || notation instanceof String)){
			throw new TypeError("parameter notation should be type of string: " + notation);
		}
		if(!(notation === "#" || notation === "b")){
			throw new TypeError("parameter notation should be either '#' or 'b': " + notation);
		}
		this._notation = notation;
		this.setNoteName(this.getNoteName(), this.getNotation());
	}

	getNotation(){ return this._notation; }
}
