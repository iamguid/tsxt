"use strict";

var _nestedCall = _interopRequireDefault(require("./nested-call.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _nestedCall.default)();
  expect(result).toMatchSnapshot();
});