"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function get() {
      return this;
    },
    configurable: true
  });
  __magic__.globalThis = __magic__;
  delete Object.prototype.__magic__;
})();
if (typeof globalThis.__tsxt__ === "undefined") {
  var prepareValue = function prepareValue(expr) {
    if (Array.isArray(expr)) {
      return expr.join('');
    } else if (expr === false) {
      return '';
    } else if (typeof expr !== 'string') {
      throw new Error("Value '".concat(expr, "' in not a string"));
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
    prepareValue: prepareValue
  };
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var CustomWithArgsTmpl = function CustomWithArgsTmpl(_ref) {
  var arg1 = _ref.arg1,
    arg2 = _ref.arg2,
    arg3 = _ref.arg3;
  return "" + function () {
    var expr = arg1;
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = arg2;
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = arg3[0];
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
exports["default"] = function () {
  return "" + CustomWithArgsTmpl({
    "arg1": "test1",
    "arg2": "test2",
    "arg3": ["test3"]
  }, []);
};