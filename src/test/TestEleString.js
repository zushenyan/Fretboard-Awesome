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
a = new fa.EleString().init("E", 5, "#", true, 5, fa.Config.ORI_VERTICAL);
a.setTuning("C", 4, "#", true, 4);
var r1 = a.markKeys(mark1);
var r2 = a.markKeys(mark2);
console.log(a);
console.log(a.getTuning());
console.log(a.getEle());
console.log(a.getEleNotes());
console.log(r1);
console.log(r2);

var r = a.markInlays([1,2,4]);
console.log(r);
var r = a.markInlays([]);
console.log(r);

a.setStringGauge(1);
a.setOrientation(fa.Config.ORI_HORIZONTAL);
console.log(a.getStringGauge());
console.log(a.getOrientation());
console.log(a.getEle());
a.setStringGauge(6);
a.setOrientation(fa.Config.ORI_VERTICAL);
console.log(a.getStringGauge());
console.log(a.getOrientation());
console.log(a.getEle());
