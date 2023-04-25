import template, { ctx } from "../compiled-templates/fn-generator.template";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
