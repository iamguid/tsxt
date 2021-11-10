import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';
import { TagName } from './tags';
import { VisitorState } from './visitor';

export type Handler = (path: NodePath<JSXElement>, state: VisitorState) => void;

const handleTemplateElement = (path: NodePath<JSXElement>, state: VisitorState) => {

}

const handleLnElement = (path: NodePath<JSXElement>, state: VisitorState) => {

}

const handleIndentElement = (path: NodePath<JSXElement>, state: VisitorState) => {

}

export const handlers = new Map<TagName, Handler>([
    ['template', handleTemplateElement],
    ['indent', handleIndentElement],
    ['ln', handleLnElement],
]);