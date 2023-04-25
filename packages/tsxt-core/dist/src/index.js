"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const visitor_1 = __importDefault(require("./visitor"));
exports.defaultOptions = {
    indentType: "space",
    indentSize: 4,
};
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.default = (0, helper_plugin_utils_1.declare)((api) => {
    api.assertVersion(7);
    const pluginObj = {
        name: "TSXT",
        visitor: visitor_1.default,
    };
    return pluginObj;
});
//# sourceMappingURL=index.js.map