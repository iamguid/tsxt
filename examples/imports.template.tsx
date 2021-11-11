import { ImportsExample } from "./imports";

export default function(ctx: ImportsExample.Context) {
    <templ>
        {`import * as globalA from "globalA"`}
        {`import * as globalB from "globalB"`}
        {ctx.imports.map(imprt => {
            {`import * as ${imprt.name} from "${imprt.path}"`}
        })}
    </templ>
}