import template from "../compiled-templates/import.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
