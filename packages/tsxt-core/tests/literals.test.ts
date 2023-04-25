import template from "./literals.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
