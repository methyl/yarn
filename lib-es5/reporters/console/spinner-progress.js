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

var Spinner = function () {
  function Spinner() {
    var stdout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.stderr;
    var lineNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Spinner);

    this.current = 0;
    this.prefix = '';
    this.lineNumber = lineNumber;
    this.stdout = stdout;
    this.delay = 60;
    this.chars = Spinner.spinners[28].split('');
    this.text = '';
    this.id = null;
  }

  (0, (_createClass2 || _load_createClass()).default)(Spinner, [{
    key: 'setPrefix',
    value: function setPrefix(prefix) {
      this.prefix = prefix;
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      this.text = text;
    }
  }, {
    key: 'start',
    value: function start() {
      this.current = 0;
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      if (this.id) {
        clearTimeout(this.id);
      }

      // build line ensuring we don't wrap to the next line
      var msg = '' + this.prefix + this.chars[this.current] + ' ' + this.text;
      var columns = typeof this.stdout.columns === 'number' ? this.stdout.columns : 100;
      msg = msg.slice(0, columns);

      (0, (_util || _load_util()).writeOnNthLine)(this.stdout, this.lineNumber, msg);

      this.current = ++this.current % this.chars.length;
      this.id = setTimeout(function () {
        return _this.render();
      }, this.delay);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.id) {
        clearTimeout(this.id);
        this.id = null;
      }

      (0, (_util || _load_util()).clearNthLine)(this.stdout, this.lineNumber);
    }
  }]);
  return Spinner;
}();

Spinner.spinners = ['|/-\\', '⠂-–—–-', '◐◓◑◒', '◴◷◶◵', '◰◳◲◱', '▖▘▝▗', '■□▪▫', '▌▀▐▄', '▉▊▋▌▍▎▏▎▍▌▋▊▉', '▁▃▄▅▆▇█▇▆▅▄▃', '←↖↑↗→↘↓↙', '┤┘┴└├┌┬┐', '◢◣◤◥', '.oO°Oo.', '.oO@*', '🌍🌎🌏', '◡◡ ⊙⊙ ◠◠', '☱☲☴', '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏', '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓', '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆', '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋', '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁', '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈', '⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈', '⢄⢂⢁⡁⡈⡐⡠', '⢹⢺⢼⣸⣇⡧⡗⡏', '⣾⣽⣻⢿⡿⣟⣯⣷', '⠁⠂⠄⡀⢀⠠⠐⠈'];
exports.default = Spinner;