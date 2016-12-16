'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.getRegistryFolder = undefined;

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

var getRegistryFolder = exports.getRegistryFolder = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, name) {
    var src, _ref2, _registry, registryFolder;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!config.modulesFolder) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', config.modulesFolder);

          case 2:
            src = path.join(config.linkFolder, name);
            _context.next = 5;
            return config.readManifest(src);

          case 5:
            _ref2 = _context.sent;
            _registry = _ref2._registry;

            invariant(_registry, 'expected registry');

            registryFolder = config.registries[_registry].folder;
            return _context.abrupt('return', path.join(config.cwd, registryFolder));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRegistryFolder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, src, folder, dest, manifest, _name, linkLoc;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!args.length) {
              _context2.next = 45;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 4;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(args);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 29;
              break;
            }

            name = _step.value;
            src = path.join(config.linkFolder, name);
            _context2.next = 11;
            return (_fs || _load_fs()).exists(src);

          case 11:
            if (!_context2.sent) {
              _context2.next = 25;
              break;
            }

            _context2.next = 14;
            return getRegistryFolder(config, name);

          case 14:
            folder = _context2.sent;
            dest = path.join(folder, name);
            _context2.next = 18;
            return (_fs || _load_fs()).unlink(dest);

          case 18:
            _context2.next = 20;
            return (_fs || _load_fs()).mkdirp(path.dirname(dest));

          case 20:
            _context2.next = 22;
            return (_fs || _load_fs()).symlink(src, dest);

          case 22:
            reporter.success(reporter.lang('linkRegistered', name));
            _context2.next = 26;
            break;

          case 25:
            throw new (_errors || _load_errors()).MessageError(reporter.lang('linkMissing', name));

          case 26:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 29:
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 35:
            _context2.prev = 35;
            _context2.prev = 36;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 38:
            _context2.prev = 38;

            if (!_didIteratorError) {
              _context2.next = 41;
              break;
            }

            throw _iteratorError;

          case 41:
            return _context2.finish(38);

          case 42:
            return _context2.finish(35);

          case 43:
            _context2.next = 64;
            break;

          case 45:
            _context2.next = 47;
            return config.readRootManifest();

          case 47:
            manifest = _context2.sent;
            _name = manifest.name;

            if (_name) {
              _context2.next = 51;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('unknownPackageName'));

          case 51:
            linkLoc = path.join(config.linkFolder, _name);
            _context2.next = 54;
            return (_fs || _load_fs()).exists(linkLoc);

          case 54:
            if (!_context2.sent) {
              _context2.next = 58;
              break;
            }

            reporter.warn(reporter.lang('linkCollision', _name));
            _context2.next = 64;
            break;

          case 58:
            _context2.next = 60;
            return (_fs || _load_fs()).mkdirp(path.dirname(linkLoc));

          case 60:
            _context2.next = 62;
            return (_fs || _load_fs()).symlink(config.cwd, linkLoc);

          case 62:
            reporter.success(reporter.lang('linkRegistered', _name));
            reporter.info(reporter.lang('linkInstallMessage', _name));

          case 64:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 31, 35, 43], [36,, 38, 42]]);
  }));

  return function run(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');