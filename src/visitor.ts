import { Node, NodePath, Visitor } from "@babel/core"
import { BinaryExpression, binaryExpression, Expression, expressionStatement, ExpressionStatement, isArrowFunctionExpression, isExpression, isJSXElement, isJSXEmptyExpression, isJSXExpressionContainer, JSXElement, jSXExpressionContainer, JSXExpressionContainer, ReturnStatement, returnStatement, stringLiteral } from "@babel/types";
import { VisitorState } from ".";
import { UnexpectedType } from "./errors";
import { getJSXElementName } from "./helpers";
import { TagName } from "./tags";

export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: VisitorState) => void;

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
    path.replaceWith(jSXExpressionContainer(stringLiteral('')))
}

const handleJSXIndentElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

const handleJSXCbElement = (path: NodePath<JSXElement>, state: VisitorState) => {
}

export const handlers: Record<TagName, Handler<JSXElement>> = {
    'templ': handleJSXTemplElement,
    'indent': handleJSXIndentElement,
    'ln': handleJSXLnElement,
    'cb': handleJSXCbElement,
};

const visitor: Visitor<VisitorState> = {
    JSXElement: {
        enter: (path: NodePath<JSXElement>, state: VisitorState) => {
            const name = getJSXElementName(path) as TagName;

            if (name !== 'templ' && name in handlers) {
                handlers[name](path as NodePath<JSXElement>, state);
            }
        },
        exit: (path: NodePath<JSXElement>, state: VisitorState) => {
            const name = getJSXElementName(path) as TagName;

            if (name === 'templ') {
                try {
                    handleJSXTemplElement(path as NodePath<JSXElement>, state);
                } catch (e) {
                    if (e instanceof TypeError) {
                        throw new UnexpectedType(path as NodePath<Node>, e);
                    }

                    throw e;
                }
            }
        }
    }
}

export default visitor;