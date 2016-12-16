'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, linkLoc, manifest, _name, _linkLoc;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!args.length) {
              _context.next = 44;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(args);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 28;
              break;
            }

            name = _step.value;
            linkLoc = path.join(config.linkFolder, name);
            _context.next = 11;
            return (_fs || _load_fs()).exists(linkLoc);

          case 11:
            if (!_context.sent) {
              _context.next = 24;
              break;
            }

            _context.t0 = _fs || _load_fs();
            _context.t1 = path;
            _context.next = 16;
            return (0, (_link || _load_link()).getRegistryFolder)(config, name);

          case 16:
            _context.t2 = _context.sent;
            _context.t3 = name;
            _context.t4 = _context.t1.join.call(_context.t1, _context.t2, _context.t3);
            _context.next = 21;
            return _context.t0.unlink.call(_context.t0, _context.t4);

          case 21:
            reporter.success(reporter.lang('linkUnregistered', name));
            _context.next = 25;
            break;

          case 24:
            throw new (_errors || _load_errors()).MessageError(reporter.lang('linkMissing', name));

          case 25:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 28:
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t5 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t5;

          case 34:
            _context.prev = 34;
            _context.prev = 35;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 37:
            _context.prev = 37;

            if (!_didIteratorError) {
              _context.next = 40;
              break;
            }

            throw _iteratorError;

          case 40:
            return _context.finish(37);

          case 41:
            return _context.finish(34);

          case 42:
            _context.next = 60;
            break;

          case 44:
            _context.next = 46;
            return config.readRootManifest();

          case 46:
            manifest = _context.sent;
            _name = manifest.name;

            if (_name) {
              _context.next = 50;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('unknownPackageName'));

          case 50:
            _linkLoc = path.join(config.linkFolder, _name);
            _context.next = 53;
            return (_fs || _load_fs()).exists(_linkLoc);

          case 53:
            if (!_context.sent) {
              _context.next = 59;
              break;
            }

            _context.next = 56;
            return (_fs || _load_fs()).unlink(_linkLoc);

          case 56:
            reporter.success(reporter.lang('linkUnregistered', _name));
            _context.next = 60;
            break;

          case 59:
            throw new (_errors || _load_errors()).MessageError(reporter.lang('linkMissing', _name));

          case 60:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 30, 34, 42], [35,, 37, 41]]);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
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

var _link;

function _load_link() {
  return _link = require('./link.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');