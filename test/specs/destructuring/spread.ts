import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Spread', () => {

    it('should fail on invalid not final array empty', () => {
        expect(() => {
            parseScript(' [...a, ] = b;')
        }).to.not.throw()
    });

    it('should fail on not finale array', () => {
        expect(() => {
            parseScript('[...a, b] = c;')
        }).to.not.throw()
    });

    it('should fail on complex destructred spread first', () => {
        expect(() => {
            parseScript('[...c, { a, b }] = d;')
        }).to.not.throw()
    });

    it('should parse single destructed', () => {
        expect(parseScript('[...a] = b;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse var complex destructed', () => {
        expect(parseScript('var [{ a, b }, ...c] = d;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "a"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "a"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true
                                            },
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "b"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "b"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true
                                            }
                                        ]
                                    },
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "c"
                                        }
                                    }
                                ]
                            },
                            "init": {
                                "type": "Identifier",
                                "name": "d"
                            }
                        }
                    ],
                    "kind": "var"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse destructed arrat literal"', () => {
        expect(parseScript('[a, ...[b, c]] = d;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "c"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "d"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    
});