"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsxHandlers = exports.handlers = void 0;
// const generateTemplate = (path: NodePath<JSXElement>, state: VisitorState) => {
//     const nodesStack: Node[] = [...path.node.children];
//     const resultExpressions: Node[] = [];
//     while (nodesStack.length > 0) {
//         const node = nodesStack.shift()!;
//         console.warn(node.type);
//         if (isJSXText(node)) {
//             continue;
//         } else if (isTemplateLiteral(node)) {
//             resultExpressions.push(binaryExpression('+', node, stringLiteral("\n")));
//         } else if (isJSXExpressionContainer(node)) {
//             nodesStack.push(node.expression);
//         } else if (isExpressionStatement(node)) {
//             nodesStack.push(node.expression)
//         } else if (isCallExpression(node)) {
//             nodesStack.push(...node.arguments)
//         } else if (isArrowFunctionExpression(node)) {
//             nodesStack.push(node.body)
//         } else if (isBlockStatement(node)) {
//             nodesStack.push(...node.body)
//         } else {
//             continue;
//         }
//     }
//     return resultExpressions; 
// }
const handleJSXTemplElement = (path, state) => {
};
const handleJSXLnElement = (path, state) => {
};
const handleJSXIndentElement = (path, state) => {
};
const handleJSXCbElement = (path, state) => {
};
exports.handlers = {};
exports.jsxHandlers = {
    'templ': handleJSXTemplElement,
    'indent': handleJSXIndentElement,
    'ln': handleJSXLnElement,
    'cb': handleJSXCbElement,
};
//# sourceMappingURL=handlers.js.map