import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise and', () => {

    it('should parse "(null & "1")"', () => {
        expect(parseScript('(null & "1")', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 12,
                 "expression": {
                    "end": 11,
                    "left": {
                      "end": 5,
                      "start": 1,
                      "type": "Literal",
                      "value": null,
                    },
                    "operator": "&",
                    "right": {
                      "end": 11,
                      "start": 8,
                     "type": "Literal",
                      "value": "1"
                    },
                    "start": 1,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
    it('should parse "((1 & undefined)))"', () => {
        expect(parseScript('((1 & undefined))', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 17,
                  "expression": {
                    "end": 15,
                    "left": {
                     "end": 3,
                      "start": 2,
                      "type": "Literal",
                      "value": 1
                    },
                    "operator": "&",
                    "right": {
                      "end": 15,
                      "name": "undefined",
                      "start": 6,
                      "type": "Identifier"
                    },
                    "start": 2,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
             ],
              "end": 17,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "("1" & undefined)"', () => {
        expect(parseScript('("1" & undefined)', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Literal",
                            "value": "1",
                            "raw": "\"1\""
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "undefined"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });
    it('should parse "(undefined & "1")"', () => {
        expect(parseScript('(undefined & "1")', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "undefined"
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
    it('should parse "(null & "1")"', () => {
        expect(parseScript('(null & "1")', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Literal",
                            "value": null,
                            "raw": "null"
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

    it('should parse "true & null"', () => {
        expect(parseScript('true & false')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "&",
                    "left": {
                        "type": "Literal",
                        "value": true
                    },
                    "right": {
                        "type": "Literal",
                        "value": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "null & true"', () => {
        expect(parseScript('null & true')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "&",
                    "left": {
                        "type": "Literal",
                        "value": null
                    },
                    "right": {
                        "type": "Literal",
                        "value": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});