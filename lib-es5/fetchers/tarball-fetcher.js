'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalTarballFetcher = undefined;

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

var _http;

function _load_http() {
  return _http = _interopRequireDefault(require('http'));
}

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _stream;

function _load_stream() {
  return _stream = require('../util/stream.js');
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _crypto;

function _load_crypto() {
  return _crypto = _interopRequireWildcard(require('../util/crypto.js'));
}

var _baseFetcher;

function _load_baseFetcher() {
  return _baseFetcher = _interopRequireDefault(require('./base-fetcher.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var path = require('path');
var tar = require('tar');
var url = require('url');
var fs = require('fs');

var TarballFetcher = function (_BaseFetcher) {
  (0, (_inherits2 || _load_inherits()).default)(TarballFetcher, _BaseFetcher);

  function TarballFetcher() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, TarballFetcher);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (TarballFetcher.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(TarballFetcher)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(TarballFetcher, [{
    key: 'getResolvedFromCached',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(hash) {
        var mirrorPath, tarballLoc, relativeMirrorPath;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mirrorPath = this.getMirrorPath();

                if (!(mirrorPath == null)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', null);

              case 3:
                tarballLoc = path.join(this.dest, (_constants || _load_constants()).TARBALL_FILENAME);
                _context.next = 6;
                return (_fs || _load_fs()).exists(tarballLoc);

              case 6:
                if (_context.sent) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', null);

              case 8:
                _context.next = 10;
                return (_fs || _load_fs()).exists(mirrorPath);

              case 10:
                if (_context.sent) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return (_fs || _load_fs()).copy(tarballLoc, mirrorPath, this.reporter);

              case 13:
                relativeMirrorPath = this.getRelativeMirrorPath(mirrorPath);

                invariant(relativeMirrorPath != null, 'Missing offline mirror path');

                return _context.abrupt('return', relativeMirrorPath + '#' + hash);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getResolvedFromCached(_x) {
        return _ref.apply(this, arguments);
      }

      return getResolvedFromCached;
    }()
  }, {
    key: 'getMirrorPath',
    value: function getMirrorPath() {
      var _url$parse = url.parse(this.reference);

      var pathname = _url$parse.pathname;


      if (pathname == null) {
        return this.config.getOfflineMirrorPath();
      }

      var packageFilename = path.basename(pathname);

      // handle scoped packages
      var pathParts = pathname.slice(1).split('/');
      if (pathParts[0][0] === '@') {
        // scoped npm package
        packageFilename = pathParts[0] + '-' + packageFilename;
      }

      return this.config.getOfflineMirrorPath(packageFilename);
    }
  }, {
    key: 'getRelativeMirrorPath',
    value: function getRelativeMirrorPath(mirrorPath) {
      var offlineMirrorPath = this.config.getOfflineMirrorPath();
      if (offlineMirrorPath == null) {
        return null;
      }
      return path.relative(offlineMirrorPath, mirrorPath);
    }
  }, {
    key: 'createExtractor',
    value: function createExtractor(mirrorPath, resolve, reject) {
      var _this2 = this;

      var validateStream = new (_crypto || _load_crypto()).HashStream();
      var extractorStream = new (_stream || _load_stream()).UnpackStream();
      var untarStream = tar.Extract({ path: this.dest, strip: 1 });

      extractorStream.pipe(untarStream).on('error', reject).on('entry', function (entry) {
        if ((_constants || _load_constants()).ROOT_USER) {
          entry.props.uid = entry.uid = 0;
          entry.props.gid = entry.gid = 0;
        }
      }).on('end', function () {
        var expectHash = _this2.hash;
        var actualHash = validateStream.getHash();
        if (!expectHash || expectHash === actualHash) {
          resolve({
            hash: actualHash,
            resolved: mirrorPath ? mirrorPath + '#' + actualHash : null
          });
        } else {
          reject(new (_errors || _load_errors()).SecurityError(_this2.config.reporter.lang('fetchBadHash', expectHash, actualHash)));
        }
      });

      return { validateStream: validateStream, extractorStream: extractorStream };
    }
  }, {
    key: 'fetchFromLocal',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(pathname) {
        var _this3 = this;

        var ref, config, reporter, localTarball, isOfflineTarball, relativeFileLoc, offlineMirrorPath;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ref = this.reference;
                config = this.config;
                reporter = config.reporter;

                // path to the local tarball

                localTarball = void 0;
                isOfflineTarball = false;
                relativeFileLoc = pathname ? path.join(config.cwd, pathname) : null;
                _context2.t0 = relativeFileLoc;

                if (!_context2.t0) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 10;
                return (_fs || _load_fs()).exists(relativeFileLoc);

              case 10:
                _context2.t0 = _context2.sent;

              case 11:
                if (!_context2.t0) {
                  _context2.next = 15;
                  break;
                }

                // this is a reference to a file relative to the cwd
                localTarball = relativeFileLoc;
                _context2.next = 18;
                break;

              case 15:
                // generate a offline cache location
                offlineMirrorPath = config.getOfflineMirrorPath() || '';

                localTarball = path.resolve(offlineMirrorPath, ref);
                isOfflineTarball = true;

              case 18:
                _context2.next = 20;
                return (_fs || _load_fs()).exists(localTarball);

              case 20:
                if (_context2.sent) {
                  _context2.next = 22;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(reporter.lang('tarballNotInNetworkOrCache', ref, localTarball));

              case 22:
                return _context2.abrupt('return', new (_promise || _load_promise()).default(function (resolve, reject) {
                  var _createExtractor = _this3.createExtractor(null, resolve, reject);

                  var validateStream = _createExtractor.validateStream;
                  var extractorStream = _createExtractor.extractorStream;


                  var cachedStream = fs.createReadStream(localTarball);

                  cachedStream.pipe(validateStream).pipe(extractorStream).on('error', function (err) {
                    var msg = 'errorDecompressingTarball';
                    if (isOfflineTarball) {
                      msg = 'fetchErrorCorrupt';
                    }
                    reject(new (_errors || _load_errors()).MessageError(reporter.lang(msg, err.message, localTarball)));
                  });
                }));

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchFromLocal(_x2) {
        return _ref2.apply(this, arguments);
      }

      return fetchFromLocal;
    }()
  }, {
    key: 'fetchFromExternal',
    value: function fetchFromExternal() {
      var _this4 = this;

      var ref = this.reference;

      var registry = this.config.registries[this.registry];

      return registry.request(ref, {
        headers: {
          'Accept-Encoding': 'gzip',
          'Accept': 'application/octet-stream'
        },
        buffer: true,
        process: function process(req, resolve, reject) {
          var reporter = _this4.config.reporter;
          // should we save this to the offline cache?

          var mirrorPath = _this4.getMirrorPath();
          var tarballStorePath = path.join(_this4.dest, (_constants || _load_constants()).TARBALL_FILENAME);
          var overwriteResolved = mirrorPath ? _this4.getRelativeMirrorPath(mirrorPath) : null;

          //

          var _createExtractor2 = _this4.createExtractor(overwriteResolved, resolve, reject);

          var validateStream = _createExtractor2.validateStream;
          var extractorStream = _createExtractor2.extractorStream;


          var handleRequestError = function handleRequestError(res) {
            if (res.statusCode >= 400) {
              // $FlowFixMe
              var statusDescription = (_http || _load_http()).default.STATUS_CODES[res.statusCode];
              reject(new Error(reporter.lang('requestFailed', res.statusCode + ' ' + statusDescription)));
            }
          };

          req.on('response', handleRequestError);
          req.pipe(validateStream);

          validateStream.pipe(fs.createWriteStream(tarballStorePath)).on('error', reject);

          validateStream.pipe(extractorStream).on('error', reject);
          if (mirrorPath) {
            validateStream.pipe(fs.createWriteStream(mirrorPath)).on('error', reject);
          }
        }
      });
    }
  }, {
    key: '_fetch',
    value: function _fetch() {
      var _url$parse2 = url.parse(this.reference);

      var protocol = _url$parse2.protocol;
      var pathname = _url$parse2.pathname;

      if (protocol === null && typeof pathname === 'string') {
        return this.fetchFromLocal(pathname);
      } else {
        return this.fetchFromExternal();
      }
    }
  }]);
  return TarballFetcher;
}((_baseFetcher || _load_baseFetcher()).default);

exports.default = TarballFetcher;

var LocalTarballFetcher = exports.LocalTarballFetcher = function (_TarballFetcher) {
  (0, (_inherits2 || _load_inherits()).default)(LocalTarballFetcher, _TarballFetcher);

  function LocalTarballFetcher() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, LocalTarballFetcher);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (LocalTarballFetcher.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(LocalTarballFetcher)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(LocalTarballFetcher, [{
    key: '_fetch',
    value: function _fetch() {
      return this.fetchFromLocal(this.reference);
    }
  }]);
  return LocalTarballFetcher;
}(TarballFetcher);