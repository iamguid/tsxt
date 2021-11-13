import { Node, NodePath, Visitor } from "@babel/core";
import {
  arrayExpression,
  BinaryExpression,
  binaryExpression,
  callExpression,
  Expression,
  identifier,
  isBinaryExpression,
  isExpression,
  isJSXElement,
  isJSXEmptyExpression,
  isJSXExpressionContainer,
  isJSXFragment,
  isJSXSpreadAttribute,
  isStringLiteral,
  JSXElement,
  JSXExpressionContainer,
  jsxExpressionContainer,
  nullLiteral,
  ObjectExpression,
  objectExpression,
  objectProperty,
  StringLiteral,
  stringLiteral,
} from "@babel/types";
import { TSXTPluginOptions } from "./";
import { getJSXElementName } from "./helpers";

export type Handler<TNode extends Node> = (
  path: NodePath<TNode>,
  state: TSXTPluginOptions
) => void;

let indent = 0;

interface ObjectArgs {
  name: string;
  value: StringLiteral | Expression;
}

const buildResultExpression = (
  path: NodePath<JSXElement>,
  state: TSXTPluginOptions
): Expression => {
  const concationationExpressions = path.node.children
    .filter((child) => isJSXExpressionContainer(child))
    .map((child) => child as JSXExpressionContainer)
    .filter((child) => isExpression(child.expression));

  let resultExpression: BinaryExpression | Expression = stringLiteral("");

  const indentSymbol =
    state.opts.indentType === "space"
      ? String.fromCharCode(160)
      : String.fromCharCode(9);

  const symbols = indentSymbol.repeat(indent * state.opts.indentSize);

  concationationExpressions.forEach((expr) => {
    const isLiteral =
      expr.expression.type === "TemplateLiteral" ||
      expr.expression.type === "StringLiteral";

    const spased = isLiteral ? stringLiteral(symbols) : stringLiteral("");

    const binaryExpr = binaryExpression(
      "+",
      spased,
      expr.expression as Expression
    );

    const lined = isLiteral
      ? binaryExpression("+", binaryExpr, stringLiteral("\n"))
      : binaryExpr;

    resultExpression = binaryExpression("+", resultExpression, lined);
  });

  return resultExpression;
};

const handleJSXTemplElementExit = (
  path: NodePath<JSXElement>,
  state: TSXTPluginOptions
) => {
  const resultExpression = buildResultExpression(path, state);
  path.replaceWith(resultExpression);
};

const handleJSXLnElementEnter = (path: NodePath<JSXElement>) => {
  path.replaceWith(jsxExpressionContainer(stringLiteral("")));
};

const handleJSXIndentElementEnter = () => {
  indent++;
};

const handleJSXIndentElementExit = (
  path: NodePath<JSXElement>,
  state: TSXTPluginOptions
) => {
  const resultExpression = buildResultExpression(path, state);
  path.replaceWith(jsxExpressionContainer(resultExpression));
  indent--;
};

const handleJSXCustomElementExit = (path: NodePath<JSXElement>) => {
  const childrenArray: Expression[] = path.node.children
    .filter(
      (child) => isJSXExpressionContainer(child) || isBinaryExpression(child)
    )
    .filter((child) => {
      if (isJSXExpressionContainer(child)) {
        return isExpression((child as JSXExpressionContainer).expression);
      }

      return true;
    })
    .map((child) => {
      if (isJSXExpressionContainer(child)) {
        return (child as JSXExpressionContainer).expression as Expression;
      }

      return child as Expression;
    });

  const params: ObjectArgs[] = path.node.openingElement.attributes.map(
    (attr, index) => {
      const attrPath = path.get(
        `openingElement.attributes.${index}`
      ) as NodePath<Node>;

      if (isJSXSpreadAttribute(attr)) {
        throw attrPath.buildCodeFrameError(
          "TSXT does not support spread attributes"
        );
      }

      if (isJSXElement(attr.value)) {
        throw attrPath.buildCodeFrameError(
          "TSXT does not support JSX elements attributes"
        );
      }

      if (isJSXFragment(attr.value)) {
        throw attrPath.buildCodeFrameError(
          "TSXT does not support JSX fragments attributes"
        );
      }

      if (isJSXElement(attr.value)) {
        throw attrPath.buildCodeFrameError(
          "TSXT does not support JSX elements attributes"
        );
      }

      const name = attr.name.name as string;

      if (isStringLiteral(attr.value)) {
        return { name, value: attr.value };
      }

      if (isJSXExpressionContainer(attr.value)) {
        if (isJSXEmptyExpression(attr.value.expression)) {
          return { name, value: nullLiteral() };
        }

        return { name, value: attr.value.expression };
      }

      throw attrPath.buildCodeFrameError(
        `TSXT does not support ${attr.type} attributes`
      );
    }
  );

  const paramsObjectExpression: ObjectExpression = objectExpression(
    params.map((param) => {
      return objectProperty(stringLiteral(param.name), param.value);
    })
  );

  const childrenArrayExpression = arrayExpression(childrenArray);

  const elementName = getJSXElementName(path);

  path.replaceWith(
    jsxExpressionContainer(
      callExpression(identifier(elementName), [
        paramsObjectExpression,
        childrenArrayExpression,
      ])
    )
  );
};

export const handlers: Record<string, Handler<JSXElement>> = {
  "templ.enter": () => undefined,
  "templ.exit": handleJSXTemplElementExit,
  "indent.enter": handleJSXIndentElementEnter,
  "indent.exit": handleJSXIndentElementExit,
  "ln.enter": handleJSXLnElementEnter,
  "ln.exit": () => undefined,
  "cb.enter": () => undefined,
  "cb.exit": () => undefined,
  "custom.enter": () => undefined,
  "custom.exit": handleJSXCustomElementExit,
};

const visitor: Visitor<TSXTPluginOptions> = {
  JSXElement: {
    enter: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
      const name = `${getJSXElementName(path)}.enter`;

      if (name in handlers) {
        handlers[name](path as NodePath<JSXElement>, state);
      } else {
        handlers["custom.enter"](path as NodePath<JSXElement>, state);
      }
    },
    exit: (path: NodePath<JSXElement>, state: TSXTPluginOptions) => {
      const name = `${getJSXElementName(path)}.exit`;

      if (name in handlers) {
        handlers[name](path as NodePath<JSXElement>, state);
      } else {
        handlers["custom.exit"](path as NodePath<JSXElement>, state);
      }
    },
  },
};

export default visitor;
