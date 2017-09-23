import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Arrow rest', () => {

    it('should parse "let xs = [0, "", true];"', () => {
        expect(parseScript('let xs = [0, "", true];', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "end": 22,
                      "id": {
                        "end": 6,
                        "name": "xs",
                        "start": 4,
                        "type": "Identifier"
                     },
                     "init": {
                        "elements": [
                          {
                            "end": 11,
                            "start": 10,
                            "type": "Literal",
                            "value": 0
                          },
                          {
                            "end": 15,
                            "start": 13,
                            "type": "Literal",
                            "value": "",
                          },
                          {
                            "end": 21,
                            "start": 17,
                            "type": "Literal",
                            "value": true
                          },
                        ],
                        "end": 22,
                        "start": 9,
                        "type": "ArrayExpression"
                      },
                      "start": 4,
                      "type": "VariableDeclarator"
                    }
                 ],
                  "end": 23,
                  "kind": "let",
                  "start": 0,
                  "type": "VariableDeclaration"
                }
              ],
              "end": 23,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "let [a, ...ys] = xs;"', () => {
        expect(parseScript('let [a, ...ys] = xs;', {
            ranges: false,
            raw: true,
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "ys"
                                        }
                                    }
                                ]
                            },
                            "init": {
                                "type": "Identifier",
                                "name": "xs"
                            }
                        }
                    ],
                    "kind": "let"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "let [...e] = 0;"', () => {
        expect(parseScript('let [...e] = 0;', {
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
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "e"
                                        }
                                    }
                                ]
                            },
                            "init": {
                                "type": "Literal",
                                "value": 0,
                                "raw": "0"
                            }
                        }
                    ],
                    "kind": "let"
                }
            ],
            "sourceType": "script"
        });
    });
});