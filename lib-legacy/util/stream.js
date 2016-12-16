'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConcatStream = exports.UnpackStream = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var stream = require('stream');
var zlib = require('zlib');

function hasGzipHeader(chunk) {
  return chunk[0] === 0x1F && chunk[1] === 0x8B && chunk[2] === 0x08;
}

var UnpackStream = exports.UnpackStream = function (_stream$Transform) {
  (0, (_inherits2 || _load_inherits()).default)(UnpackStream, _stream$Transform);

  function UnpackStream(options) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, UnpackStream);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (UnpackStream.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(UnpackStream)).call(this, options));

    _this._srcStream = null;
    _this._readHeader = false;
    _this.once('pipe', function (src) {
      _this._srcStream = src;
    });
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(UnpackStream, [{
    key: '_transform',
    value: function _transform(chunk, encoding, callback) {
      var _this2 = this;

      if (!this._readHeader) {
        this._readHeader = true;
        invariant(chunk instanceof Buffer, 'Chunk must be a buffer');
        if (hasGzipHeader(chunk)) {
          // Stop receiving data from the src stream, and pipe it instead to zlib,
          // then pipe it's output through us.
          var unzipStream = zlib.createUnzip();
          unzipStream.on('error', function (err) {
            return _this2.emit('error', err);
          });

          var srcStream = this._srcStream;
          invariant(srcStream, 'How? To get here a stream must have been piped!');
          srcStream.pipe(unzipStream).pipe(this);

          // Unpipe after another stream has been piped so it's always piping to
          // something, thus avoiding pausing it.
          srcStream.unpipe(this);
          unzipStream.write(chunk);
          this._srcStream = null;
          callback();
          return;
        }
      }
      callback(null, chunk);
    }
  }]);
  return UnpackStream;
}(stream.Transform);

var ConcatStream = exports.ConcatStream = function (_stream$Transform2) {
  (0, (_inherits2 || _load_inherits()).default)(ConcatStream, _stream$Transform2);

  function ConcatStream(done) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, ConcatStream);

    var _this3 = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (ConcatStream.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(ConcatStream)).call(this));

    _this3._data = [];
    _this3._done = done;
    return _this3;
  }

  (0, (_createClass2 || _load_createClass()).default)(ConcatStream, [{
    key: '_transform',
    value: function _transform(chunk, encoding, callback) {
      invariant(chunk instanceof Buffer, 'Chunk must be a buffer');
      invariant(this._data != null, 'Missing data array');
      this._data.push(chunk);
      this.push(chunk);
      callback();
    }
  }, {
    key: '_flush',
    value: function _flush(callback) {
      invariant(this._data != null, 'Missing data array');
      this._done(Buffer.concat(this._data));
      this._data = null;
      callback();
    }
  }]);
  return ConcatStream;
}(stream.Transform);