'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.requireLockfile = undefined;

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

// Prompt user with Inquirer
var prompt = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(choices) {
    var pageSize, answers;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageSize = void 0;

            if (process.stdout instanceof tty.WriteStream) {
              pageSize = process.stdout.rows - 2;
            }
            _context.next = 4;
            return (_inquirer || _load_inquirer()).default.prompt([{
              name: 'packages',
              type: 'checkbox',
              message: 'Choose which packages to update.',
              choices: choices,
              pageSize: pageSize,
              validate: function validate(answer) {
                return !!answer.length || 'You must choose at least one package.';
              }
            }]);

          case 4:
            answers = _context.sent;
            return _context.abrupt('return', answers.packages);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function prompt(_x) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args) {
    var _this = this;

    var lockfile, install, deps, getNameFromHint, maxLengthArr, addPadding, colorizeName, colorizeDiff, makeRow, groupedDeps, flatten, choices, answers, getName, isHint;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

          case 2:
            lockfile = _context3.sent;
            install = new (_install || _load_install()).Install(flags, config, reporter, lockfile);
            _context3.next = 6;
            return (_packageRequest || _load_packageRequest()).default.getOutdatedPackages(lockfile, install, config, reporter);

          case 6:
            deps = _context3.sent;

            if (deps.length) {
              _context3.next = 10;
              break;
            }

            reporter.success(reporter.lang('allDependenciesUpToDate'));
            return _context3.abrupt('return');

          case 10:
            getNameFromHint = function getNameFromHint(hint) {
              return hint ? hint + 'Dependencies' : 'dependencies';
            };

            maxLengthArr = { name: 0, current: 0, latest: 0 };

            deps.forEach(function (dep) {
              return ['name', 'current', 'latest'].forEach(function (key) {
                maxLengthArr[key] = Math.max(maxLengthArr[key], dep[key].length);
              });
            });

            // Depends on maxLengthArr

            addPadding = function addPadding(dep) {
              return function (key) {
                return '' + dep[key] + (0, (_repeating || _load_repeating()).default)(' ', maxLengthArr[key] - dep[key].length);
              };
            };

            colorizeName = function colorizeName(_ref3) {
              var current = _ref3.current;
              var wanted = _ref3.wanted;
              return current === wanted ? reporter.format.yellow : reporter.format.red;
            };

            colorizeDiff = function colorizeDiff(from, to) {
              var parts = to.split('.');
              var fromParts = from.split('.');

              var index = parts.findIndex(function (part, i) {
                return part !== fromParts[i];
              });
              var splitIndex = index >= 0 ? index : parts.length;

              var colorized = reporter.format.green(parts.slice(splitIndex).join('.'));
              return parts.slice(0, splitIndex).concat(colorized).join('.');
            };

            makeRow = function makeRow(dep) {
              var padding = addPadding(dep);
              var name = colorizeName(dep)(padding('name'));
              var current = reporter.format.blue(padding('current'));
              var latest = colorizeDiff(dep.current, padding('latest'));
              var url = reporter.format.cyan(dep.url);
              return name + '  ' + current + '  \u276F  ' + latest + '  ' + url;
            };

            groupedDeps = deps.reduce(function (acc, dep) {
              var hint = dep.hint;
              var name = dep.name;
              var latest = dep.latest;

              var key = getNameFromHint(hint);
              var xs = acc[key] || [];
              acc[key] = xs.concat({
                name: makeRow(dep),
                value: dep,
                short: name + '@' + latest
              });
              return acc;
            }, {});

            flatten = function flatten(xs) {
              return xs.reduce(function (ys, y) {
                return ys.concat(Array.isArray(y) ? flatten(y) : y);
              }, []);
            };

            choices = (0, (_keys || _load_keys()).default)(groupedDeps).map(function (key) {
              return [new (_inquirer || _load_inquirer()).default.Separator(reporter.format.bold.underline.green(key)), groupedDeps[key], new (_inquirer || _load_inquirer()).default.Separator(' ')];
            });
            _context3.next = 22;
            return prompt(flatten(choices));

          case 22:
            answers = _context3.sent;

            getName = function getName(_ref4) {
              var name = _ref4.name;
              return name;
            };

            isHint = function isHint(x) {
              return function (_ref5) {
                var hint = _ref5.hint;
                return hint === x;
              };
            };

            _context3.next = 27;
            return [null, 'dev', 'optional', 'peer'].reduce(function () {
              var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(promise, hint) {
                var deps, add;
                return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return promise;

                      case 2:
                        // Reset dependency flags
                        flags.dev = hint === 'dev';
                        flags.peer = hint === 'peer';
                        flags.optional = hint === 'optional';

                        deps = answers.filter(isHint(hint)).map(getName);

                        if (!deps.length) {
                          _context2.next = 12;
                          break;
                        }

                        reporter.info(reporter.lang('updateInstalling', getNameFromHint(hint)));
                        add = new (_add || _load_add()).Add(deps, flags, config, reporter, lockfile);
                        _context2.next = 11;
                        return add.init();

                      case 11:
                        return _context2.abrupt('return', _context2.sent);

                      case 12:
                        return _context2.abrupt('return', (_promise || _load_promise()).default.resolve());

                      case 13:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x6, _x7) {
                return _ref6.apply(this, arguments);
              };
            }(), (_promise || _load_promise()).default.resolve());

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function run(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _inquirer;

function _load_inquirer() {
  return _inquirer = _interopRequireDefault(require('inquirer'));
}

var _repeating;

function _load_repeating() {
  return _repeating = _interopRequireDefault(require('repeating'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _add;

function _load_add() {
  return _add = require('./add.js');
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tty = require('tty');

var requireLockfile = exports.requireLockfile = true;

function setFlags(commander) {
  commander.usage('upgrade-interactive');
  commander.option('-E, --exact', 'install exact version');
  commander.option('-T, --tilde', 'install most recent release with the same minor version');
}