'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
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

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _blockingQueue;

function _load_blockingQueue() {
  return _blockingQueue = _interopRequireDefault(require('./blocking-queue.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _network;

function _load_network() {
  return _network = _interopRequireWildcard(require('./network.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../util/map.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestCaptureHar = require('request-capture-har');
var invariant = require('invariant');
var url = require('url');
var fs = require('fs');

var successHosts = (0, (_map || _load_map()).default)();
var controlOffline = (_network || _load_network()).isOffline();

var RequestManager = function () {
  function RequestManager(reporter) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, RequestManager);

    this.offlineNoRequests = false;
    this._requestCaptureHar = null;
    this._requestModule = null;
    this.offlineQueue = [];
    this.captureHar = false;
    this.httpsProxy = null;
    this.ca = null;
    this.httpProxy = null;
    this.strictSSL = true;
    this.userAgent = '';
    this.reporter = reporter;
    this.running = 0;
    this.queue = [];
    this.cache = {};
    this.max = (_constants || _load_constants()).NETWORK_CONCURRENCY;
  }

  (0, (_createClass2 || _load_createClass()).default)(RequestManager, [{
    key: 'setOptions',
    value: function setOptions(opts) {
      if (opts.userAgent != null) {
        this.userAgent = opts.userAgent;
      }

      if (opts.offline != null) {
        this.offlineNoRequests = opts.offline;
      }

      if (opts.captureHar != null) {
        this.captureHar = opts.captureHar;
      }

      if (opts.httpProxy != null) {
        this.httpProxy = opts.httpProxy;
      }

      if (opts.httpsProxy != null) {
        this.httpsProxy = opts.httpsProxy;
      }

      if (opts.strictSSL !== null && typeof opts.strictSSL !== 'undefined') {
        this.strictSSL = opts.strictSSL;
      }

      if (opts.ca != null && opts.ca.length > 0) {
        this.ca = opts.ca;
      }

      if (opts.networkConcurrency != null) {
        this.max = opts.networkConcurrency;
      }

      if (opts.cafile != null && opts.cafile != '') {
        // The CA bundle file can contain one or more certificates with comments/text between each PEM block.
        // tls.connect wants an array of certificates without any comments/text, so we need to split the string
        // and strip out any text in between the certificates
        try {
          var bundle = fs.readFileSync(opts.cafile).toString();
          var hasPemPrefix = function hasPemPrefix(block) {
            return block.startsWith('-----BEGIN ');
          };
          // opts.cafile overrides opts.ca, this matches with npm behavior
          this.ca = bundle.split(/(-----BEGIN .*\r?\n[^-]+\r?\n--.*)/).filter(hasPemPrefix);
        } catch (err) {
          this.reporter.error('Could not open cafile: ' + err.message);
        }
      }

      if (opts.cert != null) {
        this.cert = opts.cert;
      }

      if (opts.key != null) {
        this.key = opts.key;
      }
    }

    /**
     * Lazy load `request` since it is exceptionally expensive to load and is
     * often not needed at all.
     */

  }, {
    key: '_getRequestModule',
    value: function _getRequestModule() {
      if (!this._requestModule) {
        var request = require('request');
        if (this.captureHar) {
          this._requestCaptureHar = new RequestCaptureHar(request);
          this._requestModule = this._requestCaptureHar.request.bind(this._requestCaptureHar);
        } else {
          this._requestModule = request;
        }
      }
      return this._requestModule;
    }

    /**
     * Queue up a request.
     */

  }, {
    key: 'request',
    value: function request(params) {
      var _this = this;

      if (this.offlineNoRequests) {
        return (_promise || _load_promise()).default.reject(new (_errors || _load_errors()).MessageError(this.reporter.lang('cantRequestOffline')));
      }

      var cached = this.cache[params.url];
      if (cached) {
        return cached;
      }

      params.method = params.method || 'GET';
      params.forever = true;
      params.retryAttempts = 0;
      params.strictSSL = this.strictSSL;
      params.headers = (0, (_assign || _load_assign()).default)({
        'User-Agent': this.userAgent
      }, params.headers);

      var promise = new (_promise || _load_promise()).default(function (resolve, reject) {
        _this.queue.push({ params: params, resolve: resolve, reject: reject });
        _this.shiftQueue();
      });

      // we can't cache a request with a processor
      if (!params.process) {
        this.cache[params.url] = promise;
      }

      return promise;
    }

    /**
     * Clear the request cache. This is important as we cache all HTTP requests so you'll
     * want to do this as soon as you can.
     */

  }, {
    key: 'clearCache',
    value: function clearCache() {
      this.cache = {};
      if (this._requestCaptureHar != null) {
        this._requestCaptureHar.clear();
      }
    }

    /**
     * Check if an error is possibly due to lost or poor network connectivity.
     */

  }, {
    key: 'isPossibleOfflineError',
    value: function isPossibleOfflineError(err) {
      var code = err.code;
      var hostname = err.hostname;

      if (!code) {
        return false;
      }

      // network was previously online but now we're offline
      var possibleOfflineChange = !controlOffline && !(_network || _load_network()).isOffline();
      if (code === 'ENOTFOUND' && possibleOfflineChange) {
        // can't resolve a domain
        return true;
      }

      // used to be able to resolve this domain! something is wrong
      if (code === 'ENOTFOUND' && hostname && successHosts[hostname]) {
        // can't resolve this domain but we've successfully resolved it before
        return true;
      }

      // network was previously offline and we can't resolve the domain
      if (code === 'ENOTFOUND' && controlOffline) {
        return true;
      }

      // connection was reset or dropped
      if (code === 'ECONNRESET') {
        return true;
      }

      return false;
    }

    /**
     * Queue up request arguments to be retried. Start a network connectivity timer if there
     * isn't already one.
     */

  }, {
    key: 'queueForOffline',
    value: function queueForOffline(opts) {
      if (!this.offlineQueue.length) {
        this.reporter.warn(this.reporter.lang('offlineRetrying'));
        this.initOfflineRetry();
      }

      this.offlineQueue.push(opts);
    }

    /**
     * Begin timers to retry failed requests when we possibly establish network connectivity
     * again.
     */

  }, {
    key: 'initOfflineRetry',
    value: function initOfflineRetry() {
      var _this2 = this;

      setTimeout(function () {
        var queue = _this2.offlineQueue;
        _this2.offlineQueue = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(queue), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var opts = _step.value;

            _this2.execute(opts);
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
      }, 3000);
    }

    /**
     * Execute a request.
     */

  }, {
    key: 'execute',
    value: function execute(opts) {
      var _this3 = this;

      var params = opts.params;
      var reporter = this.reporter;


      var buildNext = function buildNext(fn) {
        return function (data) {
          fn(data);
          _this3.running--;
          _this3.shiftQueue();
        };
      };

      var resolve = buildNext(opts.resolve);

      var rejectNext = buildNext(opts.reject);
      var reject = function reject(err) {
        err.message = params.url + ': ' + err.message;
        rejectNext(err);
      };

      //
      var calledOnError = false;
      var onError = function onError(err) {
        if (calledOnError) {
          return;
        }
        calledOnError = true;

        var attempts = params.retryAttempts || 0;
        if (attempts < 5 && _this3.isPossibleOfflineError(err)) {
          params.retryAttempts = attempts + 1;
          if (typeof params.cleanup === 'function') {
            params.cleanup();
          }
          _this3.queueForOffline(opts);
        } else {
          reject(err);
        }
      };

      if (!params.process) {
        (function () {
          var parts = url.parse(params.url);

          params.callback = function (err, res, body) {
            if (err) {
              onError(err);
              return;
            }

            successHosts[parts.hostname] = true;

            _this3.reporter.verbose(_this3.reporter.lang('verboseRequestFinish', params.url, res.statusCode));

            if (body && typeof body.error === 'string') {
              reject(new Error(body.error));
              return;
            }

            if (res.statusCode === 403) {
              var errMsg = body && body.message || reporter.lang('requestError', params.url, res.statusCode);
              reject(new Error(errMsg));
            } else {
              if (res.statusCode === 400 || res.statusCode === 404 || res.statusCode === 401) {
                body = false;
              }
              resolve(body);
            }
          };
        })();
      }

      if (params.buffer) {
        params.encoding = null;
      }

      var proxy = this.httpProxy;
      if (params.url.startsWith('https:')) {
        proxy = this.httpsProxy || proxy;
      }
      if (proxy) {
        params.proxy = proxy;
      }

      if (this.ca != null) {
        params.ca = this.ca;
      }

      if (this.cert != null) {
        params.cert = this.cert;
      }

      if (this.key != null) {
        params.key = this.key;
      }

      var request = this._getRequestModule();
      var req = request(params);
      this.reporter.verbose(this.reporter.lang('verboseRequestStart', params.method, params.url));

      req.on('error', onError);

      var queue = params.queue;
      if (queue) {
        req.on('data', queue.stillActive.bind(queue));
      }

      if (params.process) {
        params.process(req, resolve, reject);
      }
    }

    /**
     * Remove an item from the queue. Create it's request options and execute it.
     */

  }, {
    key: 'shiftQueue',
    value: function shiftQueue() {
      if (this.running >= this.max || !this.queue.length) {
        return;
      }

      var opts = this.queue.shift();

      this.running++;
      this.execute(opts);
    }
  }, {
    key: 'saveHar',
    value: function saveHar(filename) {
      if (!this.captureHar) {
        throw new Error(this.reporter.lang('requestManagerNotSetupHAR'));
      }
      // No request may have occurred at all.
      this._getRequestModule();
      invariant(this._requestCaptureHar != null, 'request-capture-har not setup');
      this._requestCaptureHar.saveHar(filename);
    }
  }]);
  return RequestManager;
}();

exports.default = RequestManager;