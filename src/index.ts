import * as babel from '@babel/core';
import PluginJsxSyntax from '@babel/plugin-syntax-jsx';
import PresetTypescript from '@babel/preset-typescript';
import { TSXTPlugin, TSXTOptions } from './plugin';

export interface TransformerOptions {
	plugins: babel.PluginObj<any>[];
}

const defaultOptions: TransformerOptions = {
	plugins: []
};

export function compile(fileName: string, data: any, options: Partial<TransformerOptions> = {}): string | null {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TSXTOptions = {
        ...defaultOptions,
        indentType: 'space',
        indentSize: 4,
		data
	};

	return babel.transformFileSync(fileName, {
		ast: true,
		presets: [
			PresetTypescript
		],
		plugins: [
			PluginJsxSyntax,
			[TSXTPlugin, opts],
			..._options.plugins
		]
    });
}
