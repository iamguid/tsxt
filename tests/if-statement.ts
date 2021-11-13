import "../src/index";
import template from "./if-statement.template";

export type Context = Array<boolean>;

export const ctx: Context = [true, false, false, true, true];

function main() {
  const result = template(ctx);
  console.log(result);
}

main();
