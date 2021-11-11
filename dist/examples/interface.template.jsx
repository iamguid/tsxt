"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    <templ>
    {`import * as globalA from "globalA"`}
    {`import * as globalB from "globalB"`}

    {ctx.interfaces.map((iface) => {
            {
                `export interface ${iface.className}`;
            }
            <cb>
        {iface.methods.map((method) => {
                    {
                        `${method.methodName}: (arg: ${method.inputType}) => ${method.outputType}`;
                    }
                })}
      </cb>;
        })}
  </templ>;
}
exports.default = default_1;
//# sourceMappingURL=interface.template.jsx.map