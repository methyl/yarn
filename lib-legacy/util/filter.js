'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

exports.sortFilter = sortFilter;
exports.matchesFilter = matchesFilter;
exports.ignoreLinesToRegex = ignoreLinesToRegex;

var _misc;

function _load_misc() {
  return _misc = require('./misc.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minimatch = require('minimatch');
var path = require('path');

var WHITESPACE_RE = /^\s+$/;

function sortFilter(files, filters) {
  var keepFiles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new (_set || _load_set()).default();
  var possibleKeepFiles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new (_set || _load_set()).default();
  var ignoreFiles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new (_set || _load_set()).default();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      var keep = false;

      // always keep a file if a ! pattern matches it
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(filters), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var filter = _step5.value;

          if (filter.isNegation && matchesFilter(filter, file.basename, file.relative)) {
            keep = true;
            break;
          }
        }

        //
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

      if (keep) {
        keepFiles.add(file.relative);
        continue;
      }

      // otherwise don't keep it if a pattern matches it
      keep = true;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(filters), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _filter = _step6.value;

          if (!_filter.isNegation && matchesFilter(_filter, file.basename, file.relative)) {
            keep = false;
            break;
          }
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

      if (keep) {
        possibleKeepFiles.add(file.relative);
      } else {
        ignoreFiles.add(file.relative);
      }
    }

    // exclude file
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(possibleKeepFiles), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _file = _step2.value;

      var parts = path.dirname(_file).split(path.sep);

      while (parts.length) {
        var folder = parts.join(path.sep);
        if (ignoreFiles.has(folder)) {
          ignoreFiles.add(_file);
          break;
        }
        parts.pop();
      }
    }

    //
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
    for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(possibleKeepFiles), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _file2 = _step3.value;

      if (!ignoreFiles.has(_file2)) {
        keepFiles.add(_file2);
      }
    }

    //
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

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(keepFiles), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _file3 = _step4.value;

      var _parts = path.dirname(_file3).split(path.sep);

      while (_parts.length) {
        // deregister this folder from being ignored, any files inside
        // will still be marked as ignored
        ignoreFiles.delete(_parts.join(path.sep));
        _parts.pop();
      }
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

  return { keepFiles: keepFiles, ignoreFiles: ignoreFiles };
}

function matchesFilter(filter, basename, loc) {
  if (filter.base && filter.base !== '.') {
    loc = path.relative(filter.base, loc);
  }
  return filter.regex.test(loc) || filter.regex.test('/' + loc) || filter.regex.test(basename);
}

function ignoreLinesToRegex(lines) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  return lines
  // create regex
  .map(function (line) {
    // remove empty lines, comments, etc
    if (line === '' || line === '!' || line[0] === '#' || WHITESPACE_RE.test(line)) {
      return null;
    }

    var pattern = line;
    var isNegation = false;

    // hide the fact that it's a negation from minimatch since we'll handle this specifally
    // ourselves
    if (pattern[0] === '!') {
      isNegation = true;
      pattern = pattern.slice(1);
    }

    // remove trailing slash
    pattern = (0, (_misc || _load_misc()).removeSuffix)(pattern, '/');

    var regex = minimatch.makeRe(pattern, { nocase: true });

    if (regex) {
      return {
        base: base,
        isNegation: isNegation,
        regex: regex
      };
    } else {
      return null;
    }
  }).filter(Boolean);
}