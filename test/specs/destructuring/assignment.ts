import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('destructuring - Assignment', () => {

    describe('Array binding', () => {

    it('should parse simple array"', () => {
        expect(parseScript('[x] = 0', {
            ranges: true
        })).to.eql({
              "body": [
               {
                  "end": 7,
                  "expression": {
                    "end": 7,
                    "left": {
                      "elements": [
                        {
                          "end": 2,
                          "name": "x",
                          "start": 1,
                          "type": "Identifier"
                        }
                      ],
                      "end": 3,
                      "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "end": 7,
                      "start": 6,
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

    it('should parse "[...[x]] = 0""', () => {
        expect(parseScript('[...[x]] = 0', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 12,
                  "expression": {
                    "end": 12,
                    "left": {
                      "elements": [
                        {
                          "argument": {
                            "elements": [
                              {
                                "end": 6,
                                "name": "x",
                                "start": 5,
                                "type": "Identifier"
                              }
                            ],
                            "end": 7,
                            "start": 4,
                            "type": "ArrayPattern"
                          },
                          "end": 7,
                          "start": 1,
                          "type": "RestElement"
                        }
                      ],
                      "end": 8,
                      "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "end": 12,
                      "raw": "0",
                      "start": 11,
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
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse simple array"', () => {
        expect(parseScript('[x.a=a] = b', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 11,
                  "expression": {
                    "end": 11,
                    "left": {
                      "elements": [
                        {
                          "end": 6,
                          "left": {
                            "computed": false,
                            "end": 4,
                            "object": {
                              "end": 2,
                              "name": "x",
                              "start": 1,
                              "type": "Identifier"
                            },
                            "property": {
                              "end": 4,
                              "name": "a",
                              "start": 3,
                              "type": "Identifier"
                            },
                            "start": 1,
                            "type": "MemberExpression"
                          },
                          "right": {
                            "end": 6,
                            "name": "a",
                            "start": 5,
                            "type": "Identifier"
                          },
                         "start": 1,
                          "type": "AssignmentPattern"
                        }
                      ],
                      "end": 7,
                      "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "end": 11,
                      "name": "b",
                      "start": 10,
                      "type": "Identifier"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
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

    it('should parse "[x[a]=a] = b"', () => {
        expect(parseScript('[x[a]=a] = b', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 12,
                  "expression": {
                    "end": 12,
                    "left": {
                      "elements": [
                        {
                          "end": 7,
                          "left": {
                            "computed": true,
                            "end": 5,
                            "object": {
                              "end": 2,
                              "name": "x",
                              "start": 1,
                              "type": "Identifier"
                            },
                            "property": {
                              "end": 4,
                              "name": "a",
                              "start": 3,
                              "type": "Identifier"
                            },
                            "start": 1,
                          "type": "MemberExpression"
                          },
                          "right": {
                            "end": 7,
                            "name": "a",
                            "start": 6,
                            "type": "Identifier"
                          },
                          "start": 1,
                          "type": "AssignmentPattern"
                        }
                      ],
                     "end": 8,
                      "start": 0,
                      "type": "ArrayPattern"
                    },
                    "operator": "=",
                    "right": {
                      "end": 12,
                      "name": "b",
                      "start": 11,
                      "type": "Identifier"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "[...[...a[x]]] = b"', () => {
        expect(parseScript('[...[...a[x]]] = b', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 18,
                  "expression": {
                    "end": 18,
                    "left": {
                     "elements": [
                        {
                          "argument": {
                            "elements": [
                              {
                                "argument": {
                                  "computed": true,
                                  "end": 12,
                                  "object": {
                                    "end": 9,
                                    "name": "a",
                                   "start": 8,
                                   "type": "Identifier"
                                  },
                                 "property": {
                                    "end": 11,
                                    "name": "x",
                                    "start": 10,
                                    "type": "Identifier"
                                  },
                                  "start": 8,
                                  "type": "MemberExpression"
                                },
                                "end": 12,
                                "start": 5,
                                "type": "RestElement"
                              }
                            ],
                            "end": 13,
                            "start": 4,
                            "type": "ArrayPattern"
                          },
                          "end": 13,
                          "start": 1,
                          "type": "RestElement"
                        }
                      ],
                      "end": 14,
                      "start": 0,
                      "type": "ArrayPattern"
                   },
                    "operator": "=",
                    "right": {
                      "end": 18,
                      "name": "b",
                      "start": 17,
                      "type": "Identifier"
                   },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 18,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "[a,a,,...a]=0;"', () => {
      expect(parseScript('[a,a,,...a]=0;', {
          ranges: false,
          raw: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [
                            {
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "name": "a"
                            },
                            null,
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }
                        ]
                    },
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    }
                }
            }
        ],
        "sourceType": "script"
    });
    });

    it('should parse "[...a[0]] = 0;"', () => {
      expect(parseScript('[...a[0]] = 0;', {
          ranges: true,
          raw: true
      })).to.eql({
          "body": [
            {
              "end": 14,
              "expression": {
                "end": 13,
                "left": {
                  "elements": [
                    {
                     "argument": {
                        "computed": true,
                        "end": 8,
                        "object": {
                          "end": 5,
                          "name": "a",
                         "start": 4,
                          "type": "Identifier"
                        },
                        "property": {
                          "end": 7,
                          "raw": "0",
                         "start": 6,
                          "type": "Literal",
                          "value": 0
                       },
                        "start": 4,
                        "type": "MemberExpression"
                      },
                      "end": 8,
                      "start": 1,
                      "type": "RestElement"
                    }
                  ],
                 "end": 9,
                  "start": 0,
                  "type": "ArrayPattern"
                },
                "operator": "=",
                "right": {
                  "end": 13,
                 "raw": "0",
                  "start": 12,
                 "type": "Literal",
                  "value": 0,
                },
                "start": 0,
                "type": "AssignmentExpression"
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

    it('should parse "[x = 1] = [];"', () => {
      expect(parseScript('[x = 1] = [];', {
          ranges: false,
          raw: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [
                            {
                                "type": "AssignmentPattern",
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
                        ]
                    },
                    "right": {
                        "type": "ArrayExpression",
                        "elements": []
                    }
                }
            }
        ],
        "sourceType": "script"
    });
    });


    it.skip('should fail on "[, x, ...y,] = 0"', () => {  expect(() => { parseScript('[, x, ...y,] = 0') }).to.throw() });
    it.skip('should fail on "[...x, ...y] = 0"', () => {  expect(() => { parseScript('[...x, ...y] = 0') }).to.throw() });
    it.skip('should fail on "[...x, y] = 0"', () => {  expect(() => { parseScript('[...x, y] = 0') }).to.throw() });
    it.skip('should fail on "[...x,,] = 0"', () => {  expect(() => { parseScript('[...x,,] = 0') }).to.throw() });
    it.skip('should fail on "[...0,a]=0"', () => {  expect(() => { parseScript('[...0,a]=0') }).to.throw() });
    it('should fail on "[0] = 0"', () => {  expect(() => { parseScript('[0] = 0') }).to.throw() });
    it('should fail on "(a,b)=(c,d);"', () => {  expect(() => { parseScript('(a,b)=(c,d);') }).to.throw() });
    it.skip('should fail on "[a, ...(b = c)] = 0"', () => {  expect(() => { parseScript('[a, ...(b = c)] = 0') }).to.throw() });








});
});