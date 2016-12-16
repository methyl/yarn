'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _jsonReporter;

function _load_jsonReporter() {
  return _jsonReporter = _interopRequireDefault(require('./json-reporter.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BufferReporter = function (_JSONReporter) {
  (0, (_inherits2 || _load_inherits()).default)(BufferReporter, _JSONReporter);

  function BufferReporter(opts) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BufferReporter);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (BufferReporter.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(BufferReporter)).call(this, opts));

    _this._buffer = [];
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(BufferReporter, [{
    key: '_dump',
    value: function _dump(type, data, error) {
      this._buffer.push({
        type: type,
        data: data,
        error: !!error
      });
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer() {
      return this._buffer;
    }
  }]);
  return BufferReporter;
}((_jsonReporter || _load_jsonReporter()).default);

exports.default = BufferReporter;