# Web Fetcher CLI

A Command Line Interface (CLI) tool designed to fetch web pages, save them to disk, and manage their assets. This tool handles fetching HTML pages, downloading associated assets such as images and scripts, and adjusting the links within the HTML to reference the saved assets.

## Features

- **Fetch Web Pages:** Download web pages and save them locally.
- **Download Assets:** Download and save assets like images, CSS, and JavaScript files.
- **Adjust HTML Links:** Modify HTML links to point to the locally saved assets.
- **Print Metadata:** Optionally print metadata such as the number of links and images.

## Requirements

- Node.js (version 18 or above)
- npm (or yarn)

## Installation

To install and set up the Web Fetcher CLI, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/web-fetcher-cli.git

2. **Navigate to the Project Directory:**

   ```bash
   cd web-fetcher-cli

3. **Install Dependencies:**

   ```bash
   npm install

## Usage

The CLI tool can be used to fetch web pages and save them locally. Below are the available commands and options:

- **Fetch Web Pages and Save Them:**

  ```bash
  npx web-fetcher-cli --urls <url1> <url2> ... [--metadata]

- `--urls <url1> <url2> ...`: A list of URLs to fetch.
- `--metadata`: Optional flag to print metadata of the fetched pages.

## Code Structure

The project is structured as follows:

- `bin/cli.ts`: The main entry point for the CLI tool.
- `src/commands/fetchPages.ts`: Contains logic to fetch pages, download assets, and save the pages.
- `src/models/metadata.ts`: Defines how to extract metadata from the HTML.
- `src/services/downloadAndSaveAssets.ts`: Handles downloading and saving assets.
- `src/services/fetchPage.ts`: Fetches the HTML content of a web page.
- `src/utils/adjustHtmlLinks.ts`: Adjusts HTML links to point to saved assets.
- `src/utils/dateFormatter.ts`: Provides date and time formatting utilities.
- `src/types/index.ts`: Defines the structure for metadata information extracted from the HTML content.
- `src/utils/fileUtils.ts`: Contains utility functions for file operations.
- `src/utils/logger.ts`: Provides logging utilities with different log levels.

### `bin/cli.ts`

This file sets up the CLI using the Commander library. It defines the command-line options and invokes the `fetchAndSavePages` function from `src/commands/fetchPages.ts`.

### `src/commands/fetchPages.ts`

Contains the main functionality to:
- Fetch pages using `fetchPage`.
- Download and save assets using `downloadAndSaveAssets`.
- Adjust HTML links using `adjustHtmlLinks`.
- Save the final HTML to a file using `saveToFile`.

#### `src/models/metadata.ts`

Extracts metadata from the HTML, including the number of links and images, and formats the last fetch date and time.

#### `src/services/downloadAndSaveAssets.ts`

Downloads assets like images, CSS, and JavaScript files. Saves them to a local directory and updates the HTML to point to these local files.

#### `src/services/fetchPage.ts`

Fetches the HTML content of a web page and parses it into a DOM structure.

#### `src/utils/adjustHtmlLinks.ts`

Updates HTML links to point to local copies of assets.

#### `src/utils/dateFormatter.ts`

Formats dates and times used in metadata.

#### `src/utils/fileUtils.ts`

Handles file operations, including saving HTML files.

#### `src/utils/logger.ts`

Provides various logging methods for informational, success, warning, and error messages.

## Testing

To run tests, use the following command:  
    ```bash
    npm test 
Tests are located in the `tests` folder and cover various functionalities including:

- Asset downloading
- HTML link adjustment
- Metadata extraction
- File saving

## Docker

To build and run the Docker container for the Web Fetcher CLI, use the following commands:

1. **Build the Docker Image:**

   ```bash
   docker build -t web-fetcher-cli .

**Run the Docker Container:**

```bash
docker run --rm web-fetcher-cli --help

This command will display the help information for the CLI tool.