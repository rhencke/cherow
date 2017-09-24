import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('TC39 - Parenthesized', () => {

    it('should fail on invalid lefthand side value', () => {
        expect(() => {
            parseScript('(x=1)=2')
        }).to.not.throw('');
    });

    it('should fail on invalid lefthand side value', () => {
        expect(() => {
            parseScript('(a = b) = {};')
        }).to.not.throw('');
    });

    it('should fail on invalid lefthand side value', () => {
        expect(() => {
            parseScript('((a)) => 42')
        }).to.not.throw('');
    });

    it('should fail on invalid lefthand side value', () => {
        expect(() => {
            parseScript('(a, (b)) => 42')
        }).to.throw('');
    });

    it('should fail on invalid lefthand side value', () => {
        expect(() => {
            parseScript('({x, y}) = {}')
        }).to.not.throw('');
    });

    it('should fail on "var {(a)} = 0"', () => {
        expect(() => {
            parseScript('var {(a)} = 0')
        }).to.throw('');
    });

    it('should fail on "var {a:(b)} = 0"', () => {
        expect(() => {
            parseScript('var {a:(b)} = 0')
        }).to.throw('');
    });

    it('should fail on "({a:(b = 0)} = 1)"', () => {
        expect(() => {
            parseScript('({a:(b = 0)} = 1)')
        }).to.not.throw('');
    });

    it('should fail on "({(a)} = 0)"', () => {
        expect(() => {
            parseScript('({(a)} = 0)')
        }).to.throw('');
    });

    it('should parse "({a:(b) = 0} = 1)"', () => {
        expect(parseScript(`({a:(b) = 0} = 1)`, {
            raw: true,
            ranges: true,
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 11,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 11
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
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
                          "name": "a"
                        },
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 4,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 6
                              }
                            },
                            "name": "b"
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 15,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a:(b)} = 0)"', () => {
        expect(parseScript(`({a:(b)} = 0)`, {
            raw: true,
            ranges: true,
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
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
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
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
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
                          "name": "a"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 6
                            }
                          },
                          "name": "b"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 11,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a:(b.c)} = 0)"', () => {
        expect(parseScript(`({a:(b.c)} = 0)`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 15
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 9,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 9
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
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
                          "name": "a"
                        },
                        "value": {
                          "type": "MemberExpression",
                          "start": 5,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 8
                            }
                          },
                          "object": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 6
                              }
                            },
                            "name": "b"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 7,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "name": "c"
                          },
                          "computed": false
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a:(b = 0)})"', () => {
        expect(parseScript(`({a:(b = 0)})`, {
            raw: true,
            ranges: true,
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
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
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
                        "name": "a"
                      },
                      "value": {
                        "type": "AssignmentExpression",
                        "start": 5,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 6
                            }
                          },
                          "name": "b"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 9,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "value": 0,
                          "raw": "0"
                        }
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "((b), a=1)"', () => {
        expect(parseScript(`(foo = [])[0] = 4;`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "AssignmentExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "start": 1,
                                    "end": 4
                                },
                                "operator": "=",
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [],
                                    "start": 7,
                                    "end": 9
                                },
                                "start": 1,
                                "end": 9
                            },
                            "computed": true,
                            "property": {
                                "type": "Literal",
                                "value": 0,
                                "start": 11,
                                "end": 12,
                                "raw": "0"
                            },
                            "start": 0,
                            "end": 13
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 4,
                            "start": 16,
                            "end": 17,
                            "raw": "4"
                        },
                        "start": 0,
                        "end": 17
                    },
                    "start": 0,
                    "end": 18
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 18
        });
    });
    
    it('should parse "(foo = [])[0] = 4;"', () => {
        expect(parseScript(`(foo = [])[0] = 4;`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
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
                      "type": "AssignmentExpression",
                      "start": 1,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
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
                        "name": "foo"
                      },
                      "right": {
                        "type": "ArrayExpression",
                        "start": 7,
                        "end": 9,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 9
                          }
                        },
                        "elements": []
                      }
                    },
                    "property": {
                      "type": "Literal",
                      "start": 11,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "value": 0,
                      "raw": "0"
                    },
                    "computed": true
                  },
                  "right": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "value": 4,
                    "raw": "4"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[ (G = s), F = G ]"', () => {
        expect(parseScript(`[ (G = s), F = G ]`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "AssignmentExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "G",
                                    "start": 3,
                                    "end": 4
                                },
                                "operator": "=",
                                "right": {
                                    "type": "Identifier",
                                    "name": "s",
                                    "start": 7,
                                    "end": 8
                                },
                                "start": 3,
                                "end": 8
                            },
                            {
                                "type": "AssignmentExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "F",
                                    "start": 11,
                                    "end": 12
                                },
                                "operator": "=",
                                "right": {
                                    "type": "Identifier",
                                    "name": "G",
                                    "start": 15,
                                    "end": 16
                                },
                                "start": 11,
                                "end": 16
                            }
                        ],
                        "start": 0,
                        "end": 18
                    },
                    "start": 0,
                    "end": 18
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 18
        });
    });

    it('should parse "((b), a=1)"', () => {
        expect(parseScript(`((b), a=1)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "SequenceExpression",
                    "expressions": [{
                            "type": "Identifier",
                            "name": "b"
                        },
                        {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(foo = [])[0] = 4;"', () => {
        expect(parseScript(`(foo = [])[0] = 4;`, {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "computed": true,
                        "object": {
                            "left": {
                                "name": "foo",
                                "type": "Identifier"
                            },
                            "operator": "=",
                            "right": {
                                "elements": [],
                                "type": "ArrayExpression"
                            },
                            "type": "AssignmentExpression"
                        },
                        "property": {
                            "raw": "0",
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "MemberExpression"
                    },
                    "operator": "=",
                    "right": {
                        "raw": "4",
                        "type": "Literal",
                        "value": 4
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "[(a)] = 0"', () => {
        expect(parseScript(`[(a)] = 0`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "a"
                        }]
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

    it('should parse "[(a.b)] = 0"', () => {
        expect(parseScript(`[(a.b)] = 0`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }]
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

    it('should parse "[a = (b = c)] = 0"', () => {
        expect(parseScript(`[a = (b = c)] = 0`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "c"
                                }
                            }
                        }]
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

    it('should parse "[(a = 0)]"', () => {
        expect(parseScript(`[(a = 0)]`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrayExpression",
                    "elements": [{
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "var [(a)] = 0"', () => {
        expect(() => {
            parseScript('var [(a)] = 0')
        }).to.throw();
    });


    it('should parse "((((((((((((((((((((((((((((((((((((((((((((((((((0))))))))))))))))))))))))))))))))))))))))))))))))))"', () => {
        expect(parseScript(`((((((((((((((((((((((((((((((((((((((((((((((((((0))))))))))))))))))))))))))))))))))))))))))))))))))`, {

            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(1) + (2  ) + 3"', () => {
        expect(parseScript(`(1) + (2  ) + 3`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 2,
                            "raw": "2"
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "4 + 5 << (6)"', () => {
        expect(parseScript(`4 + 5 << (6)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Literal",
                            "value": 4,
                            "raw": "4"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 5,
                            "raw": "5"
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": 6,
                        "raw": "6"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a) + (b)"', () => {
        expect(parseScript(`(a) + (b)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a)"', () => {
        expect(parseScript(`(a)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "a"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "((a))"', () => {
        expect(parseScript(`((a))`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "a"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "((a))()"', () => {
        expect(parseScript(`((a))()`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "((a))((a))"', () => {
        expect(parseScript(`((a))((a))`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "arguments": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a) = 0"', () => {
        expect(parseScript(`(a) = 0`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
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

    it('should parse "((a)) = 0"', () => {
        expect(parseScript(`((a)) = 0`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
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

    it('should parse "void (a)"', () => {
        expect(parseScript(`void (a)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "void",
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

    it('should parse "(void a)"', () => {
        expect(parseScript(`(void a)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "void",
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

    it('should parse "(a++)"', () => {
        expect(parseScript(`(a++)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a)++"', () => {
        expect(parseScript(`(a)++`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "prefix": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(a) ? (b) : (c)"', () => {
        expect(parseScript(`(a) ? (b) : (c)`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ConditionalExpression",
                    "test": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "consequent": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "alternate": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});