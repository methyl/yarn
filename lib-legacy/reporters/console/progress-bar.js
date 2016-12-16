'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _util;

function _load_util() {
  return _util = require('./util.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repeat = require('repeating');

var ProgressBar = function () {
  function ProgressBar(total) {
    var stdout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.stderr;
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, ProgressBar);

    this.stdout = stdout;
    this.total = total;
    this.chars = ProgressBar.bars[0].split('');
    this.delay = 60;
    this.curr = 0;
    (0, (_util || _load_util()).clearLine)(stdout);
  }

  (0, (_createClass2 || _load_createClass()).default)(ProgressBar, [{
    key: 'tick',
    value: function tick() {
      var _this = this;

      this.curr++;

      // schedule render
      if (!this.id) {
        this.id = setTimeout(function () {
          return _this.render();
        }, this.delay);
      }

      // progress complete
      if (this.curr >= this.total) {
        clearTimeout(this.id);
        (0, (_util || _load_util()).clearLine)(this.stdout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // clear throttle
      clearTimeout(this.id);
      this.id = null;

      var ratio = this.curr / this.total;
      ratio = Math.min(Math.max(ratio, 0), 1);

      // progress without bar
      var bar = ' ' + this.curr + '/' + this.total;

      // calculate size of actual bar
      // $FlowFixMe: investigate process.stderr.columns flow error
      var availableSpace = Math.max(0, this.stdout.columns - bar.length - 1);
      var width = Math.min(this.total, availableSpace);
      var completeLength = Math.round(width * ratio);
      var complete = repeat(this.chars[0], completeLength);
      var incomplete = repeat(this.chars[1], width - completeLength);
      bar = '' + complete + incomplete + bar;

      (0, (_util || _load_util()).toStartOfLine)(this.stdout);
      this.stdout.write(bar);
    }
  }]);
  return ProgressBar;
}();

ProgressBar.bars = ['█░'];
exports.default = ProgressBar;