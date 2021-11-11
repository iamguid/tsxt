import { NodePath } from '@babel/traverse';
import { ArrayExpression, binaryExpression, BinaryExpression, emptyStatement, Expression, expressionStatement, ExpressionStatement, isArrowFunctionExpression, isBlockStatement, isCallExpression, isExpression, isExpressionStatement, isJSXElement, isJSXExpressionContainer, isJSXText, isTemplateLiteral, JSXElement, JSXExpressionContainer, Node, returnStatement, stringLiteral, TemplateLiteral } from '@babel/types';
import { isArrowFunction, isJsxText } from 'typescript';
import { TagName } from './tags';
import { VisitorState } from './visitor';

export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: VisitorState) => void;

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


const handleJSXTemplElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

const handleJSXLnElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

const handleJSXIndentElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

const handleJSXCbElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

export const handlers: Partial<Record<Node['type'], Handler<Node>>> = {};

export const jsxHandlers: Record<TagName, Handler<JSXElement>> = {
    'templ': handleJSXTemplElement,
    'indent': handleJSXIndentElement,
    'ln': handleJSXLnElement,
    'cb': handleJSXCbElement,
};
