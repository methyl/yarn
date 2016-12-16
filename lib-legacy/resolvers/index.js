'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostedGit = exports.exotics = exports.registries = undefined;

var _getPrototypeOf;

function _load_getPrototypeOf() {
  return _getPrototypeOf = _interopRequireDefault(require('babel-runtime/core-js/object/get-prototype-of'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

exports.hostedGitFragmentToGitUrl = hostedGitFragmentToGitUrl;

var _npmResolver;

function _load_npmResolver() {
  return _npmResolver = _interopRequireDefault(require('./registries/npm-resolver.js'));
}

var _yarnResolver;

function _load_yarnResolver() {
  return _yarnResolver = _interopRequireDefault(require('./registries/yarn-resolver.js'));
}

var _gitResolver;

function _load_gitResolver() {
  return _gitResolver = _interopRequireDefault(require('./exotics/git-resolver.js'));
}

var _tarballResolver;

function _load_tarballResolver() {
  return _tarballResolver = _interopRequireDefault(require('./exotics/tarball-resolver.js'));
}

var _githubResolver;

function _load_githubResolver() {
  return _githubResolver = _interopRequireDefault(require('./exotics/github-resolver.js'));
}

var _fileResolver;

function _load_fileResolver() {
  return _fileResolver = _interopRequireDefault(require('./exotics/file-resolver.js'));
}

var _gitlabResolver;

function _load_gitlabResolver() {
  return _gitlabResolver = _interopRequireDefault(require('./exotics/gitlab-resolver.js'));
}

var _gistResolver;

function _load_gistResolver() {
  return _gistResolver = _interopRequireDefault(require('./exotics/gist-resolver.js'));
}

var _bitbucketResolver;

function _load_bitbucketResolver() {
  return _bitbucketResolver = _interopRequireDefault(require('./exotics/bitbucket-resolver.js'));
}

var _hostedGitResolver;

function _load_hostedGitResolver() {
  return _hostedGitResolver = require('./exotics/hosted-git-resolver.js');
}

var _registryResolver;

function _load_registryResolver() {
  return _registryResolver = _interopRequireDefault(require('./exotics/registry-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registries = exports.registries = {
  npm: (_npmResolver || _load_npmResolver()).default,
  yarn: (_yarnResolver || _load_yarnResolver()).default
};

//

var exotics = exports.exotics = {
  git: (_gitResolver || _load_gitResolver()).default,
  tarball: (_tarballResolver || _load_tarballResolver()).default,
  github: (_githubResolver || _load_githubResolver()).default,
  file: (_fileResolver || _load_fileResolver()).default,
  gitlab: (_gitlabResolver || _load_gitlabResolver()).default,
  gist: (_gistResolver || _load_gistResolver()).default,
  bitbucket: (_bitbucketResolver || _load_bitbucketResolver()).default
};

//

var hostedGit = exports.hostedGit = {
  github: (_githubResolver || _load_githubResolver()).default,
  gitlab: (_gitlabResolver || _load_gitlabResolver()).default,
  bitbucket: (_bitbucketResolver || _load_bitbucketResolver()).default
};

function hostedGitFragmentToGitUrl(fragment, reporter) {
  for (var key in hostedGit) {
    var Resolver = hostedGit[key];
    if (Resolver.isVersion(fragment)) {
      return Resolver.getGitHTTPUrl((0, (_hostedGitResolver || _load_hostedGitResolver()).explodeHostedGitFragment)(fragment, reporter));
    }
  }

  return fragment;
}

//

for (var key in registries) {
  var _class, _temp;

  var RegistryResolver = registries[key];

  exotics[key] = (_temp = _class = function (_ExoticRegistryResolv) {
    (0, (_inherits2 || _load_inherits()).default)(_class, _ExoticRegistryResolv);

    function _class() {
      (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, _class);
      return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (_class.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(_class)).apply(this, arguments));
    }

    return _class;
  }((_registryResolver || _load_registryResolver()).default), _class.protocol = key, _class.factory = RegistryResolver, _temp);
}