'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFilePreservingEol = exports.getFileSizeOnDisk = exports.walk = exports.symlink = exports.find = exports.readJsonAndFile = exports.readJson = exports.readFileAny = exports.copyBulk = exports.chmod = exports.lstat = exports.exists = exports.mkdirp = exports.unlink = exports.stat = exports.access = exports.rename = exports.readdir = exports.realpath = exports.readlink = exports.writeFile = exports.readFileBuffer = exports.lockQueue = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var buildActionsForCopy = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee3(queue, events, possibleExtraneousSeed, reporter) {

    //
    var build = function () {
      var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(data) {
        var _this = this;

        var src, dest, onFresh, onDone, srcStat, srcFiles, destStat, bothSymlinks, bothFolders, bothFiles, srcReallink, destFiles, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, file, _loc, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _file, _linkname;

        return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                src = data.src;
                dest = data.dest;
                onFresh = data.onFresh || noop;
                onDone = data.onDone || noop;

                files.add(dest);

                if (!(events.ignoreBasenames.indexOf(path.basename(src)) >= 0)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return');

              case 7:
                _context2.next = 9;
                return lstat(src);

              case 9:
                srcStat = _context2.sent;
                srcFiles = void 0;

                if (!srcStat.isDirectory()) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 14;
                return readdir(src);

              case 14:
                srcFiles = _context2.sent;

              case 15:
                _context2.next = 17;
                return exists(dest);

              case 17:
                if (!_context2.sent) {
                  _context2.next = 111;
                  break;
                }

                _context2.next = 20;
                return lstat(dest);

              case 20:
                destStat = _context2.sent;
                bothSymlinks = srcStat.isSymbolicLink() && destStat.isSymbolicLink();
                bothFolders = srcStat.isDirectory() && destStat.isDirectory();
                bothFiles = srcStat.isFile() && destStat.isFile();

                if (!(srcStat.mode !== destStat.mode)) {
                  _context2.next = 32;
                  break;
                }

                _context2.prev = 25;
                _context2.next = 28;
                return access(dest, srcStat.mode);

              case 28:
                _context2.next = 32;
                break;

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2['catch'](25);

              case 32:
                if (!(bothFiles && srcStat.size === destStat.size && +srcStat.mtime === +destStat.mtime)) {
                  _context2.next = 36;
                  break;
                }

                // we can safely assume this is the same file
                onDone();
                reporter.verbose(reporter.lang('verboseFileSkip', src, dest, srcStat.size, +srcStat.mtime));
                return _context2.abrupt('return');

              case 36:
                if (!bothSymlinks) {
                  _context2.next = 48;
                  break;
                }

                _context2.next = 39;
                return readlink(src);

              case 39:
                srcReallink = _context2.sent;
                _context2.t1 = srcReallink;
                _context2.next = 43;
                return readlink(dest);

              case 43:
                _context2.t2 = _context2.sent;

                if (!(_context2.t1 === _context2.t2)) {
                  _context2.next = 48;
                  break;
                }

                // if both symlinks are the same then we can continue on
                onDone();
                reporter.verbose(reporter.lang('verboseFileSkipSymlink', src, dest, srcReallink));
                return _context2.abrupt('return');

              case 48:
                if (!(bothFolders && !noExtraneous)) {
                  _context2.next = 111;
                  break;
                }

                _context2.next = 51;
                return readdir(dest);

              case 51:
                destFiles = _context2.sent;

                invariant(srcFiles, 'src files not initialised');

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context2.prev = 56;
                _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(destFiles);

              case 58:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context2.next = 97;
                  break;
                }

                file = _step4.value;

                if (!(srcFiles.indexOf(file) < 0)) {
                  _context2.next = 94;
                  break;
                }

                _loc = path.join(dest, file);

                possibleExtraneous.add(_loc);

                _context2.next = 65;
                return lstat(_loc);

              case 65:
                if (!_context2.sent.isDirectory()) {
                  _context2.next = 94;
                  break;
                }

                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context2.prev = 69;
                _context2.next = 72;
                return readdir(_loc);

              case 72:
                _context2.t3 = _context2.sent;
                _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(_context2.t3);

              case 74:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context2.next = 80;
                  break;
                }

                _file = _step5.value;

                possibleExtraneous.add(path.join(_loc, _file));

              case 77:
                _iteratorNormalCompletion5 = true;
                _context2.next = 74;
                break;

              case 80:
                _context2.next = 86;
                break;

              case 82:
                _context2.prev = 82;
                _context2.t4 = _context2['catch'](69);
                _didIteratorError5 = true;
                _iteratorError5 = _context2.t4;

              case 86:
                _context2.prev = 86;
                _context2.prev = 87;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 89:
                _context2.prev = 89;

                if (!_didIteratorError5) {
                  _context2.next = 92;
                  break;
                }

                throw _iteratorError5;

              case 92:
                return _context2.finish(89);

              case 93:
                return _context2.finish(86);

              case 94:
                _iteratorNormalCompletion4 = true;
                _context2.next = 58;
                break;

              case 97:
                _context2.next = 103;
                break;

              case 99:
                _context2.prev = 99;
                _context2.t5 = _context2['catch'](56);
                _didIteratorError4 = true;
                _iteratorError4 = _context2.t5;

              case 103:
                _context2.prev = 103;
                _context2.prev = 104;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 106:
                _context2.prev = 106;

                if (!_didIteratorError4) {
                  _context2.next = 109;
                  break;
                }

                throw _iteratorError4;

              case 109:
                return _context2.finish(106);

              case 110:
                return _context2.finish(103);

              case 111:
                if (!srcStat.isSymbolicLink()) {
                  _context2.next = 120;
                  break;
                }

                onFresh();
                _context2.next = 115;
                return readlink(src);

              case 115:
                _linkname = _context2.sent;

                actions.push({
                  type: 'symlink',
                  dest: dest,
                  linkname: _linkname
                });
                onDone();
                _context2.next = 131;
                break;

              case 120:
                if (!srcStat.isDirectory()) {
                  _context2.next = 124;
                  break;
                }

                return _context2.delegateYield((_regenerator || _load_regenerator()).default.mark(function _callee() {
                  var destParts, remaining, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _file2;

                  return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          reporter.verbose(reporter.lang('verboseFileFolder', dest));
                          _context.next = 3;
                          return mkdirp(dest);

                        case 3:
                          destParts = dest.split(path.sep);

                          while (destParts.length) {
                            files.add(destParts.join(path.sep));
                            destParts.pop();
                          }

                          // push all files to queue
                          invariant(srcFiles, 'src files not initialised');
                          remaining = srcFiles.length;

                          if (!remaining) {
                            onDone();
                          }
                          _iteratorNormalCompletion6 = true;
                          _didIteratorError6 = false;
                          _iteratorError6 = undefined;
                          _context.prev = 11;
                          for (_iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(srcFiles); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            _file2 = _step6.value;

                            queue.push({
                              onFresh: onFresh,
                              src: path.join(src, _file2),
                              dest: path.join(dest, _file2),
                              onDone: function (_onDone) {
                                function onDone() {
                                  return _onDone.apply(this, arguments);
                                }

                                onDone.toString = function () {
                                  return _onDone.toString();
                                };

                                return onDone;
                              }(function () {
                                if (--remaining === 0) {
                                  onDone();
                                }
                              })
                            });
                          }
                          _context.next = 19;
                          break;

                        case 15:
                          _context.prev = 15;
                          _context.t0 = _context['catch'](11);
                          _didIteratorError6 = true;
                          _iteratorError6 = _context.t0;

                        case 19:
                          _context.prev = 19;
                          _context.prev = 20;

                          if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                          }

                        case 22:
                          _context.prev = 22;

                          if (!_didIteratorError6) {
                            _context.next = 25;
                            break;
                          }

                          throw _iteratorError6;

                        case 25:
                          return _context.finish(22);

                        case 26:
                          return _context.finish(19);

                        case 27:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this, [[11, 15, 19, 27], [20,, 22, 26]]);
                })(), 't6', 122);

              case 122:
                _context2.next = 131;
                break;

              case 124:
                if (!srcStat.isFile()) {
                  _context2.next = 130;
                  break;
                }

                onFresh();
                actions.push({
                  type: 'file',
                  src: src,
                  dest: dest,
                  atime: srcStat.atime,
                  mtime: srcStat.mtime,
                  mode: srcStat.mode
                });
                onDone();
                _context2.next = 131;
                break;

              case 130:
                throw new Error('unsure how to copy this: ' + src);

              case 131:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[25, 30], [56, 99, 103, 111], [69, 82, 86, 94], [87,, 89, 93], [104,, 106, 110]]);
      }));

      return function build(_x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    var possibleExtraneous, phantomFiles, noExtraneous, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, actions, items, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, loc;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            possibleExtraneous = new (_set || _load_set()).default(possibleExtraneousSeed || []);
            phantomFiles = new (_set || _load_set()).default(events.phantomFiles || []);
            noExtraneous = possibleExtraneousSeed === false;
            files = new (_set || _load_set()).default();

            // initialise events

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 7;

            _loop = function _loop() {
              var item = _step.value;

              var onDone = item.onDone;
              item.onDone = function () {
                events.onProgress(item.dest);
                if (onDone) {
                  onDone();
                }
              };
            };

            for (_iterator = (0, (_getIterator2 || _load_getIterator()).default)(queue); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 16:
            _context3.prev = 16;
            _context3.prev = 17;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 19:
            _context3.prev = 19;

            if (!_didIteratorError) {
              _context3.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context3.finish(19);

          case 23:
            return _context3.finish(16);

          case 24:
            events.onStart(queue.length);

            // start building actions
            actions = [];

            // custom concurrency logic as we're always executing stacks of 4 queue items
            // at a time due to the requirement to push items onto the queue

          case 26:
            if (!queue.length) {
              _context3.next = 32;
              break;
            }

            items = queue.splice(0, 4);
            _context3.next = 30;
            return (_promise || _load_promise()).default.all(items.map(build));

          case 30:
            _context3.next = 26;
            break;

          case 32:

            // simulate the existence of some files to prevent considering them extraenous
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 35;
            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(phantomFiles); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              file = _step2.value;

              if (possibleExtraneous.has(file)) {
                reporter.verbose(reporter.lang('verboseFilePhantomExtraneous', file));
                possibleExtraneous.delete(file);
              }
            }

            // remove all extraneous files that weren't in the tree
            _context3.next = 43;
            break;

          case 39:
            _context3.prev = 39;
            _context3.t1 = _context3['catch'](35);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t1;

          case 43:
            _context3.prev = 43;
            _context3.prev = 44;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 46:
            _context3.prev = 46;

            if (!_didIteratorError2) {
              _context3.next = 49;
              break;
            }

            throw _iteratorError2;

          case 49:
            return _context3.finish(46);

          case 50:
            return _context3.finish(43);

          case 51:
            if (noExtraneous) {
              _context3.next = 80;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 55;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(possibleExtraneous);

          case 57:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context3.next = 66;
              break;
            }

            loc = _step3.value;

            if (files.has(loc)) {
              _context3.next = 63;
              break;
            }

            reporter.verbose(reporter.lang('verboseFileRemoveExtraneous', loc));
            _context3.next = 63;
            return unlink(loc);

          case 63:
            _iteratorNormalCompletion3 = true;
            _context3.next = 57;
            break;

          case 66:
            _context3.next = 72;
            break;

          case 68:
            _context3.prev = 68;
            _context3.t2 = _context3['catch'](55);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t2;

          case 72:
            _context3.prev = 72;
            _context3.prev = 73;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 75:
            _context3.prev = 75;

            if (!_didIteratorError3) {
              _context3.next = 78;
              break;
            }

            throw _iteratorError3;

          case 78:
            return _context3.finish(75);

          case 79:
            return _context3.finish(72);

          case 80:
            return _context3.abrupt('return', actions);

          case 81:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[7, 12, 16, 24], [17,, 19, 23], [35, 39, 43, 51], [44,, 46, 50], [55, 68, 72, 80], [73,, 75, 79]]);
  }));

  return function buildActionsForCopy(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var copyBulk = exports.copyBulk = function () {
  var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee5(queue, reporter, _events) {
    var _this2 = this;

    var events, actions, fileActions, currentlyWriting, symlinkActions;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            events = {
              onStart: _events && _events.onStart || noop,
              onProgress: _events && _events.onProgress || noop,
              possibleExtraneous: _events ? _events.possibleExtraneous : [],
              ignoreBasenames: _events && _events.ignoreBasenames || [],
              phantomFiles: _events && _events.phantomFiles || []
            };
            _context5.next = 3;
            return buildActionsForCopy(queue, events, events.possibleExtraneous, reporter);

          case 3:
            actions = _context5.sent;

            events.onStart(actions.length);

            fileActions = actions.filter(function (action) {
              return action.type === 'file';
            });
            currentlyWriting = {};
            _context5.next = 9;
            return (_promise2 || _load_promise2()).queue(fileActions, function () {
              var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee4(data) {
                var writePromise, cleanup;
                return (_regenerator || _load_regenerator()).default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        writePromise = void 0;

                      case 1:
                        if (!(writePromise = currentlyWriting[data.dest])) {
                          _context4.next = 6;
                          break;
                        }

                        _context4.next = 4;
                        return writePromise;

                      case 4:
                        _context4.next = 1;
                        break;

                      case 6:
                        cleanup = function cleanup() {
                          return delete currentlyWriting[data.dest];
                        };

                        return _context4.abrupt('return', currentlyWriting[data.dest] = new (_promise || _load_promise()).default(function (resolve, reject) {
                          var readStream = fs.createReadStream(data.src);
                          var writeStream = fs.createWriteStream(data.dest, { mode: data.mode });

                          reporter.verbose(reporter.lang('verboseFileCopy', data.src, data.dest));

                          readStream.on('error', reject);
                          writeStream.on('error', reject);

                          writeStream.on('open', function () {
                            readStream.pipe(writeStream);
                          });

                          writeStream.once('finish', function () {
                            fs.utimes(data.dest, data.atime, data.mtime, function (err) {
                              if (err) {
                                reject(err);
                              } else {
                                events.onProgress(data.dest);
                                cleanup();
                                resolve();
                              }
                            });
                          });
                        }).then(function (arg) {
                          cleanup();
                          return arg;
                        }).catch(function (arg) {
                          cleanup();
                          throw arg;
                        }));

                      case 8:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this2);
              }));

              return function (_x9) {
                return _ref4.apply(this, arguments);
              };
            }(), 4);

          case 9:

            // we need to copy symlinks last as the could reference files we were copying
            symlinkActions = actions.filter(function (action) {
              return action.type === 'symlink';
            });
            _context5.next = 12;
            return (_promise2 || _load_promise2()).queue(symlinkActions, function (data) {
              var linkname = path.resolve(path.dirname(data.dest), data.linkname);
              reporter.verbose(reporter.lang('verboseFileSymlink', data.dest, linkname));
              return symlink(linkname, data.dest);
            });

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function copyBulk(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var readFileAny = exports.readFileAny = function () {
  var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee6(files) {
    var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, file;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context6.prev = 3;
            _iterator7 = (0, (_getIterator2 || _load_getIterator()).default)(files);

          case 5:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context6.next = 14;
              break;
            }

            file = _step7.value;
            _context6.next = 9;
            return exists(file);

          case 9:
            if (!_context6.sent) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt('return', readFile(file));

          case 11:
            _iteratorNormalCompletion7 = true;
            _context6.next = 5;
            break;

          case 14:
            _context6.next = 20;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6['catch'](3);
            _didIteratorError7 = true;
            _iteratorError7 = _context6.t0;

          case 20:
            _context6.prev = 20;
            _context6.prev = 21;

            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }

          case 23:
            _context6.prev = 23;

            if (!_didIteratorError7) {
              _context6.next = 26;
              break;
            }

            throw _iteratorError7;

          case 26:
            return _context6.finish(23);

          case 27:
            return _context6.finish(20);

          case 28:
            return _context6.abrupt('return', null);

          case 29:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[3, 16, 20, 28], [21,, 23, 27]]);
  }));

  return function readFileAny(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var readJson = exports.readJson = function () {
  var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee7(loc) {
    return (_regenerator || _load_regenerator()).default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return readJsonAndFile(loc);

          case 2:
            return _context7.abrupt('return', _context7.sent.object);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function readJson(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

var readJsonAndFile = exports.readJsonAndFile = function () {
  var _ref7 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee8(loc) {
    var file;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return readFile(loc);

          case 2:
            file = _context8.sent;
            _context8.prev = 3;
            return _context8.abrupt('return', {
              object: (0, (_map || _load_map()).default)(JSON.parse(stripBOM(file))),
              content: file
            });

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8['catch'](3);

            _context8.t0.message = loc + ': ' + _context8.t0.message;
            throw _context8.t0;

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this, [[3, 7]]);
  }));

  return function readJsonAndFile(_x12) {
    return _ref7.apply(this, arguments);
  };
}();

var find = exports.find = function () {
  var _ref8 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee9(filename, dir) {
    var parts, loc;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            parts = dir.split(path.sep);

          case 1:
            if (!parts.length) {
              _context9.next = 12;
              break;
            }

            loc = parts.concat(filename).join(path.sep);
            _context9.next = 5;
            return exists(loc);

          case 5:
            if (!_context9.sent) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt('return', loc);

          case 9:
            parts.pop();

          case 10:
            _context9.next = 1;
            break;

          case 12:
            return _context9.abrupt('return', false);

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function find(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var symlink = exports.symlink = function () {
  var _ref9 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee10(src, dest) {
    var stats, resolved, _relative;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return lstat(dest);

          case 3:
            stats = _context10.sent;
            _context10.t0 = stats.isSymbolicLink();

            if (!_context10.t0) {
              _context10.next = 9;
              break;
            }

            _context10.next = 8;
            return exists(dest);

          case 8:
            _context10.t0 = _context10.sent;

          case 9:
            if (!_context10.t0) {
              _context10.next = 15;
              break;
            }

            _context10.next = 12;
            return realpath(dest);

          case 12:
            resolved = _context10.sent;

            if (!(resolved === src)) {
              _context10.next = 15;
              break;
            }

            return _context10.abrupt('return');

          case 15:
            _context10.next = 17;
            return unlink(dest);

          case 17:
            _context10.next = 23;
            break;

          case 19:
            _context10.prev = 19;
            _context10.t1 = _context10['catch'](0);

            if (!(_context10.t1.code !== 'ENOENT')) {
              _context10.next = 23;
              break;
            }

            throw _context10.t1;

          case 23:
            _context10.prev = 23;

            if (!(process.platform === 'win32')) {
              _context10.next = 29;
              break;
            }

            _context10.next = 27;
            return fsSymlink(src, dest, 'junction');

          case 27:
            _context10.next = 32;
            break;

          case 29:
            // use relative paths otherwise which will be retained if the directory is moved
            _relative = path.relative(path.dirname(dest), src);
            _context10.next = 32;
            return fsSymlink(_relative, dest);

          case 32:
            _context10.next = 42;
            break;

          case 34:
            _context10.prev = 34;
            _context10.t2 = _context10['catch'](23);

            if (!(_context10.t2.code === 'EEXIST')) {
              _context10.next = 41;
              break;
            }

            _context10.next = 39;
            return symlink(src, dest);

          case 39:
            _context10.next = 42;
            break;

          case 41:
            throw _context10.t2;

          case 42:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[0, 19], [23, 34]]);
  }));

  return function symlink(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

var walk = exports.walk = function () {
  var _ref10 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee11(dir, relativeDir) {
    var ignoreBasenames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new (_set || _load_set()).default();

    var files, filenames, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, name, _relative2, loc, _stat;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            files = [];
            _context11.next = 3;
            return readdir(dir);

          case 3:
            filenames = _context11.sent;

            if (ignoreBasenames.size) {
              filenames = filenames.filter(function (name) {
                return !ignoreBasenames.has(name);
              });
            }

            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context11.prev = 8;
            _iterator8 = (0, (_getIterator2 || _load_getIterator()).default)(filenames);

          case 10:
            if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
              _context11.next = 27;
              break;
            }

            name = _step8.value;
            _relative2 = relativeDir ? path.join(relativeDir, name) : name;
            loc = path.join(dir, name);
            _context11.next = 16;
            return lstat(loc);

          case 16:
            _stat = _context11.sent;


            files.push({
              relative: _relative2,
              basename: name,
              absolute: loc,
              mtime: +_stat.mtime
            });

            if (!_stat.isDirectory()) {
              _context11.next = 24;
              break;
            }

            _context11.t0 = files;
            _context11.next = 22;
            return walk(loc, _relative2, ignoreBasenames);

          case 22:
            _context11.t1 = _context11.sent;
            files = _context11.t0.concat.call(_context11.t0, _context11.t1);

          case 24:
            _iteratorNormalCompletion8 = true;
            _context11.next = 10;
            break;

          case 27:
            _context11.next = 33;
            break;

          case 29:
            _context11.prev = 29;
            _context11.t2 = _context11['catch'](8);
            _didIteratorError8 = true;
            _iteratorError8 = _context11.t2;

          case 33:
            _context11.prev = 33;
            _context11.prev = 34;

            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }

          case 36:
            _context11.prev = 36;

            if (!_didIteratorError8) {
              _context11.next = 39;
              break;
            }

            throw _iteratorError8;

          case 39:
            return _context11.finish(36);

          case 40:
            return _context11.finish(33);

          case 41:
            return _context11.abrupt('return', files);

          case 42:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this, [[8, 29, 33, 41], [34,, 36, 40]]);
  }));

  return function walk(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

var getFileSizeOnDisk = exports.getFileSizeOnDisk = function () {
  var _ref11 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee12(loc) {
    var stat, size, blockSize;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return lstat(loc);

          case 2:
            stat = _context12.sent;
            size = stat.size;
            blockSize = stat.blksize;
            return _context12.abrupt('return', Math.ceil(size / blockSize) * blockSize);

          case 6:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function getFileSizeOnDisk(_x20) {
    return _ref11.apply(this, arguments);
  };
}();

var getEolFromFile = function () {
  var _ref12 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee13(path) {
    var buffer, i;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return exists(path);

          case 2:
            if (_context13.sent) {
              _context13.next = 4;
              break;
            }

            return _context13.abrupt('return', undefined);

          case 4:
            _context13.next = 6;
            return readFileBuffer(path);

          case 6:
            buffer = _context13.sent;
            i = 0;

          case 8:
            if (!(i < buffer.length)) {
              _context13.next = 16;
              break;
            }

            if (!(buffer[i] === cr)) {
              _context13.next = 11;
              break;
            }

            return _context13.abrupt('return', '\r\n');

          case 11:
            if (!(buffer[i] === lf)) {
              _context13.next = 13;
              break;
            }

            return _context13.abrupt('return', '\n');

          case 13:
            ++i;
            _context13.next = 8;
            break;

          case 16:
            return _context13.abrupt('return', undefined);

          case 17:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getEolFromFile(_x21) {
    return _ref12.apply(this, arguments);
  };
}();

var writeFilePreservingEol = exports.writeFilePreservingEol = function () {
  var _ref13 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee14(path, data) {
    var eol;
    return (_regenerator || _load_regenerator()).default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getEolFromFile(path);

          case 2:
            _context14.t0 = _context14.sent;

            if (_context14.t0) {
              _context14.next = 5;
              break;
            }

            _context14.t0 = os.EOL;

          case 5:
            eol = _context14.t0;

            if (eol !== '\n') {
              data = data.replace(/\n/g, eol);
            }
            _context14.next = 9;
            return (0, (_promise3 || _load_promise3()).promisify)(fs.writeFile)(path, data);

          case 9:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function writeFilePreservingEol(_x22, _x23) {
    return _ref13.apply(this, arguments);
  };
}();

exports.copy = copy;
exports.readFile = readFile;
exports.readFileRaw = readFileRaw;
exports.normalizeOS = normalizeOS;

var _blockingQueue;

function _load_blockingQueue() {
  return _blockingQueue = _interopRequireDefault(require('./blocking-queue.js'));
}

var _promise2;

function _load_promise2() {
  return _promise2 = _interopRequireWildcard(require('./promise.js'));
}

var _promise3;

function _load_promise3() {
  return _promise3 = require('./promise.js');
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./map.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var fs = require('fs');
var os = require('os');

var lockQueue = exports.lockQueue = new (_blockingQueue || _load_blockingQueue()).default('fs lock');

var readFileBuffer = exports.readFileBuffer = (0, (_promise3 || _load_promise3()).promisify)(fs.readFile);
var writeFile = exports.writeFile = (0, (_promise3 || _load_promise3()).promisify)(fs.writeFile);
var readlink = exports.readlink = (0, (_promise3 || _load_promise3()).promisify)(fs.readlink);
var realpath = exports.realpath = (0, (_promise3 || _load_promise3()).promisify)(fs.realpath);
var readdir = exports.readdir = (0, (_promise3 || _load_promise3()).promisify)(fs.readdir);
var rename = exports.rename = (0, (_promise3 || _load_promise3()).promisify)(fs.rename);
var access = exports.access = (0, (_promise3 || _load_promise3()).promisify)(fs.access);
var stat = exports.stat = (0, (_promise3 || _load_promise3()).promisify)(fs.stat);
var unlink = exports.unlink = (0, (_promise3 || _load_promise3()).promisify)(require('rimraf'));
var mkdirp = exports.mkdirp = (0, (_promise3 || _load_promise3()).promisify)(require('mkdirp'));
var exists = exports.exists = (0, (_promise3 || _load_promise3()).promisify)(fs.exists, true);
var lstat = exports.lstat = (0, (_promise3 || _load_promise3()).promisify)(fs.lstat);
var chmod = exports.chmod = (0, (_promise3 || _load_promise3()).promisify)(fs.chmod);

var fsSymlink = (0, (_promise3 || _load_promise3()).promisify)(fs.symlink);
var invariant = require('invariant');
var stripBOM = require('strip-bom');

var noop = function noop() {};

function copy(src, dest, reporter) {
  return copyBulk([{ src: src, dest: dest }], reporter);
}

function _readFile(loc, encoding) {
  return new (_promise || _load_promise()).default(function (resolve, reject) {
    fs.readFile(loc, encoding, function (err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

function readFile(loc) {
  return _readFile(loc, 'utf8').then(normalizeOS);
}

function readFileRaw(loc) {
  return _readFile(loc, 'binary');
}

function normalizeOS(body) {
  return body.replace(/\r\n/g, '\n');
}

var cr = new Buffer('\r', 'utf8')[0];
var lf = new Buffer('\n', 'utf8')[0];