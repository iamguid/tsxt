"use strict";

var _indent = _interopRequireDefault(require("./indent.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _indent.default)();
  expect(result).toMatchSnapshot();
});