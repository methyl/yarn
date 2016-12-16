'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlags = exports.run = undefined;

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('babel-runtime/core-js/map'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _extends2;

function _load_extends() {
  return _extends2 = _interopRequireDefault(require('babel-runtime/helpers/extends'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var getManifests = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, flags) {
    var lockfile, install, manifests;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd);

          case 2:
            lockfile = _context.sent;
            install = new (_install || _load_install()).Install((0, (_extends2 || _load_extends()).default)({ skipIntegrity: true }, flags), config, new (_baseReporter || _load_baseReporter()).default(), lockfile);
            _context.next = 6;
            return install.hydrate(true);

          case 6:
            manifests = install.resolver.getManifests();

            // sort by name

            manifests = manifests.sort(function (a, b) {
              if (!a.name && !b.name) {
                return 0;
              }

              if (!a.name) {
                return 1;
              }

              if (!b.name) {
                return -1;
              }

              return a.name.localeCompare(b.name);
            });

            // filter ignored manifests
            manifests = manifests.filter(function (manifest) {
              var ref = manifest._reference;
              return !!ref && !ref.ignore;
            });

            return _context.abrupt('return', manifests);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getManifests(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.hasWrapper = hasWrapper;

var _baseReporter;

function _load_baseReporter() {
  return _baseReporter = _interopRequireDefault(require('../../reporters/base-reporter.js'));
}

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

var _buildSubCommands2;

function _load_buildSubCommands() {
  return _buildSubCommands2 = _interopRequireDefault(require('./_build-sub-commands.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

function hasWrapper(flags, args) {
  return args[0] != 'generate-disclaimer';
}

var _buildSubCommands = (0, (_buildSubCommands2 || _load_buildSubCommands()).default)('licenses', {
  ls: function () {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
      var manifests, body, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, name, version, license, repository, homepage, url, trees, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, children, _url;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getManifests(config, flags);

            case 2:
              manifests = _context2.sent;

              if (!flags.json) {
                _context2.next = 27;
                break;
              }

              body = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 8;


              for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)(manifests); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _step$value = _step.value;
                name = _step$value.name;
                version = _step$value.version;
                license = _step$value.license;
                repository = _step$value.repository;
                homepage = _step$value.homepage;
                url = repository ? repository.url : homepage;

                body.push([name, version, license || 'Unknown', url || 'Unknown']);
              }

              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 16:
              _context2.prev = 16;
              _context2.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 19:
              _context2.prev = 19;

              if (!_didIteratorError) {
                _context2.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context2.finish(19);

            case 23:
              return _context2.finish(16);

            case 24:
              reporter.table(['Name', 'Version', 'License', 'URL'], body);
              _context2.next = 48;
              break;

            case 27:
              trees = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 31;


              for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(manifests); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _step2$value = _step2.value;
                name = _step2$value.name;
                version = _step2$value.version;
                license = _step2$value.license;
                repository = _step2$value.repository;
                homepage = _step2$value.homepage;
                children = [];

                children.push({ name: reporter.format.bold('License:') + ' ' + (license || reporter.format.red('UNKNOWN')) });

                _url = repository ? repository.url : homepage;

                if (_url) {
                  children.push({ name: reporter.format.bold('URL:') + ' ' + _url });
                }

                trees.push({
                  name: name + '@' + version,
                  children: children
                });
              }

              _context2.next = 39;
              break;

            case 35:
              _context2.prev = 35;
              _context2.t1 = _context2['catch'](31);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t1;

            case 39:
              _context2.prev = 39;
              _context2.prev = 40;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 42:
              _context2.prev = 42;

              if (!_didIteratorError2) {
                _context2.next = 45;
                break;
              }

              throw _iteratorError2;

            case 45:
              return _context2.finish(42);

            case 46:
              return _context2.finish(39);

            case 47:
              reporter.tree('licenses', trees);

            case 48:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[8, 12, 16, 24], [17,, 19, 23], [31, 35, 39, 47], [40,, 42, 46]]);
    }));

    function ls(_x3, _x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    }

    return ls;
  }(),
  generateDisclaimer: function () {
    var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(config, reporter, flags, args) {
      var manifests, manifest, manifestsByLicense, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _manifest, licenseText, byLicense, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _manifests, names, urls, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, name, repository, heading;

      return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getManifests(config, flags);

            case 2:
              manifests = _context3.sent;
              _context3.next = 5;
              return config.readRootManifest();

            case 5:
              manifest = _context3.sent;


              // Create a map of license text to manifest so that packages with exactly
              manifestsByLicense = new (_map || _load_map()).default();
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 10;
              _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(manifests);

            case 12:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context3.next = 24;
                break;
              }

              _manifest = _step3.value;
              licenseText = _manifest.licenseText;

              if (licenseText) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt('continue', 21);

            case 17:

              if (!manifestsByLicense.has(licenseText)) {
                manifestsByLicense.set(licenseText, new (_map || _load_map()).default());
              }

              byLicense = manifestsByLicense.get(licenseText);

              invariant(byLicense, 'expected value');
              byLicense.set(_manifest.name, _manifest);

            case 21:
              _iteratorNormalCompletion3 = true;
              _context3.next = 12;
              break;

            case 24:
              _context3.next = 30;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t0 = _context3['catch'](10);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t0;

            case 30:
              _context3.prev = 30;
              _context3.prev = 31;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 33:
              _context3.prev = 33;

              if (!_didIteratorError3) {
                _context3.next = 36;
                break;
              }

              throw _iteratorError3;

            case 36:
              return _context3.finish(33);

            case 37:
              return _context3.finish(30);

            case 38:

              console.log('THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED ' + ('IN PORTIONS OF THE ' + String(manifest.name).toUpperCase().replace(/-/g, ' ') + ' PRODUCT.'));
              console.log();

              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context3.prev = 43;
              _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(manifestsByLicense);

            case 45:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context3.next = 83;
                break;
              }

              _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 2);
              licenseText = _step4$value[0];
              _manifests = _step4$value[1];

              console.log('-----');
              console.log();

              names = [];
              urls = [];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context3.prev = 56;

              for (_iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(_manifests); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                _step5$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step5.value, 2);
                name = _step5$value[0];
                repository = _step5$value[1].repository;

                names.push(name);
                if (repository && repository.url) {
                  urls.push(_manifests.size === 1 ? repository.url : repository.url + ' (' + name + ')');
                }
              }

              _context3.next = 64;
              break;

            case 60:
              _context3.prev = 60;
              _context3.t1 = _context3['catch'](56);
              _didIteratorError5 = true;
              _iteratorError5 = _context3.t1;

            case 64:
              _context3.prev = 64;
              _context3.prev = 65;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 67:
              _context3.prev = 67;

              if (!_didIteratorError5) {
                _context3.next = 70;
                break;
              }

              throw _iteratorError5;

            case 70:
              return _context3.finish(67);

            case 71:
              return _context3.finish(64);

            case 72:
              heading = [];

              heading.push('The following software may be included in this product: ' + names.join(', ') + '.');
              if (urls.length > 0) {
                heading.push('A copy of the source code may be downloaded from ' + urls.join(', ') + '.');
              }
              heading.push('This software contains the following license and notice below:');

              console.log(heading.join(' '));
              console.log();

              if (licenseText) {
                console.log(licenseText.trim());
              } else {
                // what do we do here? base it on `license`?
              }

              console.log();

            case 80:
              _iteratorNormalCompletion4 = true;
              _context3.next = 45;
              break;

            case 83:
              _context3.next = 89;
              break;

            case 85:
              _context3.prev = 85;
              _context3.t2 = _context3['catch'](43);
              _didIteratorError4 = true;
              _iteratorError4 = _context3.t2;

            case 89:
              _context3.prev = 89;
              _context3.prev = 90;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 92:
              _context3.prev = 92;

              if (!_didIteratorError4) {
                _context3.next = 95;
                break;
              }

              throw _iteratorError4;

            case 95:
              return _context3.finish(92);

            case 96:
              return _context3.finish(89);

            case 97:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[10, 26, 30, 38], [31,, 33, 37], [43, 85, 89, 97], [56, 60, 64, 72], [65,, 67, 71], [90,, 92, 96]]);
    }));

    function generateDisclaimer(_x7, _x8, _x9, _x10) {
      return _ref3.apply(this, arguments);
    }

    return generateDisclaimer;
  }()
});

var run = _buildSubCommands.run;
var setFlags = _buildSubCommands.setFlags;
exports.run = run;
exports.setFlags = setFlags;