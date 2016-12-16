'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

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

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

var _npmResolver;

function _load_npmResolver() {
  return _npmResolver = _interopRequireDefault(require('../resolvers/registries/npm-resolver.js'));
}

var _envReplace;

function _load_envReplace() {
  return _envReplace = _interopRequireDefault(require('../util/env-replace.js'));
}

var _baseRegistry;

function _load_baseRegistry() {
  return _baseRegistry = _interopRequireDefault(require('./base-registry.js'));
}

var _misc;

function _load_misc() {
  return _misc = require('../util/misc');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = require('defaults');

var userHome = require('user-home');
var path = require('path');
var url = require('url');
var ini = require('ini');

var DEFAULT_REGISTRY = 'https://registry.npmjs.org/';

function getGlobalPrefix() {
  if (process.env.PREFIX) {
    return process.env.PREFIX;
  } else if (process.platform === 'win32') {
    // c:\node\node.exe --> prefix=c:\node\
    return path.dirname(process.execPath);
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    var prefix = path.dirname(path.dirname(process.execPath));

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      prefix = path.join(process.env.DESTDIR, prefix);
    }

    return prefix;
  }
}

var NpmRegistry = function (_Registry) {
  (0, (_inherits2 || _load_inherits()).default)(NpmRegistry, _Registry);

  function NpmRegistry(cwd, registries, requestManager) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, NpmRegistry);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (NpmRegistry.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(NpmRegistry)).call(this, cwd, registries, requestManager));

    _this.folder = 'node_modules';
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(NpmRegistry, [{
    key: 'request',
    value: function request(pathname) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var registry = (0, (_misc || _load_misc()).addSuffix)(this.getRegistry(pathname), '/');
      var requestUrl = url.resolve(registry, pathname);
      var alwaysAuth = this.getScopedOption(registry.replace(/^https?:/, ''), 'always-auth') || this.getOption('always-auth') || (0, (_misc || _load_misc()).removePrefix)(requestUrl, registry)[0] === '@';

      var headers = {};
      if (this.token || alwaysAuth && requestUrl.startsWith(registry)) {
        var authorization = this.getAuth(pathname);
        if (authorization) {
          headers.authorization = authorization;
        }
      }

      return this.requestManager.request({
        url: requestUrl,
        method: opts.method,
        body: opts.body,
        auth: opts.auth,
        headers: headers,
        json: !opts.buffer,
        buffer: opts.buffer,
        process: opts.process,
        gzip: true
      });
    }
  }, {
    key: 'checkOutdated',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, name, range) {
        var req, repository, homepage, url;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.request(NpmRegistry.escapeName(name));

              case 2:
                req = _context.sent;

                if (req) {
                  _context.next = 5;
                  break;
                }

                throw new Error('couldnt find ' + name);

              case 5:
                repository = req.repository;
                homepage = req.homepage;
                url = homepage || repository && repository.url || '';
                _context.t0 = req['dist-tags'].latest;
                _context.next = 11;
                return (_npmResolver || _load_npmResolver()).default.findVersionInRegistryResponse(config, range, req);

              case 11:
                _context.t1 = _context.sent.version;
                _context.t2 = url;
                return _context.abrupt('return', {
                  latest: _context.t0,
                  wanted: _context.t1,
                  url: _context.t2
                });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkOutdated(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return checkOutdated;
    }()
  }, {
    key: 'getPossibleConfigLocations',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(filename) {
        var possibles, foldersFromRootToCwd, actuals, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, isHome, loc;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                possibles = [[false, path.join(this.cwd, filename)], [true, this.config.userconfig || path.join(userHome, filename)], [false, path.join(getGlobalPrefix(), filename)]];
                foldersFromRootToCwd = this.cwd.split(path.sep);

                while (foldersFromRootToCwd.length > 1) {
                  possibles.push([false, path.join(foldersFromRootToCwd.join(path.sep), filename)]);
                  foldersFromRootToCwd.pop();
                }

                actuals = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 7;
                _iterator = (0, (_getIterator2 || _load_getIterator()).default)(possibles);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 27;
                  break;
                }

                _step$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step.value, 2);
                isHome = _step$value[0];
                loc = _step$value[1];
                _context2.next = 15;
                return (_fs || _load_fs()).exists(loc);

              case 15:
                if (!_context2.sent) {
                  _context2.next = 24;
                  break;
                }

                _context2.t0 = actuals;
                _context2.t1 = isHome;
                _context2.t2 = loc;
                _context2.next = 21;
                return (_fs || _load_fs()).readFile(loc);

              case 21:
                _context2.t3 = _context2.sent;
                _context2.t4 = [_context2.t1, _context2.t2, _context2.t3];

                _context2.t0.push.call(_context2.t0, _context2.t4);

              case 24:
                _iteratorNormalCompletion = true;
                _context2.next = 9;
                break;

              case 27:
                _context2.next = 33;
                break;

              case 29:
                _context2.prev = 29;
                _context2.t5 = _context2['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context2.t5;

              case 33:
                _context2.prev = 33;
                _context2.prev = 34;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 36:
                _context2.prev = 36;

                if (!_didIteratorError) {
                  _context2.next = 39;
                  break;
                }

                throw _iteratorError;

              case 39:
                return _context2.finish(36);

              case 40:
                return _context2.finish(33);

              case 41:
                return _context2.abrupt('return', actuals);

              case 42:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 29, 33, 41], [34,, 36, 40]]);
      }));

      function getPossibleConfigLocations(_x5) {
        return _ref2.apply(this, arguments);
      }

      return getPossibleConfigLocations;
    }()
  }, {
    key: 'loadConfig',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, loc, file, config, key, offlineLoc, mirrorLoc;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // docs: https://docs.npmjs.com/misc/config
                this.mergeEnv('npm_config_');

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 4;
                _context3.next = 7;
                return this.getPossibleConfigLocations('.npmrc');

              case 7:
                _context3.t0 = _context3.sent;
                _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(_context3.t0);

              case 9:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 24;
                  break;
                }

                _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 3);
                loc = _step2$value[1];
                file = _step2$value[2];
                config = (_baseRegistry || _load_baseRegistry()).default.normalizeConfig(ini.parse(file));

                for (key in config) {
                  config[key] = (0, (_envReplace || _load_envReplace()).default)(config[key]);
                }

                // normalize offline mirror path relative to the current npmrc
                offlineLoc = config['yarn-offline-mirror'];
                // don't normalize if we already have a mirror path

                if (!(!this.config['yarn-offline-mirror'] && offlineLoc)) {
                  _context3.next = 20;
                  break;
                }

                mirrorLoc = config['yarn-offline-mirror'] = path.resolve(path.dirname(loc), offlineLoc);
                _context3.next = 20;
                return (_fs || _load_fs()).mkdirp(mirrorLoc);

              case 20:

                defaults(this.config, config);

              case 21:
                _iteratorNormalCompletion2 = true;
                _context3.next = 9;
                break;

              case 24:
                _context3.next = 30;
                break;

              case 26:
                _context3.prev = 26;
                _context3.t1 = _context3['catch'](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t1;

              case 30:
                _context3.prev = 30;
                _context3.prev = 31;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 33:
                _context3.prev = 33;

                if (!_didIteratorError2) {
                  _context3.next = 36;
                  break;
                }

                throw _iteratorError2;

              case 36:
                return _context3.finish(33);

              case 37:
                return _context3.finish(30);

              case 38:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 26, 30, 38], [31,, 33, 37]]);
      }));

      function loadConfig() {
        return _ref3.apply(this, arguments);
      }

      return loadConfig;
    }()
  }, {
    key: 'getScope',
    value: function getScope(packageName) {
      return !packageName || packageName[0] !== '@' ? '' : packageName.split(/\/|%2f/)[0];
    }
  }, {
    key: 'getRegistry',
    value: function getRegistry(packageName) {
      // Try extracting registry from the url, then scoped registry, and default registry
      if (packageName.match(/^https?:/)) {
        var availableRegistries = this.getAvailableRegistries();
        var registry = availableRegistries.find(function (registry) {
          return packageName.startsWith(registry);
        });
        if (registry) {
          return registry;
        }
      }

      var _arr = [this.getScope(packageName), ''];
      for (var _i = 0; _i < _arr.length; _i++) {
        var scope = _arr[_i];
        var _registry = this.getScopedOption(scope, 'registry') || this.registries.yarn.getScopedOption(scope, 'registry');
        if (_registry) {
          return String(_registry);
        }
      }

      return DEFAULT_REGISTRY;
    }
  }, {
    key: 'getAuth',
    value: function getAuth(packageName) {
      if (this.token) {
        return this.token;
      }

      var _arr2 = [this.getRegistry(packageName), '', DEFAULT_REGISTRY];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var registry = _arr2[_i2];
        registry = registry.replace(/^https?:/, '');

        // Check for bearer token.
        var auth = this.getScopedOption(registry.replace(/\/?$/, '/'), '_authToken');
        if (auth) {
          return 'Bearer ' + String(auth);
        }

        // Check for basic auth token.
        auth = this.getScopedOption(registry, '_auth');
        if (auth) {
          return 'Basic ' + String(auth);
        }

        // Check for basic username/password auth.
        var username = this.getScopedOption(registry, 'username');
        var password = this.getScopedOption(registry, '_password');
        if (username && password) {
          var pw = new Buffer(String(password), 'base64').toString();
          return 'Basic ' + new Buffer(String(username) + ':' + pw).toString('base64');
        }
      }

      return '';
    }
  }, {
    key: 'getScopedOption',
    value: function getScopedOption(scope, option) {
      return this.getOption(scope + (scope ? ':' : '') + option);
    }
  }], [{
    key: 'escapeName',
    value: function escapeName(name) {
      // scoped packages contain slashes and the npm registry expects them to be escaped
      return name.replace('/', '%2f');
    }
  }]);
  return NpmRegistry;
}((_baseRegistry || _load_baseRegistry()).default);

NpmRegistry.filename = 'package.json';
exports.default = NpmRegistry;