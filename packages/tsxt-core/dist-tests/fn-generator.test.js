"use strict";

var _fnGenerator = _interopRequireDefault(require("./fn-generator.template"));
var _fnGenerator2 = require("./fn-generator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _fnGenerator.default)(_fnGenerator2.ctx);
  expect(result).toMatchSnapshot();
});