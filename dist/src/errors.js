"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedType = void 0;
const helpers_1 = require("./helpers");
class UnexpectedType extends TypeError {
    constructor(nodePath, innerError) {
        super((0, helpers_1.getNodePathErrorMessage)(nodePath, innerError));
        this.nodePath = nodePath;
        this.innerError = innerError;
    }
}
exports.UnexpectedType = UnexpectedType;
//# sourceMappingURL=errors.js.map