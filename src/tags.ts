import { NodePath } from '@babel/traverse';
import { getJSXElementName } from './helpers';

export type TagName 
    = 'template'
    | 'ln'
    | 'indent'

export function isTemplateElement(node: NodePath) {
    return getJSXElementName(node) === 'Template';
}

export function isLnElement(node: NodePath) {
    getJSXElementName(node) === 'Ln';
}

export function isIndentElement(node: NodePath) {
    getJSXElementName(node) === 'Indent';
}
