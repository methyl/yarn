'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.parse = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('babel-runtime/core-js/map'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _parse;

function _load_parse() {
  return _parse = require('./parse');
}

Object.defineProperty(exports, 'parse', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_parse || _load_parse()).default;
  }
});

var _stringify;

function _load_stringify() {
  return _stringify = require('./stringify');
}

Object.defineProperty(exports, 'stringify', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stringify || _load_stringify()).default;
  }
});
exports.implodeEntry = implodeEntry;
exports.explodeEntry = explodeEntry;

var _misc;

function _load_misc() {
  return _misc = require('../util/misc.js');
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../package-request.js'));
}

var _parse2;

function _load_parse2() {
  return _parse2 = _interopRequireDefault(require('./parse.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');

function getName(pattern) {
  return (_packageRequest || _load_packageRequest()).default.normalizePattern(pattern).name;
}

function blankObjectUndefined(obj) {
  return obj && (0, (_keys || _load_keys()).default)(obj).length ? obj : undefined;
}

function implodeEntry(pattern, obj) {
  var inferredName = getName(pattern);
  return {
    name: inferredName === obj.name ? undefined : obj.name,
    version: obj.version,
    uid: obj.uid === obj.version ? undefined : obj.uid,
    resolved: obj.resolved,
    registry: obj.registry === 'npm' ? undefined : obj.registry,
    dependencies: blankObjectUndefined(obj.dependencies),
    optionalDependencies: blankObjectUndefined(obj.optionalDependencies),
    permissions: blankObjectUndefined(obj.permissions)
  };
}

function explodeEntry(pattern, obj) {
  obj.optionalDependencies = obj.optionalDependencies || {};
  obj.dependencies = obj.dependencies || {};
  obj.uid = obj.uid || obj.version;
  obj.permissions = obj.permissions || {};
  obj.registry = obj.registry || 'npm';
  obj.name = obj.name || getName(pattern);
  return obj;
}

var Lockfile = function () {
  function Lockfile(cache, source) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Lockfile);

    this.source = source || '';
    this.cache = cache;
  }

  // source string if the `cache` was parsed


  (0, (_createClass2 || _load_createClass()).default)(Lockfile, [{
    key: 'getLocked',
    value: function getLocked(pattern) {
      var cache = this.cache;
      if (!cache) {
        return undefined;
      }

      var shrunk = pattern in cache && cache[pattern];

      if (typeof shrunk === 'string') {
        return this.getLocked(shrunk);
      } else if (shrunk) {
        explodeEntry(pattern, shrunk);
        return shrunk;
      }

      return undefined;
    }
  }, {
    key: 'getLockfile',
    value: function getLockfile(patterns) {
      var lockfile = {};
      var seen = new (_map || _load_map()).default();

      // order by name so that lockfile manifest is assigned to the first dependency with this manifest
      // the others that have the same remote.resolved will just refer to the first
      // ordering allows for consistency in lockfile when it is serialized
      var sortedPatternsKeys = (0, (_keys || _load_keys()).default)(patterns).sort((_misc || _load_misc()).sortAlpha);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(sortedPatternsKeys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pattern = _step.value;

          var pkg = patterns[pattern];
          var remote = pkg._remote;
          var ref = pkg._reference;

          invariant(ref, 'Package is missing a reference');
          invariant(remote, 'Package is missing a remote');

          var seenPattern = remote.resolved && seen.get(remote.resolved);
          if (seenPattern) {
            // no point in duplicating it
            lockfile[pattern] = seenPattern;

            // if we're relying on our name being inferred and two of the patterns have
            // different inferred names then we need to set it
            if (!seenPattern.name && getName(pattern) !== pkg.name) {
              seenPattern.name = pkg.name;
            }
            continue;
          }

          var obj = implodeEntry(pattern, {
            name: pkg.name,
            version: pkg.version,
            uid: pkg._uid,
            resolved: remote.resolved,
            registry: remote.registry,
            dependencies: pkg.dependencies,
            peerDependencies: pkg.peerDependencies,
            optionalDependencies: pkg.optionalDependencies,
            permissions: ref.permissions
          });
          lockfile[pattern] = obj;

          if (remote.resolved) {
            seen.set(remote.resolved, obj);
          }
        }
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

      return lockfile;
    }
  }], [{
    key: 'fromDirectory',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(dir, reporter) {
        var lockfileLoc, lockfile, rawLockfile;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // read the manifest in this directory
                lockfileLoc = path.join(dir, (_constants || _load_constants()).LOCKFILE_FILENAME);
                lockfile = void 0;
                rawLockfile = '';
                _context.next = 5;
                return (_fs || _load_fs()).exists(lockfileLoc);

              case 5:
                if (!_context.sent) {
                  _context.next = 12;
                  break;
                }

                _context.next = 8;
                return (_fs || _load_fs()).readFile(lockfileLoc);

              case 8:
                rawLockfile = _context.sent;

                lockfile = (0, (_parse2 || _load_parse2()).default)(rawLockfile);
                _context.next = 13;
                break;

              case 12:
                if (reporter) {
                  reporter.info(reporter.lang('noLockfileFound'));
                }

              case 13:
                return _context.abrupt('return', new Lockfile(lockfile, rawLockfile));

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fromDirectory(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return fromDirectory;
    }()
  }]);
  return Lockfile;
}();

exports.default = Lockfile;