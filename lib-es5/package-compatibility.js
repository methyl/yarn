'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

exports.testEngine = testEngine;

var _errors;

function _load_errors() {
  return _errors = require('./errors.js');
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./util/map.js'));
}

var _misc;

function _load_misc() {
  return _misc = require('./util/misc.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var semver = require('semver');

var VERSIONS = (0, (_assign || _load_assign()).default)({}, process.versions, {
  yarn: require('../package.json').version
});

function isValid(items, actual) {
  var isNotWhitelist = true;
  var isBlacklist = false;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      // blacklist
      if (item[0] === '!') {
        isBlacklist = true;

        if (actual === item.slice(1)) {
          return false;
        }
        // whitelist
      } else {
        isNotWhitelist = false;

        if (item === actual) {
          return true;
        }
      }
    }

    // npm allows blacklists and whitelists to be mixed. Blacklists with
    // whitelisted items should be treated as whitelists.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return isBlacklist && isNotWhitelist;
}

var aliases = (0, (_map || _load_map()).default)({
  iojs: 'node' });

var ignore = ['npm', // we'll never satisfy this for obvious reasons
'teleport', // a module bundler used by some modules
'rhino'];

function testEngine(name, range, versions, looseSemver) {
  var actual = versions[name];
  if (!actual) {
    return false;
  }

  if (!semver.valid(actual, looseSemver)) {
    return false;
  }

  if (semver.satisfies(actual, range, looseSemver)) {
    return true;
  }

  if (name === 'node' && semver.gt(actual, '1.0.0', looseSemver)) {
    // WARNING: this is a massive hack and is super gross but necessary for compatibility
    // some modules have the `engines.node` field set to a caret version below semver major v1
    // eg. ^0.12.0. this is problematic as we enforce engines checks and node is now on version >=1
    // to allow this pattern we transform the node version to fake ones in the minor range 10-13
    var major = semver.major(actual, looseSemver);
    var fakes = ['0.10.' + major, '0.11.' + major, '0.12.' + major, '0.13.' + major];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(fakes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var actualFake = _step2.value;

        if (semver.satisfies(actualFake, range, looseSemver)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  // incompatible version
  return false;
}

var PackageCompatibility = function () {
  function PackageCompatibility(config, resolver, ignoreEngines) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageCompatibility);

    this.reporter = config.reporter;
    this.resolver = resolver;
    this.config = config;
    this.ignoreEngines = ignoreEngines;
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageCompatibility, [{
    key: 'check',
    value: function check(info) {
      var didIgnore = false;
      var didError = false;
      var reporter = this.reporter;
      var human = info.name + '@' + info.version;

      var pushError = function pushError(msg) {
        var ref = info._reference;
        invariant(ref, 'expected package reference');

        if (ref.optional) {
          ref.ignore = true;

          reporter.warn(human + ': ' + msg);
          if (!didIgnore) {
            reporter.info(reporter.lang('optionalCompatibilityExcluded', human));
            didIgnore = true;
          }
        } else {
          reporter.error(human + ': ' + msg);
          didError = true;
        }
      };

      if (!this.config.ignorePlatform && Array.isArray(info.os)) {
        if (!PackageCompatibility.isValidPlatform(info.os)) {
          pushError(this.reporter.lang('incompatibleOS', process.platform));
        }
      }

      if (!this.config.ignorePlatform && Array.isArray(info.cpu)) {
        if (!PackageCompatibility.isValidArch(info.cpu)) {
          pushError(this.reporter.lang('incompatibleCPU', process.arch));
        }
      }

      if (!this.ignoreEngines && (0, (_typeof2 || _load_typeof()).default)(info.engines) === 'object') {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_misc || _load_misc()).entries)(info.engines)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var entry = _step3.value;

            var name = entry[0];
            var range = entry[1];

            if (aliases[name]) {
              name = aliases[name];
            }

            if (VERSIONS[name]) {
              if (!testEngine(name, range, VERSIONS, this.config.looseSemver)) {
                pushError(this.reporter.lang('incompatibleEngine', name, range));
              }
            } else if (ignore.indexOf(name) < 0) {
              this.reporter.warn(human + ': ' + this.reporter.lang('invalidEngine', name));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      if (didError) {
        throw new (_errors || _load_errors()).MessageError(reporter.lang('foundIncompatible'));
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var infos = this.resolver.getManifests();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(infos), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var info = _step4.value;

          this.check(info);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return (_promise || _load_promise()).default.resolve();
    }
  }], [{
    key: 'isValidArch',
    value: function isValidArch(archs) {
      return isValid(archs, process.arch);
    }
  }, {
    key: 'isValidPlatform',
    value: function isValidPlatform(platforms) {
      return isValid(platforms, process.platform);
    }
  }]);
  return PackageCompatibility;
}();

exports.default = PackageCompatibility;