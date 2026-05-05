# Clash Cleaner

Clash Cleaner is a Chrome extension designed to improve the coding experience on [CodinGame](https://www.codingame.com) by automatically stripping away boilerplate code from the IDE.

## Features
- **Boilerplate Removal**: Strips standard Python imports (`import sys`, `import math`) and auto-generated comments.
- **Monaco Editor Integration**: Interacts directly with the CodinGame IDE using the Monaco Editor API for reliable cleaning.
- **Simple UI**: Adds a "Clean" button directly into the IDE toolbar for quick access.

## Tech Stack
- **Language**: TypeScript
- **Bundler**: esbuild
- **Platform**: Chrome Extension (Manifest V3)

## Installation & Setup

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd clash_cleaner
npm install
```

### 2. Build the Extension
Run the build script to compile the TypeScript files into the `dist` directory:
```bash
npm run build
```

### 3. Load in Chrome
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** using the toggle in the top right corner.
3.  Click the **Load unpacked** button.
4.  Select the `clash_cleaner` root directory.

## Usage
1.  Open any CodinGame puzzle (e.g., [Onboarding](https://www.codingame.com/ide/puzzle/onboarding)).
2.  Select **Python 3** as your programming language.
3.  Click the yellow **Clean** button in the IDE toolbar to remove the boilerplate code.

## Development
- To watch for changes and rebuild automatically:
  ```bash
  npm run watch
  ```
- To run logic tests:
  ```bash
  npx esbuild src/test_cleaner.ts --bundle --platform=node --outfile=dist/test_cleaner.js; node dist/test_cleaner.js
  ```

## License
ISC
