import template from "../compiled-templates/simple.template";

it("template generates correctly", () => {
  const result = template({ hello: "World" });
  expect(result).toMatchSnapshot();
});
