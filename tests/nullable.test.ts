import nullTemplate from "./null.template";
import undefinedTemplate from "./undefined.template";
import nanTemplate from "./NaN.template";

it("template throw error", () => {
  expect(() => nullTemplate()).toThrowError();
  expect(() => undefinedTemplate()).toThrowError();
  expect(() => nanTemplate()).toThrowError();
});
