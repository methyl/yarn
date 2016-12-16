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

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _errors;

function _load_errors() {
  return _errors = require('./errors.js');
}

var _index;

function _load_index() {
  return _index = _interopRequireWildcard(require('./fetchers/index.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./util/fs.js'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireWildcard(require('./util/promise.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PackageFetcher = function () {
  function PackageFetcher(config, resolver) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageFetcher);

    this.reporter = config.reporter;
    this.resolver = resolver;
    this.config = config;
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageFetcher, [{
    key: 'fetchCache',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(dest, fetcher) {
        var _ref2, hash, pkg;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.config.readPackageMetadata(dest);

              case 2:
                _ref2 = _context.sent;
                hash = _ref2.hash;
                pkg = _ref2.package;
                _context.t0 = pkg;
                _context.next = 8;
                return fetcher.getResolvedFromCached(hash);

              case 8:
                _context.t1 = _context.sent;
                _context.t2 = hash;
                _context.t3 = dest;
                return _context.abrupt('return', {
                  package: _context.t0,
                  resolved: _context.t1,
                  hash: _context.t2,
                  dest: _context.t3,
                  cached: true
                });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchCache(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return fetchCache;
    }()
  }, {
    key: 'fetch',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(ref) {
        var dest, remote, Fetcher, fetcher;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dest = this.config.generateHardModulePath(ref);
                remote = ref.remote;
                Fetcher = (_index || _load_index())[remote.type];

                if (Fetcher) {
                  _context2.next = 5;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError('Unknown fetcher for ' + remote.type);

              case 5:
                fetcher = new Fetcher(dest, remote, this.config);
                _context2.next = 8;
                return this.config.isValidModuleDest(dest);

              case 8:
                if (!_context2.sent) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', this.fetchCache(dest, fetcher));

              case 10:
                _context2.next = 12;
                return (_fs || _load_fs()).unlink(dest);

              case 12:
                _context2.prev = 12;
                _context2.next = 15;
                return fetcher.fetch();

              case 15:
                return _context2.abrupt('return', _context2.sent);

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2['catch'](12);
                _context2.prev = 20;
                _context2.next = 23;
                return (_fs || _load_fs()).unlink(dest);

              case 23:
                _context2.next = 27;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t1 = _context2['catch'](20);

              case 27:
                throw _context2.t0;

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[12, 18], [20, 25]]);
      }));

      function fetch(_x3) {
        return _ref3.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: 'maybeFetch',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(ref) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.fetch(ref);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3['catch'](0);

                if (!ref.optional) {
                  _context3.next = 13;
                  break;
                }

                this.reporter.error(_context3.t0.message);
                return _context3.abrupt('return', null);

              case 13:
                throw _context3.t0;

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function maybeFetch(_x4) {
        return _ref4.apply(this, arguments);
      }

      return maybeFetch;
    }()
  }, {
    key: 'init',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5() {
        var _this = this;

        var pkgs, tick;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pkgs = this.resolver.getPackageReferences();
                tick = this.reporter.progress(pkgs.length);
                _context5.next = 4;
                return (_promise || _load_promise()).queue(pkgs, function () {
                  var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(ref) {
                    var res, newPkg;
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _this.maybeFetch(ref);

                          case 2:
                            res = _context4.sent;
                            newPkg = void 0;


                            if (res) {
                              newPkg = res.package;

                              // update with new remote
                              // but only if there was a hash previously as the tarball fetcher does not provide a hash.
                              if (ref.remote.hash) {
                                ref.remote.hash = res.hash;
                              }

                              if (res.resolved) {
                                ref.remote.resolved = res.resolved;
                              }
                            }

                            if (!newPkg) {
                              _context4.next = 8;
                              break;
                            }

                            _context4.next = 8;
                            return _this.resolver.updateManifest(ref, newPkg);

                          case 8:

                            if (tick) {
                              tick(ref.name);
                            }

                          case 9:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this);
                  }));

                  return function (_x5) {
                    return _ref6.apply(this, arguments);
                  };
                }(), this.config.networkConcurrency);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function init() {
        return _ref5.apply(this, arguments);
      }

      return init;
    }()
  }]);
  return PackageFetcher;
}();

exports.default = PackageFetcher;