var target = "fa1";
var tuning = fa.MusicTheory.STANDARD_GUITAR_TUNING;
var length = 12;
var notation = "#";
var includeStart = false;
var gauge = 6;

var mark = [
	{key: "Cb", color: "aqua"},
	{key: "Eb", color: "white"},
	{key: "Gb", color: "white"},
];

var a = new fa.FretboardAwesome().init(target, tuning, length, notation, includeStart, gauge);
a.markKeys(mark);
a.setTuning(["eb", "a", "d", "gb"], 12, "#", false, 6);
var r = a.markKeys(mark);
