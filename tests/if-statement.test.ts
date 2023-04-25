import template, { ctx } from "../compiled-templates/if-statement.template";

it("template generates correctly", () => {
  const result = template(ctx);
  expect(result).toMatchSnapshot();
});
