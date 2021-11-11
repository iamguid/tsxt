export declare namespace InterfaceExample {
    interface Iface {
        className: string;
        methods: Method[];
    }
    interface Method {
        methodName: string;
        inputType: string;
        outputType: string;
    }
    interface Context {
        interfaces: Iface[];
    }
}
