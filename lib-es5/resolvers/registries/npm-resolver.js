'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

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
  return _errors = require('../../errors.js');
}

var _registryResolver;

function _load_registryResolver() {
  return _registryResolver = _interopRequireDefault(require('./registry-resolver.js'));
}

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('../../registries/npm-registry.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../../util/map.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _constants;

function _load_constants() {
  return _constants = require('../../constants.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');
var os = require('os');

var NPM_REGISTRY = /http[s]:\/\/registry.npmjs.org/g;

var NpmResolver = function (_RegistryResolver) {
  (0, (_inherits2 || _load_inherits()).default)(NpmResolver, _RegistryResolver);

  function NpmResolver() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, NpmResolver);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (NpmResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(NpmResolver)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(NpmResolver, [{
    key: 'resolveRequest',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var res, body;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.config.offline) {
                  _context.next = 4;
                  break;
                }

                res = this.resolveRequestOffline();

                if (!(res != null)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res);

              case 4:
                _context.next = 6;
                return this.config.registries.npm.request((_npmRegistry || _load_npmRegistry()).default.escapeName(this.name));

              case 6:
                body = _context.sent;

                if (!body) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return NpmResolver.findVersionInRegistryResponse(this.config, this.range, body);

              case 10:
                return _context.abrupt('return', _context.sent);

              case 13:
                return _context.abrupt('return', null);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveRequest() {
        return _ref.apply(this, arguments);
      }

      return resolveRequest;
    }()
  }, {
    key: 'resolveRequestOffline',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var _this2 = this;

        var prefix, cacheFolder, files, versions, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _name2, dir, pkg, metadata, satisfied;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // find modules of this name
                prefix = 'npm-' + this.name + '-';
                cacheFolder = this.config.cacheFolder;

                invariant(cacheFolder, 'expected packages root');

                _context3.next = 5;
                return this.config.getCache('cachedPackages', (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2() {
                  var files, validFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _name, dir;

                  return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return (_fs || _load_fs()).readdir(cacheFolder);

                        case 2:
                          files = _context2.sent;
                          validFiles = [];
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context2.prev = 7;
                          _iterator = (0, (_getIterator2 || _load_getIterator()).default)(files);

                        case 9:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 21;
                            break;
                          }

                          _name = _step.value;

                          if (!(_name[0] === '.')) {
                            _context2.next = 13;
                            break;
                          }

                          return _context2.abrupt('continue', 18);

                        case 13:

                          // ensure valid module cache
                          dir = path.join(cacheFolder, _name);
                          _context2.next = 16;
                          return _this2.config.isValidModuleDest(dir);

                        case 16:
                          if (!_context2.sent) {
                            _context2.next = 18;
                            break;
                          }

                          validFiles.push(_name);

                        case 18:
                          _iteratorNormalCompletion = true;
                          _context2.next = 9;
                          break;

                        case 21:
                          _context2.next = 27;
                          break;

                        case 23:
                          _context2.prev = 23;
                          _context2.t0 = _context2['catch'](7);
                          _didIteratorError = true;
                          _iteratorError = _context2.t0;

                        case 27:
                          _context2.prev = 27;
                          _context2.prev = 28;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 30:
                          _context2.prev = 30;

                          if (!_didIteratorError) {
                            _context2.next = 33;
                            break;
                          }

                          throw _iteratorError;

                        case 33:
                          return _context2.finish(30);

                        case 34:
                          return _context2.finish(27);

                        case 35:
                          return _context2.abrupt('return', validFiles);

                        case 36:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this2, [[7, 23, 27, 35], [28,, 30, 34]]);
                })));

              case 5:
                files = _context3.sent;
                versions = (0, (_map || _load_map()).default)();
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 10;
                _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(files);

              case 12:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 31;
                  break;
                }

                _name2 = _step2.value;

                if (!(_name2.indexOf(prefix) !== 0)) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt('continue', 28);

              case 16:
                dir = path.join(cacheFolder, _name2);

                // read manifest and validate correct name

                _context3.next = 19;
                return this.config.readManifest(dir, 'npm');

              case 19:
                pkg = _context3.sent;

                if (!(pkg.name !== this.name)) {
                  _context3.next = 22;
                  break;
                }

                return _context3.abrupt('continue', 28);

              case 22:
                _context3.next = 24;
                return this.config.readPackageMetadata(dir);

              case 24:
                metadata = _context3.sent;

                if (metadata.remote) {
                  _context3.next = 27;
                  break;
                }

                return _context3.abrupt('continue', 28);

              case 27:

                versions[pkg.version] = (0, (_assign || _load_assign()).default)({}, pkg, { _remote: metadata.remote });

              case 28:
                _iteratorNormalCompletion2 = true;
                _context3.next = 12;
                break;

              case 31:
                _context3.next = 37;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t0 = _context3['catch'](10);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 37:
                _context3.prev = 37;
                _context3.prev = 38;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 40:
                _context3.prev = 40;

                if (!_didIteratorError2) {
                  _context3.next = 43;
                  break;
                }

                throw _iteratorError2;

              case 43:
                return _context3.finish(40);

              case 44:
                return _context3.finish(37);

              case 45:
                _context3.next = 47;
                return this.config.resolveConstraints((0, (_keys || _load_keys()).default)(versions), this.range);

              case 47:
                satisfied = _context3.sent;

                if (!satisfied) {
                  _context3.next = 52;
                  break;
                }

                return _context3.abrupt('return', versions[satisfied]);

              case 52:
                if (this.config.preferOffline) {
                  _context3.next = 56;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('couldntFindPackageInCache', this.name, this.range, (0, (_keys || _load_keys()).default)(versions).join(', ')));

              case 56:
                return _context3.abrupt('return', null);

              case 57:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 33, 37, 45], [38,, 40, 44]]);
      }));

      function resolveRequestOffline() {
        return _ref2.apply(this, arguments);
      }

      return resolveRequestOffline;
    }()
  }, {
    key: 'cleanRegistry',
    value: function cleanRegistry(url) {
      if (this.config.getOption('registry') === (_constants || _load_constants()).YARN_REGISTRY) {
        return url.replace(NPM_REGISTRY, (_constants || _load_constants()).YARN_REGISTRY);
      } else {
        return url;
      }
    }
  }, {
    key: 'resolve',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4() {
        var shrunk, info, deprecated, dist, human, parentNames;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // lockfile
                shrunk = this.request.getLocked('tarball');

                if (!shrunk) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return', shrunk);

              case 3:
                _context4.next = 5;
                return this.resolveRequest();

              case 5:
                info = _context4.sent;

                if (!(info == null)) {
                  _context4.next = 8;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('packageNotFoundRegistry', this.name, 'npm'));

              case 8:
                deprecated = info.deprecated;
                dist = info.dist;

                if (typeof deprecated === 'string') {
                  human = info.name + '@' + info.version;
                  parentNames = this.request.getParentNames();

                  if (parentNames.length) {
                    human = parentNames.concat(human).join(' > ');
                  }
                  this.reporter.warn(human + ': ' + deprecated);
                }

                if (dist != null && dist.tarball) {
                  info._remote = {
                    resolved: this.cleanRegistry(dist.tarball) + '#' + dist.shasum,
                    type: 'tarball',
                    reference: this.cleanRegistry(dist.tarball),
                    hash: dist.shasum,
                    registry: 'npm'
                  };
                }

                info._uid = info.version;

                return _context4.abrupt('return', info);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function resolve() {
        return _ref4.apply(this, arguments);
      }

      return resolve;
    }()
  }], [{
    key: 'findVersionInRegistryResponse',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(config, range, body) {
        var satisfied, _versions;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (body['dist-tags']) {
                  _context5.next = 2;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(config.reporter.lang('malformedRegistryResponse', body.name));

              case 2:

                if (range in body['dist-tags']) {
                  range = body['dist-tags'][range];
                }

                _context5.next = 5;
                return config.resolveConstraints((0, (_keys || _load_keys()).default)(body.versions), range);

              case 5:
                satisfied = _context5.sent;

                if (!satisfied) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt('return', body.versions[satisfied]);

              case 10:
                _versions = (0, (_keys || _load_keys()).default)(body.versions);
                throw new (_errors || _load_errors()).MessageError(config.reporter.lang('couldntFindVersionThatMatchesRange', body.name, range, _versions.length > 20 ? _versions.join(os.EOL) : _versions.join(', ')));

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findVersionInRegistryResponse(_x, _x2, _x3) {
        return _ref5.apply(this, arguments);
      }

      return findVersionInRegistryResponse;
    }()
  }]);
  return NpmResolver;
}((_registryResolver || _load_registryResolver()).default);

NpmResolver.registry = 'npm';
exports.default = NpmResolver;