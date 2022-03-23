import template from "./fn-generator.template";

export interface Context {
  methodName: string;
  inputType: string;
  outputType: string;
}

export const ctx: Context = {
    methodName: 'hello',
    inputType: 'string',
    outputType: 'number'
};

function main() {
  const result = template(ctx);
  console.log(result);
}

main();
