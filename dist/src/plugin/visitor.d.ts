import { Node, NodePath, Visitor } from "@babel/core";
import { JSXElement } from "@babel/types";
import { TSXTPluginOptions } from "./";
export type Handler<TNode extends Node> = (path: NodePath<TNode>, state: TSXTPluginOptions) => void;
export declare const handlers: Record<string, Handler<JSXElement>>;
declare const visitor: Visitor<TSXTPluginOptions>;
export default visitor;
