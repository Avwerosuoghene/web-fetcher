import axios from 'axios';
import { saveToFile } from '../utils/fileUtils';

export async function fetchAndSavePages(urls: string[]) {
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const hostname = new URL(url).hostname;
      const filename = `${hostname}.html`;
      saveToFile(filename, response.data);
      console.log(`Saved ${url} to ${filename}`);
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
    }
  }
}