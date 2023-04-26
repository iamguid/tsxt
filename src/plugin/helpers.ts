import {
  isJSXIdentifier,
  isJSXNamespacedName,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
} from "@babel/types";

export function getJSXElementName(
  node: JSXIdentifier | JSXNamespacedName | JSXMemberExpression
): string {
  if (isJSXIdentifier(node)) {
    return node.name;
  } else if (isJSXNamespacedName(node)) {
    return `${node.namespace.name}.${node.name}`;
  } else if (isJSXIdentifier(node.object) && isJSXIdentifier(node.property)) {
    return `${node.object.name}.${node.property.name}`;
  }

  throw new Error(`Unsupported syntax`);
}
