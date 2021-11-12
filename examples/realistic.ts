import template from "./realistic.template";

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

function main() {
  const ctx: Context = {
    imports: [
      { name: "a", path: "./a" },
      { name: "b", path: "./b" },
      { name: "c", path: "./c" },
    ],

    clients: [
      {
        clientClassName: "SomeClassName",
        interfaceClassName: "ISomeClassName",
        methods: [
          {
            isServerStreaming: true,
            methodName: "methodA",
            inputType: "InputType",
            outputType: "OutputType",
          },
          {
            isServerStreaming: false,
            methodName: "methodB",
            inputType: "InputType",
            outputType: "OutputType",
          },
        ],
      },
    ],
  };

  const result = template(ctx);
  console.log(result);
}

main();
