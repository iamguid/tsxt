import template from "./custom-element-with-args.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
