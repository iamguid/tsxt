import template from "../compiled-templates/literals.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
