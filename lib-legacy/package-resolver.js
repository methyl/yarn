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

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('./package-request.js'));
}

var _requestManager;

function _load_requestManager() {
  return _requestManager = _interopRequireDefault(require('./util/request-manager.js'));
}

var _blockingQueue;

function _load_blockingQueue() {
  return _blockingQueue = _interopRequireDefault(require('./util/blocking-queue.js'));
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('./lockfile/wrapper.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./util/map.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var semver = require('semver');

var PackageResolver = function () {
  function PackageResolver(config, lockfile) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageResolver);

    this.patternsByPackage = (0, (_map || _load_map()).default)();
    this.fetchingPatterns = (0, (_map || _load_map()).default)();
    this.fetchingQueue = new (_blockingQueue || _load_blockingQueue()).default('resolver fetching');
    this.newPatterns = [];
    this.patterns = (0, (_map || _load_map()).default)();
    this.usedRegistries = new (_set || _load_set()).default();
    this.flat = false;

    this.reporter = config.reporter;
    this.lockfile = lockfile;
    this.config = config;
  }

  // whether the dependency graph will be flattened


  // list of registries that have been used in this resolution


  // activity monitor


  // patterns we've already resolved or are in the process of resolving


  // new patterns that didn't exist in the lockfile


  // TODO


  // these are patterns that the package resolver was seeded with. these are required in
  // order to resolve top level peerDependencies


  // manages and throttles json api http requests


  // list of patterns associated with a package


  // lockfile instance which we can use to retrieve version info


  // a map of dependency patterns to packages


  // reporter instance, abstracts out display logic


  // environment specific config methods and options


  (0, (_createClass2 || _load_createClass()).default)(PackageResolver, [{
    key: 'isNewPattern',


    /**
     * TODO description
     */

    value: function isNewPattern(pattern) {
      return this.newPatterns.indexOf(pattern) >= 0;
    }

    /**
     * TODO description
     */

  }, {
    key: 'updateManifest',
    value: function updateManifest(ref, newPkg) {
      // inherit fields
      var oldPkg = this.patterns[ref.patterns[0]];
      newPkg._reference = ref;
      newPkg._remote = ref.remote;
      newPkg.name = oldPkg.name;

      // update patterns
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(ref.patterns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pattern = _step.value;

          this.patterns[pattern] = newPkg;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return (_promise || _load_promise()).default.resolve();
    }

    /**
     * Given a list of patterns, dedupe them to a list of unique patterns.
     */

  }, {
    key: 'dedupePatterns',
    value: function dedupePatterns(patterns) {
      var deduped = [];
      var seen = new (_set || _load_set()).default();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pattern = _step2.value;

          var info = this.getResolvedPattern(pattern);
          if (seen.has(info)) {
            continue;
          }

          seen.add(info);
          deduped.push(pattern);
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

      return deduped;
    }

    /**
     * Get a list of all manifests by topological order.
     */

  }, {
    key: 'getTopologicalManifests',
    value: function getTopologicalManifests(seedPatterns) {
      var _this = this;

      var pkgs = new (_set || _load_set()).default();
      var skip = new (_set || _load_set()).default();

      var add = function add(seedPatterns) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(seedPatterns), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var pattern = _step3.value;

            var pkg = _this.getStrictResolvedPattern(pattern);
            if (skip.has(pkg)) {
              continue;
            }

            var ref = pkg._reference;
            invariant(ref, 'expected reference');
            skip.add(pkg);
            add(ref.dependencies);
            pkgs.add(pkg);
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
      };

      add(seedPatterns);

      return pkgs;
    }

    /**
     * Get a list of all manifests by level sort order.
     */

  }, {
    key: 'getLevelOrderManifests',
    value: function getLevelOrderManifests(seedPatterns) {
      var _this2 = this;

      var pkgs = new (_set || _load_set()).default();
      var skip = new (_set || _load_set()).default();

      var add = function add(seedPatterns) {
        var refs = [];

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(seedPatterns), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var pattern = _step4.value;

            var pkg = _this2.getStrictResolvedPattern(pattern);
            if (skip.has(pkg)) {
              continue;
            }

            var ref = pkg._reference;
            invariant(ref, 'expected reference');

            refs.push(ref);
            skip.add(pkg);
            pkgs.add(pkg);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(refs), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _ref = _step5.value;

            add(_ref.dependencies);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      };

      add(seedPatterns);

      return pkgs;
    }

    /**
     * Get a list of all package names in the depenency graph.
     */

  }, {
    key: 'getAllDependencyNamesByLevelOrder',
    value: function getAllDependencyNamesByLevelOrder(seedPatterns) {
      var names = new (_set || _load_set()).default();
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(this.getLevelOrderManifests(seedPatterns)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _name = _step6.value.name;

          names.add(_name);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return names;
    }

    /**
     * Retrieve all the package info stored for this package name.
     */

  }, {
    key: 'getAllInfoForPackageName',
    value: function getAllInfoForPackageName(name) {
      var infos = [];
      var seen = new (_set || _load_set()).default();

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(this.patternsByPackage[name]), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var pattern = _step7.value;

          var info = this.patterns[pattern];
          if (seen.has(info)) {
            continue;
          }

          seen.add(info);
          infos.push(info);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return infos;
    }

    /**
     * Get a flat list of all package references.
     */

  }, {
    key: 'getPackageReferences',
    value: function getPackageReferences() {
      var refs = [];

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = (0, (_getIterator2 || _load_getIterator()).default)(this.getManifests()), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var manifest = _step8.value;

          var ref = manifest._reference;
          if (ref) {
            refs.push(ref);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return refs;
    }

    /**
     * Get a flat list of all package info.
     */

  }, {
    key: 'getManifests',
    value: function getManifests() {
      var infos = [];
      var seen = new (_set || _load_set()).default();

      for (var pattern in this.patterns) {
        var info = this.patterns[pattern];
        if (seen.has(info)) {
          continue;
        }

        infos.push(info);
        seen.add(info);
      }

      return infos;
    }

    /**
     * replace pattern in resolver, e.g. `name` is replaced with `name@^1.0.1`
     */

  }, {
    key: 'replacePattern',
    value: function replacePattern(pattern, newPattern) {
      var pkg = this.getResolvedPattern(pattern);
      invariant(pkg, 'missing package ' + pattern);
      var ref = pkg._reference;
      invariant(ref, 'expected package reference');
      ref.patterns = [newPattern];
      this.newPatterns.splice(this.newPatterns.indexOf(pattern), 1, newPattern);
      this.addPattern(newPattern, pkg);
      this.removePattern(pattern);
    }

    /**
     * Make all versions of this package resolve to it.
     */

  }, {
    key: 'collapseAllVersionsOfPackage',
    value: function collapseAllVersionsOfPackage(name, version) {
      var patterns = this.dedupePatterns(this.patternsByPackage[name]);
      var human = name + '@' + version;

      // get manifest that matches the version we're collapsing too
      var collapseToReference = void 0;
      var collapseToManifest = void 0;
      var collapseToPattern = void 0;
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var pattern = _step9.value;

          var _manifest = this.patterns[pattern];
          if (_manifest.version === version) {
            collapseToReference = _manifest._reference;
            collapseToManifest = _manifest;
            collapseToPattern = pattern;
            break;
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      invariant(collapseToReference && collapseToManifest && collapseToPattern, 'Couldn\'t find package manifest for ' + human);

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _pattern = _step10.value;

          // don't touch the pattern we're collapsing to
          if (_pattern === collapseToPattern) {
            continue;
          }

          // remove this pattern
          var ref = this.getStrictResolvedPattern(_pattern)._reference;
          invariant(ref, 'expected package reference');
          var refPatterns = ref.patterns.slice();
          ref.prune();

          // add pattern to the manifest we're collapsing to
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = (0, (_getIterator2 || _load_getIterator()).default)(refPatterns), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var _pattern2 = _step11.value;

              collapseToReference.addPattern(_pattern2, collapseToManifest);
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      return collapseToPattern;
    }

    /**
     * TODO description
     */

  }, {
    key: 'addPattern',
    value: function addPattern(pattern, info) {
      this.patterns[pattern] = info;

      var byName = this.patternsByPackage[info.name] = this.patternsByPackage[info.name] || [];
      byName.push(pattern);
    }

    /**
     * TODO description
     */

  }, {
    key: 'removePattern',
    value: function removePattern(pattern) {
      var pkg = this.patterns[pattern];
      if (!pkg) {
        return;
      }

      var byName = this.patternsByPackage[pkg.name];
      if (!byName) {
        return;
      }

      byName.splice(byName.indexOf(pattern), 1);
      delete this.patterns[pattern];
    }

    /**
     * TODO description
     */

  }, {
    key: 'getResolvedPattern',
    value: function getResolvedPattern(pattern) {
      return this.patterns[pattern];
    }

    /**
     * TODO description
     */

  }, {
    key: 'getStrictResolvedPattern',
    value: function getStrictResolvedPattern(pattern) {
      var manifest = this.getResolvedPattern(pattern);
      invariant(manifest, 'expected manifest');
      return manifest;
    }

    /**
     * TODO description
     */

  }, {
    key: 'getExactVersionMatch',
    value: function getExactVersionMatch(name, version) {
      var patterns = this.patternsByPackage[name];
      if (!patterns) {
        return null;
      }

      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = (0, (_getIterator2 || _load_getIterator()).default)(patterns), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var pattern = _step12.value;

          var info = this.getStrictResolvedPattern(pattern);
          if (info.version === version) {
            return info;
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      return null;
    }

    /**
     * Get the manifest of the highest known version that satisfies a package range
     */

  }, {
    key: 'getHighestRangeVersionMatch',
    value: function getHighestRangeVersionMatch(name, range) {
      var _this3 = this;

      var patterns = this.patternsByPackage[name];
      if (!patterns) {
        return null;
      }

      var versionNumbers = [];
      var resolvedPatterns = patterns.map(function (pattern) {
        var info = _this3.getStrictResolvedPattern(pattern);
        versionNumbers.push(info.version);

        return info;
      });

      var maxValidRange = semver.maxSatisfying(versionNumbers, range);
      if (!maxValidRange) {
        return null;
      }

      var indexOfmaxValidRange = versionNumbers.indexOf(maxValidRange);
      var maxValidRangeManifest = resolvedPatterns[indexOfmaxValidRange];

      return maxValidRangeManifest;
    }

    /**
     * TODO description
     */

  }, {
    key: 'find',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(req) {
        var fetchKey, request;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchKey = req.registry + ':' + req.pattern;

                if (!this.fetchingPatterns[fetchKey]) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                this.fetchingPatterns[fetchKey] = true;

              case 6:

                if (this.activity) {
                  this.activity.tick(req.pattern);
                }

                if (!this.lockfile.getLocked(req.pattern, true)) {
                  this.newPatterns.push(req.pattern);
                }

                request = new (_packageRequest || _load_packageRequest()).default(req, this);
                _context.next = 11;
                return request.find();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _ref2.apply(this, arguments);
      }

      return find;
    }()

    /**
     * TODO description
     */

  }, {
    key: 'init',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(deps, isFlat) {
        var _this4 = this;

        var activity;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.flat = isFlat;

                //
                activity = this.activity = this.reporter.activity();

                //

                this.seedPatterns = deps.map(function (dep) {
                  return dep.pattern;
                });

                //
                _context2.next = 5;
                return (_promise || _load_promise()).default.all(deps.map(function (req) {
                  return _this4.find(req);
                }));

              case 5:

                activity.end();
                this.activity = null;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return init;
    }()
  }]);
  return PackageResolver;
}();

exports.default = PackageResolver;