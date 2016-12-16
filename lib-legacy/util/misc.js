'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAlpha = sortAlpha;
exports.entries = entries;
exports.removePrefix = removePrefix;
exports.removeSuffix = removeSuffix;
exports.addSuffix = addSuffix;
exports.hyphenate = hyphenate;
exports.camelCase = camelCase;
var _camelCase = require('camelcase');

function sortAlpha(a, b) {
  // sort alphabetically in a deterministic way
  var shortLen = Math.min(a.length, b.length);
  for (var i = 0; i < shortLen; i++) {
    var aChar = a.charCodeAt(i);
    var bChar = b.charCodeAt(i);
    if (aChar !== bChar) {
      return aChar - bChar;
    }
  }
  return a.length - b.length;
}

function entries(obj) {
  var entries = [];
  if (obj) {
    for (var _key in obj) {
      entries.push([_key, obj[_key]]);
    }
  }
  return entries;
}

function removePrefix(pattern, prefix) {
  if (pattern.startsWith(prefix)) {
    pattern = pattern.slice(prefix.length);
  }

  return pattern;
}

function removeSuffix(pattern, suffix) {
  if (pattern.endsWith(suffix)) {
    return pattern.slice(0, -suffix.length);
  }

  return pattern;
}

function addSuffix(pattern, suffix) {
  if (!pattern.endsWith(suffix)) {
    return pattern + suffix;
  }

  return pattern;
}

function hyphenate(str) {
  return str.replace(/[A-Z]/g, function (match) {
    return '-' + match.charAt(0).toLowerCase();
  });
}

function camelCase(str) {
  if (/[A-Z]/.test(str)) {
    return null;
  } else {
    return _camelCase(str);
  }
}