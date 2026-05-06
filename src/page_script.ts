import { cleanPythonCode } from './cleaner';

function cleanMonacoCode() {
  // @ts-ignore
  const monaco = window.monaco;
  
  if (monaco) {
    console.log('Clash Cleaner: Found Monaco API in frame. Attempting API-based clean...');
    const editors = monaco.editor.getEditors();
    if (editors && editors.length > 0) {
      const activeEditor = editors.find((e: any) => e.getDomNode()?.offsetParent !== null) || editors[0];
      const currentCode = activeEditor.getValue();
      const cleanedCode = cleanPythonCode(currentCode);
      activeEditor.setValue(cleanedCode);
      console.log('Clash Cleaner: Code cleaned via Monaco API.');
      return true;
    }
  }

  // FALLBACK: DOM Scraping and Keyboard Simulation
  // If we can't find Monaco API, we might be in the frame that just renders it.
  const lines = document.querySelectorAll('.view-line');
  if (lines.length > 0) {
    console.log('Clash Cleaner: Monaco API not found, but found editor lines. Attempting DOM fallback...');
    const currentCode = Array.from(lines).map(l => l.textContent).join('\n');
    const cleanedCode = cleanPythonCode(currentCode);
    
    // To replace code without the API, we need to focus the editor and use execCommand
    const editor = document.querySelector('.monaco-editor');
    if (editor) {
      (editor as HTMLElement).focus();
      // This is a "hacky" but often effective way to replace text in complex editors
      // Select all, then insert cleaned code
      document.execCommand('selectAll', false);
      document.execCommand('insertText', false, cleanedCode);
      console.log('Clash Cleaner: Code cleaned via DOM fallback.');
      return true;
    }
  }

  return false;
}

window.addEventListener('CLASH_CLEANER_TRIGGER', () => {
  console.log('Clash Cleaner: Page script cleaning triggered.');
  cleanMonacoCode();
});
