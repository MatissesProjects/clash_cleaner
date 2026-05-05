/**
 * Removes CodinGame boilerplate from Python code.
 */
export function cleanPythonCode(code: string): string {
  // Regex to match specific CodinGame boilerplate comments and imports
  const patterns = [
    /^import sys\s*$/m,
    /^import math\s*$/m,
    /^# Auto-generated code below aims at helping you parse\s*$/m,
    /^# the standard input according to the problem statement\.\s*$/m,
    /^# Write an answer using print\s*$/m,
    /^# To debug: print\("Debug messages\.\.\.", file=sys\.stderr, flush=True\)\s*$/m,
  ];

  let cleaned = code;
  for (const pattern of patterns) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Remove excessive newlines (more than 2 consecutive) and trim
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}
