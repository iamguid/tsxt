import * as babel from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import visitor from "./visitor";

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      templ: any;
      indent: any;
      ln: any;
    }
  }
}

export type TSXTTagName = "templ" | "ln" | "indent";

export interface TSXTOptions {
  indentType: "space" | "tab";
  indentSize: number;
  codeblockStart: string;
  codeblockEnd: string;
}

export interface TSXTPluginOptions {
  opts: TSXTOptions;
}

export const defaultOptions: TSXTOptions = {
  indentType: "space",
  indentSize: 4,
  codeblockStart: "{",
  codeblockEnd: "}",
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
