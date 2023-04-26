# TSXT

TSXT is template engine for strongly typed JSX templates using TypeScript. The main use case is code generatation.

## Installation

npm

```bash
$ npm i --save-dev tsxt
```

yarn

```bash
$ yarn add --dev tsxt
```

Also you should add tsxt to your tsconfig.json file, example configuration is:

```json
{
  "compilerOptions": {
    "types": ["tsxt"]
  }
}
```

## How It Works

TSXT syntax is fully compatible with JSX syntax, that means you can use `eslint` and `prettier` JSX plugins to increase the quality of your code. Also it means that you can see all type errors in template.

TSXT is a babel plugin that finds and transforms JSX nodes to string literals concatenation expressions.

For example:

```tsx
export default (ctx: string) => <templ>{`Hello, ${ctx}`}</templ>;
```

Compiles to:

```js
function _default(ctx) {
  return "" + ("" + `Hello, ${ctx}` + "\n");
}
```

You can find more examples in [tests](https://github.com/iamguid/tsxt/tree/main/tests) folder

You can compile your tsx templates, for example with command:

```bash
$ tsxt ./templates ./compiled-templates
```

## Tags

TSXT provides three different tags (`templ`, `indent`, `ln`)

`templ` - main tag that tells TSXT to concatinate all children JSXExpressionContainers to one string concatination expression.

`indent` - simple tag that tells TSXT to increase indent for all nested JSXExpressionContainers. `indent` as well as `templ` transforms all children to one expression.

`ln` - another simple tag that tells TSXT to insert JSXExpressionContainer with string literal that contains `\n`.

## Links

Medium article - https://medium.com/@iam.guid/first-typescript-jsx-based-template-engine-for-code-generation-d9be0275e6d6
