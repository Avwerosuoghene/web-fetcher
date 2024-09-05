import { saveToFile } from '../utils/fileUtils';
import Logger from '../utils/logger';
import { extractMetadata } from '../models/metadata';
import { downloadAndSaveAssets } from '../services/downloadAndSaveAssets';
import { fetchPage } from '../services/fetchPage';
import { adjustHtmlLinks } from '../utils/adjustHtmlLinks';
import path from 'path';



export async function fetchAndSavePages(urls: string[], printMetadata: boolean) {
    for (const url of urls) {
        try {
            Logger.ongoing(`Fetching ${url} data...`);
            const document = (await fetchPage(url)).data;

            const hostname = new URL(url).hostname;
            const filename = `${hostname}.html`;

            if (printMetadata) {
                Logger.ongoing(`Fetching metadata...`);
                const metadata = extractMetadata(document, hostname);
                Logger.info(`Metadata for ${url}: ${JSON.stringify(metadata, null, 2)}`);
            }
            const assetsDir  = await downloadAndSaveAssets(document, hostname);
            const updatedHtml = adjustHtmlLinks(document, hostname);

            saveToFile(assetsDir, filename, updatedHtml);
            Logger.success(`Saved ${url} to ${filename}`);

        } catch (error: any) {
            Logger.error(`Failed to fetch ${url}: ${error.message}`);
        }
    }
}


