var assert = require('node:assert');
const { Buffer } = require('node:buffer');

exports.shouldHaveBody = shouldHaveBody
exports.shouldHaveHeader = shouldHaveHeader
exports.shouldNotHaveBody = shouldNotHaveBody
exports.shouldNotHaveHeader = shouldNotHaveHeader;
exports.shouldSkipQuery = shouldSkipQuery

function shouldHaveBody (buf) {
  return function (res) {
    var body = !Buffer.isBuffer(res.body)
      ? Buffer.from(res.text)
      : res.body
    assert.ok(body, 'response has body')
    assert.strictEqual(body.toString('hex'), buf.toString('hex'))
  }
}

function shouldHaveHeader (header) {
  return function (res) {
    assert.ok((header.toLowerCase() in res.headers), 'should have header ' + header)
  }
}

function shouldNotHaveBody () {
  return function (res) {
    assert.ok(res.text === '' || res.text === undefined)
  }
}

function shouldNotHaveHeader(header) {
  return function (res) {
    assert.ok(!(header.toLowerCase() in res.headers), 'should not have header ' + header);
  };
}

function getMajorVersion(versionString) {
  return versionString.split('.')[0];
}

function shouldSkipQuery(versionString) {
  return Number(getMajorVersion(versionString)) < 22
}
