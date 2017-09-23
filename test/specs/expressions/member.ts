import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - Member', () => {

  it('should parse method.static module code', () => {
    expect(parseModule('method.static', {
        ranges: true,
        raw: true,
        locations: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 13,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 13
        }
      },
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 13,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 13
            }
          },
          "expression": {
            "type": "MemberExpression",
            "start": 0,
            "end": 13,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 13
              }
            },
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 6,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 6
                }
              },
              "name": "method"
            },
            "property": {
              "type": "Identifier",
              "start": 7,
              "end": 13,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 7
                },
                "end": {
                  "line": 1,
                  "column": 13
                }
              },
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
            ranges: true,
            raw: true,
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
              "expression": {
                "type": "MemberExpression",
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
                "object": {
                  "type": "MemberExpression",
                  "start": 0,
                  "end": 5,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "object": {
                    "type": "MemberExpression",
                    "start": 0,
                    "end": 3,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 3
                      }
                    },
                    "object": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 1
                        }
                      },
                      "name": "a"
                    },
                    "property": {
                      "type": "Identifier",
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
                      "name": "$"
                    },
                    "computed": false
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "name": "_"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "name": "B0"
                },
                "computed": false
              }
            }
          ],
          "sourceType": "script"
        });
    });


    it('should parse "(a[b]||(c[d]=e))"', () => {
        expect(parseScript('(a[b]||(c[d]=e))', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 16,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 16
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 16,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "expression": {
                "type": "LogicalExpression",
                "start": 1,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 15
                  }
                },
                "left": {
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "Identifier",
                    "start": 1,
                    "end": 2,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 2
                      }
                    },
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 3,
                    "end": 4,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 3
                      },
                      "end": {
                        "line": 1,
                        "column": 4
                      }
                    },
                    "name": "b"
                  },
                  "computed": true
                },
                "operator": "||",
                "right": {
                  "type": "AssignmentExpression",
                  "start": 8,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "MemberExpression",
                    "start": 8,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "object": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "c"
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "name": "d"
                    },
                    "computed": true
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "name": "e"
                  }
                }
              }
            }
          ],
          "sourceType": "script"
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