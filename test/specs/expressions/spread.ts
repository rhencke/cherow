import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Spread', () => {

    it('should fail on invalid if', () => {
        expect(() => { parseScript('if (b,...a, );') }).to.throw()
    });

    it('should fail on invalid sequence', () => {
        expect(() => { parseScript('(b, ...a);') }).to.throw()
    });

    it('should parse multi function call', () => {
        expect(parseScript('foo(a, ...b);', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "foo"
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse not finale param', () => {
        expect(parseScript('func(...a, b);', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "func"
                        },
                        "arguments": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "b"
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse simple function call"', () => {
        expect(parseScript('foo(...a);', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "foo"
                        },
                        "arguments": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });
});