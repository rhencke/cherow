import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Left shift', () => {

    it('should parse "x << y" with identifiers', () => {
        expect(parseScript('x << y')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "y"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0<< 0" with zero', () => {
        expect(parseScript('0 << 0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
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

    it('should parse "-0 << 0" with zero where the first one is negative', () => {
        expect(parseScript('-0 << 0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "argument": {
                            "raw": "0",
                            "type": "Literal",
                            "value": 0
                        },
                        "operator": "-",
                        "prefix": true,
                        "type": "UnaryExpression"
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

    it('should return values between between -2^31 and 2^31-1', () => {
        expect(parseScript('(-2147483647 << 0)', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 2147483647,
                            "raw": "2147483647"
                        },
                        "prefix": true
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

    it("should return values using floor and abs", () => {
        expect(parseScript('(1.2345 << 0)', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "Literal",
                        "value": 1.2345,
                        "raw": "1.2345"
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