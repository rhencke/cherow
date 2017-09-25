import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Generator', () => {

    it('should fail on `yield` expression as logical or expressions', () => {
        expect(() => {
            parseScript('function* g() { yield ? yield : yield }');
        }).to.throw('');
    });

    it('should fail on yield as parameter', () => {
        expect(() => {
            parseScript('function* g(yield) {}');
        }).to.throw('');
    });

    it('should fail on `yield` star after newline', () => {
        expect(() => {
            parseScript(`function* g() {
                yield
                * 1
              }`);
        }).to.throw('');
    });

    it('should fail on "label: function* a(){}"', () => {
        expect(() => {
            parseScript('label: function* a(){}');
        }).to.throw('');
    });

    it('should fail on "function*g(yield){}"', () => {
        expect(() => {
            parseScript('function*g(yield){}');
        }).to.throw('');
    });

    it('should fail on "function*g({yield}){}"', () => {
        expect(() => {
            parseScript('function*g({yield}){}');
        }).to.throw('');
    });

    it('should fail on "function*g([yield]){}"', () => {
        expect(() => {
            parseScript('function*g([yield]){}');
        }).to.throw();
    });
    
    it('should fail on "function*g({a: yield}){}"', () => {
        expect(() => {
            parseScript('function*g({a: yield}){}');
        }).to.throw('');
    });
    it('should fail on "function*g(yield = 0){}"', () => {
        expect(() => {
            parseScript('function*g(yield = 0){}');
        }).to.throw('');
    });
    it('should fail on "function*g(){ var yield; }"', () => {
        expect(() => {
            parseScript('function*g(){ var yield; }');
        }).to.throw('');
    });
    it('should fail on "function*g(){ var yield = 1; }"', () => {
        expect(() => {
            parseScript('function*g(){ var yield = 1; }');
        }).to.throw('');
    });
    it('should fail on "function*g(){ function yield(){}; }"', () => {
        expect(() => {
            parseScript('function*g(){ function yield(){}; }');
        }).to.throw('');
    });
    it('should fail on "function*g() { var yield; }"', () => {
        expect(() => {
            parseScript('function*g() { var yield; }');
        }).to.throw('');
    });
    it('should fail on "function*g() { let yield; }"', () => {
        expect(() => {
            parseScript('function*g() { let yield; }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { try {} catch (yield) {} }"', () => {
        expect(() => {
            parseScript('function*g() { try {} catch (yield) {} }');
        }).to.throw('');
    });
    it('should fail on "function*g() { ({yield}); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield}); }');
        }).to.throw('');
    });

    it('should fail on "function*g() { ({yield} = 0); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield} = 0); }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { var {yield} = 0; }"', () => {
        expect(() => {
            parseScript('function*g() { var {yield} = 0; }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { for ({yield} in 0); }"', () => {
        expect(() => {
            parseScript('function*g() { for ({yield} in 0); }');
        }).to.not.throw('');
    });
    it('should fail if on "function*g() { ({yield = 0}); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield = 0}); }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { ({yield = 0} = 0); }"', () => {
        expect(() => {
            parseScript('function*g() { ({yield = 0} = 0); }');
        }).to.throw('');
    });
    it('should fail if on "function*g() { var {yield = 0} = 0; }"', () => {
        expect(() => {
            parseScript('function*g() { var {yield = 0} = 0; }');
        }).to.throw('');
    });

    it('should fail if on "function*g() { for ({yield = 0} in 0); }"', () => {
        expect(() => {
            parseScript('function*g() { for ({yield = 0} in 0); }');
        }).to.throw('');
    });

    it('should parse generator with yield delegate', () => {
        expect(parseScript('function *foo() { yield* 3; }', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 29,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 29,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 27,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 18,
                        "end": 26,
                        "delegate": true,
                        "argument": {
                          "type": "Literal",
                          "start": 25,
                          "end": 26,
                          "value": 3,
                          "raw": "3"
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
   
    it('should parse generator declaration', () => {
        expect(parseScript('function *foo() { yield 3; }', {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 18,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "Literal",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "value": 3,
                          "raw": "3"
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
    
    
    it('should parse "function* a(){yield}"', () => {
      expect(parseScript(`function* a(){yield}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 20,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 20
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 20
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
              "name": "a"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 20,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 20
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 19,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "expression": {
                    "type": "YieldExpression",
                    "start": 14,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "delegate": false,
                    "argument": null
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "function* a(){yield a}"', () => {
      expect(parseScript(`function* a(){yield a}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 22,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 22
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 22
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
              "name": "a"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 22,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "expression": {
                    "type": "YieldExpression",
                    "start": 14,
                    "end": 21,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "delegate": false,
                    "argument": {
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
                      "name": "a"
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

    it('should parse "function* yield(){}"', () => {
      expect(parseScript(`function* yield(){}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 19,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 19
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 19
              }
            },
            "id": {
              "type": "Identifier",
              "start": 10,
              "end": 15,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10
                },
                "end": {
                  "line": 1,
                  "column": 15
                }
              },
              "name": "yield"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 17,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 17
                },
                "end": {
                  "line": 1,
                  "column": 19
                }
              },
              "body": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "function* a(){({[yield]:a}=0)}"', () => {
      expect(parseScript(`function* a(){({[yield]:a}=0)}`, {
          raw: true,
          ranges: true,
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
            "type": "FunctionDeclaration",
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
              "name": "a"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "expression": {
                    "type": "AssignmentExpression",
                    "start": 15,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 15,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 16,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "YieldExpression",
                            "start": 17,
                            "end": 22,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 17
                              },
                              "end": {
                                "line": 1,
                                "column": 22
                              }
                            },
                            "delegate": false,
                            "argument": null
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 24,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "Literal",
                      "start": 27,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "value": 0,
                      "raw": "0"
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


    it('should parse "function* a(){({yield:a}=0)}"', () => {
      expect(parseScript(`function* a(){({yield:a}=0)}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AssignmentExpression",
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "yield",
                                                "start": 16,
                                                "end": 21,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 21
                                                    }
                                                }
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 22,
                                                "end": 23,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 23
                                                    }
                                                }
                                            },
                                            "start": 16,
                                            "end": 23,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 23
                                                }
                                            }
                                        }
                                    ],
                                    "start": 15,
                                    "end": 24,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
                                        }
                                    }
                                },
                                "operator": "=",
                                "right": {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 25,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    },
                                    "raw": "0"
                                },
                                "start": 15,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            },
                            "start": 14,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        }
                    ],
                    "start": 13,
                    "end": 28,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 28
                        }
                    }
                },
                "async": false,
                "generator": true,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "a",
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
                    }
                },
                "start": 0,
                "end": 28,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 28
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 28,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 28
            }
        }
    });
    });


    it('should parse "function* a() {} function a() {}"', () => {
      expect(parseScript(`function* a() {} function a() {}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 32,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 32
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
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
              "name": "a"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
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
          },
          {
            "type": "FunctionDeclaration",
            "start": 17,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 17
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "id": {
              "type": "Identifier",
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
              },
              "name": "a"
            },
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 30,
              "end": 32,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 30
                },
                "end": {
                  "line": 1,
                  "column": 32
                }
              },
              "body": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "function a() { function* a() {} function a() {} }"', () => {
      expect(parseScript(`function a() { function* a() {} function a() {} }`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 49,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 49
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 49,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 49
              }
            },
            "id": {
              "type": "Identifier",
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
              "name": "a"
            },
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 49,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 49
                }
              },
              "body": [
                {
                  "type": "FunctionDeclaration",
                  "start": 15,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 25,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 25
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "name": "a"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 29,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 29
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "body": []
                  }
                },
                {
                  "type": "FunctionDeclaration",
                  "start": 32,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 1,
                      "column": 47
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 41,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 41
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 45,
                    "end": 47,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 45
                      },
                      "end": {
                        "line": 1,
                        "column": 47
                      }
                    },
                    "body": []
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex nested generator declaration in sloppy mode', () => {
      expect(parseScript(`function *a(){({get(yield){yield}})}`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 36,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 36
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 36,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 36
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
              "name": "a"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 36,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 36
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "expression": {
                    "type": "ObjectExpression",
                    "start": 15,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 16,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "name": "get"
                        },
                        "kind": "init",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 19,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
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
                              "name": "yield"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 26,
                            "end": 33,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 26
                              },
                              "end": {
                                "line": 1,
                                "column": 33
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 27,
                                "end": 32,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 27
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 32
                                  }
                                },
                                "expression": {
                                  "type": "Identifier",
                                  "start": 27,
                                  "end": 32,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 27
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 32
                                    }
                                  },
                                  "name": "yield"
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex nested generator declaration in sloppy mode', () => {
        expect(parseScript(`function *gen() {
            (function() {
                var yield;
              }())
          }`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 101,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 11
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 101,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "gen"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 101,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 5,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 30,
                      "end": 89,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 4,
                          "column": 18
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 31,
                        "end": 88,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 13
                          },
                          "end": {
                            "line": 4,
                            "column": 17
                          }
                        },
                        "callee": {
                          "type": "FunctionExpression",
                          "start": 31,
                          "end": 86,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 13
                            },
                            "end": {
                              "line": 4,
                              "column": 15
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 42,
                            "end": 86,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 24
                              },
                              "end": {
                                "line": 4,
                                "column": 15
                              }
                            },
                            "body": [
                              {
                                "type": "VariableDeclaration",
                                "start": 60,
                                "end": 70,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 26
                                  }
                                },
                                "declarations": [
                                  {
                                    "type": "VariableDeclarator",
                                    "start": 64,
                                    "end": 69,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 25
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 64,
                                      "end": 69,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 20
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 25
                                        }
                                      },
                                      "name": "yield"
                                    },
                                    "init": null
                                  }
                                ],
                                "kind": "var"
                              }
                            ]
                          }
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

});