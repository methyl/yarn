'use strict';

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _keys;

function _load_keys() {
  return _keys = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));
}

var _getIterator2;

function _load_getIterator() {
  return _getIterator2 = _interopRequireDefault(require('babel-runtime/core-js/get-iterator'));
}

var _index;

function _load_index() {
  return _index = require('../reporters/index.js');
}

var _misc;

function _load_misc() {
  return _misc = require('../util/misc.js');
}

var _index2;

function _load_index2() {
  return _index2 = require('../registries/index.js');
}

var _index3;

function _load_index3() {
  return _index3 = _interopRequireWildcard(require('./commands/index.js'));
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('../constants.js'));
}

var _network;

function _load_network() {
  return _network = _interopRequireWildcard(require('../util/network.js'));
}

var _errors;

function _load_errors() {
  return _errors = require('../errors.js');
}

var _aliases;

function _load_aliases() {
  return _aliases = _interopRequireDefault(require('./aliases.js'));
}

var _config;

function _load_config() {
  return _config = _interopRequireDefault(require('../config.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');
var commander = require('commander');
var fs = require('fs');
var invariant = require('invariant');
var lockfile = require('proper-lockfile');
var loudRejection = require('loud-rejection');
var net = require('net');
var onDeath = require('death');
var path = require('path');
var pkg = require('../../package.json');

loudRejection();

//
var startArgs = process.argv.slice(0, 2);
var args = process.argv.slice(2);

// ignore all arguments after a --
var endArgs = [];
for (var i = 0; i < args.length; i++) {
  var arg = args[i];
  if (arg === '--') {
    endArgs = args.slice(i + 1);
    args = args.slice(0, i);
  }
}

// set global options
commander.version(pkg.version);
commander.usage('[command] [flags]');
commander.option('--verbose', 'output verbose messages on internal operations');
commander.option('--offline', 'trigger an error if any required dependencies are not available in local cache');
commander.option('--prefer-offline', 'use network only if dependencies are not available in local cache');
commander.option('--strict-semver');
commander.option('--json', '');
commander.option('--ignore-scripts', "don't run lifecycle scripts");
commander.option('--har', 'save HAR output of network traffic');
commander.option('--ignore-platform', 'ignore platform checks');
commander.option('--ignore-engines', 'ignore engines check');
commander.option('--ignore-optional', 'ignore optional dependencies');
commander.option('--force', 'ignore all caches');
commander.option('--no-bin-links', "don't generate bin links when setting up packages");
commander.option('--flat', 'only allow one version of a package');
commander.option('--prod, --production [prod]', '');
commander.option('--no-lockfile', "don't read or generate a lockfile");
commander.option('--pure-lockfile', "don't generate a lockfile");
commander.option('--frozen-lockfile', "don't generate a lockfile and fail if an update is needed");
commander.option('--global-folder <path>', '');
commander.option('--modules-folder <path>', 'rather than installing modules into the node_modules folder relative to the cwd, output them here');
commander.option('--cache-folder <path>', 'specify a custom folder to store the yarn cache');
commander.option('--mutex <type>[:specifier]', 'use a mutex to ensure only one yarn instance is executing');
commander.option('--no-emoji', 'disable emoji in output');
commander.option('--proxy <host>', '');
commander.option('--https-proxy <host>', '');
commander.option('--no-progress', 'disable progress bar');
commander.option('--network-concurrency <number>', 'maximum number of concurrent network requests', parseInt);

// get command name
var commandName = args.shift() || '';
var command = void 0;

//
var getDocsLink = function getDocsLink(name) {
  return 'https://yarnpkg.com/en/docs/cli/' + (name || '');
};
var getDocsInfo = function getDocsInfo(name) {
  return 'Visit ' + chalk.bold(getDocsLink(name)) + ' for documentation about this command.';
};

//
if (commandName === 'help' || commandName === '--help' || commandName === '-h') {
  commandName = 'help';
  if (args.length) {
    (function () {
      var helpCommand = (0, (_misc || _load_misc()).hyphenate)(args[0]);
      if ((_index3 || _load_index3())[helpCommand]) {
        commander.on('--help', function () {
          return console.log('  ' + getDocsInfo(helpCommand) + '\n');
        });
      }
    })();
  } else {
    commander.on('--help', function () {
      console.log('  Commands:\n');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, (_getIterator2 || _load_getIterator()).default)((0, (_keys || _load_keys()).default)(_index3 || _load_index3()).sort((_misc || _load_misc()).sortAlpha)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          if ((_index3 || _load_index3())[name].useless) {
            continue;
          }

          console.log('    - ' + (0, (_misc || _load_misc()).hyphenate)(name));
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

      console.log('\n  Run `' + chalk.bold('yarn help COMMAND') + '` for more information on specific commands.');
      console.log('  Visit ' + chalk.bold(getDocsLink()) + ' to learn more about Yarn.\n');
    });
  }
}

// if no args or command name looks like a flag then default to `install`
if (!commandName || commandName[0] === '-') {
  if (commandName) {
    args.unshift(commandName);
  }
  commandName = 'install';
}

// aliases: i -> install
if (commandName && typeof (_aliases || _load_aliases()).default[commandName] === 'string') {
  (function () {
    var alias = (_aliases || _load_aliases()).default[commandName];
    command = {
      run: function run(config, reporter) {
        throw new (_errors || _load_errors()).MessageError('Did you mean `yarn ' + alias + '`?');
      }
    };
  })();
}

//
if (commandName === 'help' && args.length) {
  commandName = (0, (_misc || _load_misc()).camelCase)(args.shift());
  args.push('--help');
}

//
invariant(commandName, 'Missing command name');
if (!command) {
  var camelised = (0, (_misc || _load_misc()).camelCase)(commandName);
  if (camelised) {
    command = (_index3 || _load_index3())[camelised];
  }
}

//
if (command && typeof command.setFlags === 'function') {
  command.setFlags(commander);
}

if (commandName === 'help' || args.indexOf('--help') >= 0 || args.indexOf('-h') >= 0) {
  (function () {
    var examples = command && command.examples || [];
    if (examples.length) {
      commander.on('--help', function () {
        console.log('  Examples:\n');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, (_getIterator2 || _load_getIterator()).default)(examples), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var example = _step2.value;

            console.log('    $ yarn ' + example);
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

        console.log();
      });
    }

    commander.parse(startArgs.concat(args));
    commander.help();
    process.exit(1);
  })();
}

//
if (!command) {
  args.unshift(commandName);
  command = (_index3 || _load_index3()).run;
}
invariant(command, 'missing command');

// parse flags
commander.parse(startArgs.concat(args));
commander.args = commander.args.concat(endArgs);

//
var Reporter = (_index || _load_index()).ConsoleReporter;
if (commander.json) {
  Reporter = (_index || _load_index()).JSONReporter;
}
var reporter = new Reporter({
  emoji: commander.emoji && process.stdout.isTTY && process.platform === 'darwin',
  verbose: commander.verbose,
  noProgress: !commander.progress
});
reporter.initPeakMemoryCounter();

//
var config = new (_config || _load_config()).default(reporter);

// print header
var outputWrapper = true;
if (typeof command.hasWrapper === 'function') {
  outputWrapper = command.hasWrapper(commander, commander.args);
}
if (commander.json) {
  outputWrapper = false;
}
if (outputWrapper) {
  reporter.header(commandName, pkg);
}

if (command.noArguments && commander.args.length) {
  reporter.error(reporter.lang('noArguments'));
  reporter.info(getDocsInfo(commandName));
  process.exit(1);
}

//
if (commander.yes) {
  reporter.warn(reporter.lang('yesWarning'));
}

//
if (!commander.offline && (_network || _load_network()).isOffline()) {
  reporter.warn(reporter.lang('networkWarning'));
}

//
if (command.requireLockfile && !fs.existsSync(path.join(config.cwd, (_constants || _load_constants()).LOCKFILE_FILENAME))) {
  reporter.error(reporter.lang('noRequiredLockfile'));
  process.exit(1);
}

//
var run = function run() {
  invariant(command, 'missing command');
  return command.run(config, reporter, commander, commander.args).then(function () {
    reporter.close();
    if (outputWrapper) {
      reporter.footer(false);
    }
  });
};

//
var runEventuallyWithFile = function runEventuallyWithFile(mutexFilename, isFirstTime) {
  return new (_promise || _load_promise()).default(function (ok) {
    var lockFilename = mutexFilename || path.join(config.cwd, (_constants || _load_constants()).SINGLE_INSTANCE_FILENAME);
    lockfile.lock(lockFilename, { realpath: false }, function (err, release) {
      if (err) {
        if (isFirstTime) {
          reporter.warn(reporter.lang('waitingInstance'));
        }
        setTimeout(function () {
          ok(runEventuallyWithFile(mutexFilename, isFirstTime));
        }, 200); // do not starve the CPU
      } else {
        onDeath(function () {
          process.exit(1);
        });
        ok(run().then(release));
      }
    });
  });
};

//
var runEventuallyWithNetwork = function runEventuallyWithNetwork(mutexPort) {
  return new (_promise || _load_promise()).default(function (ok) {
    var connectionOptions = {
      port: +mutexPort || (_constants || _load_constants()).SINGLE_INSTANCE_PORT
    };

    var server = net.createServer();

    server.on('error', function () {
      // another Yarn instance exists, let's connect to it to know when it dies.
      reporter.warn(reporter.lang('waitingInstance'));
      var socket = net.createConnection(connectionOptions);

      socket.on('connect', function () {
        // Allow the program to exit if this is the only active server in the event system.
        socket.unref();
      }).on('close', function (hadError) {
        // the `close` event gets always called after the `error` event
        if (!hadError) {
          process.nextTick(function () {
            ok(runEventuallyWithNetwork(mutexPort));
          });
        }
      }).on('error', function () {
        // No server to listen to ? Let's retry to become the next server then.
        process.nextTick(function () {
          ok(runEventuallyWithNetwork(mutexPort));
        });
      });
    });

    var onServerEnd = function onServerEnd() {
      server.close();
      return (_promise || _load_promise()).default.resolve();
    };

    // open the server and continue only if succeed.
    server.listen(connectionOptions, function () {
      // ensure the server gets closed properly on SIGNALS.
      onDeath(onServerEnd);

      ok(run().then(onServerEnd));
    });
  });
};

function onUnexpectedError(err) {
  function indent(str) {
    return '\n  ' + str.trim().split('\n').join('\n  ');
  }

  var log = [];
  log.push('Arguments: ' + indent(process.argv.join(' ')));
  log.push('PATH: ' + indent(process.env.PATH || 'undefined'));
  log.push('Yarn version: ' + indent(pkg.version));
  log.push('Node version: ' + indent(process.versions.node));
  log.push('Platform: ' + indent(process.platform + ' ' + process.arch));

  // add manifests
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, (_getIterator2 || _load_getIterator()).default)((_index2 || _load_index2()).registryNames), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var registryName = _step3.value;

      var possibleLoc = path.join(config.cwd, (_index2 || _load_index2()).registries[registryName].filename);
      var manifest = fs.existsSync(possibleLoc) ? fs.readFileSync(possibleLoc, 'utf8') : 'No manifest';
      log.push(registryName + ' manifest: ' + indent(manifest));
    }

    // lockfile
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

  var lockLoc = path.join(config.cwd, (_constants || _load_constants()).LOCKFILE_FILENAME);
  var lockfile = fs.existsSync(lockLoc) ? fs.readFileSync(lockLoc, 'utf8') : 'No lockfile';
  log.push('Lockfile: ' + indent(lockfile));

  log.push('Trace: ' + indent(err.stack));

  var errorLoc = path.join(config.cwd, 'yarn-error.log');
  fs.writeFileSync(errorLoc, log.join('\n\n') + '\n');

  reporter.error(reporter.lang('unexpectedError', err.message));
  reporter.info(reporter.lang('bugReport', errorLoc));
}

