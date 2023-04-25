"use strict";

var _ifStatement = _interopRequireDefault(require("./if-statement.template"));
var _ifStatement2 = require("./if-statement");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _ifStatement.default)(_ifStatement2.ctx);
  expect(result).toMatchSnapshot();
});