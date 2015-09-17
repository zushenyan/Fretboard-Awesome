(function(){
	var a;
	// a = fa.MusicTheory.normalize(["B#", "e#", "cb", "fb", "gb", "Eb"]);
	// a = fa.MusicTheory.normalize("B#");
	// a = fa.MusicTheory.convertAccidental("d#", "b");
	a = fa.MusicTheory.tuning("gg", 5, "b", false);
	console.log(a);
})();
