"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodePathErrorMessage = exports.getDataForScope = exports.getJSXElementName = void 0;
const traverse_1 = require("@babel/traverse");
const generator_1 = __importDefault(require("@babel/generator"));
function getJSXElementName(node) {
    return (node instanceof traverse_1.NodePath)
        ? node.node.openingElement.name.name
        // @ts-ignore
        : node.openingElement.name.name;
}
exports.getJSXElementName = getJSXElementName;
function getDataForScope(path, key = '$data') {
    const parent = path.find(parentPath => parentPath.getData(key));
    return (parent)
        ? parent.getData(key)
        : null;
}
exports.getDataForScope = getDataForScope;
function getNodePathErrorMessage(nodePath, err) {
    const { node } = nodePath;
    const result = (0, generator_1.default)(node);
    const data = getDataForScope(nodePath);
    let message = err && err.message || '';
    message += `\n\nNode: ${result.code}`;
    message += `\nLocation: ${JSON.stringify(node.loc)}`;
    message += `\nData: ${JSON.stringify(data, null, 2)}`;
    return message;
}
exports.getNodePathErrorMessage = getNodePathErrorMessage;
//# sourceMappingURL=helpers.js.map