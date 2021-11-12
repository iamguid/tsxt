import iface from "./interface.template";

export namespace InterfaceExample {
  export interface Iface {
    className: string;
    methods: Method[];
  }
  export interface Method {
    name: string;
    inputType: string;
    outputType: string;
  }

  export interface Context {
    interfaces: Iface[];
  }
}

function main() {
  const ctx: InterfaceExample.Context = {
    interfaces: [
      {
        className: "IA",
        methods: [{ name: "something", inputType: "any", outputType: "any" }],
      },
      {
        className: "IB",
        methods: [{ name: "something", inputType: "any", outputType: "any" }],
      },
    ],
  };

  const result = iface(ctx);
  console.log(result);
}

main();
