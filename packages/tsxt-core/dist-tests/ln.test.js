"use strict";

var _ln = _interopRequireDefault(require("./ln.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _ln.default)();
  expect(result).toMatchSnapshot();
});