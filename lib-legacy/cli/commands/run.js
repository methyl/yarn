'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
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
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var runCommand = function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(args) {
        var action, actions, cmds, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _action, _cmd2, isWin, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, stage, _cmd, cmdWithArgs, suggestion, commandName, steps, msg;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                action = args.shift();
                actions = ['pre' + action, action, 'post' + action];

                // build up list of commands

                cmds = [];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 6;

                for (_iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(actions); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _action = _step3.value;
                  _cmd2 = scripts[_action];

                  if (_cmd2) {
                    isWin = 'win32' === process.platform;

                    cmds.push([_action, isWin ? (0, (_fixCmdWinSlashes || _load_fixCmdWinSlashes()).fixCmdWinSlashes)(_cmd2) : _cmd2]);
                  }
                }

                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](6);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t0;

              case 14:
                _context.prev = 14;
                _context.prev = 15;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 17:
                _context.prev = 17;

                if (!_didIteratorError3) {
                  _context.next = 20;
                  break;
                }

                throw _iteratorError3;

              case 20:
                return _context.finish(17);

              case 21:
                return _context.finish(14);

              case 22:
                if (!cmds.length) {
                  _context.next = 54;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 26;
                _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(cmds);

              case 28:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context.next = 38;
                  break;
                }

                _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 2);
                stage = _step4$value[0];
                _cmd = _step4$value[1];

                // only tack on trailing arguments for default script, ignore for pre and post - #1595
                cmdWithArgs = stage === action ? _cmd + ' ' + args.join(' ') : _cmd;
                _context.next = 35;
                return (0, (_executeLifecycleScript || _load_executeLifecycleScript()).execCommand)(stage, config, cmdWithArgs, config.cwd);

              case 35:
                _iteratorNormalCompletion4 = true;
                _context.next = 28;
                break;

              case 38:
                _context.next = 44;
                break;

              case 40:
                _context.prev = 40;
                _context.t1 = _context['catch'](26);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t1;

              case 44:
                _context.prev = 44;
                _context.prev = 45;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 47:
                _context.prev = 47;

                if (!_didIteratorError4) {
                  _context.next = 50;
                  break;
                }

                throw _iteratorError4;

              case 50:
                return _context.finish(47);

              case 51:
                return _context.finish(44);

              case 52:
                _context.next = 59;
                break;

              case 54:
                suggestion = void 0;


                for (commandName in scripts) {
                  steps = leven(commandName, action);

                  if (steps < 2) {
                    suggestion = commandName;
                  }
                }

                msg = 'Command ' + (0, (_stringify || _load_stringify()).default)(action) + ' not found.';

                if (suggestion) {
                  msg += ' Did you mean ' + (0, (_stringify || _load_stringify()).default)(suggestion) + '?';
                }
                throw new (_errors || _load_errors()).MessageError(msg);

              case 59:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 10, 14, 22], [15,, 17, 21], [26, 40, 44, 52], [45,, 47, 51]]);
      }));

      return function runCommand(_x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    // list possible scripts if none specified


    var pkg, scripts, binCommands, visitedBinFolders, pkgCommands, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, registry, binFolder, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, name, pkgScripts, cmdHints, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, cmd;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return config.readManifest(config.cwd);

          case 2:
            pkg = _context2.sent;
            scripts = (0, (_map || _load_map()).default)();
            binCommands = [];
            visitedBinFolders = new (_set || _load_set()).default();
            pkgCommands = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 10;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index || _load_index()).registries));

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 52;
              break;
            }

            registry = _step.value;
            binFolder = path.join(config.cwd, config.registries[registry].folder, '.bin');

            if (visitedBinFolders.has(binFolder)) {
              _context2.next = 49;
              break;
            }

            _context2.next = 18;
            return (_fs || _load_fs()).exists(binFolder);

          case 18:
            if (!_context2.sent) {
              _context2.next = 48;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context2.prev = 22;
            _context2.next = 25;
            return (_fs || _load_fs()).readdir(binFolder);

          case 25:
            _context2.t0 = _context2.sent;
            _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(_context2.t0);

          case 27:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context2.next = 34;
              break;
            }

            name = _step5.value;

            binCommands.push(name);
            scripts[name] = '"' + path.join(binFolder, name) + '"';

          case 31:
            _iteratorNormalCompletion5 = true;
            _context2.next = 27;
            break;

          case 34:
            _context2.next = 40;
            break;

          case 36:
            _context2.prev = 36;
            _context2.t1 = _context2['catch'](22);
            _didIteratorError5 = true;
            _iteratorError5 = _context2.t1;

          case 40:
            _context2.prev = 40;
            _context2.prev = 41;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 43:
            _context2.prev = 43;

            if (!_didIteratorError5) {
              _context2.next = 46;
              break;
            }

            throw _iteratorError5;

          case 46:
            return _context2.finish(43);

          case 47:
            return _context2.finish(40);

          case 48:
            visitedBinFolders.add(binFolder);

          case 49:
            _iteratorNormalCompletion = true;
            _context2.next = 12;
            break;

          case 52:
            _context2.next = 58;
            break;

          case 54:
            _context2.prev = 54;
            _context2.t2 = _context2['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context2.t2;

          case 58:
            _context2.prev = 58;
            _context2.prev = 59;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 61:
            _context2.prev = 61;

            if (!_didIteratorError) {
              _context2.next = 64;
              break;
            }

            throw _iteratorError;

          case 64:
            return _context2.finish(61);

          case 65:
            return _context2.finish(58);

          case 66:
            pkgScripts = pkg.scripts;
            cmdHints = {};

            if (!pkgScripts) {
              _context2.next = 90;
              break;
            }

            // inherit `scripts` from manifest
            pkgCommands = (0, (_keys || _load_keys()).default)(pkgScripts).sort();

            // add command hints (what the actual yarn command will do)
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 73;
            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(pkgCommands); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              cmd = _step2.value;

              cmdHints[cmd] = pkgScripts[cmd] || '';
            }

            _context2.next = 81;
            break;

          case 77:
            _context2.prev = 77;
            _context2.t3 = _context2['catch'](73);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t3;

          case 81:
            _context2.prev = 81;
            _context2.prev = 82;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 84:
            _context2.prev = 84;

            if (!_didIteratorError2) {
              _context2.next = 87;
              break;
            }

            throw _iteratorError2;

          case 87:
            return _context2.finish(84);

          case 88:
            return _context2.finish(81);

          case 89:
            (0, (_assign || _load_assign()).default)(scripts, pkg.scripts);

          case 90:
            if (!(args.length === 0)) {
              _context2.next = 100;
              break;
            }

            reporter.error(reporter.lang('commandNotSpecified'));
            reporter.info('' + (reporter.lang('binCommands') + binCommands.join(', ')));
            reporter.info('' + reporter.lang('possibleCommands'));
            reporter.list('possibleCommands', pkgCommands, cmdHints);
            _context2.next = 97;
            return reporter.question(reporter.lang('commandQuestion')).then(function (answer) {
              return runCommand(answer.split(' '));
            }, function () {
              return reporter.error(reporter.lang('commandNotSpecified'));
            });

          case 97:
            return _context2.abrupt('return', (_promise || _load_promise()).default.resolve());

          case 100:
            _context2.next = 102;
            return runCommand(args);

          case 102:
            return _context2.abrupt('return', _context2.sent);

          case 103:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[10, 54, 58, 66], [22, 36, 40, 48], [41,, 43, 47], [59,, 61, 65], [73, 77, 81, 89], [82,, 84, 88]]);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _executeLifecycleScript;

function _load_executeLifecycleScript() {
  return _executeLifecycleScript = require('../../util/execute-lifecycle-script.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _index;

function _load_index() {
  return _index = require('../../resolvers/index.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../../util/map.js'));
}

var _fixCmdWinSlashes;

function _load_fixCmdWinSlashes() {
  return _fixCmdWinSlashes = require('../../util/fix-cmd-win-slashes.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leven = require('leven');
var path = require('path');