import { Element, Node, Text } from 'domhandler';
import { Metadata } from '../types';

export function extractMetadata(nodes: Node[], hostname: string): Metadata {
    let num_links = 0;
    let images = 0;
    const site = hostname;

  




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

    const currentDate = new Date();


    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',   
        day: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',   
        timeZoneName: 'short'
    };
    
    const formattedDate = currentDate.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = currentDate.toLocaleTimeString('en-GB', timeOptions);
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const last_fetch  = formattedDateTime;


    return { site, num_links, images, last_fetch };
}
