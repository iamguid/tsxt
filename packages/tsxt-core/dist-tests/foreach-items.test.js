"use strict";

var _foreachItems = _interopRequireDefault(require("./foreach-items.template"));
var _foreachItems2 = require("./foreach-items");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
it("template generates correctly", () => {
  const result = (0, _foreachItems.default)(_foreachItems2.ctx);
  expect(result).toMatchSnapshot();
});