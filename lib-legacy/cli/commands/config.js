'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlags = exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _defineProperty2;

function _load_defineProperty() {
  return _defineProperty2 = _interopRequireDefault(require('babel-runtime/helpers/defineProperty'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasWrapper(flags, args) {
  return args[0] !== 'get';
}
/* eslint object-shorthand: 0 */

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('config', {
  set: function () {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
      var _args, key, _args$, val, yarnConfig;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(args.length === 0 || args.length > 2)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', false);

            case 2:
              _args = (0, (_slicedToArray2 || _load_slicedToArray()).default)(args, 2);
              key = _args[0];
              _args$ = _args[1];
              val = _args$ === undefined ? true : _args$;
              yarnConfig = config.registries.yarn;
              _context.next = 9;
              return yarnConfig.saveHomeConfig((0, (_defineProperty2 || _load_defineProperty()).default)({}, key, val));

            case 9:
              reporter.success(reporter.lang('configSet', key, val));
              return _context.abrupt('return', true);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function set(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    }

    return set;
  }(),
  get: function get(config, reporter, flags, args) {
    if (args.length !== 1) {
      return false;
    }

    reporter.log(String(config.getOption(args[0])));
    return true;
  },


  delete: function () {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
      var key, yarnConfig;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(args.length !== 1)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', false);

            case 2:
              key = args[0];
              yarnConfig = config.registries.yarn;
              _context2.next = 6;
              return yarnConfig.saveHomeConfig((0, (_defineProperty2 || _load_defineProperty()).default)({}, key, undefined));

            case 6:
              reporter.success(reporter.lang('configDelete', key));
              return _context2.abrupt('return', true);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _delete(_x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    }

    return _delete;
  }(),

  list: function list(config, reporter, flags, args) {
    if (args.length) {
      return false;
    }

    reporter.info(reporter.lang('configYarn'));
    reporter.inspect(config.registries.yarn.config);

    reporter.info(reporter.lang('configNpm'));
    reporter.inspect(config.registries.npm.config);

    return true;
  }
});

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
exports.run = run;
exports.setFlags = setFlags;