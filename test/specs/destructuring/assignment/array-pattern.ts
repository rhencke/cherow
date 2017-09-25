import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring Assignment - Array pattern', () => {

    it('should fail on "[x] += 0"', () => {
        expect(() => {
            parseScript('[x] += 0');
        }).to.throw();
    });
    it('should fail on "[, x, ...y,] = 0"', () => {
        expect(() => {
            parseScript('[, x, ...y,] = 0');
        }).to.not.throw();
    });
    it('should fail on "[...x, ...y] = 0"', () => {
        expect(() => {
            parseScript('[...x, ...y] = 0');
        }).to.not.throw();
    });
    it('should fail on "[...x, y] = 0"', () => {
        expect(() => {
            parseScript('[...x, y] = 0');
        }).to.not.throw();
    });
    it('should fail on "[...x,,] = 0"', () => {
        expect(() => {
            parseScript('[...x,,] = 0');
        }).to.not.throw();
    });
    it('should fail on "[0,{a=0}] = 0"', () => {
        expect(() => {
            parseScript('[0,{a=0}] = 0');
        }).to.throw();
    });
    it('should fail on "[{a=0},{b=0},0] = 0"', () => {
        expect(() => {
            parseScript('[{a=0},{b=0},0] = 0');
        }).to.throw();
    });
    it('should fail on "[{a=0},...0]"', () => {
        expect(() => {
            parseScript('[{a=0},...0]');
        }).to.not.throw();
    });
    it('should fail on "[...0,a]=0"', () => {
        expect(() => {
            parseScript('[...0,a]=0');
        }).to.throw();
    });
    it('should fail on "[...0,{a=0}]=0"', () => {
        expect(() => {
            parseScript('[...0,{a=0}]=0');
        }).to.throw();
    });
    it('should fail on "[...0,...{a=0}]=0"', () => {
        expect(() => {
            parseScript('[...0,...{a=0}]=0');
        }).to.throw();
    });

    it('should fail on "[...{a=0},]"', () => {
        expect(() => {
            parseScript('[...{a=0},]');
        }).to.not.throw();
    });
    it('should fail on "[...{a=0},]=0"', () => {
        expect(() => {
            parseScript('[...{a=0},]=0');
        }).to.not.throw();
    });
    it('should fail on "[0] = 0"', () => {
        expect(() => {
            parseScript('[0] = 0');
        }).to.throw();
    });

    it('should fail on "[a, ...b, {c=0}]"', () => {
        expect(() => {
            parseScript('[a, ...b, {c=0}]');
        }).to.not.throw();
    });
    it('should fail on "{a = [...b, c]} = 0"', () => {
        expect(() => {
            parseScript('{a = [...b, c]} = 0');
        }).to.throw();
    });
    it('should fail on "[a, ...(b = c)] = 0"', () => {
        expect(() => {
            parseScript('[a, ...(b = c)] = 0');
        }).to.throw();
    });

    it('should parse duplicate assignment', () => {
        expect(parseScript(`[a,a,,...a]=0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 13,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 11,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "start": 3,
                                "end": 4,
                                "name": "a"
                            },
                            null,
                            {
                                "type": "RestElement",
                                "start": 6,
                                "end": 10,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 9,
                                    "end": 10,
                                    "name": "a"
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse elison', () => {
        expect(parseScript(`[,,]=0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 6,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 4,
                        "elements": [
                            null,
                            null
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
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
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 13,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 9,
                        "elements": [{
                            "type": "RestElement",
                            "start": 1,
                            "end": 8,
                            "argument": {
                                "type": "MemberExpression",
                                "start": 4,
                                "end": 8,
                                "object": {
                                    "type": "Identifier",
                                    "start": 4,
                                    "end": 5,
                                    "name": "a"
                                },
                                "property": {
                                    "type": "Literal",
                                    "start": 6,
                                    "end": 7,
                                    "value": 0,
                                    "raw": "0"
                                },
                                "computed": true
                            }
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested assignment', () => {
        expect(parseScript(`[a,b=0,[c,...a[0]]={}]=0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 24,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 22,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "a"
                            },
                            {
                                "type": "AssignmentPattern",
                                "start": 3,
                                "end": 6,
                                "left": {
                                    "type": "Identifier",
                                    "start": 3,
                                    "end": 4,
                                    "name": "b"
                                },
                                "right": {
                                    "type": "Literal",
                                    "start": 5,
                                    "end": 6,
                                    "value": 0,
                                    "raw": "0"
                                }
                            },
                            {
                                "type": "AssignmentPattern",
                                "start": 7,
                                "end": 21,
                                "left": {
                                    "type": "ArrayPattern",
                                    "start": 7,
                                    "end": 18,
                                    "elements": [{
                                            "type": "Identifier",
                                            "start": 8,
                                            "end": 9,
                                            "name": "c"
                                        },
                                        {
                                            "type": "RestElement",
                                            "start": 10,
                                            "end": 17,
                                            "argument": {
                                                "type": "MemberExpression",
                                                "start": 13,
                                                "end": 17,
                                                "object": {
                                                    "type": "Identifier",
                                                    "start": 13,
                                                    "end": 14,
                                                    "name": "a"
                                                },
                                                "property": {
                                                    "type": "Literal",
                                                    "start": 15,
                                                    "end": 16,
                                                    "value": 0,
                                                    "raw": "0"
                                                },
                                                "computed": true
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ObjectExpression",
                                    "start": 19,
                                    "end": 21,
                                    "properties": []
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 23,
                        "end": 24,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested cover grammar', () => {
        expect(parseScript(`[{a=b}=0]`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                    "type": "ArrayExpression",
                    "start": 0,
                    "end": 9,
                    "elements": [{
                        "type": "AssignmentExpression",
                        "start": 1,
                        "end": 8,
                        "operator": "=",
                        "left": {
                            "type": "ObjectPattern",
                            "start": 1,
                            "end": 6,
                            "properties": [{
                                "type": "Property",
                                "start": 2,
                                "end": 5,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 2,
                                    "end": 3,
                                    "name": "a"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 2,
                                    "end": 5,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 2,
                                        "end": 3,
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "start": 4,
                                        "end": 5,
                                        "name": "b"
                                    }
                                }
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "start": 7,
                            "end": 8,
                            "value": 0,
                            "raw": "0"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse simple assignment', () => {
        expect(parseScript(`[a] = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 7,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 3,
                        "elements": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "a"
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 6,
                        "end": 7,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x] = 0"', () => {
        expect(parseScript(`[x] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 7,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 7,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 3,
                        "elements": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "x"
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 6,
                        "end": 7,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse with elison', () => {
        expect(parseScript(`[x,] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 8,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 4,
                        "elements": [{
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "name": "x"
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 7,
                        "end": 8,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x,,] = 0"', () => {
        expect(parseScript(`[x,,] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 9,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 5,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "x"
                            },
                            null
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[[x]] = 0"', () => {
        expect(parseScript(`[[x]] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 9,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 5,
                        "elements": [{
                            "type": "ArrayPattern",
                            "start": 1,
                            "end": 4,
                            "elements": [{
                                "type": "Identifier",
                                "start": 2,
                                "end": 3,
                                "name": "x"
                            }]
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x, y, ...z] = 0"', () => {
        expect(parseScript(`[x, y, ...z] = 0`, {
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
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 16,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 12,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "x"
                            },
                            {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "y"
                            },
                            {
                                "type": "RestElement",
                                "start": 7,
                                "end": 11,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 10,
                                    "end": 11,
                                    "name": "z"
                                }
                            }
                        ]
                    },
                    "right": {
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

    it('should parse "[, x,,] = 0"', () => {
        expect(parseScript(`[, x,,] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 11,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 7,
                        "elements": [
                            null,
                            {
                                "type": "Identifier",
                                "start": 3,
                                "end": 4,
                                "name": "x"
                            },
                            null
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 10,
                        "end": 11,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[...[x]] = 0"', () => {
        expect(parseScript(`[...[x]] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 12,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 8,
                        "elements": [{
                            "type": "RestElement",
                            "start": 1,
                            "end": 7,
                            "argument": {
                                "type": "ArrayPattern",
                                "start": 4,
                                "end": 7,
                                "elements": [{
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 6,
                                    "name": "x"
                                }]
                            }
                        }]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 12,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x, ...{0: y}] = 0"', () => {
        expect(parseScript(`[x, ...{0: y}] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "x",
                                "start": 1,
                                "end": 2
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "computed": false,
                                        "key": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 8,
                                            "end": 9,
                                            "raw": "0"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 11,
                                            "end": 12
                                        },
                                        "start": 8,
                                        "end": 12
                                    }],
                                    "start": 7,
                                    "end": 13
                                },
                                "start": 4,
                                "end": 13
                            }
                        ],
                        "start": 0,
                        "end": 14
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "start": 17,
                        "end": 18,
                        "raw": "0"
                    },
                    "start": 0,
                    "end": 18
                },
                "start": 0,
                "end": 18
            }],
            "sourceType": "script",
            "start": 0,
            "end": 18
        });
    });

    it('should parse "[x, x] = 0"', () => {
        expect(parseScript(`[x, x] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 10,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 6,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "x"
                            },
                            {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "x"
                            }
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 9,
                        "end": 10,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x, ...x] = 0"', () => {
        expect(parseScript(`[x, ...x] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 13,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 9,
                        "elements": [{
                                "type": "Identifier",
                                "start": 1,
                                "end": 2,
                                "name": "x"
                            },
                            {
                                "type": "RestElement",
                                "start": 4,
                                "end": 8,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 7,
                                    "end": 8,
                                    "name": "x"
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x.a=a] = b"', () => {
        expect(parseScript(`[x.a=a] = b`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 11,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 7,
                        "elements": [{
                            "type": "AssignmentPattern",
                            "start": 1,
                            "end": 6,
                            "left": {
                                "type": "MemberExpression",
                                "start": 1,
                                "end": 4,
                                "object": {
                                    "type": "Identifier",
                                    "start": 1,
                                    "end": 2,
                                    "name": "x"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "start": 3,
                                    "end": 4,
                                    "name": "a"
                                },
                                "computed": false
                            },
                            "right": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            }
                        }]
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "name": "b"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[x[a]=a] = b"', () => {
        expect(parseScript(`[x[a]=a] = b`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 12,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 8,
                        "elements": [{
                            "type": "AssignmentPattern",
                            "start": 1,
                            "end": 7,
                            "left": {
                                "type": "MemberExpression",
                                "start": 1,
                                "end": 5,
                                "object": {
                                    "type": "Identifier",
                                    "start": 1,
                                    "end": 2,
                                    "name": "x"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "start": 3,
                                    "end": 4,
                                    "name": "a"
                                },
                                "computed": true
                            },
                            "right": {
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "name": "a"
                            }
                        }]
                    },
                    "right": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "name": "b"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[...[...a[x]]] = b"', () => {
        expect(parseScript(`[...[...a[x]]] = b`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 18,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 18
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 18,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "expression": {
                "type": "AssignmentExpression",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "operator": "=",
                "left": {
                  "type": "ArrayPattern",
                  "start": 0,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "elements": [
                    {
                      "type": "RestElement",
                      "start": 1,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "argument": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "elements": [
                          {
                            "type": "RestElement",
                            "start": 5,
                            "end": 12,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 12
                              }
                            },
                            "argument": {
                              "type": "MemberExpression",
                              "start": 8,
                              "end": 12,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 8
                                },
                                "end": {
                                  "line": 1,
                                  "column": 12
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 8,
                                "end": 9,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 9
                                  }
                                },
                                "name": "a"
                              },
                              "property": {
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
                                "name": "x"
                              },
                              "computed": true
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                "right": {
                  "type": "Identifier",
                  "start": 17,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "name": "b"
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "[] = 0"', () => {
        expect(parseScript(`[] = 0`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 6,
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "start": 0,
                        "end": 2,
                        "elements": []
                    },
                    "right": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "[{a=0},{a=0}] = 0"', () => {
        expect(parseScript(`[{a=0},{a=0}] = 0`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 17,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 17
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 17,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "expression": {
                "type": "AssignmentExpression",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "operator": "=",
                "left": {
                  "type": "ArrayPattern",
                  "start": 0,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "elements": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 6,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 6
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 2,
                            "end": 5,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 5
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 2
                                },
                                "end": {
                                  "line": 1,
                                  "column": 3
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
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
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "type": "ObjectPattern",
                      "start": 7,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 9
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 11,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 11
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 9,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 8
                                },
                                "end": {
                                  "line": 1,
                                  "column": 9
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
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
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                "right": {
                  "type": "Literal",
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
                  "value": 0,
                  "raw": "0"
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "[a = 0, ...{b = 0}] = 0"', () => {
        expect(parseScript(`[a = 0, ...{b = 0}] = 0`, {
            ranges: true,
            raw: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 1,
                                    "end": 2
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 5,
                                    "end": 6,
                                    "raw": "0"
                                },
                                "start": 1,
                                "end": 6
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "ObjectPattern",
                                    "properties": [{
                                        "type": "Property",
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "name": "b",
                                            "start": 12,
                                            "end": 13
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true,
                                        "value": {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "b",
                                                "start": 12,
                                                "end": 13
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": 0,
                                                "start": 16,
                                                "end": 17,
                                                "raw": "0"
                                            },
                                            "start": 12,
                                            "end": 17
                                        },
                                        "start": 12,
                                        "end": 17
                                    }],
                                    "start": 11,
                                    "end": 18
                                },
                                "start": 8,
                                "end": 18
                            }
                        ],
                        "start": 0,
                        "end": 19
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "start": 22,
                        "end": 23,
                        "raw": "0"
                    },
                    "start": 0,
                    "end": 23
                },
                "start": 0,
                "end": 23
            }],
            "sourceType": "script",
            "start": 0,
            "end": 23
        });
    });

    it('should parse "[{a=0}, ...b] = 0"', () => {
        expect(parseScript(`[{a=0}, ...b] = 0`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 17,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 17
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 17,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "expression": {
                "type": "AssignmentExpression",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "operator": "=",
                "left": {
                  "type": "ArrayPattern",
                  "start": 0,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "elements": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 6,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 6
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 2,
                            "end": 5,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 5
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 2
                                },
                                "end": {
                                  "line": 1,
                                  "column": 3
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
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
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "type": "RestElement",
                      "start": 8,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "name": "b"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "Literal",
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
                  "value": 0,
                  "raw": "0"
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });



    it('should parse array element object nested null', () => {
        expect(parseScript('[{ x }] = [null];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 16,
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 7,
                    "elements": [
                      {
                        "type": "ObjectPattern",
                        "start": 1,
                        "end": 6,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 3,
                            "end": 4,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 3,
                              "end": 4,
                              "name": "x"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 3,
                              "end": 4,
                              "name": "x"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  "right": {
                    "type": "ArrayExpression",
                    "start": 10,
                    "end": 16,
                    "elements": [
                      {
                        "type": "Literal",
                        "start": 11,
                        "end": 15,
                        "value": null,
                        "raw": "null"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array element nested object', () => {
        expect(parseScript('result = [{ x }] = [{ x: 2 }];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 30,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 29,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 29,
                    "operator": "=",
                    "left": {
                      "type": "ArrayPattern",
                      "start": 9,
                      "end": 16,
                      "elements": [
                        {
                          "type": "ObjectPattern",
                          "start": 10,
                          "end": 15,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 12,
                              "end": 13,
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 12,
                                "end": 13,
                                "name": "x"
                              },
                              "kind": "init",
                              "value": {
                                "type": "Identifier",
                                "start": 12,
                                "end": 13,
                                "name": "x"
                              }
                            }
                          ]
                        }
                      ]
                    },
                    "right": {
                      "type": "ArrayExpression",
                      "start": 19,
                      "end": 29,
                      "elements": [
                        {
                          "type": "ObjectExpression",
                          "start": 20,
                          "end": 28,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 22,
                              "end": 26,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "x"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 25,
                                "end": 26,
                                "value": 2,
                                "raw": "2"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array rest nested array null', () => {
        expect(parseScript('result = [...[x, y]] = [null];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 30,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 29,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 29,
                    "operator": "=",
                    "left": {
                      "type": "ArrayPattern",
                      "start": 9,
                      "end": 20,
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 10,
                          "end": 19,
                          "argument": {
                            "type": "ArrayPattern",
                            "start": 13,
                            "end": 19,
                            "elements": [
                              {
                                "type": "Identifier",
                                "start": 14,
                                "end": 15,
                                "name": "x"
                              },
                              {
                                "type": "Identifier",
                                "start": 17,
                                "end": 18,
                                "name": "y"
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "right": {
                      "type": "ArrayExpression",
                      "start": 23,
                      "end": 29,
                      "elements": [
                        {
                          "type": "Literal",
                          "start": 24,
                          "end": 28,
                          "value": null,
                          "raw": "null"
                        }
                      ]
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array rest nested array expression', () => {
        expect(parseScript('result = [...[x[yield]]] = [86];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 31,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 31,
                    "operator": "=",
                    "left": {
                      "type": "ArrayPattern",
                      "start": 9,
                      "end": 24,
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 10,
                          "end": 23,
                          "argument": {
                            "type": "ArrayPattern",
                            "start": 13,
                            "end": 23,
                            "elements": [
                              {
                                "type": "MemberExpression",
                                "start": 14,
                                "end": 22,
                                "object": {
                                  "type": "Identifier",
                                  "start": 14,
                                  "end": 15,
                                  "name": "x"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 16,
                                  "end": 21,
                                  "name": "yield"
                                },
                                "computed": true
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "right": {
                      "type": "ArrayExpression",
                      "start": 27,
                      "end": 31,
                      "elements": [
                        {
                          "type": "Literal",
                          "start": 28,
                          "end": 30,
                          "value": 86,
                          "raw": "86"
                        }
                      ]
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array rest nested object', () => {
        expect(parseScript('result = [...{ 1: x }] = [1, 2, 3];', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "result",
                            "start": 0,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "AssignmentExpression",
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
                                                        "value": 1,
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
                                                        "raw": "1"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 18,
                                                        "end": 19,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 18
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 19
                                                            }
                                                        }
                                                    },
                                                    "start": 15,
                                                    "end": 19,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 19
                                                        }
                                                    }
                                                }
                                            ],
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
                                            }
                                        },
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
                                        }
                                    }
                                ],
                                "start": 9,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "operator": "=",
                            "right": {
                                "type": "ArrayExpression",
                                "elements": [
                                    {
                                        "type": "Literal",
                                        "value": 1,
                                        "start": 26,
                                        "end": 27,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 27
                                            }
                                        },
                                        "raw": "1"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2,
                                        "start": 29,
                                        "end": 30,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 29
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 30
                                            }
                                        },
                                        "raw": "2"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3,
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
                                        "raw": "3"
                                    }
                                ],
                                "start": 25,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            },
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
                            }
                        },
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });
});