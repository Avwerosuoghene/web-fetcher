import axios from 'axios';
import cheerio from 'cheerio';
import { DomHandler } from 'domhandler';


import { saveToFile } from '../utils/fileUtils';
import Logger from '../utils/logger';
import { extractMetadata } from '../models/metadata';
import { Parser } from 'htmlparser2';
import { downloadAndSaveAssets } from '../services/downloadAndSaveAssets';
import { fetchPage } from '../services/fetchPage';
import { adjustHtmlLinks } from '../utils/adjustHtmlLinks';
import path from 'path';



export async function fetchAndSavePages(urls: string[], printMetadata: boolean) {
    for (const url of urls) {
        try {
            Logger.info(`Fetching ${url}...`);
            const document = (await fetchPage(url));

            const hostname = new URL(url).hostname;
            const filename = `${hostname}.html`;
            console.log(document);

            const metadata = extractMetadata(document.data);
            if (printMetadata) {
                Logger.info(`Metadata for ${url}: ${JSON.stringify(metadata, null, 2)}`);
            }
            await downloadAndSaveAssets(document.data, hostname);
            const updatedHtml = adjustHtmlLinks(document.data, hostname);
            const assetsDir = path.join(process.cwd(),'assets', hostname );

            saveToFile(assetsDir, filename, updatedHtml);
            Logger.success(`Saved ${url} to ${filename}`);

        } catch (error: any) {
            Logger.error(`Failed to fetch ${url}: ${error.message}`);
        }
    }
}


