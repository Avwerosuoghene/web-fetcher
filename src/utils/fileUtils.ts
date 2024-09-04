import fs from 'fs';
import path from 'path';

export function saveToFile(filename: string, content: string) {
  const filePath = path.join(process.cwd(), filename);
  fs.writeFileSync(filePath, content);
  console.log(`File saved to ${filePath}`);
}