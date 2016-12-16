'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

exports.default = inferLicense;

var _licenses;

function _load_licenses() {
  return _licenses = _interopRequireDefault(require('./licenses.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean(str) {
  return str.replace(/[^A-Za-z\s]/g, ' ').replace(/[\s]+/g, ' ').trim().toLowerCase();
}

var REGEXES = {
  Unlicense: [/http:\/\/unlicense.org\//],
  WTFPL: [/DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE/, /WTFPL\b/],
  ISC: [/The ISC License/, /ISC\b/],
  Apache: [/Apache License\b/],
  MIT: [/MIT\b/],
  BSD: [/BSD\b/]
};

function inferLicense(license) {
  // check if we have any explicit licenses
  var cleanLicense = clean(license);
  for (var licenseName in (_licenses || _load_licenses()).default) {
    var testLicense = (_licenses || _load_licenses()).default[licenseName];
    if (cleanLicense.search(testLicense) >= 0) {
      return licenseName;
    }
  }

  // infer based on some keywords
  for (var _licenseName in REGEXES) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(REGEXES[_licenseName]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var regex = _step.value;

        if (license.search(regex) >= 0) {
          return _licenseName + '*';
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
  }

  return null;
}