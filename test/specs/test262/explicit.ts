import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('TC262 - explicit', () => {
    

    it('should parse complex', () => {
        expect(parseScript(`(((((a.b)("c")).d)("e", function (f) {
            return f;
          })).g)("h", function (i) {
            return i;
          });`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 133,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 133,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 132,
                  "callee": {
                    "type": "MemberExpression",
                    "start": 1,
                    "end": 76,
                    "object": {
                      "type": "CallExpression",
                      "start": 2,
                      "end": 73,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 3,
                        "end": 17,
                        "object": {
                          "type": "CallExpression",
                          "start": 4,
                          "end": 14,
                          "callee": {
                            "type": "MemberExpression",
                            "start": 5,
                            "end": 8,
                            "object": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "name": "a"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "b"
                            },
                            "computed": false
                          },
                          "arguments": [
                            {
                              "type": "Literal",
                              "start": 10,
                              "end": 13,
                              "value": "c",
                              "raw": "\"c\""
                            }
                          ]
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "d"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 19,
                          "end": 22,
                          "value": "e",
                          "raw": "\"e\""
                        },
                        {
                          "type": "FunctionExpression",
                          "start": 24,
                          "end": 72,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 34,
                              "end": 35,
                              "name": "f"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 37,
                            "end": 72,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 51,
                                "end": 60,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 58,
                                  "end": 59,
                                  "name": "f"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 75,
                      "end": 76,
                      "name": "g"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 78,
                      "end": 81,
                      "value": "h",
                      "raw": "\"h\""
                    },
                    {
                      "type": "FunctionExpression",
                      "start": 83,
                      "end": 131,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 93,
                          "end": 94,
                          "name": "i"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 96,
                        "end": 131,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 110,
                            "end": 119,
                            "argument": {
                              "type": "Identifier",
                              "start": 117,
                              "end": 118,
                              "name": "i"
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

    it('should parse "if (a) {}"', () => {
        expect(parseScript('if (a) {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 9,
                "test": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "a"
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 7,
                  "end": 9,
                  "body": []
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex #2"', () => {
        expect(parseScript(`(((((a.b)("c")).d)("e", function (f) {
            return f;
          })).g)("h", function (i) {
            return i;
          });`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 133,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 133,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 132,
                  "callee": {
                    "type": "MemberExpression",
                    "start": 1,
                    "end": 76,
                    "object": {
                      "type": "CallExpression",
                      "start": 2,
                      "end": 73,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 3,
                        "end": 17,
                        "object": {
                          "type": "CallExpression",
                          "start": 4,
                          "end": 14,
                          "callee": {
                            "type": "MemberExpression",
                            "start": 5,
                            "end": 8,
                            "object": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "name": "a"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "b"
                            },
                            "computed": false
                          },
                          "arguments": [
                            {
                              "type": "Literal",
                              "start": 10,
                              "end": 13,
                              "value": "c",
                              "raw": "\"c\""
                            }
                          ]
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "d"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 19,
                          "end": 22,
                          "value": "e",
                          "raw": "\"e\""
                        },
                        {
                          "type": "FunctionExpression",
                          "start": 24,
                          "end": 72,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 34,
                              "end": 35,
                              "name": "f"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 37,
                            "end": 72,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 51,
                                "end": 60,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 58,
                                  "end": 59,
                                  "name": "f"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 75,
                      "end": 76,
                      "name": "g"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 78,
                      "end": 81,
                      "value": "h",
                      "raw": "\"h\""
                    },
                    {
                      "type": "FunctionExpression",
                      "start": 83,
                      "end": 131,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 93,
                          "end": 94,
                          "name": "i"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 96,
                        "end": 131,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 110,
                            "end": 119,
                            "argument": {
                              "type": "Identifier",
                              "start": 117,
                              "end": 118,
                              "name": "i"
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

    it('should parse "a >>= (1);"', () => {
        expect(parseScript('a >>= (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 9,
                  "operator": ">>=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 7,
                    "end": 8,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 3"', () => {
        expect(parseScript(`(function* () {
            yield* a;
          });`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 51,
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 49,
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 49,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 28,
                        "end": 37,
                        "expression": {
                          "type": "YieldExpression",
                          "start": 28,
                          "end": 36,
                          "delegate": true,
                          "argument": {
                            "type": "Identifier",
                            "start": 35,
                            "end": 36,
                            "name": "a"
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

    it('should parse "({Infinity: 1});"', () => {
        expect(parseScript('({Infinity: 1});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 14,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 13,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 10,
                        "name": "Infinity"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 4', () => {
        expect(parseScript(`((function () {
            var a;
            eval("a");
            function b() {
              a = (a += (1));
            }
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 145,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 145,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 143,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 140,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 140,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 28,
                          "end": 34,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 32,
                              "end": 33,
                              "id": {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "a"
                              },
                              "init": null
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 47,
                          "end": 57,
                          "expression": {
                            "type": "CallExpression",
                            "start": 47,
                            "end": 56,
                            "callee": {
                              "type": "Identifier",
                              "start": 47,
                              "end": 51,
                              "name": "eval"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 52,
                                "end": 55,
                                "value": "a",
                                "raw": "\"a\""
                              }
                            ]
                          }
                        },
                        {
                          "type": "FunctionDeclaration",
                          "start": 70,
                          "end": 128,
                          "id": {
                            "type": "Identifier",
                            "start": 79,
                            "end": 80,
                            "name": "b"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 83,
                            "end": 128,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 99,
                                "end": 114,
                                "expression": {
                                  "type": "AssignmentExpression",
                                  "start": 99,
                                  "end": 113,
                                  "operator": "=",
                                  "left": {
                                    "type": "Identifier",
                                    "start": 99,
                                    "end": 100,
                                    "name": "a"
                                  },
                                  "right": {
                                    "type": "AssignmentExpression",
                                    "start": 104,
                                    "end": 112,
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "start": 104,
                                      "end": 105,
                                      "name": "a"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 110,
                                      "end": 111,
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 5"', () => {
        expect(parseScript(`new a("aa, [bb]", "return aa;");
        new a("aa, {bb}", "return aa;");
        new a("[[aa]], [{bb}]", "return aa;");`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 120,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "expression": {
                  "type": "NewExpression",
                  "start": 0,
                  "end": 31,
                  "callee": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 6,
                      "end": 16,
                      "value": "aa, [bb]",
                      "raw": "\"aa, [bb]\""
                    },
                    {
                      "type": "Literal",
                      "start": 18,
                      "end": 30,
                      "value": "return aa;",
                      "raw": "\"return aa;\""
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 41,
                "end": 73,
                "expression": {
                  "type": "NewExpression",
                  "start": 41,
                  "end": 72,
                  "callee": {
                    "type": "Identifier",
                    "start": 45,
                    "end": 46,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 47,
                      "end": 57,
                      "value": "aa, {bb}",
                      "raw": "\"aa, {bb}\""
                    },
                    {
                      "type": "Literal",
                      "start": 59,
                      "end": 71,
                      "value": "return aa;",
                      "raw": "\"return aa;\""
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 82,
                "end": 120,
                "expression": {
                  "type": "NewExpression",
                  "start": 82,
                  "end": 119,
                  "callee": {
                    "type": "Identifier",
                    "start": 86,
                    "end": 87,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 88,
                      "end": 104,
                      "value": "[[aa]], [{bb}]",
                      "raw": "\"[[aa]], [{bb}]\""
                    },
                    {
                      "type": "Literal",
                      "start": 106,
                      "end": 118,
                      "value": "return aa;",
                      "raw": "\"return aa;\""
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({get a() {}});"', () => {
        expect(parseScript('({get a() {}});', {
            ranges: true,
            raw: true
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
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 13,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 12,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                      },
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 7,
                        "end": 12,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 10,
                          "end": 12,
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

    it('should parse complex 6', () => {
        expect(parseScript(`((function () {
            for (var a; a < (1); ++a) ;
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 72,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 72,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 70,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 67,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 67,
                      "body": [
                        {
                          "type": "ForStatement",
                          "start": 28,
                          "end": 55,
                          "init": {
                            "type": "VariableDeclaration",
                            "start": 33,
                            "end": 38,
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "start": 37,
                                "end": 38,
                                "id": {
                                  "type": "Identifier",
                                  "start": 37,
                                  "end": 38,
                                  "name": "a"
                                },
                                "init": null
                              }
                            ],
                            "kind": "var"
                          },
                          "test": {
                            "type": "BinaryExpression",
                            "start": 40,
                            "end": 47,
                            "left": {
                              "type": "Identifier",
                              "start": 40,
                              "end": 41,
                              "name": "a"
                            },
                            "operator": "<",
                            "right": {
                              "type": "Literal",
                              "start": 45,
                              "end": 46,
                              "value": 1,
                              "raw": "1"
                            }
                          },
                          "update": {
                            "type": "UpdateExpression",
                            "start": 49,
                            "end": 52,
                            "operator": "++",
                            "prefix": true,
                            "argument": {
                              "type": "Identifier",
                              "start": 51,
                              "end": 52,
                              "name": "a"
                            }
                          },
                          "body": {
                            "type": "EmptyStatement",
                            "start": 54,
                            "end": 55
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[a, ...{0: b}] = (1);"', () => {
        expect(parseScript('[a, ...{0: b}] = (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 1,
                                    "end": 2
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "computed": false,
                                                "key": {
                                                    "type": "Literal",
                                                    "value": 0,
                                                    "start": 8,
                                                    "end": 9,
                                                    "raw": "0"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "b",
                                                    "start": 11,
                                                    "end": 12
                                                },
                                                "start": 8,
                                                "end": 12
                                            }
                                        ],
                                        "start": 7,
                                        "end": 13
                                    },
                                    "start": 4,
                                    "end": 13
                                }
                            ],
                            "start": 0,
                            "end": 14
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "start": 18,
                            "end": 19,
                            "raw": "1"
                        },
                        "start": 0,
                        "end": 20
                    },
                    "start": 0,
                    "end": 21
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 21
        });
    });

    it('should parse "function a([]) {}"', () => {
        expect(parseScript('function a([]) {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 17,
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
                    "type": "ArrayPattern",
                    "start": 11,
                    "end": 13,
                    "elements": []
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 17,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({__proto__, __proto__: 1});"', () => {
        expect(parseScript('({__proto__, __proto__: 1});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 28,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 26,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 11,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 11,
                        "name": "__proto__"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 11,
                        "name": "__proto__"
                      }
                    },
                    {
                      "type": "Property",
                      "start": 13,
                      "end": 25,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 22,
                        "name": "__proto__"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 24,
                        "end": 25,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[...a] = b;"', () => {
        expect(parseScript('[...a] = b;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 10,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 6,
                    "elements": [
                      {
                        "type": "RestElement",
                        "start": 1,
                        "end": 5,
                        "argument": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "a"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 7', () => {
        expect(parseScript(`((function () {
            var a;
            function b() {
              a = (a += (1));
            }
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 122,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 122,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 120,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 117,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 117,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 28,
                          "end": 34,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 32,
                              "end": 33,
                              "id": {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "a"
                              },
                              "init": null
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "FunctionDeclaration",
                          "start": 47,
                          "end": 105,
                          "id": {
                            "type": "Identifier",
                            "start": 56,
                            "end": 57,
                            "name": "b"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 60,
                            "end": 105,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 76,
                                "end": 91,
                                "expression": {
                                  "type": "AssignmentExpression",
                                  "start": 76,
                                  "end": 90,
                                  "operator": "=",
                                  "left": {
                                    "type": "Identifier",
                                    "start": 76,
                                    "end": 77,
                                    "name": "a"
                                  },
                                  "right": {
                                    "type": "AssignmentExpression",
                                    "start": 81,
                                    "end": 89,
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "start": 81,
                                      "end": 82,
                                      "name": "a"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 87,
                                      "end": 88,
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 8', () => {
        expect(parseScript(`var a, b, c, d;
        a = ((((b()), (c())), (d())) ? (1) : (2));`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 66,
          "body": [
            {
              "type": "VariableDeclaration",
              "start": 0,
              "end": 15,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 4,
                  "end": 5,
                  "id": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                  },
                  "init": null
                },
                {
                  "type": "VariableDeclarator",
                  "start": 7,
                  "end": 8,
                  "id": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 8,
                    "name": "b"
                  },
                  "init": null
                },
                {
                  "type": "VariableDeclarator",
                  "start": 10,
                  "end": 11,
                  "id": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "c"
                  },
                  "init": null
                },
                {
                  "type": "VariableDeclarator",
                  "start": 13,
                  "end": 14,
                  "id": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "name": "d"
                  },
                  "init": null
                }
              ],
              "kind": "var"
            },
            {
              "type": "ExpressionStatement",
              "start": 24,
              "end": 66,
              "expression": {
                "type": "AssignmentExpression",
                "start": 24,
                "end": 65,
                "operator": "=",
                "left": {
                  "type": "Identifier",
                  "start": 24,
                  "end": 25,
                  "name": "a"
                },
                "right": {
                  "type": "ConditionalExpression",
                  "start": 29,
                  "end": 64,
                  "test": {
                    "type": "SequenceExpression",
                    "start": 30,
                    "end": 51,
                    "expressions": [
                      {
                        "type": "SequenceExpression",
                        "start": 31,
                        "end": 43,
                        "expressions": [
                          {
                            "type": "CallExpression",
                            "start": 32,
                            "end": 35,
                            "callee": {
                              "type": "Identifier",
                              "start": 32,
                              "end": 33,
                              "name": "b"
                            },
                            "arguments": []
                          },
                          {
                            "type": "CallExpression",
                            "start": 39,
                            "end": 42,
                            "callee": {
                              "type": "Identifier",
                              "start": 39,
                              "end": 40,
                              "name": "c"
                            },
                            "arguments": []
                          }
                        ]
                      },
                      {
                        "type": "CallExpression",
                        "start": 47,
                        "end": 50,
                        "callee": {
                          "type": "Identifier",
                          "start": 47,
                          "end": 48,
                          "name": "d"
                        },
                        "arguments": []
                      }
                    ]
                  },
                  "consequent": {
                    "type": "Literal",
                    "start": 56,
                    "end": 57,
                    "value": 1,
                    "raw": "1"
                  },
                  "alternate": {
                    "type": "Literal",
                    "start": 62,
                    "end": 63,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse ""Hello\\012World";"', () => {
        expect(parseScript('"Hello\\012World";', {
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
                  "type": "Literal",
                  "start": 0,
                  "end": 16,
                  "value": "Hello\nWorld",
                  "raw": "\"Hello\\012World\""
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({*a() {}});"', () => {
        expect(parseScript('({*a() {}});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 10,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 9,
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 4,
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 9,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 7,
                          "end": 9,
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

    it('should parse "for (a[b in c] in d) ;"', () => {
        expect(parseScript('for (a[b in c] in d) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 22,
                "left": {
                  "type": "MemberExpression",
                  "start": 5,
                  "end": 14,
                  "object": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 6,
                    "name": "a"
                  },
                  "property": {
                    "type": "BinaryExpression",
                    "start": 7,
                    "end": 13,
                    "left": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "name": "b"
                    },
                    "operator": "in",
                    "right": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "c"
                    }
                  },
                  "computed": true
                },
                "right": {
                  "type": "Identifier",
                  "start": 18,
                  "end": 19,
                  "name": "d"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 21,
                  "end": 22
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 9', () => {
        expect(parseScript(`switch (a) {
            case b:
              {
                c;
              }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 95,
            "body": [
              {
                "type": "SwitchStatement",
                "start": 0,
                "end": 95,
                "discriminant": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "name": "a"
                },
                "cases": [
                  {
                    "type": "SwitchCase",
                    "start": 25,
                    "end": 83,
                    "consequent": [
                      {
                        "type": "BlockStatement",
                        "start": 47,
                        "end": 83,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 65,
                            "end": 67,
                            "expression": {
                              "type": "Identifier",
                              "start": 65,
                              "end": 66,
                              "name": "c"
                            }
                          }
                        ]
                      }
                    ],
                    "test": {
                      "type": "Identifier",
                      "start": 30,
                      "end": 31,
                      "name": "b"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({null: 1});"', () => {
        expect(parseScript('({null: 1});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 10,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 9,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 6,
                        "name": "null"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "0;"', () => {
        expect(parseScript('0;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 2,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 2,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 1,
                  "value": 0,
                  "raw": "0"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[, a, , ] = (1);"', () => {
        expect(parseScript('[, a, , ] = (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 15,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 9,
                    "elements": [
                      null,
                      {
                        "type": "Identifier",
                        "start": 3,
                        "end": 4,
                        "name": "a"
                      },
                      null
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 13,
                    "end": 14,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({__proto__: null, get __proto__() {}});"', () => {
        expect(parseScript('({__proto__: null, get __proto__() {}});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 40,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 40,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 38,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 17,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 11,
                        "name": "__proto__"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 13,
                        "end": 17,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 19,
                      "end": 37,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 32,
                        "name": "__proto__"
                      },
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 32,
                        "end": 37,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 35,
                          "end": 37,
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

    it('should parse complex 10', () => {
        expect(parseScript(`do {} while (false);
        a();`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 20,
                "body": {
                  "type": "BlockStatement",
                  "start": 3,
                  "end": 5,
                  "body": []
                },
                "test": {
                  "type": "Literal",
                  "start": 13,
                  "end": 18,
                  "value": false,
                  "raw": "false"
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 29,
                "end": 33,
                "expression": {
                  "type": "CallExpression",
                  "start": 29,
                  "end": 32,
                  "callee": {
                    "type": "Identifier",
                    "start": 29,
                    "end": 30,
                    "name": "a"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[...eval] = a;"', () => {
        expect(parseScript('[...eval] = a;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 13,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 9,
                    "elements": [
                      {
                        "type": "RestElement",
                        "start": 1,
                        "end": 8,
                        "argument": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 8,
                          "name": "eval"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[a.b] = (0);"', () => {
        expect(parseScript('[a.b] = (0);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 11,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 5,
                    "elements": [
                      {
                        "type": "MemberExpression",
                        "start": 1,
                        "end": 4,
                        "object": {
                          "type": "Identifier",
                          "start": 1,
                          "end": 2,
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 3,
                          "end": 4,
                          "name": "b"
                        },
                        "computed": false
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 9,
                    "end": 10,
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 11', () => {
        expect(parseScript(`function a() {
            b();
          }
          if ((a()) || (true)) {
            c();
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 105,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 43,
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
                  "end": 43,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 31,
                      "expression": {
                        "type": "CallExpression",
                        "start": 27,
                        "end": 30,
                        "callee": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "name": "b"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "IfStatement",
                "start": 54,
                "end": 105,
                "test": {
                  "type": "LogicalExpression",
                  "start": 58,
                  "end": 73,
                  "left": {
                    "type": "CallExpression",
                    "start": 59,
                    "end": 62,
                    "callee": {
                      "type": "Identifier",
                      "start": 59,
                      "end": 60,
                      "name": "a"
                    },
                    "arguments": []
                  },
                  "operator": "||",
                  "right": {
                    "type": "Literal",
                    "start": 68,
                    "end": 72,
                    "value": true,
                    "raw": "true"
                  }
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 75,
                  "end": 105,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 89,
                      "end": 93,
                      "expression": {
                        "type": "CallExpression",
                        "start": 89,
                        "end": 92,
                        "callee": {
                          "type": "Identifier",
                          "start": 89,
                          "end": 90,
                          "name": "c"
                        },
                        "arguments": []
                      }
                    }
                  ]
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a(() => {});"', () => {
        expect(parseScript('a(() => {});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 11,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 2,
                      "end": 10,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 8,
                        "end": 10,
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

    it('should parse "a % b;"', () => {
        expect(parseScript('a % b;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 5,
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "operator": "%",
                  "right": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

   
    it('should parse "if (1) /  foo/;"', () => {
        expect(parseScript('if (1) /  foo/;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 15,
                "test": {
                  "type": "Literal",
                  "start": 4,
                  "end": 5,
                  "value": 1,
                  "raw": "1"
                },
                "consequent": {
                  "type": "ExpressionStatement",
                  "start": 7,
                  "end": 15,
                  "expression": {
                    "type": "Literal",
                    "start": 7,
                    "end": 14,
                    "value": /  foo/,
                    "raw": "/  foo/",
                    "regex": {
                      "pattern": "  foo",
                      "flags": ""
                    }
                  }
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 12', () => {
        expect(parseScript(`for (var a in b) ((function () {
            c("d");
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 69,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 69,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 10,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "a"
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 15,
                  "name": "b"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 17,
                  "end": 69,
                  "expression": {
                    "type": "CallExpression",
                    "start": 18,
                    "end": 67,
                    "callee": {
                      "type": "FunctionExpression",
                      "start": 19,
                      "end": 64,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 31,
                        "end": 64,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 45,
                            "end": 52,
                            "expression": {
                              "type": "CallExpression",
                              "start": 45,
                              "end": 51,
                              "callee": {
                                "type": "Identifier",
                                "start": 45,
                                "end": 46,
                                "name": "c"
                              },
                              "arguments": [
                                {
                                  "type": "Literal",
                                  "start": 47,
                                  "end": 50,
                                  "value": "d",
                                  "raw": "\"d\""
                                }
                              ]
                            }
                          }
                        ]
                      }
                    },
                    "arguments": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 13', () => {
        expect(parseScript(`({set null (a) {
            a;
          }});`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 46,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 46,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 44,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 43,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 10,
                        "name": "null"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 11,
                        "end": 43,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 12,
                            "end": 13,
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 15,
                          "end": 43,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 29,
                              "end": 31,
                              "expression": {
                                "type": "Identifier",
                                "start": 29,
                                "end": 30,
                                "name": "a"
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

    it('should parse "var eval = (1), arguments = (2);"', () => {
        expect(parseScript('var eval = (1), arguments = (2);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 32,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 14,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 8,
                      "name": "eval"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 12,
                      "end": 13,
                      "value": 1,
                      "raw": "1"
                    }
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 16,
                    "end": 31,
                    "id": {
                      "type": "Identifier",
                      "start": 16,
                      "end": 25,
                      "name": "arguments"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 29,
                      "end": 30,
                      "value": 2,
                      "raw": "2"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 13', () => {
        expect(parseScript(`((function () {
            if (false) {
              var a = (1);
            }
            b();
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 115,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 115,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 113,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 110,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 110,
                      "body": [
                        {
                          "type": "IfStatement",
                          "start": 28,
                          "end": 81,
                          "test": {
                            "type": "Literal",
                            "start": 32,
                            "end": 37,
                            "value": false,
                            "raw": "false"
                          },
                          "consequent": {
                            "type": "BlockStatement",
                            "start": 39,
                            "end": 81,
                            "body": [
                              {
                                "type": "VariableDeclaration",
                                "start": 55,
                                "end": 67,
                                "declarations": [
                                  {
                                    "type": "VariableDeclarator",
                                    "start": 59,
                                    "end": 66,
                                    "id": {
                                      "type": "Identifier",
                                      "start": 59,
                                      "end": 60,
                                      "name": "a"
                                    },
                                    "init": {
                                      "type": "Literal",
                                      "start": 64,
                                      "end": 65,
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                ],
                                "kind": "var"
                              }
                            ]
                          },
                          "alternate": null
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 94,
                          "end": 98,
                          "expression": {
                            "type": "CallExpression",
                            "start": 94,
                            "end": 97,
                            "callee": {
                              "type": "Identifier",
                              "start": 94,
                              "end": 95,
                              "name": "b"
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 14', () => {
        expect(parseScript(`((function () {
            a("b");
          })());
          try {} catch (c) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 82,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 52,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 50,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 47,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 47,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 28,
                          "end": 35,
                          "expression": {
                            "type": "CallExpression",
                            "start": 28,
                            "end": 34,
                            "callee": {
                              "type": "Identifier",
                              "start": 28,
                              "end": 29,
                              "name": "a"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 30,
                                "end": 33,
                                "value": "b",
                                "raw": "\"b\""
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              },
              {
                "type": "TryStatement",
                "start": 63,
                "end": 82,
                "block": {
                  "type": "BlockStatement",
                  "start": 67,
                  "end": 69,
                  "body": []
                },
                "handler": {
                  "type": "CatchClause",
                  "start": 70,
                  "end": 82,
                  "param": {
                    "type": "Identifier",
                    "start": 77,
                    "end": 78,
                    "name": "c"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 80,
                    "end": 82,
                    "body": []
                  }
                },
                "finalizer": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "var [, a] = (1);"', () => {
        expect(parseScript('var [, a] = (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 16,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 15,
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 9,
                      "elements": [
                        null,
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "name": "a"
                        }
                      ]
                    },
                    "init": {
                      "type": "Literal",
                      "start": 13,
                      "end": 14,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 15', () => {
        expect(parseScript(`function a() {
            var b;
            if (b = ("b")) {
              return b;
            } else {
              return b;
            }
          }
          ;
          a();`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 184,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 157,
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
                  "end": 157,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 27,
                      "end": 33,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 31,
                          "end": 32,
                          "id": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 32,
                            "name": "b"
                          },
                          "init": null
                        }
                      ],
                      "kind": "var"
                    },
                    {
                      "type": "IfStatement",
                      "start": 46,
                      "end": 145,
                      "test": {
                        "type": "AssignmentExpression",
                        "start": 50,
                        "end": 59,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 50,
                          "end": 51,
                          "name": "b"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 55,
                          "end": 58,
                          "value": "b",
                          "raw": "\"b\""
                        }
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 61,
                        "end": 100,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 77,
                            "end": 86,
                            "argument": {
                              "type": "Identifier",
                              "start": 84,
                              "end": 85,
                              "name": "b"
                            }
                          }
                        ]
                      },
                      "alternate": {
                        "type": "BlockStatement",
                        "start": 106,
                        "end": 145,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 122,
                            "end": 131,
                            "argument": {
                              "type": "Identifier",
                              "start": 129,
                              "end": 130,
                              "name": "b"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 168,
                "end": 169
              },
              {
                "type": "ExpressionStatement",
                "start": 180,
                "end": 184,
                "expression": {
                  "type": "CallExpression",
                  "start": 180,
                  "end": 183,
                  "callee": {
                    "type": "Identifier",
                    "start": 180,
                    "end": 181,
                    "name": "a"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a[b];"', () => {
        expect(parseScript('a[b];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 5,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 5,
                "expression": {
                  "type": "MemberExpression",
                  "start": 0,
                  "end": 4,
                  "object": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 2,
                    "end": 3,
                    "name": "b"
                  },
                  "computed": true
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex switch statement', () => {
        expect(parseScript(`switch (1) {
            case 2:
              a();
            case (3) + (4):
              b();
              break;
            case ((5) + (6)) + (7):
              c();
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 186,
            "body": [
              {
                "type": "SwitchStatement",
                "start": 0,
                "end": 186,
                "discriminant": {
                  "type": "Literal",
                  "start": 8,
                  "end": 9,
                  "value": 1,
                  "raw": "1"
                },
                "cases": [
                  {
                    "type": "SwitchCase",
                    "start": 25,
                    "end": 51,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 47,
                        "end": 51,
                        "expression": {
                          "type": "CallExpression",
                          "start": 47,
                          "end": 50,
                          "callee": {
                            "type": "Identifier",
                            "start": 47,
                            "end": 48,
                            "name": "a"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "test": {
                      "type": "Literal",
                      "start": 30,
                      "end": 31,
                      "value": 2,
                      "raw": "2"
                    }
                  },
                  {
                    "type": "SwitchCase",
                    "start": 64,
                    "end": 119,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 94,
                        "end": 98,
                        "expression": {
                          "type": "CallExpression",
                          "start": 94,
                          "end": 97,
                          "callee": {
                            "type": "Identifier",
                            "start": 94,
                            "end": 95,
                            "name": "b"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "type": "BreakStatement",
                        "start": 113,
                        "end": 119,
                        "label": null
                      }
                    ],
                    "test": {
                      "type": "BinaryExpression",
                      "start": 69,
                      "end": 78,
                      "left": {
                        "type": "Literal",
                        "start": 70,
                        "end": 71,
                        "value": 3,
                        "raw": "3"
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 76,
                        "end": 77,
                        "value": 4,
                        "raw": "4"
                      }
                    }
                  },
                  {
                    "type": "SwitchCase",
                    "start": 132,
                    "end": 174,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 170,
                        "end": 174,
                        "expression": {
                          "type": "CallExpression",
                          "start": 170,
                          "end": 173,
                          "callee": {
                            "type": "Identifier",
                            "start": 170,
                            "end": 171,
                            "name": "c"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "test": {
                      "type": "BinaryExpression",
                      "start": 137,
                      "end": 154,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 138,
                        "end": 147,
                        "left": {
                          "type": "Literal",
                          "start": 139,
                          "end": 140,
                          "value": 5,
                          "raw": "5"
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 145,
                          "end": 146,
                          "value": 6,
                          "raw": "6"
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 152,
                        "end": 153,
                        "value": 7,
                        "raw": "7"
                      }
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function ({a = 1}) {});"', () => {
        expect(parseScript('(function ({a = 1}) {});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 24,
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 22,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 11,
                      "end": 18,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 17,
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 12,
                            "end": 13,
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 12,
                            "end": 17,
                            "left": {
                              "type": "Identifier",
                              "start": 12,
                              "end": 13,
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 16,
                              "end": 17,
                              "value": 1,
                              "raw": "1"
                            }
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 20,
                    "end": 22,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex for iteration', () => {
        expect(parseScript(`for (;;) {
            if (a) {
              if (b) {
                continue;
              } else {
                ;
              }
            } else {
              ;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 200,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 200,
                "init": null,
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 9,
                  "end": 200,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 23,
                      "end": 188,
                      "test": {
                        "type": "Identifier",
                        "start": 27,
                        "end": 28,
                        "name": "a"
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 30,
                        "end": 151,
                        "body": [
                          {
                            "type": "IfStatement",
                            "start": 46,
                            "end": 137,
                            "test": {
                              "type": "Identifier",
                              "start": 50,
                              "end": 51,
                              "name": "b"
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "start": 53,
                              "end": 96,
                              "body": [
                                {
                                  "type": "ContinueStatement",
                                  "start": 71,
                                  "end": 80,
                                  "label": null
                                }
                              ]
                            },
                            "alternate": {
                              "type": "BlockStatement",
                              "start": 102,
                              "end": 137,
                              "body": [
                                {
                                  "type": "EmptyStatement",
                                  "start": 120,
                                  "end": 121
                                }
                              ]
                            }
                          }
                        ]
                      },
                      "alternate": {
                        "type": "BlockStatement",
                        "start": 157,
                        "end": 188,
                        "body": [
                          {
                            "type": "EmptyStatement",
                            "start": 173,
                            "end": 174
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

    it('should parse "(function a(b, c) {});"', () => {
        expect(parseScript('(function a(b, c) {});', {
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
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 20,
                  "id": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "b"
                    },
                    {
                      "type": "Identifier",
                      "start": 15,
                      "end": 16,
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 18,
                    "end": 20,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex new target"', () => {
        expect(parseScript(`function a() {
            new (new.target);
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 56,
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
                  "end": 56,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 44,
                      "expression": {
                        "type": "NewExpression",
                        "start": 27,
                        "end": 43,
                        "callee": {
                          "type": "MetaProperty",
                          "start": 32,
                          "end": 42,
                          "meta": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 35,
                            "name": "new"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 36,
                            "end": 42,
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

    it('should parse complex if statement', () => {
        expect(parseScript(`if (a()) {
            if (b()) {
              c();
            } else {
              d();
            }
          } else {
            d();
          }
          if (a()) {
            if (b()) {
              c();
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 243,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 154,
                "test": {
                  "type": "CallExpression",
                  "start": 4,
                  "end": 7,
                  "callee": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                  },
                  "arguments": []
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 9,
                  "end": 118,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 23,
                      "end": 106,
                      "test": {
                        "type": "CallExpression",
                        "start": 27,
                        "end": 30,
                        "callee": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "name": "b"
                        },
                        "arguments": []
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 66,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 48,
                            "end": 52,
                            "expression": {
                              "type": "CallExpression",
                              "start": 48,
                              "end": 51,
                              "callee": {
                                "type": "Identifier",
                                "start": 48,
                                "end": 49,
                                "name": "c"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "alternate": {
                        "type": "BlockStatement",
                        "start": 72,
                        "end": 106,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 88,
                            "end": 92,
                            "expression": {
                              "type": "CallExpression",
                              "start": 88,
                              "end": 91,
                              "callee": {
                                "type": "Identifier",
                                "start": 88,
                                "end": 89,
                                "name": "d"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                "alternate": {
                  "type": "BlockStatement",
                  "start": 124,
                  "end": 154,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 138,
                      "end": 142,
                      "expression": {
                        "type": "CallExpression",
                        "start": 138,
                        "end": 141,
                        "callee": {
                          "type": "Identifier",
                          "start": 138,
                          "end": 139,
                          "name": "d"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "IfStatement",
                "start": 165,
                "end": 243,
                "test": {
                  "type": "CallExpression",
                  "start": 169,
                  "end": 172,
                  "callee": {
                    "type": "Identifier",
                    "start": 169,
                    "end": 170,
                    "name": "a"
                  },
                  "arguments": []
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 174,
                  "end": 243,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 188,
                      "end": 231,
                      "test": {
                        "type": "CallExpression",
                        "start": 192,
                        "end": 195,
                        "callee": {
                          "type": "Identifier",
                          "start": 192,
                          "end": 193,
                          "name": "b"
                        },
                        "arguments": []
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 197,
                        "end": 231,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 213,
                            "end": 217,
                            "expression": {
                              "type": "CallExpression",
                              "start": 213,
                              "end": 216,
                              "callee": {
                                "type": "Identifier",
                                "start": 213,
                                "end": 214,
                                "name": "c"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "alternate": null
                    }
                  ]
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a({[("b") + ("b")]: 1});"', () => {
        expect(parseScript('a({[("b") + ("b")]: 1});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 24,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 23,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "ObjectExpression",
                      "start": 2,
                      "end": 22,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 21,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "BinaryExpression",
                            "start": 4,
                            "end": 17,
                            "left": {
                              "type": "Literal",
                              "start": 5,
                              "end": 8,
                              "value": "b",
                              "raw": "\"b\""
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "start": 13,
                              "end": 16,
                              "value": "b",
                              "raw": "\"b\""
                            }
                          },
                          "value": {
                            "type": "Literal",
                            "start": 20,
                            "end": 21,
                            "value": 1,
                            "raw": "1"
                          },
                          "kind": "init"
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

    it('should parse "() => (a = (1));"', () => {
        expect(parseScript('() => (a = (1));', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 15,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "AssignmentExpression",
                    "start": 7,
                    "end": 14,
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "name": "a"
                    },
                    "right": {
                      "type": "Literal",
                      "start": 12,
                      "end": 13,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex if 2', () => {
        expect(parseScript(`if (a) {
            {
              {
                {}
              }
            }
            if (b) {
              c();
            }
            {
              {}
            }
          } else {
            d();
          }
          if (a) {
            for (var e = (1); e < (2); ++e) if (b) c();
          } else {
            d();
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 357,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 234,
                "test": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "a"
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 7,
                  "end": 198,
                  "body": [
                    {
                      "type": "BlockStatement",
                      "start": 21,
                      "end": 87,
                      "body": [
                        {
                          "type": "BlockStatement",
                          "start": 37,
                          "end": 73,
                          "body": [
                            {
                              "type": "BlockStatement",
                              "start": 55,
                              "end": 57,
                              "body": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "IfStatement",
                      "start": 100,
                      "end": 141,
                      "test": {
                        "type": "Identifier",
                        "start": 104,
                        "end": 105,
                        "name": "b"
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 107,
                        "end": 141,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 123,
                            "end": 127,
                            "expression": {
                              "type": "CallExpression",
                              "start": 123,
                              "end": 126,
                              "callee": {
                                "type": "Identifier",
                                "start": 123,
                                "end": 124,
                                "name": "c"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "alternate": null
                    },
                    {
                      "type": "BlockStatement",
                      "start": 154,
                      "end": 186,
                      "body": [
                        {
                          "type": "BlockStatement",
                          "start": 170,
                          "end": 172,
                          "body": []
                        }
                      ]
                    }
                  ]
                },
                "alternate": {
                  "type": "BlockStatement",
                  "start": 204,
                  "end": 234,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 218,
                      "end": 222,
                      "expression": {
                        "type": "CallExpression",
                        "start": 218,
                        "end": 221,
                        "callee": {
                          "type": "Identifier",
                          "start": 218,
                          "end": 219,
                          "name": "d"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "IfStatement",
                "start": 245,
                "end": 357,
                "test": {
                  "type": "Identifier",
                  "start": 249,
                  "end": 250,
                  "name": "a"
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 252,
                  "end": 321,
                  "body": [
                    {
                      "type": "ForStatement",
                      "start": 266,
                      "end": 309,
                      "init": {
                        "type": "VariableDeclaration",
                        "start": 271,
                        "end": 282,
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 275,
                            "end": 282,
                            "id": {
                              "type": "Identifier",
                              "start": 275,
                              "end": 276,
                              "name": "e"
                            },
                            "init": {
                              "type": "Literal",
                              "start": 280,
                              "end": 281,
                              "value": 1,
                              "raw": "1"
                            }
                          }
                        ],
                        "kind": "var"
                      },
                      "test": {
                        "type": "BinaryExpression",
                        "start": 284,
                        "end": 291,
                        "left": {
                          "type": "Identifier",
                          "start": 284,
                          "end": 285,
                          "name": "e"
                        },
                        "operator": "<",
                        "right": {
                          "type": "Literal",
                          "start": 289,
                          "end": 290,
                          "value": 2,
                          "raw": "2"
                        }
                      },
                      "update": {
                        "type": "UpdateExpression",
                        "start": 293,
                        "end": 296,
                        "operator": "++",
                        "prefix": true,
                        "argument": {
                          "type": "Identifier",
                          "start": 295,
                          "end": 296,
                          "name": "e"
                        }
                      },
                      "body": {
                        "type": "IfStatement",
                        "start": 298,
                        "end": 309,
                        "test": {
                          "type": "Identifier",
                          "start": 302,
                          "end": 303,
                          "name": "b"
                        },
                        "consequent": {
                          "type": "ExpressionStatement",
                          "start": 305,
                          "end": 309,
                          "expression": {
                            "type": "CallExpression",
                            "start": 305,
                            "end": 308,
                            "callee": {
                              "type": "Identifier",
                              "start": 305,
                              "end": 306,
                              "name": "c"
                            },
                            "arguments": []
                          }
                        },
                        "alternate": null
                      }
                    }
                  ]
                },
                "alternate": {
                  "type": "BlockStatement",
                  "start": 327,
                  "end": 357,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 341,
                      "end": 345,
                      "expression": {
                        "type": "CallExpression",
                        "start": 341,
                        "end": 344,
                        "callee": {
                          "type": "Identifier",
                          "start": 341,
                          "end": 342,
                          "name": "d"
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

    it('should parse "({a: [a, b]}, ...c) => {};"', () => {
        expect(parseScript('({a: [a, b]}, ...c) => {};', {
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
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 25,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 12,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 11,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "name": "a"
                          },
                          "value": {
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 11,
                            "elements": [
                              {
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "name": "a"
                              },
                              {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "b"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    {
                      "type": "RestElement",
                      "start": 14,
                      "end": 18,
                      "argument": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 18,
                        "name": "c"
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "([, , ]) => (1);"', () => {
        expect(parseScript('([, , ]) => (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 15,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 7,
                      "elements": [
                        null,
                        null
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 13,
                    "end": 14,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex class', () => {
        expect(parseScript(`class a {
            static *b(c) {
              yield c;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 85,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 85,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "a"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 85,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 22,
                      "end": 73,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 30,
                        "end": 31,
                        "name": "b"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 73,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 32,
                            "end": 33,
                            "name": "c"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 35,
                          "end": 73,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 51,
                              "end": 59,
                              "expression": {
                                "type": "YieldExpression",
                                "start": 51,
                                "end": 58,
                                "delegate": false,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 57,
                                  "end": 58,
                                  "name": "c"
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

    it('should parse complex arrow', () => {
        expect(parseScript(`a => {
            "use strict";
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 45,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 45,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 44,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 44,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 19,
                        "end": 32,
                        "expression": {
                          "type": "Literal",
                          "start": 19,
                          "end": 31,
                          "value": "use strict",
                          "raw": "\"use strict\""
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

    it('should parse "([a, ...b]) => (1);"', () => {
        expect(parseScript('([a, ...b]) => (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 18,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 10,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "name": "a"
                        },
                        {
                          "type": "RestElement",
                          "start": 5,
                          "end": 9,
                          "argument": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "b"
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex HTML comment', () => {
        expect(parseScript(`function a() {
            return "<!--HTML-->comment in<!--string literal-->";
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 91,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 91,
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
                  "end": 91,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 27,
                      "end": 79,
                      "argument": {
                        "type": "Literal",
                        "start": 34,
                        "end": 78,
                        "value": "<!--HTML-->comment in<!--string literal-->",
                        "raw": "\"<!--HTML-->comment in<!--string literal-->\""
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 17', () => {
        expect(parseScript(`((function () {
            var a = (1);
            eval("");
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 79,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 79,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 77,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 74,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 74,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 28,
                          "end": 40,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 32,
                              "end": 39,
                              "id": {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "a"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 37,
                                "end": 38,
                                "value": 1,
                                "raw": "1"
                              }
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 53,
                          "end": 62,
                          "expression": {
                            "type": "CallExpression",
                            "start": 53,
                            "end": 61,
                            "callee": {
                              "type": "Identifier",
                              "start": 53,
                              "end": 57,
                              "name": "eval"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 58,
                                "end": 60,
                                "value": "",
                                "raw": "\"\""
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex throw', () => {
        expect(parseScript(`throw "a";
        b();`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "ThrowStatement",
                "start": 0,
                "end": 10,
                "argument": {
                  "type": "Literal",
                  "start": 6,
                  "end": 9,
                  "value": "a",
                  "raw": "\"a\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 19,
                "end": 23,
                "expression": {
                  "type": "CallExpression",
                  "start": 19,
                  "end": 22,
                  "callee": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "b"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "new a(...(.5));"', () => {
        expect(parseScript('new a(...(.5));', {
            ranges: true,
            raw: true
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
                  "type": "NewExpression",
                  "start": 0,
                  "end": 14,
                  "callee": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "SpreadElement",
                      "start": 6,
                      "end": 13,
                      "argument": {
                        "type": "Literal",
                        "start": 10,
                        "end": 12,
                        "value": 0.5,
                        "raw": ".5"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex function', () => {
        expect(parseScript(`((function () {
            ((function () {})());
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 66,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 66,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 64,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 61,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 61,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 28,
                          "end": 49,
                          "expression": {
                            "type": "CallExpression",
                            "start": 29,
                            "end": 47,
                            "callee": {
                              "type": "FunctionExpression",
                              "start": 30,
                              "end": 44,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 42,
                                "end": 44,
                                "body": []
                              }
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex function param', () => {
        expect(parseScript(`function a(b, c, d, e, f) {
            return b + c;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 65,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 65,
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
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "b"
                  },
                  {
                    "type": "Identifier",
                    "start": 14,
                    "end": 15,
                    "name": "c"
                  },
                  {
                    "type": "Identifier",
                    "start": 17,
                    "end": 18,
                    "name": "d"
                  },
                  {
                    "type": "Identifier",
                    "start": 20,
                    "end": 21,
                    "name": "e"
                  },
                  {
                    "type": "Identifier",
                    "start": 23,
                    "end": 24,
                    "name": "f"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 26,
                  "end": 65,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 40,
                      "end": 53,
                      "argument": {
                        "type": "BinaryExpression",
                        "start": 47,
                        "end": 52,
                        "left": {
                          "type": "Identifier",
                          "start": 47,
                          "end": 48,
                          "name": "b"
                        },
                        "operator": "+",
                        "right": {
                          "type": "Identifier",
                          "start": 51,
                          "end": 52,
                          "name": "c"
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

    it('should parse complex class with super', () => {
        expect(parseScript(`class a extends b {
            c() {
              return super[1];
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 94,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 94,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "a"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "b"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 94,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 32,
                      "end": 82,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 33,
                        "name": "c"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 33,
                        "end": 82,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 36,
                          "end": 82,
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "start": 52,
                              "end": 68,
                              "argument": {
                                "type": "MemberExpression",
                                "start": 59,
                                "end": 67,
                                "object": {
                                  "type": "Super",
                                  "start": 59,
                                  "end": 64
                                },
                                "property": {
                                  "type": "Literal",
                                  "start": 65,
                                  "end": 66,
                                  "value": 1,
                                  "raw": "1"
                                },
                                "computed": true
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

    it('should parse "eval => (1);"', () => {
        expect(parseScript('eval => (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 11,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 4,
                      "name": "eval"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 9,
                    "end": 10,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse 2;"', () => {
        expect(parseScript('2;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 2,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 2,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 1,
                  "value": 2,
                  "raw": "2"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex switch 3', () => {
        expect(parseScript(`switch (a) {
            default:
              ((function () {
                b("c");
              })());
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 120,
            "body": [
              {
                "type": "SwitchStatement",
                "start": 0,
                "end": 120,
                "discriminant": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "name": "a"
                },
                "cases": [
                  {
                    "type": "SwitchCase",
                    "start": 25,
                    "end": 108,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 48,
                        "end": 108,
                        "expression": {
                          "type": "CallExpression",
                          "start": 49,
                          "end": 106,
                          "callee": {
                            "type": "FunctionExpression",
                            "start": 50,
                            "end": 103,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 62,
                              "end": 103,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 80,
                                  "end": 87,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 80,
                                    "end": 86,
                                    "callee": {
                                      "type": "Identifier",
                                      "start": 80,
                                      "end": 81,
                                      "name": "b"
                                    },
                                    "arguments": [
                                      {
                                        "type": "Literal",
                                        "start": 82,
                                        "end": 85,
                                        "value": "c",
                                        "raw": "\"c\""
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "test": null
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex function 4', () => {
        expect(parseScript(`((function () {
            -(1);
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 50,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 48,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 45,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 45,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 28,
                          "end": 33,
                          "expression": {
                            "type": "UnaryExpression",
                            "start": 28,
                            "end": 32,
                            "operator": "-",
                            "prefix": true,
                            "argument": {
                              "type": "Literal",
                              "start": 30,
                              "end": 31,
                              "value": 1,
                              "raw": "1"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex for 3', () => {
        expect(parseScript(`for (var a = (1); a < (2); ++a) {
            if (a < (3)) continue;
            (b.c)(a);
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 102,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 102,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 16,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 16,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "a"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 14,
                        "end": 15,
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 18,
                  "end": 25,
                  "left": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 19,
                    "name": "a"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 23,
                    "end": 24,
                    "value": 2,
                    "raw": "2"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 27,
                  "end": 30,
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 29,
                    "end": 30,
                    "name": "a"
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 32,
                  "end": 102,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 46,
                      "end": 68,
                      "test": {
                        "type": "BinaryExpression",
                        "start": 50,
                        "end": 57,
                        "left": {
                          "type": "Identifier",
                          "start": 50,
                          "end": 51,
                          "name": "a"
                        },
                        "operator": "<",
                        "right": {
                          "type": "Literal",
                          "start": 55,
                          "end": 56,
                          "value": 3,
                          "raw": "3"
                        }
                      },
                      "consequent": {
                        "type": "ContinueStatement",
                        "start": 59,
                        "end": 68,
                        "label": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 81,
                      "end": 90,
                      "expression": {
                        "type": "CallExpression",
                        "start": 81,
                        "end": 89,
                        "callee": {
                          "type": "MemberExpression",
                          "start": 82,
                          "end": 85,
                          "object": {
                            "type": "Identifier",
                            "start": 82,
                            "end": 83,
                            "name": "b"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 84,
                            "end": 85,
                            "name": "c"
                          },
                          "computed": false
                        },
                        "arguments": [
                          {
                            "type": "Identifier",
                            "start": 87,
                            "end": 88,
                            "name": "a"
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

    it('should parse "for ({a = 1} in b) ;"', () => {
        expect(parseScript('for ({a = 1} in b) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 20,
                "left": {
                  "type": "ObjectPattern",
                  "start": 5,
                  "end": 12,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 6,
                      "end": 11,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "AssignmentPattern",
                        "start": 6,
                        "end": 11,
                        "left": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "a"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 10,
                          "end": 11,
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    }
                  ]
                },
                "right": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "b"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 19,
                  "end": 20
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex with strict', () => {
        expect(parseScript(`"use strict";
        ("x");`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 22,
                "end": 28,
                "expression": {
                  "type": "Literal",
                  "start": 23,
                  "end": 26,
                  "value": "x",
                  "raw": "\"x\""
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex label', () => {
        expect(parseScript(`b: while (1) {
            continue;
            a;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 63,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 63,
                "body": {
                  "type": "WhileStatement",
                  "start": 3,
                  "end": 63,
                  "test": {
                    "type": "Literal",
                    "start": 10,
                    "end": 11,
                    "value": 1,
                    "raw": "1"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 63,
                    "body": [
                      {
                        "type": "ContinueStatement",
                        "start": 27,
                        "end": 36,
                        "label": null
                      },
                      {
                        "type": "ExpressionStatement",
                        "start": 49,
                        "end": 51,
                        "expression": {
                          "type": "Identifier",
                          "start": 49,
                          "end": 50,
                          "name": "a"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 1,
                  "name": "b"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "if ((!a) || (b())) ;"', () => {
        expect(parseScript('if ((!a) || (b())) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 20,
                "test": {
                  "type": "LogicalExpression",
                  "start": 4,
                  "end": 17,
                  "left": {
                    "type": "UnaryExpression",
                    "start": 5,
                    "end": 7,
                    "operator": "!",
                    "prefix": true,
                    "argument": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 7,
                      "name": "a"
                    }
                  },
                  "operator": "||",
                  "right": {
                    "type": "CallExpression",
                    "start": 13,
                    "end": 16,
                    "callee": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "b"
                    },
                    "arguments": []
                  }
                },
                "consequent": {
                  "type": "EmptyStatement",
                  "start": 19,
                  "end": 20
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex function with for', () => {
        expect(parseScript(`((function () {
            for (; false;) {
              a();
            }
            b();
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 111,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 111,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 109,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 106,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 106,
                      "body": [
                        {
                          "type": "ForStatement",
                          "start": 28,
                          "end": 77,
                          "init": null,
                          "test": {
                            "type": "Literal",
                            "start": 35,
                            "end": 40,
                            "value": false,
                            "raw": "false"
                          },
                          "update": null,
                          "body": {
                            "type": "BlockStatement",
                            "start": 43,
                            "end": 77,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 59,
                                "end": 63,
                                "expression": {
                                  "type": "CallExpression",
                                  "start": 59,
                                  "end": 62,
                                  "callee": {
                                    "type": "Identifier",
                                    "start": 59,
                                    "end": 60,
                                    "name": "a"
                                  },
                                  "arguments": []
                                }
                              }
                            ]
                          }
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 90,
                          "end": 94,
                          "expression": {
                            "type": "CallExpression",
                            "start": 90,
                            "end": 93,
                            "callee": {
                              "type": "Identifier",
                              "start": 90,
                              "end": 91,
                              "name": "b"
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (const {a, b} of c) ;"', () => {
        expect(parseScript('for (const {a, b} of c) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ForOfStatement",
                "start": 0,
                "end": 25,
                "await": false,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 17,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 11,
                      "end": 17,
                      "id": {
                        "type": "ObjectPattern",
                        "start": 11,
                        "end": 17,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 12,
                            "end": 13,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 12,
                              "end": 13,
                              "name": "a"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 12,
                              "end": 13,
                              "name": "a"
                            }
                          },
                          {
                            "type": "Property",
                            "start": 15,
                            "end": 16,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 16,
                              "name": "b"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 16,
                              "name": "b"
                            }
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "const"
                },
                "right": {
                  "type": "Identifier",
                  "start": 21,
                  "end": 22,
                  "name": "c"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 24,
                  "end": 25
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "new a(...b);"', () => {
        expect(parseScript('new a(...b);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "NewExpression",
                  "start": 0,
                  "end": 11,
                  "callee": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "SpreadElement",
                      "start": 6,
                      "end": 10,
                      "argument": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
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

    it('should parse "(a & b) | c;"', () => {
        expect(parseScript('(a & b) | c;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 11,
                  "left": {
                    "type": "BinaryExpression",
                    "start": 1,
                    "end": 6,
                    "left": {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "a"
                    },
                    "operator": "&",
                    "right": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "b"
                    }
                  },
                  "operator": "|",
                  "right": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "c"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[a, , ] = (1);"', () => {
        expect(parseScript('[a, , ] = (1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 13,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 7,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "name": "a"
                      },
                      null
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 11,
                    "end": 12,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a = (((b()), (c())), (d()));"', () => {
        expect(parseScript('a = (((b()), (c())), (d()));', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 28,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 27,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "SequenceExpression",
                    "start": 5,
                    "end": 26,
                    "expressions": [
                      {
                        "type": "SequenceExpression",
                        "start": 6,
                        "end": 18,
                        "expressions": [
                          {
                            "type": "CallExpression",
                            "start": 7,
                            "end": 10,
                            "callee": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "b"
                            },
                            "arguments": []
                          },
                          {
                            "type": "CallExpression",
                            "start": 14,
                            "end": 17,
                            "callee": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "name": "c"
                            },
                            "arguments": []
                          }
                        ]
                      },
                      {
                        "type": "CallExpression",
                        "start": 22,
                        "end": 25,
                        "callee": {
                          "type": "Identifier",
                          "start": 22,
                          "end": 23,
                          "name": "d"
                        },
                        "arguments": []
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(let[a] = b);"', () => {
        expect(parseScript('(let[a] = b);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 11,
                  "operator": "=",
                  "left": {
                    "type": "MemberExpression",
                    "start": 1,
                    "end": 7,
                    "object": {
                      "type": "Identifier",
                      "start": 1,
                      "end": 4,
                      "name": "let"
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "a"
                    },
                    "computed": true
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({get __proto__() {}});"', () => {
        expect(parseScript('({get __proto__() {}});', {
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
                  "end": 21,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 20,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 15,
                        "name": "__proto__"
                      },
                      "kind": "get",
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

    it('should parse "(1) + (((a()), (b())), (c()));"', () => {
        expect(parseScript('(1) + (((a()), (b())), (c()));', {
            ranges: true,
            raw: true
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
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 29,
                  "left": {
                    "type": "Literal",
                    "start": 1,
                    "end": 2,
                    "value": 1,
                    "raw": "1"
                  },
                  "operator": "+",
                  "right": {
                    "type": "SequenceExpression",
                    "start": 7,
                    "end": 28,
                    "expressions": [
                      {
                        "type": "SequenceExpression",
                        "start": 8,
                        "end": 20,
                        "expressions": [
                          {
                            "type": "CallExpression",
                            "start": 9,
                            "end": 12,
                            "callee": {
                              "type": "Identifier",
                              "start": 9,
                              "end": 10,
                              "name": "a"
                            },
                            "arguments": []
                          },
                          {
                            "type": "CallExpression",
                            "start": 16,
                            "end": 19,
                            "callee": {
                              "type": "Identifier",
                              "start": 16,
                              "end": 17,
                              "name": "b"
                            },
                            "arguments": []
                          }
                        ]
                      },
                      {
                        "type": "CallExpression",
                        "start": 24,
                        "end": 27,
                        "callee": {
                          "type": "Identifier",
                          "start": 24,
                          "end": 25,
                          "name": "c"
                        },
                        "arguments": []
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "if (1) function a() {} else ;"', () => {
        expect(parseScript('if (1) function a() {} else ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 29,
                "test": {
                  "type": "Literal",
                  "start": 4,
                  "end": 5,
                  "value": 1,
                  "raw": "1"
                },
                "consequent": {
                  "type": "FunctionDeclaration",
                  "start": 7,
                  "end": 22,
                  "id": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "a"
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
                },
                "alternate": {
                  "type": "EmptyStatement",
                  "start": 28,
                  "end": 29
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a: null, b: null});"', () => {
        expect(parseScript('({a: null, b: null});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 21,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 19,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 9,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "a"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 5,
                        "end": 9,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 11,
                      "end": 18,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "name": "b"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 14,
                        "end": 18,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse "a = ({__proto__: 1});"', () => {
        expect(parseScript('a = ({__proto__: 1});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 21,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 20,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 5,
                    "end": 19,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 6,
                        "end": 18,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 15,
                          "name": "__proto__"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 17,
                          "end": 18,
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(1e20), (1e21);"', () => {
        expect(parseScript('(1e20), (1e21);', {
            ranges: true,
            raw: true
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
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 14,
                  "expressions": [
                    {
                      "type": "Literal",
                      "start": 1,
                      "end": 5,
                      "value": 100000000000000000000,
                      "raw": "1e20"
                    },
                    {
                      "type": "Literal",
                      "start": 9,
                      "end": 13,
                      "value": 1e+21,
                      "raw": "1e21"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a: 1});"', () => {
        expect(parseScript('({a: 1});', {
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
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 7,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 6,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "a"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex', () => {
        expect(parseScript(`function a() {
            if (b) return;
            c();
            d();
          }
          function e() {
            if (b) return;
            if (c) return;
            if (d) return;
            if (f) return;
            g();
            h();
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 266,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 87,
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
                  "end": 87,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 27,
                      "end": 41,
                      "test": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 32,
                        "name": "b"
                      },
                      "consequent": {
                        "type": "ReturnStatement",
                        "start": 34,
                        "end": 41,
                        "argument": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 54,
                      "end": 58,
                      "expression": {
                        "type": "CallExpression",
                        "start": 54,
                        "end": 57,
                        "callee": {
                          "type": "Identifier",
                          "start": 54,
                          "end": 55,
                          "name": "c"
                        },
                        "arguments": []
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 71,
                      "end": 75,
                      "expression": {
                        "type": "CallExpression",
                        "start": 71,
                        "end": 74,
                        "callee": {
                          "type": "Identifier",
                          "start": 71,
                          "end": 72,
                          "name": "d"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 98,
                "end": 266,
                "id": {
                  "type": "Identifier",
                  "start": 107,
                  "end": 108,
                  "name": "e"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 111,
                  "end": 266,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 125,
                      "end": 139,
                      "test": {
                        "type": "Identifier",
                        "start": 129,
                        "end": 130,
                        "name": "b"
                      },
                      "consequent": {
                        "type": "ReturnStatement",
                        "start": 132,
                        "end": 139,
                        "argument": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "IfStatement",
                      "start": 152,
                      "end": 166,
                      "test": {
                        "type": "Identifier",
                        "start": 156,
                        "end": 157,
                        "name": "c"
                      },
                      "consequent": {
                        "type": "ReturnStatement",
                        "start": 159,
                        "end": 166,
                        "argument": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "IfStatement",
                      "start": 179,
                      "end": 193,
                      "test": {
                        "type": "Identifier",
                        "start": 183,
                        "end": 184,
                        "name": "d"
                      },
                      "consequent": {
                        "type": "ReturnStatement",
                        "start": 186,
                        "end": 193,
                        "argument": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "IfStatement",
                      "start": 206,
                      "end": 220,
                      "test": {
                        "type": "Identifier",
                        "start": 210,
                        "end": 211,
                        "name": "f"
                      },
                      "consequent": {
                        "type": "ReturnStatement",
                        "start": 213,
                        "end": 220,
                        "argument": null
                      },
                      "alternate": null
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 233,
                      "end": 237,
                      "expression": {
                        "type": "CallExpression",
                        "start": 233,
                        "end": 236,
                        "callee": {
                          "type": "Identifier",
                          "start": 233,
                          "end": 234,
                          "name": "g"
                        },
                        "arguments": []
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 250,
                      "end": 254,
                      "expression": {
                        "type": "CallExpression",
                        "start": 250,
                        "end": 253,
                        "callee": {
                          "type": "Identifier",
                          "start": 250,
                          "end": 251,
                          "name": "h"
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

    it('should parse complex yield', () => {
        expect(parseScript(`function* a() {
            yield (2e308);
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 54,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 54,
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
                  "start": 14,
                  "end": 54,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 28,
                      "end": 42,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 28,
                        "end": 41,
                        "delegate": false,
                        "argument": {
                          "type": "Literal",
                          "start": 35,
                          "end": 40,
                          "value": Infinity,
                          "raw": "2e308"
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

    it('should parse "({[(1) * (2)]: 3});"', () => {
        expect(parseScript('({[(1) * (2)]: 3});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 17,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 16,
                      "method": false,
                      "shorthand": false,
                      "computed": true,
                      "key": {
                        "type": "BinaryExpression",
                        "start": 3,
                        "end": 12,
                        "left": {
                          "type": "Literal",
                          "start": 4,
                          "end": 5,
                          "value": 1,
                          "raw": "1"
                        },
                        "operator": "*",
                        "right": {
                          "type": "Literal",
                          "start": 10,
                          "end": 11,
                          "value": 2,
                          "raw": "2"
                        }
                      },
                      "value": {
                        "type": "Literal",
                        "start": 15,
                        "end": 16,
                        "value": 3,
                        "raw": "3"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 19', () => {
        expect(parseScript(`((function () {
            a((typeof b) === ("c"));
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 69,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 69,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 67,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 64,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 64,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 28,
                          "end": 52,
                          "expression": {
                            "type": "CallExpression",
                            "start": 28,
                            "end": 51,
                            "callee": {
                              "type": "Identifier",
                              "start": 28,
                              "end": 29,
                              "name": "a"
                            },
                            "arguments": [
                              {
                                "type": "BinaryExpression",
                                "start": 30,
                                "end": 50,
                                "left": {
                                  "type": "UnaryExpression",
                                  "start": 31,
                                  "end": 39,
                                  "operator": "typeof",
                                  "prefix": true,
                                  "argument": {
                                    "type": "Identifier",
                                    "start": 38,
                                    "end": 39,
                                    "name": "b"
                                  }
                                },
                                "operator": "===",
                                "right": {
                                  "type": "Literal",
                                  "start": 46,
                                  "end": 49,
                                  "value": "c",
                                  "raw": "\"c\""
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "import {a, b} from "c";"', () => {
        expect(parseModule('import {a, b} from "c";', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 23,
                "specifiers": [
                  {
                    "type": "ImportSpecifier",
                    "start": 8,
                    "end": 9,
                    "imported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "name": "a"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "name": "a"
                    }
                  },
                  {
                    "type": "ImportSpecifier",
                    "start": 11,
                    "end": 12,
                    "imported": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 19,
                  "end": 22,
                  "value": "c",
                  "raw": "\"c\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "import {a, b} from "foo";"', () => {
        expect(parseModule('import {a, b} from "foo";', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 25,
                "specifiers": [
                  {
                    "type": "ImportSpecifier",
                    "start": 8,
                    "end": 9,
                    "imported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "name": "a"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "name": "a"
                    }
                  },
                  {
                    "type": "ImportSpecifier",
                    "start": 11,
                    "end": 12,
                    "imported": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 19,
                  "end": 24,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "void (/test/);"', () => {
        expect(parseScript('void (/test/);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "UnaryExpression",
                  "start": 0,
                  "end": 13,
                  "operator": "void",
                  "prefix": true,
                  "argument": {
                    "type": "Literal",
                    "start": 6,
                    "end": 12,
                    "value": /test/,
                    "raw": "/test/",
                    "regex": {
                      "pattern": "test",
                      "flags": ""
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 20', () => {
        expect(parseScript(`var a = ({b: null, set c (d) {}, get c() {
            return (this).b;
          }});`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 86,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 86,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 85,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "a"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 9,
                      "end": 84,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 10,
                          "end": 17,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "b"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 13,
                            "end": 17,
                            "value": null,
                            "raw": "null"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 19,
                          "end": 31,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 23,
                            "end": 24,
                            "name": "c"
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 25,
                            "end": 31,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 26,
                                "end": 27,
                                "name": "d"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 29,
                              "end": 31,
                              "body": []
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 33,
                          "end": 83,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 37,
                            "end": 38,
                            "name": "c"
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 38,
                            "end": 83,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 41,
                              "end": 83,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 55,
                                  "end": 71,
                                  "argument": {
                                    "type": "MemberExpression",
                                    "start": 62,
                                    "end": 70,
                                    "object": {
                                      "type": "ThisExpression",
                                      "start": 63,
                                      "end": 67
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 69,
                                      "end": 70,
                                      "name": "b"
                                    },
                                    "computed": false
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
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 21', () => {
        expect(parseScript(`function a() {
            return (1) ? (2) : (3);
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 62,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 62,
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
                  "end": 62,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 27,
                      "end": 50,
                      "argument": {
                        "type": "ConditionalExpression",
                        "start": 34,
                        "end": 49,
                        "test": {
                          "type": "Literal",
                          "start": 35,
                          "end": 36,
                          "value": 1,
                          "raw": "1"
                        },
                        "consequent": {
                          "type": "Literal",
                          "start": 41,
                          "end": 42,
                          "value": 2,
                          "raw": "2"
                        },
                        "alternate": {
                          "type": "Literal",
                          "start": 47,
                          "end": 48,
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

    it('should parse "(a ? b : c) ? d : e;"', () => {
        expect(parseScript('(a ? b : c) ? d : e;', {
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
                  "type": "ConditionalExpression",
                  "start": 0,
                  "end": 19,
                  "test": {
                    "type": "ConditionalExpression",
                    "start": 1,
                    "end": 10,
                    "test": {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "a"
                    },
                    "consequent": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "b"
                    },
                    "alternate": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "name": "c"
                    }
                  },
                  "consequent": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 15,
                    "name": "d"
                  },
                  "alternate": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 19,
                    "name": "e"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a - (b % c);"', () => {
        expect(parseScript('a - (b % c);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 11,
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "operator": "-",
                  "right": {
                    "type": "BinaryExpression",
                    "start": 5,
                    "end": 10,
                    "left": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "b"
                    },
                    "operator": "%",
                    "right": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "name": "c"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "/foobar/;"', () => {
        expect(parseScript('/foobar/;', {
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
                  "type": "Literal",
                  "start": 0,
                  "end": 8,
                  "value": /foobar/,
                  "raw": "/foobar/",
                  "regex": {
                    "pattern": "foobar",
                    "flags": ""
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 22', () => {
        expect(parseScript(`(function* () {
            (function yield() {});
          });`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 64,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 64,
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 62,
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 62,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 28,
                        "end": 50,
                        "expression": {
                          "type": "FunctionExpression",
                          "start": 29,
                          "end": 48,
                          "id": {
                            "type": "Identifier",
                            "start": 38,
                            "end": 43,
                            "name": "yield"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 46,
                            "end": 48,
                            "body": []
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

    it('should parse "for (a of b) ;"', () => {
        expect(parseScript('for (a of b) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ForOfStatement",
                "await": false,
                "start": 0,
                "end": 14,
                "left": {
                  "type": "Identifier",
                  "start": 5,
                  "end": 6,
                  "name": "a"
                },
                "right": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 11,
                  "name": "b"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 13,
                  "end": 14
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse simple switch', () => {
        expect(parseScript(`switch (a) {
            case 1:
              b();
              break;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 84,
            "body": [
              {
                "type": "SwitchStatement",
                "start": 0,
                "end": 84,
                "discriminant": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "name": "a"
                },
                "cases": [
                  {
                    "type": "SwitchCase",
                    "start": 25,
                    "end": 72,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 47,
                        "end": 51,
                        "expression": {
                          "type": "CallExpression",
                          "start": 47,
                          "end": 50,
                          "callee": {
                            "type": "Identifier",
                            "start": 47,
                            "end": 48,
                            "name": "b"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "type": "BreakStatement",
                        "start": 66,
                        "end": 72,
                        "label": null
                      }
                    ],
                    "test": {
                      "type": "Literal",
                      "start": 30,
                      "end": 31,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "let();"', () => {
        expect(parseScript('let();', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 5,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "let"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse simple while', () => {
        expect(parseScript(`while (true) {
            continue;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "body": [
              {
                "type": "WhileStatement",
                "start": 0,
                "end": 48,
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
                  "end": 48,
                  "body": [
                    {
                      "type": "ContinueStatement",
                      "start": 27,
                      "end": 36,
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 23', () => {
        expect(parseScript(`((function () {
            var a = ({NaN: 1});
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 64,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 64,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 62,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 59,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 59,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 28,
                          "end": 47,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 32,
                              "end": 46,
                              "id": {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "a"
                              },
                              "init": {
                                "type": "ObjectExpression",
                                "start": 37,
                                "end": 45,
                                "properties": [
                                  {
                                    "type": "Property",
                                    "start": 38,
                                    "end": 44,
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "key": {
                                      "type": "Identifier",
                                      "start": 38,
                                      "end": 41,
                                      "name": "NaN"
                                    },
                                    "value": {
                                      "type": "Literal",
                                      "start": 43,
                                      "end": 44,
                                      "value": 1,
                                      "raw": "1"
                                    },
                                    "kind": "init"
                                  }
                                ]
                              }
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (let a;;) ;"', () => {
        expect(parseScript('for (let a;;) ;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 15,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 10,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "a"
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
                  "start": 14,
                  "end": 15
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 24', () => {
        expect(parseScript(`{
            a();
            b();
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "body": [
              {
                "type": "BlockStatement",
                "start": 0,
                "end": 47,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 14,
                    "end": 18,
                    "expression": {
                      "type": "CallExpression",
                      "start": 14,
                      "end": 17,
                      "callee": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "a"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 31,
                    "end": 35,
                    "expression": {
                      "type": "CallExpression",
                      "start": 31,
                      "end": 34,
                      "callee": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 32,
                        "name": "b"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a = ({b: function (c, ...d) {}});"', () => {
        expect(parseScript('a = ({b: function (c, ...d) {}});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 33,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 32,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 5,
                    "end": 31,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 6,
                        "end": 30,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "b"
                        },
                        "value": {
                          "type": "FunctionExpression",
                          "start": 9,
                          "end": 30,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 19,
                              "end": 20,
                              "name": "c"
                            },
                            {
                              "type": "RestElement",
                              "start": 22,
                              "end": 26,
                              "argument": {
                                "type": "Identifier",
                                "start": 25,
                                "end": 26,
                                "name": "d"
                              }
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 28,
                            "end": 30,
                            "body": []
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a: 1, set a (b) {}});"', () => {
        expect(parseScript('({a: 1, set a (b) {}});', {
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
                  "end": 21,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 6,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "a"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 8,
                      "end": 20,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 12,
                        "end": 13,
                        "name": "a"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 14,
                        "end": 20,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 15,
                            "end": 16,
                            "name": "b"
                          }
                        ],
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

    it('should parse "complex 25"', () => {
        expect(parseModule(`export class a {}
        ;
        1;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 38,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 17,
                "declaration": {
                  "type": "ClassDeclaration",
                  "start": 7,
                  "end": 17,
                  "id": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "name": "a"
                  },
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 15,
                    "end": 17,
                    "body": []
                  }
                },
                "specifiers": [],
                "source": null
              },
              {
                "type": "EmptyStatement",
                "start": 26,
                "end": 27
              },
              {
                "type": "ExpressionStatement",
                "start": 36,
                "end": 38,
                "expression": {
                  "type": "Literal",
                  "start": 36,
                  "end": 37,
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse complex 26', () => {
        expect(parseScript(`a((((b()) + (1)) + ("c")) + ("d"));
        a(((b()) + ((2) + ("c"))) + ("d"));
        a((((b()) + (3)) + ("c")) + ("d"));
        a(((((b()) + (4)) + ("c")) + ("d")) + (("e") + ("f")));
        a((((((("e") + ("f")) + (b())) + (5)) + ("c")) + ("d")) + (("e") + ("f")));
        a(((("c") + (b())) + (6)) + ("d"));
        a(((b()) + ("e")) + ((7) + (g("10"))));`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 363,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 35,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 34,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 2,
                      "end": 33,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 3,
                        "end": 24,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 4,
                          "end": 15,
                          "left": {
                            "type": "CallExpression",
                            "start": 5,
                            "end": 8,
                            "callee": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "name": "b"
                            },
                            "arguments": []
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 13,
                            "end": 14,
                            "value": 1,
                            "raw": "1"
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 20,
                          "end": 23,
                          "value": "c",
                          "raw": "\"c\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 29,
                        "end": 32,
                        "value": "d",
                        "raw": "\"d\""
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 44,
                "end": 79,
                "expression": {
                  "type": "CallExpression",
                  "start": 44,
                  "end": 78,
                  "callee": {
                    "type": "Identifier",
                    "start": 44,
                    "end": 45,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 46,
                      "end": 77,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 47,
                        "end": 68,
                        "left": {
                          "type": "CallExpression",
                          "start": 48,
                          "end": 51,
                          "callee": {
                            "type": "Identifier",
                            "start": 48,
                            "end": 49,
                            "name": "b"
                          },
                          "arguments": []
                        },
                        "operator": "+",
                        "right": {
                          "type": "BinaryExpression",
                          "start": 56,
                          "end": 67,
                          "left": {
                            "type": "Literal",
                            "start": 57,
                            "end": 58,
                            "value": 2,
                            "raw": "2"
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 63,
                            "end": 66,
                            "value": "c",
                            "raw": "\"c\""
                          }
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 73,
                        "end": 76,
                        "value": "d",
                        "raw": "\"d\""
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 88,
                "end": 123,
                "expression": {
                  "type": "CallExpression",
                  "start": 88,
                  "end": 122,
                  "callee": {
                    "type": "Identifier",
                    "start": 88,
                    "end": 89,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 90,
                      "end": 121,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 91,
                        "end": 112,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 92,
                          "end": 103,
                          "left": {
                            "type": "CallExpression",
                            "start": 93,
                            "end": 96,
                            "callee": {
                              "type": "Identifier",
                              "start": 93,
                              "end": 94,
                              "name": "b"
                            },
                            "arguments": []
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 101,
                            "end": 102,
                            "value": 3,
                            "raw": "3"
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 108,
                          "end": 111,
                          "value": "c",
                          "raw": "\"c\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 117,
                        "end": 120,
                        "value": "d",
                        "raw": "\"d\""
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 132,
                "end": 187,
                "expression": {
                  "type": "CallExpression",
                  "start": 132,
                  "end": 186,
                  "callee": {
                    "type": "Identifier",
                    "start": 132,
                    "end": 133,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 134,
                      "end": 185,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 135,
                        "end": 166,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 136,
                          "end": 157,
                          "left": {
                            "type": "BinaryExpression",
                            "start": 137,
                            "end": 148,
                            "left": {
                              "type": "CallExpression",
                              "start": 138,
                              "end": 141,
                              "callee": {
                                "type": "Identifier",
                                "start": 138,
                                "end": 139,
                                "name": "b"
                              },
                              "arguments": []
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "start": 146,
                              "end": 147,
                              "value": 4,
                              "raw": "4"
                            }
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 153,
                            "end": 156,
                            "value": "c",
                            "raw": "\"c\""
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 162,
                          "end": 165,
                          "value": "d",
                          "raw": "\"d\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "BinaryExpression",
                        "start": 171,
                        "end": 184,
                        "left": {
                          "type": "Literal",
                          "start": 172,
                          "end": 175,
                          "value": "e",
                          "raw": "\"e\""
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 180,
                          "end": 183,
                          "value": "f",
                          "raw": "\"f\""
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 196,
                "end": 271,
                "expression": {
                  "type": "CallExpression",
                  "start": 196,
                  "end": 270,
                  "callee": {
                    "type": "Identifier",
                    "start": 196,
                    "end": 197,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 198,
                      "end": 269,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 199,
                        "end": 250,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 200,
                          "end": 241,
                          "left": {
                            "type": "BinaryExpression",
                            "start": 201,
                            "end": 232,
                            "left": {
                              "type": "BinaryExpression",
                              "start": 202,
                              "end": 225,
                              "left": {
                                "type": "BinaryExpression",
                                "start": 203,
                                "end": 216,
                                "left": {
                                  "type": "Literal",
                                  "start": 204,
                                  "end": 207,
                                  "value": "e",
                                  "raw": "\"e\""
                                },
                                "operator": "+",
                                "right": {
                                  "type": "Literal",
                                  "start": 212,
                                  "end": 215,
                                  "value": "f",
                                  "raw": "\"f\""
                                }
                              },
                              "operator": "+",
                              "right": {
                                "type": "CallExpression",
                                "start": 221,
                                "end": 224,
                                "callee": {
                                  "type": "Identifier",
                                  "start": 221,
                                  "end": 222,
                                  "name": "b"
                                },
                                "arguments": []
                              }
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "start": 230,
                              "end": 231,
                              "value": 5,
                              "raw": "5"
                            }
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 237,
                            "end": 240,
                            "value": "c",
                            "raw": "\"c\""
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 246,
                          "end": 249,
                          "value": "d",
                          "raw": "\"d\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "BinaryExpression",
                        "start": 255,
                        "end": 268,
                        "left": {
                          "type": "Literal",
                          "start": 256,
                          "end": 259,
                          "value": "e",
                          "raw": "\"e\""
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 264,
                          "end": 267,
                          "value": "f",
                          "raw": "\"f\""
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 280,
                "end": 315,
                "expression": {
                  "type": "CallExpression",
                  "start": 280,
                  "end": 314,
                  "callee": {
                    "type": "Identifier",
                    "start": 280,
                    "end": 281,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 282,
                      "end": 313,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 283,
                        "end": 304,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 284,
                          "end": 297,
                          "left": {
                            "type": "Literal",
                            "start": 285,
                            "end": 288,
                            "value": "c",
                            "raw": "\"c\""
                          },
                          "operator": "+",
                          "right": {
                            "type": "CallExpression",
                            "start": 293,
                            "end": 296,
                            "callee": {
                              "type": "Identifier",
                              "start": 293,
                              "end": 294,
                              "name": "b"
                            },
                            "arguments": []
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 302,
                          "end": 303,
                          "value": 6,
                          "raw": "6"
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 309,
                        "end": 312,
                        "value": "d",
                        "raw": "\"d\""
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 324,
                "end": 363,
                "expression": {
                  "type": "CallExpression",
                  "start": 324,
                  "end": 362,
                  "callee": {
                    "type": "Identifier",
                    "start": 324,
                    "end": 325,
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "start": 326,
                      "end": 361,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 327,
                        "end": 340,
                        "left": {
                          "type": "CallExpression",
                          "start": 328,
                          "end": 331,
                          "callee": {
                            "type": "Identifier",
                            "start": 328,
                            "end": 329,
                            "name": "b"
                          },
                          "arguments": []
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 336,
                          "end": 339,
                          "value": "e",
                          "raw": "\"e\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "BinaryExpression",
                        "start": 345,
                        "end": 360,
                        "left": {
                          "type": "Literal",
                          "start": 346,
                          "end": 347,
                          "value": 7,
                          "raw": "7"
                        },
                        "operator": "+",
                        "right": {
                          "type": "CallExpression",
                          "start": 352,
                          "end": 359,
                          "callee": {
                            "type": "Identifier",
                            "start": 352,
                            "end": 353,
                            "name": "g"
                          },
                          "arguments": [
                            {
                              "type": "Literal",
                              "start": 354,
                              "end": 358,
                              "value": "10",
                              "raw": "\"10\""
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

    it('should parse "(class {get a() {}})"', () => {
        expect(parseScript('(class {get a() {}})', {
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
                  "type": "ClassExpression",
                  "start": 1,
                  "end": 19,
                  "id": null,
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 7,
                    "end": 19,
                    "body": [
                      {
                        "type": "MethodDefinition",
                        "start": 8,
                        "end": 18,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "name": "a"
                        },
                        "static": false,
                        "kind": "get",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 13,
                          "end": 18,
                          "id": null,
                          "generator": false,
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
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "let [a] = (b);"', () => {
        expect(parseScript('let [a] = (b);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 14,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 13,
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 7,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "name": "a"
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "b"
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 27', () => {
        expect(parseScript(`while (a) ((function () {
            b("c");
          })());
          try {} catch (d) {
            b("e");
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 123,
            "body": [
              {
                "type": "WhileStatement",
                "start": 0,
                "end": 62,
                "test": {
                  "type": "Identifier",
                  "start": 7,
                  "end": 8,
                  "name": "a"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 10,
                  "end": 62,
                  "expression": {
                    "type": "CallExpression",
                    "start": 11,
                    "end": 60,
                    "callee": {
                      "type": "FunctionExpression",
                      "start": 12,
                      "end": 57,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 57,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 38,
                            "end": 45,
                            "expression": {
                              "type": "CallExpression",
                              "start": 38,
                              "end": 44,
                              "callee": {
                                "type": "Identifier",
                                "start": 38,
                                "end": 39,
                                "name": "b"
                              },
                              "arguments": [
                                {
                                  "type": "Literal",
                                  "start": 40,
                                  "end": 43,
                                  "value": "c",
                                  "raw": "\"c\""
                                }
                              ]
                            }
                          }
                        ]
                      }
                    },
                    "arguments": []
                  }
                }
              },
              {
                "type": "TryStatement",
                "start": 73,
                "end": 123,
                "block": {
                  "type": "BlockStatement",
                  "start": 77,
                  "end": 79,
                  "body": []
                },
                "handler": {
                  "type": "CatchClause",
                  "start": 80,
                  "end": 123,
                  "param": {
                    "type": "Identifier",
                    "start": 87,
                    "end": 88,
                    "name": "d"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 90,
                    "end": 123,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 104,
                        "end": 111,
                        "expression": {
                          "type": "CallExpression",
                          "start": 104,
                          "end": 110,
                          "callee": {
                            "type": "Identifier",
                            "start": 104,
                            "end": 105,
                            "name": "b"
                          },
                          "arguments": [
                            {
                              "type": "Literal",
                              "start": 106,
                              "end": 109,
                              "value": "e",
                              "raw": "\"e\""
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                "finalizer": null
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 28', () => {
        expect(parseScript(`function a() {
            var b = (1);
            c();
            var d = (2);
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 93,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 93,
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
                  "end": 93,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 27,
                      "end": 39,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 31,
                          "end": 38,
                          "id": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 32,
                            "name": "b"
                          },
                          "init": {
                            "type": "Literal",
                            "start": 36,
                            "end": 37,
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "kind": "var"
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 52,
                      "end": 56,
                      "expression": {
                        "type": "CallExpression",
                        "start": 52,
                        "end": 55,
                        "callee": {
                          "type": "Identifier",
                          "start": 52,
                          "end": 53,
                          "name": "c"
                        },
                        "arguments": []
                      }
                    },
                    {
                      "type": "VariableDeclaration",
                      "start": 69,
                      "end": 81,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 73,
                          "end": 80,
                          "id": {
                            "type": "Identifier",
                            "start": 73,
                            "end": 74,
                            "name": "d"
                          },
                          "init": {
                            "type": "Literal",
                            "start": 78,
                            "end": 79,
                            "value": 2,
                            "raw": "2"
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

    it('should parse complex 29"', () => {
        expect(parseScript(`((function () {
            (null) != (a, (1));
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 64,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 64,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 62,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 59,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 59,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 28,
                          "end": 47,
                          "expression": {
                            "type": "BinaryExpression",
                            "start": 28,
                            "end": 46,
                            "left": {
                              "type": "Literal",
                              "start": 29,
                              "end": 33,
                              "value": null,
                              "raw": "null"
                            },
                            "operator": "!=",
                            "right": {
                              "type": "SequenceExpression",
                              "start": 39,
                              "end": 45,
                              "expressions": [
                                {
                                  "type": "Identifier",
                                  "start": 39,
                                  "end": 40,
                                  "name": "a"
                                },
                                {
                                  "type": "Literal",
                                  "start": 43,
                                  "end": 44,
                                  "value": 1,
                                  "raw": "1"
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "var [a, a] = (1);"', () => {
        expect(parseScript(`var [a, a] = (1);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 17,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 16,
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 10,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "name": "a"
                        },
                        {
                          "type": "Identifier",
                          "start": 8,
                          "end": 9,
                          "name": "a"
                        }
                      ]
                    },
                    "init": {
                      "type": "Literal",
                      "start": 14,
                      "end": 15,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({*[yield]() {}});"', () => {
        expect(parseScript('({*[yield]() {}});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 16,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 15,
                      "method": true,
                      "shorthand": false,
                      "computed": true,
                      "key": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 9,
                        "name": "yield"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 10,
                        "end": 15,
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 13,
                          "end": 15,
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

    it('should parse complex arrow', () => {
        expect(parseScript(`a => {
            1;
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 34,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 33,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 33,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 19,
                        "end": 21,
                        "expression": {
                          "type": "Literal",
                          "start": 19,
                          "end": 20,
                          "value": 1,
                          "raw": "1"
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

    it('should parse "((a.b).c)(1);"', () => {
        expect(parseScript('((a.b).c)(1);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 12,
                  "callee": {
                    "type": "MemberExpression",
                    "start": 1,
                    "end": 8,
                    "object": {
                      "type": "MemberExpression",
                      "start": 2,
                      "end": 5,
                      "object": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "b"
                      },
                      "computed": false
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "name": "c"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 10,
                      "end": 11,
                      "value": 1,
                      "raw": "1"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a ? (1) : (2);"', () => {
        expect(parseScript('a ? (1) : (2);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ConditionalExpression",
                  "start": 0,
                  "end": 13,
                  "test": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "consequent": {
                    "type": "Literal",
                    "start": 5,
                    "end": 6,
                    "value": 1,
                    "raw": "1"
                  },
                  "alternate": {
                    "type": "Literal",
                    "start": 11,
                    "end": 12,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "while ((a--) > (1)) {}"', () => {
        expect(parseScript('while ((a--) > (1)) {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "WhileStatement",
                "start": 0,
                "end": 22,
                "test": {
                  "type": "BinaryExpression",
                  "start": 7,
                  "end": 18,
                  "left": {
                    "type": "UpdateExpression",
                    "start": 8,
                    "end": 11,
                    "operator": "--",
                    "prefix": false,
                    "argument": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "name": "a"
                    }
                  },
                  "operator": ">",
                  "right": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "value": 1,
                    "raw": "1"
                  }
                },
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

    it('should parse "({a(b = new.target) {}});"', () => {
        expect(parseScript('({a(b = new.target) {}});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 23,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 22,
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 3,
                        "end": 22,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 4,
                            "end": 18,
                            "left": {
                              "type": "Identifier",
                              "start": 4,
                              "end": 5,
                              "name": "b"
                            },
                            "right": {
                              "type": "MetaProperty",
                              "start": 8,
                              "end": 18,
                              "meta": {
                                "type": "Identifier",
                                "start": 8,
                                "end": 11,
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 12,
                                "end": 18,
                                "name": "target"
                              }
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 20,
                          "end": 22,
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
   

    it('should parse "({a: b, c}, [d, e], ...f) => {};"', () => {
        expect(parseScript('({a: b, c}, [d, e], ...f) => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 31,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 10,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 6,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "name": "a"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "name": "b"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 9,
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "c"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "c"
                          }
                        }
                      ]
                    },
                    {
                      "type": "ArrayPattern",
                      "start": 12,
                      "end": 18,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 13,
                          "end": 14,
                          "name": "d"
                        },
                        {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "e"
                        }
                      ]
                    },
                    {
                      "type": "RestElement",
                      "start": 20,
                      "end": 24,
                      "argument": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 24,
                        "name": "f"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 29,
                    "end": 31,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a.false;"', () => {
        expect(parseScript('a.false;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "MemberExpression",
                  "start": 0,
                  "end": 7,
                  "object": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 2,
                    "end": 7,
                    "name": "false"
                  },
                  "computed": false
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse stupid arrow', () => {
        expect(parseScript(`;
        (a--) > (1);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "EmptyStatement",
                "start": 0,
                "end": 1
              },
              {
                "type": "ExpressionStatement",
                "start": 10,
                "end": 22,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 10,
                  "end": 21,
                  "left": {
                    "type": "UpdateExpression",
                    "start": 11,
                    "end": 14,
                    "operator": "--",
                    "prefix": false,
                    "argument": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "a"
                    }
                  },
                  "operator": ">",
                  "right": {
                    "type": "Literal",
                    "start": 19,
                    "end": 20,
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({let});"', () => {
        expect(parseScript('({let});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 6,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 5,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 5,
                        "name": "let"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 5,
                        "name": "let"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({set a (eval) {}});"', () => {
        expect(parseScript('({set a (eval) {}});', {
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
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 18,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 17,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 8,
                        "end": 17,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 9,
                            "end": 13,
                            "name": "eval"
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
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 31', () => {
        expect(parseScript(`(((function () {
            return true;
          })()) ? ((a.b)(true)) : ((a.b)(false)));`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 92,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 92,
                "expression": {
                  "type": "ConditionalExpression",
                  "start": 1,
                  "end": 90,
                  "test": {
                    "type": "CallExpression",
                    "start": 2,
                    "end": 56,
                    "callee": {
                      "type": "FunctionExpression",
                      "start": 3,
                      "end": 53,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 15,
                        "end": 53,
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 29,
                            "end": 41,
                            "argument": {
                              "type": "Literal",
                              "start": 36,
                              "end": 40,
                              "value": true,
                              "raw": "true"
                            }
                          }
                        ]
                      }
                    },
                    "arguments": []
                  },
                  "consequent": {
                    "type": "CallExpression",
                    "start": 61,
                    "end": 72,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 62,
                      "end": 65,
                      "object": {
                        "type": "Identifier",
                        "start": 62,
                        "end": 63,
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 64,
                        "end": 65,
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 67,
                        "end": 71,
                        "value": true,
                        "raw": "true"
                      }
                    ]
                  },
                  "alternate": {
                    "type": "CallExpression",
                    "start": 77,
                    "end": 89,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 78,
                      "end": 81,
                      "object": {
                        "type": "Identifier",
                        "start": 78,
                        "end": 79,
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 80,
                        "end": 81,
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 83,
                        "end": 88,
                        "value": false,
                        "raw": "false"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(() => (null))();"', () => {
        expect(parseScript('(() => (null))();', {
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
                  "type": "CallExpression",
                  "start": 0,
                  "end": 16,
                  "callee": {
                    "type": "ArrowFunctionExpression",
                    "start": 1,
                    "end": 13,
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "Literal",
                      "start": 8,
                      "end": 12,
                      "value": null,
                      "raw": "null"
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex 33', () => {
        expect(parseScript(`((function () {
            var a = (1);
            ((function () {
              eval("");
            })());
          })());`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 128,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 128,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 126,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 2,
                    "end": 123,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 123,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 28,
                          "end": 40,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 32,
                              "end": 39,
                              "id": {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "a"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 37,
                                "end": 38,
                                "value": 1,
                                "raw": "1"
                              }
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 53,
                          "end": 111,
                          "expression": {
                            "type": "CallExpression",
                            "start": 54,
                            "end": 109,
                            "callee": {
                              "type": "FunctionExpression",
                              "start": 55,
                              "end": 106,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 67,
                                "end": 106,
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "start": 83,
                                    "end": 92,
                                    "expression": {
                                      "type": "CallExpression",
                                      "start": 83,
                                      "end": 91,
                                      "callee": {
                                        "type": "Identifier",
                                        "start": 83,
                                        "end": 87,
                                        "name": "eval"
                                      },
                                      "arguments": [
                                        {
                                          "type": "Literal",
                                          "start": 88,
                                          "end": 90,
                                          "value": "",
                                          "raw": "\"\""
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a = ({a: 1, a: 2});"', () => {
        expect(parseScript('a = ({a: 1, a: 2});', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 18,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 5,
                    "end": 17,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 6,
                        "end": 10,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "a"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 9,
                          "end": 10,
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 12,
                        "end": 16,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "name": "a"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 15,
                          "end": 16,
                          "value": 2,
                          "raw": "2"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(a ^ b) ^ c;"', () => {
        expect(parseScript('(a ^ b) ^ c;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 11,
                  "left": {
                    "type": "BinaryExpression",
                    "start": 1,
                    "end": 6,
                    "left": {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "name": "a"
                    },
                    "operator": "^",
                    "right": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "b"
                    }
                  },
                  "operator": "^",
                  "right": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "c"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    

    it('should parse "function a({b} = {b: 1}) {}"', () => {
      expect(parseScript('function a({b} = {b: 1}) {}', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 27,
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 27,
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
                "end": 23,
                "left": {
                  "type": "ObjectPattern",
                  "start": 11,
                  "end": 14,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 12,
                      "end": 13,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 12,
                        "end": 13,
                        "name": "b"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 12,
                        "end": 13,
                        "name": "b"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 17,
                  "end": 23,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 18,
                      "end": 22,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "name": "b"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 21,
                        "end": 22,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 25,
              "end": 27,
              "body": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse ""use strict"; var a = ({0: "b"});"', () => {
      expect(parseScript('"use strict"; var a = ({0: "b"});', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 33,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 13,
            "expression": {
              "type": "Literal",
              "start": 0,
              "end": 12,
              "value": "use strict",
              "raw": "\"use strict\""
            }
          },
          {
            "type": "VariableDeclaration",
            "start": 14,
            "end": 33,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 18,
                "end": 32,
                "id": {
                  "type": "Identifier",
                  "start": 18,
                  "end": 19,
                  "name": "a"
                },
                "init": {
                  "type": "ObjectExpression",
                  "start": 23,
                  "end": 31,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 24,
                      "end": 30,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 24,
                        "end": 25,
                        "value": 0,
                        "raw": "0"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 27,
                        "end": 30,
                        "value": "b",
                        "raw": "\"b\""
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(a ^ b) ^ c;"', () => {
      expect(parseScript(`void (((function () {
        var a;
        a = (function () {
          return 1;
        });
      }).b)(this));`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 115,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 115,
            "expression": {
              "type": "UnaryExpression",
              "start": 0,
              "end": 114,
              "operator": "void",
              "prefix": true,
              "argument": {
                "type": "CallExpression",
                "start": 6,
                "end": 113,
                "callee": {
                  "type": "MemberExpression",
                  "start": 7,
                  "end": 106,
                  "object": {
                    "type": "FunctionExpression",
                    "start": 8,
                    "end": 103,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 20,
                      "end": 103,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 30,
                          "end": 36,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 34,
                              "end": 35,
                              "id": {
                                "type": "Identifier",
                                "start": 34,
                                "end": 35,
                                "name": "a"
                              },
                              "init": null
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 45,
                          "end": 95,
                          "expression": {
                            "type": "AssignmentExpression",
                            "start": 45,
                            "end": 94,
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "start": 45,
                              "end": 46,
                              "name": "a"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 50,
                              "end": 93,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 62,
                                "end": 93,
                                "body": [
                                  {
                                    "type": "ReturnStatement",
                                    "start": 74,
                                    "end": 83,
                                    "argument": {
                                      "type": "Literal",
                                      "start": 81,
                                      "end": 82,
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 105,
                    "end": 106,
                    "name": "b"
                  },
                  "computed": false
                },
                "arguments": [
                  {
                    "type": "ThisExpression",
                    "start": 108,
                    "end": 112
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "function x(...[a, b]) {}"', () => {
      expect(parseScript('function x(...[a, b]) {}', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 15,
                                    "end": 16
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 18,
                                    "end": 19
                                }
                            ],
                            "start": 14,
                            "end": 20
                        },
                        "start": 11,
                        "end": 20
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 22,
                    "end": 24
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "x",
                    "start": 9,
                    "end": 10
                },
                "start": 0,
                "end": 24
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 24
    });
    });

    it('should parse "[yield] = a;"', () => {
      expect(parseScript('[yield] = a;', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 12,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 12,
            "expression": {
              "type": "AssignmentExpression",
              "start": 0,
              "end": 11,
              "operator": "=",
              "left": {
                "type": "ArrayPattern",
                "start": 0,
                "end": 7,
                "elements": [
                  {
                    "type": "Identifier",
                    "start": 1,
                    "end": 6,
                    "name": "yield"
                  }
                ]
              },
              "right": {
                "type": "Identifier",
                "start": 10,
                "end": 11,
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "for (let a = (1), b = (2);;) ;"', () => {
      expect(parseScript('for (let a = (1), b = (2);;) ;', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 30,
        "body": [
          {
            "type": "ForStatement",
            "start": 0,
            "end": 30,
            "init": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 25,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 9,
                  "end": 16,
                  "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "name": "a"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 14,
                    "end": 15,
                    "value": 1,
                    "raw": "1"
                  }
                },
                {
                  "type": "VariableDeclarator",
                  "start": 18,
                  "end": 25,
                  "id": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 19,
                    "name": "b"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 23,
                    "end": 24,
                    "value": 2,
                    "raw": "2"
                  }
                }
              ],
              "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
              "type": "EmptyStatement",
              "start": 29,
              "end": 30
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(a ^ b) ^ c;"', () => {
      expect(parseScript(`for (;;) {
        if (a) {
          if (b) {
            continue;
          } else {
            ;
          }
        } else {
          ;
        }
      }`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 160,
        "body": [
          {
            "type": "ForStatement",
            "start": 0,
            "end": 160,
            "init": null,
            "test": null,
            "update": null,
            "body": {
              "type": "BlockStatement",
              "start": 9,
              "end": 160,
              "body": [
                {
                  "type": "IfStatement",
                  "start": 19,
                  "end": 152,
                  "test": {
                    "type": "Identifier",
                    "start": 23,
                    "end": 24,
                    "name": "a"
                  },
                  "consequent": {
                    "type": "BlockStatement",
                    "start": 26,
                    "end": 123,
                    "body": [
                      {
                        "type": "IfStatement",
                        "start": 38,
                        "end": 113,
                        "test": {
                          "type": "Identifier",
                          "start": 42,
                          "end": 43,
                          "name": "b"
                        },
                        "consequent": {
                          "type": "BlockStatement",
                          "start": 45,
                          "end": 80,
                          "body": [
                            {
                              "type": "ContinueStatement",
                              "start": 59,
                              "end": 68,
                              "label": null
                            }
                          ]
                        },
                        "alternate": {
                          "type": "BlockStatement",
                          "start": 86,
                          "end": 113,
                          "body": [
                            {
                              "type": "EmptyStatement",
                              "start": 100,
                              "end": 101
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "alternate": {
                    "type": "BlockStatement",
                    "start": 129,
                    "end": 152,
                    "body": [
                      {
                        "type": "EmptyStatement",
                        "start": 141,
                        "end": 142
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

    it('should parse "([, , ]) => (1);"', () => {
      expect(parseScript('([, , ]) => (1);', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 16,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 16,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 15,
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ArrayPattern",
                  "start": 1,
                  "end": 7,
                  "elements": [
                    null,
                    null
                  ]
                }
              ],
              "body": {
                "type": "Literal",
                "start": 13,
                "end": 14,
                "value": 1,
                "raw": "1"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(a ^ b) ^ c;"', () => {
      expect(parseScript(`((function () {
        for ((!(!(!a))) && (a()); (!(!(!b))) && (a()); (!(!(!b))) && (a())) {}
      })());`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 107,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 107,
            "expression": {
              "type": "CallExpression",
              "start": 1,
              "end": 105,
              "callee": {
                "type": "FunctionExpression",
                "start": 2,
                "end": 102,
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 102,
                  "body": [
                    {
                      "type": "ForStatement",
                      "start": 24,
                      "end": 94,
                      "init": {
                        "type": "LogicalExpression",
                        "start": 29,
                        "end": 48,
                        "left": {
                          "type": "UnaryExpression",
                          "start": 30,
                          "end": 38,
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                            "type": "UnaryExpression",
                            "start": 32,
                            "end": 37,
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                              "type": "UnaryExpression",
                              "start": 34,
                              "end": 36,
                              "operator": "!",
                              "prefix": true,
                              "argument": {
                                "type": "Identifier",
                                "start": 35,
                                "end": 36,
                                "name": "a"
                              }
                            }
                          }
                        },
                        "operator": "&&",
                        "right": {
                          "type": "CallExpression",
                          "start": 44,
                          "end": 47,
                          "callee": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 45,
                            "name": "a"
                          },
                          "arguments": []
                        }
                      },
                      "test": {
                        "type": "LogicalExpression",
                        "start": 50,
                        "end": 69,
                        "left": {
                          "type": "UnaryExpression",
                          "start": 51,
                          "end": 59,
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                            "type": "UnaryExpression",
                            "start": 53,
                            "end": 58,
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                              "type": "UnaryExpression",
                              "start": 55,
                              "end": 57,
                              "operator": "!",
                              "prefix": true,
                              "argument": {
                                "type": "Identifier",
                                "start": 56,
                                "end": 57,
                                "name": "b"
                              }
                            }
                          }
                        },
                        "operator": "&&",
                        "right": {
                          "type": "CallExpression",
                          "start": 65,
                          "end": 68,
                          "callee": {
                            "type": "Identifier",
                            "start": 65,
                            "end": 66,
                            "name": "a"
                          },
                          "arguments": []
                        }
                      },
                      "update": {
                        "type": "LogicalExpression",
                        "start": 71,
                        "end": 90,
                        "left": {
                          "type": "UnaryExpression",
                          "start": 72,
                          "end": 80,
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                            "type": "UnaryExpression",
                            "start": 74,
                            "end": 79,
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                              "type": "UnaryExpression",
                              "start": 76,
                              "end": 78,
                              "operator": "!",
                              "prefix": true,
                              "argument": {
                                "type": "Identifier",
                                "start": 77,
                                "end": 78,
                                "name": "b"
                              }
                            }
                          }
                        },
                        "operator": "&&",
                        "right": {
                          "type": "CallExpression",
                          "start": 86,
                          "end": 89,
                          "callee": {
                            "type": "Identifier",
                            "start": 86,
                            "end": 87,
                            "name": "a"
                          },
                          "arguments": []
                        }
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 92,
                        "end": 94,
                        "body": []
                      }
                    }
                  ]
                }
              },
              "arguments": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "({0: a, 1: a} = (1));"', () => {
      expect(parseScript('({0: a, 1: a} = (1));', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 21,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 21,
            "expression": {
              "type": "AssignmentExpression",
              "start": 1,
              "end": 19,
              "operator": "=",
              "left": {
                "type": "ObjectPattern",
                "start": 1,
                "end": 13,
                "properties": [
                  {
                    "type": "Property",
                    "start": 2,
                    "end": 6,
                    "method": false,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Literal",
                      "start": 2,
                      "end": 3,
                      "value": 0,
                      "raw": "0"
                    },
                    "value": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "a"
                    },
                    "kind": "init"
                  },
                  {
                    "type": "Property",
                    "start": 8,
                    "end": 12,
                    "method": false,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Literal",
                      "start": 8,
                      "end": 9,
                      "value": 1,
                      "raw": "1"
                    },
                    "value": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "a"
                    },
                    "kind": "init"
                  }
                ]
              },
              "right": {
                "type": "Literal",
                "start": 17,
                "end": 18,
                "value": 1,
                "raw": "1"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "({a: b} = (0));"', () => {
      expect(parseScript('({a: b} = (0));', {
          ranges: true,
          raw: true
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
              "type": "AssignmentExpression",
              "start": 1,
              "end": 13,
              "operator": "=",
              "left": {
                "type": "ObjectPattern",
                "start": 1,
                "end": 7,
                "properties": [
                  {
                    "type": "Property",
                    "start": 2,
                    "end": 6,
                    "method": false,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 2,
                      "end": 3,
                      "name": "a"
                    },
                    "value": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "name": "b"
                    },
                    "kind": "init"
                  }
                ]
              },
              "right": {
                "type": "Literal",
                "start": 11,
                "end": 12,
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(a ^ b) ^ c;"', () => {
      expect(parseScript(`((function () {
        var a = (1);
        arguments[2] = (3);
        ((function () {
          eval("");
        })());
      })());`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 136,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 136,
            "expression": {
              "type": "CallExpression",
              "start": 1,
              "end": 134,
              "callee": {
                "type": "FunctionExpression",
                "start": 2,
                "end": 131,
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 131,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 24,
                      "end": 36,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 28,
                          "end": 35,
                          "id": {
                            "type": "Identifier",
                            "start": 28,
                            "end": 29,
                            "name": "a"
                          },
                          "init": {
                            "type": "Literal",
                            "start": 33,
                            "end": 34,
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "kind": "var"
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 45,
                      "end": 64,
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 45,
                        "end": 63,
                        "operator": "=",
                        "left": {
                          "type": "MemberExpression",
                          "start": 45,
                          "end": 57,
                          "object": {
                            "type": "Identifier",
                            "start": 45,
                            "end": 54,
                            "name": "arguments"
                          },
                          "property": {
                            "type": "Literal",
                            "start": 55,
                            "end": 56,
                            "value": 2,
                            "raw": "2"
                          },
                          "computed": true
                        },
                        "right": {
                          "type": "Literal",
                          "start": 61,
                          "end": 62,
                          "value": 3,
                          "raw": "3"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 73,
                      "end": 123,
                      "expression": {
                        "type": "CallExpression",
                        "start": 74,
                        "end": 121,
                        "callee": {
                          "type": "FunctionExpression",
                          "start": 75,
                          "end": 118,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 87,
                            "end": 118,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 99,
                                "end": 108,
                                "expression": {
                                  "type": "CallExpression",
                                  "start": 99,
                                  "end": 107,
                                  "callee": {
                                    "type": "Identifier",
                                    "start": 99,
                                    "end": 103,
                                    "name": "eval"
                                  },
                                  "arguments": [
                                    {
                                      "type": "Literal",
                                      "start": 104,
                                      "end": 106,
                                      "value": "",
                                      "raw": "\"\""
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              "arguments": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "for (const a of b) c(a);"', () => {
      expect(parseScript('for (const a of b) c(a);', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 24,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 0,
            "end": 24,
            "await":  false,
            "left": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 12,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 11,
                  "end": 12,
                  "id": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "a"
                  },
                  "init": null
                }
              ],
              "kind": "const"
            },
            "right": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "b"
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 19,
              "end": 24,
              "expression": {
                "type": "CallExpression",
                "start": 19,
                "end": 23,
                "callee": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "name": "c"
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 21,
                    "end": 22,
                    "name": "a"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "with (1) ;"', () => {
      expect(parseScript('with (1) ;', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 10,
        "body": [
          {
            "type": "WithStatement",
            "start": 0,
            "end": 10,
            "object": {
              "type": "Literal",
              "start": 6,
              "end": 7,
              "value": 1,
              "raw": "1"
            },
            "body": {
              "type": "EmptyStatement",
              "start": 9,
              "end": 10
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "[a = (0)];"', () => {
      expect(parseScript('[a = (0)];', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 10,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 10,
            "expression": {
              "type": "ArrayExpression",
              "start": 0,
              "end": 9,
              "elements": [
                {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 8,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 1,
                    "end": 2,
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 6,
                    "end": 7,
                    "value": 0,
                    "raw": "0"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "let {a} = (b);"', () => {
      expect(parseScript('let {a} = (b);', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 14,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 14,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 4,
                "end": 13,
                "id": {
                  "type": "ObjectPattern",
                  "start": 4,
                  "end": 7,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 5,
                      "end": 6,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "name": "a"
                      }
                    }
                  ]
                },
                "init": {
                  "type": "Identifier",
                  "start": 11,
                  "end": 12,
                  "name": "b"
                }
              }
            ],
            "kind": "let"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "a => ((b, c) => ((a, b), c));"', () => {
      expect(parseScript('a => ((b, c) => ((a, b), c));', {
          ranges: true,
          raw: true,
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 29,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 29,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 28,
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 0,
                  "end": 1,
                  "name": "a"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 6,
                "end": 27,
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 7,
                    "end": 8,
                    "name": "b"
                  },
                  {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "SequenceExpression",
                  "start": 17,
                  "end": 26,
                  "expressions": [
                    {
                      "type": "SequenceExpression",
                      "start": 18,
                      "end": 22,
                      "expressions": [
                        {
                          "type": "Identifier",
                          "start": 18,
                          "end": 19,
                          "name": "a"
                        },
                        {
                          "type": "Identifier",
                          "start": 21,
                          "end": 22,
                          "name": "b"
                        }
                      ]
                    },
                    {
                      "type": "Identifier",
                      "start": 25,
                      "end": 26,
                      "name": "c"
                    }
                  ]
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });
});