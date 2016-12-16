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

var _getPrototypeOf;

function _load_getPrototypeOf() {
  return _getPrototypeOf = _interopRequireDefault(require('babel-runtime/core-js/object/get-prototype-of'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

exports.explodeHostedGitFragment = explodeHostedGitFragment;

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _gitResolver;

function _load_gitResolver() {
  return _gitResolver = _interopRequireDefault(require('./git-resolver.js'));
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

var _git;

function _load_git() {
  return _git = _interopRequireDefault(require('../../util/git.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function explodeHostedGitFragment(fragment, reporter) {
  // TODO: make sure this only has a length of 2
  var parts = fragment.split(':');
  fragment = parts.pop();

  var userParts = fragment.split('/');

  if (userParts.length >= 2) {
    var _user = userParts.shift();
    var repoParts = userParts.join('/').split(/(?:[.]git)?#(.*)/);

    if (repoParts.length <= 3) {
      return {
        user: _user,
        repo: repoParts[0],
        hash: repoParts[1] || ''
      };
    }
  }

  throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidHostedGitFragment', fragment));
}

var HostedGitResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(HostedGitResolver, _ExoticResolver);

  function HostedGitResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, HostedGitResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (HostedGitResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(HostedGitResolver)).call(this, request, fragment));

    var exploded = _this.exploded = explodeHostedGitFragment(fragment, _this.reporter);
    var user = exploded.user;
    var repo = exploded.repo;
    var hash = exploded.hash;

    _this.user = user;
    _this.repo = repo;
    _this.hash = hash;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(HostedGitResolver, [{
    key: 'getRefOverHTTP',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(url) {
        var client, out, lines, refs;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = new (_git || _load_git()).default(this.config, url, this.hash);
                _context.next = 3;
                return this.config.requestManager.request({
                  url: url + '/info/refs?service=git-upload-pack',
                  queue: this.resolver.fetchingQueue
                });

              case 3:
                out = _context.sent;

                if (!out) {
                  _context.next = 12;
                  break;
                }

                // clean up output
                lines = out.trim().split('\n');

                // remove first two lines which contains compatibility info etc

                lines = lines.slice(2);

                // remove last line which contains the terminator "0000"
                lines.pop();

                // remove line lengths from start of each line
                lines = lines.map(function (line) {
                  return line.slice(4);
                });

                out = lines.join('\n');
                _context.next = 13;
                break;

              case 12:
                throw new Error(this.reporter.lang('hostedGitResolveError'));

              case 13:
                refs = (_git || _load_git()).default.parseRefs(out);
                _context.next = 16;
                return client.setRef(refs);

              case 16:
                return _context.abrupt('return', _context.sent);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRefOverHTTP(_x) {
        return _ref.apply(this, arguments);
      }

      return getRefOverHTTP;
    }()
  }, {
    key: 'resolveOverHTTP',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(url) {
        var _this2 = this;

        var shrunk, commit, config, tryRegistry, file, registry, _file;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shrunk = this.request.getLocked('tarball');

                if (!shrunk) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return', shrunk);

              case 3:
                _context3.next = 5;
                return this.getRefOverHTTP(url);

              case 5:
                commit = _context3.sent;
                config = this.config;

                tryRegistry = function () {
                  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(registry) {
                    var filename, href, file, tarballUrl, json;
                    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            filename = (_index || _load_index()).registries[registry].filename;
                            href = _this2.constructor.getHTTPFileUrl(_this2.exploded, filename, commit);
                            _context2.next = 4;
                            return config.requestManager.request({
                              url: href,
                              queue: _this2.resolver.fetchingQueue
                            });

                          case 4:
                            file = _context2.sent;

                            if (file) {
                              _context2.next = 7;
                              break;
                            }

                            return _context2.abrupt('return', null);

                          case 7:
                            tarballUrl = _this2.constructor.getTarballUrl(_this2.exploded, commit);
                            _context2.next = 10;
                            return config.readJson(href, function () {
                              return JSON.parse(file);
                            });

                          case 10:
                            json = _context2.sent;

                            json._uid = commit;
                            json._remote = {
                              resolved: tarballUrl,
                              type: 'tarball',
                              reference: tarballUrl,
                              registry: registry
                            };
                            return _context2.abrupt('return', json);

                          case 14:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function tryRegistry(_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }();

                _context3.next = 10;
                return tryRegistry(this.registry);

              case 10:
                file = _context3.sent;

                if (!file) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt('return', file);

              case 13:
                _context3.t0 = (_regenerator || _load_regenerator()).default.keys((_index || _load_index()).registries);

              case 14:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 25;
                  break;
                }

                registry = _context3.t1.value;

                if (!(registry === this.registry)) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt('continue', 14);

              case 18:
                _context3.next = 20;
                return tryRegistry(registry);

              case 20:
                _file = _context3.sent;

                if (!_file) {
                  _context3.next = 23;
                  break;
                }

                return _context3.abrupt('return', _file);

              case 23:
                _context3.next = 14;
                break;

              case 25:
                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('couldntFindManifestIn', url));

              case 26:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resolveOverHTTP(_x2) {
        return _ref2.apply(this, arguments);
      }

      return resolveOverHTTP;
    }()
  }, {
    key: 'hasHTTPCapability',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(url) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.config.requestManager.request({
                  url: url,
                  method: 'HEAD',
                  queue: this.resolver.fetchingQueue,
                  followRedirect: false
                });

              case 2:
                _context4.t0 = _context4.sent;
                return _context4.abrupt('return', _context4.t0 !== false);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function hasHTTPCapability(_x4) {
        return _ref4.apply(this, arguments);
      }

      return hasHTTPCapability;
    }()
  }, {
    key: 'resolve',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5() {
        var httpUrl, sshUrl, archiveClient, commit;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                httpUrl = this.constructor.getGitHTTPUrl(this.exploded);
                sshUrl = this.constructor.getGitSSHUrl(this.exploded);

                // If we can access the files over HTTP then we should as it's MUCH faster than git
                // archive and tarball unarchiving. The HTTP API is only available for public repos
                // though.

                _context5.next = 4;
                return this.hasHTTPCapability(httpUrl);

              case 4:
                if (!_context5.sent) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 7;
                return this.resolveOverHTTP(httpUrl);

              case 7:
                return _context5.abrupt('return', _context5.sent);

              case 8:
                _context5.next = 10;
                return (_git || _load_git()).default.hasArchiveCapability(sshUrl);

              case 10:
                if (!_context5.sent) {
                  _context5.next = 18;
                  break;
                }

                archiveClient = new (_git || _load_git()).default(this.config, sshUrl, this.hash);
                _context5.next = 14;
                return archiveClient.init();

              case 14:
                commit = _context5.sent;
                _context5.next = 17;
                return this.fork((_gitResolver || _load_gitResolver()).default, true, sshUrl + '#' + commit);

              case 17:
                return _context5.abrupt('return', _context5.sent);

              case 18:
                _context5.next = 20;
                return this.fork((_gitResolver || _load_gitResolver()).default, true, sshUrl);

              case 20:
                return _context5.abrupt('return', _context5.sent);

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function resolve() {
        return _ref5.apply(this, arguments);
      }

      return resolve;
    }()
  }], [{
    key: 'getTarballUrl',
    value: function getTarballUrl(exploded, commit) {
      exploded;
      commit;
      throw new Error('Not implemented');
    }
  }, {
    key: 'getGitHTTPUrl',
    value: function getGitHTTPUrl(exploded) {
      exploded;
      throw new Error('Not implemented');
    }
  }, {
    key: 'getGitSSHUrl',
    value: function getGitSSHUrl(exploded) {
      exploded;
      throw new Error('Not implemented');
    }
  }, {
    key: 'getHTTPFileUrl',
    value: function getHTTPFileUrl(exploded, filename, commit) {
      exploded;
      filename;
      commit;
      throw new Error('Not implemented');
    }
  }]);
  return HostedGitResolver;
}((_exoticResolver || _load_exoticResolver()).default);

exports.default = HostedGitResolver;