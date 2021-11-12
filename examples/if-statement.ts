import template from "./if-statement.template";

export type Context = Array<boolean>;

function main() {
  const ctx: Context = [true, false, false, true, true];
  const result = template(ctx);
  console.log(result);
}

main();
