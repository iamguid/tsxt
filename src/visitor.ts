import { NodePath } from '@babel/traverse';
import { JSXElement, Node } from '@babel/types';
import { UnexpectedType } from './errors';
import { getJSXElementName } from './helpers';
import { handlers } from './handlers';

export interface VisitorOptions {
    indentType: 'space' | 'tab';
    indentSize: number;
    data: any;
}

export interface VisitorState {
    opts: VisitorOptions;
}

export function visitorFactory() {
    return {
        JSXElement(path: NodePath<JSXElement>, state: VisitorState) {
            const name = getJSXElementName(path);

            if (!handlers.has(name)) {
                return;
            }

            try {
                const handler = handlers.get(name)!;
                handler(path, state);

                return;
            } catch (e) {
                if (e instanceof TypeError) {
                    throw new UnexpectedType(path as NodePath<Node>, e);
                }

                throw e;
            }
        }
    };
}
