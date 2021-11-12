import { Node, NodePath, Visitor } from "@babel/core"
import { BinaryExpression, binaryExpression, callExpression, Expression, Identifier, identifier, isExpression, isJSXElement, isJSXEmptyExpression, isJSXExpressionContainer, isJSXFragment, isJSXSpreadAttribute, isStringLiteral, JSXElement, JSXExpressionContainer, jsxExpressionContainer, memberExpression, objectExpression, objectPattern, objectProperty, ObjectProperty, StringLiteral, stringLiteral, templateElement, templateLiteral } from "@babel/types";
import { TSXTPluginOptions } from "./";
import { getJSXElementName } from "./helpers";

export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: TSXTPluginOptions) => void;

let indent = 0;

interface ConcationationExpression {
    expression: Expression;
    alreadyIndented: boolean;
}

interface ObjectArgs {
    name: string,
    value: (StringLiteral | Expression)
}

const makeExpression = (path: NodePath<JSXElement>, state: TSXTPluginOptions): Expression => {
    const resultObjects: ConcationationExpression[] = path.node.children
        .map((child, i) => {
            const childPath = path.get(`children.${i}`) as NodePath<Node>;
            const alreadyIndented = Boolean(childPath.getData('alreadyIndented'));

            return {
                child,
                alreadyIndented,
            };
        })
        .filter(obj => {
            return isJSXExpressionContainer(obj.child);
        })
        .map(obj => {
            return {
                expression: (obj.child as JSXExpressionContainer).expression as Expression,
                alreadyIndented: obj.alreadyIndented,
            }
        });

    let resultExpression: BinaryExpression | Expression = stringLiteral('');

    const indentSymbol = state.opts.indentType == 'space' ? String.fromCharCode(160) : String.fromCharCode(9);
    const symbols = indentSymbol.repeat(indent * state.opts.indentSize);

    resultObjects.forEach(obj => {
        const addNewline = obj.expression.type === "TemplateLiteral" || obj.expression.type === "StringLiteral";

        const spase = obj.alreadyIndented
            ? stringLiteral('')
            : stringLiteral(symbols);

        const expr = binaryExpression("+", spase, obj.expression);

        const line = !addNewline
            ? expr
            : binaryExpression("+", expr, stringLiteral("\n"));

        resultExpression = binaryExpression("+", resultExpression, line);
    })

    return resultExpression;
}

const handleJSXTemplElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(resultExpression);
}

const handleJSXLnElementEnter = (path: NodePath<JSXElement>) => {
    path.replaceWith(jsxExpressionContainer(stringLiteral(''))
}

const handleJSXIndentElementEnter = (path: NodePath<JSXElement>) => {
    indent++;
}

const handleJSXIndentElementExit = (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
    const resultExpression = makeExpression(path, state);
    path.replaceWith(jsxExpressionContainer(resultExpression));
    path.setData('alreadyIndented', true);
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
    'cb.enter': () => undefined,
    'cb.exit': () => undefined,
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