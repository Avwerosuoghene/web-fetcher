import * as fs from 'fs/promises';
import * as path from 'path';
import Logger from './logger';

export async function saveToFile(directory: string, filename: string, content: string): Promise<void> {
  try {
    
    await fs.mkdir(directory, { recursive: true });

    const filePath = path.join(directory, filename);
    await fs.writeFile(filePath, content, 'utf8');
    Logger.success(`File saved: ${filename}`);
  } catch (error: any) {
    Logger.error(`Failed to save file: ${filename}, Error: ${error.message}`);
  }
}