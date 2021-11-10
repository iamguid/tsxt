import { NodePath } from "@babel/traverse";
import { Node } from "@babel/types";
import generate from '@babel/generator';

export function getJSXElementName(node: NodePath<any> | Node) {
    return (node instanceof NodePath)
        ? node.node.openingElement.name.name
        // @ts-ignore
        : (node as Node).openingElement.name.name;
}

export function getDataForScope(path: NodePath, key: string = '$data'): any {
	const parent = path.find(parentPath => parentPath.getData(key));

	return (parent)
		? parent.getData(key)
		: null;
}

export function getNodePathErrorMessage(nodePath: NodePath, err?: TypeError) {
	const { node } = nodePath;
	const result = generate(node);
	const data = getDataForScope(nodePath);

	let message = err && err.message || '';

	message += `\n\nNode: ${result.code}`;
	message += `\nLocation: ${JSON.stringify(node.loc)}`;
	message += `\nData: ${JSON.stringify(data, null, 2)}`;

	return message;
}
