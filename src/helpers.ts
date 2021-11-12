import { NodePath } from "@babel/traverse";
import { isJSXIdentifier, isJSXNamespacedName, JSXElement } from "@babel/types";

export function getJSXElementName(
  node: NodePath<JSXElement> | JSXElement
): string {
  if (node instanceof NodePath) {
    node = node.node;
  }

  const nameNode = node.openingElement.name;

  if (isJSXIdentifier(nameNode)) {
    return nameNode.name;
  } else if (isJSXNamespacedName(nameNode)) {
    return `${nameNode.namespace.name}.${nameNode.name}`;
  } else {
    throw new Error(`type ${nameNode.type} not supported in jsx`);
  }
}
