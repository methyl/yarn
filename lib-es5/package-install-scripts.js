'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('babel-runtime/core-js/map'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _executeLifecycleScript;

function _load_executeLifecycleScript() {
  return _executeLifecycleScript = _interopRequireDefault(require('./util/execute-lifecycle-script.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./util/fs.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('./constants.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');

var INSTALL_STAGES = ['preinstall', 'install', 'postinstall'];

var PackageInstallScripts = function () {
  function PackageInstallScripts(config, resolver, force) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageInstallScripts);

    this.installed = 0;
    this.resolver = resolver;
    this.reporter = config.reporter;
    this.config = config;
    this.force = force;
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageInstallScripts, [{
    key: 'getInstallCommands',
    value: function getInstallCommands(pkg) {
      var scripts = pkg.scripts;
      if (scripts) {
        var cmds = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(INSTALL_STAGES), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var stage = _step.value;

            var cmd = scripts[stage];
            if (cmd) {
              cmds.push([stage, cmd]);
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

        return cmds;
      } else {
        return [];
      }
    }
  }, {
    key: 'walk',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(loc) {
        var files, mtimes, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (_fs || _load_fs()).walk(loc, null, new (_set || _load_set()).default(this.config.registryFolders));

              case 2:
                files = _context.sent;
                mtimes = new (_map || _load_map()).default();
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 7;

                for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(files); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  file = _step2.value;

                  mtimes.set(file.relative, file.mtime);
                }
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](7);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 15:
                _context.prev = 15;
                _context.prev = 16;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 18:
                _context.prev = 18;

                if (!_didIteratorError2) {
                  _context.next = 21;
                  break;
                }

                throw _iteratorError2;

              case 21:
                return _context.finish(18);

              case 22:
                return _context.finish(15);

              case 23:
                return _context.abrupt('return', mtimes);

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 11, 15, 23], [16,, 18, 22]]);
      }));

      function walk(_x) {
        return _ref.apply(this, arguments);
      }

      return walk;
    }()
  }, {
    key: 'saveBuildArtifacts',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(loc, pkg, beforeFiles, spinner) {
        var afterFiles, buildArtifacts, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, file, mtime, cachedLoc, metadata, metadataLoc;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.walk(loc);

              case 2:
                afterFiles = _context2.sent;


                // work out what files have been created/modified
                buildArtifacts = [];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 7;

                for (_iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(afterFiles); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _step3$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step3.value, 2);
                  file = _step3$value[0];
                  mtime = _step3$value[1];

                  if (!beforeFiles.has(file) || beforeFiles.get(file) !== mtime) {
                    buildArtifacts.push(file);
                  }
                }

                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](7);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 15:
                _context2.prev = 15;
                _context2.prev = 16;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 18:
                _context2.prev = 18;

                if (!_didIteratorError3) {
                  _context2.next = 21;
                  break;
                }

                throw _iteratorError3;

              case 21:
                return _context2.finish(18);

              case 22:
                return _context2.finish(15);

              case 23:
                if (buildArtifacts.length) {
                  _context2.next = 25;
                  break;
                }

                return _context2.abrupt('return');

              case 25:

                // if the process is killed while copying over build artifacts then we'll leave
                // the cache in a bad state. remove the metadata file and add it back once we've
                // done our copies to ensure cache integrity.
                cachedLoc = this.config.generateHardModulePath(pkg._reference, true);
                _context2.next = 28;
                return this.config.readPackageMetadata(cachedLoc);

              case 28:
                metadata = _context2.sent;

                metadata.artifacts = buildArtifacts;

                metadataLoc = path.join(cachedLoc, (_constants || _load_constants()).METADATA_FILENAME);
                _context2.next = 33;
                return (_fs || _load_fs()).writeFile(metadataLoc, (0, (_stringify || _load_stringify()).default)((0, (_extends2 || _load_extends()).default)({}, metadata, {

                  // config.readPackageMetadata also returns the package manifest but that's not in the original
                  // metadata json
                  package: undefined
                }), null, '  '));

              case 33:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 11, 15, 23], [16,, 18, 22]]);
      }));

      function saveBuildArtifacts(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return saveBuildArtifacts;
    }()
  }, {
    key: 'install',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(cmds, pkg, spinner) {
        var ref, loc, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, stage, cmd, _ref4;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ref = pkg._reference;

                invariant(ref, 'expected reference');
                loc = this.config.generateHardModulePath(ref);
                _context3.prev = 3;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context3.prev = 7;
                _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(cmds);

              case 9:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context3.next = 18;
                  break;
                }

                _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 2);
                stage = _step4$value[0];
                cmd = _step4$value[1];
                _context3.next = 15;
                return (0, (_executeLifecycleScript || _load_executeLifecycleScript()).default)(stage, this.config, loc, cmd, spinner);

              case 15:
                _iteratorNormalCompletion4 = true;
                _context3.next = 9;
                break;

              case 18:
                _context3.next = 24;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3['catch'](7);
                _didIteratorError4 = true;
                _iteratorError4 = _context3.t0;

              case 24:
                _context3.prev = 24;
                _context3.prev = 25;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 27:
                _context3.prev = 27;

                if (!_didIteratorError4) {
                  _context3.next = 30;
                  break;
                }

                throw _iteratorError4;

              case 30:
                return _context3.finish(27);

              case 31:
                return _context3.finish(24);

              case 32:
                _context3.next = 46;
                break;

              case 34:
                _context3.prev = 34;
                _context3.t1 = _context3['catch'](3);

                _context3.t1.message = loc + ': ' + _context3.t1.message;

                _ref4 = pkg._reference;

                invariant(_ref4, 'expected reference');

                if (!_ref4.optional) {
                  _context3.next = 45;
                  break;
                }

                _ref4.ignore = true;
                this.reporter.error(this.reporter.lang('optionalModuleScriptFail', _context3.t1.message));
                this.reporter.info(this.reporter.lang('optionalModuleFail'));
                _context3.next = 46;
                break;

              case 45:
                throw _context3.t1;

              case 46:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 34], [7, 20, 24, 32], [25,, 27, 31]]);
      }));

      function install(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      }

      return install;
    }()
  }, {
    key: 'packageCanBeInstalled',
    value: function packageCanBeInstalled(pkg) {
      var cmds = this.getInstallCommands(pkg);
      if (!cmds.length) {
        return false;
      }
      var ref = pkg._reference;
      invariant(ref, 'Missing package reference');
      if (!ref.fresh && !this.force) {
        // this package hasn't been touched
        return false;
      }

      // we haven't actually written this module out
      if (ref.ignore) {
        return false;
      }
      return true;
    }
  }, {
    key: 'runCommand',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(spinner, pkg) {
        var cmds;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cmds = this.getInstallCommands(pkg);

                spinner.setPrefix(++this.installed, pkg.name);
                _context4.next = 4;
                return this.install(cmds, pkg, spinner);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function runCommand(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return runCommand;
    }()

    // detect if there is a circularDependency in the dependency tree

  }, {
    key: 'detectCircularDependencies',
    value: function detectCircularDependencies(root, seenManifests, pkg) {
      var ref = pkg._reference;
      invariant(ref, 'expected reference');

      var deps = ref.dependencies;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(deps), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var dep = _step5.value;

          var pkgDep = this.resolver.getStrictResolvedPattern(dep);
          if (seenManifests.has(pkgDep)) {
            // there is a cycle but not with the root
            continue;
          }
          seenManifests.add(pkgDep);
          // found a dependency pointing to root
          if (pkgDep == root) {
            return true;
          }
          if (this.detectCircularDependencies(root, seenManifests, pkgDep)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return false;
    }

    // find the next package to be installed

  }, {
    key: 'findInstallablePackage',
    value: function findInstallablePackage(workQueue, installed) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(workQueue), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var pkg = _step6.value;

          var ref = pkg._reference;
          invariant(ref, 'expected reference');
          var deps = ref.dependencies;

          var dependenciesFullfilled = true;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(deps), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var dep = _step7.value;

              var pkgDep = this.resolver.getStrictResolvedPattern(dep);
              if (!installed.has(pkgDep)) {
                dependenciesFullfilled = false;
                break;
              }
            }

            // all depedencies are installed
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          if (dependenciesFullfilled) {
            return pkg;
          }

          // detect circular dependency, mark this pkg as installable to break the circle
          if (this.detectCircularDependencies(pkg, new (_set || _load_set()).default(), pkg)) {
            return pkg;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return null;
    }
  }, {
    key: 'worker',
    value: function () {
      var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(spinner, workQueue, installed, waitQueue) {
        var pkg, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, workerResolve;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!true) {
                  _context5.next = 36;
                  break;
                }

                if (!(workQueue.size == 0)) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt('break', 36);

              case 3:

                // find a installable package
                pkg = this.findInstallablePackage(workQueue, installed);

                // can't find a package to install, register into waitQueue

                if (!(pkg == null)) {
                  _context5.next = 9;
                  break;
                }

                spinner.clear();
                _context5.next = 8;
                return new (_promise || _load_promise()).default(function (resolve) {
                  return waitQueue.add(resolve);
                });

              case 8:
                return _context5.abrupt('continue', 0);

              case 9:

                // found a package to install
                workQueue.delete(pkg);

                if (!this.packageCanBeInstalled(pkg)) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 13;
                return this.runCommand(spinner, pkg);

              case 13:
                installed.add(pkg);
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context5.prev = 17;
                for (_iterator8 = (0, (_getIterator2 || _load_getIterator()).default)(waitQueue); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                  workerResolve = _step8.value;

                  workerResolve();
                }
                _context5.next = 25;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5['catch'](17);
                _didIteratorError8 = true;
                _iteratorError8 = _context5.t0;

              case 25:
                _context5.prev = 25;
                _context5.prev = 26;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 28:
                _context5.prev = 28;

                if (!_didIteratorError8) {
                  _context5.next = 31;
                  break;
                }

                throw _iteratorError8;

              case 31:
                return _context5.finish(28);

              case 32:
                return _context5.finish(25);

              case 33:
                waitQueue.clear();
                _context5.next = 0;
                break;

              case 36:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[17, 21, 25, 33], [26,, 28, 32]]);
      }));

      function worker(_x11, _x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
      }

      return worker;
    }()
  }, {
    key: 'init',
    value: function () {
      var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(seedPatterns) {
        var workQueue, installed, pkgs, installablePkgs, beforeFilesMap, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, pkg, ref, loc, waitQueue, workers, set, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, spinner, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _pkg, _ref8, _loc, beforeFiles;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                workQueue = new (_set || _load_set()).default();
                installed = new (_set || _load_set()).default();
                pkgs = this.resolver.getTopologicalManifests(seedPatterns);
                installablePkgs = 0;
                // A map to keep track of what files exist before installation

                beforeFilesMap = new (_map || _load_map()).default();
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context6.prev = 8;
                _iterator9 = (0, (_getIterator2 || _load_getIterator()).default)(pkgs);

              case 10:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                  _context6.next = 27;
                  break;
                }

                pkg = _step9.value;

                if (!this.packageCanBeInstalled(pkg)) {
                  _context6.next = 23;
                  break;
                }

                ref = pkg._reference;

                invariant(ref, 'expected reference');
                loc = this.config.generateHardModulePath(ref);
                _context6.t0 = beforeFilesMap;
                _context6.t1 = loc;
                _context6.next = 20;
                return this.walk(loc);

              case 20:
                _context6.t2 = _context6.sent;

                _context6.t0.set.call(_context6.t0, _context6.t1, _context6.t2);

                installablePkgs += 1;

              case 23:
                workQueue.add(pkg);

              case 24:
                _iteratorNormalCompletion9 = true;
                _context6.next = 10;
                break;

              case 27:
                _context6.next = 33;
                break;

              case 29:
                _context6.prev = 29;
                _context6.t3 = _context6['catch'](8);
                _didIteratorError9 = true;
                _iteratorError9 = _context6.t3;

              case 33:
                _context6.prev = 33;
                _context6.prev = 34;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 36:
                _context6.prev = 36;

                if (!_didIteratorError9) {
                  _context6.next = 39;
                  break;
                }

                throw _iteratorError9;

              case 39:
                return _context6.finish(36);

              case 40:
                return _context6.finish(33);

              case 41:

                // waitQueue acts like a semaphore to allow workers to register to be notified
                // when there are more work added to the work queue
                waitQueue = new (_set || _load_set()).default();
                workers = [];
                set = this.reporter.activitySet(installablePkgs, Math.min((_constants || _load_constants()).CHILD_CONCURRENCY, workQueue.size));
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context6.prev = 47;


                for (_iterator10 = (0, (_getIterator2 || _load_getIterator()).default)(set.spinners); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                  spinner = _step10.value;

                  workers.push(this.worker(spinner, workQueue, installed, waitQueue));
                }

                _context6.next = 55;
                break;

              case 51:
                _context6.prev = 51;
                _context6.t4 = _context6['catch'](47);
                _didIteratorError10 = true;
                _iteratorError10 = _context6.t4;

              case 55:
                _context6.prev = 55;
                _context6.prev = 56;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 58:
                _context6.prev = 58;

                if (!_didIteratorError10) {
                  _context6.next = 61;
                  break;
                }

                throw _iteratorError10;

              case 61:
                return _context6.finish(58);

              case 62:
                return _context6.finish(55);

              case 63:
                _context6.next = 65;
                return (_promise || _load_promise()).default.all(workers);

              case 65:

                // cache all build artifacts
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context6.prev = 68;
                _iterator11 = (0, (_getIterator2 || _load_getIterator()).default)(pkgs);

              case 70:
                if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                  _context6.next = 83;
                  break;
                }

                _pkg = _step11.value;

                if (!this.packageCanBeInstalled(_pkg)) {
                  _context6.next = 80;
                  break;
                }

                _ref8 = _pkg._reference;

                invariant(_ref8, 'expected reference');
                _loc = this.config.generateHardModulePath(_ref8);
                beforeFiles = beforeFilesMap.get(_loc);

                invariant(beforeFiles, 'files before installation should always be recorded');
                _context6.next = 80;
                return this.saveBuildArtifacts(_loc, _pkg, beforeFiles, set.spinners[0]);

              case 80:
                _iteratorNormalCompletion11 = true;
                _context6.next = 70;
                break;

              case 83:
                _context6.next = 89;
                break;

              case 85:
                _context6.prev = 85;
                _context6.t5 = _context6['catch'](68);
                _didIteratorError11 = true;
                _iteratorError11 = _context6.t5;

              case 89:
                _context6.prev = 89;
                _context6.prev = 90;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 92:
                _context6.prev = 92;

                if (!_didIteratorError11) {
                  _context6.next = 95;
                  break;
                }

                throw _iteratorError11;

              case 95:
                return _context6.finish(92);

              case 96:
                return _context6.finish(89);

              case 97:

                set.end();

              case 98:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 29, 33, 41], [34,, 36, 40], [47, 51, 55, 63], [56,, 58, 62], [68, 85, 89, 97], [90,, 92, 96]]);
      }));

      function init(_x15) {
        return _ref7.apply(this, arguments);
      }

      return init;
    }()
  }]);
  return PackageInstallScripts;
}();

exports.default = PackageInstallScripts;