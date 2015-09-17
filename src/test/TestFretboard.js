(function(){
	var tuning = ["E"];
	var a;
	a = new fa.Fretboard().init(tuning, 7, "#", true);
	console.log(a.getTuning());
	console.log(a.getStrings().length);
	console.log(a.getStrings());
})();
