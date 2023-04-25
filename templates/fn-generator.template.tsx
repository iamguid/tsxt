export interface Context {
  methodName: string;
  inputType: string;
  outputType: string;
}

export const ctx: Context = {
  methodName: "hello",
  inputType: "string",
  outputType: "number",
};

export default (ctx: Context) => (
  <templ>
    {`public ${ctx.methodName}(request: ${ctx.inputType}): Promise<${ctx.outputType}> {`}
    <indent>{`return void;`}</indent>
    {`}`}
  </templ>
);
