import { downloadAndSaveAssets } from '../services/downloadAndSaveAssets';
import { Element, Node } from 'domhandler';
import fs from 'fs/promises';
import axios from 'axios';
import Logger from '../utils/logger';
import path from 'path';

jest.mock('fs/promises');
jest.mock('axios');
jest.mock('../utils/logger');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedLogger = Logger as jest.Mocked<typeof Logger>;

const setupMocks = () => {
    mockedFs.mkdir.mockResolvedValue(undefined);
    mockedAxios.get.mockResolvedValue({ data: Buffer.from('test') });
    mockedFs.writeFile.mockResolvedValue(undefined);
};

const createTestNodes = (): Node[] => [
    new Element('img', { src: '/images/example.png' }, []),
    new Element('link', { href: '/styles/main.css' }, []),
    new Element('script', { src: '/scripts/main.js' }, [])
];

const getAssetsDir = (hostname: string): string => {
    return path.join(process.cwd(), hostname);
};

describe('downloadAndSaveAssets', () => {
    const hostname = 'example.com';
    const assetsDir = getAssetsDir(hostname);

    beforeEach(() => {
        jest.resetAllMocks();
        setupMocks();
    });

    describe('when assets are downloaded and saved successfully', () => {
        it('should create directories and save files correctly', async () => {
            const nodes = createTestNodes();

            const result = await downloadAndSaveAssets(nodes, hostname);

            expect(result).toBe(assetsDir);
            expect(mockedFs.mkdir).toHaveBeenCalledWith(assetsDir, { recursive: true });
            expect(mockedFs.writeFile).toHaveBeenCalledWith(path.join(assetsDir, 'example.png'), Buffer.from('test'));
            expect(mockedFs.writeFile).toHaveBeenCalledWith(path.join(assetsDir, 'main.css'), Buffer.from('test'));
            expect(mockedFs.writeFile).toHaveBeenCalledWith(path.join(assetsDir, 'main.js'), Buffer.from('test'));
        });

        it('should log ongoing and successful operations', async () => {
            const nodes = createTestNodes();

            await downloadAndSaveAssets(nodes, hostname);

            expect(mockedLogger.ongoing).toHaveBeenCalledWith('Downloading and saving assets...');
            expect(mockedLogger.ongoing).toHaveBeenCalledWith('Attempting to download asset: https://example.com/images/example.png');
            expect(mockedLogger.success).toHaveBeenCalledWith('Successfully downloaded asset: https://example.com/images/example.png');
            expect(mockedLogger.success).toHaveBeenCalledWith('Successfully downloaded asset: https://example.com/styles/main.css');
            expect(mockedLogger.success).toHaveBeenCalledWith('Successfully downloaded asset: https://example.com/scripts/main.js');
            expect(mockedLogger.success).toHaveBeenCalledWith(`Assets saved to ${assetsDir}`);
        });
    });

    describe('when asset download fails', () => {
        it('should handle errors and log them correctly', async () => {
            const nodes: Node[] = [
                new Element('img', { src: '/images/invalid.png' }, [])
            ];

            mockedAxios.get.mockRejectedValue(new Error('Download failed'));

            await downloadAndSaveAssets(nodes, hostname);

            expect(mockedLogger.error).toHaveBeenCalledWith(
                'Failed to download asset: https://example.com/images/invalid.png, Error: Download failed'
            );
        });
    });
});