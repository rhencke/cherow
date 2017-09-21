import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('CPN - object', () => {

    it('should parse getter duplicates', () => {
        expect(parseScript(`var A = {
            get ['a']() {
              return 'A';
            }
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 88,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 87,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "A"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 8,
                      "end": 87,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 75,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 27,
                            "end": 30,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 31,
                            "end": 75,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 34,
                              "end": 75,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 50,
                                  "end": 61,
                                  "argument": {
                                    "type": "Literal",
                                    "start": 57,
                                    "end": 60,
                                    "value": "A",
                                    "raw": "'A'"
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

    
    it('should parse getter super', () => {
        expect(parseScript(`var object = {
            get ['a']() { return 'a' + super.m(); },
            get [ID('b')]() { return 'b' + super.m(); },
            get [0]() { return '0' + super.m(); },
            get [ID(1)]() { return '1' + super.m(); },
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 243,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 243,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 242,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 242,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 66,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 32,
                            "end": 35,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 36,
                            "end": 66,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 39,
                              "end": 66,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 41,
                                  "end": 64,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 48,
                                    "end": 63,
                                    "left": {
                                      "type": "Literal",
                                      "start": 48,
                                      "end": 51,
                                      "value": "a",
                                      "raw": "'a'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 54,
                                      "end": 63,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 54,
                                        "end": 61,
                                        "object": {
                                          "type": "Super",
                                          "start": 54,
                                          "end": 59
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 60,
                                          "end": 61,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 80,
                          "end": 123,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 85,
                            "end": 92,
                            "callee": {
                              "type": "Identifier",
                              "start": 85,
                              "end": 87,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 88,
                                "end": 91,
                                "value": "b",
                                "raw": "'b'"
                              }
                            ]
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 93,
                            "end": 123,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 96,
                              "end": 123,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 98,
                                  "end": 121,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 105,
                                    "end": 120,
                                    "left": {
                                      "type": "Literal",
                                      "start": 105,
                                      "end": 108,
                                      "value": "b",
                                      "raw": "'b'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 111,
                                      "end": 120,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 111,
                                        "end": 118,
                                        "object": {
                                          "type": "Super",
                                          "start": 111,
                                          "end": 116
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 117,
                                          "end": 118,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 137,
                          "end": 174,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 142,
                            "end": 143,
                            "value": 0,
                            "raw": "0"
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 144,
                            "end": 174,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 147,
                              "end": 174,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 149,
                                  "end": 172,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 156,
                                    "end": 171,
                                    "left": {
                                      "type": "Literal",
                                      "start": 156,
                                      "end": 159,
                                      "value": "0",
                                      "raw": "'0'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 162,
                                      "end": 171,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 162,
                                        "end": 169,
                                        "object": {
                                          "type": "Super",
                                          "start": 162,
                                          "end": 167
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 168,
                                          "end": 169,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 188,
                          "end": 229,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 193,
                            "end": 198,
                            "callee": {
                              "type": "Identifier",
                              "start": 193,
                              "end": 195,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 196,
                                "end": 197,
                                "value": 1,
                                "raw": "1"
                              }
                            ]
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 199,
                            "end": 229,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 202,
                              "end": 229,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 204,
                                  "end": 227,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 211,
                                    "end": 226,
                                    "left": {
                                      "type": "Literal",
                                      "start": 211,
                                      "end": 214,
                                      "value": "1",
                                      "raw": "'1'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 217,
                                      "end": 226,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 217,
                                        "end": 224,
                                        "object": {
                                          "type": "Super",
                                          "start": 217,
                                          "end": 222
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 223,
                                          "end": 224,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
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
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse getter', () => {
        expect(parseScript(`var A = {
            get ["a"]() {
              return "A";
            }
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 88,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 87,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "A"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 8,
                      "end": 87,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 75,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 27,
                            "end": 30,
                            "value": "a",
                            "raw": "\"a\""
                          },
                          "kind": "get",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 31,
                            "end": 75,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 34,
                              "end": 75,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 50,
                                  "end": 61,
                                  "argument": {
                                    "type": "Literal",
                                    "start": 57,
                                    "end": 60,
                                    "value": "A",
                                    "raw": "\"A\""
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

    it('should parse setter super', () => {
        expect(parseScript(`var object = {
            set ['a'](v) { super.m('a', v); },
            set [ID('b')](v) { super.m('b', v); },
            set [0](v) { super.m('0', v); },
            set [ID(1)](v) { super.m('1', v); },
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 219,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 219,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 218,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 218,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 60,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 32,
                            "end": 35,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 36,
                            "end": 60,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 37,
                                "end": 38,
                                "name": "v"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 40,
                              "end": 60,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 42,
                                  "end": 58,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 42,
                                    "end": 57,
                                    "callee": {
                                      "type": "MemberExpression",
                                      "start": 42,
                                      "end": 49,
                                      "object": {
                                        "type": "Super",
                                        "start": 42,
                                        "end": 47
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 48,
                                        "end": 49,
                                        "name": "m"
                                      },
                                      "computed": false
                                    },
                                    "arguments": [
                                      {
                                        "type": "Literal",
                                        "start": 50,
                                        "end": 53,
                                        "value": "a",
                                        "raw": "'a'"
                                      },
                                      {
                                        "type": "Identifier",
                                        "start": 55,
                                        "end": 56,
                                        "name": "v"
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 74,
                          "end": 111,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 79,
                            "end": 86,
                            "callee": {
                              "type": "Identifier",
                              "start": 79,
                              "end": 81,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 82,
                                "end": 85,
                                "value": "b",
                                "raw": "'b'"
                              }
                            ]
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 87,
                            "end": 111,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 88,
                                "end": 89,
                                "name": "v"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 91,
                              "end": 111,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 93,
                                  "end": 109,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 93,
                                    "end": 108,
                                    "callee": {
                                      "type": "MemberExpression",
                                      "start": 93,
                                      "end": 100,
                                      "object": {
                                        "type": "Super",
                                        "start": 93,
                                        "end": 98
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 99,
                                        "end": 100,
                                        "name": "m"
                                      },
                                      "computed": false
                                    },
                                    "arguments": [
                                      {
                                        "type": "Literal",
                                        "start": 101,
                                        "end": 104,
                                        "value": "b",
                                        "raw": "'b'"
                                      },
                                      {
                                        "type": "Identifier",
                                        "start": 106,
                                        "end": 107,
                                        "name": "v"
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 125,
                          "end": 156,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 130,
                            "end": 131,
                            "value": 0,
                            "raw": "0"
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 132,
                            "end": 156,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 133,
                                "end": 134,
                                "name": "v"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 136,
                              "end": 156,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 138,
                                  "end": 154,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 138,
                                    "end": 153,
                                    "callee": {
                                      "type": "MemberExpression",
                                      "start": 138,
                                      "end": 145,
                                      "object": {
                                        "type": "Super",
                                        "start": 138,
                                        "end": 143
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 144,
                                        "end": 145,
                                        "name": "m"
                                      },
                                      "computed": false
                                    },
                                    "arguments": [
                                      {
                                        "type": "Literal",
                                        "start": 146,
                                        "end": 149,
                                        "value": "0",
                                        "raw": "'0'"
                                      },
                                      {
                                        "type": "Identifier",
                                        "start": 151,
                                        "end": 152,
                                        "name": "v"
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 170,
                          "end": 205,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 175,
                            "end": 180,
                            "callee": {
                              "type": "Identifier",
                              "start": 175,
                              "end": 177,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 178,
                                "end": 179,
                                "value": 1,
                                "raw": "1"
                              }
                            ]
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 181,
                            "end": 205,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 182,
                                "end": 183,
                                "name": "v"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 185,
                              "end": 205,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 187,
                                  "end": 203,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 187,
                                    "end": 202,
                                    "callee": {
                                      "type": "MemberExpression",
                                      "start": 187,
                                      "end": 194,
                                      "object": {
                                        "type": "Super",
                                        "start": 187,
                                        "end": 192
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 193,
                                        "end": 194,
                                        "name": "m"
                                      },
                                      "computed": false
                                    },
                                    "arguments": [
                                      {
                                        "type": "Literal",
                                        "start": 195,
                                        "end": 198,
                                        "value": "1",
                                        "raw": "'1'"
                                      },
                                      {
                                        "type": "Identifier",
                                        "start": 200,
                                        "end": 201,
                                        "name": "v"
                                      }
                                    ]
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

    it('should parse setter', () => {
        expect(parseScript(`var A = {
            set ['a'](_) {
            }
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 63,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 63,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 62,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "A"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 8,
                      "end": 62,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 50,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 27,
                            "end": 30,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 31,
                            "end": 50,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 32,
                                "end": 33,
                                "name": "_"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 35,
                              "end": 50,
                              "body": []
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

    it('should parse generator', () => {
        expect(parseScript(`var object = {
            *['a']() {
              yield 1;
              yield 2;
            }
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 110,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 110,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 109,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 109,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 97,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 29,
                            "end": 32,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 33,
                            "end": 97,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 36,
                              "end": 97,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 52,
                                  "end": 60,
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 52,
                                    "end": 59,
                                    "delegate": false,
                                    "argument": {
                                      "type": "Literal",
                                      "start": 58,
                                      "end": 59,
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                },
                                {
                                  "type": "ExpressionStatement",
                                  "start": 75,
                                  "end": 83,
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 75,
                                    "end": 82,
                                    "delegate": false,
                                    "argument": {
                                      "type": "Literal",
                                      "start": 81,
                                      "end": 82,
                                      "value": 2,
                                      "raw": "2"
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
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse super', () => {
        expect(parseScript(`var object = {
            ['a']() { return 'a' + super.m(); },
            [ID('b')]() { return 'b' + super.m(); },
            [0]() { return '0' + super.m(); },
            [ID(1)]() { return '1' + super.m(); },
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 227,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 227,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 226,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 226,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 62,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 28,
                            "end": 31,
                            "value": "a",
                            "raw": "'a'"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 32,
                            "end": 62,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 35,
                              "end": 62,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 37,
                                  "end": 60,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 44,
                                    "end": 59,
                                    "left": {
                                      "type": "Literal",
                                      "start": 44,
                                      "end": 47,
                                      "value": "a",
                                      "raw": "'a'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 50,
                                      "end": 59,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 50,
                                        "end": 57,
                                        "object": {
                                          "type": "Super",
                                          "start": 50,
                                          "end": 55
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 56,
                                          "end": 57,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 76,
                          "end": 115,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 77,
                            "end": 84,
                            "callee": {
                              "type": "Identifier",
                              "start": 77,
                              "end": 79,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 80,
                                "end": 83,
                                "value": "b",
                                "raw": "'b'"
                              }
                            ]
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 85,
                            "end": 115,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 88,
                              "end": 115,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 90,
                                  "end": 113,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 97,
                                    "end": 112,
                                    "left": {
                                      "type": "Literal",
                                      "start": 97,
                                      "end": 100,
                                      "value": "b",
                                      "raw": "'b'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 103,
                                      "end": 112,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 103,
                                        "end": 110,
                                        "object": {
                                          "type": "Super",
                                          "start": 103,
                                          "end": 108
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 109,
                                          "end": 110,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 129,
                          "end": 162,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 130,
                            "end": 131,
                            "value": 0,
                            "raw": "0"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 132,
                            "end": 162,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 135,
                              "end": 162,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 137,
                                  "end": 160,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 144,
                                    "end": 159,
                                    "left": {
                                      "type": "Literal",
                                      "start": 144,
                                      "end": 147,
                                      "value": "0",
                                      "raw": "'0'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 150,
                                      "end": 159,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 150,
                                        "end": 157,
                                        "object": {
                                          "type": "Super",
                                          "start": 150,
                                          "end": 155
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 156,
                                          "end": 157,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 176,
                          "end": 213,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 177,
                            "end": 182,
                            "callee": {
                              "type": "Identifier",
                              "start": 177,
                              "end": 179,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 180,
                                "end": 181,
                                "value": 1,
                                "raw": "1"
                              }
                            ]
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 183,
                            "end": 213,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 186,
                              "end": 213,
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 188,
                                  "end": 211,
                                  "argument": {
                                    "type": "BinaryExpression",
                                    "start": 195,
                                    "end": 210,
                                    "left": {
                                      "type": "Literal",
                                      "start": 195,
                                      "end": 198,
                                      "value": "1",
                                      "raw": "'1'"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 201,
                                      "end": 210,
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 201,
                                        "end": 208,
                                        "object": {
                                          "type": "Super",
                                          "start": 201,
                                          "end": 206
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 207,
                                          "end": 208,
                                          "name": "m"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
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
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse property', () => {
        expect(parseScript(`var object = {
            [1.2]: 'A',
            [1e55]: 'B',
            [0.000001]: 'C',
            [-0]: 'D',
            [Infinity]: 'E',
            [-Infinity]: 'F',
            [NaN]: 'G',
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 211,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 211,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 210,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 210,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 37,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 28,
                            "end": 31,
                            "value": 1.2,
                            "raw": "1.2"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 34,
                            "end": 37,
                            "value": "A",
                            "raw": "'A'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 51,
                          "end": 62,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 52,
                            "end": 56,
                            "value": 1e+55,
                            "raw": "1e55"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 59,
                            "end": 62,
                            "value": "B",
                            "raw": "'B'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 76,
                          "end": 91,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 77,
                            "end": 85,
                            "value": 0.000001,
                            "raw": "0.000001"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 88,
                            "end": 91,
                            "value": "C",
                            "raw": "'C'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 105,
                          "end": 114,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "UnaryExpression",
                            "start": 106,
                            "end": 108,
                            "operator": "-",
                            "prefix": true,
                            "argument": {
                              "type": "Literal",
                              "start": 107,
                              "end": 108,
                              "value": 0,
                              "raw": "0"
                            }
                          },
                          "value": {
                            "type": "Literal",
                            "start": 111,
                            "end": 114,
                            "value": "D",
                            "raw": "'D'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 128,
                          "end": 143,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Identifier",
                            "start": 129,
                            "end": 137,
                            "name": "Infinity"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 140,
                            "end": 143,
                            "value": "E",
                            "raw": "'E'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 157,
                          "end": 173,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "UnaryExpression",
                            "start": 158,
                            "end": 167,
                            "operator": "-",
                            "prefix": true,
                            "argument": {
                              "type": "Identifier",
                              "start": 159,
                              "end": 167,
                              "name": "Infinity"
                            }
                          },
                          "value": {
                            "type": "Literal",
                            "start": 170,
                            "end": 173,
                            "value": "F",
                            "raw": "'F'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 187,
                          "end": 197,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Identifier",
                            "start": 188,
                            "end": 191,
                            "name": "NaN"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 194,
                            "end": 197,
                            "value": "G",
                            "raw": "'G'"
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
});