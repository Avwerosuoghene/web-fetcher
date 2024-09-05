import { saveToFile } from '../utils/fileUtils';
import fs from 'fs/promises';
import Logger from '../utils/logger';
import * as path from 'path';

jest.mock('fs/promises');
jest.mock('../utils/logger');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedLogger = Logger as jest.Mocked<typeof Logger>;

const getFilePath = (directory: string, filename: string): string => {
    return path.join(directory, filename);
};

const setupMockForSuccess = () => {
    mockedFs.writeFile.mockResolvedValue(undefined);
};

describe('saveToFile', () => {
    const directory = '/path/to/assets';
    const filename = 'example.html';
    const content = '<html></html>';
    const filePath = getFilePath(directory, filename);

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('when saving the file successfully', () => {
        it('should save the file and log success', async () => {
            setupMockForSuccess();

            await saveToFile(directory, filename, content);

            expect(mockedFs.writeFile).toHaveBeenCalledWith(filePath, content, 'utf8');
            expect(mockedLogger.ongoing).toHaveBeenCalledWith(`Saving HTML file ${filename}...`);
            expect(mockedLogger.success).toHaveBeenCalledWith(`Saved HTML file: ${filename}`);
        });
    });

    describe('when saving the file fails', () => {
        it('should log the error correctly', async () => {
            mockedFs.writeFile.mockRejectedValue(new Error('Write failed'));

            await saveToFile(directory, filename, content);

            expect(mockedFs.writeFile).toHaveBeenCalledWith(filePath, content, 'utf8');
            expect(mockedLogger.ongoing).toHaveBeenCalledWith(`Saving HTML file ${filename}...`);
            expect(mockedLogger.error).toHaveBeenCalledWith(`Failed to save file: ${filename}, Error: Write failed`);
        });
    });
});