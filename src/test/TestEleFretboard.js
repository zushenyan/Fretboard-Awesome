var mark = [
	{key: "c", color: "red"},
	{key: "e", color: "blue"},
	{key: "g", color: "yellow"},
];
var tuning = ["e#", "d#", "g#"];

var a;
a = new fa.EleFretboard().init(fa.MusicTheory.STANDARD_GUITAR_TUNING, "#", 7, 12, fa.Config.ORI_VERTICAL);

var r1 = a.markKeys(mark);
var i1 = a.markInlays([2,3,4]);

a.setTuning(tuning);
a.setNotation("b");
a.setFretboardLength(14);
a.setStringStartGauge(6);
a.setOrientation(fa.Config.ORI_HORIZONTAL);

console.log(a);
console.log(a.getEle());
console.log(a.getTuning());
console.log(a.getNotation());
console.log(a.getFretboardLength());
console.log(a.getStrings());
console.log(a.getStringGauges());
console.log(a.getStringStartGauge());
console.log(a.getOrientation());
// console.log(r1);
// console.log(i1);
