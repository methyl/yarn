"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpawnError = exports.SecurityError = exports.MessageError = undefined;

var _getPrototypeOf;

function _load_getPrototypeOf() {
  return _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));
}

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageError = exports.MessageError = function (_Error) {
  (0, (_inherits2 || _load_inherits()).default)(MessageError, _Error);

  function MessageError(msg, code) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, MessageError);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (MessageError.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(MessageError)).call(this, msg));

    _this.code = code;
    return _this;
  }

  return MessageError;
}(Error);

var SecurityError = exports.SecurityError = function (_MessageError) {
  (0, (_inherits2 || _load_inherits()).default)(SecurityError, _MessageError);

  function SecurityError() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, SecurityError);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (SecurityError.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(SecurityError)).apply(this, arguments));
  }

  return SecurityError;
}(MessageError);

var SpawnError = exports.SpawnError = function (_MessageError2) {
  (0, (_inherits2 || _load_inherits()).default)(SpawnError, _MessageError2);

  function SpawnError() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, SpawnError);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (SpawnError.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(SpawnError)).apply(this, arguments));
  }

  return SpawnError;
}(MessageError);