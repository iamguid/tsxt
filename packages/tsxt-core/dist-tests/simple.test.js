"use strict";

var _simple = _interopRequireDefault(require("./simple.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _simple.default)("World");
  expect(result).toMatchSnapshot();
});