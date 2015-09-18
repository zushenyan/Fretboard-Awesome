/**
	@abstract
*/
export class AbstractFretboard{
	constructor(){
		if(this.constructor === AbstractFretboard){
			throw new Error("It's an abstract class should' be instantiated");
		}
		this._tuning = [];
		this._strings = [];
	}

	init(){
		throw new Error("overwritten init or GTFO");
	}

	/**
		@param {string} tuning - array of string. Each element should present in format like this "E#", "c", "db"...
		@param {number} length - how long the array should function return.
		@param {string} notation - should be either "#" or "b".
		@param {boolean} includeStart - whether to include the start key.
	*/
	setTuning(tuning, length, notation = "#", includeStart = false, noteType = Note){
		throw new Error("overwritten setTuning or GTFO");
	}

	getTuning(){
		return this._tuning;
	}

	getStrings(){
		return this._strings;
	}
}
