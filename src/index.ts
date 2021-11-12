import * as babel from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import visitor from './visitor';

export interface TSXTOptions {
    indentType: 'space' | 'tab';
    indentSize: number;
}

export interface TSXTPluginOptions {
    opts: TSXTOptions;
}

export const defaultOptions: TSXTOptions = {
	indentType: 'space',
	indentSize: 4,
}

export default declare<TSXTPluginOptions, babel.PluginObj<any>>((api) => {
	api.assertVersion(7);

    const pluginObj: babel.PluginObj<TSXTPluginOptions> = {
		name: 'TSXT',
		visitor
    }

    return pluginObj;
})
