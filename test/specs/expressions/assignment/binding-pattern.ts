import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;
   
describe('Binding pattern', () => {

    describe('Object', () => {

        it('should fail on invalid complex binding without initalizer', () => {
            expect(() => {
                parseScript(`let []`, {});
            }).to.throw();
        });

        it('should parse "var [{a = 0}] = 0;"', () => {
            expect(parseScript(`var [{a = 0}] = 0;`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 0
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }]
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var [{__proto__:a, __proto__:b}] = 0;"', () => {
            expect(parseScript(`var [{__proto__:a, __proto__:b}] = 0;`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ObjectPattern",
                                "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "__proto__"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "__proto__"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "b"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var {a, x: {y: a}} = 0;"', () => {
            expect(parseScript(`var {a, x: {y: a}} = 0;`)).to.eql({
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
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var a, {x: {y: a}} = 0;"', () => {
            expect(parseScript(`var a, {x: {y: a}} = 0;`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }]
                            },
                            "init": {
                                "type": "Literal",
                                "value": 0
                            }
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var {let, yield} = 0;"', () => {
            expect(parseScript(`var {let, yield} = 0;`)).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "let",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "let",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "yield",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "yield",
                                        "type": "Identifier"
                                    }
                                }
                            ],
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });

        it.skip('should parse "var {a: b.c} = 0;"', () => {
            expect(parseScript(`var {a: b.c} = 0;`)).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "a",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "type": "Property",
                                    "value": {
                                        "name": "b",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "b",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "type": "Property",
                                    "value": {
                                        "name": "c",
                                        "type": "Identifier"
                                    }
                                }
                            ],
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });

        it('should parse "var {a} = 0;"', () => {
            expect(parseScript(`var {a} = 0;`)).to.eql({
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
                            "type": "Literal",
                            "value": 0
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

    });

    describe('Array', () => {

        it('should parse "var [a, ...b] = c;"', () => {
            expect(parseScript(`var [a, ...b] = c;`)).to.eql({
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
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "c"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "const [a] = [];"', () => {
            expect(parseScript(`const [a] = [];`)).to.eql({
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

        it('should parse empty pattern lexical', () => {
            expect(parseScript(`[,,]=0`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                null,
                                null
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse duplicate assignment', () => {
            expect(parseScript(`[a,a,,...a]=0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                null,
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
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
        it('should parse member expression in rest', () => {
            expect(parseScript(`[...a[0]] = 0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "property": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "(let[a] = b);"', () => {
            expect(parseScript(`(let[a] = b);`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "MemberExpression",
                            "computed": true,
                            "object": {
                                "type": "Identifier",
                                "name": "let"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "a"
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x] = 0"', () => {
            expect(parseScript(`[x] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "Identifier",
                                "name": "x"
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });
        it('should parse "[x,] = 0"', () => {
            expect(parseScript(`[x,] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "Identifier",
                                "name": "x"
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x,,] = 0"', () => {
            expect(parseScript(`[x,,] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                null
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[[x]] = 0"', () => {
            expect(parseScript(`[[x]] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }]
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x, y, ...z] = 0"', () => {
            expect(parseScript(`[x, y, ...z] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "z"
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[, x,,] = 0"', () => {
            expect(parseScript(`[, x,,] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                null,
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                null
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[...[x]] = 0"', () => {
            expect(parseScript(`[...[x]] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "Identifier",
                                        "name": "x"
                                    }]
                                }
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x, x] = 0"', () => {
            expect(parseScript(`[x, x] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x, ...x] = 0"', () => {
            expect(parseScript(`[x, ...x] = 0`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,

                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x.a=a] = b"', () => {
            expect(parseScript(`[x.a=a] = b`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[x[a]=a] = b"', () => {
            expect(parseScript(`[x[a]=a] = b`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "[...[...a[x]]] = b"', () => {
            expect(parseScript(`[...[...a[x]]] = b`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "MemberExpression",
                                            "computed": true,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "x"
                                            }
                                        }
                                    }]
                                }
                            }]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse simple assignment', () => {
            expect(parseScript(`[a] = 0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "Identifier",
                                "name": "a"
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });


        it('should parse duplicate assignment', () => {
            expect(parseScript(`[[x]] = 0`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }]
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });


        it('should parse var with let in an array', () => {
            expect(parseScript(`var [let] = answer;`, {
                raw: true
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
                                "name": "let"
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "answer"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse empty pattern lexical', () => {
            expect(parseScript(`let [] = [];`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": []
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "elements": []
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });


        it('should parse empty pattern', () => {
            expect(parseScript(`var [] = 0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": []
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse pattern with hole', () => {
            expect(parseScript(`let [a,,b]=0`, {
                raw: true
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
                                },
                                null,
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it('should parse nested pattern', () => {
            expect(parseScript(`let [[]] = 0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": []
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });


        it('should fail on pattern with default catch parameter', () => {
            expect(() => {
                parseScript(`try { } catch ([a] = []) { }`, {});
            }).to.throw();
        });

        it('should parse array pattern with rest', () => {
            expect(parseScript(`let [...a] = 0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it('should parse array pattern with tailing hold', () => {
            expect(parseScript(`let [a,,]=0`, {
                raw: true
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
                                },
                                null
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it('should parse array pattern with object pattern', () => {
            expect(parseScript(`let [{a}] = 0`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
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
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    });


    describe('Object', () => {

        it('should parse object pattern with ellison', () => {
            expect(parseScript(`let {a,} = 0`, {
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
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it('should parse object pattern with empty lexical', () => {
            expect(parseScript(`let {} = 0`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": []
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it('should parse object pattern with empty var', () => {
            expect(parseScript(`var {} = 0`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": []
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse object pattern nested', () => {
            expect(parseScript(`let {a:{}} = 0`, {
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
                                    "type": "ObjectPattern",
                                    "properties": []
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });

        it.skip('should parse object pattern with properties', () => {
            expect(parseScript(`let {a,b=0,c:d,e:f=0,[g]:[h]}=0`, {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 31,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 31,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 31,
                        "id": {
                          "type": "ObjectPattern",
                          "start": 4,
                          "end": 29,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 5,
                              "end": 6,
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                              }
                            },
                            {
                              "type": "Property",
                              "start": 7,
                              "end": 10,
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 8,
                                "name": "b"
                              },
                              "kind": "init",
                              "value": {
                                "type": "AssignmentPattern",
                                "start": 7,
                                "end": 10,
                                "left": {
                                  "type": "Identifier",
                                  "start": 7,
                                  "end": 8,
                                  "name": "b"
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 9,
                                  "end": 10,
                                  "value": 0,
                                  "raw": "0"
                                }
                              }
                            },
                            {
                              "type": "Property",
                              "start": 11,
                              "end": 14,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "name": "c"
                              },
                              "value": {
                                "type": "Identifier",
                                "start": 13,
                                "end": 14,
                                "name": "d"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 15,
                              "end": 20,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "e"
                              },
                              "value": {
                                "type": "AssignmentPattern",
                                "start": 17,
                                "end": 20,
                                "left": {
                                  "type": "Identifier",
                                  "start": 17,
                                  "end": 18,
                                  "name": "f"
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 19,
                                  "end": 20,
                                  "value": 0,
                                  "raw": "0"
                                }
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 21,
                              "end": 28,
                              "method": false,
                              "shorthand": false,
                              "computed": true,
                              "key": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "g"
                              },
                              "value": {
                                "type": "ArrayPattern",
                                "start": 25,
                                "end": 28,
                                "elements": [
                                  {
                                    "type": "Identifier",
                                    "start": 26,
                                    "end": 27,
                                    "name": "h"
                                  }
                                ]
                              },
                              "kind": "init"
                            }
                          ]
                        },
                        "init": {
                          "type": "Literal",
                          "start": 30,
                          "end": 31,
                          "value": 0,
                          "raw": "0"
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
});