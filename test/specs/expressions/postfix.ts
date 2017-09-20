import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Postfix', () => {

    it('should parse "x++"', () => {
        expect(parseScript('x++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x--"', () => {
        expect(parseScript('x--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "eval++"', () => {
        expect(parseScript('eval++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "eval--"', () => {
        expect(parseScript('eval--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "arguments++"', () => {
        expect(parseScript('arguments++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "arguments--"', () => {
        expect(parseScript('arguments--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });
});
