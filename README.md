# Fretboard-Awesome
Fretboard Awesome is a plugable web widget with user customizations.

Supports all the latest browsers and iOS.

[Press me to see the demo](http://zushenyan.github.io/Fretboard-Awesome/).

**Still in early development phase, specification may change anytime.**

### Thanks to These Tools
* JavaScript
  * Babel
* CSS
  * Sass
  * Normalize.css
* npm
* gulp

### Getting Start
1. Copy files in `dist` directory to your project
2. In your HTML, plug `fretboard-awesome-css` and `fretboard-awesome.min.js`:
```html
<html>
    <head>
        <link rel="stylesheet" href="fretboard-awesome.css">
    </head>
    <body>
        ...
        <script src="fretboard-awesome.min.js"></script>
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
* `init(targetId, ...)`
```javascript
    /**
		@param {string} targetId - the dom element which you want it to generate FretboardAwesome.
		@param {string} tuning - in what key we are tuning.
		@param {number} length - how long should the fretboard be.
		@param {string} notation - either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the first open fret.
		@param {number} startGauge - at what thickness will the string start decreasing.
		@param {string} orientation - either Config.ORI_VERTICAL or CONFIG_ORI_HORIZONTAL.
		@param {number} viewport - limit how long the fretboard user can view in pixel unit.
		Default is no limit.
	*/
var f = new fa.FreboardAwesome().init(
    targetId,
    tuning = MusicTheory.STANDARD_GUITAR_TUNING,
	length = 15,
	notation = "#",
	includeOpenFret = false,
	startGauge = 6,
	orientation = Config.ORI_VERTICAL,
	viewportSize = Config.VIEWPORT_SIZE_DEFAULT
    );
```

* `setTuning(...)`
```javascript
    /**
		@param {string} tune - in what key we are tuning.
		@param {number} length - how long should the fretboard be.
		@param {string} notation - in either "#" or "b".
		@param {boolean} includeOpenFret - whether to include the open fret.
	*/
	fretboard.setTuning(
	    tuning = MusicTheory.STANDARD_GUITAR_TUNING,
	    length = 12,
	    notation = "#",
	    includeOpenFret = false)
```

* `markKeys(targets)`
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

* `setStringGauge(gauge)`
```javascript
    fretboard.setStringGauge(6);
```

* `markInlays(inlays)`
```javascript
    // Inlays are the little dots on guitar fret 3,5,7,9,12...
    fretboard.markInlays([3,5,7]);
```

* `setOrientation(orientation)`
```javascript
    // What direction your fretboard display in.
    fretboard.setOrientation(fa.Config.ORI_HORIZONTAL);
```

* `setViewportSize(size)`
```javascript
    // Specifiy the limit of how many frets user can view in pixel unit.
    // Set 999999 to make it unlimited!
    fretboard.setViewportSize(400);
```

### Author & Licence
Andrew Yan, MIT Licence.