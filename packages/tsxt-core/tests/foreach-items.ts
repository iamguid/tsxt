import template from "./foreach-items.template";

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

function main() {
  const result = template(ctx);
  console.log(result);
}

main();
