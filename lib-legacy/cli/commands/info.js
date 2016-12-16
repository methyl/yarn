'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var packageName, packageInput, _parsePackageName, name, version, result, versions, fieldPath, fields;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(args.length > 2)) {
              _context.next = 3;
              break;
            }

            reporter.error(reporter.lang('tooManyArguments', 2));
            return _context.abrupt('return');

          case 3:
            packageName = args.shift() || '.';

            // Handle the case when we are referencing a local package.

            if (!(packageName === '.')) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return config.readRootManifest();

          case 7:
            packageName = _context.sent.name;

          case 8:
            packageInput = (_npmRegistry || _load_npmRegistry()).default.escapeName(packageName);
            _parsePackageName = (0, (_parsePackageName2 || _load_parsePackageName()).default)(packageInput);
            name = _parsePackageName.name;
            version = _parsePackageName.version;
            _context.next = 14;
            return config.registries.npm.request(name);

          case 14:
            result = _context.sent;

            if (result) {
              _context.next = 18;
              break;
            }

            reporter.error(reporter.lang('infoFail'));
            return _context.abrupt('return');

          case 18:

            result = clean(result);

            versions = result.versions;
            // $FlowFixMe

            result.versions = (0, (_keys || _load_keys()).default)(versions).sort(semver.compareLoose);
            result.version = version || result.versions[result.versions.length - 1];
            result = (0, (_assign || _load_assign()).default)(result, versions[result.version]);

            fieldPath = args.shift();
            fields = fieldPath ? fieldPath.split('.') : [];

            // Readmes can be long so exclude them unless explicitly asked for.

            if (fields[0] !== 'readme') {
              delete result.readme;
            }

            result = fields.reduce(function (prev, cur) {
              return prev && prev[cur];
            }, result);
            reporter.inspect(result);

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('../../registries/npm-registry.js'));
}

var _parsePackageName2;

function _load_parsePackageName() {
  return _parsePackageName2 = _interopRequireDefault(require('../../util/parse-package-name.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semver = require('semver');

function clean(object) {
  if (Array.isArray(object)) {
    var _ret = function () {
      var result = [];
      object.forEach(function (item) {
        item = clean(item);
        if (item) {
          result.push(item);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(_ret)) === "object") return _ret.v;
  } else if ((typeof object === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(object)) === 'object') {
    var _result = {};
    for (var key in object) {
      if (key.startsWith('_')) {
        continue;
      }

      var item = clean(object[key]);
      if (item) {
        _result[key] = item;
      }
    }
    return _result;
  } else if (object) {
    return object;
  } else {
    return null;
  }
}