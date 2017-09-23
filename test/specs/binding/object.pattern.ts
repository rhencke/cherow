import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Binding - Object pattern', () => {

    it('should fail on "({set a({e: a.b}){}})"', () => {
        expect(() => {
            parseScript('({set a({e: a.b}){}})');
        }).to.throw();
    });
    it('should fail on "({*a({e: a.b}){}})"', () => {
        expect(() => {
            parseScript('({*a({e: a.b}){}})');
        }).to.throw();
    });
    it('should fail on "({e: a.b}) => 0"', () => {
        expect(() => {
            parseScript('({e: a.b}) => 0');
        }).to.throw();
    });
    it('should fail on "function a({e: a.b}) {}"', () => {
        expect(() => {
            parseScript('function a({e: a.b}) {}');
        }).to.throw();
    });
    it('should fail on "function* a({e: a.b}) {}"', () => {
        expect(() => {
            parseScript('function* a({e: a.b}) {}');
        }).to.throw();
    });

    it('should parse object pattern with no property list', () => {
        expect(parseScript(`function fn({}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 18,
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 11,
                    "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ObjectPattern",
                    "start": 12,
                    "end": 14,
                    "properties": []
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 18,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse binding element w/ SingleNameBinding', () => {
        expect(parseScript(`function fna({x: y}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 23,
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "name": "fna"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ObjectPattern",
                    "start": 13,
                    "end": 19,
                    "properties": [{
                        "type": "Property",
                        "start": 14,
                        "end": 18,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "x"
                        },
                        "value": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 18,
                            "name": "y"
                        },
                        "kind": "init"
                    }]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 21,
                    "end": 23,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse  binding element w/ SingleNameBinding with initializer', () => {
        expect(parseScript(`function fnb({x: y = 42}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "params": [{
                    "type": "ObjectPattern",
                    "properties": [{
                        "type": "Property",
                        "kind": "init",
                        "key": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 14,
                            "end": 15
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 17,
                                "end": 18
                            },
                            "right": {
                                "type": "Literal",
                                "value": 42,
                                "start": 21,
                                "end": 23,
                                "raw": "42"
                            },
                            "start": 14,
                            "end": 23
                        },
                        "method": false,
                        "shorthand": false,
                        "start": 14,
                        "end": 23
                    }],
                    "start": 13,
                    "end": 24
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 26,
                    "end": 28
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnb",
                    "start": 9,
                    "end": 12
                },
                "start": 0,
                "end": 28
            }],
            "sourceType": "script",
            "start": 0,
            "end": 28
        });
    });

    it('should parse binding element w/ binding pattern', () => {
        expect(parseScript(`function fnd({x: {y}}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "params": [{
                    "type": "ObjectPattern",
                    "properties": [{
                        "type": "Property",
                        "kind": "init",
                        "key": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 14,
                            "end": 15
                        },
                        "computed": false,
                        "value": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 18,
                                    "end": 19
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 18,
                                    "end": 19
                                },
                                "method": false,
                                "shorthand": true,
                                "start": 18,
                                "end": 19
                            }],
                            "start": 17,
                            "end": 20
                        },
                        "method": false,
                        "shorthand": false,
                        "start": 14,
                        "end": 20
                    }],
                    "start": 13,
                    "end": 21
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 23,
                    "end": 25
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnd",
                    "start": 9,
                    "end": 12
                },
                "start": 0,
                "end": 25
            }],
            "sourceType": "script",
            "start": 0,
            "end": 25
        });
    });

    it('should parse binding element w/ binding pattern w/ initializer', () => {
        expect(parseScript(`function fnf({x: {y} = 42}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "params": [{
                    "type": "ObjectPattern",
                    "properties": [{
                        "type": "Property",
                        "kind": "init",
                        "key": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 14,
                            "end": 15
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 18,
                                        "end": 19
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 18,
                                        "end": 19
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 18,
                                    "end": 19
                                }],
                                "start": 17,
                                "end": 20
                            },
                            "right": {
                                "type": "Literal",
                                "value": 42,
                                "start": 23,
                                "end": 25,
                                "raw": "42"
                            },
                            "start": 14,
                            "end": 25
                        },
                        "method": false,
                        "shorthand": false,
                        "start": 14,
                        "end": 25
                    }],
                    "start": 13,
                    "end": 26
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 28,
                    "end": 30
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnf",
                    "start": 9,
                    "end": 12
                },
                "start": 0,
                "end": 30
            }],
            "sourceType": "script",
            "start": 0,
            "end": 30
        });
    });

    it('should parse elison', () => {
        expect(parseScript(`let {a,} = 0`, {
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
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 8,
                        "properties": [{
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
        expect(parseScript(`try { } catch ({}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 7
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [],
                        "start": 15,
                        "end": 17
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 19,
                        "end": 21
                    },
                    "start": 8,
                    "end": 21
                },
                "finalizer": null,
                "start": 0,
                "end": 21
            }],
            "sourceType": "script",
            "start": 0,
            "end": 21
        });
    });

    it('should parse empty pattern function', () => {
        expect(parseScript(`function a({}) {}`, {
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
                    "type": "ObjectPattern",
                    "start": 11,
                    "end": 13,
                    "properties": []
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
        expect(parseScript(`for (let {} in 0);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 11,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 11,
                        "id": {
                            "type": "ObjectPattern",
                            "start": 9,
                            "end": 11,
                            "properties": []
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "Literal",
                    "start": 15,
                    "end": 16,
                    "value": 0,
                    "raw": "0"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 17,
                    "end": 18
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse empty pattern lexical', () => {
        expect(parseScript(`let {} = 0`, {
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
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 6,
                        "properties": []
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

    it('should parse empty pattern var', () => {
        expect(parseScript(`var {} = 0`, {
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
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 6,
                        "properties": []
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

    it('should parse pattern var array object', () => {
        expect(parseScript(`var [{a = 0}] = 0;`, {
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
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 12,
                            "properties": [{
                                "type": "Property",
                                "start": 6,
                                "end": 11,
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
                                    "type": "AssignmentPattern",
                                    "start": 6,
                                    "end": 11,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 6,
                                        "end": 7,
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "start": 10,
                                        "end": 11,
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            }]
                        }]
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

    it('should parse pattern var', () => {
        expect(parseScript(`var {a} = 0`, {
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
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 7,
                        "properties": [{
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

    it('should parse nested', () => {
        expect(parseScript(`let {a:{}} = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 14,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 14,
                    "id": {
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 10,
                        "properties": [{
                            "type": "Property",
                            "start": 5,
                            "end": 9,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            },
                            "value": {
                                "type": "ObjectPattern",
                                "start": 7,
                                "end": 9,
                                "properties": []
                            },
                            "kind": "init"
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

    it('should parse properties', () => {
        expect(parseScript(`let {a,b=0,c:d,e:f=0,[g]:[h]}=0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 31,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 31,
                    "id": {
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 29,
                        "properties": [{
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
                                    "start": 15,
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
                                    "elements": [{
                                        "type": "Identifier",
                                        "start": 26,
                                        "end": 27,
                                        "name": "h"
                                    }]
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
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    });

    it('should parse var for in', () => {
        expect(parseScript(`for (var {x, y} in z);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 22,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 15,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 15,
                        "id": {
                            "type": "ObjectPattern",
                            "start": 9,
                            "end": 15,
                            "properties": [{
                                    "type": "Property",
                                    "start": 10,
                                    "end": 11,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 10,
                                        "end": 11,
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "Identifier",
                                        "start": 10,
                                        "end": 11,
                                        "name": "x"
                                    }
                                },
                                {
                                    "type": "Property",
                                    "start": 13,
                                    "end": 14,
                                    "method": false,
                                    "shorthand": true,
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "value": {
                                        "type": "Identifier",
                                        "start": 13,
                                        "end": 14,
                                        "name": "y"
                                    }
                                }
                            ]
                        },
                        "init": null
                    }],
                    "kind": "var"
                },
                "right": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "z"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 21,
                    "end": 22
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "var [{__proto__:a, __proto__:b}] = 0;"', () => {
        expect(parseScript(`var [{__proto__:a, __proto__:b}] = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        "value": 0,
                        "start": 35,
                        "end": 36,
                        "raw": "0"
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "__proto__",
                                        "start": 6,
                                        "end": 15
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 16,
                                        "end": 17
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 6,
                                    "end": 17
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "__proto__",
                                        "start": 19,
                                        "end": 28
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "b",
                                        "start": 29,
                                        "end": 30
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 19,
                                    "end": 30
                                }
                            ],
                            "start": 5,
                            "end": 31
                        }],
                        "start": 4,
                        "end": 32
                    },
                    "start": 4,
                    "end": 36
                }],
                "kind": "var",
                "start": 0,
                "end": 37
            }],
            "sourceType": "script",
            "start": 0,
            "end": 37
        });
    });

    it('should parse "var {a, x: {y: a}} = 0;"', () => {
        expect(parseScript(`var {a, x: {y: a}} = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 23,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 22,
                    "id": {
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 18,
                        "properties": [{
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
                                "start": 8,
                                "end": 17,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "ObjectPattern",
                                    "start": 11,
                                    "end": 17,
                                    "properties": [{
                                        "type": "Property",
                                        "start": 12,
                                        "end": 16,
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 12,
                                            "end": 13,
                                            "name": "y"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "start": 15,
                                            "end": 16,
                                            "name": "a"
                                        },
                                        "kind": "init"
                                    }]
                                },
                                "kind": "init"
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
                        "start": 21,
                        "end": 22,
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse "var a, {x: {y: a}} = 0;"', () => {
        expect(parseScript(`var a, {x: {y: a}} = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 23,
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
                        "end": 22,
                        "id": {
                            "type": "ObjectPattern",
                            "start": 7,
                            "end": 18,
                            "properties": [{
                                "type": "Property",
                                "start": 8,
                                "end": 17,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "ObjectPattern",
                                    "start": 11,
                                    "end": 17,
                                    "properties": [{
                                        "type": "Property",
                                        "start": 12,
                                        "end": 16,
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "start": 12,
                                            "end": 13,
                                            "name": "y"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "start": 15,
                                            "end": 16,
                                            "name": "a"
                                        },
                                        "kind": "init"
                                    }]
                                },
                                "kind": "init"
                            }]
                        },
                        "init": {
                            "type": "Literal",
                            "start": 21,
                            "end": 22,
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

    it('should parse "var {let, yield} = 0;"', () => {
        expect(parseScript(`var {let, yield} = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 21,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 20,
                    "id": {
                        "type": "ObjectPattern",
                        "start": 4,
                        "end": 16,
                        "properties": [{
                                "type": "Property",
                                "start": 5,
                                "end": 8,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 8,
                                    "name": "let"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 8,
                                    "name": "let"
                                }
                            },
                            {
                                "type": "Property",
                                "start": 10,
                                "end": 15,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 10,
                                    "end": 15,
                                    "name": "yield"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
                                    "start": 10,
                                    "end": 15,
                                    "name": "yield"
                                }
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
                        "start": 19,
                        "end": 20,
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse formal parameter', () => {
        expect(parseScript(`(a, b, [c]) => 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "start": 0,
                    "end": 16,
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "start": 4,
                            "end": 5,
                            "name": "b"
                        },
                        {
                            "type": "ArrayPattern",
                            "start": 7,
                            "end": 10,
                            "elements": [{
                                "type": "Identifier",
                                "start": 8,
                                "end": 9,
                                "name": "c"
                            }]
                        }
                    ],
                    "body": {
                        "type": "Literal",
                        "start": 15,
                        "end": 16,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse catch clause', () => {
        expect(parseScript(`try {} catch ({e}) {}`, {
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
                    "end": 6,
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "start": 7,
                    "end": 21,
                    "param": {
                        "type": "ObjectPattern",
                        "start": 14,
                        "end": 17,
                        "properties": [{
                            "type": "Property",
                            "start": 15,
                            "end": 16,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "e"
                            },
                            "kind": "init",
                            "value": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "e"
                            }
                        }]
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

    it('should parse "try {} catch ({e = 0}) {}"', () => {
        expect(parseScript(`try {} catch ({e = 0}) {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 6
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "kind": "init",
                            "key": {
                                "type": "Identifier",
                                "name": "e",
                                "start": 15,
                                "end": 16
                            },
                            "computed": false,
                            "value": {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "e",
                                    "start": 15,
                                    "end": 16
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 19,
                                    "end": 20,
                                    "raw": "0"
                                },
                                "start": 15,
                                "end": 20
                            },
                            "method": false,
                            "shorthand": true,
                            "start": 15,
                            "end": 20
                        }],
                        "start": 14,
                        "end": 21
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 23,
                        "end": 25
                    },
                    "start": 7,
                    "end": 25
                },
                "finalizer": null,
                "start": 0,
                "end": 25
            }],
            "sourceType": "script",
            "start": 0,
            "end": 25
        });
    });
});