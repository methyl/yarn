'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGitConfigInfo = exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var manifests, repository, author, keys, pkg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, yes, manifestKey, question, def, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, registryName, object, val, answer, validAnswer, targetManifests, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _registryName, info, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, targetManifest;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return config.getRootManifests();

          case 2:
            manifests = _context.sent;
            repository = {};
            author = {
              name: config.getOption('init-author-name'),
              email: config.getOption('init-author-email'),
              url: config.getOption('init-author-url')
            };
            _context.next = 7;
            return (_fs || _load_fs()).exists(path.join(config.cwd, '.git'));

          case 7:
            if (!_context.sent) {
              _context.next = 25;
              break;
            }

            _context.prev = 8;
            _context.next = 11;
            return (_child || _load_child()).spawn('git', ['config', 'remote.origin.url'], { cwd: config.cwd });

          case 11:
            _context.t0 = _context.sent;
            repository = {
              type: 'git',
              url: _context.t0
            };
            _context.next = 17;
            break;

          case 15:
            _context.prev = 15;
            _context.t1 = _context['catch'](8);

          case 17:
            if (!(author.name === undefined)) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return getGitConfigInfo('user.name');

          case 20:
            author.name = _context.sent;

          case 21:
            if (!(author.email === undefined)) {
              _context.next = 25;
              break;
            }

            _context.next = 24;
            return getGitConfigInfo('user.email');

          case 24:
            author.email = _context.sent;

          case 25:
            keys = [{
              key: 'name',
              question: 'name',
              default: path.basename(config.cwd),
              validation: (_validate || _load_validate()).isValidPackageName,
              validationError: 'invalidPackageName'
            }, {
              key: 'version',
              question: 'version',
              default: String(config.getOption('init-version'))
            }, {
              key: 'description',
              question: 'description',
              default: ''
            }, {
              key: 'main',
              question: 'entry point',
              default: 'index.js'
            }, {
              key: 'repository',
              question: 'repository url',
              default: (0, (_util || _load_util()).extractRepositoryUrl)(repository)
            }, {
              key: 'author',
              question: 'author',
              default: (0, (_util || _load_util()).stringifyPerson)(author)
            }, {
              key: 'license',
              question: 'license',
              default: String(config.getOption('init-license'))
            }];

            // get answers

            pkg = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 30;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(keys);

          case 32:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 98;
              break;
            }

            entry = _step.value;
            yes = flags.yes;
            manifestKey = entry.key;
            question = entry.question;
            def = entry.default;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 41;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)((_index || _load_index()).registryNames);

          case 43:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 54;
              break;
            }

            registryName = _step4.value;
            object = manifests[registryName].object;
            val = objectPath.get(object, manifestKey);

            if (val) {
              _context.next = 49;
              break;
            }

            return _context.abrupt('break', 54);

          case 49:
            if ((typeof val === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(val)) === 'object') {
              if (manifestKey === 'author') {
                val = (0, (_util || _load_util()).stringifyPerson)(val);
              } else if (manifestKey === 'repository') {
                val = (0, (_util || _load_util()).extractRepositoryUrl)(val);
              }
            }
            def = val;

          case 51:
            _iteratorNormalCompletion4 = true;
            _context.next = 43;
            break;

          case 54:
            _context.next = 60;
            break;

          case 56:
            _context.prev = 56;
            _context.t2 = _context['catch'](41);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t2;

          case 60:
            _context.prev = 60;
            _context.prev = 61;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 63:
            _context.prev = 63;

            if (!_didIteratorError4) {
              _context.next = 66;
              break;
            }

            throw _iteratorError4;

          case 66:
            return _context.finish(63);

          case 67:
            return _context.finish(60);

          case 68:

            if (def) {
              question += ' (' + def + ')';
            }

            answer = void 0;
            validAnswer = false;

            if (!yes) {
              _context.next = 75;
              break;
            }

            answer = def;
            _context.next = 94;
            break;

          case 75:
            if (!entry.validation) {
              _context.next = 88;
              break;
            }

          case 76:
            if (validAnswer) {
              _context.next = 86;
              break;
            }

            _context.next = 79;
            return reporter.question(question);

          case 79:
            _context.t3 = _context.sent;

            if (_context.t3) {
              _context.next = 82;
              break;
            }

            _context.t3 = def;

          case 82:
            answer = _context.t3;

            // validate answer
            if (entry.validation(String(answer))) {
              validAnswer = true;
            } else {
              reporter.error(reporter.lang('invalidPackageName'));
            }
            _context.next = 76;
            break;

          case 86:
            _context.next = 94;
            break;

          case 88:
            _context.next = 90;
            return reporter.question(question);

          case 90:
            _context.t4 = _context.sent;

            if (_context.t4) {
              _context.next = 93;
              break;
            }

            _context.t4 = def;

          case 93:
            answer = _context.t4;

          case 94:

            if (answer) {
              objectPath.set(pkg, manifestKey, answer);
            }

          case 95:
            _iteratorNormalCompletion = true;
            _context.next = 32;
            break;

          case 98:
            _context.next = 104;
            break;

          case 100:
            _context.prev = 100;
            _context.t5 = _context['catch'](30);
            _didIteratorError = true;
            _iteratorError = _context.t5;

          case 104:
            _context.prev = 104;
            _context.prev = 105;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 107:
            _context.prev = 107;

            if (!_didIteratorError) {
              _context.next = 110;
              break;
            }

            throw _iteratorError;

          case 110:
            return _context.finish(107);

          case 111:
            return _context.finish(104);

          case 112:

            // save answers
            targetManifests = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 116;

            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((_index || _load_index()).registryNames); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _registryName = _step2.value;
              info = manifests[_registryName];

              if (info.exists) {
                targetManifests.push(info);
              }
            }
            _context.next = 124;
            break;

          case 120:
            _context.prev = 120;
            _context.t6 = _context['catch'](116);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t6;

          case 124:
            _context.prev = 124;
            _context.prev = 125;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 127:
            _context.prev = 127;

            if (!_didIteratorError2) {
              _context.next = 130;
              break;
            }

            throw _iteratorError2;

          case 130:
            return _context.finish(127);

          case 131:
            return _context.finish(124);

          case 132:
            if (!targetManifests.length) {
              targetManifests.push(manifests.npm);
            }
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 136;
            for (_iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(targetManifests); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              targetManifest = _step3.value;

              (0, (_assign || _load_assign()).default)(targetManifest.object, pkg);
              reporter.success('Saved ' + path.basename(targetManifest.loc));
            }

            _context.next = 144;
            break;

          case 140:
            _context.prev = 140;
            _context.t7 = _context['catch'](136);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t7;

          case 144:
            _context.prev = 144;
            _context.prev = 145;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 147:
            _context.prev = 147;

            if (!_didIteratorError3) {
              _context.next = 150;
              break;
            }

            throw _iteratorError3;

          case 150:
            return _context.finish(147);

          case 151:
            return _context.finish(144);

          case 152:
            _context.next = 154;
            return config.saveRootManifests(manifests);

          case 154:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 15], [30, 100, 104, 112], [41, 56, 60, 68], [61,, 63, 67], [105,, 107, 111], [116, 120, 124, 132], [125,, 127, 131], [136, 140, 144, 152], [145,, 147, 151]]);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getGitConfigInfo = exports.getGitConfigInfo = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(credential) {
    var spawn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_child || _load_child()).spawn;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return spawn('git', ['config', credential]);

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', '');

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6]]);
  }));

  return function getGitConfigInfo(_x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _util;

function _load_util() {
  return _util = require('../../util/normalize-manifest/util.js');
}

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _child;

function _load_child() {
  return _child = _interopRequireWildcard(require('../../util/child.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _validate;

function _load_validate() {
  return _validate = _interopRequireWildcard(require('../../util/normalize-manifest/validate.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');

var path = require('path');

function setFlags(commander) {
  commander.option('-y, --yes', 'use default options');
}