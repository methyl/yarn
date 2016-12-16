'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.getToken = undefined;

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var getCredentials = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter) {
    var _config$registries$ya, username, email;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _config$registries$ya = config.registries.yarn.config;
            username = _config$registries$ya.username;
            email = _config$registries$ya.email;

            if (!username) {
              _context.next = 7;
              break;
            }

            reporter.info(reporter.lang('npmUsername') + ': ' + username);
            _context.next = 12;
            break;

          case 7:
            _context.next = 9;
            return reporter.question(reporter.lang('npmUsername'));

          case 9:
            username = _context.sent;

            if (username) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', null);

          case 12:
            if (!email) {
              _context.next = 16;
              break;
            }

            reporter.info(reporter.lang('npmUsername') + ': ' + email);
            _context.next = 21;
            break;

          case 16:
            _context.next = 18;
            return reporter.question(reporter.lang('npmEmail'));

          case 18:
            email = _context.sent;

            if (email) {
              _context.next = 21;
              break;
            }

            return _context.abrupt('return', null);

          case 21:
            _context.next = 23;
            return config.registries.yarn.saveHomeConfig({ username: username, email: email });

          case 23:
            return _context.abrupt('return', { username: username, email: email });

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCredentials(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getToken = exports.getToken = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var auth, env, creds, username, email, password, userobj, res, _ret;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            auth = config.registries.npm.getAuth(name);

            if (!auth) {
              _context3.next = 4;
              break;
            }

            config.registries.npm.setToken(auth);
            return _context3.abrupt('return', function revoke() {
              reporter.info(reporter.lang('notRevokingConfigToken'));
              return (_promise || _load_promise()).default.resolve();
            });

          case 4:
            env = process.env.YARN_AUTH_TOKEN || process.env.NPM_AUTH_TOKEN;

            if (!env) {
              _context3.next = 8;
              break;
            }

            config.registries.npm.setToken('Bearer ' + env);
            return _context3.abrupt('return', function revoke() {
              reporter.info(reporter.lang('notRevokingEnvToken'));
              return (_promise || _load_promise()).default.resolve();
            });

          case 8:
            _context3.next = 10;
            return getCredentials(config, reporter);

          case 10:
            creds = _context3.sent;

            if (creds) {
              _context3.next = 14;
              break;
            }

            reporter.warn(reporter.lang('loginAsPublic'));
            return _context3.abrupt('return', function revoke() {
              reporter.info(reporter.lang('noTokenToRevoke'));
              return (_promise || _load_promise()).default.resolve();
            });

          case 14:
            username = creds.username;
            email = creds.email;
            _context3.next = 18;
            return reporter.question(reporter.lang('npmPassword'), { password: true, required: true });

          case 18:
            password = _context3.sent;


            //
            userobj = {
              _id: 'org.couchdb.user:' + username,
              name: username,
              password: password,
              email: email,
              type: 'user',
              roles: [],
              date: new Date().toISOString()
            };

            //

            _context3.next = 22;
            return config.registries.npm.request('-/user/org.couchdb.user:' + encodeURIComponent(username), {
              method: 'PUT',
              body: userobj,
              auth: { username: username, password: password, email: email }
            });

          case 22:
            res = _context3.sent;

            if (!(res && res.ok)) {
              _context3.next = 29;
              break;
            }

            _ret = function () {
              reporter.success(reporter.lang('loggedIn'));

              var token = res.token;
              config.registries.npm.setToken('Bearer ' + token);

              return {
                v: function () {
                  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2() {
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            reporter.success(reporter.lang('revokedToken'));
                            _context2.next = 3;
                            return config.registries.npm.request('-/user/token/' + token, {
                              method: 'DELETE'
                            });

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  function revoke() {
                    return _ref3.apply(this, arguments);
                  }

                  return revoke;
                }()
              };
            }();

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(_ret)) === "object")) {
              _context3.next = 27;
              break;
            }

            return _context3.abrupt('return', _ret.v);

          case 27:
            _context3.next = 30;
            break;

          case 29:
            throw new (_errors || _load_errors()).MessageError(reporter.lang('incorrectCredentials'));

          case 30:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getToken(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(config, reporter, flags, args) {
    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getCredentials(config, reporter);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function run(_x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }