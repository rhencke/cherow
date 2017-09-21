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
});