// src/utils/adjustHtmlLinks.ts
import { Element, Node, AnyNode } from 'domhandler';
import serialize from 'dom-serializer';

export function adjustHtmlLinks(nodes: Node[], hostname: string): string {
    function processNode(node: Node) {
        if (node instanceof Element) {
            if (node.name === 'img' && node.attribs.src) {
                node.attribs.src = `./${node.attribs.src.split('/').pop()}`;
            }
            if (node.name === 'link' && node.attribs.href) {
                node.attribs.href = `./${node.attribs.href.split('/').pop()}`;
            }
            if (node.name === 'script' && node.attribs.src) {
                node.attribs.src = `./${node.attribs.src.split('/').pop()}`;
            }
        }
        if (node instanceof Element && node.children) {
            node.children.forEach(processNode);
        }
    }

    nodes.forEach(processNode);
    
    return serialize(nodes as AnyNode[]);



}