"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSXElementName = void 0;
const types_1 = require("@babel/types");
function getJSXElementName(node) {
    if ((0, types_1.isJSXIdentifier)(node)) {
        return node.name;
    }
    else if ((0, types_1.isJSXNamespacedName)(node)) {
        return `${node.namespace.name}.${node.name}`;
    }
    else if ((0, types_1.isJSXIdentifier)(node.object) && (0, types_1.isJSXIdentifier)(node.property)) {
        return `${node.object.name}.${node.property.name}`;
    }
    throw new Error(`Unsupported syntax`);
}
exports.getJSXElementName = getJSXElementName;
//# sourceMappingURL=helpers.js.map