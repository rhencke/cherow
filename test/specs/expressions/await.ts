import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Await', () => {

        it('should fail on invalid identifier inside an async function', () => {
            expect(() => {
                parseScript(`async function foo(await) { }`)
            }).to.throw();
        });

        it('should fail on invalid identifieri inside an async function with lineterminator', () => {
            expect(() => {
                parseScript(`async function wrap() {\nasync function await() { }\n}`)
            }).to.throw();
        });

        it('should fail on invalid await in async function body', () => {
            expect(() => {
                parseScript(`async function foo() { return {await} }`)
            }).to.throw();
        });

        it('should fail on invalid await declaration', () => {
            expect(() => {
                parseScript(`async function f() { let await; }`)
            }).to.throw();
        });

        it('should fail on invalid await declaration', () => {
            expect(() => {
                parseScript(`async function f() { let await; }`)
            }).to.throw();
        });
    
        it('should fail on invalid await declaration', () => {
            expect(() => {
                parseScript(`a = async function () { let await; }`)
            }).to.throw();
        });
    
        it('should fail on await identifier', () => {
            expect(() => {
                parseScript(`async function f() { g(await) }`)
            }).to.throw();
        });
    
        it('should fail if trying to asign to await as a simple assignment target', () => {
            expect(() => {
                parseScript(`async function f() { async function await() {} }`)
            }).to.throw();
        });
    
        it('should fail if await has no operand', () => {
            expect(() => {
                parseScript(`async function foo() {
                    await;
                  }`)
            }).to.throw();
        });
    
        it('should fail on invalid await function name', () => {
            expect(() => {
                parseScript(`async function foo() {
                    (await 1) = 1;
                  }`)
            }).to.throw();
        });
    
        it('should fail on invalid await parameter', () => {
            expect(() => {
                parseModule(`async function f(await) {}`)
            }).to.throw();
        });

        it('should fail on invalid await parameter - object expression', () => {
            expect(() => {
                parseModule(`x = { async f(await){} }`)
            }).to.throw();
        });

        it('should fail on invalid await parameter in class decl', () => {
            expect(() => {
                parseScript(`class X { async f(await) {} }`)
            }).to.throw();
        });

        it('should fail on invalid await parameter in class decl', () => {
            expect(() => {
                parseScript(`class x { static async f(await) {} }`)
            }).to.throw();
        });
        
    
        it("should fail on invalid nested async", () => {
            expect(() => {
                parseModule(`async function wrap() {
                    async function await() { }
                  };`)
            }).to.throw();
        });
    
        it("should fail on plain await", () => {
            expect(() => {
                parseModule(`await;`)
            }).to.throw();
        });
    
        it('should fail if await is not a simple assignment target and cannot be assigned to.', () => {
            expect(() => {
                parseScript(`async function foo() {
      (await 1) = 1;
    }`)
            }).to.throw();
        });
    
        it('should fail if await does not have an operant', () => {
            expect(() => {
                parseScript(`async function foo() {
      await;
    }`)
            }).to.throw();
        });

        it.skip('should fail on "async function foo(a = await b) {}`"', () => {
            expect(() => {
                parseScript(`async function foo(a = await b) {}`)
            }).to.throw();
        });
        
        it('should fail on "async (a = await b) => {}"', () => {
            expect(() => {
                parseScript(`async (a = await b) => {}`)
            }).to.throw();
        });
        it('should fail on "async function wrapper() {\nasync (a = await b) => {}\n}"', () => {
            expect(() => {
                parseModule(`async function wrapper() {\nasync (a = await b) => {}\n}`)
            }).to.not.throw();
        });
        it.skip('should fail on "({async foo(a = await b) {}})"', () => {
            expect(() => {
                parseScript(`({async foo(a = await b) {}})`)
            }).to.throw();
        });
        it.skip('should fail on "(class {async foo(a = await b) {}})"', () => {
            expect(() => {
                parseScript(`(class {async foo(a = await b) {}})`)
            }).to.throw();
        });
        it('should fail on "async function foo(a = class extends (await b) {}) {}"', () => {
            expect(() => {
                parseScript(`async function foo(a = class extends (await b) {}) {}`)
            }).to.throw();
        });
    
        it('should fail on "async function foo(a = +await a) { }"', () => {
            expect(() => {
                parseScript(`async function foo(a = +await a) { }`)
            }).to.throw();
        });
        it.skip('should fail on invalid await parameter', () => {
            expect(() => {
                parseModule(`(class {async foo(a = await b) {}})`)
            }).to.throw();
        });
        it('should fail on "(async function foo(a = +await a) { })"', () => {
            expect(() => {
                parseScript(`(async function foo(a = +await a) { })`)
            }).to.throw();
        });
        it('should fail on "(async (a = +await a) => 1)"', () => {
            expect(() => {
                parseScript(`(async (a = +await a) => 1)`)
            }).to.throw();
        });
        it('should fail on "(async function foo(a = +await a) { })"', () => {
            expect(() => {
                parseScript(`(async function foo(a = +await a) { })`)
            }).to.throw();
        });
        it('should fail on "async function foo(a = +await a) { }"', () => {
            expect(() => {
                parseScript(`async function foo(a = +await a) { }`)
            }).to.throw();
        });
    
        it('should fail on invalid await parameter', () => {
            expect(() => {
                parseModule(`a = async function(await) {}`)
            }).to.throw();
        });
    
        it('should fail on invalid await parameter', () => {
            expect(() => {
                parseModule(`async (await) => 42`);
            }).to.throw();
        });

        it('should fail on invalid await property', () => {
            expect(() => {
                parseScript(`async f() { x = { async await(){} } }`);
            }).to.throw();
        });

        it('should fail on invalid declaration', () => {
            expect(() => {
                parseScript(`x = { async f() { let await } }`);
            }).to.throw();
        });

        it('should fail on invalid await no arguments', () => {
            expect(() => {
                parseScript(`async function f() { await }`);
            }).to.throw();
        });

        it('should fail on invalid await method', () => {
            expect(() => {
                parseScript(`async f() { class X { async await(){} } }`);
            }).to.throw();
        });

        it('should fail on invalid await identifier', () => {
            expect(() => {
                parseScript(`a = async function() { g(await) }`);
            }).to.throw();
        });

        it('should parse await as identifier', () => {
            expect(parseScript('await', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 5,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 5,
                    "expression": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "name": "await"
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse a call expression with "await" reference', () => {
            expect(parseScript('async (await)', {
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
                      "type": "CallExpression",
                      "start": 0,
                      "end": 13,
                      "callee": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 5,
                        "name": "async"
                      },
                      "arguments": [
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 12,
                          "name": "await"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse await as an identifier in a function', () => {
            expect(parseScript('async function foo(a = async function foo() { await b }) {}', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 59,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 59,
                    "id": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 19,
                        "end": 55,
                        "left": {
                          "type": "Identifier",
                          "start": 19,
                          "end": 20,
                          "name": "a"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 23,
                          "end": 55,
                          "id": {
                            "type": "Identifier",
                            "start": 38,
                            "end": 41,
                            "name": "foo"
                          },
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 44,
                            "end": 55,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 46,
                                "end": 53,
                                "expression": {
                                  "type": "AwaitExpression",
                                  "start": 46,
                                  "end": 53,
                                  "argument": {
                                    "type": "Identifier",
                                    "start": 52,
                                    "end": 53,
                                    "name": "b"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 57,
                      "end": 59,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse await as an identifier in a function', () => {
            expect(parseScript('function foo(await) { return await; }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "params": [{
                        "type": "Identifier",
                        "name": "await"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ReturnStatement",
                            "argument": {
                                "type": "Identifier",
                                "name": "await"
                            }
                        }]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse await in a generator is an identifier', () => {
            expect(parseScript('async function await() { return 1 }', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 35,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 35,
                    "id": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 20,
                        "name": "await"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 23,
                        "end": 35,
                        "body": [{
                            "type": "ReturnStatement",
                            "start": 25,
                            "end": 33,
                            "argument": {
                                "type": "Literal",
                                "start": 32,
                                "end": 33,
                                "value": 1,
                                "raw": "1"
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse await in global', () => {
            expect(parseScript('var await = 1;', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 14,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 14,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 9,
                            "name": "await"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
        it('should parse await in a generator is an identifier', () => {
            expect(parseScript('function* foo(await) { yield await; };', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 38,
                "body": [{
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 37,
                        "id": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 13,
                            "name": "foo"
                        },
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 14,
                            "end": 19,
                            "name": "await"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 37,
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 23,
                                "end": 35,
                                "expression": {
                                    "type": "YieldExpression",
                                    "start": 23,
                                    "end": 34,
                                    "delegate": false,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 29,
                                        "end": 34,
                                        "name": "await"
                                    }
                                }
                            }]
                        }
                    },
                    {
                        "type": "EmptyStatement",
                        "start": 37,
                        "end": 38
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse await in nested functions', () => {
            expect(parseScript(`async function foo() {
  function bar() {
    await = 1;
  }
  bar();
}
foo();`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 78,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 71,
                    "id": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 21,
                      "end": 71,
                      "body": [
                        {
                          "type": "FunctionDeclaration",
                          "start": 25,
                          "end": 60,
                          "id": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 37,
                            "name": "bar"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 40,
                            "end": 60,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 46,
                                "end": 56,
                                "expression": {
                                  "type": "AssignmentExpression",
                                  "start": 46,
                                  "end": 55,
                                  "operator": "=",
                                  "left": {
                                    "type": "Identifier",
                                    "start": 46,
                                    "end": 51,
                                    "name": "await"
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "start": 54,
                                    "end": 55,
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 63,
                          "end": 69,
                          "expression": {
                            "type": "CallExpression",
                            "start": 63,
                            "end": 68,
                            "callee": {
                              "type": "Identifier",
                              "start": 63,
                              "end": 66,
                              "name": "bar"
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 72,
                    "end": 78,
                    "expression": {
                      "type": "CallExpression",
                      "start": 72,
                      "end": 77,
                      "callee": {
                        "type": "Identifier",
                        "start": 72,
                        "end": 75,
                        "name": "foo"
                      },
                      "arguments": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse await in nested functions', () => {
            expect(parseScript(`async function foo() {
                function bar() {
                  await = 1;
                }
                bar();
              }`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                                "type": "FunctionDeclaration",
                                "id": {
                                    "type": "Identifier",
                                    "name": "bar"
                                },
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "await"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": 1
                                            }
                                        }
                                    }]
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "arguments": []
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }],
                "sourceType": "script"
            });
        });

        it('should parse await method name', () => {
            expect(parseScript('class X { async await(){} }', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 27,
                "body": [
                  {
                    "type": "ClassDeclaration",
                    "start": 0,
                    "end": 27,
                    "id": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 7,
                      "name": "X"
                    },
                    "superClass": null,
                    "body": {
                      "type": "ClassBody",
                      "start": 8,
                      "end": 27,
                      "body": [
                        {
                          "type": "MethodDefinition",
                          "start": 10,
                          "end": 25,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 21,
                            "name": "await"
                          },
                          "static": false,
                          "kind": "method",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 21,
                            "end": 25,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 23,
                              "end": 25,
                              "body": []
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

        it('should parse await static name', () => {
            expect(parseScript('class X { static async await(){} }', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [
                  {
                    "type": "ClassDeclaration",
                    "start": 0,
                    "end": 34,
                    "id": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 7,
                      "name": "X"
                    },
                    "superClass": null,
                    "body": {
                      "type": "ClassBody",
                      "start": 8,
                      "end": 34,
                      "body": [
                        {
                          "type": "MethodDefinition",
                          "start": 10,
                          "end": 32,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 23,
                            "end": 28,
                            "name": "await"
                          },
                          "static": true,
                          "kind": "method",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 28,
                            "end": 32,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 30,
                              "end": 32,
                              "body": []
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

     
    });