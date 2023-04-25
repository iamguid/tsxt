import template from "../compiled-templates/custom-element-with-children.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
