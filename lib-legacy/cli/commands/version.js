'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.setVersion = undefined;

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var setVersion = exports.setVersion = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args, required) {
    var runLifecycle = function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(lifecycle) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!scripts[lifecycle]) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return (0, (_executeLifecycleScript || _load_executeLifecycleScript()).execCommand)(lifecycle, config, scripts[lifecycle], config.cwd);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
                return _context.abrupt('return', (_promise || _load_promise()).default.resolve());

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function runLifecycle(_x6) {
        return _ref2.apply(this, arguments);
      };
    }();

    var pkg, pkgLoc, scripts, newVersion, oldVersion, manifests, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, registryName, manifest;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return config.readRootManifest();

          case 2:
            pkg = _context3.sent;
            pkgLoc = pkg._loc;
            scripts = (0, (_map || _load_map()).default)();
            newVersion = flags.newVersion;

            invariant(pkgLoc, 'expected package location');

            if (!(args.length && !newVersion)) {
              _context3.next = 9;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidVersionArgument', NEW_VERSION_FLAG));

          case 9:

            if (pkg.scripts) {
              // inherit `scripts` from manifest
              (0, (_assign || _load_assign()).default)(scripts, pkg.scripts);
            }

            // get old version
            oldVersion = pkg.version;

            if (oldVersion) {
              reporter.info(reporter.lang('currentVersion') + ': ' + oldVersion);
            } else {
              oldVersion = '0.0.0';
            }

            // get new version

            if (!(newVersion && !isValidNewVersion(oldVersion, newVersion, config.looseSemver))) {
              _context3.next = 14;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidVersion'));

          case 14:
            if (newVersion) {
              _context3.next = 28;
              break;
            }

            _context3.next = 17;
            return reporter.question(reporter.lang('newVersion'));

          case 17:
            newVersion = _context3.sent;

            if (!(!required && !newVersion)) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt('return', function () {
              return (_promise || _load_promise()).default.resolve();
            });

          case 20:
            if (!isValidNewVersion(oldVersion, newVersion, config.looseSemver)) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt('break', 28);

          case 24:
            newVersion = null;
            reporter.error(reporter.lang('invalidSemver'));

          case 26:
            _context3.next = 14;
            break;

          case 28:
            if (newVersion) {
              newVersion = semver.inc(oldVersion, newVersion, config.looseSemver) || newVersion;
            }
            invariant(newVersion, 'expected new version');

            if (!(newVersion === pkg.version)) {
              _context3.next = 32;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('publishSame'));

          case 32:
            _context3.next = 34;
            return runLifecycle('preversion');

          case 34:

            // update version
            reporter.info(reporter.lang('newVersion') + ': ' + newVersion);
            pkg.version = newVersion;

            // update versions in manifests
            _context3.next = 38;
            return config.getRootManifests();

          case 38:
            manifests = _context3.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 42;

            for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)((_index || _load_index()).registryNames); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              registryName = _step.value;
              manifest = manifests[registryName];

              if (manifest.exists) {
                manifest.object.version = newVersion;
              }
            }
            _context3.next = 50;
            break;

          case 46:
            _context3.prev = 46;
            _context3.t0 = _context3['catch'](42);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 50:
            _context3.prev = 50;
            _context3.prev = 51;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 53:
            _context3.prev = 53;

            if (!_didIteratorError) {
              _context3.next = 56;
              break;
            }

            throw _iteratorError;

          case 56:
            return _context3.finish(53);

          case 57:
            return _context3.finish(50);

          case 58:
            _context3.next = 60;
            return config.saveRootManifests(manifests);

          case 60:
            if (!(!flags.gitTagVersion || !config.getOption('version-git-tag'))) {
              _context3.next = 62;
              break;
            }

            return _context3.abrupt('return', function () {
              return (_promise || _load_promise()).default.resolve();
            });

          case 62:
            return _context3.abrupt('return', (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2() {
              var isGit, parts, message, sign, flag, prefix;
              return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      invariant(newVersion, 'expected version');

                      // add git commit and tag
                      isGit = false;
                      parts = config.cwd.split(path.sep);

                    case 3:
                      if (!parts.length) {
                        _context2.next = 14;
                        break;
                      }

                      _context2.next = 6;
                      return (_fs || _load_fs()).exists(path.join(parts.join(path.sep), '.git'));

                    case 6:
                      isGit = _context2.sent;

                      if (!isGit) {
                        _context2.next = 11;
                        break;
                      }

                      return _context2.abrupt('break', 14);

                    case 11:
                      parts.pop();

                    case 12:
                      _context2.next = 3;
                      break;

                    case 14:
                      _context2.next = 16;
                      return runLifecycle('version');

                    case 16:
                      if (!isGit) {
                        _context2.next = 27;
                        break;
                      }

                      message = (flags.message || String(config.getOption('version-git-message'))).replace(/%s/g, newVersion);
                      sign = Boolean(config.getOption('version-sign-git-tag'));
                      flag = sign ? '-sm' : '-am';
                      prefix = String(config.getOption('version-tag-prefix'));

                      // add manifest

                      _context2.next = 23;
                      return (0, (_child || _load_child()).spawn)('git', ['add', pkgLoc]);

                    case 23:
                      _context2.next = 25;
                      return (0, (_child || _load_child()).spawn)('git', ['commit', '-m', message]);

                    case 25:
                      _context2.next = 27;
                      return (0, (_child || _load_child()).spawn)('git', ['tag', '' + prefix + newVersion, flag, message]);

                    case 27:
                      _context2.next = 29;
                      return runLifecycle('postversion');

                    case 29:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })));

          case 63:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[42, 46, 50, 58], [51,, 53, 57]]);
  }));

  return function setVersion(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(config, reporter, flags, args) {
    var commit;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return setVersion(config, reporter, flags, args, true);

          case 2:
            commit = _context4.sent;
            _context4.next = 5;
            return commit();

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function run(_x7, _x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _executeLifecycleScript;

function _load_executeLifecycleScript() {
  return _executeLifecycleScript = require('../../util/execute-lifecycle-script.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _child;

function _load_child() {
  return _child = require('../../util/child.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../../util/map.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var semver = require('semver');
var path = require('path');

var NEW_VERSION_FLAG = '--new-version [version]';
function isValidNewVersion(oldVersion, newVersion, looseSemver) {
  return !!(semver.valid(newVersion, looseSemver) || semver.inc(oldVersion, newVersion, looseSemver));
}

function setFlags(commander) {
  commander.option(NEW_VERSION_FLAG, 'new version');
  commander.option('--message [message]', 'message');
  commander.option('--no-git-tag-version', 'no git tag version');
}