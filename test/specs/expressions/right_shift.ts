import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - Right shift', () => {

    it('should parse right shift between boolean and null', () => {
        expect(parseScript('true >> null', {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": ">>",
                    "left": {
                        "type": "Literal",
                        "value": true
                    },
                    "right": {
                        "type": "Literal",
                        "value": null
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse right shift between boolean and undefined', () => {
        expect(parseScript('true >> undefined', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "type": "Literal",
                        "value": true,
                        "raw": "true"
                    },
                    "operator": ">>",
                    "right": {
                        "name": "undefined",
                        "type": "Identifier"
                    },
                    "type": "BinaryExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "2147483648.1 >> 0"', () => {
    expect(parseScript('2147483648.1 >> 0', {
        raw: true
    })).to.eql({
        "type": "Program",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": ">>",
                "left": {
                    "type": "Literal",
                    "value": 2147483648.1,
                    "raw": "2147483648.1"
                },
                "right": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                }
            }
        }],
        "sourceType": "script"
    });
    });
    });