import template from "../compiled-templates/ln.template";

it("template generates correctly", () => {
  const result = template();
  expect(result).toMatchSnapshot();
});
