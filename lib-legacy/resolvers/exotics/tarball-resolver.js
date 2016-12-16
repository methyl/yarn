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

var _tarballFetcher;

function _load_tarballFetcher() {
  return _tarballFetcher = _interopRequireDefault(require('../../fetchers/tarball-fetcher.js'));
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

var _gitResolver;

function _load_gitResolver() {
  return _gitResolver = _interopRequireDefault(require('./git-resolver.js'));
}

var _misc;

function _load_misc() {
  return _misc = require('../../util/misc.js');
}

var _version;

function _load_version() {
  return _version = _interopRequireWildcard(require('../../util/version.js'));
}

var _crypto;

function _load_crypto() {
  return _crypto = _interopRequireWildcard(require('../../util/crypto.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var TarballResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(TarballResolver, _ExoticResolver);

  function TarballResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, TarballResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (TarballResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(TarballResolver)).call(this, request, fragment));

    var _versionUtil$explodeH = (_version || _load_version()).explodeHashedUrl(fragment);

    var hash = _versionUtil$explodeH.hash;
    var url = _versionUtil$explodeH.url;

    _this.hash = hash;
    _this.url = url;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(TarballResolver, [{
    key: 'resolve',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var shrunk, url, hash, registry, pkgJson, dest, _ref2, fetcher, fetched;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shrunk = this.request.getLocked('tarball');

                if (!shrunk) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', shrunk);

              case 3:
                url = (0, (_misc || _load_misc()).removePrefix)(this.url, 'file:');
                hash = this.hash;
                registry = this.registry;
                pkgJson = void 0;

                // generate temp directory

                dest = this.config.getTemp((_crypto || _load_crypto()).hash(url));
                _context.next = 10;
                return this.config.isValidModuleDest(dest);

              case 10:
                if (!_context.sent) {
                  _context.next = 19;
                  break;
                }

                _context.next = 13;
                return this.config.readPackageMetadata(dest);

              case 13:
                _ref2 = _context.sent;
                pkgJson = _ref2.package;
                hash = _ref2.hash;
                registry = _ref2.registry;
                _context.next = 29;
                break;

              case 19:
                _context.next = 21;
                return (_fs || _load_fs()).unlink(dest);

              case 21:
                fetcher = new (_tarballFetcher || _load_tarballFetcher()).default(dest, {
                  type: 'tarball',
                  reference: url,
                  registry: registry,
                  hash: hash
                }, this.config, false);

                // fetch file and get it's hash

                _context.next = 24;
                return fetcher.fetch();

              case 24:
                fetched = _context.sent;

                pkgJson = fetched.package;
                hash = fetched.hash;

                registry = pkgJson._registry;
                invariant(registry, 'expected registry');

              case 29:

                // use the commit/tarball hash as the uid as we can't rely on the version as it's not
                // in the registry
                pkgJson._uid = hash;

                // set remote so it can be "fetched"
                pkgJson._remote = {
                  type: 'copy',
                  resolved: url + '#' + hash,
                  hash: hash,
                  registry: registry,
                  reference: dest
                };

                return _context.abrupt('return', pkgJson);

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolve() {
        return _ref.apply(this, arguments);
      }

      return resolve;
    }()
  }], [{
    key: 'isVersion',
    value: function isVersion(pattern) {
      // we can sometimes match git urls which we don't want
      if ((_gitResolver || _load_gitResolver()).default.isVersion(pattern)) {
        return false;
      }

      // full http url
      if (pattern.startsWith('http://') || pattern.startsWith('https://')) {
        return true;
      }

      // local file reference - ignore patterns with names
      if (pattern.indexOf('@') < 0) {
        if (pattern.endsWith('.tgz') || pattern.endsWith('.tar.gz')) {
          return true;
        }
      }

      return false;
    }
  }]);
  return TarballResolver;
}((_exoticResolver || _load_exoticResolver()).default);

exports.default = TarballResolver;