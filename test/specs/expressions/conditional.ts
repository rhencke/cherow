import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - Conditional', () => {
    
    it('should parse call', () => {
        expect(parseScript('false ? 0 : f(n - 1);', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 21,
                  "expression": {
                    "alternate": {
                      "arguments": [
                        {
                          "end": 19,
                          "left": {
                            "end": 15,
                            "name": "n",
                            "start": 14,
                            "type": "Identifier"
                          },
                          "operator": "-",
                          "right": {
                            "end": 19,
                            "start": 18,
                            "type": "Literal",
                            "value": 1
                          },
                          "start": 14,
                          "type": "BinaryExpression"
                       }
                      ],
                      "callee": {
                        "end": 13,
                        "name": "f",
                       "start": 12,
                        "type": "Identifier"
                     },
                      "end": 20,
                      "start": 12,
                      "type": "CallExpression"
                    },
                    "consequent": {
                      "end": 9,
                      "start": 8,
                      "type": "Literal",
                     "value": 0
                    },
                    "end": 20,
                    "start": 0,
                    "test": {
                      "end": 5,
                     "start": 0,
                      "type": "Literal",
                      "value": false,
                    },
                    "type": "ConditionalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 21,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
      
    it('should parse boolean', () => {
        expect(parseScript('true ? false : true', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 19,
                  "expression": {
                   "alternate": {
                      "end": 19,
                      "start": 15,
                      "type": "Literal",
                      "value": true
                    },
                    "consequent": {
                      "end": 12,
                      "start": 7,
                     "type": "Literal",
                      "value": false
                   },
                    "end": 19,
                    "start": 0,
                    "test": {
                      "end": 4,
                      "start": 0,
                      "type": "Literal",
                      "value": true
                    },
                    "type": "ConditionalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
               }
              ],
              "end": 19,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse literals', () => {
        expect(parseScript('"1" ? "" : "1"', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                 "expression": {
                    "alternate": {
                      "end": 14,
                      "start": 11,
                      "type": "Literal",
                      "value": "1"
                    },
                    "consequent": {
                      "end": 8,
                      "start": 6,
                      "type": "Literal",
                      "value": ""
                    },
                    "end": 14,
                    "start": 0,
                   "test": {
                      "end": 3,
                      "start": 0,
                      "type": "Literal",
                      "value": "1"
                    },
                    "type": "ConditionalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 14,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse boolean - undefined"', () => {
        expect(parseScript('false ? true : undefined', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 24,
                  "expression": {
                    "alternate": {
                      "end": 24,
                      "name": "undefined",
                      "start": 15,
                      "type": "Identifier"
                    },
                    "consequent": {
                     "end": 12,
                      "start": 8,
                      "type": "Literal",
                      "value": true
                    },
                    "end": 24,
                    "start": 0,
                    "test": {
                      "end": 5,
                      "start": 0,
                      "type": "Literal",
                      "value": false
                    },
                    "type": "ConditionalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 24,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "a?b:c"', () => {
        expect(parseScript('a?b:c', {
            ranges: true
        })).to.eql({
              "body": [
                {
                 "end": 5,
                 "expression": {
                    "alternate": {
                      "end": 5,
                      "name": "c",
                     "start": 4,
                      "type": "Identifier"
                    },
                    "consequent": {
                      "end": 3,
                      "name": "b",
                      "start": 2,
                      "type": "Identifier"
                    },
                    "end": 5,
                    "start": 0,
                    "test": {
                      "end": 1,
                      "name": "a",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "type": "ConditionalExpression"
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

    it('should parse "y ? 1 : 2"', () => {
        expect(parseScript('y ? 1 : 2', {
            ranges: true
        })).to.eql({
              "body": [
               {
                  "end": 9,
                 "expression": {
                    "alternate": {
                      "end": 9,
                      "start": 8,
                      "type": "Literal",
                      "value": 2
                    },
                    "consequent": {
                      "end": 5,
                      "start": 4,
                      "type": "Literal",
                      "value": 1
                    },
                    "end": 9,
                    "start": 0,
                    "test": {
                      "end": 1,
                      "name": "y",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "type": "ConditionalExpression"
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

    it('should parse "x && y ? 1 : 2"', () => {
        expect(parseScript('x && y ? 1 : 2', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                  "expression": {
                    "alternate": {
                      "end": 14,
                      "start": 13,
                      "type": "Literal",
                      "value": 2,
                    },
                   "consequent": {
                      "end": 10,
                      "start": 9,
                      "type": "Literal",
                      "value": 1
                    },
                    "end": 14,
                    "start": 0,
                    "test": {
                      "end": 6,
                      "left": {
                        "end": 1,
                        "name": "x",
                        "start": 0,
                        "type": "Identifier"
                      },
                      "operator": "&&",
                      "right": {
                        "end": 6,
                        "name": "y",
                        "start": 5,
                        "type": "Identifier"
                      },
                      "start": 0,
                      "type": "LogicalExpression"
                    },
                    "type": "ConditionalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 14,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "x = (0) ? 1 : 2"', () => {
        expect(parseScript('x = (0) ? 1 : 2', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 15,
                  "expression": {
                    "end": 15,
                    "left": {
                      "end": 1,
                      "name": "x",
                      "start": 0,
                      "type": "Identifier"
                  },
                    "operator": "=",
                    "right": {
                      "alternate": {
                        "end": 15,
                        "start": 14,
                        "type": "Literal",
                        "value": 2
                      },
                      "consequent": {
                        "end": 11,
                        "start": 10,
                        "type": "Literal",
                        "value": 1
                      },
                      "end": 15,
                      "start": 4,
                      "test": {
                        "end": 6,
                        "start": 5,
                        "type": "Literal",
                        "value": 0
                      },
                      "type": "ConditionalExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 15,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    
});