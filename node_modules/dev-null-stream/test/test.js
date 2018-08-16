var stream = require('stream')
var expect = require('chai').expect
var _ = require('lodash-node')

var DevNullStream = require('../')

var numRows = 10
describe('test', function () {

  describe('given a readable stream', function () {

    it('should pipe to /dev/null', function (done) {
      var devNullStream = new DevNullStream()
      expect(devNullStream).to.exist
      var inputStream = objectStream()
      inputStream.pipe(devNullStream)
      devNullStream.on('finish', finishHandler)

      function finishHandler() {
        done()
      }

    })
  })

  function createWriter() {
    var writer = new stream.Transform({
      objectMode: true
    })
    writer._transform = function transform(chunk, encoding, done) {
      this.push(chunk)
      done()
    }
    return writer
  }
  function objectStream() {
    var writer = createWriter()
    var ids = _.range(0, numRows)
    ids.forEach(function writeRow(id) {
      var row = {
        id: id,
        foo: 'bar_' + id
      }
      writer.write(row)
    })
    setTimeout(writer.end.bind(writer), 10)
    return writer
  }
})
