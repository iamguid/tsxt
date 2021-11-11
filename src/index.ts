import * as fs from 'fs';
import * as babel from '@babel/core';
import PluginJsxSyntax from '@babel/plugin-syntax-jsx';
import PresetTypescript from '@babel/preset-typescript';
import { TSXTPlugin, TSXTOptions } from './plugin';

export interface VisitorOptions {
    indentType: 'space' | 'tab';
    indentSize: number;
}

export interface VisitorState {
    opts: VisitorOptions;
}

export interface TransformerOptions {
	plugins: babel.PluginObj<any>[];
}

const defaultOptions: TransformerOptions = {
	plugins: []
};

export function compile(
	fileName: string,
	options: Partial<TransformerOptions> = {}
) {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TSXTOptions = {
        ...defaultOptions,
        indentType: 'space',
        indentSize: 4,
	};

	const transformResult = babel.transformFileSync(fileName, {
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

    if (transformResult?.code) {
        fs.writeFileSync(`${fileName}.js`, transformResult.code)
    }
}
