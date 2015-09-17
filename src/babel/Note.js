import {MusicTheory} from "./MusicTheory";

export class Note {
	constructor(){
		this._noteName = "";
	}

	init(note, notation = "#"){
		this.setNoteName(note, notation);
		return this;
	}

	/*
		@{string} note - only takes string. The format should be "d#", "E", "cb"...
		@{string} notation - only takes string. The format should either be "#" or "b".
	*/
	setNoteName(note, notation = "#") {
		if(typeof note === "string" || note instanceof String){
			this._noteName = MusicTheory.convertAccidental(note, notation);
		}
		else {
			throw new TypeError("parameter note should be type of string: " + note);
		}
	}

	getNoteName(){ return this._noteName; }
}
