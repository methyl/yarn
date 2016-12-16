'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.requireLockfile = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var lockfile, install, deps, getNameFromHint, getColorFromVersion, body;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

          case 2:
            lockfile = _context.sent;
            install = new (_install || _load_install()).Install(flags, config, reporter, lockfile);
            _context.next = 6;
            return (_packageRequest || _load_packageRequest()).default.getOutdatedPackages(lockfile, install, config, reporter);

          case 6:
            deps = _context.sent;


            if (args.length) {
              (function () {
                var requested = new (_set || _load_set()).default(args);

                deps = deps.filter(function (_ref2) {
                  var name = _ref2.name;
                  return requested.has(name);
                });
              })();
            }

            getNameFromHint = function getNameFromHint(hint) {
              return hint ? hint + 'Dependencies' : 'dependencies';
            };

            getColorFromVersion = function getColorFromVersion(_ref3) {
              var current = _ref3.current;
              var wanted = _ref3.wanted;
              var name = _ref3.name;
              return current === wanted ? reporter.format.yellow(name) : reporter.format.red(name);
            };

            if (deps.length) {
              body = deps.map(function (info) {
                return [getColorFromVersion(info), info.current, reporter.format.green(info.wanted), reporter.format.magenta(info.latest), getNameFromHint(info.hint), reporter.format.cyan(info.url)];
              });


              reporter.table(['Package', 'Current', 'Wanted', 'Latest', 'Package Type', 'URL'], body);
            }

            return _context.abrupt('return', (_promise || _load_promise()).default.resolve());

          case 12:
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

exports.setFlags = setFlags;

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireLockfile = exports.requireLockfile = true;

function setFlags(commander) {
  commander.usage('outdated [packages ...]');
}