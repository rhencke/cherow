import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Functions', () => {

    it('should fail on anonymous function declaration', () => {
        expect(() => {
            parseScript('function () {}');
        }).to.throw();
    });

    it('should fail on anonymous function declaration', () => {
        expect(() => {
            parseScript('"use strict"; function package() {}');
        }).to.throw();
    });

    it('should fail on function with keyword', () => {
        expect(() => {
            parseScript('function true() {}');
        }).to.throw();
    });

    it('should fail on function with keyword', () => {
        expect(() => {
            parseScript('function if() {}');
        }).to.throw();
    });

    it('should fail on nested anonymous function declaration', () => {
        expect(() => {
            parseScript('function foo() { function () {} }');
        }).to.throw();
    });

    it('should fail on RestParameter without an initializer "', () => {
        expect(() => {
            parseScript('function f(...x = []) {}');
        }).to.throw();
    });

    it('should fail on RestParameter without an initializer "', () => {
        expect(() => {
            parseScript('function f([...x, y]) {}');
        }).to.throw('');
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('function foo() { "use strict"; return {yield} }');
        }).to.throw('');
    });

    it('should fail if FormalParameters contains any duplicate element', () => {
        expect(() => {
            parseScript('(function f(x = 0, x) {}');
        }).to.throw('');
    });

    it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
        expect(() => {
            parseScript(`"use strict"; function *g() {
                0, function(x = yield) {
                  paramValue = x;
                };
              }`);
        }).to.throw('');
    });

    it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
        expect(() => {
            parseScript(`var gen = function *g() {
                var yi\u0065ld;
              };`);
        }).to.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('0, function*(x = yield) {};');
        }).to.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
        }).to.not.throw('');
    });

    it('should fail if any Identifier value occurs more than once within a FormalParameterList', () => {
        expect(() => {
            parseScript('"use strict"; var _13_1_9_fun = function (param1, param2, param1) { };');
        }).to.not.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
        }).to.not.throw('');
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('"use strict"; function _13_0_4_5_fun() { eval = 42; };');
        }).to.throw('');
    });

    it('should fail on "function __func(){\A\B\C};"', () => {
        expect(() => {
            parseScript('function __func(){\\A\\B\\C};');
        }).to.throw('');
    });

    it('should fail if function name is "eval" in module code only"', () => {
        expect(() => {
            parseModule('function eval() {  }');
        }).to.throw('');
    });

    it('should fail if function name is "arguments" in strict mode"', () => {
        expect(() => {
            parseScript('"use strict"; function arguments() {  }');
        }).to.throw('');
    });

    it('should fail on duplicate params', () => {
        expect(() => {
            parseScript(`"use strict"; function foo(bar, bar) {}`);
        }).to.not.throw('');
    });

    it('should fail on yield as function name in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; function yield() {}`);
        }).to.throw('');
    });

    it('should fail on yield as function name in strict mode', () => {
        expect(() => {
            parseScript(`a: function* a(){}`);
        }).to.throw('');
    });

    it('should parse yield as function name in sloppy mode', () => {
        expect(parseScript(`function yield() {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 19,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 14,
                  "name": "yield"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 17,
                  "end": 19,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as function expression name wrapped in a function declaration  in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              (function yield() {});
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 67,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 67,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 67,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 53,
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 32,
                        "end": 51,
                        "id": {
                          "type": "Identifier",
                          "start": 41,
                          "end": 46,
                          "name": "yield"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 49,
                          "end": 51,
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

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function fn() { function yield() {} }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 37,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 37,
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 16,
                      "end": 35,
                      "id": {
                        "type": "Identifier",
                        "start": 25,
                        "end": 30,
                        "name": "yield"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 33,
                        "end": 35,
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

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              () => yield;
              () => { yield };
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 88,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 88,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 43,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 31,
                        "end": 42,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "Identifier",
                          "start": 37,
                          "end": 42,
                          "name": "yield"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 58,
                      "end": 74,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 58,
                        "end": 73,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 64,
                          "end": 73,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 66,
                              "end": 71,
                              "expression": {
                                "type": "Identifier",
                                "start": 66,
                                "end": 71,
                                "name": "yield"
                              }
                            }
                          ]
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

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`+function yield() {}`, {
            ranges: true
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
                  "type": "UnaryExpression",
                  "start": 0,
                  "end": 20,
                  "operator": "+",
                  "prefix": true,
                  "argument": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 20,
                    "id": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 15,
                      "name": "yield"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 18,
                      "end": 20,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "function eval() {"use strict"; }"', () => {
        expect(parseScript(`function eval() {"use strict"; }`, {
            ranges: false
        })).to.eql({
              "body": [
                {
                 "async": false,
                  "body": {
                    "body": [
                     {
                        "expression": {
                          "type": "Literal",
                          "value": "use strict"
                        },
                        "type": "ExpressionStatement"
                      }
                    ],
                    "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                 "id": {
                    "name": "eval",
                    "type": "Identifier"
                  },
                  "params": [],
                 "type": "FunctionDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "function static() {"use strict"; }"', () => {
        expect(parseScript(`function static() {"use strict"; }`, {
            ranges: false
        })).to.eql({
              "body": [
                {
                 "async": false,
                  "body": {
                    "body": [
                     {
                        "expression": {
                          "type": "Literal",
                          "value": "use strict"
                        },
                        "type": "ExpressionStatement"
                      }
                    ],
                    "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                 "id": {
                    "name": "static",
                    "type": "Identifier"
                  },
                  "params": [],
                 "type": "FunctionDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

   

    it('should parse "function ref(a, b,) { }"', () => {
        expect(parseScript(`function ref(a, b,) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
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
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(a,) { }"', () => {
        expect(parseScript(`function ref(a,) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[,]] = g()) { }"', () => {
        expect(parseScript(`function f([...[,]] = g()) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                null
                                            ]
                                        }
                                    }
                                ]
                            },
                            "right": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "g"
                                },
                                "arguments": []
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function* g() {  yield; };"', () => {
        expect(parseScript(`    function* g() {  yield; };`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "g"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "YieldExpression",
                                    "argument": null,
                                    "delegate": false
                                }
                            }
                        ]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([, ...x]) {}"', () => {
        expect(parseScript(`function f([, ...x]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                null,
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[...x]]) {}"', () => {
        expect(parseScript(`function f([...[...x]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[]]) { }"', () => {
        expect(parseScript(`function f([...[]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[,]]) {}"', () => {
        expect(parseScript(`function f([...[,]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[x, y, z]]) { }"', () => {
        expect(parseScript(`function f([...[x, y, z]]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "z"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([]) {}"', () => {
        expect(parseScript(`function f([]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": []
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([x = 23]) {}"', () => {
        expect(parseScript(`function f([x = 23]) {}`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 23,
                                        "raw": "23"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[...x] = values]) {}"', () => {
        expect(parseScript(`function f([[...x] = values]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
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
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                }
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "values"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[] = function() { }()]) {}"', () => {
        expect(parseScript(`function f([[] = function() { }()]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": []
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": []
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "arguments": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[,] = g()]) {}"', () => {
        expect(parseScript(`function f([[,] = g()]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null
                                        ]
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "g"
                                        },
                                        "arguments": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(a, b = 39,) {}"', () => {
        expect(parseScript(`function ref(a, b = 39,) { }`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 39,
                                "raw": "39"
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(x, y = x, z = y) {}"', () => {
        expect(parseScript(`function ref(x, y = x, z = y) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "x"
                            }
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function __func(){ x = true; }`, {
            ranges: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "end": 28,
                        "expression": {
                            "end": 27,
                            "left": {
                                "end": 20,
                                "name": "x",
                                "start": 19,
                                "type": "Identifier"
                            },
                            "operator": "=",
                            "right": {
                                "end": 27,
                                "start": 23,
                                "type": "Literal",
                                "value": true
                            },
                            "start": 19,
                            "type": "AssignmentExpression"
                        },
                        "start": 19,
                        "type": "ExpressionStatement"
                    }],
                    "end": 30,
                    "start": 17,
                    "type": "BlockStatement"
                },
                "end": 30,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 15,
                    "name": "__func",
                    "start": 9,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 30,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function func(){return "id_string";}"', () => {
        expect(parseScript(`function func(){return "id_string";}`, {
            ranges: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "argument": {
                            "end": 34,
                            "start": 23,
                            "type": "Literal",
                            "value": "id_string"
                        },
                        "end": 35,
                        "start": 16,
                        "type": "ReturnStatement"
                    }],
                    "end": 36,
                    "start": 15,
                    "type": "BlockStatement"
                },
                "end": 36,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 13,
                    "name": "func",
                    "start": 9,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 36,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function\u0009\u2029w(\u000C)\u00A0{\u000D};"', () => {
        expect(parseScript(`function\u0009\u2029w(\u000C)\u00A0{\u000D};`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [],
                    "end": 18,
                    "start": 15,
                    "type": "BlockStatement"
                  },
                  "end": 18,
                  "expression": false,
                  "generator": false,
                  "id": {
                    "end": 11,
                   "name": "w",
                    "start": 10,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                 "type": "FunctionDeclaration"
                },
                {
                  "end": 19,
                  "start": 18,
                  "type": "EmptyStatement"
                }
             ],
              "end": 19,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function __func(arguments){
            return arguments;
            
        };`, {
            ranges: true
        })).to.eql({
            "body": [{
                    "async": false,
                    "body": {
                        "body": [{
                            "argument": {
                                "end": 56,
                                "name": "arguments",
                                "start": 47,
                                "type": "Identifier"
                            },
                            "end": 57,
                            "start": 40,
                            "type": "ReturnStatement"
                        }],
                        "end": 80,
                        "start": 26,
                        "type": "BlockStatement"
                    },
                    "end": 80,
                    "expression": false,
                    "generator": false,
                    "id": {
                        "end": 15,
                        "name": "__func",
                        "start": 9,
                        "type": "Identifier"
                    },
                    "params": [{
                        "end": 25,
                        "name": "arguments",
                        "start": 16,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "FunctionDeclaration"
                },
                {
                    "end": 81,
                    "start": 80,
                    "type": "EmptyStatement"
                }
            ],
            "end": 81,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function
        x
        (
        )
        {
        }
        ;
        
        x();
        
        function                                                    y                                   (                                          )                                              {};
        
        y();
        
        function
        
        z
        
        (
        
        )
        
        {
            
        }
        
        ;
        
        z();`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "body": {
                    "body": [],
                    "end": 58,
                    "start": 47,
                   "type": "BlockStatement"
                  },
                  "end": 58,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "id": {
                    "end": 18,
                    "start": 17,
                    "type": "Identifier",
                    "name": "x",
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                },
                {
                  "end": 68,
                  "start": 67,
                  "type": "EmptyStatement"
               },
                {
                  "end": 90,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 87,
                      "name": "x",
                      "start": 86,
                      "type": "Identifier"
                    },
                    "end": 89,
                    "start": 86,
                    "type": "CallExpression"
                  },
                  "start": 86,
                  "type": "ExpressionStatement"
               },
                {
                  "body": {
                    "body": [],
                    "end": 296,
                    "start": 294,
                    "type": "BlockStatement"
                  },
                  "end": 296,
                  "expression": false,
                  "generator": false,
                  "async": false,
                 "id": {
                    "end": 169,
                  "name": "y",
                    "start": 168,
                   "type": "Identifier"
                  },
                  "params": [],
                  "start": 108,
                  "type": "FunctionDeclaration"
               },
                {
                  "end": 297,
                  "start": 296,
                  "type": "EmptyStatement"
                },
                {
                  "end": 319,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 316,
                      "name": "y",
                      "start": 315,
                      "type": "Identifier"
                   },
                    "end": 318,
                   "start": 315,
                    "type": "CallExpression"
                  },
                  "start": 315,
                  "type": "ExpressionStatement"
               },
                {
                  "body": {
                    "body": [],
                    "end": 444,
                    "start": 420,
                    "type": "BlockStatement"
                  },
                  "end": 444,
                  "expression": false,
                 "generator": false,
                 "async": false,
                  "id": {
                    "end": 364,
                    "name": "z",
                    "start": 363,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 337,
                  "type": "FunctionDeclaration"
                },
                {
                 "end": 463,
                  "start": 462,
                  "type": "EmptyStatement"
               },
                {
                  "end": 485,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 482,
                      "name": "z",
                      "start": 481,
                      "type": "Identifier"
                    },
                    "end": 484,
                    "start": 481,
                    "type": "CallExpression"
                  },
                  "start": 481,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 485,
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "function* bar() { yield class {} }"', () => {
        expect(parseScript(`function* bar() { yield class {} }`, {
            ranges: false,
            raw: true
        })).to.eql({
          "type": "Program",
          "body": [
              {
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "bar"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "YieldExpression",
                                  "argument": {
                                      "type": "ClassExpression",
                                      "id": null,
                                      "superClass": null,
                                      "body": {
                                          "type": "ClassBody",
                                          "body": []
                                      }
                                  },
                                  "delegate": false
                              }
                          }
                      ]
                  },
                  "generator": true,
                  "expression": false,
                  "async": false
              }
          ],
          "sourceType": "script"
      });
      });


      it('should parse parameter default inside arrow', () => {
        expect(parseScript(`(x = yield) => {}`, {
            ranges: true
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
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "AssignmentPattern",
                      "start": 1,
                      "end": 10,
                      "left": {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "name": "x"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 10,
                        "name": "yield"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 17,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              function fn2(x = yield) {}
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 71,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 71,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 71,
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 31,
                      "end": 57,
                      "id": {
                        "type": "Identifier",
                        "start": 40,
                        "end": 43,
                        "name": "fn2"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 44,
                          "end": 53,
                          "left": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 45,
                            "name": "x"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 48,
                            "end": 53,
                            "name": "yield"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 55,
                        "end": 57,
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

    it('should parse parameter default inside function', () => {
        expect(parseScript(`function fn(x = yield) {} `, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 12,
                    "end": 21,
                    "left": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "x"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 16,
                      "end": 21,
                      "name": "yield"
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 23,
                  "end": 25,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`yield => {};`, {
            ranges: true
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
                  "end": 11,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "name": "yield"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 9,
                    "end": 11,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter name arrow', () => {
        expect(parseScript(`(yield) => {}`, {
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
                  "end": 13,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 6,
                      "name": "yield"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 13,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter name function', () => {
        expect(parseScript(`function fn(yield) {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 12,
                    "end": 17,
                    "name": "yield"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 21,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield star parameter default inside function', () => {
        expect(parseScript(`function fn(x = yield* yield) {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 32,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 12,
                    "end": 28,
                    "left": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "x"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "start": 16,
                      "end": 28,
                      "left": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 21,
                        "name": "yield"
                      },
                      "operator": "*",
                      "right": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 28,
                        "name": "yield"
                      }
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse function decl wrapped around function expr with retun statement', () => {
        expect(parseScript(`function a() {
          b =function () { return c }
          return d;
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 82,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 82,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 82,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 25,
                      "end": 52,
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 25,
                        "end": 52,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 25,
                          "end": 26,
                          "name": "b"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 28,
                          "end": 52,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 40,
                            "end": 52,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 42,
                                "end": 50,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 49,
                                  "end": 50,
                                  "name": "c"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "type": "ReturnStatement",
                      "start": 63,
                      "end": 72,
                      "argument": {
                        "type": "Identifier",
                        "start": 70,
                        "end": 71,
                        "name": "d"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });  
        });  

        it('should parse function expression + newline + indentifier', () => {
            expect(parseScript(`a = function() {}
            b`, {
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
                    "end": 17,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 17,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "a"
                      },
                      "right": {
                        "type": "FunctionExpression",
                        "start": 4,
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
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 30,
                    "end": 31,
                    "expression": {
                      "type": "Identifier",
                      "start": 30,
                      "end": 31,
                      "name": "b"
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
});