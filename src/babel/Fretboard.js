import {MusicTheory} from "./MusicTheory";
import {Note} from "./Note";

export class Fretboard{
	constructor(){
		this._tuning = [];
		this._strings = [];
	}

	init(tuning, length, notation, includeStart){
		this.setTuning(tuning, length, notation, includeStart);
		return this;
	}

	setTuning(tuning, length, notation = "#", includeStart = false){
		if(!(tuning instanceof Array)){
			throw new TypeError("parameter tuning should be type of array: " + tuning);
		}
		if(!(typeof length !== "number") && length < 1){
			throw new TypeError("parameter tuning should be a number which is greater than 0: " + length);
		}
		if(typeof includeStart !== "boolean"){
			throw new TypeError("includeStart should be type of boolean: " + includeStart);
		}
		if(notation === "#" ||  notation === "b"){
			this._tuning = MusicTheory.convertAccidental(tuning);
			this._strings = [];
			for(let i = 0; i < this._tuning.length; i++){
				let result = MusicTheory.tuning(this._tuning[i], length, notation, includeStart).map((value) => {
						return new Note().init(value, notation);
					});
				this._strings.push(result);
			}
		}
		else{
			throw new TypeError("notation should either be '#' or 'b' in string type: " + notation);
		}
	}

	getTuning(){
		return this._tuning;
	}

	getStrings(){
		return this._strings;
	}
}
