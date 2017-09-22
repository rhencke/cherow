import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Expressions - Arrow function', () => {

    it('should fail on strict duplicate params', () => {
        expect(() => {
            parseScript('function *g() { (x = yield) => {}; }');
        }).to.throw('');
    });    


    it('should fail on strict duplicate params', () => {
        expect(() => {
            parseScript('"use strict"; (a, a) => 42;');
        }).to.throw('');
    });    
    
    it('should fail on invalid use of reserved word', () => {
        expect(() => {
            parseScript('var af = switch => 1;');
        }).to.throw('');
    });
    
    it('should fail if no parenthesized arrow function body', () => {
        expect(() => {
            parseScript('async () =>');
        }).to.throw('');
    });

    it('should fail if no un-parenthesized arrow function body', () => {
        expect(() => {
            parseScript('async a =>');
        }).to.throw('');
    });

    it('should fail if use of future reserved word', () => {
        expect(() => {
            parseScript('"use strict"; var af = enum => 1;');
        }).to.throw('');
    });

     it('should fail on duplicates', () => {
        expect(() => {
            parseScript('var af = (x, [x]) => 1;');
        }).to.throw('');
    });

    it('should fail on duplicates', () => {
        expect(() => {
            parseScript('var af = ([x], ...x) => 1;) => 1;');
        }).to.throw('');
    });

    it('should fail on "a ? (b): c => (d): e => f"', () => {
        expect(() => {
            parseScript('a ? (b): c => (d): e => f');
        }).to.throw('');
    });

    it('should fail on no duplicate binding object - #1', () => {
        expect(() => {
            parseScript('var af = (x, {y: x}) => 1;');
        }).to.throw('');
    });

    it('should fail on no duplicate binding object - #3', () => {
        expect(() => {
            parseScript('var af = ({x}, {y: x}) => 1;');
        }).to.throw('');
    });

    it('should fail on no duplicate binding object - #5', () => {
        expect(() => {
            parseScript('var af = ({y: x}, ...x) => 1;');
        }).to.throw('');
    });

    it('should fail on "? ((b): c => d) : (e => f)"', () => {
        expect(() => {
            parseScript('? ((b): c => d) : (e => f)');
        }).to.throw('');
    });

    it('should fail if on invalid use of yield in strict mode', () => {
        expect(() => {
            parseScript('"use strict"; var af = (yield) => 1;');
        }).to.throw('');
    });

    it('should fail on invalid parenless parameters expression body', () => {
        expect(() => {
            parseScript(`var af = x
            => x;`);
        }).to.throw();
    });

    it('should fail on invalid ASI restriction', () => {
        expect(() => {
            parseScript(`var af = ()
            => {};`);
        }).to.throw();
    });

    it('should fail if use of future reserved word in strict mode', () => {
        expect(() => {
            parseScript('"use strict"; var af = package => 1;');
        }).to.throw('');
    });

    it('should fail on bindingidentifier no eval', () => {
        expect(() => {
            parseScript('"use strict"; var af = eval => 1;');
        }).to.throw('');
    });
    
    it('should fail on bindingidentifier no arguments', () => {
        expect(() => {
            parseScript('"use strict"; var af = arguments => 1;');
        }).to.throw('');
    });
    it('should fail on parameter named "yield"', () => {
        expect(() => {
            parseScript('"use strict"; var af = yield => 1;');
        }).to.throw('');
    });
    it('should fail if includes ...rest"', () => {
        expect(() => {
            parseScript('var af = ...x => x;');
        }).to.throw('');
    });

    it('should fail on no duplicates binding array', () => {
        expect(() => {
            parseScript('var af = ([x, x]) => 1;');
        }).to.throw('');
    });

    it('should fail if a function rest parameter is followed by a trailing comma', () => {
        expect(() => {
            parseScript('var af = (x, [x]) => 1;');
        }).to.throw('');
    });

    it('should fail if a FunctionRestParameter is followed by a trailing comma', () => {
        expect(() => {
            parseScript('var af = ({x}, ...x) => 1;');
        }).to.throw('');
    });
    
    it('should fail on error strict parameter eval', () => {
        expect(() => {
            parseScript('"use strict"; (eval, a) => 42;');
        }).to.throw('');
    });
    it('should fail on error strict parameter arguments', () => {
        expect(() => {
            parseScript('"use strict"; (arguments, a) => 42;');
        }).to.throw('');
    });

    it('should fail on asi restriction invalid parenless parameters', () => {
        expect(() => {
            parseScript(`var af = x
    => x;`);
        }).to.throw('');
    });

    it('should fail if a FunctionRestParameter is followed by a trailing comma', () => {
        expect(() => {
            parseScript('(...[ 5 ]) => {}');
        }).to.throw();
    });

    it('should fail if arrow parameters contain yield expressions', () => {
        expect(() => {
            parseScript('function *g() { (x = yield) => {} }\n');
        }).to.throw('');
    });

    it('should fail if Arrow parameters contain yield expressions', () => {
        expect(() => {
            parseScript('const foo = () => { console.log(new.target); };');
        }).to.throw('');
    });

    it('should fail on invalid unary operator after arrow body', () => {
        expect(() => {
            parseScript('(x) => {} + 2');
        }).to.not.throw();
    });

    it('should fail if FormalParameters also occurs in the LexicallyDeclaredNames of AsyncFunctionBody', () => {
        expect(() => {
            parseScript('(async function foo (bar) { let bar; });');
        }).to.throw('');
    });

    it('should fail arrow with inner paren', () => {
        expect(() => {
            parseScript(`function *g() { (x = yield) => {}; }`)
        }).to.throw('');
    })

    it('should fail arrow with inner paren', () => {
        expect(() => {
            parseScript(`"use strict"; function *g() { (x = yield) => {}; }`)
        }).to.throw('');
    })

    it('should fail arrow with inner paren', () => {
        expect(() => {
            parseScript(`var foo = ((foo)) => {};`)
        }).to.not.throw();
    })


    it('should fail on arrow with callee', () => {
        expect(() => {
            parseScript(`() => {}()`)
        }).to.throw('');
    })

    it('should fail on invalid arrow with ternary', () => {
        expect(() => {
            parseScript(`() => {} ? 1 : 2;`)
        }).to.throw('');
    })

    it('should fail on "[]=>0"', () => {
        expect(() => {
            parseScript(`[]=>0`)
        }).to.throw();
    })

    it('should fail on "(a)\n=> 0"', () => {
        expect(() => {
            parseScript(`(a)\n=> 0`)
        }).to.throw();
    })

    it('should fail on "((a)) => 1"', () => {
        expect(() => {
            parseScript(`((a)) => 1`)
        }).to.not.throw();
    })

    it('should fail on "[]=>0"', () => {
        expect(() => {
            parseScript(`[]=>0`)
        }).to.throw();
    })
    it('should fail on "((a),...a) => 1"', () => {
        expect(() => {
            parseScript(`((a),...a) => 1`)
        }).to.throw();
    })

    it('should fail on "(10, 20) => 0"', () => {
        expect(() => {
            parseScript(`(10, 20) => 0`)
        }).to.throw();
    })

    it('should fail on "() <= 0"', () => {
        expect(() => {
            parseScript(`() <= 0`)
        }).to.throw();
    })

    it('should fail on "a =>  let v = 0; }"', () => {
        expect(() => {
            parseScript(`a => let v = 0; }`)
        }).to.throw();
    })

    it('should fail on "(a,...a)/*\r*/ => 0"', () => {
        expect(() => {
            parseScript(`(a,...a)/*\r*/ => 0`)
        }).to.throw();
    })

    it('should fail on "(a,...a)/*\n*/ => d"', () => {
        expect(() => {
            parseScript(`(a,...a)/*\n*/ => d`)
        }).to.throw();
    })

    it('should fail on "(a,...a)\n"', () => {
        expect(() => {
            parseScript(`(a,...a)\n`)
        }).to.throw();
    })

    it('should fail on "(a,...a)/*\u2029*/ => 0', () => {
        expect(() => {
            parseScript(`(a,...a)/*\u2029*/ => 0`)
        }).to.throw();
    })

    it('should fail on non arrow param followed by arrow', () => {
        expect(() => {
            parseScript(`(...a, ...b) => 0`)
        }).to.throw();
    });

    it('should fail if FormalParameters contains eval in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; (eval) => 12`)
        }).to.throw('');
    });

    it('should fail on use of await as reserved word within function generator function bondies', () => {
        expect(() => {
            parseScript(`async() => {
var await;
};`)
        }).to.throw();
    });

    it('([a.a]) => 42"', () => {
        expect(() => {
            parseScript(`([a.a]) => 42`)
        }).to.throw();
    });

    it('should fail on "(async function() { await: ; })"', () => {
        expect(() => {
            parseScript(`(async function() { await: ; })`)
        }).to.throw();
    });

    it('should fail on "async function() { await: ; }"', () => {
        expect(() => {
            parseScript(`async function() { await: ; }`)
        }).to.throw();
    });

    it('should fail on "console.log(typeof () => {});"', () => {
        expect(() => {
            parseScript(`console.log(typeof () => {});`);
        }).to.not.throw();
    });

    it('should fail on ""use strict"; eval => 1', () => {
        expect(() => {
            parseScript('"use strict"; eval => 1');
        }).to.throw('');
    });

    it('should fail on "(([]) => { "use strict";})"', () => {
        expect(() => {
            parseScript('(([]) => { "use strict";})');
        }).to.not.throw();
    });

    it('should fail on "(a,...a)=>1"', () => {
        expect(() => {
            parseScript('(a,...a)=>1');
        }).to.throw();
    });

    it('should fail on ""use strict"; (a, a) => 1"', () => {
        expect(() => {
            parseScript('"use strict"; (a, a) => 1');
        }).to.throw();
    });

    it('should fail on "() => { let a; let a; }"', () => {
        expect(() => {
            parseScript('() => { let a; let a; }');
        }).to.throw();
    });

    it('should fail on "(package) => {"use strict"}"', () => {
        expect(() => {
            parseScript('(package) => {"use strict"}');
        }).to.not.throw();
    });

    it('should fail on "(a) => { let a; }"', () => {
        expect(() => {
            parseScript('(a) => { let a; }');
        }).to.throw('');
    });

    it('should fail on ""use strict"; (arguments)=>1"', () => {
        expect(() => {
            parseScript('"use strict"; (arguments)=>1');
        }).to.throw('');
    });

    it('should fail on ""use strict"; (arguments, a) => 1"', () => {
        expect(() => {
            parseScript('"use strict"; (arguments, a) => 1');
        }).to.throw('');
    });

    it('should fail on ""use strict"; (yield) => 1"', () => {
        expect(() => {
            parseScript('"use strict"; (yield) => 1');
        }).to.throw();
    });

    it('should fail on "([a,[b],...b])=>1;"', () => {
        expect(() => {
            parseScript('([a,[b],...b])=>1;');
        }).to.throw();
    });

    it('should fail on invalid arrow function', () => {
        expect(() => {
            parseScript(`left = (aSize.width/2) - ()`)
        }).to.throw('');
    });

    it('should fail on numeric param', () => {
        expect(() => {
            parseScript(`(10, 20) => 0;`)
        }).to.throw('');
    });

    it('should fail on reverse arrow', () => {
        expect(() => {
            parseScript(`() <= 42;`)
        }).to.throw('');
    });

    it('should fail on strict octal', () => {
        expect(() => {
            parseScript(`"use strict"; (a) => 00;`)
        }).to.throw('');
    });

    it('should fail on strict param argument', () => {
        expect(() => {
            parseScript(`"use strict"; (arguments, a) => 42;`)
        }).to.throw('');
    });

    it('should fail on strict param without paran and argument', () => {
        expect(() => {
            parseScript(`"use strict"; arguments => 42;`)
        }).to.throw('');
    });

    it('should fail on parenthesized async in front of arrow function', () => {
        expect(() => {
            parseScript(`"use strict"; (x = yield) => {};`)
        }).to.throw('');
    });

    it('should fail on parenthesized async in front of arrow function', () => {
        expect(() => {
            parseScript(`"use strict"; (1, 5, 6, x = yield, 2, 3) => {};`)
        }).to.throw('');
    });
    
    it('should parse block body', () => {
        expect(parseScript(`e => { 42; };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "e"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 12,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 7,
                        "end": 10,
                        "expression": {
                          "type": "Literal",
                          "start": 7,
                          "end": 9,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse iife', () => {
        expect(parseScript(`e => ({ property: 42 });`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 24,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 23,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "e"
                    }
                  ],
                  "body": {
                    "type": "ObjectExpression",
                    "start": 6,
                    "end": 22,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 8,
                        "end": 20,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 16,
                          "name": "property"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 18,
                          "end": 20,
                          "value": 42,
                          "raw": "42"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse expression arrow', () => {
        expect(parseScript(`(x => x);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 1,
                  "end": 7,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "x"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binary expression, yield and  slash', () => {
        expect(parseScript(`() => a + b - yield / 1`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 23,
                  "expression": {
                    "async": false,
                    "body": {
                     "end": 23,
                      "left": {
                        "end": 11,
                        "left": {
                          "end": 7,
                          "name": "a",
                          "start": 6,
                          "type": "Identifier"
                        },
                       "operator": "+",
                        "right": {
                          "end": 11,
                          "name": "b",
                          "start": 10,
                          "type": "Identifier"
                       },
                        "start": 6,
                        "type": "BinaryExpression"
                      },
                      "operator": "-",
                      "right": {
                        "end": 23,
                        "left": {
                          "end": 19,
                          "name": "yield",
                          "start": 14,
                          "type": "Identifier",
                        },
                        "operator": "/",
                        "right": {
                          "end": 23,
                          "raw": "1",
                          "start": 22,
                          "type": "Literal",
                          "value": 1,
                        },
                        "start": 6,
                        "type": "BinaryExpression"
                      },
                      "start": 6,
                      "type": "BinaryExpression",
                    },
                    "end": 23,
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [],
                    "start": 0,
                   "type": "ArrowFunctionExpression"
                  },
                 "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 23,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse eval as binding identifier in sloppy mode', () => {
        expect(parseScript(`var af = eval => eval;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 22,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 21,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 21,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 9,
                            "end": 13,
                            "name": "eval"
                        }],
                        "body": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 21,
                            "name": "eval"
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should capture closure variabels', () => {
        expect(parseScript(`function foo(){
            var a = {a : 10};
            with(a){
                return () => a;
            }
         }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 123,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 123,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 123,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 28,
                      "end": 45,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 32,
                          "end": 44,
                          "id": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 33,
                            "name": "a"
                          },
                          "init": {
                            "type": "ObjectExpression",
                            "start": 36,
                            "end": 44,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 37,
                                "end": 43,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 37,
                                  "end": 38,
                                  "name": "a"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 41,
                                  "end": 43,
                                  "value": 10,
                                  "raw": "10"
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        }
                      ],
                      "kind": "var"
                    },
                    {
                      "type": "WithStatement",
                      "start": 58,
                      "end": 112,
                      "object": {
                        "type": "Identifier",
                        "start": 63,
                        "end": 64,
                        "name": "a"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 65,
                        "end": 112,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 83,
                            "end": 98,
                            "argument": {
                              "type": "ArrowFunctionExpression",
                              "start": 90,
                              "end": 97,
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "Identifier",
                                "start": 96,
                                "end": 97,
                                "name": "a"
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should capture closure variabels', () => {
        expect(parseScript(`var a;
        function foo(){
            eval("a = 10");
            return ()=>a;
         }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 95,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 6,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 5,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "a"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 95,
                "id": {
                  "type": "Identifier",
                  "start": 24,
                  "end": 27,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 29,
                  "end": 95,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 43,
                      "end": 58,
                      "expression": {
                        "type": "CallExpression",
                        "start": 43,
                        "end": 57,
                        "callee": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 47,
                          "name": "eval"
                        },
                        "arguments": [
                          {
                            "type": "Literal",
                            "start": 48,
                            "end": 56,
                            "value": "a = 10",
                            "raw": "\"a = 10\""
                          }
                        ]
                      }
                    },
                    {
                      "type": "ReturnStatement",
                      "start": 71,
                      "end": 84,
                      "argument": {
                        "type": "ArrowFunctionExpression",
                        "start": 78,
                        "end": 83,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "Identifier",
                          "start": 82,
                          "end": 83,
                          "name": "a"
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse nested object destructuring with a null value', () => {
        expect(parseScript(`var f = ([{ x }] = [null]) => {};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 33,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 32,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "f"
                    },
                    "init": {
                      "type": "ArrowFunctionExpression",
                      "start": 8,
                      "end": 32,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 9,
                          "end": 25,
                          "left": {
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 16,
                            "elements": [
                              {
                                "type": "ObjectPattern",
                                "start": 10,
                                "end": 15,
                                "properties": [
                                  {
                                    "type": "Property",
                                    "start": 12,
                                    "end": 13,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                      "type": "Identifier",
                                      "start": 12,
                                      "end": 13,
                                      "name": "x"
                                    },
                                    "kind": "init",
                                    "value": {
                                      "type": "Identifier",
                                      "start": 12,
                                      "end": 13,
                                      "name": "x"
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          "right": {
                            "type": "ArrayExpression",
                            "start": 19,
                            "end": 25,
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 20,
                                "end": 24,
                                "value": null,
                                "raw": "null"
                              }
                            ]
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 30,
                        "end": 32,
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameters cover includes rest concise body function body', () => {
        expect(parseScript(`f = ([,] = g()) => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 21,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 21,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "f"
                  },
                  "right": {
                    "type": "ArrowFunctionExpression",
                    "start": 4,
                    "end": 21,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 5,
                        "end": 14,
                        "left": {
                          "type": "ArrayPattern",
                          "start": 5,
                          "end": 8,
                          "elements": [
                            null
                          ]
                        },
                        "right": {
                          "type": "CallExpression",
                          "start": 11,
                          "end": 14,
                          "callee": {
                            "type": "Identifier",
                            "start": 11,
                            "end": 12,
                            "name": "g"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 19,
                      "end": 21,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameters cover includes rest concise body function body', () => {
        expect(parseScript(`f = ([...x] = values) => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 27,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "f"
                  },
                  "right": {
                    "type": "ArrowFunctionExpression",
                    "start": 4,
                    "end": 27,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 5,
                        "end": 20,
                        "left": {
                          "type": "ArrayPattern",
                          "start": 5,
                          "end": 11,
                          "elements": [
                            {
                              "type": "RestElement",
                              "start": 6,
                              "end": 10,
                              "argument": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "x"
                              }
                            }
                          ]
                        },
                        "right": {
                          "type": "Identifier",
                          "start": 14,
                          "end": 20,
                          "name": "values"
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 25,
                      "end": 27,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameters cover includes rest concise body function body', () => {
        expect(parseScript(`x => function(){}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 17,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "FunctionExpression",
                    "start": 5,
                    "end": 17,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 15,
                      "end": 17,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameters cover includes rest concise body function body', () => {
        expect(parseScript(`function foo(){
            return eval("()=>this");
         }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 63,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 63,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 63,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 28,
                      "end": 52,
                      "argument": {
                        "type": "CallExpression",
                        "start": 35,
                        "end": 51,
                        "callee": {
                          "type": "Identifier",
                          "start": 35,
                          "end": 39,
                          "name": "eval"
                        },
                        "arguments": [
                          {
                            "type": "Literal",
                            "start": 40,
                            "end": 50,
                            "value": "()=>this",
                            "raw": "\"()=>this\""
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameters cover includes rest concise body function body', () => {
        expect(parseScript(`var af = (x, ...y) => { return [x, y.length]; };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 48,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 47,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 6,
                      "name": "af"
                    },
                    "init": {
                      "type": "ArrowFunctionExpression",
                      "start": 9,
                      "end": 47,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 10,
                          "end": 11,
                          "name": "x"
                        },
                        {
                          "type": "RestElement",
                          "start": 13,
                          "end": 17,
                          "argument": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "y"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 22,
                        "end": 47,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 24,
                            "end": 45,
                            "argument": {
                              "type": "ArrayExpression",
                              "start": 31,
                              "end": 44,
                              "elements": [
                                {
                                  "type": "Identifier",
                                  "start": 32,
                                  "end": 33,
                                  "name": "x"
                                },
                                {
                                  "type": "MemberExpression",
                                  "start": 35,
                                  "end": 43,
                                  "object": {
                                    "type": "Identifier",
                                    "start": 35,
                                    "end": 36,
                                    "name": "y"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 37,
                                    "end": 43,
                                    "name": "length"
                                  },
                                  "computed": false
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as binding identifier in sloppy mode', () => {
        expect(parseScript(`var af = yield => 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 20,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 19,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 19,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 9,
                            "end": 14,
                            "name": "yield"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 18,
                            "end": 19,
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse conditional after concise body', () => {
        expect(parseScript(`(b = c) => d ? (e, f) : g;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 26,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 25,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "AssignmentPattern",
                      "start": 1,
                      "end": 6,
                      "left": {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "name": "b"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "name": "c"
                      }
                    }
                  ],
                  "body": {
                    "type": "ConditionalExpression",
                    "start": 11,
                    "end": 25,
                    "test": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "d"
                    },
                    "consequent": {
                      "type": "SequenceExpression",
                      "start": 16,
                      "end": 20,
                      "expressions": [
                        {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "e"
                        },
                        {
                          "type": "Identifier",
                          "start": 19,
                          "end": 20,
                          "name": "f"
                        }
                      ]
                    },
                    "alternate": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 25,
                      "name": "g"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrowparameters cover concisebody assignment expression', () => {
        expect(parseScript(`var af = (x) => x;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 18,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 17,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 17,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "x"
                        }],
                        "body": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "x"
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should capture closure variables - with', () => {
        expect(parseScript(`function foo(){
            var a = {a : 10};
            with(a){
                return () => a;
            }
         }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 123,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 123,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 123,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 28,
                      "end": 45,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 32,
                          "end": 44,
                          "id": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 33,
                            "name": "a"
                          },
                          "init": {
                            "type": "ObjectExpression",
                            "start": 36,
                            "end": 44,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 37,
                                "end": 43,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 37,
                                  "end": 38,
                                  "name": "a"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 41,
                                  "end": 43,
                                  "value": 10,
                                  "raw": "10"
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        }
                      ],
                      "kind": "var"
                    },
                    {
                      "type": "WithStatement",
                      "start": 58,
                      "end": 112,
                      "object": {
                        "type": "Identifier",
                        "start": 63,
                        "end": 64,
                        "name": "a"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 65,
                        "end": 112,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 83,
                            "end": 98,
                            "argument": {
                              "type": "ArrowFunctionExpression",
                              "start": 90,
                              "end": 97,
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "Identifier",
                                "start": 96,
                                "end": 97,
                                "name": "a"
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`f = ({ w: [x, y, z] = [4, 5, 6] }) => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 40,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 40,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 40,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 40,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 33,
                            "properties": [{
                                "type": "Property",
                                "start": 7,
                                "end": 31,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 7,
                                    "end": 8,
                                    "name": "w"
                                },
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 31,
                                    "left": {
                                        "type": "ArrayPattern",
                                        "start": 10,
                                        "end": 19,
                                        "elements": [{
                                                "type": "Identifier",
                                                "start": 11,
                                                "end": 12,
                                                "name": "x"
                                            },
                                            {
                                                "type": "Identifier",
                                                "start": 14,
                                                "end": 15,
                                                "name": "y"
                                            },
                                            {
                                                "type": "Identifier",
                                                "start": 17,
                                                "end": 18,
                                                "name": "z"
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "start": 22,
                                        "end": 31,
                                        "elements": [{
                                                "type": "Literal",
                                                "start": 23,
                                                "end": 24,
                                                "value": 4,
                                                "raw": "4"
                                            },
                                            {
                                                "type": "Literal",
                                                "start": 26,
                                                "end": 27,
                                                "value": 5,
                                                "raw": "5"
                                            },
                                            {
                                                "type": "Literal",
                                                "start": 29,
                                                "end": 30,
                                                "value": 6,
                                                "raw": "6"
                                            }
                                        ]
                                    }
                                },
                                "kind": "init"
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 38,
                            "end": 40,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse SingleNameBinding assigning name to "anonymous" generator function', () => {
        expect(parseScript(`f = ({ gen = function* () {}, xGen = function* x() {} }) => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 62,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 62,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 62,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 62,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 55,
                            "properties": [{
                                    "type": "Property",
                                    "start": 7,
                                    "end": 28,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 7,
                                        "end": 10,
                                        "name": "gen"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "start": 7,
                                        "end": 28,
                                        "left": {
                                            "type": "Identifier",
                                            "start": 7,
                                            "end": 10,
                                            "name": "gen"
                                        },
                                        "right": {
                                            "type": "FunctionExpression",
                                            "start": 13,
                                            "end": 28,
                                            "id": null,
                                            "generator": true,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 26,
                                                "end": 28,
                                                "body": []
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "start": 30,
                                    "end": 53,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 30,
                                        "end": 34,
                                        "name": "xGen"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "start": 30,
                                        "end": 53,
                                        "left": {
                                            "type": "Identifier",
                                            "start": 30,
                                            "end": 34,
                                            "name": "xGen"
                                        },
                                        "right": {
                                            "type": "FunctionExpression",
                                            "start": 37,
                                            "end": 53,
                                            "id": {
                                                "type": "Identifier",
                                                "start": 47,
                                                "end": 48,
                                                "name": "x"
                                            },
                                            "generator": true,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 51,
                                                "end": 53,
                                                "body": []
                                            }
                                        }
                                    }
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 60,
                            "end": 62,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse Rest element containing an object binding pattern', () => {
        expect(parseScript(`(() => {}) + 2`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 14,
                    "left": {
                        "type": "ArrowFunctionExpression",
                        "start": 1,
                        "end": 9,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 7,
                            "end": 9,
                            "body": []
                        }
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 2,
                        "raw": "2"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse Rest element containing an object binding pattern', () => {
        expect(parseScript(`f = ([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) => {}`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Literal",
                                                "value": 0,
                                                "raw": "0"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "v"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Literal",
                                                "value": 1,
                                                "raw": "1"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "w"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Literal",
                                                "value": 2,
                                                "raw": "2"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Literal",
                                                "value": 3,
                                                "raw": "3"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "length"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "z"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse Rest element containing an object binding pattern (arrow function expression (default parameter))', () => {
        expect(parseScript(`f = ([...{ length }] = [1, 2, 3]) => {}`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "length"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "length"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true
                                        }]
                                    }
                                }]
                            },
                            "right": {
                                "type": "ArrayExpression",
                                "elements": [{
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2,
                                        "raw": "2"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3,
                                        "raw": "3"
                                    }
                                ]
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse Rest element containing an object binding pattern (arrow function expression (default parameter))', () => {
        expect(parseScript(`f = ([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) => {}`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                                "type": "Property",
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 0,
                                                    "raw": "0"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "v"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            },
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "raw": "1"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "w"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            },
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 2,
                                                    "raw": "2"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            },
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 3,
                                                    "raw": "3"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "y"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            },
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "length"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "z"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            }
                                        ]
                                    }
                                }]
                            },
                            "right": {
                                "type": "ArrayExpression",
                                "elements": [{
                                        "type": "Literal",
                                        "value": 7,
                                        "raw": "7"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 8,
                                        "raw": "8"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 9,
                                        "raw": "9"
                                    }
                                ]
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow parameter with binding identifier yield', () => {
        expect(parseScript(`var af = yield => 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 20,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 19,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 19,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 9,
                            "end": 14,
                            "name": "yield"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 18,
                            "end": 19,
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse Rest element containing an object binding pattern', () => {
        expect(parseScript(`f = ([...{ length }]) => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 27,
                "expression": {
                    "end": 27,
                    "left": {
                        "end": 1,
                        "name": "f",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": false,
                        "body": {
                            "body": [],
                            "end": 27,
                            "start": 25,
                            "type": "BlockStatement"
                        },
                        "end": 27,
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [{
                            "elements": [{
                                "argument": {
                                    "end": 19,
                                    "properties": [{
                                        "computed": false,
                                        "end": 17,
                                        "key": {
                                            "end": 17,
                                            "name": "length",
                                            "start": 11,
                                            "type": "Identifier"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true,
                                        "start": 11,
                                        "type": "Property",
                                        "value": {
                                            "end": 17,
                                            "name": "length",
                                            "start": 11,
                                            "type": "Identifier"
                                        }
                                    }],
                                    "start": 9,
                                    "type": "ObjectPattern"
                                },
                                "end": 19,
                                "start": 6,
                                "type": "RestElement",
                            }],
                            "end": 20,
                            "start": 5,
                            "type": "ArrayPattern"
                        }, ],
                        "start": 4,
                        "type": "ArrowFunctionExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 27,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse multiple params', () => {
        expect(parseScript(`(a, b) => "test";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 17,
                "expression": {
                    "body": {
                        "end": 16,
                        "raw": "\"test\"",
                        "start": 10,
                        "type": "Literal",
                        "value": "test"
                    },
                    "end": 16,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "Identifier"
                        },
                        {
                            "end": 5,
                            "name": "b",
                            "start": 4,
                            "type": "Identifier"
                        },
                    ],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 17,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse no auto return', () => {
        expect(parseScript(`(a, b) => { 42; };`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "name": "b"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": 42,
                                "raw": "42"
                            }
                        }]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse no strict eval param', () => {
        expect(parseScript(`(eval, a) => 42;`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "eval"
                        },
                        {
                            "type": "Identifier",
                            "name": "a"
                        }
                    ],
                    "body": {
                        "type": "Literal",
                        "value": 42,
                        "raw": "42"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse not strict octal', () => {
        expect(parseScript(`(a) => 00`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "00"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse arrow function paren', () => {
        expect(parseScript('(a) => a;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow function', () => {
        expect(parseScript('a => a;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse return sequence', () => {
        expect(parseScript(`(x) => ((y, z) => (x, y, z));`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 29,
                "expression": {
                    "body": {
                        "body": {
                            "end": 26,
                            "expressions": [{
                                    "end": 20,
                                    "name": "x",
                                    "start": 19,
                                    "type": "Identifier"
                                },
                                {
                                    "end": 23,
                                    "name": "y",
                                    "start": 22,
                                    "type": "Identifier"
                                },
                                {
                                    "end": 26,
                                    "name": "z",
                                    "start": 25,
                                    "type": "Identifier"
                                }
                            ],
                            "start": 19,
                            "type": "SequenceExpression"
                        },
                        "end": 27,
                        "expression": true,
                        "generator": false,
                        "async": false,
                        "id": null,
                        "params": [{
                                "end": 10,
                                "name": "y",
                                "start": 9,
                                "type": "Identifier"
                            },
                            {
                                "end": 13,
                                "name": "z",
                                "start": 12,
                                "type": "Identifier"
                            }
                        ],
                        "start": 8,
                        "type": "ArrowFunctionExpression"
                    },
                    "end": 28,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "end": 2,
                        "name": "x",
                        "start": 1,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 29,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse single param parens', () => {
        expect(parseScript(`(e) => "test";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 14,
                "expression": {
                    "body": {
                        "end": 13,
                        "raw": "\"test\"",
                        "start": 7,
                        "type": "Literal",
                        "value": "test"
                    },
                    "end": 13,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "end": 2,
                        "name": "e",
                        "start": 1,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 14,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse single param', () => {
        expect(parseScript(`e => "test";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 12,
                "expression": {
                    "body": {
                        "end": 11,
                        "raw": "\"test\"",
                        "start": 5,
                        "type": "Literal",
                        "value": "test"
                    },
                    "end": 11,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "end": 1,
                        "name": "e",
                        "start": 0,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 12,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse comma dangle arrow', () => {
        expect(parseScript(`var foo = (a, b,) => {};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 23,
                    "id": {
                        "end": 7,
                        "name": "foo",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": {
                        "async": false,
                        "body": {
                            "body": [],
                            "end": 23,
                            "start": 21,
                            "type": "BlockStatement"
                        },
                        "end": 23,
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [{
                                "end": 12,
                                "name": "a",
                                "start": 11,
                                "type": "Identifier"
                            },
                            {
                                "end": 15,
                                "name": "b",
                                "start": 14,
                                "type": "Identifier"
                            }
                        ],
                        "start": 10,
                        "type": "ArrowFunctionExpression"
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 24,
                "kind": "var",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 24,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse comma dangle function', () => {
        expect(parseScript(`foo(a, b,);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 11,
                "expression": {
                    "arguments": [{
                            "end": 5,
                            "name": "a",
                            "start": 4,
                            "type": "Identifier"
                        },
                        {
                            "end": 8,
                            "name": "b",
                            "start": 7,
                            "type": "Identifier"
                        }
                    ],
                    "callee": {
                        "end": 3,
                        "name": "foo",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "end": 10,
                    "start": 0,
                    "type": "CallExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 11,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "((foo = await) => {})"', () => {

        expect(parseScript(`((foo = await) => {})`, {
            ranges: true,
            raw: true,
        })).to.eql({
            "body": [{
                "end": 21,
                "expression": {
                    "body": {
                        "body": [],
                        "end": 20,
                        "start": 18,
                        "type": "BlockStatement"
                    },
                    "end": 20,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "end": 13,
                        "left": {
                            "end": 5,
                            "name": "foo",
                            "start": 2,
                            "type": "Identifier"
                        },
                        "right": {
                            "end": 13,
                            "name": "await",
                            "start": 8,
                            "type": "Identifier"
                        },
                        "start": 2,
                        "type": "AssignmentPattern"
                    }],
                    "start": 1,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 21,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse arrow parameter with cover initializer', () => {
        expect(parseScript(`() => { let foo; }; foo => {}`, {
            ranges: true
        })).to.eql({
            "body": [{
                    "end": 19,
                    "expression": {
                        "async": false,
                        "body": {
                            "body": [{
                                "declarations": [{
                                    "end": 15,
                                    "id": {
                                        "end": 15,
                                        "name": "foo",
                                        "start": 12,
                                        "type": "Identifier"
                                    },
                                    "init": null,
                                    "start": 12,
                                    "type": "VariableDeclarator"
                                }],
                                "end": 16,
                                "kind": "let",
                                "start": 8,
                                "type": "VariableDeclaration"
                            }],
                            "end": 18,
                            "start": 6,
                            "type": "BlockStatement"
                        },
                        "end": 18,
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [],
                        "start": 0,
                        "type": "ArrowFunctionExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                },
                {
                    "end": 29,
                    "expression": {
                        "async": false,
                        "body": {
                            "body": [],
                            "end": 29,
                            "start": 27,
                            "type": "BlockStatement"
                        },
                        "end": 29,
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [{
                            "end": 23,
                            "name": "foo",
                            "start": 20,
                            "type": "Identifier"
                        }],
                        "start": 20,
                        "type": "ArrowFunctionExpression"
                    },
                    "start": 20,
                    "type": "ExpressionStatement"
                }
            ],
            "end": 29,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse arrow parameter with cover initializer', () => {
        expect(parseScript(`(x = 1) => x;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "AssignmentPattern",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1
                        }
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow parameter with cover lineTerminator concise body', () => {
        expect(parseScript(`(x) =>
    x;`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "x"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow parameter with cover lineTerminator concise body', () => {
        expect(parseScript(`yield => 1;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "yield"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 1
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow with only rest', () => {
        expect(parseScript(`(...a) => 0`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 0
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "() => "test""', () => {
        expect(parseScript(`() => "test"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "Literal",
                    "start": 6,
                    "end": 12,
                    "value": "test",
                    "raw": "\"test\""
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "e => { 42; }"', () => {
        expect(parseScript(`e => { 42; }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "e"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 12,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 7,
                        "end": 10,
                        "expression": {
                          "type": "Literal",
                          "start": 7,
                          "end": 9,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(() => {})()"', () => {
        expect(parseScript(`(() => {})()`, {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 12,
                "expression": {
                    "arguments": [],
                    "callee": {
                        "body": {
                            "body": [],
                            "end": 9,
                            "start": 7,
                            "type": "BlockStatement"
                        },
                        "end": 9,
                        "expression": false,
                        "generator": false,
                        "async": false,
                        "id": null,
                        "params": [],
                        "start": 1,
                        "type": "ArrowFunctionExpression"
                    },
                    "end": 12,
                    "start": 0,
                    "type": "CallExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 12,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "([a, , b]) => 42"', () => {
        expect(parseScript(`([a, , b]) => 42`, {
            ranges: true,
            raw: true
        })).to.eql({
"type": "Program",
"start": 0,
"end": 16,
"body": [
{
  "type": "ExpressionStatement",
  "start": 0,
  "end": 16,
  "expression": {
    "type": "ArrowFunctionExpression",
    "start": 0,
    "end": 16,
    "id": null,
    "generator": false,
    "expression": true,
    "async": false,
    "params": [
      {
        "type": "ArrayPattern",
        "start": 1,
        "end": 9,
        "elements": [
          {
            "type": "Identifier",
            "start": 2,
            "end": 3,
            "name": "a"
          },
          null,
          {
            "type": "Identifier",
            "start": 7,
            "end": 8,
            "name": "b"
          }
        ]
      }
    ],
    "body": {
      "type": "Literal",
      "start": 14,
      "end": 16,
      "value": 42,
      "raw": "42"
    }
  }
}
],
"sourceType": "script"
});
    });

    it('should parse "(eval, a = 10) => 42"', () => {
        expect(parseScript(`(eval, a = 10) => 42`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 20,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 5,
                      "name": "eval"
                    },
                    {
                      "type": "AssignmentPattern",
                      "start": 7,
                      "end": 13,
                      "left": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 13,
                        "value": 10,
                        "raw": "10"
                      }
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 18,
                    "end": 20,
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "([a]) => 0"', () => {
        expect(parseScript(`([a]) => abc`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 4,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "name": "a"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "name": "abc"
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse "a => 0"', () => {
        expect(parseScript(`a => 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 6,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 5,
                    "end": 6,
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse "(...[]) => 0"', () => {
        expect(parseScript(`(...[]) => 0`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": []
                        }
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 0
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "(a, ...[]) => 0"', () => {
        expect(parseScript(`(a, ...[]) => 0`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "ArrayPattern",
                                "elements": []
                            }
                        }
                    ],
                    "body": {
                        "type": "Literal",
                        "value": 0
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "() => () => 0"', () => {
        expect(parseScript(`() => () => 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 13,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 6,
                    "end": 13,
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "Literal",
                      "start": 12,
                      "end": 13,
                      "value": 0,
                      "raw": "0"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse "() => 0, 1"', () => {
        expect(parseScript(`() => 0, 1`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "SequenceExpression",
                    "expressions": [{
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "Literal",
                                "value": 0
                            },
                            "generator": false,
                            "expression": true,
                            "async": false
                        },
                        {
                            "type": "Literal",
                            "value": 1
                        }
                    ]
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "() => (a) = 0"', () => {
        expect(parseScript(`() => (a) = 0`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [],
                    "body": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0
                        }
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        })
    });

    
    it('should parse "(x)=>{ "use strict";}"', () => {
        expect(parseScript(`(x)=>{ "use strict";}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 21,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 21,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 21,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 7,
                        "end": 20,
                        "expression": {
                          "type": "Literal",
                          "start": 7,
                          "end": 19,
                          "value": "use strict",
                          "raw": "\"use strict\""
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse "([x=0], [])=>0"', () => {
        expect(parseScript(`([x=0], [])=>0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 6,
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 2,
                          "end": 5,
                          "left": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 4,
                            "end": 5,
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      ]
                    },
                    {
                      "type": "ArrayPattern",
                      "start": 8,
                      "end": 10,
                      "elements": []
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 13,
                    "end": 14,
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse simple identifier arrow"', () => {
        expect(parseScript('a => b', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 6,
                "expression": {
                    "body": {
                        "end": 6,
                        "name": "b",
                        "start": 5,
                        "type": "Identifier"
                    },
                    "end": 6,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "end": 1,
                        "name": "a",
                        "start": 0,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 6,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should "(()=>0)"', () => {
        expect(parseScript('(()=>0)', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 7,
                "expression": {
                    "async": false,
                    "body": {
                        "end": 6,
                        "start": 5,
                        "type": "Literal",
                        "value": 0
                    },
                    "end": 6,
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [],
                    "start": 1,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 7,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should "(...a) => 0"', () => {
        expect(parseScript('(...a) => 0', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 11,
                "expression": {
                    "async": false,
                    "body": {
                        "end": 11,
                        "start": 10,
                        "type": "Literal",
                        "value": 0
                    },
                    "end": 11,
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [{
                        "argument": {
                            "end": 5,
                            "name": "a",
                            "start": 4,
                            "type": "Identifier"
                        },
                        "end": 5,
                        "start": 1,
                        "type": "RestElement"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 11,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should "(a) => 0"', () => {
        expect(parseScript('(a) => 0', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 8,
                "expression": {
                    "async": false,
                    "body": {
                        "end": 8,
                        "start": 7,
                        "type": "Literal",
                        "value": 0
                    },
                    "end": 8,
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [{
                        "end": 2,
                        "name": "a",
                        "start": 1,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 8,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should "j = ([, [, a]]) => a;"', () => {
        expect(parseScript('j = ([, [, a]]) => a;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "j"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [
                                null,
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null,
                                        {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    ]
                                }
                            ]
                        }],
                        "body": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "generator": false,
                        "expression": true,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should "k = ([a] = new String(b)) => a;"', () => {
        expect(parseScript('k = ([a] = new String("b")) => a;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "k"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                }]
                            },
                            "right": {
                                "type": "NewExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "String"
                                },
                                "arguments": [{
                                    "type": "Literal",
                                    "value": "b",
                                    "raw": "\"b\""
                                }]
                            }
                        }],
                        "body": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "generator": false,
                        "expression": true,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow in logic expression', () => {
        expect(parseScript(`(() => {}) || true;
            (() => {}) ? a : b;`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "LogicalExpression",
                  "start": 0,
                  "end": 18,
                  "left": {
                    "type": "ArrowFunctionExpression",
                    "start": 1,
                    "end": 9,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 7,
                      "end": 9,
                      "body": []
                    }
                  },
                  "operator": "||",
                  "right": {
                    "type": "Literal",
                    "start": 14,
                    "end": 18,
                    "value": true,
                    "raw": "true"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 32,
                "end": 51,
                "expression": {
                  "type": "ConditionalExpression",
                  "start": 32,
                  "end": 50,
                  "test": {
                    "type": "ArrowFunctionExpression",
                    "start": 33,
                    "end": 41,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 39,
                      "end": 41,
                      "body": []
                    }
                  },
                  "consequent": {
                    "type": "Identifier",
                    "start": 45,
                    "end": 46,
                    "name": "a"
                  },
                  "alternate": {
                    "type": "Identifier",
                    "start": 49,
                    "end": 50,
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding element with object binding pattern and initializer', () => {
        expect(parseScript('f = ([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) => {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 63,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 63,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 63,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 63,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 56,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 6,
                                "end": 55,
                                "left": {
                                    "type": "ObjectPattern",
                                    "start": 6,
                                    "end": 26,
                                    "properties": [{
                                            "type": "Property",
                                            "start": 8,
                                            "end": 12,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 8,
                                                "end": 9,
                                                "name": "u"
                                            },
                                            "value": {
                                                "type": "Identifier",
                                                "start": 11,
                                                "end": 12,
                                                "name": "v"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 14,
                                            "end": 18,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 14,
                                                "end": 15,
                                                "name": "w"
                                            },
                                            "value": {
                                                "type": "Identifier",
                                                "start": 17,
                                                "end": 18,
                                                "name": "x"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 20,
                                            "end": 24,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 20,
                                                "end": 21,
                                                "name": "y"
                                            },
                                            "value": {
                                                "type": "Identifier",
                                                "start": 23,
                                                "end": 24,
                                                "name": "z"
                                            },
                                            "kind": "init"
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ObjectExpression",
                                    "start": 29,
                                    "end": 55,
                                    "properties": [{
                                            "type": "Property",
                                            "start": 31,
                                            "end": 37,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 31,
                                                "end": 32,
                                                "name": "u"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 34,
                                                "end": 37,
                                                "value": 444,
                                                "raw": "444"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 39,
                                            "end": 45,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 39,
                                                "end": 40,
                                                "name": "w"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 42,
                                                "end": 45,
                                                "value": 555,
                                                "raw": "555"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 47,
                                            "end": 53,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 47,
                                                "end": 48,
                                                "name": "y"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 50,
                                                "end": 53,
                                                "value": 666,
                                                "raw": "666"
                                            },
                                            "kind": "init"
                                        }
                                    ]
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 61,
                            "end": 63,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with array binding pattern and initializer', () => {
        expect(parseScript('f = ([[x, y, z] = [4, 5, 6]]) => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 36,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 35,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 35,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 28,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 6,
                                "end": 27,
                                "left": {
                                    "type": "ArrayPattern",
                                    "start": 6,
                                    "end": 15,
                                    "elements": [{
                                            "type": "Identifier",
                                            "start": 7,
                                            "end": 8,
                                            "name": "x"
                                        },
                                        {
                                            "type": "Identifier",
                                            "start": 10,
                                            "end": 11,
                                            "name": "y"
                                        },
                                        {
                                            "type": "Identifier",
                                            "start": 13,
                                            "end": 14,
                                            "name": "z"
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "start": 18,
                                    "end": 27,
                                    "elements": [{
                                            "type": "Literal",
                                            "start": 19,
                                            "end": 20,
                                            "value": 4,
                                            "raw": "4"
                                        },
                                        {
                                            "type": "Literal",
                                            "start": 22,
                                            "end": 23,
                                            "value": 5,
                                            "raw": "5"
                                        },
                                        {
                                            "type": "Literal",
                                            "start": 25,
                                            "end": 26,
                                            "value": 6,
                                            "raw": "6"
                                        }
                                    ]
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 33,
                            "end": 35,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with object binding pattern', () => {
        expect(parseScript('f = ([{ x, y, z } = { x: 44, y: 55, z: 66 }]) => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 52,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 52,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 51,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 51,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 44,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 6,
                                "end": 43,
                                "left": {
                                    "type": "ObjectPattern",
                                    "start": 6,
                                    "end": 17,
                                    "properties": [{
                                            "type": "Property",
                                            "start": 8,
                                            "end": 9,
                                            "method": false,
                                            "shorthand": true,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 8,
                                                "end": 9,
                                                "name": "x"
                                            },
                                            "kind": "init",
                                            "value": {
                                                "type": "Identifier",
                                                "start": 8,
                                                "end": 9,
                                                "name": "x"
                                            }
                                        },
                                        {
                                            "type": "Property",
                                            "start": 11,
                                            "end": 12,
                                            "method": false,
                                            "shorthand": true,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 11,
                                                "end": 12,
                                                "name": "y"
                                            },
                                            "kind": "init",
                                            "value": {
                                                "type": "Identifier",
                                                "start": 11,
                                                "end": 12,
                                                "name": "y"
                                            }
                                        },
                                        {
                                            "type": "Property",
                                            "start": 14,
                                            "end": 15,
                                            "method": false,
                                            "shorthand": true,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 14,
                                                "end": 15,
                                                "name": "z"
                                            },
                                            "kind": "init",
                                            "value": {
                                                "type": "Identifier",
                                                "start": 14,
                                                "end": 15,
                                                "name": "z"
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ObjectExpression",
                                    "start": 20,
                                    "end": 43,
                                    "properties": [{
                                            "type": "Property",
                                            "start": 22,
                                            "end": 27,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 22,
                                                "end": 23,
                                                "name": "x"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 25,
                                                "end": 27,
                                                "value": 44,
                                                "raw": "44"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 29,
                                            "end": 34,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 29,
                                                "end": 30,
                                                "name": "y"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 32,
                                                "end": 34,
                                                "value": 55,
                                                "raw": "55"
                                            },
                                            "kind": "init"
                                        },
                                        {
                                            "type": "Property",
                                            "start": 36,
                                            "end": 41,
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "start": 36,
                                                "end": 37,
                                                "name": "z"
                                            },
                                            "value": {
                                                "type": "Literal",
                                                "start": 39,
                                                "end": 41,
                                                "value": 66,
                                                "raw": "66"
                                            },
                                            "kind": "init"
                                        }
                                    ]
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 49,
                            "end": 51,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested object destructuring with a null value', () => {
        expect(parseScript('var f = ([{ x }]) => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 24,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 23,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "f"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 8,
                        "end": 23,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 16,
                            "elements": [{
                                "type": "ObjectPattern",
                                "start": 10,
                                "end": 15,
                                "properties": [{
                                    "type": "Property",
                                    "start": 12,
                                    "end": 13,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 12,
                                        "end": 13,
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "Identifier",
                                        "start": 12,
                                        "end": 13,
                                        "name": "x"
                                    }
                                }]
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 23,
                            "body": []
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse destructuring initializer with a "hole" ', () => {
        expect(parseScript('f = ([x = 23] = [,]) => {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 26,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 26,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 26,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 19,
                            "left": {
                                "type": "ArrayPattern",
                                "start": 5,
                                "end": 13,
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 6,
                                    "end": 12,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 6,
                                        "end": 7,
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "start": 10,
                                        "end": 12,
                                        "value": 23,
                                        "raw": "23"
                                    }
                                }]
                            },
                            "right": {
                                "type": "ArrayExpression",
                                "start": 16,
                                "end": 19,
                                "elements": [
                                    null
                                ]
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 24,
                            "end": 26,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse with empty pattern', () => {
        expect(parseScript('f = ([] = iter) => {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 21,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 21,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 21,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 14,
                            "left": {
                                "type": "ArrayPattern",
                                "start": 5,
                                "end": 7,
                                "elements": []
                            },
                            "right": {
                                "type": "Identifier",
                                "start": 10,
                                "end": 14,
                                "name": "iter"
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 19,
                            "end": 21,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse empty object pattern', () => {
        expect(parseScript('var f = ({}) => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 19,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 18,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "f"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 8,
                        "end": 18,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 9,
                            "end": 11,
                            "properties": []
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 16,
                            "end": 18,
                            "body": []
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse object pattern empty', () => {
        expect(parseScript('f = ({}) => {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 14,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 14,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 7,
                            "properties": []
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 12,
                            "end": 14,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse rest element containing another rest element', () => {
        expect(parseScript('f = ([...[...x]]) => {}', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "x"
                                        }
                                    }]
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse property objectt', () => {
        expect(parseScript('f = ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) => {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 53,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 53,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 53,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "f"
                    },
                    "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 53,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 46,
                            "properties": [{
                                "type": "Property",
                                "start": 7,
                                "end": 44,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 7,
                                    "end": 8,
                                    "name": "w"
                                },
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 44,
                                    "left": {
                                        "type": "ObjectPattern",
                                        "start": 10,
                                        "end": 21,
                                        "properties": [{
                                                "type": "Property",
                                                "start": 12,
                                                "end": 13,
                                                "method": false,
                                                "shorthand": true,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 12,
                                                    "end": 13,
                                                    "name": "x"
                                                },
                                                "kind": "init",
                                                "value": {
                                                    "type": "Identifier",
                                                    "start": 12,
                                                    "end": 13,
                                                    "name": "x"
                                                }
                                            },
                                            {
                                                "type": "Property",
                                                "start": 15,
                                                "end": 16,
                                                "method": false,
                                                "shorthand": true,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 15,
                                                    "end": 16,
                                                    "name": "y"
                                                },
                                                "kind": "init",
                                                "value": {
                                                    "type": "Identifier",
                                                    "start": 15,
                                                    "end": 16,
                                                    "name": "y"
                                                }
                                            },
                                            {
                                                "type": "Property",
                                                "start": 18,
                                                "end": 19,
                                                "method": false,
                                                "shorthand": true,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 18,
                                                    "end": 19,
                                                    "name": "z"
                                                },
                                                "kind": "init",
                                                "value": {
                                                    "type": "Identifier",
                                                    "start": 18,
                                                    "end": 19,
                                                    "name": "z"
                                                }
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "ObjectExpression",
                                        "start": 24,
                                        "end": 44,
                                        "properties": [{
                                                "type": "Property",
                                                "start": 26,
                                                "end": 30,
                                                "method": false,
                                                "shorthand": false,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 26,
                                                    "end": 27,
                                                    "name": "x"
                                                },
                                                "value": {
                                                    "type": "Literal",
                                                    "start": 29,
                                                    "end": 30,
                                                    "value": 4,
                                                    "raw": "4"
                                                },
                                                "kind": "init"
                                            },
                                            {
                                                "type": "Property",
                                                "start": 32,
                                                "end": 36,
                                                "method": false,
                                                "shorthand": false,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 32,
                                                    "end": 33,
                                                    "name": "y"
                                                },
                                                "value": {
                                                    "type": "Literal",
                                                    "start": 35,
                                                    "end": 36,
                                                    "value": 5,
                                                    "raw": "5"
                                                },
                                                "kind": "init"
                                            },
                                            {
                                                "type": "Property",
                                                "start": 38,
                                                "end": 42,
                                                "method": false,
                                                "shorthand": false,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 38,
                                                    "end": 39,
                                                    "name": "z"
                                                },
                                                "value": {
                                                    "type": "Literal",
                                                    "start": 41,
                                                    "end": 42,
                                                    "value": 6,
                                                    "raw": "6"
                                                },
                                                "kind": "init"
                                            }
                                        ]
                                    }
                                },
                                "kind": "init"
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 51,
                            "end": 53,
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse lexical this', () => {
        expect(parseScript(`function F() {
                this.af = _ => {
                  return this;
                };
              }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 113,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 113,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "F"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 113,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 97,
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 31,
                        "end": 96,
                        "operator": "=",
                        "left": {
                          "type": "MemberExpression",
                          "start": 31,
                          "end": 38,
                          "object": {
                            "type": "ThisExpression",
                            "start": 31,
                            "end": 35
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 36,
                            "end": 38,
                            "name": "af"
                          },
                          "computed": false
                        },
                        "right": {
                          "type": "ArrowFunctionExpression",
                          "start": 41,
                          "end": 96,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 41,
                              "end": 42,
                              "name": "_"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 46,
                            "end": 96,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 66,
                                "end": 78,
                                "argument": {
                                  "type": "ThisExpression",
                                  "start": 73,
                                  "end": 77
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse low precedence expression body no paren', () => {
        expect(parseScript('var square = x => x * x;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 24,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 23,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 10,
                        "name": "square"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 13,
                        "end": 23,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "name": "x"
                        }],
                        "body": {
                            "type": "BinaryExpression",
                            "start": 18,
                            "end": 23,
                            "left": {
                                "type": "Identifier",
                                "start": 18,
                                "end": 19,
                                "name": "x"
                            },
                            "operator": "*",
                            "right": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "x"
                            }
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow parameters cover concisebody / functionbody', () => {
        expect(parseScript('var af = (x) => { return x };', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 29,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 28,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 28,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "x"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 16,
                            "end": 28,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 18,
                                "end": 26,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 25,
                                    "end": 26,
                                    "name": "x"
                                }
                            }]
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse cover formal parameters - non-strict', () => {
        expect(parseScript('((arguments) => arguments);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 1,
                  "end": 25,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 2,
                      "end": 11,
                      "name": "arguments"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 25,
                    "name": "arguments"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse cover initializer ', () => {
        expect(parseScript('var af = ({x = 1}) => x;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 24,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 23,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 6,
                        "name": "af"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 9,
                        "end": 23,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "ObjectPattern",
                            "start": 10,
                            "end": 17,
                            "properties": [{
                                "type": "Property",
                                "start": 11,
                                "end": 16,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 11,
                                    "end": 12,
                                    "name": "x"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 11,
                                    "end": 16,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "start": 15,
                                        "end": 16,
                                        "value": 1,
                                        "raw": "1"
                                    }
                                }
                            }]
                        }],
                        "body": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 23,
                            "name": "x"
                        }
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });
    it('should parse "(() => 1)()"', () => {
        expect(parseScript(`(() => 1)()`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 11,
                    "callee": {
                        "type": "ArrowFunctionExpression",
                        "start": 1,
                        "end": 8,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "Literal",
                            "start": 7,
                            "end": 8,
                            "value": 1,
                            "raw": "1"
                        }
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a => a + 1)(1)"', () => {
        expect(parseScript(`(a => a + 1)(1)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 15,
                    "callee": {
                        "type": "ArrowFunctionExpression",
                        "start": 1,
                        "end": 11,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "a"
                        }],
                        "body": {
                            "type": "BinaryExpression",
                            "start": 6,
                            "end": 11,
                            "left": {
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "name": "a"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 10,
                                "end": 11,
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    },
                    "arguments": [{
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 1,
                        "raw": "1"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(() => { return 3; })()"', () => {
        expect(parseScript(`(() => { return 3; })()`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 23,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 23,
                    "callee": {
                        "type": "ArrowFunctionExpression",
                        "start": 1,
                        "end": 20,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 7,
                            "end": 20,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 9,
                                "end": 18,
                                "argument": {
                                    "type": "Literal",
                                    "start": 16,
                                    "end": 17,
                                    "value": 3,
                                    "raw": "3"
                                }
                            }]
                        }
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });
    it('should parse "((a, b) => a + b)(1, 4)"', () => {
        expect(parseScript(`((a, b) => a + b)(1, 4)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 23,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 23,
                    "callee": {
                        "type": "ArrowFunctionExpression",
                        "start": 1,
                        "end": 16,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                                "type": "Identifier",
                                "start": 2,
                                "end": 3,
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "b"
                            }
                        ],
                        "body": {
                            "type": "BinaryExpression",
                            "start": 11,
                            "end": 16,
                            "left": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "name": "a"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "b"
                            }
                        }
                    },
                    "arguments": [{
                            "type": "Literal",
                            "start": 18,
                            "end": 19,
                            "value": 1,
                            "raw": "1"
                        },
                        {
                            "type": "Literal",
                            "start": 21,
                            "end": 22,
                            "value": 4,
                            "raw": "4"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "((a, b) => { return a + b; })"', () => {
        expect(parseScript(`((a, b) => { return a + b; })`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 29,
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "start": 1,
                    "end": 28,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "name": "b"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 28,
                        "body": [{
                            "type": "ReturnStatement",
                            "start": 13,
                            "end": 26,
                            "argument": {
                                "type": "BinaryExpression",
                                "start": 20,
                                "end": 25,
                                "left": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "name": "a"
                                },
                                "operator": "+",
                                "right": {
                                    "type": "Identifier",
                                    "start": 24,
                                    "end": 25,
                                    "name": "b"
                                }
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "af({x: 2})"', () => {
        expect(parseScript(`af({x: 2})`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 10,
                    "callee": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 2,
                        "name": "af"
                    },
                    "arguments": [{
                        "type": "ObjectExpression",
                        "start": 3,
                        "end": 9,
                        "properties": [{
                            "type": "Property",
                            "start": 4,
                            "end": 8,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "x"
                            },
                            "value": {
                                "type": "Literal",
                                "start": 7,
                                "end": 8,
                                "value": 2,
                                "raw": "2"
                            },
                            "kind": "init"
                        }]
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(x => x)"', () => {
        expect(parseScript(`(x => x)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 1,
                  "end": 7,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "x"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "fn(({field_name: field_value}) => field_name)"', () => {
        expect(parseScript(`fn(({field_name: field_value}) => field_name)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 45,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 45,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 45,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 2,
                    "name": "fn"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 3,
                      "end": 44,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "ObjectPattern",
                          "start": 4,
                          "end": 29,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 5,
                              "end": 28,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 15,
                                "name": "field_name"
                              },
                              "value": {
                                "type": "Identifier",
                                "start": 17,
                                "end": 28,
                                "name": "field_value"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      ],
                      "body": {
                        "type": "Identifier",
                        "start": 34,
                        "end": 44,
                        "name": "field_name"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse as param with params', () => {
        expect(parseScript(`foo((x, y) => {});`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 17,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "foo"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 4,
                      "end": 16,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "name": "x"
                        },
                        {
                          "type": "Identifier",
                          "start": 8,
                          "end": 9,
                          "name": "y"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 14,
                        "end": 16,
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse as param', () => {
        expect(parseScript(`foo(() => {});`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 13,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "foo"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 4,
                      "end": 12,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 10,
                        "end": 12,
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse ""use strict"; args = (arguments[0] = event, arguments);"', () => {
        expect(parseScript(`"use strict"; args = (arguments[0] = event, arguments);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 55,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 14,
                "end": 55,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 14,
                  "end": 54,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 18,
                    "name": "args"
                  },
                  "right": {
                    "type": "SequenceExpression",
                    "start": 22,
                    "end": 53,
                    "expressions": [
                      {
                        "type": "AssignmentExpression",
                        "start": 22,
                        "end": 42,
                        "operator": "=",
                        "left": {
                          "type": "MemberExpression",
                          "start": 22,
                          "end": 34,
                          "object": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 31,
                            "name": "arguments"
                          },
                          "property": {
                            "type": "Literal",
                            "start": 32,
                            "end": 33,
                            "value": 0,
                            "raw": "0"
                          },
                          "computed": true
                        },
                        "right": {
                          "type": "Identifier",
                          "start": 37,
                          "end": 42,
                          "name": "event"
                        }
                      },
                      {
                        "type": "Identifier",
                        "start": 44,
                        "end": 53,
                        "name": "arguments"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async parentheiszed arrow function underneath async unparenthesized arrow', () => {
        expect(parseScript(`() => { 42; };
        async a => { 42; }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 41,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 13,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 6,
                    "end": 13,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 8,
                        "end": 11,
                        "expression": {
                          "type": "Literal",
                          "start": 8,
                          "end": 10,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 41,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 41,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 29,
                      "end": 30,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 41,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 36,
                        "end": 39,
                        "expression": {
                          "type": "Literal",
                          "start": 36,
                          "end": 38,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });

      it('should parse async unparenthesized arrow function underneath async unparenthesized arrow', () => {
        expect(parseScript(`a => { 42; };
        async a => { 42; }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 40,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 12,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 12,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 7,
                        "end": 10,
                        "expression": {
                          "type": "Literal",
                          "start": 7,
                          "end": 9,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 22,
                "end": 40,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 22,
                  "end": 40,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 28,
                      "end": 29,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 33,
                    "end": 40,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 35,
                        "end": 38,
                        "expression": {
                          "type": "Literal",
                          "start": 35,
                          "end": 37,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });

      it('should parse arrow functions underneath async arrow', () => {
        expect(parseScript(`() => {}
        async () => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 8,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 6,
                    "end": 8,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 17,
                "end": 31,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 17,
                  "end": 31,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 29,
                    "end": 31,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });

      it('should parse two arrow functions underneath each other', () => {
        expect(parseScript(`() => {}
        () => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 8,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 6,
                    "end": 8,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 17,
                "end": 25,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 17,
                  "end": 25,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 23,
                    "end": 25,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });
});