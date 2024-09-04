import cheerio from 'cheerio';

export function parseHtml(html: string) {
  const $ = cheerio.load(html);
  return $;
}