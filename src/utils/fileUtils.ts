import * as fs from 'fs/promises';
import * as path from 'path';
import Logger from './logger';

export async function saveToFile(filename: string, content: string): Promise<void> {
    try {
        await fs.writeFile(path.join(process.cwd(), filename), content, 'utf-8');
        Logger.success(`File saved: ${filename}`);
    } catch (error: any) {
        Logger.error(`Failed to save file: ${filename}, Error: ${error.message}`);
    }
}