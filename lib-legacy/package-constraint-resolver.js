'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semver = require('semver');

// This isn't really a "proper" constraint resolver. We just return the highest semver
// version in the versions passed that satisfies the input range. This vastly reduces
// the complexity and is very efficient for package resolution.

var PackageConstraintResolver = function () {
  function PackageConstraintResolver(config, reporter) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageConstraintResolver);

    this.reporter = reporter;
    this.config = config;
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageConstraintResolver, [{
    key: 'reduce',
    value: function reduce(versions, range) {
      return (_promise || _load_promise()).default.resolve(semver.maxSatisfying(versions, range, this.config.looseSemver));
    }
  }]);
  return PackageConstraintResolver;
}();

exports.default = PackageConstraintResolver;