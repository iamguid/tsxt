import template from "./simple.template";

it("template generates correctly", () => {
  const result = template("World");
  expect(result).toMatchSnapshot();
});
