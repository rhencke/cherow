import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For', () => {

    it('should fail on "for ( ; false; ) const x = null;"', () => {
        expect(() => {
            parseScript('for ( ; false; ) const x = null;');
        }).to.throw();
    });

    it('should fail on "for ( ; false; ) const x = null;"', () => {
        expect(() => {
            parseScript('for ( ; false; ) const x = null;');
        }).to.throw();
    });

    it('should fail on "for (var x; false; ) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (var x; false; ) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should throw on "for({a=0};;);"', () => {
        expect(() => { parseScript('for({a=0};;);')}).to.not.throw();
    });

    it('should fail on "for (let x; false; ) { var x; }"', () => {
        expect(() => {
            parseScript('for (let x; false; ) { var x; }');
        }).to.not.throw();
    });
    it('should fail on "for (const x; false; ) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (const x; false; ) label1: label2: function f() {}');
        }).to.throw();
    });
    it('should fail on "for ( ; false; ) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for ( ; false; ) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should fail on "for (let x; false; ) { var x; }"', () => {
        expect(() => {
            parseScript('for (let x; false; ) { var x; }');
        }).to.not.throw();
    });
    it('should fail on "for(var index=0; index<10; index++; index--);"', () => {
        expect(() => {
            parseScript('for(var index=0; index<10; index++; index--);');
        }).to.throw();
    });
    it('should fail on "for(var index=0; index<10; index+=4; index++; index--) ;"', () => {
        expect(() => {
            parseScript('for(var index=0; index<10; index+=4; index++; index--) ;');
        }).to.throw();
    });
    it('should fail on "for(index=0; index<10; index++; index--) ;"', () => {
        expect(() => {
            parseScript('for(index=0; index<10; index++; index--) ;');
        }).to.throw();
    });
    it('should fail on "for({var index=0; index+=1;} index++<=10; index*2;) {	arr.add(""+index);};"', () => {
        expect(() => {
            parseScript('for({var index=0; index+=1;} index++<=10; index*2;) {	arr.add(""+index);};');
        }).to.throw();
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript('for ( ; false; ) async function* g() {}');
        }).to.throw();
    });
    it('should fail lexical declaration (const) in statement position', () => {
        expect(() => {
            parseScript('for ( ; false; ) const x = null;');
        }).to.throw();
    });
    it('should fail lexical declaration (let) in statement position', () => {
        expect(() => {
            parseScript('for ( ; false; ) let x;');
        }).to.throw();
    });
    it('should fail generator declaration in statement position', () => {
        expect(() => {
            parseScript('for ( ; false; ) function* g() {}');
        }).to.throw();
    });

    it('should fail on labeled statement', () => {
        expect(() => {
            parseScript('for (let xd; false; ) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should fail on re-declare variables declared in the head', () => {
        expect(() => {
            parseScript(`for (const x; false; ) { var x; }`);
        }).to.throw();
    });

    it('should parse "for(;;);"', () => {
        expect(parseScript(`for(;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 8,
                "init": null,
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 7,
                    "end": 8
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(;;){}"', () => {
        expect(parseScript(`for(;;){}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 9
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "init": null,
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
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
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse "for(x = 0;;);"', () => {
        expect(parseScript(`for(x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true,
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
                "type": "ForStatement",
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
                "init": {
                  "type": "AssignmentExpression",
                  "start": 4,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "operator": "=",
                  "left": {
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
                    "name": "x"
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
                  "start": 12,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(var x = 0;;);"', () => {
        expect(parseScript(`for(var x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true,
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
                "type": "ForStatement",
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
                "init": {
                  "type": "VariableDeclaration",
                  "start": 4,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 8,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "id": {
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
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(var x = 0, y = 1;;);"', () => {
        expect(parseScript(`for(var x = 0, y = 1;;);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 24,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 4,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 8,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "id": {
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
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 15,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "id": {
                        "type": "Identifier",
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
                        "name": "y"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 19,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 19
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
                  "start": 23,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(x = 0; x < 42;);"', () => {
        expect(parseScript(`for(x = 0; x < 42;);`, {
            ranges: true,
            raw: true,
            next: true,
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
                "type": "ForStatement",
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
                "init": {
                  "type": "AssignmentExpression",
                  "start": 4,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "operator": "=",
                  "left": {
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
                    "name": "x"
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 11,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 1,
                      "column": 17
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
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 15,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "value": 42,
                    "raw": "42"
                  }
                },
                "update": null,
                "body": {
                  "type": "EmptyStatement",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(x = 0; x < 42; x++);"', () => {
        expect(parseScript(`for(x = 0; x < 42; x++);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 24,
                "init": {
                    "type": "AssignmentExpression",
                    "start": 4,
                    "end": 9,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 11,
                    "end": 17,
                    "left": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "name": "x"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 15,
                        "end": 17,
                        "value": 42,
                        "raw": "42"
                    }
                },
                "update": {
                    "type": "UpdateExpression",
                    "start": 19,
                    "end": 22,
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "name": "x"
                    }
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 23,
                    "end": 24
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(x = 0; x < 42; x++) process(x);"', () => {
        expect(parseScript(`for(x = 0; x < 42; x++) process(x);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 35
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "init": {
                  "type": "AssignmentExpression",
                  "start": 4,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "operator": "=",
                  "left": {
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
                    "name": "x"
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 11,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 1,
                      "column": 17
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
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 15,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "value": 42,
                    "raw": "42"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 19,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "operator": "++",
                  "prefix": false,
                  "argument": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "name": "x"
                  }
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 24,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "expression": {
                    "type": "CallExpression",
                    "start": 24,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 32,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 32
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "start: for (;;) break start"', () => {
        expect(parseScript(`start: for (;;) break start`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "body": {
                  "type": "ForStatement",
                  "start": 7,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "init": null,
                  "test": null,
                  "update": null,
                  "body": {
                    "type": "BreakStatement",
                    "start": 16,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "label": {
                      "type": "Identifier",
                      "start": 22,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "name": "start"
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
                  "name": "start"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(let x = 0;;);"', () => {
        expect(parseScript(`for(let x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 17,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "x"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 16,
                    "end": 17
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(let x = 0, y = 1;;);"', () => {
        expect(parseScript(`for(let x = 0, y = 1;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 24,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 20,
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 8,
                            "end": 13,
                            "id": {
                                "type": "Identifier",
                                "start": 8,
                                "end": 9,
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "start": 12,
                                "end": 13,
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 15,
                            "end": 20,
                            "id": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
                                "start": 19,
                                "end": 20,
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    ],
                    "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 23,
                    "end": 24
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(const x = 0;;);"', () => {
        expect(parseScript(`for(const x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 19,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 15,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 10,
                        "end": 15,
                        "id": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "x"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 14,
                            "end": 15,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "const"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 18,
                    "end": 19
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(;;);"', () => {
        expect(parseScript(`for(;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 8,
                "init": null,
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 7,
                    "end": 8
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(x, y;;);"', () => {
        expect(parseScript(`for(x, y;;);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
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
                "type": "ForStatement",
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
                "init": {
                  "type": "SequenceExpression",
                  "start": 4,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "expressions": [
                    {
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
                      "name": "x"
                    },
                    {
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
                      "name": "y"
                    }
                  ]
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding with null', () => {
        expect(parseScript(`for (let {} = null; ; ) {}`, {
            ranges: true,
            raw: true,
            next: true,
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
                "type": "ForStatement",
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
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "id": {
                        "type": "ObjectPattern",
                        "start": 9,
                        "end": 11,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 11
                          }
                        },
                        "properties": []
                      },
                      "init": {
                        "type": "Literal",
                        "start": 14,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 18
                          }
                        },
                        "value": null,
                        "raw": "null"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 24,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`for (let { x: y } = { x: 23 }; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 50
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 50,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 50
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "id": {
                        "type": "ObjectPattern",
                        "start": 9,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
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
                              "name": "x"
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
                              "name": "y"
                            },
                            "kind": "init"
                          }
                        ]
                      },
                      "init": {
                        "type": "ObjectExpression",
                        "start": 20,
                        "end": 29,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 29
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 22,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
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
                              },
                              "name": "x"
                            },
                            "value": {
                              "type": "Literal",
                              "start": 25,
                              "end": 27,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 25
                                },
                                "end": {
                                  "line": 1,
                                  "column": 27
                                }
                              },
                              "value": 23,
                              "raw": "23"
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 31,
                  "end": 44,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 31
                    },
                    "end": {
                      "line": 1,
                      "column": 44
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 31,
                    "end": 40,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 31
                      },
                      "end": {
                        "line": 1,
                        "column": 40
                      }
                    },
                    "name": "iterCount"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 43,
                    "end": 44,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 43
                      },
                      "end": {
                        "line": 1,
                        "column": 44
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 48,
                  "end": 50,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 48
                    },
                    "end": {
                      "line": 1,
                      "column": 50
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse nested object destructuring with a value of `undefined`', () => {
        expect(parseScript(`for (var [{ x }] = []; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 42,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 42
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "id": {
                        "type": "ArrayPattern",
                        "start": 9,
                        "end": 16,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 16
                          }
                        },
                        "elements": [
                          {
                            "type": "ObjectPattern",
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
                            "properties": [
                              {
                                "type": "Property",
                                "start": 12,
                                "end": 13,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 13
                                  }
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 13,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 13
                                    }
                                  },
                                  "name": "x"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 13,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 13
                                    }
                                  },
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        ]
                      },
                      "init": {
                        "type": "ArrayExpression",
                        "start": 19,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 19
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "elements": []
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 23,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 23,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 32
                      }
                    },
                    "name": "iterCount"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 35,
                    "end": 36,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 35
                      },
                      "end": {
                        "line": 1,
                        "column": 36
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 40,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 40
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse rest element containing a rest element ', () => {
        expect(parseScript(`for (var [...[...x]] = values; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 50,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 29,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 29,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 20,
                            "elements": [{
                                "type": "RestElement",
                                "start": 10,
                                "end": 19,
                                "argument": {
                                    "type": "ArrayPattern",
                                    "start": 13,
                                    "end": 19,
                                    "elements": [{
                                        "type": "RestElement",
                                        "start": 14,
                                        "end": 18,
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 17,
                                            "end": 18,
                                            "name": "x"
                                        }
                                    }]
                                }
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "start": 23,
                            "end": 29,
                            "name": "values"
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 31,
                    "end": 44,
                    "left": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 40,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 43,
                        "end": 44,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 48,
                    "end": 50,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse trailing comma is allowed following BindingPropertyList', () => {
        expect(parseScript(`for (var { x, } = { x: 23 }; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 48,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 27,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 27,
                        "id": {
                            "type": "ObjectPattern",
                            "start": 9,
                            "end": 15,
                            "properties": [{
                                "type": "Property",
                                "start": 11,
                                "end": 12,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 11,
                                    "end": 12,
                                    "name": "x"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
                                    "start": 11,
                                    "end": 12,
                                    "name": "x"
                                }
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "start": 18,
                            "end": 27,
                            "properties": [{
                                "type": "Property",
                                "start": 20,
                                "end": 25,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 23,
                                    "end": 25,
                                    "value": 23,
                                    "raw": "23"
                                },
                                "kind": "init"
                            }]
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 29,
                    "end": 42,
                    "left": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 38,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 41,
                        "end": 42,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 46,
                    "end": 48,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`for (var { x: y } = { x: 23 }; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 50,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 29,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 29,
                        "id": {
                            "type": "ObjectPattern",
                            "start": 9,
                            "end": 17,
                            "properties": [{
                                "type": "Property",
                                "start": 11,
                                "end": 15,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 11,
                                    "end": 12,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "start": 14,
                                    "end": 15,
                                    "name": "y"
                                },
                                "kind": "init"
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "start": 20,
                            "end": 29,
                            "properties": [{
                                "type": "Property",
                                "start": 22,
                                "end": 27,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 22,
                                    "end": 23,
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 25,
                                    "end": 27,
                                    "value": 23,
                                    "raw": "23"
                                },
                                "kind": "init"
                            }]
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 31,
                    "end": 44,
                    "left": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 40,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 43,
                        "end": 44,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 48,
                    "end": 50,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse rest object containing unextracted data', () => {
        expect(parseScript(`for (var {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3}; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [],
                    "end": 72,
                    "start": 70,
                    "type": "BlockStatement"
                },
                "end": 72,
                "init": {
                    "declarations": [{
                        "end": 51,
                        "id": {
                            "end": 24,
                            "properties": [{
                                    "computed": false,
                                    "end": 11,
                                    "key": {
                                        "end": 11,
                                        "name": "a",
                                        "start": 10,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 10,
                                    "type": "Property",
                                    "value": {
                                        "end": 11,
                                        "name": "a",
                                        "start": 10,
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 14,
                                    "key": {
                                        "end": 14,
                                        "name": "b",
                                        "start": 13,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 13,
                                    "type": "Property",
                                    "value": {
                                        "end": 14,
                                        "name": "b",
                                        "start": 13,
                                        "type": "Identifier"
                                    }
                                },
                                {
                                    "argument": {
                                        "end": 23,
                                        "name": "rest",
                                        "start": 19,
                                        "type": "Identifier"
                                    },
                                    "end": 23,
                                    "start": 16,
                                    "type": "RestElement"
                                }
                            ],
                            "start": 9,
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "end": 51,
                            "properties": [{
                                    "computed": false,
                                    "end": 32,
                                    "key": {
                                        "end": 29,
                                        "name": "x",
                                        "start": 28,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 28,
                                    "type": "Property",
                                    "value": {
                                        "end": 32,
                                        "raw": "1",
                                        "start": 31,
                                        "type": "Literal",
                                        "value": 1
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 38,
                                    "key": {
                                        "end": 35,
                                        "name": "y",
                                        "start": 34,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 34,
                                    "type": "Property",
                                    "value": {
                                        "end": 38,
                                        "raw": "2",
                                        "start": 37,
                                        "type": "Literal",
                                        "value": 2
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 44,
                                    "key": {
                                        "end": 41,
                                        "name": "a",
                                        "start": 40,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 40,
                                    "type": "Property",
                                    "value": {
                                        "end": 44,
                                        "raw": "5",
                                        "start": 43,
                                        "type": "Literal",
                                        "value": 5
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 50,
                                    "key": {
                                        "end": 47,
                                        "name": "b",
                                        "start": 46,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "start": 46,
                                    "type": "Property",
                                    "value": {
                                        "end": 50,
                                        "raw": "3",
                                        "start": 49,
                                        "type": "Literal",
                                        "value": 3
                                    }
                                }
                            ],
                            "start": 27,
                            "type": "ObjectExpression"
                        },
                        "start": 9,
                        "type": "VariableDeclarator"
                    }],
                    "end": 51,
                    "kind": "var",
                    "start": 5,
                    "type": "VariableDeclaration"
                },
                "start": 0,
                "test": {
                    "end": 66,
                    "left": {
                        "end": 62,
                        "name": "iterCount",
                        "start": 53,
                        "type": "Identifier"
                    },
                    "operator": "<",
                    "right": {
                        "end": 66,
                        "raw": "1",
                        "start": 65,
                        "type": "Literal",
                        "value": 1,
                    },
                    "start": 53,
                    "type": "BinaryExpression",
                },
                "type": "ForStatement",
                "update": null,
            }, ],
            "end": 72,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`for (var { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }; iterCount < 1; ) {}`, {
            ranges: false,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ForStatement",
                "init": {
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "w"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "z"
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "elements": [{
                                                "type": "Literal",
                                                "value": 4,
                                                "raw": "4"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 5,
                                                "raw": "5"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 6,
                                                "raw": "6"
                                            }
                                        ]
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "w"
                                },
                                "computed": false,
                                "value": {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                            "type": "Literal",
                                            "value": 7,
                                            "raw": "7"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    ]
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "operator": "<",
                    "left": {
                        "type": "Identifier",
                        "name": "iterCount"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(x = 0;;);"', () => {
        expect(parseScript(`for(x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 13,
                "init": {
                    "type": "AssignmentExpression",
                    "start": 4,
                    "end": 9,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 12,
                    "end": 13
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(var x = 0;;);"', () => {
        expect(parseScript(`for(var x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 17,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "x"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 16,
                    "end": 17
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(let x = 0;;);"', () => {
        expect(parseScript(`for(let x = 0;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 17,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "x"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 16,
                    "end": 17
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(var x = 0, y = 1;;);"', () => {
        expect(parseScript(`for(var x = 0, y = 1;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 24,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 20,
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 8,
                            "end": 13,
                            "id": {
                                "type": "Identifier",
                                "start": 8,
                                "end": 9,
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "start": 12,
                                "end": 13,
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 15,
                            "end": 20,
                            "id": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
                                "start": 19,
                                "end": 20,
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    ],
                    "kind": "var"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 23,
                    "end": 24
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(x; x < 0;);"', () => {
        expect(parseScript(`for(x; x < 0;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 15,
                "init": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "x"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 7,
                    "end": 12,
                    "left": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "x"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 12,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 14,
                    "end": 15
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(x; x < 0; x++);"', () => {
        expect(parseScript(`for(x; x < 0; x++);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 19,
                "init": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "x"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 7,
                    "end": 12,
                    "left": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "x"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 12,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "update": {
                    "type": "UpdateExpression",
                    "start": 14,
                    "end": 17,
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "x"
                    }
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 18,
                    "end": 19
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(x; x < 0; x++) process(x);"', () => {
        expect(parseScript(`for(x; x < 0; x++) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 30,
                "init": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "x"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 7,
                    "end": 12,
                    "left": {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "x"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 12,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "update": {
                    "type": "UpdateExpression",
                    "start": 14,
                    "end": 17,
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "x"
                    }
                },
                "body": {
                    "type": "ExpressionStatement",
                    "start": 19,
                    "end": 30,
                    "expression": {
                        "type": "CallExpression",
                        "start": 19,
                        "end": 29,
                        "callee": {
                            "type": "Identifier",
                            "start": 19,
                            "end": 26,
                            "name": "process"
                        },
                        "arguments": [{
                            "type": "Identifier",
                            "start": 27,
                            "end": 28,
                            "name": "x"
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(var a;b;c);"', function () {
        expect(parseScript(`for(var a;b;c);`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            },
            "test": {
                "type": "Identifier",
                "name": "b"
            },
            "update": {
                "type": "Identifier",
                "name": "c"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
});
    });

    it('should parse "for(a;b;c);"', () => {
        expect(parseScript(`for(a;b;c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 11,
                "init": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                },
                "test": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "b"
                },
                "update": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "name": "c"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 10,
                    "end": 11
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse lone rest element', () => {
        expect(parseScript(`for (const [...x] = values; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 47,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 26,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 11,
                        "end": 26,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 11,
                            "end": 17,
                            "elements": [{
                                "type": "RestElement",
                                "start": 12,
                                "end": 16,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 15,
                                    "end": 16,
                                    "name": "x"
                                }
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "start": 20,
                            "end": 26,
                            "name": "values"
                        }
                    }],
                    "kind": "const"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 28,
                    "end": 41,
                    "left": {
                        "type": "Identifier",
                        "start": 28,
                        "end": 37,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 40,
                        "end": 41,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 45,
                    "end": 47,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(var a = 0;b;c);"', () => {
        expect(parseScript(`for(var a = 0;b;c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 19,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "a"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 15,
                    "name": "b"
                },
                "update": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "c"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 18,
                    "end": 19
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(var a = 0;;) { let a; }"', () => {
        expect(parseScript(`for(var a = 0;;) { let a; }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 27,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "a"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 12,
                            "end": 13,
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 17,
                    "end": 27,
                    "body": [{
                        "type": "VariableDeclaration",
                        "start": 19,
                        "end": 25,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 23,
                            "end": 24,
                            "id": {
                                "type": "Identifier",
                                "start": 23,
                                "end": 24,
                                "name": "a"
                            },
                            "init": null
                        }],
                        "kind": "let"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(;b;c);"', () => {
        expect(parseScript(`for(;b;c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 10,
                "init": null,
                "test": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 6,
                    "name": "b"
                },
                "update": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 8,
                    "name": "c"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 9,
                    "end": 10
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(let of;;);"', () => {
        expect(parseScript(`for(let of;;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 14,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 10,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 10,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 10,
                            "name": "of"
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 13,
                    "end": 14
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for (() => { this in null };;);"', () => {
        expect(parseScript(`for (() => { this in null };;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 31,
                "init": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 27,
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 25,
                            "expression": {
                                "type": "BinaryExpression",
                                "start": 13,
                                "end": 25,
                                "left": {
                                    "type": "ThisExpression",
                                    "start": 13,
                                    "end": 17
                                },
                                "operator": "in",
                                "right": {
                                    "type": "Literal",
                                    "start": 21,
                                    "end": 25,
                                    "value": null,
                                    "raw": "null"
                                }
                            }
                        }]
                    }
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 30,
                    "end": 31
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse singleNameBinding does assign name to "anonymous" functions "through" cover grammar ', () => {
        expect(parseScript(`for (var [cover = (function () {}), xCover = (0, function() {})] = []; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 90,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 90,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 69,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 69,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 64,
                            "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 10,
                                    "end": 34,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 10,
                                        "end": 15,
                                        "name": "cover"
                                    },
                                    "right": {
                                        "type": "FunctionExpression",
                                        "start": 19,
                                        "end": 33,
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 31,
                                            "end": 33,
                                            "body": []
                                        }
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "start": 36,
                                    "end": 63,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 36,
                                        "end": 42,
                                        "name": "xCover"
                                    },
                                    "right": {
                                        "type": "SequenceExpression",
                                        "start": 46,
                                        "end": 62,
                                        "expressions": [{
                                                "type": "Literal",
                                                "start": 46,
                                                "end": 47,
                                                "value": 0,
                                                "raw": "0"
                                            },
                                            {
                                                "type": "FunctionExpression",
                                                "start": 49,
                                                "end": 62,
                                                "id": null,
                                                "generator": false,
                                                "expression": false,
                                                "async": false,
                                                "params": [],
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "start": 60,
                                                    "end": 62,
                                                    "body": []
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 67,
                            "end": 69,
                            "elements": []
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 71,
                    "end": 84,
                    "left": {
                        "type": "Identifier",
                        "start": 71,
                        "end": 80,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 83,
                        "end": 84,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 88,
                    "end": 90,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse singleNameBinding with normal value iteration', () => {
        expect(parseScript(`for (var [x, y, z] = [1, 2, 3]; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 51,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 30,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 30,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 18,
                            "elements": [{
                                    "type": "Identifier",
                                    "start": 10,
                                    "end": 11,
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "start": 13,
                                    "end": 14,
                                    "name": "y"
                                },
                                {
                                    "type": "Identifier",
                                    "start": 16,
                                    "end": 17,
                                    "name": "z"
                                }
                            ]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 21,
                            "end": 30,
                            "elements": [{
                                    "type": "Literal",
                                    "start": 22,
                                    "end": 23,
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "start": 25,
                                    "end": 26,
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "Literal",
                                    "start": 28,
                                    "end": 29,
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 32,
                    "end": 45,
                    "left": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 41,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 44,
                        "end": 45,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 49,
                    "end": 51,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with array binding pattern and initializer', () => {
        expect(parseScript(`for (var [[,] = g()] = []; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 46,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 46,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 25,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 9,
                        "end": 25,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 9,
                            "end": 20,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 10,
                                "end": 19,
                                "left": {
                                    "type": "ArrayPattern",
                                    "start": 10,
                                    "end": 13,
                                    "elements": [
                                        null
                                    ]
                                },
                                "right": {
                                    "type": "CallExpression",
                                    "start": 16,
                                    "end": 19,
                                    "callee": {
                                        "type": "Identifier",
                                        "start": 16,
                                        "end": 17,
                                        "name": "g"
                                    },
                                    "arguments": []
                                }
                            }]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 23,
                            "end": 25,
                            "elements": []
                        }
                    }],
                    "kind": "var"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 27,
                    "end": 40,
                    "left": {
                        "type": "Identifier",
                        "start": 27,
                        "end": 36,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 39,
                        "end": 40,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 44,
                    "end": 46,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse singleNameBinding assigns name to "anonymous" functions', () => {
        expect(parseScript(`for (const [fn = function () {}, xFn = function x() {}] = []; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 81,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 81,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 60,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 11,
                        "end": 60,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 11,
                            "end": 55,
                            "elements": [{
                                    "type": "AssignmentPattern",
                                    "start": 12,
                                    "end": 31,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 12,
                                        "end": 14,
                                        "name": "fn"
                                    },
                                    "right": {
                                        "type": "FunctionExpression",
                                        "start": 17,
                                        "end": 31,
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 29,
                                            "end": 31,
                                            "body": []
                                        }
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "start": 33,
                                    "end": 54,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 33,
                                        "end": 36,
                                        "name": "xFn"
                                    },
                                    "right": {
                                        "type": "FunctionExpression",
                                        "start": 39,
                                        "end": 54,
                                        "id": {
                                            "type": "Identifier",
                                            "start": 48,
                                            "end": 49,
                                            "name": "x"
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 52,
                                            "end": 54,
                                            "body": []
                                        }
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 58,
                            "end": 60,
                            "elements": []
                        }
                    }],
                    "kind": "const"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 62,
                    "end": 75,
                    "left": {
                        "type": "Identifier",
                        "start": 62,
                        "end": 71,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 74,
                        "end": 75,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 79,
                    "end": 81,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with array binding pattern', () => {
        expect(parseScript(`for (const [[] = function() { initCount += 1; }()] = [[23]]; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 80,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 80,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 59,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 11,
                        "end": 59,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 11,
                            "end": 50,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 12,
                                "end": 49,
                                "left": {
                                    "type": "ArrayPattern",
                                    "start": 12,
                                    "end": 14,
                                    "elements": []
                                },
                                "right": {
                                    "type": "CallExpression",
                                    "start": 17,
                                    "end": 49,
                                    "callee": {
                                        "type": "FunctionExpression",
                                        "start": 17,
                                        "end": 47,
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 28,
                                            "end": 47,
                                            "body": [{
                                                "type": "ExpressionStatement",
                                                "start": 30,
                                                "end": 45,
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "start": 30,
                                                    "end": 44,
                                                    "operator": "+=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "start": 30,
                                                        "end": 39,
                                                        "name": "initCount"
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "start": 43,
                                                        "end": 44,
                                                        "value": 1,
                                                        "raw": "1"
                                                    }
                                                }
                                            }]
                                        }
                                    },
                                    "arguments": []
                                }
                            }]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 53,
                            "end": 59,
                            "elements": [{
                                "type": "ArrayExpression",
                                "start": 54,
                                "end": 58,
                                "elements": [{
                                    "type": "Literal",
                                    "start": 55,
                                    "end": 57,
                                    "value": 23,
                                    "raw": "23"
                                }]
                            }]
                        }
                    }],
                    "kind": "const"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 61,
                    "end": 74,
                    "left": {
                        "type": "Identifier",
                        "start": 61,
                        "end": 70,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 73,
                        "end": 74,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 78,
                    "end": 80,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse bindingElement with array binding pattern and initializer', () => {
        expect(parseScript(`for (const [[x, y, z] = [4, 5, 6]] = []; iterCount < 1; ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 60,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 60,
                "init": {
                    "type": "VariableDeclaration",
                    "start": 5,
                    "end": 39,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 11,
                        "end": 39,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 11,
                            "end": 34,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 12,
                                "end": 33,
                                "left": {
                                    "type": "ArrayPattern",
                                    "start": 12,
                                    "end": 21,
                                    "elements": [{
                                            "type": "Identifier",
                                            "start": 13,
                                            "end": 14,
                                            "name": "x"
                                        },
                                        {
                                            "type": "Identifier",
                                            "start": 16,
                                            "end": 17,
                                            "name": "y"
                                        },
                                        {
                                            "type": "Identifier",
                                            "start": 19,
                                            "end": 20,
                                            "name": "z"
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "start": 24,
                                    "end": 33,
                                    "elements": [{
                                            "type": "Literal",
                                            "start": 25,
                                            "end": 26,
                                            "value": 4,
                                            "raw": "4"
                                        },
                                        {
                                            "type": "Literal",
                                            "start": 28,
                                            "end": 29,
                                            "value": 5,
                                            "raw": "5"
                                        },
                                        {
                                            "type": "Literal",
                                            "start": 31,
                                            "end": 32,
                                            "value": 6,
                                            "raw": "6"
                                        }
                                    ]
                                }
                            }]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "start": 37,
                            "end": 39,
                            "elements": []
                        }
                    }],
                    "kind": "const"
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 41,
                    "end": 54,
                    "left": {
                        "type": "Identifier",
                        "start": 41,
                        "end": 50,
                        "name": "iterCount"
                    },
                    "operator": "<",
                    "right": {
                        "type": "Literal",
                        "start": 53,
                        "end": 54,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "start": 58,
                    "end": 60,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested "var-loops" nine blocks depth', () => {
        expect(parseScript(`for( index0=0; index0<=1; index0++) {
for( index1=0; index1<=index0; index1++) {
  for( index2=0; index2<=index1; index2++) {
    for( index3=0; index3<=index2; index3++) {
      for( index4=0; index4<=index3; index4++) {
        for( index5=0; index5<=index4; index5++) {
          for( index6=0; index6<=index5; index6++) {
            for( index7=0; index7<=index6; index7++) {
              for( index8=0; index8<=index1; index8++) {
              }
            }
          }
        }
      }
    }
  }
}
}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 511,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 511,
                "init": {
                    "type": "AssignmentExpression",
                    "start": 5,
                    "end": 13,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 11,
                        "name": "index0"
                    },
                    "right": {
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 0,
                        "raw": "0"
                    }
                },
                "test": {
                    "type": "BinaryExpression",
                    "start": 15,
                    "end": 24,
                    "left": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 21,
                        "name": "index0"
                    },
                    "operator": "<=",
                    "right": {
                        "type": "Literal",
                        "start": 23,
                        "end": 24,
                        "value": 1,
                        "raw": "1"
                    }
                },
                "update": {
                    "type": "UpdateExpression",
                    "start": 26,
                    "end": 34,
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                        "type": "Identifier",
                        "start": 26,
                        "end": 32,
                        "name": "index0"
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 36,
                    "end": 511,
                    "body": [{
                        "type": "ForStatement",
                        "start": 38,
                        "end": 509,
                        "init": {
                            "type": "AssignmentExpression",
                            "start": 43,
                            "end": 51,
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "start": 43,
                                "end": 49,
                                "name": "index1"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 50,
                                "end": 51,
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        "test": {
                            "type": "BinaryExpression",
                            "start": 53,
                            "end": 67,
                            "left": {
                                "type": "Identifier",
                                "start": 53,
                                "end": 59,
                                "name": "index1"
                            },
                            "operator": "<=",
                            "right": {
                                "type": "Identifier",
                                "start": 61,
                                "end": 67,
                                "name": "index0"
                            }
                        },
                        "update": {
                            "type": "UpdateExpression",
                            "start": 69,
                            "end": 77,
                            "operator": "++",
                            "prefix": false,
                            "argument": {
                                "type": "Identifier",
                                "start": 69,
                                "end": 75,
                                "name": "index1"
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "start": 79,
                            "end": 509,
                            "body": [{
                                "type": "ForStatement",
                                "start": 83,
                                "end": 507,
                                "init": {
                                    "type": "AssignmentExpression",
                                    "start": 88,
                                    "end": 96,
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "start": 88,
                                        "end": 94,
                                        "name": "index2"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "start": 95,
                                        "end": 96,
                                        "value": 0,
                                        "raw": "0"
                                    }
                                },
                                "test": {
                                    "type": "BinaryExpression",
                                    "start": 98,
                                    "end": 112,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 98,
                                        "end": 104,
                                        "name": "index2"
                                    },
                                    "operator": "<=",
                                    "right": {
                                        "type": "Identifier",
                                        "start": 106,
                                        "end": 112,
                                        "name": "index1"
                                    }
                                },
                                "update": {
                                    "type": "UpdateExpression",
                                    "start": 114,
                                    "end": 122,
                                    "operator": "++",
                                    "prefix": false,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 114,
                                        "end": 120,
                                        "name": "index2"
                                    }
                                },
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 124,
                                    "end": 507,
                                    "body": [{
                                        "type": "ForStatement",
                                        "start": 130,
                                        "end": 503,
                                        "init": {
                                            "type": "AssignmentExpression",
                                            "start": 135,
                                            "end": 143,
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "start": 135,
                                                "end": 141,
                                                "name": "index3"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "start": 142,
                                                "end": 143,
                                                "value": 0,
                                                "raw": "0"
                                            }
                                        },
                                        "test": {
                                            "type": "BinaryExpression",
                                            "start": 145,
                                            "end": 159,
                                            "left": {
                                                "type": "Identifier",
                                                "start": 145,
                                                "end": 151,
                                                "name": "index3"
                                            },
                                            "operator": "<=",
                                            "right": {
                                                "type": "Identifier",
                                                "start": 153,
                                                "end": 159,
                                                "name": "index2"
                                            }
                                        },
                                        "update": {
                                            "type": "UpdateExpression",
                                            "start": 161,
                                            "end": 169,
                                            "operator": "++",
                                            "prefix": false,
                                            "argument": {
                                                "type": "Identifier",
                                                "start": 161,
                                                "end": 167,
                                                "name": "index3"
                                            }
                                        },
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 171,
                                            "end": 503,
                                            "body": [{
                                                "type": "ForStatement",
                                                "start": 179,
                                                "end": 497,
                                                "init": {
                                                    "type": "AssignmentExpression",
                                                    "start": 184,
                                                    "end": 192,
                                                    "operator": "=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "start": 184,
                                                        "end": 190,
                                                        "name": "index4"
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "start": 191,
                                                        "end": 192,
                                                        "value": 0,
                                                        "raw": "0"
                                                    }
                                                },
                                                "test": {
                                                    "type": "BinaryExpression",
                                                    "start": 194,
                                                    "end": 208,
                                                    "left": {
                                                        "type": "Identifier",
                                                        "start": 194,
                                                        "end": 200,
                                                        "name": "index4"
                                                    },
                                                    "operator": "<=",
                                                    "right": {
                                                        "type": "Identifier",
                                                        "start": 202,
                                                        "end": 208,
                                                        "name": "index3"
                                                    }
                                                },
                                                "update": {
                                                    "type": "UpdateExpression",
                                                    "start": 210,
                                                    "end": 218,
                                                    "operator": "++",
                                                    "prefix": false,
                                                    "argument": {
                                                        "type": "Identifier",
                                                        "start": 210,
                                                        "end": 216,
                                                        "name": "index4"
                                                    }
                                                },
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "start": 220,
                                                    "end": 497,
                                                    "body": [{
                                                        "type": "ForStatement",
                                                        "start": 230,
                                                        "end": 489,
                                                        "init": {
                                                            "type": "AssignmentExpression",
                                                            "start": 235,
                                                            "end": 243,
                                                            "operator": "=",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "start": 235,
                                                                "end": 241,
                                                                "name": "index5"
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "start": 242,
                                                                "end": 243,
                                                                "value": 0,
                                                                "raw": "0"
                                                            }
                                                        },
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "start": 245,
                                                            "end": 259,
                                                            "left": {
                                                                "type": "Identifier",
                                                                "start": 245,
                                                                "end": 251,
                                                                "name": "index5"
                                                            },
                                                            "operator": "<=",
                                                            "right": {
                                                                "type": "Identifier",
                                                                "start": 253,
                                                                "end": 259,
                                                                "name": "index4"
                                                            }
                                                        },
                                                        "update": {
                                                            "type": "UpdateExpression",
                                                            "start": 261,
                                                            "end": 269,
                                                            "operator": "++",
                                                            "prefix": false,
                                                            "argument": {
                                                                "type": "Identifier",
                                                                "start": 261,
                                                                "end": 267,
                                                                "name": "index5"
                                                            }
                                                        },
                                                        "body": {
                                                            "type": "BlockStatement",
                                                            "start": 271,
                                                            "end": 489,
                                                            "body": [{
                                                                "type": "ForStatement",
                                                                "start": 283,
                                                                "end": 479,
                                                                "init": {
                                                                    "type": "AssignmentExpression",
                                                                    "start": 288,
                                                                    "end": 296,
                                                                    "operator": "=",
                                                                    "left": {
                                                                        "type": "Identifier",
                                                                        "start": 288,
                                                                        "end": 294,
                                                                        "name": "index6"
                                                                    },
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "start": 295,
                                                                        "end": 296,
                                                                        "value": 0,
                                                                        "raw": "0"
                                                                    }
                                                                },
                                                                "test": {
                                                                    "type": "BinaryExpression",
                                                                    "start": 298,
                                                                    "end": 312,
                                                                    "left": {
                                                                        "type": "Identifier",
                                                                        "start": 298,
                                                                        "end": 304,
                                                                        "name": "index6"
                                                                    },
                                                                    "operator": "<=",
                                                                    "right": {
                                                                        "type": "Identifier",
                                                                        "start": 306,
                                                                        "end": 312,
                                                                        "name": "index5"
                                                                    }
                                                                },
                                                                "update": {
                                                                    "type": "UpdateExpression",
                                                                    "start": 314,
                                                                    "end": 322,
                                                                    "operator": "++",
                                                                    "prefix": false,
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "start": 314,
                                                                        "end": 320,
                                                                        "name": "index6"
                                                                    }
                                                                },
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "start": 324,
                                                                    "end": 479,
                                                                    "body": [{
                                                                        "type": "ForStatement",
                                                                        "start": 338,
                                                                        "end": 467,
                                                                        "init": {
                                                                            "type": "AssignmentExpression",
                                                                            "start": 343,
                                                                            "end": 351,
                                                                            "operator": "=",
                                                                            "left": {
                                                                                "type": "Identifier",
                                                                                "start": 343,
                                                                                "end": 349,
                                                                                "name": "index7"
                                                                            },
                                                                            "right": {
                                                                                "type": "Literal",
                                                                                "start": 350,
                                                                                "end": 351,
                                                                                "value": 0,
                                                                                "raw": "0"
                                                                            }
                                                                        },
                                                                        "test": {
                                                                            "type": "BinaryExpression",
                                                                            "start": 353,
                                                                            "end": 367,
                                                                            "left": {
                                                                                "type": "Identifier",
                                                                                "start": 353,
                                                                                "end": 359,
                                                                                "name": "index7"
                                                                            },
                                                                            "operator": "<=",
                                                                            "right": {
                                                                                "type": "Identifier",
                                                                                "start": 361,
                                                                                "end": 367,
                                                                                "name": "index6"
                                                                            }
                                                                        },
                                                                        "update": {
                                                                            "type": "UpdateExpression",
                                                                            "start": 369,
                                                                            "end": 377,
                                                                            "operator": "++",
                                                                            "prefix": false,
                                                                            "argument": {
                                                                                "type": "Identifier",
                                                                                "start": 369,
                                                                                "end": 375,
                                                                                "name": "index7"
                                                                            }
                                                                        },
                                                                        "body": {
                                                                            "type": "BlockStatement",
                                                                            "start": 379,
                                                                            "end": 467,
                                                                            "body": [{
                                                                                "type": "ForStatement",
                                                                                "start": 395,
                                                                                "end": 453,
                                                                                "init": {
                                                                                    "type": "AssignmentExpression",
                                                                                    "start": 400,
                                                                                    "end": 408,
                                                                                    "operator": "=",
                                                                                    "left": {
                                                                                        "type": "Identifier",
                                                                                        "start": 400,
                                                                                        "end": 406,
                                                                                        "name": "index8"
                                                                                    },
                                                                                    "right": {
                                                                                        "type": "Literal",
                                                                                        "start": 407,
                                                                                        "end": 408,
                                                                                        "value": 0,
                                                                                        "raw": "0"
                                                                                    }
                                                                                },
                                                                                "test": {
                                                                                    "type": "BinaryExpression",
                                                                                    "start": 410,
                                                                                    "end": 424,
                                                                                    "left": {
                                                                                        "type": "Identifier",
                                                                                        "start": 410,
                                                                                        "end": 416,
                                                                                        "name": "index8"
                                                                                    },
                                                                                    "operator": "<=",
                                                                                    "right": {
                                                                                        "type": "Identifier",
                                                                                        "start": 418,
                                                                                        "end": 424,
                                                                                        "name": "index1"
                                                                                    }
                                                                                },
                                                                                "update": {
                                                                                    "type": "UpdateExpression",
                                                                                    "start": 426,
                                                                                    "end": 434,
                                                                                    "operator": "++",
                                                                                    "prefix": false,
                                                                                    "argument": {
                                                                                        "type": "Identifier",
                                                                                        "start": 426,
                                                                                        "end": 432,
                                                                                        "name": "index8"
                                                                                    }
                                                                                },
                                                                                "body": {
                                                                                    "type": "BlockStatement",
                                                                                    "start": 436,
                                                                                    "end": 453,
                                                                                    "body": []
                                                                                }
                                                                            }]
                                                                        }
                                                                    }]
                                                                }
                                                            }]
                                                        }
                                                    }]
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });
});