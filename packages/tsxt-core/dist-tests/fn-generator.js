"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = void 0;
var _fnGenerator = _interopRequireDefault(require("./fn-generator.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ctx = {
  methodName: "hello",
  inputType: "string",
  outputType: "number"
};
exports.ctx = ctx;
function main() {
  const result = (0, _fnGenerator.default)(ctx);
  console.log(result);
}
main();