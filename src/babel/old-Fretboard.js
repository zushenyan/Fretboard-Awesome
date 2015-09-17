import {Note} from "./Note";
import {MusicConst} from "./MusicConst";

export class Fretboard {
	_fretNumber;
	_fretboard;
	_tuning;

	constructor(tuning, fretNumber){
		this.generateFretboard(tuning, fretNumber);
	}

	setFretNumber(fretNumber = 14){
		if(typeof fretNumber !== "number"){
			throw new TypeError("fretNumber should be type of number: "+ fretNumber);
		}
		else if(fretNumber < 0){
			throw "fretNumber can not be negtive: " + fretNumber;
		}
		this._fretNumber = fretNumber;
	}

	getFretNumber(){ return this._fretNumber; }

	setTuning(tuning = MusicConst.STANDARD_TUNING){
		if(!(tuning instanceof Array)){
			throw new TypeError("tuning should be type of array: " + tuning);
		}
		this._tuning = [];
		for(let i = 0; i < tuning.length; i++){
			let note = new Note(tuning[i]);
			this._tuning.push(note);
		}
	}

	getTuning(){ return this._tuning; }

	generateFretboard(tuning, fretNumber){
		this.setTuning(tuning);
		this.setFretNumber(fretNumber);

		this._fretboard = [];

		for(let stringIndex = 0; stringIndex < this._tuning.length; stringIndex++){
			let string = [],
					startingNoteIndex = MusicConst.KEYS.indexOf(this._tuning[stringIndex].getNoteName()),
					currentIndex,
					counter;
			for(counter = 0; counter < this.getFretNumber(); counter++){
				currentIndex = (startingNoteIndex + counter) % MusicConst.KEYS.length;
				string.push(new Note(MusicConst.KEYS[currentIndex]));
			}
			this._fretboard.push(string);
		}

		return this.getFretboard();
	}

	getFretboard(){
		return this._fretboard;
	}

	// specifiy what notes should be hightlighted.
	// pass array in.
	// array patter - [new Node("E", "blue"), new Node("G", "yellow"), new Node("F")...]
	highlightNotes(scale){
		if(!(scale instanceof Array)){
			throw new TypeError("scale should be type of array: " + scale);
		}

		this.resetHighlight();

		for(let i = 0; i < this._fretboard.length; i++){
			for(let j = 0; j < this._fretboard[i].length; j++){
				for(let ni = 0; ni < scale.length; ni++){
					if(this._fretboard[i][j].getNoteName() === scale[ni].getNoteName()){
						this._fretboard[i][j].highlightOn();
						this._fretboard[i][j].setColor(scale[ni].getColor());
					}
				}
			}
		}
	}

	resetHighlight(){
		for(let i = 0; i < this._fretboard.length; i++){
			for(let j = 0; j < this._fretboard[i].length; j++){
				this._fretboard[i][j].highlightOff();
			}
		}
	}
}
