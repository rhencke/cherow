import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Binding - Array pattern', () => {
    
        it.skip('should fail on invalid default catch param', () => {
            expect(() => {
                parseScript('try { } catch ([a = 0]) { }');
            }).to.throw();
        });
        it('should fail on invalid rest elison', () => {
            expect(() => {
                parseScript('let [...a,] = 0');
            }).to.throw();
        });
        it('should fail on invalid strict for let let', () => {
            expect(() => {
                parseScript('"use strict"; for (let [x = let];;) {}');
            }).to.throw();
        });
        it.skip('should fail on invalid catch duplicate', () => {
            expect(() => {
                parseScript('try {} catch ([a,a]) {}');
            }).to.throw();
        });
        it('should fail on "var ([x]) = 0"', () => {
            expect(() => {
                parseScript('var ([x]) = 0');
            }).to.throw();
        });
        it('should fail on "var [a.b] = 0"', () => {
            expect(() => {
                parseScript('var [a.b] = 0');
            }).to.throw();
        });
        it('should fail on "(function* ([a.b]) {})"', () => {
            expect(() => {
                parseScript('(function* ([a.b]) {})');
            }).to.throw();
        });
        it('should fail on "({a([a.b]){}})"', () => {
            expect(() => {
                parseScript('({a([a.b]){}})');
            }).to.throw();
        });
        it('should fail on "({*a([a.b]){}})"', () => {
            expect(() => {
                parseScript('({*a([a.b]){}})');
            }).to.throw();
        });
        it('should fail on "({set a([a.b]){}})"', () => {
            expect(() => {
                parseScript('({set a([a.b]){}})');
            }).to.throw();
        });
    
        it('should parse pattern with an element list with initializers', () => {
            expect(parseScript(`function fn3([a,, b = a, c = 42]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "params": [{
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "a",
                                "start": 14,
                                "end": 15
                            },
                            null,
                            {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 18,
                                    "end": 19
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 22,
                                    "end": 23
                                },
                                "start": 18,
                                "end": 23
                            },
                            {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "c",
                                    "start": 25,
                                    "end": 26
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 42,
                                    "start": 29,
                                    "end": 31,
                                    "raw": "42"
                                },
                                "start": 25,
                                "end": 31
                            }
                        ],
                        "start": 13,
                        "end": 32
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 34,
                        "end": 36
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn3",
                        "start": 9,
                        "end": 12
                    },
                    "start": 0,
                    "end": 36
                }],
                "sourceType": "script",
                "start": 0,
                "end": 36
            });
        });
    
        it('should parse array pattern with elison', () => {
            expect(parseScript(`function fn2([,,]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 21,
                    "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 12,
                        "name": "fn2"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 17,
                        "elements": [
                            null,
                            null
                        ]
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse elison', () => {
            expect(parseScript(`let [a,] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 13,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 12,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 8,
                            "elements": [{
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 11,
                            "end": 12,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty pattern catch param', () => {
            expect(parseScript(`try { } catch ([]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [{
                    "type": "TryStatement",
                    "start": 0,
                    "end": 21,
                    "block": {
                        "type": "BlockStatement",
                        "start": 4,
                        "end": 7,
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "start": 8,
                        "end": 21,
                        "param": {
                            "type": "ArrayPattern",
                            "start": 15,
                            "end": 17,
                            "elements": []
                        },
                        "body": {
                            "type": "BlockStatement",
                            "start": 19,
                            "end": 21,
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty pattern function', () => {
            expect(parseScript(`function a([]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 17,
                    "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "ArrayPattern",
                        "start": 11,
                        "end": 13,
                        "elements": []
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 15,
                        "end": 17,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty pattern lexical', () => {
            expect(parseScript(`let [] = [];`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 12,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 12,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 6,
                            "elements": []
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 9,
                            "end": 11,
                            "elements": []
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty pattern var', () => {
            expect(parseScript(`var [] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 11,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 11,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 10,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 6,
                            "elements": []
                        },
                        "init": {
                            "type": "Literal",
                            "start": 9,
                            "end": 10,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse hole', () => {
            expect(parseScript(`let [a,,b]=0`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 12,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 12,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 12,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 10,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "a"
                                },
                                null,
                                {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "b"
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 11,
                            "end": 12,
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
            expect(parseScript(`let [[]]=0`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 10,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 8,
                            "elements": [{
                                "type": "ArrayPattern",
                                "start": 5,
                                "end": 7,
                                "elements": []
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 9,
                            "end": 10,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse rest element array pattern', () => {
            expect(parseScript(`let [...[x]] = y`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 16,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 16,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 12,
                            "elements": [{
                                "type": "RestElement",
                                "start": 5,
                                "end": 11,
                                "argument": {
                                    "type": "ArrayPattern",
                                    "start": 8,
                                    "end": 11,
                                    "elements": [{
                                        "type": "Identifier",
                                        "start": 9,
                                        "end": 10,
                                        "name": "x"
                                    }]
                                }
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 16,
                            "name": "y"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse rest element object pattern', () => {
            expect(parseScript(`var [...{x}] = y`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Identifier",
                            "name": "y",
                            "start": 15,
                            "end": 16
                        },
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 9,
                                            "end": 10
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 9,
                                            "end": 10
                                        },
                                        "method": false,
                                        "shorthand": true,
                                        "start": 9,
                                        "end": 10
                                    }],
                                    "start": 8,
                                    "end": 11
                                },
                                "start": 5,
                                "end": 11
                            }],
                            "start": 4,
                            "end": 12
                        },
                        "start": 4,
                        "end": 16
                    }],
                    "kind": "var",
                    "start": 0,
                    "end": 16
                }],
                "sourceType": "script",
                "start": 0,
                "end": 16
            });
        });
    
        it('should parse rest', () => {
            expect(parseScript(`let [...a] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 15,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 15,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 14,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 10,
                            "elements": [{
                                "type": "RestElement",
                                "start": 5,
                                "end": 9,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                }
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 13,
                            "end": 14,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse tailing hold', () => {
            expect(parseScript(`let [a,,]=0`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 11,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 11,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 9,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "a"
                                },
                                null
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 10,
                            "end": 11,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse var let array', () => {
            expect(parseScript(`var [let] = answer;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 19,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 18,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 9,
                            "elements": [{
                                "type": "Identifier",
                                "start": 5,
                                "end": 8,
                                "name": "let"
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "start": 12,
                            "end": 18,
                            "name": "answer"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse with default function', () => {
            expect(parseScript(`function a([a=0]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 20,
                    "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "ArrayPattern",
                        "start": 11,
                        "end": 16,
                        "elements": [{
                            "type": "AssignmentPattern",
                            "start": 12,
                            "end": 15,
                            "left": {
                                "type": "Identifier",
                                "start": 12,
                                "end": 13,
                                "name": "a"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 14,
                                "end": 15,
                                "value": 0,
                                "raw": "0"
                            }
                        }]
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 18,
                        "end": 20,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse with object pattern', () => {
            expect(parseScript(`let [{a}] = 0`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 13,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 13,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 9,
                            "elements": [{
                                "type": "ObjectPattern",
                                "start": 5,
                                "end": 8,
                                "properties": [{
                                    "type": "Property",
                                    "start": 6,
                                    "end": 7,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 6,
                                        "end": 7,
                                        "name": "a"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "Identifier",
                                        "start": 6,
                                        "end": 7,
                                        "name": "a"
                                    }
                                }]
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var [,a] = 0;"', () => {
            expect(parseScript(`var [,a] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 13,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 12,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 8,
                            "elements": [
                                null,
                                {
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "a"
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 11,
                            "end": 12,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var [a]=[1];"', () => {
            expect(parseScript(`var [a]=[1];`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 12,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 12,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 7,
                            "elements": [{
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            }]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 8,
                            "end": 11,
                            "elements": [{
                                "type": "Literal",
                                "start": 9,
                                "end": 10,
                                "value": 1,
                                "raw": "1"
                            }]
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var [[a]]=0;"', () => {
            expect(parseScript(`var [[a]]=0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 12,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 12,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 9,
                            "elements": [{
                                "type": "ArrayPattern",
                                "start": 5,
                                "end": 8,
                                "elements": [{
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "a"
                                }]
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 10,
                            "end": 11,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var a, [a] = 0;"', () => {
            expect(parseScript(`var a, [a] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 15,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 15,
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 4,
                            "end": 5,
                            "id": {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "a"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 7,
                            "end": 14,
                            "id": {
                                "type": "ArrayPattern",
                                "start": 7,
                                "end": 10,
                                "elements": [{
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                }]
                            },
                            "init": {
                                "type": "Literal",
                                "start": 13,
                                "end": 14,
                                "value": 0,
                                "raw": "0"
                            }
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var [a, a] = 0;"', () => {
            expect(parseScript(`var [a, a] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 15,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 15,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 14,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 10,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 13,
                            "end": 14,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var [a, ...a] = 0;"', () => {
            expect(parseScript(`var [a, ...a] = 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 18,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 17,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 4,
                            "end": 13,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "a"
                                },
                                {
                                    "type": "RestElement",
                                    "start": 8,
                                    "end": 12,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "a"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 16,
                            "end": 17,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try {} catch ([e, ...a]) {}"', () => {
            expect(parseScript(`try {} catch ([e, ...a]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 27,
                "body": [{
                    "type": "TryStatement",
                    "start": 0,
                    "end": 27,
                    "block": {
                        "type": "BlockStatement",
                        "start": 4,
                        "end": 6,
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "start": 7,
                        "end": 27,
                        "param": {
                            "type": "ArrayPattern",
                            "start": 14,
                            "end": 23,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 15,
                                    "end": 16,
                                    "name": "e"
                                },
                                {
                                    "type": "RestElement",
                                    "start": 18,
                                    "end": 22,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 21,
                                        "end": 22,
                                        "name": "a"
                                    }
                                }
                            ]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "start": 25,
                            "end": 27,
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse array rest element', () => {
            expect(parseScript(`function fn2([,,,,,,,...args]) {}`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "params": [{
                        "type": "ArrayPattern",
                        "elements": [
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "args",
                                    "start": 24,
                                    "end": 28
                                },
                                "start": 21,
                                "end": 28
                            }
                        ],
                        "start": 13,
                        "end": 29
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 31,
                        "end": 33
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn2",
                        "start": 9,
                        "end": 12
                    },
                    "start": 0,
                    "end": 33
                }],
                "sourceType": "script",
                "start": 0,
                "end": 33
            });
        });
    });