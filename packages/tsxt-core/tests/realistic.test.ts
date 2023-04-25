import template from "./realistic.template";
import { ctx } from "./realistic";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
