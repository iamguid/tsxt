import { JSXIdentifier, JSXMemberExpression, JSXNamespacedName } from "@babel/types";
export declare function getJSXElementName(node: JSXIdentifier | JSXNamespacedName | JSXMemberExpression): string;
