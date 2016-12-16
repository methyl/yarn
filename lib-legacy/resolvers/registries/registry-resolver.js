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

var _baseResolver;

function _load_baseResolver() {
  return _baseResolver = _interopRequireDefault(require('../base-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegistryResolver = function (_BaseResolver) {
  (0, (_inherits2 || _load_inherits()).default)(RegistryResolver, _BaseResolver);

  function RegistryResolver(request, name, range) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, RegistryResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (RegistryResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(RegistryResolver)).call(this, request, name + '@' + range));

    _this.name = name;
    _this.range = range;

    _this.registryConfig = request.config.registries[_this.constructor.registry].config;
    return _this;
  }

  return RegistryResolver;
}((_baseResolver || _load_baseResolver()).default);

exports.default = RegistryResolver;