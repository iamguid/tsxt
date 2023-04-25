"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = void 0;
var _ifStatement = _interopRequireDefault(require("./if-statement.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(function () {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this;
    },
    configurable: true
  });
  __magic__.globalThis = __magic__;
  delete Object.prototype.__magic__;
})();
if (typeof globalThis.__tsxt__ === "undefined") {
  const prepareValue = expr => {
    if (Array.isArray(expr)) {
      return expr.join('');
    } else if (expr === false) {
      return '';
    } else if (typeof expr !== 'string') {
      throw new Error(`Value '${expr}' in not a string`);
    } else {
      if (expr.length > 0) {
        return " ".repeat(globalThis.__tsxt__.indent * 4) + expr + '\n';
      } else {
        return '';
      }
    }
  };
  globalThis.__tsxt__ = {
    indent: 0,
    prepareValue
  };
}
const ctx = [true, false, false, true, true];
exports.ctx = ctx;
function main() {
  const result = (0, _ifStatement.default)(ctx);
  console.log(result);
}
main();