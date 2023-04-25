import template from "./fn-generator.template";
import { ctx } from "./fn-generator";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
