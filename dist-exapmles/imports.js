"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportsExample = void 0;

var _imports = _interopRequireDefault(require("./imports.template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportsExample;
exports.ImportsExample = ImportsExample;

(function (_ImportsExample) {})(ImportsExample || (exports.ImportsExample = ImportsExample = {}));

function main() {
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
    }]
  };
  const result = (0, _imports.default)(ctx);
  console.log(result);
}

main();