'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

exports.isValidPackageName = isValidPackageName;

exports.default = function (info, isRoot, reporter, warn) {
  if (isRoot) {
    for (var key in (_typos || _load_typos()).default) {
      if (key in info) {
        warn(reporter.lang('manifestPotentialTypo', key, (_typos || _load_typos()).default[key]));
      }
    }
  }

  // validate name
  var name = info.name;

  if (typeof name === 'string') {
    if (isRoot && isBuiltinModule(name)) {
      warn(reporter.lang('manifestBuiltinModule', name));
    }

    // cannot start with a dot
    if (name[0] === '.') {
      throw new (_errors || _load_errors()).MessageError(reporter.lang('manifestNameDot'));
    }

    // cannot contain the following characters
    if (!isValidPackageName(name)) {
      throw new (_errors || _load_errors()).MessageError(reporter.lang('manifestNameIllegalChars'));
    }

    // cannot equal node_modules or favicon.ico
    var lower = name.toLowerCase();
    if (lower === 'node_modules' || lower === 'favicon.ico') {
      throw new (_errors || _load_errors()).MessageError(reporter.lang('manifestNameBlacklisted'));
    }
  }

  // validate license
  if (isRoot && !info.private) {
    if (typeof info.license === 'string') {
      var license = info.license.replace(/\*$/g, '');
      if (!(0, (_util || _load_util()).isValidLicense)(license)) {
        warn(reporter.lang('manifestLicenseInvalid'));
      }
    } else {
      warn(reporter.lang('manifestLicenseNone'));
    }
  }

  // validate strings
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(strings), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _key = _step.value;

      var val = info[_key];
      if (val && typeof val !== 'string') {
        throw new (_errors || _load_errors()).MessageError(reporter.lang('manifestStringExpected', _key));
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

  cleanDependencies(info, isRoot, reporter, warn);
};

exports.cleanDependencies = cleanDependencies;

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _util;

function _load_util() {
  return _util = require('./util.js');
}

var _typos;

function _load_typos() {
  return _typos = _interopRequireDefault(require('./typos.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBuiltinModule = require('is-builtin-module');

var strings = ['name', 'version'];

var dependencyKeys = [
// npm registry will include optionalDependencies in dependencies and we'll want to dedupe them from the
// other fields first
'optionalDependencies',

// it's seemingly common to include a dependency in dependencies and devDependencies of the same name but
// different ranges, this can cause a lot of issues with our determinism and the behaviour of npm is
// currently unspecified.
'dependencies', 'devDependencies'];

function isValidName(name) {
  return !name.match(/[\/@\s\+%:]/) && encodeURIComponent(name) === name;
}

function isValidScopedName(name) {
  if (name[0] !== '@') {
    return false;
  }

  var parts = name.slice(1).split('/');
  return parts.length === 2 && isValidName(parts[0]) && isValidName(parts[1]);
}

function isValidPackageName(name) {
  return isValidName(name) || isValidScopedName(name);
}

function cleanDependencies(info, isRoot, reporter, warn) {
  // get dependency objects
  var depTypes = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(dependencyKeys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var type = _step2.value;

      var deps = info[type];
      if (!deps || (typeof deps === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(deps)) !== 'object') {
        continue;
      }
      depTypes.push([type, deps]);
    }

    // ensure that dependencies don't have ones that can collide
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(depTypes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step3.value, 2);

      var _type = _step3$value[0];
      var _deps = _step3$value[1];

      for (var name in _deps) {
        var version = _deps[name];

        // check collisions
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(depTypes), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 2);

            var type2 = _step4$value[0];
            var deps2 = _step4$value[1];

            var version2 = deps2[name];
            if (_deps === deps2 || !version2 || version2 === '*') {
              continue;
            }

            if (version !== version2 && isRoot) {
              // only throw a warning when at the root
              warn(reporter.lang('manifestDependencyCollision', _type, name, version, type2, version2));
            }

            delete deps2[name];
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