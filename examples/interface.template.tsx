import { InterfaceExample } from "./interface";

export default function (ctx: InterfaceExample.Context) {
  return (
    <templ>
      {`import * as globalA from "globalA"`}
      {`import * as globalB from "globalB"`}

      {ctx.interfaces.map((iface) => (
        <templ>
          {`export interface ${iface.className} {`}
          {iface.methods
            .map((method) => (
              <templ>
                {`${method.name}: (arg: ${method.inputType}) => ${method.outputType}`}
              </templ>
            ))
            .join("")}
          {`}`}
        </templ>
      ))}
    </templ>
  );
}
