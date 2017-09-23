import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Espressions - Yield', () => {

    it('should fail on "yield v"', () => {
        expect(() => {
            parseScript('yield v');
        }).to.throw();
    });

    it('should fail on invalid yield binding property', () => {
        expect(() => {
            parseScript('var {x: y = yield 3} = z;');
        }).to.throw();
    });

    it('should fail on invalid yield expression', () => {
        expect(() => {
            parseScript('(function() { yield 3; })');
        }).to.throw();
    });

    it('should fail on invalid yield arrow default', () => {
        expect(() => {
            parseScript('function* g() { (x = yield 42) => {} }');
        }).to.throw();
    });

    it('should fail on invalid yield generator arrow parameter', () => {
        expect(() => {
            parseScript('function *g(){ (yield) => 42 }');
        }).to.throw();
    });

    it('should fail on invalid yield generator arrow parameters', () => {
        expect(() => {
            parseScript('function *g(){ (a, b, c, yield) => 42 }');
        }).to.throw();
    });

    it('should fail on invalid yield generator catch', () => {
        expect(() => {
            parseScript('function *g() { try {} catch (yield) {} }');
        }).to.throw();
    });


    it('should fail on invalid yield generator declaration', () => {
        expect(() => {
            parseScript('function *g() { function *yield(){} }');
        }).to.throw();
    });


    it('should fail on invalid yield generator export default', () => {
        expect(() => {
            parseModule('export default function *yield() {}');
        }).to.throw();
    });


    it('should fail on invalid yield generator expression name', () => {
        expect(() => {
            parseScript('(function*yield(){})');
        }).to.throw();
    });

    it('should fail on invalid yield generator expression parameter', () => {
        expect(() => {
            parseScript('(function *(yield){})');
        }).to.throw();
    });


    it('should fail on invalid yield generator function declaration', () => {
        expect(() => {
            parseScript('function *g() { function yield() {} }');
        }).to.throw();
    });


    it('should fail on invalid yield generator lexical declaration', () => {
        expect(() => {
            parseScript('function *g() { let yield; }');
        }).to.throw();
    });

    it('should fail on invalid yield generator member expression', () => {
        expect(() => {
            parseScript('function *g() { return yield.x; }');
        }).to.throw();
    });

    it('should fail on invalid yield generator parameter', () => {
        expect(() => {
            parseScript('function *g(yield){}');
        }).to.throw();
    });

    it('should fail on invalid yield generator strict function expression', () => {
        expect(() => {
            parseScript('function *g(a, b, c, ...yield){}');
        }).to.not.throw();
    });

    it('should fail on invalid yield generator rest', () => {
        expect(() => {
            parseScript('"use strict"; function *g(){ var y = function yield(){}; }');
        }).to.throw();
    });

    it('should fail on invalid yield generator struct function parameter', () => {
        expect(() => {
            parseScript('"use strict"; function *g() { var z = function(yield) {} }');
        }).to.throw();
    });

    it('should fail on invalid yield generator variable declaration', () => {
        expect(() => {
            parseScript('function *g() { var yield; }');
        }).to.throw();
    });

    it('should fail on invalid yield object method', () => {
        expect(() => {
            parseScript('function *a(){({b(){yield}})}');
        }).to.not.throw();
    });

    it('should fail on invalid yield object property getter', () => {
        expect(() => {
            parseScript('function *a(){({get b(){yield}})}');
        }).to.not.throw();
    });

    it('should fail on "yield 10"', () => {
        expect(() => {
            parseScript('yield 10');
        }).to.throw();
    });

    it('should fail on yield as default value', () => {
        expect(() => {
            parseScript('function* wrap() {\n({a = yield b} = obj) => a\n}');
        }).to.throw();
    });

    it('should fail on "function *g() { ({x = yield}) => {} }"', () => {
        expect(() => {
            parseScript('function *g() { ({x = yield}) => {} }');
        }).to.throw();
    });

    it('should fail on "function *g() { (x = yield) => {} }"', () => {
        expect(() => {
            parseScript('function *g() { (x = yield) => {} }');
        }).to.throw();
    });

    it('should fail on "function* wrap() { function* foo(a = 1 + (yield)) {} }"', () => {
        expect(() => {
            parseScript('function* wrap() { function* foo(a = 1 + (yield)) {} }');
        }).to.throw();
    });

    it('should fail on "function* wrap() { return (a = 1 + (yield)) => a }"', () => {
        expect(() => {
            parseScript('function* wrap() { return (a = 1 + (yield)) => a }');
        }).to.throw();
    });

    it('should fail on "function foo() { "use strict"; return {yield} }"', () => {
        expect(() => {
            parseScript('function foo() { "use strict"; return {yield} }');
        }).to.throw();
    });

    it('should fail on ""function* wrap() { function* foo(a = 1 + (yield)) {} }"', () => {
        expect(() => {
            parseScript('"function* wrap() { function* foo(a = 1 + (yield)) {} }');
        }).to.throw();
    });

    it('should fail on "(function() { "use strict"; f(yield v) })"', () => {
        expect(() => {
            parseScript('(function() { "use strict"; f(yield v) })');
        }).to.throw();
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('class A extends yield B { }');
        }).to.throw();
    });

    it('should fail on "(function () { yield 10 })"', () => {
        expect(() => {
            parseScript('(function () { yield 10 })');
        }).to.throw();
    });

    it('should fail on unexpected value', () => {
        expect(() => {
            parseScript('function *g(yield){}');
        }).to.throw();
    });

    it('should fail on reserved yield keyword in module mode', () => {
        expect(() => {
            parseScript("'use strict'; f(yield v)", {
            });
        }).to.throw();
    });

    it('should fail on "function* wrap() { function* foo(a = 1 + (yield)) {} }"', () => {
        expect(() => {
            parseScript('function* wrap() { function* foo(a = 1 + (yield)) {} }');
        }).to.throw();
    });

    it('should fail on "function* wrap() { return (a = 1 + (yield)) => a }"', () => {
        expect(() => {
            parseScript('function* wrap() { return (a = 1 + (yield)) => a }');
        }).to.throw();
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('function foo() { "use strict"; return {yield} }');
        }).to.throw('');
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('function foo() { "use strict"; return {yield} }');
        }).to.throw('');
    });

    it('should fail on "({*foo(a = yield b) {}})"', () => {
        expect(() => {
            parseScript('({*foo(a = yield b) {}})');
        }).to.throw();
    });

    it('should fail on "(function* foo(a = yield b) {})"', () => {
        expect(() => {
            parseScript('(function* foo(a = yield b) {})');
        }).to.throw();
    });

    it('should fail on "function* l() { yield* ?}"', () => {
        expect(() => {
            parseScript('function* l() { yield* ?}');
        }).to.throw();
    });

    it('should fail on "function* l(e=yield 12) {}"', () => {
        expect(() => {
            parseScript('function* l(e=yield 12) {}');
        }).to.throw();
    });

    it('should fail on "function* l() { var yield = 12 }"', () => {
        expect(() => {
            parseScript('function* l() { var yield = 12 }');
        }).to.throw();
    });

    it('should fail on "function* l() { ([e=yield])=>12 };"', () => {
        expect(() => {
            parseScript('function* l() { ([e=yield])=>12 };');
        }).to.throw();
    });

    it('should fail on "function* wrap() {\nclass A {*yield() {}}\n}"', () => {
        expect(() => {
            parseScript('function* wrap() {\nclass A {*yield() {}}\n}');
        }).to.not.throw();
    });

    it('should fail on "function* wrap() {\nclass A {*yield() {}}\n}"', () => {
        expect(() => {
            parseScript('function* foo(a = class extends (yield b) {}) {}');
        }).to.throw('');
    });

    it('should fail on "function* wrap() { function* foo(a = 1 + (yield)) {} }"', () => {
        expect(() => {
            parseScript('function* wrap() { function* foo(a = 1 + (yield)) {} }');
        }).to.throw('');
    });

    it('should fail on "function *g() { (x = yield) => {} }"', () => {
        expect(() => {
            parseScript('function *g() { (x = yield) => {} }');
        }).to.throw();
    });

    it('should fail on  "({ *[yield iter]() {} })" to throw', () => {
        expect(() => {
            parseScript(`({ *[yield iter]() {} })`);
        }).to.throw();
    });

    it('should fail on  "function *g(){ (a, b, c, yield) => 42 }" to throw', () => {
        expect(() => {
            parseScript(`function *g(){ (a, b, c, yield) => 42 }`);
        }).to.throw();
    });

    it('should fail on  "function *g() { let yield; }" to throw', () => {
        expect(() => {
            parseScript(`function *g() { let yield; }`);
        }).to.throw();
    });

    it('should fail on  "function *g() { return yield.x; }" to throw', () => {
        expect(() => {
            parseScript(`function *g() { return yield.x; }`);
        }).to.throw();
    });

    it('should fail on  "(a, ...b);" to throw', () => {
        expect(() => {
            parseScript(`(a, ...b);`);
        }).to.throw();
    });

    it('should fail on  "(a,);" to throw', () => {
        expect(() => {
            parseScript(`(a,);`);
        }).to.throw();
    });

    it('should fail on "({ *[yield iter]() {} })"', () => {
        expect(() => {
            parseScript(`({ *[yield iter]() {} })`)
        }).to.throw();
    });

    it('should fail on "(() => { yield 10 })" to throw', () => {
        expect(() => {
            parseScript('(() => { yield 10 })');
        }).to.throw();
    });

    it('should fail on "class A extends yield B { }" to throw', () => {
        expect(() => {
            parseScript('class A extends yield B { }');
        }).to.throw();
    });

    it('should fail on "function* y({yield}) {}" to throw', () => {
        expect(() => {
            parseScript('function* y({yield}) {}');
        }).to.throw();
    });

    it('should parse yield in nested function as identifier #1 ', () => {
        expect(parseScript(`function *f2() {
            () => yield / 1
          }`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [
                      {
                        "end": 44,
                        "expression": {
                         "async": false,
                          "body": {
                            "end": 44,
                            "left": {
                              "end": 40,
                              "name": "yield",
                              "start": 35,
                              "type": "Identifier"
                            },
                            "operator": "/",
                            "right": {
                              "end": 44,
                              "start": 43,
                              "type": "Literal",
                              "value": 1,
                            },
                            "start": 35,
                            "type": "BinaryExpression"
                          },
                          "end": 44,
                          "expression": true,
                          "generator": false,
                          "id": null,
                          "params": [],
                          "start": 29,
                          "type": "ArrowFunctionExpression"
                        },
                        "start": 29,
                        "type": "ExpressionStatement"
                      }
                    ],
                    "end": 56,
                    "start": 15,
                    "type": "BlockStatement"
                  },
                  "end": 56,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 12,
                    "name": "f2",
                    "start": 10,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                }
              ],
              "end": 56,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse yield in nested function as identifier #2', () => {
        expect(parseScript(`function *f3() {
            ({
              g() {
                return yield / 1;
              }
            })
          }`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [
                      {
                        "end": 116,
                        "expression": {
                          "end": 115,
                          "properties": [
                            {
                              "computed": false,
                              "end": 101,
                              "key": {
                                "end": 47,
                                "name": "g",
                                "start": 46,
                                "type": "Identifier"
                              },
                              "kind": "init",
                              "method": true,
                              "shorthand": false,
                              "start": 46,
                              "type": "Property",
                              "value": {
                                "async": false,
                                "body": {
                                  "body": [
                                    {
                                      "argument": {
                                        "argument": {
                                          "end": 86,
                                          "start": 81,
                                         "type": "Literal",
                                          "value": "yield",
                                        },
                                        "delegate": false,
                                        "end": 86,
                                        "start": 75,
                                        "type": "YieldExpression"
                                      },
                                      "end": 86,
                                      "start": 68,
                                      "type": "ReturnStatement"
                                    },
                                  ],
                                  "end": 101,
                                  "start": 50,
                                  "type": "BlockStatement"
                                },
                                "end": 101,
                                "expression": false,
                                "generator": false,
                               "id": null,
                                "params": [],
                                "start": 47,
                                "type": "FunctionExpression"
                              }
                            }
                          ],
                          "start": 30,
                         "type": "ObjectExpression"
                        },
                        "start": 29,
                        "type": "ExpressionStatement"
                      }
                    ],
                   "end": 128,
                    "start": 15,
                    "type": "BlockStatement"
                  },
                  "end": 128,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 12,
                    "name": "f3",
                    "start": 10,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                }
              ],
              "end": 128,
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse yield expressions in parameters if it is inside of a nested generator', () => {
        expect(parseScript(`function* foo(a = function*(b) { yield b }) { }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 47
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 47,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 47
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 14,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "FunctionExpression",
                      "start": 18,
                      "end": 42,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 42
                        }
                      },
                      "id": null,
                      "generator": true,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 28,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 28
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "name": "b"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 31,
                        "end": 42,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 42
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 33,
                            "end": 40,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 40
                              }
                            },
                            "expression": {
                              "type": "YieldExpression",
                              "start": 33,
                              "end": 40,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 33
                                },
                                "end": {
                                  "line": 1,
                                  "column": 40
                                }
                              },
                              "delegate": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 39,
                                "end": 40,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 39
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 40
                                  }
                                },
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
                  "start": 44,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 44
                    },
                    "end": {
                      "line": 1,
                      "column": 47
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield expression with regular expression', () => {
        expect(parseScript(`function* bar() { yield /re/ }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "bar"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 18,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "Literal",
                          "start": 24,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "value": /re/,
                          "raw": "/re/",
                          "regex": {
                            "pattern": "re",
                            "flags": ""
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
  
    it('should  Distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
        expect(parseScript('function* wrap() {\n(a = yield b)\n}', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [
                      {
                        "end": 32,
                        "expression": {
                          "end": 31,
                          "left": {
                            "end": 21,
                            "name": "a",
                            "start": 20,
                            "type": "Identifier"
                         },
                          "operator": "=",
                          "right": {
                            "argument": {
                              "end": 31,
                              "name": "b",
                              "start": 30,
                              "type": "Identifier"
                            },
                            "delegate": false,
                            "end": 31,
                            "start": 24,
                           "type": "YieldExpression"
                          },
                          "start": 20,
                         "type": "AssignmentExpression"
                        },
                        "start": 19,
                        "type": "ExpressionStatement"
                      },
                    ],
                    "end": 34,
                    "start": 17,
                    "type": "BlockStatement"
                  },
                  "end": 34,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 14,
                    "name": "wrap",
                    "start": 10,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                }
              ],
              "end": 34,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should  Distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
        expect(parseScript('function* wrap() {\n({a = yield b} = obj)\n}', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                 "body": {
                    "body": [
                      {
                        "end": 40,
                       "expression": {
                          "end": 39,
                          "left": {
                            "end": 33,
                            "properties": [
                              {
                                "computed": false,
                                "end": 32,
                                "key": {
                                  "end": 22,
                                  "name": "a",
                                  "start": 21,
                                  "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "start": 21,
                                "type": "Property",
                                "value": {
                                  "end": 32,
                                  "left": {
                                    "end": 22,
                                    "name": "a",
                                    "start": 21,
                                    "type": "Identifier"
                                  },
                                  "right": {
                                    "argument": {
                                      "end": 32,
                                      "name": "b",
                                      "start": 31,
                                      "type": "Identifier",
                                    },
                                    "delegate": false,
                                    "end": 32,
                                    "start": 25,
                                    "type": "YieldExpression",
                                  },
                                  "start": 21,
                                  "type": "AssignmentPattern"
                               },
                              }
                            ],
                            "start": 20,
                            "type": "ObjectPattern"
                         },
                          "operator": "=",
                          "right": {
                            "end": 39,
                            "name": "obj",
                            "start": 36,
                            "type": "Identifier"
                         },
                          "start": 20,
                          "type": "AssignmentExpression"
                        },
                        "start": 19,
                        "type": "ExpressionStatement"
                      }
                   ],
                    "end": 42,
                    "start": 17,
                    "type": "BlockStatement"
                  },
                  "end": 42,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 14,
                    "name": "wrap",
                    "start": 10,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                },
              ],
              "end": 42,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse yield expressions inside functions in default parameters', () => {
        expect(parseScript('function* foo(a = class {*bar() { yield b }}) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 48
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 48
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 14,
                    "end": 44,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 44
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "ClassExpression",
                      "start": 18,
                      "end": 44,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 44
                        }
                      },
                      "id": null,
                      "superClass": null,
                      "body": {
                        "type": "ClassBody",
                        "start": 24,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
                          },
                          "end": {
                            "line": 1,
                            "column": 44
                          }
                        },
                        "body": [
                          {
                            "type": "MethodDefinition",
                            "start": 25,
                            "end": 43,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 25
                              },
                              "end": {
                                "line": 1,
                                "column": 43
                              }
                            },
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 26,
                              "end": 29,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 26
                                },
                                "end": {
                                  "line": 1,
                                  "column": 29
                                }
                              },
                              "name": "bar"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 29,
                              "end": 43,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 29
                                },
                                "end": {
                                  "line": 1,
                                  "column": 43
                                }
                              },
                              "id": null,
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 32,
                                "end": 43,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 32
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 43
                                  }
                                },
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "start": 34,
                                    "end": 41,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 34
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 41
                                      }
                                    },
                                    "expression": {
                                      "type": "YieldExpression",
                                      "start": 34,
                                      "end": 41,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 34
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 41
                                        }
                                      },
                                      "delegate": false,
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 40,
                                        "end": 41,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 40
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 41
                                          }
                                        },
                                        "name": "b"
                                      }
                                    }
                                  }
                                ]
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
                  "start": 46,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 46
                    },
                    "end": {
                      "line": 1,
                      "column": 48
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield expressions inside functions in default parameters', () => {
        expect(parseScript('function* foo(a = {*bar() { yield b }}) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 42,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 42
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 14,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 18,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 19,
                          "end": 37,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
                            },
                            "end": {
                              "line": 1,
                              "column": 37
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 20,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 20
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "name": "bar"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 23,
                            "end": 37,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 23
                              },
                              "end": {
                                "line": 1,
                                "column": 37
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 26,
                              "end": 37,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 26
                                },
                                "end": {
                                  "line": 1,
                                  "column": 37
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 28,
                                  "end": 35,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 28
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 35
                                    }
                                  },
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 28,
                                    "end": 35,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 28
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 35
                                      }
                                    },
                                    "delegate": false,
                                    "argument": {
                                      "type": "Identifier",
                                      "start": 34,
                                      "end": 35,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 34
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 35
                                        }
                                      },
                                      "name": "b"
                                    }
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
                "body": {
                  "type": "BlockStatement",
                  "start": 40,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 40
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield expressions inside functions in default parameters', () => {
        expect(parseScript('function* foo(a = function* foo() { yield b }) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 49,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 49
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 49,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 49
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 14,
                    "end": 45,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 45
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "FunctionExpression",
                      "start": 18,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 45
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 28,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "foo"
                      },
                      "generator": true,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 34,
                        "end": 45,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 34
                          },
                          "end": {
                            "line": 1,
                            "column": 45
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 36,
                            "end": 43,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 36
                              },
                              "end": {
                                "line": 1,
                                "column": 43
                              }
                            },
                            "expression": {
                              "type": "YieldExpression",
                              "start": 36,
                              "end": 43,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 43
                                }
                              },
                              "delegate": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 42,
                                "end": 43,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 42
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 43
                                  }
                                },
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
                  "start": 47,
                  "end": 49,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 47
                    },
                    "end": {
                      "line": 1,
                      "column": 49
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse ternary yield', () => {
        expect(parseScript('function* g(){ x ? yield : y }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 15,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "expression": {
                        "type": "ConditionalExpression",
                        "start": 15,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "test": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "name": "x"
                        },
                        "consequent": {
                          "type": "YieldExpression",
                          "start": 19,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "delegate": false,
                          "argument": null
                        },
                        "alternate": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "name": "y"
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

    it('should parse yield arg array', () => {
        expect(parseScript('function *g() { yield [x] }', {
            ranges: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 25,
                        "expression": {
                            "argument": {
                                "elements": [{
                                    "end": 24,
                                    "name": "x",
                                    "start": 23,
                                    "type": "Identifier"
                                }],
                                "end": 25,
                                "start": 22,
                                "type": "ArrayExpression"
                            },
                            "delegate": false,
                            "end": 25,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 27,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 27,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 27,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse yield arg bitnot', () => {
        expect(parseScript('function *g() { yield ~x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "~",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg class', () => {
        expect(parseScript('function *g() { yield class x {} }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "ClassExpression",
                                "id": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "superClass": null,
                                "body": {
                                    "type": "ClassBody",
                                    "body": []
                                }
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield arg delete', () => {
        expect(parseScript('function *g() { yield delete x }', {
            ranges: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 30,
                        "expression": {
                            "argument": {
                                "argument": {
                                    "end": 30,
                                    "name": "x",
                                    "start": 29,
                                    "type": "Identifier"
                                },
                                "end": 30,
                                "operator": "delete",
                                "prefix": true,
                                "start": 22,
                                "type": "UnaryExpression"
                            },
                            "delegate": false,
                            "end": 30,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 32,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 32,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 32,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });

    });

    it('should parse yield arg function', () => {
        expect(parseScript('function *g() { yield function(){} }', {
            ranges: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 34,
                        "expression": {
                            "argument": {
                                "body": {
                                    "body": [],
                                    "end": 34,
                                    "start": 32,
                                    "type": "BlockStatement"
                                },
                                "end": 34,
                                "expression": false,
                                "generator": false,
                                "async": false,
                                "id": null,
                                "params": [],
                                "start": 22,
                                "type": "FunctionExpression"
                            },
                            "delegate": false,
                            "end": 34,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 36,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 36,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
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

    it('should parse yield arg group', () => {
        expect(parseScript('function *g() { yield (x) }', {
            ranges: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 25,
                        "expression": {
                            "argument": {
                                "end": 24,
                                "name": "x",
                                "start": 23,
                                "type": "Identifier"
                            },
                            "delegate": false,
                            "end": 25,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 27,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 27,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 27,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse yield arg let', () => {
        expect(parseScript('function *g() { yield let }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "let"
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg minus', () => {
        expect(parseScript('function *g() { yield -x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "-",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg minus minus', () => {
        expect(parseScript('function *g() { yield --x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UpdateExpression",
                                "operator": "--",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield arg new', () => {
        expect(parseScript('function *g() { yield new X() }', {
            ranges: true,
            raw: true,
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 29,
                        "expression": {
                            "argument": {
                                "arguments": [],
                                "callee": {
                                    "end": 27,
                                    "name": "X",
                                    "start": 26,
                                    "type": "Identifier"
                                },
                                "end": 29,
                                "start": 22,
                                "type": "NewExpression"
                            },
                            "delegate": false,
                            "end": 29,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 31,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 31,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 31,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse yield arg not', () => {
        expect(parseScript('function *g() { yield !x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "!",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield arg object', () => {
        expect(parseScript('function *g() { yield {x} }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
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
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }]
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg plus', () => {
        expect(parseScript('function *g() { yield +x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "+",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg plus plus', () => {
        expect(parseScript('function *g() { yield ++x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UpdateExpression",
                                "operator": "++",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });
    it('should parse yield arg this', () => {
        expect(parseScript('function *g() { yield this }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "ThisExpression"
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });

    });

    it('should parse yield arg super', () => {
        expect(parseScript('class A { *b() { yield super.c(); } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                        "type": "MethodDefinition",
                        "key": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": false,
                                                "object": {
                                                    "type": "Super"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "c"
                                                }
                                            },
                                            "arguments": []
                                        },
                                        "delegate": false
                                    }
                                }]
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "method",
                        "static": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield arg typeof', () => {
        expect(parseScript('function *g() { yield typeof x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "typeof",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield arg void', () => {
        expect(parseScript('function *g() { yield void x }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "g"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "void",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield array pattern', () => {
        expect(parseScript('([yield] = x)')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "yield"
                        }]
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield expression precedence', () => {
        expect(parseScript('function *g() { yield a=b, yield* c=d, e }', {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "end": 40,
                        "expression": {
                            "end": 40,
                            "expressions": [{
                                    "argument": {
                                        "end": 25,
                                        "left": {
                                            "end": 23,
                                            "name": "a",
                                            "start": 22,
                                            "type": "Identifier"
                                        },
                                        "operator": "=",
                                        "right": {
                                            "end": 25,
                                            "name": "b",
                                            "start": 24,
                                            "type": "Identifier"
                                        },
                                        "start": 22,
                                        "type": "AssignmentExpression"
                                    },
                                    "delegate": false,
                                    "end": 25,
                                    "start": 16,
                                    "type": "YieldExpression"
                                },
                                {
                                    "argument": {
                                        "end": 37,
                                        "left": {
                                            "end": 35,
                                            "name": "c",
                                            "start": 34,
                                            "type": "Identifier"
                                        },
                                        "operator": "=",
                                        "right": {
                                            "end": 37,
                                            "name": "d",
                                            "start": 36,
                                            "type": "Identifier"
                                        },
                                        "start": 34,
                                        "type": "AssignmentExpression"
                                    },
                                    "delegate": true,
                                    "end": 37,
                                    "start": 27,
                                    "type": "YieldExpression"
                                },
                                {
                                    "end": 40,
                                    "name": "e",
                                    "start": 39,
                                    "type": "Identifier"
                                }
                            ],
                            "start": 16,
                            "type": "SequenceExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 42,
                    "start": 14,
                    "type": "BlockStatement"
                },
                "end": 42,
                "expression": false,
                "generator": true,
                "async": false,
                "id": {
                    "end": 11,
                    "name": "g",
                    "start": 10,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 42,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse yield function expression', () => {
        expect(parseScript('(function yield(){})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "yield"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse yield generator declaration', () => {
        expect(parseScript('function *yield(){}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "yield"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield generator method', () => {
        expect(parseScript('({ *yield() {} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield method', () => {
        expect(parseScript('({ yield() {} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "computed": false,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield super property', () => {
        expect(parseScript('class A extends B { X() { super.yield } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "body": [{
                        "type": "MethodDefinition",
                        "key": {
                            "type": "Identifier",
                            "name": "X"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": {
                                            "type": "Super"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "yield"
                                        }
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "method",
                        "static": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield parameter object pattern', () => {
        expect(parseScript('function f({yield: y}){}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "f"
                },
                "params": [{
                    "type": "ObjectPattern",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": false,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield yield expression', () => {
        expect(parseScript('function *g() { yield yield }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 29
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 16,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 16,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "YieldExpression",
                          "start": 22,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "delegate": false,
                          "argument": null
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

    it('should parse "function*a(){yield\na}"', () => {
        expect(parseScript('function*a(){yield\na}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "YieldExpression",
                                "argument": null,
                                "delegate": false
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Identifier",
                                "name": "a"
                            }
                        }
                    ]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({set a(yield){}})"', () => {
        expect(parseScript('({set a(yield){}})')).to.eql({
              "body": [
                {
                  "expression": {
                   "properties": [
                      {
                        "computed": false,
                        "key": {
                          "name": "a",
                          "type": "Identifier"
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false,
                        "type": "Property",
                        "value": {
                          "async": false,
                          "body": {
                            "body": [],
                            "type": "BlockStatement"
                         },
                          "expression": false,
                          "generator": false,
                          "id": null,
                          "params": [
                            {
                             "name": "yield",
                              "type": "Identifier"
                           }
                          ],
                          "type": "FunctionExpression"
                        }
                      }
                    ],
                    "type": "ObjectExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "function *a(){yield-0}"', () => {
        expect(parseScript('function *a(){yield-0}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "-",
                                "argument": {
                                    "type": "Literal",
                                    "value": 0
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield delete 0}"', () => {
        expect(parseScript('function *a(){yield delete 0}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "delete",
                                "argument": {
                                    "type": "Literal",
                                    "value": 0
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield 2e308}"', () => {
        expect(parseScript('function *a(){yield 2e308}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Literal",
                                "value": Infinity
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield(0)}"', () => {
        expect(parseScript('function *a(){yield(0)}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Literal",
                                "value": 0
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield class{}}   "', () => {
        expect(parseScript('function *a(){yield class{}}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
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
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield ++a;}"', () => {
        expect(parseScript('function *a(){yield ++a;}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UpdateExpression",
                                "operator": "++",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){yield --a;}"', () => {
        expect(parseScript('function *a(){yield --a;}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "UpdateExpression",
                                "operator": "--",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "prefix": true
                            },
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){({get b(){yield}})}"', () => {
        expect(parseScript('function *a(){({get b(){yield}})}', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "ObjectExpression",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "FunctionExpression",
                                                "id": null,
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
                                                "generator": false,
                                                "expression": false,
                                                "async": false
                                            },
                                            "kind": "get",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
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

    it('should parse "function *a(){({b(){yield}})}"', () => {
        expect(parseScript('function *a(){({b(){yield}})}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "YieldExpression",
                                                "argument": null,
                                                "delegate": false
                                            }
                                        }]
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "init",
                                "method": true,
                                "shorthand": false
                            }]
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function a(){({*[yield](){}})}"', () => {
        expect(parseScript('function a(){({*[yield](){}})}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "yield"
                                },
                                "computed": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": true,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "init",
                                "method": true,
                                "shorthand": false
                            }]
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

    it('should parse "function *a(){({*[yield](){}})}"', () => {
        expect(parseScript('function *a(){({*[yield](){}})}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "YieldExpression",
                                    "argument": null,
                                    "delegate": false
                                },
                                "computed": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": true,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "init",
                                "method": true,
                                "shorthand": false
                            }]
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "yield* 10"', () => {
        expect(parseScript('yield* 10')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Identifier",
                        "name": "yield"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 10
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "e => yield* 10"', () => {
        expect(parseScript('e => yield* 10')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "e"
                    }],
                    "body": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 10
                        }
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(function () { yield* 10 })"', () => {
        expect(parseScript('(function () { yield* 10 })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "BinaryExpression",
                                "operator": "*",
                                "left": {
                                    "type": "Identifier",
                                    "name": "yield"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 10
                                }
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

    it('should parse "function *f() { yield\n{}/1/g\n}"', () => {
        expect(parseScript('function *f() { yield\n{}/1/g\n}')).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                   "body": [
                      {
                        "expression": {
                          "argument": null,
                          "delegate": false,
                          "type": "YieldExpression"
                        },
                        "type": "ExpressionStatement"
                      },
                      {
                        "body": [],
                        "type": "BlockStatement"
                      },
                      {
                        "expression": {
                          "regex": {
                            "flags": "g",
                            "pattern": "1",
                          },
                          "type": "Literal",
                          "value": /1/g,
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
                    "type": "Identifier",
                  },
                  "params": [],
                  "type": "FunctionDeclaration",
                },
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "function* foo(a = function*(b) { yield b }) { }"', () => {
        expect(parseScript('function* foo(a = function*(b) { yield b }) { }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "params": [{
                    "type": "AssignmentPattern",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "Identifier",
                            "name": "b"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "YieldExpression",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "delegate": false
                                }
                            }]
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield as function name"', () => {
        expect(parseScript('function* yield() {}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "yield"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({*yield() {}})"', () => {
        expect(parseScript('({*yield() {}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {*yield() {}}"', () => {
        expect(parseScript('class A {*yield() {}}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                        "type": "MethodDefinition",
                        "key": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "method",
                        "static": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function foo() { return {yield} }"', () => {
        expect(parseScript('function foo() { return {yield} }')).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "argument": {
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "yield",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "yield",
                                    "type": "Identifier"
                                }
                            }],
                            "type": "ObjectExpression"
                        },
                        "type": "ReturnStatement"
                    }],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": false,
                "id": {
                    "name": "foo",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse yield method', () => {
        expect(parseScript('function yield(){ "use strict"; }\n')).to.eql({
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
                    "type": "BlockStatement",
                  },
                  "expression": false,
                  "generator": false,
                  "id": {
                    "name": "yield",
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

    it('should parse "(function yield(){ \"use strict\"; })\n"', () => {
        expect(parseScript('(function yield(){ \"use strict\"; })\n')).to.eql({
              "body": [
                {
                  "expression": {
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
                      "name": "yield",
                      "type": "Identifier"
                   },
                    "params": [],
                    "type": "FunctionExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse function with yield', () => {
        expect(parseScript('function* yield() {}', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 20,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 15,
                  "name": "yield"
                },
                "generator": true,
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse funtion name function method', () => {
        expect(parseScript(`class A { yield() {} }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 22,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 22,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 20,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 15,
                        "name": "yield"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 15,
                        "end": 20,
                        "id": null,
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
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should fail on yield as function name inside a unary generator function', () => {
        expect(() => {
            parseScript('+function* yield() {}');
        }).to.throw();
    });

    it('should fail on yield as function name strict in module code', () => {
        expect(() => {
            parseModule('function yield() { "use strict"; } ');
        }).to.throw();
    });

    it('should fail on yield in iteration statement', () => {
        expect(() => {
            parseScript('function* g() { for (yield "" in {}; ; ) ; } ');
        }).to.throw();
    });

    it('should fail on invalid left hand side', () => {
        expect(() => {
            parseScript('function* g() {   yield = 1; }');
        }).to.throw();
    });

    it('should fail on invalid use of yield as default value inside arrow inside generator', () => {
        expect(() => {
            parseScript('function* fn() {  (x = (yield) => {}) => {}; } ');
        }).to.throw();
    });

    it('should fail on yield as default value inside arrow inside generator', () => {
        expect(() => {
            parseScript('"use strict"; function* fn() {  (x = 3 + a.b(yield) ** 2) => {}; } ');
        }).to.throw();
    });
    
    it('should fail on yield as default value inside arrow inside generator', () => {
        expect(() => {
            parseScript('"use strict"; function* fn() { (a, b = 3, x = yield) => {}; } ');
        }).to.throw();
    });

    it('should fail on yield as default value inside arrow inside generator', () => {
        expect(() => {
            parseScript('"use strict"; function* fn() { (x = yield fn) => {}; } ');
        }).to.throw();
    });

    it('should fail on invalid left hand sideeee', () => {
        expect(() => {
            parseScript('"use strict"; function* fn() { (a, b = 3, x = yield) => {}; } ');
        }).to.throw();
    });

    it('should fail on invalid left hand side', () => {
        expect(() => {
            parseScript('function* fn() {  (x = (yield) => {}) => {}; } ');
        }).to.throw();
    });
    it('should parse formal paramater with valid yield operands', () => {
        expect(parseScript(`function* fn() {
            () => yield;
            () => { yield };
         }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 81,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 81,
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
                  "end": 81,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 29,
                      "end": 41,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 29,
                        "end": 40,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "Identifier",
                          "start": 35,
                          "end": 40,
                          "name": "yield"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 54,
                      "end": 70,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 54,
                        "end": 69,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 60,
                          "end": 69,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 62,
                              "end": 67,
                              "expression": {
                                "type": "Identifier",
                                "start": 62,
                                "end": 67,
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

    it('should parse formal paramater with valid yield operands', () => {
        expect(parseScript(`function* g(a, b, c, d) {
            yield a;
            yield b;
            yield c;
            yield d;
          }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 121,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 121,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "b"
                  },
                  {
                    "type": "Identifier",
                    "start": 18,
                    "end": 19,
                    "name": "c"
                  },
                  {
                    "type": "Identifier",
                    "start": 21,
                    "end": 22,
                    "name": "d"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 24,
                  "end": 121,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 38,
                      "end": 46,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 38,
                        "end": 45,
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 44,
                          "end": 45,
                          "name": "a"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 59,
                      "end": 67,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 59,
                        "end": 66,
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 65,
                          "end": 66,
                          "name": "b"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 80,
                      "end": 88,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 80,
                        "end": 87,
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 86,
                          "end": 87,
                          "name": "c"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 101,
                      "end": 109,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 101,
                        "end": 108,
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 107,
                          "end": 108,
                          "name": "d"
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

    it('should parse function generator with try / catch', () => {
        expect(parseScript(`function* g() {
            try {
              throw new Error();
            } catch (err) {
              yield 1;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 143,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 143,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 143,
                  "body": [
                    {
                      "type": "TryStatement",
                      "start": 28,
                      "end": 131,
                      "block": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 80,
                        "body": [
                          {
                            "type": "ThrowStatement",
                            "start": 48,
                            "end": 66,
                            "argument": {
                              "type": "NewExpression",
                              "start": 54,
                              "end": 65,
                              "callee": {
                                "type": "Identifier",
                                "start": 58,
                                "end": 63,
                                "name": "Error"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "handler": {
                        "type": "CatchClause",
                        "start": 81,
                        "end": 131,
                        "param": {
                          "type": "Identifier",
                          "start": 88,
                          "end": 91,
                          "name": "err"
                        },
                        "body": {
                          "type": "BlockStatement",
                          "start": 93,
                          "end": 131,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 109,
                              "end": 117,
                              "expression": {
                                "type": "YieldExpression",
                                "start": 109,
                                "end": 116,
                                "delegate": false,
                                "argument": {
                                  "type": "Literal",
                                  "start": 115,
                                  "end": 116,
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          ]
                        }
                      },
                      "finalizer": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter default inside arrow inside arrow inside generator', () => {
        expect(parseScript(`function* fn() {
              () => (x = yield) => {};
            }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 69,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 69,
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
                  "end": 69,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 55,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 31,
                        "end": 54,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "ArrowFunctionExpression",
                          "start": 37,
                          "end": 54,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "AssignmentPattern",
                              "start": 38,
                              "end": 47,
                              "left": {
                                "type": "Identifier",
                                "start": 38,
                                "end": 39,
                                "name": "x"
                              },
                              "right": {
                                "type": "Identifier",
                                "start": 42,
                                "end": 47,
                                "name": "yield"
                              }
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 52,
                            "end": 54,
                            "body": []
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

    it('should parse parameter default inside arrow', () => {
        expect(parseScript(`(x = yield) => {}`, {
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

    it('should parse funtion name function expression', () => {
        expect(parseScript(`function* fn() {
              function fn2(x = yield) {}
            }`, {
            ranges: true,
            raw: true
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

    it('should parse parameter default inside funtion', () => {
        expect(parseScript(`function fn(x = yield) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
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

    it('should parse funtion name function expression', () => {
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

    it('should parse function name function expression inside generator', () => {
        expect(parseScript(`function* fn() {
            (function yield() {});
          }`, {
            ranges: true
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
                  "end": 63,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 29,
                      "end": 51,
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 30,
                        "end": 49,
                        "id": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 44,
                          "name": "yield"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 47,
                          "end": 49,
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