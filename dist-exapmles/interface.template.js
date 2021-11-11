"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(ctx) {
  <templ>
    {`import * as globalA from "globalA"`}
    {`import * as globalB from "globalB"`}

    {ctx.interfaces.map(iface => {
      {
        `export interface ${iface.className}`;
      }
      <cb>
        {iface.methods.map(method => {
          {
            `${method.methodName}: (arg: ${method.inputType}) => ${method.outputType}`;
          }
        })}
      </cb>;
    })}
  </templ>;
}