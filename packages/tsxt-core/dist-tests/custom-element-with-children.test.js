"use strict";

var _customElementWithChildren = _interopRequireDefault(require("./custom-element-with-children.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _customElementWithChildren.default)();
  expect(result).toMatchSnapshot();
});