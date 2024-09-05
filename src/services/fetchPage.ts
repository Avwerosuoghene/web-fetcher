import axios from 'axios';
import { DomHandler, Parser } from 'htmlparser2';

export async function fetchPage(url: string): Promise<{data: any[] }> {
    const response = await axios.get(url);
    const handler = new DomHandler();
    const parser = new Parser(handler);
    parser.write(response.data);
    parser.end();
    return {data: handler.dom};
}