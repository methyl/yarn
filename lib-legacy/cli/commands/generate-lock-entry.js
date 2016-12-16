'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.examples = exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _defineProperty2;

function _load_defineProperty() {
  return _defineProperty2 = _interopRequireDefault(require('babel-runtime/helpers/defineProperty'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var manifest, entry, pattern;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manifest = void 0;

            if (!flags.useManifest) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return config.readJson(flags.useManifest);

          case 4:
            manifest = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return config.readRootManifest();

          case 9:
            manifest = _context.sent;

          case 10:
            if (manifest.name) {
              _context.next = 12;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('noName'));

          case 12:
            if (manifest.version) {
              _context.next = 14;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('noVersion'));

          case 14:
            entry = {
              name: manifest.name,
              version: manifest.version,
              resolved: flags.resolved,
              registry: flags.registry || manifest._registry,
              optionalDependencies: manifest.optionalDependencies,
              dependencies: manifest.dependencies
            };
            pattern = flags.pattern || entry.name + '@' + entry.version;

            console.log((0, (_stringify2 || _load_stringify()).default)((0, (_defineProperty2 || _load_defineProperty()).default)({}, pattern, (0, (_wrapper || _load_wrapper()).implodeEntry)(pattern, entry))));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.hasWrapper = hasWrapper;
exports.setFlags = setFlags;

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = require('../../lockfile/wrapper.js');
}

var _stringify2;

function _load_stringify() {
  return _stringify2 = _interopRequireDefault(require('../../lockfile/stringify.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasWrapper() {
  return false;
}

function setFlags(commander) {
  commander.option('--use-manifest <location>', 'description');
  commander.option('--resolved <resolved>', 'description');
  commander.option('--registry <registry>', 'description');
}

var examples = exports.examples = ['generate-lock-entry', 'generate-lock-entry --use-manifest ./package.json', 'generate-lock-entry --resolved local-file.tgz#hash'];