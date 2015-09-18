import {MusicTheory} from "./MusicTheory";
import {Note} from "./Note";
import {AbstractFretboard} from "./AbstractFretboard";
import {EleNote} from "./EleNote";
import {EleString} from "./EleString";
import {EleFretboard} from "./EleFretboard";
import {FretboardAwesome} from "./FretboardAwesome";

(function(win){
	"use strict";

	var fa = {
		MusicTheory: MusicTheory,
		Note: Note,
		EleNote: EleNote,
		AbstractFretboard: AbstractFretboard,
		EleFretboard: EleFretboard,
		EleString: EleString,
		FretboardAwesome: FretboardAwesome
	}

	win.fa = fa;
})(window);
