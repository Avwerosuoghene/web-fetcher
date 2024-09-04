import { Element, Node, Text } from 'domhandler';
import { Metadata } from '../types';

export function extractMetadata(nodes: Node[]): Metadata {
    let linksCount = 0;
    let imagesCount = 0;

    function countElements(node: Node) {
        if (node instanceof Element) {
            if (node.name === 'a') linksCount++;
            if (node.name === 'img') imagesCount++;
        }
        if (node instanceof Element && node.children) {
            node.children.forEach(countElements);
        }
    }

    nodes.forEach(countElements);

    const fetchTimestamp = new Date().toISOString();
    return { linksCount, imagesCount, fetchTimestamp };
}
