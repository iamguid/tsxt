import template, { ctx } from "../dist-templates/realistic.template";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
