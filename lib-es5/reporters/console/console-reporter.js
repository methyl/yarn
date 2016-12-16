'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _toConsumableArray2;

function _load_toConsumableArray() {
  return _toConsumableArray2 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));
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

var _get2;

function _load_get() {
  return _get2 = _interopRequireDefault(require('babel-runtime/helpers/get'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

var _baseReporter;

function _load_baseReporter() {
  return _baseReporter = _interopRequireDefault(require('../base-reporter.js'));
}

var _progressBar;

function _load_progressBar() {
  return _progressBar = _interopRequireDefault(require('./progress-bar.js'));
}

var _spinnerProgress;

function _load_spinnerProgress() {
  return _spinnerProgress = _interopRequireDefault(require('./spinner-progress.js'));
}

var _util;

function _load_util() {
  return _util = require('./util.js');
}

var _misc;

function _load_misc() {
  return _misc = require('../../util/misc.js');
}

var _treeHelper;

function _load_treeHelper() {
  return _treeHelper = require('./helpers/tree-helper.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('util');

var _inspect = _require.inspect;

var readline = require('readline');
var repeat = require('repeating');
var chalk = require('chalk');
var read = require('read');

var ConsoleReporter = function (_BaseReporter) {
  (0, (_inherits2 || _load_inherits()).default)(ConsoleReporter, _BaseReporter);

  function ConsoleReporter(opts) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, ConsoleReporter);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (ConsoleReporter.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(ConsoleReporter)).call(this, opts));

    _this._lastCategorySize = 0;

    _this.format = chalk;
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(ConsoleReporter, [{
    key: '_prependEmoji',
    value: function _prependEmoji(msg, emoji) {
      if (this.emoji && emoji && this.isTTY) {
        msg = emoji + '  ' + msg;
      }
      return msg;
    }
  }, {
    key: '_logCategory',
    value: function _logCategory(category, color, msg) {
      this._lastCategorySize = category.length;
      this._log(this.format[color](category) + ' ' + msg);
    }
  }, {
    key: '_verbose',
    value: function _verbose(msg) {
      this._logCategory('verbose', 'grey', msg);
    }
  }, {
    key: '_verboseInspect',
    value: function _verboseInspect(obj) {
      this.inspect(obj);
    }
  }, {
    key: 'table',
    value: function table(head, body) {
      var _this2 = this;

      //
      head = head.map(function (field) {
        return _this2.format.underline(field);
      });

      //
      var rows = [head].concat(body);

      // get column widths
      var cols = [];

      var _loop = function _loop(i) {
        var widths = rows.map(function (row) {
          return _this2.format.stripColor(row[i]).length;
        });
        cols[i] = Math.max.apply(Math, (0, (_toConsumableArray2 || _load_toConsumableArray()).default)(widths));
      };

      for (var i = 0; i < head.length; i++) {
        _loop(i);
      }

      //
      var builtRows = rows.map(function (row) {
        for (var _i = 0; _i < row.length; _i++) {
          var field = row[_i];
          var padding = cols[_i] - _this2.format.stripColor(field).length;

          row[_i] = field + repeat(' ', padding);
        }
        return row.join(' ');
      });

      this.log(builtRows.join('\n'));
    }
  }, {
    key: 'step',
    value: function step(current, total, msg, emoji) {
      msg = this._prependEmoji(msg, emoji);

      if (msg.endsWith('?')) {
        msg = (0, (_misc || _load_misc()).removeSuffix)(msg, '?') + '...?';
      } else {
        msg += '...';
      }

      this.log(this.format.dim('[' + current + '/' + total + ']') + ' ' + msg);
    }
  }, {
    key: 'inspect',
    value: function inspect(value) {
      if (typeof value !== 'number' && typeof value !== 'string') {
        value = _inspect(value, {
          breakLength: 0,
          colors: true,
          depth: null,
          maxArrayLength: null
        });
      }

      this.log('' + value);
    }
  }, {
    key: 'list',
    value: function list(key, items, hints) {
      var gutterWidth = (this._lastCategorySize || 2) - 1;

      if (hints) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            this._log(repeat(' ', gutterWidth) + '- ' + item);
            this._log('  ' + repeat(' ', gutterWidth) + ' ' + hints[item]);
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
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(items), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;

            this._log(repeat(' ', gutterWidth) + '- ' + _item);
          }
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
      }
    }
  }, {
    key: 'header',
    value: function header(command, pkg) {
      this.log(this.format.bold(pkg.name + ' ' + command + ' v' + pkg.version));
    }
  }, {
    key: 'footer',
    value: function footer(showPeakMemory) {
      var totalTime = (this.getTotalTime() / 1000).toFixed(2);
      var msg = 'Done in ' + totalTime + 's.';
      if (showPeakMemory) {
        var peakMemory = (this.peakMemory / 1024 / 1024).toFixed(2);
        msg += ' Peak memory usage ' + peakMemory + 'MB.';
      }
      this.log(this._prependEmoji(msg, '✨'));
    }
  }, {
    key: 'log',
    value: function log(msg) {
      this._lastCategorySize = 0;
      this._log(msg);
    }
  }, {
    key: '_log',
    value: function _log(msg) {
      (0, (_util || _load_util()).clearLine)(this.stdout);
      this.stdout.write(msg + '\n');
    }
  }, {
    key: 'success',
    value: function success(msg) {
      this._logCategory('success', 'green', msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      (0, (_util || _load_util()).clearLine)(this.stderr);
      this.stderr.write(this.format.red('error') + ' ' + msg + '\n');
    }
  }, {
    key: 'info',
    value: function info(msg) {
      this._logCategory('info', 'blue', msg);
    }
  }, {
    key: 'command',
    value: function command(_command) {
      this.log(this.format.dim('$ ' + _command));
    }
  }, {
    key: 'warn',
    value: function warn(msg) {
      (0, (_util || _load_util()).clearLine)(this.stderr);
      this.stderr.write(this.format.yellow('warning') + ' ' + msg + '\n');
    }
  }, {
    key: 'question',
    value: function question(_question) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!process.stdout.isTTY) {
        return (_promise || _load_promise()).default.reject(new Error("Can't answer a question unless a user TTY"));
      }

      return new (_promise || _load_promise()).default(function (resolve, reject) {
        read({
          prompt: _this3.format.dim('question') + ' ' + _question + ': ',
          silent: !!options.password,
          output: _this3.stdout,
          input: _this3.stdin
        }, function (err, answer) {
          if (err) {
            if (err.message === 'canceled') {
              process.exit(1);
            } else {
              reject(err);
            }
          } else {
            if (!answer && options.required) {
              _this3.error(_this3.lang('answerRequired'));
              resolve(_this3.question(_question, options));
            } else {
              resolve(answer);
            }
          }
        });
      });
    }
    // handles basic tree output to console

  }, {
    key: 'tree',
    value: function tree(key, trees) {
      var _this4 = this;

      //
      var output = function output(_ref, level, end) {
        var name = _ref.name;
        var children = _ref.children;
        var hint = _ref.hint;
        var color = _ref.color;

        var formatter = _this4.format;
        var out = (0, (_treeHelper || _load_treeHelper()).getFormattedOutput)({ end: end, level: level, hint: hint, color: color, name: name, formatter: formatter });
        _this4.stdout.write(out);

        if (children && children.length) {
          (0, (_treeHelper || _load_treeHelper()).recurseTree)((0, (_treeHelper || _load_treeHelper()).sortTrees)(children), level, output);
        }
      };
      (0, (_treeHelper || _load_treeHelper()).recurseTree)((0, (_treeHelper || _load_treeHelper()).sortTrees)(trees), -1, output);
    }
  }, {
    key: 'activitySet',
    value: function activitySet(total, workers) {
      var _this5 = this;

      if (!this.isTTY || this.noProgress) {
        return (0, (_get2 || _load_get()).default)(ConsoleReporter.prototype.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(ConsoleReporter.prototype), 'activitySet', this).call(this, total, workers);
      }

      var spinners = [];

      for (var i = 1; i < workers; i++) {
        this.log('');
      }

      var _loop2 = function _loop2(_i2) {
        var spinner = new (_spinnerProgress || _load_spinnerProgress()).default(_this5.stderr, _i2);
        spinner.start();

        var prefix = null;
        var current = 0;
        var updatePrefix = function updatePrefix() {
          spinner.setPrefix(_this5.format.dim('[' + (current === 0 ? '-' : current) + '/' + total + ']') + ' ');
        };
        var clear = function clear() {
          prefix = null;
          current = 0;
          updatePrefix();
          spinner.setText('waiting...');
        };
        clear();

        spinners.unshift({
          clear: clear,

          setPrefix: function setPrefix(_current, _prefix) {
            current = _current;
            prefix = _prefix;
            spinner.setText(prefix);
            updatePrefix();
          },
          tick: function tick(msg) {
            if (prefix) {
              msg = prefix + ': ' + msg;
            }
            spinner.setText(msg);
          },
          end: function end() {
            spinner.stop();
          }
        });
      };

      for (var _i2 = 0; _i2 < workers; _i2++) {
        _loop2(_i2);
      }

      return {
        spinners: spinners,
        end: function end() {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(spinners), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _spinner = _step3.value;

              _spinner.end();
            }
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

          readline.moveCursor(_this5.stdout, 0, -workers + 1);
        }
      };
    }
  }, {
    key: 'activity',
    value: function activity() {
      if (!this.isTTY) {
        return {
          tick: function tick() {},
          end: function end() {}
        };
      }

      var spinner = new (_spinnerProgress || _load_spinnerProgress()).default(this.stderr);
      spinner.start();

      return {
        tick: function tick(name) {
          spinner.setText(name);
        },
        end: function end() {
          spinner.stop();
        }
      };
    }
  }, {
    key: 'select',
    value: function select(header, question, options) {
      var _this6 = this;

      if (!this.isTTY) {
        return (_promise || _load_promise()).default.reject(new Error("Can't answer a question unless a user TTY"));
      }

      var rl = readline.createInterface({
        input: this.stdin,
        output: this.stdout,
        terminal: true
      });

      var questions = options.map(function (opt) {
        return opt.name;
      });
      var answers = options.map(function (opt) {
        return opt.value;
      });

      function toIndex(input) {
        var index = answers.indexOf(input);

        if (index >= 0) {
          return index;
        } else {
          return +input;
        }
      }

      return new (_promise || _load_promise()).default(function (resolve) {
        _this6.info(header);

        for (var i = 0; i < questions.length; i++) {
          _this6.log('  ' + _this6.format.dim(i + 1 + ')') + ' ' + questions[i]);
        }

        var ask = function ask() {
          rl.question(question + ': ', function (input) {
            var index = toIndex(input);

            if (isNaN(index)) {
              _this6.log('Not a number');
              ask();
              return;
            }

            if (index <= 0 || index > options.length) {
              _this6.log('Outside answer range');
              ask();
              return;
            }

            // get index
            index--;
            rl.close();
            resolve(answers[index]);
          });
        };

        ask();
      });
    }
  }, {
    key: 'progress',
    value: function progress(count) {
      if (this.noProgress || count <= 0) {
        return function () {
          // noop
        };
      }

      if (!this.isTTY) {
        return function () {
          // TODO what should the behaviour here be? we could buffer progress messages maybe
        };
      }

      var bar = new (_progressBar || _load_progressBar()).default(count, this.stderr);

      bar.render();

      return function () {
        bar.tick();
      };
    }
  }]);
  return ConsoleReporter;
}((_baseReporter || _load_baseReporter()).default);

exports.default = ConsoleReporter;