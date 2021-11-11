"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const fs = __importStar(require("fs"));
const babel = __importStar(require("@babel/core"));
const plugin_syntax_jsx_1 = __importDefault(require("@babel/plugin-syntax-jsx"));
const preset_typescript_1 = __importDefault(require("@babel/preset-typescript"));
const plugin_1 = require("./plugin");
const defaultOptions = {
    plugins: []
};
function compile(fileName, options = {}) {
    const _options = Object.assign(Object.assign({}, defaultOptions), options);
    const opts = Object.assign(Object.assign({}, defaultOptions), { indentType: 'space', indentSize: 4 });
    const transformResult = babel.transformFileSync(fileName, {
        ast: true,
        presets: [
            preset_typescript_1.default
        ],
        plugins: [
            plugin_syntax_jsx_1.default,
            [plugin_1.TSXTPlugin, opts],
            ..._options.plugins
        ]
    });
    if (transformResult === null || transformResult === void 0 ? void 0 : transformResult.code) {
        fs.writeFileSync(`${fileName}.js`, transformResult.code);
    }
}
exports.compile = compile;
//# sourceMappingURL=index.js.map