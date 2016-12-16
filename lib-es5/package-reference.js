'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
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

var PackageReference = function () {
  function PackageReference(request, info, remote) {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, PackageReference);

    this.resolver = request.resolver;
    this.lockfile = request.lockfile;
    this.requests = [];
    this.config = request.config;

    this.registry = remote.registry;
    this.version = info.version;
    this.name = info.name;
    this.uid = info._uid;

    this.remote = remote;

    this.dependencies = [];

    this.permissions = {};
    this.patterns = [];
    this.optional = null;
    this.root = false;
    this.ignore = false;
    this.fresh = false;
    this.location = null;
    this.addRequest(request);
  }

  (0, (_createClass2 || _load_createClass()).default)(PackageReference, [{
    key: 'setFresh',
    value: function setFresh(fresh) {
      this.fresh = fresh;
    }
  }, {
    key: 'setLocation',
    value: function setLocation(loc) {
      return this.location = loc;
    }
  }, {
    key: 'addRequest',
    value: function addRequest(request) {
      this.requests.push(request);

      if (!request.parentRequest) {
        this.root = true;
      }
    }
  }, {
    key: 'prune',
    value: function prune() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)(this.patterns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var selfPattern = _step.value;

          // remove ourselves from the resolver
          this.resolver.removePattern(selfPattern);
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
    }
  }, {
    key: 'addDependencies',
    value: function addDependencies(deps) {
      this.dependencies = this.dependencies.concat(deps);
    }
  }, {
    key: 'setPermission',
    value: function setPermission(key, val) {
      this.permissions[key] = val;
    }
  }, {
    key: 'hasPermission',
    value: function hasPermission(key) {
      if (key in this.permissions) {
        return this.permissions[key];
      } else {
        return false;
      }
    }
  }, {
    key: 'addPattern',
    value: function addPattern(pattern, manifest) {
      this.resolver.addPattern(pattern, manifest);

      this.patterns.push(pattern);

      var shrunk = this.lockfile.getLocked(pattern);
      if (shrunk && shrunk.permissions) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)((0, (_misc || _load_misc()).entries)(shrunk.permissions)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_step2.value, 2);

            var _key = _step2$value[0];
            var perm = _step2$value[1];

            this.setPermission(_key, perm);
          }
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
      }
    }
  }, {
    key: 'addOptional',
    value: function addOptional(optional) {
      if (this.optional == null) {
        // optional is uninitialised
        this.optional = optional;
      } else if (!optional) {
        // otherwise, ignore all subsequent optional assignments and only accept ones making
        // this not optional
        this.optional = false;
      }
    }
  }]);
  return PackageReference;
}();

exports.default = PackageReference;