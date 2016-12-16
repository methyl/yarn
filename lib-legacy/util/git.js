'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _misc;

function _load_misc() {
  return _misc = require('./misc.js');
}

var _crypto;

function _load_crypto() {
  return _crypto = _interopRequireWildcard(require('./crypto.js'));
}

var _child;

function _load_child() {
  return _child = _interopRequireWildcard(require('./child.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./fs.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./map.js'));
}

var _fs2;

function _load_fs2() {
  return _fs2 = require('fs');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var semver = require('semver');
var url = require('url');
var tar = require('tar');


var supportsArchiveCache = (0, (_map || _load_map()).default)({
  'github.com': false });

var Git = function () {
  function Git(config, url, hash) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, Git);

    this.supportsArchive = false;
    this.fetched = false;
    this.config = config;
    this.hash = hash;
    this.ref = hash;
    this.url = Git.cleanUrl(url);
    this.cwd = this.config.getTemp((_crypto || _load_crypto()).hash(this.url));
  }

  (0, (_createClass2 || _load_createClass()).default)(Git, [{
    key: 'archive',


    /**
     * Archive a repo to destination
     */

    value: function archive(dest) {
      if (this.supportsArchive) {
        return this._archiveViaRemoteArchive(dest);
      } else {
        return this._archiveViaLocalFetched(dest);
      }
    }
  }, {
    key: '_archiveViaRemoteArchive',
    value: function () {
      var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(dest) {
        var hashStream;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hashStream = new (_crypto || _load_crypto()).HashStream();
                _context.next = 3;
                return (_child || _load_child()).spawn('git', ['archive', '--remote=' + this.url, this.ref], {
                  process: function process(proc, resolve, reject, done) {
                    var writeStream = (0, (_fs2 || _load_fs2()).createWriteStream)(dest);
                    proc.on('error', reject);
                    writeStream.on('error', reject);
                    writeStream.on('end', done);
                    writeStream.on('open', function () {
                      proc.stdout.pipe(hashStream).pipe(writeStream);
                    });
                    writeStream.once('finish', done);
                  }
                });

              case 3:
                return _context.abrupt('return', hashStream.getHash());

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _archiveViaRemoteArchive(_x) {
        return _ref.apply(this, arguments);
      }

      return _archiveViaRemoteArchive;
    }()
  }, {
    key: '_archiveViaLocalFetched',
    value: function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(dest) {
        var hashStream;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hashStream = new (_crypto || _load_crypto()).HashStream();
                _context2.next = 3;
                return (_child || _load_child()).spawn('git', ['archive', this.hash], {
                  cwd: this.cwd,
                  process: function process(proc, resolve, reject, done) {
                    var writeStream = (0, (_fs2 || _load_fs2()).createWriteStream)(dest);
                    proc.on('error', reject);
                    writeStream.on('error', reject);
                    writeStream.on('open', function () {
                      proc.stdout.pipe(hashStream).pipe(writeStream);
                    });
                    writeStream.once('finish', done);
                  }
                });

              case 3:
                return _context2.abrupt('return', hashStream.getHash());

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _archiveViaLocalFetched(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _archiveViaLocalFetched;
    }()

    /**
     * Clone a repo to the input `dest`. Use `git archive` if it's available, otherwise fall
     * back to `git clone`.
     */

  }, {
    key: 'clone',
    value: function clone(dest) {
      if (this.supportsArchive) {
        return this._cloneViaRemoteArchive(dest);
      } else {
        return this._cloneViaLocalFetched(dest);
      }
    }
  }, {
    key: '_cloneViaRemoteArchive',
    value: function () {
      var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(dest) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (_child || _load_child()).spawn('git', ['archive', '--remote=' + this.url, this.ref], {
                  process: function process(proc, update, reject, done) {
                    var extractor = tar.Extract({ path: dest });
                    extractor.on('error', reject);
                    extractor.on('end', done);

                    proc.stdout.pipe(extractor);
                    proc.on('error', reject);
                  }
                });

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _cloneViaRemoteArchive(_x3) {
        return _ref3.apply(this, arguments);
      }

      return _cloneViaRemoteArchive;
    }()
  }, {
    key: '_cloneViaLocalFetched',
    value: function () {
      var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(dest) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (_child || _load_child()).spawn('git', ['archive', this.hash], {
                  cwd: this.cwd,
                  process: function process(proc, resolve, reject, done) {
                    var extractor = tar.Extract({ path: dest });
                    extractor.on('error', reject);
                    extractor.on('end', done);

                    proc.stdout.pipe(extractor);
                  }
                });

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _cloneViaLocalFetched(_x4) {
        return _ref4.apply(this, arguments);
      }

      return _cloneViaLocalFetched;
    }()

    /**
     * Clone this repo.
     */

  }, {
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      var url = this.url;
      var cwd = this.cwd;


      return (_fs || _load_fs()).lockQueue.push(url, (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5() {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (_fs || _load_fs()).exists(cwd);

              case 2:
                if (!_context5.sent) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return (_child || _load_child()).spawn('git', ['pull'], { cwd: cwd });

              case 5:
                _context5.next = 9;
                break;

              case 7:
                _context5.next = 9;
                return (_child || _load_child()).spawn('git', ['clone', url, cwd]);

              case 9:

                _this.fetched = true;

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      })));
    }

    /**
     * Given a list of tags/branches from git, check if they match an input range.
     */

  }, {
    key: 'findResolution',
    value: function () {
      var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(range, tags) {
        var _this2 = this;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!range || !tags.length && range === '*')) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return', 'master');

              case 2:
                _context6.next = 4;
                return this.config.resolveConstraints(tags.filter(function (tag) {
                  return !!semver.valid(tag, _this2.config.looseSemver);
                }), range);

              case 4:
                _context6.t0 = _context6.sent;

                if (_context6.t0) {
                  _context6.next = 7;
                  break;
                }

                _context6.t0 = range;

              case 7:
                return _context6.abrupt('return', _context6.t0);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findResolution(_x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return findResolution;
    }()

    /**
     * Fetch the file by cloning the repo and reading it.
     */

  }, {
    key: 'getFile',
    value: function getFile(filename) {
      if (this.supportsArchive) {
        return this._getFileFromArchive(filename);
      } else {
        return this._getFileFromClone(filename);
      }
    }
  }, {
    key: '_getFileFromArchive',
    value: function () {
      var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7(filename) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return (_child || _load_child()).spawn('git', ['archive', '--remote=' + this.url, this.ref, filename], {
                  process: function process(proc, update, reject, done) {
                    var parser = tar.Parse();

                    parser.on('error', reject);
                    parser.on('end', done);

                    parser.on('data', function (entry) {
                      update(entry.toString());
                    });

                    proc.stdout.pipe(parser);
                  }
                });

              case 3:
                return _context7.abrupt('return', _context7.sent);

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7['catch'](0);

                if (!(_context7.t0.message.indexOf('did not match any files') >= 0)) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt('return', false);

              case 12:
                throw _context7.t0;

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      function _getFileFromArchive(_x7) {
        return _ref7.apply(this, arguments);
      }

      return _getFileFromArchive;
    }()
  }, {
    key: '_getFileFromClone',
    value: function () {
      var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(filename) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                invariant(this.fetched, 'Repo not fetched');

                _context8.prev = 1;
                _context8.next = 4;
                return (_child || _load_child()).spawn('git', ['show', this.hash + ':' + filename], { cwd: this.cwd });

              case 4:
                return _context8.abrupt('return', _context8.sent);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](1);
                return _context8.abrupt('return', false);

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 7]]);
      }));

      function _getFileFromClone(_x8) {
        return _ref8.apply(this, arguments);
      }

      return _getFileFromClone;
    }()

    /**
     * Initialize the repo, find a secure url to use and
     * set the ref to match an input `target`.
     */

  }, {
    key: 'init',
    value: function () {
      var _ref9 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee9() {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return Git.secureUrl(this.url, this.hash);

              case 2:
                this.url = _context9.sent;
                _context9.next = 5;
                return Git.hasArchiveCapability(this.url);

              case 5:
                if (!_context9.sent) {
                  _context9.next = 9;
                  break;
                }

                this.supportsArchive = true;
                _context9.next = 11;
                break;

              case 9:
                _context9.next = 11;
                return this.fetch();

              case 11:
                _context9.next = 13;
                return this.setRefRemote();

              case 13:
                return _context9.abrupt('return', _context9.sent);

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function init() {
        return _ref9.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'setRefRemote',
    value: function () {
      var _ref10 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee10() {
        var stdout, refs;
        return (_regenerator || _load_regenerator()).default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (_child || _load_child()).spawn('git', ['ls-remote', '--tags', '--heads', this.url]);

              case 2:
                stdout = _context10.sent;
                refs = Git.parseRefs(stdout);
                _context10.next = 6;
                return this.setRef(refs);

              case 6:
                return _context10.abrupt('return', _context10.sent);

              case 7:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setRefRemote() {
        return _ref10.apply(this, arguments);
      }

      return setRefRemote;
    }()

    /**
     * TODO description
     */

  }, {
    key: 'setRef',
    value: function () {
      var _ref11 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee11(refs) {
        var hash, names, _name, ref, commit;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // get commit ref
                hash = this.hash;
                names = (0, (_keys || _load_keys()).default)(refs);

                if (!Git.isCommitHash(hash)) {
                  _context11.next = 13;
                  break;
                }

                _context11.t0 = (_regenerator || _load_regenerator()).default.keys(refs);

              case 4:
                if ((_context11.t1 = _context11.t0()).done) {
                  _context11.next = 11;
                  break;
                }

                _name = _context11.t1.value;

                if (!(refs[_name] === hash)) {
                  _context11.next = 9;
                  break;
                }

                this.ref = _name;
                return _context11.abrupt('return', hash);

              case 9:
                _context11.next = 4;
                break;

              case 11:

                // `git archive` only accepts a treeish and we have no ref to this commit
                this.supportsArchive = false;
                return _context11.abrupt('return', this.ref = this.hash = hash);

              case 13:
                _context11.next = 15;
                return this.findResolution(hash, names);

              case 15:
                ref = _context11.sent;
                commit = refs[ref];

                if (!commit) {
                  _context11.next = 22;
                  break;
                }

                this.ref = ref;
                return _context11.abrupt('return', this.hash = commit);

              case 22:
                throw new (_errors || _load_errors()).MessageError(this.config.reporter.lang('couldntFindMatch', ref, names.join(','), this.url));

              case 23:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setRef(_x9) {
        return _ref11.apply(this, arguments);
      }

      return setRef;
    }()

    /**
     * TODO description
     */

  }], [{
    key: 'cleanUrl',
    value: function cleanUrl(url) {
      return url.replace(/^git\+/, '');
    }

    /**
     * Check if the host specified in the input `gitUrl` has archive capability.
     */

  }, {
    key: 'hasArchiveCapability',
    value: function () {
      var _ref12 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee12(gitUrl) {
        var match, _match, hostname, cached, supports;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                // USER@HOSTNAME:PATHNAME
                match = gitUrl.match(/^(.*?)@(.*?):(.*?)$/);

                if (match) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt('return', false);

              case 3:
                _match = (0, (_slicedToArray2 || _load_slicedToArray()).default)(match, 3);
                hostname = _match[2];
                cached = supportsArchiveCache[hostname];

                if (!(cached != null)) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt('return', cached);

              case 8:
                _context12.prev = 8;
                _context12.next = 11;
                return (_child || _load_child()).spawn('git', ['archive', '--remote=' + gitUrl, 'HEAD', Date.now() + '']);

              case 11:
                throw new Error();

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12['catch'](8);
                supports = _context12.t0.message.indexOf('did not match any files') >= 0;
                return _context12.abrupt('return', supportsArchiveCache[hostname] = supports);

              case 18:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[8, 14]]);
      }));

      function hasArchiveCapability(_x10) {
        return _ref12.apply(this, arguments);
      }

      return hasArchiveCapability;
    }()

    /**
     * Check if the input `target` is a 5-40 character hex commit hash.
     */

  }, {
    key: 'isCommitHash',
    value: function isCommitHash(target) {
      return !!target && /^[a-f0-9]{5,40}$/.test(target);
    }
  }, {
    key: 'repoExists',
    value: function () {
      var _ref13 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee13(gitUrl) {
        return (_regenerator || _load_regenerator()).default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return (_child || _load_child()).spawn('git', ['ls-remote', '-t', gitUrl]);

              case 3:
                return _context13.abrupt('return', true);

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13['catch'](0);
                return _context13.abrupt('return', false);

              case 9:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 6]]);
      }));

      function repoExists(_x11) {
        return _ref13.apply(this, arguments);
      }

      return repoExists;
    }()

    /**
     * attempt to upgrade unsecure protocols to securl protocol
     */

  }, {
    key: 'secureUrl',
    value: function () {
      var _ref14 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee14(ref, hash) {
        var parts, _secureUrl, _secureUrl2;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!Git.isCommitHash(hash)) {
                  _context14.next = 2;
                  break;
                }

                return _context14.abrupt('return', ref);

              case 2:
                parts = url.parse(ref);

                if (!(parts.protocol === 'git:')) {
                  _context14.next = 12;
                  break;
                }

                _secureUrl = ref.replace(/^git:/, 'https:');
                _context14.next = 7;
                return Git.repoExists(_secureUrl);

              case 7:
                if (!_context14.sent) {
                  _context14.next = 11;
                  break;
                }

                return _context14.abrupt('return', _secureUrl);

              case 11:
                throw new (_errors || _load_errors()).SecurityError('Refusing to download the git repo ' + ref + ' over plain git without a commit hash');

              case 12:
                if (!(parts.protocol === 'http:')) {
                  _context14.next = 21;
                  break;
                }

                _secureUrl2 = ref.replace(/^http:/, 'https:');
                _context14.next = 16;
                return Git.repoExists(_secureUrl2);

              case 16:
                if (!_context14.sent) {
                  _context14.next = 20;
                  break;
                }

                return _context14.abrupt('return', _secureUrl2);

              case 20:
                throw new (_errors || _load_errors()).SecurityError('Refusing to download the git repo ' + ref + ' over HTTP without a commit hash');

              case 21:
                return _context14.abrupt('return', ref);

              case 22:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function secureUrl(_x12, _x13) {
        return _ref14.apply(this, arguments);
      }

      return secureUrl;
    }()
  }, {
    key: 'parseRefs',
    value: function parseRefs(stdout) {
      // store references
      var refs = {};

      // line delimited
      var refLines = stdout.split('\n');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(refLines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          // line example: 64b2c0cee9e829f73c5ad32b8cc8cb6f3bec65bb refs/tags/v4.2.2
          var _line$split = line.split(/\s+/g);

          var _line$split2 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_line$split, 2);

          var sha = _line$split2[0];
          var id = _line$split2[1];

          var _name2 = id.split('/').slice(2).join('/');

          // TODO: find out why this is necessary. idk it makes it work...
          _name2 = (0, (_misc || _load_misc()).removeSuffix)(_name2, '^{}');

          refs[_name2] = sha;
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

      return refs;
    }
  }]);
  return Git;
}();

exports.default = Git;