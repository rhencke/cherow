import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For of', () => {
    
        it('should fail on async function declaration is not allowed in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) async function f() {}');
            }).to.throw();
        });
    
        it('should fail when a `yield` token appears within the Initializer of a nested destructuring assignment', () => {
            expect(() => {
                parseScript('"use strict"; for ({ x: [x = yield] } of [{ x: [] }]) ;');
            }).to.throw();
        });
    
        it('should fail on async generator function declaration is not allowed in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) async function* g() {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on lexical declaration (const) in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) const y = null;');
            }).to.throw();
        });
    
        it('should fail on function declaration in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) function f() {}');
            }).to.throw();
        });
    
        it('should fail on lexical declaration (let) in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) let y;');
            }).to.throw();
        });
    
        it('should fail on duplicate', () => {
            expect(() => {
                parseScript('for (const [x, x] of []) {}');
            }).to.throw();
        });
    
        it('should fail if expression in head assignment expression position', () => {
            expect(() => {
                parseScript('for (let x of [], []) {}');
            }).to.throw();
        });
    
        it('should fail if expression in head assignment expression position', () => {
            expect(() => {
                parseScript(`var x;
                for (x of [], []) {}`);
            }).to.throw('');
        });
    
        it('should fail if left hand side expression is not a simple assignment target', () => {
            expect(() => {
                parseScript(`for ((this) of []) {}`);
            }).to.throw('');
        });
    
        it('should fail on invalid destructuring assignment pattern (array literal)', () => {
            expect(() => {
                parseScript(`for ([(x, y)] of []) {}`);
            }).to.throw('');
        });
    
        it('should fail on invalid destructuring assignment pattern (object literal)', () => {
            expect(() => {
                parseScript(`for ({ m() {} } of []) {}`);
            }).to.throw('');
        });
    
        it('should fail on invalid use of lexical (let)', () => {
            expect(() => {
                parseScript(`for ( let of [] ) ;`);
            }).to.throw('');
        });
    
        it('should fail on invalid use of lexical (let)', () => {
            expect(() => {
                parseScript(`for (this of []) {}`);
            }).to.throw('');
        });
    
        it('should fail on "for (var x of [], []) {}"', () => {
            expect(() => {
                parseScript('for (var x of [], []) {}');
            }).to.throw();
        });
    
        it('should fail on "for (x of []) label1: label2: function f() {}"', () => {
            expect(() => {
                parseScript('for (x of []) label1: label2: function f() {}');
            }).to.throw();
        });
    
        it('should fail on "for (var x of []) label1: label2: function f() {}"', () => {
            expect(() => {
                parseScript('for (var x of []) label1: label2: function f() {}');
            }).to.throw();
        });
    
        it('should fail on "for ( let of [] ) ;"', () => {
            expect(() => {
                parseScript('for ( let of [] ) ;');
            }).to.throw();
        });
    
        it('should fail on "for (let [x, x] of []) {}"', () => {
            expect(() => {
                parseScript('for (let [x, x] of []) {}');
            }).to.throw();
        });
    
        it('should fail on "for (let x of []) { var x; }"', () => {
            expect(() => {
                parseScript('for (let x of []) { var x; }');
            }).to.not.throw();
        });
    
        it('should fail on "for (const let of []) {}"', () => {
            expect(() => {
                parseScript('for (const let of []) {}');
            }).to.throw();
        });
    
        it('should fail on escaped of', () => {
            expect(() => {
                parseScript('for (var x o\\u0066 []) ;');
            }).to.throw();
        });
    
        it('should fail on invalid rest element (nested array pattern) with initializer', () => {
            expect(() => {
                parseScript('for (var [...[ x ] = []] of [[]]) {}');
            }).to.throw();
        });
    
        it('should fail on "for ( let of [] ) ;"', () => {
            expect(() => {
                parseScript('for ( let of [] ) ;');
            }).to.throw();
        });
    
    
        it('should fail on invalid const let', () => {
            expect(() => {
                parseScript('for (const let of y);');
            }).to.throw();
        });
        it('should fail on invalid var init', () => {
            expect(() => {
                parseScript('for (var x = 1 of y);');
            }).to.throw();
        });
        it('should fail on invalid strict for of let', () => {
            expect(() => {
                parseScript('"use strict"; for (x of let) {}');
            }).to.throw();
        });
        it('should fail on invalid lhs init', () => {
            expect(() => {
                parseScript('for (this of that);');
            }).to.throw();
        });
        it('should fail on invalid for of object pattern', () => {
            expect(() => {
                parseScript('for (var {x} = y of z);');
            }).to.throw();
        });
        it('should fail on invalid for of array pattern', () => {
            expect(() => {
                parseScript('for (var [p]=q of r);');
            }).to.throw();
        });
        it('should fail on invalid const init', () => {
            expect(() => {
                parseScript('for (const x = 1 of y);');
            }).to.throw();
        });
        it('should fail on invalid assign for of', () => {
            expect(() => {
                parseScript('for (x=0 of y);');
            }).to.throw();
        });
        it('should fail on async generator declaration in statement position', () => {
            expect(() => {
                parseScript('for ( ; false; ) async function* g() {}');
            }).to.throw();
        });
        it('should fail lexical declaration (const) in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) const y = null;');
            }).to.throw();
        });
        it('should fail lexical declaration (let) in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) let y;');
            }).to.throw();
        });
        it('should fail function declaration in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) function f() {}');
            }).to.throw();
        });
        it('should fail generator declaration in statement position', () => {
            expect(() => {
                parseScript('for (var x of []) function* g() {}');
            }).to.throw();
        });
        it('should fail on labeled statement', () => {
            expect(() => {
                parseScript('for (const x; false; ) label1: label2: function f() {}');
            }).to.throw();
        });
        it('should fail on re-declare variables declared in the head', () => {
            expect(() => {
                parseScript(`for (const x of []) { var x; }`);
            }).to.throw();
        });
        it('should fail if declaration contain a binding for `let`', () => {
            expect(() => {
                parseScript(`for (const let of []) {}`);
            }).to.throw();
        });
        it('should fail if Head"s LeftHandSideExpression is not a simple assignment target', () => {
            expect(() => {
                parseScript(`for ((this) of []) {}`);
            }).to.throw();
        });
        it('should fail if labeled statement is true (Annex B semantic)', () => {
            expect(() => {
                parseScript(`for (const x of []) label1: label2: function f() {}`);
            }).to.throw();
        });
        it('should fail on labelled function statement var', () => {
            expect(() => {
                parseScript(`for (var x of []) label1: label2: function f() {}`);
            }).to.throw();
        });
    
        it('should fail "for(let of 0);"', () => {
            expect(() => {
                parseScript(`for(let of 0);`);
            }).to.throw('');
        });
    
        it('should fail "for(this of 0);"', () => {
            expect(() => {
                parseScript(`for(this of 0);`);
            }).to.throw('');
        });
    
        it('should fail "for(var a = 0 of b);"', () => {
            expect(() => {
                parseScript(`for(var a = 0 of b);`);
            }).to.throw('');
        });
    
        it('should fail "for(const a = 0 of b);"', () => {
            expect(() => {
                parseScript(`for(const a = 0 of b);`);
            }).to.throw('');
        });
    
        it('should fail "for(({a}) of 0);"', () => {
            expect(() => {
                parseScript(`for(({a}) of 0);`);
            }).to.throw('');
        });
    
        it('should fail "for(([a]) of 0);"', () => {
            expect(() => {
                parseScript(`for(([a]) of 0);`);
            }).to.throw('');
        });
    
        it('should fail "for(var a of b, c);"', () => {
            expect(() => {
                parseScript(`for(var a of b, c);`);
            }).to.throw('');
        });
    
        it('should fail "for(a of b, c);"', () => {
            expect(() => {
                parseScript(`for(a of b, c);`);
            }).to.throw('');
        });
    
        it('should fail if use of eval in object pattern in strict pattern', () => {
            expect(() => {
                parseScript(`"use strict"; for ({ eval } of [{}]) ;`);
            }).to.throw('');
        });
    
        it('should parse "for (var {a} of /b/);"', () => {
            expect(parseScript(`for (var {a} of /b/);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 20,
                        "end": 21
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 10,
                                        "end": 11
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 10,
                                        "end": 11
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 10,
                                    "end": 11
                                }],
                                "start": 9,
                                "end": 12
                            },
                            "start": 9,
                            "end": 12
                        }],
                        "kind": "var",
                        "start": 5,
                        "end": 12
                    },
                    "right": {
                        "type": "Literal",
                        "value": /b/,
                        "regex": {
                            "pattern": "b",
                            "flags": ""
                        },
                        "start": 16,
                        "end": 19,
                        "raw": "/b/"
                    },
                    "await": false,
                    "start": 0,
                    "end": 21
                }],
                "sourceType": "script",
                "start": 0,
                "end": 21
            });
        });
    
        it('should parse regular expression', () => {
            expect(parseScript(`for (var a of /b/);`, {
                ranges: true,
                raw: true,
                next: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 19
                  }
                },
                "body": [
                  {
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 19,
                    "await": false,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "left": {
                      "type": "VariableDeclaration",
                      "start": 5,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 9,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "a"
                          },
                          "init": null
                        }
                      ],
                      "kind": "var"
                    },
                    "right": {
                      "type": "Literal",
                      "start": 14,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "value": /b/,
                      "raw": "/b/",
                      "regex": {
                        "pattern": "b",
                        "flags": ""
                      }
                    },
                    "body": {
                      "type": "EmptyStatement",
                      "start": 18,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse for of array pattern let', () => {
            expect(parseScript(`for (let [p, q] of r);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 22,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 15,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 15,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 15,
                                "elements": [{
                                        "type": "Identifier",
                                        "start": 10,
                                        "end": 11,
                                        "name": "p"
                                    },
                                    {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "q"
                                    }
                                ]
                            },
                            "init": null
                        }],
                        "kind": "let"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "name": "r"
                    },
                    "await": false,
                    "body": {
                        "type": "EmptyStatement",
                        "start": 21,
                        "end": 22
                    }
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse for of array pattern var', () => {
            expect(parseScript(`for (var [p, q] of r);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 22,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 15,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 15,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 15,
                                "elements": [{
                                        "type": "Identifier",
                                        "start": 10,
                                        "end": 11,
                                        "name": "p"
                                    },
                                    {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "q"
                                    }
                                ]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "name": "r"
                    },
                    "await": false,
                    "body": {
                        "type": "EmptyStatement",
                        "start": 21,
                        "end": 22
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of array pattern', () => {
            expect(parseScript(`for ([p, q] of r);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 18,
                    "await": false,
                    "left": {
                        "type": "ArrayPattern",
                        "start": 5,
                        "end": 11,
                        "elements": [{
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "name": "p"
                            },
                            {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "q"
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 16,
                        "name": "r"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 17,
                        "end": 18
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of let', () => {
            expect(parseScript(`for (x of let) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 17,
                    "await": false,
                    "left": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 13,
                        "name": "let"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 15,
                        "end": 17,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    

    it('should handle for of with var and braces', () => {
        expect(parseScript(`for (var x of foo) {
    doSomething();
}`)).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForOfStatement",
                    "await": false,
                    "right": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "left": {
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "init": null
                            }
                        ],
                        "type": "VariableDeclaration",
                        "kind": "var"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "doSomething"
                                    },
                                    "arguments": []
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

        it('should parse object pattern var', () => {
            expect(parseScript(`for (var {x, y} of z);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 22,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 15,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 15,
                            "id": {
                                "type": "ObjectPattern",
                                "start": 9,
                                "end": 15,
                                "properties": [{
                                        "type": "Property",
                                        "start": 10,
                                        "end": 11,
                                        "method": false,
                                        "shorthand": true,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 10,
                                            "end": 11,
                                            "name": "x"
                                        },
                                        "kind": "init",
                                        "value": {
                                            "type": "Identifier",
                                            "start": 10,
                                            "end": 11,
                                            "name": "x"
                                        }
                                    },
                                    {
                                        "type": "Property",
                                        "start": 13,
                                        "end": 14,
                                        "method": false,
                                        "shorthand": true,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 13,
                                            "end": 14,
                                            "name": "y"
                                        },
                                        "kind": "init",
                                        "value": {
                                            "type": "Identifier",
                                            "start": 13,
                                            "end": 14,
                                            "name": "y"
                                        }
                                    }
                                ]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "name": "z"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 21,
                        "end": 22
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of object pattern', () => {
            expect(parseScript(`for ({x, y} of z);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 18,
                    "await": false,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 11,
                        "properties": [{
                                "type": "Property",
                                "start": 6,
                                "end": 7,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "x"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "x"
                                }
                            },
                            {
                                "type": "Property",
                                "start": 9,
                                "end": 10,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 9,
                                    "end": 10,
                                    "name": "y"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
                                    "start": 9,
                                    "end": 10,
                                    "name": "y"
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 16,
                        "name": "z"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 17,
                        "end": 18
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of with const', () => {
            expect(parseScript(`for (const y of list);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 22,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 12,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 11,
                            "end": 12,
                            "id": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "name": "y"
                            },
                            "init": null
                        }],
                        "kind": "const"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 20,
                        "name": "list"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 21,
                        "end": 22
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of array pattern let', () => {
            expect(parseScript(`for (let z of list);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 20,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 10,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 10,
                            "id": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "z"
                            },
                            "init": null
                        }],
                        "kind": "let"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 18,
                        "name": "list"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 19,
                        "end": 20
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of with var', () => {
            expect(parseScript(`for (var x of list);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 20,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 10,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 10,
                            "id": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 18,
                        "name": "list"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 19,
                        "end": 20
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of', () => {
            expect(parseScript(`for (p of q);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 13,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 13,
                    "await": false,
                    "left": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "name": "p"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "name": "q"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 12,
                        "end": 13
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for let of of', () => {
            expect(parseScript(`for (let of of xyz);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 20,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 11,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 11,
                            "id": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 11,
                                "name": "of"
                            },
                            "init": null
                        }],
                        "kind": "let"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 18,
                        "name": "xyz"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 19,
                        "end": 20
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "for([{a=0}] of b);"', () => {
            expect(parseScript(`for([{a=0}] of b);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 17,
                        "end": 18
                    },
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 6,
                                    "end": 7
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 6,
                                        "end": 7
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 8,
                                        "end": 9,
                                        "raw": "0"
                                    },
                                    "start": 6,
                                    "end": 9
                                },
                                "start": 6,
                                "end": 9
                            }],
                            "start": 5,
                            "end": 10
                        }],
                        "start": 4,
                        "end": 11
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b",
                        "start": 15,
                        "end": 16
                    },
                    "await": false,
                    "start": 0,
                    "end": 18
                }],
                "sourceType": "script",
                "start": 0,
                "end": 18
            });
        });
    
        it('should parse "for({a=0} of b);"', () => {
            expect(parseScript(`for({a=0} of b);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 16,
                    "await": false,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 9,
                        "properties": [{
                            "type": "Property",
                            "start": 5,
                            "end": 8,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            },
                            "kind": "init",
                            "value": {
                                "type": "AssignmentPattern",
                                "start": 5,
                                "end": 8,
                                "left": {
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "a"
                                },
                                "right": {
                                    "type": "Literal",
                                    "start": 7,
                                    "end": 8,
                                    "value": 0,
                                    "raw": "0"
                                }
                            }
                        }]
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 14,
                        "name": "b"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 15,
                        "end": 16
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "for(const a of b);"', () => {
            expect(parseScript(`for(const a of b);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 18,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 4,
                        "end": 11,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 10,
                            "end": 11,
                            "id": {
                                "type": "Identifier",
                                "start": 10,
                                "end": 11,
                                "name": "a"
                            },
                            "init": null
                        }],
                        "kind": "const"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 16,
                        "name": "b"
                    },
                    "body": {
                        "type": "EmptyStatement",
                        "start": 17,
                        "end": 18
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "for(var a of b);"', () => {
            expect(parseScript(`for(var a of b);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 15,
                        "end": 16
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 8,
                                "end": 9
                            },
                            "start": 8,
                            "end": 9
                        }],
                        "kind": "var",
                        "start": 4,
                        "end": 9
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b",
                        "start": 13,
                        "end": 14
                    },
                    "await": false,
                    "start": 0,
                    "end": 16
                }],
                "sourceType": "script",
                "start": 0,
                "end": 16
            });
        });

        it('should parse "for (var x of list) process(x);"', () => {
            expect(parseScript(`for (var x of list) process(x);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "arguments": [{
                                "type": "Identifier",
                                "name": "x",
                                "start": 28,
                                "end": 29
                            }],
                            "callee": {
                                "type": "Identifier",
                                "name": "process",
                                "start": 20,
                                "end": 27
                            },
                            "start": 20,
                            "end": 30
                        },
                        "start": 20,
                        "end": 31
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 9,
                                "end": 10
                            },
                            "start": 9,
                            "end": 10
                        }],
                        "kind": "var",
                        "start": 5,
                        "end": 10
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "list",
                        "start": 14,
                        "end": 18
                    },
                    "await": false,
                    "start": 0,
                    "end": 31
                }],
                "sourceType": "script",
                "start": 0,
                "end": 31
            });
        });
    
        it('should parse yield', () => {
            expect(parseScript(`(function*() {
          for (var x of dataIterator) {
            i++;
            yield;
            j++;
          }
        
          k++;
        })();`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "arguments": [],
                            "callee": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ForOfStatement",
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "UpdateExpression",
                                                            "argument": {
                                                                "type": "Identifier",
                                                                "name": "i",
                                                                "start": 67,
                                                                "end": 68
                                                            },
                                                            "operator": "++",
                                                            "prefix": false,
                                                            "start": 67,
                                                            "end": 70
                                                        },
                                                        "start": 67,
                                                        "end": 71
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "YieldExpression",
                                                            "argument": null,
                                                            "delegate": false,
                                                            "start": 84,
                                                            "end": 89
                                                        },
                                                        "start": 84,
                                                        "end": 90
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "UpdateExpression",
                                                            "argument": {
                                                                "type": "Identifier",
                                                                "name": "j",
                                                                "start": 103,
                                                                "end": 104
                                                            },
                                                            "operator": "++",
                                                            "prefix": false,
                                                            "start": 103,
                                                            "end": 106
                                                        },
                                                        "start": 103,
                                                        "end": 107
                                                    }
                                                ],
                                                "start": 53,
                                                "end": 119
                                            },
                                            "left": {
                                                "type": "VariableDeclaration",
                                                "declarations": [
                                                    {
                                                        "type": "VariableDeclarator",
                                                        "init": null,
                                                        "id": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 34,
                                                            "end": 35
                                                        },
                                                        "start": 34,
                                                        "end": 35
                                                    }
                                                ],
                                                "kind": "var",
                                                "start": 30,
                                                "end": 35
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "name": "dataIterator",
                                                "start": 39,
                                                "end": 51
                                            },
                                            "await": false,
                                            "start": 25,
                                            "end": 119
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "UpdateExpression",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "k",
                                                    "start": 139,
                                                    "end": 140
                                                },
                                                "operator": "++",
                                                "prefix": false,
                                                "start": 139,
                                                "end": 142
                                            },
                                            "start": 139,
                                            "end": 143
                                        }
                                    ],
                                    "start": 13,
                                    "end": 153
                                },
                                "async": false,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 1,
                                "end": 153
                            },
                            "start": 0,
                            "end": 156
                        },
                        "start": 0,
                        "end": 157
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 157
            });
        });
    
    
        it('should parse return', () => {
            expect(parseScript(`var result = (function() {
          for (var x of iterator) {
            i++;
            return 34;
          }
        })();`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "CallExpression",
                                    "arguments": [],
                                    "callee": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ForOfStatement",
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [
                                                            {
                                                                "type": "ExpressionStatement",
                                                                "expression": {
                                                                    "type": "UpdateExpression",
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "name": "i",
                                                                        "start": 75,
                                                                        "end": 76
                                                                    },
                                                                    "operator": "++",
                                                                    "prefix": false,
                                                                    "start": 75,
                                                                    "end": 78
                                                                },
                                                                "start": 75,
                                                                "end": 79
                                                            },
                                                            {
                                                                "type": "ReturnStatement",
                                                                "argument": {
                                                                    "type": "Literal",
                                                                    "value": 34,
                                                                    "start": 99,
                                                                    "end": 101,
                                                                    "raw": "34"
                                                                },
                                                                "start": 92,
                                                                "end": 102
                                                            }
                                                        ],
                                                        "start": 61,
                                                        "end": 114
                                                    },
                                                    "left": {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "init": null,
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 46,
                                                                    "end": 47
                                                                },
                                                                "start": 46,
                                                                "end": 47
                                                            }
                                                        ],
                                                        "kind": "var",
                                                        "start": 42,
                                                        "end": 47
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "iterator",
                                                        "start": 51,
                                                        "end": 59
                                                    },
                                                    "await": false,
                                                    "start": 37,
                                                    "end": 114
                                                }
                                            ],
                                            "start": 25,
                                            "end": 124
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 14,
                                        "end": 124
                                    },
                                    "start": 13,
                                    "end": 127
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "result",
                                    "start": 4,
                                    "end": 10
                                },
                                "start": 4,
                                "end": 127
                            }
                        ],
                        "kind": "var",
                        "start": 0,
                        "end": 128
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 128
            });
        });
    
        it('should parse nested', () => {
            expect(parseScript(`for (var x of outerIterable) {
          i++;
          j = 0;
          for (var y of innerIterable) {
            j++;
          }
        }`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "UpdateExpression",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "i",
                                            "start": 41,
                                            "end": 42
                                        },
                                        "operator": "++",
                                        "prefix": false,
                                        "start": 41,
                                        "end": 44
                                    },
                                    "start": 41,
                                    "end": 45
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "j",
                                            "start": 56,
                                            "end": 57
                                        },
                                        "operator": "=",
                                        "right": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 60,
                                            "end": 61,
                                            "raw": "0"
                                        },
                                        "start": 56,
                                        "end": 61
                                    },
                                    "start": 56,
                                    "end": 62
                                },
                                {
                                    "type": "ForOfStatement",
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "UpdateExpression",
                                                    "argument": {
                                                        "type": "Identifier",
                                                        "name": "j",
                                                        "start": 116,
                                                        "end": 117
                                                    },
                                                    "operator": "++",
                                                    "prefix": false,
                                                    "start": 116,
                                                    "end": 119
                                                },
                                                "start": 116,
                                                "end": 120
                                            }
                                        ],
                                        "start": 102,
                                        "end": 132
                                    },
                                    "left": {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "init": null,
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "y",
                                                    "start": 82,
                                                    "end": 83
                                                },
                                                "start": 82,
                                                "end": 83
                                            }
                                        ],
                                        "kind": "var",
                                        "start": 78,
                                        "end": 83
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "innerIterable",
                                        "start": 87,
                                        "end": 100
                                    },
                                    "await": false,
                                    "start": 73,
                                    "end": 132
                                }
                            ],
                            "start": 29,
                            "end": 142
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 9,
                                        "end": 10
                                    },
                                    "start": 9,
                                    "end": 10
                                }
                            ],
                            "kind": "var",
                            "start": 5,
                            "end": 10
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "outerIterable",
                            "start": 14,
                            "end": 27
                        },
                        "await": false,
                        "start": 0,
                        "end": 142
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 142
            });
        });
    
        it('should parse object binding pattern with "nested" object binding pattern', () => {
            expect(parseScript(`for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {}`, {
                ranges: false,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "w"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "ObjectPattern",
                                            "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                }
                                            ]
                                        },
                                        "right": {
                                            "type": "ObjectExpression",
                                            "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 4,
                                                        "raw": "4"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 5,
                                                        "raw": "5"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 6,
                                                        "raw": "6"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                }
                                            ]
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "w"
                                },
                                "computed": false,
                                "value": {
                                    "type": "ObjectExpression",
                                    "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "undefined"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "z"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Literal",
                                                "value": 7,
                                                "raw": "7"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse rest element containing an elision ', () => {
            expect(parseScript(`for (var [...[,]] of [g()]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 30,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 30,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 17,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 17,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 17,
                                "elements": [{
                                    "type": "RestElement",
                                    "start": 10,
                                    "end": 16,
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "start": 13,
                                        "end": 16,
                                        "elements": [
                                            null
                                        ]
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 21,
                        "end": 26,
                        "elements": [{
                            "type": "CallExpression",
                            "start": 22,
                            "end": 25,
                            "callee": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "g"
                            },
                            "arguments": []
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 28,
                        "end": 30,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse for of array pattern let', () => {
            expect(parseScript(`for (var [[...x] = values] of [[]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 38,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 38,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 26,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 26,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 26,
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 25,
                                    "left": {
                                        "type": "ArrayPattern",
                                        "start": 10,
                                        "end": 16,
                                        "elements": [{
                                            "type": "RestElement",
                                            "start": 11,
                                            "end": 15,
                                            "argument": {
                                                "type": "Identifier",
                                                "start": 14,
                                                "end": 15,
                                                "name": "x"
                                            }
                                        }]
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "start": 19,
                                        "end": 25,
                                        "name": "values"
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 30,
                        "end": 34,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 31,
                            "end": 33,
                            "elements": []
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 36,
                        "end": 38,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse bindingElement with array binding pattern and initializer', () => {
            expect(parseScript(`for (var [[] = function() { }()] of [[]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 44,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 44,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 32,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 32,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 32,
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 31,
                                    "left": {
                                        "type": "ArrayPattern",
                                        "start": 10,
                                        "end": 12,
                                        "elements": []
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "start": 15,
                                        "end": 31,
                                        "callee": {
                                            "type": "FunctionExpression",
                                            "start": 15,
                                            "end": 29,
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 26,
                                                "end": 29,
                                                "body": []
                                            }
                                        },
                                        "arguments": []
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 36,
                        "end": 40,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 37,
                            "end": 39,
                            "elements": []
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 42,
                        "end": 44,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse nested array null', () => {
            expect(parseScript(`for ({ x: [ x ] } of [{ x: null }]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 38,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 38,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 17,
                        "properties": [{
                            "type": "Property",
                            "start": 7,
                            "end": 15,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 8,
                                "name": "x"
                            },
                            "value": {
                                "type": "ArrayPattern",
                                "start": 10,
                                "end": 15,
                                "elements": [{
                                    "type": "Identifier",
                                    "start": 12,
                                    "end": 13,
                                    "name": "x"
                                }]
                            },
                            "kind": "init"
                        }]
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 21,
                        "end": 34,
                        "elements": [{
                            "type": "ObjectExpression",
                            "start": 22,
                            "end": 33,
                            "properties": [{
                                "type": "Property",
                                "start": 24,
                                "end": 31,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 24,
                                    "end": 25,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 27,
                                    "end": 31,
                                    "value": null,
                                    "raw": "null"
                                },
                                "kind": "init"
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 36,
                        "end": 38,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object empty object', () => {
            expect(parseScript(`for ({} of [{}]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 19,
                    "await": false,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 7,
                        "properties": []
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 11,
                        "end": 15,
                        "elements": [{
                            "type": "ObjectExpression",
                            "start": 12,
                            "end": 14,
                            "properties": []
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 17,
                        "end": 19,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object empty numeric', () => {
            expect(parseScript(`for ({} of [0]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 18,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 7,
                        "properties": []
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 11,
                        "end": 14,
                        "elements": [{
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 16,
                        "end": 18,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object empty boolean', () => {
            expect(parseScript(`for ({} of [false]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "ForOfStatement",
                    "await": false,
                    "start": 0,
                    "end": 22,
                    "left": {
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 7,
                        "properties": []
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 11,
                        "end": 18,
                        "elements": [{
                            "type": "Literal",
                            "start": 12,
                            "end": 17,
                            "value": false,
                            "raw": "false"
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 20,
                        "end": 22,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse binding as specified via property name and identifier', () => {
            expect(parseScript(`for (let { x: y } of [{ x: 23 }]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 36,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 36,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 17,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 17,
                            "id": {
                                "type": "ObjectPattern",
                                "start": 9,
                                "end": 17,
                                "properties": [{
                                    "type": "Property",
                                    "start": 11,
                                    "end": 15,
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "x"
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "start": 14,
                                        "end": 15,
                                        "name": "y"
                                    },
                                    "kind": "init"
                                }]
                            },
                            "init": null
                        }],
                        "kind": "let"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 21,
                        "end": 32,
                        "elements": [{
                            "type": "ObjectExpression",
                            "start": 22,
                            "end": 31,
                            "properties": [{
                                "type": "Property",
                                "start": 24,
                                "end": 29,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 24,
                                    "end": 25,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 27,
                                    "end": 29,
                                    "value": 23,
                                    "raw": "23"
                                },
                                "kind": "init"
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 34,
                        "end": 36,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse lone rest element', () => {
            expect(parseScript(`for (let [...x] of [values]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 31,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 31,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 15,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 15,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 15,
                                "elements": [{
                                    "type": "RestElement",
                                    "start": 10,
                                    "end": 14,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "x"
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "let"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 19,
                        "end": 27,
                        "elements": [{
                            "type": "Identifier",
                            "start": 20,
                            "end": 26,
                            "name": "values"
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 29,
                        "end": 31,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse lone rest element', () => {
            expect(parseScript(`for (var [...x] of [[1, 2, 3]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 34,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 15,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 15,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 15,
                                "elements": [{
                                    "type": "RestElement",
                                    "start": 10,
                                    "end": 14,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "x"
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 19,
                        "end": 30,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 20,
                            "end": 29,
                            "elements": [{
                                    "type": "Literal",
                                    "start": 21,
                                    "end": 22,
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "start": 24,
                                    "end": 25,
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "Literal",
                                    "start": 27,
                                    "end": 28,
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 34,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse rest element following elision elements', () => {
            expect(parseScript(`for (var [ , , ...x] of [values]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 36,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 36,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 20,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 20,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 20,
                                "elements": [
                                    null,
                                    null,
                                    {
                                        "type": "RestElement",
                                        "start": 15,
                                        "end": 19,
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 18,
                                            "end": 19,
                                            "name": "x"
                                        }
                                    }
                                ]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 24,
                        "end": 32,
                        "elements": [{
                            "type": "Identifier",
                            "start": 25,
                            "end": 31,
                            "name": "values"
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 34,
                        "end": 36,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse rest element containing a rest element', () => {
            expect(parseScript(`for (var [...[...x]] of [[1, 2, 3]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 39,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 39,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 20,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 20,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 20,
                                "elements": [{
                                    "type": "RestElement",
                                    "start": 10,
                                    "end": 19,
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "start": 13,
                                        "end": 19,
                                        "elements": [{
                                            "type": "RestElement",
                                            "start": 14,
                                            "end": 18,
                                            "argument": {
                                                "type": "Identifier",
                                                "start": 17,
                                                "end": 18,
                                                "name": "x"
                                            }
                                        }]
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 24,
                        "end": 35,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 25,
                            "end": 34,
                            "elements": [{
                                    "type": "Literal",
                                    "start": 26,
                                    "end": 27,
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "start": 29,
                                    "end": 30,
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "Literal",
                                    "start": 32,
                                    "end": 33,
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 37,
                        "end": 39,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty array binding pattern', () => {
            expect(parseScript(`for (var [] of [iter]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 25,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 25,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 11,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 11,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 11,
                                "elements": []
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 15,
                        "end": 21,
                        "elements": [{
                            "type": "Identifier",
                            "start": 16,
                            "end": 20,
                            "name": "iter"
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 23,
                        "end": 25,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse binding element with object binding pattern', () => {
            expect(parseScript(`for (var [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 83,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 83,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 48,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 48,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 48,
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 47,
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
                                        "end": 47,
                                        "properties": [{
                                                "type": "Property",
                                                "start": 26,
                                                "end": 31,
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
                                                    "end": 31,
                                                    "value": 44,
                                                    "raw": "44"
                                                },
                                                "kind": "init"
                                            },
                                            {
                                                "type": "Property",
                                                "start": 33,
                                                "end": 38,
                                                "method": false,
                                                "shorthand": false,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 33,
                                                    "end": 34,
                                                    "name": "y"
                                                },
                                                "value": {
                                                    "type": "Literal",
                                                    "start": 36,
                                                    "end": 38,
                                                    "value": 55,
                                                    "raw": "55"
                                                },
                                                "kind": "init"
                                            },
                                            {
                                                "type": "Property",
                                                "start": 40,
                                                "end": 45,
                                                "method": false,
                                                "shorthand": false,
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "start": 40,
                                                    "end": 41,
                                                    "name": "z"
                                                },
                                                "value": {
                                                    "type": "Literal",
                                                    "start": 43,
                                                    "end": 45,
                                                    "value": 66,
                                                    "raw": "66"
                                                },
                                                "kind": "init"
                                            }
                                        ]
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 52,
                        "end": 79,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 53,
                            "end": 78,
                            "elements": [{
                                "type": "ObjectExpression",
                                "start": 54,
                                "end": 77,
                                "properties": [{
                                        "type": "Property",
                                        "start": 56,
                                        "end": 61,
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 56,
                                            "end": 57,
                                            "name": "x"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "start": 59,
                                            "end": 61,
                                            "value": 11,
                                            "raw": "11"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "start": 63,
                                        "end": 68,
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 63,
                                            "end": 64,
                                            "name": "y"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "start": 66,
                                            "end": 68,
                                            "value": 22,
                                            "raw": "22"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "start": 70,
                                        "end": 75,
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 70,
                                            "end": 71,
                                            "name": "z"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "start": 73,
                                            "end": 75,
                                            "value": 33,
                                            "raw": "33"
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 81,
                        "end": 83,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse destructuring initializer', () => {
            expect(parseScript(`for (var [ x = y ] of [[]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 11,
                                        "end": 12
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 15,
                                        "end": 16
                                    },
                                    "start": 11,
                                    "end": 16
                                }],
                                "start": 9,
                                "end": 18
                            },
                            "start": 9,
                            "end": 18
                        }],
                        "kind": "var",
                        "start": 5,
                        "end": 18
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ArrayExpression",
                            "elements": [],
                            "start": 23,
                            "end": 25
                        }],
                        "start": 22,
                        "end": 26
                    },
                    "await": false,
                    "start": 0,
                    "end": 30
                }],
                "sourceType": "script",
                "start": 0,
                "end": 30
            });
        });
    
        it('should parse bindingElement with array binding pattern', () => {
            expect(parseScript(`for (var [[,] = g()] of [[[]]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 34,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 20,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 9,
                            "end": 20,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 20,
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 19,
                                    "left": {
                                        "type": "ArrayPattern",
                                        "start": 10,
                                        "end": 13,
                                        "elements": [
                                            null
                                        ]
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "start": 16,
                                        "end": 19,
                                        "callee": {
                                            "type": "Identifier",
                                            "start": 16,
                                            "end": 17,
                                            "name": "g"
                                        },
                                        "arguments": []
                                    }
                                }]
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 24,
                        "end": 30,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 25,
                            "end": 29,
                            "elements": [{
                                "type": "ArrayExpression",
                                "start": 26,
                                "end": 28,
                                "elements": []
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 34,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    

    
        it('should parse `yield` within the Initializer of a nested destructuring assignment', () => {
            expect(parseScript(`for ({ x: [x = yield] } of [{ x: [] }]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 40,
                        "end": 42
                    },
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "value": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 11,
                                        "end": 12
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 15,
                                        "end": 20
                                    },
                                    "start": 11,
                                    "end": 20
                                }],
                                "start": 10,
                                "end": 21
                            },
                            "start": 7,
                            "end": 21
                        }],
                        "start": 5,
                        "end": 23
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 30,
                                    "end": 31
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "value": {
                                    "type": "ArrayExpression",
                                    "elements": [],
                                    "start": 33,
                                    "end": 35
                                },
                                "start": 30,
                                "end": 35
                            }],
                            "start": 28,
                            "end": 37
                        }],
                        "start": 27,
                        "end": 38
                    },
                    "await": false,
                    "start": 0,
                    "end": 42
                }],
                "sourceType": "script",
                "start": 0,
                "end": 42
            });
        });
    
        it('should parse lone rest element', () => {
            expect(parseScript(`for ({ x = yield } of [{}]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30
                    },
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true,
                            "value": {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 7,
                                    "end": 8
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "yield",
                                    "start": 11,
                                    "end": 16
                                },
                                "start": 7,
                                "end": 16
                            },
                            "start": 7,
                            "end": 16
                        }],
                        "start": 5,
                        "end": 18
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ObjectExpression",
                            "properties": [],
                            "start": 23,
                            "end": 25
                        }],
                        "start": 22,
                        "end": 26
                    },
                    "await": false,
                    "start": 0,
                    "end": 30
                }],
                "sourceType": "script",
                "start": 0,
                "end": 30
            });
        });
    
        it('should parse object binding pattern with "nested" array binding pattern', () => {
            expect(parseScript(`for (let { w: [x, y, z] = [4, 5, 6] } of [{ w: [7, undefined, ] }]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 68,
                        "end": 70
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "w",
                                        "start": 11,
                                        "end": 12
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "ArrayPattern",
                                            "elements": [{
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 15,
                                                    "end": 16
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "y",
                                                    "start": 18,
                                                    "end": 19
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "z",
                                                    "start": 21,
                                                    "end": 22
                                                }
                                            ],
                                            "start": 14,
                                            "end": 23
                                        },
                                        "right": {
                                            "type": "ArrayExpression",
                                            "elements": [{
                                                    "type": "Literal",
                                                    "value": 4,
                                                    "start": 27,
                                                    "end": 28,
                                                    "raw": "4"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 5,
                                                    "start": 30,
                                                    "end": 31,
                                                    "raw": "5"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 6,
                                                    "start": 33,
                                                    "end": 34,
                                                    "raw": "6"
                                                }
                                            ],
                                            "start": 26,
                                            "end": 35
                                        },
                                        "start": 11,
                                        "end": 35
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 11,
                                    "end": 35
                                }],
                                "start": 9,
                                "end": 37
                            },
                            "start": 9,
                            "end": 37
                        }],
                        "kind": "let",
                        "start": 5,
                        "end": 37
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "w",
                                    "start": 44,
                                    "end": 45
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "value": {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                            "type": "Literal",
                                            "value": 7,
                                            "start": 48,
                                            "end": 49,
                                            "raw": "7"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "undefined",
                                            "start": 51,
                                            "end": 60
                                        }
                                    ],
                                    "start": 47,
                                    "end": 63
                                },
                                "start": 44,
                                "end": 63
                            }],
                            "start": 42,
                            "end": 65
                        }],
                        "start": 41,
                        "end": 66
                    },
                    "await": false,
                    "start": 0,
                    "end": 70
                }],
                "sourceType": "script",
                "start": 0,
                "end": 70
            });
        });
    
        it('should parse array pattern const elison', () => {
            expect(parseScript(`for (const [,] of [g()]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 25,
                        "end": 27
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    null
                                ],
                                "start": 11,
                                "end": 14
                            },
                            "start": 11,
                            "end": 14
                        }],
                        "kind": "const",
                        "start": 5,
                        "end": 14
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "CallExpression",
                            "arguments": [],
                            "callee": {
                                "type": "Identifier",
                                "name": "g",
                                "start": 19,
                                "end": 20
                            },
                            "start": 19,
                            "end": 22
                        }],
                        "start": 18,
                        "end": 23
                    },
                    "await": false,
                    "start": 0,
                    "end": 27
                }],
                "sourceType": "script",
                "start": 0,
                "end": 27
            });
        });
    
        it('should parse nested array undefined', () => {
            expect(parseScript(`for ([...[x]] of [[undefined]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 34,
                    "await": false,
                    "left": {
                        "type": "ArrayPattern",
                        "start": 5,
                        "end": 13,
                        "elements": [{
                            "type": "RestElement",
                            "start": 6,
                            "end": 12,
                            "argument": {
                                "type": "ArrayPattern",
                                "start": 9,
                                "end": 12,
                                "elements": [{
                                    "type": "Identifier",
                                    "start": 10,
                                    "end": 11,
                                    "name": "x"
                                }]
                            }
                        }]
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 17,
                        "end": 30,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 18,
                            "end": 29,
                            "elements": [{
                                "type": "Identifier",
                                "start": 19,
                                "end": 28,
                                "name": "undefined"
                            }]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 34,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array rest elison', () => {
            expect(parseScript(`for ([, , x, , ...y] of [[1, 2, 3, 4, 5, 6]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 48,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 48,
                    "await": false,
                    "left": {
                        "type": "ArrayPattern",
                        "start": 5,
                        "end": 20,
                        "elements": [
                            null,
                            null,
                            {
                                "type": "Identifier",
                                "start": 10,
                                "end": 11,
                                "name": "x"
                            },
                            null,
                            {
                                "type": "RestElement",
                                "start": 15,
                                "end": 19,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 18,
                                    "end": 19,
                                    "name": "y"
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "start": 24,
                        "end": 44,
                        "elements": [{
                            "type": "ArrayExpression",
                            "start": 25,
                            "end": 43,
                            "elements": [{
                                    "type": "Literal",
                                    "start": 26,
                                    "end": 27,
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "start": 29,
                                    "end": 30,
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "Literal",
                                    "start": 32,
                                    "end": 33,
                                    "value": 3,
                                    "raw": "3"
                                },
                                {
                                    "type": "Literal",
                                    "start": 35,
                                    "end": 36,
                                    "value": 4,
                                    "raw": "4"
                                },
                                {
                                    "type": "Literal",
                                    "start": 38,
                                    "end": 39,
                                    "value": 5,
                                    "raw": "5"
                                },
                                {
                                    "type": "Literal",
                                    "start": 41,
                                    "end": 42,
                                    "value": 6,
                                    "raw": "6"
                                }
                            ]
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 46,
                        "end": 48,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array element init in', () => {
            expect(parseScript(`for ([ x = 'x' in {} ] of [[]]) {}`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 32,
                        "end": 34
                    },
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8
                            },
                            "right": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Literal",
                                    "value": "x",
                                    "start": 11,
                                    "end": 14,
                                    "raw": "'x'"
                                },
                                "right": {
                                    "type": "ObjectExpression",
                                    "properties": [],
                                    "start": 18,
                                    "end": 20
                                },
                                "operator": "in",
                                "start": 11,
                                "end": 20
                            },
                            "start": 7,
                            "end": 20
                        }],
                        "start": 5,
                        "end": 22
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ArrayExpression",
                            "elements": [],
                            "start": 27,
                            "end": 29
                        }],
                        "start": 26,
                        "end": 30
                    },
                    "await": false,
                    "start": 0,
                    "end": 34
                }],
                "sourceType": "script",
                "start": 0,
                "end": 34
            });
        });
    
    
        it('should parse "for(x of list) process(x);"', () => {
            expect(parseScript(`for(x of list) process(x);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 26,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 26,
                    "await": false,
                    "left": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 13,
                        "name": "list"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "start": 15,
                        "end": 26,
                        "expression": {
                            "type": "CallExpression",
                            "start": 15,
                            "end": 25,
                            "callee": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 22,
                                "name": "process"
                            },
                            "arguments": [{
                                "type": "Identifier",
                                "start": 23,
                                "end": 24,
                                "name": "x"
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "for (const x of list) process(x);"', () => {
            expect(parseScript(`for (const x of list) process(x);`, {
                ranges: true,
                raw: true,
                next: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 33,
                "body": [{
                    "type": "ForOfStatement",
                    "start": 0,
                    "end": 33,
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "start": 5,
                        "end": 12,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 11,
                            "end": 12,
                            "id": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "const"
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 20,
                        "name": "list"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "start": 22,
                        "end": 33,
                        "expression": {
                            "type": "CallExpression",
                            "start": 22,
                            "end": 32,
                            "callee": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 29,
                                "name": "process"
                            },
                            "arguments": [{
                                "type": "Identifier",
                                "start": 30,
                                "end": 31,
                                "name": "x"
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for(a of b);"', () => {
            expect(parseScript(`for(a of b);`)).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
                        "await": false,
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "body": {
                            "type": "EmptyStatement"
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse "for(let [a] of b);"', () => {
            expect(parseScript(`for(let [a] of b);`)).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
                        "await": false,
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "a"
                                            }
                                        ]
                                    },
                                    "init": null
                                }
                            ],
                            "kind": "let"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "body": {
                            "type": "EmptyStatement"
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should handle for of object pattern const', () => {
            expect(parseScript(`for (const {x, y} of z);`)).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ForOfStatement",
                "await": false,
                "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true
                                    }
                                ]
                            },
                            "init": null
                        }
                    ],
                    "kind": "const"
                },
                "right": {
                    "type": "Identifier",
                    "name": "z"
                },
                "body": {
                    "type": "EmptyStatement"
                }
            }
        ],
        "sourceType": "script"
    });
        });
    

        it('should handle for of object pattern', () => {
            expect(parseScript(`for ({x, y} of z);`)).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ForOfStatement",
                "await": false,
                "left": {
                    "type": "ObjectPattern",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        }
                    ]
                },
                "right": {
                    "type": "Identifier",
                    "name": "z"
                },
                "body": {
                    "type": "EmptyStatement"
                }
            }
        ],
        "sourceType": "script"
    });
        });
    

        it('should handle complex #1', () => {
            
                    expect(parseScript(`for (let v of []) {
                v;
                for (let v of []) {
                    var x = v;
                    v++;
                }
            }`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
                        "await": false,
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "v"
                                    },
                                    "init": null
                                }
                            ],
                            "kind": "let"
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": []
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "Identifier",
                                        "name": "v"
                                    }
                                },
                                {
                                    "type": "ForOfStatement",
                                    "await": false,
                                    "left": {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "v"
                                                },
                                                "init": null
                                            }
                                        ],
                                        "kind": "let"
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "elements": []
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "VariableDeclaration",
                                                "declarations": [
                                                    {
                                                        "type": "VariableDeclarator",
                                                        "id": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "init": {
                                                            "type": "Identifier",
                                                            "name": "v"
                                                        }
                                                    }
                                                ],
                                                "kind": "var"
                                            },
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "UpdateExpression",
                                                    "operator": "++",
                                                    "argument": {
                                                        "type": "Identifier",
                                                        "name": "v"
                                                    },
                                                    "prefix": false
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
       
        it('should handle complex #2', () => {
            expect(parseScript(`for (var v of ['a', 'b', 'c'])
            var x = v;`, {
                raw: true
            })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForOfStatement",
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "v"
                                },
                                "init": null
                            }
                        ],
                        "kind": "var"
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "Literal",
                                "value": "a",
                                "raw": "'a'"
                            },
                            {
                                "type": "Literal",
                                "value": "b",
                                "raw": "'b'"
                            },
                            {
                                "type": "Literal",
                                "value": "c",
                                "raw": "'c'"
                            }
                        ]
                    },
                    "body": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "init": {
                                    "type": "Identifier",
                                    "name": "v"
                                }
                            }
                        ],
                        "kind": "var"
                    }
                }
            ],
            "sourceType": "script"
        });
        

        });
       
        it('should handle complex #3', () => {
            expect(parseScript(`for (let v of []) {
                v;
                for (const v of []) {
                    var x = v;
                }
            }`)).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
                        "await": false,
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "v"
                                    },
                                    "init": null
                                }
                            ],
                            "kind": "let"
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": []
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "Identifier",
                                        "name": "v"
                                    }
                                },
                                {
                                    "type": "ForOfStatement",
                                    "await": false,
                                    "left": {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "v"
                                                },
                                                "init": null
                                            }
                                        ],
                                        "kind": "const"
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "elements": []
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "VariableDeclaration",
                                                "declarations": [
                                                    {
                                                        "type": "VariableDeclarator",
                                                        "id": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "init": {
                                                            "type": "Identifier",
                                                            "name": "v"
                                                        }
                                                    }
                                                ],
                                                "kind": "var"
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

    });