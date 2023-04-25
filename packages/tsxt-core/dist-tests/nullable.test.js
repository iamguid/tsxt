"use strict";

var _null = _interopRequireDefault(require("./null.template"));
var _undefined = _interopRequireDefault(require("./undefined.template"));
var _nan = _interopRequireDefault(require("./nan.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template throw error", () => {
  expect(() => (0, _null.default)()).toThrowError();
  expect(() => (0, _undefined.default)()).toThrowError();
  expect(() => (0, _nan.default)()).toThrowError();
});