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
exports.ctx = void 0;
exports.ctx = {
  imports: [{
    name: "a",
    path: "./a"
  }, {
    name: "b",
    path: "./b"
  }, {
    name: "c",
    path: "./c"
  }],
  clients: [{
    clientClassName: "SomeClassName",
    interfaceClassName: "ISomeClassName",
    methods: [{
      isServerStreaming: true,
      methodName: "methodA",
      inputType: "InputType",
      outputType: "OutputType"
    }, {
      isServerStreaming: false,
      methodName: "methodB",
      inputType: "InputType",
      outputType: "OutputType"
    }]
  }]
};
var HeaderTmpl = function HeaderTmpl() {
  return "" + function () {
    var expr = "// \"GENERATED CODE -- DO NOT EDIT!\"";
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
var ImportsTmpl = function ImportsTmpl(_a, children) {
  var imports = _a.imports;
  return "" + function () {
    var expr = children;
    return globalThis.__tsxt__.prepareValue(expr);
  }() + "\n" + function () {
    var expr = imports.map(function (imprt) {
      return "" + function () {
        var expr = "import * ".concat(imprt.name, " from \"").concat(imprt.path, "\";");
        return globalThis.__tsxt__.prepareValue(expr);
      }();
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
var ClientTmpl = function ClientTmpl(_a) {
  var client = _a.client;
  return "" + ClientInterfaceTmpl({
    "client": client
  }, []) + "\n" + ClientClassTmpl({
    "client": client
  }, []);
};
var ClientInterfaceTmpl = function ClientInterfaceTmpl(_a) {
  var client = _a.client;
  return "" + function () {
    var expr = "export interface ".concat(client.interfaceClassName, " {");
    return globalThis.__tsxt__.prepareValue(expr);
  }() + ("" + function () {
    globalThis.__tsxt__.indent++;
    return "";
  }() + function () {
    var expr = client.methods.map(function (method) {
      return method.isServerStreaming ? "" + function () {
        var expr = "".concat(method.methodName, ": (request: ").concat(method.inputType, ", metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<").concat(method.outputType, ">;");
        return globalThis.__tsxt__.prepareValue(expr);
      }() : "" + function () {
        var expr = "".concat(method.methodName, ": (request: ").concat(method.inputType, ", metadata: grpcWeb.Metadata) => Promise<").concat(method.outputType, ">;");
        return globalThis.__tsxt__.prepareValue(expr);
      }();
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    globalThis.__tsxt__.indent--;
    return "";
  }()) + function () {
    var expr = "}";
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
var ClientClassTmpl = function ClientClassTmpl(_a) {
  var client = _a.client;
  return "" + function () {
    var expr = "export class ".concat(client.clientClassName, " implements ").concat(client.interfaceClassName, " {");
    return globalThis.__tsxt__.prepareValue(expr);
  }() + ("" + function () {
    globalThis.__tsxt__.indent++;
    return "";
  }() + function () {
    var expr = client.methods.map(function (method) {
      return method.isServerStreaming ? "" + function () {
        var expr = "public ".concat(method.methodName, "(request: ").concat(method.inputType, ", metadata: grpcWeb.Metadata): grpcWeb.ClientReadableStream<").concat(method.outputType, "> {");
        return globalThis.__tsxt__.prepareValue(expr);
      }() + ("" + function () {
        globalThis.__tsxt__.indent++;
        return "";
      }() + function () {
        var expr = "return void;";
        return globalThis.__tsxt__.prepareValue(expr);
      }() + function () {
        globalThis.__tsxt__.indent--;
        return "";
      }()) + function () {
        var expr = "}";
        return globalThis.__tsxt__.prepareValue(expr);
      }() : "" + function () {
        var expr = "public ".concat(method.methodName, "(request: ").concat(method.inputType, ", metadata: grpcWeb.Metadata): Promise<").concat(method.outputType, "> {");
        return globalThis.__tsxt__.prepareValue(expr);
      }() + ("" + function () {
        globalThis.__tsxt__.indent++;
        return "";
      }() + function () {
        var expr = "return void;";
        return globalThis.__tsxt__.prepareValue(expr);
      }() + function () {
        globalThis.__tsxt__.indent--;
        return "";
      }()) + function () {
        var expr = "}";
        return globalThis.__tsxt__.prepareValue(expr);
      }();
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    globalThis.__tsxt__.indent--;
    return "";
  }()) + function () {
    var expr = "}";
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
var ClientsTmpl = function ClientsTmpl(_a) {
  var clients = _a.clients;
  return "" + function () {
    var expr = clients.map(function (client) {
      return "" + ClientTmpl({
        "client": client
      }, []) + "\n";
    });
    return globalThis.__tsxt__.prepareValue(expr);
  }();
};
exports["default"] = function (ctx) {
  return "" + HeaderTmpl({}, []) + "\n" + ImportsTmpl({
    "imports": ctx.imports
  }, ["" + function () {
    var expr = "import * as grpcWeb from \"grpc-web\"";
    return globalThis.__tsxt__.prepareValue(expr);
  }() + function () {
    var expr = "import * jspb from \"google-protobuf\"";
    return globalThis.__tsxt__.prepareValue(expr);
  }()]) + "\n" + ClientsTmpl({
    "clients": ctx.clients
  }, []);
};