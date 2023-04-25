"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = void 0;
var _ifStatement = _interopRequireDefault(require("./if-statement.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ctx = [true, false, false, true, true];
exports.ctx = ctx;
function main() {
  const result = (0, _ifStatement.default)(ctx);
  console.log(result);
}
main();