"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorFactory = void 0;
const errors_1 = require("./errors");
const helpers_1 = require("./helpers");
const handlers_1 = require("./handlers");
function visitorFactory() {
    return Object.assign(handlers_1.handlers, {
        'JSXElement': (path, state) => {
            const name = (0, helpers_1.getJSXElementName)(path);
            console.warn(name);
            if (!(name in handlers_1.jsxHandlers)) {
                return;
            }
            try {
                const handler = handlers_1.jsxHandlers[name];
                handler(path, state);
                return;
            }
            catch (e) {
                if (e instanceof TypeError) {
                    throw new errors_1.UnexpectedType(path, e);
                }
                throw e;
            }
        }
    });
}
exports.visitorFactory = visitorFactory;
//# sourceMappingURL=visitor.js.map