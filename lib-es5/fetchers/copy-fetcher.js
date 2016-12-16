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

var _baseFetcher;

function _load_baseFetcher() {
  return _baseFetcher = _interopRequireDefault(require('./base-fetcher.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CopyFetcher = function (_BaseFetcher) {
  (0, (_inherits2 || _load_inherits()).default)(CopyFetcher, _BaseFetcher);

  function CopyFetcher() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, CopyFetcher);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (CopyFetcher.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(CopyFetcher)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(CopyFetcher, [{
    key: '_fetch',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee() {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (_fs || _load_fs()).copy(this.reference, this.dest, this.reporter);

              case 2:
                return _context.abrupt('return', {
                  hash: this.hash || '',
                  resolved: null
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _fetch() {
        return _ref.apply(this, arguments);
      }

      return _fetch;
    }()
  }]);
  return CopyFetcher;
}((_baseFetcher || _load_baseFetcher()).default);

exports.default = CopyFetcher;