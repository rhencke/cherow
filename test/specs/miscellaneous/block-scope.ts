import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Block scope', () => {

        it('should fail on redeclaration with async function declaration (async function declaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function f() {} async function f() {} }');
            }).to.throw();
        });

        it('should fail if function declarations in statement position in strict mode', () => {
            expect(() => {
                parseScript('for (;false;) function g() {}');
            }).to.throw();
        });

        it('should fail if function declarations in statement position in strict mode', () => {
            expect(() => {
                parseScript('switch (true) { default: function g() {} }');
            }).to.not.throw();
        });

        it('should fail on redeclaration with Async generator declaration (async function declaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function f() {} async function* f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on "redeclaration with ClassDeclaration (async function declaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function f() {} class f {}; }');
            }).to.throw();
        });
        it('should fail on redeclaration with FunctionDeclaration (async function declaration in BlockStatement)', () => {
            expect(() => {
                parseScript(' async function f() {} function f() {} }');
            }).to.throw();
        });
        it('should fail on "redeclaration with async function declaration (Async generator declaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function* f() {} async function f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on "redeclaration with const-lexical declaration (aync generator declaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function* f() {} const f = 0; }');
            }).to.throw();
        });
        it('should fail on redeclaration with FunctionDeclaration (async generator declaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function* f() {} function f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on redeclaration with  generator declaration (async generator declaration in BlockStatement))', () => {
            expect(() => {
                parseScript('{ async function* f() {} function* f() {} }');
            }).to.throw();
        });
        it('should fail on redeclaration with async function declaration (class declaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ class f {} async function f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on "redeclaration with FunctionDeclaration (class declaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ class f {} function f() {} }');
            }).to.throw();
        });
        it('should fail on redeclaration with VariableDeclaration (lexical declaration (const) in BlockStatement)', () => {
            expect(() => {
                parseScript('{ const f = 0; var f; }');
            }).to.throw();
        });

        it('should fail on redeclaration with async function declaration (lexical declaration (let) in BlockStatement)', () => {
            expect(() => {
                parseScript('{ let f; async function f() {} }');
            }).to.throw();
        });

        it('should fail on redeclaration with async function declaration (lexical declaration (let) in BlockStatement)', () => {
            expect(() => {
                parseScript('{ let f; function* f() {} }');
            }).to.throw();
        });

        it('should fail on redeclaration with async function declaration (lexical declaration (let) in BlockStatement)', () => {
            expect(() => {
                parseScript('{ let f; async function f() {} }');
            }).to.throw();
        });

        it('should fail on multiple lexical bindings, with initializer', () => {
            expect(() => {
                parseScript('for (let x = 3, y = 4 in {}) { }');
            }).to.throw();
        });

        it('should disallow initialization assignment', () => {
            expect(() => {
                parseScript('for (let x = 3 in {}) { }');
            }).to.throw();
        });

        it('should  disallow multiple lexical bindings', () => {
            expect(() => {
                parseScript('for (let x, y in {}) { }');
            }).to.throw();
        });

        it('should parse mixed values in iteration', () => {
            expect(parseScript(`function fn(x) {
                let a = [];
                for (let p in x) {
                  a.push(function () { return p; });
                }
                let k = 0;
                for (let q in x) {
                  ++k;
                }
              }
              fn({a : [0], b : 1, c : {v : 1}, get d() {}, set e(x) {}})`, {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 342,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 269,
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
                        "end": 13,
                        "name": "x"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 15,
                      "end": 269,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 33,
                          "end": 44,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 37,
                              "end": 43,
                              "id": {
                                "type": "Identifier",
                                "start": 37,
                                "end": 38,
                                "name": "a"
                              },
                              "init": {
                                "type": "ArrayExpression",
                                "start": 41,
                                "end": 43,
                                "elements": []
                              }
                            }
                          ],
                          "kind": "let"
                        },
                        {
                          "type": "ForInStatement",
                          "start": 61,
                          "end": 150,
                          "left": {
                            "type": "VariableDeclaration",
                            "start": 66,
                            "end": 71,
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "start": 70,
                                "end": 71,
                                "id": {
                                  "type": "Identifier",
                                  "start": 70,
                                  "end": 71,
                                  "name": "p"
                                },
                                "init": null
                              }
                            ],
                            "kind": "let"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 75,
                            "end": 76,
                            "name": "x"
                          },
                          "body": {
                            "type": "BlockStatement",
                            "start": 78,
                            "end": 150,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 98,
                                "end": 132,
                                "expression": {
                                  "type": "CallExpression",
                                  "start": 98,
                                  "end": 131,
                                  "callee": {
                                    "type": "MemberExpression",
                                    "start": 98,
                                    "end": 104,
                                    "object": {
                                      "type": "Identifier",
                                      "start": 98,
                                      "end": 99,
                                      "name": "a"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 100,
                                      "end": 104,
                                      "name": "push"
                                    },
                                    "computed": false
                                  },
                                  "arguments": [
                                    {
                                      "type": "FunctionExpression",
                                      "start": 105,
                                      "end": 130,
                                      "id": null,
                                      "generator": false,
                                      "expression": false,
                                      "async": false,
                                      "params": [],
                                      "body": {
                                        "type": "BlockStatement",
                                        "start": 117,
                                        "end": 130,
                                        "body": [
                                          {
                                            "type": "ReturnStatement",
                                            "start": 119,
                                            "end": 128,
                                            "argument": {
                                              "type": "Identifier",
                                              "start": 126,
                                              "end": 127,
                                              "name": "p"
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "type": "VariableDeclaration",
                          "start": 167,
                          "end": 177,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 171,
                              "end": 176,
                              "id": {
                                "type": "Identifier",
                                "start": 171,
                                "end": 172,
                                "name": "k"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 175,
                                "end": 176,
                                "value": 0,
                                "raw": "0"
                              }
                            }
                          ],
                          "kind": "let"
                        },
                        {
                          "type": "ForInStatement",
                          "start": 194,
                          "end": 253,
                          "left": {
                            "type": "VariableDeclaration",
                            "start": 199,
                            "end": 204,
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "start": 203,
                                "end": 204,
                                "id": {
                                  "type": "Identifier",
                                  "start": 203,
                                  "end": 204,
                                  "name": "q"
                                },
                                "init": null
                              }
                            ],
                            "kind": "let"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 208,
                            "end": 209,
                            "name": "x"
                          },
                          "body": {
                            "type": "BlockStatement",
                            "start": 211,
                            "end": 253,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 231,
                                "end": 235,
                                "expression": {
                                  "type": "UpdateExpression",
                                  "start": 231,
                                  "end": 234,
                                  "operator": "++",
                                  "prefix": true,
                                  "argument": {
                                    "type": "Identifier",
                                    "start": 233,
                                    "end": 234,
                                    "name": "k"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 284,
                    "end": 342,
                    "expression": {
                      "type": "CallExpression",
                      "start": 284,
                      "end": 342,
                      "callee": {
                        "type": "Identifier",
                        "start": 284,
                        "end": 286,
                        "name": "fn"
                      },
                      "arguments": [
                        {
                          "type": "ObjectExpression",
                          "start": 287,
                          "end": 341,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 288,
                              "end": 295,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 288,
                                "end": 289,
                                "name": "a"
                              },
                              "value": {
                                "type": "ArrayExpression",
                                "start": 292,
                                "end": 295,
                                "elements": [
                                  {
                                    "type": "Literal",
                                    "start": 293,
                                    "end": 294,
                                    "value": 0,
                                    "raw": "0"
                                  }
                                ]
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 297,
                              "end": 302,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 297,
                                "end": 298,
                                "name": "b"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 301,
                                "end": 302,
                                "value": 1,
                                "raw": "1"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 304,
                              "end": 315,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 304,
                                "end": 305,
                                "name": "c"
                              },
                              "value": {
                                "type": "ObjectExpression",
                                "start": 308,
                                "end": 315,
                                "properties": [
                                  {
                                    "type": "Property",
                                    "start": 309,
                                    "end": 314,
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "key": {
                                      "type": "Identifier",
                                      "start": 309,
                                      "end": 310,
                                      "name": "v"
                                    },
                                    "value": {
                                      "type": "Literal",
                                      "start": 313,
                                      "end": 314,
                                      "value": 1,
                                      "raw": "1"
                                    },
                                    "kind": "init"
                                  }
                                ]
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 317,
                              "end": 327,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 321,
                                "end": 322,
                                "name": "d"
                              },
                              "kind": "get",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 322,
                                "end": 327,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 325,
                                  "end": 327,
                                  "body": []
                                }
                              }
                            },
                            {
                              "type": "Property",
                              "start": 329,
                              "end": 340,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 333,
                                "end": 334,
                                "name": "e"
                              },
                              "kind": "set",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 334,
                                "end": 340,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 335,
                                    "end": 336,
                                    "name": "x"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 338,
                                  "end": 340,
                                  "body": []
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should redeclare var with function declaration', () => {
            expect(parseScript('var f; function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
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
                          "name": "f"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  {
                    "type": "FunctionDeclaration",
                    "start": 7,
                    "end": 22,
                    "id": {
                      "type": "Identifier",
                      "start": 16,
                      "end": 17,
                      "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 20,
                      "end": 22,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should allow to redeclare var with function declaration', () => {
            expect(parseScript('var x = 1; class x {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 9,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "x"
                        },
                        "init": {
                          "type": "Literal",
                          "start": 8,
                          "end": 9,
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  },
                  {
                    "type": "ClassDeclaration",
                    "start": 11,
                    "end": 21,
                    "id": {
                      "type": "Identifier",
                      "start": 17,
                      "end": 18,
                      "name": "x"
                    },
                    "superClass": null,
                    "body": {
                      "type": "ClassBody",
                      "start": 19,
                      "end": 21,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should allow to redeclare var with function declaration', () => {
            expect(parseScript('var f; function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                        "type": "VariableDeclaration",
                        "start": 0,
                        "end": 6,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 4,
                            "end": 5,
                            "id": {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "f"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 22,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 22,
                            "body": []
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should allow to redeclare function declaration with var', () => {
            expect(parseScript('function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 15,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 15,
                    "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 15,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should allow to redeclare function declaration with var', () => {
            expect(parseScript('function f() {} var f;', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 15,
                        "id": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 13,
                            "end": 15,
                            "body": []
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "start": 16,
                        "end": 22,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 20,
                            "end": 21,
                            "id": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 21,
                                "name": "f"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    }
                ],
                "sourceType": "script"
            });
        });
    });