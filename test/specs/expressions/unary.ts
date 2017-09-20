import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Unary', () => {

    it('should fail on ""use strict"; delete ((a));"', () => {
        expect(() => {
            parseModule('"use strict"; delete ((a));');
        }).to.not.throw();
      });

      it('should parse "-null"', () => {
        expect(parseScript('-null', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 5,
                  "expression": {
                    "argument": {
                      "end": 5,
                      "raw": "null",
                      "start": 1,
                      "type": "Literal",
                      "value": null,
                   },
                    "end": 5,
                    "operator": "-",
                    "prefix": true,
                    "start": 0,
                    "type": "UnaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 5,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

       it('should parse "-false"', () => {
        expect(parseScript('-false')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "UnaryExpression",
                "operator": "-",
                "argument": {
                    "type": "Literal",
                    "value": false
                },
                "prefix": true
            }
        }
    ],
    "sourceType": "script"
});
    });

    it('should parse "foo ^(~0)"', () => {
        expect(parseScript('foo ^(~0)', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 9,
                  "expression": {
                    "end": 9,
                    "left": {
                      "end": 3,
                      "name": "foo",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "^",
                    "right": {
                     "argument": {
                        "end": 8,
                        "raw": "0",
                        "start": 7,
                        "type": "Literal",
                        "value": 0
                      },
                      "end": 8,
                      "operator": "~",
                      "prefix": true,
                      "start": 6,
                      "type": "UnaryExpression"
                    },
                    "start": 0,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                 "type": "ExpressionStatement"
                }
              ],
              "end": 9,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "foo * (-1)"', () => {
        expect(parseScript('foo * (-1)', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 10,
                  "expression": {
                    "end": 10,
                    "left": {
                      "end": 3,
                      "name": "foo",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "*",
                    "right": {
                      "argument": {
                        "end": 9,
                       "raw": "1",
                        "start": 8,
                        "type": "Literal",
                        "value": 1
                      },
                      "end": 9,
                      "operator": "-",
                      "prefix": true,
                      "start": 7,
                      "type": "UnaryExpression"
                    },
                    "start": 0,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 10,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "foo ^(~0)"', () => {
        expect(parseScript('foo ^(~0)', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 9,
                  "expression": {
                    "end": 9,
                    "left": {
                      "end": 3,
                      "name": "foo",
                     "start": 0,
                      "type": "Identifier"
                    },
                   "operator": "^",
                    "right": {
                      "argument": {
                        "end": 8,
                        "raw": "0",
                        "start": 7,
                        "type": "Literal",
                        "value": 0,
                      },
                      "end": 8,
                      "operator": "~",
                      "prefix": true,
                      "start": 6,
                      "type": "UnaryExpression"
                    },
                    "start": 0,
                    "type": "BinaryExpression"
                 },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 9,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });


    it('should parse "++"x', () => {
        expect(parseScript('++x', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 3,
                  "expression": {
                    "argument": {
                      "end": 3,
                      "name": "x",
                      "start": 2,
                      "type": "Identifier"
                    },
                    "end": 3,
                    "operator": "++",
                    "prefix": true,
                    "start": 0,
                    "type": "UpdateExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 3,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse -x', () => {
        expect(parseScript('-x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse +x', () => {
        expect(parseScript('+x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "+",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse ~x', () => {
        expect(parseScript('~x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse !x', () => {
        expect(parseScript('!x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "!",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "void x"', () => {
        expect(parseScript('void x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "void",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "delete x"', () => {
        expect(parseScript('delete x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "delete",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "typeof x"', () => {
        expect(parseScript('typeof x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "typeof",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "delete x"', () => {
        expect(parseScript('delete x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "delete",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "void x"', () => {
        expect(parseScript('void x')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "void",
                    "argument": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "!a"', () => {
        expect(parseScript('!a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "!",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "+a"', () => {
        expect(parseScript('+a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "+",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "-a"', () => {
        expect(parseScript('-a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~a"', () => {
        expect(parseScript('~a')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "!(a=b)"', () => {
        expect(parseScript('!(a=b)', { 
            ranges: true
        })).to.eql({
              "body": [
                {
                 "end": 6,
                  "expression": {
                    "argument": {
                     "end": 5,
                      "left": {
                        "end": 3,
                        "name": "a",
                        "start": 2,
                        "type": "Identifier"
                      },
                      "operator": "=",
                      "right": {
                        "end": 5,
                        "name": "b",
                        "start": 4,
                        "type": "Identifier"
                      },
                      "start": 2,
                      "type": "AssignmentExpression"
                    },
                    "end": 6,
                    "operator": "!",
                    "prefix": true,
                    "start": 0,
                   "type": "UnaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 6,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
});