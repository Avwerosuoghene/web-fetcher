import { extractMetadata } from '../models/metadata';
import { Element, Node } from 'domhandler';
import Logger from '../utils/logger';
import { formatDateTime } from '../utils/dateFormatter';

jest.mock('../utils/logger');
jest.mock('../utils/dateFormatter');

const mockedLogger = Logger as jest.Mocked<typeof Logger>;
const mockedFormatDateTime = formatDateTime as jest.Mock;

describe('extractMetadata', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should correctly extract metadata from nodes', () => {
        const nodes: Node[] = [
            new Element('a', {}, []),
            new Element('a', {}, []),
            new Element('img', { src: '/images/example.png' }, []),
            new Element('img', { src: '/images/another.png' }, [])
        ];
        const hostname = 'example.com';

        const fixedDateTime = '2024-09-05T00:00:00Z';
        mockedFormatDateTime.mockReturnValue(fixedDateTime);

        const metadata = extractMetadata(nodes, hostname);

        expect(metadata.site).toBe(hostname);
        expect(metadata.num_links).toBe(2);
        expect(metadata.images).toBe(2);
        expect(metadata.last_fetch).toBe(fixedDateTime);

        expect(mockedLogger.ongoing).toHaveBeenCalledWith('Fetching metadata...');
    });
});