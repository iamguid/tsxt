import { NodePath } from "@babel/traverse";
import { getJSXElementName } from "./helpers";

export type TagName = "templ" | "ln" | "indent" | "cb";

export function isTemplElement(node: NodePath) {
  return getJSXElementName(node) === "templ";
}

export function isLnElement(node: NodePath) {
  getJSXElementName(node) === "ln";
}

export function isIndentElement(node: NodePath) {
  getJSXElementName(node) === "indent";
}

export function isCbElement(node: NodePath) {
  getJSXElementName(node) === "cb";
}
