'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.requireLockfile = undefined;

var _from;

function _load_from() {
  return _from = _interopRequireDefault(require('babel-runtime/core-js/array/from'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var cleanQuery = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, query) {
    var queryParts;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = path.isAbsolute(query);

            if (!_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return (_fs || _load_fs()).exists(query);

          case 4:
            _context.t0 = _context.sent;

          case 5:
            if (!_context.t0) {
              _context.next = 7;
              break;
            }

            // absolute path
            query = path.relative(config.cwd, query);

          case 7:

            // remove references to node_modules with hashes
            query = query.replace(/([\\/]|^)node_modules[\\/]/g, '#');

            // remove trailing hashes
            query = query.replace(/^#+/g, '');

            // remove trailing paths from each part of the query, skip second part of path for scoped packages
            queryParts = query.split('#');

            queryParts = queryParts.map(function (part) {
              var parts = part.split(/[\\/]/g);

              if (part[0] === '@') {
                parts = parts.slice(0, 2);
              } else {
                parts = parts.slice(0, 1);
              }

              return parts.join('/');
            });
            query = queryParts.join('#');

            return _context.abrupt('return', query);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function cleanQuery(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPackageSize = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(tuple) {
    var _tuple, loc, files, sizes;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _tuple = (0, (_slicedToArray2 || _load_slicedToArray()).default)(tuple, 1);
            loc = _tuple[0];
            _context2.next = 4;
            return (_fs || _load_fs()).walk(loc, null, new (_set || _load_set()).default([(_constants || _load_constants()).METADATA_FILENAME, (_constants || _load_constants()).TARBALL_FILENAME]));

          case 4:
            files = _context2.sent;
            _context2.next = 7;
            return (_promise || _load_promise()).default.all(files.map(function (walkFile) {
              return (_fs || _load_fs()).getFileSizeOnDisk(walkFile.absolute);
            }));

          case 7:
            sizes = _context2.sent;
            return _context2.abrupt('return', sum(sizes));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getPackageSize(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args) {
    var query, lockfile, install, _ref5, depRequests, patterns, hoisted, match, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, loc, info, _match, _match2, matchInfo, matchRef, matchPatterns, matchRequests, reasons, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, request, parentRequest, dependent, chain, delegator, rootType, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, pattern, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _pattern, packageSize, directSizes, transitiveSizes, dependencies, transitiveDependencies, transitiveKeys, sharedDependencies;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (args.length) {
              _context3.next = 2;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('missingWhyDependency'));

          case 2:
            if (!(args.length > 1)) {
              _context3.next = 4;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('tooManyArguments', 1));

          case 4:
            _context3.next = 6;
            return cleanQuery(config, args[0]);

          case 6:
            query = _context3.sent;


            reporter.step(1, 4, reporter.lang('whyStart', args[0]), emoji.get('thinking_face'));

            // init
            reporter.step(2, 4, reporter.lang('whyInitGraph'), emoji.get('truck'));
            _context3.next = 11;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd, reporter);

          case 11:
            lockfile = _context3.sent;
            install = new (_install || _load_install()).Install(flags, config, reporter, lockfile);
            _context3.next = 15;
            return install.fetchRequestFromCwd();

          case 15:
            _ref5 = _context3.sent;
            depRequests = _ref5.requests;
            patterns = _ref5.patterns;
            _context3.next = 20;
            return install.resolver.init(depRequests, install.flags.flat);

          case 20:
            _context3.next = 22;
            return install.linker.getFlatHoistedTree(patterns);

          case 22:
            hoisted = _context3.sent;


            // finding
            reporter.step(3, 4, reporter.lang('whyFinding'), emoji.get('mag'));

            match = void 0;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 28;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(hoisted);

          case 30:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context3.next = 40;
              break;
            }

            _step3$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step3.value, 2);
            loc = _step3$value[0];
            info = _step3$value[1];

            if (!(info.key === query || info.previousKeys.indexOf(query) >= 0)) {
              _context3.next = 37;
              break;
            }

            match = [loc, info];
            return _context3.abrupt('break', 40);

          case 37:
            _iteratorNormalCompletion3 = true;
            _context3.next = 30;
            break;

          case 40:
            _context3.next = 46;
            break;

          case 42:
            _context3.prev = 42;
            _context3.t0 = _context3['catch'](28);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 46:
            _context3.prev = 46;
            _context3.prev = 47;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 49:
            _context3.prev = 49;

            if (!_didIteratorError3) {
              _context3.next = 52;
              break;
            }

            throw _iteratorError3;

          case 52:
            return _context3.finish(49);

          case 53:
            return _context3.finish(46);

          case 54:
            if (match) {
              _context3.next = 57;
              break;
            }

            reporter.error(reporter.lang('whyUnknownMatch'));
            return _context3.abrupt('return');

          case 57:
            _match = match;
            _match2 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_match, 2);
            matchInfo = _match2[1];
            matchRef = matchInfo.pkg._reference;

            invariant(matchRef, 'expected reference');

            matchPatterns = matchRef.patterns;
            matchRequests = matchRef.requests;
            reasons = [];
            // reason: dependency of these modules

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context3.prev = 68;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(matchRequests);

          case 70:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context3.next = 85;
              break;
            }

            request = _step4.value;
            parentRequest = request.parentRequest;

            if (parentRequest) {
              _context3.next = 75;
              break;
            }

            return _context3.abrupt('continue', 82);

          case 75:
            dependent = install.resolver.getResolvedPattern(parentRequest.pattern);

            if (dependent) {
              _context3.next = 78;
              break;
            }

            return _context3.abrupt('continue', 82);

          case 78:
            chain = [];
            delegator = parentRequest;

            do {
              chain.push(install.resolver.getStrictResolvedPattern(delegator.pattern).name);
            } while (delegator = delegator.parentRequest);

            reasons.push({
              type: 'whyDependedOn',
              typeSimple: 'whyDependedOnSimple',
              value: chain.reverse().join('#')
            });

          case 82:
            _iteratorNormalCompletion4 = true;
            _context3.next = 70;
            break;

          case 85:
            _context3.next = 91;
            break;

          case 87:
            _context3.prev = 87;
            _context3.t1 = _context3['catch'](68);
            _didIteratorError4 = true;
            _iteratorError4 = _context3.t1;

          case 91:
            _context3.prev = 91;
            _context3.prev = 92;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 94:
            _context3.prev = 94;

            if (!_didIteratorError4) {
              _context3.next = 97;
              break;
            }

            throw _iteratorError4;

          case 97:
            return _context3.finish(94);

          case 98:
            return _context3.finish(91);

          case 99:

            // reason: exists in manifest
            rootType = void 0;
            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context3.prev = 103;

            for (_iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(matchPatterns); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              pattern = _step5.value;

              rootType = install.rootPatternsToOrigin[pattern];
              if (rootType) {
                reasons.push({
                  type: 'whySpecified',
                  typeSimple: 'whySpecifiedSimple',
                  value: rootType
                });
              }
            }

            // reason: this is hoisted from these modules
            _context3.next = 111;
            break;

          case 107:
            _context3.prev = 107;
            _context3.t2 = _context3['catch'](103);
            _didIteratorError5 = true;
            _iteratorError5 = _context3.t2;

          case 111:
            _context3.prev = 111;
            _context3.prev = 112;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 114:
            _context3.prev = 114;

            if (!_didIteratorError5) {
              _context3.next = 117;
              break;
            }

            throw _iteratorError5;

          case 117:
            return _context3.finish(114);

          case 118:
            return _context3.finish(111);

          case 119:
            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context3.prev = 122;
            for (_iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(matchInfo.previousKeys); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              _pattern = _step6.value;

              if (_pattern !== matchInfo.key) {
                reasons.push({
                  type: 'whyHoistedFrom',
                  typeSimple: 'whyHoistedFromSimple',
                  value: _pattern
                });
              }
            }

            // package sizes
            _context3.next = 130;
            break;

          case 126:
            _context3.prev = 126;
            _context3.t3 = _context3['catch'](122);
            _didIteratorError6 = true;
            _iteratorError6 = _context3.t3;

          case 130:
            _context3.prev = 130;
            _context3.prev = 131;

            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }

          case 133:
            _context3.prev = 133;

            if (!_didIteratorError6) {
              _context3.next = 136;
              break;
            }

            throw _iteratorError6;

          case 136:
            return _context3.finish(133);

          case 137:
            return _context3.finish(130);

          case 138:
            reporter.step(4, 4, reporter.lang('whyCalculating'), emoji.get('aerial_tramway'));

            packageSize = 0;
            directSizes = [];
            transitiveSizes = [];
            _context3.prev = 142;
            _context3.next = 145;
            return getPackageSize(match);

          case 145:
            packageSize = _context3.sent;
            _context3.next = 150;
            break;

          case 148:
            _context3.prev = 148;
            _context3.t4 = _context3['catch'](142);

          case 150:
            dependencies = (0, (_from || _load_from()).default)(collect(hoisted, new (_set || _load_set()).default(), match));
            transitiveDependencies = (0, (_from || _load_from()).default)(collect(hoisted, new (_set || _load_set()).default(), match, { recursive: true }));
            _context3.prev = 152;
            _context3.next = 155;
            return (_promise || _load_promise()).default.all(dependencies.map(getPackageSize));

          case 155:
            directSizes = _context3.sent;
            _context3.next = 158;
            return (_promise || _load_promise()).default.all(transitiveDependencies.map(getPackageSize));

          case 158:
            transitiveSizes = _context3.sent;
            _context3.next = 163;
            break;

          case 161:
            _context3.prev = 161;
            _context3.t5 = _context3['catch'](152);

          case 163:
            transitiveKeys = new (_set || _load_set()).default(transitiveDependencies.map(function (_ref6) {
              var _ref7 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_ref6, 2);

              var info = _ref7[1];
              return info.key;
            }));
            sharedDependencies = getSharedDependencies(hoisted, transitiveKeys);

            //
            // reason: hoisted

            if (query === matchInfo.originalKey) {
              reporter.info(reporter.lang('whyHoistedTo', matchInfo.key));
            }

            if (reasons.length === 1) {
              reporter.info(reporter.lang(reasons[0].typeSimple, reasons[0].value));
            } else if (reasons.length > 1) {
              reporter.info(reporter.lang('whyReasons'));
              reporter.list('reasons', reasons.map(function (reason) {
                return reporter.lang(reason.type, reason.value);
              }));
            } else {
              reporter.error(reporter.lang('whyWhoKnows'));
            }

            if (packageSize) {
              // stats: file size of this dependency without any dependencies
              reporter.info(reporter.lang('whyDiskSizeWithout', bytes(packageSize)));

              // stats: file size of this dependency including dependencies that aren't shared
              reporter.info(reporter.lang('whyDiskSizeUnique', bytes(packageSize + sum(directSizes))));

              // stats: file size of this dependency including dependencies
              reporter.info(reporter.lang('whyDiskSizeTransitive', bytes(packageSize + sum(transitiveSizes))));

              // stats: shared transitive dependencies
              reporter.info(reporter.lang('whySharedDependencies', sharedDependencies.size));
            }

          case 168:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[28, 42, 46, 54], [47,, 49, 53], [68, 87, 91, 99], [92,, 94, 98], [103, 107, 111, 119], [112,, 114, 118], [122, 126, 130, 138], [131,, 133, 137], [142, 148], [152, 161]]);
  }));

  return function run(_x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _constants;

function _load_constants() {
  return _constants = require('../../constants.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireLockfile = exports.requireLockfile = true;

var invariant = require('invariant');
var bytes = require('bytes');
var emoji = require('node-emoji');
var path = require('path');

function sum(array) {
  return array.length ? array.reduce(function (a, b) {
    return a + b;
  }, 0) : 0;
}

function collect(hoistManifests, allDependencies, dependency) {
  var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { recursive: false };

  var recursive = _ref3.recursive;

  var _dependency = (0, (_slicedToArray2 || _load_slicedToArray()).default)(dependency, 2);

  var depInfo = _dependency[1];

  var deps = depInfo.pkg.dependencies;

  if (!deps) {
    return allDependencies;
  }

  var dependencyKeys = new (_set || _load_set()).default((0, (_keys || _load_keys()).default)(deps));
  var directDependencies = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(hoistManifests), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dep = _step.value;

      var _dep = (0, (_slicedToArray2 || _load_slicedToArray()).default)(dep, 2);

      var info = _dep[1];


      if (!allDependencies.has(dep) && dependencyKeys.has(info.key)) {
        allDependencies.add(dep);
        directDependencies.push(dep);
      }
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

  if (recursive) {
    directDependencies.forEach(function (dependency) {
      return collect(hoistManifests, allDependencies, dependency, { recursive: true });
    });
  }

  return allDependencies;
}

function getSharedDependencies(hoistManifests, transitiveKeys) {
  var sharedDependencies = new (_set || _load_set()).default();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(hoistManifests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);

      var info = _step2$value[1];

      if (!transitiveKeys.has(info.key) && info.pkg.dependencies) {
        (0, (_keys || _load_keys()).default)(info.pkg.dependencies).forEach(function (dependency) {
          if (transitiveKeys.has(dependency) && !sharedDependencies.has(dependency)) {
            sharedDependencies.add(dependency);
          }
        });
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

  return sharedDependencies;
}