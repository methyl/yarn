'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2;

function _load_typeof() {
  return _typeof2 = _interopRequireDefault(require('babel-runtime/helpers/typeof'));
}

exports.isValidLicense = isValidLicense;
exports.stringifyPerson = stringifyPerson;
exports.parsePerson = parsePerson;
exports.normalizePerson = normalizePerson;
exports.extractDescription = extractDescription;
exports.extractRepositoryUrl = extractRepositoryUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLicense = require('validate-npm-package-license');

function isValidLicense(license) {
  return !!license && validateLicense(license).validForNewPackages;
}

function stringifyPerson(person) {
  if (!person || (typeof person === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(person)) !== 'object') {
    return person;
  }

  var parts = [];
  if (person.name) {
    parts.push(person.name);
  }

  var email = person.email || person.mail;
  if (typeof email === 'string') {
    parts.push('<' + email + '>');
  }

  var url = person.url || person.web;
  if (typeof url === 'string') {
    parts.push('(' + url + ')');
  }

  return parts.join(' ');
}

function parsePerson(person) {
  if (typeof person !== 'string') {
    return person;
  }

  // format: name (url) <email>
  var obj = {};

  var name = person.match(/^([^\(<]+)/);
  if (name) {
    name = name[0].trim();
    if (name) {
      obj.name = name;
    }
  }

  var email = person.match(/<([^>]+)>/);
  if (email) {
    obj.email = email[1];
  }

  var url = person.match(/\(([^\)]+)\)/);
  if (url) {
    obj.url = url[1];
  }

  return obj;
}

function normalizePerson(person) {
  return parsePerson(stringifyPerson(person));
}

function extractDescription(readme) {
  if (typeof readme !== 'string' || readme === '') {
    return undefined;
  }

  // split into lines
  var lines = readme.trim().split('\n').map(function (line) {
    return line.trim();
  });

  // find the start of the first paragraph, ignore headings
  var start = 0;
  for (; start < lines.length; start++) {
    var line = lines[start];
    if (line && line.match(/^(#|$)/)) {
      // line isn't empty and isn't a heading so this is the start of a paragraph
      start++;
      break;
    }
  }

  // skip newlines from the header to the first line
  while (start < lines.length && !lines[start]) {
    start++;
  }

  // continue to the first non empty line
  var end = start;
  while (end < lines.length && lines[end]) {
    end++;
  }

  return lines.slice(start, end).join(' ');
}

function extractRepositoryUrl(repository) {
  if (!repository || (typeof repository === 'undefined' ? 'undefined' : (0, (_typeof2 || _load_typeof()).default)(repository)) !== 'object' || !repository.url) {
    return repository;
  }
  return repository.url;
}