import * as babel from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import visitor from "./visitor";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    export interface IntrinsicElements {
      templ: object;
      indent: object;
      ln: object;
    }
  }
}

export type TSXTTagName = "templ" | "ln" | "indent";

export interface TSXTOptions {
  indentType: "space" | "tab";
  indentSize: number;
}

export interface TSXTPluginOptions extends babel.PluginPass {
  opts: TSXTOptions;
}

export const defaultOptions: TSXTOptions = {
  indentType: "space",
  indentSize: 4,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default declare<TSXTPluginOptions, babel.PluginObj<any>>((api) => {
  api.assertVersion(7);

  const pluginObj: babel.PluginObj<TSXTPluginOptions> = {
    name: "TSXT",
    visitor,
  };

  return pluginObj;
});
