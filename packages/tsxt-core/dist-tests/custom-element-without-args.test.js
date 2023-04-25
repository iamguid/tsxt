"use strict";

var _customElementWithoutArgs = _interopRequireDefault(require("./custom-element-without-args.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _customElementWithoutArgs.default)();
  expect(result).toMatchSnapshot();
});