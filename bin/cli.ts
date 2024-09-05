#!/usr/bin/env ts-node

import { Command } from 'commander';
import { fetchAndSavePages } from '../src/commands/fetchPages';
import Logger from '../src/utils/logger';

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI to fetch web pages and save them to disk')
  .option('-u, --urls <urls...>', 'List of URLs to fetch')
  .option('-m, --metadata', 'Print metadata of the fetched pages')
  .action((options) => {
    const { urls, metadata } = options;
    if (urls) {
      fetchAndSavePages(urls, metadata);
    } else {
        Logger.error('No URLs provided. Use -u option followed by URLs to specify URLs.');
        program.help();
        process.exit(1);
    }
  });

program.parse(process.argv);