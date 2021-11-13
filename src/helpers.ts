import { isJSXIdentifier, isJSXNamespacedName, JSXElement } from "@babel/types";

export function getJSXElementName(node: JSXElement): string {
  const nameNode = node.openingElement.name;

  if (isJSXIdentifier(nameNode)) {
    return nameNode.name;
  } else if (isJSXNamespacedName(nameNode)) {
    return `${nameNode.namespace.name}.${nameNode.name}`;
  } else {
    throw new Error(`type ${nameNode.type} not supported in jsx`);
  }
}
