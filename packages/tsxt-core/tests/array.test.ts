import template from "./array.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
