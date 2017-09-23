import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Generator', () => {

    it('should fail on `yield` expression as logical or expressions', () => {
        expect(() => {
            parseScript('function* g() { yield ? yield : yield }');
        }).to.throw('');
    });

    it('should fail on yield as parameter', () => {
        expect(() => {
            parseScript('function* g(yield) {}');
        }).to.throw('');
    });

    it('should fail on `yield` star after newline', () => {
        expect(() => {
            parseScript(`function* g() {
                yield
                * 1
              }`);
        }).to.throw('');
    });

    it('should fail on "label: function* a(){}"', () => {
        expect(() => {
            parseScript('label: function* a(){}');
        }).to.throw('');
    });

    it('should fail on "function*g(yield){}"', () => {
        expect(() => {
            parseScript('function*g(yield){}');
        }).to.throw('');
    });

    it('should fail on "function*g({yield}){}"', () => {
        expect(() => {
            parseScript('function*g({yield}){}');
        }).to.throw('');
    });

    it('should fail on "function*g([yield]){}"', () => {
        expect(() => {
            parseScript('function*g([yield]){}');
        }).to.throw();
    });
    
    it('should fail on "function*g({a: yield}){}"', () => {
        expect(() => {
            parseScript('function*g({a: yield}){}');
        }).to.throw('');
    });
    it('should fail on "function*g(yield = 0){}"', () => {
        expect(() => {
            parseScript('function*g(yield = 0){}');
        }).to.throw('');
    });
    it('should fail on "function*g(){ var yield; }"', () => {
        expect(() => {
            parseScript('function*g(){ var yield; }');
        }).to.throw('');
    });
    it('should fail on "function*g(){ var yield = 1; }"', () => {
        expect(() => {
            parseScript('function*g(){ var yield = 1; }');
        }).to.throw('');
    });
    it('should fail on "function*g(){ function yield(){}; }"', () => {
        expect(() => {
            parseScript('function*g(){ function yield(){}; }');
        }).to.throw('');
    });
    it('should fail on "function*g() { var yield; }"', () => {
        expect(() => {
            parseScript('function*g() { var yield; }');
        }).to.throw('');
    });
    it('should fail on "function*g() { let yield; }"', () => {
        expect(() => {
            parseScript('function*g() { let yield; }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { try {} catch (yield) {} }"', () => {
        expect(() => {
            parseScript('function*g() { try {} catch (yield) {} }');
        }).to.throw('');
    });
    it('should fail on "function*g() { ({yield}); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield}); }');
        }).to.throw('');
    });

    it('should fail on "function*g() { ({yield} = 0); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield} = 0); }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { var {yield} = 0; }"', () => {
        expect(() => {
            parseScript('function*g() { var {yield} = 0; }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { for ({yield} in 0); }"', () => {
        expect(() => {
            parseScript('function*g() { for ({yield} in 0); }');
        }).to.not.throw('');
    });
    it('should fail if on "function*g() { ({yield = 0}); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield = 0}); }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { ({yield = 0} = 0); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield = 0} = 0); }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { var {yield = 0} = 0; }"', () => {
        expect(() => {
            parseScript('function*g() { var {yield = 0} = 0; }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { for ({yield = 0} in 0); }"', () => {
        expect(() => {
            parseScript('function*g() { for ({yield = 0} in 0); }');
        }).to.throw('');
    });

    it('should parse generator with yield delegate', () => {
        expect(parseScript('function *foo() { yield* 3; }', {
            raw: true,
            ranges: true
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
                  "end": 29,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 27,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 18,
                        "end": 26,
                        "delegate": true,
                        "argument": {
                          "type": "Literal",
                          "start": 25,
                          "end": 26,
                          "value": 3,
                          "raw": "3"
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
   
    it('should parse generator declaration', () => {
        expect(parseScript('function *foo() { yield 3; }', {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 28
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
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 18,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "Literal",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "value": 3,
                          "raw": "3"
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

    it('should parse complex nested generator declaration in sloppy mode', () => {
        expect(parseScript(`function *gen() {
            (function() {
                var yield;
              }())
          }`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 101,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 11
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 101,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 11
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
                  "name": "gen"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 101,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 5,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 30,
                      "end": 89,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 4,
                          "column": 18
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 31,
                        "end": 88,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 13
                          },
                          "end": {
                            "line": 4,
                            "column": 17
                          }
                        },
                        "callee": {
                          "type": "FunctionExpression",
                          "start": 31,
                          "end": 86,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 13
                            },
                            "end": {
                              "line": 4,
                              "column": 15
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 42,
                            "end": 86,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 24
                              },
                              "end": {
                                "line": 4,
                                "column": 15
                              }
                            },
                            "body": [
                              {
                                "type": "VariableDeclaration",
                                "start": 60,
                                "end": 70,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 26
                                  }
                                },
                                "declarations": [
                                  {
                                    "type": "VariableDeclarator",
                                    "start": 64,
                                    "end": 69,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 25
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 64,
                                      "end": 69,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 20
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 25
                                        }
                                      },
                                      "name": "yield"
                                    },
                                    "init": null
                                  }
                                ],
                                "kind": "var"
                              }
                            ]
                          }
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

});