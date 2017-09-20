import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Exponentiation', () => {

    it('should fail on invalid "1 %* 1;" operator', () => {
        expect(() => {
            parseScript(`1 %* 1;`)
        }).to.throw();
    });

    it('should fail on invalid "1 %* 1;" operator', () => {
        expect(() => {
            parseScript(`1 %* 1;`)
        }).to.throw();
    });

    it('should fail on invalid "!1 ** 2" operator', () => {
        expect(() => {
            parseScript(`!1 ** 2`)
        }).to.throw();
    });

    it('should fail on invalid "%*= " operator', () => {
        expect(() => {
            parseScript(`+2** 2;`)
        }).to.throw();
    });

    it('should fail on invalid LHS without paren', () => {
        expect(() => {
            parseScript(`-5 ** 6;`)
        }).to.throw();
    });

    it('should fail on invalid LHS with paren', () => {
        expect(() => {
            parseScript(`-(5) ** 6;`)
        }).to.throw();
    });

    it('should fail on invalid unary expression', () => {
        expect(() => {
            parseScript(`~3 ** 2;`)
        }).to.throw();
    });

     it('expect "-a**e" to throw', () => {
        expect(() => {
            parseScript('-a**e');
        }).to.throw();
    });

    it('should fail on invalid plus expression', () => {
        expect(() => {
            parseScript(`+x ** y`)
        }).to.throw();
    });

    it('should fail on invalid void expression', () => {
        expect(() => {
            parseScript(`void 1 ** 2;`)
        }).to.throw();
    });

    it('should fail on invalid typeof expression', () => {
        expect(() => {
            parseScript(`typeof 1 ** 2;`)
        }).to.throw();
    });

    it('should fail on invalid delete expression', () => {
        expect(() => {
            parseScript(`delete o.p ** 2;`)
        }).to.throw();
    });

    it('should fail on invalid bitnot expression', () => {
        expect(() => {
            parseScript(`~x ** y`)
        }).to.throw();
    });

    it('should fail on invalid negate expression', () => {
        expect(() => {
            parseScript(`-3 ** 2;`)
        }).to.throw();
    });

    it('should fail on invalid plus unary expression', () => {
        expect(() => {
            parseScript(`+1 ** 2;`)
        }).to.throw();
    });

    it('expect "x **= 42" to throw', () => {
        expect(() => {
            parseScript(`x **= 42`)
        }).not.to.throw();
    });

    it('expect "~x ** y ** 2;" to throw', () => {
        expect(() => {
            parseScript(`~x ** y`)
        }).to.throw();
    });

    it('should parse exponent operator - "2 ** (3 ** 2)"', () => {
        expect(parseScript('2 ** (3 ** 2)', {
            raw: true,
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
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 13,
                  "left": {
                    "type": "Literal",
                    "start": 0,
                    "end": 1,
                    "value": 2,
                    "raw": "2"
                  },
                  "operator": "**",
                  "right": {
                    "type": "BinaryExpression",
                    "start": 6,
                    "end": 12,
                    "left": {
                      "type": "Literal",
                      "start": 6,
                      "end": 7,
                      "value": 3,
                      "raw": "3"
                    },
                    "operator": "**",
                    "right": {
                      "type": "Literal",
                      "start": 11,
                      "end": 12,
                      "value": 2,
                      "raw": "2"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse exponent operator - "2 ** 3 ** 2"', () => {
        expect(parseScript('2 ** 3 ** 2', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 11,
                  "left": {
                    "type": "Literal",
                    "start": 0,
                    "end": 1,
                    "value": 2,
                    "raw": "2"
                  },
                  "operator": "**",
                  "right": {
                    "type": "BinaryExpression",
                    "start": 5,
                    "end": 11,
                    "left": {
                      "type": "Literal",
                      "start": 5,
                      "end": 6,
                      "value": 3,
                      "raw": "3"
                    },
                    "operator": "**",
                    "right": {
                      "type": "Literal",
                      "start": 10,
                      "end": 11,
                      "value": 2,
                      "raw": "2"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse exponent operator - "2 ** -1 * 2"', () => {
        expect(parseScript('2 ** -1 * 2', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 11,
                  "left": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 7,
                    "left": {
                      "type": "Literal",
                      "start": 0,
                      "end": 1,
                      "value": 2,
                      "raw": "2"
                    },
                    "operator": "**",
                    "right": {
                      "type": "UnaryExpression",
                      "start": 5,
                      "end": 7,
                      "operator": "-",
                      "prefix": true,
                      "argument": {
                        "type": "Literal",
                        "start": 6,
                        "end": 7,
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  },
                  "operator": "*",
                  "right": {
                    "type": "Literal",
                    "start": 10,
                    "end": 11,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse exponent operator - "1.7976931348623157E308 ** +Infinity"', () => {
        expect(parseScript('1.7976931348623157E308 ** +Infinity', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 35,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 35,
                  "left": {
                    "type": "Literal",
                    "start": 0,
                    "end": 22,
                    "value": 1.7976931348623157e+308,
                    "raw": "1.7976931348623157E308"
                  },
                  "operator": "**",
                  "right": {
                    "type": "UnaryExpression",
                    "start": 26,
                    "end": 35,
                    "operator": "+",
                    "prefix": true,
                    "argument": {
                      "type": "Identifier",
                      "start": 27,
                      "end": 35,
                      "name": "Infinity"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

  
    it('should parse exponent operator - "o.p.q **= 2;"', () => {
        expect(parseScript('o.p.q **= 2;', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 11,
                  "operator": "**=",
                  "left": {
                    "type": "MemberExpression",
                    "start": 0,
                    "end": 5,
                    "object": {
                      "type": "MemberExpression",
                      "start": 0,
                      "end": 3,
                      "object": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "o"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 3,
                        "name": "p"
                      },
                      "computed": false
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "q"
                    },
                    "computed": false
                  },
                  "right": {
                    "type": "Literal",
                    "start": 10,
                    "end": 11,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse exponent operator - "b = [a **= 2];"', () => {
        expect(parseScript('b = [a **= 2];', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 13,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "b"
                  },
                  "right": {
                    "type": "ArrayExpression",
                    "start": 4,
                    "end": 13,
                    "elements": [
                      {
                        "type": "AssignmentExpression",
                        "start": 5,
                        "end": 12,
                        "operator": "**=",
                        "left": {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "name": "a"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 11,
                          "end": 12,
                          "value": 2,
                          "raw": "2"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse exponent operator - "3 * 2 ** 3, 24"', () => {
        expect(parseScript('3 * 2 ** 3, 24', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                  "expression": {
                    "end": 14,
                    "expressions": [
                     {
                        "end": 10,
                        "left": {
                          "end": 1,
                          "raw": "3",
                          "start": 0,
                          "type": "Literal",
                          "value": 3
                        },
                        "operator": "*",
                        "right": {
                          "end": 10,
                         "left": {
                            "end": 5,
                            "raw": "2",
                            "start": 4,
                            "type": "Literal",
                            "value": 2
                          },
                          "operator": "**",
                          "right": {
                            "end": 10,
                            "raw": "3",
                            "start": 9,
                            "type": "Literal",
                           "value": 3
                          },
                          "start": 4,
                          "type": "BinaryExpression"
                        },
                        "start": 0,
                        "type": "BinaryExpression"
                      },
                      {
                        "end": 14,
                        "raw": "24",
                        "start": 12,
                        "type": "Literal",
                        "value": 24
                     }
                    ],
                    "start": 0,
                    "type": "SequenceExpression"
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

    it('should parse exponent operator - "2 ** (3 ** 2)"', () => {
        expect(parseScript('2 ** (3 ** 2)', {
            raw: true,
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
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 13,
                  "left": {
                    "type": "Literal",
                    "start": 0,
                    "end": 1,
                    "value": 2,
                    "raw": "2"
                  },
                  "operator": "**",
                  "right": {
                    "type": "BinaryExpression",
                    "start": 6,
                    "end": 12,
                    "left": {
                      "type": "Literal",
                      "start": 6,
                      "end": 7,
                      "value": 3,
                      "raw": "3"
                    },
                    "operator": "**",
                    "right": {
                      "type": "Literal",
                      "start": 11,
                      "end": 12,
                      "value": 2,
                      "raw": "2"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse assignment operator', () => {
        expect(parseScript('3 **= 3', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "raw": "3",
                        "type": "Literal",
                        "value": 3
                    },
                    "operator": "**=",
                    "right": {
                        "raw": "3",
                        "type": "Literal",
                        "value": 3
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse exponent operator - "16 / 2 ** 2"', () => {
        expect(parseScript('16 / 2 ** 2', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "/",
                    "left": {
                        "type": "Literal",
                        "value": 16,
                        "raw": "16"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "**",
                        "left": {
                            "type": "Literal",
                            "value": 2,
                            "raw": "2"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 2,
                            "raw": "2"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(-5) ** 6;"', () => {
        expect(parseScript('(-5) ** 6;', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 10,
                  "expression": {
                    "end": 9,
                    "left": {
                      "argument": {
                       "end": 3,
                        "raw": "5",
                        "start": 2,
                        "type": "Literal",
                        "value": 5
                      },
                      "end": 3,
                      "operator": "-",
                     "prefix": true,
                      "start": 1,
                      "type": "UnaryExpression"
                    },
                    "operator": "**",
                    "right": {
                      "end": 9,
                      "raw": "6",
                      "start": 8,
                      "type": "Literal",
                      "value": 6
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

    it('should parse "a **= 2;"', () => {
        expect(parseScript('a **= 2;', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "**=",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent typeof', () => {
        expect(parseScript('x ** typeof y', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
               {
                  "end": 13,
                  "expression": {
                   "end": 13,
                   "left": {
                      "end": 1,
                      "name": "x",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "**",
                    "right": {
                      "argument": {
                       "end": 13,
                        "name": "y",
                        "start": 12,
                        "type": "Identifier"
                      },
                      "end": 13,
                      "operator": "typeof",
                      "prefix": true,
                      "start": 5,
                      "type": "UnaryExpression"
                    },
                    "start": 0,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 13,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse update expression prefix', () => {
        expect(parseScript('a-- ** 2', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 8,
                  "left": {
                    "type": "UpdateExpression",
                    "start": 0,
                    "end": 3,
                    "operator": "--",
                    "prefix": false,
                    "argument": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  },
                  "operator": "**",
                  "right": {
                    "type": "Literal",
                    "start": 7,
                    "end": 8,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse update expression postfix', () => {
        expect(parseScript('++a ** 2', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 8,
                  "left": {
                    "type": "UpdateExpression",
                    "start": 0,
                    "end": 3,
                    "operator": "++",
                    "prefix": true,
                    "argument": {
                      "type": "Identifier",
                      "start": 2,
                      "end": 3,
                      "name": "a"
                    }
                  },
                  "operator": "**",
                  "right": {
                    "type": "Literal",
                    "start": 7,
                    "end": 8,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse update expression', () => {
        expect(parseScript('(++x ** y) - (--p ** q)', {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 23,
                  "expression": {
                    "end": 23,
                    "left": {
                      "end": 9,
                      "left": {
                        "argument": {
                          "end": 4,
                          "name": "x",
                          "start": 3,
                          "type": "Identifier"
                        },
                        "end": 4,
                        "operator": "++",
                        "prefix": true,
                        "start": 1,
                        "type": "UpdateExpression"
                      },
                      "operator": "**",
                      "right": {
                        "end": 9,
                        "name": "y",
                        "start": 8,
                        "type": "Identifier"
                      },
                      "start": 1,
                      "type": "BinaryExpression"
                    },
                    "operator": "-",
                    "right": {
                      "end": 22,
                      "left": {
                        "argument": {
                          "end": 17,
                          "name": "p",
                          "start": 16,
                          "type": "Identifier"
                        },
                        "end": 17,
                        "operator": "--",
                        "prefix": true,
                        "start": 14,
                        "type": "UpdateExpression"
                      },
                      "operator": "**",
                      "right": {
                        "end": 22,
                        "name": "q",
                        "start": 21,
                        "type": "Identifier"
                      },
                      "start": 14,
                      "type": "BinaryExpression"
                    },
                    "start": 0,
                    "type": "BinaryExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 23,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse exponent void', () => {
        expect(parseScript('x ** void y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "void",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent precedence', () => {
        expect(parseScript('x * y ** -z', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "**",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "UnaryExpression",
                            "operator": "-",
                            "argument": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "prefix": true
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent plus plus', () => {
        expect(parseScript('x ** ++y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent plus', () => {
        expect(parseScript('x ** +y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "+",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent operator', () => {
        expect(parseScript('x ** y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "y"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent not', () => {
        expect(parseScript('x ** !y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent minus minus', () => {
        expect(parseScript('x ** --y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent delete', () => {
        expect(parseScript('x ** delete y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "delete",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent bitnot', () => {
        expect(parseScript('x ** ~y', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "**",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "~",
                        "argument": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse exponent assign', () => {
        expect(parseScript('x **= y;', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "**=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "y"
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});