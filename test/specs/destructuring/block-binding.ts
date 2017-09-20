import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Block binding', () => {

    it('should parse let named', () => {
        expect(parseScript('let {a:b} = {};', {
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 14,
                    "id": {
                        "end": 9,
                        "properties": [{
                            "computed": false,
                            "end": 8,
                            "key": {
                                "end": 6,
                                "name": "a",
                                "start": 5,
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "start": 5,
                            "type": "Property",
                            "value": {
                                "end": 8,
                                "name": "b",
                                "start": 7,
                                "type": "Identifier"
                            }
                        }],
                        "start": 4,
                        "type": "ObjectPattern"
                    },
                    "init": {
                        "end": 14,
                        "properties": [],
                        "start": 12,
                        "type": "ObjectExpression"
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 15,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 15,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });

    it('should parse const named', () => {
        expect(parseScript('const {a:b} = {};', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        })
    });

    it('should parse arrow param with array"', () => {
        expect(parseScript('([y]) => x;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "y"
                        }]
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse array const undefined', () => {
        expect(parseScript('const [a] = [];', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "a"
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it('should parse object const undefined', () => {
        expect(parseScript('const {a} = {};', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
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
                        }]
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it('should parse array const undefined', () => {
        expect(parseScript('const [a] = [];', {
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
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                ]
                            },
                            "init": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }
                    ],
                    "kind": "const"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse array let undefined"', () => {
        expect(parseScript('let [a] = [];', {
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
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                ]
                            },
                            "init": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }
                    ],
                    "kind": "let"
                }
            ],
            "sourceType": "script"
        });
    });

});