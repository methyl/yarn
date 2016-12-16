'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
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

var _jsonReporter;

function _load_jsonReporter() {
  return _jsonReporter = _interopRequireDefault(require('./json-reporter.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('events');

var EventEmitter = _require.EventEmitter;

var EventReporter = function (_JSONReporter) {
  (0, (_inherits2 || _load_inherits()).default)(EventReporter, _JSONReporter);

  function EventReporter(opts) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, EventReporter);

    // $FlowFixMe: looks like a flow bug
    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (EventReporter.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(EventReporter)).call(this, opts));

    EventEmitter.call(_this);
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(EventReporter, [{
    key: '_dump',
    value: function _dump(type, data) {
      this.emit(type, data);
    }
  }]);
  return EventReporter;
}((_jsonReporter || _load_jsonReporter()).default);

// $FlowFixMe: need to "inherit" from it


exports.default = EventReporter;
(0, (_assign || _load_assign()).default)(EventReporter.prototype, EventEmitter.prototype);