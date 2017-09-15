# Cherow


**WORK IN PROGRESS**

Cherow is a very fast and unbeatable, standard-compliant ECMAScript parser written in ECMAScript. 

It's close to 100% ECMAScript spec compatible.

**Note!** The source exist in the "dev" branch

## Features 

- Full support for ECMAScript 2017 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- 100 % TC262 Compatible
- JSX
- TypeScript (*in progress*)
- Optional tracking of syntax node location (index-based and line-column)
- 4300 unit tests with full code coverage

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
* `raw` - Enables the raw property on literal nodes (*Esprima and Acorn feature*)
* `onComment` - Enables option to collect comments. Optional; Either array or function. Works like [Acorn](https://github.com/ternjs/acorn) onComment.
* `tokenize` - If enabled each found token will be returned as either an function or an array (*work in progres*)
* `ranges` - Enables the start and characters offsets on the AST node.
* `locations` - Enables location tracking. (*4 min fix, but on hold for now*)
* `jsx` - Enables JSX
* `ts` - Enables TypeScript (*coming very soon*)


## Benchmarks

To be written


## Contribution
 
 You are welcome to contribute. As a golden rule - always run benchmarks to verify that you haven't created any
 bottlenecks or did something that you shouldn't.

*Terms of contribution:*

- Think twice before you try to implement anything
- Minimum 1.5 mill ops / sec for light weight cases, and 800k - 1 mill ops / sec for "heavy" cases
- Avoid duplicating the source code
- Create tests that cover what you have implemented
