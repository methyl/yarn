'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.examples = exports.setFlags = exports.run = exports.getName = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var getName = exports.getName = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(args, config) {
    var name, pkg;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = args.shift();

            if (name) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return config.readRootManifest();

          case 4:
            pkg = _context.sent;

            name = pkg.name;

          case 6:
            if (!name) {
              _context.next = 12;
              break;
            }

            if ((0, (_validate || _load_validate()).isValidPackageName)(name)) {
              _context.next = 9;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(config.reporter.lang('invalidPackageName'));

          case 9:
            return _context.abrupt('return', (_npmRegistry || _load_npmRegistry()).default.escapeName(name));

          case 12:
            throw new (_errors || _load_errors()).MessageError(config.reporter.lang('unknownPackageName'));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getName(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

var _login;

function _load_login() {
  return _login = require('./login.js');
}

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('../../registries/npm-registry.js'));
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _validate;

function _load_validate() {
  return _validate = require('../../util/normalize-manifest/validate.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('tag', {
  add: function () {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
      var _PackageRequest$norma, name, range, hasVersion, tag, revoke, result;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(args.length !== 2)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', false);

            case 2:
              _PackageRequest$norma = (_packageRequest || _load_packageRequest()).default.normalizePattern(args.shift());
              name = _PackageRequest$norma.name;
              range = _PackageRequest$norma.range;
              hasVersion = _PackageRequest$norma.hasVersion;

              if (hasVersion) {
                _context2.next = 8;
                break;
              }

              throw new (_errors || _load_errors()).MessageError(reporter.lang('requiredVersionInRange'));

            case 8:
              if ((0, (_validate || _load_validate()).isValidPackageName)(name)) {
                _context2.next = 10;
                break;
              }

              throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidPackageName'));

            case 10:
              tag = args.shift();


              reporter.step(1, 3, reporter.lang('loggingIn'));
              _context2.next = 14;
              return (0, (_login || _load_login()).getToken)(config, reporter, name);

            case 14:
              revoke = _context2.sent;


              reporter.step(2, 3, reporter.lang('creatingTag', tag, range));
              _context2.next = 18;
              return config.registries.npm.request('-/package/' + (_npmRegistry || _load_npmRegistry()).default.escapeName(name) + '/dist-tags/' + encodeURI(tag), {
                method: 'PUT',
                body: range
              });

            case 18:
              result = _context2.sent;


              if (result != null && result.ok) {
                reporter.success(reporter.lang('createdTag'));
              } else {
                reporter.error(reporter.lang('createdTagFail'));
              }

              reporter.step(3, 3, reporter.lang('revokingToken'));
              _context2.next = 23;
              return revoke();

            case 23:
              if (!(result != null && result.ok)) {
                _context2.next = 27;
                break;
              }

              return _context2.abrupt('return', true);

            case 27:
              throw new Error();

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function add(_x3, _x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    }

    return add;
  }(),
  rm: function () {
    var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args) {
      var name, tag, revoke, result;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(args.length !== 2)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', false);

            case 2:
              _context3.next = 4;
              return getName(args, config);

            case 4:
              name = _context3.sent;
              tag = args.shift();


              reporter.step(1, 3, reporter.lang('loggingIn'));
              _context3.next = 9;
              return (0, (_login || _load_login()).getToken)(config, reporter, name);

            case 9:
              revoke = _context3.sent;


              reporter.step(2, 3, reporter.lang('deletingTags'));
              _context3.next = 13;
              return config.registries.npm.request('-/package/' + name + '/dist-tags/' + encodeURI(tag), {
                method: 'DELETE'
              });

            case 13:
              result = _context3.sent;


              if (result === false) {
                reporter.error(reporter.lang('deletedTagFail'));
              } else {
                reporter.success(reporter.lang('deletedTag'));
              }

              reporter.step(3, 3, reporter.lang('revokingToken'));
              _context3.next = 18;
              return revoke();

            case 18:
              if (!(result === false)) {
                _context3.next = 22;
                break;
              }

              throw new Error();

            case 22:
              return _context3.abrupt('return', true);

            case 23:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function rm(_x7, _x8, _x9, _x10) {
      return _ref3.apply(this, arguments);
    }

    return rm;
  }(),
  ls: function () {
    var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(config, reporter, flags, args) {
      var name, revoke, tags, _name;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getName(args, config);

            case 2:
              name = _context4.sent;


              reporter.step(1, 3, reporter.lang('loggingIn'));
              _context4.next = 6;
              return (0, (_login || _load_login()).getToken)(config, reporter, name);

            case 6:
              revoke = _context4.sent;


              reporter.step(2, 3, reporter.lang('gettingTags'));
              _context4.next = 10;
              return config.registries.npm.request('-/package/' + name + '/dist-tags');

            case 10:
              tags = _context4.sent;


              if (tags) {
                reporter.info('Package ' + name);
                for (_name in tags) {
                  reporter.info(_name + ': ' + tags[_name]);
                }
              }

              reporter.step(3, 3, reporter.lang('revokingToken'));
              _context4.next = 15;
              return revoke();

            case 15:
              if (tags) {
                _context4.next = 17;
                break;
              }

              throw new (_errors || _load_errors()).MessageError(reporter.lang('packageNotFoundRegistry', name, 'npm'));

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function ls(_x11, _x12, _x13, _x14) {
      return _ref4.apply(this, arguments);
    }

    return ls;
  }()
}, ['add <pkg>@<version> [<tag>]', 'rm <pkg> <tag>', 'ls [<pkg>]']);

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
var examples = _buildSubCommands.examples;
exports.run = run;
exports.setFlags = setFlags;
exports.examples = examples;