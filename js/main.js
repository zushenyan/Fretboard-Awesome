(function(){
	"use strict";
	var mark1 = [
		{key: "E", color: "#CD8585"},
		{key: "A", color: "white"},
		{key: "D", color: "white"},
		{key: "G", color: "white"}
	];
	var mark2 = [
		{key: "C", color: "#3E7995"},
		{key: "D", color: "white"},
		{key: "E", color: "white"},
		{key: "F", color: "white"},
		{key: "G", color: "white"},
		{key: "A", color: "white"},
		{key: "B", color: "white"}
	];

	var inlays1 = [1,3,5,7];
	var inlays2 = [3,5,7,9,12];
	var v1 = new fa.FretboardAwesome().init("v1", ["A"], 8);
	var v2 = new fa.FretboardAwesome().init("v2", ["E", "A", "D", "G"], 12, "#", true, 8);
	v2.markInlays(inlays1);
	v2.markKeys(mark1);
	var v3 = new fa.FretboardAwesome().init("v3");
	v3.setViewportSize(400); // scrollable
	v3.markInlays(inlays2);
	v3.markKeys(mark2);

	var h1 = new fa.FretboardAwesome().init("h1", ["Ab", "Bb", "Cb", "Db", "E#", "F#"], 8, "b");
	h1.setOrientation(fa.Config.ORI_HORIZONTAL);
	h1.markKeys(mark1);
	var h2 = new fa.FretboardAwesome().init("h2", ["Ab", "Bb", "Cb", "E#", "F#"], 15, "#", false, 10);
	h2.setOrientation(fa.Config.ORI_HORIZONTAL);
	h2.setViewportSize(800);
	h2.markKeys(mark2);
	var h3 = new fa.FretboardAwesome().init("h3");
	h3.setOrientation(fa.Config.ORI_HORIZONTAL);
	h3.markInlays(inlays2);
	h3.markKeys(mark1);
})();
