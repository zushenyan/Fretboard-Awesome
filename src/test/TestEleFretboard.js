var mark = [
	{key: "c", color: "red"},
	{key: "e", color: "blue"},
	{key: "g", color: "yellow"},
];
var tuning = ["e", "d", "g"];
var a;
a = new fa.EleFretboard().init(fa.MusicTheory.STANDARD_GUITAR_TUNING, 7, "#", false, 6, fa.Config.ORI_VERTICAL);
a.setTuning(tuning, 4, "b", false);
var r1 = a.markKeys(mark);
console.log(a);
console.log(a.getTuning());
console.log(a.getEle());
console.log(a.getStrings());
console.log(r1);
console.log(a.getStringGauge());
console.log(a.getStartGauge());
console.log(a.getOrientation());

a.setStringGauge(4, fa.Config.ORI_HORIZONTAL);
