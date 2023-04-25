"use strict";

var _recursiveIndent = _interopRequireDefault(require("./recursive-indent.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function main() {
  const ctx = "World";
  const result = (0, _recursiveIndent.default)(ctx);
  console.log(result);
}
main();