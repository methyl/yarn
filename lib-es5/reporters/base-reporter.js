'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

exports.stringifyLangArgs = stringifyLangArgs;

var _format;

function _load_format() {
  return _format = require('./format.js');
}

var _index;

function _load_index() {
  return _index = _interopRequireWildcard(require('./lang/index.js'));
}

var _isCi;

function _load_isCi() {
  return _isCi = _interopRequireDefault(require('is-ci'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */

var util = require('util');

function stringifyLangArgs(args) {
  return args.map(function (val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        return (0, (_stringify || _load_stringify()).default)(val) || val + '';
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}

var BaseReporter = function () {
  function BaseReporter() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BaseReporter);

    var lang = 'en';
    this.language = lang;

    this.stdout = opts.stdout || process.stdout;
    this.stderr = opts.stderr || process.stderr;
    this.stdin = opts.stdin || process.stdin;
    this.emoji = !!opts.emoji;
    this.noProgress = !!opts.noProgress || (_isCi || _load_isCi()).default;
    this.isVerbose = !!opts.verbose;

    // $FlowFixMe: this is valid!
    this.isTTY = this.stdout.isTTY;

    this.peakMemory = 0;
    this.startTime = Date.now();
    this.format = (_format || _load_format()).defaultFormatter;
  }

  (0, (_createClass2 || _load_createClass()).default)(BaseReporter, [{
    key: 'lang',
    value: function lang(key) {
      var msg = (_index || _load_index())[this.language][key] || (_index || _load_index()).en[key];
      if (!msg) {
        throw new ReferenceError('Unknown language key ' + key);
      }

      // stringify args

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var stringifiedArgs = stringifyLangArgs(args);

      // replace $0 placeholders with args
      return msg.replace(/\$(\d+)/g, function (str, i) {
        return stringifiedArgs[i];
      });
    }
  }, {
    key: 'verbose',
    value: function verbose(msg) {
      if (this.isVerbose) {
        this._verbose(msg);
      }
    }
  }, {
    key: 'verboseInspect',
    value: function verboseInspect(val) {
      if (this.isVerbose) {
        this._verboseInspect(val);
      }
    }
  }, {
    key: '_verbose',
    value: function _verbose(msg) {}
  }, {
    key: '_verboseInspect',
    value: function _verboseInspect(val) {}
  }, {
    key: 'initPeakMemoryCounter',
    value: function initPeakMemoryCounter() {
      var _this = this;

      this.checkPeakMemory();
      this.peakMemoryInterval = setInterval(function () {
        _this.checkPeakMemory();
      }, 1000);
    }
  }, {
    key: 'checkPeakMemory',
    value: function checkPeakMemory() {
      var _process$memoryUsage = process.memoryUsage();

      var heapTotal = _process$memoryUsage.heapTotal;

      if (heapTotal > this.peakMemory) {
        this.peakMemory = heapTotal;
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.peakMemoryInterval) {
        clearInterval(this.peakMemoryInterval);
        this.peakMemoryInterval = null;
      }
    }
  }, {
    key: 'getTotalTime',
    value: function getTotalTime() {
      return Date.now() - this.startTime;
    }

    // TODO

  }, {
    key: 'list',
    value: function list(key, items, hints) {}

    // Outputs basic tree structure to console

  }, {
    key: 'tree',
    value: function tree(key, obj) {}

    // called whenever we begin a step in the CLI.

  }, {
    key: 'step',
    value: function step(current, total, message, emoji) {}

    // a error message has been triggered. this however does not always meant an abrupt
    // program end.

  }, {
    key: 'error',
    value: function error(message) {}

    // an info message has been triggered. this provides things like stats and diagnostics.

  }, {
    key: 'info',
    value: function info(message) {}

    // a warning message has been triggered.

  }, {
    key: 'warn',
    value: function warn(message) {}

    // a success message has been triggered.

  }, {
    key: 'success',
    value: function success(message) {}

    // a simple log message

  }, {
    key: 'log',
    value: function log(message) {}

    // a shell command has been executed

  }, {
    key: 'command',
    value: function command(_command) {}

    // inspect and pretty-print any value

  }, {
    key: 'inspect',
    value: function inspect(value) {}

    // the screen shown at the very start of the CLI

  }, {
    key: 'header',
    value: function header(command, pkg) {}

    // the screen shown at the very end of the CLI

  }, {
    key: 'footer',
    value: function footer(showPeakMemory) {}

    //

  }, {
    key: 'table',
    value: function table(head, body) {}

    // render an activity spinner and return a function that will trigger an update

  }, {
    key: 'activity',
    value: function activity() {
      return {
        tick: function tick(name) {},
        end: function end() {}
      };
    }

    //

  }, {
    key: 'activitySet',
    value: function activitySet(total, workers) {
      return {
        spinners: Array(workers).fill({
          clear: function clear() {},
          setPrefix: function setPrefix() {},
          tick: function tick() {},
          end: function end() {}
        }),
        end: function end() {}
      };
    }

    //

  }, {
    key: 'question',
    value: function question(_question) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (_promise || _load_promise()).default.reject(new Error('Not implemented'));
    }

    //

  }, {
    key: 'questionAffirm',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(question) {
        var condition, answer;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                condition = true; // trick eslint

              case 1:
                if (!condition) {
                  _context.next = 13;
                  break;
                }

                _context.next = 4;
                return this.question(question);

              case 4:
                answer = _context.sent;

                answer = answer.toLowerCase();

                if (!(answer === 'y' || answer === 'yes')) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', true);

              case 8:
                if (!(answer === 'n' || answer === 'no')) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', false);

              case 10:

                this.error('Invalid answer for question');
                _context.next = 1;
                break;

              case 13:
                return _context.abrupt('return', false);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function questionAffirm(_x3) {
        return _ref.apply(this, arguments);
      }

      return questionAffirm;
    }()

    // prompt the user to select an option from an array

  }, {
    key: 'select',
    value: function select(header, question, options) {
      return (_promise || _load_promise()).default.reject(new Error('Not implemented'));
    }

    // render a progress bar and return a function which when called will trigger an update

  }, {
    key: 'progress',
    value: function progress(total) {
      return function () {};
    }
  }]);
  return BaseReporter;
}();

exports.default = BaseReporter;