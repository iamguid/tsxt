"use strict";

var _array = _interopRequireDefault(require("./array.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _array.default)();
  expect(result).toMatchSnapshot();
});