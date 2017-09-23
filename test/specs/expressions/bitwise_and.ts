import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise and', () => {

    it('should parse "(null & "1")"', () => {
        expect(parseScript('(null & "1")', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "expression": {
                  "type": "BinaryExpression",
                  "start": 1,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "left": {
                    "type": "Literal",
                    "start": 1,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "value": null,
                    "raw": "null"
                  },
                  "operator": "&",
                  "right": {
                    "type": "Literal",
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
                    "value": "1",
                    "raw": "\"1\""
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    it('should parse "((1 & undefined)))"', () => {
        expect(parseScript('((1 & undefined))', {
            ranges: true,
            locations: true,
            raw: true
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
                  "type": "BinaryExpression",
                  "start": 2,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 2
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "left": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  },
                  "operator": "&",
                  "right": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "name": "undefined"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "("1" & undefined)"', () => {
        expect(parseScript('("1" & undefined)', {
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
                  "type": "BinaryExpression",
                  "start": 1,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "left": {
                    "type": "Literal",
                    "start": 1,
                    "end": 4,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 4
                      }
                    },
                    "value": "1",
                    "raw": "\"1\""
                  },
                  "operator": "&",
                  "right": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "undefined"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    it('should parse "(undefined & "1")"', () => {
        expect(parseScript('(undefined & "1")', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "undefined"
                        },
                        "right": {
                            "type": "Literal",
                            "value": "1",
                            "raw": "\"1\""
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });
    it('should parse "(null & "1")"', () => {
        expect(parseScript('(null & "1")', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Literal",
                            "value": null,
                            "raw": "null"
                        },
                        "right": {
                            "type": "Literal",
                            "value": "1",
                            "raw": "\"1\""
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "true & null"', () => {
        expect(parseScript('true & false')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "&",
                    "left": {
                        "type": "Literal",
                        "value": true
                    },
                    "right": {
                        "type": "Literal",
                        "value": false
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "null & true"', () => {
        expect(parseScript('null & true')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "&",
                    "left": {
                        "type": "Literal",
                        "value": null
                    },
                    "right": {
                        "type": "Literal",
                        "value": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});