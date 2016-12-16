'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */

var path = require('path');

var BaseFetcher = function () {
  function BaseFetcher(dest, remote, config) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BaseFetcher);

    this.reporter = config.reporter;
    this.reference = remote.reference;
    this.registry = remote.registry;
    this.hash = remote.hash;
    this.remote = remote;
    this.config = config;
    this.dest = dest;
  }

  (0, (_createClass2 || _load_createClass()).default)(BaseFetcher, [{
    key: 'getResolvedFromCached',
    value: function getResolvedFromCached(hash) {
      // fetcher subclasses may use this to perform actions such as copying over a cached tarball to the offline
      // mirror etc
      return (_promise || _load_promise()).default.resolve();
    }
  }, {
    key: '_fetch',
    value: function _fetch() {
      return (_promise || _load_promise()).default.reject(new Error('Not implemented'));
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      var dest = this.dest;


      return (_fs || _load_fs()).lockQueue.push(dest, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var _ref2, hash, resolved, pkg;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (_fs || _load_fs()).mkdirp(dest);

              case 2:
                _context.next = 4;
                return _this._fetch();

              case 4:
                _ref2 = _context.sent;
                hash = _ref2.hash;
                resolved = _ref2.resolved;

                // load the new normalized manifest

                _context.next = 9;
                return _this.config.readManifest(dest, _this.registry);

              case 9:
                pkg = _context.sent;
                _context.next = 12;
                return (_fs || _load_fs()).writeFile(path.join(dest, (_constants || _load_constants()).METADATA_FILENAME), (0, (_stringify || _load_stringify()).default)({
                  artifacts: [],
                  remote: _this.remote,
                  registry: _this.registry,
                  hash: hash
                }, null, '  '));

              case 12:
                return _context.abrupt('return', {
                  resolved: resolved,
                  hash: hash,
                  dest: dest,
                  package: pkg,
                  cached: false
                });

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      })));
    }
  }]);
  return BaseFetcher;
}();

exports.default = BaseFetcher;