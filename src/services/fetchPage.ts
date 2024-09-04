import axios from 'axios';
import DomHandler, { Element } from 'domhandler';
import { Parser } from 'htmlparser2';

export async function fetchPage(url: string): Promise<{ data: Element[]}> {

  const response = await axios.get(url);
  const handler = new DomHandler();
  const parser = new Parser(handler);
  parser.write(response.data);
  parser.end();
  const document = handler.dom as Element[] ;
  return {data: document};

}