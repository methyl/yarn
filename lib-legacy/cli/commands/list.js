'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.buildTree = exports.requireLockfile = undefined;

var _regenerator;

function _load_regenerator() {
  return _regenerator = _interopRequireDefault(require('babel-runtime/regenerator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var buildTree = exports.buildTree = function () {
  var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee(resolver, linker, patterns, opts, onlyFresh, ignoreHoisted) {
    var treesByKey, trees, hoisted, hoistedByKey, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, key, info, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, ref, hint, parent, children, depth, color, isFresh, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, pattern, topLevel, showAll, nextDepthIsValid, nextChildDepthIsValid, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _pattern, pkg, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, tree, _parent;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            treesByKey = {};
            trees = [];
            _context.next = 4;
            return linker.getFlatHoistedTree(patterns);

          case 4:
            hoisted = _context.sent;
            hoistedByKey = {};
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 9;

            for (_iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(hoisted); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);
              key = _step2$value[0];
              info = _step2$value[1];

              hoistedByKey[key] = info;
            }

            // build initial trees
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](9);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError2) {
              _context.next = 23;
              break;
            }

            throw _iteratorError2;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 28;
            _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(hoisted);

          case 30:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 102;
              break;
            }

            _step3$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step3.value, 2);
            info = _step3$value[1];
            ref = info.pkg._reference;
            hint = null;
            parent = getParent(info.key, treesByKey);
            children = [];
            depth = 0;
            color = 'bold';

            invariant(ref, 'expected reference');

            if (!onlyFresh) {
              _context.next = 71;
              break;
            }

            isFresh = false;
            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 45;
            _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(ref.patterns);

          case 47:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context.next = 55;
              break;
            }

            pattern = _step5.value;

            if (!resolver.isNewPattern(pattern)) {
              _context.next = 52;
              break;
            }

            isFresh = true;
            return _context.abrupt('break', 55);

          case 52:
            _iteratorNormalCompletion5 = true;
            _context.next = 47;
            break;

          case 55:
            _context.next = 61;
            break;

          case 57:
            _context.prev = 57;
            _context.t1 = _context['catch'](45);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t1;

          case 61:
            _context.prev = 61;
            _context.prev = 62;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 64:
            _context.prev = 64;

            if (!_didIteratorError5) {
              _context.next = 67;
              break;
            }

            throw _iteratorError5;

          case 67:
            return _context.finish(64);

          case 68:
            return _context.finish(61);

          case 69:
            if (isFresh) {
              _context.next = 71;
              break;
            }

            return _context.abrupt('continue', 99);

          case 71:

            if (info.originalKey !== info.key || opts.reqDepth === 0) {
              // was hoisted
              color = null;
            }
            // check parent to obtain next depth
            if (parent && parent.depth > 0) {
              depth = parent.depth + 1;
            } else {
              depth = 0;
            }

            topLevel = opts.reqDepth === 0 && !parent;
            showAll = opts.reqDepth === -1;
            nextDepthIsValid = depth + 1 <= Number(opts.reqDepth);


            if (topLevel || nextDepthIsValid || showAll) {
              treesByKey[info.key] = {
                name: info.pkg.name + '@' + info.pkg.version,
                children: children,
                hint: hint,
                color: color,
                depth: depth
              };
            }

            // add in dummy children for hoisted dependencies
            nextChildDepthIsValid = depth + 1 < Number(opts.reqDepth);

            invariant(ref, 'expected reference');

            if (!(!ignoreHoisted && nextDepthIsValid || showAll)) {
              _context.next = 99;
              break;
            }

            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context.prev = 83;

            for (_iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(resolver.dedupePatterns(ref.dependencies)); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              _pattern = _step6.value;
              pkg = resolver.getStrictResolvedPattern(_pattern);


              if (!hoistedByKey[info.key + '#' + pkg.name] && (nextChildDepthIsValid || showAll)) {
                children.push({
                  name: _pattern,
                  color: 'dim',
                  shadow: true
                });
              }
            }
            _context.next = 91;
            break;

          case 87:
            _context.prev = 87;
            _context.t2 = _context['catch'](83);
            _didIteratorError6 = true;
            _iteratorError6 = _context.t2;

          case 91:
            _context.prev = 91;
            _context.prev = 92;

            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }

          case 94:
            _context.prev = 94;

            if (!_didIteratorError6) {
              _context.next = 97;
              break;
            }

            throw _iteratorError6;

          case 97:
            return _context.finish(94);

          case 98:
            return _context.finish(91);

          case 99:
            _iteratorNormalCompletion3 = true;
            _context.next = 30;
            break;

          case 102:
            _context.next = 108;
            break;

          case 104:
            _context.prev = 104;
            _context.t3 = _context['catch'](28);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t3;

          case 108:
            _context.prev = 108;
            _context.prev = 109;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 111:
            _context.prev = 111;

            if (!_didIteratorError3) {
              _context.next = 114;
              break;
            }

            throw _iteratorError3;

          case 114:
            return _context.finish(111);

          case 115:
            return _context.finish(108);

          case 116:

            // add children
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 119;
            _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(hoisted);

          case 121:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 135;
              break;
            }

            _step4$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step4.value, 2);
            info = _step4$value[1];
            tree = treesByKey[info.key];
            _parent = getParent(info.key, treesByKey);

            if (tree) {
              _context.next = 128;
              break;
            }

            return _context.abrupt('continue', 132);

          case 128:
            if (!(info.key.split('#').length === 1)) {
              _context.next = 131;
              break;
            }

            trees.push(tree);
            return _context.abrupt('continue', 132);

          case 131:

            if (_parent) {
              _parent.children.push(tree);
            }

          case 132:
            _iteratorNormalCompletion4 = true;
            _context.next = 121;
            break;

          case 135:
            _context.next = 141;
            break;

          case 137:
            _context.prev = 137;
            _context.t4 = _context['catch'](119);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t4;

          case 141:
            _context.prev = 141;
            _context.prev = 142;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 144:
            _context.prev = 144;

            if (!_didIteratorError4) {
              _context.next = 147;
              break;
            }

            throw _iteratorError4;

          case 147:
            return _context.finish(144);

          case 148:
            return _context.finish(141);

          case 149:
            return _context.abrupt('return', { trees: trees, count: buildCount(trees) });

          case 150:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24], [28, 104, 108, 116], [45, 57, 61, 69], [62,, 64, 68], [83, 87, 91, 99], [92,, 94, 98], [109,, 111, 115], [119, 137, 141, 149], [142,, 144, 148]]);
  }));

  return function buildTree(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var run = exports.run = function () {
  var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)((_regenerator || _load_regenerator()).default.mark(function _callee2(config, reporter, flags, args) {
    var lockfile, install, _ref3, depRequests, patterns, opts, _ref4, trees;

    return (_regenerator || _load_regenerator()).default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (_wrapper || _load_wrapper()).default.fromDirectory(config.cwd, reporter);

          case 2:
            lockfile = _context2.sent;
            install = new (_install || _load_install()).Install(flags, config, reporter, lockfile);
            _context2.next = 6;
            return install.fetchRequestFromCwd();

          case 6:
            _ref3 = _context2.sent;
            depRequests = _ref3.requests;
            patterns = _ref3.patterns;
            _context2.next = 11;
            return install.resolver.init(depRequests, install.flags.flat);

          case 11:
            opts = {
              reqDepth: getReqDepth(flags.depth)
            };
            _context2.next = 14;
            return buildTree(install.resolver, install.linker, patterns, opts);

          case 14:
            _ref4 = _context2.sent;
            trees = _ref4.trees;


            if (args.length) {
              trees = trees.filter(function (tree) {
                return filterTree(tree, args);
              });
            }

            reporter.tree('list', trees);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getParent = getParent;
exports.setFlags = setFlags;
exports.getReqDepth = getReqDepth;
exports.filterTree = filterTree;

var _install;

function _load_install() {
  return _install = require('./install.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('../../lockfile/wrapper.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var requireLockfile = exports.requireLockfile = true;

function buildCount(trees) {
  if (!trees || !trees.length) {
    return 0;
  }

  var count = 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(trees), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tree = _step.value;

      if (tree.shadow) {
        continue;
      }

      count++;
      count += buildCount(tree.children);
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

  return count;
}

function getParent(key, treesByKey) {
  var parentKey = key.split('#').slice(0, -1).join('#');
  return treesByKey[parentKey];
}

function setFlags(commander) {
  commander.option('--depth [depth]', 'Limit the depth of the shown dependencies');
}

function getReqDepth(inputDepth) {
  return inputDepth && /^\d+$/.test(inputDepth) ? Number(inputDepth) : -1;
}

function filterTree(tree, filters) {
  if (tree.children) {
    tree.children = tree.children.filter(function (child) {
      return filterTree(child, filters);
    });
  }

  var notDim = tree.color !== 'dim';
  var found = filters.indexOf(tree.name.slice(0, tree.name.lastIndexOf('@'))) > -1;
  var hasChildren = tree.children == null ? false : tree.children.length > 0;

  return notDim && (found || hasChildren);
}