"use strict";

var _simple = _interopRequireDefault(require("./simple.template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
  const data = "World";
  const result = (0, _simple.default)(data);
  console.log(result);
}

main();