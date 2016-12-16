'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
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

var _baseReporter;

function _load_baseReporter() {
  return _baseReporter = _interopRequireDefault(require('./base-reporter.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSONReporter = function (_BaseReporter) {
  (0, (_inherits2 || _load_inherits()).default)(JSONReporter, _BaseReporter);

  function JSONReporter(opts) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, JSONReporter);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (JSONReporter.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(JSONReporter)).call(this, opts));

    _this._activityId = 0;
    _this._progressId = 0;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(JSONReporter, [{
    key: '_dump',
    value: function _dump(type, data, error) {
      var stdout = this.stdout;
      if (error) {
        stdout = this.stderr;
      }
      stdout.write((0, (_stringify || _load_stringify()).default)({ type: type, data: data }) + '\n');
    }
  }, {
    key: '_verbose',
    value: function _verbose(msg) {
      this._dump('verbose', msg);
    }
  }, {
    key: 'list',
    value: function list(type, items, hints) {
      this._dump('list', { type: type, items: items, hints: hints });
    }
  }, {
    key: 'tree',
    value: function tree(type, trees) {
      this._dump('tree', { type: type, trees: trees });
    }
  }, {
    key: 'step',
    value: function step(current, total, message) {
      this._dump('step', { message: message, current: current, total: total });
    }
  }, {
    key: 'inspect',
    value: function inspect(value) {
      this._dump('inspect', value);
    }
  }, {
    key: 'footer',
    value: function footer() {
      this._dump('finished', this.getTotalTime());
    }
  }, {
    key: 'log',
    value: function log(msg) {
      this._dump('log', msg);
    }
  }, {
    key: 'command',
    value: function command(msg) {
      this._dump('command', msg);
    }
  }, {
    key: 'table',
    value: function table(head, body) {
      this._dump('table', { head: head, body: body });
    }
  }, {
    key: 'success',
    value: function success(msg) {
      this._dump('success', msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      this._dump('error', msg, true);
    }
  }, {
    key: 'warn',
    value: function warn(msg) {
      this._dump('warning', msg, true);
    }
  }, {
    key: 'info',
    value: function info(msg) {
      this._dump('info', msg);
    }
  }, {
    key: 'activitySet',
    value: function activitySet(total, workers) {
      var _this2 = this;

      var id = this._activityId++;
      this._dump('activitySetStart', { id: id, total: total, workers: workers });

      var spinners = [];

      var _loop = function _loop(i) {
        var current = 0;
        var header = '';

        spinners.push({
          clear: function clear() {},
          setPrefix: function setPrefix(_current, _header) {
            current = _current;
            header = _header;
          },

          tick: function tick(msg) {
            _this2._dump('activitySetTick', { id: id, header: header, current: current, worker: i, message: msg });
          },
          end: function end() {}
        });
      };

      for (var i = 0; i < workers; i++) {
        _loop(i);
      }

      return {
        spinners: spinners,
        end: function end() {
          _this2._dump('activitySetEnd', { id: id });
        }
      };
    }
  }, {
    key: 'activity',
    value: function activity() {
      return this._activity({});
    }
  }, {
    key: '_activity',
    value: function _activity(data) {
      var _this3 = this;

      var id = this._activityId++;
      this._dump('activityStart', (0, (_extends2 || _load_extends()).default)({ id: id }, data));

      return {
        tick: function tick(name) {
          _this3._dump('activityTick', { id: id, name: name });
        },

        end: function end() {
          _this3._dump('activityEnd', { id: id });
        }
      };
    }
  }, {
    key: 'progress',
    value: function progress(total) {
      var _this4 = this;

      var id = this._progressId++;
      var current = 0;
      this._dump('progressStart', { id: id, total: total });

      return function () {
        current++;
        _this4._dump('progressTick', { id: id, current: current });

        if (current === total) {
          _this4._dump('progressFinish', { id: id });
        }
      };
    }
  }]);
  return JSONReporter;
}((_baseReporter || _load_baseReporter()).default);

exports.default = JSONReporter;