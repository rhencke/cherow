import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Async Generators', () => {

    it("should fail if rest parameter has an initializer ", () => {
        expect(() => {
            parseScript(`0, async function* g(...x = []) {};`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on named await as identifier reference", () => {
        expect(() => {
            parseScript(`var gen = async function *g() { void await; };`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on named await as identifier reference escaped", () => {
        expect(() => {
            parseScript(`var gen = async function *g() { void \u0061wait; };`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if bound names of formal parameters contains any duplicate elements", () => {
        expect(() => {
            parseScript(`async function* f(x = 0, x) {};`, {
                next: true
            })
        }).to.not.throw();
    });

    it("should fail  if BoundNames of formal parameters contains any duplicate elements", () => {
        expect(() => {
            parseScript(`0, async function*(x = 0, x) {};`, {
                next: true
            })
        }).to.not.throw();
    });

    it("should fail if BoundNames of formal parameters also occurs in the lexically declared names of async function body", () => {
        expect(() => {
            parseScript(`(async function*(a) { const a = 0; });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if BoundNames of formal parameters also occurs in the lexically declared names of async function body", () => {
        expect(() => {
            parseScript(`(async function*(await) { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if `await` is used as binding identifier", () => {
        expect(() => {
            parseScript(`(async function* await() { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if escaped async", () => {
        expect(() => {
            parseScript(`\\u0061sync function* f(){}`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on named await as binding reference", () => {
        expect(() => {
            parseScript(`var gen = async function *g() { var await; };`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on Reset element (nested array pattern) with initializer", () => {
        expect(() => {
            parseScript(`f = async function* h([...[ x ] = []] = []) { }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on Reset may not be followed by any element", () => {
        expect(() => {
            parseScript(`f = async function* h([...{ x }, y]) { }`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on Reset may not be followed by any element", () => {
        expect(() => {
            parseScript(`f = async function* h([...[x], y]) { }`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on Reset element (nested object pattern) with initializer ", () => {
        expect(() => {
            parseScript(`f = async function* h([...{ x } = []]) { }`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on Reset element (nested array pattern) with initializer ", () => {
        expect(() => {
            parseScript(`f = async function* h([...[ x ] = []]) { }`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail on Reset element (identifier) with initializer ", () => {
        expect(() => {
            parseScript(`f = async function* h([...x = []]) { }`, {
                next: true
            })
        }).to.throw();
    });
 
    
    it("should fail if RestParameter has an initializer ", () => {
        expect(() => {
            parseScript(`0, async function* g(...x = []) {};`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail await as binding identifier", () => {
        expect(() => {
            parseScript(`async function *() { var await; }`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if IsSimpleParameterList of Uniqueformal parameters is false", () => {
        expect(() => {
            parseScript(`(async function*(x = 1) {"use strict"});`, {
                next: true
            })
        }).to.not.throw();
    });
    it("should fail if formal parameters contains arguments in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; (async function*(arguments) { });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if invalid BindingIdentifier for AsyncGeneratorExpressions", () => {
        expect(() => {
            parseScript(`(async function* await() { });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if BindingIdentifier is the IdentifierName arguments", () => {
        expect(() => {
            parseScript(`"use strict"; (async function* arguments() { });`, {
                next: true
            })
        }).to.throw('');
    });
    it("should fail if BindingIdentifier is the IdentifierName eval", () => {
        expect(() => {
            parseScript(`"use strict"; (async function* eval() { });`, {
                next: true
            })
        }).to.throw('');
    });
    it("should fail if BindingIdentifier is the IdentifierName eval", () => {
        expect(() => {
            parseScript(`"use strict"; (async function* eval() { })`, {
                next: true
            })
        }).to.throw('');
    });

    it("should fail if body contains super call", () => {
        expect(() => {
            parseScript(`(async function*() { super(); });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if body contains super property", () => {
        expect(() => {
            parseScript(`(async function*() { super.prop; });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if AsyncGeneratorBody contains SuperProperty is true", () => {
        expect(() => {
            parseScript(`(async function*() { super.prop; });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if formal parameters contains eval in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; (async function*(eval) { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if formals body has duplicate const", () => {
        expect(() => {
            parseScript(`(async function*(a) { const a = 0; });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if formals body has duplicate let", () => {
        expect(() => {
            parseScript(`(async function*(a) { let a; });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if BoundNames of formal parameters also occurs in the LexicallyDeclaredNames of AsyncFunctionBody", () => {
        expect(() => {
            parseScript(`(async function*(a) { const a = 0; });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if BoundNames of formal parameters also occurs in the LexicallyDeclaredNames of AsyncFunctionBody", () => {
        expect(() => {
            parseScript(`(async function*(a) { let a; });`, {
                next: true
            })
        }).to.throw();
    });
    
    it("should fail if formal contains await expression", () => {
        expect(() => {
            parseScript(`(async function*(x = await 1) { });`, {
                next: true
            })
        }).to.not.throw();
    });

    it("should fail if formals contains await", () => {
        expect(() => {
            parseScript(`(async function*(await) { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if formals contains super call", () => {
        expect(() => {
            parseScript(`(async function*(a = super()) { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if formals contains yield expression", () => {
        expect(() => {
            parseScript(`(async function*(x = yield) { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if yield are used as binding identifier", () => {
        expect(() => {
            parseScript(`(async function* yield() { });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if yield are used as binding identifier", () => {
        expect(() => {
            parseScript(`(async function *() { void yield; });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if await used as label", () => {
        expect(() => {
            parseScript(`(async function*() { await: 1; });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if yield used as label", () => {
        expect(() => {
            parseScript(`(async function*() { yield: 1; });`, {
                next: true
            })
        }).to.throw();
    });
    it("should fail if Async generator function expressions are not a simple assignment target", () => {
        expect(() => {
            parseScript(`(async function*() { } = 1);`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if a newline may precede the `*` token in a `yield` expression", () => {
        expect(() => {
            parseScript(`(async function*() {
      yield
      * 1;
    });`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on escaped yield", () => {
        expect(() => {
            parseScript(`async function *gen() {  var yi\\u0065ld; }`, {
                next: true
            })
        }).to.throw('');
    });

    it("should fail RestParameter with initializer ", () => {
        expect(() => {
            parseScript(`async function* f(...x = []) { }`, {
                next: true
            })
        }).to.throw('');
    });

    it("should fail on yield is a reserved keyword within generator function bodies and may not be used as a binding identifier.", () => {
        expect(() => {
            parseScript(`async function *gen() { var yield; }`, {
                next: true
            })
        }).to.throw('');
    });

    it("should fail on escaped yield", () => {
        expect(() => {
            parseScript(`async function *gen() { yi\u0065ld: ; }`, {
                next: true
            })
        }).to.throw('');
    });

    it("should fail on named yield as label identifier", () => {
        expect(() => {
            parseScript(`var gen = async function *g() { yield: ; };`, {
                next: true
            })
        }).to.throw('');
    });

    
    it('should parse Non object returned by [Symbol.asyncIterator]()', () => {
        expect(parseScript(`g = async function*() {
            yield
            1;
          };
          `, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 69,
                  "expression": {
                   "end": 68,
                    "left": {
                      "end": 1,
                      "name": "g",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "async": true,
                      "body": {
                        "body": [
                          {
                           "end": 41,
                            "expression": {
                              "argument": null,
                              "delegate": false,
                              "end": 41,
                              "start": 36,
                              "type": "YieldExpression"
                            },
                            "start": 36,
                            "type": "ExpressionStatement"
                          },
                          {
                            "end": 56,
                            "expression": {
                              "end": 55,
                              "start": 54,
                              "type": "Literal",
                              "value": 1,
                            },
                            "start": 54,
                            "type": "ExpressionStatement"
                          }
                        ],
                        "end": 68,
                        "start": 22,
                        "type": "BlockStatement"
                      },
                      "end": 68,
                      "expression": false,
                      "generator": true,
                      "id": null,
                      "params": [],
                      "start": 4,
                      "type": "FunctionExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 80,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should fail on "async function *() { yield; }"', () => {
        expect(() => {
            parseScript(`async function *() { yield; }`, {
                next: true
            })
        }).to.throw();
    });

    it('should fail on "async function *g() { yield: ; }"', () => {
        expect(() => {
            parseScript(`async function *g() { yield: ; }`, {
                next: true
            })
        }).to.throw();
    });

    it('should fail on "async function*() { yield 1; };"', () => {
        expect(() => {
            parseScript(`async function*() { yield 1; };`, {
                next: true
            })
        }).to.throw();
    });
    it('should parse "async function *g() { yield; }"', () => {
        expect(parseScript(`async function *g() { yield; }`, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
               {
                  "async": true,
                  "body": {
                    "body": [
                      {
                        "end": 28,
                        "expression": {
                          "argument": null,
                          "delegate": false,
                          "end": 27,
                          "start": 22,
                          "type": "YieldExpression"
                        },
                        "start": 22,
                        "type": "ExpressionStatement"
                      },
                    ],
                    "end": 30,
                    "start": 20,
                    "type": "BlockStatement"
                  },
                  "end": 30,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 17,
                    "name": "g",
                    "start": 16,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                },
              ],
              "end": 30,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse await as yield operand', () => {
        expect(parseScript(`(async function*() { yield 1; });`, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 33,
                  "expression": {
                    "async": true,
                   "body": {
                      "body": [
                        {
                          "end": 29,
                          "expression": {
                            "argument": {
                             "end": 28,
                              "start": 27,
                              "type": "Literal",
                              "value": 1,
                            },
                            "delegate": false,
                            "end": 28,
                            "start": 21,
                            "type": "YieldExpression"
                          },
                          "start": 21,
                          "type": "ExpressionStatement"
                        },
                      ],
                      "end": 31,
                      "start": 19,
                      "type": "BlockStatement"
                    },
                    "end": 31,
                    "expression": false,
                    "generator": true,
                    "id": null,
                    "params": [],
                    "start": 1,
                    "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 33,
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
    it('should parse await as yield operand', () => {
        expect(parseScript(`async function *AsyncGenTest() { yield; }`, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": true,
                  "body": {
                    "body": [
                      {
                        "end": 39,
                        "expression": {
                          "argument": null,
                          "delegate": false,
                          "end": 38,
                          "start": 33,
                          "type": "YieldExpression"
                        },
                        "start": 33,
                        "type": "ExpressionStatement"
                      }
                    ],
                    "end": 41,
                    "start": 31,
                    "type": "BlockStatement"
                  },
                  "end": 41,
                 "expression": false,
                  "generator": true,
                 "id": {
                    "end": 28,
                    "name": "AsyncGenTest",
                    "start": 16,
                    "type": "Identifier",
                  },
                  "params": [],
                  "start": 0,
                 "type": "FunctionDeclaration"
                }
              ],
              "end": 41,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse await as yield operand', () => {
        expect(parseScript(`(async function*() { yield; });`, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 31,
                  "expression": {
                    "async": true,
                    "body": {
                      "body": [
                        {
                          "end": 27,
                          "expression": {
                           "argument": null,
                            "delegate": false,
                            "end": 26,
                            "start": 21,
                            "type": "YieldExpression"
                          },
                         "start": 21,
                          "type": "ExpressionStatement"
                        }
                      ],
                      "end": 29,
                      "start": 19,
                      "type": "BlockStatement"
                    },
                    "end": 29,
                   "expression": false,
                    "generator": true,
                    "id": null,
                    "params": [],
                    "start": 1,
                    "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 31,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse await as yield operand', () => {
        expect(parseScript(`((async function*() {
            yield await "a";
          })())`, {
            next: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 66,
                 "expression": {
                    "arguments": [],
                    "callee": {
                      "async": true,
                      "body": {
                        "body": [
                         {
                            "end": 50,
                            "expression": {
                              "argument": {
                                "argument": {
                                  "end": 49,
                                  "start": 46,
                                  "type": "Literal",
                                  "value": "a",
                                },
                                "end": 49,
                                "start": 40,
                                "type": "AwaitExpression"
                              },
                              "delegate": false,
                              "end": 49,
                              "start": 34,
                              "type": "YieldExpression"
                            },
                            "start": 34,
                           "type": "ExpressionStatement"
                          }
                        ],
                        "end": 62,
                       "start": 20,
                        "type": "BlockStatement"
                      },
                      "end": 62,
                      "expression": false,
                      "generator": true,
                      "id": null,
                     "params": [],
                      "start": 2,
                      "type": "FunctionExpression"
                   },
                    "end": 65,
                    "start": 1,
                    "type": "CallExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 66,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse Non object returned by [Symbol.asyncIterator]()', () => {
        expect(parseScript(`async function *gen() {
              yield* obj;
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                        "expression": {
                            "argument": {
                                "name": "obj",
                                "type": "Identifier"
                            },
                            "delegate": true,
                            "type": "YieldExpression"
                        },
                        "type": "ExpressionStatement"
                    }],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "gen",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse spread array single', () => {
        expect(parseScript(`async function *gen() {
              yield [...yield];
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                        "expression": {
                            "argument": {
                                "elements": [{
                                    "argument": {
                                        "argument": null,
                                        "delegate": false,
                                        "type": "YieldExpression"
                                    },
                                    "type": "SpreadElement"
                                }],
                                "type": "ArrayExpression"
                            },
                            "delegate": false,
                            "type": "YieldExpression"
                        },
                        "type": "ExpressionStatement"
                    }],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "gen",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse spread array multiple', () => {
        expect(parseScript(`async function *gen() {
              yield [...yield yield];
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                        "expression": {
                            "argument": {
                                "elements": [{
                                    "argument": {
                                        "argument": {
                                            "argument": null,
                                            "delegate": false,
                                            "type": "YieldExpression"
                                        },
                                        "delegate": false,
                                        "type": "YieldExpression"
                                    },
                                    "type": "SpreadElement"
                                }],
                                "type": "ArrayExpression"
                            },
                            "delegate": false,
                            "type": "YieldExpression"
                        },
                        "type": "ExpressionStatement"
                    }],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "gen",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse an empty completion', () => {
        expect(parseScript(`async function* f() {
              yield 1;
              yield 2;
              yield 3;
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                            "expression": {
                                "argument": {
                                    "type": "Literal",
                                    "value": 1
                                },
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        },
                        {
                            "expression": {
                                "argument": {
                                    "type": "Literal",
                                    "value": 2
                                },
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        },
                        {
                            "expression": {
                                "argument": {
                                    "type": "Literal",
                                    "value": 3
                                },
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        }
                    ],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "f",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse with yield + call', () => {
        expect(parseScript(`async function* f1() {
              yield 1;
              yield* f2();
              yield 4;
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                            "expression": {
                                "argument": {
                                    "type": "Literal",
                                    "value": 1
                                },
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        },
                        {
                            "expression": {
                                "argument": {
                                    "arguments": [],
                                    "callee": {
                                        "name": "f2",
                                        "type": "Identifier"
                                    },
                                    "type": "CallExpression"
                                },
                                "delegate": true,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        },
                        {
                            "expression": {
                                "argument": {
                                    "type": "Literal",
                                    "value": 4
                                },
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        }
                    ],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "f1",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse simple', () => {
        expect(parseScript(`async function* f() {
              yield 1;
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                        "expression": {
                            "argument": {
                                "type": "Literal",
                                "value": 1,
                            },
                            "delegate": false,
                            "type": "YieldExpression"
                        },
                        "type": "ExpressionStatement"
                    }],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "f",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse an empty completion', () => {
        expect(parseScript(`async function *gen() {
                var v = yield* obj;
                return "return-value";
            }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                            "declarations": [{
                                "id": {
                                    "name": "v",
                                    "type": "Identifier"
                                },
                                "init": {
                                    "argument": {
                                        "name": "obj",
                                        "type": "Identifier"
                                    },
                                    "delegate": true,
                                    "type": "YieldExpression"
                                },
                                "type": "VariableDeclarator"
                            }],
                            "kind": "var",
                            "type": "VariableDeclaration"
                        },
                        {
                            "argument": {
                                "type": "Literal",
                                "value": "return-value"
                            },
                            "type": "ReturnStatement"
                        }
                    ],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "gen",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse array with ellison', () => {
        expect(parseScript(`async function* f([,]) {};`, {
            next: true
        })).to.eql({
            "body": [{
                    "async": true,
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": true,
                    "id": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "params": [{
                        "elements": [
                            null,
                        ],
                        "type": "ArrayPattern"
                    }],
                    "type": "FunctionDeclaration"
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse with trailing comma', () => {
        expect(parseScript(`async function* ref(a, b = 39,) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "ref",
                    "type": "Identifier"
                },
                "params": [{
                        "name": "a",
                        "type": "Identifier"
                    },
                    {
                        "left": {
                            "name": "b",
                            "type": "Identifier"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 39,
                        },
                        "type": "AssignmentPattern"
                    }
                ],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse named yield star getter async get abrupt', () => {
        expect(parseScript(`var gen = async function *g() {
          yield* obj;
        };`, {
            next: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "gen",
                        "type": "Identifier"
                    },
                    "init": {
                        "async": true,
                        "body": {
                            "body": [{
                                "expression": {
                                    "argument": {
                                        "name": "obj",
                                        "type": "Identifier"
                                    },
                                    "delegate": true,
                                    "type": "YieldExpression"
                                },
                                "type": "ExpressionStatement"
                            }],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [],
                        "type": "FunctionExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse named yield spread', () => {
        expect(parseScript(`var gen = async function *g() {
          yield {
              ...yield,
              y: 1,
              ...yield yield,
            };
        };`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "YieldExpression",
                                                "argument": {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "SpreadElement",
                                                            "argument": {
                                                                "type": "YieldExpression",
                                                                "argument": null,
                                                                "delegate": false,
                                                                "start": 67,
                                                                "end": 72
                                                            },
                                                            "start": 64,
                                                            "end": 72
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 88,
                                                                "end": 89
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 1,
                                                                "start": 91,
                                                                "end": 92,
                                                                "raw": "1"
                                                            },
                                                            "start": 88,
                                                            "end": 92
                                                        },
                                                        {
                                                            "type": "SpreadElement",
                                                            "argument": {
                                                                "type": "YieldExpression",
                                                                "argument": {
                                                                    "type": "YieldExpression",
                                                                    "argument": null,
                                                                    "delegate": false,
                                                                    "start": 117,
                                                                    "end": 122
                                                                },
                                                                "delegate": false,
                                                                "start": 111,
                                                                "end": 122
                                                            },
                                                            "start": 108,
                                                            "end": 122
                                                        }
                                                    ],
                                                    "start": 48,
                                                    "end": 137
                                                },
                                                "delegate": false,
                                                "start": 42,
                                                "end": 137
                                            },
                                            "start": 42,
                                            "end": 138
                                        }
                                    ],
                                    "start": 30,
                                    "end": 148
                                },
                                "async": true,
                                "generator": true,
                                "expression": false,
                                "id": {
                                    "type": "Identifier",
                                    "name": "g",
                                    "start": 26,
                                    "end": 27
                                },
                                "start": 10,
                                "end": 148
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "gen",
                                "start": 4,
                                "end": 7
                            },
                            "start": 4,
                            "end": 148
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 149
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 149
        });
    });

    it('should parse named yield spread object', () => {
        expect(parseScript(`var gen = async function *g() {
          yield {
              ...yield,
              y: 1,
              ...yield yield,
            };
        };`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "YieldExpression",
                                                "argument": {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "SpreadElement",
                                                            "argument": {
                                                                "type": "YieldExpression",
                                                                "argument": null,
                                                                "delegate": false,
                                                                "start": 67,
                                                                "end": 72
                                                            },
                                                            "start": 64,
                                                            "end": 72
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 88,
                                                                "end": 89
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 1,
                                                                "start": 91,
                                                                "end": 92,
                                                                "raw": "1"
                                                            },
                                                            "start": 88,
                                                            "end": 92
                                                        },
                                                        {
                                                            "type": "SpreadElement",
                                                            "argument": {
                                                                "type": "YieldExpression",
                                                                "argument": {
                                                                    "type": "YieldExpression",
                                                                    "argument": null,
                                                                    "delegate": false,
                                                                    "start": 117,
                                                                    "end": 122
                                                                },
                                                                "delegate": false,
                                                                "start": 111,
                                                                "end": 122
                                                            },
                                                            "start": 108,
                                                            "end": 122
                                                        }
                                                    ],
                                                    "start": 48,
                                                    "end": 137
                                                },
                                                "delegate": false,
                                                "start": 42,
                                                "end": 137
                                            },
                                            "start": 42,
                                            "end": 138
                                        }
                                    ],
                                    "start": 30,
                                    "end": 148
                                },
                                "async": true,
                                "generator": true,
                                "expression": false,
                                "id": {
                                    "type": "Identifier",
                                    "name": "g",
                                    "start": 26,
                                    "end": 27
                                },
                                "start": 10,
                                "end": 148
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "gen",
                                "start": 4,
                                "end": 7
                            },
                            "start": 4,
                            "end": 148
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 149
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 149
        });
    });

    it('should reference a parameter from within its own initializer', () => {
        expect(parseScript(`f = async function* g(x = x) {};`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "left": {
                                "name": "x",
                                "type": "Identifier"
                            },
                            "right": {
                                "name": "x",
                                "type": "Identifier"
                            },
                            "type": "AssignmentPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should referencing a parameter that occurs later in the ParameterList ', () => {
        expect(parseScript(`f = async function* g(x = y, y) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                                "left": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "right": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "type": "AssignmentPattern"
                            },
                            {
                                "name": "y",
                                "type": "Identifier"
                            }
                        ],
                        "type": "FunctionExpression",
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse expression yield as operand', () => {
        expect(parseScript(`var g = async function*() { yield yield 1; }`, {
            next: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "g",
                        "type": "Identifier"
                    },
                    "init": {
                        "async": true,
                        "body": {
                            "body": [{
                                "expression": {
                                    "argument": {
                                        "argument": {
                                            "type": "Literal",
                                            "value": 1
                                        },
                                        "delegate": false,
                                        "type": "YieldExpression"
                                    },
                                    "delegate": false,
                                    "type": "YieldExpression"
                                },
                                "type": "ExpressionStatement"
                            }],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [],
                        "type": "FunctionExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse binding as specified via property name and identifier ', () => {
        expect(parseScript(`f = async function*({ x: y }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "name": "y",
                                    "type": "Identifier"
                                }
                            }],
                            "type": "ObjectPattern",
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse with trailing comma', () => {
        expect(parseScript(`f = async function*({ x: y, }) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "name": "y",
                                    "type": "Identifier"
                                }
                            }],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse binding as specified via property name, identifier, and initializer', () => {
        expect(parseScript(`f = async function*({ x: y = 33 }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "name": "y",
                                        "type": "Identifier"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 33,
                                    },
                                    "type": "AssignmentPattern"
                                }
                            }],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Object binding pattern with "nested" array binding pattern taking the `null` value', () => {
        expect(parseScript(`f = async function*({ w: [x, y, z] = [4, 5, 6] }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "w",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "elements": [{
                                                "name": "x",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "y",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "z",
                                                "type": "Identifier"
                                            }
                                        ],
                                        "type": "ArrayPattern",
                                    },
                                    "right": {
                                        "elements": [{
                                                "type": "Literal",
                                                "value": 4
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 5
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 6
                                            },
                                        ],
                                        "type": "ArrayExpression"
                                    },
                                    "type": "AssignmentPattern"
                                }
                            }],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Destructuring initializer is not evaluated when value is not `undefined`', () => {
        expect(parseScript(`f = async function*({ w = counter(), x = counter(), y = counter(), z = counter() }) { }`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 87,
                "expression": {
                    "end": 87,
                    "left": {
                        "end": 1,
                        "name": "f",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "end": 87,
                            "start": 84,
                            "type": "BlockStatement"
                        },
                        "end": 87,
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "end": 82,
                            "properties": [{
                                    "computed": false,
                                    "end": 35,
                                    "key": {
                                        "end": 23,
                                        "name": "w",
                                        "start": 22,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 22,
                                    "type": "Property",
                                    "value": {
                                        "end": 35,
                                        "left": {
                                            "end": 23,
                                            "name": "w",
                                            "start": 22,
                                            "type": "Identifier",
                                        },
                                        "right": {
                                            "arguments": [],
                                            "callee": {
                                                "end": 33,
                                                "name": "counter",
                                                "start": 26,
                                                "type": "Identifier"
                                            },
                                            "end": 35,
                                            "start": 26,
                                            "type": "CallExpression"
                                        },
                                        "start": 22,
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 50,
                                    "key": {
                                        "end": 38,
                                        "name": "x",
                                        "start": 37,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 37,
                                    "type": "Property",
                                    "value": {
                                        "end": 50,
                                        "left": {
                                            "end": 38,
                                            "name": "x",
                                            "start": 37,
                                            "type": "Identifier",
                                        },
                                        "right": {
                                            "arguments": [],
                                            "callee": {
                                                "end": 48,
                                                "name": "counter",
                                                "start": 41,
                                                "type": "Identifier"
                                            },
                                            "end": 50,
                                            "start": 41,
                                            "type": "CallExpression"
                                        },
                                        "start": 37,
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 65,
                                    "key": {
                                        "end": 53,
                                        "name": "y",
                                        "start": 52,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 52,
                                    "type": "Property",
                                    "value": {
                                        "end": 65,
                                        "left": {
                                            "end": 53,
                                            "name": "y",
                                            "start": 52,
                                            "type": "Identifier",
                                        },
                                        "right": {
                                            "arguments": [],
                                            "callee": {
                                                "end": 63,
                                                "name": "counter",
                                                "start": 56,
                                                "type": "Identifier"
                                            },
                                            "end": 65,
                                            "start": 56,
                                            "type": "CallExpression"
                                        },
                                        "start": 52,
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 80,
                                    "key": {
                                        "end": 68,
                                        "name": "z",
                                        "start": 67,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 67,
                                    "type": "Property",
                                    "value": {
                                        "end": 80,
                                        "left": {
                                            "end": 68,
                                            "name": "z",
                                            "start": 67,
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "arguments": [],
                                            "callee": {
                                                "end": 78,
                                                "name": "counter",
                                                "start": 71,
                                                "type": "Identifier"
                                            },
                                            "end": 80,
                                            "start": 71,
                                            "type": "CallExpression"
                                        },
                                        "start": 67,
                                        "type": "AssignmentPattern"
                                    }
                                }
                            ],
                            "start": 20,
                            "type": "ObjectPattern"
                        }],
                        "start": 4,
                        "type": "FunctionExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 87,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse SingleNameBinding assigns `name` to "anonymous" functions "through" cover grammar', () => {
        expect(parseScript(`f = async function*({ cover = (function () {}), xCover = (0, function() {})  }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "cover",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "cover",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "async": false,
                                            "body": {
                                                "body": [],
                                                "type": "BlockStatement"
                                            },
                                            "expression": false,
                                            "generator": false,
                                            "id": null,
                                            "params": [],
                                            "type": "FunctionExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "xCover",
                                        "type": "Identifier",
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "xCover",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "expressions": [{
                                                    "type": "Literal",
                                                    "value": 0
                                                },
                                                {
                                                    "async": false,
                                                    "body": {
                                                        "body": [],
                                                        "type": "BlockStatement"
                                                    },
                                                    "expression": false,
                                                    "generator": false,
                                                    "id": null,
                                                    "params": [],
                                                    "type": "FunctionExpression"
                                                }
                                            ],
                                            "type": "SequenceExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    }
                                }
                            ],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse SingleNameBinding assigns `name` to "anonymous" classes ', () => {
        expect(parseScript(`f = async function*({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } }) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "cls",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "cls",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "body": {
                                                "body": [],
                                                "type": "ClassBody"
                                            },
                                            "id": null,
                                            "superClass": null,
                                            "type": "ClassExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "xCls",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "xCls",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "body": {
                                                "body": [],
                                                "type": "ClassBody"
                                            },
                                            "id": {
                                                "name": "X",
                                                "type": "Identifier",
                                            },
                                            "superClass": null,
                                            "type": "ClassExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "xCls2",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "xCls2",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "body": {
                                                "body": [{
                                                    "computed": false,
                                                    "key": {
                                                        "name": "name",
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "method",
                                                    "static": true,
                                                    "type": "MethodDefinition",
                                                    "value": {
                                                        "async": false,
                                                        "body": {
                                                            "body": [],
                                                            "type": "BlockStatement"
                                                        },
                                                        "expression": false,
                                                        "generator": false,
                                                        "id": null,
                                                        "params": [],
                                                        "type": "FunctionExpression"
                                                    }
                                                }],
                                                "type": "ClassBody"
                                            },
                                            "id": null,
                                            "superClass": null,
                                            "type": "ClassExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    },
                                }
                            ],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse with "empty" object binding pattern', () => {
        expect(parseScript(`f = async function*({}) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "properties": [],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse rest with unextracted data', () => {
        expect(parseScript(`f = async function* h({a, b, ...rest}) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "a",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "a",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "b",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "b",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "argument": {
                                        "name": "rest",
                                        "type": "Identifier",
                                    },
                                    "type": "RestElement"
                                }
                            ],
                            "type": "ObjectPattern"
                        }, ],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse async generator named function expression', () => {
        expect(parseScript(`f = async function* h({...x}) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                "argument": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            }],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Object binding pattern with "nested" object binding pattern taking the `null` value', () => {
        expect(parseScript(`f = async function* g({ w: { x, y, z } = undefined }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "w",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "properties": [{
                                                "computed": false,
                                                "key": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true,
                                                "type": "Property",
                                                "value": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "name": "y",
                                                    "type": "Identifier"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true,
                                                "type": "Property",
                                                "value": {
                                                    "name": "y",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "name": "z",
                                                    "type": "Identifier"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true,
                                                "type": "Property",
                                                "value": {
                                                    "name": "z",
                                                    "type": "Identifier"
                                                }
                                            }
                                        ],
                                        "type": "ObjectPattern",
                                    },
                                    "right": {
                                        "name": "undefined",
                                        "type": "Identifier",
                                    },
                                    "type": "AssignmentPattern",
                                },
                            }, ],
                            "type": "ObjectPattern",
                        }],
                        "type": "FunctionExpression",
                    },
                    "type": "AssignmentExpression",
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse with trailing comma', () => {
        expect(parseScript(`f = async function* g({ x: y = thrower() }) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "name": "y",
                                        "type": "Identifier"
                                    },
                                    "right": {
                                        "arguments": [],
                                        "callee": {
                                            "name": "thrower",
                                            "type": "Identifier"
                                        },
                                        "type": "CallExpression",
                                    },
                                    "type": "AssignmentPattern"
                                },
                            }, ],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse Object binding pattern with "nested" array binding pattern using initializer', () => {
        expect(parseScript(`f = async function* h({ w: [x, y, z] = [4, 5, 6] }) { }`, {
            next: true,
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "w",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "elements": [{
                                                "name": "x",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "y",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "z",
                                                "type": "Identifier"
                                            },
                                        ],
                                        "type": "ArrayPattern"
                                    },
                                    "right": {
                                        "elements": [{
                                                "type": "Literal",
                                                "value": 4
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 5,
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 6,
                                            },
                                        ],
                                        "type": "ArrayExpression",
                                    },
                                    "type": "AssignmentPattern"
                                }
                            }],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse SingleNameBinding assigns name to "anonymous" generator function', () => {
        expect(parseScript(`f = async function* h({ gen = function* () {}, xGen = function* x() {} }) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "gen",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "gen",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "async": false,
                                            "body": {
                                                "body": [],
                                                "type": "BlockStatement"
                                            },
                                            "expression": false,
                                            "generator": true,
                                            "id": null,
                                            "params": [],
                                            "type": "FunctionExpression"
                                        },
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "xGen",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "left": {
                                            "name": "xGen",
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "async": false,
                                            "body": {
                                                "body": [],
                                                "type": "BlockStatement"
                                            },
                                            "expression": false,
                                            "generator": true,
                                            "id": {
                                                "name": "x",
                                                "type": "Identifier",
                                            },
                                            "params": [],
                                            "type": "FunctionExpression"
                                        },
                                        "type": "AssignmentPattern",
                                    }
                                }
                            ],
                            "type": "ObjectPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program",
        });
    });

    it('should parse Rest element containing an object binding pattern', () => {
        expect(parseScript(`f = async function* h([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "left": {
                                "elements": [{
                                    "argument": {
                                        "properties": [{
                                                "computed": false,
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 0
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "name": "v",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 1
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "name": "w",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 2
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 3
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "name": "y",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "computed": false,
                                                "key": {
                                                    "name": "length",
                                                    "type": "Identifier",
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "name": "z",
                                                    "type": "Identifier",
                                                }
                                            }
                                        ],
                                        "type": "ObjectPattern"
                                    },
                                    "type": "RestElement"
                                }],
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "elements": [{
                                        "type": "Literal",
                                        "value": 7
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 8
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 9
                                    }
                                ],
                                "type": "ArrayExpression"
                            },
                            "type": "AssignmentPattern"
                        }, ],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse Rest element containing an array BindingElementList pattern', () => {
        expect(parseScript(`f = async function* h([...[x, y, z]] = [3, 4, 5]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier",
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "left": {
                                "elements": [{
                                    "argument": {
                                        "elements": [{
                                                "name": "x",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "y",
                                                "type": "Identifier"
                                            },
                                            {
                                                "name": "z",
                                                "type": "Identifier"
                                            },
                                        ],
                                        "type": "ArrayPattern"
                                    },
                                    "type": "RestElement"
                                }, ],
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "elements": [{
                                        "type": "Literal",
                                        "value": 3
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 4
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 5
                                    },
                                ],
                                "type": "ArrayExpression",
                            },
                            "type": "AssignmentPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse with ellison', () => {
        expect(parseScript(`f = async function* h([,] = iter) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "left": {
                                "elements": [
                                    null,
                                ],
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "name": "iter",
                                "type": "Identifier"
                            },
                            "type": "AssignmentPattern"
                        }, ],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse bindingElement with array binding pattern and unused initializer', () => {
        expect(parseScript(`f = async function* h([[] = function() { }()] = [[23]]) { }`, {
            next: true,
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier",
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier",
                        },
                        "params": [{
                            "left": {
                                "elements": [{
                                    "left": {
                                        "elements": [],
                                        "type": "ArrayPattern"
                                    },
                                    "right": {
                                        "arguments": [],
                                        "callee": {
                                            "async": false,
                                            "body": {
                                                "body": [],
                                                "type": "BlockStatement"
                                            },
                                            "expression": false,
                                            "generator": false,
                                            "id": null,
                                            "params": [],
                                            "type": "FunctionExpression"
                                        },
                                        "type": "CallExpression"
                                    },
                                    "type": "AssignmentPattern"
                                }],
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "elements": [{
                                    "elements": [{
                                        "type": "Literal",
                                        "value": 23
                                    }],
                                    "type": "ArrayExpression"
                                }],
                                "type": "ArrayExpression"
                            },
                            "type": "AssignmentPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse  BindingElement with array binding pattern and initializer', () => {
        expect(parseScript(`function* g() {
          yield;
        };`, {
            next: true
        })).to.eql({
            "body": [{
                    "async": false,
                    "body": {
                        "body": [{
                            "expression": {
                                "argument": null,
                                "delegate": false,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        }],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": true,
                    "id": {
                        "name": "g",
                        "type": "Identifier"
                    },
                    "params": [],
                    "type": "FunctionDeclaration"
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse BindingElement with array binding pattern and initializer', () => {
        expect(parseScript(`f = async function* h([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) { }`, {
            next: true,
            ranges: true
        })).to.eql({
            "body": [{
                "end": 64,
                "expression": {
                    "end": 64,
                    "left": {
                        "end": 1,
                        "name": "f",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "end": 64,
                            "start": 61,
                            "type": "BlockStatement"
                        },
                        "end": 64,
                        "expression": false,
                        "generator": true,
                        "id": {
                            "end": 21,
                            "name": "h",
                            "start": 20,
                            "type": "Identifier"
                        },
                        "params": [{
                            "end": 59,
                            "left": {
                                "elements": [{
                                    "end": 44,
                                    "left": {
                                        "elements": [{
                                                "end": 25,
                                                "name": "x",
                                                "start": 24,
                                                "type": "Identifier"
                                            },
                                            {
                                                "end": 28,
                                                "name": "y",
                                                "start": 27,
                                                "type": "Identifier"
                                            },
                                            {
                                                "end": 31,
                                                "name": "z",
                                                "start": 30,
                                                "type": "Identifier"
                                            }
                                        ],
                                        "end": 32,
                                        "start": 23,
                                        "type": "ArrayPattern"
                                    },
                                    "right": {
                                        "elements": [{
                                                "end": 37,
                                                "start": 36,
                                                "type": "Literal",
                                                "value": 4,
                                            },
                                            {
                                                "end": 40,
                                                "start": 39,
                                                "type": "Literal",
                                                "value": 5,
                                            },
                                            {
                                                "end": 43,
                                                "start": 42,
                                                "type": "Literal",
                                                "value": 6,
                                            }
                                        ],
                                        "end": 44,
                                        "start": 35,
                                        "type": "ArrayExpression",
                                    },
                                    "start": 23,
                                    "type": "AssignmentPattern"
                                }, ],
                                "end": 45,
                                "start": 22,
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "elements": [{
                                    "elements": [{
                                            "end": 51,
                                            "start": 50,
                                            "type": "Literal",
                                            "value": 7
                                        },
                                        {
                                            "end": 54,
                                            "start": 53,
                                            "type": "Literal",
                                            "value": 8,
                                        },
                                        {
                                            "end": 57,
                                            "start": 56,
                                            "type": "Literal",
                                            "value": 9,
                                        }
                                    ],
                                    "end": 58,
                                    "start": 49,
                                    "type": "ArrayExpression"
                                }],
                                "end": 59,
                                "start": 48,
                                "type": "ArrayExpression",
                            },
                            "start": 22,
                            "type": "AssignmentPattern"
                        }],
                        "start": 4,
                        "type": "FunctionExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 64,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse Rest element containing an object binding pattern', () => {
        expect(parseScript(`f = async function* h([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "argument": {
                                    "properties": [{
                                            "computed": false,
                                            "key": {
                                                "type": "Literal",
                                                "value": 0
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "name": "v",
                                                "type": "Identifier"
                                            }
                                        },
                                        {
                                            "computed": false,
                                            "key": {
                                                "type": "Literal",
                                                "value": 1
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "name": "w",
                                                "type": "Identifier",
                                            },
                                        },
                                        {
                                            "computed": false,
                                            "key": {
                                                "type": "Literal",
                                                "value": 2
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "name": "x",
                                                "type": "Identifier"
                                            }
                                        },
                                        {
                                            "computed": false,
                                            "key": {
                                                "type": "Literal",
                                                "value": 3
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "name": "y",
                                                "type": "Identifier"
                                            }
                                        },
                                        {
                                            "computed": false,
                                            "key": {
                                                "name": "length",
                                                "type": "Identifier"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "name": "z",
                                                "type": "Identifier"
                                            }
                                        }
                                    ],
                                    "type": "ObjectPattern"
                                },
                                "type": "RestElement"
                            }],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`f = async function* h([...x]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "argument": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            }],
                            "type": "ArrayPattern",
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse  Rest element following elision elements ', () => {
        expect(parseScript(`f = async function* h([ , , ...x]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [
                                null,
                                null,
                                {
                                    "argument": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "type": "RestElement"
                                }
                            ],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Rest element following elision elements', () => {
        expect(parseScript(`f = async function* g([, ...x]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [
                                null,
                                {
                                    "argument": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "type": "RestElement"
                                },
                            ],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Rest element containing a rest element', () => {
        expect(parseScript(`f = async function* h([...[...x]]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "argument": {
                                    "elements": [{
                                        "argument": {
                                            "name": "x",
                                            "type": "Identifier"
                                        },
                                        "type": "RestElement"
                                    }],
                                    "type": "ArrayPattern"
                                },
                                "type": "RestElement"
                            }],
                            "type": "ArrayPattern",
                        }, ],
                        "type": "FunctionExpression",
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse Rest element containing an array BindingElementList pattern ', () => {
        expect(parseScript(`f = async function* h([...[x, y, z]]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "h",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "argument": {
                                    "elements": [{
                                            "name": "x",
                                            "type": "Identifier"
                                        },
                                        {
                                            "name": "y",
                                            "type": "Identifier"
                                        },
                                        {
                                            "name": "z",
                                            "type": "Identifier"
                                        }
                                    ],
                                    "type": "ArrayPattern"
                                },
                                "type": "RestElement"
                            }],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program",
        });
    });

    it('should parse Nested object destructuring with a null value', () => {
        expect(parseScript(`f = async function* g([{ x }]) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "x",
                                        "type": "Identifier"
                                    }
                                }],
                                "type": "ObjectPattern"
                            }],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse  Nested array destructuring with a null value ', () => {
        expect(parseScript(`f = async function* g([[x]]) { }`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": {
                            "name": "g",
                            "type": "Identifier"
                        },
                        "params": [{
                            "elements": [{
                                "elements": [{
                                    "name": "x",
                                    "type": "Identifier"
                                }, ],
                                "type": "ArrayPattern"
                            }, ],
                            "type": "ArrayPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program",
        });
    });

    it('should parse SingleNameBinding assigns name to "anonymous" functions ', () => {
        expect(parseScript(`f = async function*({ fn = function () {}, xFn = function x() {} } = {}) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "left": {
                                "properties": [{
                                        "computed": false,
                                        "key": {
                                            "name": "fn",
                                            "type": "Identifier"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true,
                                        "type": "Property",
                                        "value": {
                                            "left": {
                                                "name": "fn",
                                                "type": "Identifier"
                                            },
                                            "right": {
                                                "async": false,
                                                "body": {
                                                    "body": [],
                                                    "type": "BlockStatement"
                                                },
                                                "expression": false,
                                                "generator": false,
                                                "id": null,
                                                "params": [],
                                                "type": "FunctionExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }
                                    },
                                    {
                                        "computed": false,
                                        "key": {
                                            "name": "xFn",
                                            "type": "Identifier",
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true,
                                        "type": "Property",
                                        "value": {
                                            "left": {
                                                "name": "xFn",
                                                "type": "Identifier",
                                            },
                                            "right": {
                                                "async": false,
                                                "body": {
                                                    "body": [],
                                                    "type": "BlockStatement"
                                                },
                                                "expression": false,
                                                "generator": false,
                                                "id": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                                "params": [],
                                                "type": "FunctionExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }
                                    }
                                ],
                                "type": "ObjectPattern"
                            },
                            "right": {
                                "properties": [],
                                "type": "ObjectExpression"
                            },
                            "type": "AssignmentPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse SingleNameBinding assigns name to "anonymous" functions ', () => {
        expect(parseScript(`var f = async function*({} = null) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "init": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "left": {
                                "properties": [],
                                "type": "ObjectPattern"
                            },
                            "right": {
                                "type": "Literal",
                                "value": null,
                            },
                            "type": "AssignmentPattern"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration",
            }, ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse binding property list with trailing comma', () => {
        expect(parseScript(`f = async function* h({ x: [y], } = { x: [45] }) {}`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 0,
                            "end": 1
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 24,
                                                    "end": 25
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "ArrayPattern",
                                                    "elements": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "y",
                                                            "start": 28,
                                                            "end": 29
                                                        }
                                                    ],
                                                    "start": 27,
                                                    "end": 30
                                                },
                                                "method": false,
                                                "shorthand": false,
                                                "start": 24,
                                                "end": 30
                                            }
                                        ],
                                        "start": 22,
                                        "end": 33
                                    },
                                    "right": {
                                        "type": "ObjectExpression",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "computed": false,
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 38,
                                                    "end": 39
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "value": {
                                                    "type": "ArrayExpression",
                                                    "elements": [
                                                        {
                                                            "type": "Literal",
                                                            "value": 45,
                                                            "start": 42,
                                                            "end": 44,
                                                            "raw": "45"
                                                        }
                                                    ],
                                                    "start": 41,
                                                    "end": 45
                                                },
                                                "start": 38,
                                                "end": 45
                                            }
                                        ],
                                        "start": 36,
                                        "end": 47
                                    },
                                    "start": 22,
                                    "end": 47
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 49,
                                "end": 51
                            },
                            "async": true,
                            "generator": true,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 20,
                                "end": 21
                            },
                            "start": 4,
                            "end": 51
                        },
                        "start": 0,
                        "end": 51
                    },
                    "start": 0,
                    "end": 51
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 51
        });
    });

    it('should parse rest element containing an object binding pattern ', () => {
        expect(parseScript(`f = async function* h([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 0,
                            "end": 1
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "ObjectPattern",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Literal",
                                                                "value": 0,
                                                                "start": 28,
                                                                "end": 29,
                                                                "raw": "0"
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "v",
                                                                "start": 31,
                                                                "end": 32
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 28,
                                                            "end": 32
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Literal",
                                                                "value": 1,
                                                                "start": 34,
                                                                "end": 35,
                                                                "raw": "1"
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "w",
                                                                "start": 37,
                                                                "end": 38
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 34,
                                                            "end": 38
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Literal",
                                                                "value": 2,
                                                                "start": 40,
                                                                "end": 41,
                                                                "raw": "2"
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 43,
                                                                "end": 44
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 40,
                                                            "end": 44
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Literal",
                                                                "value": 3,
                                                                "start": 46,
                                                                "end": 47,
                                                                "raw": "3"
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 49,
                                                                "end": 50
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 46,
                                                            "end": 50
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "length",
                                                                "start": 52,
                                                                "end": 58
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "z",
                                                                "start": 60,
                                                                "end": 61
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 52,
                                                            "end": 61
                                                        }
                                                    ],
                                                    "start": 26,
                                                    "end": 63
                                                },
                                                "start": 23,
                                                "end": 63
                                            }
                                        ],
                                        "start": 22,
                                        "end": 64
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "elements": [
                                            {
                                                "type": "Literal",
                                                "value": 7,
                                                "start": 68,
                                                "end": 69,
                                                "raw": "7"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 8,
                                                "start": 71,
                                                "end": 72,
                                                "raw": "8"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 9,
                                                "start": 74,
                                                "end": 75,
                                                "raw": "9"
                                            }
                                        ],
                                        "start": 67,
                                        "end": 76
                                    },
                                    "start": 22,
                                    "end": 76
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 78,
                                "end": 80
                            },
                            "async": true,
                            "generator": true,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 20,
                                "end": 21
                            },
                            "start": 4,
                            "end": 80
                        },
                        "start": 0,
                        "end": 80
                    },
                    "start": 0,
                    "end": 80
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 80
        });
    });

    it('should parse rest element following elision elements', () => {
        expect(parseScript(`f = async function* h([, ...x] = iter) {}`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 0,
                            "end": 1
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null,
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 28,
                                                    "end": 29
                                                },
                                                "start": 25,
                                                "end": 29
                                            }
                                        ],
                                        "start": 22,
                                        "end": 30
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "iter",
                                        "start": 33,
                                        "end": 37
                                    },
                                    "start": 22,
                                    "end": 37
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 39,
                                "end": 41
                            },
                            "async": true,
                            "generator": true,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 20,
                                "end": 21
                            },
                            "start": 4,
                            "end": 41
                        },
                        "start": 0,
                        "end": 41
                    },
                    "start": 0,
                    "end": 41
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 41
        });
    });

    it('should parse bindingElement with array binding pattern', () => {
        expect(parseScript(`f = async function*([[x, y, z] = [4, 5, 6]]) {}`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 0,
                            "end": 1
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 22,
                                                        "end": 23
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "y",
                                                        "start": 25,
                                                        "end": 26
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "z",
                                                        "start": 28,
                                                        "end": 29
                                                    }
                                                ],
                                                "start": 21,
                                                "end": 30
                                            },
                                            "right": {
                                                "type": "ArrayExpression",
                                                "elements": [
                                                    {
                                                        "type": "Literal",
                                                        "value": 4,
                                                        "start": 34,
                                                        "end": 35,
                                                        "raw": "4"
                                                    },
                                                    {
                                                        "type": "Literal",
                                                        "value": 5,
                                                        "start": 37,
                                                        "end": 38,
                                                        "raw": "5"
                                                    },
                                                    {
                                                        "type": "Literal",
                                                        "value": 6,
                                                        "start": 40,
                                                        "end": 41,
                                                        "raw": "6"
                                                    }
                                                ],
                                                "start": 33,
                                                "end": 42
                                            },
                                            "start": 21,
                                            "end": 42
                                        }
                                    ],
                                    "start": 20,
                                    "end": 43
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 45,
                                "end": 47
                            },
                            "async": true,
                            "generator": true,
                            "expression": false,
                            "id": null,
                            "start": 4,
                            "end": 47
                        },
                        "start": 0,
                        "end": 47
                    },
                    "start": 0,
                    "end": 47
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 47
        });
    });

    it('should parse object binding pattern with empty object', () => {
        expect(parseScript(`f = async function* h({}) {}`, {
            next: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 0,
                            "end": 1
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "ObjectPattern",
                                    "properties": [],
                                    "start": 22,
                                    "end": 24
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 26,
                                "end": 28
                            },
                            "async": true,
                            "generator": true,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 20,
                                "end": 21
                            },
                            "start": 4,
                            "end": 28
                        },
                        "start": 0,
                        "end": 28
                    },
                    "start": 0,
                    "end": 28
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 28
        });
    });

    it('should parse binding property list with trailing comma', () => {
        expect(parseScript(`f = async function* h({ x, }) {}`, {
            next: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "left": {
                      "name": "f",
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "async": true,
                      "body": {
                        "body": [],
                        "type": "BlockStatement"
                      },
                      "expression": false,
                      "generator": true,
                      "id": {
                        "name": "h",
                        "type": "Identifier"
                      },
                      "params": [
                        {
                          "properties": [
                            {
                              "computed": false,
                              "key": {
                                "name": "x",
                                "type": "Identifier"
                              },
                              "kind": "init",
                              "method": false,
                              "shorthand": true,
                              "type": "Property",
                              "value": {
                                "name": "x",
                                "type": "Identifier"
                              }
                            }
                          ],
                          "type": "ObjectPattern"
                        }
                      ],
                      "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                  },
                  "type": "ExpressionStatement"
               },
              ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse rest element following elision elements', () => {
        expect(parseScript(`f = async function*([ , , ...x] = [1, 2, 3, 4, 5]) {}`, {
            next: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "async": true,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": true,
                        "id": null,
                        "params": [{
                            "left": {
                                "elements": [
                                    null,
                                    null,
                                    {
                                        "argument": {
                                            "name": "x",
                                            "type": "Identifier"
                                        },
                                        "type": "RestElement"
                                    }
                                ],
                                "type": "ArrayPattern"
                            },
                            "right": {
                                "elements": [{
                                        "type": "Literal",
                                        "value": 1
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 4,
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 5
                                    }
                                ],
                                "type": "ArrayExpression"
                            },
                            "type": "AssignmentPattern"
                        }, ],
                        "type": "FunctionExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });
});