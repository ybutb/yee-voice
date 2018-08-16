# Dev Null Stream

Pipe the output of a stream to /dev/null

[![NPM](https://nodei.co/npm/dev-null-stream.png)](https://nodei.co/npm/dev-null-stream/)

[![Build Status](https://travis-ci.org/nisaacson/dev-null-stream.png)](https://travis-ci.org/nisaacson/dev-null-stream)
[![Dependency Status](https://david-dm.org/nisaacson/dev-null-stream/status.png)](https://david-dm.org/nisaacson/dev-null-stream)
[![Code Climate](https://codeclimate.com/github/nisaacson/dev-null-stream.png)](https://codeclimate.com/github/nisaacson/dev-null-stream)

# Installation
```bash
npm install -S dev-null-stream
```

# Usage

Create an instance of Stringify and pipe a readable stream of objects into that instance

```javascript
var fs = require('fs')
var DevNullStream = require('dev-null-stream')
var opts = {
  highWaterMark: 2
}
// devNullStream is an instance of require('stream').Transform
var devNullStream = new DevNullStream(opts) // opts is optional

var readStream = fs.createReadStream('/path/to/a/file.txt') // a readable stream of some sort
readStream.pipe(devNull)
devNull.on('finish', function() {
  console.log('finish event called, all objects stringified')
})
```



