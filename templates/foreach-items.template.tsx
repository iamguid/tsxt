export interface Item {
  name: string;
  value: number;
}

export interface Context {
  items: Item[];
}

export const ctx: Context = {
  items: [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
    { name: "c", value: 3 },
  ],
};

export default (ctx: Context) => (
  <templ>
    {ctx.items.map((item) => (
      <templ>{`item "${item.name}" has value "${item.value}";`}</templ>
    ))}
  </templ>
);
