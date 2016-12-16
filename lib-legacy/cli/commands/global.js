'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
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

var updateCwd = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config) {
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return config.init({
              cwd: config.globalFolder,
              binLinks: true,
              globalFolder: config.globalFolder,
              cacheFolder: config.cacheFolder,
              linkFolder: config.linkFolder
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function updateCwd(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getBins = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config) {
    var dirs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, registryName, registry, paths, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, dir, binDir, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, name;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // build up list of registry folders to search for binaries
            dirs = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 4;

            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index || _load_index()).registries)); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              registryName = _step2.value;
              registry = config.registries[registryName];

              dirs.push(registry.loc);
            }

            // build up list of binary files
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 12:
            _context2.prev = 12;
            _context2.prev = 13;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 15:
            _context2.prev = 15;

            if (!_didIteratorError2) {
              _context2.next = 18;
              break;
            }

            throw _iteratorError2;

          case 18:
            return _context2.finish(15);

          case 19:
            return _context2.finish(12);

          case 20:
            paths = new (_set || _load_set()).default();
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 24;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(dirs);

          case 26:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context2.next = 64;
              break;
            }

            dir = _step3.value;
            binDir = path.join(dir, '.bin');
            _context2.next = 31;
            return (_fs || _load_fs()).exists(binDir);

          case 31:
            if (_context2.sent) {
              _context2.next = 33;
              break;
            }

            return _context2.abrupt('continue', 61);

          case 33:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context2.prev = 36;
            _context2.next = 39;
            return (_fs || _load_fs()).readdir(binDir);

          case 39:
            _context2.t1 = _context2.sent;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(_context2.t1);

          case 41:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context2.next = 47;
              break;
            }

            name = _step4.value;

            paths.add(path.join(binDir, name));

          case 44:
            _iteratorNormalCompletion4 = true;
            _context2.next = 41;
            break;

          case 47:
            _context2.next = 53;
            break;

          case 49:
            _context2.prev = 49;
            _context2.t2 = _context2['catch'](36);
            _didIteratorError4 = true;
            _iteratorError4 = _context2.t2;

          case 53:
            _context2.prev = 53;
            _context2.prev = 54;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 56:
            _context2.prev = 56;

            if (!_didIteratorError4) {
              _context2.next = 59;
              break;
            }

            throw _iteratorError4;

          case 59:
            return _context2.finish(56);

          case 60:
            return _context2.finish(53);

          case 61:
            _iteratorNormalCompletion3 = true;
            _context2.next = 26;
            break;

          case 64:
            _context2.next = 70;
            break;

          case 66:
            _context2.prev = 66;
            _context2.t3 = _context2['catch'](24);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t3;

          case 70:
            _context2.prev = 70;
            _context2.prev = 71;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 73:
            _context2.prev = 73;

            if (!_didIteratorError3) {
              _context2.next = 76;
              break;
            }

            throw _iteratorError3;

          case 76:
            return _context2.finish(73);

          case 77:
            return _context2.finish(70);

          case 78:
            return _context2.abrupt('return', paths);

          case 79:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 8, 12, 20], [13,, 15, 19], [24, 66, 70, 78], [36, 49, 53, 61], [54,, 56, 60], [71,, 73, 77]]);
  }));

  return function getBins(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var initUpdateBins = function () {
  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(config, reporter, flags) {
    var beforeBins, binFolder, throwPermError;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            throwPermError = function throwPermError(err, dest) {
              if (err.code === 'EACCES') {
                throw new (_errors || _load_errors()).MessageError(reporter.lang('noFilePermission', dest));
              } else {
                throw err;
              }
            };

            _context4.next = 3;
            return getBins(config);

          case 3:
            beforeBins = _context4.sent;
            binFolder = getBinFolder(config, flags);
            return _context4.abrupt('return', (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
              var afterBins, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, src, dest, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _src, _dest;

              return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return getBins(config);

                    case 2:
                      afterBins = _context3.sent;


                      // remove old bins
                      _iteratorNormalCompletion5 = true;
                      _didIteratorError5 = false;
                      _iteratorError5 = undefined;
                      _context3.prev = 6;
                      _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(beforeBins);

                    case 8:
                      if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                        _context3.next = 24;
                        break;
                      }

                      src = _step5.value;

                      if (!afterBins.has(src)) {
                        _context3.next = 12;
                        break;
                      }

                      return _context3.abrupt('continue', 21);

                    case 12:

                      // remove old bin
                      dest = path.join(binFolder, path.basename(src));
                      _context3.prev = 13;
                      _context3.next = 16;
                      return (_fs || _load_fs()).unlink(dest);

                    case 16:
                      _context3.next = 21;
                      break;

                    case 18:
                      _context3.prev = 18;
                      _context3.t0 = _context3['catch'](13);

                      throwPermError(_context3.t0, dest);

                    case 21:
                      _iteratorNormalCompletion5 = true;
                      _context3.next = 8;
                      break;

                    case 24:
                      _context3.next = 30;
                      break;

                    case 26:
                      _context3.prev = 26;
                      _context3.t1 = _context3['catch'](6);
                      _didIteratorError5 = true;
                      _iteratorError5 = _context3.t1;

                    case 30:
                      _context3.prev = 30;
                      _context3.prev = 31;

                      if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                      }

                    case 33:
                      _context3.prev = 33;

                      if (!_didIteratorError5) {
                        _context3.next = 36;
                        break;
                      }

                      throw _iteratorError5;

                    case 36:
                      return _context3.finish(33);

                    case 37:
                      return _context3.finish(30);

                    case 38:

                      // add new bins
                      _iteratorNormalCompletion6 = true;
                      _didIteratorError6 = false;
                      _iteratorError6 = undefined;
                      _context3.prev = 41;
                      _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(afterBins);

                    case 43:
                      if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                        _context3.next = 61;
                        break;
                      }

                      _src = _step6.value;

                      if (!beforeBins.has(_src)) {
                        _context3.next = 47;
                        break;
                      }

                      return _context3.abrupt('continue', 58);

                    case 47:

                      // insert new bin
                      _dest = path.join(binFolder, path.basename(_src));
                      _context3.prev = 48;
                      _context3.next = 51;
                      return (_fs || _load_fs()).unlink(_dest);

                    case 51:
                      _context3.next = 53;
                      return (0, (_packageLinker || _load_packageLinker()).linkBin)(_src, _dest);

                    case 53:
                      _context3.next = 58;
                      break;

                    case 55:
                      _context3.prev = 55;
                      _context3.t2 = _context3['catch'](48);

                      throwPermError(_context3.t2, _dest);

                    case 58:
                      _iteratorNormalCompletion6 = true;
                      _context3.next = 43;
                      break;

                    case 61:
                      _context3.next = 67;
                      break;

                    case 63:
                      _context3.prev = 63;
                      _context3.t3 = _context3['catch'](41);
                      _didIteratorError6 = true;
                      _iteratorError6 = _context3.t3;

                    case 67:
                      _context3.prev = 67;
                      _context3.prev = 68;

                      if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                      }

                    case 70:
                      _context3.prev = 70;

                      if (!_didIteratorError6) {
                        _context3.next = 73;
                        break;
                      }

                      throw _iteratorError6;

                    case 73:
                      return _context3.finish(70);

                    case 74:
                      return _context3.finish(67);

                    case 75:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[6, 26, 30, 38], [13, 18], [31,, 33, 37], [41, 63, 67, 75], [48, 55], [68,, 70, 74]]);
            })));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function initUpdateBins(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.hasWrapper = hasWrapper;
exports.setFlags = setFlags;

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _baseReporter;

function _load_baseReporter() {
  return _baseReporter = _interopRequireDefault(require('../../reporters/base-reporter.js'));
}

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _add;

function _load_add() {
  return _add = require('./add.js');
}

var _remove;

function _load_remove() {
  return _remove = require('./remove.js');
}

var _upgrade;

function _load_upgrade() {
  return _upgrade = require('./upgrade.js');
}

var _packageLinker;

function _load_packageLinker() {
  return _packageLinker = require('../../package-linker.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalAdd = function (_Add) {
  (0, (_inherits2 || _load_inherits()).default)(GlobalAdd, _Add);

  function GlobalAdd() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, GlobalAdd);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (GlobalAdd.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(GlobalAdd)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(GlobalAdd, [{
    key: 'maybeOutputSaveTree',
    value: function maybeOutputSaveTree() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(this.addedPatterns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pattern = _step.value;

          var manifest = this.resolver.getStrictResolvedPattern(pattern);
          _ls(manifest, this.reporter, true);
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

      return (_promise || _load_promise()).default.resolve();
    }
  }, {
    key: '_logSuccessSaveLockfile',
    value: function _logSuccessSaveLockfile() {
      // noop
    }
  }]);
  return GlobalAdd;
}((_add || _load_add()).Add);

var path = require('path');

function hasWrapper(flags, args) {
  return args[0] !== 'bin';
}

function getGlobalPrefix(config, flags) {
  if (flags.prefix) {
    return flags.prefix;
  } else if (config.getOption('prefix')) {
    return String(config.getOption('prefix'));
  } else if (process.env.PREFIX) {
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

function getBinFolder(config, flags) {
  var prefix = getGlobalPrefix(config, flags);
  if (process.platform === 'win32') {
    return prefix;
  } else {
    return path.resolve(prefix, 'bin');
  }
}

function _ls(manifest, reporter, saved) {
  var bins = manifest.bin ? (0, (_keys || _load_keys()).default)(manifest.bin) : [];
  var human = manifest.name + '@' + manifest.version;
  if (bins.length) {
    if (saved) {
      reporter.success('Installed ' + human + ' with binaries:');
    } else {
      reporter.info(human + ' has binaries:');
    }
    reporter.list('bins-' + manifest.name, bins);
  } else if (saved) {
    reporter.warn(human + ' has no binaries');
  }
}

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('global', {
  add: function () {
    var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(config, reporter, flags, args) {
      var updateBins, lockfile, install;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return updateCwd(config);

            case 2:
              _context5.next = 4;
              return initUpdateBins(config, reporter, flags);

            case 4:
              updateBins = _context5.sent;
              _context5.next = 7;
              return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

            case 7:
              lockfile = _context5.sent;
              install = new GlobalAdd(args, flags, config, reporter, lockfile);
              _context5.next = 11;
              return install.init();

            case 11:
              _context5.next = 13;
              return updateBins();

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function add(_x6, _x7, _x8, _x9) {
      return _ref5.apply(this, arguments);
    }

    return add;
  }(),
  bin: function bin(config, reporter, flags, args) {
    console.log(getBinFolder(config, flags));
  },
  ls: function () {
    var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(config, reporter, flags, args) {
      var lockfile, install, patterns, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, pattern, manifest;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return updateCwd(config);

            case 2:
              _context6.next = 4;
              return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

            case 4:
              lockfile = _context6.sent;
              install = new (_install || _load_install()).Install({ skipIntegrity: true }, config, new (_baseReporter || _load_baseReporter()).default(), lockfile);
              _context6.next = 8;
              return install.init();

            case 8:
              patterns = _context6.sent;


              // dump global modules
              _iteratorNormalCompletion7 = true;
              _didIteratorError7 = false;
              _iteratorError7 = undefined;
              _context6.prev = 12;
              for (_iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(patterns); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                pattern = _step7.value;
                manifest = install.resolver.getStrictResolvedPattern(pattern);

                _ls(manifest, reporter, false);
              }
              _context6.next = 20;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6['catch'](12);
              _didIteratorError7 = true;
              _iteratorError7 = _context6.t0;

            case 20:
              _context6.prev = 20;
              _context6.prev = 21;

              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }

            case 23:
              _context6.prev = 23;

              if (!_didIteratorError7) {
                _context6.next = 26;
                break;
              }

              throw _iteratorError7;

            case 26:
              return _context6.finish(23);

            case 27:
              return _context6.finish(20);

            case 28:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    function ls(_x10, _x11, _x12, _x13) {
      return _ref6.apply(this, arguments);
    }

    return ls;
  }(),
  remove: function () {
    var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7(config, reporter, flags, args) {
      var updateBins;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return updateCwd(config);

            case 2:
              _context7.next = 4;
              return initUpdateBins(config, reporter, flags);

            case 4:
              updateBins = _context7.sent;
              _context7.next = 7;
              return (0, (_remove || _load_remove()).run)(config, reporter, flags, args);

            case 7:
              _context7.next = 9;
              return updateBins();

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function remove(_x14, _x15, _x16, _x17) {
      return _ref7.apply(this, arguments);
    }

    return remove;
  }(),
  upgrade: function () {
    var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(config, reporter, flags, args) {
      var updateBins;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return updateCwd(config);

            case 2:
              _context8.next = 4;
              return initUpdateBins(config, reporter, flags);

            case 4:
              updateBins = _context8.sent;
              _context8.next = 7;
              return (0, (_upgrade || _load_upgrade()).run)(config, reporter, flags, args);

            case 7:
              _context8.next = 9;
              return updateBins();

            case 9:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function upgrade(_x18, _x19, _x20, _x21) {
      return _ref8.apply(this, arguments);
    }

    return upgrade;
  }()
});

var run = _buildSubCommands.run;
var _setFlags = _buildSubCommands.setFlags;
exports.run = run;
function setFlags(commander) {
  _setFlags(commander);
  commander.option('--prefix <prefix>', 'bin prefix to use to install binaries');
}