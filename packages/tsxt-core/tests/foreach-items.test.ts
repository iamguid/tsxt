import template from "./foreach-items.template";
import { ctx } from "./foreach-items";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
