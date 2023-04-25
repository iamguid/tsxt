"use strict";

var _recursiveIndent = _interopRequireDefault(require("./recursive-indent.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _recursiveIndent.default)("World");
  expect(result).toMatchSnapshot();
});