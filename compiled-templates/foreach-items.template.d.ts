export interface Item {
    name: string;
    value: number;
}
export interface Context {
    items: Item[];
}
export declare const ctx: Context;
declare const _default: (ctx: Context) => any;
export default _default;
