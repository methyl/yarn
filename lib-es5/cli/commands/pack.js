'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.pack = undefined;

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

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var pack = exports.pack = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, dir) {
    var pkg, bundledDependencies, onlyFiles, filters, lines, regexes, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, raw, _lines, _regexes, keepFiles, ignoredFiles, possibleKeepFiles, packer, compressor, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name, loc, stat, type, buffer, linkname, entry;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return config.readRootManifest();

          case 2:
            pkg = _context.sent;
            bundledDependencies = pkg.bundledDependencies;
            onlyFiles = pkg.files;

            // inlude required files

            filters = NEVER_IGNORE.slice();
            // include default filters unless `files` is used

            if (!onlyFiles) {
              filters = filters.concat(DEFAULT_IGNORE);
            }

            // include bundledDependencies
            if (bundledDependencies) {
              (function () {
                var folder = config.getFolder(pkg);
                filters = (0, (_filter || _load_filter()).ignoreLinesToRegex)(bundledDependencies.map(function (name) {
                  return '!' + folder + '/' + name;
                }), '.');
              })();
            }

            // `files` field
            if (onlyFiles) {
              lines = ['*', // ignore all files except those that are explicitly included with a negation filter
              '.*'];

              lines = lines.concat(onlyFiles.map(function (filename) {
                return '!' + filename;
              }));
              regexes = (0, (_filter || _load_filter()).ignoreLinesToRegex)(lines, '.');

              filters = filters.concat(regexes);
            }

            //
            _context.next = 11;
            return (_fs || _load_fs()).walk(config.cwd, null, new (_set || _load_set()).default(FOLDERS_IGNORE));

          case 11:
            files = _context.sent;


            // create ignores
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(files);

          case 17:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 29;
              break;
            }

            file = _step.value;

            if (!(IGNORE_FILENAMES.indexOf(path.basename(file.relative)) >= 0)) {
              _context.next = 26;
              break;
            }

            _context.next = 22;
            return (_fs || _load_fs()).readFile(file.absolute);

          case 22:
            raw = _context.sent;
            _lines = raw.split('\n');
            _regexes = (0, (_filter || _load_filter()).ignoreLinesToRegex)(_lines, path.dirname(file.relative));

            filters = filters.concat(_regexes);

          case 26:
            _iteratorNormalCompletion = true;
            _context.next = 17;
            break;

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 35:
            _context.prev = 35;
            _context.prev = 36;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 38:
            _context.prev = 38;

            if (!_didIteratorError) {
              _context.next = 41;
              break;
            }

            throw _iteratorError;

          case 41:
            return _context.finish(38);

          case 42:
            return _context.finish(35);

          case 43:

            // files to definently keep, takes precedence over ignore filter
            keepFiles = new (_set || _load_set()).default();

            // files to definently ignore

            ignoredFiles = new (_set || _load_set()).default();

            // list of files that didn't match any of our patterns, if a directory in the chain above was matched
            // then we should inherit it

            possibleKeepFiles = new (_set || _load_set()).default();

            // apply filters

            (0, (_filter || _load_filter()).sortFilter)(files, filters, keepFiles, possibleKeepFiles, ignoredFiles);

            packer = tar.pack();
            compressor = packer.pipe(new zlib.Gzip());
            _context.next = 51;
            return addEntry(packer, {
              name: 'package',
              type: 'directory'
            });

          case 51:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 54;
            _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(keepFiles);

          case 56:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 90;
              break;
            }

            name = _step2.value;
            loc = path.join(config.cwd, name);
            _context.next = 61;
            return (_fs || _load_fs()).lstat(loc);

          case 61:
            stat = _context.sent;
            type = void 0;
            buffer = void 0;
            linkname = void 0;

            if (!stat.isDirectory()) {
              _context.next = 69;
              break;
            }

            type = 'directory';
            _context.next = 84;
            break;

          case 69:
            if (!stat.isFile()) {
              _context.next = 76;
              break;
            }

            _context.next = 72;
            return (_fs || _load_fs()).readFileRaw(loc);

          case 72:
            buffer = _context.sent;

            type = 'file';
            _context.next = 84;
            break;

          case 76:
            if (!stat.isSymbolicLink()) {
              _context.next = 83;
              break;
            }

            type = 'symlink';
            _context.next = 80;
            return (_fs || _load_fs()).readlink(loc);

          case 80:
            linkname = _context.sent;
            _context.next = 84;
            break;

          case 83:
            throw new Error();

          case 84:
            entry = {
              name: 'package/' + name,
              size: stat.size,
              mode: stat.mode,
              mtime: stat.mtime,
              type: type,
              linkname: linkname
            };
            _context.next = 87;
            return addEntry(packer, entry, buffer);

          case 87:
            _iteratorNormalCompletion2 = true;
            _context.next = 56;
            break;

          case 90:
            _context.next = 96;
            break;

          case 92:
            _context.prev = 92;
            _context.t1 = _context['catch'](54);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 96:
            _context.prev = 96;
            _context.prev = 97;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 99:
            _context.prev = 99;

            if (!_didIteratorError2) {
              _context.next = 102;
              break;
            }

            throw _iteratorError2;

          case 102:
            return _context.finish(99);

          case 103:
            return _context.finish(96);

          case 104:

            packer.finalize();

            return _context.abrupt('return', compressor);

          case 106:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[15, 31, 35, 43], [36,, 38, 42], [54, 92, 96, 104], [97,, 99, 103]]);
  }));

  return function pack(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var pkg, filename, stream;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return config.readRootManifest();

          case 2:
            pkg = _context2.sent;

            if (pkg.name) {
              _context2.next = 5;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('noName'));

          case 5:
            if (pkg.version) {
              _context2.next = 7;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('noVersion'));

          case 7:
            filename = flags.filename || path.join(config.cwd, pkg.name + '-v' + pkg.version + '.tgz');
            _context2.next = 10;
            return pack(config, config.cwd);

          case 10:
            stream = _context2.sent;
            _context2.next = 13;
            return new (_promise || _load_promise()).default(function (resolve, reject) {
              stream.pipe(fs2.createWriteStream(filename));
              stream.on('error', reject);
              stream.on('close', resolve);
            });

          case 13:

            reporter.success(reporter.lang('packWroteTarball', filename));

          case 14:
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

exports.setFlags = setFlags;

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _filter;

function _load_filter() {
  return _filter = require('../../util/filter.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zlib = require('zlib');
var path = require('path');
var tar = require('tar-stream');
var fs2 = require('fs');

var IGNORE_FILENAMES = ['.yarnignore', '.npmignore', '.gitignore'];

var FOLDERS_IGNORE = [
// never allow version control folders
'.git', 'CVS', '.svn', '.hg', 'node_modules'];

var DEFAULT_IGNORE = (0, (_filter || _load_filter()).ignoreLinesToRegex)([].concat(FOLDERS_IGNORE, [

// ignore cruft
'yarn.lock', '.lock-wscript', '.wafpickle-{0..9}', '*.swp', '._*', 'npm-debug.log', 'yarn-error.log', '.npmrc', '.yarnrc', '.npmignore', '.gitignore', '.DS_Store']));

var NEVER_IGNORE = (0, (_filter || _load_filter()).ignoreLinesToRegex)([
// never ignore these files
'!/package.json', '!/readme*', '!/+(license|licence)*', '!/+(changes|changelog|history)*']);

function addEntry(packer, entry, buffer) {
  return new (_promise || _load_promise()).default(function (resolve, reject) {
    packer.entry(entry, buffer, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function setFlags(commander) {
  commander.option('-f, --filename <filename>', 'filename');
}