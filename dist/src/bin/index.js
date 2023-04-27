"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
if (process.argv.length === 5) {
    (0, compiler_1.compile)(process.argv[2], process.argv[3], process.argv[4]);
}
else if (process.argv.length === 4) {
    (0, compiler_1.compile)(null, process.argv[2], process.argv[3]);
}
else {
    throw new Error("Unsupported parameters");
}
//# sourceMappingURL=index.js.map