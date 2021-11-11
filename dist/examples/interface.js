"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interface_template_1 = __importDefault(require("./interface.template"));
function main() {
    const ctx = {
        interfaces: [
            { className: 'IA', methods: [{ methodName: 'something', inputType: 'any', outputType: 'any' }] },
            { className: 'IB', methods: [{ methodName: 'something', inputType: 'any', outputType: 'any' }] },
        ]
    };
    const result = (0, interface_template_1.default)(ctx);
    console.log(result);
}
main();
//# sourceMappingURL=interface.js.map