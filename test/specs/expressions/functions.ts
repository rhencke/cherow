import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;


describe('Expressions - Function expression', () => {

    
    it('should fail on "function _13_0_4_5_fun() { eval = 42; };"', () => {
        expect(() => {
            parseScript(`"use strict"; function _13_0_4_5_fun() { eval = 42; };`)
        }).to.throw('');
    });
    it('should fail on "function arguments() { };"', () => {
        expect(() => {
            parseScript(`"use strict"; function arguments() { };`)
        }).to.throw('');
    });
    
    it('should fail on "(function(...a, b){})"', () => {
        expect(() => {
            parseScript(`"use strict"; var _13_1_4_fun = function (arguments) { };`)
        }).to.throw('');
    });

    it('should fail on "(function((a)){})"', () => {
        expect(() => {
            parseScript(`(function((a)){})`)
        }).to.throw('');
    });

    it('should fail on "(function(...a, b){})"', () => {
        expect(() => {
            parseScript(`(function(...a, b){})`)
        }).to.throw();
    });

    it('should fail on "(function((a)){})"', () => {
        expect(() => {
            parseScript(`(function((a)){})`)
        }).to.throw('');
    });

    it('should parse "(function(){})"', () => {
        expect(parseScript(`(function(){})`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                  "expression": {
                    "body": {
                     "body": [],
                      "end": 13,
                    "start": 11,
                      "type": "BlockStatement"
                    },
                    "end": 13,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [],
                    "start": 1,
                   "type": "FunctionExpression"
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

    it('should parse "(function eval() { });"', () => {
        expect(parseScript(`(function eval() { });`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "eval"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(function x(y, z) { })"', () => {
        expect(parseScript(`(function x(y, z) { })`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 22,
                  "expression": {
                    "body": {
                      "body": [],
                      "end": 21,
                      "start": 18,
                      "type": "BlockStatement"
                   },
                    "end": 21,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": {
                      "end": 11,
                      "name": "x",
                      "start": 10,
                      "type": "Identifier"
                    },
                    "params": [
                      {
                        "end": 13,
                        "name": "y",
                        "start": 12,
                        "type": "Identifier"
                      },
                      {
                        "end": 16,
                        "name": "z",
                        "start": 15,
                        "type": "Identifier"
                     }
                    ],
                    "start": 1,
                    "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 22,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(function(a = b){})"', () => {
        expect(parseScript(`(function(a = b){})`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 19,
                  "expression": {
                    "async": false,
                    "body": {
                      "body": [],
                     "end": 18,
                      "start": 16,
                      "type": "BlockStatement"
                    },
                    "end": 18,
                    "expression": false,
                    "generator": false,
                    "id": null,
                    "params": [
                      {
                        "end": 15,
                        "left": {
                          "end": 11,
                          "name": "a",
                          "start": 10,
                          "type": "Identifier"
                        },
                        "right": {
                          "end": 15,
                          "name": "b",
                          "start": 14,
                          "type": "Identifier"
                        },
                        "start": 10,
                        "type": "AssignmentPattern"
                      }
                    ],
                    "start": 1,
                    "type": "FunctionExpression"
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

    it('should parse "(function({a: x, a: y}){})"', () => {
      expect(parseScript(`(function({a: x, a: y}){})`, {
        ranges: true,
        raw: true,
        locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 26,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 26
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 26,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "expression": {
              "type": "FunctionExpression",
              "start": 1,
              "end": 25,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 25
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 10,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 11,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        "name": "a"
                      },
                      "value": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "name": "x"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 17,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 18
                          }
                        },
                        "name": "a"
                      },
                      "value": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "name": "y"
                      },
                      "kind": "init"
                    }
                  ]
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 23,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 23
                  },
                  "end": {
                    "line": 1,
                    "column": 25
                  }
                },
                "body": []
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(function({a = 0}){})"', () => {
      expect(parseScript(`(function({a = 0}){})`, {
        ranges: true,
        raw: true,
        locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 21,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 21
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 21,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 21
              }
            },
            "expression": {
              "type": "FunctionExpression",
              "start": 1,
              "end": 20,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 10,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 11,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "AssignmentPattern",
                        "start": 11,
                        "end": 16,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 16
                          }
                        },
                        "left": {
                          "type": "Identifier",
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
                          "name": "a"
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
                          "value": 0,
                          "raw": "0"
                        }
                      }
                    }
                  ]
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 18,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "label: !function(){ label:; };"', () => {
      expect(parseScript(`label: !function(){ label:; };`, {
        ranges: true,
        raw: true,
        locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 30,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 30
          }
        },
        "body": [
          {
            "type": "LabeledStatement",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 7,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 7
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              },
              "expression": {
                "type": "UnaryExpression",
                "start": 7,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "operator": "!",
                "prefix": true,
                "argument": {
                  "type": "FunctionExpression",
                  "start": 8,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 18,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "body": [
                      {
                        "type": "LabeledStatement",
                        "start": 20,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "body": {
                          "type": "EmptyStatement",
                          "start": 26,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          }
                        },
                        "label": {
                          "type": "Identifier",
                          "start": 20,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "name": "label"
                        }
                      }
                    ]
                  }
                }
              }
            },
            "label": {
              "type": "Identifier",
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
              "name": "label"
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "function* g(){ (function yield(){}); }"', () => {
      expect(parseScript(`function* g(){ (function yield(){}); }`, {
        ranges: true,
        raw: true,
        locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 38,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 38
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 38,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 38
              }
            },
            "id": {
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
              "name": "g"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 38,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 38
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 15,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "expression": {
                    "type": "FunctionExpression",
                    "start": 16,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 25,
                      "end": 30,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 25
                        },
                        "end": {
                          "line": 1,
                          "column": 30
                        }
                      },
                      "name": "yield"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 32,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 32
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "body": []
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

    it('should parse "(function({a}){})"', () => {
      expect(parseScript(`(function({a}){})`, {
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
              "type": "FunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
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
                        "name": "a"
                      }
                    }
                  ]
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 14,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 14
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "body": []
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "(function(...a){})"', () => {
        expect(parseScript(`(function(...a){})`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(function(a, ...b){})"', () => {
        expect(parseScript(`(function(a, ...b){})`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(function([a]){})"', () => {
        expect(parseScript(`(function([a]){})`, {
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
                  "type": "FunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "elements": [
                        {
                          "type": "Identifier",
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
                          "name": "a"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function([]){})"', () => {
        expect(parseScript(`(function([]){})`, {
            ranges: true,
            raw:true,
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
                  "type": "FunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "elements": []
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function*(){ (function yield(){}); })"', () => {
        expect(parseScript(`(function*(){ (function yield(){}); })`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "FunctionExpression",
                                "id": {
                                    "type": "Identifier",
                                    "name": "yield"
                                },
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            }
                        }]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse function expression + export in module code', () => {
        expect(parseModule(`a = function() {}
        export { a };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 17,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "FunctionExpression",
                    "start": 4,
                    "end": 17,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 15,
                      "end": 17,
                      "body": []
                    }
                  }
                }
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 26,
                "end": 39,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 35,
                    "end": 36,
                    "local": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "name": "a"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });  
        });  
    
});