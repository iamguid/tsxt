import * as babel from '@babel/core';
import { VisitorOptions } from '.';

import visitor from './visitor';

export type TSXTOptions = VisitorOptions;

export function TSXTPlugin(_context: typeof babel) {
    return { visitor } as babel.PluginObj;
}

export default TSXTPlugin;
