"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = void 0;
var _realistic = _interopRequireDefault(require("./realistic.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ctx = {
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
exports.ctx = ctx;
function main() {
  const result = (0, _realistic.default)(ctx);
  console.log(result);
}
main();