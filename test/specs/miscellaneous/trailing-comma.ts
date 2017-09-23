import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Trailing comma', () => {


    it('should throw on unexpected Class identifier', () => {
        expect(() => {
            parseScript(`class A {
      async
      a(){}
    }`);
        }).to.throw();
    });

    it('should fail on invalid empty arrow', () => {
        expect(() => {
            parseScript('(,) => 0;');
        }).to.throw();
    });
    it('should fail on invalid empty call', () => {
        expect(() => {
            parseScript('f(,);');
        }).to.throw();
    });
    it('should fail on invalid empty constructor', () => {
        expect(() => {
            parseScript('class A { constructor(,) {} }');
        }).to.throw();
    });
    it('should fail on invalid empty method', () => {
        expect(() => {
            parseScript('class A { f(,){} }');
        }).to.throw();
    });
    it('should fail on invalid empty parameter', () => {
        expect(() => {
            parseScript('function f(,){}');
        }).to.throw();
    });
    it('should fail on invalid rest', () => {
        expect(() => {
            parseScript('function f(...a,) {}');
        }).to.throw();
    });
    it('should fail on invalid sequence', () => {
        expect(() => {
            parseScript('(x,y,);');
        }).to.throw();
    });
    it('should fail on invalid trailing comma getter', () => {
        expect(() => {
            parseScript('class A { get x(,) { return 42 } }');
        }).to.throw();
    });
    it('should fail on invalid trailing comma async arrow', () => {
        expect(() => {
            parseScript('async (,) => a');
        }).to.throw();
    });
    it('should fail on invalid export', () => {
        expect(() => {
            parseModule('export default function foo(,) { }');
        }).to.throw();
    });
    it('should fail on invalid export default', () => {
        expect(() => {
            parseModule('export default (function foo(,) { })');
        }).to.throw();
    });

    it('should parse trailing comma object expression', () => {
        expect(parseScript(`({foo(a,) {}})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "name": "foo"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 5,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 6,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 6
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 10,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse trailing comma function declaration', () => {
        expect(parseScript(`function foo(a,) { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 20
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 17,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse trailing comma function expression', () => {
        expect(parseScript(`(function(a,) { })`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "expression": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 17,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "name": "a"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 14,
                        "end": 17,
                        "body": []
                    }
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse trailing comma arrow single', () => {
        expect(parseScript(`(a,) => a`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "start": 0,
                    "end": 9,
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
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "a"
                    }
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse trailing comma arrow multi', () => {
        expect(parseScript(`(x,y,z,) => 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [{
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
                    "params": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "x"
                        },
                        {
                            "type": "Identifier",
                            "start": 3,
                            "end": 4,
                            "name": "y"
                        },
                        {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "name": "z"
                        }
                    ],
                    "body": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma async arrow', () => {
        expect(parseScript(`async (a,) => a`, {
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
                    "type": "ArrowFunctionExpression",
                    "start": 0,
                    "end": 15,
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "a"
                    }],
                    "body": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "a"
                    }
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse trailing comma arrow', () => {
        expect(parseScript(`let f = (x,y,) => x;`, {
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
                        "end": 5,
                        "name": "f"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 8,
                        "end": 19,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "x"
                            },
                            {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "name": "y"
                            }
                        ],
                        "body": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 19,
                            "name": "x"
                        }
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma method', () => {
        expect(parseScript(`class A {foo(a,) {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 20,
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
                    "end": 20,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 19,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 12,
                            "name": "foo"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 12,
                            "end": 19,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 13,
                                "end": 14,
                                "name": "a"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 17,
                                "end": 19,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma method', () => {
        expect(parseScript(`(class {foo(a,) {}})`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "expression": {
                    "type": "ClassExpression",
                    "start": 1,
                    "end": 19,
                    "id": null,
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 7,
                        "end": 19,
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 8,
                            "end": 18,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 8,
                                "end": 11,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 11,
                                "end": 18,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 12,
                                    "end": 13,
                                    "name": "a"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 16,
                                    "end": 18,
                                    "body": []
                                }
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma constructor', () => {
        expect(parseScript(`class X { constructor(a,) {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 30,
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
                    "end": 30,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 10,
                        "end": 28,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 21,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 21,
                            "end": 28,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "a"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 26,
                                "end": 28,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma static', () => {
        expect(parseScript(`(class {static foo(a,) {}})`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "expression": {
                    "type": "ClassExpression",
                    "start": 1,
                    "end": 26,
                    "id": null,
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 7,
                        "end": 26,
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 8,
                            "end": 25,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 18,
                                "name": "foo"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 18,
                                "end": 25,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 19,
                                    "end": 20,
                                    "name": "a"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 23,
                                    "end": 25,
                                    "body": []
                                }
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma export default', () => {
        expect(parseModule(`export default function foo(a,) { }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "body": [{
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 35,
                "declaration": {
                    "type": "FunctionDeclaration",
                    "start": 15,
                    "end": 35,
                    "id": {
                        "type": "Identifier",
                        "start": 24,
                        "end": 27,
                        "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "name": "a"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 35,
                        "body": []
                    }
                }
            }],
            "sourceType": "module"
        });
    });

    it('should parse trailing comma export function', () => {
        expect(parseModule(`export function foo(a,) { }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [{
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 27,
                "declaration": {
                    "type": "FunctionDeclaration",
                    "start": 7,
                    "end": 27,
                    "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 19,
                        "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "Identifier",
                        "start": 20,
                        "end": 21,
                        "name": "a"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 27,
                        "body": []
                    }
                },
                "specifiers": [],
                "source": null
            }],
            "sourceType": "module"
        });
    });

    it('should parse trailing comma call', () => {
        expect(parseScript(`foo(a,)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 7,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 7,
                    "callee": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 3,
                        "name": "foo"
                    },
                    "arguments": [{
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma new', () => {
        expect(parseScript(`new foo(a,)`, {
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
                    "type": "NewExpression",
                    "start": 0,
                    "end": 11,
                    "callee": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "foo"
                    },
                    "arguments": [{
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma spread', () => {
        expect(parseScript(`foo(...a,)`, {
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
                        "end": 3,
                        "name": "foo"
                    },
                    "arguments": [{
                        "type": "SpreadElement",
                        "start": 4,
                        "end": 8,
                        "argument": {
                            "type": "Identifier",
                            "start": 7,
                            "end": 8,
                            "name": "a"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma new spread', () => {
        expect(parseScript(`new foo(...a,)`, {
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
                    "type": "NewExpression",
                    "start": 0,
                    "end": 14,
                    "callee": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "foo"
                    },
                    "arguments": [{
                        "type": "SpreadElement",
                        "start": 8,
                        "end": 12,
                        "argument": {
                            "type": "Identifier",
                            "start": 11,
                            "end": 12,
                            "name": "a"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse destructuring param', () => {
        expect(parseScript('function a([a, b, ...[ok]]) {};', {
            ranges: true
        })).to.eql({
            "body": [{
                    "body": {
                        "body": [],
                        "end": 30,
                        "start": 28,
                        "type": "BlockStatement"
                    },
                    "end": 30,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": {
                        "end": 10,
                        "name": "a",
                        "start": 9,
                        "type": "Identifier"
                    },
                    "params": [{
                        "elements": [{
                                "end": 13,
                                "name": "a",
                                "start": 12,
                                "type": "Identifier"
                            },
                            {
                                "end": 16,
                                "name": "b",
                                "start": 15,
                                "type": "Identifier"
                            },
                            {
                                "argument": {
                                    "elements": [{
                                        "end": 24,
                                        "name": "ok",
                                        "start": 22,
                                        "type": "Identifier"
                                    }],
                                    "end": 25,
                                    "start": 21,
                                    "type": "ArrayPattern"
                                },
                                "end": 25,
                                "start": 18,
                                "type": "RestElement"
                            }
                        ],
                        "end": 26,
                        "start": 11,
                        "type": "ArrayPattern"
                    }],
                    "start": 0,
                    "type": "FunctionDeclaration"
                },
                {
                    "end": 31,
                    "start": 30,
                    "type": "EmptyStatement"
                }
            ],
            "end": 31,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse var destructed array literal', () => {
        expect(parseScript('var [a, ...[b, c]] = d;')).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                            "type": "Identifier",
                                            "name": "b"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "c"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "d"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });
});