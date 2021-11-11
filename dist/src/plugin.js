"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSXTPlugin = void 0;
const visitor_1 = require("./visitor");
function TSXTPlugin(_context) {
    return { visitor: (0, visitor_1.visitorFactory)() };
}
exports.TSXTPlugin = TSXTPlugin;
exports.default = TSXTPlugin;
//# sourceMappingURL=plugin.js.map