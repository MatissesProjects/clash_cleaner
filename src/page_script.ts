import { cleanPythonCode } from './cleaner';

// Function to clean the code using the monaco instance
function cleanMonacoCode() {
  // @ts-ignore
  const editors = window.monaco?.editor?.getEditors();
  if (editors && editors.length > 0) {
    const editor = editors[0];
    const currentCode = editor.getValue();
    const cleanedCode = cleanPythonCode(currentCode);
    editor.setValue(cleanedCode);
    console.log('Clash Cleaner: Code cleaned successfully.');
  } else {
    console.error('Clash Cleaner: Could not find Monaco editor instance.');
  }
}

// Listen for a custom event from the content script
window.addEventListener('CLASH_CLEANER_TRIGGER', () => {
  cleanMonacoCode();
});
