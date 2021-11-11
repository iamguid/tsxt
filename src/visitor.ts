import { Node, NodePath, Visitor } from "@babel/core"
import { BinaryExpression, binaryExpression, Expression, expressionStatement, ExpressionStatement, isArrowFunctionExpression, isExpression, isJSXEmptyExpression, isJSXExpressionContainer, JSXElement, JSXExpressionContainer, ReturnStatement, returnStatement, stringLiteral } from "@babel/types";
import { VisitorState } from ".";
import { UnexpectedType } from "./errors";
import { getJSXElementName } from "./helpers";
import { TagName } from "./tags";

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
    const resultNodes: Expression[] = (path.node.children as JSXExpressionContainer[])
        .filter(child => {
            return isJSXExpressionContainer(child);
        })
        .map(child => {
            return child.expression
        })
        .filter(expr => {
            return isExpression(expr);
        }) as Expression[];

    let resultBinaryExpression: BinaryExpression | Expression = stringLiteral('');

    for (const node of resultNodes) {
        resultBinaryExpression = binaryExpression("+", binaryExpression("+", resultBinaryExpression, node), stringLiteral("\n"));
    }

    path.replaceWith(resultBinaryExpression)
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

const visitor: Visitor<VisitorState> = {
    JSXElement: (path: NodePath<JSXElement>, state: VisitorState) => {
        const name = getJSXElementName(path) as TagName;

        try {
            if (!(name in jsxHandlers)) {
                return;
            }

            jsxHandlers[name](path, state);
            
            return;
        } catch (e) {
            if (e instanceof TypeError) {
                throw new UnexpectedType(path as NodePath<Node>, e);
            }

            throw e;
        }
    }

}

export default visitor;