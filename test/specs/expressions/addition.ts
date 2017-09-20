import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Addition', () => {
    
     it('expect "1 + {" to throw', () => {
        expect(() => {
            parseScript('1 + {');
        }).to.throw();
    });

     it('expect "3 = 4" to throw', () => {
        expect(() => {
            parseScript('3 = 4');
        }).to.throw();
    });

     it('expect "(1 + 1) = 10" to throw', () => {
        expect(() => {
            parseScript('(1 + 1) = 10');
        }).to.throw();
    });

     it('expect "1 + { t:t," to throw', () => {
        expect(() => {
            parseScript('1 + { t:t,');
        }).to.throw();
    });

     it('expect "1 + {" to throw', () => {
        expect(() => {
            parseScript('1 + {');
        }).to.throw();
    });

    it('should parse "1 + 1 !== 2"', () => {
        expect(parseScript('1 + 1 !== 2', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 11,
                  "expression": {
                    "end": 11,
                   "left": {
                      "end": 5,
                      "left": {
                        "end": 1,
                        "raw": "1",
                        "start": 0,
                        "type": "Literal",
                        "value": 1
                      },
                      "operator": "+",
                      "right": {
                        "end": 5,
                        "raw": "1",
                        "start": 4,
                        "type": "Literal",
                        "value": 1
                     },
                      "start": 0,
                      "type": "BinaryExpression"
                    },
                    "operator": "!==",
                    "right": {
                      "end": 11,
                      "raw": "2",
                      "start": 10,
                      "type": "Literal",
                      "value": 2,
                   },
                   "start": 0,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 11,
             "sourceType": "script",
             "start": 0,
              "type": "Program"
            });
    });

    it('should parse "-0 + -0"', () => {
        expect(parseScript('-0 + -0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        },
                        "prefix": true
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 + -0"', () => {
        expect(parseScript('0 + -0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 + 0"', () => {
        expect(parseScript('0 + 0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
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

    it('should parse "1" + "1"', () => {
        expect(parseScript('"1" + "1"', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "raw": "\"1\"",
                        "type": "Literal",
                        "value": "1"
                    },
                    "operator": "+",
                    "right": {
                        "raw": "\"1\"",
                        "type": "Literal",
                        "value": "1"
                    },
                    "type": "BinaryExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "1 + null"', () => {
        expect(parseScript('1 + null', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "raw": "1",
                        "type": "Literal",
                        "value": 1
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null",
                    },
                    "type": "BinaryExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "(x = 1) + x"', () => {
        expect(parseScript('(x = 1) + x', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
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
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});