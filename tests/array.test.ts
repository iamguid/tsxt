import template from "../compiled-templates/array.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
