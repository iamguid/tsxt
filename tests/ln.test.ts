import template from "./ln.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
