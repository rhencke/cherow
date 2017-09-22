import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Default params', () => {
    
    it('should fail on "function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }"', () => {
        expect(() => {
            parseScript('function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }')
        }).to.throw()
    });
     
    it('should parse not strict eval', () => {
        expect(parseScript('(eval = 10) => 42;', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 18,
                  "expression": {
                    "body": {
                      "end": 17,
                      "raw": "42",
                     "start": 15,
                      "type": "Literal",
                      "value": 42
                    },
                    "end": 17,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [
                      {
                        "end": 10,
                        "left": {
                          "end": 5,
                          "name": "eval",
                          "start": 1,
                          "type": "Identifier"
                        },
                        "right": {
                          "end": 10,
                          "raw": "10",
                         "start": 8,
                          "type": "Literal",
                          "value": 10,
                        },
                        "start": 1,
                        "type": "AssignmentPattern"
                      }
                    ],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 18,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse default arrow parameter', () => {
        expect(parseScript('(x=1) => x * x;', {
            ranges: false,
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
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        ],
                        "body": {
                            "type": "BinaryExpression",
                            "operator": "*",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "x"
                            }
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

    it('should parse not all params', () => {
        expect(parseScript('var foo = function(a, b = 42, c) {};', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "init": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "b"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 42,
                                            "raw": "42"
                                        }
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            }
                        }
                    ],
                    "kind": "var"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse method', () => {
        expect(parseScript('x = { f: function(a=1) {} }', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 27,
                  "expression": {
                    "end": 27,
                   "left": {
                      "end": 1,
                      "name": "x",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "=",
                   "right": {
                      "end": 27,
                      "properties": [
                        {
                          "computed": false,
                          "end": 25,
                          "key": {
                            "end": 7,
                            "name": "f",
                            "start": 6,
                            "type": "Identifier"
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false,
                          "start": 6,
                          "type": "Property",
                          "value": {
                            "body": {
                              "body": [],
                              "end": 25,
                              "start": 23,
                              "type": "BlockStatement"
                            },
                            "end": 25,
                            "expression": false,
                            "generator": false,
                            "async": false,
                            "id": null,
                            "params": [
                              {
                                "end": 21,
                                "left": {
                                  "end": 19,
                                  "name": "a",
                                 "start": 18,
                                  "type": "Identifier"
                                },
                               "right": {
                                  "end": 21,
                                  "raw": "1",
                                  "start": 20,
                                  "type": "Literal",
                                  "value": 1,
                                },
                                "start": 18,
                                "type": "AssignmentPattern"
                              }
                            ],
                            "start": 9,
                            "type": "FunctionExpression"
                          }
                        }
                      ],
                      "start": 4,
                     "type": "ObjectExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 27,
              "sourceType": "script",
              "start": 0, 
              "type": "Program"
            });
    });

    it('should parse param with array"', () => {
        expect(parseScript('function f([x] = [1]) {};', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "body": {
                    "body": [],
                    "end": 24,
                    "start": 22,
                    "type": "BlockStatement"
                 },
                  "end": 24,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "id": {
                    "end": 10,
                    "name": "f",
                    "start": 9,
                    "type": "Identifier"
                  },
                  "params": [
                    {
                      "end": 20,
                      "left": {
                        "elements": [
                          {
                            "end": 13,
                            "name": "x",
                            "start": 12,
                            "type": "Identifier"
                          }
                        ],
                        "end": 14,
                        "start": 11,
                       "type": "ArrayPattern"
                     },
                      "right": {
                       "elements": [
                          {
                            "end": 19,
                            "raw": "1",
                            "start": 18,
                            "type": "Literal",
                            "value": 1,
                          },
                        ],
                        "end": 20,
                        "start": 17,
                        "type": "ArrayExpression"
                      },
                      "start": 11,
                      "type": "AssignmentPattern"
                    }
                  ],
                  "start": 0,
                  "type": "FunctionDeclaration"
                },
                {
                  "end": 25,
                  "start": 24,
                  "type": "EmptyStatement"
                }
              ],
              "end": 25,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
 });