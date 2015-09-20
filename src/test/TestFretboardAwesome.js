var target = "fa1";
var tuning = fa.MusicTheory.STANDARD_GUITAR_TUNING;
var length = 15;
var notation = "#";
var includeStart = false;
var gauge = 6;

var mark = [
	{key: "Cb", color: "aqua"},
	{key: "Eb", color: "white"},
	{key: "Gb", color: "white"},
];

var a = new fa.FretboardAwesome().init(target, tuning, length, notation, includeStart, gauge, fa.Config.ORI_HORIZONTAL);
a.markInlays([3,5,7,9,12]);
a.markKeys(mark);
