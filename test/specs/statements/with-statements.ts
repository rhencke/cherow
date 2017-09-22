import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - With statement', () => {

    it('should fail on unterminated with', () => {
        expect(() => {
            parseScript(`with (x`)
        }).to.throw();
    });

    it('should fail on invalid with empty paren', () => {
        expect(() => {
            parseScript(`with () { }`)
        }).to.throw();
    });

    it('should throw if using with statement in strict mode', () => {
        expect(() => {
            parseModule(`with ({}) { }`)
        }).to.throw('');
    });

    it('should throw if lexical declaration (const) are used in statement position', () => {
        expect(() => {
            parseScript(`with ({}) const x = null;`)
        }).to.throw();
    });

    it('should throw if lexical declaration (let) are used in statement position', () => {
        expect(() => {
            parseScript(`with ({}) let x;`)
        }).to.throw();
    });

    it('should throw if Function declaration are used in statement position', () => {
        expect(() => {
            parseScript(`with ({}) function f() {}`)
        }).to.throw();
    });

    it('should throw if Function declaration are used in statement position', () => {
        expect(() => {
            parseScript(`with(true) class a {}`)
        }).to.throw();
    });

    it('should throw if Generator declaration are used in statement position', () => {
        expect(() => {
            parseScript(`with ({}) function* g() {}`)
        }).to.throw();
    });

    it('should parse "with(1);"', () => {
        expect(parseScript(`with(1);`)).to.eql({
            'body': [{
                'body': {
                    'type': 'EmptyStatement'
                },
                'object': {
                    'type': 'Literal',
                    'value': 1
                },
                'type': 'WithStatement'
            }],
            'sourceType': 'script',
            'type': 'Program'
        });
    });

      it('should parse "with (x) { foo = bar }"', () => {
        expect(parseScript(`with (x) { foo = bar }`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
});
    });

      it('should parse "with (x) foo = bar;"', () => {
        expect(parseScript(`with (x) foo = bar;`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "bar"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
});
    });


    it('should parse "with (x) foo"', () => {
        expect(parseScript(`with (x) foo`)).to.eql({
            'body': [{
                'body': {
                    'expression': {
                        'name': 'foo',
                        'type': 'Identifier'
                    },
                    'type': 'ExpressionStatement'
                },
                'object': {
                    'name': 'x',
                    'type': 'Identifier'
                },
                'type': 'WithStatement'
            }],
            'sourceType': 'script',
            'type': 'Program'
        });
    });

    it('should parse "with (x) foo;"', () => {
        expect(parseScript(`with (x) foo;`)).to.eql({
            'body': [{
                'body': {
                    'expression': {
                        'name': 'foo',
                        'type': 'Identifier'
                    },
                    'type': 'ExpressionStatement'
                },
                'object': {
                    'name': 'x',
                    'type': 'Identifier'
                },
                'type': 'WithStatement'
            }],
            'sourceType': 'script',
            'type': 'Program'
        });
    });

    it('should parse "with (x) { foo = bar }"', () => {
        expect(parseScript(`with (x) { foo = bar }`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "WithStatement",
                "object": {
                    "type": "Identifier",
                    "name": "x"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });
});