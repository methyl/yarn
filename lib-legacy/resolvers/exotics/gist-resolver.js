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

var _gitResolver;

function _load_gitResolver() {
  return _gitResolver = _interopRequireDefault(require('./git-resolver.js'));
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

var _misc;

function _load_misc() {
  return _misc = _interopRequireWildcard(require('../../util/misc.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function explodeGistFragment(fragment, reporter) {
  fragment = (_misc || _load_misc()).removePrefix(fragment, 'gist:');

  var parts = fragment.split('#');

  if (parts.length <= 2) {
    return {
      id: parts[0],
      hash: parts[1] || ''
    };
  } else {
    throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidGistFragment', fragment));
  }
}

var GistResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(GistResolver, _ExoticResolver);

  function GistResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, GistResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (GistResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(GistResolver)).call(this, request, fragment));

    var _explodeGistFragment = explodeGistFragment(fragment, _this.reporter);

    var id = _explodeGistFragment.id;
    var hash = _explodeGistFragment.hash;

    _this.id = id;
    _this.hash = hash;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(GistResolver, [{
    key: 'resolve',
    value: function resolve() {
      return this.fork((_gitResolver || _load_gitResolver()).default, false, 'https://gist.github.com/' + this.id + '.git#' + this.hash);
    }
  }]);
  return GistResolver;
}((_exoticResolver || _load_exoticResolver()).default);

GistResolver.protocol = 'gist';
exports.default = GistResolver;