"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSXElementName = void 0;
const types_1 = require("@babel/types");
function getJSXElementName(node) {
    const nameNode = node.openingElement.name;
    if ((0, types_1.isJSXIdentifier)(nameNode)) {
        return nameNode.name;
    }
    else if ((0, types_1.isJSXNamespacedName)(nameNode)) {
        return `${nameNode.namespace.name}.${nameNode.name}`;
    }
    else {
        throw new Error(`type ${nameNode.type} not supported in jsx`);
    }
}
exports.getJSXElementName = getJSXElementName;
//# sourceMappingURL=helpers.js.map