import template from "./nested-call.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
