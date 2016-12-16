'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./map.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('yarn');

var BlockingQueue = function () {
  function BlockingQueue(alias) {
    var maxConcurrency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BlockingQueue);

    this.concurrencyQueue = [];
    this.maxConcurrency = maxConcurrency;
    this.runningCount = 0;
    this.warnedStuck = false;
    this.alias = alias;
    this.first = true;

    this.running = (0, (_map || _load_map()).default)();
    this.queue = (0, (_map || _load_map()).default)();

    this.stuckTick = this.stuckTick.bind(this);
  }

  (0, (_createClass2 || _load_createClass()).default)(BlockingQueue, [{
    key: 'stillActive',
    value: function stillActive() {
      if (this.stuckTimer) {
        clearTimeout(this.stuckTimer);
      }

      this.stuckTimer = setTimeout(this.stuckTick, 5000);
    }
  }, {
    key: 'stuckTick',
    value: function stuckTick() {
      if (this.runningCount === 1) {
        this.warnedStuck = true;
        debug('The ' + (0, (_stringify || _load_stringify()).default)(this.alias) + ' blocking queue may be stuck. 5 seconds ' + ('without any activity with 1 worker: ' + (0, (_keys || _load_keys()).default)(this.running)[0]));
      }
    }
  }, {
    key: 'push',
    value: function push(key, factory) {
      var _this = this;

      if (this.first) {
        this.first = false;
      } else {
        this.stillActive();
      }

      return new (_promise || _load_promise()).default(function (resolve, reject) {
        // we're already running so push ourselves to the queue
        var queue = _this.queue[key] = _this.queue[key] || [];
        queue.push({ factory: factory, resolve: resolve, reject: reject });

        if (!_this.running[key]) {
          _this.shift(key);
        }
      });
    }
  }, {
    key: 'shift',
    value: function shift(key) {
      var _this2 = this;

      if (this.running[key]) {
        delete this.running[key];
        this.runningCount--;

        if (this.warnedStuck) {
          this.warnedStuck = false;
          debug((0, (_stringify || _load_stringify()).default)(this.alias) + ' blocking queue finally resolved. Nothing to worry about.');
        }
      }

      var queue = this.queue[key];
      if (!queue) {
        return;
      }

      var _queue$shift = queue.shift();

      var resolve = _queue$shift.resolve;
      var reject = _queue$shift.reject;
      var factory = _queue$shift.factory;

      if (!queue.length) {
        delete this.queue[key];
      }

      var next = function next() {
        _this2.shift(key);
        _this2.shiftConcurrencyQueue();
      };

      var run = function run() {
        _this2.running[key] = true;
        _this2.runningCount++;

        factory().then(function (val) {
          resolve(val);
          next();
          return null;
        }).catch(function (err) {
          reject(err);
          next();
        });
      };

      this.maybePushConcurrencyQueue(run);
    }
  }, {
    key: 'maybePushConcurrencyQueue',
    value: function maybePushConcurrencyQueue(run) {
      if (this.runningCount < this.maxConcurrency) {
        run();
      } else {
        this.concurrencyQueue.push(run);
      }
    }
  }, {
    key: 'shiftConcurrencyQueue',
    value: function shiftConcurrencyQueue() {
      if (this.runningCount < this.maxConcurrency) {
        var fn = this.concurrencyQueue.shift();
        if (fn) {
          fn();
        }
      }
    }
  }]);
  return BlockingQueue;
}();

exports.default = BlockingQueue;