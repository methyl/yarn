'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
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

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _baseFetcher;

function _load_baseFetcher() {
  return _baseFetcher = _interopRequireDefault(require('./base-fetcher.js'));
}

var _git;

function _load_git() {
  return _git = _interopRequireDefault(require('../util/git.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

var _crypto;

function _load_crypto() {
  return _crypto = _interopRequireWildcard(require('../util/crypto.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tar = require('tar');

var url = require('url');
var path = require('path');
var fs = require('fs');

var invariant = require('invariant');

var GitFetcher = function (_BaseFetcher) {
  (0, (_inherits2 || _load_inherits()).default)(GitFetcher, _BaseFetcher);

  function GitFetcher() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, GitFetcher);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (GitFetcher.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(GitFetcher)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(GitFetcher, [{
    key: '_fetch',
    value: function _fetch() {
      var _url$parse = url.parse(this.reference);

      var protocol = _url$parse.protocol;
      var pathname = _url$parse.pathname;

      if (protocol === null && typeof pathname === 'string') {
        return this.fetchFromLocal(pathname);
      } else {
        return this.fetchFromExternal();
      }
    }
  }, {
    key: 'fetchFromLocal',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(pathname) {
        var _this2 = this;

        var ref, config, offlineMirrorPath, localTarball, reporter;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref = this.reference;
                config = this.config;
                offlineMirrorPath = config.getOfflineMirrorPath() || '';
                localTarball = path.resolve(offlineMirrorPath, ref);
                reporter = config.reporter;
                _context.next = 7;
                return (_fs || _load_fs()).exists(localTarball);

              case 7:
                if (_context.sent) {
                  _context.next = 9;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(reporter.lang('tarballNotInNetworkOrCache', ref, localTarball));

              case 9:
                return _context.abrupt('return', new (_promise || _load_promise()).default(function (resolve, reject) {
                  var untarStream = tar.Extract({ path: _this2.dest });

                  var hashStream = new (_crypto || _load_crypto()).HashStream();

                  var cachedStream = fs.createReadStream(localTarball);
                  cachedStream.pipe(hashStream).pipe(untarStream).on('end', function () {
                    var expectHash = _this2.hash;
                    var actualHash = hashStream.getHash();
                    if (!expectHash || expectHash === actualHash) {
                      resolve({
                        hash: actualHash,
                        resolved: pathname + '#' + actualHash
                      });
                    } else {
                      reject(new (_errors || _load_errors()).SecurityError(reporter.lang('fetchBadHash', expectHash, actualHash)));
                    }
                  }).on('error', function (err) {
                    reject(new (_errors || _load_errors()).MessageError(reporter.lang('fetchErrorCorrupt', err.message, localTarball)));
                  });
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchFromLocal(_x) {
        return _ref.apply(this, arguments);
      }

      return fetchFromLocal;
    }()
  }, {
    key: 'fetchFromExternal',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2() {
        var commit, git, _url$parse2, pathname, tarballFilename, tarballInMirrorPath, mirrorRootPath, hash, relativeMirrorPath;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                commit = this.hash;

                invariant(commit, 'Commit hash required');

                git = new (_git || _load_git()).default(this.config, this.reference, commit);
                _context2.next = 5;
                return git.init();

              case 5:
                _context2.next = 7;
                return git.clone(this.dest);

              case 7:

                // Get the tarball filename from the url
                _url$parse2 = url.parse(this.reference);
                pathname = _url$parse2.pathname;
                tarballFilename = void 0;

                if (pathname == null) {
                  tarballFilename = this.reference;
                } else {
                  tarballFilename = path.basename(pathname);
                }

                tarballInMirrorPath = this.config.getOfflineMirrorPath(tarballFilename);
                mirrorRootPath = this.config.getOfflineMirrorPath();

                if (!(tarballInMirrorPath && this.hash && mirrorRootPath)) {
                  _context2.next = 20;
                  break;
                }

                tarballInMirrorPath = tarballInMirrorPath + '-' + commit;
                _context2.next = 17;
                return git.archive(tarballInMirrorPath);

              case 17:
                hash = _context2.sent;
                relativeMirrorPath = path.relative(mirrorRootPath, tarballInMirrorPath);
                return _context2.abrupt('return', {
                  hash: commit,
                  resolved: relativeMirrorPath ? relativeMirrorPath + '#' + hash : null
                });

              case 20:
                return _context2.abrupt('return', {
                  hash: commit,
                  resolved: null
                });

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchFromExternal() {
        return _ref2.apply(this, arguments);
      }

      return fetchFromExternal;
    }()
  }]);
  return GitFetcher;
}((_baseFetcher || _load_baseFetcher()).default);

exports.default = GitFetcher;