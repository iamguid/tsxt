import { InterfaceExample } from "./interface";

export default function (ctx: InterfaceExample.Context) {
  return (
    <templ>
      {`import * as globalA from "globalA"`}
      {`import * as globalB from "globalB"`}

      {ctx.interfaces.map((iface) => {
        {`export interface ${iface.className}`}
        <cb>
          {iface.methods.map((method) => (
            <templ>
              {`${method.name}: (arg: ${method.inputType}) => ${method.outputType}`}
            </templ>
          )).join('')}
        </cb>;
      })}
    </templ>
  )
}
