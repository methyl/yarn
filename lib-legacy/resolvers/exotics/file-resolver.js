'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
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

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _exoticResolver;

function _load_exoticResolver() {
  return _exoticResolver = _interopRequireDefault(require('./exotic-resolver.js'));
}

var _misc;

function _load_misc() {
  return _misc = _interopRequireWildcard(require('../../util/misc.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');

var FileResolver = function (_ExoticResolver) {
  (0, (_inherits2 || _load_inherits()).default)(FileResolver, _ExoticResolver);

  function FileResolver(request, fragment) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, FileResolver);

    var _this = (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (FileResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(FileResolver)).call(this, request, fragment));

    _this.loc = (_misc || _load_misc()).removePrefix(fragment, 'file:');
    return _this;
  }

  (0, (_createClass2 || _load_createClass()).default)(FileResolver, [{
    key: 'resolve',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        var loc, manifest, registry, dependencies, optionalDependencies, _manifest;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loc = this.loc;

                if (!path.isAbsolute(loc)) {
                  loc = path.join(this.config.cwd, loc);
                }
                _context.next = 4;
                return (_fs || _load_fs()).exists(loc);

              case 4:
                if (_context.sent) {
                  _context.next = 6;
                  break;
                }

                throw new (_errors || _load_errors()).MessageError(this.reporter.lang('doesntExist', loc));

              case 6:
                _context.next = 8;
                return this.config.readManifest(loc, this.registry);

              case 8:
                manifest = _context.sent;
                registry = manifest._registry;

                invariant(registry, 'expected registry');

                manifest._remote = {
                  type: 'copy',
                  registry: registry,
                  hash: null,
                  reference: loc
                };

                manifest._uid = manifest.version;

                // Normalize relative paths; if anything changes, make a copy of the manifest
                dependencies = this.normalizeDependencyPaths(manifest.dependencies, loc);
                optionalDependencies = this.normalizeDependencyPaths(manifest.optionalDependencies, loc);

                if (!(dependencies !== manifest.dependencies || optionalDependencies !== manifest.optionalDependencies)) {
                  _context.next = 22;
                  break;
                }

                _manifest = (0, (_assign || _load_assign()).default)({}, manifest);

                if (dependencies != null) {
                  _manifest.dependencies = dependencies;
                }
                if (optionalDependencies != null) {
                  _manifest.optionalDependencies = optionalDependencies;
                }
                return _context.abrupt('return', _manifest);

              case 22:
                return _context.abrupt('return', manifest);

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolve() {
        return _ref.apply(this, arguments);
      }

      return resolve;
    }()
  }, {
    key: 'normalizeDependencyPaths',
    value: function normalizeDependencyPaths(section, loc) {
      if (section == null) {
        return section;
      }

      var temp = section;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)((_misc || _load_misc()).entries(section)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step.value, 2);

          var k = _step$value[0];
          var v = _step$value[1];

          if (typeof v === 'string' && v.startsWith('file:') && !path.isAbsolute(v)) {
            if (temp === section) {
              temp = (0, (_assign || _load_assign()).default)({}, section);
            }
            temp[k] = 'file:' + path.relative(this.config.cwd, path.join(loc, (_misc || _load_misc()).removePrefix(v, 'file:')));
          }
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

      return temp;
    }
  }]);
  return FileResolver;
}((_exoticResolver || _load_exoticResolver()).default);

FileResolver.protocol = 'file';
exports.default = FileResolver;