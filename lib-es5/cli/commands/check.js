'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.noArguments = exports.requireLockfile = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var lockfile, install, humaniseLocation, warningCount, errCount, reportError, _ref2, rawPatterns, patterns, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pattern, integrityLoc, match, res, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, loc, _step2$value$, originalKey, pkg, ignore, parts, human, hoistedParts, hoistedKey, humanParts, i, humanPart, pkgLoc, packageJson, deps, name, range, subHuman, possibles, depPkgLoc, _i, myParts, myDepPkgLoc, _myDepPkgLoc, depPkg, foundHuman, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _loc, _packageJson;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reportError = function reportError(msg) {
              reporter.error(msg);
              errCount++;
            };

            humaniseLocation = function humaniseLocation(loc) {
              var relative = path.relative(path.join(config.cwd, 'node_modules'), loc);
              var normalized = path.normalize(relative).split(path.sep);
              return normalized.filter(function (p) {
                return p !== 'node_modules';
              });
            };

            _context.next = 4;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

          case 4:
            lockfile = _context.sent;
            install = new (_install || _load_install()).Install(flags, config, reporter, lockfile);
            warningCount = 0;
            errCount = 0;
            _context.next = 10;
            return install.hydrate(true);

          case 10:
            _ref2 = _context.sent;
            rawPatterns = _ref2.patterns;
            _context.next = 14;
            return install.flatten(rawPatterns);

          case 14:
            patterns = _context.sent;


            // check if patterns exist in lockfile
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 18;
            for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)(patterns); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              pattern = _step.value;

              if (!lockfile.getLocked(pattern)) {
                reportError('Lockfile does not contain pattern: ' + pattern);
              }
            }

            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](18);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 26:
            _context.prev = 26;
            _context.prev = 27;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 29:
            _context.prev = 29;

            if (!_didIteratorError) {
              _context.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context.finish(29);

          case 33:
            return _context.finish(26);

          case 34:
            if (!flags.integrity) {
              _context.next = 53;
              break;
            }

            _context.next = 37;
            return install.getIntegrityHashLocation();

          case 37:
            integrityLoc = _context.sent;
            _context.t1 = integrityLoc;

            if (!_context.t1) {
              _context.next = 43;
              break;
            }

            _context.next = 42;
            return (_fs || _load_fs()).exists(integrityLoc);

          case 42:
            _context.t1 = _context.sent;

          case 43:
            if (!_context.t1) {
              _context.next = 50;
              break;
            }

            _context.next = 46;
            return install.matchesIntegrityHash(patterns);

          case 46:
            match = _context.sent;

            if (match.matches === false) {
              reportError('Integrity hashes don\'t match, expected ' + match.expected + ' but got ' + match.actual);
            }
            _context.next = 51;
            break;

          case 50:
            reportError("Couldn't find an integrity hash file");

          case 51:
            _context.next = 171;
            break;

          case 53:
            _context.next = 55;
            return install.linker.getFlatHoistedTree(patterns);

          case 55:
            res = _context.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 59;
            _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(res);

          case 61:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 157;
              break;
            }

            _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);
            loc = _step2$value[0];
            _step2$value$ = _step2$value[1];
            originalKey = _step2$value$.originalKey;
            pkg = _step2$value$.pkg;
            ignore = _step2$value$.ignore;

            if (!ignore) {
              _context.next = 70;
              break;
            }

            return _context.abrupt('continue', 154);

          case 70:
            parts = humaniseLocation(loc);

            // grey out hoisted portions of key

            human = originalKey;
            hoistedParts = parts.slice();
            hoistedKey = parts.join('#');

            if (human !== hoistedKey) {
              humanParts = human.split('#');


              for (i = 0; i < humanParts.length; i++) {
                humanPart = humanParts[i];


                if (hoistedParts[0] === humanPart) {
                  hoistedParts.shift();

                  if (i < humanParts.length - 1) {
                    humanParts[i] += '#';
                  }
                } else {
                  humanParts[i] = reporter.format.dim(humanPart + '#');
                }
              }

              human = humanParts.join('');
            }

            pkgLoc = path.join(loc, 'package.json');
            _context.next = 78;
            return (_fs || _load_fs()).exists(loc);

          case 78:
            _context.t2 = !_context.sent;

            if (_context.t2) {
              _context.next = 83;
              break;
            }

            _context.next = 82;
            return (_fs || _load_fs()).exists(pkgLoc);

          case 82:
            _context.t2 = !_context.sent;

          case 83:
            if (!_context.t2) {
              _context.next = 86;
              break;
            }

            reportError(human + ' not installed');
            return _context.abrupt('continue', 154);

          case 86:
            _context.next = 88;
            return config.readJson(pkgLoc);

          case 88:
            packageJson = _context.sent;

            if (pkg.version !== packageJson.version) {
              // node_modules contains wrong version
              reportError(human + ' is wrong version: expected ' + pkg.version + ', got ' + packageJson.version);
            }

            deps = (0, (_assign || _load_assign()).default)({}, packageJson.dependencies, packageJson.peerDependencies);
            _context.t3 = (_regenerator || _load_regenerator()).default.keys(deps);

          case 92:
            if ((_context.t4 = _context.t3()).done) {
              _context.next = 154;
              break;
            }

            name = _context.t4.value;
            range = deps[name];

            if (semver.validRange(range, config.looseSemver)) {
              _context.next = 97;
              break;
            }

            return _context.abrupt('continue', 92);

          case 97:
            subHuman = human + '#' + name + '@' + range;

            // find the package that this will resolve to, factoring in hoisting

            possibles = [];
            depPkgLoc = void 0;

            for (_i = parts.length; _i >= 0; _i--) {
              myParts = parts.slice(0, _i).concat(name);

              // build package.json location for this position

              myDepPkgLoc = path.join(config.cwd, 'node_modules', myParts.join(path.sep + 'node_modules' + path.sep), 'package.json');


              possibles.push(myDepPkgLoc);
            }

          case 101:
            if (!possibles.length) {
              _context.next = 110;
              break;
            }

            _myDepPkgLoc = possibles.shift();
            _context.next = 105;
            return (_fs || _load_fs()).exists(_myDepPkgLoc);

          case 105:
            if (!_context.sent) {
              _context.next = 108;
              break;
            }

            depPkgLoc = _myDepPkgLoc;
            return _context.abrupt('break', 110);

          case 108:
            _context.next = 101;
            break;

          case 110:
            if (depPkgLoc) {
              _context.next = 112;
              break;
            }

            return _context.abrupt('continue', 92);

          case 112:
            _context.next = 114;
            return config.readJson(depPkgLoc);

          case 114:
            depPkg = _context.sent;
            foundHuman = humaniseLocation(path.dirname(depPkgLoc)).join('#') + '@' + depPkg.version;

            if (semver.satisfies(depPkg.version, range, config.looseSemver)) {
              _context.next = 119;
              break;
            }

            // module isn't correct semver
            reportError(subHuman + ' doesn\'t satisfy found match of ' + foundHuman);
            return _context.abrupt('continue', 92);

          case 119:

            // check for modules above us that this could be deduped to
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 122;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(possibles);

          case 124:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 138;
              break;
            }

            _loc = _step3.value;
            _context.next = 128;
            return (_fs || _load_fs()).exists(_loc);

          case 128:
            if (_context.sent) {
              _context.next = 130;
              break;
            }

            return _context.abrupt('continue', 135);

          case 130:
            _context.next = 132;
            return config.readJson(_loc);

          case 132:
            _packageJson = _context.sent;

            if (_packageJson.version === depPkg.version || semver.satisfies(_packageJson.version, range, config.looseSemver) && semver.gt(_packageJson.version, depPkg.version, config.looseSemver)) {
              reporter.warn(subHuman + ' could be deduped from ' + _packageJson.version + ' to ' + (humaniseLocation(path.dirname(_loc)).join('#') + '@' + _packageJson.version));
              warningCount++;
            }
            return _context.abrupt('break', 138);

          case 135:
            _iteratorNormalCompletion3 = true;
            _context.next = 124;
            break;

          case 138:
            _context.next = 144;
            break;

          case 140:
            _context.prev = 140;
            _context.t5 = _context['catch'](122);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t5;

          case 144:
            _context.prev = 144;
            _context.prev = 145;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 147:
            _context.prev = 147;

            if (!_didIteratorError3) {
              _context.next = 150;
              break;
            }

            throw _iteratorError3;

          case 150:
            return _context.finish(147);

          case 151:
            return _context.finish(144);

          case 152:
            _context.next = 92;
            break;

          case 154:
            _iteratorNormalCompletion2 = true;
            _context.next = 61;
            break;

          case 157:
            _context.next = 163;
            break;

          case 159:
            _context.prev = 159;
            _context.t6 = _context['catch'](59);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t6;

          case 163:
            _context.prev = 163;
            _context.prev = 164;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 166:
            _context.prev = 166;

            if (!_didIteratorError2) {
              _context.next = 169;
              break;
            }

            throw _iteratorError2;

          case 169:
            return _context.finish(166);

          case 170:
            return _context.finish(163);

          case 171:

            if (warningCount > 1) {
              reporter.info(reporter.lang('foundWarnings', warningCount));
            }

            if (!(errCount > 0)) {
              _context.next = 176;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('foundErrors', errCount));

          case 176:
            reporter.success(reporter.lang('folderInSync'));

          case 177:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[18, 22, 26, 34], [27,, 29, 33], [59, 159, 163, 171], [122, 140, 144, 152], [145,, 147, 151], [164,, 166, 170]]);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semver = require('semver');
var path = require('path');

var requireLockfile = exports.requireLockfile = true;
var noArguments = exports.noArguments = true;

function setFlags(commander) {
  commander.option('--integrity');
}