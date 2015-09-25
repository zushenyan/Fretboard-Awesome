export class MusicTheory {
	/**
		@param {string, array} note - accept a string in specified notation, see normalize() for more info.
		@param {string} convertTo - should either be "#" or "b" in string type.
		@return {string} - will return the query result.
	*/
	static convertAccidental(note, convertTo = "#"){
		if(convertTo !== "#" && convertTo !== "b"){
			throw new TypeError("convertTo should either be '#' or 'b' in string type: " + convertTo);
		}
		if(note instanceof Array){
			return convertArray(note, convertTo);
		}
		else{
			return convertSingle(note, convertTo);
		}

		function convertArray(notes, convertTo){
			try{
				let result = [];
				for(let i = 0; i < notes.length; i++){
					result.push(convertSingle(notes[i], convertTo));
				}
				return result;
			}
			catch(e){
				throw new Error(e + " [" + notes + "]");
			}
		}

		function convertSingle(note, convertTo){
			let result = MusicTheory.normalize(note);
			let sameNotation = result[1] === convertTo;
			if(result.length === 1 || sameNotation){
				return result;
			}
			else if(convertTo === "#"){
				for(let i = 0; i < MusicTheory.KEYS_ACCIDENTALS_FLAT.length; i++){
					if(MusicTheory.KEYS_ACCIDENTALS_FLAT[i] === result){
						return MusicTheory.KEYS_ACCIDENTALS_SHARP[i];
					}
				}
			}
			else if(convertTo === "b"){
				for(let i = 0; i < MusicTheory.KEYS_ACCIDENTALS_SHARP.length; i++){
					if(MusicTheory.KEYS_ACCIDENTALS_SHARP[i] === result){
						return MusicTheory.KEYS_ACCIDENTALS_FLAT[i];
					}
				}
			}
			else{
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
	static normalize(note){
		if(typeof note === "string" || note instanceof String){
			return normalizeSingle(note);
		}
		else if(note instanceof Array){
			return normalizeArray(note);
		}
		else {
			throw new TypeError("argument note shuold be either string or array of strings: " + note);
		}

		function normalizeArray(notes){
			try{
				let result = [];
				for(let i = 0; i < notes.length; i++){
					result.push(normalizeSingle(notes[i]));
				}
				return result;
			}
			catch(e){
				throw new Error(e + " [" + notes + "]");
			}
		}

		function normalizeSingle(note){
			let sharpResult = MusicTheory.NOTATION_SHARP.exec(note);
			let flatResult = MusicTheory.NOTATION_FLAT.exec(note);
			sharpResult = sharpResult ? sharpResult[0] : null;
			flatResult = flatResult ? flatResult[0] : null;
			if(sharpResult || flatResult){
				let result = (sharpResult.length > flatResult.length) ? sharpResult : flatResult;
				result = result[0].toUpperCase() + result.slice(1);
				result = (result === "Cb") ? "B" :
									(result === "B#") ? "C" :
									(result === "Fb") ? "E" :
									(result === "E#") ? "F" :
									result;
				return result;
			}
			else{
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
	static tuning(startKey = "C", length = 7, notation = "#", includeOpenFret = true){
		if((typeof startKey === "string" || startKey instanceof String) &&
				(notation === "#" || notation === "b") &&
				(typeof length === "number" && length > 0) &&
				(typeof includeOpenFret === "boolean")){
			startKey = MusicTheory.convertAccidental(startKey, notation);
			let startIndex = 0;
			let result = [];
			if(notation === "#"){
				startIndex = MusicTheory.KEYS_ACCIDENTALS_SHARP.indexOf(startKey);
				for(let i = startIndex, counter = 0; counter < length; i++, counter++){
					result.push(infiniteIndexing(MusicTheory.KEYS_ACCIDENTALS_SHARP, i));
				}
			}
			else if(notation === "b"){
				startIndex = MusicTheory.KEYS_ACCIDENTALS_FLAT.indexOf(startKey);
				for(let i = startIndex, counter = 0; counter < length; i++, counter++){
					result.push(infiniteIndexing(MusicTheory.KEYS_ACCIDENTALS_FLAT, i));
				}
			}
			return includeOpenFret ? result : result.slice(1);
		}
		else {
			throw new TypeError("one of the following parameter is not valid: " + "\n" + startKey + "\n" + length + "\n" + notation + "\n" + includeOpenFret);
		}
		throw new Error("what's the sorcery? " + startKey + " " + length + " " + notation + " " + includeOpenFret);

		function infiniteIndexing(array, index){
			index = index % array.length;
			return array[index];
		}
	}

	static get NOTATION_SHARP() { return /^[a-g|A-G]#?/; }
	static get NOTATION_FLAT() { return /^[a-g|A-G]b?/; }

	static get KEYS_ACCIDENTALS_SHARP(){ return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]; }
	static get KEYS_ACCIDENTALS_FLAT(){ return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]; }

	static get STANDARD_GUITAR_STRINGS(){ return 6; }
	static get STANDARD_GUITAR_TUNING(){ return ["E", "A", "D", "G", "B", "E"]; }
}
