import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;
   
describe('Next - Object rest spread', () => {
    
        it('should parse "let { x, y, ...z, } = obj;"', () => {
            expect(() => {
                parseScript('let { x, y, ...z, } = obj;')
            }).to.throw('');
        });
    
        it('should fail on duplicates', () => {
            expect(() => {
                parseModule(`export const foo = 1;
                export const [bar, [{ baz, ...foo }]] = qux;`, {
                    next: true
                })
            }).to.throw();
        });

        it('should parse "function test({...x = 1}) {}"', () => {
            expect(() => {
                parseScript('function test({...x = 1}) {}', {
                    next: true
                })
            }).to.throw('');
        });

        it('should parse "function test({...x = 1}) {}"', () => {
            expect(() => {
                parseScript('function test({...x = 1}) {}', {
                    next: true
                })
            }).to.throw('');
        });

        it('should fail on "({ x, ...{ y, z } } = o)" to throw', () => {
            expect(() => {
                parseScript('({ x, ...{ y, z } } = o)', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "function test({...{a}}) {}" to throw', () => {
            expect(() => {
                parseScript('function test({...{a}}) {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({...{}} = {})" to throw', () => {
            expect(() => {
                parseScript('({...{}} = {})', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "function test({...{}}) {}" to throw', () => {
            expect(() => {
                parseScript('function test({...{}}) {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({ x, ...{ y, z } } = o)" to throw', () => {
            expect(() => {
                parseScript('({ x, ...{ y, z } } = o)', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({ x, ...{ y, z } } = o)" to throw', () => {
            expect(() => {
                parseScript('({ x, ...{ y, z } } = o)', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({ x, ...{ y, z } } = o)" to throw', () => {
            expect(() => {
                parseScript('({ x, ...{ y, z } } = o)', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({...x = 1} = {})" to throw', () => {
            expect(() => {
                parseScript('({...x = 1} = {})', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "var {...x = 1} = {}" to throw', () => {
            expect(() => {
                parseScript('var {...x = 1} = {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "function test({...x = 1}) {}" to throw', () => {
            expect(() => {
                parseScript('function test({...x = 1}) {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "({...[]} = {})" to throw', () => {
            expect(() => {
                parseScript('({...[]} = {})', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "var {...[]} = {}" to throw', () => {
            expect(() => {
                parseScript('var {...[]} = {}', {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on "function test({...[]}) {}" to throw', () => {
            expect(() => {
                parseScript('function test({...[]}) {}', {
                    next: true
                });
            }).to.throw();
        });


        it('should parse "let { x, y, } = obj;"', () => {
            expect(parseScript('let { x, y, } = obj;', {
                next: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Identifier",
                                    "name": "obj"
                                },
                                "id": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "method": false,
                                            "shorthand": true
                                        },
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "method": false,
                                            "shorthand": true
                                        }
                                    ]
                                }
                            }
                        ],
                        "kind": "let"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse function extension', () => {
            expect(parseScript('function f({ x, y, ...z }) {}', {
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [{
                        "type": "ObjectPattern",
                        "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "z"
                                }
                            }
                        ]
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse shallow clone', () => {
            expect(parseScript('let { ...x } = y;', {
                next: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse simple rest properties', () => {
            expect(parseScript('let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };', {
                next: true
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
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
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
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 1
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 2
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 3
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 4
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
     
        it('should parse "let { ...x, y, z } = obj;"', () => {
            expect(parseModule(`let { ...x, y, z } = obj;`, {
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "properties": [{
                                    "argument": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "type": "RestElement"
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "y",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "y",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "z",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "z",
                                        "type": "Identifier"
                                    }
                                }
                            ],
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "name": "obj",
                            "type": "Identifier"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "let",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "module",
                "type": "Program"
            });
        });
    
        it('should parse "let { x, ...y, ...z } = obj;"', () => {
            expect(parseModule(`let { x, ...y, ...z } = obj;`, {
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "x",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "argument": {
                                        "name": "y",
                                        "type": "Identifier"
                                    },
                                    "type": "RestElement"
                                },
                                {
                                    "argument": {
                                        "name": "z",
                                        "type": "Identifier"
                                    },
                                    "type": "RestElement"
                                }
                            ],
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "name": "obj",
                            "type": "Identifier"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "let",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "module",
                "type": "Program"
            });
        });
    
    
        it('should parse "let z = {...x}"', () => {
            expect(parseScript('let z = {...x}', {
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "z",
                            "type": "Identifier"
                        },
                        "init": {
                            "properties": [{
                                "argument": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "type": "SpreadElement"
                            }],
                            "type": "ObjectExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "let",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });

        it('should parse "z = {x, ...y}"', () => {
            expect(parseScript('z = {x, ...y}', {
                next: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "left": {
                            "name": "z",
                            "type": "Identifier"
                        },
                        "operator": "=",
                        "right": {
                            "properties": [{
                                    "computed": false,
                                    "key": {
                                        "name": "x",
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "type": "Property",
                                    "value": {
                                        "name": "x",
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "argument": {
                                        "name": "y",
                                        "type": "Identifier"
                                    },
                                    "type": "SpreadElement"
                                }
                            ],
                            "type": "ObjectExpression"
                        },
                        "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "({x, ...y, a, ...b, c})"', () => {
            expect(parseScript('({x, ...y, a, ...b, c})', {
                next: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "x",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "type": "SpreadElement"
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "a",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "type": "SpreadElement"
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "c",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "c",
                                    "type": "Identifier"
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "x < y"', () => {
            expect(parseModule('export const [bar, { baz, ...foo }] = qux;', {
                next: true
            })).to.eql({
                "body": [{
                    "declaration": {
                        "declarations": [{
                            "id": {
                                "elements": [{
                                        "name": "bar",
                                        "type": "Identifier"
                                    },
                                    {
                                        "properties": [{
                                                "computed": false,
                                                "key": {
                                                    "name": "baz",
                                                    "type": "Identifier"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": true,
                                                "type": "Property",
                                                "value": {
                                                    "name": "baz",
                                                    "type": "Identifier"
                                                }
                                            },
                                            {
                                                "argument": {
                                                    "name": "foo",
                                                    "type": "Identifier"
                                                },
                                                "type": "RestElement"
                                            }
                                        ],
                                        "type": "ObjectPattern"
                                    }
                                ],
                                "type": "ArrayPattern"
                            },
                            "init": {
                                "name": "qux",
                                "type": "Identifier"
                            },
                            "type": "VariableDeclarator"
                        }, ],
                        "kind": "const",
                        "type": "VariableDeclaration"
                    },
                    "source": null,
                    "specifiers": [],
                    "type": "ExportNamedDeclaration"
                }],
                "sourceType": "module",
                "type": "Program"
            });
        });

        it('should parse "({x, ...y, a, ...b, c, })"', () => {
            expect(parseScript('({x, ...y, a, ...b, c, })', {
                next: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "x",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "type": "SpreadElement"
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "a",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "type": "SpreadElement"
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "c",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "c",
                                    "type": "Identifier"
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
    });