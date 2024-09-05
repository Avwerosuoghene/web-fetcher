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
            Logger.ongoing(`Fetching ${url}...`);
            const document = (await fetchPage(url)).data;


            const hostname = new URL(url).hostname;
            const filename = `${hostname}.html`;

            if (printMetadata) {
                const metadata = extractMetadata(document, hostname);
                Logger.info(`Metadata for ${url}: ${JSON.stringify(metadata, null, 2)}`);
            }

            const assetsDir = await downloadAndSaveAssets(document, hostname);

            const updatedHtml = adjustHtmlLinks(document);

            saveToFile(assetsDir, filename, updatedHtml);

        } catch (error: any) {
            Logger.error(`Failed to fetch ${url}: ${error.message}`);
        }
    }
}


