"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const template_1 = __importDefault(require("@babel/template"));
const generator_1 = __importDefault(require("@babel/generator"));
const types_1 = require("@babel/types");
const helpers_1 = require("./helpers");
const handledExpressions = [];
const buildResultExpression = (path) => {
    const concationationExpressions = path.node.children
        .filter((child) => (0, types_1.isJSXExpressionContainer)(child))
        .map((child) => child)
        .filter((child) => (0, types_1.isExpression)(child.expression));
    let resultExpression = (0, types_1.stringLiteral)("");
    concationationExpressions.forEach((expr) => {
        const isHandledExpression = handledExpressions.find((hexpr) => expr === hexpr);
        if (isHandledExpression) {
            resultExpression = (0, types_1.binaryExpression)("+", resultExpression, expr.expression);
        }
        else {
            const preparedExpr = template_1.default.ast(`(() => {
              const expr = ${(0, generator_1.default)(expr.expression).code};
              return globalThis.__tsxt__.prepareValue(expr);
            })()`).expression;
            resultExpression = (0, types_1.binaryExpression)("+", resultExpression, preparedExpr);
        }
    });
    return resultExpression;
};
const handleJSXTemplElementExit = (path) => {
    const resultExpression = buildResultExpression(path);
    handledExpressions.push(resultExpression);
    path.replaceWith(resultExpression);
};
const handleJSXLnElementEnter = (path) => {
    const resultExpression = (0, types_1.jsxExpressionContainer)((0, types_1.stringLiteral)("\n"));
    handledExpressions.push(resultExpression);
    path.replaceWith(resultExpression);
};
const handleJSXIndentElementEnter = (path) => {
    const incrementIndentTempl = template_1.default.ast(`(() => { globalThis.__tsxt__.indent++; return ""; })()`);
    const resultExpression = (0, types_1.jsxExpressionContainer)(incrementIndentTempl.expression);
    handledExpressions.push(resultExpression);
    path.node.children.unshift(resultExpression);
};
const handleJSXIndentElementExit = (path) => {
    const decrementIndentTempl = template_1.default.ast(`(() => { globalThis.__tsxt__.indent--; return ""; })()`);
    const resultExpression = buildResultExpression(path);
    const indentExpression = (0, types_1.binaryExpression)("+", resultExpression, decrementIndentTempl.expression);
    const resultExpressionContainer = (0, types_1.jsxExpressionContainer)(indentExpression);
    handledExpressions.push(resultExpressionContainer);
    path.replaceWith(resultExpressionContainer);
};
const handleJSXCustomElementExit = (path) => {
    const childrenArray = path.node.children
        .filter((child) => (0, types_1.isJSXExpressionContainer)(child) || (0, types_1.isBinaryExpression)(child))
        .filter((child) => {
        if ((0, types_1.isJSXExpressionContainer)(child)) {
            return (0, types_1.isExpression)(child.expression);
        }
        return true;
    })
        .map((child) => {
        if ((0, types_1.isJSXExpressionContainer)(child)) {
            return child.expression;
        }
        return child;
    });
    const params = path.node.openingElement.attributes.map((attr, index) => {
        const attrPath = path.get(`openingElement.attributes.${index}`);
        if ((0, types_1.isJSXSpreadAttribute)(attr)) {
            throw attrPath.buildCodeFrameError("TSXT does not support spread attributes");
        }
        if ((0, types_1.isJSXElement)(attr.value)) {
            throw attrPath.buildCodeFrameError("TSXT does not support JSX elements attributes");
        }
        if ((0, types_1.isJSXFragment)(attr.value)) {
            throw attrPath.buildCodeFrameError("TSXT does not support JSX fragments attributes");
        }
        if ((0, types_1.isJSXElement)(attr.value)) {
            throw attrPath.buildCodeFrameError("TSXT does not support JSX elements attributes");
        }
        const name = attr.name.name;
        if ((0, types_1.isStringLiteral)(attr.value)) {
            return { name, value: attr.value };
        }
        if ((0, types_1.isJSXExpressionContainer)(attr.value)) {
            if ((0, types_1.isJSXEmptyExpression)(attr.value.expression)) {
                return { name, value: (0, types_1.nullLiteral)() };
            }
            return { name, value: attr.value.expression };
        }
        throw attrPath.buildCodeFrameError(`TSXT does not support ${attr.type} attributes`);
    });
    const paramsObjectExpression = (0, types_1.objectExpression)(params.map((param) => {
        return (0, types_1.objectProperty)((0, types_1.stringLiteral)(param.name), param.value);
    }));
    const childrenArrayExpression = (0, types_1.arrayExpression)(childrenArray);
    const elementName = (0, helpers_1.getJSXElementName)(path.node);
    const resultExpression = (0, types_1.jsxExpressionContainer)((0, types_1.callExpression)((0, types_1.identifier)(elementName), [
        paramsObjectExpression,
        childrenArrayExpression,
    ]));
    handledExpressions.push(resultExpression);
    path.replaceWith(resultExpression);
};
exports.handlers = {
    "templ.enter": () => undefined,
    "templ.exit": handleJSXTemplElementExit,
    "indent.enter": handleJSXIndentElementEnter,
    "indent.exit": handleJSXIndentElementExit,
    "ln.enter": handleJSXLnElementEnter,
    "ln.exit": () => undefined,
    "cb.enter": () => undefined,
    "cb.exit": () => undefined,
    "custom.enter": () => undefined,
    "custom.exit": handleJSXCustomElementExit,
};
const visitor = {
    Program: {
        enter: (path, state) => {
            const indentSymbol = state.opts.indentType === "space"
                ? String.fromCharCode(32)
                : String.fromCharCode(9);
            const header = template_1.default.ast(`
        (function() {
          if (typeof globalThis === 'object') return;
          Object.defineProperty(Object.prototype, '__magic__', {
            get: function() {
              return this;
            },
            configurable: true
          });
          __magic__.globalThis = __magic__;
          delete Object.prototype.__magic__;
        }());

        if (typeof globalThis.__tsxt__ === "undefined") {
          const prepareValue = (expr) => {
            if (Array.isArray(expr)) {
              return expr.join(''); 
            } else if (expr === false) {
              return '';
            } else if (typeof expr !== 'string') {
              throw new Error(\`Value '\${expr}' in not a string\`);
            } else {
              if (expr.length > 0) {
                return "${indentSymbol}".repeat(globalThis.__tsxt__.indent * ${state.opts.indentSize}) + expr + '\\n';
              } else {
                return '';
              }
            }
          }

          globalThis.__tsxt__ = { indent: 0, prepareValue };
        }
      `);
            path.node.body.unshift(...header);
        },
    },
    JSXElement: {
        enter: (path, state) => {
            const name = `${(0, helpers_1.getJSXElementName)(path.node)}.enter`;
            if (name in exports.handlers) {
                exports.handlers[name](path, state);
            }
            else {
                exports.handlers["custom.enter"](path, state);
            }
        },
        exit: (path, state) => {
            const name = `${(0, helpers_1.getJSXElementName)(path.node)}.exit`;
            if (name in exports.handlers) {
                exports.handlers[name](path, state);
            }
            else {
                exports.handlers["custom.exit"](path, state);
            }
        },
    },
};
exports.default = visitor;
//# sourceMappingURL=visitor.js.map