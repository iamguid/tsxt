import template from "./indent.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
