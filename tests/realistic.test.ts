import template, { ctx } from "../compiled-templates/realistic.template";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
