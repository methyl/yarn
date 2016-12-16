'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _validate;

function _load_validate() {
  return _validate = _interopRequireDefault(require('./validate.js'));
}

var _fix;

function _load_fix() {
  return _fix = _interopRequireDefault(require('./fix.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

exports.default = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(info, moduleLoc, config, isRoot) {
    var name, version, human, warn;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            warn = function warn(msg) {
              if (human) {
                msg = human + ': ' + msg;
              }
              config.reporter.warn(msg);
            };

            // create human readable name
            name = info.name;
            version = info.version;
            human = void 0;

            if (typeof name === 'string') {
              human = name;
            }
            if (human && typeof version === 'string' && version) {
              human += '@' + version;
            }
            if (isRoot && info._loc) {
              human = path.relative(config.cwd, info._loc);
            }

            _context.next = 9;
            return (0, (_fix || _load_fix()).default)(info, moduleLoc, config.reporter, warn, config.looseSemver);

          case 9:
            _context.prev = 9;

            (0, (_validate || _load_validate()).default)(info, isRoot, config.reporter, warn);
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](9);

            if (human) {
              _context.t0.message = human + ': ' + _context.t0.message;
            }
            throw _context.t0;

          case 17:
            return _context.abrupt('return', info);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 13]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();