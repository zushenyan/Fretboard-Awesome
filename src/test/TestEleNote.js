var a;
a = new fa.EleNote().init("Ab", "#", "white", 3, fa.Config.ORI_VERTICAL);

a.setNoteName("d#");
a.setNotation("b");
a.hide();
a.setBgColor("#eeeeee");
a.setStringGauge(5, fa.Config.ORI_HORIZONTAL);
a.markInlays();

console.log(a);
console.log(a.getEle().classList);
console.log(a.getBgColor());
console.log(a.getEle().children);
console.log(a.getStringGauge());
console.log(a.hasInlays());
console.log(a.getOrientation());

a.setStringGauge(10);
a.setOrientation(fa.Config.ORI_VERTICAL);
console.log(a.getEle().outerHTML);
a.setStringGauge(15);
a.setOrientation(fa.Config.ORI_HORIZONTAL);
console.log(a.getEle().outerHTML);
a.setNoteName("Fb");
a.setNotation("#");
console.log(a);
