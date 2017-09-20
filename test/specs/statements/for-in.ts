import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For in', () => {

    it('should fail on unexpected number"', () => {
        expect(() => {
            parseScript('for (const of 42);');
        }).to.throw();
    });

    it('should fail on const bound name duplicates (const)', () => {
        expect(() => {
            parseScript('for (const [x, x] in {}) {}');
        }).to.throw();
    });
    it('should fail on const bound name duplicates (let)', () => {
        expect(() => {
            parseScript('for (let [x, x] in {}) {}');
        }).to.throw();
    });
    it('should fail on const bound name duplicates in statement (const)', () => {
        expect(() => {
            parseScript('for (const x in {}) { var x; }');
        }).to.throw('');
    });
    it('should fail on const bound name duplicates in statement (let)', () => {
        expect(() => {
            parseScript('for (let x in {}) { var x; }');
        }).to.not.throw();
    });
    it('should fail on const bound name let', () => {
        expect(() => {
            parseScript('for (const let in {}) {}');
        }).to.throw();
    });
    it('should fail on invalid LHS assignment', () => {
        expect(() => {
            parseScript('for ((this) in {}) {}');
        }).to.throw();
    });
    it('should fail on invalid LHS assignment', () => {
        expect(() => {
            parseScript('for (this in {}) {}');
        }).to.throw();
    });
    it('should fail if declaration contain a binding for `let`', () => {
        expect(() => {
            parseScript('for (let let in {}) {}');
        }).to.throw();
    });

    it('should fail on invalid labeled statement', () => {
        expect(() => {
            parseScript('for (let x in {}) label1: label2: function f() {}}');
        }).to.throw();
    });

    it('should fail on "for ({ x: x[yield] } in [{}]) ;"', () => {
        expect(() => {
            parseScript('for ({ x: x[yield] } in [{}]) ;');
        }).to.not.throw();
    });
    it('should fail on invalid array yield identifier', () => {
        expect(() => {
            parseScript('for ({ x: [x = yield] } in [{ x: [] }]) ;');
        }).to.not.throw();
    });

    it('should fail on invalid array rest', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.not.throw();
    });
    it('should fail on invalid array yield identifier', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.not.throw();
    });

    it('should fail on invalid rest before ellison', () => {
        expect(() => {
            parseScript('for ([...x,] in [[]]) ;');
        }).to.not.throw();
    });
    it('should fail on invalid array nested object', () => {
        expect(() => {
            parseScript('for ([{ get x() {} }] in [[{}]]) ;');
        }).to.throw();
    });

    it('should fail on invalid array element nested array yield identifier', () => {
        expect(() => {
            parseScript('for ([[x[yield]]] in [[[]]]) ;');
        }).to.not.throw();
    });


    it('should fail on "for(let a = 0 in b);"', () => {
        expect(() => {
            parseScript('for(let a = 0 in b);');
        }).to.throw();
    });
    it('should fail on "for(const a = 0 in b);"', () => {
        expect(() => {
            parseScript('for(const a = 0 in b);;');
        }).to.throw();
    });
    it('should fail on "for(let ? b : c in 0);"', () => {
        expect(() => {
            parseScript('for(let ? b : c in 0);');
        }).to.throw();
    });
    it('should fail on "for(({a}) in 0);"', () => {
        expect(() => {
            parseScript('for(({a}) in 0);');
        }).to.not.throw();
    });
    it('should fail on "for(([a]) in 0);"', () => {
        expect(() => {
            parseScript('for(([a]) in 0);');
        }).to.not.throw();
    });


    it('should parse head declaration expression', () => {
        expect(parseScript(`for (let x in null, { key: 0 }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 34,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 10,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 10,
                        "id": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "x"
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "SequenceExpression",
                    "start": 14,
                    "end": 30,
                    "expressions": [{
                            "type": "Literal",
                            "start": 14,
                            "end": 18,
                            "value": null,
                            "raw": "null"
                        },
                        {
                            "type": "ObjectExpression",
                            "start": 20,
                            "end": 30,
                            "properties": [{
                                "type": "Property",
                                "start": 22,
                                "end": 28,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 22,
                                    "end": 25,
                                    "name": "key"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 27,
                                    "end": 28,
                                    "value": 0,
                                    "raw": "0"
                                },
                                "kind": "init"
                            }]
                        }
                    ]
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 32,
                    "end": 34,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for ((x) in { attr: null }) {}"', () => {
        expect(parseScript(`for ((x) in { attr: null }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 30,
                "left": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "x"
                },
                "right": {
                    "type": "ObjectExpression",
                    "start": 12,
                    "end": 26,
                    "properties": [{
                        "type": "Property",
                        "start": 14,
                        "end": 24,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 18,
                            "name": "attr"
                        },
                        "value": {
                            "type": "Literal",
                            "start": 20,
                            "end": 24,
                            "value": null,
                            "raw": "null"
                        },
                        "kind": "init"
                    }]
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 30,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse expression', () => {
        expect(parseScript(`for (x in null, { key: 0 }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 30,
                "left": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 6,
                    "name": "x"
                },
                "right": {
                    "type": "SequenceExpression",
                    "start": 10,
                    "end": 26,
                    "expressions": [{
                            "type": "Literal",
                            "start": 10,
                            "end": 14,
                            "value": null,
                            "raw": "null"
                        },
                        {
                            "type": "ObjectExpression",
                            "start": 16,
                            "end": 26,
                            "properties": [{
                                "type": "Property",
                                "start": 18,
                                "end": 24,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 18,
                                    "end": 21,
                                    "name": "key"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 23,
                                    "end": 24,
                                    "value": 0,
                                    "raw": "0"
                                },
                                "kind": "init"
                            }]
                        }
                    ]
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 30,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(var a in b, c);"', () => {
        expect(parseScript(`for(var a in b, c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 19,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 9,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 9,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "a"
                        },
                        "init": null
                    }],
                    "kind": "var"
                },
                "right": {
                    "type": "SequenceExpression",
                    "start": 13,
                    "end": 17,
                    "expressions": [{
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "name": "b"
                        },
                        {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "c"
                        }
                    ]
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 18,
                    "end": 19
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(a in b, c);"', () => {
        expect(parseScript(`for(a in b, c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 15,
                "left": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                },
                "right": {
                    "type": "SequenceExpression",
                    "start": 9,
                    "end": 13,
                    "expressions": [{
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "b"
                        },
                        {
                            "type": "Identifier",
                            "start": 12,
                            "end": 13,
                            "name": "c"
                        }
                    ]
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 14,
                    "end": 15
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for (() => { this in null };;);"', () => {
        expect(parseScript(`for (() => { this in null };;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 31,
                "init": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 27,
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 25,
                            "expression": {
                                "type": "BinaryExpression",
                                "start": 13,
                                "end": 25,
                                "left": {
                                    "type": "ThisExpression",
                                    "start": 13,
                                    "end": 17
                                },
                                "operator": "in",
                                "right": {
                                    "type": "Literal",
                                    "start": 21,
                                    "end": 25,
                                    "value": null,
                                    "raw": "null"
                                }
                            }
                        }]
                    }
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 30,
                    "end": 31
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(a in b);"', () => {
        expect(parseScript(`for(a in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 12,
                "left": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                },
                "right": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 11,
                    "end": 12
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(a.b in c);"', () => {
        expect(parseScript(`for(a.b in c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 14,
                "left": {
                    "type": "MemberExpression",
                    "start": 4,
                    "end": 7,
                    "object": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "a"
                    },
                    "property": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "b"
                    },
                    "computed": false
                },
                "right": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "c"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 13,
                    "end": 14
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(let of in of);"', () => {
        expect(parseScript(`for(let of in of);`, {
            ranges: true,
            raw: true,
            next: true
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
                    "start": 4,
                    "end": 10,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 10,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 10,
                            "name": "of"
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 16,
                    "name": "of"
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



    it('should parse "for(const a in b);"', () => {
        expect(parseScript(`for(const a in b);`, {
            ranges: true,
            raw: true,
            next: true
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
                    "start": 4,
                    "end": 11,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 10,
                        "end": 11,
                        "id": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "a"
                        },
                        "init": null
                    }],
                    "kind": "const"
                },
                "right": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "b"
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


    it('should parse "for({a=0} in b);"', () => {
        expect(parseScript(`for({a=0} in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 16,
                "left": {
                    "type": "ObjectPattern",
                    "start": 4,
                    "end": 9,
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
                            "end": 6,
                            "name": "a"
                        },
                        "kind": "init",
                        "value": {
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 8,
                            "left": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 7,
                                "end": 8,
                                "value": 0,
                                "raw": "0"
                            }
                        }
                    }]
                },
                "right": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 15,
                    "end": 16
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for([{a=0}] in b);"', () => {
        expect(parseScript(`for([{a=0}] in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "left": {
                    "type": "ArrayPattern",
                    "start": 4,
                    "end": 11,
                    "elements": [{
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 10,
                        "properties": [{
                            "type": "Property",
                            "start": 6,
                            "end": 9,
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
                                "end": 9,
                                "left": {
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "a"
                                },
                                "right": {
                                    "type": "Literal",
                                    "start": 8,
                                    "end": 9,
                                    "value": 0,
                                    "raw": "0"
                                }
                            }
                        }]
                    }]
                },
                "right": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "b"
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

    it('should parse "for(let [a=b in c] in null);"', () => {
        expect(parseScript(`for(let [a=b in c] in null);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 28,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 18,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 18,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 8,
                            "end": 18,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 9,
                                "end": 17,
                                "left": {
                                    "type": "Identifier",
                                    "start": 9,
                                    "end": 10,
                                    "name": "a"
                                },
                                "right": {
                                    "type": "BinaryExpression",
                                    "start": 11,
                                    "end": 17,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "b"
                                    },
                                    "operator": "in",
                                    "right": {
                                        "type": "Identifier",
                                        "start": 16,
                                        "end": 17,
                                        "name": "c"
                                    }
                                }
                            }]
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "Literal",
                    "start": 22,
                    "end": 26,
                    "value": null,
                    "raw": "null"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 27,
                    "end": 28
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse let identifier with newline', () => {
        expect(parseScript(`for (var x in null) let // ASI
  x = 1;`, {
            ranges: false,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                    "type": "ForInStatement",
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "let"
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse let block with newline', () => {
        expect(parseScript(`for (var x in null) let // ASI
  {}`, {
            ranges: false,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                    "type": "ForInStatement",
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "let"
                        }
                    }
                },
                {
                    "type": "BlockStatement",
                    "body": []
                }
            ],
            "sourceType": "script"
        });
    });
});