'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setPrototypeOf;

function _load_setPrototypeOf() {
  return _setPrototypeOf = _interopRequireDefault(require('babel-runtime/core-js/object/set-prototype-of'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

exports.default = nullify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nullify() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Array.isArray(obj)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        nullify(item);
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
  } else if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(obj)) === 'object' || typeof obj === 'function') {
    (0, (_setPrototypeOf || _load_setPrototypeOf()).default)(obj, null);
    for (var key in obj) {
      nullify(obj[key]);
    }
  }

  return obj;
}