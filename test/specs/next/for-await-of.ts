import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For await of', () => {

    it('should parse statement in an async function declaration', () => {
        expect(parseScript(`async function fn() {
            for await ([ x = 'x' in {} ] of [[]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 72,
                                    "end": 87
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "right": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Literal",
                                                    "value": "x",
                                                    "start": 51,
                                                    "end": 54,
                                                    "raw": "'x'"
                                                },
                                                "right": {
                                                    "type": "ObjectExpression",
                                                    "properties": [],
                                                    "start": 58,
                                                    "end": 60
                                                },
                                                "operator": "in",
                                                "start": 51,
                                                "end": 60
                                            },
                                            "start": 47,
                                            "end": 60
                                        }
                                    ],
                                    "start": 45,
                                    "end": 62
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [],
                                            "start": 67,
                                            "end": 69
                                        }
                                    ],
                                    "start": 66,
                                    "end": 70
                                },
                                "await": true,
                                "start": 34,
                                "end": 87
                            }
                        ],
                        "start": 20,
                        "end": 99
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 99
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 99
        });
    });

    
    it('should parse array elem nested obj undefined hole', () => {
        expect(parseScript(`async function fn() {
            for await ([{ x }] of [[ , ]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 65,
                                    "end": 80
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "start": 48,
                                                    "end": 49
                                                }
                                            ],
                                            "start": 46,
                                            "end": 51
                                        }
                                    ],
                                    "start": 45,
                                    "end": 52
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                null
                                            ],
                                            "start": 57,
                                            "end": 62
                                        }
                                    ],
                                    "start": 56,
                                    "end": 63
                                },
                                "await": true,
                                "start": 34,
                                "end": 80
                            }
                        ],
                        "start": 20,
                        "end": 92
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 92
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 92
        });
    });

    it('should parse func decl dstr array elem nested obj', () => {
        expect(parseScript(`async function fn() {
            for await ([{ x }] of [[{ x: 2 }]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 70,
                                    "end": 85
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "start": 48,
                                                    "end": 49
                                                }
                                            ],
                                            "start": 46,
                                            "end": 51
                                        }
                                    ],
                                    "start": 45,
                                    "end": 52
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 60,
                                                                "end": 61
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 2,
                                                                "start": 63,
                                                                "end": 64,
                                                                "raw": "2"
                                                            },
                                                            "start": 60,
                                                            "end": 64
                                                        }
                                                    ],
                                                    "start": 58,
                                                    "end": 66
                                                }
                                            ],
                                            "start": 57,
                                            "end": 67
                                        }
                                    ],
                                    "start": 56,
                                    "end": 68
                                },
                                "await": true,
                                "start": 34,
                                "end": 85
                            }
                        ],
                        "start": 20,
                        "end": 97
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 97
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 97
        });
    });

    
    it('should parse array elem put const', () => {
        expect(parseScript(`async function fn() {
            for await ([ c ] of [[1]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 61,
                                    "end": 76
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "c",
                                            "start": 47,
                                            "end": 48
                                        }
                                    ],
                                    "start": 45,
                                    "end": 50
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 56,
                                                    "end": 57,
                                                    "raw": "1"
                                                }
                                            ],
                                            "start": 55,
                                            "end": 58
                                        }
                                    ],
                                    "start": 54,
                                    "end": 59
                                },
                                "await": true,
                                "start": 34,
                                "end": 76
                            }
                        ],
                        "start": 20,
                        "end": 88
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 88
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 88
        });
    });

    it('should parse array rest iteration', () => {
        expect(parseScript(`async function fn() {
            for await ([...x] of [g()]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 62,
                                    "end": 77
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 49,
                                                "end": 50
                                            },
                                            "start": 46,
                                            "end": 50
                                        }
                                    ],
                                    "start": 45,
                                    "end": 51
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "CallExpression",
                                            "arguments": [],
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "g",
                                                "start": 56,
                                                "end": 57
                                            },
                                            "start": 56,
                                            "end": 59
                                        }
                                    ],
                                    "start": 55,
                                    "end": 60
                                },
                                "await": true,
                                "start": 34,
                                "end": 77
                            }
                        ],
                        "start": 20,
                        "end": 89
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 89
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 89
        });
    });

    
    it('should parse array nested object null', () => {
        expect(parseScript(`async function fn() {
            for await ([...{ 0: x, length }] of [[null]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 80,
                                    "end": 95
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "computed": false,
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 0,
                                                            "start": 51,
                                                            "end": 52,
                                                            "raw": "0"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 54,
                                                            "end": 55
                                                        },
                                                        "start": 51,
                                                        "end": 55
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "computed": false,
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 57,
                                                            "end": 63
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 57,
                                                            "end": 63
                                                        },
                                                        "start": 57,
                                                        "end": 63
                                                    }
                                                ],
                                                "start": 49,
                                                "end": 65
                                            },
                                            "start": 46,
                                            "end": 65
                                        }
                                    ],
                                    "start": 45,
                                    "end": 66
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": null,
                                                    "start": 72,
                                                    "end": 76,
                                                    "raw": "null"
                                                }
                                            ],
                                            "start": 71,
                                            "end": 77
                                        }
                                    ],
                                    "start": 70,
                                    "end": 78
                                },
                                "await": true,
                                "start": 34,
                                "end": 95
                            }
                        ],
                        "start": 20,
                        "end": 107
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 107
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 107
        });
    });

    it('should parse function name arrow', () => {
        expect(parseScript(`async function fn() {
            for await ({ arrow = () => {} } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "arrow",
                                                "start": 47,
                                                "end": 52
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "arrow",
                                                    "start": 47,
                                                    "end": 52
                                                },
                                                "right": {
                                                    "type": "ArrowFunctionExpression",
                                                    "id": null,
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [],
                                                        "start": 61,
                                                        "end": 63
                                                    },
                                                    "generator": false,
                                                    "expression": false,
                                                    "async": false,
                                                    "start": 55,
                                                    "end": 63
                                                },
                                                "start": 47,
                                                "end": 63
                                            },
                                            "start": 47,
                                            "end": 63
                                        }
                                    ],
                                    "start": 45,
                                    "end": 65
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 70,
                                            "end": 72
                                        }
                                    ],
                                    "start": 69,
                                    "end": 73
                                },
                                "await": true,
                                "start": 34,
                                "end": 90
                            }
                        ],
                        "start": 20,
                        "end": 102
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 102
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102
        });
    });

    
    it('should parse object property elem init yield identifier', () => {
        expect(parseScript(`async function fn() {
            for await ({ x: x = yield } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 71,
                                    "end": 86
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 50,
                                                    "end": 51
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "yield",
                                                    "start": 54,
                                                    "end": 59
                                                },
                                                "start": 50,
                                                "end": 59
                                            },
                                            "start": 47,
                                            "end": 59
                                        }
                                    ],
                                    "start": 45,
                                    "end": 61
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 66,
                                            "end": 68
                                        }
                                    ],
                                    "start": 65,
                                    "end": 69
                                },
                                "await": true,
                                "start": 34,
                                "end": 86
                            }
                        ],
                        "start": 20,
                        "end": 98
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 98
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 98
        });
    });

    it('should parse object property nested array', () => {
        expect(parseScript(`async function fn() {
            for await ({ x: [y] } of [{ x: [321] }]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "y",
                                                        "start": 51,
                                                        "end": 52
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 53
                                            },
                                            "start": 47,
                                            "end": 53
                                        }
                                    ],
                                    "start": 45,
                                    "end": 55
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 62,
                                                        "end": 63
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "ArrayExpression",
                                                        "elements": [
                                                            {
                                                                "type": "Literal",
                                                                "value": 321,
                                                                "start": 66,
                                                                "end": 69,
                                                                "raw": "321"
                                                            }
                                                        ],
                                                        "start": 65,
                                                        "end": 70
                                                    },
                                                    "start": 62,
                                                    "end": 70
                                                }
                                            ],
                                            "start": 60,
                                            "end": 72
                                        }
                                    ],
                                    "start": 59,
                                    "end": 73
                                },
                                "await": true,
                                "start": 34,
                                "end": 90
                            }
                        ],
                        "start": 20,
                        "end": 102
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 102
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102
        });
    });
    it('should parse array element nesed array undefined', () => {
        expect(parseScript(`async function * fn() {
            for await ([[ x ]] of [[undefined]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 73,
                                    "end": 88
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 50,
                                                    "end": 51
                                                }
                                            ],
                                            "start": 48,
                                            "end": 53
                                        }
                                    ],
                                    "start": 47,
                                    "end": 54
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "undefined",
                                                    "start": 60,
                                                    "end": 69
                                                }
                                            ],
                                            "start": 59,
                                            "end": 70
                                        }
                                    ],
                                    "start": 58,
                                    "end": 71
                                },
                                "await": true,
                                "start": 36,
                                "end": 88
                            }
                        ],
                        "start": 22,
                        "end": 100
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 100
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 100
        });
    });


    it('should parse array elision value array', () => {
        expect(parseScript(`async function * fn() {
            for await ([,] of [[]
          ]) {
              
              iterCount += 1;
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "iterCount",
                                                    "start": 102,
                                                    "end": 111
                                                },
                                                "operator": "+=",
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 115,
                                                    "end": 116,
                                                    "raw": "1"
                                                },
                                                "start": 102,
                                                "end": 116
                                            },
                                            "start": 102,
                                            "end": 117
                                        }
                                    ],
                                    "start": 71,
                                    "end": 131
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null
                                    ],
                                    "start": 47,
                                    "end": 50
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [],
                                            "start": 55,
                                            "end": 57
                                        }
                                    ],
                                    "start": 54,
                                    "end": 69
                                },
                                "await": true,
                                "start": 36,
                                "end": 131
                            }
                        ],
                        "start": 22,
                        "end": 143
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 143
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 143
        });
    });


    it('should parse object empty num', () => {
        expect(parseScript(`async function * fn() {
            for await ({} of [0
          ]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 69,
                                    "end": 84
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [],
                                    "start": 47,
                                    "end": 49
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 54,
                                            "end": 55,
                                            "raw": "0"
                                        }
                                    ],
                                    "start": 53,
                                    "end": 67
                                },
                                "await": true,
                                "start": 36,
                                "end": 84
                            }
                        ],
                        "start": 22,
                        "end": 96
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 96
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 96
        });
    });

    
    it('should parse const async object pattern prop id', () => {
        expect(parseScript(`async function fn() {
            for await (const { x: y } of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 74,
                                    "end": 89
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 53,
                                                            "end": 54
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "y",
                                                            "start": 56,
                                                            "end": 57
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 53,
                                                        "end": 57
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 59
                                            },
                                            "start": 51,
                                            "end": 59
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 59
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 63,
                                    "end": 72
                                },
                                "await": true,
                                "start": 34,
                                "end": 89
                            }
                        ],
                        "start": 20,
                        "end": 101
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 101
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 101
        });
    });

  

    it('should parse const object init null', () => {
        expect(parseScript(`async function fn() {
            for await (const {} of [null]) {
              return;
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": null,
                                            "start": 81,
                                            "end": 88
                                        }
                                    ],
                                    "start": 65,
                                    "end": 102
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [],
                                                "start": 51,
                                                "end": 53
                                            },
                                            "start": 51,
                                            "end": 53
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 53
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 58,
                                            "end": 62,
                                            "raw": "null"
                                        }
                                    ],
                                    "start": 57,
                                    "end": 63
                                },
                                "await": true,
                                "start": 34,
                                "end": 102
                            }
                        ],
                        "start": 20,
                        "end": 114
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 114
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 114
        });
    });

    it('should parse array pattern rest id ellison', () => {
        expect(parseScript(`async function fn() {
            for await (const [ , , ...x] of [values]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 76,
                                    "end": 91
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    null,
                                                    null,
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 60,
                                                            "end": 61
                                                        },
                                                        "start": 57,
                                                        "end": 61
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 62
                                            },
                                            "start": 51,
                                            "end": 62
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 62
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "values",
                                            "start": 67,
                                            "end": 73
                                        }
                                    ],
                                    "start": 66,
                                    "end": 74
                                },
                                "await": true,
                                "start": 34,
                                "end": 91
                            }
                        ],
                        "start": 20,
                        "end": 103
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 103
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 103
        });
    });

    it('should parse  array pattern elem id init hole', () => {
        expect(parseScript(`async function fn() {
            for await (const [x = 23] of [[,]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 70,
                                    "end": 85
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 52,
                                                            "end": 53
                                                        },
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 23,
                                                            "start": 56,
                                                            "end": 58,
                                                            "raw": "23"
                                                        },
                                                        "start": 52,
                                                        "end": 58
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 59
                                            },
                                            "start": 51,
                                            "end": 59
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 59
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                null
                                            ],
                                            "start": 64,
                                            "end": 67
                                        }
                                    ],
                                    "start": 63,
                                    "end": 68
                                },
                                "await": true,
                                "start": 34,
                                "end": 85
                            }
                        ],
                        "start": 20,
                        "end": 97
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 97
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 97
        });
    });

    it('should parse array pattern empty', () => {
        expect(parseScript(`async function *fn() {
            for await (let [] of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 67,
                                    "end": 82
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [],
                                                "start": 50,
                                                "end": 52
                                            },
                                            "start": 50,
                                            "end": 52
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 52
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 56,
                                    "end": 65
                                },
                                "await": true,
                                "start": 35,
                                "end": 82
                            }
                        ],
                        "start": 21,
                        "end": 94
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 94
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 94
        });
    });

    it('should parse array pattern elem object', () => {
        expect(parseScript(`async function *fn() {
            for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 104,
                                    "end": 119
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 53,
                                                                    "end": 54
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 56,
                                                                    "end": 57
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 59,
                                                                    "end": 60
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 62
                                                        },
                                                        "right": {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 67,
                                                                        "end": 68
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 44,
                                                                        "start": 70,
                                                                        "end": 72,
                                                                        "raw": "44"
                                                                    },
                                                                    "start": 67,
                                                                    "end": 72
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 74,
                                                                        "end": 75
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 55,
                                                                        "start": 77,
                                                                        "end": 79,
                                                                        "raw": "55"
                                                                    },
                                                                    "start": 74,
                                                                    "end": 79
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 81,
                                                                        "end": 82
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 66,
                                                                        "start": 84,
                                                                        "end": 86,
                                                                        "raw": "66"
                                                                    },
                                                                    "start": 81,
                                                                    "end": 86
                                                                }
                                                            ],
                                                            "start": 65,
                                                            "end": 88
                                                        },
                                                        "start": 51,
                                                        "end": 88
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 89
                                            },
                                            "start": 50,
                                            "end": 89
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 89
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 93,
                                    "end": 102
                                },
                                "await": true,
                                "start": 35,
                                "end": 119
                            }
                        ],
                        "start": 21,
                        "end": 131
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 131
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 131
        });
    });

    it('should parse array pattern rest object id', () => {
        expect(parseScript(`async function *fn() {
            for await (let [...{ length }] of [[1, 2, 3]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 82,
                                    "end": 97
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "length",
                                                                        "start": 56,
                                                                        "end": 62
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "length",
                                                                        "start": 56,
                                                                        "end": 62
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 56,
                                                                    "end": 62
                                                                }
                                                            ],
                                                            "start": 54,
                                                            "end": 64
                                                        },
                                                        "start": 51,
                                                        "end": 64
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 65
                                            },
                                            "start": 50,
                                            "end": 65
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 65
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 71,
                                                    "end": 72,
                                                    "raw": "1"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 2,
                                                    "start": 74,
                                                    "end": 75,
                                                    "raw": "2"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 3,
                                                    "start": 77,
                                                    "end": 78,
                                                    "raw": "3"
                                                }
                                            ],
                                            "start": 70,
                                            "end": 79
                                        }
                                    ],
                                    "start": 69,
                                    "end": 80
                                },
                                "await": true,
                                "start": 35,
                                "end": 97
                            }
                        ],
                        "start": 21,
                        "end": 109
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 109
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 109
        });
    });

    it('should parse array pattern array rest', () => {
        expect(parseScript(`async function *fn() {
            for await (let [[...x] = function() { }()] of [[values]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 93,
                                    "end": 108
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ArrayPattern",
                                                            "elements": [
                                                                {
                                                                    "type": "RestElement",
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 55,
                                                                        "end": 56
                                                                    },
                                                                    "start": 52,
                                                                    "end": 56
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 57
                                                        },
                                                        "right": {
                                                            "type": "CallExpression",
                                                            "arguments": [],
                                                            "callee": {
                                                                "type": "FunctionExpression",
                                                                "params": [],
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [],
                                                                    "start": 71,
                                                                    "end": 74
                                                                },
                                                                "async": false,
                                                                "generator": false,
                                                                "expression": false,
                                                                "id": null,
                                                                "start": 60,
                                                                "end": 74
                                                            },
                                                            "start": 60,
                                                            "end": 76
                                                        },
                                                        "start": 51,
                                                        "end": 76
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 77
                                            },
                                            "start": 50,
                                            "end": 77
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 77
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "values",
                                                    "start": 83,
                                                    "end": 89
                                                }
                                            ],
                                            "start": 82,
                                            "end": 90
                                        }
                                    ],
                                    "start": 81,
                                    "end": 91
                                },
                                "await": true,
                                "start": 35,
                                "end": 108
                            }
                        ],
                        "start": 21,
                        "end": 120
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 120
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 120
        });
    });

    it('should parse const object pattern property object', () => {
        expect(parseScript(`async function *fn() {
            for await (const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 130,
                                    "end": 145
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "w",
                                                            "start": 54,
                                                            "end": 55
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "AssignmentPattern",
                                                            "left": {
                                                                "type": "ObjectPattern",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 59,
                                                                            "end": 60
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 59,
                                                                            "end": 60
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 59,
                                                                        "end": 60
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 62,
                                                                            "end": 63
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 62,
                                                                            "end": 63
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 62,
                                                                        "end": 63
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 65,
                                                                            "end": 66
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 65,
                                                                            "end": 66
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 65,
                                                                        "end": 66
                                                                    }
                                                                ],
                                                                "start": 57,
                                                                "end": 68
                                                            },
                                                            "right": {
                                                                "type": "ObjectExpression",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "computed": false,
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 73,
                                                                            "end": 74
                                                                        },
                                                                        "kind": "init",
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 4,
                                                                            "start": 76,
                                                                            "end": 77,
                                                                            "raw": "4"
                                                                        },
                                                                        "start": 73,
                                                                        "end": 77
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "computed": false,
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 79,
                                                                            "end": 80
                                                                        },
                                                                        "kind": "init",
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 5,
                                                                            "start": 82,
                                                                            "end": 83,
                                                                            "raw": "5"
                                                                        },
                                                                        "start": 79,
                                                                        "end": 83
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "computed": false,
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 85,
                                                                            "end": 86
                                                                        },
                                                                        "kind": "init",
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 6,
                                                                            "start": 88,
                                                                            "end": 89,
                                                                            "raw": "6"
                                                                        },
                                                                        "start": 85,
                                                                        "end": 89
                                                                    }
                                                                ],
                                                                "start": 71,
                                                                "end": 91
                                                            },
                                                            "start": 54,
                                                            "end": 91
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 54,
                                                        "end": 91
                                                    }
                                                ],
                                                "start": 52,
                                                "end": 93
                                            },
                                            "start": 52,
                                            "end": 93
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 93
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "w",
                                                        "start": 100,
                                                        "end": 101
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "computed": false,
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 105,
                                                                    "end": 106
                                                                },
                                                                "kind": "init",
                                                                "method": false,
                                                                "shorthand": false,
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined",
                                                                    "start": 108,
                                                                    "end": 117
                                                                },
                                                                "start": 105,
                                                                "end": 117
                                                            },
                                                            {
                                                                "type": "Property",
                                                                "computed": false,
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "z",
                                                                    "start": 119,
                                                                    "end": 120
                                                                },
                                                                "kind": "init",
                                                                "method": false,
                                                                "shorthand": false,
                                                                "value": {
                                                                    "type": "Literal",
                                                                    "value": 7,
                                                                    "start": 122,
                                                                    "end": 123,
                                                                    "raw": "7"
                                                                },
                                                                "start": 119,
                                                                "end": 123
                                                            }
                                                        ],
                                                        "start": 103,
                                                        "end": 125
                                                    },
                                                    "start": 100,
                                                    "end": 125
                                                }
                                            ],
                                            "start": 98,
                                            "end": 127
                                        }
                                    ],
                                    "start": 97,
                                    "end": 128
                                },
                                "await": true,
                                "start": 35,
                                "end": 145
                            }
                        ],
                        "start": 21,
                        "end": 157
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 157
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 157
        });
    });

    it('should parse const object pattern empty', () => {
        expect(parseScript(`async function *fn() {
            for await (const {} of [obj]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 65,
                                    "end": 80
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [],
                                                "start": 52,
                                                "end": 54
                                            },
                                            "start": 52,
                                            "end": 54
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 54
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "obj",
                                            "start": 59,
                                            "end": 62
                                        }
                                    ],
                                    "start": 58,
                                    "end": 63
                                },
                                "await": true,
                                "start": 35,
                                "end": 80
                            }
                        ],
                        "start": 21,
                        "end": 92
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 92
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 92
        });
    });

    it('should parse object init function name arrow', () => {
        expect(parseScript(`async function fn() {
            for await ({ arrow = () => {} } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "arrow",
                                                "start": 47,
                                                "end": 52
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "arrow",
                                                    "start": 47,
                                                    "end": 52
                                                },
                                                "right": {
                                                    "type": "ArrowFunctionExpression",
                                                    "id": null,
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [],
                                                        "start": 61,
                                                        "end": 63
                                                    },
                                                    "generator": false,
                                                    "expression": false,
                                                    "async": false,
                                                    "start": 55,
                                                    "end": 63
                                                },
                                                "start": 47,
                                                "end": 63
                                            },
                                            "start": 47,
                                            "end": 63
                                        }
                                    ],
                                    "start": 45,
                                    "end": 65
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 70,
                                            "end": 72
                                        }
                                    ],
                                    "start": 69,
                                    "end": 73
                                },
                                "await": true,
                                "start": 34,
                                "end": 90
                            }
                        ],
                        "start": 20,
                        "end": 102
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 102
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102
        });
    });
});