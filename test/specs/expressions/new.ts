import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect; 

describe('Espressions - New', () => {

  it("should fail on use of new.target inside arrow function in global code", () => {
    expect(() => {
        parseScript("(new.target) => {}");
    }).to.throw();
});

    it("should fail if `new` keyword contain unicode escape sequences", () => {
        expect(() => {
            parseScript("function f() {  n\\u0065w.target; }");
        }).to.throw();
    });

    it("should fail if `new` keyword contain unicode escape sequences", () => {
        expect(() => {
            parseScript("function f() { new.t\\u0061rget; }");
        }).to.throw();
    });

    it('should parse "function a() { return () => new.target }"', () => {
        expect(parseScript('function a() { return () => new.target }', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 40,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 40,
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
                  "end": 40,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 15,
                      "end": 38,
                      "argument": {
                        "type": "ArrowFunctionExpression",
                        "start": 22,
                        "end": 38,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "MetaProperty",
                          "start": 28,
                          "end": 38,
                          "meta": {
                            "type": "Identifier",
                            "start": 28,
                            "end": 31,
                            "name": "new"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 38,
                            "name": "target"
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
    it('should parse "function a(b = new.target){}"', () => {
        expect(parseScript(`function a(b = new.target){}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 11,
                    "end": 25,
                    "left": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    },
                    "right": {
                      "type": "MetaProperty",
                      "start": 15,
                      "end": 25,
                      "meta": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 18,
                        "name": "new"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 25,
                        "name": "target"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 26,
                  "end": 28,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });
            
    it('should parse "function a() { var b = arguments.length !== 0 ? arguments[0] : new.target }"', () => {
        expect(parseScript(`function a() {
            var b = arguments.length !== 0 ? arguments[0] : new.target
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 95,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 95,
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
                  "end": 95,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 27,
                      "end": 85,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 31,
                          "end": 85,
                          "id": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 32,
                            "name": "b"
                          },
                          "init": {
                            "type": "ConditionalExpression",
                            "start": 35,
                            "end": 85,
                            "test": {
                              "type": "BinaryExpression",
                              "start": 35,
                              "end": 57,
                              "left": {
                                "type": "MemberExpression",
                                "start": 35,
                                "end": 51,
                                "object": {
                                  "type": "Identifier",
                                  "start": 35,
                                  "end": 44,
                                  "name": "arguments"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 45,
                                  "end": 51,
                                  "name": "length"
                                },
                                "computed": false
                              },
                              "operator": "!==",
                              "right": {
                                "type": "Literal",
                                "start": 56,
                                "end": 57,
                                "value": 0,
                                "raw": "0"
                              }
                            },
                            "consequent": {
                              "type": "MemberExpression",
                              "start": 60,
                              "end": 72,
                              "object": {
                                "type": "Identifier",
                                "start": 60,
                                "end": 69,
                                "name": "arguments"
                              },
                              "property": {
                                "type": "Literal",
                                "start": 70,
                                "end": 71,
                                "value": 0,
                                "raw": "0"
                              },
                              "computed": true
                            },
                            "alternate": {
                              "type": "MetaProperty",
                              "start": 75,
                              "end": 85,
                              "meta": {
                                "type": "Identifier",
                                "start": 75,
                                "end": 78,
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 79,
                                "end": 85,
                                "name": "target"
                              }
                            }
                          }
                        }
                      ],
                      "kind": "var"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
  
    it('should parse "new a()() === a"', () => {
        expect(parseScript('new a()() === a', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 15,
                  "left": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 9,
                    "callee": {
                      "type": "NewExpression",
                      "start": 0,
                      "end": 7,
                      "callee": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "a"
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "operator": "===",
                  "right": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 15,
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
            
   it('should parse "new Button()"', () => {
        expect(parseScript('new Button()', {
            ranges: true
        })).to.eql({
              "body": [
               {
                  "end": 12,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 10,
                      "name": "Button",
                      "start": 4,
                      "type": "Identifier"
                    },
                    "end": 12,
                   "start": 0,
                    "type": "NewExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "new new foo()"', () => {
        expect(parseScript('new new foo()', {
            ranges: true
        })).to.eql({
              "body": [
                {
                 "end": 13,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "arguments": [],
                     "callee": {
                        "end": 11,
                        "name": "foo",
                        "start": 8,
                        "type": "Identifier"
                      },
                      "end": 13,
                      "start": 4,
                      "type": "NewExpression"
                    },
                    "end": 13,
                    "start": 0,
                    "type": "NewExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 13,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "new f(...a)"', () => {
        expect(parseScript('new f(...a)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "new f(...a = b)"', () => {
        expect(parseScript('new f(...a = b)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
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

    it('should parse "new f(...a, ...b)"', () => {
        expect(parseScript('new f(...a, ...b)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            },
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "new a(b,c)"', () => {
        expect(parseScript('new a(b,c)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "arguments": [
                            {
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
            ],
            "sourceType": "script"
        });
    });

    it('should parse "new(a in b)"', () => {
        expect(parseScript('new(a in b)', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 11,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 10,
                      "left": {
                        "end": 5,
                        "name": "a",
                       "start": 4,
                        "type": "Identifier"
                      },
                      "operator": "in",
                     "right": {
                        "end": 10,
                        "name": "b",
                        "start": 9,
                        "type": "Identifier"
                      },
                      "start": 4,
                      "type": "BinaryExpression"
                    },
                    "end": 11,
                    "start": 0,
                    "type": "NewExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 11,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    
});