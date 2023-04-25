"use strict";

var _customElementWithArgs = _interopRequireDefault(require("./custom-element-with-args.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _customElementWithArgs.default)();
  expect(result).toMatchSnapshot();
});