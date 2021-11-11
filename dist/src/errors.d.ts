import { NodePath } from '@babel/traverse';
export declare class UnexpectedType extends TypeError {
    readonly nodePath: NodePath;
    readonly innerError: TypeError;
    constructor(nodePath: NodePath, innerError: TypeError);
}
