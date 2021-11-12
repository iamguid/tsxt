import { NodePath } from "@babel/traverse";
import { getNodePathErrorMessage } from "./helpers";

export class UnexpectedType extends TypeError {
  constructor(
    public readonly nodePath: NodePath,
    public readonly innerError: TypeError
  ) {
    super(getNodePathErrorMessage(nodePath, innerError));
  }
}
