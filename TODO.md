## TODO

A short list over tasks that remain but which I do not prioritize right now. if you want to fix
this, go ahead. I have described below what needs to be done and how long it will take.

### Implements Annex B.1.1

1. Add a global bitmask to catch cases like "09" and "018" where 'use strict' isn't set yet in `parseScriptBody`.
2. Throw if the global bitmask are set, or remove it
3. In number scanning, set the bitmask flag where it should be

**Time to fix:** 2 minutes!

### Line and column tracking:

It's quite straight forward. 

1. Adjust the column and line in the 'scanToken'
2. Column values are already tracked, so just grab the line and column values like we do for ranges
3. Extend 'finishNode' and 'startNode' to accept line and column values

**Time to fix:** 4 minutes!

After this. Write tests that cover line and column locations and adjust the values if wrong.

**Time to fix:** Time consuming

**Note"** This is half-way implemented now. Need to adjust lines different places in the
code, and also adjust the start column value in `parseScript` and `parseModule`

### Tokenizing

Finish what's started. 

1. Adjust the token values
2. Change the value for token types

**Time to fix*:** 10 - 15 minutes