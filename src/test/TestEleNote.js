(function(){
	var a;
	a = new fa.EleNote().init("Ab", "#", "white", 3);

	a.setNoteName("B#", "b");
	a.hide();
	a.setBgColor("#eeeeee");
	a.setStringGauge(5);
	a.markInlays();

	console.log(a);
	console.log(a.getEle().classList);
	console.log(a.getBgColor());
	console.log(a.getEle().childNodes);
	console.log(a.getStringGauge());
	console.log(a.hasInlays());
})();
