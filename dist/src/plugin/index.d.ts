import * as babel from "@babel/core";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            templ: object;
            indent: object;
            ln: object;
        }
    }
}
export type TSXTTagName = "templ" | "ln" | "indent";
export interface TSXTOptions {
    indentType: "space" | "tab";
    indentSize: number;
}
export interface TSXTPluginOptions extends babel.PluginPass {
    opts: TSXTOptions;
}
export declare const defaultOptions: TSXTOptions;
declare const _default: (api: object, options: TSXTPluginOptions | null | undefined, dirname: string) => babel.PluginObj<any>;
export default _default;
