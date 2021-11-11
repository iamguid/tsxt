import { NodePath } from '@babel/traverse';
import { JSXElement, Node } from '@babel/types';
import { UnexpectedType } from './errors';
import { getJSXElementName } from './helpers';
import { handlers, jsxHandlers } from './handlers';
import { TagName } from './tags';

export interface VisitorOptions {
    indentType: 'space' | 'tab';
    indentSize: number;
}

export interface VisitorState {
    opts: VisitorOptions;
}

export function visitorFactory() {
    return {
        'JSXElement': (path: NodePath<JSXElement>, state: VisitorState) => {
            const name = getJSXElementName(path) as TagName;

            if (!(name in jsxHandlers)) {
                return;
            }

            try {
                const handler = jsxHandlers[name];
                handler(path, state);

                return;
            } catch (e) {
                if (e instanceof TypeError) {
                    throw new UnexpectedType(path as NodePath<Node>, e);
                }

                throw e;
            }
        }
    }
}
