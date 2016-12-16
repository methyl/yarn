'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseResolver = function () {
  function BaseResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BaseResolver);

    this.resolver = request.resolver;
    this.reporter = request.reporter;
    this.fragment = fragment;
    this.registry = request.registry;
    this.request = request;
    this.pattern = request.pattern;
    this.config = request.config;
  }

  (0, (_createClass2 || _load_createClass()).default)(BaseResolver, [{
    key: 'fork',
    value: function fork(Resolver, resolveArg) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var resolver = new (Function.prototype.bind.apply(Resolver, [null].concat([this.request], args)))();
      resolver.registry = this.registry;
      return resolver.resolve(resolveArg);
    }
  }, {
    key: 'resolve',
    value: function resolve() {
      throw new Error('Not implemented');
    }
  }]);
  return BaseResolver;
}();

exports.default = BaseResolver;