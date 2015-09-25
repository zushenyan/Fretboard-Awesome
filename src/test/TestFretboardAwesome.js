var target = "fa1";
var tuning = fa.MusicTheory.STANDARD_GUITAR_TUNING;
var notation = "#";
var length = 15;
var gauge = 6;
var viewport = 400;
var inlays = [3,5,7,9,12];

var mark = [
	{key: "Cb", color: "aqua"},
	{key: "Eb", color: "white"},
	{key: "Gb", color: "white"},
];

var a = new fa.FretboardAwesome().init(target);
a.setTuning(tuning);
a.setNotation(notation);
a.setFretboardLength(length);
a.setStringStartGauge(6);
a.setViewportSize(400);

a.markInlays(inlays);
a.markKeys(mark);

// a.setTuning(["E", "D", "G", "B", "E"], length);
// a.markInlays(inlays);
