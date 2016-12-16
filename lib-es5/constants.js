'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathKey = getPathKey;
exports.isRootUser = isRootUser;
var path = require('path');
var userHome = require('user-home');

if (process.platform === 'linux' && isRootUser(getUid())) {
  userHome = path.resolve('/usr/local/share');
}

var DEPENDENCY_TYPES = exports.DEPENDENCY_TYPES = ['devDependencies', 'dependencies', 'optionalDependencies', 'peerDependencies'];

var YARN_REGISTRY = exports.YARN_REGISTRY = 'https://registry.yarnpkg.com';

// lockfile version, bump whenever we make backwards incompatible changes
var LOCKFILE_VERSION = exports.LOCKFILE_VERSION = 1;

// max amount of network requests to perform concurrently
var NETWORK_CONCURRENCY = exports.NETWORK_CONCURRENCY = 15;

// max amount of child processes to execute concurrently
var CHILD_CONCURRENCY = exports.CHILD_CONCURRENCY = 5;

var REQUIRED_PACKAGE_KEYS = exports.REQUIRED_PACKAGE_KEYS = ['name', 'version', '_uid'];

function getDirectory(category) {
  // use %LOCALAPPDATA%/Yarn on Windows
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return path.join(process.env.LOCALAPPDATA, 'Yarn', category);
  }

  // otherwise use ~/.yarn
  return path.join(userHome, '.' + category, 'yarn');
}

function getCacheDirectory() {
  if (process.platform === 'darwin') {
    return path.join(userHome, 'Library', 'Caches', 'Yarn');
  }

  return getDirectory('cache');
}

var MODULE_CACHE_DIRECTORY = exports.MODULE_CACHE_DIRECTORY = getCacheDirectory();
var CONFIG_DIRECTORY = exports.CONFIG_DIRECTORY = getDirectory('config');
var LINK_REGISTRY_DIRECTORY = exports.LINK_REGISTRY_DIRECTORY = path.join(CONFIG_DIRECTORY, 'link');
var GLOBAL_MODULE_DIRECTORY = exports.GLOBAL_MODULE_DIRECTORY = path.join(CONFIG_DIRECTORY, 'global');
var CACHE_FILENAME = exports.CACHE_FILENAME = path.join(MODULE_CACHE_DIRECTORY, '.roadrunner.json');

var INTEGRITY_FILENAME = exports.INTEGRITY_FILENAME = '.yarn-integrity';
var LOCKFILE_FILENAME = exports.LOCKFILE_FILENAME = 'yarn.lock';
var METADATA_FILENAME = exports.METADATA_FILENAME = '.yarn-metadata.json';
var TARBALL_FILENAME = exports.TARBALL_FILENAME = '.yarn-tarball.tgz';
var CLEAN_FILENAME = exports.CLEAN_FILENAME = '.yarnclean';

var DEFAULT_INDENT = exports.DEFAULT_INDENT = '  ';
var SINGLE_INSTANCE_PORT = exports.SINGLE_INSTANCE_PORT = 31997;
var SINGLE_INSTANCE_FILENAME = exports.SINGLE_INSTANCE_FILENAME = '.yarn-single-instance';

var SELF_UPDATE_VERSION_URL = exports.SELF_UPDATE_VERSION_URL = 'https://yarnpkg.com/latest-version';
var SELF_UPDATE_TARBALL_URL = exports.SELF_UPDATE_TARBALL_URL = 'https://yarnpkg.com/latest.tar.gz';
var SELF_UPDATE_DOWNLOAD_FOLDER = exports.SELF_UPDATE_DOWNLOAD_FOLDER = 'updates';

var ENV_PATH_KEY = exports.ENV_PATH_KEY = getPathKey(process.platform, process.env);

function getPathKey(platform, env) {
  var pathKey = 'PATH';

  // windows calls it's path "Path" usually, but this is not guaranteed.
  if (platform === 'win32') {
    pathKey = 'Path';

    for (var _key in env) {
      if (_key.toLowerCase() === 'path') {
        pathKey = _key;
      }
    }
  }

  return pathKey;
}

function getUid() {
  if (process.platform !== 'win32' && process.getuid) {
    return process.getuid();
  }
  return null;
}

var ROOT_USER = exports.ROOT_USER = isRootUser(getUid());

function isRootUser(uid) {
  return uid === 0;
}