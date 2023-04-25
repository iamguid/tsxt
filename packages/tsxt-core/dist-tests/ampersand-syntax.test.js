"use strict";

var _ampersandSyntax = _interopRequireDefault(require("./ampersand-syntax.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _ampersandSyntax.default)();
  expect(result).toMatchSnapshot();
});