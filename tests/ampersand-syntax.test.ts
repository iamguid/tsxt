import template from "./ampersand-syntax.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
