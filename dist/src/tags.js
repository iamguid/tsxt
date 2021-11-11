"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCbElement = exports.isIndentElement = exports.isLnElement = exports.isTemplElement = void 0;
const helpers_1 = require("./helpers");
function isTemplElement(node) {
    return (0, helpers_1.getJSXElementName)(node) === 'templ';
}
exports.isTemplElement = isTemplElement;
function isLnElement(node) {
    (0, helpers_1.getJSXElementName)(node) === 'ln';
}
exports.isLnElement = isLnElement;
function isIndentElement(node) {
    (0, helpers_1.getJSXElementName)(node) === 'indent';
}
exports.isIndentElement = isIndentElement;
function isCbElement(node) {
    (0, helpers_1.getJSXElementName)(node) === 'cb';
}
exports.isCbElement = isCbElement;
//# sourceMappingURL=tags.js.map