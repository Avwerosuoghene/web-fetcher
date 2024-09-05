import { Element, Node, Text } from 'domhandler';
import { Metadata } from '../types';
import { formatDateTime } from '../utils/dateFormatter';
import Logger from '../utils/logger';

export function extractMetadata(nodes: Node[], hostname: string): Metadata {
    let num_links = 0;
    let images = 0;
    const site = hostname;
    Logger.ongoing(`Fetching metadata...`);


    function countElements(node: Node) {
        if (node instanceof Element) {
            if (node.name === 'a') num_links++;
            if (node.name === 'img') images++;
        }
        if (node instanceof Element && node.children) {
            node.children.forEach(countElements);
        }
    }

    nodes.forEach(countElements);
    const last_fetch  = formatDateTime();


    return { site, num_links, images, last_fetch };
}
