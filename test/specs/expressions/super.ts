import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Super', () => {

    it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
        expect(() => {
            parseScript(`class A extends B { *g1() { return super() } }`);
        }).to.not.throw();
    });
    it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
        expect(() => {
            parseScript(`function wrap() { function* foo(a = super(), b = super.foo()) { } }`);
        }).to.throw();
    });
    it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
        expect(() => {
            parseScript(`class A static foo() { super() } }`);
        }).to.throw();
    });
    it('should fail on "function foo() {super() super.foo()"', () => {
        expect(() => {
            parseScript(`function foo() {super() super.foo()`);
        }).to.throw();
    });
    it('should fail on "var foo = function() { super()  super.foo() }"', () => {
        expect(() => {
            parseScript(`var foo = function() { super()  super.foo() }`);
        }).to.throw();
    });
    it('should fail on "function wrap() { function foo(a = super(), b = super.foo()) {}}"', () => {
        expect(() => {
            parseScript(`function wrap() { function foo(a = super(), b = super.foo()) {}}`);
        }).to.throw();
    });

    it('should parse spread operator applied to AssignmentExpression following other elements', () => {
        expect(parseScript(`class A {
        constructor() {
          super(5, ...[6, 7, 8], 9);
        }
    }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 86,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 86,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 86,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 18,
                        "end": 80,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 29,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 29,
                            "end": 80,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 32,
                                "end": 80,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 44,
                                    "end": 70,
                                    "expression": {
                                        "type": "CallExpression",
                                        "start": 44,
                                        "end": 69,
                                        "callee": {
                                            "type": "Super",
                                            "start": 44,
                                            "end": 49
                                        },
                                        "arguments": [{
                                                "type": "Literal",
                                                "start": 50,
                                                "end": 51,
                                                "value": 5,
                                                "raw": "5"
                                            },
                                            {
                                                "type": "SpreadElement",
                                                "start": 53,
                                                "end": 65,
                                                "argument": {
                                                    "type": "ArrayExpression",
                                                    "start": 56,
                                                    "end": 65,
                                                    "elements": [{
                                                            "type": "Literal",
                                                            "start": 57,
                                                            "end": 58,
                                                            "value": 6,
                                                            "raw": "6"
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "start": 60,
                                                            "end": 61,
                                                            "value": 7,
                                                            "raw": "7"
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "start": 63,
                                                            "end": 64,
                                                            "value": 8,
                                                            "raw": "8"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "type": "Literal",
                                                "start": 67,
                                                "end": 68,
                                                "value": 9,
                                                "raw": "9"
                                            }
                                        ]
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse object spread operator following other arguments with undefined', () => {
        expect(parseScript(`class A {
        constructor() {
          super({a: 1, b: 2, ...undefined});
        }
    }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor",
                                    "start": 18,
                                    "end": 29
                                },
                                "kind": "constructor",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "CallExpression",
                                                    "arguments": [
                                                        {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "a",
                                                                        "start": 51,
                                                                        "end": 52
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 1,
                                                                        "start": 54,
                                                                        "end": 55,
                                                                        "raw": "1"
                                                                    },
                                                                    "start": 51,
                                                                    "end": 55
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "b",
                                                                        "start": 57,
                                                                        "end": 58
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 2,
                                                                        "start": 60,
                                                                        "end": 61,
                                                                        "raw": "2"
                                                                    },
                                                                    "start": 57,
                                                                    "end": 61
                                                                },
                                                                {
                                                                    "type": "SpreadElement",
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "name": "undefined",
                                                                        "start": 66,
                                                                        "end": 75
                                                                    },
                                                                    "start": 63,
                                                                    "end": 75
                                                                }
                                                            ],
                                                            "start": 50,
                                                            "end": 76
                                                        }
                                                    ],
                                                    "callee": {
                                                        "type": "Super",
                                                        "start": 44,
                                                        "end": 49
                                                    },
                                                    "start": 44,
                                                    "end": 77
                                                },
                                                "start": 44,
                                                "end": 78
                                            }
                                        ],
                                        "start": 32,
                                        "end": 88
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 29,
                                    "end": 88
                                },
                                "start": 18,
                                "end": 88
                            }
                        ],
                        "start": 8,
                        "end": 94
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

    it('should parse object spread operator following other arguments with null value', () => {
        expect(parseScript(`class A {
        constructor() {
          super({a: 1, b: 2, ...null});
        }
    }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor",
                                    "start": 18,
                                    "end": 29
                                },
                                "kind": "constructor",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "CallExpression",
                                                    "arguments": [
                                                        {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "a",
                                                                        "start": 51,
                                                                        "end": 52
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 1,
                                                                        "start": 54,
                                                                        "end": 55,
                                                                        "raw": "1"
                                                                    },
                                                                    "start": 51,
                                                                    "end": 55
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "b",
                                                                        "start": 57,
                                                                        "end": 58
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 2,
                                                                        "start": 60,
                                                                        "end": 61,
                                                                        "raw": "2"
                                                                    },
                                                                    "start": 57,
                                                                    "end": 61
                                                                },
                                                                {
                                                                    "type": "SpreadElement",
                                                                    "argument": {
                                                                        "type": "Literal",
                                                                        "value": null,
                                                                        "start": 66,
                                                                        "end": 70,
                                                                        "raw": "null"
                                                                    },
                                                                    "start": 63,
                                                                    "end": 70
                                                                }
                                                            ],
                                                            "start": 50,
                                                            "end": 71
                                                        }
                                                    ],
                                                    "callee": {
                                                        "type": "Super",
                                                        "start": 44,
                                                        "end": 49
                                                    },
                                                    "start": 44,
                                                    "end": 72
                                                },
                                                "start": 44,
                                                "end": 73
                                            }
                                        ],
                                        "start": 32,
                                        "end": 83
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 29,
                                    "end": 83
                                },
                                "start": 18,
                                "end": 83
                            }
                        ],
                        "start": 8,
                        "end": 89
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

    it('should parse value of reference returned by SuperProperty', () => {
        expect(parseScript(`class A {
        constructor() {
          bar = (() => { return super['fromA']; })();
        }
    }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 103,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 103,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 103,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 18,
                        "end": 97,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 29,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 29,
                            "end": 97,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 32,
                                "end": 97,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 44,
                                    "end": 87,
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "start": 44,
                                        "end": 86,
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "start": 44,
                                            "end": 47,
                                            "name": "bar"
                                        },
                                        "right": {
                                            "type": "CallExpression",
                                            "start": 50,
                                            "end": 86,
                                            "callee": {
                                                "type": "ArrowFunctionExpression",
                                                "start": 51,
                                                "end": 83,
                                                "id": null,
                                                "generator": false,
                                                "expression": false,
                                                "async": false,
                                                "params": [],
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "start": 57,
                                                    "end": 83,
                                                    "body": [{
                                                        "type": "ReturnStatement",
                                                        "start": 59,
                                                        "end": 81,
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "start": 66,
                                                            "end": 80,
                                                            "object": {
                                                                "type": "Super",
                                                                "start": 66,
                                                                "end": 71
                                                            },
                                                            "property": {
                                                                "type": "Literal",
                                                                "start": 72,
                                                                "end": 79,
                                                                "value": "fromA",
                                                                "raw": "'fromA'"
                                                            },
                                                            "computed": true
                                                        }
                                                    }]
                                                }
                                            },
                                            "arguments": []
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse mix', () => {
        expect(parseScript(`class A {
      method() {
        viaCall = super['getThis']();
        viaMember = super['This'];
      }
    }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 113,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 113,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 113,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 16,
                        "end": 107,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 22,
                            "name": "method"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 107,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 107,
                                "body": [{
                                        "type": "ExpressionStatement",
                                        "start": 35,
                                        "end": 64,
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "start": 35,
                                            "end": 63,
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "start": 35,
                                                "end": 42,
                                                "name": "viaCall"
                                            },
                                            "right": {
                                                "type": "CallExpression",
                                                "start": 45,
                                                "end": 63,
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "start": 45,
                                                    "end": 61,
                                                    "object": {
                                                        "type": "Super",
                                                        "start": 45,
                                                        "end": 50
                                                    },
                                                    "property": {
                                                        "type": "Literal",
                                                        "start": 51,
                                                        "end": 60,
                                                        "value": "getThis",
                                                        "raw": "'getThis'"
                                                    },
                                                    "computed": true
                                                },
                                                "arguments": []
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "start": 73,
                                        "end": 99,
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "start": 73,
                                            "end": 98,
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "start": 73,
                                                "end": 82,
                                                "name": "viaMember"
                                            },
                                            "right": {
                                                "type": "MemberExpression",
                                                "start": 85,
                                                "end": 98,
                                                "object": {
                                                    "type": "Super",
                                                    "start": 85,
                                                    "end": 90
                                                },
                                                "property": {
                                                    "type": "Literal",
                                                    "start": 91,
                                                    "end": 97,
                                                    "value": "This",
                                                    "raw": "'This'"
                                                },
                                                "computed": true
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse complex', () => {
        expect(parseScript(`var obj = {
      method() {
        super.x = 8;
        Object.freeze(obj);
        try {
          super.y = 9;
        } catch (err) {
          caught = err;
        }
      }
    };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 187,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 187,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 186,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 7,
                        "name": "obj"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "start": 10,
                        "end": 186,
                        "properties": [{
                            "type": "Property",
                            "start": 18,
                            "end": 180,
                            "method": true,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 18,
                                "end": 24,
                                "name": "method"
                            },
                            "kind": "init",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 180,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 27,
                                    "end": 180,
                                    "body": [{
                                            "type": "ExpressionStatement",
                                            "start": 37,
                                            "end": 49,
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "start": 37,
                                                "end": 48,
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "start": 37,
                                                    "end": 44,
                                                    "object": {
                                                        "type": "Super",
                                                        "start": 37,
                                                        "end": 42
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "start": 43,
                                                        "end": 44,
                                                        "name": "x"
                                                    },
                                                    "computed": false
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "start": 47,
                                                    "end": 48,
                                                    "value": 8,
                                                    "raw": "8"
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "start": 58,
                                            "end": 77,
                                            "expression": {
                                                "type": "CallExpression",
                                                "start": 58,
                                                "end": 76,
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "start": 58,
                                                    "end": 71,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "start": 58,
                                                        "end": 64,
                                                        "name": "Object"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "start": 65,
                                                        "end": 71,
                                                        "name": "freeze"
                                                    },
                                                    "computed": false
                                                },
                                                "arguments": [{
                                                    "type": "Identifier",
                                                    "start": 72,
                                                    "end": 75,
                                                    "name": "obj"
                                                }]
                                            }
                                        },
                                        {
                                            "type": "TryStatement",
                                            "start": 86,
                                            "end": 172,
                                            "block": {
                                                "type": "BlockStatement",
                                                "start": 90,
                                                "end": 124,
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "start": 102,
                                                    "end": 114,
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "start": 102,
                                                        "end": 113,
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "MemberExpression",
                                                            "start": 102,
                                                            "end": 109,
                                                            "object": {
                                                                "type": "Super",
                                                                "start": 102,
                                                                "end": 107
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "start": 108,
                                                                "end": 109,
                                                                "name": "y"
                                                            },
                                                            "computed": false
                                                        },
                                                        "right": {
                                                            "type": "Literal",
                                                            "start": 112,
                                                            "end": 113,
                                                            "value": 9,
                                                            "raw": "9"
                                                        }
                                                    }
                                                }]
                                            },
                                            "handler": {
                                                "type": "CatchClause",
                                                "start": 125,
                                                "end": 172,
                                                "param": {
                                                    "type": "Identifier",
                                                    "start": 132,
                                                    "end": 135,
                                                    "name": "err"
                                                },
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "start": 137,
                                                    "end": 172,
                                                    "body": [{
                                                        "type": "ExpressionStatement",
                                                        "start": 149,
                                                        "end": 162,
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "start": 149,
                                                            "end": 161,
                                                            "operator": "=",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "start": 149,
                                                                "end": 155,
                                                                "name": "caught"
                                                            },
                                                            "right": {
                                                                "type": "Identifier",
                                                                "start": 158,
                                                                "end": 161,
                                                                "name": "err"
                                                            }
                                                        }
                                                    }]
                                                }
                                            },
                                            "finalizer": null
                                        }
                                    ]
                                }
                            }
                        }]
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse right shift between boolean and null', () => {
        expect(parseScript(`class A extends B {
            constructor() {
                () => super()
            }
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 101,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 101,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "start": 18,
                    "end": 101,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 32,
                        "end": 91,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 43,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 43,
                            "end": 91,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 46,
                                "end": 91,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 64,
                                    "end": 77,
                                    "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 64,
                                        "end": 77,
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "CallExpression",
                                            "start": 70,
                                            "end": 77,
                                            "callee": {
                                                "type": "Super",
                                                "start": 70,
                                                "end": 75
                                            },
                                            "arguments": []
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse constructor super', () => {
        expect(parseScript(`class A extends B {
            constructor() {
                super();
            }
        }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 96,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 96,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "start": 18,
                    "end": 96,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 32,
                        "end": 86,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 43,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 43,
                            "end": 86,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 46,
                                "end": 86,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 64,
                                    "end": 72,
                                    "expression": {
                                        "type": "CallExpression",
                                        "start": 64,
                                        "end": 71,
                                        "callee": {
                                            "type": "Super",
                                            "start": 64,
                                            "end": 69
                                        },
                                        "arguments": []
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse super computed', () => {
        expect(parseScript(`class A extends B {
            X() {
                return super[1]
            }
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 93,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 93,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "start": 18,
                    "end": 93,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 32,
                        "end": 83,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 33,
                            "name": "X"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 33,
                            "end": 83,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 36,
                                "end": 83,
                                "body": [{
                                    "type": "ReturnStatement",
                                    "start": 54,
                                    "end": 69,
                                    "argument": {
                                        "type": "MemberExpression",
                                        "start": 61,
                                        "end": 69,
                                        "object": {
                                            "type": "Super",
                                            "start": 61,
                                            "end": 66
                                        },
                                        "property": {
                                            "type": "Literal",
                                            "start": 67,
                                            "end": 68,
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        "computed": true
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield followed by super', () => {
        expect(parseScript(`({ *f() { yield super.f(); } })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 31
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "name": "f"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 5,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 8,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 10,
                              "end": 26,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 10
                                },
                                "end": {
                                  "line": 1,
                                  "column": 26
                                }
                              },
                              "expression": {
                                "type": "YieldExpression",
                                "start": 10,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 10
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "delegate": false,
                                "argument": {
                                  "type": "CallExpression",
                                  "start": 16,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "callee": {
                                    "type": "MemberExpression",
                                    "start": 16,
                                    "end": 23,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 16
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 23
                                      }
                                    },
                                    "object": {
                                      "type": "Super",
                                      "start": 16,
                                      "end": 21,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 16
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 21
                                        }
                                      }
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 22,
                                      "end": 23,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 22
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 23
                                        }
                                      },
                                      "name": "f"
                                    },
                                    "computed": false
                                  },
                                  "arguments": []
                                }
                              }
                            }
                          ]
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

    it('should parse super member', () => {
        expect(parseScript(`class A extends B {
            X() {
                return super.y
            }
        }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 92,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 92,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "start": 18,
                    "end": 92,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 32,
                        "end": 82,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 32,
                            "end": 33,
                            "name": "X"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 33,
                            "end": 82,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 36,
                                "end": 82,
                                "body": [{
                                    "type": "ReturnStatement",
                                    "start": 54,
                                    "end": 68,
                                    "argument": {
                                        "type": "MemberExpression",
                                        "start": 61,
                                        "end": 68,
                                        "object": {
                                            "type": "Super",
                                            "start": 61,
                                            "end": 66
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "start": 67,
                                            "end": 68,
                                            "name": "y"
                                        },
                                        "computed": false
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

});