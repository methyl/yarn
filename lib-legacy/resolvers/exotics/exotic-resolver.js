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

var _baseResolver;

function _load_baseResolver() {
  return _baseResolver = _interopRequireDefault(require('../base-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExoticResolver = function (_BaseResolver) {
  (0, (_inherits2 || _load_inherits()).default)(ExoticResolver, _BaseResolver);

  function ExoticResolver() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, ExoticResolver);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (ExoticResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(ExoticResolver)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(ExoticResolver, null, [{
    key: 'isVersion',
    value: function isVersion(pattern) {
      var proto = this.protocol;
      if (proto) {
        return pattern.startsWith(proto + ':');
      } else {
        throw new Error('No protocol specified');
      }
    }
  }]);
  return ExoticResolver;
}((_baseResolver || _load_baseResolver()).default);

exports.default = ExoticResolver;