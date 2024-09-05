import path from 'path';
import { fetchAndSavePages } from '../commands/fetchPages';
import { extractMetadata } from '../models/metadata';
import { downloadAndSaveAssets } from '../services/downloadAndSaveAssets';
import { fetchPage } from '../services/fetchPage';
import { adjustHtmlLinks } from '../utils/adjustHtmlLinks';
import { saveToFile } from '../utils/fileUtils';
import Logger from '../utils/logger';
import { documentData } from './testData';

jest.mock('../services/fetchPage');
jest.mock('../services/downloadAndSaveAssets');
jest.mock('../utils/adjustHtmlLinks');
jest.mock('../utils/fileUtils');
jest.mock('../models/metadata');
jest.mock('../utils/logger');

const mockedFetchPage = fetchPage as jest.Mock;
const mockedExtractMetadata = extractMetadata as jest.Mock;
const mockedDownloadAndSaveAssets = downloadAndSaveAssets as jest.Mock;
const mockedAdjustHtmlLinks = adjustHtmlLinks as jest.Mock;
const mockedSaveToFile = saveToFile as jest.Mock;
const mockedLogger = Logger as jest.Mocked<typeof Logger>;

const urls = ['https://example.com', 'https://example.org'];
const document = documentData;
const updatedHtml = '<html></html>';

const getHostname = (url: string) => new URL(url).hostname;
const getAssetsDir = (hostname: string) => path.join(process.cwd(),  hostname);

describe('fetchAndSavePages', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('when everything succeeds', () => {
        it('should fetch the pages', async () => {
            mockedFetchPage.mockResolvedValue({ data: document });

            await fetchAndSavePages(urls, true);

            urls.forEach(url => {
                expect(mockedFetchPage).toHaveBeenCalledWith(url);
                expect(mockedLogger.ongoing).toHaveBeenCalledWith(`Fetching ${url}...`);
            });
        });

        it('should extract metadata from the documents', async () => {
            const metadata = { site: 'example.com', num_links: 5, images: 3, last_fetch: '2024-09-01T00:00:00Z' };

            mockedFetchPage.mockResolvedValue({ data: document });
            mockedExtractMetadata.mockReturnValue(metadata);

            await fetchAndSavePages(urls, true);

            urls.forEach(url => {
                expect(mockedExtractMetadata).toHaveBeenCalledWith(document, getHostname(url));
                expect(mockedLogger.info).toHaveBeenCalledWith(`Metadata for ${url}: ${JSON.stringify(metadata, null, 2)}`);
            });
        });

        it('should download and save assets', async () => {
            const hostname = getHostname(urls[0]);
            const assetsDir = getAssetsDir(hostname);

            mockedFetchPage.mockResolvedValue({ data: document });
            mockedDownloadAndSaveAssets.mockResolvedValueOnce(assetsDir)
                .mockResolvedValueOnce(getAssetsDir(getHostname(urls[1])));

            await fetchAndSavePages(urls, true);

            urls.forEach(url => {
                expect(mockedDownloadAndSaveAssets).toHaveBeenCalledWith(document, getHostname(url));
                expect(mockedLogger.ongoing).toHaveBeenCalledWith(`Fetching ${url}...`);
            });
        });

        it('should adjust HTML links', async () => {
            const hostname = getHostname(urls[0]);

            const assetsDir = getAssetsDir(hostname);

            mockedFetchPage.mockResolvedValue({ data: document });
            mockedDownloadAndSaveAssets.mockResolvedValue(assetsDir);
            mockedAdjustHtmlLinks.mockReturnValue(updatedHtml);

            await fetchAndSavePages([urls[0]], true);

            expect(mockedAdjustHtmlLinks).toHaveBeenCalledWith(document, assetsDir);

        });

        it('should save the adjusted HTML for each URL to a file', async () => {
            mockedFetchPage.mockResolvedValue({ data: document });
            mockedDownloadAndSaveAssets.mockResolvedValueOnce(getAssetsDir(getHostname(urls[0])))
                .mockResolvedValueOnce(getAssetsDir(getHostname(urls[1])));
            mockedAdjustHtmlLinks.mockReturnValue(updatedHtml);
            mockedSaveToFile.mockResolvedValue(undefined);

            await fetchAndSavePages(urls, true);

            urls.forEach(url => {
                const hostname = getHostname(url);
                const assetsDir = getAssetsDir(hostname);
                expect(mockedSaveToFile).toHaveBeenCalledWith(assetsDir, `${hostname}.html`, updatedHtml);
            });
        });
    });

    describe('when errors occur', () => {
        it('should handle fetch errors', async () => {
            const error = new Error('Fetch failed');

            mockedFetchPage.mockImplementation(url => Promise.reject(error));

            await fetchAndSavePages(urls, false);

            urls.forEach(url => {
                expect(mockedLogger.error).toHaveBeenCalledWith(`Failed to fetch ${url}: ${error.message}`);
            });
        });
    });
});