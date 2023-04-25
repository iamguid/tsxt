"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = void 0;
var _foreachItems = _interopRequireDefault(require("./foreach-items.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ctx = {
  items: [{
    name: "a",
    value: 1
  }, {
    name: "b",
    value: 2
  }, {
    name: "c",
    value: 3
  }]
};
exports.ctx = ctx;
function main() {
  const result = (0, _foreachItems.default)(ctx);
  console.log(result);
}
main();