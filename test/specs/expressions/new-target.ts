import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - New target', () => {
    
        it("should fail on \"function f() { new.anythingElse; }\"", () => {
            expect(() => {
                parseScript("function f() { new.anythingElse; }");
            }).to.throw();
        });
    
        it("should fail on \"function f() { new..target; }\"", () => {
            expect(() => {
                parseScript("function f() { new..target; }");
            }).to.throw();
        });
    
        it("should fail on \"function f() { new..target; }\"", () => {
            expect(() => {
                parseScript("function f() { new..target; }");
            }).to.throw();
        });
    
        it("should fail on \"new Type[]\"", () => {
            expect(() => {
                parseScript("new Type[]");
            }).to.throw();
        });
    
        it("should fail on \"function f() { new..target; }\"", () => {
            expect(() => {
                parseScript("function f() {  n\u0065w.target; }");
            }).to.not.throw();
        });
    
        it('should fail on invalid dots', () => {
            expect(() => {
                parseScript('var x = function() { y = new..target; }');
            }).to.throw();
        });
    
        it('should fail if "new.target" is used in the head of an arrow function', () => {
            expect(() => {
                parseScript('(new.target) => abc');
            }).to.throw();
        });
    
        it('should fail if "new target" are used in an arrow function body', () => {
            expect(() => {
                parseScript('() => new.target');
            }).to.throw();
        });
    
        it('should fail "new.prop"', () => {
            expect(() => {
                parseScript('new.prop');
            }).to.throw();
        });
    
        it('should fail "new.prop"', () => {
            expect(() => {
                parseScript('new.prop');
            }).to.throw();
        });
    
        it('should fail if "new.target" are used outside of an functions body', () => {
            expect(() => {
                parseScript('new.target');
            }).to.throw();
        });
    
        it('should fail if "new.target" are used outside of an functions body', () => {
            expect(() => {
                parseScript('new.target');
            }).to.throw();
        });
    
        it('should fail on invalid dots', () => {
            expect(() => {
                parseScript('var x = function() { y = new..target; }');
            }).to.throw();
        });
        
        it('should fail on invalid new target', () => {
            expect(() => {
                parseScript('var x = new.target;');
            }).to.throw();
        });
    
        it('should fail on unknown property', () => {
            expect(() => {
                parseScript('var f = function() { new.unknown_property; }');
            }).to.throw();
        });
    
        it('should assign new target', () => {
            expect(parseScript('function f() { let x = new.target; }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 36,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 36,
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
                      "end": 36,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 15,
                          "end": 34,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 19,
                              "end": 33,
                              "id": {
                                "type": "Identifier",
                                "start": 19,
                                "end": 20,
                                "name": "x"
                              },
                              "init": {
                                "type": "MetaProperty",
                                "start": 23,
                                "end": 33,
                                "meta": {
                                  "type": "Identifier",
                                  "start": 23,
                                  "end": 26,
                                  "name": "new"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 27,
                                  "end": 33,
                                  "name": "target"
                                }
                              }
                            }
                          ],
                          "kind": "let"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse new new target', () => {
            expect(parseScript('function f() {  new new.target; }', {
                raw: true,
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
                      "end": 33,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 16,
                          "end": 31,
                          "expression": {
                            "type": "NewExpression",
                            "start": 16,
                            "end": 30,
                            "callee": {
                              "type": "MetaProperty",
                              "start": 20,
                              "end": 30,
                              "meta": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 23,
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 24,
                                "end": 30,
                                "name": "target"
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
    
        it('should parse new target declaration', () => {
            expect(parseScript('function f() { new.target; }', {
                ranges: true,
                raw: true,
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
                    "name": "f"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 15,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "expression": {
                          "type": "MetaProperty",
                          "start": 15,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "meta": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 18
                              }
                            },
                            "name": "new"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 19,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 19
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "target"
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
    
        it('should parse new target expression', () => {
            expect(parseScript('var f = function() { new.target; }')).to.eql({
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
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "MetaProperty",
                                        "meta": {
                                            "type": "Identifier",
                                            "name": "new"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "target"
                                        }
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse new target invoke', () => {
            expect(parseScript('function f() { new.target(); }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 30,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 30,
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
                      "end": 30,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 28,
                          "expression": {
                            "type": "CallExpression",
                            "start": 15,
                            "end": 27,
                            "callee": {
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
    
        it('should parse new target precedence', () => {
            expect(parseScript('function f() { new new.target()(); }', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 36,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 36,
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
                      "end": 36,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 34,
                          "expression": {
                            "type": "CallExpression",
                            "start": 15,
                            "end": 33,
                            "callee": {
                              "type": "NewExpression",
                              "start": 15,
                              "end": 31,
                              "callee": {
                                "type": "MetaProperty",
                                "start": 19,
                                "end": 29,
                                "meta": {
                                  "type": "Identifier",
                                  "start": 19,
                                  "end": 22,
                                  "name": "new"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 23,
                                  "end": 29,
                                  "name": "target"
                                }
                              },
                              "arguments": []
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

        it("should parse \"function f() { new.target(); }\"", () => {
            expect(parseScript('function f() { new.target(); }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 30,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 30,
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
                      "end": 30,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 28,
                          "expression": {
                            "type": "CallExpression",
                            "start": 15,
                            "end": 27,
                            "callee": {
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
    
        it("should parse \"function f() { new[\"target\"]; }\"", () => {
            expect(parseScript('function f() { new["target"]; }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 31,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 31,
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
                      "end": 31,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 29,
                          "expression": {
                            "type": "NewExpression",
                            "start": 15,
                            "end": 28,
                            "callee": {
                              "type": "ArrayExpression",
                              "start": 18,
                              "end": 28,
                              "elements": [
                                {
                                  "type": "Literal",
                                  "start": 19,
                                  "end": 27,
                                  "value": "target",
                                  "raw": "\"target\""
                                }
                              ]
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

        it('should parse function expression with new.target in param list', () => {
          expect(parseScript('(function f(a = new.target){})', {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
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
                    "name": "f"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "AssignmentPattern",
                      "start": 12,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "left": {
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
                        "name": "a"
                      },
                      "right": {
                        "type": "MetaProperty",
                        "start": 16,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "meta": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "name": "new"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 20,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 26
                            }
                          },
                          "name": "target"
                        }
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 27,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
        });

        it('should parse new.target in method param list', () => {
          expect(parseScript('({ set m(a = new.target){} })', {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "m"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 8,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 9,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "left": {
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
                            "right": {
                              "type": "MetaProperty",
                              "start": 13,
                              "end": 23,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 23
                                }
                              },
                              "meta": {
                                "type": "Identifier",
                                "start": 13,
                                "end": 16,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 16
                                  }
                                },
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 17,
                                "end": 23,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 23
                                  }
                                },
                                "name": "target"
                              }
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 26
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
          });
        });

        it('should parse "({ m(a = new.target){} })"', () => {
          expect(parseScript('({ m(a = new.target){} })', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 25
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 4,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 3
                          },
                          "end": {
                            "line": 1,
                            "column": 4
                          }
                        },
                        "name": "m"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 19,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 19
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 5
                                },
                                "end": {
                                  "line": 1,
                                  "column": 6
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "MetaProperty",
                              "start": 9,
                              "end": 19,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 9
                                },
                                "end": {
                                  "line": 1,
                                  "column": 19
                                }
                              },
                              "meta": {
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
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 13,
                                "end": 19,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 19
                                  }
                                },
                                "name": "target"
                              }
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 20,
                          "end": 22,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 22
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
          });
        });

        it('should parse "({ get m(){ new.target } })"', () => {
          expect(parseScript('({ get m(){ new.target } })', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "m"
                      },
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 8,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 10,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 12,
                              "end": 22,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 12
                                },
                                "end": {
                                  "line": 1,
                                  "column": 22
                                }
                              },
                              "expression": {
                                "type": "MetaProperty",
                                "start": 12,
                                "end": 22,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 22
                                  }
                                },
                                "meta": {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 15,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 15
                                    }
                                  },
                                  "name": "new"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 16,
                                  "end": 22,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 22
                                    }
                                  },
                                  "name": "target"
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
            "sourceType": "script"
          });
        });
    });