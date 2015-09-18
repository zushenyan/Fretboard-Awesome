(function(){
	var mark1 = [
		{key: "c", color: "blue"},
		{key: "fb", color: "red"},
		{key: "g", color: "green"}
	];
	var mark2 = [
		{key: "d", color: "#111"},
		{key: "e", color: "#222"},
		{key: "f", color: "#333"}
	];
	var a;
	a = new fa.EleString().init("E", 5, "#", true,1);
	a.setTuning("C", 3, "#", false, 4);
	var r1 = a.markKeys(mark1);
	var r2 = a.markKeys(mark2);
	console.log(a);
	console.log(a.getTuning());
	console.log(a.getEle());
	console.log(a.getEleNotes());
	console.log(r1);
	console.log(r2);
})();
