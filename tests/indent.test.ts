import template from "../compiled-templates/indent.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
