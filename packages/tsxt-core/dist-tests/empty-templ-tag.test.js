"use strict";

var _emptyTemplTag = _interopRequireDefault(require("./empty-templ-tag.template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _emptyTemplTag.default)();
  expect(result).toMatchSnapshot();
});