import { NodePath } from '@babel/traverse';
import { getJSXElementName } from './helpers';

export type TagName 
    = 'template'
    | 'ln'
    | 'indent'

export function template(props: { value: any; }): any {
    return null;
}

export function isTemplateElement(node: NodePath) {
    return getJSXElementName(node) === 'template';
}

export function ln() {
    return null;
}

export function isLnElement(node: NodePath) {
    getJSXElementName(node) === 'ln';
}

export function indent() {
    return null;
}

export function isIndentElement(node: NodePath) {
    getJSXElementName(node) === 'indent';
}
