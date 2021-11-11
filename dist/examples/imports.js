"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imports_template_1 = __importDefault(require("./imports.template"));
function main() {
    const ctx = {
        imports: [
            { name: "a", path: "./a" },
            { name: "b", path: "./b" },
            { name: "c", path: "./c" },
        ]
    };
    const result = (0, imports_template_1.default)(ctx);
    console.log(result);
}
main();
//# sourceMappingURL=imports.js.map