color-temp
==========

  Converts color to temperature in Kelvins, and back.

INSTALL
=======

```bash
npm install color-temp
```

EXAMPLES
========

Converting rgb to temperature:

```javascript

var conv = require('color-temp');
var temp = conv.rgb2temp([255, 255, 255]); // White color
console.log(temp+"K"); // 6504K

```

Converting temperature to rgb:

```javascript

var conv = require('color-temp');
var rgb = conv.temp2rgb(1000);
console.log(rgb); // ~[ 255, 67, 0 ]

```
