"use strict";

var _simple = _interopRequireDefault(require("./simple.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function main() {
  const ctx = "World";
  const result = (0, _simple.default)(ctx);
  console.log(result);
}
main();