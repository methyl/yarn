'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
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

var _validate;

function _load_validate() {
  return _validate = require('./util/normalize-manifest/validate.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('./lockfile/wrapper.js'));
}

var _packageReference;

function _load_packageReference() {
  return _packageReference = _interopRequireDefault(require('./package-reference.js'));
}

var _index;

function _load_index() {
  return _index = _interopRequireWildcard(require('./resolvers/index.js'));
}

var _index2;

function _load_index2() {
  return _index2 = require('./resolvers/index.js');
}

var _errors;

function _load_errors() {
  return _errors = require('./errors.js');
}

var _misc;

function _load_misc() {
  return _misc = require('./util/misc.js');
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('./constants.js'));
}

var _version;

function _load_version() {
  return _version = _interopRequireWildcard(require('./util/version.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var semver = require('semver');

var PackageRequest = function () {
  function PackageRequest(req, resolver) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageRequest);

    this.parentRequest = req.parentRequest;
    this.lockfile = resolver.lockfile;
    this.registry = req.registry;
    this.reporter = resolver.reporter;
    this.resolver = resolver;
    this.optional = req.optional;
    this.pattern = req.pattern;
    this.config = resolver.config;

    resolver.usedRegistries.add(req.registry);
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageRequest, [{
    key: 'getParentNames',
    value: function getParentNames() {
      var chain = [];

      var request = this.parentRequest;
      while (request) {
        var info = this.resolver.getStrictResolvedPattern(request.pattern);
        chain.unshift(info.name);

        request = request.parentRequest;
      }

      return chain;
    }
  }, {
    key: 'getLocked',
    value: function getLocked(remoteType) {
      // always prioritise root lockfile
      var shrunk = this.lockfile.getLocked(this.pattern);

      if (shrunk) {
        var resolvedParts = (_version || _load_version()).explodeHashedUrl(shrunk.resolved);

        return {
          name: shrunk.name,
          version: shrunk.version,
          _uid: shrunk.uid,
          _remote: {
            resolved: shrunk.resolved,
            type: remoteType,
            reference: resolvedParts.url,
            hash: resolvedParts.hash,
            registry: shrunk.registry
          },
          optionalDependencies: shrunk.optionalDependencies,
          dependencies: shrunk.dependencies
        };
      } else {
        return null;
      }
    }

    /**
     * If the input pattern matches a registry one then attempt to find it on the registry.
     * Otherwise fork off to an exotic resolver if one matches.
     */

  }, {
    key: 'findVersionOnRegistry',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(pattern) {
        var _PackageRequest$norma, range, name, exoticResolver, data, Resolver, resolver;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _PackageRequest$norma = PackageRequest.normalizePattern(pattern);
                range = _PackageRequest$norma.range;
                name = _PackageRequest$norma.name;
                exoticResolver = PackageRequest.getExoticResolver(range);

                if (!exoticResolver) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return this.findExoticVersionInfo(exoticResolver, range);

              case 7:
                data = _context.sent;


                // clone data as we're manipulating it in place and this could be resolved multiple
                // times
                data = (0, (_assign || _load_assign()).default)({}, data);

                // this is so the returned package response uses the overridden name. ie. if the
                // package's actual name is `bar`, but it's been specified in the manifest like:
                //   "foo": "http://foo.com/bar.tar.gz"
                // then we use the foo name
                data.name = name;

                return _context.abrupt('return', data);

              case 11:
                Resolver = this.getRegistryResolver();
                resolver = new Resolver(this, name, range);
                return _context.abrupt('return', resolver.resolve());

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function findVersionOnRegistry(_x) {
        return _ref.apply(this, arguments);
      }

      return findVersionOnRegistry;
    }()

    /**
     * Get the registry resolver associated with this package request.
     */

  }, {
    key: 'getRegistryResolver',
    value: function getRegistryResolver() {
      var Resolver = (_index2 || _load_index2()).registries[this.registry];
      if (Resolver) {
        return Resolver;
      } else {
        throw new (_errors || _load_errors()).MessageError(this.reporter.lang('unknownRegistryResolver', this.registry));
      }
    }

    /**
     * Explode and normalize a pattern into it's name and range.
     */

  }, {
    key: 'findExoticVersionInfo',


    /**
     * Construct an exotic resolver instance with the input `ExoticResolver` and `range`.
     */

    value: function findExoticVersionInfo(ExoticResolver, range) {
      var resolver = new ExoticResolver(this, range);
      return resolver.resolve();
    }

    /**
     * If the current pattern matches an exotic resolver then delegate to it or else try
     * the registry.
     */

  }, {
    key: 'findVersionInfo',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2() {
        var exoticResolver;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                exoticResolver = PackageRequest.getExoticResolver(this.pattern);

                if (!exoticResolver) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.findExoticVersionInfo(exoticResolver, this.pattern);

              case 4:
                return _context2.abrupt('return', _context2.sent);

              case 7:
                _context2.next = 9;
                return this.findVersionOnRegistry(this.pattern);

              case 9:
                return _context2.abrupt('return', _context2.sent);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findVersionInfo() {
        return _ref2.apply(this, arguments);
      }

      return findVersionInfo;
    }()

    /**
     * TODO description
     */

  }, {
    key: 'find',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var info, _PackageRequest$norma2, range, name, resolved, _ref4, remote, ref, promises, deps, depName, depPattern, _depName, _depPattern, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, otherRequest;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.findVersionInfo();

              case 2:
                info = _context3.sent;

                if (info) {
                  _context3.next = 5;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('unknownPackage', this.pattern));

              case 5:

                (0, (_validate || _load_validate()).cleanDependencies)(info, false, this.reporter, function () {
                  // swallow warnings
                });

                // check if while we were resolving this dep we've already resolved one that satisfies
                // the same range
                _PackageRequest$norma2 = PackageRequest.normalizePattern(this.pattern);
                range = _PackageRequest$norma2.range;
                name = _PackageRequest$norma2.name;
                resolved = this.resolver.getHighestRangeVersionMatch(name, range);

                if (!resolved) {
                  _context3.next = 16;
                  break;
                }

                _ref4 = resolved._reference;

                invariant(_ref4, 'Resolved package info has no package reference');
                _ref4.addRequest(this);
                _ref4.addPattern(this.pattern, resolved);
                return _context3.abrupt('return');

              case 16:
                if (!(info.flat && !this.resolver.flat)) {
                  _context3.next = 18;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('flatGlobalError'));

              case 18:

                // validate version info
                PackageRequest.validateVersionInfo(info, this.reporter);

                //
                remote = info._remote;

                invariant(remote, 'Missing remote');

                // set package reference
                ref = new (_packageReference || _load_packageReference()).default(this, info, remote);

                ref.addPattern(this.pattern, info);
                ref.addOptional(this.optional);
                info._reference = ref;
                info._remote = remote;

                // start installation of dependencies
                promises = [];
                deps = [];

                // normal deps

                for (depName in info.dependencies) {
                  depPattern = depName + '@' + info.dependencies[depName];

                  deps.push(depPattern);
                  promises.push(this.resolver.find({
                    pattern: depPattern,
                    registry: remote.registry,
                    optional: false,
                    parentRequest: this
                  }));
                }

                // optional deps
                for (_depName in info.optionalDependencies) {
                  _depPattern = _depName + '@' + info.optionalDependencies[_depName];

                  deps.push(_depPattern);
                  promises.push(this.resolver.find({
                    pattern: _depPattern,
                    registry: remote.registry,
                    optional: true,
                    parentRequest: this
                  }));
                }

                _context3.next = 32;
                return (_promise || _load_promise()).default.all(promises);

              case 32:
                ref.addDependencies(deps);

                // Now that we have all dependencies, it's safe to propagate optional
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 36;
                for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)(ref.requests.slice(1)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  otherRequest = _step.value;

                  ref.addOptional(otherRequest.optional);
                }
                _context3.next = 44;
                break;

              case 40:
                _context3.prev = 40;
                _context3.t0 = _context3['catch'](36);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 44:
                _context3.prev = 44;
                _context3.prev = 45;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 47:
                _context3.prev = 47;

                if (!_didIteratorError) {
                  _context3.next = 50;
                  break;
                }

                throw _iteratorError;

              case 50:
                return _context3.finish(47);

              case 51:
                return _context3.finish(44);

              case 52:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[36, 40, 44, 52], [45,, 47, 51]]);
      }));

      function find() {
        return _ref3.apply(this, arguments);
      }

      return find;
    }()

    /**
     * TODO description
     */

  }], [{
    key: 'getExoticResolver',
    value: function getExoticResolver(pattern) {
      // TODO make this type more refined
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_misc || _load_misc()).entries)((_index || _load_index()).exotics)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);

          var Resolver = _step2$value[1];

          if (Resolver.isVersion(pattern)) {
            return Resolver;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }
  }, {
    key: 'normalizePattern',
    value: function normalizePattern(pattern) {
      var hasVersion = false;
      var range = 'latest';
      var name = pattern;

      // if we're a scope then remove the @ and add it back later
      var isScoped = false;
      if (name[0] === '@') {
        isScoped = true;
        name = name.slice(1);
      }

      // take first part as the name
      var parts = name.split('@');
      if (parts.length > 1) {
        name = parts.shift();
        range = parts.join('@');

        if (range) {
          hasVersion = true;
        } else {
          range = '*';
        }
      }

      // add back @ scope suffix
      if (isScoped) {
        name = '@' + name;
      }

      return { name: name, range: range, hasVersion: hasVersion };
    }
  }, {
    key: 'validateVersionInfo',
    value: function validateVersionInfo(info, reporter) {
      // human readable name to use in errors
      var human = info.name + '@' + info.version;

      info.version = PackageRequest.getPackageVersion(info);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)((_constants || _load_constants()).REQUIRED_PACKAGE_KEYS), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var key = _step3.value;

          if (!info[key]) {
            throw new (_errors || _load_errors()).MessageError(reporter.lang('missingRequiredPackageKey', human, key));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    /**
     * Returns the package version if present, else defaults to the uid
     */

  }, {
    key: 'getPackageVersion',
    value: function getPackageVersion(info) {
      // TODO possibly reconsider this behaviour
      return info.version === undefined ? info._uid : info.version;
    }

    /**
     * Gets all of the outdated packages and sorts them appropriately
     */

  }, {
    key: 'getOutdatedPackages',
    value: function () {
      var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(lockfile, install, config, reporter) {
        var _this = this;

        var _ref6, depReqPatterns, deps, isDepOld, isDepExpected, orderByExpected;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return install.fetchRequestFromCwd();

              case 2:
                _ref6 = _context5.sent;
                depReqPatterns = _ref6.requests;
                _context5.next = 6;
                return (_promise || _load_promise()).default.all(depReqPatterns.map(function () {
                  var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(_ref7) {
                    var pattern = _ref7.pattern;
                    var hint = _ref7.hint;

                    var locked, name, current, latest, wanted, url, normalized, registry, _ref9;

                    return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            locked = lockfile.getLocked(pattern);

                            if (locked) {
                              _context4.next = 3;
                              break;
                            }

                            throw new (_errors || _load_errors()).MessageError(reporter.lang('lockfileOutdated'));

                          case 3:
                            name = locked.name;
                            current = locked.version;
                            latest = '';
                            wanted = '';
                            url = '';
                            normalized = PackageRequest.normalizePattern(pattern);

                            if (!(PackageRequest.getExoticResolver(pattern) || PackageRequest.getExoticResolver(normalized.range))) {
                              _context4.next = 14;
                              break;
                            }

                            latest = wanted = 'exotic';
                            url = normalized.range;
                            _context4.next = 21;
                            break;

                          case 14:
                            registry = config.registries[locked.registry];
                            _context4.next = 17;
                            return registry.checkOutdated(config, name, normalized.range);

                          case 17:
                            _ref9 = _context4.sent;
                            latest = _ref9.latest;
                            wanted = _ref9.wanted;
                            url = _ref9.url;

                          case 21:
                            return _context4.abrupt('return', { name: name, current: current, wanted: wanted, latest: latest, url: url, hint: hint });

                          case 22:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this);
                  }));

                  return function (_x6) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 6:
                deps = _context5.sent;

                // Make sure to always output `exotic` versions to be compatible with npm
                isDepOld = function isDepOld(_ref10) {
                  var current = _ref10.current;
                  var latest = _ref10.latest;
                  var wanted = _ref10.wanted;
                  return latest === 'exotic' || latest !== 'exotic' && (semver.lt(current, wanted) || semver.lt(current, latest));
                };

                isDepExpected = function isDepExpected(_ref11) {
                  var current = _ref11.current;
                  var wanted = _ref11.wanted;
                  return current === wanted;
                };

                orderByExpected = function orderByExpected(depA, depB) {
                  return isDepExpected(depA) && !isDepExpected(depB) ? 1 : -1;
                };

                return _context5.abrupt('return', deps.filter(isDepOld).sort(orderByExpected));

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getOutdatedPackages(_x2, _x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return getOutdatedPackages;
    }()
  }]);
  return PackageRequest;
}();

exports.default = PackageRequest;