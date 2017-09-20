import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise or', () => {

    it('should parse "((x = 0) | x)"', () => {
        expect(parseScript('(true ^ 1)', { 
            ranges: true,
            raw: true 
        })).to.eql({
              "body": [
                {
                  "end": 10,
                  "expression": {
                    "end": 9,
                   "left": {
                      "end": 5,
                      "raw": "true",
                      "start": 1,
                      "type": "Literal",
                      "value": true
                    },
                   "operator": "^",
                    "right": {
                      "end": 9,
                      "raw": "1",
                     "start": 8,
                      "type": "Literal",
                      "value": 1
                    },
                    "start": 1,
                    "type": "BinaryExpression"
                 },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 10,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(true | 1)"', () => {
        expect(parseScript(' (true | 1)', { 
            ranges: true,
            raw: true 
        })).to.eql({
              "body": [
               {
                 "end": 11,
                  "expression": {
                    "end": 10,
                    "left": {
                      "end": 6,
                     "raw": "true",
                      "start": 2,
                      "type": "Literal",
                      "value": true
                    },
                    "operator": "|",
                    "right": {
                      "end": 10,
                      "raw": "1",
                      "start": 9,
                      "type": "Literal",
                      "value": 1
                    },
                    "start": 2,
                    "type": "BinaryExpression"
                  },
                  "start": 1,
                  "type": "ExpressionStatement"
               }
              ],
              "end": 11,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(true | "1")"', () => {
        expect(parseScript('(true | "1")', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "|",
                        "left": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        },
                        "right": {
                            "type": "Literal",
                            "value": "1",
                            "raw": "\"1\""
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "("1" | null)"', () => {
        expect(parseScript('("1" | null)', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "|",
                        "left": {
                            "type": "Literal",
                            "value": "1",
                            "raw": "\"1\""
                        },
                        "right": {
                            "type": "Literal",
                            "value": null,
                            "raw": "null"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "(undefined | true)"', () => {
        expect(parseScript('(undefined | true)', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "|",
                        "left": {
                            "type": "Identifier",
                            "name": "undefined"
                        },
                        "right": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });
});