//
config.init({
  binLinks: commander.binLinks,
  modulesFolder: commander.modulesFolder,
  globalFolder: commander.globalFolder,
  cacheFolder: commander.cacheFolder,
  preferOffline: commander.preferOffline,
  captureHar: commander.har,
  ignorePlatform: commander.ignorePlatform,
  ignoreEngines: commander.ignoreEngines,
  ignoreScripts: commander.ignoreScripts,
  offline: commander.preferOffline || commander.offline,
  looseSemver: !commander.strictSemver,
  production: commander.production,
  httpProxy: commander.proxy,
  httpsProxy: commander.httpsProxy,
  networkConcurrency: commander.networkConcurrency,
  commandName: commandName
}).then(function () {
  var exit = function exit() {
    process.exit(0);
  };

  var mutex = commander.mutex;
  if (mutex && typeof mutex === 'string') {
    var parts = mutex.split(':');
    var mutexType = parts.shift();
    var mutexSpecifier = parts.join(':');

    if (mutexType === 'file') {
      return runEventuallyWithFile(mutexSpecifier, true).then(exit);
    } else if (mutexType === 'network') {
      return runEventuallyWithNetwork(mutexSpecifier).then(exit);
    } else {
      throw new (_errors || _load_errors()).MessageError('Unknown single instance type ' + mutexType);
    }
  } else {
    return run().then(exit);
  }
}).catch(function (err) {
  reporter.verbose(err.stack);

  if (err instanceof (_errors || _load_errors()).MessageError) {
    reporter.error(err.message);
  } else {
    onUnexpectedError(err);
  }

  if (commandName) {
    var actualCommandForHelp = (_index3 || _load_index3())[commandName] ? commandName : (_aliases || _load_aliases()).default[commandName];
    if (command && actualCommandForHelp) {
      reporter.info(getDocsInfo(actualCommandForHelp));
    }
  }

  process.exit(1);
});