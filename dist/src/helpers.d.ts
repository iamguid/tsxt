import { NodePath } from "@babel/traverse";
import { Node } from "@babel/types";
export declare function getJSXElementName(node: NodePath<any> | Node): string;
export declare function getDataForScope(path: NodePath, key?: string): any;
export declare function getNodePathErrorMessage(nodePath: NodePath, err?: TypeError): string;
