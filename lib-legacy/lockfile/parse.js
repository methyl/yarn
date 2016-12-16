'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = undefined;

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

exports.tokenise = tokenise;

exports.default = function (str) {
  str = stripBOM(str);
  var parser = new Parser(str);
  parser.next();
  return parser.parse();
};

var _constants;

function _load_constants() {
  return _constants = require('../constants.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('../util/map.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [tokenise].map((_regenerator || _load_regenerator()).default.mark);
/* eslint quotes: 0 */

var invariant = require('invariant');
var stripBOM = require('strip-bom');

var VERSION_REGEX = /^yarn lockfile v(\d+)$/;

var TOKEN_TYPES = {
  boolean: 'BOOLEAN',
  string: 'STRING',
  identifier: 'IDENTIFIER',
  eof: 'EOF',
  colon: 'COLON',
  newline: 'NEWLINE',
  comment: 'COMMENT',
  indent: 'INDENT',
  invalid: 'INVALID',
  number: 'NUMBER',
  comma: 'COMMA'
};

var VALID_PROP_VALUE_TOKENS = [TOKEN_TYPES.boolean, TOKEN_TYPES.string, TOKEN_TYPES.number];

function isValidPropValueToken(token) {
  return VALID_PROP_VALUE_TOKENS.indexOf(token.type) >= 0;
}

function tokenise(input) {
  var lastNewline, line, col, buildToken, chop, val, indent, i, _val, _i, currentChar, isEscaped, _val2, _i2, name, _i3, char;

  return (_regenerator || _load_regenerator()).default.wrap(function tokenise$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          buildToken = function buildToken(type, value) {
            return { line: line, col: col, type: type, value: value };
          };

          lastNewline = false;
          line = 1;
          col = 0;

        case 4:
          if (!input.length) {
            _context.next = 126;
            break;
          }

          chop = 0;

          if (!(input[0] === '\n')) {
            _context.next = 14;
            break;
          }

          chop++;
          line++;
          col = 0;
          _context.next = 12;
          return buildToken(TOKEN_TYPES.newline);

        case 12:
          _context.next = 118;
          break;

        case 14:
          if (!(input[0] === '#')) {
            _context.next = 22;
            break;
          }

          chop++;

          val = '';

          while (input[chop] !== '\n') {
            val += input[chop];
            chop++;
          }
          _context.next = 20;
          return buildToken(TOKEN_TYPES.comment, val);

        case 20:
          _context.next = 118;
          break;

        case 22:
          if (!(input[0] === ' ')) {
            _context.next = 38;
            break;
          }

          if (!lastNewline) {
            _context.next = 35;
            break;
          }

          indent = '';

          for (i = 0; input[i] === ' '; i++) {
            indent += input[i];
          }

          if (!(indent.length % 2)) {
            _context.next = 30;
            break;
          }

          throw new TypeError('Invalid number of spaces');

        case 30:
          chop = indent.length;
          _context.next = 33;
          return buildToken(TOKEN_TYPES.indent, indent.length / 2);

        case 33:
          _context.next = 36;
          break;

        case 35:
          chop++;

        case 36:
          _context.next = 118;
          break;

        case 38:
          if (!(input[0] === '"')) {
            _context.next = 66;
            break;
          }

          _val = '';
          _i = 0;

        case 41:
          currentChar = input[_i];

          _val += currentChar;

          if (!(_i > 0 && currentChar === '"')) {
            _context.next = 47;
            break;
          }

          isEscaped = input[_i - 1] === "\\" && input[_i - 2] !== "\\";

          if (isEscaped) {
            _context.next = 47;
            break;
          }

          return _context.abrupt('break', 50);

        case 47:
          _i++;
          _context.next = 41;
          break;

        case 50:

          chop = _val.length;

          _context.prev = 51;
          _context.next = 54;
          return buildToken(TOKEN_TYPES.string, JSON.parse(_val));

        case 54:
          _context.next = 64;
          break;

        case 56:
          _context.prev = 56;
          _context.t0 = _context['catch'](51);

          if (!(_context.t0 instanceof SyntaxError)) {
            _context.next = 63;
            break;
          }

          _context.next = 61;
          return buildToken(TOKEN_TYPES.invalid);

        case 61:
          _context.next = 64;
          break;

        case 63:
          throw _context.t0;

        case 64:
          _context.next = 118;
          break;

        case 66:
          if (!/^[0-9]/.test(input)) {
            _context.next = 74;
            break;
          }

          _val2 = '';

          for (_i2 = 0; /^[0-9]$/.test(input[_i2]); _i2++) {
            _val2 += input[_i2];
          }
          chop = _val2.length;

          _context.next = 72;
          return buildToken(TOKEN_TYPES.number, +_val2);

        case 72:
          _context.next = 118;
          break;

        case 74:
          if (!/^true/.test(input)) {
            _context.next = 80;
            break;
          }

          _context.next = 77;
          return buildToken(TOKEN_TYPES.boolean, true);

        case 77:
          chop = 4;
          _context.next = 118;
          break;

        case 80:
          if (!/^false/.test(input)) {
            _context.next = 86;
            break;
          }

          _context.next = 83;
          return buildToken(TOKEN_TYPES.boolean, false);

        case 83:
          chop = 5;
          _context.next = 118;
          break;

        case 86:
          if (!(input[0] === ':')) {
            _context.next = 92;
            break;
          }

          _context.next = 89;
          return buildToken(TOKEN_TYPES.colon);

        case 89:
          chop++;
          _context.next = 118;
          break;

        case 92:
          if (!(input[0] === ',')) {
            _context.next = 98;
            break;
          }

          _context.next = 95;
          return buildToken(TOKEN_TYPES.comma);

        case 95:
          chop++;
          _context.next = 118;
          break;

        case 98:
          if (!/^[a-zA-Z]/g.test(input)) {
            _context.next = 116;
            break;
          }

          name = "";
          _i3 = 0;

        case 101:
          if (!(_i3 < input.length)) {
            _context.next = 111;
            break;
          }

          char = input[_i3];

          if (!(char === ':' || char === ' ' || char === '\n' || char === ',')) {
            _context.next = 107;
            break;
          }

          return _context.abrupt('break', 111);

        case 107:
          name += char;

        case 108:
          _i3++;
          _context.next = 101;
          break;

        case 111:
          chop = name.length;

          _context.next = 114;
          return buildToken(TOKEN_TYPES.string, name);

        case 114:
          _context.next = 118;
          break;

        case 116:
          _context.next = 118;
          return buildToken(TOKEN_TYPES.invalid);

        case 118:
          if (chop) {
            _context.next = 121;
            break;
          }

          _context.next = 121;
          return buildToken(TOKEN_TYPES.invalid);

        case 121:

          col += chop;
          lastNewline = input[0] === '\n';
          input = input.slice(chop);
          _context.next = 4;
          break;

        case 126:
          _context.next = 128;
          return buildToken(TOKEN_TYPES.eof);

        case 128:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[51, 56]]);
}

var Parser = exports.Parser = function () {
  function Parser(input) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Parser);

    this.comments = [];
    this.tokens = tokenise(input);
  }

  (0, (_createClass2 || _load_createClass()).default)(Parser, [{
    key: 'onComment',
    value: function onComment(token) {
      var value = token.value;
      invariant(typeof value === 'string', 'expected token value to be a string');

      var comment = value.trim();

      var versionMatch = comment.match(VERSION_REGEX);
      if (versionMatch) {
        var version = +versionMatch[1];
        if (version > (_constants || _load_constants()).LOCKFILE_VERSION) {
          throw new (_errors || _load_errors()).MessageError('Can\'t install from a lockfile of version ' + version + ' as you\'re on an old yarn version that only supports ' + ('versions up to ' + (_constants || _load_constants()).LOCKFILE_VERSION + '. Run `$ yarn self-update` to upgrade to the latest version.'));
        }
      }

      this.comments.push(comment);
    }
  }, {
    key: 'next',
    value: function next() {
      var item = this.tokens.next();
      invariant(item, 'expected a token');

      var done = item.done;
      var value = item.value;

      if (done || !value) {
        throw new Error('No more tokens');
      } else if (value.type === TOKEN_TYPES.comment) {
        this.onComment(value);
        return this.next();
      } else {
        return this.token = value;
      }
    }
  }, {
    key: 'unexpected',
    value: function unexpected() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unexpected token';

      throw new SyntaxError(msg + ' ' + this.token.line + ':' + this.token.col);
    }
  }, {
    key: 'expect',
    value: function expect(tokType) {
      if (this.token.type === tokType) {
        this.next();
      } else {
        this.unexpected();
      }
    }
  }, {
    key: 'eat',
    value: function eat(tokType) {
      if (this.token.type === tokType) {
        this.next();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'parse',
    value: function parse() {
      var indent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var obj = (0, (_map || _load_map()).default)();

      while (true) {
        var propToken = this.token;

        if (propToken.type === TOKEN_TYPES.newline) {
          var nextToken = this.next();
          if (!indent) {
            // if we have 0 indentation then the next token doesn't matter
            continue;
          }

          if (nextToken.type !== TOKEN_TYPES.indent) {
            // if we have no indentation after a newline then we've gone down a level
            break;
          }

          if (nextToken.value === indent) {
            // all is good, the indent is on our level
            this.next();
          } else {
            // the indentation is less than our level
            break;
          }
        } else if (propToken.type === TOKEN_TYPES.indent) {
          if (propToken.value === indent) {
            this.next();
          } else {
            break;
          }
        } else if (propToken.type === TOKEN_TYPES.eof) {
          break;
        } else if (propToken.type === TOKEN_TYPES.string) {
          // property key
          var key = propToken.value;
          invariant(key, 'Expected a key');

          var keys = [key];
          this.next();

          // support multiple keys
          while (this.token.type === TOKEN_TYPES.comma) {
            this.next(); // skip comma

            var keyToken = this.token;
            if (keyToken.type !== TOKEN_TYPES.string) {
              this.unexpected('Expected string');
            }

            var _key = keyToken.value;
            invariant(_key, 'Expected a key');
            keys.push(_key);
            this.next();
          }

          var valToken = this.token;

          if (valToken.type === TOKEN_TYPES.colon) {
            // object
            this.next();

            // parse object
            var val = this.parse(indent + 1);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _key2 = _step.value;

                obj[_key2] = val;
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

            if (indent && this.token.type !== TOKEN_TYPES.indent) {
              break;
            }
          } else if (isValidPropValueToken(valToken)) {
            // plain value
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(keys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _key3 = _step2.value;

                obj[_key3] = valToken.value;
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

            this.next();
          } else {
            this.unexpected('Invalid value type');
          }
        } else {
          this.unexpected('Unknown token');
        }
      }

      return obj;
    }
  }]);
  return Parser;
}();