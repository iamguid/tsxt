"use strict";

var _realistic = _interopRequireDefault(require("./realistic.template"));
var _realistic2 = require("./realistic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _realistic.default)(_realistic2.ctx);
  expect(result).toMatchSnapshot();
});