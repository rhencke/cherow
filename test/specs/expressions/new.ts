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
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 40,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 40
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 40,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 40
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
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
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 40
                          }
                      },
                      "body": [{
                          "type": "ReturnStatement",
                          "start": 15,
                          "end": 38,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 38
                              }
                          },
                          "argument": {
                              "type": "ArrowFunctionExpression",
                              "start": 22,
                              "end": 38,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 22
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 38
                                  }
                              },
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "MetaProperty",
                                  "start": 28,
                                  "end": 38,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 28
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 38
                                      }
                                  },
                                  "meta": {
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
                                      "name": "new"
                                  },
                                  "property": {
                                      "type": "Identifier",
                                      "start": 32,
                                      "end": 38,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 32
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 38
                                          }
                                      },
                                      "name": "target"
                                  }
                              }
                          }
                      }]
                  }
              }],
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
              "body": [{
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
                  "params": [{
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
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 26,
                      "end": 28,
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function a() { var b = arguments.length !== 0 ? arguments[0] : new.target }"', () => {
          expect(parseScript(`function a() {
              var b = arguments.length !== 0 ? arguments[0] : new.target
          }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 99,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 11
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 99,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 99,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 3,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 29,
                      "end": 87,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 72
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 33,
                          "end": 87,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 18
                            },
                            "end": {
                              "line": 2,
                              "column": 72
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 34,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 18
                              },
                              "end": {
                                "line": 2,
                                "column": 19
                              }
                            },
                            "name": "b"
                          },
                          "init": {
                            "type": "ConditionalExpression",
                            "start": 37,
                            "end": 87,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 22
                              },
                              "end": {
                                "line": 2,
                                "column": 72
                              }
                            },
                            "test": {
                              "type": "BinaryExpression",
                              "start": 37,
                              "end": 59,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 22
                                },
                                "end": {
                                  "line": 2,
                                  "column": 44
                                }
                              },
                              "left": {
                                "type": "MemberExpression",
                                "start": 37,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 22
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 38
                                  }
                                },
                                "object": {
                                  "type": "Identifier",
                                  "start": 37,
                                  "end": 46,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 31
                                    }
                                  },
                                  "name": "arguments"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 47,
                                  "end": 53,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 32
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 38
                                    }
                                  },
                                  "name": "length"
                                },
                                "computed": false
                              },
                              "operator": "!==",
                              "right": {
                                "type": "Literal",
                                "start": 58,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 44
                                  }
                                },
                                "value": 0,
                                "raw": "0"
                              }
                            },
                            "consequent": {
                              "type": "MemberExpression",
                              "start": 62,
                              "end": 74,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 47
                                },
                                "end": {
                                  "line": 2,
                                  "column": 59
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 62,
                                "end": 71,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 47
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 56
                                  }
                                },
                                "name": "arguments"
                              },
                              "property": {
                                "type": "Literal",
                                "start": 72,
                                "end": 73,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 57
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 58
                                  }
                                },
                                "value": 0,
                                "raw": "0"
                              },
                              "computed": true
                            },
                            "alternate": {
                              "type": "MetaProperty",
                              "start": 77,
                              "end": 87,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 62
                                },
                                "end": {
                                  "line": 2,
                                  "column": 72
                                }
                              },
                              "meta": {
                                "type": "Identifier",
                                "start": 77,
                                "end": 80,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 62
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 65
                                  }
                                },
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 81,
                                "end": 87,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 66
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 72
                                  }
                                },
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
              "body": [{
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
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new Button()"', () => {
          expect(parseScript('new Button()', {
              ranges: true
          })).to.eql({
              "body": [{
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
              }],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "new new foo"', () => {
          expect(parseScript('new new foo', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 11,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 11
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 11,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 11
                      }
                  },
                  "expression": {
                      "type": "NewExpression",
                      "start": 0,
                      "end": 11,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 11
                          }
                      },
                      "callee": {
                          "type": "NewExpression",
                          "start": 4,
                          "end": 11,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 11
                              }
                          },
                          "callee": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 11,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 11
                                  }
                              },
                              "name": "foo"
                          },
                          "arguments": []
                      },
                      "arguments": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new new foo()"', () => {
          expect(parseScript('new new foo()', {
              ranges: true
          })).to.eql({
              "body": [{
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
              }, ],
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
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "arguments": [{
                          "type": "SpreadElement",
                          "argument": {
                              "type": "Identifier",
                              "name": "a"
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new f(...a = b)"', () => {
          expect(parseScript('new f(...a = b)', {
              ranges: false
          })).to.eql({
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
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse "new f(...a, b, ...c)"', () => {
          expect(parseScript('new f(...a, b, ...c)', {
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
              "body": [{
                  "type": "ExpressionStatement",
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
                  "expression": {
                      "type": "NewExpression",
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
                      "callee": {
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
                          "name": "f"
                      },
                      "arguments": [{
                              "type": "SpreadElement",
                              "start": 6,
                              "end": 10,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 6
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 10
                                  }
                              },
                              "argument": {
                                  "type": "Identifier",
                                  "start": 9,
                                  "end": 10,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 9
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 10
                                      }
                                  },
                                  "name": "a"
                              }
                          },
                          {
                              "type": "Identifier",
                              "start": 12,
                              "end": 13,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 12
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 13
                                  }
                              },
                              "name": "b"
                          },
                          {
                              "type": "SpreadElement",
                              "start": 15,
                              "end": 19,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 19
                                  }
                              },
                              "argument": {
                                  "type": "Identifier",
                                  "start": 18,
                                  "end": 19,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 19
                                      }
                                  },
                                  "name": "c"
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new f(a, ...b, c)"', () => {
          expect(parseScript('new f(a, ...b, c)', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 17,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 17
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 17,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 17
                      }
                  },
                  "expression": {
                      "type": "NewExpression",
                      "start": 0,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      },
                      "callee": {
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
                          "name": "f"
                      },
                      "arguments": [{
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
                          },
                          {
                              "type": "SpreadElement",
                              "start": 9,
                              "end": 13,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 13
                                  }
                              },
                              "argument": {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 13,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 13
                                      }
                                  },
                                  "name": "b"
                              }
                          },
                          {
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
                              "name": "c"
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new f(...a, ...b)"', () => {
          expect(parseScript('new f(...a, ...b)', {
              ranges: false
          })).to.eql({
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
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new a(b,c)"', () => {
          expect(parseScript('new a(b,c)', {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "arguments": [{
                              "type": "Identifier",
                              "name": "b"
                          },
                          {
                              "type": "Identifier",
                              "name": "c"
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "new(a in b)"', () => {
          expect(parseScript('new(a in b)', {
              ranges: true
          })).to.eql({
              "body": [{
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
              }],
              "end": 11,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
  
  });