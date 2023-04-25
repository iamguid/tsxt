import template from "../compiled-templates/empty-templ-tag.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
