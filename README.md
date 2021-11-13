TSXT
====
TSXT is template engine for strongly typed JSX templates using TypeScript. The main use case is code generatation.

## Installation
npm
```bash
$ npm i babel-plugin-tsxt @babel/cli @babel/core @babel/preset-typescript @babel/preset-env
```

yarn
```bash
$ yarn add babel-plugin-tsxt @babel/cli @babel/core @babel/preset-typescript @babel/preset-env
```

Then you can use it as simple babel-plugin.

## How It Works
TSXT syntax is fully compatible with JSX syntax, that means you can use `eslint` and `prettier` JSX plugins to increase the quality of your code. Also it means that you can see all type errors in template.

TSXT is a babel plugin that finds and transforms JSX nodes to string literals concatenation expressions.

For example:
```tsx
export default (ctx: string) => (
    <templ>
        {`Hello, ${ctx}`}
    </templ>
)
```

Compiles to:
```js
function _default(ctx) {
    return "" + ("" + `Hello, ${ctx}` + "\n");
}
```

## Usage
Babel config should contain `@babel/preset-typescript` preset for typescript support and `@babel/preset-env` if you want to run it in different environments.
Also you can use `webpack` to run templates in browser.

Example babel.config.json:
```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "babel-plugin-tsxt",
      {
        "indentType": "space",
        "indentSize": 4
      }
    ]
  ]
}
```

Then you can compile your tsx templates, for example with command:

```bash
$ babel --config-file ./templates/babel.config.json --extensions .tsx,.ts --out-dir ./templates/dist ./templates
```

You can find more examples in [tests](https://github.com/iamguid/tsxt/tree/main/tests) folder

## Tags
TSXT provides three different tags (`templ`, `indent`, `ln`)

`templ` - main tag that tells TSXT to concatinate all children JSXExpressionContainers to one string concatination expression.

`indent` - simple tag that tells TSXT to increase indent for all nested JSXExpressionContainers. `indent` as well as `templ` transforms all children to one expression.

`ln` - another simple tag that tells TSXT to insert JSXExpressionContainer with string literal that contains `\n`.
