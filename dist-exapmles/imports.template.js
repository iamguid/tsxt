"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(ctx) {
  <templ>
        {`import * as globalA from "globalA"`}
        {`import * as globalB from "globalB"`}
        {ctx.imports.map(imprt => {
      {
        `import * as ${imprt.name} from "${imprt.path}"`;
      }
    })}
    </templ>;
}