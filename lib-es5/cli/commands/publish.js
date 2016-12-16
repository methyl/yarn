'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _defineProperty2;

function _load_defineProperty() {
  return _defineProperty2 = _interopRequireDefault(require('babel-runtime/helpers/defineProperty'));
}

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var publish = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(config, pkg, flags, dir) {
    var access, stat, stream, buffer, key, tag, tbName, tbURI, root, registry, res;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // validate access argument
            access = flags.access;

            if (!(access && access !== 'public' && access !== 'restricted')) {
              _context.next = 3;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(config.reporter.lang('invalidAccess'));

          case 3:
            _context.next = 5;
            return (_fs || _load_fs()).lstat(dir);

          case 5:
            stat = _context.sent;
            stream = void 0;

            if (!stat.isDirectory()) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return (0, (_pack || _load_pack()).pack)(config, dir);

          case 10:
            stream = _context.sent;
            _context.next = 18;
            break;

          case 13:
            if (!stat.isFile()) {
              _context.next = 17;
              break;
            }

            stream = fs2.createReadStream(dir);
            _context.next = 18;
            break;

          case 17:
            throw new Error("Don't know how to handle this file type");

          case 18:
            invariant(stream, 'expected stream');
            _context.next = 21;
            return new (_promise || _load_promise()).default(function (resolve, reject) {
              stream.pipe(new (_stream || _load_stream()).ConcatStream(resolve)).on('error', reject);
            });

          case 21:
            buffer = _context.sent;


            // copy normalized package and remove internal keys as they may be sensitive or yarn specific
            pkg = (0, (_assign || _load_assign()).default)({}, pkg);
            for (key in pkg) {
              if (key[0] === '_') {
                delete pkg[key];
              }
            }

            tag = flags.tag || 'latest';
            tbName = pkg.name + '-' + pkg.version + '.tgz';
            tbURI = pkg.name + '/-/' + tbName;

            // TODO this might modify package.json, do we need to reload it?

            _context.next = 29;
            return config.executeLifecycleScript('prepublish');

          case 29:

            // create body
            root = {
              _id: pkg.name,
              access: flags.access,
              name: pkg.name,
              description: pkg.description,
              'dist-tags': (0, (_defineProperty2 || _load_defineProperty()).default)({}, tag, pkg.version),
              versions: (0, (_defineProperty2 || _load_defineProperty()).default)({}, pkg.version, pkg),
              readme: pkg.readme || '',
              _attachments: (0, (_defineProperty2 || _load_defineProperty()).default)({}, tbName, {
                'content_type': 'application/octet-stream',
                data: buffer.toString('base64'),
                length: buffer.length
              })
            };


            pkg._id = pkg.name + '@' + pkg.version;
            pkg.dist = pkg.dist || {};
            pkg.dist.shasum = crypto.createHash('sha1').update(buffer).digest('hex');

            registry = String(config.getOption('registry'));

            pkg.dist.tarball = url.resolve(registry, tbURI).replace(/^https:\/\//, 'http://');

            // publish package
            _context.next = 37;
            return config.registries.npm.request((_npmRegistry || _load_npmRegistry()).default.escapeName(pkg.name), {
              method: 'PUT',
              body: root
            });

          case 37:
            res = _context.sent;

            if (!(res != null && res.success)) {
              _context.next = 45;
              break;
            }

            _context.next = 41;
            return config.executeLifecycleScript('publish');

          case 41:
            _context.next = 43;
            return config.executeLifecycleScript('postpublish');

          case 43:
            _context.next = 46;
            break;

          case 45:
            throw new (_errors || _load_errors()).MessageError(config.reporter.lang('publishFail'));

          case 46:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function publish(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var pkg, dir, commitVersion, revoke;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return config.readRootManifest();

          case 2:
            pkg = _context2.sent;

            if (!pkg.private) {
              _context2.next = 5;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('publishPrivate'));

          case 5:
            if (pkg.name) {
              _context2.next = 7;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('noName'));

          case 7:

            // validate arguments
            dir = args[0] || config.cwd;

            if (!(args.length > 1)) {
              _context2.next = 10;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('tooManyArguments', 1));

          case 10:
            _context2.next = 12;
            return (_fs || _load_fs()).exists(dir);

          case 12:
            if (_context2.sent) {
              _context2.next = 14;
              break;
            }

            throw new (_errors || _load_errors()).MessageError(reporter.lang('unknownFolderOrTarball'));

          case 14:

            //
            reporter.step(1, 4, reporter.lang('bumpingVersion'));
            _context2.next = 17;
            return (0, (_version || _load_version()).setVersion)(config, reporter, flags, args, false);

          case 17:
            commitVersion = _context2.sent;


            //
            reporter.step(2, 4, reporter.lang('loggingIn'));
            _context2.next = 21;
            return (0, (_login || _load_login()).getToken)(config, reporter, pkg.name);

          case 21:
            revoke = _context2.sent;


            //
            reporter.step(3, 4, reporter.lang('publishing'));
            _context2.next = 25;
            return publish(config, pkg, flags, dir);

          case 25:
            _context2.next = 27;
            return commitVersion();

          case 27:
            reporter.success(reporter.lang('published'));

            //
            reporter.step(4, 4, reporter.lang('revokingToken'));
            _context2.next = 31;
            return revoke();

          case 31:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setFlags = setFlags;

var _npmRegistry;

function _load_npmRegistry() {
  return _npmRegistry = _interopRequireDefault(require('../../registries/npm-registry.js'));
}

var _stream;

function _load_stream() {
  return _stream = require('../../util/stream.js');
}

var _errors;

function _load_errors() {
  return _errors = require('../../errors.js');
}

var _version;

function _load_version() {
  return _version = require('./version.js');
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('../../util/fs.js'));
}

var _pack;

function _load_pack() {
  return _pack = require('./pack.js');
}

var _login;

function _load_login() {
  return _login = require('./login.js');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var crypto = require('crypto');
var url = require('url');
var fs2 = require('fs');

function setFlags(commander) {
  (0, (_version || _load_version()).setFlags)(commander);
  commander.usage('publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>]');
  commander.option('--access [access]', 'access');
  commander.option('--tag [tag]', 'tag');
}