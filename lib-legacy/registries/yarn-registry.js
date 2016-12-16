'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
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

var _constants;

function _load_constants() {
  return _constants = require('../constants.js');
}

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('./npm-registry.js'));
}

var _stringify;

function _load_stringify() {
  return _stringify = _interopRequireDefault(require('../lockfile/stringify.js'));
}

var _parse;

function _load_parse() {
  return _parse = _interopRequireDefault(require('../lockfile/parse.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userHome = require('user-home');

var defaults = require('defaults');
var path = require('path');
var pkg = require('../../package.json');

var DEFAULTS = exports.DEFAULTS = {
  'version-tag-prefix': 'v',
  'version-git-tag': true,
  'version-git-sign': false,
  'version-git-message': 'v%s',

  'init-version': '1.0.0',
  'init-license': 'MIT',

  'save-prefix': '^',
  'ignore-scripts': false,
  'ignore-optional': false,
  registry: (_constants || _load_constants()).YARN_REGISTRY,
  'strict-ssl': true,
  'user-agent': ['yarn/' + pkg.version, 'npm/?', 'node/' + process.version, process.platform, process.arch].join(' ')
};

var npmMap = {
  'version-git-sign': 'sign-git-tag',
  'version-tag-prefix': 'tag-version-prefix',
  'version-git-tag': 'git-tag-version',
  'version-git-message': 'message'
};

var YarnRegistry = function (_NpmRegistry) {
  (0, (_inherits2 || _load_inherits()).default)(YarnRegistry, _NpmRegistry);

  function YarnRegistry(cwd, registries, requestManager) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, YarnRegistry);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (YarnRegistry.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(YarnRegistry)).call(this, cwd, registries, requestManager));

    _this.homeConfigLoc = path.join(userHome, '.yarnrc');
    _this.homeConfig = {};
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(YarnRegistry, [{
    key: 'getOption',
    value: function getOption(key) {
      var val = this.config[key];

      // if this isn't set in a yarn config, then use npm
      if (typeof val === 'undefined') {
        val = this.registries.npm.getOption(npmMap[key]);
      }

      if (typeof val === 'undefined') {
        val = this.registries.npm.getOption(key);
      }

      // if this isn't set in a yarn config or npm config, then use the default (or undefined)
      if (typeof val === 'undefined') {
        val = DEFAULTS[key];
      }

      return val;
    }
  }, {
    key: 'loadConfig',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, isHome, loc, file, config, offlineLoc, mirrorLoc;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _context.next = 6;
                return this.getPossibleConfigLocations('.yarnrc');

              case 6:
                _context.t0 = _context.sent;
                _iterator = (0, (_getIterator2 || _load_getIterator()).default)(_context.t0);

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 24;
                  break;
                }

                _step$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step.value, 3);
                isHome = _step$value[0];
                loc = _step$value[1];
                file = _step$value[2];
                config = (0, (_parse || _load_parse()).default)(file);


                if (isHome) {
                  this.homeConfig = config;
                }

                // normalize offline mirror path relative to the current yarnrc
                offlineLoc = config['yarn-offline-mirror'];

                // don't normalize if we already have a mirror path

                if (!(!this.config['yarn-offline-mirror'] && offlineLoc)) {
                  _context.next = 20;
                  break;
                }

                mirrorLoc = config['yarn-offline-mirror'] = path.resolve(path.dirname(loc), offlineLoc);
                _context.next = 20;
                return (_fs || _load_fs()).mkdirp(mirrorLoc);

              case 20:

                defaults(this.config, config);

              case 21:
                _iteratorNormalCompletion = true;
                _context.next = 8;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 33:
                _context.prev = 33;

                if (!_didIteratorError) {
                  _context.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return _context.finish(33);

              case 37:
                return _context.finish(30);

              case 38:

                // default yarn config
                defaults(this.config, DEFAULTS);

              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 26, 30, 38], [31,, 33, 37]]);
      }));

      function loadConfig() {
        return _ref.apply(this, arguments);
      }

      return loadConfig;
    }()
  }, {
    key: 'saveHomeConfig',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config) {
        var key, val;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (key in config) {
                  val = config[key];

                  // if the current config key was taken from home config then update
                  // the global config

                  if (this.homeConfig[key] === this.config[key]) {
                    this.config[key] = val;
                  }

                  // update just the home config
                  this.homeConfig[key] = config[key];
                }

                _context2.next = 3;
                return (_fs || _load_fs()).writeFilePreservingEol(this.homeConfigLoc, (0, (_stringify || _load_stringify()).default)(this.homeConfig) + '\n');

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveHomeConfig(_x) {
        return _ref2.apply(this, arguments);
      }

      return saveHomeConfig;
    }()
  }]);
  return YarnRegistry;
}((_npmRegistry || _load_npmRegistry()).default);

YarnRegistry.filename = 'yarn.json';
exports.default = YarnRegistry;