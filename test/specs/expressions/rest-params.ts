import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Rest parameters', () => {
    
    it('should fail on no default', () => {
        expect(() => {
            parseScript('function f(a, ...b = 0);')
        }).to.throw()
    });

    it('should fail on complex rest in arrow', () => {
        expect(() => {
            parseScript('(a,...[a]) => 0;')
        }).to.throw()
    });

    it('should fail on not last', () => {
        expect(() => {
            parseScript('function f(a, ...b, c);')
        }).to.throw()
    });

    describe('Object pattern', () => {

        it('should parse empty', () => {
            expect(parseScript('function empty(...{}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "empty"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ObjectPattern",
                            "properties": []
                        }
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

        it('should parse empty with array', () => {
            expect(parseScript('function emptyWithArray(...{p: []}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p"
                                },
                                "computed": false,
                                "value": {
                                    "type": "ArrayPattern",
                                    "elements": []
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
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

        it('should parse empty with object', () => {
            expect(parseScript('function emptyWithObject(...{p: {}}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p"
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
                        }
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

        it('should parse empty with leading', () => {
            expect(parseScript('function emptyWithLeading(x, ...{}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithLeading"
                    },
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "ObjectPattern",
                                "properties": []
                            }
                        }
                    ],
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

        it('should parse single element', () => {
            expect(parseScript('function singleElement(...{a: b}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElement"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
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
                        }
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

        it('should parse single element with initializer', () => {
            expect(parseScript('function singleElementWithInitializer(...{a: b = 0}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithInitializer"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
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
                                        "name": "b"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
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

        it('should parse single element with array', () => {
            expect(parseScript('function singleElementWithArray(...{p: [a]}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p"
                                },
                                "computed": false,
                                "value": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    }]
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
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

        it('should parse single element with object', () => {
            expect(parseScript('function singleElementWithObject(...[{p: q}]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "p"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "q"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }]
                            }]
                        }
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

        it('should parse single element with leading', () => {
            expect(parseScript('function singleElementWithLeading(x, ...{a: b}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithLeading"
                    },
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
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
                            }
                        }
                    ],
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

        it('should parse multi element', () => {
            expect(parseScript('function multiElement(...{a: r, b: s, c: t}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElement"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
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
                                        "name": "r"
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
                                        "type": "Identifier",
                                        "name": "s"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "c"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "t"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
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

        it('should parse multi element with initializer', () => {
            expect(parseScript('function multiElementWithInitializer(...{a: r = 0, b: s, c: t = 1}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithInitializer"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
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
                                            "name": "r"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 0
                                        }
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
                                        "type": "Identifier",
                                        "name": "s"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "c"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "t"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 1
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
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

        it('should parse multi element with array', () => {
            expect(parseScript('function multiElementWithArray(...{p: [a], b, q: [c]}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "p"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "a"
                                        }]
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
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "q"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "c"
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
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

        it('should parse multi element with object', () => {
            expect(parseScript('function multiElementWithObject(...{a: {p: q}, b: {r}, c: {s = 0}}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
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
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "p"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "q"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
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
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "r"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "r"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "c"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "s"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "s"
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
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
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

        it('should parse multi element with leading', () => {
            expect(parseScript('function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithLeading"
                    },
                    "params": [{
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
                                            "name": "r"
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
                                            "type": "Identifier",
                                            "name": "s"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "c"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "t"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }
                        }
                    ],
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

    });

    describe('Array pattern', () => {

        it('should parse empty', () => {
            expect(parseScript('function empty(...[]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "empty"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": []
                        }
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

        it('should parse empty with array', () => {
            expect(parseScript('function emptyWithArray(...[[]]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": []
                            }]
                        }
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

        it('should parse empty with object', () => {
            expect(parseScript('function emptyWithObject(...[{}]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ObjectPattern",
                                "properties": []
                            }]
                        }
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

        it('should parse empty with rest', () => {
            expect(parseScript('function emptyWithRest(...[...[]]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithRest"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": []
                                }
                            }]
                        }
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

        it('should parse empt with leading', () => {
            expect(parseScript('function emptyWithLeading(x, ...[]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "emptyWithLeading"
                    },
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "ArrayPattern",
                                "elements": []
                            }
                        }
                    ],
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

        it('should parse single element', () => {
            expect(parseScript('function singleElement(...[a]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElement"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "Identifier",
                                "name": "a"
                            }]
                        }
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

        it('should parse single element with initializer', () => {
            expect(parseScript('function singleElementWithInitializer(...[a = 0]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithInitializer"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 0
                                }
                            }]
                        }
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

        it('should parse single element with array', () => {
            expect(parseScript('function singleElementWithArray(...[[a]]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                }]
                            }]
                        }
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

        it('should parse single element with object', () => {
            expect(parseScript('function singleElementWithObject(...[{p: q}]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "p"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "q"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }]
                            }]
                        }
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

        it('should parse single element with rest', () => {
            expect(parseScript('function singleElementWithRest(...[...a]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithRest"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }]
                        }
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

        it('should parse single element with leading', () => {
            expect(parseScript('function singleElementWithLeading(x, ...[a]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "singleElementWithLeading"
                    },
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                }]
                            }
                        }
                    ],
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

        it('should parse multi element', () => {
            expect(parseScript('function multiElement(...[a, b, c]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElement"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
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

        it('should parse multi element with initializer', () => {
            expect(parseScript('function multiElementWithInitializer(...[a = 0, b, c = 1]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithInitializer"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
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
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "c"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 1
                                    }
                                }
                            ]
                        }
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

        it('should parse multi element with array', () => {
            expect(parseScript('function multiElementWithArray(...[[a], b, [c]]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithArray"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    }]
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "Identifier",
                                        "name": "c"
                                    }]
                                }
                            ]
                        }
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

        it('should parse multi element with object', () => {
            expect(parseScript('function multiElementWithObject(...[{p: q}, {r}, {s = 0}]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithObject"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "p"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "q"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }]
                                },
                                {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "r"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "r"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true
                                    }]
                                },
                                {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "s"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "s"
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
                                }
                            ]
                        }
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

        it('should parse multi element with rest', () => {
            expect(parseScript('function multiElementWithRest(...[a, b, ...c]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithRest"
                    },
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                }
                            ]
                        }
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

        it('should parse multi element with leading', () => {
            expect(parseScript('function multiElementWithLeading(x, y, ...[a, b, c]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "multiElementWithLeading"
                    },
                    "params": [{
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
                                "type": "ArrayPattern",
                                "elements": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    },
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
                    ],
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
    });

    it('expect "(...a) + 1" to throw', function() {
        expect(function() {
            parseScript(`(...a) + 1`);
        }).to.throw();
    });
});