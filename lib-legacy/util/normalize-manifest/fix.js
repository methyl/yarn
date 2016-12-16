'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _defineProperty2;

function _load_defineProperty() {
  return _defineProperty2 = _interopRequireDefault(require('babel-runtime/helpers/defineProperty'));
}

var _toArray2;

function _load_toArray() {
  return _toArray2 = _interopRequireDefault(require('babel-runtime/helpers/toArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _util;

function _load_util() {
  return _util = require('./util.js');
}

var _index;

function _load_index() {
  return _index = require('../../resolvers/index.js');
}

var _inferLicense;

function _load_inferLicense() {
  return _inferLicense = _interopRequireDefault(require('./infer-license.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semver = require('semver');
var path = require('path');
var url = require('url');

var LICENSE_RENAMES = {
  'MIT/X11': 'MIT',
  X11: 'MIT'
};

exports.default = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(info, moduleLoc, reporter, warn, looseSemver) {
    var files, authorsFilepath, authorsFilestats, authors, readmeCandidates, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, readmeFilename, readmeFilepath, readmeFileStats, desc, engines, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, str, _str$trim$split, _str$trim$split2, name, patternParts, repo, parts, _name, scripts, dirs, binDir, bin, fullBinDir, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, scriptName, manDir, man, fullManDir, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, filename, licenses, licenseTypes, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _license, license, licenseFile, licenseFilepath, licenseFileStats, licenseContent, inferredLicense, _license2, basicLicense, expandedLicense, _inferredLicense;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (_fs || _load_fs()).readdir(moduleLoc);

          case 2:
            files = _context.sent;


            // clean info.version
            if (typeof info.version === 'string' && !semver.valid(info.version)) {
              info.version = semver.clean(info.version, looseSemver) || info.version;
            }

            // if name or version aren't set then set them to empty strings
            info.name = info.name || '';
            info.version = info.version || '';

            // if the man field is a string then coerce it to an array
            if (typeof info.man === 'string') {
              info.man = [info.man];
            }

            // if the keywords field is a string then split it on any whitespace
            if (typeof info.keywords === 'string') {
              info.keywords = info.keywords.split(/\s+/g);
            }

            // if there's no contributors field but an authors field then expand it

            if (!(!info.contributors && files.indexOf('AUTHORS') >= 0)) {
              _context.next = 19;
              break;
            }

            authorsFilepath = path.join(moduleLoc, 'AUTHORS');
            _context.next = 12;
            return (_fs || _load_fs()).stat(authorsFilepath);

          case 12:
            authorsFilestats = _context.sent;

            if (!authorsFilestats.isFile()) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return (_fs || _load_fs()).readFile(authorsFilepath);

          case 16:
            authors = _context.sent;

            authors = authors.split(/\r?\n/g) // split on lines
            .map(function (line) {
              return line.replace(/^\s*#.*$/, '').trim();
            }) // remove comments
            .filter(function (line) {
              return !!line;
            }); // remove empty lines
            info.contributors = authors;

          case 19:

            // expand people fields to objects
            if (typeof info.author === 'string' || (0, (_typeof2 || _load_typeof()).default)(info.author) === 'object') {
              info.author = (0, (_util || _load_util()).normalizePerson)(info.author);
            }
            if (Array.isArray(info.contributors)) {
              info.contributors = info.contributors.map((_util || _load_util()).normalizePerson);
            }
            if (Array.isArray(info.maintainers)) {
              info.maintainers = info.maintainers.map((_util || _load_util()).normalizePerson);
            }

            // if there's no readme field then load the README file from the cwd

            if (info.readme) {
              _context.next = 58;
              break;
            }

            readmeCandidates = files.filter(function (filename) {
              var lower = filename.toLowerCase();
              return lower === 'readme' || lower.indexOf('readme.') === 0;
            }).sort(function (filename1, filename2) {
              // favor files with extensions
              return filename2.indexOf('.') - filename1.indexOf('.');
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 27;
            _iterator = (0, (_getIterator2 || _load_getIterator()).default)(readmeCandidates);

          case 29:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 44;
              break;
            }

            readmeFilename = _step.value;
            readmeFilepath = path.join(moduleLoc, readmeFilename);
            _context.next = 34;
            return (_fs || _load_fs()).stat(readmeFilepath);

          case 34:
            readmeFileStats = _context.sent;

            if (!readmeFileStats.isFile()) {
              _context.next = 41;
              break;
            }

            info.readmeFilename = readmeFilename;
            _context.next = 39;
            return (_fs || _load_fs()).readFile(readmeFilepath);

          case 39:
            info.readme = _context.sent;
            return _context.abrupt('break', 44);

          case 41:
            _iteratorNormalCompletion = true;
            _context.next = 29;
            break;

          case 44:
            _context.next = 50;
            break;

          case 46:
            _context.prev = 46;
            _context.t0 = _context['catch'](27);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 50:
            _context.prev = 50;
            _context.prev = 51;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 53:
            _context.prev = 53;

            if (!_didIteratorError) {
              _context.next = 56;
              break;
            }

            throw _iteratorError;

          case 56:
            return _context.finish(53);

          case 57:
            return _context.finish(50);

          case 58:

            // if there's no description then take the first paragraph from the readme
            if (!info.description && info.readme) {
              desc = (0, (_util || _load_util()).extractDescription)(info.readme);

              if (desc) {
                info.description = desc;
              }
            }

            // support array of engine keys

            if (!Array.isArray(info.engines)) {
              _context.next = 81;
              break;
            }

            engines = {};
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 64;

            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(info.engines); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              str = _step2.value;

              if (typeof str === 'string') {
                _str$trim$split = str.trim().split(/ +/g);
                _str$trim$split2 = (0, (_toArray2 || _load_toArray()).default)(_str$trim$split);
                name = _str$trim$split2[0];
                patternParts = _str$trim$split2.slice(1);

                engines[name] = patternParts.join(' ');
              }
            }
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t1 = _context['catch'](64);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 72:
            _context.prev = 72;
            _context.prev = 73;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 75:
            _context.prev = 75;

            if (!_didIteratorError2) {
              _context.next = 78;
              break;
            }

            throw _iteratorError2;

          case 78:
            return _context.finish(75);

          case 79:
            return _context.finish(72);

          case 80:
            info.engines = engines;

          case 81:

            // if the repository field is a string then assume it's a git repo and expand it
            if (typeof info.repository === 'string') {
              info.repository = {
                type: 'git',
                url: info.repository
              };
            }

            repo = info.repository;

            // explode info.repository.url if it's a hosted git shorthand

            if (repo && (typeof repo === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(repo)) === 'object' && typeof repo.url === 'string') {
              repo.url = (0, (_index || _load_index()).hostedGitFragmentToGitUrl)(repo.url, reporter);
            }

            // allow bugs to be specified as a string, expand it to an object with a single url prop
            if (typeof info.bugs === 'string') {
              info.bugs = { url: info.bugs };
            }

            // normalize homepage url to http
            if (typeof info.homepage === 'string') {
              parts = url.parse(info.homepage);

              parts.protocol = parts.protocol || 'http:';
              if (parts.pathname && !parts.hostname) {
                parts.hostname = parts.pathname;
                parts.pathname = '';
              }
              // $FlowFixMe: https://github.com/facebook/flow/issues/908
              info.homepage = url.format(parts);
            }

            // if the `bin` field is as string then expand it to an object with a single property
            // based on the original `bin` field and `name field`
            // { name: "foo", bin: "cli.js" } -> { name: "foo", bin: { foo: "cli.js" } }
            if (typeof info.name === 'string' && typeof info.bin === 'string') {
              // Remove scoped package name for consistency with NPM's bin field fixing behaviour
              _name = info.name.replace(/^@[^\/]+\//, '');

              info.bin = (0, (_defineProperty2 || _load_defineProperty()).default)({}, _name, info.bin);
            }

            // bundleDependencies is an alias for bundledDependencies
            if (info.bundledDependencies) {
              info.bundleDependencies = info.bundledDependencies;
              delete info.bundledDependencies;
            }

            scripts = void 0;

            // dummy script object to shove file inferred scripts onto

            if (info.scripts && (0, (_typeof2 || _load_typeof()).default)(info.scripts) === 'object') {
              scripts = info.scripts;
            } else {
              scripts = {};
            }

            // if there's a server.js file and no start script then set it to `node server.js`
            if (!scripts.start && files.indexOf('server.js') >= 0) {
              scripts.start = 'node server.js';
            }

            // if there's a binding.gyp file and no install script then set it to `node-gyp rebuild`
            if (!scripts.install && files.indexOf('binding.gyp') >= 0) {
              scripts.install = 'node-gyp rebuild';
            }

            // set scripts if we've polluted the empty object
            if ((0, (_keys || _load_keys()).default)(scripts).length) {
              info.scripts = scripts;
            }

            dirs = info.directories;

            if (!(dirs && (typeof dirs === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(dirs)) === 'object')) {
              _context.next = 173;
              break;
            }

            binDir = dirs.bin;

            if (!(!info.bin && binDir && typeof binDir === 'string')) {
              _context.next = 135;
              break;
            }

            bin = info.bin = {};
            fullBinDir = path.join(moduleLoc, binDir);
            _context.next = 101;
            return (_fs || _load_fs()).exists(fullBinDir);

          case 101:
            if (!_context.sent) {
              _context.next = 134;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 105;
            _context.next = 108;
            return (_fs || _load_fs()).readdir(fullBinDir);

          case 108:
            _context.t2 = _context.sent;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(_context.t2);

          case 110:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 118;
              break;
            }

            scriptName = _step3.value;

            if (!(scriptName[0] === '.')) {
              _context.next = 114;
              break;
            }

            return _context.abrupt('continue', 115);

          case 114:
            bin[scriptName] = path.join('.', binDir, scriptName);

          case 115:
            _iteratorNormalCompletion3 = true;
            _context.next = 110;
            break;

          case 118:
            _context.next = 124;
            break;

          case 120:
            _context.prev = 120;
            _context.t3 = _context['catch'](105);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t3;

          case 124:
            _context.prev = 124;
            _context.prev = 125;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 127:
            _context.prev = 127;

            if (!_didIteratorError3) {
              _context.next = 130;
              break;
            }

            throw _iteratorError3;

          case 130:
            return _context.finish(127);

          case 131:
            return _context.finish(124);

          case 132:
            _context.next = 135;
            break;

          case 134:
            warn(reporter.lang('manifestDirectoryNotFound', binDir, info.name));

          case 135:
            manDir = dirs.man;

            if (!(!info.man && typeof manDir === 'string')) {
              _context.next = 173;
              break;
            }

            man = info.man = [];
            fullManDir = path.join(moduleLoc, manDir);
            _context.next = 141;
            return (_fs || _load_fs()).exists(fullManDir);

          case 141:
            if (!_context.sent) {
              _context.next = 172;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 145;
            _context.next = 148;
            return (_fs || _load_fs()).readdir(fullManDir);

          case 148:
            _context.t4 = _context.sent;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(_context.t4);

          case 150:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 156;
              break;
            }

            filename = _step4.value;

            if (/^(.*?)\.[0-9]$/.test(filename)) {
              man.push(path.join('.', manDir, filename));
            }

          case 153:
            _iteratorNormalCompletion4 = true;
            _context.next = 150;
            break;

          case 156:
            _context.next = 162;
            break;

          case 158:
            _context.prev = 158;
            _context.t5 = _context['catch'](145);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t5;

          case 162:
            _context.prev = 162;
            _context.prev = 163;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 165:
            _context.prev = 165;

            if (!_didIteratorError4) {
              _context.next = 168;
              break;
            }

            throw _iteratorError4;

          case 168:
            return _context.finish(165);

          case 169:
            return _context.finish(162);

          case 170:
            _context.next = 173;
            break;

          case 172:
            warn(reporter.lang('manifestDirectoryNotFound', manDir, info.name));

          case 173:

            delete info.directories;

            // normalize licenses field
            licenses = info.licenses;

            if (!(Array.isArray(licenses) && !info.license)) {
              _context.next = 198;
              break;
            }

            licenseTypes = [];
            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 180;


            for (_iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(licenses); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              _license = _step5.value;

              if (_license && (typeof _license === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(_license)) === 'object') {
                _license = _license.type;
              }
              if (typeof _license === 'string') {
                licenseTypes.push(_license);
              }
            }

            _context.next = 188;
            break;

          case 184:
            _context.prev = 184;
            _context.t6 = _context['catch'](180);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t6;

          case 188:
            _context.prev = 188;
            _context.prev = 189;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 191:
            _context.prev = 191;

            if (!_didIteratorError5) {
              _context.next = 194;
              break;
            }

            throw _iteratorError5;

          case 194:
            return _context.finish(191);

          case 195:
            return _context.finish(188);

          case 196:
            licenseTypes = licenseTypes.filter((_util || _load_util()).isValidLicense);

            if (licenseTypes.length === 1) {
              info.license = licenseTypes[0];
            } else if (licenseTypes.length) {
              info.license = '(' + licenseTypes.join(' OR ') + ')';
            }

          case 198:
            license = info.license;

            // normalize license

            if (license && (typeof license === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(license)) === 'object') {
              info.license = license.type;
            }

            // get license file
            licenseFile = files.find(function (filename) {
              var lower = filename.toLowerCase();
              return lower === 'license' || lower.startsWith('license.') || lower === 'unlicense' || lower.startsWith('unlicense.');
            });

            if (!licenseFile) {
              _context.next = 214;
              break;
            }

            licenseFilepath = path.join(moduleLoc, licenseFile);
            _context.next = 205;
            return (_fs || _load_fs()).stat(licenseFilepath);

          case 205:
            licenseFileStats = _context.sent;

            if (!licenseFileStats.isFile()) {
              _context.next = 214;
              break;
            }

            _context.next = 209;
            return (_fs || _load_fs()).readFile(licenseFilepath);

          case 209:
            licenseContent = _context.sent;
            inferredLicense = (0, (_inferLicense || _load_inferLicense()).default)(licenseContent);

            info.licenseText = licenseContent;

            _license2 = info.license;


            if (typeof _license2 === 'string') {
              if (inferredLicense && (0, (_util || _load_util()).isValidLicense)(inferredLicense) && !(0, (_util || _load_util()).isValidLicense)(_license2)) {
                // some packages don't specify their license version but we can infer it based on their license file
                basicLicense = _license2.toLowerCase().replace(/(-like|\*)$/g, '');
                expandedLicense = inferredLicense.toLowerCase();

                if (expandedLicense.startsWith(basicLicense)) {
                  // TODO consider doing something to notify the user
                  info.license = inferredLicense;
                }
              }
            } else if (inferredLicense) {
              // if there's no license then infer it based on the license file
              info.license = inferredLicense;
            } else {
              // valid expression to refer to a license in a file
              info.license = 'SEE LICENSE IN ' + licenseFile;
            }

          case 214:

            if (typeof info.license === 'string') {
              // sometimes licenses are known by different names, reduce them
              info.license = LICENSE_RENAMES[info.license] || info.license;
            } else if (typeof info.readme === 'string') {
              // the license might be at the bottom of the README
              _inferredLicense = (0, (_inferLicense || _load_inferLicense()).default)(info.readme);

              if (_inferredLicense) {
                info.license = _inferredLicense;
              }
            }

          case 215:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[27, 46, 50, 58], [51,, 53, 57], [64, 68, 72, 80], [73,, 75, 79], [105, 120, 124, 132], [125,, 127, 131], [145, 158, 162, 170], [163,, 165, 169], [180, 184, 188, 196], [189,, 191, 195]]);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();