# Cherow

**WORK IN PROGRESS**

Cherow is a very fast and unbeatable, standard-compliant ECMAScript parser written in ECMAScript.

**NOTE!** The first beta code will be pushed to this repo within 1 - 2 weeks.

Will I ever go public? I'm not sure I will. I hate breaking what others have spent time and resources building up. And that
will be the case if I go public with Cherow :( 

## Features 

- Full support for ECMAScript 2017 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- 100 % TC262 Compatible
- JSX
- TypeScript (*in progress*)
- Optional tracking of syntax node location (index-based and line-column)
- 6300 unit tests with full code coverage

## ESNext features

`Stage 3` features support. This need to be enabled with the `next` option

- Dynamic Import
- Async generators
- Async Await
- Object spread
- BigInt
- Optional catch binding
- Regular Expression's new `DotAll` flag

## Options

* `next` - Enables `ECMAScript Next` support and let you use proposals at `stage 3` or higher such as `Dynamic Import`.
* `directives` - Enables support for [directive nodes](https://github.com/estree/estree/pull/152)
* `raw` - Enables the raw property on literal nodes (*work in progress*)
* `onComment` - Enables option to collect comments (*array or function*)
* `tokenize` - If enabled each found token will be returned as either an function or an array (*work in progres*)
* `ranges` - Enables the start and characters offsets on the AST node.
* `locations` - Enables location tracking. (*work in progress*)
* `jsx` - Enables JSX
* `ts` - Enables TypeScript (*coming very soon*)

## Roadmap

- Simplify and optimize the code base
- Add back in option to parse TypeScript
- Implement the remaining stuff that was left out until complete TS implementation
- Consider to go public

## Benchmarks

Cherow's performance beats everything that is possible to beat :) 

Here is an benchmark result after parsing tsserver. Allmost 100k code lines!

```js
-----------START---------
 source:  tsserver.js
0.2065233284705882 '(cherow)'
0.6980725535555556 '(acorn)'
0.6897469524444444 '(esprima)'
------------DONE---------
```

## Contribution
 
 You are welcome to contribute. As a golden rule - always run benchmarks to verify that you haven't created any
 bottlenecks or did something that you shouldn't.

*Terms of contribution:*

- Think twice before you try to implement anything
- Minimum 1.5 mill ops / sec for light weight source, and 800k - 1 mill ops / sec for "heavy" source
- Avoid duplicating the source code
- Create tests that cover what you have implemented

