'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapLifecycle = exports.run = exports.Install = undefined;

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

var run = exports.run = function () {
  var _ref20 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee19(config, reporter, flags, args) {
    var _this5 = this;

    var lockfile, exampleArgs, command;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee19$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            lockfile = void 0;

            if (!(flags.lockfile === false)) {
              _context20.next = 5;
              break;
            }

            lockfile = new (_wrapper || _load_wrapper()).default();
            _context20.next = 8;
            break;

          case 5:
            _context20.next = 7;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd, reporter);

          case 7:
            lockfile = _context20.sent;

          case 8:
            if (!args.length) {
              _context20.next = 18;
              break;
            }

            exampleArgs = args.slice();

            if (flags.saveDev) {
              exampleArgs.push('--dev');
            }
            if (flags.savePeer) {
              exampleArgs.push('--peer');
            }
            if (flags.saveOptional) {
              exampleArgs.push('--optional');
            }
            if (flags.saveExact) {
              exampleArgs.push('--exact');
            }
            if (flags.saveTilde) {
              exampleArgs.push('--tilde');
            }
            command = 'add';

            if (flags.global) {
              command = 'global add';
            }
            throw new (_errors || _load_errors()).MessageError(reporter.lang('installCommandRenamed', 'yarn ' + command + ' ' + exampleArgs.join(' ')));

          case 18:
            _context20.next = 20;
            return wrapLifecycle(config, flags, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee18() {
              var install;
              return (_regenerator || _load_regenerator()).default.wrap(function _callee18$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      install = new Install(flags, config, reporter, lockfile);
                      _context19.next = 3;
                      return install.init();

                    case 3:
                    case 'end':
                      return _context19.stop();
                  }
                }
              }, _callee18, _this5);
            })));

          case 20:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee19, this);
  }));

  return function run(_x21, _x22, _x23, _x24) {
    return _ref20.apply(this, arguments);
  };
}();

