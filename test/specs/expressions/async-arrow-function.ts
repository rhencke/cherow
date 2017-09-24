import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Expressions - Async arrow', () => {

  it("should fail if rest parameter has an initializer", () => {
    expect(() => {
        parseModule(`(async static => { "use strict" });`)
    }).to.throw();
});

it("should fail if used of future reserved word in strict mode", () => {
  expect(() => {
      parseScript(`"use strict"; (async static => 1);`)
  }).to.throw();
});

it("should fail if rest parameter has an initializer", () => {
  expect(() => {
      parseScript(`"use strict"; (async arguments => 1)`)
  }).to.throw();
});


  it('should fail on "(async)(a,b)=>12"', () => {
    expect(() => {
        parseScript(`(async)(a,b)=>12`)
    }).to.not.throw();
   });

    it("should fail if rest parameter has an initializer", () => {
        expect(() => {
            parseScript(`(async (...x = []) => {}`)
        }).to.throw();
    });

    it("should fail on invalid broken async arrow after parens", () => {
        expect(() => {
            parseScript(`async ()
                => a;`)
        }).to.throw();
    });

    it("should fail on invalid broken async arrow before parens", () => {
        expect(() => {
            parseScript(`async
                () => a;`)
        }).to.throw();
    });

    it("should fail on invalid broken async arrow", () => {
        expect(() => {
            parseScript(`async a
                => a;`)
        }).to.throw();
    });

    it("should fail on invalid yield default", () => {
        expect(() => {
            parseScript(`function* wrap() {
                    async(a = yield b) => a
                  };`)
                }).to.not.throw();
    });

    it("should fail on invalid await default", () => {
        expect(() => {
            parseScript(`async function wrap() {
                    (a = await b) => a
                  };`)
                }).to.throw();
    });

    it('should fail on invalid async line terminator and await', () => {
        expect(() => {
            parseScript(`async (x = 1) => {"use strict"}`)
          }).to.not.throw();
    });

    it('should fail formal parameter contains super call', () => {
        expect(() => {
            parseScript(`async(foo = super()) => {}`)
        }).to.throw();
    });

    it('should fail formal parameter contains super property', () => {
        expect(() => {
            parseScript(`async (foo = super.foo) => { }`)
        }).to.throw();
    });

    it('should fail if async arrows have a line terminator between "async" and the formals', () => {
        expect(() => {
            parseScript(`async
                (foo) => { }`)
        }).to.throw();
    });

    it('should fail on invalid async line terminator and await', () => {
        expect(() => {
            parseScript(`async a
        => await a`)
        }).to.throw();
    });

    it('should fail if FormalParameters contains eval', () => {
        expect(() => {
            parseScript(`"use strict"; async(eval) => {  }`)
        }).to.throw('');
    });

    it('should fail if FormalParameters contains eval', () => {
        expect(() => {
            parseScript(`async () => { await }`)
        }).to.throw();
    });

    it('should fail if FormalParameters contains eval', () => {
        expect(() => {
            parseScript(`async(a) => { await; }`)
        }).to.throw();
    });


    it('should fail on use of await as reserved word within function generator function bondies', () => {
        expect(() => {
            parseScript(`async() => {
          var await;
        };`)
      }).to.throw();
    });


    it('should fail  if a FunctionRestParameter is followed by a trailing comma', () => {
        expect(() => {
            parseScript(`async function f(...a,) {}`)
        }).to.throw();
    });

    it('should fail on use of await as reserved keyword within function generator function bondies', () => {
        expect(() => {
            parseScript(`async() => {
          void await;
        };`)
      }).to.throw();
    });

    it('should fail on await is a reserved keyword within generator function bodies and may not be used as a label identifier', () => {
        expect(() => {
            parseScript(`\\await: ;`)
        }).to.throw();
    });

    it('should fail on await is a reserved keyword within generator function bodies and may not be used as a label identifier', () => {
        expect(() => {
            parseScript(`\\u0061wait: ;`)
        }).to.throw();
    });

    it('should fail if the `async` contextual keyword contain Unicode escape sequences.', () => {
        expect(() => {
            parseScript(`\\u0061sync () => {}`)
        }).to.throw('');
    });

    it('should fail if duplicates', () => {
        expect(() => {
            parseScript(`async(bar) => { let bar; }`)
        }).to.throw();
    });

    it('should fail if arrow await in formals', () => {
        expect(() => {
            parseScript(`async(await) => {  }`)
        }).to.not.throw('');
    });

    it('should fail if arrow body contains super call', () => {
        expect(() => {
            parseScript(`async(foo) => { super() };`)
        }).to.throw('');
    });

    it('should fail if arrow body contains super property', () => {
        expect(() => {
            parseScript(`async(foo) => { super.prop };`)
        }).to.throw('');
    });


    it('should fail if arrow duplicate parameters', () => {
        expect(() => {
            parseScript(`async(a, a) => { }`)
        }).to.throw('');
    });

    it('should fail if FormalParameters default expressions contains await', () => {
        expect(() => {
            parseScript(`async(a=await)=>12`)
          }).to.not.throw();
    });

    it('should fail if eval in formal parameters in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; async(eval) => {  }`)
        }).to.throw('');
    });

    it('should fail if "async" has parentheses', () => {
        expect(() => {
            parseScript(`"use strict"; async package => 123`)
        }).to.throw();
    });

    it('should fail if "async" has parentheses', () => {
        expect(() => {
            parseScript(`async await => 123`)
        }).to.throw();
    });

    it('should fail if "async" has parentheses', () => {
        expect(() => {
            parseScript(`(async)(a,b)=>12`)
          }).to.not.throw();
    });

    it('should fail if async` contextual keyword contain Unicode escape sequences.', () => {
        expect(() => {
            parseScript(`\\u0061sync () => {}`)
        }).to.throw('');
    });

    it('should fail on "async yield => 1" in strict mode code', () => {
        expect(() => {
            parseModule(`async yield => 1`, {});
        }).to.throw();
    });

    it('should fail on "async\n() => a"', () => {
        expect(() => {
            parseScript(`async\n() => a`);
        }).to.throw();
    });

    it('should fail on "async ({a: await}) => 1"', () => {
        expect(() => {
            parseScript(`async ({a: await}) => 1`);
          }).to.throw();
    });

    it('should fail on "async ([await]) => 1"', () => {
        expect(() => {
            parseScript(`async ([await]) => 1`);
          }).to.not.throw();
    });

    it('should fail on "async ()\n=> a"', () => {
        expect(() => {
            parseScript(`async ()\n=> a`);
        }).to.throw();
    });

    it('should fail on "async a\n=> a"', () => {
        expect(() => {
            parseScript(`async a\n=> a`);
        }).to.throw();
    });

    it('should fail on "async () => await"', () => {
        expect(() => {
            parseScript(`async () => await`);
        }).to.throw();
    });

    it('should fail on awaid reserved word used as label in async arrow function body', () => {
        expect(() => {
            parseScript(`async() => {
                    await: ;
                  };`);
        }).to.throw();
    });

    it('should fail on non-identifier as arrow function name', () => {
        expect(() => {
            parseScript(`async { => function () {  }`);
        }).to.throw();
    });

    it('should fail on non-identifier as arrow function name', () => {
        expect(() => {
            parseScript(`async abc\n => function () {  }`);
        }).to.throw();
    });

    it('should fail on invalid use of enum as name on un-parenthesized arrow', () => {
        expect(() => {
            parseScript(`async enum => function () {  }`);
        }).to.throw();
    });

    it('should fail on invalid use of future reserved keyword in un-parenthesized arrow in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; async interface => abc`);
        }).to.throw();
    });

    it('should fail on "({async foo(a = await b) {}})"', () => {
        expect(() => {
            parseScript(`({async foo(a = await b) {}})`);
          }).to.throw();
    });

    it('should parse parse valid, but invalid syntax without arrows', () => {
        expect(parseScript(`async ({a = b}) => a`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 20,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 7,
                      "end": 14,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 13,
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 13,
                            "left": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 9,
                              "name": "a"
                            },
                            "right": {
                              "type": "Identifier",
                              "start": 12,
                              "end": 13,
                              "name": "b"
                            }
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parse assignment pattern assignment expression', () => {
        expect(parseScript(`async ({a: b = c}) => a`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 23,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 23,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 7,
                      "end": 17,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 16,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "a"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 16,
                            "left": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "b"
                            },
                            "right": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 16,
                              "name": "c"
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 22,
                    "end": 23,
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parse async arrow yield', () => {
        expect(parseScript(`async
        a => a`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 5,
                "expression": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 5,
                  "name": "async"
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 14,
                "end": 20,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 14,
                  "end": 20,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parse async arrow yield', () => {
        expect(parseScript(`async yield => 0;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "yield"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 0
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "async => 1"', () => {
        expect(parseScript(`async => 1`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "async"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 1
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow parameter with cover initializer', () => {
        expect(parseScript(`async (x = 1) => x;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "AssignmentPattern",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1
                        }
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse assigned async arrow', () => {
        expect(parseScript(`id = async x => x, square = async (y) => { y * y }`, {})).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "name": "id"
                                },
                                "right": {
                                    "type": "ArrowFunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "name": "x"
                                        }
                                    ],
                                    "body": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "generator": false,
                                    "expression": true,
                                    "async": true
                                }
                            },
                            {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "name": "square"
                                },
                                "right": {
                                    "type": "ArrowFunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "name": "y"
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "BinaryExpression",
                                                    "operator": "*",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": true
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse async arrow trailing comma', () => {
        expect(parseScript(`async (x,y,) => x`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "Identifier",
                            "name": "y"
                        }
                    ],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse async arrow parenthesized concise', () => {
        expect(parseScript(`async (y) => y`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "y"
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "y"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow parentheized yield', () => {
        expect(parseScript(`async (yield) => 1;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "yield"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 1
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow rest', () => {
        expect(parseScript(`async (x, ...y) => x`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        }
                    ],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow parenthesized concise await', () => {
        expect(parseScript(`async (a) => await a`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "AwaitExpression",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow parenthesized await', () => {
        expect(parseScript(`async (a) => { await a }`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AwaitExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }
                        }]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse future reserved keyword in un-parenthesized arrow in sloppy modedd', () => {
        expect(parseScript('async package => function () { "use strict" }', {
            ranges: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 45,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 45,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 45,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 6,
                      "end": 13,
                      "name": "package"
                    }
                  ],
                  "body": {
                    "type": "FunctionExpression",
                    "start": 17,
                    "end": 45,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 29,
                      "end": 45,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 31,
                          "end": 43,
                          "expression": {
                            "type": "Literal",
                            "start": 31,
                            "end": 43,
                            "value": "use strict",
                            "raw": "\"use strict\""
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parens multi', () => {
        expect(parseScript('async (a, b) => a;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "name": "b"
                        }
                    ],
                    "body": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow parens', () => {
        expect(parseScript('(async function foo(a) { await a });', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AwaitExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            }
                        }]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arrow function', () => {
        expect(parseScript('async a => a;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "a"
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async yield', () => {
        expect(parseScript('async yield => 1;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "Identifier",
                        "name": "yield"
                    }],
                    "body": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    },
                    "generator": false,
                    "expression": true,
                    "async": true
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse a non async function expr as arrow body', () => {
        expect(parseScript('async arrow => function() {}', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 28,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 28,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 6,
                      "end": 11,
                      "name": "arrow"
                    }
                  ],
                  "body": {
                    "type": "FunctionExpression",
                    "start": 15,
                    "end": 28,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 26,
                      "end": 28,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse future reserved keyword in un-parenthesized arrow in sloppy mode', () => {
        expect(parseScript('async interface => abc', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 22,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 6,
                      "end": 15,
                      "name": "interface"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 22,
                    "name": "abc"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse identifier after async arrow', () => {
        expect(parseScript(`async aa => a
        foo`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 13,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 6,
                      "end": 8,
                      "name": "aa"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "a"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 22,
                "end": 25,
                "expression": {
                  "type": "Identifier",
                  "start": 22,
                  "end": 25,
                  "name": "foo"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse identifier after async arrow', () => {
        expect(parseScript(`async faen => () => function await() {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 39,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 39,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 6,
                      "end": 10,
                      "name": "faen"
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 14,
                    "end": 39,
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "FunctionExpression",
                      "start": 20,
                      "end": 39,
                      "id": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 34,
                        "name": "await"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 37,
                        "end": 39,
                        "body": []
                      }
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse a parameter that occurs later in the parameter list', () => {
        expect(parseScript(`f = async (x = y, y) => {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 26,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 26,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "f"
                  },
                  "right": {
                    "type": "ArrowFunctionExpression",
                    "start": 4,
                    "end": 26,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 11,
                        "end": 16,
                        "left": {
                          "type": "Identifier",
                          "start": 11,
                          "end": 12,
                          "name": "x"
                        },
                        "right": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 16,
                          "name": "y"
                        }
                      },
                      {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "name": "y"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 24,
                      "end": 26,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    







    it('should parse async as call expression', () => {
        expect(parseScript(`async () => {}
        async a => {}
        async a => {}
        async () => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 81,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 12,
                    "end": 14,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 36,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 36,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 29,
                      "end": 30,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 36,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 45,
                "end": 58,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 45,
                  "end": 58,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 51,
                      "end": 52,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 56,
                    "end": 58,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 67,
                "end": 81,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 67,
                  "end": 81,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 79,
                    "end": 81,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse async as call expression', () => {
        expect(parseScript(`async () => {}
        async a => {}
         a => {}
        async () => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 76,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 12,
                    "end": 14,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 36,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 36,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 29,
                      "end": 30,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 36,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 46,
                "end": 53,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 46,
                  "end": 53,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 46,
                      "end": 47,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 51,
                    "end": 53,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 62,
                "end": 76,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 62,
                  "end": 76,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 74,
                    "end": 76,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression', () => {
        expect(parseScript(`async () => {}
        async a => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 12,
                    "end": 14,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 36,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 36,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 29,
                      "end": 30,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 36,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse async as call expression', () => {
        expect(parseScript(`async () => {}
        a => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 12,
                    "end": 14,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 30,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 30,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 23,
                      "end": 24,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 30,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse async as call expression', () => {
        expect(parseScript(`a => {}
        async () => {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 7,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 5,
                    "end": 7,
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 16,
                "end": 30,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 16,
                  "end": 30,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 30,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression', () => {
        expect(parseScript(`async ()`, {
            ranges: true,
            raw: true
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
                  "type": "CallExpression",
                  "start": 0,
                  "end": 8,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with one arg', () => {
        expect(parseScript(`async (a)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 9,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "name": "a"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with multiple args', () => {
        expect(parseScript(`async (a, b, c)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 15,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "name": "b"
                    },
                    {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "c"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse async as call expression with arrow arg', () => {
        expect(parseScript(`async (() => 42)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 16,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 7,
                      "end": 15,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "Literal",
                        "start": 13,
                        "end": 15,
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with identifier and arrow arg', () => {
        expect(parseScript(`a, async (() => 42)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 19,
                  "expressions": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    },
                    {
                      "type": "CallExpression",
                      "start": 3,
                      "end": 19,
                      "callee": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 8,
                        "name": "async"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 18,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "Literal",
                            "start": 16,
                            "end": 18,
                            "value": 42,
                            "raw": "42"
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with arrow arg and identifier', () => {
        expect(parseScript(`a, async (() => 42, a)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "expression": {
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 22,
                  "expressions": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    },
                    {
                      "type": "CallExpression",
                      "start": 3,
                      "end": 22,
                      "callee": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 8,
                        "name": "async"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 18,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "Literal",
                            "start": 16,
                            "end": 18,
                            "value": 42,
                            "raw": "42"
                          }
                        },
                        {
                          "type": "Identifier",
                          "start": 20,
                          "end": 21,
                          "name": "a"
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with async arrow arg', () => {
        expect(parseScript(`a, async (async () => 42)`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "expression": {
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 25,
                  "expressions": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    },
                    {
                      "type": "CallExpression",
                      "start": 3,
                      "end": 25,
                      "callee": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 8,
                        "name": "async"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 24,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "Literal",
                            "start": 22,
                            "end": 24,
                            "value": 42,
                            "raw": "42"
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async as call expression with async arrow arg + arrow arg', () => {
        expect(parseScript(`a, async (async () => 42, () => 42)`, {
            ranges: true,
            raw: true
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
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 35,
                  "expressions": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "a"
                    },
                    {
                      "type": "CallExpression",
                      "start": 3,
                      "end": 35,
                      "callee": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 8,
                        "name": "async"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 24,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "Literal",
                            "start": 22,
                            "end": 24,
                            "value": 42,
                            "raw": "42"
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 26,
                          "end": 34,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "Literal",
                            "start": 32,
                            "end": 34,
                            "value": 42,
                            "raw": "42"
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse async arrow underneath each other', () => {
        expect(parseScript(`async () => 42
        async () => 42`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 14,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "Literal",
                    "start": 12,
                    "end": 14,
                    "value": 42,
                    "raw": "42"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 37,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 37,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "Literal",
                    "start": 35,
                    "end": 37,
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

        it('should parse async arrow no arg', () => {
            expect(parseScript(`async () => 42`, {
                ranges: true,
                raw: true
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
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 14,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [],
                      "body": {
                        "type": "Literal",
                        "start": 12,
                        "end": 14,
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
    
        it('should parse async arrow multiple args', () => {
            expect(parseScript(`async (x, y) => { x * y }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 25,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 25,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 25,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "name": "x"
                        },
                        {
                          "type": "Identifier",
                          "start": 10,
                          "end": 11,
                          "name": "y"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 16,
                        "end": 25,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 18,
                            "end": 23,
                            "expression": {
                              "type": "BinaryExpression",
                              "start": 18,
                              "end": 23,
                              "left": {
                                "type": "Identifier",
                                "start": 18,
                                "end": 19,
                                "name": "x"
                              },
                              "operator": "*",
                              "right": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "y"
                              }
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
    
        it('should parse async arrow one arg', () => {
            expect(parseScript(`async x => { x * x }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 20,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 20,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "x"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 20,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 18,
                            "expression": {
                              "type": "BinaryExpression",
                              "start": 13,
                              "end": 18,
                              "left": {
                                "type": "Identifier",
                                "start": 13,
                                "end": 14,
                                "name": "x"
                              },
                              "operator": "*",
                              "right": {
                                "type": "Identifier",
                                "start": 17,
                                "end": 18,
                                "name": "x"
                              }
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
    
        it('should parse async arrow parenthesized', () => {
            expect(parseScript(`async (x) => { x * x }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 22,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 22,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "name": "x"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 22,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 15,
                            "end": 20,
                            "expression": {
                              "type": "BinaryExpression",
                              "start": 15,
                              "end": 20,
                              "left": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "x"
                              },
                              "operator": "*",
                              "right": {
                                "type": "Identifier",
                                "start": 19,
                                "end": 20,
                                "name": "x"
                              }
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
    
        it('should parse async arrow parenthesized yield', () => {
            expect(parseScript(`async (yield) => 1;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 19,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 18,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 12,
                          "name": "yield"
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 17,
                        "end": 18,
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse async arrow yield', () => {
            expect(parseScript(`async yield => 0;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 17,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 16,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 6,
                          "end": 11,
                          "name": "yield"
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 15,
                        "end": 16,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        it('should eport async arrow', () => {
            expect(parseModule(`export const square = async x => x * x`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 38,
                "body": [
                  {
                    "type": "ExportNamedDeclaration",
                    "start": 0,
                    "end": 38,
                    "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 38,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 13,
                          "end": 38,
                          "id": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 19,
                            "name": "square"
                          },
                          "init": {
                            "type": "ArrowFunctionExpression",
                            "start": 22,
                            "end": 38,
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": true,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 28,
                                "end": 29,
                                "name": "x"
                              }
                            ],
                            "body": {
                              "type": "BinaryExpression",
                              "start": 33,
                              "end": 38,
                              "left": {
                                "type": "Identifier",
                                "start": 33,
                                "end": 34,
                                "name": "x"
                              },
                              "operator": "*",
                              "right": {
                                "type": "Identifier",
                                "start": 37,
                                "end": 38,
                                "name": "x"
                              }
                            }
                          }
                        }
                      ],
                      "kind": "const"
                    },
                    "specifiers": [],
                    "source": null
                  }
                ],
                "sourceType": "module"
              });
        });
    
        it('should export default async arrow', () => {
            expect(parseModule(`export default async x => x * x`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 31,
                "body": [
                  {
                    "type": "ExportDefaultDeclaration",
                    "start": 0,
                    "end": 31,
                    "declaration": {
                      "type": "ArrowFunctionExpression",
                      "start": 15,
                      "end": 31,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 21,
                          "end": 22,
                          "name": "x"
                        }
                      ],
                      "body": {
                        "type": "BinaryExpression",
                        "start": 26,
                        "end": 31,
                        "left": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "name": "x"
                        },
                        "operator": "*",
                        "right": {
                          "type": "Identifier",
                          "start": 30,
                          "end": 31,
                          "name": "x"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "module"
              });
        });
    
        it('should parse arrow multi args concise await', () => {
            expect(parseScript(`async (a, b) => await a`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 23,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 23,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 23,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "name": "a"
                        },
                        {
                          "type": "Identifier",
                          "start": 10,
                          "end": 11,
                          "name": "b"
                        }
                      ],
                      "body": {
                        "type": "AwaitExpression",
                        "start": 16,
                        "end": 23,
                        "argument": {
                          "type": "Identifier",
                          "start": 22,
                          "end": 23,
                          "name": "a"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse async arrow one arg await', () => {
            expect(parseScript(`async a => { await a }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 22,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 22,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 22,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 20,
                            "expression": {
                              "type": "AwaitExpression",
                              "start": 13,
                              "end": 20,
                              "argument": {
                                "type": "Identifier",
                                "start": 19,
                                "end": 20,
                                "name": "a"
                              }
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

        it('should parse one arg concise await', () => {
            expect(parseScript(`async a => await a`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 18,
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 18,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "AwaitExpression",
                        "start": 11,
                        "end": 18,
                        "argument": {
                          "type": "Identifier",
                          "start": 17,
                          "end": 18,
                          "name": "a"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });


    it('should parse two async arrow function underneath each other', () => {
      expect(parseScript(`async () => { 42; };
      async () => { 42; }`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 46,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 20,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 19,
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 12,
                "end": 19,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 14,
                    "end": 17,
                    "expression": {
                      "type": "Literal",
                      "start": 14,
                      "end": 16,
                      "value": 42,
                      "raw": "42"
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 27,
            "end": 46,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 27,
              "end": 46,
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 39,
                "end": 46,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 41,
                    "end": 44,
                    "expression": {
                      "type": "Literal",
                      "start": 41,
                      "end": 43,
                      "value": 42,
                      "raw": "42"
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

  it('should parse two un-parenthesized arrow functions underneath each other', () => {
      expect(parseScript(`async a => a;
      async a => a;`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 33,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 13,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 12,
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "a"
                }
              ],
              "body": {
                "type": "Identifier",
                "start": 11,
                "end": 12,
                "name": "a"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 20,
            "end": 33,
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 20,
              "end": 32,
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 26,
                  "end": 27,
                  "name": "a"
                }
              ],
              "body": {
                "type": "Identifier",
                "start": 31,
                "end": 32,
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
  });
  

  it('should parse arrow function underneath non-async arrow function', () => {
    expect(parseScript(`async () => { 42; };
     () => { 42; }`, {
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
          "end": 20,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 19,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 12,
              "end": 19,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 17,
                  "expression": {
                    "type": "Literal",
                    "start": 14,
                    "end": 16,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 26,
          "end": 39,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 26,
            "end": 39,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 32,
              "end": 39,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 34,
                  "end": 37,
                  "expression": {
                    "type": "Literal",
                    "start": 34,
                    "end": 36,
                    "value": 42,
                    "raw": "42"
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

  it('should parse async and non-async arrow underneath async arrow function', () => {
    expect(parseScript(`async () => { 42; };
     () => { 42; }
     async () => { 42; };`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 65,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 20,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 19,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 12,
              "end": 19,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 17,
                  "expression": {
                    "type": "Literal",
                    "start": 14,
                    "end": 16,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 26,
          "end": 39,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 26,
            "end": 39,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 32,
              "end": 39,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 34,
                  "end": 37,
                  "expression": {
                    "type": "Literal",
                    "start": 34,
                    "end": 36,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 45,
          "end": 65,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 45,
            "end": 64,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 57,
              "end": 64,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 59,
                  "end": 62,
                  "expression": {
                    "type": "Literal",
                    "start": 59,
                    "end": 61,
                    "value": 42,
                    "raw": "42"
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

  it('should parse async unparenthesized arrow function underneath async parentheiszed arrow', () => {
    expect(parseScript(`async () => { 42; };
    a => { 42; }`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 37,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 20,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 19,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 12,
              "end": 19,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 14,
                  "end": 17,
                  "expression": {
                    "type": "Literal",
                    "start": 14,
                    "end": 16,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 25,
          "end": 37,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 25,
            "end": 37,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 25,
                "end": 26,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 30,
              "end": 37,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 32,
                  "end": 35,
                  "expression": {
                    "type": "Literal",
                    "start": 32,
                    "end": 34,
                    "value": 42,
                    "raw": "42"
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

  it('should parse async unparenthesized arrow function underneath async unparenthesized arrow', () => {
    expect(parseScript(`async a => foo;
    async a => { 42; }`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 38,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 15,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 14,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 11,
              "end": 14,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 20,
          "end": 38,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 20,
            "end": 38,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 26,
                "end": 27,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 31,
              "end": 38,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 33,
                  "end": 36,
                  "expression": {
                    "type": "Literal",
                    "start": 33,
                    "end": 35,
                    "value": 42,
                    "raw": "42"
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

  it('should parse mix of async unparenthesized arrow and parenthezied async arrows underneath each other', () => {
    expect(parseScript(`async a => foo;
    async a => { 42; }
    async a => foo;
    async a => { 42; }
    async a => { 42; }
    async a => foo;
    async a => { 42; }
    async a => { 42; }`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 170,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 15,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 14,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 11,
              "end": 14,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 20,
          "end": 38,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 20,
            "end": 38,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 26,
                "end": 27,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 31,
              "end": 38,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 33,
                  "end": 36,
                  "expression": {
                    "type": "Literal",
                    "start": 33,
                    "end": 35,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 43,
          "end": 58,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 43,
            "end": 57,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 49,
                "end": 50,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 54,
              "end": 57,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 63,
          "end": 81,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 63,
            "end": 81,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 69,
                "end": 70,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 74,
              "end": 81,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 76,
                  "end": 79,
                  "expression": {
                    "type": "Literal",
                    "start": 76,
                    "end": 78,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 86,
          "end": 104,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 86,
            "end": 104,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 92,
                "end": 93,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 97,
              "end": 104,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 99,
                  "end": 102,
                  "expression": {
                    "type": "Literal",
                    "start": 99,
                    "end": 101,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 109,
          "end": 124,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 109,
            "end": 123,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 115,
                "end": 116,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 120,
              "end": 123,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 129,
          "end": 147,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 129,
            "end": 147,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 135,
                "end": 136,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 140,
              "end": 147,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 142,
                  "end": 145,
                  "expression": {
                    "type": "Literal",
                    "start": 142,
                    "end": 144,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 152,
          "end": 170,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 152,
            "end": 170,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 158,
                "end": 159,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 163,
              "end": 170,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 165,
                  "end": 168,
                  "expression": {
                    "type": "Literal",
                    "start": 165,
                    "end": 167,
                    "value": 42,
                    "raw": "42"
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

  it('should parse mix of async unparenthesized arrow and parenthezied arrows underneath each other', () => {
    expect(parseScript(`async a => foo;
    async a => { 42; }
     a => foo;
    async a => { 42; }
    async a => { 42; }
    async a => foo;
     a => { 42; }
    async a => { 42; }`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 160,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 15,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 14,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 11,
              "end": 14,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 20,
          "end": 38,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 20,
            "end": 38,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 26,
                "end": 27,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 31,
              "end": 38,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 33,
                  "end": 36,
                  "expression": {
                    "type": "Literal",
                    "start": 33,
                    "end": 35,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 44,
          "end": 53,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 44,
            "end": 52,
            "id": null,
            "generator": false,
            "expression": true,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 44,
                "end": 45,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 49,
              "end": 52,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 58,
          "end": 76,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 58,
            "end": 76,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 64,
                "end": 65,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 69,
              "end": 76,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 71,
                  "end": 74,
                  "expression": {
                    "type": "Literal",
                    "start": 71,
                    "end": 73,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 81,
          "end": 99,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 81,
            "end": 99,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 87,
                "end": 88,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 92,
              "end": 99,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 94,
                  "end": 97,
                  "expression": {
                    "type": "Literal",
                    "start": 94,
                    "end": 96,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 104,
          "end": 119,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 104,
            "end": 118,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 110,
                "end": 111,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 115,
              "end": 118,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 125,
          "end": 137,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 125,
            "end": 137,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 125,
                "end": 126,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 130,
              "end": 137,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 132,
                  "end": 135,
                  "expression": {
                    "type": "Literal",
                    "start": 132,
                    "end": 134,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 142,
          "end": 160,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 142,
            "end": 160,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 148,
                "end": 149,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 153,
              "end": 160,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 155,
                  "end": 158,
                  "expression": {
                    "type": "Literal",
                    "start": 155,
                    "end": 157,
                    "value": 42,
                    "raw": "42"
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

  it('should parse mix of async unparenthesized arrow and parenthezied arrows underneath each other', () => {
    expect(parseScript(`async a => foo;
    async () => { 42; }
     a => foo;
    async a => { 42; }
    async () => { 42; }
    async a => foo;
     a => { 42; }
     a => { 42; }
    async () => { 42; }`, {
        ranges: true,
        raw: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 181,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 15,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 0,
            "end": 14,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 11,
              "end": 14,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 20,
          "end": 39,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 20,
            "end": 39,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 32,
              "end": 39,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 34,
                  "end": 37,
                  "expression": {
                    "type": "Literal",
                    "start": 34,
                    "end": 36,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 45,
          "end": 54,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 45,
            "end": 53,
            "id": null,
            "generator": false,
            "expression": true,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 45,
                "end": 46,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 50,
              "end": 53,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 59,
          "end": 77,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 59,
            "end": 77,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 65,
                "end": 66,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 70,
              "end": 77,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 72,
                  "end": 75,
                  "expression": {
                    "type": "Literal",
                    "start": 72,
                    "end": 74,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 82,
          "end": 101,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 82,
            "end": 101,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 94,
              "end": 101,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 96,
                  "end": 99,
                  "expression": {
                    "type": "Literal",
                    "start": 96,
                    "end": 98,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 106,
          "end": 121,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 106,
            "end": 120,
            "id": null,
            "generator": false,
            "expression": true,
            "async": true,
            "params": [
              {
                "type": "Identifier",
                "start": 112,
                "end": 113,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 117,
              "end": 120,
              "name": "foo"
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 127,
          "end": 139,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 127,
            "end": 139,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 127,
                "end": 128,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 132,
              "end": 139,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 134,
                  "end": 137,
                  "expression": {
                    "type": "Literal",
                    "start": 134,
                    "end": 136,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 145,
          "end": 157,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 145,
            "end": 157,
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 145,
                "end": 146,
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 150,
              "end": 157,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 152,
                  "end": 155,
                  "expression": {
                    "type": "Literal",
                    "start": 152,
                    "end": 154,
                    "value": 42,
                    "raw": "42"
                  }
                }
              ]
            }
          }
        },
        {
          "type": "ExpressionStatement",
          "start": 162,
          "end": 181,
          "expression": {
            "type": "ArrowFunctionExpression",
            "start": 162,
            "end": 181,
            "id": null,
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 174,
              "end": 181,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 176,
                  "end": 179,
                  "expression": {
                    "type": "Literal",
                    "start": 176,
                    "end": 178,
                    "value": 42,
                    "raw": "42"
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
    });