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
var CustomWithChildren = function CustomWithChildren(props, children) {
  return "" + function () {
    var expr = children;
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = "inside";
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
exports["default"] = function () {
  return "" + CustomWithChildren({}, ["" + function () {
    var expr = "test1";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = "test2";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = [3, 4].map(function (item) {
      return "test" + item.toString();
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }() + CustomWithChildren({}, ["" + function () {
    var expr = "test5";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = "test6";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = [7, 8].map(function (item) {
      return "test" + item.toString();
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }()])]);
};