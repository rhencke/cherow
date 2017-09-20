import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - comments', () => {

    it('should parse "<!-- HTML comment"', () => {
        expect(parseScript('<!-- HTML comment', {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [],
            "sourceType": "script"
          });
    });

    it('should parse ";\n--> HTML comment"', () => {
        expect(parseScript(';\n--> HTML comment', {
            ranges: true
        })).to.eql({
              "body": [
                {
                 "end": 1,
                  "start": 0,
                  "type": "EmptyStatement"
                }
              ],
              "end": 18,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse a "<!--\n;"', () => {
        expect(parseScript('<!--\n;', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 6,
                  "start": 5,
                 "type": "EmptyStatement"
                }
              ],
              "end": 6,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse a single " /****/"', () => {
        expect(parseScript(' /****/', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 7,
            "body": [],
            "sourceType": "script"
          });
    });

    it('should parse "// line comment"', () => {
        expect(parseScript('// line comment', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [],
            "sourceType": "script"
          });
    });

    it('should parse a single "var p1;/* block comment 1 */ /* block comment 2 */"', () => {
        expect(parseScript('var p1;/* block comment 1 */ /* block comment 2 */', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 7,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 6,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 6,
                      "name": "p1"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "42 /*The*/ /*Answer*/"', () => {
        expect(parseScript('42 /*The*/ /*Answer*/', {
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
                "end": 2,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 2,
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript(`/* multiline
        comment
        should
        be
        ignored */ 42`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 76,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 74,
                "end": 76,
                "expression": {
                  "type": "Literal",
                  "start": 74,
                  "end": 76,
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript(`// Hello, world!
        42`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 25,
                "end": 27,
                "expression": {
                  "type": "Literal",
                  "start": 25,
                  "end": 27,
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse a single "/**/42"', () => {
        expect(parseScript('/**/42', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 4,
                "end": 6,
                "expression": {
                  "type": "Literal",
                  "start": 4,
                  "end": 6,
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "switch (answer) { case 42: bingo() /* perfect */ }"', () => {
        expect(parseScript('switch (answer) { case 42: bingo() /* perfect */ }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [
              {
                "type": "SwitchStatement",
                "start": 0,
                "end": 50,
                "discriminant": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 14,
                  "name": "answer"
                },
                "cases": [
                  {
                    "type": "SwitchCase",
                    "start": 18,
                    "end": 34,
                    "consequent": [
                      {
                        "type": "ExpressionStatement",
                        "start": 27,
                        "end": 34,
                        "expression": {
                          "type": "CallExpression",
                          "start": 27,
                          "end": 34,
                          "callee": {
                            "type": "Identifier",
                            "start": 27,
                            "end": 32,
                            "name": "bingo"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "test": {
                      "type": "Literal",
                      "start": 23,
                      "end": 25,
                      "value": 42,
                      "raw": "42"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "/* header */ (function(){ var version = 1; }).call(this)"', () => {
        expect(parseScript('/* header */ (function(){ var version = 1; }).call(this)', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 13,
                "end": 56,
                "expression": {
                  "type": "CallExpression",
                  "start": 13,
                  "end": 56,
                  "callee": {
                    "type": "MemberExpression",
                    "start": 13,
                    "end": 50,
                    "object": {
                      "type": "FunctionExpression",
                      "start": 14,
                      "end": 44,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 44,
                        "body": [
                          {
                            "type": "VariableDeclaration",
                            "start": 26,
                            "end": 42,
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "start": 30,
                                "end": 41,
                                "id": {
                                  "type": "Identifier",
                                  "start": 30,
                                  "end": 37,
                                  "name": "version"
                                },
                                "init": {
                                  "type": "Literal",
                                  "start": 40,
                                  "end": 41,
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            ],
                            "kind": "var"
                          }
                        ]
                      }
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 46,
                      "end": 50,
                      "name": "call"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "ThisExpression",
                      "start": 51,
                      "end": 55
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "function x(){ /*esprima*/ return; /*sucks*/}"', () => {
        expect(parseScript('function x(){ /*esprima*/ return; /*sucks*/}', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 44,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 44,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "x"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 12,
                  "end": 44,
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 26,
                      "end": 33,
                      "argument": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript(`while (true) {
            /**
             * comments in empty block
             */
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 97,
            "body": [
              {
                "type": "WhileStatement",
                "start": 0,
                "end": 97,
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
                  "end": 97,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

});