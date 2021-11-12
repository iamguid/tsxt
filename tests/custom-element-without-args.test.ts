import template from "./custom-element-without-args.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
