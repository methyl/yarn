'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.clean = exports.noArguments = exports.requireLockfile = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var clean = exports.clean = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, reporter) {
    var loc, file, lines, filters, removedFiles, removedSize, locs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, registry, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, folder, spinner, files, _sortFilter, ignoreFiles, tick, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _file, _loc, stat, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _file2, _loc2;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loc = path.join(config.cwd, (_constants || _load_constants()).CLEAN_FILENAME);
            _context.next = 3;
            return (_fs || _load_fs()).readFile(loc);

          case 3:
            file = _context.sent;
            lines = file.split('\n');
            filters = (0, (_filter || _load_filter()).ignoreLinesToRegex)(lines);
            removedFiles = 0;
            removedSize = 0;

            // build list of possible module folders

            locs = new (_set || _load_set()).default();

            if (config.modulesFolder) {
              locs.add(config.modulesFolder);
            }
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;
            for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)((_index || _load_index()).registryNames); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              name = _step.value;
              registry = config.registries[name];

              locs.add(path.join(config.cwd, registry.folder));
            }

            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](13);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 32;
            _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(locs);

          case 34:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 109;
              break;
            }

            folder = _step2.value;
            _context.next = 38;
            return (_fs || _load_fs()).exists(folder);

          case 38:
            if (_context.sent) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('continue', 106);

          case 40:
            spinner = reporter.activity();
            _context.next = 43;
            return (_fs || _load_fs()).walk(folder);

          case 43:
            files = _context.sent;
            _sortFilter = (0, (_filter || _load_filter()).sortFilter)(files, filters);
            ignoreFiles = _sortFilter.ignoreFiles;

            spinner.end();

            tick = reporter.progress(ignoreFiles.size);
            // TODO make sure `main` field of all modules isn't ignored

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 51;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(ignoreFiles);

          case 53:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 64;
              break;
            }

            _file = _step3.value;
            _loc = path.join(folder, _file);
            _context.next = 58;
            return (_fs || _load_fs()).lstat(_loc);

          case 58:
            stat = _context.sent;

            removedSize += stat.size;
            removedFiles++;

          case 61:
            _iteratorNormalCompletion3 = true;
            _context.next = 53;
            break;

          case 64:
            _context.next = 70;
            break;

          case 66:
            _context.prev = 66;
            _context.t1 = _context['catch'](51);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t1;

          case 70:
            _context.prev = 70;
            _context.prev = 71;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 73:
            _context.prev = 73;

            if (!_didIteratorError3) {
              _context.next = 76;
              break;
            }

            throw _iteratorError3;

          case 76:
            return _context.finish(73);

          case 77:
            return _context.finish(70);

          case 78:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 81;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(ignoreFiles);

          case 83:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 92;
              break;
            }

            _file2 = _step4.value;
            _loc2 = path.join(folder, _file2);
            _context.next = 88;
            return (_fs || _load_fs()).unlink(_loc2);

          case 88:
            tick();

          case 89:
            _iteratorNormalCompletion4 = true;
            _context.next = 83;
            break;

          case 92:
            _context.next = 98;
            break;

          case 94:
            _context.prev = 94;
            _context.t2 = _context['catch'](81);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t2;

          case 98:
            _context.prev = 98;
            _context.prev = 99;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 101:
            _context.prev = 101;

            if (!_didIteratorError4) {
              _context.next = 104;
              break;
            }

            throw _iteratorError4;

          case 104:
            return _context.finish(101);

          case 105:
            return _context.finish(98);

          case 106:
            _iteratorNormalCompletion2 = true;
            _context.next = 34;
            break;

          case 109:
            _context.next = 115;
            break;

          case 111:
            _context.prev = 111;
            _context.t3 = _context['catch'](32);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t3;

          case 115:
            _context.prev = 115;
            _context.prev = 116;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 118:
            _context.prev = 118;

            if (!_didIteratorError2) {
              _context.next = 121;
              break;
            }

            throw _iteratorError2;

          case 121:
            return _context.finish(118);

          case 122:
            return _context.finish(115);

          case 123:
            return _context.abrupt('return', { removedFiles: removedFiles, removedSize: removedSize });

          case 124:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 17, 21, 29], [22,, 24, 28], [32, 111, 115, 123], [51, 66, 70, 78], [71,, 73, 77], [81, 94, 98, 106], [99,, 101, 105], [116,, 118, 122]]);
  }));

  return function clean(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var cleanLoc, _ref3, removedFiles, removedSize;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reporter.step(1, 2, reporter.lang('cleanCreatingFile', (_constants || _load_constants()).CLEAN_FILENAME));

            cleanLoc = path.join(config.cwd, (_constants || _load_constants()).CLEAN_FILENAME);
            _context2.next = 4;
            return (_fs || _load_fs()).exists(cleanLoc);

          case 4:
            if (_context2.sent) {
              _context2.next = 7;
              break;
            }

            _context2.next = 7;
            return (_fs || _load_fs()).writeFile(cleanLoc, DEFAULT_FILTER + '\n', { flag: 'wx' });

          case 7:

            reporter.step(2, 2, reporter.lang('cleaning'));
            _context2.next = 10;
            return clean(config, reporter);

          case 10:
            _ref3 = _context2.sent;
            removedFiles = _ref3.removedFiles;
            removedSize = _ref3.removedSize;

            reporter.info(reporter.lang('cleanRemovedFiles', removedFiles));
            reporter.info(reporter.lang('cleanSavedSize', Number((removedSize / 1024 / 1024).toFixed(2))));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _index;

function _load_index() {
  return _index = require('../../registries/index.js');
}

var _filter;

function _load_filter() {
  return _filter = require('../../util/filter.js');
}

var _constants;

function _load_constants() {
  return _constants = require('../../constants.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var requireLockfile = exports.requireLockfile = true;
var noArguments = exports.noArguments = true;

var DEFAULT_FILTER = '\n# test directories\n__tests__\ntest\ntests\npowered-test\n\n# asset directories\ndocs\ndoc\nwebsite\nimages\nassets\n\n# examples\nexample\nexamples\n\n# code coverage directories\ncoverage\n.nyc_output\n\n# build scripts\nMakefile\nGulpfile.js\nGruntfile.js\n\n# configs\n.tern-project\n.gitattributes\n.editorconfig\n.*ignore\n.eslintrc\n.jshintrc\n.flowconfig\n.documentup.json\n.yarn-metadata.json\n.*.yml\n*.yml\n\n# misc\n*.gz\n*.md\n'.trim();