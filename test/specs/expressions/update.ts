import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Update', () => {

    it('should parse "++a"', () => {
        expect(parseScript('++a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "--a"', () => {
        expect(parseScript('--a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "a++"', () => {
        expect(parseScript('a++')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "a--"', () => {
        expect(parseScript('a--')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "eval--"', () => {
        expect(parseScript('eval--')).to.eql({
            "type": "Program",
            "body": [{
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
            }],
            "sourceType": "script"
        });
    });

    it('should fail on "eval" in strict mode - prefix', () => {
        expect(() => {
            expect(parseModule('--eval'))
        }).to.throw('');

    });

    it('should fail on "arguments" in strict mode - prefix', () => {
        expect(() => {
            expect(parseModule('--arguments'))
        }).to.throw('');

    });

    it('should fail on "eval" in strict mode - postfix', () => {
        expect(() => {
            expect(parseModule('eval--'))
        }).to.throw('');

    });

    it('should fail on "arguments" in strict mode - postfix', () => {
        expect(() => {
            expect(parseModule('arguments--'))
        }).to.throw('');

    });
});