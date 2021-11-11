import * as babel from '@babel/core';
export interface TransformerOptions {
    plugins: babel.PluginObj<any>[];
}
export declare function compile(fileName: string, options?: Partial<TransformerOptions>): void;
