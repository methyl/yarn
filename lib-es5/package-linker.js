'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkBin = undefined;

var _from;

function _load_from() {
  return _from = _interopRequireDefault(require('babel-runtime/core-js/array/from'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('babel-runtime/core-js/map'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
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

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var linkBin = exports.linkBin = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(src, dest) {
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(process.platform === 'win32')) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return cmdShim(src, dest);

          case 3:
            _context.next = 11;
            break;

          case 5:
            _context.next = 7;
            return (_fs || _load_fs()).mkdirp(path.dirname(dest));

          case 7:
            _context.next = 9;
            return (_fs || _load_fs()).symlink(src, dest);

          case 9:
            _context.next = 11;
            return (_fs || _load_fs()).chmod(dest, '755');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function linkBin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _packageHoister;

function _load_packageHoister() {
  return _packageHoister = _interopRequireDefault(require('./package-hoister.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('./constants.js'));
}

var _promise2;

function _load_promise2() {
  return _promise2 = _interopRequireWildcard(require('./util/promise.js'));
}

var _misc;

function _load_misc() {
  return _misc = require('./util/misc.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var cmdShim = (_promise2 || _load_promise2()).promisify(require('cmd-shim'));
var semver = require('semver');
var path = require('path');

var PackageLinker = function () {
  function PackageLinker(config, resolver) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageLinker);

    this.resolver = resolver;
    this.reporter = config.reporter;
    this.config = config;
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageLinker, [{
    key: 'linkSelfDependencies',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(pkg, pkgLoc, targetBinLoc) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, scriptName, scriptCmd, dest, src;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (_fs || _load_fs()).realpath(targetBinLoc);

              case 2:
                targetBinLoc = _context2.sent;
                _context2.next = 5;
                return (_fs || _load_fs()).realpath(pkgLoc);

              case 5:
                pkgLoc = _context2.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = (0, (_getIterator2 || _load_getIterator()).default)((0, (_misc || _load_misc()).entries)(pkg.bin));

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 26;
                  break;
                }

                _step$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step.value, 2);
                scriptName = _step$value[0];
                scriptCmd = _step$value[1];
                dest = path.join(targetBinLoc, scriptName);
                src = path.join(pkgLoc, scriptCmd);
                _context2.next = 19;
                return (_fs || _load_fs()).exists(src);

              case 19:
                if (_context2.sent) {
                  _context2.next = 21;
                  break;
                }

                return _context2.abrupt('continue', 23);

              case 21:
                _context2.next = 23;
                return linkBin(src, dest);

              case 23:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 26:
                _context2.next = 32;
                break;

              case 28:
                _context2.prev = 28;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 32:
                _context2.prev = 32;
                _context2.prev = 33;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 35:
                _context2.prev = 35;

                if (!_didIteratorError) {
                  _context2.next = 38;
                  break;
                }

                throw _iteratorError;

              case 38:
                return _context2.finish(35);

              case 39:
                return _context2.finish(32);

              case 40:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 28, 32, 40], [33,, 35, 39]]);
      }));

      function linkSelfDependencies(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return linkSelfDependencies;
    }()
  }, {
    key: 'linkBinDependencies',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(pkg, dir) {
        var deps, ref, remote, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _pattern, _dep2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, depName, _loc, _dep, binLoc, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _dep3, _loc2;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                deps = [];
                ref = pkg._reference;

                invariant(ref, 'Package reference is missing');

                remote = pkg._remote;

                invariant(remote, 'Package remote is missing');

                // link up `bin scripts` in `dependencies`
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 8;
                for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(ref.dependencies); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _pattern = _step2.value;
                  _dep2 = this.resolver.getStrictResolvedPattern(_pattern);

                  if (_dep2.bin && (0, (_keys || _load_keys()).default)(_dep2.bin).length) {
                    deps.push({ dep: _dep2, loc: this.config.generateHardModulePath(_dep2._reference) });
                  }
                }

                // link up the `bin` scripts in bundled dependencies
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 16:
                _context3.prev = 16;
                _context3.prev = 17;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 19:
                _context3.prev = 19;

                if (!_didIteratorError2) {
                  _context3.next = 22;
                  break;
                }

                throw _iteratorError2;

              case 22:
                return _context3.finish(19);

              case 23:
                return _context3.finish(16);

              case 24:
                if (!pkg.bundleDependencies) {
                  _context3.next = 54;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 28;
                _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(pkg.bundleDependencies);

              case 30:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 40;
                  break;
                }

                depName = _step3.value;
                _loc = path.join(this.config.generateHardModulePath(ref), this.config.getFolder(pkg), depName);
                _context3.next = 35;
                return this.config.readManifest(_loc, remote.registry);

              case 35:
                _dep = _context3.sent;


                if (_dep.bin && (0, (_keys || _load_keys()).default)(_dep.bin).length) {
                  deps.push({ dep: _dep, loc: _loc });
                }

              case 37:
                _iteratorNormalCompletion3 = true;
                _context3.next = 30;
                break;

              case 40:
                _context3.next = 46;
                break;

              case 42:
                _context3.prev = 42;
                _context3.t1 = _context3['catch'](28);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t1;

              case 46:
                _context3.prev = 46;
                _context3.prev = 47;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 49:
                _context3.prev = 49;

                if (!_didIteratorError3) {
                  _context3.next = 52;
                  break;
                }

                throw _iteratorError3;

              case 52:
                return _context3.finish(49);

              case 53:
                return _context3.finish(46);

              case 54:
                if (deps.length) {
                  _context3.next = 56;
                  break;
                }

                return _context3.abrupt('return');

              case 56:

                // ensure our .bin file we're writing these to exists
                binLoc = path.join(dir, '.bin');
                _context3.next = 59;
                return (_fs || _load_fs()).mkdirp(binLoc);

              case 59:

                // write the executables
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context3.prev = 62;
                _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(deps);

              case 64:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context3.next = 73;
                  break;
                }

                _step4$value = _step4.value;
                _dep3 = _step4$value.dep;
                _loc2 = _step4$value.loc;
                _context3.next = 70;
                return this.linkSelfDependencies(_dep3, _loc2, binLoc);

              case 70:
                _iteratorNormalCompletion4 = true;
                _context3.next = 64;
                break;

              case 73:
                _context3.next = 79;
                break;

              case 75:
                _context3.prev = 75;
                _context3.t2 = _context3['catch'](62);
                _didIteratorError4 = true;
                _iteratorError4 = _context3.t2;

              case 79:
                _context3.prev = 79;
                _context3.prev = 80;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 82:
                _context3.prev = 82;

                if (!_didIteratorError4) {
                  _context3.next = 85;
                  break;
                }

                throw _iteratorError4;

              case 85:
                return _context3.finish(82);

              case 86:
                return _context3.finish(79);

              case 87:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 12, 16, 24], [17,, 19, 23], [28, 42, 46, 54], [47,, 49, 53], [62, 75, 79, 87], [80,, 82, 86]]);
      }));

      function linkBinDependencies(_x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return linkBinDependencies;
    }()
  }, {
    key: 'getFlatHoistedTree',
    value: function getFlatHoistedTree(patterns) {
      var hoister = new (_packageHoister || _load_packageHoister()).default(this.config, this.resolver);
      hoister.seed(patterns);
      return (_promise || _load_promise()).default.resolve(hoister.init());
    }
  }, {
    key: 'copyModules',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(patterns) {
        var _this = this;

        var flatTree, phantomFiles, queue, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _loop, _iterator5, _step5, scopedPaths, possibleExtraneous, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, folder, _loc3, files, filepath, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, file, subfiles, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, subfile, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _loc4, stat, tick, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, scopedPath, _files;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getFlatHoistedTree(patterns);

              case 2:
                flatTree = _context7.sent;


                // sorted tree makes file creation and copying not to interfere with each other
                flatTree = flatTree.sort(function (dep1, dep2) {
                  return dep1[0].localeCompare(dep2[0]);
                });

                // list of artifacts in modules to remove from extraneous removal
                phantomFiles = [];

                //

                queue = new (_map || _load_map()).default();
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context7.prev = 9;
                _loop = (_regenerator || _load_regenerator()).default.mark(function _loop() {
                  var _step5$value, dest, _step5$value$, pkg, src, ref, metadata, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, file;

                  return (_regenerator || _load_regenerator()).default.wrap(function _loop$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _step5$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step5.value, 2);
                          dest = _step5$value[0];
                          _step5$value$ = _step5$value[1];
                          pkg = _step5$value$.pkg;
                          src = _step5$value$.loc;
                          ref = pkg._reference;

                          invariant(ref, 'expected package reference');
                          ref.setLocation(dest);

                          // get a list of build artifacts contained in this module so we can prevent them from being marked as
                          // extraneous
                          _context6.next = 10;
                          return _this.config.readPackageMetadata(src);

                        case 10:
                          metadata = _context6.sent;
                          _iteratorNormalCompletion9 = true;
                          _didIteratorError9 = false;
                          _iteratorError9 = undefined;
                          _context6.prev = 14;

                          for (_iterator9 = (0, (_getIterator2 || _load_getIterator()).default)(metadata.artifacts); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            file = _step9.value;

                            phantomFiles.push(path.join(dest, file));
                          }

                          _context6.next = 22;
                          break;

                        case 18:
                          _context6.prev = 18;
                          _context6.t0 = _context6['catch'](14);
                          _didIteratorError9 = true;
                          _iteratorError9 = _context6.t0;

                        case 22:
                          _context6.prev = 22;
                          _context6.prev = 23;

                          if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                          }

                        case 25:
                          _context6.prev = 25;

                          if (!_didIteratorError9) {
                            _context6.next = 28;
                            break;
                          }

                          throw _iteratorError9;

                        case 28:
                          return _context6.finish(25);

                        case 29:
                          return _context6.finish(22);

                        case 30:
                          queue.set(dest, {
                            src: src,
                            dest: dest,
                            onFresh: function onFresh() {
                              if (ref) {
                                ref.setFresh(true);
                              }
                            }
                          });

                        case 31:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _loop, _this, [[14, 18, 22, 30], [23,, 25, 29]]);
                });
                _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(flatTree);

              case 12:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context7.next = 17;
                  break;
                }

                return _context7.delegateYield(_loop(), 't0', 14);

              case 14:
                _iteratorNormalCompletion5 = true;
                _context7.next = 12;
                break;

              case 17:
                _context7.next = 23;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t1 = _context7['catch'](9);
                _didIteratorError5 = true;
                _iteratorError5 = _context7.t1;

              case 23:
                _context7.prev = 23;
                _context7.prev = 24;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 26:
                _context7.prev = 26;

                if (!_didIteratorError5) {
                  _context7.next = 29;
                  break;
                }

                throw _iteratorError5;

              case 29:
                return _context7.finish(26);

              case 30:
                return _context7.finish(23);

              case 31:

                // keep track of all scoped paths to remove empty scopes after copy
                scopedPaths = new (_set || _load_set()).default();

                // register root & scoped packages as being possibly extraneous

                possibleExtraneous = new (_set || _load_set()).default();
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context7.prev = 36;
                _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(this.config.registryFolders);

              case 38:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context7.next = 103;
                  break;
                }

                folder = _step6.value;
                _loc3 = path.join(this.config.cwd, folder);
                _context7.next = 43;
                return (_fs || _load_fs()).exists(_loc3);

              case 43:
                if (!_context7.sent) {
                  _context7.next = 100;
                  break;
                }

                _context7.next = 46;
                return (_fs || _load_fs()).readdir(_loc3);

              case 46:
                files = _context7.sent;
                filepath = void 0;
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context7.prev = 51;
                _iterator10 = (0, (_getIterator2 || _load_getIterator()).default)(files);

              case 53:
                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                  _context7.next = 86;
                  break;
                }

                file = _step10.value;

                filepath = path.join(_loc3, file);

                if (!(file[0] === '@')) {
                  _context7.next = 82;
                  break;
                }

                // it's a scope, not a package
                scopedPaths.add(filepath);
                _context7.next = 60;
                return (_fs || _load_fs()).readdir(filepath);

              case 60:
                subfiles = _context7.sent;
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context7.prev = 64;

                for (_iterator11 = (0, (_getIterator2 || _load_getIterator()).default)(subfiles); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  subfile = _step11.value;

                  possibleExtraneous.add(path.join(filepath, subfile));
                }
                _context7.next = 72;
                break;

              case 68:
                _context7.prev = 68;
                _context7.t2 = _context7['catch'](64);
                _didIteratorError11 = true;
                _iteratorError11 = _context7.t2;

              case 72:
                _context7.prev = 72;
                _context7.prev = 73;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 75:
                _context7.prev = 75;

                if (!_didIteratorError11) {
                  _context7.next = 78;
                  break;
                }

                throw _iteratorError11;

              case 78:
                return _context7.finish(75);

              case 79:
                return _context7.finish(72);

              case 80:
                _context7.next = 83;
                break;

              case 82:
                possibleExtraneous.add(filepath);

              case 83:
                _iteratorNormalCompletion10 = true;
                _context7.next = 53;
                break;

              case 86:
                _context7.next = 92;
                break;

              case 88:
                _context7.prev = 88;
                _context7.t3 = _context7['catch'](51);
                _didIteratorError10 = true;
                _iteratorError10 = _context7.t3;

              case 92:
                _context7.prev = 92;
                _context7.prev = 93;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 95:
                _context7.prev = 95;

                if (!_didIteratorError10) {
                  _context7.next = 98;
                  break;
                }

                throw _iteratorError10;

              case 98:
                return _context7.finish(95);

              case 99:
                return _context7.finish(92);

              case 100:
                _iteratorNormalCompletion6 = true;
                _context7.next = 38;
                break;

              case 103:
                _context7.next = 109;
                break;

              case 105:
                _context7.prev = 105;
                _context7.t4 = _context7['catch'](36);
                _didIteratorError6 = true;
                _iteratorError6 = _context7.t4;

              case 109:
                _context7.prev = 109;
                _context7.prev = 110;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 112:
                _context7.prev = 112;

                if (!_didIteratorError6) {
                  _context7.next = 115;
                  break;
                }

                throw _iteratorError6;

              case 115:
                return _context7.finish(112);

              case 116:
                return _context7.finish(109);

              case 117:

                // linked modules
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context7.prev = 120;
                _iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(possibleExtraneous);

              case 122:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context7.next = 131;
                  break;
                }

                _loc4 = _step7.value;
                _context7.next = 126;
                return (_fs || _load_fs()).lstat(_loc4);

              case 126:
                stat = _context7.sent;

                if (stat.isSymbolicLink()) {
                  possibleExtraneous.delete(_loc4);
                  queue.delete(_loc4);
                }

              case 128:
                _iteratorNormalCompletion7 = true;
                _context7.next = 122;
                break;

              case 131:
                _context7.next = 137;
                break;

              case 133:
                _context7.prev = 133;
                _context7.t5 = _context7['catch'](120);
                _didIteratorError7 = true;
                _iteratorError7 = _context7.t5;

              case 137:
                _context7.prev = 137;
                _context7.prev = 138;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 140:
                _context7.prev = 140;

                if (!_didIteratorError7) {
                  _context7.next = 143;
                  break;
                }

                throw _iteratorError7;

              case 143:
                return _context7.finish(140);

              case 144:
                return _context7.finish(137);

              case 145:

                //
                tick = void 0;
                _context7.next = 148;
                return (_fs || _load_fs()).copyBulk((0, (_from || _load_from()).default)(queue.values()), this.reporter, {
                  possibleExtraneous: possibleExtraneous,
                  phantomFiles: phantomFiles,

                  ignoreBasenames: [(_constants || _load_constants()).METADATA_FILENAME, (_constants || _load_constants()).TARBALL_FILENAME],

                  onStart: function onStart(num) {
                    tick = _this.reporter.progress(num);
                  },

                  onProgress: function onProgress(src) {
                    if (tick) {
                      tick(src);
                    }
                  }
                });

              case 148:

                // remove any empty scoped directories
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context7.prev = 151;
                _iterator8 = (0, (_getIterator2 || _load_getIterator()).default)(scopedPaths);

              case 153:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  _context7.next = 164;
                  break;
                }

                scopedPath = _step8.value;
                _context7.next = 157;
                return (_fs || _load_fs()).readdir(scopedPath);

              case 157:
                _files = _context7.sent;

                if (!(_files.length === 0)) {
                  _context7.next = 161;
                  break;
                }

                _context7.next = 161;
                return (_fs || _load_fs()).unlink(scopedPath);

              case 161:
                _iteratorNormalCompletion8 = true;
                _context7.next = 153;
                break;

              case 164:
                _context7.next = 170;
                break;

              case 166:
                _context7.prev = 166;
                _context7.t6 = _context7['catch'](151);
                _didIteratorError8 = true;
                _iteratorError8 = _context7.t6;

              case 170:
                _context7.prev = 170;
                _context7.prev = 171;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 173:
                _context7.prev = 173;

                if (!_didIteratorError8) {
                  _context7.next = 176;
                  break;
                }

                throw _iteratorError8;

              case 176:
                return _context7.finish(173);

              case 177:
                return _context7.finish(170);

              case 178:
                if (!this.config.binLinks) {
                  _context7.next = 180;
                  break;
                }

                return _context7.delegateYield((_regenerator || _load_regenerator()).default.mark(function _callee5() {
                  var tickBin;
                  return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          tickBin = _this.reporter.progress(flatTree.length);
                          _context5.next = 3;
                          return (_promise2 || _load_promise2()).queue(flatTree, function () {
                            var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(_ref5) {
                              var _ref7 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_ref5, 2);

                              var dest = _ref7[0];
                              var pkg = _ref7[1].pkg;
                              var binLoc;
                              return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      binLoc = path.join(dest, _this.config.getFolder(pkg));
                                      _context4.next = 3;
                                      return _this.linkBinDependencies(pkg, binLoc);

                                    case 3:
                                      tickBin(dest);

                                    case 4:
                                    case 'end':
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4, _this);
                            }));

                            return function (_x9) {
                              return _ref6.apply(this, arguments);
                            };
                          }(), 4);

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this);
                })(), 't7', 180);

              case 180:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this, [[9, 19, 23, 31], [24,, 26, 30], [36, 105, 109, 117], [51, 88, 92, 100], [64, 68, 72, 80], [73,, 75, 79], [93,, 95, 99], [110,, 112, 116], [120, 133, 137, 145], [138,, 140, 144], [151, 166, 170, 178], [171,, 173, 177]]);
      }));

      function copyModules(_x8) {
        return _ref4.apply(this, arguments);
      }

      return copyModules;
    }()
  }, {
    key: 'resolvePeerModules',
    value: function resolvePeerModules() {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = (0, (_getIterator2 || _load_getIterator()).default)(this.resolver.getManifests()), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var pkg = _step12.value;

          this._resolvePeerModules(pkg);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  }, {
    key: '_resolvePeerModules',
    value: function _resolvePeerModules(pkg) {
      var peerDeps = pkg.peerDependencies;
      if (!peerDeps) {
        return;
      }

      var ref = pkg._reference;
      invariant(ref, 'Package reference is missing');

      for (var name in peerDeps) {
        var range = peerDeps[name];

        // find a dependency in the tree above us that matches
        var searchPatterns = [];
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = (0, (_getIterator2 || _load_getIterator()).default)(ref.requests), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var request = _step13.value;

            do {
              // get resolved pattern for this request
              var _dep4 = this.resolver.getResolvedPattern(request.pattern);
              if (!_dep4) {
                continue;
              }

              //
              var _ref8 = _dep4._reference;
              invariant(_ref8, 'expected reference');
              searchPatterns = searchPatterns.concat(_ref8.dependencies);
            } while (request = request.parentRequest);
          }

          // include root seed patterns last
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }

        searchPatterns = searchPatterns.concat(this.resolver.seedPatterns);

        // find matching dep in search patterns
        var foundDep = void 0;
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = (0, (_getIterator2 || _load_getIterator()).default)(searchPatterns), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _pattern2 = _step14.value;

            var _dep5 = this.resolver.getResolvedPattern(_pattern2);
            if (_dep5 && _dep5.name === name) {
              foundDep = { pattern: _pattern2, version: _dep5.version };
              break;
            }
          }

          // validate found peer dependency
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        if (foundDep && this._satisfiesPeerDependency(range, foundDep.version)) {
          ref.addDependencies([foundDep.pattern]);
        } else {
          var depError = foundDep ? 'incorrectPeer' : 'unmetPeer';
          var pkgHuman = pkg.name + '@' + pkg.version;
          var depHuman = name + '@' + range;

          this.reporter.warn(this.reporter.lang(depError, pkgHuman, depHuman));
        }
      }
    }
  }, {
    key: '_satisfiesPeerDependency',
    value: function _satisfiesPeerDependency(range, version) {
      return range === '*' || semver.satisfies(version, range, this.config.looseSemver);
    }
  }, {
    key: 'init',
    value: function () {
      var _ref9 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7(patterns) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.resolvePeerModules();
                _context8.next = 3;
                return this.copyModules(patterns);

              case 3:
                _context8.next = 5;
                return this.saveAll(patterns);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function init(_x10) {
        return _ref9.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'save',
    value: function () {
      var _ref10 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(pattern) {
        var resolved, ref, src, folder, binLoc;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                resolved = this.resolver.getResolvedPattern(pattern);

                invariant(resolved, 'Couldn\'t find resolved name/version for ' + pattern);

                ref = resolved._reference;

                invariant(ref, 'Missing reference');

                //
                src = this.config.generateHardModulePath(ref);

                // link bins

                if (!(this.config.binLinks && resolved.bin && (0, (_keys || _load_keys()).default)(resolved.bin).length)) {
                  _context9.next = 12;
                  break;
                }

                folder = this.config.modulesFolder || path.join(this.config.cwd, this.config.getFolder(resolved));
                binLoc = path.join(folder, '.bin');
                _context9.next = 10;
                return (_fs || _load_fs()).mkdirp(binLoc);

              case 10:
                _context9.next = 12;
                return this.linkSelfDependencies(resolved, src, binLoc);

              case 12:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function save(_x11) {
        return _ref10.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: 'saveAll',
    value: function () {
      var _ref11 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee9(deps) {
        var _this2 = this;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                deps = this.resolver.dedupePatterns(deps);
                _context10.next = 3;
                return (_promise2 || _load_promise2()).queue(deps, function (dep) {
                  return _this2.save(dep);
                });

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function saveAll(_x12) {
        return _ref11.apply(this, arguments);
      }

      return saveAll;
    }()
  }]);
  return PackageLinker;
}();

exports.default = PackageLinker;