import {MusicTheory} from "./MusicTheory";
import {Note} from "./Note";
import {EleNote} from "./EleNote";
import {Fretboard} from "./Fretboard";

(function(win){
	"use strict";

	var fa = {
		MusicTheory: MusicTheory,
		Note: Note,
		EleNote: EleNote,
		Fretboard: Fretboard
	}

	win.fa = fa;
})(window);
