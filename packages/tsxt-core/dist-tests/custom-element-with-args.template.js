"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
const CustomWithArgsTmpl = ({
  arg1,
  arg2,
  arg3
}) => {
  return "" + (() => {
    const expr = arg1;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + (() => {
    const expr = arg2;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + (() => {
    const expr = arg3[0];
    return globalThis.__tsxt__.prepareValue(expr);
  })();
};
var _default = () => "" + CustomWithArgsTmpl({
  "arg1": "test1",
  "arg2": `test2`,
  "arg3": ["test3"]
}, []);
exports.default = _default;