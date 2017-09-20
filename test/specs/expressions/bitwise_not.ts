import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise not', () => {

    it('should parse "~false"', () => {
        expect(parseScript('~false', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "~",
                        "argument": {
                            "type": "Literal",
                            "value": false,
                            "raw": "false"
                        },
                        "prefix": true
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "~2147483647"', () => {
        expect(parseScript('~2147483647')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 2147483647
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~4294967295"', () => {
        expect(parseScript('~4294967295')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 4294967295
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~(function(){return 1}) === -1"', () => {
        expect(parseScript('~(function(){return 1}) === -1')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "===",
                    "left": {
                        "type": "UnaryExpression",
                        "operator": "~",
                        "argument": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "Literal",
                                        "value": 1
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "prefix": true
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~1.2345"', () => {
        expect(parseScript('~1.2345')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 1.2345
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~-5.4321"', () => {
        expect(parseScript('~-5.4321')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 5.4321
                        },
                        "prefix": true
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~({})"', () => {
        expect(parseScript('~({})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "ObjectExpression",
                        "properties": []
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

});