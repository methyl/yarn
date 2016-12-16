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

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _misc;

function _load_misc() {
  return _misc = require('../util/misc.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');
var path = require('path');

var BaseRegistry = function () {
  function BaseRegistry(cwd, registries, requestManager) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, BaseRegistry);

    this.requestManager = requestManager;
    this.registries = registries;
    this.config = {};
    this.folder = '';
    this.token = '';
    this.loc = '';
    this.cwd = cwd;
  }

  // the filename to use for package metadata


  //


  //


  //


  //


  //


  // absolute folder name to insert modules


  // relative folder name to put these modules


  (0, (_createClass2 || _load_createClass()).default)(BaseRegistry, [{
    key: 'setToken',
    value: function setToken(token) {
      this.token = token;
    }
  }, {
    key: 'getOption',
    value: function getOption(key) {
      return this.config[key];
    }
  }, {
    key: 'getAvailableRegistries',
    value: function getAvailableRegistries() {
      var config = this.config;
      return (0, (_keys || _load_keys()).default)(config).reduce(function (registries, option) {
        if (option === 'registry' || option.split(':')[1] === 'registry') {
          registries.push(config[option]);
        }
        return registries;
      }, []);
    }
  }, {
    key: 'loadConfig',
    value: function loadConfig() {
      return (_promise || _load_promise()).default.resolve();
    }
  }, {
    key: 'checkOutdated',
    value: function checkOutdated(config, name, range) {
      return (_promise || _load_promise()).default.reject(new Error('unimplemented'));
    }
  }, {
    key: 'saveHomeConfig',
    value: function saveHomeConfig(config) {
      return (_promise || _load_promise()).default.reject(new Error('unimplemented'));
    }
  }, {
    key: 'request',
    value: function request(pathname) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.requestManager.request((0, (_extends2 || _load_extends()).default)({
        url: pathname
      }, opts));
    }
  }, {
    key: 'init',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.mergeEnv('yarn_');
                _context.next = 3;
                return this.loadConfig();

              case 3:
                this.loc = path.join(this.cwd, this.folder);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'mergeEnv',
    value: function mergeEnv(prefix) {
      // try environment variables
      for (var key in process.env) {
        key = key.toLowerCase();

        // only accept keys prefixed with the prefix
        if (key.indexOf(prefix) < 0) {
          continue;
        }

        var val = BaseRegistry.normalizeConfigOption(process.env[key]);

        // remove config prefix
        key = (0, (_misc || _load_misc()).removePrefix)(key, prefix);

        // replace dunders with dots
        key = key.replace(/__/g, '.');

        // replace underscores with dashes
        key = key.replace(/_/g, '-');

        // set it via a path
        objectPath.set(this.config, key, val);
      }
    }
  }], [{
    key: 'normalizeConfig',
    value: function normalizeConfig(config) {
      for (var key in config) {
        config[key] = BaseRegistry.normalizeConfigOption(config[key]);
      }
      return config;
    }
  }, {
    key: 'normalizeConfigOption',
    value: function normalizeConfigOption(val) {
      if (val === 'true') {
        return true;
      } else if (val === 'false') {
        return false;
      } else {
        return val;
      }
    }
  }]);
  return BaseRegistry;
}();

exports.default = BaseRegistry;