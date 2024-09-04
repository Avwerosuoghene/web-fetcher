import { Element, Node } from 'domhandler';
import { DomHandler, Parser } from 'htmlparser2';

export function adjustHtmlLinks(nodes: Node[], hostname: string): string {
    function processNode(node: Node) {
        if (node instanceof Element && node.children) {
            node.children.forEach(processNode);
        }
    }

    nodes.forEach(processNode);

    const handler = new DomHandler();
    const parser = new Parser(handler);
    parser.write(nodes.map(node => node.toString()).join(''));
    parser.end();
    return handler.dom.map(node => node.toString()).join('');
}