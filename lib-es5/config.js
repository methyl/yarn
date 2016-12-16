'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _toConsumableArray2;

function _load_toConsumableArray() {
  return _toConsumableArray2 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
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

var _executeLifecycleScript;

function _load_executeLifecycleScript() {
  return _executeLifecycleScript = require('./util/execute-lifecycle-script.js');
}

var _index;

function _load_index() {
  return _index = _interopRequireDefault(require('./util/normalize-manifest/index.js'));
}

var _errors;

function _load_errors() {
  return _errors = require('./errors.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./util/fs.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('./constants.js'));
}

var _packageConstraintResolver;

function _load_packageConstraintResolver() {
  return _packageConstraintResolver = _interopRequireDefault(require('./package-constraint-resolver.js'));
}

var _requestManager;

function _load_requestManager() {
  return _requestManager = _interopRequireDefault(require('./util/request-manager.js'));
}

var _index2;

function _load_index2() {
  return _index2 = require('./registries/index.js');
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./util/map.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var detectIndent = require('detect-indent');

var invariant = require('invariant');
var path = require('path');

function sortObject(object) {
  var sortedObject = {};
  (0, (_keys || _load_keys()).default)(object).sort().forEach(function (item) {
    sortedObject[item] = object[item];
  });
  return sortedObject;
}

var Config = function () {
  function Config(reporter) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Config);

    this.constraintResolver = new (_packageConstraintResolver || _load_packageConstraintResolver()).default(this, reporter);
    this.requestManager = new (_requestManager || _load_requestManager()).default(reporter);
    this.reporter = reporter;
    this._init({});
  }

  //


  //


  //


  //


  //


  //


  //


  //


  //


  //


  //


  // Whether we should ignore executing lifecycle scripts


  //


  //


  //


  //


  (0, (_createClass2 || _load_createClass()).default)(Config, [{
    key: 'getCache',


    /**
     * Execute a promise produced by factory if it doesn't exist in our cache with
     * the associated key.
     */

    value: function getCache(key, factory) {
      var _this = this;

      var cached = this.cache[key];
      if (cached) {
        return cached;
      }

      return this.cache[key] = factory().catch(function (err) {
        _this.cache[key] = null;
        throw err;
      });
    }

    /**
     * Get a config option from our yarn config.
     */

  }, {
    key: 'getOption',
    value: function getOption(key) {
      return this.registries.yarn.getOption(key);
    }

    /**
     * Reduce a list of versions to a single one based on an input range.
     */

  }, {
    key: 'resolveConstraints',
    value: function resolveConstraints(versions, range) {
      return this.constraintResolver.reduce(versions, range);
    }

    /**
     * Initialise config. Fetch registry options, find package roots.
     */

  }, {
    key: 'init',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var _this2 = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var linkedModules, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _key, Registry, _registry;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._init(opts);

                _context2.next = 3;
                return (_fs || _load_fs()).mkdirp(this.globalFolder);

              case 3:
                _context2.next = 5;
                return (_fs || _load_fs()).mkdirp(this.linkFolder);

              case 5:

                this.linkedModules = [];

                _context2.next = 8;
                return (_fs || _load_fs()).readdir(this.linkFolder);

              case 8:
                linkedModules = _context2.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 12;
                _loop = (_regenerator || _load_regenerator()).default.mark(function _loop() {
                  var dir, linkedPath, _linkedModules, scopedLinked;

                  return (_regenerator || _load_regenerator()).default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          dir = _step.value;
                          linkedPath = path.join(_this2.linkFolder, dir);

                          if (!(dir[0] === '@')) {
                            _context.next = 9;
                            break;
                          }

                          _context.next = 5;
                          return (_fs || _load_fs()).readdir(linkedPath);

                        case 5:
                          scopedLinked = _context.sent;

                          (_linkedModules = _this2.linkedModules).push.apply(_linkedModules, (0, (_toConsumableArray2 || _load_toConsumableArray()).default)(scopedLinked.map(function (scopedDir) {
                            return path.join(dir, scopedDir);
                          })));
                          _context.next = 10;
                          break;

                        case 9:
                          _this2.linkedModules.push(dir);

                        case 10:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this2);
                });
                _iterator = (0, (_getIterator2 || _load_getIterator()).default)(linkedModules);

              case 15:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 20;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 17);

              case 17:
                _iteratorNormalCompletion = true;
                _context2.next = 15;
                break;

              case 20:
                _context2.next = 26;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t1 = _context2['catch'](12);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 26:
                _context2.prev = 26;
                _context2.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 29:
                _context2.prev = 29;

                if (!_didIteratorError) {
                  _context2.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context2.finish(29);

              case 33:
                return _context2.finish(26);

              case 34:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 37;
                _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index2 || _load_index2()).registries));

              case 39:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 51;
                  break;
                }

                _key = _step2.value;
                Registry = (_index2 || _load_index2()).registries[_key];

                // instantiate registry

                _registry = new Registry(this.cwd, this.registries, this.requestManager);
                _context2.next = 45;
                return _registry.init();

              case 45:

                this.registries[_key] = _registry;
                this.registryFolders.push(_registry.folder);
                this.rootModuleFolders.push(path.join(this.cwd, _registry.folder));

              case 48:
                _iteratorNormalCompletion2 = true;
                _context2.next = 39;
                break;

              case 51:
                _context2.next = 57;
                break;

              case 53:
                _context2.prev = 53;
                _context2.t2 = _context2['catch'](37);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t2;

              case 57:
                _context2.prev = 57;
                _context2.prev = 58;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 60:
                _context2.prev = 60;

                if (!_didIteratorError2) {
                  _context2.next = 63;
                  break;
                }

                throw _iteratorError2;

              case 63:
                return _context2.finish(60);

              case 64:
                return _context2.finish(57);

              case 65:

                this.networkConcurrency = opts.networkConcurrency || Number(this.getOption('network-concurrency')) || (_constants || _load_constants()).NETWORK_CONCURRENCY;

                this.requestManager.setOptions({
                  userAgent: String(this.getOption('user-agent')),
                  httpProxy: String(opts.httpProxy || this.getOption('proxy') || ''),
                  httpsProxy: String(opts.httpsProxy || this.getOption('https-proxy') || ''),
                  strictSSL: Boolean(this.getOption('strict-ssl')),
                  ca: Array.prototype.concat(opts.ca || this.getOption('ca') || []).map(String),
                  cafile: String(opts.cafile || this.getOption('cafile') || ''),
                  cert: String(opts.cert || this.getOption('cert') || ''),
                  key: String(opts.key || this.getOption('key') || ''),
                  networkConcurrency: this.networkConcurrency
                });

                //init & create cacheFolder, tempFolder
                this.cacheFolder = String(opts.cacheFolder || this.getOption('cache-folder') || (_constants || _load_constants()).MODULE_CACHE_DIRECTORY);
                this.tempFolder = opts.tempFolder || path.join(this.cacheFolder, '.tmp');
                _context2.next = 71;
                return (_fs || _load_fs()).mkdirp(this.cacheFolder);

              case 71:
                _context2.next = 73;
                return (_fs || _load_fs()).mkdirp(this.tempFolder);

              case 73:

                if (opts.production === 'false') {
                  this.production = false;
                } else if (this.getOption('production') || process.env.NODE_ENV === 'production' && process.env.NPM_CONFIG_PRODUCTION !== 'false' && process.env.YARN_PRODUCTION !== 'false') {
                  this.production = true;
                } else {
                  this.production = !!opts.production;
                }

              case 74:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[12, 22, 26, 34], [27,, 29, 33], [37, 53, 57, 65], [58,, 60, 64]]);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: '_init',
    value: function _init(opts) {
      this.rootModuleFolders = [];
      this.registryFolders = [];
      this.linkedModules = [];

      this.registries = (0, (_map || _load_map()).default)();
      this.cache = (0, (_map || _load_map()).default)();
      this.cwd = opts.cwd || this.cwd || process.cwd();

      this.looseSemver = opts.looseSemver == undefined ? true : opts.looseSemver;

      this.commandName = opts.commandName || '';

      this.preferOffline = !!opts.preferOffline;
      this.modulesFolder = opts.modulesFolder;
      this.globalFolder = opts.globalFolder || (_constants || _load_constants()).GLOBAL_MODULE_DIRECTORY;
      this.linkFolder = opts.linkFolder || (_constants || _load_constants()).LINK_REGISTRY_DIRECTORY;
      this.offline = !!opts.offline;
      this.binLinks = !!opts.binLinks;

      this.ignorePlatform = !!opts.ignorePlatform;
      this.ignoreScripts = !!opts.ignoreScripts;

      this.requestManager.setOptions({
        offline: !!opts.offline && !opts.preferOffline,
        captureHar: !!opts.captureHar
      });

      if (this.modulesFolder) {
        this.rootModuleFolders.push(this.modulesFolder);
      }
    }

    /**
     * Generate an absolute module path.
     */

  }, {
    key: 'generateHardModulePath',
    value: function generateHardModulePath(pkg, ignoreLocation) {
      invariant(this.cacheFolder, 'No package root');
      invariant(pkg, 'Undefined package');

      if (pkg.location && !ignoreLocation) {
        return pkg.location;
      }

      var name = pkg.name;
      var uid = pkg.uid;
      if (pkg.registry) {
        name = pkg.registry + '-' + name;
        uid = pkg.version || uid;
      }

      var hash = pkg.remote.hash;

      if (hash) {
        uid += '-' + hash;
      }

      return path.join(this.cacheFolder, name + '-' + uid);
    }

    /**
     * Execute lifecycle scripts in the specified directory. Ignoring when the --ignore-scripts flag has been
     * passed.
     */

  }, {
    key: 'executeLifecycleScript',
    value: function executeLifecycleScript(commandName, cwd) {
      if (this.ignoreScripts) {
        return (_promise || _load_promise()).default.resolve();
      } else {
        return (0, (_executeLifecycleScript || _load_executeLifecycleScript()).execFromManifest)(this, commandName, cwd || this.cwd);
      }
    }

    /**
     * Generate an absolute temporary filename location based on the input filename.
     */

  }, {
    key: 'getTemp',
    value: function getTemp(filename) {
      invariant(this.tempFolder, 'No temp folder');
      return path.join(this.tempFolder, filename);
    }

    /**
     * Remote packages may be cached in a file system to be available for offline installation.
     * Second time the same package needs to be installed it will be loaded from there.
     * Given a package's filename, return a path in the offline mirror location.
     */

  }, {
    key: 'getOfflineMirrorPath',
    value: function getOfflineMirrorPath(packageFilename) {
      var mirrorPath = void 0;

      var _arr = ['npm', 'yarn'];
      for (var _i = 0; _i < _arr.length; _i++) {
        var _key2 = _arr[_i];
        var _registry2 = this.registries[_key2];

        if (_registry2 == null) {
          continue;
        }

        var registryMirrorPath = _registry2.config['yarn-offline-mirror'];

        if (registryMirrorPath == null) {
          continue;
        }

        mirrorPath = registryMirrorPath;
      }

      if (mirrorPath == null) {
        return null;
      }

      if (packageFilename == null) {
        return mirrorPath;
      }

      return path.join(mirrorPath, path.basename(packageFilename));
    }

    /**
     * Checker whether the folder input is a valid module folder. We output a yarn metadata
     * file when we've successfully setup a folder so use this as a marker.
     */

  }, {
    key: 'isValidModuleDest',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(dest) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (_fs || _load_fs()).exists(dest);

              case 2:
                if (_context3.sent) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', false);

              case 4:
                _context3.next = 6;
                return (_fs || _load_fs()).exists(path.join(dest, (_constants || _load_constants()).METADATA_FILENAME));

              case 6:
                if (_context3.sent) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', false);

              case 8:
                return _context3.abrupt('return', true);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function isValidModuleDest(_x2) {
        return _ref2.apply(this, arguments);
      }

      return isValidModuleDest;
    }()

    /**
     * Read package metadata and normalized package info.
     */

  }, {
    key: 'readPackageMetadata',
    value: function readPackageMetadata(dir) {
      var _this3 = this;

      return this.getCache('metadata-' + dir, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var metadata, pkg;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this3.readJson(path.join(dir, (_constants || _load_constants()).METADATA_FILENAME));

              case 2:
                metadata = _context4.sent;
                _context4.next = 5;
                return _this3.readManifest(dir, metadata.registry);

              case 5:
                pkg = _context4.sent;
                return _context4.abrupt('return', {
                  package: pkg,
                  artifacts: metadata.artifacts || [],
                  hash: metadata.hash,
                  remote: metadata.remote,
                  registry: metadata.registry
                });

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, _this3);
      })));
    }

    /**
     * Read normalized package info according yarn-metadata.json
     * throw an error if package.json was not found
     */

  }, {
    key: 'readManifest',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(dir, priorityRegistry) {
        var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var manifest;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.maybeReadManifest(dir, priorityRegistry, isRoot);

              case 2:
                manifest = _context5.sent;

                if (!manifest) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt('return', manifest);

              case 7:
                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('couldntFindPackagejson', dir), 'ENOENT');

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function readManifest(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return readManifest;
    }()

    /**
    * try get the manifest file by looking
    * 1. mainfest file in cache
    * 2. manifest file in registry
    */

  }, {
    key: 'maybeReadManifest',
    value: function maybeReadManifest(dir, priorityRegistry) {
      var _this4 = this;

      var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.getCache('manifest-' + dir, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5() {
        var metadataLoc, _ref6, file, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _registry3, _file;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                metadataLoc = path.join(dir, (_constants || _load_constants()).METADATA_FILENAME);
                _context6.t0 = !priorityRegistry;

                if (!_context6.t0) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 5;
                return (_fs || _load_fs()).exists(metadataLoc);

              case 5:
                _context6.t0 = _context6.sent;

              case 6:
                if (!_context6.t0) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 9;
                return _this4.readJson(metadataLoc);

              case 9:
                _ref6 = _context6.sent;
                priorityRegistry = _ref6.registry;

              case 11:
                if (!priorityRegistry) {
                  _context6.next = 17;
                  break;
                }

                _context6.next = 14;
                return _this4.tryManifest(dir, priorityRegistry, isRoot);

              case 14:
                file = _context6.sent;

                if (!file) {
                  _context6.next = 17;
                  break;
                }

                return _context6.abrupt('return', file);

              case 17:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context6.prev = 20;
                _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index2 || _load_index2()).registries));

              case 22:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context6.next = 34;
                  break;
                }

                _registry3 = _step3.value;

                if (!(priorityRegistry === _registry3)) {
                  _context6.next = 26;
                  break;
                }

                return _context6.abrupt('continue', 31);

              case 26:
                _context6.next = 28;
                return _this4.tryManifest(dir, _registry3, isRoot);

              case 28:
                _file = _context6.sent;

                if (!_file) {
                  _context6.next = 31;
                  break;
                }

                return _context6.abrupt('return', _file);

              case 31:
                _iteratorNormalCompletion3 = true;
                _context6.next = 22;
                break;

              case 34:
                _context6.next = 40;
                break;

              case 36:
                _context6.prev = 36;
                _context6.t1 = _context6['catch'](20);
                _didIteratorError3 = true;
                _iteratorError3 = _context6.t1;

              case 40:
                _context6.prev = 40;
                _context6.prev = 41;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 43:
                _context6.prev = 43;

                if (!_didIteratorError3) {
                  _context6.next = 46;
                  break;
                }

                throw _iteratorError3;

              case 46:
                return _context6.finish(43);

              case 47:
                return _context6.finish(40);

              case 48:
                return _context6.abrupt('return', null);

              case 49:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, _this4, [[20, 36, 40, 48], [41,, 43, 47]]);
      })));
    }

    /**
     * Read the root manifest.
     */

  }, {
    key: 'readRootManifest',
    value: function readRootManifest() {
      return this.readManifest(this.cwd, 'npm', true);
    }

    /**
     * Try and find package info with the input directory and registry.
     */

  }, {
    key: 'tryManifest',
    value: function () {
      var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(dir, registry, isRoot) {
        var filename, loc, data;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                filename = (_index2 || _load_index2()).registries[registry].filename;
                loc = path.join(dir, filename);
                _context7.next = 4;
                return (_fs || _load_fs()).exists(loc);

              case 4:
                if (!_context7.sent) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 7;
                return this.readJson(loc);

              case 7:
                data = _context7.sent;

                data._registry = registry;
                data._loc = loc;
                return _context7.abrupt('return', (0, (_index || _load_index()).default)(data, dir, this, isRoot));

              case 13:
                return _context7.abrupt('return', null);

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function tryManifest(_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return tryManifest;
    }()

    /**
     * Description
     */

  }, {
    key: 'getFolder',
    value: function getFolder(pkg) {
      var registryName = pkg._registry;
      if (!registryName) {
        var ref = pkg._reference;
        invariant(ref, 'expected reference');
        registryName = ref.registry;
      }
      return this.registries[registryName].folder;
    }

    /**
     * Get root manifests.
     */

  }, {
    key: 'getRootManifests',
    value: function () {
      var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7() {
        var manifests, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _registryName, _registry4, jsonLoc, _object, _exists, _indent, info;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                manifests = {};
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context8.prev = 4;
                _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)((_index2 || _load_index2()).registryNames);

              case 6:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context8.next = 26;
                  break;
                }

                _registryName = _step4.value;
                _registry4 = (_index2 || _load_index2()).registries[_registryName];
                jsonLoc = path.join(this.cwd, _registry4.filename);
                _object = {};
                _exists = false;
                _indent = void 0;
                _context8.next = 15;
                return (_fs || _load_fs()).exists(jsonLoc);

              case 15:
                if (!_context8.sent) {
                  _context8.next = 22;
                  break;
                }

                _exists = true;

                _context8.next = 19;
                return this.readJson(jsonLoc, (_fs || _load_fs()).readJsonAndFile);

              case 19:
                info = _context8.sent;

                _object = info.object;
                _indent = detectIndent(info.content).indent || undefined;

              case 22:
                manifests[_registryName] = { loc: jsonLoc, object: _object, exists: _exists, indent: _indent };

              case 23:
                _iteratorNormalCompletion4 = true;
                _context8.next = 6;
                break;

              case 26:
                _context8.next = 32;
                break;

              case 28:
                _context8.prev = 28;
                _context8.t0 = _context8['catch'](4);
                _didIteratorError4 = true;
                _iteratorError4 = _context8.t0;

              case 32:
                _context8.prev = 32;
                _context8.prev = 33;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 35:
                _context8.prev = 35;

                if (!_didIteratorError4) {
                  _context8.next = 38;
                  break;
                }

                throw _iteratorError4;

              case 38:
                return _context8.finish(35);

              case 39:
                return _context8.finish(32);

              case 40:
                return _context8.abrupt('return', manifests);

              case 41:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this, [[4, 28, 32, 40], [33,, 35, 39]]);
      }));

      function getRootManifests() {
        return _ref8.apply(this, arguments);
      }

      return getRootManifests;
    }()

    /**
     * Save root manifests.
     */

  }, {
    key: 'saveRootManifests',
    value: function () {
      var _ref9 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(manifests) {
        var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _registryName2, _manifests$_registryN, _loc, _object2, _exists2, _indent2, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, field;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context9.prev = 3;
                _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)((_index2 || _load_index2()).registryNames);

              case 5:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context9.next = 38;
                  break;
                }

                _registryName2 = _step5.value;
                _manifests$_registryN = manifests[_registryName2];
                _loc = _manifests$_registryN.loc;
                _object2 = _manifests$_registryN.object;
                _exists2 = _manifests$_registryN.exists;
                _indent2 = _manifests$_registryN.indent;

                if (!(!_exists2 && !(0, (_keys || _load_keys()).default)(_object2).length)) {
                  _context9.next = 14;
                  break;
                }

                return _context9.abrupt('continue', 35);

              case 14:
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context9.prev = 17;


                for (_iterator6 = (0, (_getIterator2 || _load_getIterator()).default)((_constants || _load_constants()).DEPENDENCY_TYPES); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  field = _step6.value;

                  if (_object2[field]) {
                    _object2[field] = sortObject(_object2[field]);
                  }
                }

                _context9.next = 25;
                break;

              case 21:
                _context9.prev = 21;
                _context9.t0 = _context9['catch'](17);
                _didIteratorError6 = true;
                _iteratorError6 = _context9.t0;

              case 25:
                _context9.prev = 25;
                _context9.prev = 26;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 28:
                _context9.prev = 28;

                if (!_didIteratorError6) {
                  _context9.next = 31;
                  break;
                }

                throw _iteratorError6;

              case 31:
                return _context9.finish(28);

              case 32:
                return _context9.finish(25);

              case 33:
                _context9.next = 35;
                return (_fs || _load_fs()).writeFilePreservingEol(_loc, (0, (_stringify || _load_stringify()).default)(_object2, null, _indent2 || (_constants || _load_constants()).DEFAULT_INDENT) + '\n');

              case 35:
                _iteratorNormalCompletion5 = true;
                _context9.next = 5;
                break;

              case 38:
                _context9.next = 44;
                break;

              case 40:
                _context9.prev = 40;
                _context9.t1 = _context9['catch'](3);
                _didIteratorError5 = true;
                _iteratorError5 = _context9.t1;

              case 44:
                _context9.prev = 44;
                _context9.prev = 45;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 47:
                _context9.prev = 47;

                if (!_didIteratorError5) {
                  _context9.next = 50;
                  break;
                }

                throw _iteratorError5;

              case 50:
                return _context9.finish(47);

              case 51:
                return _context9.finish(44);

              case 52:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this, [[3, 40, 44, 52], [17, 21, 25, 33], [26,, 28, 32], [45,, 47, 51]]);
      }));

      function saveRootManifests(_x10) {
        return _ref9.apply(this, arguments);
      }

      return saveRootManifests;
    }()

    /**
     * Call the passed factory (defaults to fs.readJson) and rethrow a pretty error message if it was the result
     * of a syntax error.
     */

  }, {
    key: 'readJson',
    value: function () {
      var _ref10 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee9(loc) {
        var factory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_fs || _load_fs()).readJson;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return factory(loc);

              case 3:
                return _context10.abrupt('return', _context10.sent);

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10['catch'](0);

                if (!(_context10.t0 instanceof SyntaxError)) {
                  _context10.next = 12;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('jsonError', loc, _context10.t0.message));

              case 12:
                throw _context10.t0;

              case 13:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee9, this, [[0, 6]]);
      }));

      function readJson(_x12) {
        return _ref10.apply(this, arguments);
      }

      return readJson;
    }()
  }]);
  return Config;
}();

exports.default = Config;