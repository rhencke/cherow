import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Continue', () => {

    it('should fail on "if (true) let x;"', () => {
        expect(() => {
            parseScript(`if (true) let x;`);
        }).to.throw();
    });

    it('should fail if appearing of continue without an iteration statement', () => {
        expect(() => {
            parseScript(`var x=1;
            continue;
            var y=2;`);
        }).to.throw();
    });

    it('should parse labeled continue', () => {
        expect(parseScript(`label: for (let x = 0; x < 10;) {
            while (true) {
              x++;
              count++;
              continue label;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 158,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 158,
                "body": {
                  "type": "ForStatement",
                  "start": 7,
                  "end": 158,
                  "init": {
                    "type": "VariableDeclaration",
                    "start": 12,
                    "end": 21,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 16,
                        "end": 21,
                        "id": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "x"
                        },
                        "init": {
                          "type": "Literal",
                          "start": 20,
                          "end": 21,
                          "value": 0,
                          "raw": "0"
                        }
                      }
                    ],
                    "kind": "let"
                  },
                  "test": {
                    "type": "BinaryExpression",
                    "start": 23,
                    "end": 29,
                    "left": {
                      "type": "Identifier",
                      "start": 23,
                      "end": 24,
                      "name": "x"
                    },
                    "operator": "<",
                    "right": {
                      "type": "Literal",
                      "start": 27,
                      "end": 29,
                      "value": 10,
                      "raw": "10"
                    }
                  },
                  "update": null,
                  "body": {
                    "type": "BlockStatement",
                    "start": 32,
                    "end": 158,
                    "body": [
                      {
                        "type": "WhileStatement",
                        "start": 46,
                        "end": 146,
                        "test": {
                          "type": "Literal",
                          "start": 53,
                          "end": 57,
                          "value": true,
                          "raw": "true"
                        },
                        "body": {
                          "type": "BlockStatement",
                          "start": 59,
                          "end": 146,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 75,
                              "end": 79,
                              "expression": {
                                "type": "UpdateExpression",
                                "start": 75,
                                "end": 78,
                                "operator": "++",
                                "prefix": false,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 75,
                                  "end": 76,
                                  "name": "x"
                                }
                              }
                            },
                            {
                              "type": "ExpressionStatement",
                              "start": 94,
                              "end": 102,
                              "expression": {
                                "type": "UpdateExpression",
                                "start": 94,
                                "end": 101,
                                "operator": "++",
                                "prefix": false,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 94,
                                  "end": 99,
                                  "name": "count"
                                }
                              }
                            },
                            {
                              "type": "ContinueStatement",
                              "start": 117,
                              "end": 132,
                              "label": {
                                "type": "Identifier",
                                "start": 126,
                                "end": 131,
                                "name": "label"
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 5,
                  "name": "label"
                }
              }
            ],
            "sourceType": "script"
          });
    });
   
    it('should parse nested let bound for loops inner contunue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            for (let y = 0; y < 2;) {
              y++;
              count++;
              continue;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 173,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 173,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 14,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 14,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 16,
                  "end": 22,
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 20,
                    "end": 22,
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 173,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 39,
                      "end": 43,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 39,
                        "end": 42,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 40,
                          "name": "x"
                        }
                      }
                    },
                    {
                      "type": "ForStatement",
                      "start": 56,
                      "end": 161,
                      "init": {
                        "type": "VariableDeclaration",
                        "start": 61,
                        "end": 70,
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 65,
                            "end": 70,
                            "id": {
                              "type": "Identifier",
                              "start": 65,
                              "end": 66,
                              "name": "y"
                            },
                            "init": {
                              "type": "Literal",
                              "start": 69,
                              "end": 70,
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        ],
                        "kind": "let"
                      },
                      "test": {
                        "type": "BinaryExpression",
                        "start": 72,
                        "end": 77,
                        "left": {
                          "type": "Identifier",
                          "start": 72,
                          "end": 73,
                          "name": "y"
                        },
                        "operator": "<",
                        "right": {
                          "type": "Literal",
                          "start": 76,
                          "end": 77,
                          "value": 2,
                          "raw": "2"
                        }
                      },
                      "update": null,
                      "body": {
                        "type": "BlockStatement",
                        "start": 80,
                        "end": 161,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 96,
                            "end": 100,
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 96,
                              "end": 99,
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 96,
                                "end": 97,
                                "name": "y"
                              }
                            }
                          },
                          {
                            "type": "ExpressionStatement",
                            "start": 115,
                            "end": 123,
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 115,
                              "end": 122,
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 115,
                                "end": 120,
                                "name": "count"
                              }
                            }
                          },
                          {
                            "type": "ContinueStatement",
                            "start": 138,
                            "end": 147,
                            "label": null
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

    it('should parse nested let bound for loops outer continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            for (let y = 0; y < 2;) {
              y++;
              count++;
            }
            continue;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 171,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 171,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 14,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 14,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 16,
                  "end": 22,
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 20,
                    "end": 22,
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 171,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 39,
                      "end": 43,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 39,
                        "end": 42,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 40,
                          "name": "x"
                        }
                      }
                    },
                    {
                      "type": "ForStatement",
                      "start": 56,
                      "end": 137,
                      "init": {
                        "type": "VariableDeclaration",
                        "start": 61,
                        "end": 70,
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 65,
                            "end": 70,
                            "id": {
                              "type": "Identifier",
                              "start": 65,
                              "end": 66,
                              "name": "y"
                            },
                            "init": {
                              "type": "Literal",
                              "start": 69,
                              "end": 70,
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        ],
                        "kind": "let"
                      },
                      "test": {
                        "type": "BinaryExpression",
                        "start": 72,
                        "end": 77,
                        "left": {
                          "type": "Identifier",
                          "start": 72,
                          "end": 73,
                          "name": "y"
                        },
                        "operator": "<",
                        "right": {
                          "type": "Literal",
                          "start": 76,
                          "end": 77,
                          "value": 2,
                          "raw": "2"
                        }
                      },
                      "update": null,
                      "body": {
                        "type": "BlockStatement",
                        "start": 80,
                        "end": 137,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 96,
                            "end": 100,
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 96,
                              "end": 99,
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 96,
                                "end": 97,
                                "name": "y"
                              }
                            }
                          },
                          {
                            "type": "ExpressionStatement",
                            "start": 115,
                            "end": 123,
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 115,
                              "end": 122,
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 115,
                                "end": 120,
                                "name": "count"
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      "type": "ContinueStatement",
                      "start": 150,
                      "end": 159,
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse no label continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            count++;
            continue;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 98,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 98,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 14,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 14,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 16,
                  "end": 22,
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 20,
                    "end": 22,
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 98,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 39,
                      "end": 43,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 39,
                        "end": 42,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 40,
                          "name": "x"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 56,
                      "end": 64,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 56,
                        "end": 63,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 56,
                          "end": 61,
                          "name": "count"
                        }
                      }
                    },
                    {
                      "type": "ContinueStatement",
                      "start": 77,
                      "end": 86,
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should shadowing loop variable in same scope as continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            count++;
            {
              let x = "hello";
              continue;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 159,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 159,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 14,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 14,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 16,
                  "end": 22,
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 20,
                    "end": 22,
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 159,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 39,
                      "end": 43,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 39,
                        "end": 42,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 40,
                          "name": "x"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 56,
                      "end": 64,
                      "expression": {
                        "type": "UpdateExpression",
                        "start": 56,
                        "end": 63,
                        "operator": "++",
                        "prefix": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 56,
                          "end": 61,
                          "name": "count"
                        }
                      }
                    },
                    {
                      "type": "BlockStatement",
                      "start": 77,
                      "end": 147,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 93,
                          "end": 109,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 97,
                              "end": 108,
                              "id": {
                                "type": "Identifier",
                                "start": 97,
                                "end": 98,
                                "name": "x"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 101,
                                "end": 108,
                                "value": "hello",
                                "raw": "\"hello\""
                              }
                            }
                          ],
                          "kind": "let"
                        },
                        {
                          "type": "ContinueStatement",
                          "start": 124,
                          "end": 133,
                          "label": null
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

    it('should parse while (true) { continue; }', () => {
        expect(parseScript('while (true) { continue; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "WhileStatement",
                "start": 0,
                "end": 26,
                "test": {
                  "type": "Literal",
                  "start": 7,
                  "end": 11,
                  "value": true,
                  "raw": "true"
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 26,
                  "body": [
                    {
                      "type": "ContinueStatement",
                      "start": 15,
                      "end": 24,
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse done: while (true) { continue done }', () => {
        expect(parseScript('done: while (true) { continue done }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 36,
                "body": {
                  "type": "WhileStatement",
                  "start": 6,
                  "end": 36,
                  "test": {
                    "type": "Literal",
                    "start": 13,
                    "end": 17,
                    "value": true,
                    "raw": "true"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 19,
                    "end": 36,
                    "body": [
                      {
                        "type": "ContinueStatement",
                        "start": 21,
                        "end": 34,
                        "label": {
                          "type": "Identifier",
                          "start": 30,
                          "end": 34,
                          "name": "done"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 4,
                  "name": "done"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse __proto__: while (true) { continue __proto__; }', () => {
        expect(parseScript('__proto__: while (true) { continue __proto__; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 47,
                "body": {
                  "type": "WhileStatement",
                  "start": 11,
                  "end": 47,
                  "test": {
                    "type": "Literal",
                    "start": 18,
                    "end": 22,
                    "value": true,
                    "raw": "true"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 24,
                    "end": 47,
                    "body": [
                      {
                        "type": "ContinueStatement",
                        "start": 26,
                        "end": 45,
                        "label": {
                          "type": "Identifier",
                          "start": 35,
                          "end": 44,
                          "name": "__proto__"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 9,
                  "name": "__proto__"
                }
              }
            ],
            "sourceType": "script"
          });
    });
});