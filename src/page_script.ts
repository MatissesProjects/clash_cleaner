import { cleanPythonCode } from './cleaner';

function cleanMonacoCode() {
  // @ts-ignore
  const monaco = window.monaco;
  
  if (!monaco) {
    // Silent fail for non-editor frames
    return;
  }

  console.log('Clash Cleaner: Found Monaco in this frame. Attempting to clean...');
  const editors = monaco.editor.getEditors();
  if (editors && editors.length > 0) {
    const activeEditor = editors.find((e: any) => e.getDomNode()?.offsetParent !== null) || editors[0];
    
    const currentCode = activeEditor.getValue();
    const cleanedCode = cleanPythonCode(currentCode);
    activeEditor.setValue(cleanedCode);
    console.log('Clash Cleaner: Code cleaned successfully.');
  } else {
    console.error('Clash Cleaner: Monaco found, but no editors are active in this frame.');
  }
}

// Listen for a custom event from the content script
window.addEventListener('CLASH_CLEANER_TRIGGER', () => {
  cleanMonacoCode();
});
