import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - assignment', () => {

       it('should fail on "i #= 42"', () => {
        expect(() => {
            parseScript(`i #= 42`)
        }).to.throw();
    });

    it('expect "(a,b)=(c,d);" to throw', () => {
        expect(function() {
            parseScript(`(a,b)=(c,d);`);
        }).to.throw();
    });

    it('should parse "x = 0"', () => {
        expect(parseScript('x = 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "(a)=(0)"', () => {
        expect(parseScript('(a)=(0)', {
            ranges: true,
            raw: true,
        })).to.eql({
              "body": [
                {
                  "end": 7,
                  "expression": {
                    "end": 7,
                    "left": {
                      "end": 2,
                      "name": "a",
                      "start": 1,
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "end": 6,
                      "raw": "0",
                     "start": 5,
                      "type": "Literal",
                      "value": 0
                    },
                    "start": 0,
                   "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 7,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "x %= 0"', () => {
        expect(parseScript('x %= 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "%=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "x <<= 0"', () => {
        expect(parseScript('x <<= 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "<<=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"', () => {
        expect(parseScript('((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"', () => {
        expect(parseScript('((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });


    it('should parse "x = 0"', () => {
        expect(parseScript('x = 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "x = 42"', () => {
        expect(parseScript('x = 42')).to.eql({
            "type": "Program",
            "body": [{
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
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "eval = 42"', () => {
        expect(parseScript('eval = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "eval"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "arguments = 42"', () => {
        expect(parseScript('arguments = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "arguments"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x *= 42"', () => {
        expect(parseScript('x *= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "*=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x /= 42"', () => {
        expect(parseScript('x /= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "/=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x %= 42"', () => {
        expect(parseScript('x %= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "%=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "arguments = 42"', () => {
        expect(parseScript('arguments = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "arguments"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x *= 42"', () => {
        expect(parseScript('x *= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "*=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x /= 42"', () => {
        expect(parseScript('x /= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "/=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "x %= 42"', () => {
        expect(parseScript('x %= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "%=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x += 42"', () => {
        expect(parseScript('x += 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "+=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x -= 42"', () => {
        expect(parseScript('x -= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "-=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x <<= 42"', () => {
        expect(parseScript('x <<= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "<<=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x >>= 42"', () => {
        expect(parseScript('x >>= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": ">>=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x >>>= 42"', () => {
        expect(parseScript('x >>>= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": ">>>=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x &= 42"', () => {
        expect(parseScript('x &= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "&=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x ^= 42"', () => {
        expect(parseScript('x ^= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "^=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x |= 42"', () => {
        expect(parseScript('x |= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "|=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});