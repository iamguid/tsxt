import * as babel from '@babel/core';
import { VisitorOptions } from './visitor';
export declare type TSXTOptions = VisitorOptions;
export declare function TSXTPlugin(_context: typeof babel): babel.PluginObj<babel.PluginPass>;
export default TSXTPlugin;
