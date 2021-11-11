"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterfaceExample = void 0;

var _interface = _interopRequireDefault(require("./interface.template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let InterfaceExample;
exports.InterfaceExample = InterfaceExample;

(function (_InterfaceExample) {})(InterfaceExample || (exports.InterfaceExample = InterfaceExample = {}));

function main() {
  const ctx = {
    interfaces: [{
      className: 'IA',
      methods: [{
        methodName: 'something',
        inputType: 'any',
        outputType: 'any'
      }]
    }, {
      className: 'IB',
      methods: [{
        methodName: 'something',
        inputType: 'any',
        outputType: 'any'
      }]
    }]
  };
  const result = (0, _interface.default)(ctx);
  console.log(result);
}

main();