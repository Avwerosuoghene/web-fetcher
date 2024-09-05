import * as fs from 'fs/promises';
import * as path from 'path';
import Logger from './logger';

export async function saveToFile(directory: string, filename: string, content: string): Promise<void> {
  try {
    
    Logger.ongoing(`Saving HTML file ${filename}...`);

    const filePath = path.join(directory, filename);
    await fs.writeFile(filePath, content, 'utf8');
    Logger.success(`Saved HTML file: ${filename}`);
  } catch (error: any) {
    Logger.error(`Failed to save file: ${filename}, Error: ${error.message}`);
  }
}