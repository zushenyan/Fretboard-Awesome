import {MusicConst} from "./MusicConst";
import {Fretboard} from "./Fretboard";

export class GuitarFretboard {
	DOM_ID; // assign the default id of Guitar Fretboard main component

	_fretboard;

	constructor(tuning = MusicConst.STANDARD_TUNING, fretNumber = 14, scale = []){
		this.DOM_ID = "gf-fretboard";
		this._fretboard = new Fretboard(tuning, fretNumber);
		this.highlightScale(scale);
	}

	createUI(){
		let uiFretboard = document.getElementById(this.DOM_ID),
				fretNumber = this._fretboard.getFretNumber(),
				strings = this._fretboard.getTuning().length;

		uiFretboard.innerHTML = ""; // clear all elements

		for(let currentFretRow = 0; currentFretRow < fretNumber; currentFretRow++){
			let uiFretRow = document.createElement("ul");
		  uiFretRow.classList.add("gf-fret-row");

			for(let currentString = 0; currentString < strings; currentString++){
				let uiNote = document.createElement("div");
		    let uiNoteChar = document.createElement("span");
				let note = this._fretboard.getFretboard()[currentString][currentFretRow];
		    uiNoteChar.innerHTML = note.getNoteName();
		    uiNote.classList.add("gf-note");
				if(!note.isHighlighted()){
		    	uiNote.classList.toggle("hide");
				}
				uiNote.style.backgroundColor = note.getColor();
		    uiNote.appendChild(uiNoteChar);

				let uiFret = document.createElement("li");
				uiFret.appendChild(uiNote);
				let shiftRow = currentFretRow - 1; // shifting the frets because the first row is an open row.
		    if((shiftRow === 11) &&
		       (currentString === 0 || currentString === 4)){
		      uiFret.classList.add("gf-dot-mark");
		    }
		    else if(
		       (shiftRow !== 0) &&
		       (shiftRow !== 10) &&	// which is 11 fret
					 (shiftRow !== 12) &&	// which is 13 fret
		       (shiftRow % 2 === 0) &&
		       (currentString === 2)){
		      uiFret.classList.add("gf-dot-mark");
		    }
		    uiFretRow.appendChild(uiFret);
			}
			uiFretboard.appendChild(uiFretRow);
		}
	}

	adjustFretboard(tuning = MusicConst.STANDARD_TUNING, number = 14, scale = []){
		this._fretboard.generateFretboard(tuning, number);
		this.highlightScale(scale);
	}

	highlightScale(scale){
		this._fretboard.highlightNotes(scale);
		this.createUI();
	}
}
