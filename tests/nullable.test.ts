import nullTemplate from "../compiled-templates/null.template";
import undefinedTemplate from "../compiled-templates/undefined.template";
import nanTemplate from "../compiled-templates/nan.template";

it("template throw error", () => {
  expect(() => nullTemplate()).toThrowError();
  expect(() => undefinedTemplate()).toThrowError();
  expect(() => nanTemplate()).toThrowError();
});
