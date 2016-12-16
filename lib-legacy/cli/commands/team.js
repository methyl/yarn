'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlags = exports.run = undefined;

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _toArray2;

function _load_toArray() {
  return _toArray2 = _interopRequireDefault(require('babel-runtime/helpers/toArray'));
}

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

var _login;

function _load_login() {
  return _login = require('./login.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function explodeScopeTeam(arg, requireTeam, reporter) {
  var _arg$split = arg.split(':');

  var _arg$split2 = (0, (_toArray2 || _load_toArray()).default)(_arg$split);

  var scope = _arg$split2[0];
  var team = _arg$split2[1];

  var parts = _arg$split2.slice(2);

  if (parts.length) {
    return false;
  }

  if (requireTeam && !team) {
    return false;
  }

  return {
    scope: scope || '',
    team: team || '',
    user: ''
  };
}

function wrapRequired(callback, requireTeam) {
  return function () {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
      var parts, revoke, res;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (args.length) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', false);

            case 2:
              parts = explodeScopeTeam(args[0], requireTeam, reporter);

              if (parts) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', false);

            case 5:

              reporter.step(1, 3, reporter.lang('loggingIn'));
              _context.next = 8;
              return (0, (_login || _load_login()).getToken)(config, reporter);

            case 8:
              revoke = _context.sent;
              _context.next = 11;
              return callback(parts, config, reporter, flags, args);

            case 11:
              res = _context.sent;

              if (res) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res);

            case 14:

              reporter.step(3, 3, reporter.lang('revokingToken'));
              _context.next = 17;
              return revoke();

            case 17:
              return _context.abrupt('return', true);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

function wrapRequiredTeam(callback) {
  var requireTeam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return wrapRequired(function (parts, config, reporter, flags, args) {
    if (args.length === 1) {
      return callback(parts, config, reporter, flags, args);
    } else {
      return false;
    }
  }, requireTeam);
}

function wrapRequiredUser(callback) {
  return wrapRequired(function (parts, config, reporter, flags, args) {
    if (args.length === 2) {
      return callback((0, (_extends2 || _load_extends()).default)({
        user: args[1]
      }, parts), config, reporter, flags, args);
    } else {
      return false;
    }
  }, true);
}

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('team', {
  create: wrapRequiredTeam(function () {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(parts, config, reporter, flags, args) {
      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              reporter.step(2, 3, reporter.lang('teamCreating'));
              _context2.t0 = reporter;
              _context2.next = 4;
              return config.registries.npm.request('team/' + parts.scope, {
                method: 'PUT',
                body: {
                  team: parts.team
                }
              });

            case 4:
              _context2.t1 = _context2.sent;

              _context2.t0.inspect.call(_context2.t0, _context2.t1);

              return _context2.abrupt('return', true);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x6, _x7, _x8, _x9, _x10) {
      return _ref2.apply(this, arguments);
    };
  }()),

  destroy: wrapRequiredTeam(function () {
    var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(parts, config, reporter, flags, args) {
      return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              reporter.step(2, 3, reporter.lang('teamRemoving'));
              _context3.t0 = reporter;
              _context3.next = 4;
              return config.registries.npm.request('team/' + parts.scope + '/' + parts.team, {
                method: 'DELETE'
              });

            case 4:
              _context3.t1 = _context3.sent;

              _context3.t0.inspect.call(_context3.t0, _context3.t1);

              return _context3.abrupt('return', true);

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x11, _x12, _x13, _x14, _x15) {
      return _ref3.apply(this, arguments);
    };
  }()),

  add: wrapRequiredUser(function () {
    var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(parts, config, reporter, flags, args) {
      return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              reporter.step(2, 3, reporter.lang('teamAddingUser'));
              _context4.t0 = reporter;
              _context4.next = 4;
              return config.registries.npm.request('team/' + parts.scope + '/' + parts.team + '/user', {
                method: 'PUT',
                body: {
                  user: parts.user
                }
              });

            case 4:
              _context4.t1 = _context4.sent;

              _context4.t0.inspect.call(_context4.t0, _context4.t1);

              return _context4.abrupt('return', true);

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x16, _x17, _x18, _x19, _x20) {
      return _ref4.apply(this, arguments);
    };
  }()),

  rm: wrapRequiredUser(function () {
    var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(parts, config, reporter, flags, args) {
      return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              reporter.step(2, 3, reporter.lang('teamRemovingUser'));
              _context5.t0 = reporter;
              _context5.next = 4;
              return config.registries.npm.request('team/' + parts.scope + '/' + parts.team + '/user', {
                method: 'DELETE',
                body: {
                  user: parts.user
                }
              });

            case 4:
              _context5.t1 = _context5.sent;

              _context5.t0.inspect.call(_context5.t0, _context5.t1);

              return _context5.abrupt('return', true);

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x21, _x22, _x23, _x24, _x25) {
      return _ref5.apply(this, arguments);
    };
  }()),

  ls: wrapRequiredTeam(function () {
    var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(parts, config, reporter, flags, args) {
      var uriParams;
      return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              reporter.step(2, 3, reporter.lang('teamListing'));
              uriParams = '?format=cli';

              if (!parts.team) {
                _context6.next = 10;
                break;
              }

              _context6.t0 = reporter;
              _context6.next = 6;
              return config.registries.npm.request('team/' + parts.scope + '/' + parts.team + '/user' + uriParams);

            case 6:
              _context6.t1 = _context6.sent;

              _context6.t0.inspect.call(_context6.t0, _context6.t1);

              _context6.next = 15;
              break;

            case 10:
              _context6.t2 = reporter;
              _context6.next = 13;
              return config.registries.npm.request('org/' + parts.scope + '/team' + uriParams);

            case 13:
              _context6.t3 = _context6.sent;

              _context6.t2.inspect.call(_context6.t2, _context6.t3);

            case 15:
              return _context6.abrupt('return', true);

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x26, _x27, _x28, _x29, _x30) {
      return _ref6.apply(this, arguments);
    };
  }(), false)
}, ['create <scope:team>', 'destroy <scope:team>', 'add <scope:team> <user>', 'rm <scope:team> <user>', 'ls <scope>|<scope:team>']);

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
exports.run = run;
exports.setFlags = setFlags;