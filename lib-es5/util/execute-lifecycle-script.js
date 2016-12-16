'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execCommand = exports.execFromManifest = exports.executeLifecycleScript = undefined;

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _toConsumableArray2;

function _load_toConsumableArray() {
  return _toConsumableArray2 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var makeEnv = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(stage, cwd, config) {
    var env, manifest, queue, _queue$pop, _queue$pop2, _key, val, subKey, completeKey, cleanVal, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _key2, cleanKey, envKey;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            env = (0, (_assign || _load_assign()).default)({}, process.env);


            env.npm_lifecycle_event = stage;
            env.npm_node_execpath = env.NODE || process.execPath;
            env.npm_execpath = path.join(__dirname, '..', '..', 'bin', 'yarn.js');

            // Set the env to production for npm compat if production mode.
            // https://github.com/npm/npm/blob/30d75e738b9cb7a6a3f9b50e971adcbe63458ed3/lib/utils/lifecycle.js#L336
            if (config.production) {
              env.NODE_ENV = 'production';
            }

            // Note: npm_config_argv environment variable contains output of nopt - command-line
            // parser used by npm. Since we use other parser, we just roughly emulate it's output. (See: #684)
            env.npm_config_argv = (0, (_stringify || _load_stringify()).default)({ remain: [], cooked: [config.commandName], original: [config.commandName] });

            // add npm_package_*
            _context.next = 8;
            return config.maybeReadManifest(cwd);

          case 8:
            manifest = _context.sent;

            if (!manifest) {
              _context.next = 21;
              break;
            }

            queue = [['', manifest]];

          case 11:
            if (!queue.length) {
              _context.next = 21;
              break;
            }

            _queue$pop = queue.pop();
            _queue$pop2 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_queue$pop, 2);
            _key = _queue$pop2[0];
            val = _queue$pop2[1];

            if (!(_key[0] === '_')) {
              _context.next = 18;
              break;
            }

            return _context.abrupt('continue', 11);

          case 18:

            if ((typeof val === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(val)) === 'object') {
              for (subKey in val) {
                completeKey = [_key, subKey].filter(function (part) {
                  return !!part;
                }).join('_');

                queue.push([completeKey, val[subKey]]);
              }
            } else if (IGNORE_MANIFEST_KEYS.indexOf(_key) < 0) {
              cleanVal = String(val);

              if (cleanVal.indexOf('\n') >= 0) {
                cleanVal = (0, (_stringify || _load_stringify()).default)(cleanVal);
              }
              env['npm_package_' + _key] = cleanVal;
            }
            _context.next = 11;
            break;

          case 21:

            // add npm_config_*
            keys = new (_set || _load_set()).default([].concat((0, (_toConsumableArray2 || _load_toConsumableArray()).default)((0, (_keys || _load_keys()).default)(config.registries.yarn.config)), (0, (_toConsumableArray2 || _load_toConsumableArray()).default)((0, (_keys || _load_keys()).default)(config.registries.npm.config))));
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 25;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(keys);

          case 27:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 40;
              break;
            }

            _key2 = _step.value;

            if (!_key2.match(/:_/)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt('continue', 37);

          case 31:
            val = config.getOption(_key2);


            if (!val) {
              val = '';
            } else if (typeof val === 'number') {
              val = '' + val;
            } else if (typeof val !== 'string') {
              val = (0, (_stringify || _load_stringify()).default)(val);
            }

            if (val.indexOf('\n') >= 0) {
              val = (0, (_stringify || _load_stringify()).default)(val);
            }

            cleanKey = _key2.replace(/^_+/, '');
            envKey = ('npm_config_' + cleanKey).replace(/[^a-zA-Z0-9_]/g, '_');

            env[envKey] = val;

          case 37:
            _iteratorNormalCompletion = true;
            _context.next = 27;
            break;

          case 40:
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t0 = _context['catch'](25);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 46:
            _context.prev = 46;
            _context.prev = 47;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 49:
            _context.prev = 49;

            if (!_didIteratorError) {
              _context.next = 52;
              break;
            }

            throw _iteratorError;

          case 52:
            return _context.finish(49);

          case 53:
            return _context.finish(46);

          case 54:
            return _context.abrupt('return', env);

          case 55:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[25, 42, 46, 54], [47,, 49, 53]]);
  }));

  return function makeEnv(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var executeLifecycleScript = exports.executeLifecycleScript = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(stage, config, cwd, cmd, spinner) {
    var stdio, env, pathParts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, registry, binFolder, conf, sh, shFlag, stdout;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // if we don't have a spinner then pipe everything to the terminal
            stdio = spinner ? undefined : 'inherit';
            _context2.next = 3;
            return makeEnv(stage, cwd, config);

          case 3:
            env = _context2.sent;


            // split up the path
            pathParts = (env[(_constants || _load_constants()).ENV_PATH_KEY] || '').split(path.delimiter);

            // add node-gyp

            pathParts.unshift(path.join(__dirname, '..', '..', 'bin', 'node-gyp-bin'));

            // add .bin folders to PATH
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 9;
            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index || _load_index()).registries)); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              registry = _step2.value;
              binFolder = path.join(config.registries[registry].folder, '.bin');

              pathParts.unshift(path.join(config.linkFolder, binFolder));
              pathParts.unshift(path.join(cwd, binFolder));
            }

            // join path back together
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](9);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 17:
            _context2.prev = 17;
            _context2.prev = 18;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 20:
            _context2.prev = 20;

            if (!_didIteratorError2) {
              _context2.next = 23;
              break;
            }

            throw _iteratorError2;

          case 23:
            return _context2.finish(20);

          case 24:
            return _context2.finish(17);

          case 25:
            env[(_constants || _load_constants()).ENV_PATH_KEY] = pathParts.join(path.delimiter);

            // get shell
            conf = { windowsVerbatimArguments: false };
            sh = 'sh';
            shFlag = '-c';

            if (process.platform === 'win32') {
              // cmd or command.com
              sh = process.env.comspec || 'cmd';

              // d - Ignore registry AutoRun commands
              // s - Strip " quote characters from command.
              // c - Run Command and then terminate
              shFlag = '/d /s /c';

              // handle quotes properly in windows environments - https://github.com/nodejs/node/issues/5060
              conf.windowsVerbatimArguments = true;
            }

            _context2.next = 32;
            return (_child || _load_child()).spawn(sh, [shFlag, cmd], (0, (_extends2 || _load_extends()).default)({ cwd: cwd, env: env, stdio: stdio }, conf), function (data) {
              if (spinner) {
                var line = data.toString() // turn buffer into string
                .trim() // trim whitespace
                .split('\n') // split into lines
                .pop() // use only the last line
                .replace(/\t/g, ' '); // change tabs to spaces as they can interfere with the console

                if (line) {
                  spinner.tick(line);
                }
              }
            });

          case 32:
            stdout = _context2.sent;
            return _context2.abrupt('return', { cwd: cwd, command: cmd, stdout: stdout });

          case 34:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));

  return function executeLifecycleScript(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var execFromManifest = exports.execFromManifest = function () {
  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, commandName, cwd) {
    var pkg, cmd;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return config.maybeReadManifest(cwd);

          case 2:
            pkg = _context3.sent;

            if (!(!pkg || !pkg.scripts)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return');

          case 5:
            cmd = pkg.scripts[commandName];

            if (!cmd) {
              _context3.next = 9;
              break;
            }

            _context3.next = 9;
            return execCommand(commandName, config, cmd, cwd);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function execFromManifest(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var execCommand = exports.execCommand = function () {
  var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(stage, config, cmd, cwd) {
    var reporter;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            reporter = config.reporter;
            _context4.prev = 1;

            reporter.command(cmd);
            _context4.next = 5;
            return executeLifecycleScript(stage, config, cwd, cmd);

          case 5:
            return _context4.abrupt('return', (_promise || _load_promise()).default.resolve());

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](1);

            if (!(_context4.t0 instanceof (_errors || _load_errors()).SpawnError)) {
              _context4.next = 14;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('commandFailed', _context4.t0.EXIT_CODE));

          case 14:
            throw _context4.t0;

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 8]]);
  }));

  return function execCommand(_x12, _x13, _x14, _x15) {
    return _ref4.apply(this, arguments);
  };
}();

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _child;

function _load_child() {
  return _child = _interopRequireWildcard(require('./child.js'));
}

var _index;

function _load_index() {
  return _index = require('../resolvers/index.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var IGNORE_MANIFEST_KEYS = ['readme'];

exports.default = executeLifecycleScript;