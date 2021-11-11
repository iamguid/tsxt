"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
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
exports.default = default_1;
//# sourceMappingURL=imports.template.jsx.map