import { Node, NodePath, Visitor } from "@babel/core"
import { BinaryExpression, binaryExpression, callExpression, Expression, Identifier, identifier, isExpression, isJSXElement, isJSXEmptyExpression, isJSXExpressionContainer, isJSXFragment, isJSXSpreadAttribute, isStringLiteral, JSXElement, JSXExpressionContainer, jsxExpressionContainer, memberExpression, objectExpression, objectPattern, objectProperty, ObjectProperty, StringLiteral, stringLiteral } from "@babel/types";
import { symbolName } from "typescript";
import { TSXTOptions, TSXTPluginOptions } from "./";
import { getJSXElementName } from "./helpers";

export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: TSXTPluginOptions) => void;

let indent = 0;

interface ConcationationExpression {
    expression: Expression;
    hasIndent: boolean;
    noNewline: boolean;
}

interface ObjectArgs {
    name: string,
    value: (StringLiteral | Expression)
}

const makeExpression = (path: NodePath<JSXElement>, state: TSXTPluginOptions): Expression => {
    const resultObjects: ConcationationExpression[] = path.node.children
        .map((child, i) => {
            const childPath = path.get(`children.${i}`) as NodePath<Node>;
            const hasIndent = Boolean(childPath.getData('hasIndent'));
            const noNewline = Boolean(childPath.getData('noNewline'));

            return {
                child,
                hasIndent,
                noNewline
            };
        })
        .filter(obj => {
            return isJSXExpressionContainer(obj.child);
        })
        .map(obj => {
            return {
                expression: (obj.child as JSXExpressionContainer).expression as Expression,
                hasIndent: obj.hasIndent,
                noNewline: obj.noNewline
            }
        });

    let resultExpression: BinaryExpression | Expression = stringLiteral('');

    const indentSymbol = state.opts.indentType == 'space' ? String.fromCharCode(160) : String.fromCharCode(9);
    const symbols = indentSymbol.repeat(indent * state.opts.indentSize);

    resultObjects.forEach((obj, i) => {
        const spased = obj.hasIndent || indent === 0 
            ? obj.expression 
            : binaryExpression("+", stringLiteral(symbols), obj.expression);

        const lined = obj.noNewline || i == 0
            ? spased
            : binaryExpression("+", stringLiteral("\n"), spased);

        const expr = binaryExpression("+", resultExpression, lined);

        resultExpression = expr;
    })

    return resultExpression;
}

const handleJSXTemplElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(resultExpression)
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

    const nodesPaths = path.replaceWithMultiple([
        jsxExpressionContainer(stringLiteral(" " + state.opts.codeblockStart)),
        jsxExpressionContainer(resultExpression),
        jsxExpressionContainer(stringLiteral(state.opts.codeblockEnd)),
    ]);

    nodesPaths[0].setData('noNewline', true);
    nodesPaths[0].setData('hasIndent', true);
    nodesPaths[1].setData('hasIndent', true);

    indent--;
}

const handleJSXCustomElementEnter = (path: NodePath<JSXElement>) => {
    const params: ObjectArgs[] = path.node.openingElement.attributes
        .map(attr => {
            if (isJSXSpreadAttribute(attr)) {
                throw new Error('TSXT does not support spread attributes')
            }

            if (isJSXElement(attr.value)) {
                throw new Error('TSXT does not support JSX elements')
            }

            if (isJSXFragment(attr.value)) {
                throw new Error('TSXT does not support JSX fragments')
            }

            if (isJSXElement(attr.value)) {
                throw new Error('TSXT does not support JSX elements')
            }

            const name = attr.name.name as string;

            if (isStringLiteral(attr.value)) {
                return { name, value: attr.value };
            }

            if (isJSXExpressionContainer(attr.value)) {
                if (isJSXEmptyExpression(attr.value.expression)) {
                    throw new Error('TSXT does not support empty expressions')
                }

                return { name, value: attr.value.expression };
            }

            throw new Error(`TSXT does not support ${attr.type}`)
        });

    const objectProperties: ObjectProperty[] = params.map(param => {
        return objectProperty(stringLiteral(param.name), param.value)
    })
    const object = objectExpression(objectProperties);

    const elementName = getJSXElementName(path);
    path.replaceWith(jsxExpressionContainer(callExpression(identifier(elementName), [object])));
}

const handleJSXCustomElementExit = (path: NodePath<JSXElement>) => {
    console.log("YEY exit", getJSXElementName(path))
}

export const handlers: Record<string, Handler<JSXElement>> = {
    'templ.enter': () => undefined,
    'templ.exit': handleJSXTemplElementExit,
    'indent.enter': handleJSXIndentElementEnter,
    'indent.exit': handleJSXIndentElementExit,
    'ln.enter': handleJSXLnElementEnter,
    'cb.enter': handleJSXCbElementEnter,
    'cb.exit': handleJSXCbElementExit,
    'custom.enter': handleJSXCustomElementEnter,
    'custom.exit': handleJSXCustomElementEnter,
};

const visitor: Visitor<TSXTPluginOptions> = {
    JSXElement: {
        enter: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
            const name = `${getJSXElementName(path)}.enter`;

            if (name in handlers) {
                handlers[name](path as NodePath<JSXElement>, state);
            } else {
                handlers['custom.enter'](path as NodePath<JSXElement>, state);
            }
        },
        exit: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
            const name = `${getJSXElementName(path)}.exit`;

            if (name in handlers) {
                handlers[name](path as NodePath<JSXElement>, state);
            } else {
                handlers['custom.exit'](path as NodePath<JSXElement>, state);
            }
        }
    }
}

export default visitor;