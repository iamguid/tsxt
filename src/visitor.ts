import { Node, NodePath, Visitor } from "@babel/core"
import { BinaryExpression, binaryExpression, callExpression, Expression, identifier, isExpression, isJSXExpressionContainer, JSXElement, JSXExpressionContainer, jsxExpressionContainer, memberExpression, stringLiteral } from "@babel/types";
import { TSXTOptions, TSXTPluginOptions } from "./";
import { getJSXElementName } from "./helpers";

export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: TSXTPluginOptions) => void;

let indent = 0;

const makeExpression = (path: NodePath<JSXElement>, state: TSXTPluginOptions): Expression => {
    const resultObjects: { expression: Expression, hasIndent: boolean }[] = path.node.children
        .map((child, i) => {
            const hasIndent = Boolean((path.get(`children.${i}`) as NodePath<Node>).getData('hasIndent'));

            return {
                child,
                hasIndent
            };
        })
        .filter(obj => {
            return isJSXExpressionContainer(obj.child);
        })
        .map(obj => {
            return {
                expression: (obj.child as JSXExpressionContainer).expression as Expression,
                hasIndent: obj.hasIndent
            }
        });

    let resultExpression: BinaryExpression | Expression = stringLiteral('');

    const indentSymbol = state.opts.indentType == 'space' ? String.fromCharCode(160) : String.fromCharCode(9);
    const symbols = indentSymbol.repeat(indent * state.opts.indentSize);

    for (const obj of resultObjects) {

        const spased = obj.hasIndent || indent === 0 
            ? obj.expression 
            : binaryExpression("+", stringLiteral(symbols), obj.expression);

        const expr = binaryExpression("+", resultExpression, spased);
        const lined = binaryExpression("+", expr, stringLiteral("\n"));

        resultExpression = lined;
    }

    return resultExpression;
}

const handleJSXTemplElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(callExpression(memberExpression(resultExpression, identifier("trim")), []))
}

const handleJSXLnElementEnter = (path: NodePath<JSXElement>) => {
    path.replaceWith(jsxExpressionContainer(stringLiteral('')))
}

const handleJSXIndentElementEnter = (path: NodePath<JSXElement>) => {
    indent++;
}

const handleJSXIndentElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(jsxExpressionContainer(resultExpression));
    path.setData('hasIndent', true);
    indent--;
}

const handleJSXCbElementEnter = (path: NodePath<JSXElement>) => {
    indent++;
}

const handleJSXCbElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(jsxExpressionContainer(resultExpression));
    path.setData('hasIndent', true);
    indent--;
}

export const handlers: Record<string, Handler<JSXElement>> = {
    'templ.exit': handleJSXTemplElementExit,
    'indent.enter': handleJSXIndentElementEnter,
    'indent.exit': handleJSXIndentElementExit,
    'ln.enter': handleJSXLnElementEnter,
    'cb.enter': handleJSXCbElementEnter,
    'cb.exit': handleJSXCbElementExit,
};

const visitor: Visitor<TSXTPluginOptions> = {
    JSXElement: {
        enter: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
            const name = `${getJSXElementName(path)}.enter`;

            if (name in handlers) {
                handlers[name](path as NodePath<JSXElement>, state);
            }
        },
        exit: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
            const name = `${getJSXElementName(path)}.exit`;

            if (name in handlers) {
                handlers[name](path as NodePath<JSXElement>, state);
            }
        }
    }
}

export default visitor;