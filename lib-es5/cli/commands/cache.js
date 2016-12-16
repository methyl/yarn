'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlags = exports.run = undefined;

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

exports.hasWrapper = hasWrapper;

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _constants;

function _load_constants() {
  return _constants = require('../../constants');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

function hasWrapper(flags, args) {
  return args[0] !== 'dir';
}

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('cache', {
  ls: function () {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
      var readCacheMetadata = function () {
        var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
          var parentDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : config.cacheFolder;
          var metadataFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_constants || _load_constants()).METADATA_FILENAME;

          var folders, packagesMetadata, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, folder, loc, _ref3, registry, manifest, remote;

          return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (_fs || _load_fs()).readdir(parentDir);

                case 2:
                  folders = _context.sent;
                  packagesMetadata = [];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 7;
                  _iterator = (0, (_getIterator2 || _load_getIterator()).default)(folders);

                case 9:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 36;
                    break;
                  }

                  folder = _step.value;

                  if (!(folder[0] === '.')) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt('continue', 33);

                case 13:
                  loc = path.join(config.cacheFolder, parentDir.replace(config.cacheFolder, ''), folder);
                  // Check if this is a scoped package

                  _context.next = 16;
                  return (_fs || _load_fs()).exists(path.join(loc, metadataFile));

                case 16:
                  if (_context.sent) {
                    _context.next = 26;
                    break;
                  }

                  _context.t0 = packagesMetadata.push;
                  _context.t1 = packagesMetadata;
                  _context.next = 21;
                  return readCacheMetadata(loc);

                case 21:
                  _context.t2 = _context.sent;
                  _context.t3 = (0, (_toConsumableArray2 || _load_toConsumableArray()).default)(_context.t2);

                  _context.t0.apply.call(_context.t0, _context.t1, _context.t3);

                  _context.next = 33;
                  break;

                case 26:
                  _context.next = 28;
                  return config.readPackageMetadata(loc);

                case 28:
                  _ref3 = _context.sent;
                  registry = _ref3.registry;
                  manifest = _ref3.package;
                  remote = _ref3.remote;

                  packagesMetadata.push([manifest.name, manifest.version, registry, remote && remote.resolved || '']);

                case 33:
                  _iteratorNormalCompletion = true;
                  _context.next = 9;
                  break;

                case 36:
                  _context.next = 42;
                  break;

                case 38:
                  _context.prev = 38;
                  _context.t4 = _context['catch'](7);
                  _didIteratorError = true;
                  _iteratorError = _context.t4;

                case 42:
                  _context.prev = 42;
                  _context.prev = 43;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 45:
                  _context.prev = 45;

                  if (!_didIteratorError) {
                    _context.next = 48;
                    break;
                  }

                  throw _iteratorError;

                case 48:
                  return _context.finish(45);

                case 49:
                  return _context.finish(42);

                case 50:
                  return _context.abrupt('return', packagesMetadata);

                case 51:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[7, 38, 42, 50], [43,, 45, 49]]);
        }));

        return function readCacheMetadata() {
          return _ref2.apply(this, arguments);
        };
      }();

      var body;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return readCacheMetadata();

            case 2:
              body = _context2.sent;


              reporter.table(['Name', 'Version', 'Registry', 'Resolved'], body);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function ls(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    }

    return ls;
  }(),
  dir: function dir(config) {
    console.log(config.cacheFolder);
  },
  clean: function () {
    var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args) {
      var cacheFolder;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cacheFolder = config.cacheFolder;

              if (!cacheFolder) {
                _context3.next = 7;
                break;
              }

              _context3.next = 4;
              return (_fs || _load_fs()).unlink(cacheFolder);

            case 4:
              _context3.next = 6;
              return (_fs || _load_fs()).mkdirp(cacheFolder);

            case 6:
              reporter.success(reporter.lang('clearedCache'));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function clean(_x7, _x8, _x9, _x10) {
      return _ref4.apply(this, arguments);
    }

    return clean;
  }()
});

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
exports.run = run;
exports.setFlags = setFlags;