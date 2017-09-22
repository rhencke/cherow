import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For in', () => {

    it('should fail on invalid use of eval', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval } in [{}]) ;');
        }).to.throw();
    });

    it('should fail on ""use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;"', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;');
        }).to.throw();
    });

    it('should fail on yield nested destructuring assignment', () => {
        expect(() => {
            parseScript('for ([...{ x = yield }] in [[{}]]) ;');
        }).to.not.throw();
    });

    it('should fail on invalid use of eval in assignment target', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval = 0 } in [{}]) ;');
        }).to.not.throw();
    });

    it('should fail "for ([...x, ...y] in [[]]) ;"', () => {
        expect(() => {
            parseScript('for ([...x, ...y] in [[]]) ;');
        }).to.not.throw();
    });

    it('should fail on assignment rest element with an initializer', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.throw();
    });
    
    it('should fail on ""use strict"; for ([[x[yield]]] in [[[]]]) ;"', () => {
        expect(() => {
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
    });


    it.skip('should fail on array rest before elison', () => {
        expect(() => {
            parseScript('for ([...x,] in [[]]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of yield in destructuring assignment', () => {
        expect(() => {
            parseScript('"use strict"; for ([ x[yield] ] in [[]]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of yield in destructuring assignment of nested destructuruing assignment', () => {
        expect(() => {
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
    });

    it('should fail on "for ([[(x, y)]] in [[[]]]) ;"', () => {
        expect(() => {
            parseScript('for ([[(x, y)]] in [[[]]]) ;');
        }).to.throw('');
    });

    it('should fail on lexical declaration (let) in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) let y;');
        }).to.throw('');
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) async function* g() {}', { next: true});
        }).to.throw('');
    });

    it('should fail if the head declaration contain duplicate entries', () => {
        expect(() => {
            parseScript('for (const [x, x] in {}) {}');
        }).to.throw('');
    });

    it('should fail if the head declaration contain duplicate entries', () => {
        expect(() => {
            parseScript('for (let [x, x] in {}) {}');
        }).to.throw('');
    });

    it('should fail on "for (const x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (const x in {}) label1: label2: function f() {}');
        }).to.throw('');
    });

    it('should fail on "for (let x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (let x in {}) label1: label2: function f() {}');
        }).to.throw('');
    });

    it('should fail on new line"', () => {
        expect(() => {
            parseScript(`for (var x in null) let
            [a] = 0;`);
        }).to.not.throw('');
    });

    it('should fail on "for (var x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (var x in {}) label1: label2: function f() {}');
        }).to.throw('');
    });



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

    it('should fail on ""use strict"; for ({ x: x[yield] } in [{}]);"', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: x[yield] } in [{}]);');
        }).to.throw();
    });
    it('should fail on invalid array yield identifier', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;');
        }).to.throw();
    });

    it('should fail on invalid array rest', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.throw();
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
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
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

    it('should fail on "for(([{}]) in 0);"', () => {
        expect(() => {
            parseScript('for(([{}]) in 0);');
        }).to.throw();
    });

    it('should fail on "for(({a}) in 0);"', () => {
        expect(() => {
            parseScript('for(({a}) in 0);');
        }).to.throw();
    });
    it('should fail on "for(([a]) in 0);"', () => {
        expect(() => {
            parseScript('for(([a]) in 0);');
        }).to.throw();
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

    it('should parse expression in head', () => {
        expect(parseScript(`for (x in null, { key: 0 }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
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
                  "expressions": [
                    {
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
                      "properties": [
                        {
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
                        }
                      ]
                    }
                  ]
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 28,
                  "end": 30,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (x.y in { attr: null }) {}"', () => {
        expect(parseScript(`for (x.y in { attr: null }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30
                    },
                    "left": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 5,
                            "end": 6
                        },
                        "computed": false,
                        "property": {
                            "type": "Identifier",
                            "name": "y",
                            "start": 7,
                            "end": 8
                        },
                        "start": 5,
                        "end": 8
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "attr",
                                    "start": 14,
                                    "end": 18
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "value": {
                                    "type": "Literal",
                                    "value": null,
                                    "start": 20,
                                    "end": 24,
                                    "raw": "null"
                                },
                                "start": 14,
                                "end": 24
                            }
                        ],
                        "start": 12,
                        "end": 26
                    },
                    "start": 0,
                    "end": 30
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 30
        });
    });

    it('should parse "for(let [a=b in c] in null);"', () => {
        expect(parseScript(`for (
            let [_ = probeDecl = function() { return x; }]
            in
            { '': probeExpr = function() { return x; }}
          )
          var x = 2, __ = probeBody = function() { return x; };`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 211,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 211,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 18,
                  "end": 64,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 22,
                      "end": 64,
                      "id": {
                        "type": "ArrayPattern",
                        "start": 22,
                        "end": 64,
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 23,
                            "end": 63,
                            "left": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 24,
                              "name": "_"
                            },
                            "right": {
                              "type": "AssignmentExpression",
                              "start": 27,
                              "end": 63,
                              "operator": "=",
                              "left": {
                                "type": "Identifier",
                                "start": 27,
                                "end": 36,
                                "name": "probeDecl"
                              },
                              "right": {
                                "type": "FunctionExpression",
                                "start": 39,
                                "end": 63,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 50,
                                  "end": 63,
                                  "body": [
                                    {
                                      "type": "ReturnStatement",
                                      "start": 52,
                                      "end": 61,
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 59,
                                        "end": 60,
                                        "name": "x"
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 92,
                  "end": 135,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 94,
                      "end": 134,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 94,
                        "end": 96,
                        "value": "",
                        "raw": "''"
                      },
                      "value": {
                        "type": "AssignmentExpression",
                        "start": 98,
                        "end": 134,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 98,
                          "end": 107,
                          "name": "probeExpr"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 110,
                          "end": 134,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 121,
                            "end": 134,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 123,
                                "end": 132,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 130,
                                  "end": 131,
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      },
                      "kind": "init"
                    }
                  ]
                },
                "body": {
                  "type": "VariableDeclaration",
                  "start": 158,
                  "end": 211,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 162,
                      "end": 167,
                      "id": {
                        "type": "Identifier",
                        "start": 162,
                        "end": 163,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 166,
                        "end": 167,
                        "value": 2,
                        "raw": "2"
                      }
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 169,
                      "end": 210,
                      "id": {
                        "type": "Identifier",
                        "start": 169,
                        "end": 171,
                        "name": "__"
                      },
                      "init": {
                        "type": "AssignmentExpression",
                        "start": 174,
                        "end": 210,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 174,
                          "end": 183,
                          "name": "probeBody"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 186,
                          "end": 210,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 197,
                            "end": 210,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 199,
                                "end": 208,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 206,
                                  "end": 207,
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  "kind": "var"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let destructuring', () => {
        expect(parseScript(`for ( let[x] in obj ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 24,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 6,
                  "end": 12,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 12,
                      "id": {
                        "type": "ArrayPattern",
                        "start": 9,
                        "end": 12,
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "x"
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 19,
                  "name": "obj"
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 22,
                  "end": 24,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(x in list) process(x);"', () => {
        expect(parseScript(`for(x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 26,
                "left": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 13,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 15,
                  "end": 26,
                  "expression": {
                    "type": "CallExpression",
                    "start": 15,
                    "end": 25,
                    "callee": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 23,
                        "end": 24,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (var x in list) process(x);"', () => {
        expect(parseScript(`for (var x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 31,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
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
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 18,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 20,
                  "end": 31,
                  "expression": {
                    "type": "CallExpression",
                    "start": 20,
                    "end": 30,
                    "callee": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 27,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (let x in list) process(x);"', () => {
        expect(parseScript(`for (let x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 31,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
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
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 18,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 20,
                  "end": 31,
                  "expression": {
                    "type": "CallExpression",
                    "start": 20,
                    "end": 30,
                    "callee": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 27,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
});