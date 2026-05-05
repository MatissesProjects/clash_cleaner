# Clash Cleaner Extension Plan

## Objective
Create a lightweight Chrome extension that removes boilerplate code from the CodinGame IDE, focusing initially on Python.

## Scope & Impact
*   **Target site:** `codingame.com`.
*   **Initial Feature:** A "Clean" button injected into the IDE or a popup action that cleans the current editor content.
*   **Language Support:** Python.
*   **Tech Stack:** Vanilla TypeScript, standard Manifest V3.

## Implementation Steps

1.  **Project Setup:**
    *   Initialize a Node.js project (`package.json`).
    *   Set up TypeScript configuration (`tsconfig.json`).
    *   Set up a simple bundler like esbuild or Webpack to compile TS and package the extension.
    *   Create `manifest.json` (Manifest V3) with content script permissions for `*://*.codingame.com/*`.

2.  **Core Logic (`src/cleaner.ts`):**
    *   Develop a function `cleanPythonCode(code: string): string`.
    *   Use regex to identify and remove:
        *   Standard CodinGame Python imports (`import sys`, `import math`) if they are part of the boilerplate block.
        *   Specific CodinGame boilerplate comments (e.g., `# Auto-generated code below...`, `# Write an answer...`, `# To debug...`).
        *   Clean up excessive empty lines left after removal.

3.  **Content Script (`src/content.ts`):**
    *   Detect the CodinGame IDE editor instance (Monaco editor).
    *   Inject a custom "Clean Code" button into the UI.
    *   On button click:
        *   Retrieve current code from the editor.
        *   Run `cleanPythonCode`.
        *   Update the editor with the cleaned code.

4.  **Verification & Testing:**
    *   Load unpacked extension in Chrome.
    *   Verify button injection on a CodinGame puzzle page.
    *   Verify the cleaning logic correctly strips boilerplate without breaking user code.
