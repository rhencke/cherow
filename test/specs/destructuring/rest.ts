import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Rest', () => {

    it('should parse "[...a] = [1, 2, 3];"', () => {
        expect(parseScript('[...a] = [1, 2, 3];', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 19,
                  "expression": {
                    "end": 18,
                    "left": {
                      "elements": [
                        {
                          "argument": {
                            "end": 5,
                            "name": "a",
                            "start": 4,
                            "type": "Identifier"
                          },
                          "end": 5,
                          "start": 1,
                          "type": "RestElement"
                        },
                      ],
                      "end": 6,
                      "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "elements": [
                        {
                          "end": 11,
                          "start": 10,
                          "type": "Literal",
                          "value": 1
                        },
                        {
                          "end": 14,
                          "start": 13,
                          "type": "Literal",
                          "value": 2
                        },
                        {
                          "end": 17,
                          "start": 16,
                          "type": "Literal",
                          "value": 3
                        }
                      ],
                      "end": 18,
                      "start": 9,
                     "type": "ArrayExpression"
                    },
                   "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 19,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "[,,, ...d] = [1, 2, 3]"', () => {
        expect(parseScript('[,,, ...d] = [1, 2, 3]', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 22,
                  "expression": {
                    "end": 22,
                    "left": {
                      "elements": [
                        null,
                       null,
                        null,
                        {
                          "argument": { 
                            "end": 9,
                            "name": "d",
                            "start": 8,
                            "type": "Identifier"
                          },
                          "end": 9,
                         "start": 5,
                          "type": "RestElement"
                        }
                      ],
                      "end": 10,
                     "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "elements": [
                        {
                          "end": 15,
                          "raw": "1",
                          "start": 14,
                          "type": "Literal",
                          "value": 1
                        },
                        {
                          "end": 18,
                          "raw": "2",
                          "start": 17,
                          "type": "Literal",
                          "value": 2
                        },
                        {
                          "end": 21,
                          "raw": "3",
                          "start": 20,
                          "type": "Literal",
                          "value": 3
                        }
                      ],
                      "end": 22,
                      "start": 13,
                      "type": "ArrayExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
               }
              ],
              "end": 22,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "[b, ...c] = [1, 2, 3]"', () => {
        expect(parseScript('[b, ...c] = [1, 2, 3]', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": [
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "Literal",
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });
});