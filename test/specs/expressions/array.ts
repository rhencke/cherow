import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Array', () => {

       it('should parse simple array"', () => {
            expect(parseScript('[]', {
                ranges: true,
                locations: true
            })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 2,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 2
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 2,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 2
                    }
                  },
                  "expression": {
                    "type": "ArrayExpression",
                    "start": 0,
                    "end": 2,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 2
                      }
                    },
                    "elements": []
                  }
                }
              ],
              "sourceType": "script"
            });
        });
    
        it('should parse simple array with ellison"', () => {
            expect(parseScript(' [,,,,,]', {
                ranges: true,
                locations: true
            })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 8,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 8
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 1,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "expression": {
                    "type": "ArrayExpression",
                    "start": 1,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "elements": [
                      null,
                      null,
                      null,
                      null,
                      null
                    ]
                  }
                }
              ],
              "sourceType": "script"
            });
        });

        it('should parse simple array with assignment expression"', () => {
            expect(parseScript('[1,2,3,4,5]', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 11,
                    "expression": {
                        "elements": [{
                                        "end": 2,
                                        "start": 1,
                                        "type": "Literal",
                                        "value": 1
                                      },
                                      {
                                        "end": 4,
                                        "start": 3,
                                        "type": "Literal",
                                        "value": 2
                                      },
                                      {
                                        "end": 6,
                                        "start": 5,
                                        "type": "Literal",
                                        "value": 3
                                     },
                                      {
                                        "end": 8,
                                        "start": 7,
                                        "type": "Literal",
                                        "value": 4
                                      },
                                      {
                                        "end": 10,
                                        "start": 9,
                                        "type": "Literal",
                                        "value": 5
                                      }],
                        "end": 11,
                        "start": 0,
                        "type": "ArrayExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 11,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });

        it('should parse simple array with ellison and assignment expression"', () => {
            expect(parseScript('[,,,1,2]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 8,
                      "expression": {
                        "elements": [
                          null,
                          null,
                          null,
                          {
                            "end": 5,
                            "raw": "1",
                            "start": 4,
                            "type": "Literal",
                            "value": 1
                          },
                          {
                            "end": 7,
                            "raw": "2",
                            "start": 6,
                            "type": "Literal",
                            "value": 2
                          }
                        ],
                        "end": 8,
                        "start": 0,
                        "type": "ArrayExpression"
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

        it('should parse simple array with assignment expression and ellison', () => {
            expect(parseScript('[4,5,,,,]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 9,
                      "expression": {
                        "elements": [
                          {
                            "end": 2,
                            "raw": "4",
                            "start": 1,
                            "type": "Literal",
                            "value": 4
                          },
                         {
                            "end": 4,
                            "raw": "5",
                            "start": 3,
                            "type": "Literal",
                            "value": 5
                          },
                          null,
                          null,
                          null,
                        ],
                        "end": 9,
                        "start": 0,
                        "type": "ArrayExpression"
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

        it('should parse simple array with ellison, assignment expression and ellison', () => {
            expect(parseScript('[,,3,,,]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 8,
                      "expression": {
                        "elements": [
                          null,
                          null,
                          {
                            "end": 4,
                            "raw": "3",
                            "start": 3,
                            "type": "Literal",
                            "value": 3
                          },
                         null,
                          null,
                        ],
                        "end": 8,
                        "start": 0,
                        "type": "ArrayExpression"
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

        it('should parse simple array with AssignmentExpression, Ellison, AssignmentExpression', () => {
            expect(parseScript('[1,2,,4,5]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 10,
                      "expression": {
                        "elements": [
                          {
                            "end": 2,
                            "raw": "1",
                            "start": 1,
                            "type": "Literal",
                           "value": 1,
                          },
                          {
                            "end": 4,
                            "raw": "2",
                            "start": 3,
                            "type": "Literal",
                            "value": 2
                         },
                          null,
                          {
                            "end": 7,
                            "raw": "4",
                            "start": 6,
                            "type": "Literal",
                            "value": 4
                          },
                          {
                            "end": 9,
                            "raw": "5",
                            "start": 8,
                            "type": "Literal",
                            "value": 5
                         }
                        ],
                        "end": 10,
                        "start": 0,
                        "type": "ArrayExpression"
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

        
        it('should parse multi dimensional array', () => {
            expect(parseScript('[[1,2], [3], []]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 16,
                     "expression": {
                        "elements": [
                          {
                            "elements": [
                              {
                                "end": 3,
                                "raw": "1",
                                "start": 2,
                                "type": "Literal",
                                "value": 1
                              },
                              {
                                "end": 5,
                                "raw": "2",
                                "start": 4,
                                "type": "Literal",
                               "value": 2
                              }
                            ],
                            "end": 6,
                            "start": 1,
                            "type": "ArrayExpression"
                          },
                          {
                            "elements": [
                              {
                                "end": 10,
                               "raw": "3",
                               "start": 9,
                                "type": "Literal",
                                "value": 3
                              }
                            ],
                            "end": 11,
                            "start": 8,
                            "type": "ArrayExpression"
                          },
                          {
                            "elements": [],
                            "end": 15,
                            "start": 13,
                            "type": "ArrayExpression"
                          }
                        ],
                        "end": 16,
                        "start": 0,
                        "type": "ArrayExpression"
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

        
        it('should parse spread multi empty', () => {
            expect(parseScript('[1, 2, 3, ...[]]', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 16,
                      "expression": {
                        "elements": [
                          {
                            "end": 2,
                            "raw": "1",
                            "start": 1,
                            "type": "Literal",
                            "value": 1,
                          },
                          {
                            "end": 5,
                            "raw": "2",
                            "start": 4,
                            "type": "Literal",
                            "value": 2
                          },
                          {
                            "end": 8,
                            "raw": "3",
                            "start": 7,
                            "type": "Literal",
                            "value": 3
                          },
                          {
                            "argument": {
                              "elements": [],
                              "end": 15,
                              "start": 13,
                              "type": "ArrayExpression"
                            },
                            "end": 15,
                            "start": 10,
                            "type": "SpreadElement"
                          }
                        ],
                        "end": 16,
                        "start": 0,
                        "type": "ArrayExpression"
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

        it('should parse spread object null', () => {
          expect(parseScript('[{...null}]', {
              ranges: true,
              next: true
          })).to.eql({
              "body": [
                {
                 "end": 11,
                  "expression": {
                    "elements": [
                      {
                        "end": 10,
                        "properties": [
                          {
                            "argument": {
                              "end": 9,
                              "start": 5,
                             "type": "Literal",
                              "value": null,
                            },
                            "end": 9,
                            "start": 2,
                            "type": "SpreadElement"
                          }
                        ],
                        "start": 1,
                        "type": "ObjectExpression"
                      }
                    ],
                    "end": 11,
                    "start": 0,
                    "type": "ArrayExpression"
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

        it('should parse spread object undefined', () => {
          expect(parseScript('[{...undefined}]', {
              ranges: true,
              next: true
          })).to.eql({
              "body": [
               {
                  "end": 16,
                  "expression": {
                    "elements": [
                     {
                        "end": 15,
                        "properties": [
                          {
                            "argument": {
                              "end": 14,
                              "name": "undefined",
                              "start": 5,
                              "type": "Identifier"
                            },
                            "end": 14,
                           "start": 2,
                            "type": "SpreadElement"
                          }
                        ],
                        "start": 1,
                        "type": "ObjectExpression"
                      }
                    ],
                    "end": 16,
                    "start": 0,
                    "type": "ArrayExpression"
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
        
    it('should parse "t[o][1][e]"', () => {
      expect(parseScript(`t[o][1][e]`, {
          raw: true,
          ranges: true
      })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 10,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 10,
              "expression": {
                "type": "MemberExpression",
                "start": 0,
                "end": 10,
                "object": {
                  "type": "MemberExpression",
                  "start": 0,
                  "end": 7,
                  "object": {
                    "type": "MemberExpression",
                    "start": 0,
                    "end": 4,
                    "object": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "t"
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 2,
                      "end": 3,
                      "name": "o"
                    },
                    "computed": true
                  },
                  "property": {
                    "type": "Literal",
                    "start": 5,
                    "end": 6,
                    "value": 1,
                    "raw": "1"
                  },
                  "computed": true
                },
                "property": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "name": "e"
                },
                "computed": true
              }
            }
          ],
          "sourceType": "script"
        });
  });    

    });