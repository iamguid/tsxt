import { NodePath } from '@babel/traverse';
export declare type TagName = 'templ' | 'ln' | 'indent' | 'cb';
export declare function isTemplElement(node: NodePath): boolean;
export declare function isLnElement(node: NodePath): void;
export declare function isIndentElement(node: NodePath): void;
export declare function isCbElement(node: NodePath): void;
