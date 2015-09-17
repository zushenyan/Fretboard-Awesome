(function(){
	var a;
	a = new fa.EleNote().init("Ab", "#", "white");
	a.setNoteName("B#", "b");
	a.setVisible(false);
	a.setBgColor("#eeeeee");
	// a.markInlays();
	console.log(a);
	console.log(a.getEle().classList);
	console.log(a.getBgColor());
	console.log(a.getEle().childNodes[0].innerText);
	console.log(a.hasInlays());
})();
