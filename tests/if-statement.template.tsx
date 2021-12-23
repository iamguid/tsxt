import "../dist-lib/src/index";
import { Context } from "./if-statement";

export default (ctx: Context) => (
  <templ>{ctx.map((item) => (item ? ":)" : ":(")).join(" | ")}</templ>
);
