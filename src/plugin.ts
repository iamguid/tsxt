import * as babel from '@babel/core';

import { visitorFactory, VisitorOptions } from './visitor';

export type TSXTOptions = VisitorOptions;

export function TSXTPlugin(_context: typeof babel) {
    return { visitor: visitorFactory() } as babel.PluginObj;
}
