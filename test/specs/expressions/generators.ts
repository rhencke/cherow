import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Generators', () => {

    it('should fail on incomplete yield delegate', () => {
        expect(() => {
            parseScript(`(function*() { yield* })`);
        }).to.throw('');
    });

    it('should fail if generator parameters contain yield expressions', () => {
        expect(() => {
            parseScript(`function *g(x = yield){}\n`);
        }).to.throw('');
    });

    it('should fail on incomplete yield delegate', () => {
        expect(() => {
            parseScript(`(function*() {
            function*(x = yield 3) {}
        })`);
        }).to.throw('');
    });

    it('should fail if yield is used as a binding identifier', () => {
        expect(() => {
            parseScript(`var gen = function *() {
            var yi\\u0065ld;
          };`);
        }).to.throw();
    });

    it('should fail on generator method with invalid computed name', () => {
        expect(() => {
            parseScript(`({ *[yield iter]() {} })`);
        }).to.throw('');
    });


    it('should fail if yield is used as a binding identifier', () => {
        expect(() => {
            parseScript(`var gen = function *() {
            var yi\\u0065ld;
          };`);
        }).to.throw();
    });

    it('should fail if escaped yield is used as a binding identifier inside a function body', () => {
        expect(() => {
            parseScript(`var gen = function *() { void yi\\u0065ld; };`);
        }).to.throw();
    });

    it('should fail if escaped yield is used as a binding identifier inside a function body and may not be used as a label identifier', () => {
        expect(() => {
            parseScript(`var gen = function *() { yi\\u0065ld: ; };`);
        }).to.throw();
    });

    it('should fail on "(function* yield() {})"', () => {
        expect(() => {
            parseScript('(function* yield() {})');
        }).to.throw();
    });

    it('should fail if yield is used as a binding identifier for generator expressions', () => {
        expect(() => {
            parseScript(`var g = function*(yield) {};`);
        }).to.throw();
    });

    it('should fail on malformed generator method', () => {
        expect(() => {
            parseScript(`class Foo { * }`);
        }).to.throw('');
    });

    it('should fail if a generator contains a non-simple parameter list and a UseStrict directive', () => {
        expect(() => {
            parseScript(`function*(a = 0) { "use strict"; }`);
        }).to.throw('');
    });

    it('should fail if YieldExpression are used within the FormalParameters of a generator', () => {
        expect(() => {
            parseScript(`function*(x = yield) {}`);
        }).to.throw();
    });

    it('should fail if LineTerminator after yield star', () => {
        expect(() => {
            parseScript(`function*() {
  yield
  * 1
};`);
        }).to.throw();
    });

    it('should fail if `yield` is used as a reserved keyword within generator function bodies ', () => {
        expect(() => {
            parseScript(`g = function*(yield) {}`);
        }).to.throw();
    });

    it('should fail on `yield` expressions as LogicalOrExpressions.', () => {
        expect(() => {
            parseScript(`var g = function*() {
  yield ? yield : yield;
};`);
        }).to.throw();
    });

    it('should fail on  Reset element (identifier) does not support initializer (generator function expression)', () => {
        expect(() => {
            parseScript(`f = function*([...x = []]) {
};`);
        }).to.throw();

    });

    it('should fail on Reset element (nested object pattern) does not support initializer (generator function expression)', () => {
        expect(() => {
            parseScript(`f = function*([...{ x } = []]) {
};`);
        }).to.throw();

    });


    it('should fail on  Reset element (identifier) does not support initializer', () => {
        expect(() => {
            parseScript(`f = function*([...x = []]) {
};`);
        }).to.throw();
    });

    it('should fail on "function *a(){yield*}"', () => {
        expect(() => {
            parseScript(`function *a(){yield*}`);
        }).to.throw();

    });

    it('should fail on "function *a(){yield\n*a}"', () => {
        expect(() => {
            parseScript(`function *a(){yield\n*a}`);
        }).to.throw();
    });

    
    it('should parse arguments with arguments', () => {
        expect(parseScript(`var g = function* (x = args = arguments) { function arguments() {} };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 69,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 69
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 69,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 69
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 68,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 68
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 5
                        }
                      },
                      "name": "g"
                    },
                    "init": {
                      "type": "FunctionExpression",
                      "start": 8,
                      "end": 68,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 68
                        }
                      },
                      "id": null,
                      "generator": true,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 19,
                          "end": 39,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
                            },
                            "end": {
                              "line": 1,
                              "column": 39
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 19,
                            "end": 20,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 19
                              },
                              "end": {
                                "line": 1,
                                "column": 20
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "AssignmentExpression",
                            "start": 23,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 23
                              },
                              "end": {
                                "line": 1,
                                "column": 39
                              }
                            },
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 27,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 27
                                }
                              },
                              "name": "args"
                            },
                            "right": {
                              "type": "Identifier",
                              "start": 30,
                              "end": 39,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 30
                                },
                                "end": {
                                  "line": 1,
                                  "column": 39
                                }
                              },
                              "name": "arguments"
                            }
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 41,
                        "end": 68,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 41
                          },
                          "end": {
                            "line": 1,
                            "column": 68
                          }
                        },
                        "body": [
                          {
                            "type": "FunctionDeclaration",
                            "start": 43,
                            "end": 66,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 43
                              },
                              "end": {
                                "line": 1,
                                "column": 66
                              }
                            },
                            "id": {
                              "type": "Identifier",
                              "start": 52,
                              "end": 61,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 52
                                },
                                "end": {
                                  "line": 1,
                                  "column": 61
                                }
                              },
                              "name": "arguments"
                            },
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 64,
                              "end": 66,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 64
                                },
                                "end": {
                                  "line": 1,
                                  "column": 66
                                }
                              },
                              "body": []
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

    it('should parse default parameters with trailing comma', () => {
        expect(parseScript(`ref = function*(a, b = 39,) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 30,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 30,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "ref"
                  },
                  "right": {
                    "type": "FunctionExpression",
                    "start": 6,
                    "end": 30,
                    "id": null,
                    "generator": true,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "a"
                      },
                      {
                        "type": "AssignmentPattern",
                        "start": 19,
                        "end": 25,
                        "left": {
                          "type": "Identifier",
                          "start": 19,
                          "end": 20,
                          "name": "b"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 23,
                          "end": 25,
                          "value": 39,
                          "raw": "39"
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 28,
                      "end": 30,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse destructuring initializer with a "hole"', () => {
        expect(parseScript(`f = function*([x = 23]) {}`, {
            raw: true,
            ranges: true
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
                    "type": "FunctionExpression",
                    "start": 4,
                    "end": 26,
                    "id": null,
                    "generator": true,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 14,
                        "end": 22,
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 15,
                            "end": 21,
                            "left": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 16,
                              "name": "x"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 19,
                              "end": 21,
                              "value": 23,
                              "raw": "23"
                            }
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 24,
                      "end": 26,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse bindingElement with object binding pattern', () => {
        expect(parseScript(`f = function*([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 57,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 57,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 57,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "f"
                  },
                  "right": {
                    "type": "FunctionExpression",
                    "start": 4,
                    "end": 57,
                    "id": null,
                    "generator": true,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 14,
                        "end": 53,
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 15,
                            "end": 52,
                            "left": {
                              "type": "ObjectPattern",
                              "start": 15,
                              "end": 26,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 17,
                                  "end": 18,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 17,
                                    "end": 18,
                                    "name": "x"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 17,
                                    "end": 18,
                                    "name": "x"
                                  }
                                },
                                {
                                  "type": "Property",
                                  "start": 20,
                                  "end": 21,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "name": "y"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "name": "y"
                                  }
                                },
                                {
                                  "type": "Property",
                                  "start": 23,
                                  "end": 24,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 23,
                                    "end": 24,
                                    "name": "z"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 23,
                                    "end": 24,
                                    "name": "z"
                                  }
                                }
                              ]
                            },
                            "right": {
                              "type": "ObjectExpression",
                              "start": 29,
                              "end": 52,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 31,
                                  "end": 36,
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "name": "x"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 34,
                                    "end": 36,
                                    "value": 44,
                                    "raw": "44"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 38,
                                  "end": 43,
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 38,
                                    "end": 39,
                                    "name": "y"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 41,
                                    "end": 43,
                                    "value": 55,
                                    "raw": "55"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 45,
                                  "end": 50,
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 45,
                                    "end": 46,
                                    "name": "z"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 48,
                                    "end": 50,
                                    "value": 66,
                                    "raw": "66"
                                  },
                                  "kind": "init"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 55,
                      "end": 57,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse `yield` used as the binding identifier of a function expression', () => {
        expect(parseScript(`function* bar() { yield class {} }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
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
    it('should parse `yield` used as the binding identifier of a function expression', () => {
        expect(parseScript(`var g = function*() {
            (function yield() {});
          };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 69,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 69,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 68,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "g"
                    },
                    "init": {
                        "type": "FunctionExpression",
                        "start": 8,
                        "end": 68,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 68,
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 34,
                                "end": 56,
                                "expression": {
                                    "type": "FunctionExpression",
                                    "start": 35,
                                    "end": 54,
                                    "id": {
                                        "type": "Identifier",
                                        "start": 44,
                                        "end": 49,
                                        "name": "yield"
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 52,
                                        "end": 54,
                                        "body": []
                                    }
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

    it('should parse anonymous generator', () => {
        expect(parseScript(`(function* () { yield v });`)).to.eql({
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
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "v"
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
            "sourceType": "script"
        });
    });

    it('should parse double yield', () => {
        expect(parseScript(`(function* () { yield yield 10 });`, {
            raw: true
        })).to.eql({
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
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "YieldExpression",
                                    "argument": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    },
                                    "delegate": false
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
            "sourceType": "script"
        });
    });

    it('should parse generator declaration', () => {
        expect(parseScript(`function* test () { yield *v };`)).to.eql({
            "type": "Program",
            "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
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
                                    "name": "v"
                                },
                                "delegate": true
                            }
                        }]
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

    it('should parse yield without value in call', () => {
        expect(parseScript(`(function* () { fn(yield); });`)).to.eql({
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
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "fn"
                                },
                                "arguments": [{
                                    "type": "YieldExpression",
                                    "argument": null,
                                    "delegate": false
                                }]
                            }
                        }]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield without value', () => {
        expect(parseScript(`(function* () { yield; });`)).to.eql({
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
                                "type": "YieldExpression",
                                "argument": null,
                                "delegate": false
                            }
                        }]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function *a(){({set b(yield){}})}"', () => {
        expect(parseScript('function *a(){({set b(yield){}})}', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 33,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "a"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 33,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 14,
                      "end": 32,
                      "expression": {
                        "type": "ObjectExpression",
                        "start": 15,
                        "end": 31,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 16,
                            "end": 30,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 20,
                              "end": 21,
                              "name": "b"
                            },
                            "kind": "set",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 21,
                              "end": 30,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [
                                {
                                  "type": "Identifier",
                                  "start": 22,
                                  "end": 27,
                                  "name": "yield"
                                }
                              ],
                              "body": {
                                "type": "BlockStatement",
                                "start": 28,
                                "end": 30,
                                "body": []
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


    it('should parse "function *a(){({b(){yield}})}"', () => {
        expect(parseScript('function *a(){({b(){yield}})}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 29,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "a"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 29,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 14,
                      "end": 28,
                      "expression": {
                        "type": "ObjectExpression",
                        "start": 15,
                        "end": 27,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 16,
                            "end": 26,
                            "method": true,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 16,
                              "end": 17,
                              "name": "b"
                            },
                            "kind": "init",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 17,
                              "end": 26,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 19,
                                "end": 26,
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "start": 20,
                                    "end": 25,
                                    "expression": {
                                      "type": "Identifier",
                                      "start": 20,
                                      "end": 25,
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
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse "function *a(){({set b(c){yield}})}"', () => {
        expect(parseScript('function *a(){({set b(c){yield}})}', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 34,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "a"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 34,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 14,
                      "end": 33,
                      "expression": {
                        "type": "ObjectExpression",
                        "start": 15,
                        "end": 32,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 16,
                            "end": 31,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 20,
                              "end": 21,
                              "name": "b"
                            },
                            "kind": "set",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 21,
                              "end": 31,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [
                                {
                                  "type": "Identifier",
                                  "start": 22,
                                  "end": 23,
                                  "name": "c"
                                }
                              ],
                              "body": {
                                "type": "BlockStatement",
                                "start": 24,
                                "end": 31,
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "start": 25,
                                    "end": 30,
                                    "expression": {
                                      "type": "Identifier",
                                      "start": 25,
                                      "end": 30,
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
                  ]
                }
              }
            ],
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

    it('should parse "function *a(){yield class{}}"', () => {
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

    it('should parse "function *a(){yield typeof 0}"', () => {
        expect(parseScript('function *a(){yield typeof 0}')).to.eql({
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
                                "operator": "typeof",
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

    it('should parse "function *a(){yield false}"', () => {
        expect(parseScript('function *a(){yield false}')).to.eql({
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
                                "value": false
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

    it('should parse "function *a(){yield "a"}"', () => {
        expect(parseScript('function *a(){yield "a"}')).to.eql({
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
                                "value": "a"
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

    it('should parse "function *a(){yield a}"', () => {
        expect(parseScript('function *a(){yield a}')).to.eql({
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
                                "type": "Identifier",
                                "name": "a"
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

    it('should parse "function *a(){yield+0}"', () => {
        expect(parseScript('function *a(){yield+0}')).to.eql({
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
                                "operator": "+",
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


    it('should parse "function*a(){yield\na}"', () => {
        expect(parseScript('function*a(){yield\na}')).to.eql({
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
                        },
                        {
                            "expression": {
                                "name": "a",
                                "type": "Identifier"
                            },
                            "type": "ExpressionStatement"
                        }
                    ],
                    "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                    "name": "a",
                    "type": "Identifier"
                },
                "params": [],
                "type": "FunctionDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "function *a(){yield 0}"', () => {
        expect(parseScript('function *a(){yield 0}')).to.eql({
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

    it('should parse "function *a(){yield null}"', () => {
        expect(parseScript('function *a(){yield null}')).to.eql({
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
                                "value": null
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

    it('should parse "function *a(){yield true}"', () => {
        expect(parseScript('function *a(){yield true}')).to.eql({
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
                                "value": true
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

    it('should parse generator expression', () => {
        expect(parseScript('(function*() {})')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }]
        });
    });

    it('should parse generator declaration', () => {
        expect(parseScript('function *foo() {}', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 18,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 18,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse generator declaration with yield delegate', () => {
        expect(parseScript('function *foo() { yield* 3; }')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Literal",
                                "value": 3
                            },
                            "delegate": true
                        }
                    }]
                },
                "expression": false,
                "params": [],
                "async": false
            }]
        })
    });

    it('should parse generator declartion with params', () => {
        expect(parseScript('function *foo(x, y, z) {}')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "expression": false,
                "params": [{
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
                ],
                "async": false
            }]
        });
    });

    it('should parse generator expression rest param"', () => {
        expect(parseScript('(function*(...x) {})', {
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
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 19,
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 11,
                      "end": 15,
                      "argument": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "x"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 17,
                    "end": 19,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse generator expression with yield', () => {
        expect(parseScript('(function*() { yield 3; })', {
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
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 25,
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 25,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 15,
                        "end": 23,
                        "expression": {
                          "type": "YieldExpression",
                          "start": 15,
                          "end": 22,
                          "delegate": false,
                          "argument": {
                            "type": "Literal",
                            "start": 21,
                            "end": 22,
                            "value": 3,
                            "raw": "3"
                          }
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

    it('should parse generator method with yield line terminator', () => {
        expect(parseScript(`({ *foo() { 
            yield
            3
          } })`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 59,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 59,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 58,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 56,
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "foo"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 7,
                        "end": 56,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 10,
                          "end": 56,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 25,
                              "end": 30,
                              "expression": {
                                "type": "YieldExpression",
                                "start": 25,
                                "end": 30,
                                "delegate": false,
                                "argument": null
                              }
                            },
                            {
                              "type": "ExpressionStatement",
                              "start": 43,
                              "end": 44,
                              "expression": {
                                "type": "Literal",
                                "start": 43,
                                "end": 44,
                                "value": 3,
                                "raw": "3"
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

    it('should parse generator method with yield', () => {
        expect(parseScript('({ *foo() { yield; } })', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 23,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 22,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 20,
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "foo"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 7,
                        "end": 20,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 10,
                          "end": 20,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 12,
                              "end": 18,
                              "expression": {
                                "type": "YieldExpression",
                                "start": 12,
                                "end": 17,
                                "delegate": false,
                                "argument": null
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


    it('should parse generator method with params', () => {
        expect(parseScript('({ *foo(x, y, z) {} })', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 21,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 19,
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "foo"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 7,
                        "end": 19,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "x"
                          },
                          {
                            "type": "Identifier",
                            "start": 11,
                            "end": 12,
                            "name": "y"
                          },
                          {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "z"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 17,
                          "end": 19,
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

    it('should "function*a(){yield*a}"', () => {
        expect(parseScript('function*a(){yield*a}')).to.eql({
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
                                "type": "Identifier",
                                "name": "a"
                            },
                            "delegate": true
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


    it('should handle generator declaration', () => {
        expect(parseScript('function* test () { yield *v }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "v"
                            },
                            "delegate": true
                        }
                    }]
                },
                "expression": false,
                "params": [],
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should handle anonymous generator', () => {
        expect(parseScript('function* a(){yield}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "generator": true,
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
                "expression": false,
                "params": [],
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield delegation', () => {
        expect(parseScript('(function* () { yield *v });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "v"
                                },
                                "delegate": true
                            }
                        }]
                    },
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield without value no semi', () => {
        expect(parseScript('(function* () { yield });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
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
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield without value', () => {
        expect(parseScript('(function* () { yield; });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
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
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle generator-declaration-with-yield', () => {
        expect(parseScript('function *foo() { yield 3; }')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Literal",
                                "value": 3
                            },
                            "delegate": false
                        }
                    }]
                },
                "expression": false,
                "params": [],
                "async": false
            }]
        });
    });

    it('should handle generator declartion', () => {
        expect(parseScript('function *foo() {}')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "expression": false,
                "params": [],
                "async": false
            }]
        });
    });

    it('should handle generator-expression-rest-param', () => {
        expect(parseScript('(function*(...x) {})')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "expression": false,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "async": false
                }
            }]
        });
    });


    it('should handle generator declaration', () => {
        expect(parseScript('function* test () { yield *v }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "v"
                            },
                            "delegate": true
                        }
                    }]
                },
                "expression": false,
                "params": [],
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should handle anonymous generator', () => {
        expect(parseScript('function* a(){yield}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a"
                },
                "generator": true,
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
                "expression": false,
                "params": [],
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield delegation', () => {
        expect(parseScript('(function* () { yield *v });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "v"
                                },
                                "delegate": true
                            }
                        }]
                    },
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield without value no semi', () => {
        expect(parseScript('(function* () { yield });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
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
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle yield without value', () => {
        expect(parseScript('(function* () { yield; });')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
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
                    "expression": false,
                    "params": [],
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should handle generator-declaration-with-yield', () => {
        expect(parseScript('function *foo() { yield 3; }')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": {
                                "type": "Literal",
                                "value": 3
                            },
                            "delegate": false
                        }
                    }]
                },
                "expression": false,
                "params": [],
                "async": false
            }]
        });
    });

    it('should handle generator declartion', () => {
        expect(parseScript('function *foo() {}')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo"
                },
                "generator": true,
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "expression": false,
                "params": [],
                "async": false
            }]
        });
    });

    it('should handle generator-expression-rest-param', () => {
        expect(parseScript('(function*(...x) {})')).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "generator": true,
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "expression": false,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "async": false
                }
            }]
        });
    });

    it('should parse Lone rest element (generator function expression (default parameter))', () => {
        expect(parseScript(`f = function*([...x] = values) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }]
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "values"
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse  Rest element containing a rest element (generator function expression (default parameter))', () => {
        expect(parseScript(`f = function*([...[...x]] = values) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
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
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "values"
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse elision advances iterator (generator function expression (default parameter))', () => {
        expect(parseScript(`f = function*([,] = g()) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse SingleNameBinding assigns name to "anonymous" functions (generator function expression (default parameter))', () => {
        expect(parseScript(`f = function*([fn = function () {}, xFn = function x() {}] = []) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "fn"
                                        },
                                        "right": {
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
                                        }
                                    },
                                    {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "xFn"
                                        },
                                        "right": {
                                            "type": "FunctionExpression",
                                            "id": {
                                                "type": "Identifier",
                                                "name": "x"
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
                                    }
                                ]
                            },
                            "right": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse SingleNameBinding assigns name to "anonymous" functions (generator function expression (default parameter))', () => {
        expect(parseScript(`f = function*([fn = function () {}, xFn = function x() {}] = []) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [{
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "fn"
                                        },
                                        "right": {
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
                                        }
                                    },
                                    {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "xFn"
                                        },
                                        "right": {
                                            "type": "FunctionExpression",
                                            "id": {
                                                "type": "Identifier",
                                                "name": "x"
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
                                    }
                                ]
                            },
                            "right": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse SingleNameBinding when value iteration was completed previously (generator function expression)', () => {
        expect(parseScript(`f = function*([x, y, z]) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse SingleNameBinding when value iteration was completed previously (generator function expression)', () => {
        expect(parseScript(`f = function*([x, y, z]) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse SingleNameBinding when value iteration was completed previously (generator function expression)', () => {
        expect(parseScript(`f = function*([x, y, z]) {
 
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse destructuring initializer with a "hole" (generator function expression)', () => {
        expect(parseScript(`f = function*([x = 23]) {
};`)).to.eql({
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
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 23
                                }
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with array binding pattern and initializer is used (generator function expression)', () => {
        expect(parseScript(`a = function*([[,] = g()]) {
};`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
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
                            }]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});