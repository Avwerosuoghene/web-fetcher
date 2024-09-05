import { Element, Node } from 'domhandler';
import { adjustHtmlLinks } from '../utils/adjustHtmlLinks';
import path from 'path';
import Logger from '../utils/logger';

jest.mock('../utils/logger');
const mockedLogger = Logger as jest.Mocked<typeof Logger>;

const getAssetsDir = (url: string) => {
    const hostname = new URL(url).hostname;
    return path.join(process.cwd(), hostname);
};

const getExpectedPath = (assetsDir: string, filename: string) => {
    return path.join(assetsDir, filename).replace(/\\/g, '/');
};

const nodes: Node[] = [
    new Element('img', { src: '/images/example.png' }, []),
    new Element('link', { href: '/styles/main.css' }, []),
    new Element('script', { src: '/scripts/main.js' }, [])
];

describe('adjustHtmlLinks', () => {
    const url = 'https://example.com';
    const assetsDir = getAssetsDir(url);

    const expectedImgSrc = getExpectedPath(assetsDir, 'example.png');
    const expectedLinkHref = getExpectedPath(assetsDir, 'main.css');
    const expectedScriptSrc = getExpectedPath(assetsDir, 'main.js');

    const setupMocks = () => {
        jest.resetAllMocks();
        mockedLogger.ongoing.mockImplementation(() => {});
        mockedLogger.success.mockImplementation(() => {});
    };

    beforeEach(() => {
        setupMocks();
    });

    describe('when adjusting HTML links', () => {
        it('should correctly update img src attributes', () => {
            const updatedHtml = adjustHtmlLinks(nodes, assetsDir);
            expect(updatedHtml).toContain(`src="${expectedImgSrc}"`);
        });

        it('should correctly update link href attributes', () => {
            const updatedHtml = adjustHtmlLinks(nodes, assetsDir);
            expect(updatedHtml).toContain(`href="${expectedLinkHref}"`);
        });

        it('should correctly update script src attributes', () => {
            const updatedHtml = adjustHtmlLinks(nodes, assetsDir);
            expect(updatedHtml).toContain(`src="${expectedScriptSrc}"`);
        });
    });

    describe('logging during the adjustment process', () => {
        it('should log the ongoing adjustment message', () => {
            adjustHtmlLinks(nodes, assetsDir);
            expect(mockedLogger.ongoing).toHaveBeenCalledWith('Adjusting HTML links...');
        });

        it('should log the success message after adjustment', () => {
            adjustHtmlLinks(nodes, assetsDir);
            expect(mockedLogger.success).toHaveBeenCalledWith('HTML links adjusted');
        });
    });
});