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

var _index;

function _load_index() {
  return _index = require('../index.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _misc;

function _load_misc() {
  return _misc = _interopRequireWildcard(require('../../util/misc.js'));
}

var _version;

function _load_version() {
  return _version = _interopRequireWildcard(require('../../util/version.js'));
}

var _index2;

function _load_index2() {
  return _index2 = require('../../registries/index.js');
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

var _git;

function _load_git() {
  return _git = _interopRequireDefault(require('../../util/git.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlParse = require('url').parse;

// we purposefully omit https and http as those are only valid if they end in the .git extension


var GIT_PROTOCOLS = ['git:', 'git+ssh:', 'git+https:', 'ssh:'];

var GIT_HOSTS = ['github.com', 'gitlab.com', 'bitbucket.com'];

var GitResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(GitResolver, _ExoticResolver);

  function GitResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, GitResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (GitResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(GitResolver)).call(this, request, fragment));

    var _versionUtil$explodeH = (_version || _load_version()).explodeHashedUrl(fragment);

    var url = _versionUtil$explodeH.url;
    var hash = _versionUtil$explodeH.hash;

    _this.url = url;
    _this.hash = hash;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(GitResolver, [{
    key: 'resolve',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(forked) {
        var tryRegistry = function () {
          var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(registry) {
            var filename, file, json;
            return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    filename = (_index2 || _load_index2()).registries[registry].filename;
                    _context.next = 3;
                    return client.getFile(filename);

                  case 3:
                    file = _context.sent;

                    if (file) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt('return', null);

                  case 6:
                    _context.next = 8;
                    return config.readJson(url + '/' + filename, function () {
                      return JSON.parse(file);
                    });

                  case 8:
                    json = _context.sent;

                    json._uid = commit;
                    json._remote = {
                      resolved: url + '#' + commit,
                      type: 'git',
                      reference: url,
                      hash: commit,
                      registry: registry
                    };
                    return _context.abrupt('return', json);

                  case 12:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function tryRegistry(_x2) {
            return _ref2.apply(this, arguments);
          };
        }();

        var url, parts, name, Resolver, pathname, _url, shrunk, config, client, commit, file, registry, _file;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = this.url;

                // shortcut for hosted git. we will fallback to a GitResolver if the hosted git
                // optimisations fail which the `forked` flag indicates so we don't get into an
                // infinite loop

                parts = urlParse(url);

                if (!(false && !forked && !parts.auth && parts.pathname)) {
                  _context2.next = 16;
                  break;
                }

                _context2.t0 = (_regenerator || _load_regenerator()).default.keys((_index || _load_index()).hostedGit);

              case 4:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 16;
                  break;
                }

                name = _context2.t1.value;
                Resolver = (_index || _load_index()).hostedGit[name];

                if (!(Resolver.hostname !== parts.hostname)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('continue', 4);

              case 9:

                // we have a match! clean up the pathname of url artifacts
                pathname = parts.pathname;

                pathname = (_misc || _load_misc()).removePrefix(pathname, '/'); // remove prefixed slash
                pathname = (_misc || _load_misc()).removeSuffix(pathname, '.git'); // remove .git suffix if present

                _url = '' + pathname + (this.hash ? '#' + decodeURIComponent(this.hash) : '');
                return _context2.abrupt('return', this.fork(Resolver, false, _url));

              case 16:

                // get from lockfile
                shrunk = this.request.getLocked('git');

                if (!shrunk) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt('return', shrunk);

              case 19:
                config = this.config;
                client = new (_git || _load_git()).default(config, url, this.hash);
                _context2.next = 23;
                return client.init();

              case 23:
                commit = _context2.sent;
                _context2.next = 26;
                return tryRegistry(this.registry);

              case 26:
                file = _context2.sent;

                if (!file) {
                  _context2.next = 29;
                  break;
                }

                return _context2.abrupt('return', file);

              case 29:
                _context2.t2 = (_regenerator || _load_regenerator()).default.keys((_index2 || _load_index2()).registries);

              case 30:
                if ((_context2.t3 = _context2.t2()).done) {
                  _context2.next = 41;
                  break;
                }

                registry = _context2.t3.value;

                if (!(registry === this.registry)) {
                  _context2.next = 34;
                  break;
                }

                return _context2.abrupt('continue', 30);

              case 34:
                _context2.next = 36;
                return tryRegistry(registry);

              case 36:
                _file = _context2.sent;

                if (!_file) {
                  _context2.next = 39;
                  break;
                }

                return _context2.abrupt('return', _file);

              case 39:
                _context2.next = 30;
                break;

              case 41:
                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('couldntFindManifestIn', url));

              case 42:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function resolve(_x) {
        return _ref.apply(this, arguments);
      }

      return resolve;
    }()
  }], [{
    key: 'isVersion',
    value: function isVersion(pattern) {
      var parts = urlParse(pattern);

      // this pattern hasn't been exploded yet, we'll hit this code path again later once
      // we've been normalized #59
      if (!parts.protocol) {
        return false;
      }

      var pathname = parts.pathname;
      if (pathname && pathname.endsWith('.git')) {
        // ends in .git
        return true;
      }

      if (GIT_PROTOCOLS.indexOf(parts.protocol) >= 0) {
        return true;
      }

      if (parts.hostname && parts.path) {
        var path = parts.path;
        if (GIT_HOSTS.indexOf(parts.hostname) >= 0) {
          // only if dependency is pointing to a git repo,
          // e.g. facebook/flow and not file in a git repo facebook/flow/archive/v1.0.0.tar.gz
          return path.split('/').filter(function (p) {
            return !!p;
          }).length === 2;
        }
      }

      return false;
    }
  }]);
  return GitResolver;
}((_exoticResolver || _load_exoticResolver()).default);

exports.default = GitResolver;