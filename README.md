[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)

Cherow is a very fast, standard-compliant [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) parser written in ECMAScript. 

It strictly follows the ECMAScript® 2018 Language Specification and should parse acc. these specifications

It's safe to use in production.

## Features 

- Full support for ECMAScript® 2018 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- Stage 3 proposals (*experimental*)
- Support for JSX, a syntax extension for React
- Skips shebang comment nodes by default
- Optional tracking of syntax node location (index-based and line-column)
- 4650 unit tests with full code coverage

## ESNext features

`Stage 3` features support. This need to be enabled with the `next` option

- Import()
- Asynchronous Iteration
- Rest/Spread Properties
- Optional catch binding
- Regular Expression's new `DotAll` flag

## V8 experimental features

This need to be enabled with the `v8` option

- Do expressions

## Options

* `next` - Enables `ECMAScript Next` support and let you use proposals at `stage 3` or higher such as `Dynamic Import`.
* `raw` - Enables the raw property on literal nodes (*Esprima and Acorn feature*)
* `comments` - Enables option to collect comments. Optional; Either array or function. Works like [Acorn](https://github.com/ternjs/acorn) onComment.
* `tokens` - If enabled each found token will be returned as either an function or an array (*work in progres*)
* `ranges` - Enables the start and characters offsets on the AST node.
* `locations` - Enables location tracking. (*4 min fix, but on hold for now*)
* `jsx` - Enables JSX

## API

Cherow can be used to perform syntactic analysis of Javascript program. 

*Note!* there does not exist an `sourceType: module` option for parsing module code. Acc. the Ecmascript specs you should use either `parseScript` or `parseModule`.

```js

// Parsing script
cherow.parseScript('const fooBar = 123;');

// Parsing module code
cherow.parseModule('const fooBar = 123;');

```
## Parsing with options


```js

// Parsing script
cherow.parseScript('const fooBar = 123;', { ranges: true, raw: true, next: true});

```

## Comments

Single line, multiline and HTML comments are supported, and can be collected as well. Shebang comment node - `#!foo` - are
skipped by default, and can't be collected.

### Collecting comments

Collecting comments works just the same way as for Acorn
```js

// Function
cherow.parseScript('// foo', 
   { 
       comments: function(type, comment, start, end) {} 
   }
);

// Array
const commentArray = [];

cherow.parseScript('// foo', 
    { 
        comments: commentArray 
    }
    );

```

## Acorn and Esprima differences

The main difference between Cherow and Acorn and Esprima is that the mention libraries either doesn't parse everything 
according to TC39, or they doesn't fail as they should according to the ECMAScript specs.

Cherow parses everything after the specs, and fails 90% after the specs (*work in progress*). 


## Performance and benchmarks

The most important thing for an ECMAScript parser is the performance. Especially important is it when the parser is a 
dependency in other libraries. Poor performance will slow down the main library.

Cherow has been developed from scratch with only one goal - performance.

You can find the the benchmarks [here](BENCHMARK.md)

## ESTree

Cherow outputs a sensible syntax tree format as standardized by [ESTree project](https://github.com/estree/estree), and does
not add any "extra" properties to any of it's node like [Esprima](https://github.com/jquery/esprima).

However. There is a small difference from other parsers because Cherow outputs a `await` property on the `ForStatement` node.
This because of the support of `For Await` and `Async Generators`.


## Contribution
 
 You are welcome to contribute. As a golden rule - always run benchmarks to verify that you haven't created any
 bottlenecks or did something that you shouldn't.

*Terms of contribution:*

- Think twice before you try to implement anything
- Minimum 1.5 mill ops / sec for light weight cases, and 800k - 1 mill ops / sec for "heavy" cases
- Avoid duplicating the source code
- Create tests that cover what you have implemented
