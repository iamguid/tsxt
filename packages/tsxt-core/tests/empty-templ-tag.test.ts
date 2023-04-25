import template from "./empty-templ-tag.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
