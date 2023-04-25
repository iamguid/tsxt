"use strict";

var _literals = _interopRequireDefault(require("./literals.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _literals.default)();
  expect(result).toMatchSnapshot();
});