import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Labelled', () => {

    it('should fail on labelled class', () => {
        expect(() => {
            parseScript(`foo: class X {}`)
        }).to.throw();
    });

    it('should fail on labelled const', () => {
        expect(() => {
            parseScript(`foo: const bar = null;`)
        }).to.throw();
    });

    it('should fail on labelled let', () => {
        expect(() => {
            parseScript(`foo: let bar;`)
        }).to.throw();
    });

    it('should fail if let declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`label: let x = 1;`)
        }).to.throw();
    });

    it('should fail on "aw\\u0061it: 1;"', () => {
        expect(() => {
            parseScript(`aw\\u0061it: 1;`)
        }).to.throw();
    });
    it('should fail if use await keyword as label in strict mode"', () => {
        expect(() => {
            parseModule(`aw\\u0061it: 1;`)
        }).to.throw();
    });
    it('should fail if use await keyword as label in strict mode"', () => {
        expect(() => {
            parseModule(`label: async function* g() {}`)
        }).to.throw();
    });

    it('should fail if Lexical declaration (const) used in statement position"', () => {
        expect(() => {
            parseScript(`label: const x = null;`)
        }).to.throw();
    });
    it('should fail if Lexical declaration (let) used in statement position"', () => {
        expect(() => {
            parseScript(`label: let x;`)
        }).to.throw();
    });
    it('should fail on "if(0) label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) label: function f(){}`)
        }).to.not.throw();
    });
    it('should fail on "if(0) labelA: labelB: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) labelA: labelB: function f(){}`)
        }).to.not.throw();
    });
    it('should fail on "if(0) label: function f(){} else ;"', () => {
        expect(() => {
            parseScript(`if(0) label: function f(){} else ;`)
        }).to.not.throw();
    });
    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.not.throw();
    });

    it('should fail on "label: continue label;"', () => {
        expect(() => {
            parseScript(`label: continue label;`)
        }).to.not.throw();
    });
    it('should fail on "label: if(0) continue label;"', () => {
        expect(() => {
            parseScript(`label: if(0) continue label;`)
        }).to.not.throw();
    });
    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.not.throw();
    });

    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.not.throw();
    });

    it('should fail on ""use strict"; implements:"abc";"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:"abc";`)
        }).to.throw();
    });
    it('should fail on ""use strict"; implements:123;"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:123;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; implements:0;"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:0;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; static:2;"', () => {
        expect(() => {
            parseScript(`"use strict"; static:2;`)
        }).to.throw();
    });

    it('should fail on "function f(){ label: label: ; }"', () => {
        expect(() => {
            parseScript(`function f(){ label: label: ; }`)
        }).to.throw();
    });
    it('should fail on "label: label: ;"', () => {
        expect(() => {
            parseScript(`label: label: ;`)
        }).to.throw();
    });
    it('should fail on "break label;"', () => {
        expect(() => {
            parseScript(`break label;`)
        }).to.throw();
    });
    it('should fail on "labelA: break labelB;"', () => {
        expect(() => {
            parseScript(`labelA: break labelB;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; label: function f(){}"', () => {
        expect(() => {
            parseScript(`"use strict"; label: function f(){}`)
        }).to.throw();
    });
    it('should fail on invalid generator label"', () => {
        expect(() => {
            parseScript(`a: function *g() {}`)
        }).to.throw('');
    });
    it('should fail on invalid function label in strict mode', () => {
        expect(() => {
            parseModule(`a: function b() {}`)
        }).to.throw();
    });

    it('should fail on invalid function label - strict directive', () => {
        expect(() => {
            parseScript(`"use strict"; a: function f(){}`)
        }).to.throw();
    });

    it('should fail on "while ( false ) Label: continue Label;""', () => {
        expect(() => {
            parseScript(`while ( false ) Label: continue Label;`)
        }).to.not.throw();
    });

    it('should fail if ExpressionStatement doesn not have a lookahead restriction for `let', () => {
        expect(() => {
            parseScript(`f (false) {
        L: let // ASI
        {}`)
        }).to.throw();
    });

    it('should parse valid labeleld var"', () => {
        expect(parseScript('foo: var bar;', {
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "name": "bar"
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "label": {
                  "type": "Identifier",
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
                  "name": "foo"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as label in non-strict mode"', () => {
        expect(parseScript('yield: 1;', {
            ranges: true,
            raw: true,
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "ExpressionStatement",
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
                  "expression": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
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
                  "name": "yield"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a: function b() {}"', () => {
        expect(parseScript('a: function b() {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": {
                        "body": [],
                        "end": 18,
                        "start": 16,
                        "type": "BlockStatement"
                    },
                    "end": 18,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": {
                        "end": 13,
                        "name": "b",
                        "start": 12,
                        "type": "Identifier"
                    },
                    "params": [],
                    "start": 3,
                    "type": "FunctionDeclaration"
                },
                "end": 18,
                "label": {
                    "end": 1,
                    "name": "a",
                    "start": 0,
                    "type": "Identifier"
                },
                "start": 0,
                "type": "LabeledStatement"
            }, ],
            "end": 18,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "start: for (;;) break start"', () => {
        expect(parseScript('start: for (;;) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "ForStatement",
                    "init": null,
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "start: while (true) break start"', () => {
        expect(parseScript('start: while (true) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "WhileStatement",
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "a:{break a;}"', () => {
        expect(parseScript('a:{break a;}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "a"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a: function b() {}', () => {
        expect(parseScript('a: function b() {}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "a"
                },
                "body": {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "b"
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


    it('should parse start: while (true) break start', () => {
        expect(parseScript('start: while (true) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "WhileStatement",
                    "test": {
                        "type": "Literal",
                        "value": true,
                    },
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse__proto__: test', () => {
        expect(parseScript('__proto__: test')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "__proto__"
                },
                "body": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "test"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse two labels without wrongly reporting duplicates', () => {
        expect(parseScript(`loop:
            switch(c) {}
            loop:
            switch(c) {}`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 73,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 24
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
                    "line": 2,
                    "column": 24
                  }
                },
                "body": {
                  "type": "SwitchStatement",
                  "start": 18,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 24
                    }
                  },
                  "discriminant": {
                    "type": "Identifier",
                    "start": 25,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 19
                      },
                      "end": {
                        "line": 2,
                        "column": 20
                      }
                    },
                    "name": "c"
                  },
                  "cases": []
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 4,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 4
                    }
                  },
                  "name": "loop"
                }
              },
              {
                "type": "LabeledStatement",
                "start": 43,
                "end": 73,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 4,
                    "column": 24
                  }
                },
                "body": {
                  "type": "SwitchStatement",
                  "start": 61,
                  "end": 73,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 12
                    },
                    "end": {
                      "line": 4,
                      "column": 24
                    }
                  },
                  "discriminant": {
                    "type": "Identifier",
                    "start": 68,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 19
                      },
                      "end": {
                        "line": 4,
                        "column": 20
                      }
                    },
                    "name": "c"
                  },
                  "cases": []
                },
                "label": {
                  "type": "Identifier",
                  "start": 43,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 12
                    },
                    "end": {
                      "line": 3,
                      "column": 16
                    }
                  },
                  "name": "loop"
                }
              }
            ],
            "sourceType": "script"
          });
    });

});