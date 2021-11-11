"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_template_1 = __importDefault(require("./simple.template"));
function main() {
    const ctx = "World";
    const result = (0, simple_template_1.default)(ctx);
    console.log(result);
}
main();
//# sourceMappingURL=simple.js.map