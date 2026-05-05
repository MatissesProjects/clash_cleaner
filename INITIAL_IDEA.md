I want to create a chrome extension that takes the input from codingame like below and cleans it to the one under the ----


import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

sentence = input()
col = int(input())

# Write an answer using print
# To debug: print("Debug messages...", file=sys.stderr, flush=True)

print("answer")


----



We should attempt to remove all the comments and the auto-generated code, leaving only the necessary input parsing and output code. The cleaned code should look like this:
sentence = input()
col = int(input())
print("answer")

These comment strings are usually the ones that are there
