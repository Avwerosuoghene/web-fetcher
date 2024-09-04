import axios from 'axios';
import { saveToFile } from '../utils/fileUtils';
import Logger from '../utils/logger';


export async function fetchAndSavePages(urls: string[]) {
    for (const url of urls) {
        try {
            Logger.info(`Fetching ${url}...`);
            const response = await axios.get(url);
            const hostname = new URL(url).hostname;
            const filename = `${hostname}.html`;
            saveToFile(filename, response.data);
            Logger.success(`Saved ${url} to ${filename}`);
        } catch (error: any) {
            Logger.error(`Failed to fetch ${url}: ${error.message}`);
        }
    }
}


