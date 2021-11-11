import { NodePath } from '@babel/traverse';
import { JSXElement, Node } from '@babel/types';
import { TagName } from './tags';
import { VisitorState } from './visitor';
export declare type Handler<TNode extends Node> = (path: NodePath<TNode>, state: VisitorState) => void;
export declare const handlers: Partial<Record<Node['type'], Handler<Node>>>;
export declare const jsxHandlers: Record<TagName, Handler<JSXElement>>;
