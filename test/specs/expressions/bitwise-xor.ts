import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise xor', () => {

    it('should parse "(true ^ 1)"', () => {
        expect(parseScript('(true ^ 1)', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse " x ^ (x = 1);"', () => {
        expect(parseScript(' x ^ (x = 1);', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "AssignmentExpression",
                            "operator": "=",
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
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "((y = 1) ^ y)"', () => {
        expect(parseScript('((y = 1) ^ y)', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x ^ y;"', () => {
        expect(parseScript('x ^ y;', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "(true ^ undefined)"', () => {
        expect(parseScript('(true ^ undefined)', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
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
});