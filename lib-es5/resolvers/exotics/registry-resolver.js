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

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegistryResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(RegistryResolver, _ExoticResolver);

  function RegistryResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, RegistryResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (RegistryResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(RegistryResolver)).call(this, request, fragment));

    var match = fragment.match(/^(\S+):(.*?)(@(.*?)|)$/);
    if (match) {
      _this.range = match[4] || 'latest';
      _this.name = match[2];
    } else {
      throw new (_errors || _load_errors()).MessageError(_this.reporter.lang('invalidFragment', fragment));
    }

    // $FlowFixMe
    _this.registry = _this.constructor.protocol;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(RegistryResolver, [{
    key: 'resolve',
    value: function resolve() {
      return this.fork(this.constructor.factory, false, this.name, this.range);
    }
  }]);
  return RegistryResolver;
}((_exoticResolver || _load_exoticResolver()).default);

exports.default = RegistryResolver;