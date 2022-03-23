import "../dist-lib/src/index";
import { Context } from "./fn-generator";

export default (ctx: Context) => (
  <templ>
    {`public ${ctx.methodName}(request: ${ctx.inputType}): Promise<${ctx.outputType}> {`}
        <indent>
            {`return void;`}
        </indent>
    {`}`}
  </templ>
);
