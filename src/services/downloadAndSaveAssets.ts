import axios from 'axios';
import { Element, Node } from 'domhandler';
import * as path from 'path';
import * as fs from 'fs/promises';
import Logger from '../utils/logger';

export async function downloadAndSaveAssets(nodes: Node[], hostname: string): Promise<void> {
    const assetsDir = path.join(process.cwd(), hostname);

    await fs.mkdir(assetsDir, { recursive: true });

    const downloadPromises: Promise<void>[] = [];

    function downloadAsset(node: Element, attr: string) {
        let url = node.attribs[attr];
        
        if (url) {
            try {
                const assetUrl = new URL(url, `https://${hostname}`).href;
                const assetPath = path.join(assetsDir, path.basename(assetUrl));
                Logger.info(`Attempting to download asset: ${assetUrl}`);
                downloadPromises.push(
                    axios.get(assetUrl, { responseType: 'arraybuffer' })
                        .then(response => fs.writeFile(assetPath, response.data))
                        .catch(error => {
                            if (error.response && error.response.status === 404) {
                                Logger.warn(`Asset not found (404): ${assetUrl}`);
                            } else {
                                Logger.error(`Failed to download asset: ${assetUrl}, Error: ${error.message}`);
                            }
                        })
                );
                node.attribs[attr] = path.join(hostname, path.basename(assetUrl));
            } catch (error: any) {
                Logger.error(`Failed to resolve asset URL: ${url}, Error: ${error.message}`);
            }
        }
    }

    function processNode(node: Node) {
        if (node instanceof Element) {
            if (node.name === 'img' && node.attribs.src) {
                downloadAsset(node, 'src');
            }
            if ((node.name === 'link' && node.attribs.href) || (node.name === 'script' && node.attribs.src)) {
                downloadAsset(node, node.attribs.href ? 'href' : 'src');
            }
        }
        if (node instanceof Element && node.children) {
            node.children.forEach(processNode);
        }
    }

    nodes.forEach(processNode);

    await Promise.all(downloadPromises);
}