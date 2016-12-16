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

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

var _npmResolver;

function _load_npmResolver() {
  return _npmResolver = _interopRequireDefault(require('./npm-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YarnResolver = function (_NpmResolver) {
  (0, (_inherits2 || _load_inherits()).default)(YarnResolver, _NpmResolver);

  function YarnResolver() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, YarnResolver);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (YarnResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(YarnResolver)).apply(this, arguments));
  }

  return YarnResolver;
}((_npmResolver || _load_npmResolver()).default);

exports.default = YarnResolver;