import template, { ctx } from "../compiled-templates/foreach-items.template";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
