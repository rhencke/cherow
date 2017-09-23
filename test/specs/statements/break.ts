import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Break', () => {

    it('should fail if break appear without an iteration statement', () => {
        expect(() => { parseScript(`var x=1; break; var y=2;`)}).to.throw();
    });

    it('should fail if break appear within "try/catch"', () => {
        expect(() => { parseScript(`try{} catch(e){ break; }`)}).to.throw();
    });

    it('should fail if break appear within a block"', () => {
      expect(() => { parseScript(`var x=1; break; var y=2;`)}).to.throw();
  });

    it('should parse semicolon newline', () => {
        expect(parseScript(`while (true) {
            if (x) break
            ;
            else y;
        }`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 83,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 9
            }
          },
          "body": [
            {
              "type": "WhileStatement",
              "start": 0,
              "end": 83,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 9
                }
              },
              "test": {
                "type": "Literal",
                "start": 7,
                "end": 11,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "value": true,
                "raw": "true"
              },
              "body": {
                "type": "BlockStatement",
                "start": 13,
                "end": 83,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 5,
                    "column": 9
                  }
                },
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 27,
                    "end": 73,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 4,
                        "column": 19
                      }
                    },
                    "test": {
                      "type": "Identifier",
                      "start": 31,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 16
                        },
                        "end": {
                          "line": 2,
                          "column": 17
                        }
                      },
                      "name": "x"
                    },
                    "consequent": {
                      "type": "BreakStatement",
                      "start": 34,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 19
                        },
                        "end": {
                          "line": 3,
                          "column": 13
                        }
                      },
                      "label": null
                    },
                    "alternate": {
                      "type": "ExpressionStatement",
                      "start": 71,
                      "end": 73,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 17
                        },
                        "end": {
                          "line": 4,
                          "column": 19
                        }
                      },
                      "expression": {
                        "type": "Identifier",
                        "start": 71,
                        "end": 72,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 17
                          },
                          "end": {
                            "line": 4,
                            "column": 18
                          }
                        },
                        "name": "y"
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse while (true) { break }', () => {
        expect(parseScript('while (true) { break }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "WhileStatement",
                "test": {
                    "type": "Literal",
                    "value": true
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "BreakStatement",
                        "label": null
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "done: while (true) { break done; }"', () => {
      expect(parseScript('done: while (true) { break done; }', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 34,
        "body": [
          {
            "type": "LabeledStatement",
            "start": 0,
            "end": 34,
            "body": {
              "type": "WhileStatement",
              "start": 6,
              "end": 34,
              "test": {
                "type": "Literal",
                "start": 13,
                "end": 17,
                "value": true,
                "raw": "true"
              },
              "body": {
                "type": "BlockStatement",
                "start": 19,
                "end": 34,
                "body": [
                  {
                    "type": "BreakStatement",
                    "start": 21,
                    "end": 32,
                    "label": {
                      "type": "Identifier",
                      "start": 27,
                      "end": 31,
                      "name": "done"
                    }
                  }
                ]
              }
            },
            "label": {
              "type": "Identifier",
              "start": 0,
              "end": 4,
              "name": "done"
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse done: while (true) { break done }', () => {
        expect(parseScript('done: while (true) { break done }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 33,
                "body": {
                  "type": "WhileStatement",
                  "start": 6,
                  "end": 33,
                  "test": {
                    "type": "Literal",
                    "start": 13,
                    "end": 17,
                    "value": true,
                    "raw": "true"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 19,
                    "end": 33,
                    "body": [
                      {
                        "type": "BreakStatement",
                        "start": 21,
                        "end": 31,
                        "label": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 31,
                          "name": "done"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 4,
                  "name": "done"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse __proto__: while (true) { break __proto__; }', () => {
        expect(parseScript('__proto__: while (true) { break __proto__; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 44,
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 44,
                "body": {
                  "type": "WhileStatement",
                  "start": 11,
                  "end": 44,
                  "test": {
                    "type": "Literal",
                    "start": 18,
                    "end": 22,
                    "value": true,
                    "raw": "true"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 24,
                    "end": 44,
                    "body": [
                      {
                        "type": "BreakStatement",
                        "start": 26,
                        "end": 42,
                        "label": {
                          "type": "Identifier",
                          "start": 32,
                          "end": 41,
                          "name": "__proto__"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 9,
                  "name": "__proto__"
                }
              }
            ],
            "sourceType": "script"
          });
    });
});