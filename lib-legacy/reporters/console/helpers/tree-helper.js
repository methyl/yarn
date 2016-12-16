'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortTrees = sortTrees;
exports.recurseTree = recurseTree;
exports.getFormattedOutput = getFormattedOutput;
var repeat = require('repeating');

// types


// public
function sortTrees(trees) {
  return trees.sort(function (tree1, tree2) {
    return tree1.name.localeCompare(tree2.name);
  });
}

function recurseTree(tree, level, recurseFunc) {
  var treeLen = tree.length;
  var treeEnd = treeLen - 1;
  for (var i = 0; i < treeLen; i++) {
    recurseFunc(tree[i], level + 1, i === treeEnd);
  }
}

function getFormattedOutput(fmt) {
  var item = formatColor(fmt.color, fmt.name, fmt.formatter);
  var indent = getIndent(fmt.end, fmt.level);
  var suffix = getSuffix(fmt.hint, fmt.formatter);
  return indent + '\u2500 ' + item + suffix + '\n';
}

function getIndentChar(end) {
  return end ? '└' : '├';
}

function getIndent(end, level) {
  var base = repeat('│  ', level);
  var indentChar = getIndentChar(end);
  var hasLevel = base + indentChar;
  return level ? hasLevel : indentChar;
}

function getSuffix(hint, formatter) {
  return hint ? ' (' + formatter.grey(hint) + ')' : '';
}

function formatColor(color, strToFormat, formatter) {
  return color ? formatter[color](strToFormat) : strToFormat;
}