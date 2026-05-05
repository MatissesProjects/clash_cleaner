import { cleanPythonCode } from './cleaner';

const inputCode = `
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

sentence = input()
col = int(input())

# Write an answer using print
# To debug: print("Debug messages...", file=sys.stderr, flush=True)

print("answer")
`;

const expectedOutput = `sentence = input()
col = int(input())

print("answer")`;

const actualOutput = cleanPythonCode(inputCode);

console.log("--- Input ---");
console.log(inputCode);
console.log("--- Expected ---");
console.log(expectedOutput);
console.log("--- Actual ---");
console.log(actualOutput);

if (actualOutput === expectedOutput) {
  console.log("\n✅ Test Passed!");
} else {
  console.log("\n❌ Test Failed!");
  process.exit(1);
}
