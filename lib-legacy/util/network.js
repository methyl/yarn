'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

exports.isOffline = isOffline;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var os = require('os');

var IGNORE_INTERFACES = ['lo0', 'awdl0', 'bridge0'];
var LOCAL_IPS = ['127.0.0.1', '::1'];

function isOffline() {
  var interfaces = void 0;

  try {
    interfaces = os.networkInterfaces();
  } catch (e) {
    // As of October 2016, Windows Subsystem for Linux (WSL) does not support
    // the os.networkInterfaces() call and throws instead. For this platform,
    // assume we are online.
    if (e.syscall === 'uv_interface_addresses') {
      return false;
    } else {
      throw e;
    }
  }

  for (var name in interfaces) {
    if (IGNORE_INTERFACES.indexOf(name) >= 0) {
      continue;
    }

    var addrs = interfaces[name];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(addrs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var addr = _step.value;

        if (LOCAL_IPS.indexOf(addr.address) < 0) {
          // found a possible remote ip
          return false;
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

  return true;
}