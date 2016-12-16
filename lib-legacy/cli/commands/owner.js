'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlags = exports.run = exports.mutate = undefined;

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

var mutate = exports.mutate = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(args, config, reporter, buildMessages, mutator) {
    var username, name, msgs, revoke, user, error, _pkg, res;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(args.length !== 2 && args.length !== 1)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', false);

          case 2:
            username = args.shift();
            _context.next = 5;
            return (0, (_tag || _load_tag()).getName)(args, config);

          case 5:
            name = _context.sent;

            if ((0, (_validate || _load_validate()).isValidPackageName)(name)) {
              _context.next = 8;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidPackageName'));

          case 8:
            msgs = buildMessages(username, name);

            reporter.step(1, 3, reporter.lang('loggingIn'));
            _context.next = 12;
            return (0, (_login || _load_login()).getToken)(config, reporter, name);

          case 12:
            revoke = _context.sent;


            reporter.step(2, 3, msgs.info);
            _context.next = 16;
            return config.registries.npm.request('-/user/org.couchdb.user:' + username);

          case 16:
            user = _context.sent;
            error = false;

            if (!user) {
              _context.next = 30;
              break;
            }

            _context.next = 21;
            return config.registries.npm.request((_npmRegistry || _load_npmRegistry()).default.escapeName(name));

          case 21:
            _pkg = _context.sent;

            if (_pkg) {
              _pkg.maintainers = _pkg.maintainers || [];
              error = mutator({ name: user.name, email: user.email }, _pkg);
            } else {
              error = true;
              reporter.error(reporter.lang('unknownPackage', name));
            }

            // update package

            if (!(_pkg && !error)) {
              _context.next = 28;
              break;
            }

            _context.next = 26;
            return config.registries.npm.request((_npmRegistry || _load_npmRegistry()).default.escapeName(name) + '/-rev/' + _pkg._rev, {
              method: 'PUT',
              body: {
                _id: _pkg._id,
                _rev: _pkg._rev,
                maintainers: _pkg.maintainers
              }
            });

          case 26:
            res = _context.sent;


            if (res != null && res.success) {
              reporter.success(msgs.success);
            } else {
              error = true;
              reporter.error(msgs.error);
            }

          case 28:
            _context.next = 32;
            break;

          case 30:
            error = true;
            reporter.error(reporter.lang('unknownUser', username));

          case 32:

            reporter.step(3, 3, reporter.lang('revokingToken'));
            _context.next = 35;
            return revoke();

          case 35:
            if (!error) {
              _context.next = 39;
              break;
            }

            throw new Error();

          case 39:
            return _context.abrupt('return', true);

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function mutate(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

var _validate;

function _load_validate() {
  return _validate = require('../../util/normalize-manifest/validate.js');
}

var _tag;

function _load_tag() {
  return _tag = require('./tag.js');
}

var _login;

function _load_login() {
  return _login = require('./login.js');
}

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('../../registries/npm-registry.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('owner', {
  add: function add(config, reporter, flags, args) {
    return mutate(args, config, reporter, function (username, name) {
      return {
        info: reporter.lang('ownerAdding', username, name),
        success: reporter.lang('ownerAdded'),
        error: reporter.lang('ownerAddingFailed')
      };
    }, function (user, pkg) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(pkg.maintainers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var owner = _step.value;

          if (owner.name === user) {
            reporter.error(reporter.lang('ownerAlready'));
            return true;
          }
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

      pkg.maintainers.push(user);

      return false;
    });
  },
  rm: function rm(config, reporter, flags, args) {
    return mutate(args, config, reporter, function (username, name) {
      return {
        info: reporter.lang('ownerRemoving', username, name),
        success: reporter.lang('ownerRemoved'),
        error: reporter.lang('ownerRemoveError')
      };
    }, function (user, pkg) {
      var found = false;

      pkg.maintainers = pkg.maintainers.filter(function (o) {
        var match = o.name === user.name;
        found = found || match;
        return !match;
      });

      if (!found) {
        reporter.error(reporter.lang('userNotAnOwner', user.name));
      }

      return found;
    });
  },
  ls: function () {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
      var name, revoke, pkg, owners, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, owner;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(args.length > 1)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', false);

            case 2:
              _context2.next = 4;
              return (0, (_tag || _load_tag()).getName)(args, config);

            case 4:
              name = _context2.sent;


              reporter.step(1, 3, reporter.lang('loggingIn'));
              _context2.next = 8;
              return (0, (_login || _load_login()).getToken)(config, reporter, name);

            case 8:
              revoke = _context2.sent;


              reporter.step(2, 3, reporter.lang('ownerGetting', name));
              _context2.next = 12;
              return config.registries.npm.request(name);

            case 12:
              pkg = _context2.sent;

              if (!pkg) {
                _context2.next = 40;
                break;
              }

              owners = pkg.maintainers;

              if (!(!owners || !owners.length)) {
                _context2.next = 19;
                break;
              }

              reporter.warn(reporter.lang('ownerNone'));
              _context2.next = 38;
              break;

            case 19:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 22;

              for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(owners); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                owner = _step2.value;

                reporter.info(owner.name + ' <' + owner.email + '>');
              }
              _context2.next = 30;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2['catch'](22);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 30:
              _context2.prev = 30;
              _context2.prev = 31;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 33:
              _context2.prev = 33;

              if (!_didIteratorError2) {
                _context2.next = 36;
                break;
              }

              throw _iteratorError2;

            case 36:
              return _context2.finish(33);

            case 37:
              return _context2.finish(30);

            case 38:
              _context2.next = 41;
              break;

            case 40:
              reporter.error(reporter.lang('ownerGettingFailed'));

            case 41:

              reporter.step(3, 3, reporter.lang('revokingToken'));
              _context2.next = 44;
              return revoke();

            case 44:
              if (!pkg) {
                _context2.next = 48;
                break;
              }

              return _context2.abrupt('return', true);

            case 48:
              throw new Error();

            case 49:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[22, 26, 30, 38], [31,, 33, 37]]);
    }));

    function ls(_x6, _x7, _x8, _x9) {
      return _ref2.apply(this, arguments);
    }

    return ls;
  }()
}, ['add <user> [[<@scope>/]<pkg>]', 'rm <user> [[<@scope>/]<pkg>]', 'ls [<@scope>/]<pkg>']);

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
exports.run = run;
exports.setFlags = setFlags;