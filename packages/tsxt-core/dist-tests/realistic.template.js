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
const HeaderTmpl = () => "" + (() => {
  const expr = `// "GENERATED CODE -- DO NOT EDIT!"`;
  return globalThis.__tsxt__.prepareValue(expr);
})();
const ImportsTmpl = ({
  imports
}, children) => "" + (() => {
  const expr = children;
  return globalThis.__tsxt__.prepareValue(expr);
})() + "\n" + (() => {
  const expr = imports.map(imprt => "" + (() => {
    const expr = `import * ${imprt.name} from "${imprt.path}";`;
    return globalThis.__tsxt__.prepareValue(expr);
  })());
  return globalThis.__tsxt__.prepareValue(expr);
})();
const ClientTmpl = ({
  client
}) => "" + ClientInterfaceTmpl({
  "client": client
}, []) + "\n" + ClientClassTmpl({
  "client": client
}, []);
const ClientInterfaceTmpl = ({
  client
}) => "" + (() => {
  const expr = `export interface ${client.interfaceClassName} {`;
  return globalThis.__tsxt__.prepareValue(expr);
})() + ("" + (() => {
  globalThis.__tsxt__.indent++;
  return "";
})() + (() => {
  const expr = client.methods.map(method => method.isServerStreaming ? "" + (() => {
    const expr = `${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>;`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() : "" + (() => {
    const expr = `${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>;`;
    return globalThis.__tsxt__.prepareValue(expr);
  })());
  return globalThis.__tsxt__.prepareValue(expr);
})() + (() => {
  globalThis.__tsxt__.indent--;
  return "";
})()) + (() => {
  const expr = `}`;
  return globalThis.__tsxt__.prepareValue(expr);
})();
const ClientClassTmpl = ({
  client
}) => "" + (() => {
  const expr = `export class ${client.clientClassName} implements ${client.interfaceClassName} {`;
  return globalThis.__tsxt__.prepareValue(expr);
})() + ("" + (() => {
  globalThis.__tsxt__.indent++;
  return "";
})() + (() => {
  const expr = client.methods.map(method => method.isServerStreaming ? "" + (() => {
    const expr = `public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): grpcWeb.ClientReadableStream<${method.outputType}> {`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + ("" + (() => {
    globalThis.__tsxt__.indent++;
    return "";
  })() + (() => {
    const expr = `return void;`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + (() => {
    globalThis.__tsxt__.indent--;
    return "";
  })()) + (() => {
    const expr = `}`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() : "" + (() => {
    const expr = `public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}> {`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + ("" + (() => {
    globalThis.__tsxt__.indent++;
    return "";
  })() + (() => {
    const expr = `return void;`;
    return globalThis.__tsxt__.prepareValue(expr);
  })() + (() => {
    globalThis.__tsxt__.indent--;
    return "";
  })()) + (() => {
    const expr = `}`;
    return globalThis.__tsxt__.prepareValue(expr);
  })());
  return globalThis.__tsxt__.prepareValue(expr);
})() + (() => {
  globalThis.__tsxt__.indent--;
  return "";
})()) + (() => {
  const expr = `}`;
  return globalThis.__tsxt__.prepareValue(expr);
})();
const ClientsTmpl = ({
  clients
}) => "" + (() => {
  const expr = clients.map(client => "" + ClientTmpl({
    "client": client
  }, []) + "\n");
  return globalThis.__tsxt__.prepareValue(expr);
})();
var _default = ctx => "" + HeaderTmpl({}, []) + "\n" + ImportsTmpl({
  "imports": ctx.imports
}, ["" + (() => {
  const expr = `import * as grpcWeb from "grpc-web"`;
  return globalThis.__tsxt__.prepareValue(expr);
})() + (() => {
  const expr = `import * jspb from "google-protobuf"`;
  return globalThis.__tsxt__.prepareValue(expr);
})()]) + "\n" + ClientsTmpl({
  "clients": ctx.clients
}, []);
exports.default = _default;