'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashStream = undefined;

var _getPrototypeOf;

function _load_getPrototypeOf() {
  return _getPrototypeOf = _interopRequireDefault(require('babel-runtime/core-js/object/get-prototype-of'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

exports.hash = hash;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var stream = require('stream');

function hash(content) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'md5';

  return crypto.createHash(type).update(content).digest('hex');
}

var HashStream = exports.HashStream = function (_stream$Transform) {
  (0, (_inherits2 || _load_inherits()).default)(HashStream, _stream$Transform);

  function HashStream(options) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, HashStream);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (HashStream.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(HashStream)).call(this, options));

    _this._hash = crypto.createHash('sha1');
    _this._updated = false;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(HashStream, [{
    key: '_transform',
    value: function _transform(chunk, encoding, callback) {
      this._updated = true;
      this._hash.update(chunk);
      callback(null, chunk);
    }
  }, {
    key: 'getHash',
    value: function getHash() {
      return this._hash.digest('hex');
    }
  }, {
    key: 'test',
    value: function test(sum) {
      return this._updated && sum === this.getHash();
    }
  }]);
  return HashStream;
}(stream.Transform);