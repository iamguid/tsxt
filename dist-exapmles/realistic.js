"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RealisticExample = void 0;

var _realistic = _interopRequireDefault(require("./realistic.template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RealisticExample;
exports.RealisticExample = RealisticExample;

(function (_RealisticExample) {})(RealisticExample || (exports.RealisticExample = RealisticExample = {}));

function main() {
  const result = (0, _realistic.default)({});
  console.log(result);
}

main();