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
a = new fa.EleString().init("E", "#", 5, 6, fa.Config.ORI_HORIZONTAL);

var r1 = a.markKeys(mark1);
var r2 = a.markKeys(mark2);
var i1 = a.markInlays([]);
var i2 = a.markInlays([1,2,4]);

a.setTune("D#");
a.setNotation("b");
a.setStringLength(12);
a.setStringGauge(4);

console.log(a);
console.log(a.getTune());
console.log(a.getEle());
console.log(a.getEleNotes());
console.log("r1: ");
console.log(r1);
console.log("r2: ");
console.log(r2);
console.log("i1: ");
console.log(i1);
console.log("i2: ");
console.log(i2);
console.log("marked keys: " + a.getMarkKeys());
console.log("marked inlays: " + a.getMarkInlays());

// a.setStringGauge(1);
// a.setOrientation(fa.Config.ORI_HORIZONTAL);
// console.log(a.getStringGauge());
// console.log(a.getOrientation());
// console.log(a.getEle());
// a.setStringGauge(6);
// a.setOrientation(fa.Config.ORI_VERTICAL);
// console.log(a.getStringGauge());
// console.log(a.getOrientation());
// console.log(a.getEle());