var wrapLifecycle = exports.wrapLifecycle = function () {
  var _ref22 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee20(config, flags, factory) {
    return (_regenerator || _load_regenerator()).default.wrap(function _callee20$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return config.executeLifecycleScript('preinstall');

          case 2:
            _context21.next = 4;
            return factory();

          case 4:
            _context21.next = 6;
            return config.executeLifecycleScript('install');

          case 6:
            _context21.next = 8;
            return config.executeLifecycleScript('postinstall');

          case 8:
            if (config.production) {
              _context21.next = 11;
              break;
            }

            _context21.next = 11;
            return config.executeLifecycleScript('prepublish');

          case 11:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee20, this);
  }));

  return function wrapLifecycle(_x25, _x26, _x27) {
    return _ref22.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _index;

function _load_index() {
  return _index = _interopRequireDefault(require('../../util/normalize-manifest/index.js'));
}

var _index2;

function _load_index2() {
  return _index2 = require('../../registries/index.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('../../lockfile/stringify.js'));
}

var _packageFetcher;

function _load_packageFetcher() {
  return _packageFetcher = _interopRequireDefault(require('../../package-fetcher.js'));
}

var _packageInstallScripts;

function _load_packageInstallScripts() {
  return _packageInstallScripts = _interopRequireDefault(require('../../package-install-scripts.js'));
}

var _packageCompatibility;

function _load_packageCompatibility() {
  return _packageCompatibility = _interopRequireDefault(require('../../package-compatibility.js'));
}

var _packageResolver;

function _load_packageResolver() {
  return _packageResolver = _interopRequireDefault(require('../../package-resolver.js'));
}

var _packageLinker;

function _load_packageLinker() {
  return _packageLinker = _interopRequireDefault(require('../../package-linker.js'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _clean;

function _load_clean() {
  return _clean = require('./clean.js');
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../../constants.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _crypto;

function _load_crypto() {
  return _crypto = _interopRequireWildcard(require('../../util/crypto.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../../util/map.js'));
}

var _misc;

function _load_misc() {
  return _misc = require('../../util/misc.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var semver = require('semver');
var emoji = require('node-emoji');
var isCI = require('is-ci');
var path = require('path');

var _require = require('../../../package.json');

var YARN_VERSION = _require.version;
var YARN_INSTALL_METHOD = _require.installationMethod;

var ONE_DAY = 1000 * 60 * 60 * 24;

/**
 * Try and detect the installation method for Yarn and provide a command to update it with.
 */

function getUpdateCommand() {
  if (YARN_INSTALL_METHOD === 'tar') {
    return 'curl -o- -L https://yarnpkg.com/install.sh | bash';
  }

  if (YARN_INSTALL_METHOD === 'homebrew') {
    return 'brew upgrade yarn';
  }

  if (YARN_INSTALL_METHOD === 'deb') {
    return 'sudo apt-get update && sudo apt-get install yarn';
  }

  if (YARN_INSTALL_METHOD === 'rpm') {
    return 'sudo yum install yarn';
  }

  if (YARN_INSTALL_METHOD === 'npm') {
    return 'npm upgrade --global yarn';
  }

  if (YARN_INSTALL_METHOD === 'chocolatey') {
    return 'choco upgrade yarn';
  }

  return null;
}

function getUpdateInstaller() {
  // Windows
  if (YARN_INSTALL_METHOD === 'msi') {
    return 'https://yarnpkg.com/latest.msi';
  }

  return null;
}

function normalizeFlags(config, rawFlags) {
  var flags = {
    // install
    har: !!rawFlags.har,
    ignorePlatform: !!rawFlags.ignorePlatform,
    ignoreEngines: !!rawFlags.ignoreEngines,
    ignoreScripts: !!rawFlags.ignoreScripts,
    ignoreOptional: !!rawFlags.ignoreOptional,
    force: !!rawFlags.force,
    flat: !!rawFlags.flat,
    lockfile: rawFlags.lockfile !== false,
    pureLockfile: !!rawFlags.pureLockfile,
    skipIntegrity: !!rawFlags.skipIntegrity,
    frozenLockfile: !!rawFlags.frozenLockfile,

    // add
    peer: !!rawFlags.peer,
    dev: !!rawFlags.dev,
    optional: !!rawFlags.optional,
    exact: !!rawFlags.exact,
    tilde: !!rawFlags.tilde
  };

  if (config.getOption('ignore-scripts')) {
    flags.ignoreScripts = true;
  }

  if (config.getOption('ignore-platform')) {
    flags.ignorePlatform = true;
  }

  if (config.getOption('ignore-engines')) {
    flags.ignoreEngines = true;
  }

  if (config.getOption('ignore-optional')) {
    flags.ignoreOptional = true;
  }

  if (config.getOption('force')) {
    flags.force = true;
  }

  return flags;
}

var Install = exports.Install = function () {
  function Install(flags, config, reporter, lockfile) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Install);

    this.rootManifestRegistries = [];
    this.rootPatternsToOrigin = (0, (_map || _load_map()).default)();
    this.resolutions = (0, (_map || _load_map()).default)();
    this.lockfile = lockfile;
    this.reporter = reporter;
    this.config = config;
    this.flags = normalizeFlags(config, flags);

    this.resolver = new (_packageResolver || _load_packageResolver()).default(config, lockfile);
    this.fetcher = new (_packageFetcher || _load_packageFetcher()).default(config, this.resolver);
    this.compatibility = new (_packageCompatibility || _load_packageCompatibility()).default(config, this.resolver, this.flags.ignoreEngines);
    this.linker = new (_packageLinker || _load_packageLinker()).default(config, this.resolver);
    this.scripts = new (_packageInstallScripts || _load_packageInstallScripts()).default(config, this.resolver, this.flags.force);
  }

  (0, (_createClass2 || _load_createClass()).default)(Install, [{
    key: 'fetchRequestFromCwd',


    /**
     * Create a list of dependency requests from the current directories manifests.
     */

    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var _this = this;

        var excludePatterns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var patterns, deps, manifest, ignorePatterns, usedPatterns, excludeNames, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _pattern, parts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2, _ret;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                patterns = [];
                deps = [];
                manifest = {};
                ignorePatterns = [];
                usedPatterns = [];

                // exclude package names that are in install args

                excludeNames = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = (0, (_getIterator2 || _load_getIterator()).default)(excludePatterns);

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 20;
                  break;
                }

                _pattern = _step.value;

                if (!(_packageRequest || _load_packageRequest()).default.getExoticResolver(_pattern)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('continue', 17);

              case 15:

                // extract the name
                parts = (_packageRequest || _load_packageRequest()).default.normalizePattern(_pattern);

                excludeNames.push(parts.name);

              case 17:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 20:
                _context2.next = 26;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

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
                _loop = (_regenerator || _load_regenerator()).default.mark(function _loop() {
                  var registry, filename, loc, json, pushDeps;
                  return (_regenerator || _load_regenerator()).default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          registry = _step2.value;
                          filename = (_index2 || _load_index2()).registries[registry].filename;
                          loc = path.join(_this.config.cwd, filename);
                          _context.next = 5;
                          return (_fs || _load_fs()).exists(loc);

                        case 5:
                          if (_context.sent) {
                            _context.next = 7;
                            break;
                          }

                          return _context.abrupt('return', 'continue');

                        case 7:

                          _this.rootManifestRegistries.push(registry);
                          _context.next = 10;
                          return _this.config.readJson(loc);

                        case 10:
                          json = _context.sent;
                          _context.next = 13;
                          return (0, (_index || _load_index()).default)(json, _this.config.cwd, _this.config, true);

                        case 13:

                          (0, (_assign || _load_assign()).default)(_this.resolutions, json.resolutions);
                          (0, (_assign || _load_assign()).default)(manifest, json);

                          pushDeps = function pushDeps(depType, _ref2, isUsed) {
                            var hint = _ref2.hint;
                            var optional = _ref2.optional;

                            var depMap = json[depType];
                            for (var name in depMap) {
                              if (excludeNames.indexOf(name) >= 0) {
                                continue;
                              }

                              var _pattern2 = name;
                              if (!_this.lockfile.getLocked(_pattern2, true)) {
                                // when we use --save we save the dependency to the lockfile with just the name rather than the
                                // version combo
                                _pattern2 += '@' + depMap[name];
                              }

                              if (isUsed) {
                                usedPatterns.push(_pattern2);
                              } else {
                                ignorePatterns.push(_pattern2);
                              }

                              _this.rootPatternsToOrigin[_pattern2] = depType;
                              patterns.push(_pattern2);
                              deps.push({ pattern: _pattern2, registry: registry, hint: hint, optional: optional });
                            }
                          };

                          pushDeps('dependencies', { hint: null, optional: false }, true);
                          pushDeps('devDependencies', { hint: 'dev', optional: false }, !_this.config.production);
                          pushDeps('optionalDependencies', { hint: 'optional', optional: true }, !_this.flags.ignoreOptional);

                          return _context.abrupt('return', 'break');

                        case 20:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this);
                });
                _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index2 || _load_index2()).registries));

              case 40:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 51;
                  break;
                }

                return _context2.delegateYield(_loop(), 't1', 42);

              case 42:
                _ret = _context2.t1;
                _context2.t2 = _ret;
                _context2.next = _context2.t2 === 'continue' ? 46 : _context2.t2 === 'break' ? 47 : 48;
                break;

              case 46:
                return _context2.abrupt('continue', 48);

              case 47:
                return _context2.abrupt('break', 51);

              case 48:
                _iteratorNormalCompletion2 = true;
                _context2.next = 40;
                break;

              case 51:
                _context2.next = 57;
                break;

              case 53:
                _context2.prev = 53;
                _context2.t3 = _context2['catch'](37);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t3;

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

                // inherit root flat flag
                if (manifest.flat) {
                  this.flags.flat = true;
                }

                return _context2.abrupt('return', {
                  requests: deps,
                  patterns: patterns,
                  manifest: manifest,
                  usedPatterns: usedPatterns,
                  ignorePatterns: ignorePatterns
                });

              case 67:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[9, 22, 26, 34], [27,, 29, 33], [37, 53, 57, 65], [58,, 60, 64]]);
      }));

      function fetchRequestFromCwd() {
        return _ref.apply(this, arguments);
      }

      return fetchRequestFromCwd;
    }()

    /**
     * TODO description
     */

  }, {
    key: 'prepareRequests',
    value: function prepareRequests(requests) {
      return requests;
    }
  }, {
    key: 'preparePatterns',
    value: function preparePatterns(patterns) {
      return patterns;
    }
  }, {
    key: 'bailout',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(patterns) {
        var match, haveLockfile;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.matchesIntegrityHash(patterns);

              case 2:
                match = _context3.sent;
                _context3.next = 5;
                return (_fs || _load_fs()).exists(path.join(this.config.cwd, (_constants || _load_constants()).LOCKFILE_FILENAME));

              case 5:
                haveLockfile = _context3.sent;

                if (!(this.flags.frozenLockfile && !this.lockFileInSync(patterns))) {
                  _context3.next = 9;
                  break;
                }

                this.reporter.error(this.reporter.lang('frozenLockfileError'));
                return _context3.abrupt('return', true);

              case 9:
                if (!(!this.flags.skipIntegrity && !this.flags.force && match.matches && haveLockfile)) {
                  _context3.next = 12;
                  break;
                }

                this.reporter.success(this.reporter.lang('upToDate'));
                return _context3.abrupt('return', true);

              case 12:
                if (!(!patterns.length && !match.expected)) {
                  _context3.next = 19;
                  break;
                }

                this.reporter.success(this.reporter.lang('nothingToInstall'));
                _context3.next = 16;
                return this.createEmptyManifestFolders();

              case 16:
                _context3.next = 18;
                return this.saveLockfileAndIntegrity(patterns);

              case 18:
                return _context3.abrupt('return', true);

              case 19:
                return _context3.abrupt('return', false);

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function bailout(_x2) {
        return _ref3.apply(this, arguments);
      }

      return bailout;
    }()

    /**
     * Produce empty folders for all used root manifests.
     */

  }, {
    key: 'createEmptyManifestFolders',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, registryName, folder;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.config.modulesFolder) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 5;
                _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(this.rootManifestRegistries);

              case 7:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context4.next = 15;
                  break;
                }

                registryName = _step3.value;
                folder = this.config.registries[registryName].folder;
                _context4.next = 12;
                return (_fs || _load_fs()).mkdirp(path.join(this.config.cwd, folder));

              case 12:
                _iteratorNormalCompletion3 = true;
                _context4.next = 7;
                break;

              case 15:
                _context4.next = 21;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4['catch'](5);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t0;

              case 21:
                _context4.prev = 21;
                _context4.prev = 22;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 24:
                _context4.prev = 24;

                if (!_didIteratorError3) {
                  _context4.next = 27;
                  break;
                }

                throw _iteratorError3;

              case 27:
                return _context4.finish(24);

              case 28:
                return _context4.finish(21);

              case 29:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, this, [[5, 17, 21, 29], [22,, 24, 28]]);
      }));

      function createEmptyManifestFolders() {
        return _ref4.apply(this, arguments);
      }

      return createEmptyManifestFolders;
    }()

    /**
     * TODO description
     */

  }, {
    key: 'markIgnored',
    value: function markIgnored(patterns) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _pattern3 = _step4.value;

          var _manifest = this.resolver.getStrictResolvedPattern(_pattern3);
          var ref = _manifest._reference;
          invariant(ref, 'expected package reference');

          if (ref.requests.length === 1) {
            // this module was only depended on once by the root so we can safely ignore it
            // if it was requested more than once then ignoring it would break a transitive
            // dep that resolved to it
            ref.ignore = true;
          }
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
    }

    /**
     * TODO description
     */

  }, {
    key: 'init',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee10() {
        var _this2 = this;

        var patterns, steps, _ref6, depRequests, rawPatterns, ignorePatterns, usedPatterns, currentStep, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, step, stepResult;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.checkUpdate();

                // warn if we have a shrinkwrap
                _context11.next = 3;
                return (_fs || _load_fs()).exists(path.join(this.config.cwd, 'npm-shrinkwrap.json'));

              case 3:
                if (!_context11.sent) {
                  _context11.next = 5;
                  break;
                }

                this.reporter.warn(this.reporter.lang('shrinkwrapWarning'));

              case 5:
                patterns = [];
                steps = [];
                _context11.next = 9;
                return this.fetchRequestFromCwd();

              case 9:
                _ref6 = _context11.sent;
                depRequests = _ref6.requests;
                rawPatterns = _ref6.patterns;
                ignorePatterns = _ref6.ignorePatterns;
                usedPatterns = _ref6.usedPatterns;


                steps.push(function () {
                  var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(curr, total) {
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _this2.reporter.step(curr, total, _this2.reporter.lang('resolvingPackages'), emoji.get('mag'));
                            _context5.next = 3;
                            return _this2.resolver.init(_this2.prepareRequests(depRequests), _this2.flags.flat);

                          case 3:
                            _context5.next = 5;
                            return _this2.flatten(_this2.preparePatterns(rawPatterns));

                          case 5:
                            patterns = _context5.sent;
                            _context5.next = 8;
                            return _this2.bailout(usedPatterns);

                          case 8:
                            _context5.t0 = _context5.sent;
                            return _context5.abrupt('return', {
                              bailout: _context5.t0
                            });

                          case 10:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee4, _this2);
                  }));

                  return function (_x3, _x4) {
                    return _ref7.apply(this, arguments);
                  };
                }());

                steps.push(function () {
                  var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(curr, total) {
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _this2.markIgnored(ignorePatterns);
                            _this2.reporter.step(curr, total, _this2.reporter.lang('fetchingPackages'), emoji.get('truck'));
                            _context6.next = 4;
                            return _this2.fetcher.init();

                          case 4:
                            _context6.next = 6;
                            return _this2.compatibility.init();

                          case 6:
                          case 'end':
                            return _context6.stop();
                        }
                      }
                    }, _callee5, _this2);
                  }));

                  return function (_x5, _x6) {
                    return _ref8.apply(this, arguments);
                  };
                }());

                steps.push(function () {
                  var _ref9 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(curr, total) {
                    var loc;
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _this2.getIntegrityHashLocation();

                          case 2:
                            loc = _context7.sent;
                            _context7.next = 5;
                            return (_fs || _load_fs()).unlink(loc);

                          case 5:
                            _this2.reporter.step(curr, total, _this2.reporter.lang('linkingDependencies'), emoji.get('link'));
                            _context7.next = 8;
                            return _this2.linker.init(patterns);

                          case 8:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee6, _this2);
                  }));

                  return function (_x7, _x8) {
                    return _ref9.apply(this, arguments);
                  };
                }());

                steps.push(function () {
                  var _ref10 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7(curr, total) {
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _this2.reporter.step(curr, total, _this2.flags.force ? _this2.reporter.lang('rebuildingPackages') : _this2.reporter.lang('buildingFreshPackages'), emoji.get('page_with_curl'));

                            if (!_this2.flags.ignoreScripts) {
                              _context8.next = 5;
                              break;
                            }

                            _this2.reporter.warn(_this2.reporter.lang('ignoredScripts'));
                            _context8.next = 7;
                            break;

                          case 5:
                            _context8.next = 7;
                            return _this2.scripts.init(patterns);

                          case 7:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee7, _this2);
                  }));

                  return function (_x9, _x10) {
                    return _ref10.apply(this, arguments);
                  };
                }());

                if (this.flags.har) {
                  steps.push(function () {
                    var _ref11 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(curr, total) {
                      var formattedDate, filename;
                      return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              formattedDate = new Date().toISOString().replace(/:/g, '-');
                              filename = 'yarn-install_' + formattedDate + '.har';

                              _this2.reporter.step(curr, total, _this2.reporter.lang('savingHar', filename), emoji.get('black_circle_for_record'));
                              _context9.next = 5;
                              return _this2.config.requestManager.saveHar(filename);

                            case 5:
                            case 'end':
                              return _context9.stop();
                          }
                        }
                      }, _callee8, _this2);
                    }));

                    return function (_x11, _x12) {
                      return _ref11.apply(this, arguments);
                    };
                  }());
                }

                _context11.next = 21;
                return this.shouldClean();

              case 21:
                if (!_context11.sent) {
                  _context11.next = 23;
                  break;
                }

                steps.push(function () {
                  var _ref12 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee9(curr, total) {
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee9$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _this2.reporter.step(curr, total, _this2.reporter.lang('cleaningModules'), emoji.get('recycle'));
                            _context10.next = 3;
                            return (0, (_clean || _load_clean()).clean)(_this2.config, _this2.reporter);

                          case 3:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee9, _this2);
                  }));

                  return function (_x13, _x14) {
                    return _ref12.apply(this, arguments);
                  };
                }());

              case 23:
                currentStep = 0;
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context11.prev = 27;
                _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(steps);

              case 29:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context11.next = 39;
                  break;
                }

                step = _step5.value;
                _context11.next = 33;
                return step(++currentStep, steps.length);

              case 33:
                stepResult = _context11.sent;

                if (!(stepResult && stepResult.bailout)) {
                  _context11.next = 36;
                  break;
                }

                return _context11.abrupt('return', patterns);

              case 36:
                _iteratorNormalCompletion5 = true;
                _context11.next = 29;
                break;

              case 39:
                _context11.next = 45;
                break;

              case 41:
                _context11.prev = 41;
                _context11.t0 = _context11['catch'](27);
                _didIteratorError5 = true;
                _iteratorError5 = _context11.t0;

              case 45:
                _context11.prev = 45;
                _context11.prev = 46;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 48:
                _context11.prev = 48;

                if (!_didIteratorError5) {
                  _context11.next = 51;
                  break;
                }

                throw _iteratorError5;

              case 51:
                return _context11.finish(48);

              case 52:
                return _context11.finish(45);

              case 53:
                _context11.next = 55;
                return this.saveLockfileAndIntegrity(patterns);

              case 55:
                this.maybeOutputUpdate();
                this.config.requestManager.clearCache();
                return _context11.abrupt('return', patterns);

              case 58:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee10, this, [[27, 41, 45, 53], [46,, 48, 52]]);
      }));

      function init() {
        return _ref5.apply(this, arguments);
      }

      return init;
    }()

    /**
     * Check if we should run the cleaning step.
     */

  }, {
    key: 'shouldClean',
    value: function shouldClean() {
      return (_fs || _load_fs()).exists(path.join(this.config.cwd, (_constants || _load_constants()).CLEAN_FILENAME));
    }

    /**
     * TODO
     */

  }, {
    key: 'flatten',
    value: function () {
      var _ref13 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee11(patterns) {
        var _this3 = this;

        var flattenedPatterns, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _name, infos, options, versions, _version, resolutionVersion, manifests, name, version, _patterns, _manifest2, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _pattern4, ref, object;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.flags.flat) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt('return', patterns);

              case 2:
                flattenedPatterns = [];
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context12.prev = 6;
                _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(this.resolver.getAllDependencyNamesByLevelOrder(patterns));

              case 8:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context12.next = 32;
                  break;
                }

                _name = _step6.value;
                infos = this.resolver.getAllInfoForPackageName(_name).filter(function (manifest) {
                  var ref = manifest._reference;
                  invariant(ref, 'expected package reference');
                  return !ref.ignore;
                });

                if (!(infos.length === 0)) {
                  _context12.next = 13;
                  break;
                }

                return _context12.abrupt('continue', 29);

              case 13:
                if (!(infos.length === 1)) {
                  _context12.next = 16;
                  break;
                }

                // single version of this package
                // take out a single pattern as multiple patterns may have resolved to this package
                flattenedPatterns.push(this.resolver.patternsByPackage[_name][0]);
                return _context12.abrupt('continue', 29);

              case 16:
                options = infos.map(function (info) {
                  var ref = info._reference;
                  invariant(ref, 'expected reference');
                  return {
                    // TODO `and is required by {PARENT}`,
                    name: _this3.reporter.lang('manualVersionResolutionOption', ref.patterns.join(', '), info.version),

                    value: info.version
                  };
                });
                versions = infos.map(function (info) {
                  return info.version;
                });
                _version = void 0;
                resolutionVersion = this.resolutions[_name];

                if (!(resolutionVersion && versions.indexOf(resolutionVersion) >= 0)) {
                  _context12.next = 24;
                  break;
                }

                // use json `resolution` version
                _version = resolutionVersion;
                _context12.next = 28;
                break;

              case 24:
                _context12.next = 26;
                return this.reporter.select(this.reporter.lang('manualVersionResolution', _name), this.reporter.lang('answer'), options);

              case 26:
                _version = _context12.sent;

                this.resolutions[_name] = _version;

              case 28:

                flattenedPatterns.push(this.resolver.collapseAllVersionsOfPackage(_name, _version));

              case 29:
                _iteratorNormalCompletion6 = true;
                _context12.next = 8;
                break;

              case 32:
                _context12.next = 38;
                break;

              case 34:
                _context12.prev = 34;
                _context12.t0 = _context12['catch'](6);
                _didIteratorError6 = true;
                _iteratorError6 = _context12.t0;

              case 38:
                _context12.prev = 38;
                _context12.prev = 39;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 41:
                _context12.prev = 41;

                if (!_didIteratorError6) {
                  _context12.next = 44;
                  break;
                }

                throw _iteratorError6;

              case 44:
                return _context12.finish(41);

              case 45:
                return _context12.finish(38);

              case 46:
                if (!(0, (_keys || _load_keys()).default)(this.resolutions).length) {
                  _context12.next = 95;
                  break;
                }

                _context12.next = 49;
                return this.config.getRootManifests();

              case 49:
                manifests = _context12.sent;
                _context12.t1 = (_regenerator || _load_regenerator()).default.keys(this.resolutions);

              case 51:
                if ((_context12.t2 = _context12.t1()).done) {
                  _context12.next = 93;
                  break;
                }

                name = _context12.t2.value;
                version = this.resolutions[name];
                _patterns = this.resolver.patternsByPackage[name];

                if (_patterns) {
                  _context12.next = 57;
                  break;
                }

                return _context12.abrupt('continue', 51);

              case 57:
                _manifest2 = void 0;
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context12.prev = 61;
                _iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(_patterns);

              case 63:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context12.next = 71;
                  break;
                }

                _pattern4 = _step7.value;

                _manifest2 = this.resolver.getResolvedPattern(_pattern4);

                if (!_manifest2) {
                  _context12.next = 68;
                  break;
                }

                return _context12.abrupt('break', 71);

              case 68:
                _iteratorNormalCompletion7 = true;
                _context12.next = 63;
                break;

              case 71:
                _context12.next = 77;
                break;

              case 73:
                _context12.prev = 73;
                _context12.t3 = _context12['catch'](61);
                _didIteratorError7 = true;
                _iteratorError7 = _context12.t3;

              case 77:
                _context12.prev = 77;
                _context12.prev = 78;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 80:
                _context12.prev = 80;

                if (!_didIteratorError7) {
                  _context12.next = 83;
                  break;
                }

                throw _iteratorError7;

              case 83:
                return _context12.finish(80);

              case 84:
                return _context12.finish(77);

              case 85:
                invariant(_manifest2, 'expected manifest');

                ref = _manifest2._reference;

                invariant(ref, 'expected reference');

                object = manifests[ref.registry].object;

                object.resolutions = object.resolutions || {};
                object.resolutions[name] = version;
                _context12.next = 51;
                break;

              case 93:
                _context12.next = 95;
                return this.config.saveRootManifests(manifests);

              case 95:
                return _context12.abrupt('return', flattenedPatterns);

              case 96:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee11, this, [[6, 34, 38, 46], [39,, 41, 45], [61, 73, 77, 85], [78,, 80, 84]]);
      }));

      function flatten(_x15) {
        return _ref13.apply(this, arguments);
      }

      return flatten;
    }()

    /**
     * Check if the loaded lockfile has all the included patterns
     */

  }, {
    key: 'lockFileInSync',
    value: function lockFileInSync(patterns) {
      var inSync = true;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _pattern5 = _step8.value;

          if (!this.lockfile.getLocked(_pattern5)) {
            inSync = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return inSync;
    }

    /**
     * Save updated integrity and lockfiles.
     */

  }, {
    key: 'saveLockfileAndIntegrity',
    value: function () {
      var _ref14 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee12(patterns) {
        var lockSource, inSync, loc;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                // stringify current lockfile
                lockSource = (0, (_stringify || _load_stringify()).default)(this.lockfile.getLockfile(this.resolver.patterns));

                // write integrity hash

                _context13.next = 3;
                return this.writeIntegrityHash(lockSource, patterns);

              case 3:
                if (!(this.flags.lockfile === false || this.flags.pureLockfile)) {
                  _context13.next = 5;
                  break;
                }

                return _context13.abrupt('return');

              case 5:
                inSync = this.lockFileInSync(patterns);

                // remove is followed by install with force on which we rewrite lockfile

                if (!(inSync && patterns.length && !this.flags.force)) {
                  _context13.next = 8;
                  break;
                }

                return _context13.abrupt('return');

              case 8:

                // build lockfile location
                loc = path.join(this.config.cwd, (_constants || _load_constants()).LOCKFILE_FILENAME);

                // write lockfile

                _context13.next = 11;
                return (_fs || _load_fs()).writeFilePreservingEol(loc, lockSource);

              case 11:

                this._logSuccessSaveLockfile();

              case 12:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee12, this);
      }));

      function saveLockfileAndIntegrity(_x16) {
        return _ref14.apply(this, arguments);
      }

      return saveLockfileAndIntegrity;
    }()
  }, {
    key: '_logSuccessSaveLockfile',
    value: function _logSuccessSaveLockfile() {
      this.reporter.success(this.reporter.lang('savedLockfile'));
    }

    /**
     * Check if the integrity hash of this installation matches one on disk.
     */

  }, {
    key: 'matchesIntegrityHash',
    value: function () {
      var _ref15 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee13(patterns) {
        var loc, lockSource, actual, expected;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.getIntegrityHashLocation();

              case 2:
                loc = _context14.sent;
                _context14.next = 5;
                return (_fs || _load_fs()).exists(loc);

              case 5:
                if (_context14.sent) {
                  _context14.next = 7;
                  break;
                }

                return _context14.abrupt('return', {
                  actual: '',
                  expected: '',
                  loc: loc,
                  matches: false
                });

              case 7:
                lockSource = (0, (_stringify || _load_stringify()).default)(this.lockfile.getLockfile(this.resolver.patterns));
                actual = this.generateIntegrityHash(lockSource, patterns);
                _context14.next = 11;
                return (_fs || _load_fs()).readFile(loc);

              case 11:
                expected = _context14.sent.trim();
                return _context14.abrupt('return', {
                  actual: actual,
                  expected: expected,
                  loc: loc,
                  matches: actual === expected
                });

              case 13:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee13, this);
      }));

      function matchesIntegrityHash(_x17) {
        return _ref15.apply(this, arguments);
      }

      return matchesIntegrityHash;
    }()

    /**
     * Get the location of an existing integrity hash. If none exists then return the location where we should
     * write a new one.
     */

  }, {
    key: 'getIntegrityHashLocation',
    value: function () {
      var _ref16 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee14() {
        var possibleFolders, checkRegistryNames, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, name, _loc, possibles, loc, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, possibleLoc;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                // build up possible folders
                possibleFolders = [];

                if (this.config.modulesFolder) {
                  possibleFolders.push(this.config.modulesFolder);
                }

                // get a list of registry names to check existence in
                checkRegistryNames = this.resolver.usedRegistries;

                if (!checkRegistryNames.length) {
                  // we haven't used any registries yet
                  checkRegistryNames = (_index2 || _load_index2()).registryNames;
                }

                // ensure we only write to a registry folder that was used
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context15.prev = 7;
                for (_iterator9 = (0, (_getIterator2 || _load_getIterator()).default)(checkRegistryNames); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  name = _step9.value;
                  _loc = path.join(this.config.cwd, this.config.registries[name].folder);

                  possibleFolders.push(_loc);
                }

                // if we already have an integrity hash in one of these folders then use it's location otherwise use the
                // first folder
                _context15.next = 15;
                break;

              case 11:
                _context15.prev = 11;
                _context15.t0 = _context15['catch'](7);
                _didIteratorError9 = true;
                _iteratorError9 = _context15.t0;

              case 15:
                _context15.prev = 15;
                _context15.prev = 16;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 18:
                _context15.prev = 18;

                if (!_didIteratorError9) {
                  _context15.next = 21;
                  break;
                }

                throw _iteratorError9;

              case 21:
                return _context15.finish(18);

              case 22:
                return _context15.finish(15);

              case 23:
                possibles = possibleFolders.map(function (folder) {
                  return path.join(folder, (_constants || _load_constants()).INTEGRITY_FILENAME);
                });
                loc = possibles[0];
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context15.prev = 28;
                _iterator10 = (0, (_getIterator2 || _load_getIterator()).default)(possibles);

              case 30:
                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                  _context15.next = 40;
                  break;
                }

                possibleLoc = _step10.value;
                _context15.next = 34;
                return (_fs || _load_fs()).exists(possibleLoc);

              case 34:
                if (!_context15.sent) {
                  _context15.next = 37;
                  break;
                }

                loc = possibleLoc;
                return _context15.abrupt('break', 40);

              case 37:
                _iteratorNormalCompletion10 = true;
                _context15.next = 30;
                break;

              case 40:
                _context15.next = 46;
                break;

              case 42:
                _context15.prev = 42;
                _context15.t1 = _context15['catch'](28);
                _didIteratorError10 = true;
                _iteratorError10 = _context15.t1;

              case 46:
                _context15.prev = 46;
                _context15.prev = 47;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 49:
                _context15.prev = 49;

                if (!_didIteratorError10) {
                  _context15.next = 52;
                  break;
                }

                throw _iteratorError10;

              case 52:
                return _context15.finish(49);

              case 53:
                return _context15.finish(46);

              case 54:
                return _context15.abrupt('return', loc);

              case 55:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee14, this, [[7, 11, 15, 23], [16,, 18, 22], [28, 42, 46, 54], [47,, 49, 53]]);
      }));

      function getIntegrityHashLocation() {
        return _ref16.apply(this, arguments);
      }

      return getIntegrityHashLocation;
    }()
    /**
     * Write the integrity hash of the current install to disk.
     */

  }, {
    key: 'writeIntegrityHash',
    value: function () {
      var _ref17 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee15(lockSource, patterns) {
        var loc;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.getIntegrityHashLocation();

              case 2:
                loc = _context16.sent;

                invariant(loc, 'expected integrity hash location');
                _context16.next = 6;
                return (_fs || _load_fs()).mkdirp(path.dirname(loc));

              case 6:
                _context16.next = 8;
                return (_fs || _load_fs()).writeFile(loc, this.generateIntegrityHash(lockSource, patterns));

              case 8:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee15, this);
      }));

      function writeIntegrityHash(_x18, _x19) {
        return _ref17.apply(this, arguments);
      }

      return writeIntegrityHash;
    }()

    /**
     * Generate integrity hash of input lockfile.
     */

  }, {
    key: 'generateIntegrityHash',
    value: function generateIntegrityHash(lockfile, patterns) {
      var opts = [lockfile];

      opts.push('patterns:' + patterns.sort((_misc || _load_misc()).sortAlpha).join(','));

      if (this.flags.flat) {
        opts.push('flat');
      }

      if (this.config.production) {
        opts.push('production');
      }

      var linkedModules = this.config.linkedModules;
      if (linkedModules.length) {
        opts.push('linked:' + linkedModules.join(','));
      }

      var mirror = this.config.getOfflineMirrorPath();
      if (mirror != null) {
        opts.push('mirror:' + mirror);
      }

      return (_crypto || _load_crypto()).hash(opts.join('-'), 'sha256');
    }

    /**
     * Load the dependency graph of the current install. Only does package resolving and wont write to the cwd.
     */

  }, {
    key: 'hydrate',
    value: function () {
      var _ref18 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee16(fetch) {
        var request, depRequests, rawPatterns, ignorePatterns, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _manifest3, ref, _loc2, newPkg;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.fetchRequestFromCwd();

              case 2:
                request = _context17.sent;
                depRequests = request.requests;
                rawPatterns = request.patterns;
                ignorePatterns = request.ignorePatterns;
                _context17.next = 8;
                return this.resolver.init(depRequests, this.flags.flat);

              case 8:
                _context17.next = 10;
                return this.flatten(rawPatterns);

              case 10:
                this.markIgnored(ignorePatterns);

                if (!fetch) {
                  _context17.next = 48;
                  break;
                }

                _context17.next = 14;
                return this.fetcher.init();

              case 14:
                _context17.next = 16;
                return this.compatibility.init();

              case 16:

                // expand minimal manifests
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context17.prev = 19;
                _iterator11 = (0, (_getIterator2 || _load_getIterator()).default)(this.resolver.getManifests());

              case 21:
                if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                  _context17.next = 34;
                  break;
                }

                _manifest3 = _step11.value;
                ref = _manifest3._reference;

                invariant(ref, 'expected reference');

                _loc2 = this.config.generateHardModulePath(ref);
                _context17.next = 28;
                return this.config.readManifest(_loc2);

              case 28:
                newPkg = _context17.sent;
                _context17.next = 31;
                return this.resolver.updateManifest(ref, newPkg);

              case 31:
                _iteratorNormalCompletion11 = true;
                _context17.next = 21;
                break;

              case 34:
                _context17.next = 40;
                break;

              case 36:
                _context17.prev = 36;
                _context17.t0 = _context17['catch'](19);
                _didIteratorError11 = true;
                _iteratorError11 = _context17.t0;

              case 40:
                _context17.prev = 40;
                _context17.prev = 41;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 43:
                _context17.prev = 43;

                if (!_didIteratorError11) {
                  _context17.next = 46;
                  break;
                }

                throw _iteratorError11;

              case 46:
                return _context17.finish(43);

              case 47:
                return _context17.finish(40);

              case 48:
                return _context17.abrupt('return', request);

              case 49:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee16, this, [[19, 36, 40, 48], [41,, 43, 47]]);
      }));

      function hydrate(_x20) {
        return _ref18.apply(this, arguments);
      }

      return hydrate;
    }()

    /**
     * Check for updates every day and output a nag message if there's a newer version.
     */

  }, {
    key: 'checkUpdate',
    value: function checkUpdate() {
      if (!process.stdout.isTTY || isCI) {
        // don't show upgrade dialog on CI or non-TTY terminals
        return;
      }

      // only check for updates once a day
      var lastUpdateCheck = Number(this.config.getOption('lastUpdateCheck')) || 0;
      if (lastUpdateCheck && Date.now() - lastUpdateCheck < ONE_DAY) {
        return;
      }

      // don't bug for updates on tagged releases
      if (YARN_VERSION.indexOf('-') >= 0) {
        return;
      }

      this._checkUpdate().catch(function () {
        // swallow errors
      });
    }
  }, {
    key: '_checkUpdate',
    value: function () {
      var _ref19 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee17() {
        var _this4 = this;

        var latestVersion;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.config.requestManager.request({
                  url: 'https://yarnpkg.com/latest-version'
                });

              case 2:
                latestVersion = _context18.sent;

                invariant(typeof latestVersion === 'string', 'expected string');
                latestVersion = latestVersion.trim();

                if (semver.valid(latestVersion)) {
                  _context18.next = 7;
                  break;
                }

                return _context18.abrupt('return');

              case 7:

                // ensure we only check for updates periodically
                this.config.registries.yarn.saveHomeConfig({
                  lastUpdateCheck: Date.now()
                });

                if (semver.gt(latestVersion, YARN_VERSION)) {
                  this.maybeOutputUpdate = function () {
                    _this4.reporter.warn(_this4.reporter.lang('yarnOutdated', latestVersion, YARN_VERSION));

                    var command = getUpdateCommand();
                    if (command) {
                      _this4.reporter.info(_this4.reporter.lang('yarnOutdatedCommand'));
                      _this4.reporter.command(command);
                    } else {
                      var installer = getUpdateInstaller();
                      if (installer) {
                        _this4.reporter.info(_this4.reporter.lang('yarnOutdatedInstaller', installer));
                      }
                    }
                  };
                }

              case 9:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee17, this);
      }));

      function _checkUpdate() {
        return _ref19.apply(this, arguments);
      }

      return _checkUpdate;
    }()

    /**
     * Method to override with a possible upgrade message.
     */

  }, {
    key: 'maybeOutputUpdate',
    value: function maybeOutputUpdate() {}
  }]);
  return Install;
}();

function setFlags(commander) {
  commander.usage('install [flags]');
  commander.option('-g, --global', 'DEPRECATED');
  commander.option('-S, --save', 'DEPRECATED - save package to your `dependencies`');
  commander.option('-D, --save-dev', 'DEPRECATED - save package to your `devDependencies`');
  commander.option('-P, --save-peer', 'DEPRECATED - save package to your `peerDependencies`');
  commander.option('-O, --save-optional', 'DEPRECATED - save package to your `optionalDependencies`');
  commander.option('-E, --save-exact', 'DEPRECATED');
  commander.option('-T, --save-tilde', 'DEPRECATED');
}