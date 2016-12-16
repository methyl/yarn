'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.requireLockfile = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var run = exports.run = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter, flags, args) {
    var totalSteps, step, lockfile, rootManifests, manifests, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, found, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, registryName, registry, object, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, type, deps, possibleManifestLoc, _arr, _i, action, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, loc, reinstall;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (args.length) {
              _context.next = 2;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('tooFewArguments', 1));

          case 2:
            totalSteps = args.length + 1;
            step = 0;

            // load manifests

            _context.next = 6;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

          case 6:
            lockfile = _context.sent;
            _context.next = 9;
            return config.getRootManifests();

          case 9:
            rootManifests = _context.sent;
            manifests = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(args);

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 81;
              break;
            }

            name = _step.value;

            reporter.step(++step, totalSteps, 'Removing module ' + name);

            found = false;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 23;
            _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)((_index || _load_index()).registries));

          case 25:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 62;
              break;
            }

            registryName = _step2.value;
            registry = config.registries[registryName];
            object = rootManifests[registryName].object;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 32;


            for (_iterator3 = (0, (_getIterator2 || _load_getIterator()).default)((_constants || _load_constants()).DEPENDENCY_TYPES); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              type = _step3.value;
              deps = object[type];

              if (deps && deps[name]) {
                found = true;
                delete deps[name];
              }
            }

            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context['catch'](32);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t0;

          case 40:
            _context.prev = 40;
            _context.prev = 41;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 43:
            _context.prev = 43;

            if (!_didIteratorError3) {
              _context.next = 46;
              break;
            }

            throw _iteratorError3;

          case 46:
            return _context.finish(43);

          case 47:
            return _context.finish(40);

          case 48:
            possibleManifestLoc = path.join(config.cwd, registry.folder, name);
            _context.next = 51;
            return (_fs || _load_fs()).exists(possibleManifestLoc);

          case 51:
            if (!_context.sent) {
              _context.next = 59;
              break;
            }

            _context.t1 = manifests;
            _context.t2 = possibleManifestLoc;
            _context.next = 56;
            return config.readManifest(possibleManifestLoc, registryName);

          case 56:
            _context.t3 = _context.sent;
            _context.t4 = [_context.t2, _context.t3];

            _context.t1.push.call(_context.t1, _context.t4);

          case 59:
            _iteratorNormalCompletion2 = true;
            _context.next = 25;
            break;

          case 62:
            _context.next = 68;
            break;

          case 64:
            _context.prev = 64;
            _context.t5 = _context['catch'](23);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t5;

          case 68:
            _context.prev = 68;
            _context.prev = 69;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 71:
            _context.prev = 71;

            if (!_didIteratorError2) {
              _context.next = 74;
              break;
            }

            throw _iteratorError2;

          case 74:
            return _context.finish(71);

          case 75:
            return _context.finish(68);

          case 76:
            if (found) {
              _context.next = 78;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('moduleNotInManifest'));

          case 78:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 81:
            _context.next = 87;
            break;

          case 83:
            _context.prev = 83;
            _context.t6 = _context['catch'](14);
            _didIteratorError = true;
            _iteratorError = _context.t6;

          case 87:
            _context.prev = 87;
            _context.prev = 88;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 90:
            _context.prev = 90;

            if (!_didIteratorError) {
              _context.next = 93;
              break;
            }

            throw _iteratorError;

          case 93:
            return _context.finish(90);

          case 94:
            return _context.finish(87);

          case 95:
            _context.next = 97;
            return config.saveRootManifests(rootManifests);

          case 97:

            // run hooks - npm runs these one after another
            _arr = ['preuninstall', 'uninstall', 'postuninstall'];
            _i = 0;

          case 99:
            if (!(_i < _arr.length)) {
              _context.next = 131;
              break;
            }

            action = _arr[_i];
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 104;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(manifests);

          case 106:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 114;
              break;
            }

            _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 1);
            loc = _step4$value[0];
            _context.next = 111;
            return config.executeLifecycleScript(action, loc);

          case 111:
            _iteratorNormalCompletion4 = true;
            _context.next = 106;
            break;

          case 114:
            _context.next = 120;
            break;

          case 116:
            _context.prev = 116;
            _context.t7 = _context['catch'](104);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t7;

          case 120:
            _context.prev = 120;
            _context.prev = 121;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 123:
            _context.prev = 123;

            if (!_didIteratorError4) {
              _context.next = 126;
              break;
            }

            throw _iteratorError4;

          case 126:
            return _context.finish(123);

          case 127:
            return _context.finish(120);

          case 128:
            _i++;
            _context.next = 99;
            break;

          case 131:

            // reinstall so we can get the updated lockfile
            reporter.step(++step, totalSteps, reporter.lang('uninstallRegenerate'));
            reinstall = new (_install || _load_install()).Install((0, (_extends2 || _load_extends()).default)({ force: true }, flags), config, new (_index2 || _load_index2()).NoopReporter(), lockfile);
            _context.next = 135;
            return reinstall.init();

          case 135:

            //
            reporter.success(reporter.lang('uninstalledPackages'));

          case 136:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[14, 83, 87, 95], [23, 64, 68, 76], [32, 36, 40, 48], [41,, 43, 47], [69,, 71, 75], [88,, 90, 94], [104, 116, 120, 128], [121,, 123, 127]]);
  }));

  return function run(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _index2;

function _load_index2() {
  return _index2 = require('../../reporters/index.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../../constants.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var requireLockfile = exports.requireLockfile = true;