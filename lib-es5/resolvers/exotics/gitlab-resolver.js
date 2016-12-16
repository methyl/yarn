'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf;

function _load_getPrototypeOf() {
  return _getPrototypeOf = _interopRequireDefault(require('babel-runtime/core-js/object/get-prototype-of'));
}

var _classCallCheck2;

function _load_classCallCheck() {
  return _classCallCheck2 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));
}

var _createClass2;

function _load_createClass() {
  return _createClass2 = _interopRequireDefault(require('babel-runtime/helpers/createClass'));
}

var _possibleConstructorReturn2;

function _load_possibleConstructorReturn() {
  return _possibleConstructorReturn2 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
}

var _inherits2;

function _load_inherits() {
  return _inherits2 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));
}

var _hostedGitResolver;

function _load_hostedGitResolver() {
  return _hostedGitResolver = _interopRequireDefault(require('./hosted-git-resolver.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitLabResolver = function (_HostedGitResolver) {
  (0, (_inherits2 || _load_inherits()).default)(GitLabResolver, _HostedGitResolver);

  function GitLabResolver() {
    (0, (_classCallCheck2 || _load_classCallCheck()).default)(this, GitLabResolver);
    return (0, (_possibleConstructorReturn2 || _load_possibleConstructorReturn()).default)(this, (GitLabResolver.__proto__ || (0, (_getPrototypeOf || _load_getPrototypeOf()).default)(GitLabResolver)).apply(this, arguments));
  }

  (0, (_createClass2 || _load_createClass()).default)(GitLabResolver, null, [{
    key: 'getTarballUrl',
    value: function getTarballUrl(parts, hash) {
      return 'https://' + this.hostname + '/' + parts.user + '/' + parts.repo + '/repository/archive.tar.gz?ref=' + hash;
    }
  }, {
    key: 'getGitHTTPUrl',
    value: function getGitHTTPUrl(parts) {
      return 'https://' + this.hostname + '/' + parts.user + '/' + parts.repo + '.git';
    }
  }, {
    key: 'getGitSSHUrl',
    value: function getGitSSHUrl(parts) {
      return 'git+ssh://git@' + this.hostname + '/' + parts.user + '/' + parts.repo + '.git' + ('' + (parts.hash ? '#' + decodeURIComponent(parts.hash) : ''));
    }
  }, {
    key: 'getHTTPFileUrl',
    value: function getHTTPFileUrl(parts, filename, commit) {
      return 'https://' + this.hostname + '/' + parts.user + '/' + parts.repo + '/raw/' + commit + '/' + filename;
    }
  }]);
  return GitLabResolver;
}((_hostedGitResolver || _load_hostedGitResolver()).default);

GitLabResolver.hostname = 'gitlab.com';
GitLabResolver.protocol = 'gitlab';
exports.default = GitLabResolver;