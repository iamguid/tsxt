import template from "./recursive-indent.template";

it("template generates correctly", () => {
  const result = template("World");
  expect(result).toMatchSnapshot();
});
