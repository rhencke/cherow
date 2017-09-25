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

    it('should fail on invalid if', () => {
      expect(() => { parseScript('class A extends B { constructor() { (super).a(); } }') }).to.not.throw()
    });

    it('should fail on invalid if', () => {
      expect(() => { parseScript('({ a() { (super).b(); } });') }).to.not.throw()
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

    it('should parse "class A extends B { "constructor"() { super() } }"', () => {
        expect(parseScript(`class A extends B { "constructor"() { super() } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 49,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 49
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 49,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 49
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 49,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 49
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 47,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 47
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 20,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "value": "constructor",
                        "raw": "\"constructor\""
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 33,
                        "end": 47,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 47
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 36,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 36
                            },
                            "end": {
                              "line": 1,
                              "column": 47
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 38,
                              "end": 45,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 38
                                },
                                "end": {
                                  "line": 1,
                                  "column": 45
                                }
                              },
                              "expression": {
                                "type": "CallExpression",
                                "start": 38,
                                "end": 45,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 38
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 45
                                  }
                                },
                                "callee": {
                                  "type": "Super",
                                  "start": 38,
                                  "end": 43,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 38
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 43
                                    }
                                  }
                                },
                                "arguments": []
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

    it('should parse "class A extends B { constructor(a = super()){} }"', () => {
        expect(parseScript(`class A extends B { constructor(a = super()){} }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 48
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 48
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 48
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 46,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 46
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 32,
                            "end": 43,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 32
                              },
                              "end": {
                                "line": 1,
                                "column": 43
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 32,
                              "end": 33,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 32
                                },
                                "end": {
                                  "line": 1,
                                  "column": 33
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 36,
                              "end": 43,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 43
                                }
                              },
                              "callee": {
                                "type": "Super",
                                "start": 36,
                                "end": 41,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 41
                                  }
                                }
                              },
                              "arguments": []
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 44,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 44
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "body": []
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

    it('should parse "class A extends B { constructor() { ({a: super()}); } }"', () => {
        expect(parseScript(`class A extends B { constructor() { ({a: super()}); } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 55,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 55
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 55,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 55
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 55,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 55
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 53
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 53
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 53,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 53
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 36,
                              "end": 51,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 51
                                }
                              },
                              "expression": {
                                "type": "ObjectExpression",
                                "start": 37,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 37
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 49
                                  }
                                },
                                "properties": [
                                  {
                                    "type": "Property",
                                    "start": 38,
                                    "end": 48,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 38
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 48
                                      }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "key": {
                                      "type": "Identifier",
                                      "start": 38,
                                      "end": 39,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 38
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 39
                                        }
                                      },
                                      "name": "a"
                                    },
                                    "value": {
                                      "type": "CallExpression",
                                      "start": 41,
                                      "end": 48,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 41
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 48
                                        }
                                      },
                                      "callee": {
                                        "type": "Super",
                                        "start": 41,
                                        "end": 46,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 41
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 46
                                          }
                                        }
                                      },
                                      "arguments": []
                                    },
                                    "kind": "init"
                                  }
                                ]
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

    it('should parse "class A extends B { constructor() { () => super(); } }"', () => {
        expect(parseScript(`class A extends B { constructor() { () => super(); } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 54,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 54
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 54,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 54
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 54
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 52
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 52,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 52
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 52,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 52
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 36,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 50
                                }
                              },
                              "expression": {
                                "type": "ArrowFunctionExpression",
                                "start": 36,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 49
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": true,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "CallExpression",
                                  "start": 42,
                                  "end": 49,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 42
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 49
                                    }
                                  },
                                  "callee": {
                                    "type": "Super",
                                    "start": 42,
                                    "end": 47,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 42
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 47
                                      }
                                    }
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

    it('should parse "class A extends B { constructor() { () => { super(); } } }"', () => {
        expect(parseScript(`class A extends B { constructor() { () => { super(); } } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 58,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 58
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 58,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 58
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 58,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 58
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 56,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 56
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 56,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 56
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 36,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 54
                                }
                              },
                              "expression": {
                                "type": "ArrowFunctionExpression",
                                "start": 36,
                                "end": 54,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 54
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 42,
                                  "end": 54,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 42
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 54
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 44,
                                      "end": 52,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 44
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 52
                                        }
                                      },
                                      "expression": {
                                        "type": "CallExpression",
                                        "start": 44,
                                        "end": 51,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 44
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 51
                                          }
                                        },
                                        "callee": {
                                          "type": "Super",
                                          "start": 44,
                                          "end": 49,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 44
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 49
                                            }
                                          }
                                        },
                                        "arguments": []
                                      }
                                    }
                                  ]
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

    it('should parse "({ a() { super.b(); } });"', () => {
        expect(parseScript(`({ a() { super.b(); } });`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 25
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 4,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 3
                          },
                          "end": {
                            "line": 1,
                            "column": 4
                          }
                        },
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 7,
                          "end": 21,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 21
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 9,
                              "end": 19,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 9
                                },
                                "end": {
                                  "line": 1,
                                  "column": 19
                                }
                              },
                              "expression": {
                                "type": "CallExpression",
                                "start": 9,
                                "end": 18,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 9
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 18
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 9,
                                  "end": 16,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 16
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 9,
                                    "end": 14,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 9
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 14
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 15,
                                    "end": 16,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 16
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
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

    it('should parse "({ *a() { super.b = 0; } });"', () => {
        expect(parseScript(`({ *a() { super.b = 0; } });`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 24
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
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 5,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 24
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
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 10,
                              "end": 22,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 10
                                },
                                "end": {
                                  "line": 1,
                                  "column": 22
                                }
                              },
                              "expression": {
                                "type": "AssignmentExpression",
                                "start": 10,
                                "end": 21,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 10
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 21
                                  }
                                },
                                "operator": "=",
                                "left": {
                                  "type": "MemberExpression",
                                  "start": 10,
                                  "end": 17,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 10
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 17
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 10,
                                    "end": 15,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 10
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 15
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 16,
                                    "end": 17,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 16
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 17
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 20,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  },
                                  "value": 0,
                                  "raw": "0"
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

    it('should parse "({ get a() { super[0] = 1; } });"', () => {
        expect(parseScript(`({ get a() { super[0] = 1; } });`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
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
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "a"
                      },
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 11,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 13,
                              "end": 26,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 26
                                }
                              },
                              "expression": {
                                "type": "AssignmentExpression",
                                "start": 13,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "operator": "=",
                                "left": {
                                  "type": "MemberExpression",
                                  "start": 13,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 13
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 13,
                                    "end": 18,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 13
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 18
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Literal",
                                    "start": 19,
                                    "end": 20,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 20
                                      }
                                    },
                                    "value": 0,
                                    "raw": "0"
                                  },
                                  "computed": true
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 24,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 24
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "value": 1,
                                  "raw": "1"
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

    it('should parse "({ set a(x) { super.b[0] = 1; } });"', () => {
        expect(parseScript(`({ set a(x) { super.b[0] = 1; } });`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 35
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 33,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "a"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 8,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "x"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 12,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 31
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 14,
                              "end": 29,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 29
                                }
                              },
                              "expression": {
                                "type": "AssignmentExpression",
                                "start": 14,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 14
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "operator": "=",
                                "left": {
                                  "type": "MemberExpression",
                                  "start": 14,
                                  "end": 24,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 24
                                    }
                                  },
                                  "object": {
                                    "type": "MemberExpression",
                                    "start": 14,
                                    "end": 21,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 21
                                      }
                                    },
                                    "object": {
                                      "type": "Super",
                                      "start": 14,
                                      "end": 19,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 14
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 19
                                        }
                                      }
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 20,
                                      "end": 21,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 20
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 21
                                        }
                                      },
                                      "name": "b"
                                    },
                                    "computed": false
                                  },
                                  "property": {
                                    "type": "Literal",
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
                                    "value": 0,
                                    "raw": "0"
                                  },
                                  "computed": true
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 27,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 27
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "value": 1,
                                  "raw": "1"
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

    it('should parse "(class { constructor() { super.x } })"', () => {
        expect(parseScript(`(class { constructor() { super.x } })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 37
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 37
                  }
                },
                "expression": {
                  "type": "ClassExpression",
                  "start": 1,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "id": null,
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 7,
                    "end": 36,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 36
                      }
                    },
                    "body": [
                      {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 20,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 23,
                            "end": 34,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 23
                              },
                              "end": {
                                "line": 1,
                                "column": 34
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 25,
                                "end": 32,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 25
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 32
                                  }
                                },
                                "expression": {
                                  "type": "MemberExpression",
                                  "start": 25,
                                  "end": 32,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 32
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 25,
                                    "end": 30,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 30
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 31
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 32
                                      }
                                    },
                                    "name": "x"
                                  },
                                  "computed": false
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "class A { a() { () => super.b; } }"', () => {
        expect(parseScript(`class A { a() { () => super.b; } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 34
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 34,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 34
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 34
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 10
                          },
                          "end": {
                            "line": 1,
                            "column": 11
                          }
                        },
                        "name": "a"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 11,
                        "end": 32,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 32
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 14,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 14
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 16,
                              "end": 30,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 16
                                },
                                "end": {
                                  "line": 1,
                                  "column": 30
                                }
                              },
                              "expression": {
                                "type": "ArrowFunctionExpression",
                                "start": 16,
                                "end": 29,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 29
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": true,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "MemberExpression",
                                  "start": 22,
                                  "end": 29,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 29
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 22,
                                    "end": 27,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 27
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 28,
                                    "end": 29,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 28
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 29
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
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

    it('should parse "class A extends B { constructor() { super.x } }"', () => {
        expect(parseScript(`class A extends B { constructor() { super.x } }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 47
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 47,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 47
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "name": "B"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 47
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 20,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 45
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 45,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 45
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 45,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 45
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 36,
                              "end": 43,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 43
                                }
                              },
                              "expression": {
                                "type": "MemberExpression",
                                "start": 36,
                                "end": 43,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 43
                                  }
                                },
                                "object": {
                                  "type": "Super",
                                  "start": 36,
                                  "end": 41,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 36
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 41
                                    }
                                  }
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 42,
                                  "end": 43,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 42
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 43
                                    }
                                  },
                                  "name": "x"
                                },
                                "computed": false
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

    it('should parse "class A { a() { new super.b; } }"', () => {
        expect(parseScript(`class A { a() { new super.b; } }`, {
            ranges: true,
            raw: true
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
                                    "name": "a",
                                    "start": 10,
                                    "end": 11
                                },
                                "kind": "method",
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
                                                    "type": "NewExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Super",
                                                            "start": 20,
                                                            "end": 25
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "b",
                                                            "start": 26,
                                                            "end": 27
                                                        },
                                                        "start": 16,
                                                        "end": 27
                                                    },
                                                    "arguments": [],
                                                    "start": 16,
                                                    "end": 27
                                                },
                                                "start": 16,
                                                "end": 28
                                            }
                                        ],
                                        "start": 14,
                                        "end": 30
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 11,
                                    "end": 30
                                },
                                "start": 10,
                                "end": 30
                            }
                        ],
                        "start": 8,
                        "end": 32
                    },
                    "start": 0,
                    "end": 32
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 32
        });
    });

    it('should parse "({ *f() { yield super.f(); } })"', () => {
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

    it('should parse "class A { a() { new super.b(); } }"', () => {
        expect(parseScript(`class A { a() { new super.b(); } }`, {
            ranges: true,
            raw: true,
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
                                    "name": "a",
                                    "start": 10,
                                    "end": 11
                                },
                                "kind": "method",
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
                                                    "type": "NewExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Super",
                                                            "start": 20,
                                                            "end": 25
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "b",
                                                            "start": 26,
                                                            "end": 27
                                                        },
                                                        "start": 16,
                                                        "end": 27
                                                    },
                                                    "arguments": [],
                                                    "start": 16,
                                                    "end": 29
                                                },
                                                "start": 16,
                                                "end": 30
                                            }
                                        ],
                                        "start": 14,
                                        "end": 32
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 11,
                                    "end": 32
                                },
                                "start": 10,
                                "end": 32
                            }
                        ],
                        "start": 8,
                        "end": 34
                    },
                    "start": 0,
                    "end": 34
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 34
        });
    });

    it('should parse "(class extends B { constructor() { super() } });"', () => {
        expect(parseScript(`(class extends B { constructor() { super() } });`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 48
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 48
                  }
                },
                "expression": {
                  "type": "ClassExpression",
                  "start": 1,
                  "end": 46,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 46
                    }
                  },
                  "id": null,
                  "superClass": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "B"
                  },
                  "body": {
                    "type": "ClassBody",
                    "start": 17,
                    "end": 46,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 46
                      }
                    },
                    "body": [
                      {
                        "type": "MethodDefinition",
                        "start": 19,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 19
                          },
                          "end": {
                            "line": 1,
                            "column": 44
                          }
                        },
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 19,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 30,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 30
                            },
                            "end": {
                              "line": 1,
                              "column": 44
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 33,
                            "end": 44,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 44
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 35,
                                "end": 42,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 35
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 42
                                  }
                                },
                                "expression": {
                                  "type": "CallExpression",
                                  "start": 35,
                                  "end": 42,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 42
                                    }
                                  },
                                  "callee": {
                                    "type": "Super",
                                    "start": 35,
                                    "end": 40,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 35
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 40
                                      }
                                    }
                                  },
                                  "arguments": []
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
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