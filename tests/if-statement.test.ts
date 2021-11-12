import template from "./if-statement.template";
import { ctx } from "./if-statement";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
