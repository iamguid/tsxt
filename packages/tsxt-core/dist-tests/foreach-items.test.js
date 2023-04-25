"use strict";

var _foreachItems = _interopRequireDefault(require("./foreach-items.template"));
var _foreachItems2 = require("./foreach-items");
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
it("template generates correctly", () => {
  const result = (0, _foreachItems.default)(_foreachItems2.ctx);
  expect(result).toMatchSnapshot();
});