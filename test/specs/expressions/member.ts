import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - Member', () => {

  it('should parse method.static module code', () => {
    expect(parseModule('method.static', {
        ranges: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 13,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 13,
          "expression": {
            "type": "MemberExpression",
            "start": 0,
            "end": 13,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 6,
              "name": "method"
            },
            "property": {
              "type": "Identifier",
              "start": 7,
              "end": 13,
              "name": "static"
            },
            "computed": false
          }
        }
      ],
      "sourceType": "module"
    });
  });

  it('should parse method.static', () => {
    expect(parseScript('method.static', {
        ranges: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 13,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 13,
          "expression": {
            "type": "MemberExpression",
            "start": 0,
            "end": 13,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 6,
              "name": "method"
            },
            "property": {
              "type": "Identifier",
              "start": 7,
              "end": 13,
              "name": "static"
            },
            "computed": false
          }
        }
      ],
      "sourceType": "script"
    });
  });

    it('should parse "a.$._.B0"', () => {
        expect(parseScript('a.$._.B0', {
            ranges: true
        })).to.eql({
              "body": [
                {
                 "end": 8,
                  "expression": {
                    "computed": false,
                    "end": 8,
                    "object": {
                      "computed": false,
                      "end": 5,
                      "object": {
                        "computed": false,
                        "end": 3,
                        "object": {
                          "end": 1,
                          "name": "a",
                          "start": 0,
                          "type": "Identifier",
                        },
                        "property": {
                          "end": 3,
                          "name": "$",
                          "start": 2,
                          "type": "Identifier"
                        },
                        "start": 0,
                        "type": "MemberExpression"
                      },
                      "property": {
                        "end": 5,
                        "name": "_",
                       "start": 4,
                        "type": "Identifier"
                     },
                      "start": 0,
                      "type": "MemberExpression"
                    },
                    "property": {
                      "end": 8,
                      "name": "B0",
                     "start": 6,
                      "type": "Identifier"
                    },
                    "start": 0,
                    "type": "MemberExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
             ],
              "end": 8,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });


    it('should parse "(a[b]||(c[d]=e))"', () => {
        expect(parseScript('(a[b]||(c[d]=e))', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 16,
                  "expression": {
                    "end": 15,
                    "left": {
                      "computed": true,
                      "end": 5,
                     "object": {
                        "end": 2,
                        "name": "a",
                        "start": 1,
                        "type": "Identifier"
                      },
                      "property": {
                        "end": 4,
                        "name": "b",
                       "start": 3,
                        "type": "Identifier"
                      },
                      "start": 1,
                      "type": "MemberExpression"
                    },
                    "operator": "||",
                    "right": {
                     "end": 14,
                      "left": {
                        "computed": true,
                        "end": 12,
                        "object": {
                          "end": 9,
                          "name": "c",
                          "start": 8,
                          "type": "Identifier"
                        },
                        "property": {
                          "end": 11,
                          "name": "d",
                          "start": 10,
                          "type": "Identifier"
                        },
                        "start": 8,
                        "type": "MemberExpression"
                      },
                      "operator": "=",
                      "right": {
                        "end": 14,
                        "name": "e",
                        "start": 13,
                        "type": "Identifier"
                      },
                      "start": 8,
                      "type": "AssignmentExpression"
                   },
                    "start": 1,
                    "type": "LogicalExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "a[b, c]"', () => {
        expect(parseScript('a[b, c]', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 7,
                  "expression": {
                    "computed": true,
                   "end": 7,
                    "object": {
                      "end": 1,
                      "name": "a",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "property": {
                      "end": 6,
                      "expressions": [
                        {
                          "end": 3,
                         "name": "b",
                          "start": 2,
                          "type": "Identifier"
                        },
                        {
                          "end": 6,
                          "name": "c",
                         "start": 5,
                          "type": "Identifier"
                       }
                      ],
                      "start": 2,
                      "type": "SequenceExpression"
                    },
                    "start": 0,
                    "type": "MemberExpression"
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

    it('should parse "a[b] = b"', () => {
        expect(parseScript('a[b] = b', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 8,
                 "expression": {
                    "end": 8,
                    "left": {
                      "computed": true,
                     "end": 4,
                      "object": {
                        "end": 1,
                        "name": "a",
                        "start": 0,
                        "type": "Identifier"
                      },
                      "property": {
                        "end": 3,
                        "name": "b",
                        "start": 2,
                        "type": "Identifier"
                      },
                      "start": 0,
                      "type": "MemberExpression"
                    },
                    "operator": "=",
                    "right": {
                      "end": 8,
                      "name": "b",
                      "start": 7,
                      "type": "Identifier"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 8,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "a&&(b=c)&&(d=e)"', () => {
        expect(parseScript('a&&(b=c)&&(d=e)', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 15,
                  "expression": {
                    "end": 15,
                    "left": {
                      "end": 8,
                     "left": {
                        "end": 1,
                        "name": "a",
                        "start": 0,
                        "type": "Identifier"
                      },
                      "operator": "&&",
                      "right": {
                      "end": 7,
                        "left": {
                          "end": 5,
                          "name": "b",
                          "start": 4,
                          "type": "Identifier"
                        },
                        "operator": "=",
                       "right": {
                          "end": 7,
                         "name": "c",
                          "start": 6,
                         "type": "Identifier"
                        },
                        "start": 4,
                        "type": "AssignmentExpression"
                      },
                      "start": 0,
                      "type": "LogicalExpression"
                    },
                    "operator": "&&",
                    "right": {
                      "end": 14,
                      "left": {
                        "end": 12,
                        "name": "d",
                        "start": 11,
                        "type": "Identifier"
                      },
                      "operator": "=",
                      "right": {
                       "end": 14,
                        "name": "e",
                        "start": 13,
                        "type": "Identifier"
                      },
                      "start": 11,
                      "type": "AssignmentExpression"
                    },
                    "start": 0,
                    "type": "LogicalExpression"
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