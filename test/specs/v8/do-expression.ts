import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('V8 - Do expression', () => {

    it('should parse conditional', () => {
        expect(parseScript(`let x = do {
            if (foo()) { f() }
            else if (bar()) { g() }
            else { h() }
          };`, {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "end": 116,
                      "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                      },
                      "init": {
                        "body": {
                          "body": [
                           {
                              "alternate": {
                                "alternate": {
                                  "body": [
                                    {
                                      "end": 102,
                                      "expression": {
                                       "arguments": [],
                                        "callee": {
                                          "end": 100,
                                          "name": "h",
                                        "start": 99,
                                          "type": "Identifier"
                                        },
                                       "end": 102,
                                        "start": 99,
                                        "type": "CallExpression"
                                      },
                                      "start": 99,
                                      "type": "ExpressionStatement"
                                    }
                                  ],
                                  "end": 104,
                                  "start": 97,
                                  "type": "BlockStatement"
                                },
                                "consequent": {
                                  "body": [
                                    {
                                      "end": 77,
                                      "expression": {
                                        "arguments": [],
                                        "callee": {
                                          "end": 75,
                                         "name": "g",
                                          "start": 74,
                                          "type": "Identifier"
                                        },
                                        "end": 77,
                                        "start": 74,
                                        "type": "CallExpression",
                                      },
                                      "start": 74,
                                      "type": "ExpressionStatement"
                                    }
                                  ],
                                  "end": 79,
                                  "start": 72,
                                  "type": "BlockStatement",
                                },
                                "end": 104,
                               "start": 61,
                                "test": {
                                  "arguments": [],
                                  "callee": {
                                    "end": 68,
                                    "name": "bar",
                                    "start": 65,
                                    "type": "Identifier",
                                  },
                                  "end": 70,
                                  "start": 65,
                                  "type": "CallExpression",
                                },
                                "type": "IfStatement",
                              },
                              "consequent": {
                                "body": [
                                  {
                                    "end": 41,
                                    "expression": {
                                      "arguments": [],
                                      "callee": {
                                        "end": 39,
                                        "name": "f",
                                        "start": 38,
                                        "type": "Identifier",
                                      },
                                      "end": 41,
                                      "start": 38,
                                      "type": "CallExpression"
                                    },
                                    "start": 38,
                                    "type": "ExpressionStatement"
                                  }
                                ],
                                "end": 43,
                                "start": 36,
                                "type": "BlockStatement"
                              },
                              "end": 104,
                              "start": 25,
                              "test": {
                                "arguments": [],
                                "callee": {
                                  "end": 32,
                                  "name": "foo",
                                  "start": 29,
                                  "type": "Identifier"
                                },
                                "end": 34,
                                "start": 29,
                                "type": "CallExpression"
                              },
                             "type": "IfStatement",
                            },
                          ],
                          "end": 116,
                          "start": 11,
                          "type": "BlockStatement",
                        },
                        "end": 116,
                        "start": 8,
                        "type": "DoExpression",
                      },
                     "start": 4,
                      "type": "VariableDeclarator",
                    },
                  ],
                  "end": 117,
                  "kind": "let",
                  "start": 0,
                  "type": "VariableDeclaration",
                },
              ],
              "end": 117,
             "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse scoping variable', () => {
        expect(parseScript(`let x = do {
            let tmp = f();
            tmp * tmp + 1
          };`, {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "DoExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "VariableDeclaration",
                                            "declarations": [
                                                {
                                                    "type": "VariableDeclarator",
                                                    "init": {
                                                        "type": "CallExpression",
                                                        "arguments": [],
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "f",
                                                            "start": 35,
                                                            "end": 36
                                                        },
                                                        "start": 35,
                                                        "end": 38
                                                    },
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 29,
                                                        "end": 32
                                                    },
                                                    "start": 29,
                                                    "end": 38
                                                }
                                            ],
                                            "kind": "let",
                                            "start": 25,
                                            "end": 39
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "BinaryExpression",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 52,
                                                        "end": 55
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 58,
                                                        "end": 61
                                                    },
                                                    "operator": "*",
                                                    "start": 52,
                                                    "end": 61
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 64,
                                                    "end": 65,
                                                    "raw": "1"
                                                },
                                                "operator": "+",
                                                "start": 52,
                                                "end": 65
                                            },
                                            "start": 52,
                                            "end": 65
                                        }
                                    ],
                                    "start": 11,
                                    "end": 77
                                },
                                "start": 8,
                                "end": 77
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 4,
                                "end": 5
                            },
                            "start": 4,
                            "end": 77
                        }
                    ],
                    "kind": "let",
                    "start": 0,
                    "end": 78
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 78
        });
    });

    it('should parse complex', () => {
        expect(parseScript(`let x = 100;
        let y = 20;
        
        let a = do {
          if(x > 10) {
            if(y > 20) {
              'big x, big y';
            } else {
              'big x, small y';
            }
          } else {
            if(y > 10) {
              'small x, big y';
            } else {
              'small x, small y';
            }
          }
        };`, {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 100,
                                "start": 8,
                                "end": 11,
                                "raw": "100"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 4,
                                "end": 5
                            },
                            "start": 4,
                            "end": 11
                        }
                    ],
                    "kind": "let",
                    "start": 0,
                    "end": 12
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 20,
                                "start": 29,
                                "end": 31,
                                "raw": "20"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 25,
                                "end": 26
                            },
                            "start": 25,
                            "end": 31
                        }
                    ],
                    "kind": "let",
                    "start": 21,
                    "end": 32
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "DoExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "IfStatement",
                                            "test": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 76,
                                                    "end": 77
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 10,
                                                    "start": 80,
                                                    "end": 82,
                                                    "raw": "10"
                                                },
                                                "operator": ">",
                                                "start": 76,
                                                "end": 82
                                            },
                                            "alternate": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 242,
                                                                "end": 243
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 10,
                                                                "start": 246,
                                                                "end": 248,
                                                                "raw": "10"
                                                            },
                                                            "operator": ">",
                                                            "start": 242,
                                                            "end": 248
                                                        },
                                                        "alternate": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "small x, small y",
                                                                        "start": 319,
                                                                        "end": 337,
                                                                        "raw": "'small x, small y'"
                                                                    },
                                                                    "start": 319,
                                                                    "end": 338
                                                                }
                                                            ],
                                                            "start": 303,
                                                            "end": 352
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "small x, big y",
                                                                        "start": 266,
                                                                        "end": 282,
                                                                        "raw": "'small x, big y'"
                                                                    },
                                                                    "start": 266,
                                                                    "end": 283
                                                                }
                                                            ],
                                                            "start": 250,
                                                            "end": 297
                                                        },
                                                        "start": 239,
                                                        "end": 352
                                                    }
                                                ],
                                                "start": 225,
                                                "end": 364
                                            },
                                            "consequent": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 101,
                                                                "end": 102
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 20,
                                                                "start": 105,
                                                                "end": 107,
                                                                "raw": "20"
                                                            },
                                                            "operator": ">",
                                                            "start": 101,
                                                            "end": 107
                                                        },
                                                        "alternate": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "big x, small y",
                                                                        "start": 176,
                                                                        "end": 192,
                                                                        "raw": "'big x, small y'"
                                                                    },
                                                                    "start": 176,
                                                                    "end": 193
                                                                }
                                                            ],
                                                            "start": 160,
                                                            "end": 207
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "big x, big y",
                                                                        "start": 125,
                                                                        "end": 139,
                                                                        "raw": "'big x, big y'"
                                                                    },
                                                                    "start": 125,
                                                                    "end": 140
                                                                }
                                                            ],
                                                            "start": 109,
                                                            "end": 154
                                                        },
                                                        "start": 98,
                                                        "end": 207
                                                    }
                                                ],
                                                "start": 84,
                                                "end": 219
                                            },
                                            "start": 73,
                                            "end": 364
                                        }
                                    ],
                                    "start": 61,
                                    "end": 374
                                },
                                "start": 58,
                                "end": 374
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 54,
                                "end": 55
                            },
                            "start": 54,
                            "end": 374
                        }
                    ],
                    "kind": "let",
                    "start": 50,
                    "end": 375
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 375
        });
    });

    it('should parse with JSX', () => {
        expect(parseScript(`function foo() {
            return (
              <nav>
                <Home />
                {
                  do {
                    if (loggedIn) {
                      <LogoutButton />
                    } else {
                      <LoginButton />
                    }
                  }
                }
              </nav>
            );
          }`, {
            ranges: true,
            raw: true,
            v8: true,
            jsx: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "JSXElement",
                                    "children": [
                                        {
                                            "type": "JSXText",
                                            "value": "\n                ",
                                            "start": 57,
                                            "end": 74,
                                            "raw": "\n                "
                                        },
                                        {
                                            "type": "JSXElement",
                                            "children": [],
                                            "openingElement": {
                                                "type": "JSXOpeningElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "Home",
                                                    "start": 75,
                                                    "end": 79
                                                },
                                                "attributes": [],
                                                "selfClosing": true,
                                                "start": 74,
                                                "end": 82
                                            },
                                            "closingElement": null,
                                            "start": 74,
                                            "end": 82
                                        },
                                        {
                                            "type": "JSXText",
                                            "value": "\n                ",
                                            "start": 82,
                                            "end": 99,
                                            "raw": "\n                "
                                        },
                                        {
                                            "type": "JSXExpressionContainer",
                                            "expression": {
                                                "type": "DoExpression",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [
                                                        {
                                                            "type": "IfStatement",
                                                            "test": {
                                                                "type": "Identifier",
                                                                "name": "loggedIn",
                                                                "start": 148,
                                                                "end": 156
                                                            },
                                                            "alternate": {
                                                                "type": "BlockStatement",
                                                                "body": [
                                                                    {
                                                                        "type": "ExpressionStatement",
                                                                        "expression": {
                                                                            "type": "JSXElement",
                                                                            "children": [],
                                                                            "openingElement": {
                                                                                "type": "JSXOpeningElement",
                                                                                "name": {
                                                                                    "type": "JSXIdentifier",
                                                                                    "name": "LoginButton",
                                                                                    "start": 251,
                                                                                    "end": 262
                                                                                },
                                                                                "attributes": [],
                                                                                "selfClosing": true,
                                                                                "start": 250,
                                                                                "end": 265
                                                                            },
                                                                            "closingElement": null,
                                                                            "start": 250,
                                                                            "end": 265
                                                                        },
                                                                        "start": 250,
                                                                        "end": 265
                                                                    }
                                                                ],
                                                                "start": 226,
                                                                "end": 287
                                                            },
                                                            "consequent": {
                                                                "type": "BlockStatement",
                                                                "body": [
                                                                    {
                                                                        "type": "ExpressionStatement",
                                                                        "expression": {
                                                                            "type": "JSXElement",
                                                                            "children": [],
                                                                            "openingElement": {
                                                                                "type": "JSXOpeningElement",
                                                                                "name": {
                                                                                    "type": "JSXIdentifier",
                                                                                    "name": "LogoutButton",
                                                                                    "start": 183,
                                                                                    "end": 195
                                                                                },
                                                                                "attributes": [],
                                                                                "selfClosing": true,
                                                                                "start": 182,
                                                                                "end": 198
                                                                            },
                                                                            "closingElement": null,
                                                                            "start": 182,
                                                                            "end": 198
                                                                        },
                                                                        "start": 182,
                                                                        "end": 198
                                                                    }
                                                                ],
                                                                "start": 158,
                                                                "end": 220
                                                            },
                                                            "start": 144,
                                                            "end": 287
                                                        }
                                                    ],
                                                    "start": 122,
                                                    "end": 307
                                                },
                                                "start": 119,
                                                "end": 307
                                            },
                                            "start": 99,
                                            "end": 325
                                        },
                                        {
                                            "type": "JSXText",
                                            "value": "\n              ",
                                            "start": 325,
                                            "end": 340,
                                            "raw": "\n              "
                                        }
                                    ],
                                    "openingElement": {
                                        "type": "JSXOpeningElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "nav",
                                            "start": 53,
                                            "end": 56
                                        },
                                        "attributes": [],
                                        "selfClosing": false,
                                        "start": 52,
                                        "end": 57
                                    },
                                    "closingElement": {
                                        "type": "JSXClosingElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "nav",
                                            "start": 342,
                                            "end": 345
                                        },
                                        "start": 340,
                                        "end": 346
                                    },
                                    "start": 52,
                                    "end": 346
                                },
                                "start": 29,
                                "end": 361
                            }
                        ],
                        "start": 15,
                        "end": 373
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "foo",
                        "start": 9,
                        "end": 12
                    },
                    "start": 0,
                    "end": 373
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 373
        });
    });

    it('should parse complex JSX', () => {
        expect(parseScript(`const Component = props =>
        <div className='myComponent'>
          {do {
            if(color === 'blue') { <BlueComponent/>; }
            else if(color === 'red') { <RedComponent/>; }
            else if(color === 'green') { <GreenComponent/>; }
          }}
        </div>
      ;`, {
            ranges: true,
            raw: true,
            v8: true,
            jsx: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ArrowFunctionExpression",
                                "id": null,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "props",
                                        "start": 18,
                                        "end": 23
                                    }
                                ],
                                "body": {
                                    "type": "JSXElement",
                                    "children": [
                                        {
                                            "type": "JSXText",
                                            "value": "\n          ",
                                            "start": 64,
                                            "end": 75,
                                            "raw": "\n          "
                                        },
                                        {
                                            "type": "JSXExpressionContainer",
                                            "expression": {
                                                "type": "DoExpression",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [
                                                        {
                                                            "type": "IfStatement",
                                                            "test": {
                                                                "type": "BinaryExpression",
                                                                "left": {
                                                                    "type": "Identifier",
                                                                    "name": "color",
                                                                    "start": 96,
                                                                    "end": 101
                                                                },
                                                                "right": {
                                                                    "type": "Literal",
                                                                    "value": "blue",
                                                                    "start": 106,
                                                                    "end": 112,
                                                                    "raw": "'blue'"
                                                                },
                                                                "operator": "===",
                                                                "start": 96,
                                                                "end": 112
                                                            },
                                                            "alternate": {
                                                                "type": "IfStatement",
                                                                "test": {
                                                                    "type": "BinaryExpression",
                                                                    "left": {
                                                                        "type": "Identifier",
                                                                        "name": "color",
                                                                        "start": 156,
                                                                        "end": 161
                                                                    },
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "value": "red",
                                                                        "start": 166,
                                                                        "end": 171,
                                                                        "raw": "'red'"
                                                                    },
                                                                    "operator": "===",
                                                                    "start": 156,
                                                                    "end": 171
                                                                },
                                                                "alternate": {
                                                                    "type": "IfStatement",
                                                                    "test": {
                                                                        "type": "BinaryExpression",
                                                                        "left": {
                                                                            "type": "Identifier",
                                                                            "name": "color",
                                                                            "start": 214,
                                                                            "end": 219
                                                                        },
                                                                        "right": {
                                                                            "type": "Literal",
                                                                            "value": "green",
                                                                            "start": 224,
                                                                            "end": 231,
                                                                            "raw": "'green'"
                                                                        },
                                                                        "operator": "===",
                                                                        "start": 214,
                                                                        "end": 231
                                                                    },
                                                                    "alternate": null,
                                                                    "consequent": {
                                                                        "type": "BlockStatement",
                                                                        "body": [
                                                                            {
                                                                                "type": "ExpressionStatement",
                                                                                "expression": {
                                                                                    "type": "JSXElement",
                                                                                    "children": [],
                                                                                    "openingElement": {
                                                                                        "type": "JSXOpeningElement",
                                                                                        "name": {
                                                                                            "type": "JSXIdentifier",
                                                                                            "name": "GreenComponent",
                                                                                            "start": 236,
                                                                                            "end": 250
                                                                                        },
                                                                                        "attributes": [],
                                                                                        "selfClosing": true,
                                                                                        "start": 235,
                                                                                        "end": 252
                                                                                    },
                                                                                    "closingElement": null,
                                                                                    "start": 235,
                                                                                    "end": 252
                                                                                },
                                                                                "start": 235,
                                                                                "end": 253
                                                                            }
                                                                        ],
                                                                        "start": 233,
                                                                        "end": 255
                                                                    },
                                                                    "start": 211,
                                                                    "end": 255
                                                                },
                                                                "consequent": {
                                                                    "type": "BlockStatement",
                                                                    "body": [
                                                                        {
                                                                            "type": "ExpressionStatement",
                                                                            "expression": {
                                                                                "type": "JSXElement",
                                                                                "children": [],
                                                                                "openingElement": {
                                                                                    "type": "JSXOpeningElement",
                                                                                    "name": {
                                                                                        "type": "JSXIdentifier",
                                                                                        "name": "RedComponent",
                                                                                        "start": 176,
                                                                                        "end": 188
                                                                                    },
                                                                                    "attributes": [],
                                                                                    "selfClosing": true,
                                                                                    "start": 175,
                                                                                    "end": 190
                                                                                },
                                                                                "closingElement": null,
                                                                                "start": 175,
                                                                                "end": 190
                                                                            },
                                                                            "start": 175,
                                                                            "end": 191
                                                                        }
                                                                    ],
                                                                    "start": 173,
                                                                    "end": 193
                                                                },
                                                                "start": 153,
                                                                "end": 255
                                                            },
                                                            "consequent": {
                                                                "type": "BlockStatement",
                                                                "body": [
                                                                    {
                                                                        "type": "ExpressionStatement",
                                                                        "expression": {
                                                                            "type": "JSXElement",
                                                                            "children": [],
                                                                            "openingElement": {
                                                                                "type": "JSXOpeningElement",
                                                                                "name": {
                                                                                    "type": "JSXIdentifier",
                                                                                    "name": "BlueComponent",
                                                                                    "start": 117,
                                                                                    "end": 130
                                                                                },
                                                                                "attributes": [],
                                                                                "selfClosing": true,
                                                                                "start": 116,
                                                                                "end": 132
                                                                            },
                                                                            "closingElement": null,
                                                                            "start": 116,
                                                                            "end": 132
                                                                        },
                                                                        "start": 116,
                                                                        "end": 133
                                                                    }
                                                                ],
                                                                "start": 114,
                                                                "end": 135
                                                            },
                                                            "start": 93,
                                                            "end": 255
                                                        }
                                                    ],
                                                    "start": 79,
                                                    "end": 267
                                                },
                                                "start": 76,
                                                "end": 267
                                            },
                                            "start": 75,
                                            "end": 268
                                        },
                                        {
                                            "type": "JSXText",
                                            "value": "\n        ",
                                            "start": 268,
                                            "end": 277,
                                            "raw": "\n        "
                                        }
                                    ],
                                    "openingElement": {
                                        "type": "JSXOpeningElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "div",
                                            "start": 36,
                                            "end": 39
                                        },
                                        "attributes": [
                                            {
                                                "type": "JSXAttribute",
                                                "value": {
                                                    "type": "Literal",
                                                    "value": "myComponent",
                                                    "start": 50,
                                                    "end": 63,
                                                    "raw": "'myComponent'"
                                                },
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "className",
                                                    "start": 40,
                                                    "end": 49
                                                },
                                                "start": 40,
                                                "end": 63
                                            }
                                        ],
                                        "selfClosing": false,
                                        "start": 35,
                                        "end": 64
                                    },
                                    "closingElement": {
                                        "type": "JSXClosingElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "div",
                                            "start": 279,
                                            "end": 282
                                        },
                                        "start": 277,
                                        "end": 283
                                    },
                                    "start": 35,
                                    "end": 283
                                },
                                "generator": false,
                                "expression": true,
                                "async": false,
                                "start": 18,
                                "end": 283
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "Component",
                                "start": 6,
                                "end": 15
                            },
                            "start": 6,
                            "end": 283
                        }
                    ],
                    "kind": "const",
                    "start": 0,
                    "end": 291
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 291
        });
    });
});