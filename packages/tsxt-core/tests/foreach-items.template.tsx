import { Context } from "./foreach-items";

export default (ctx: Context) => (
  <templ>
    {ctx.items.map((item) => (
      <templ>{`item "${item.name}" has value "${item.value}";`}</templ>
    ))}
  </templ>
);
