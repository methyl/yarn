'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoistManifest = undefined;

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('babel-runtime/core-js/map'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _misc;

function _load_misc() {
  return _misc = require('./util/misc.js');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');
var path = require('path');

var historyCounter = 0;

var HoistManifest = exports.HoistManifest = function () {
  function HoistManifest(key, parts, pkg, loc, isIgnored) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, HoistManifest);

    this.ignore = isIgnored;
    this.loc = loc;
    this.pkg = pkg;

    this.key = key;
    this.parts = parts;
    this.originalKey = key;
    this.previousKeys = [];

    this.history = [];
    this.addHistory('Start position = ' + key);
  }

  (0, (_createClass2 || _load_createClass()).default)(HoistManifest, [{
    key: 'addHistory',
    value: function addHistory(msg) {
      this.history.push(++historyCounter + ': ' + msg);
    }
  }]);
  return HoistManifest;
}();

var PackageHoister = function () {
  function PackageHoister(config, resolver) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageHoister);

    this.resolver = resolver;
    this.config = config;

    this.taintedKeys = new (_map || _load_map()).default();
    this.levelQueue = [];
    this.tree = new (_map || _load_map()).default();
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageHoister, [{
    key: 'taintKey',


    /**
     * Taint this key and prevent any modules from being hoisted to it.
     */

    value: function taintKey(key, info) {
      var existingTaint = this.taintedKeys.get(key);
      if (existingTaint && existingTaint.loc !== info.loc) {
        return false;
      } else {
        this.taintedKeys.set(key, info);
        return true;
      }
    }

    /**
     * Implode an array of ancestry parts into a key.
     */

  }, {
    key: 'implodeKey',
    value: function implodeKey(parts) {
      return parts.join('#');
    }

    /**
     * Seed the hoister with patterns taken from the included resolver.
     */

  }, {
    key: 'seed',
    value: function seed(patterns) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(this.resolver.dedupePatterns(patterns)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pattern = _step.value;

          this._seed(pattern);
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

      while (true) {
        var queue = this.levelQueue;
        if (!queue.length) {
          return;
        }

        this.levelQueue = [];

        // sort queue to get determinism between runs
        queue = queue.sort(function (_ref, _ref2) {
          var _ref4 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_ref, 1);

          var aPattern = _ref4[0];

          var _ref3 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_ref2, 1);

          var bPattern = _ref3[0];

          return (0, (_misc || _load_misc()).sortAlpha)(aPattern, bPattern);
        });

        //
        var infos = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(queue), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);

            var pattern = _step2$value[0];
            var parents = _step2$value[1];

            var info = this._seed(pattern, parents);
            if (info) {
              infos.push(info);
            }
          }

          //
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)(infos), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _info = _step3.value;

            this.hoist(_info);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }

    /**
     * Seed the hoister with a specific pattern.
     */

  }, {
    key: '_seed',
    value: function _seed(pattern, parent) {
      //
      var pkg = this.resolver.getStrictResolvedPattern(pattern);
      var ref = pkg._reference;
      invariant(ref, 'expected reference');

      //
      var parentParts = [];
      var isIgnored = ref.ignore;

      if (parent) {
        if (!this.tree.get(parent.key)) {
          return null;
        }
        isIgnored = isIgnored || parent.ignore;
        parentParts = parent.parts;
      }

      //
      var loc = this.config.generateHardModulePath(ref);
      var parts = parentParts.concat(pkg.name);
      var key = this.implodeKey(parts);
      var info = new HoistManifest(key, parts, pkg, loc, isIgnored);

      //
      this.tree.set(key, info);
      this.taintKey(key, info);

      //
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, (_getIterator2 || _load_getIterator()).default)(ref.dependencies), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var depPattern = _step4.value;

          this.levelQueue.push([depPattern, info]);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return info;
    }

    /**
     * Find the highest position we can hoist this module to.
     */

  }, {
    key: 'getNewParts',
    value: function getNewParts(key, info, parts) {
      var _this = this;

      var stepUp = false;

      var fullKey = this.implodeKey(parts);
      var stack = []; // stack of removed parts
      var name = parts.pop();

      //
      for (var i = parts.length - 1; i >= 0; i--) {
        var checkParts = parts.slice(0, i).concat(name);
        var checkKey = this.implodeKey(checkParts);
        info.addHistory('Looked at ' + checkKey + ' for a match');

        var existing = this.tree.get(checkKey);
        if (existing) {
          if (existing.loc === info.loc) {
            // deduping an unignored reference to an ignored one
            if (existing.ignore && !info.ignore) {
              existing.ignore = false;
            }

            existing.addHistory('Deduped ' + fullKey + ' to this item');
            return { parts: checkParts, duplicate: true };
          } else {
            // everything above will be shadowed and this is a conflict
            info.addHistory('Found a collision at ' + checkKey);
            break;
          }
        }

        var existingTaint = this.taintedKeys.get(checkKey);
        if (existingTaint && existingTaint.loc !== info.loc) {
          info.addHistory('Broken by ' + checkKey);
          break;
        }
      }

      // remove redundant parts that wont collide
      while (parts.length) {
        var _checkParts = parts.concat(name);
        var _checkKey = this.implodeKey(_checkParts);

        //
        var _existing = this.tree.get(_checkKey);
        if (_existing) {
          stepUp = true;
          break;
        }

        // check if we're trying to hoist ourselves to a previously unflattened module key,
        // this will result in a conflict and we'll need to move ourselves up
        if (key !== _checkKey && this.taintedKeys.has(_checkKey)) {
          stepUp = true;
          break;
        }

        //
        stack.push(parts.pop());
      }

      //
      parts.push(name);

      //
      var isValidPosition = function isValidPosition(parts) {
        var key = _this.implodeKey(parts);
        var existing = _this.tree.get(key);
        if (existing && existing.loc === info.loc) {
          return true;
        }

        // ensure there's no taint or the taint is us
        var existingTaint = _this.taintedKeys.get(key);
        if (existingTaint && existingTaint.loc !== info.loc) {
          return false;
        }

        return true;
      };

      // we need to special case when we attempt to hoist to the top level as the `existing` logic
      // wont be hit in the above `while` loop and we could conflict
      if (!isValidPosition(parts)) {
        stepUp = true;
      }

      // sometimes we need to step up to a parent module to install ourselves
      while (stepUp && stack.length) {
        info.addHistory('Stepping up from ' + this.implodeKey(parts));

        parts.pop(); // remove `name`
        parts.push(stack.pop(), name);

        if (isValidPosition(parts)) {
          info.addHistory('Found valid position ' + this.implodeKey(parts));
          stepUp = false;
        }
      }

      return { parts: parts, duplicate: false };
    }

    /**
     * Hoist all seeded patterns to their highest positions.
     */

  }, {
    key: 'hoist',
    value: function hoist(info) {
      var key = info.key;
      var rawParts = info.parts;

      // remove this item from the `tree` map so we can ignore it

      this.tree.delete(key);

      //

      var _getNewParts = this.getNewParts(key, info, rawParts.slice());

      var parts = _getNewParts.parts;
      var duplicate = _getNewParts.duplicate;

      var newKey = this.implodeKey(parts);
      var oldKey = key;
      if (duplicate) {
        info.addHistory('Satisfied from above by ' + newKey);
        this.declareRename(info, rawParts, parts);
        return;
      }

      // update to the new key
      if (oldKey === newKey) {
        info.addHistory("Didn't hoist - conflicts above");
        this.setKey(info, oldKey, parts);
        return;
      }

      //
      this.declareRename(info, rawParts, parts);
      this.setKey(info, newKey, parts);
    }

    /**
     * Declare that a module has been hoisted and update our internal references.
     */

  }, {
    key: 'declareRename',
    value: function declareRename(info, oldParts, newParts) {
      // go down the tree from our new position reserving our name
      this.taintParents(info, oldParts.slice(0, -1), newParts.length - 1);
    }

    /**
     * Crawl upwards through a list of ancestry parts and taint a package name.
     */

  }, {
    key: 'taintParents',
    value: function taintParents(info, processParts, start) {
      for (var i = start; i < processParts.length; i++) {
        var parts = processParts.slice(0, i).concat(info.pkg.name);
        var key = this.implodeKey(parts);

        if (this.taintKey(key, info)) {
          info.addHistory('Tainted ' + key + ' to prevent collisions');
        }
      }
    }

    /**
     * Update the key of a module and update our references.
     */

  }, {
    key: 'setKey',
    value: function setKey(info, newKey, parts) {
      var oldKey = info.key;

      info.key = newKey;
      info.parts = parts;
      this.tree.set(newKey, info);

      if (oldKey === newKey) {
        return;
      }

      info.previousKeys.push(newKey);
      info.addHistory('New position = ' + newKey);
    }

    /**
     * Produce a flattened list of module locations and manifests.
     */

  }, {
    key: 'init',
    value: function init() {
      var flatTree = [];

      //
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, (_getIterator2 || _load_getIterator()).default)(this.tree.entries()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step5.value, 2);

          var key = _step5$value[0];
          var info = _step5$value[1];

          // decompress the location and push it to the flat tree. this path could be made
          var parts = [];
          var keyParts = key.split('#');
          for (var i = 0; i < keyParts.length; i++) {
            var _key = keyParts.slice(0, i + 1).join('#');
            var hoisted = this.tree.get(_key);
            invariant(hoisted, 'expected hoisted manifest');
            parts.push(this.config.getFolder(hoisted.pkg));
            parts.push(keyParts[i]);
          }

          if (this.config.modulesFolder) {
            // remove the first part which will be the folder name and replace it with a
            // hardcoded modules folder
            parts.shift();
            var modulesFolder = this.config.modulesFolder == null ? '' : this.config.modulesFolder;
            parts.unshift(modulesFolder);
          } else {
            // first part will be the registry-specific module folder
            var cwd = this.config.cwd == null ? '' : this.config.cwd;
            parts.unshift(cwd);
          }

          var loc = path.join.apply(path, parts);
          flatTree.push([loc, info]);
        }

        // remove ignored modules from the tree
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var visibleFlatTree = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, (_getIterator2 || _load_getIterator()).default)(flatTree), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step6.value, 2);

          var _loc = _step6$value[0];
          var info = _step6$value[1];

          var ref = info.pkg._reference;
          invariant(ref, 'expected reference');

          if (info.ignore) {
            info.addHistory('Deleted as this module was ignored');
          } else {
            visibleFlatTree.push([_loc, info]);
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return visibleFlatTree;
    }
  }]);
  return PackageHoister;
}();

exports.default = PackageHoister;