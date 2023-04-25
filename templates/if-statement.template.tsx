export type Context = Array<boolean>;

export const ctx: Context = [true, false, false, true, true];

export default (ctx: Context) => (
  <templ>{ctx.map((item) => (item ? ":)" : ":(")).join(" | ")}</templ>
);
