'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

exports.default = function (rootCommandName, subCommands) {
  var run = function () {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
      var subName, command, res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, msg;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subName = (0, (_misc || _load_misc()).camelCase)(args.shift() || '');

              if (!(subName && subCommands[subName])) {
                _context.next = 8;
                break;
              }

              command = subCommands[subName];
              _context.next = 5;
              return command(config, reporter, flags, args);

            case 5:
              res = _context.sent;

              if (!(res !== false)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', (_promise || _load_promise()).default.resolve());

            case 8:
              if (!(usage && usage.length)) {
                _context.next = 29;
                break;
              }

              reporter.error(reporter.lang('usage') + ':');
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 13;
              for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)(usage); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                msg = _step.value;

                reporter.error('yarn ' + rootCommandName + ' ' + msg);
              }
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](13);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              return _context.abrupt('return', (_promise || _load_promise()).default.reject(new (_errors || _load_errors()).MessageError(reporter.lang('invalidCommand', subCommandNames.join(', ')))));

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[13, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function run(_x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();

  var usage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var subCommandNames = (0, (_keys || _load_keys()).default)(subCommands).map((_misc || _load_misc()).hyphenate);

  function setFlags(commander) {
    commander.usage(rootCommandName + ' [' + subCommandNames.join('|') + '] [flags]');
  }

  var examples = usage.map(function (cmd) {
    return rootCommandName + ' ' + cmd;
  });

  return { run: run, setFlags: setFlags, examples: examples };
};

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _misc;

function _load_misc() {
  return _misc = require('../../util/misc.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }