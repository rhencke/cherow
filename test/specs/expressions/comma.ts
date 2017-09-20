import { parseScript, parseModule } from '../../../src/cherow';

import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Trailing commas', () => {
    
      
        it('should fail on invalid empty arrow', () => {
            expect(() => {
                parseScript(`(,) => 0;`);
            }).to.throw();
        });

        it('should fail on invalid empty call', () => {
            expect(() => {
                parseScript(`f(,);`);
            }).to.throw();
        });
        it('should fail on invalid empty parameter', () => {
            expect(() => {
                parseScript(`function f(,){}`);
            }).to.not.throw();
        });
        it('should fail on invalid rest', () => {
            expect(() => {
                parseScript(`function f(...a,) {}`);
            }).to.throw();
        });
    
        it('should throw on invalid sequence', () => {
            expect(() => {
                parseScript(`(x,y,);`);
            }).to.throw();
        });
    
        it('should throw on invalid trailing comma getter', () => {
            expect(() => {
                parseScript(`class A { get x(,) { return 42 } }`);
            }).to.throw();
        });
    
        it('should throw on invalid empty method', () => {
            expect(() => {
                parseScript(`class A { f(,){} }`);
            }).to.not.throw();
        });
    
        it('should throw on invalid empty constructor', () => {
            expect(() => {
                parseScript(`class A { constructor(,) {} }`);
            }).to.not.throw();
        });
    
        it('should throw on invalid empty call', () => {
            expect(() => {
                parseScript(`f(,);`);
            }).to.throw();
        });
    
        it('should throw on unexpected Class identifier', () => {
            expect(() => {
                parseScript(`class A {
          async
          a(){}
        }`);
            }).to.throw();
        });
    
        it('should throw on unexpected Class identifier', () => {
            expect(() => {
                parseScript(`class A {
          async
          a(){}
        }`);
            }).to.throw();
        });
        
        it.skip('should parse arrow single', () => {
            expect(parseScript('(x,) => 0', {
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
                      "start": 0,
                      "end": 9,
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
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it.skip('should parse trailing function commas', () => {
            expect(parseScript('(x, y, ) => 1;', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            ],
                            "body": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "generator": false,
                            "expression": true,
                            "async": false
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        
        it('should parse trailing comma class', () => {
            expect(parseScript('class Foo { bar(a,) { } }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ClassDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "Foo"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
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
                                    },
                                    "kind": "method",
                                    "static": false
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it.skip('should parse trailing comma arrow', () => {
            expect(parseScript('let f = (x,y,) => x;')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "init": {
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            ],
                            "body": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "generator": false,
                            "expression": true,
                            "async": false
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse comma dangle function', () => {
            expect(parseScript('foo(a, b,);')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "foo"
                        },
                        "arguments": [{
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "name": "b"
                            }
                        ]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse comma dangle', () => {
            expect(parseScript('function foo(a, b,) {};')).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "foo"
                        },
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
                            "body": []
                        },
                        "generator": false,
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
    
        it('should parse  trailing comma call', () => {
            expect(parseScript('f(x,);', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "arguments": [{
                            "end": 3,
                            "name": "x",
                            "start": 2,
                            "type": "Identifier"
                        }],
                        "callee": {
                            "end": 1,
                            "name": "f",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "end": 5,
                        "start": 0,
                        "type": "CallExpression"
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

        it('should parse  trailing comma constructor', () => {
            expect(parseScript('class X { constructor(a,) {} }', {
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "constructor"
                            },
                            "kind": "constructor",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "generator": false,
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "expression": false,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "a"
                                }],
                                "async": false
                            },
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse  trailing comma method', () => {
            expect(parseScript('class P { f(a,b,) { } }', {
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "P"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
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
                                    "body": []
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
    
        it('should parse  trailing comma function declaration', () => {
            expect(parseScript('function f(a,b,){}', {
                ranges: true
            })).to.eql({
                "body": [{
                    "async": false,
                    "body": {
                        "body": [],
                        "end": 18,
                        "start": 16,
                        "type": "BlockStatement"
                    },
                    "end": 18,
                    "expression": false,
                    "generator": false,
                    "id": {
                        "end": 10,
                        "name": "f",
                        "start": 9,
                        "type": "Identifier"
                    },
                    "params": [{
                            "end": 12,
                            "name": "a",
                            "start": 11,
                            "type": "Identifier"
                        },
                        {
                            "end": 14,
                            "name": "b",
                            "start": 13,
                            "type": "Identifier"
                        }
                    ],
                    "start": 0,
                    "type": "FunctionDeclaration"
                }],
                "end": 18,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });

        it('should parse  trailing comma function expression', () => {
            expect(parseScript('const f = function(a, b,) {}', {
                ranges: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "end": 28,
                        "id": {
                            "end": 7,
                            "name": "f",
                            "start": 6,
                            "type": "Identifier"
                        },
                        "init": {
                            "async": false,
                            "body": {
                                "body": [],
                                "end": 28,
                                "start": 26,
                                "type": "BlockStatement"
                            },
                            "end": 28,
                            "expression": false,
                            "generator": false,
                            "id": null,
                            "params": [{
                                    "end": 20,
                                    "name": "a",
                                    "start": 19,
                                    "type": "Identifier"
                                },
                                {
                                    "end": 23,
                                    "name": "b",
                                    "start": 22,
                                    "type": "Identifier"
                                }
                            ],
                            "start": 10,
                            "type": "FunctionExpression"
                        },
                        "start": 6,
                        "type": "VariableDeclarator"
                    }],
                    "end": 28,
                    "kind": "const",
                    "start": 0,
                    "type": "VariableDeclaration"
                }],
                "end": 28,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse trailing comma method', () => {
            expect(parseScript('class P { f(a,b,) { } }', {
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "P"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "generator": false,
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "expression": false,
                                "params": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                ],
                                "async": false
                            },
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse trailing comma spread', () => {
            expect(parseScript('f(...a,);')).to.eql({
                "body": [{
                    "expression": {
                        "arguments": [{
                            "argument": {
                                "name": "a",
                                "type": "Identifier"
                            },
                            "type": "SpreadElement"
                        }],
                        "callee": {
                            "name": "f",
                            "type": "Identifier"
                        },
                        "type": "CallExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse trailing comma new', () => {
            expect(parseScript('new f(x,);')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [{
                            "type": "Identifier",
                            "name": "x"
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    });