var Writable = require('stream').Writable
var util = require('util')

function DevNull(opts) {
  opts = opts || {}
  opts.objectMode = true
  Writable.call(this, opts)
}

util.inherits(DevNull, Writable)

DevNull.prototype._write = function write(chunk, encoding, done) {
  done()
}

module.exports = DevNull
