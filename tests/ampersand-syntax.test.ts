import template from "../compiled-templates/ampersand-syntax.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
