import * as path from 'path';
import { compile } from '../';

function main() {
	const data = "World"

	const result = compile(
		path.resolve(__dirname, '../../../src/examples/simple.template.tsx'),
		data,
		{
			plugins: []
		}
	);

	if (result !== null) {
		console.log(result.code);
	}
}

main();