'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixCmdWinSlashes = fixCmdWinSlashes;
function fixCmdWinSlashes(cmd) {
  function findQuotes(quoteSymbol) {
    var quotes = [];
    var addQuote = function addQuote(_, index) {
      quotes.push({ from: index, to: index + _.length });
      return _;
    };
    var regEx = new RegExp(quoteSymbol + '.*' + quoteSymbol);
    cmd.replace(regEx, addQuote);
    return quotes;
  }
  var quotes = findQuotes('"').concat(findQuotes('\''));

  function isInsideQuotes(index) {
    return quotes.reduce(function (result, quote) {
      return result || quote.from <= index && index <= quote.to;
    }, false);
  }

  var cmdPrePattern = '((?:^|&&|&|\\|\\||\\|)\\s*)';
  var cmdPattern = '(".*?"|\'.*?\'|\\S*)';
  var regExp = new RegExp('' + cmdPrePattern + cmdPattern, 'g');
  return cmd.replace(regExp, function (whole, pre, cmd, index) {
    if ((pre[0] === '&' || pre[0] === '|') && isInsideQuotes(index)) {
      return whole;
    }
    return pre + cmd.replace(/\//g, '\\');
  });
}