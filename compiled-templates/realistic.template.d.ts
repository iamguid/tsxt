export interface Import {
    name: string;
    path: string;
}
export interface Method {
    isServerStreaming: boolean;
    methodName: string;
    inputType: string;
    outputType: string;
}
export interface Client {
    interfaceClassName: string;
    clientClassName: string;
    methods: Method[];
}
export interface Context {
    imports: Import[];
    clients: Client[];
}
export declare const ctx: Context;
declare const _default: (ctx: Context) => any;
export default _default;
