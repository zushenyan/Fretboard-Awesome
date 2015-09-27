# Fretboard Awesome
Fretboard Awesome is a plugable web widget with user customizations.

Supports all the latest browsers and iOS.

[Behold the awesomeness!](http://zushenyan.github.io/Fretboard-Awesome/)

**Still in early development phase, specification may change anytime.**

### Change log
* v0.1.0
	* Make structure more make sense.
	* Remove includeOpenFret option. It's really confusing to people, including myself.

### To Do
###### Refactoring
Currently the structure is a mess, simply because I wrote it in a rush. ~~If you really look into my code, you will find - When there is setter, there is a getter to pair with right? Actually, I missed the `getTuning()`. What was I doing? I was drunk then, maybe.~~ **fixed in v0.1.0**
###### Better Access Way for Dummies
My original purpose on init and setting shuold be more comfortable, dummy-friendly:
```JavaScript
var fretboard = new fa.FretboardAwesome().init(targetId, {
	orientation: "vertical",
	fretboardLength: 15,
	...
});
```
Pass a config in `Object` format. Doesn't need tons of setters like `setOrientation("vertical")` or `setFretboardLength(15)` anymore to do the annoying job.
```JavaScript
fretboard.set({
	viewportSize: 400,
	tunning: ["E", "A", "D", "G"]
	...
});

var config = fretboard.get(["viewportSize", "tunning"]);
```
###### Customize (almost) Everything
You should be able to customize almost everything including fretboard background, inlays' style, the frets' size ,and even write a plugin component for Fretboard Awesome!

### Thanks to These Tools
* JavaScript
  * Babel
* CSS
  * Sass
  * Normalize.css
* npm
* gulp
* browserify

### Getting Start
1. Copy files in `dist` directory to your project
2. In your HTML, insert `FretboardAwesome-0.1.0.css` and `FretboardAesome-0.1.0.min.js`:
```html
<html>
    <head>
        <link rel="stylesheet" href="css/FretboardAwesome-0.1.0.css">
    </head>
    <body>
        ...
        <script src="js/FretboardAesome-0.1.0.min.js"></script>
    </body>
</html>
```
3. Assign an ID to an element;
```html
<div id="fa"></div>
```
4. In your script, pass a string which equeals to the element's ID which you just specifiy:
```javascript
var fretboard = new fa.FretboardAwesome().init("fa");
```
5. Hooray! Now dance with your awesome fretboard!

### Docs
* init(targetId, ...)
```javascript
    /**
		@param {string} targetId - the dom element which you want it to generate FretboardAwesome.
		@param {string} tuning - in what key we are tuning.
		@param {string} notation - either "#" or "b".
		@param {number} fretboardLength - how long should the fretboard be.
		@param {number} stringStartGauge - at what thickness will the string start decreasing.
		@param {string} orientation - either Config.ORI_VERTICAL or CONFIG_ORI_HORIZONTAL.
		@param {number} viewport - limit how long the fretboard user can view in pixel unit.
		Default is no limit.
	*/
var f = new fa.FreboardAwesome().init(
	targetId = "my-fa",
 	tuning = ["E", "A", "D", "G"],
	notation = "b",
	fretboardLength = 15,
	stringStartGauge = 8,
	orientation = fa.Config.ORI_VERTICAL,
	viewportSize = 400);
```

* setTuning(tuning)
```javascript
	/**
		@param {string} tune - in what key we are tuning.
	*/
	fretboard.setTuning(["E", "A", "C#", "Db"])
```

* setNotation(notation)
```javascript
	/**
		@param {string} notation - in either "#" or "b".
	*/
	fretboard.setNotation("#");
```

* setFretboardLength(length)
```javascript
	/**
		@param {number} length - how long should the fretboard be.
	*/
	fretboard.setFretboardLength(12);
```

* setStringStartGauge(gauge)
```javascript
	fretboard.setStringStartGauge(6);
```

* setOrientation(orientation)
```javascript
	// What direction your fretboard display in.
	fretboard.setOrientation(fa.Config.ORI_HORIZONTAL);
```

* setViewportSize(size)
```javascript
	// Specifiy the limit of how many frets user can view in pixel unit.
	// Set 999999 to make it unlimited!
	fretboard.setViewportSize(400);
```

* markKeys(targets)
```javascript
	var mark1 = [
		{key: "E", color: "#CD8585"},
		{key: "A", color: "white"},
		{key: "D", color: "white"},
		{key: "G", color: "white"}
	];

	// What keys in what color you want to "highlight".
	fretboard.markKeys(mark1);
```

* markInlays(inlays)
```javascript
	// Inlays are the little dots on guitar fret 3,5,7,9,12...
	fretboard.markInlays([3,5,7]);
```

### Author & Licence
Andrew Yan, MIT Licence.
