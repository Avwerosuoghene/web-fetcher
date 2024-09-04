import fs from 'fs';
import path from 'path';
import Logger from './logger';

export function saveToFile(filename: string, content: string) {
  const filePath = path.join(process.cwd(), filename);
  fs.writeFileSync(filePath, content);
  Logger.success(`File saved to ${filePath}`);
}