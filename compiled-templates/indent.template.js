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
exports["default"] = function () {
  return "" + function () {
    var expr = "line 1";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + ("" + function () {
    globalThis.__tsxt__.indent++;
    return "";
  }() + function () {
    var expr = "line 2";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    globalThis.__tsxt__.indent--;
    return "";
  }()) + ("" + function () {
    globalThis.__tsxt__.indent++;
    return "";
  }() + function () {
    var expr = "line 3";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + ("" + function () {
    globalThis.__tsxt__.indent++;
    return "";
  }() + function () {
    var expr = "line 4";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + "\n" + function () {
    var expr = "line 5";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = "line 6";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    globalThis.__tsxt__.indent--;
    return "";
  }()) + function () {
    var expr = "line 7";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    globalThis.__tsxt__.indent--;
    return "";
  }());
};