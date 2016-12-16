'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.Add = undefined;

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
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

var run = exports.run = function () {
  var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(config, reporter, flags, args) {
    var _this3 = this;

    var lockfile;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (args.length) {
              _context5.next = 2;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('missingAddDependencies'));

          case 2:
            _context5.next = 4;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd, reporter);

          case 4:
            lockfile = _context5.sent;
            _context5.next = 7;
            return (0, (_install || _load_install()).wrapLifecycle)(config, flags, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4() {
              var install;
              return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      install = new Add(args, flags, config, reporter, lockfile);
                      _context4.next = 3;
                      return install.init();

                    case 3:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, _this3);
            })));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function run(_x2, _x3, _x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _list;

function _load_list() {
  return _list = require('./list.js');
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var Add = exports.Add = function (_Install) {
  (0, (_inherits2 || _load_inherits()).default)(Add, _Install);

  function Add(args, flags, config, reporter, lockfile) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Add);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (Add.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(Add)).call(this, flags, config, reporter, lockfile));

    _this.args = args;
    // only one flag is supported, so we can figure out which one was passed to `yarn add`
    _this.flagToOrigin = [flags.dev && 'devDependencies', flags.optional && 'optionalDependencies', flags.peer && 'peerDependencies', 'dependencies'].filter(Boolean).shift();
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(Add, [{
    key: 'prepareRequests',


    /**
     * TODO
     */

    value: function prepareRequests(requests) {
      var requestsWithArgs = requests.slice();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(this.args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pattern = _step.value;

          requestsWithArgs.push({
            pattern: pattern,
            registry: 'npm',
            optional: false
          });
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

      return requestsWithArgs;
    }

    /**
     * returns version for a pattern based on Manifest
     */

  }, {
    key: 'getPatternVersion',
    value: function getPatternVersion(pattern, pkg) {
      var _flags = this.flags;
      var exact = _flags.exact;
      var tilde = _flags.tilde;

      var parts = (_packageRequest || _load_packageRequest()).default.normalizePattern(pattern);
      var version = void 0;
      if ((_packageRequest || _load_packageRequest()).default.getExoticResolver(pattern)) {
        // wasn't a name/range tuple so this is just a raw exotic pattern
        version = pattern;
      } else if (parts.hasVersion && parts.range) {
        // if the user specified a range then use it verbatim
        version = parts.range;
      } else if (tilde) {
        // --save-tilde
        version = '~' + pkg.version;
      } else if (exact) {
        // --save-exact
        version = pkg.version;
      } else {
        // default to save prefix
        version = '' + String(this.config.getOption('save-prefix') || '') + pkg.version;
      }
      return version;
    }
  }, {
    key: 'preparePatterns',
    value: function preparePatterns(patterns) {
      var preparedPatterns = patterns.slice();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(this.resolver.dedupePatterns(this.args)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pattern = _step2.value;

          var pkg = this.resolver.getResolvedPattern(pattern);
          invariant(pkg, 'missing package ' + pattern);
          var version = this.getPatternVersion(pattern, pkg);
          var newPattern = pkg.name + '@' + version;
          preparedPatterns.push(newPattern);
          this.addedPatterns.push(newPattern);
          if (newPattern === pattern) {
            continue;
          }
          this.resolver.replacePattern(pattern, newPattern);
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

      return preparedPatterns;
    }
  }, {
    key: 'bailout',
    value: function bailout(patterns) {
      return (_promise || _load_promise()).default.resolve(false);
    }

    /**
     * Description
     */

  }, {
    key: 'init',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var patterns;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.addedPatterns = [];
                _context.next = 3;
                return (_install || _load_install()).Install.prototype.init.call(this);

              case 3:
                patterns = _context.sent;
                _context.next = 6;
                return this.maybeOutputSaveTree(patterns);

              case 6:
                _context.next = 8;
                return this.savePackages();

              case 8:
                return _context.abrupt('return', patterns);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()

    /**
     * Description
     */

  }, {
    key: 'fetchRequestFromCwd',
    value: function fetchRequestFromCwd() {
      return (_install || _load_install()).Install.prototype.fetchRequestFromCwd.call(this, this.args);
    }

    /**
     * Output a tree of any newly added dependencies.
     */

  }, {
    key: 'maybeOutputSaveTree',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(patterns) {
        var opts, _ref3, trees, count;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // don't limit the shown tree depth
                opts = {
                  reqDepth: 0
                };
                _context2.next = 3;
                return (0, (_list || _load_list()).buildTree)(this.resolver, this.linker, patterns, opts, true, true);

              case 3:
                _ref3 = _context2.sent;
                trees = _ref3.trees;
                count = _ref3.count;

                this.reporter.success(count === 1 ? this.reporter.lang('savedNewDependency') : this.reporter.lang('savedNewDependencies', count));
                this.reporter.tree('newDependencies', trees);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function maybeOutputSaveTree(_x) {
        return _ref2.apply(this, arguments);
      }

      return maybeOutputSaveTree;
    }()

    /**
     * Save added packages to manifest if any of the --save flags were used.
     */

  }, {
    key: 'savePackages',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3() {
        var _this2 = this;

        var patternOrigins, manifests, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (_install || _load_install()).Install.prototype.fetchRequestFromCwd.call(this);

              case 2:
                patternOrigins = (0, (_keys || _load_keys()).default)(this.rootPatternsToOrigin);

                // get all the different registry manifests in this folder

                _context3.next = 5;
                return this.config.getRootManifests();

              case 5:
                manifests = _context3.sent;


                // add new patterns to their appropriate registry manifest
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 9;

                _loop = function _loop() {
                  var pattern = _step3.value;

                  var pkg = _this2.resolver.getResolvedPattern(pattern);
                  invariant(pkg, 'missing package ' + pattern);
                  var version = _this2.getPatternVersion(pattern, pkg);
                  var ref = pkg._reference;
                  invariant(ref, 'expected package reference');
                  // lookup the package to determine dependency type; used during `yarn upgrade`
                  var depType = patternOrigins.reduce(function (acc, prev) {
                    if (prev.indexOf(pkg.name + '@') === 0) {
                      return _this2.rootPatternsToOrigin[prev];
                    }
                    return acc;
                  }, null);

                  // depType is calculated when `yarn upgrade` command is used
                  var target = depType || _this2.flagToOrigin;

                  // add it to manifest
                  var object = manifests[ref.registry].object;


                  object[target] = object[target] || {};
                  object[target][pkg.name] = version;
                };

                for (_iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(this.addedPatterns); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _loop();
                }

                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](9);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 18:
                _context3.prev = 18;
                _context3.prev = 19;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 21:
                _context3.prev = 21;

                if (!_didIteratorError3) {
                  _context3.next = 24;
                  break;
                }

                throw _iteratorError3;

              case 24:
                return _context3.finish(21);

              case 25:
                return _context3.finish(18);

              case 26:
                _context3.next = 28;
                return this.config.saveRootManifests(manifests);

              case 28:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[9, 14, 18, 26], [19,, 21, 25]]);
      }));

      function savePackages() {
        return _ref4.apply(this, arguments);
      }

      return savePackages;
    }()
  }]);
  return Add;
}((_install || _load_install()).Install);

function setFlags(commander) {
  commander.usage('add [packages ...] [flags]');
  commander.option('-D, --dev', 'save package to your `devDependencies`');
  commander.option('-P, --peer', 'save package to your `peerDependencies`');
  commander.option('-O, --optional', 'save package to your `optionalDependencies`');
  commander.option('-E, --exact', 'install exact version');
  commander.option('-T, --tilde', 'install most recent release with the same minor version');
}