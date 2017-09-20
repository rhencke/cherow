import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For of', () => {

  it('should fail on unexpected number"', () => {
    expect(() => {
        parseScript('for (const of 42);');
    }).to.throw();
});
it('should fail on invalid const let', () => {
    expect(() => {
        parseScript('for (const let of y);');
    }).to.throw();
});
it('should fail on invalid var init', () => {
    expect(() => {
        parseScript('for (var x = 1 of y);');
    }).to.throw();
});
it('should fail on invalid strict for of let', () => {
    expect(() => {
        parseScript('"use strict"; for (x of let) {}');
      }).to.throw();
});
it('should fail on invalid lhs init', () => {
    expect(() => {
        parseScript('for (this of that);');
    }).to.throw();
});
it('should fail on invalid for of object pattern', () => {
    expect(() => {
        parseScript('for (var {x} = y of z);');
    }).to.throw();
});
it('should fail on invalid for of array pattern', () => {
    expect(() => {
        parseScript('for (var [p]=q of r);');
    }).to.throw();
});
it('should fail on invalid const init', () => {
    expect(() => {
        parseScript('for (const x = 1 of y);');
    }).to.throw();
});
it('should fail on invalid assign for of', () => {
    expect(() => {
        parseScript('for (x=0 of y);');
    }).to.not.throw();
});
it('should fail on async generator declaration in statement position', () => {
    expect(() => {
        parseScript('for ( ; false; ) async function* g() {}');
    }).to.throw();
});
it('should fail lexical declaration (const) in statement position', () => {
    expect(() => {
        parseScript('for (var x of []) const y = null;');
    }).to.throw();
});
it('should fail lexical declaration (let) in statement position', () => {
    expect(() => {
        parseScript('for (var x of []) let y;');
    }).to.throw();
});
it('should fail function declaration in statement position', () => {
    expect(() => {
        parseScript('for (var x of []) function f() {}');
    }).to.throw();
});
it('should fail generator declaration in statement position', () => {
    expect(() => {
        parseScript('for (var x of []) function* g() {}');
    }).to.throw();
});
it('should fail on labeled statement', () => {
    expect(() => {
        parseScript('for (const x; false; ) label1: label2: function f() {}');
      }).to.not.throw();
});
it('should fail on re-declare variables declared in the head', () => {
    expect(() => {
        parseScript(`for (const x of []) { var x; }`);
    }).to.throw();
});
it('should fail if declaration contain a binding for `let`', () => {
    expect(() => {
        parseScript(`for (const let of []) {}`);
    }).to.throw();
});
it('should fail if Head"s LeftHandSideExpression is not a simple assignment target', () => {
    expect(() => {
        parseScript(`for ((this) of []) {}`);
    }).to.throw();
});
it('should fail if labeled statement is true (Annex B semantic)', () => {
    expect(() => {
        parseScript(`for (const x of []) label1: label2: function f() {}`);
      }).to.not.throw();
});
it('should fail on labelled function statement var', () => {
    expect(() => {
        parseScript(`for (var x of []) label1: label2: function f() {}`);
      }).to.not.throw();
});
it('should fail if use of eval in object pattern in strict pattern', () => {
    expect(() => {
        parseScript(`"use strict"; for ({ eval } of [{}]) ;`);
      }).to.not.throw('');
});

it('should parse "for (var {a} of /b/);"', () => {
  expect(parseScript(`for (var {a} of /b/);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "EmptyStatement",
                "start": 20,
                "end": 21
            },
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": null,
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 10,
                                        "end": 11
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 10,
                                        "end": 11
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 10,
                                    "end": 11
                                }
                            ],
                            "start": 9,
                            "end": 12
                        },
                        "start": 9,
                        "end": 12
                    }
                ],
                "kind": "var",
                "start": 5,
                "end": 12
            },
            "right": {
                "type": "Literal",
                "value": /b/,
                "regex": {
                    "pattern": "b",
                    "flags": ""
                },
                "start": 16,
                "end": 19,
                "raw": "/b/"
            },
            "await": false,
            "start": 0,
            "end": 21
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 21
});
});

it('should parse "for (var a of /b/);"', () => {
  expect(parseScript(`for (var a of /b/);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 19,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 19,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 10,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 10,
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "a"
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "Literal",
          "start": 14,
          "end": 17,
          "value": /b/,
          "raw": "/b/",
          "regex": {
            "pattern": "b",
            "flags": ""
          }
        },
        "body": {
          "type": "EmptyStatement",
          "start": 18,
          "end": 19
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of array pattern let', () => {
        expect(parseScript(`for (let [p, q] of r);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 22,
          "body": [
            {
              "type": "ForOfStatement",
              "start": 0,
              "end": 22,
              "left": {
                "type": "VariableDeclaration",
                "start": 5,
                "end": 15,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 9,
                    "end": 15,
                    "id": {
                      "type": "ArrayPattern",
                      "start": 9,
                      "end": 15,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 10,
                          "end": 11,
                          "name": "p"
                        },
                        {
                          "type": "Identifier",
                          "start": 13,
                          "end": 14,
                          "name": "q"
                        }
                      ]
                    },
                    "init": null
                  }
                ],
                "kind": "let"
              },
              "right": {
                "type": "Identifier",
                "start": 19,
                "end": 20,
                "name": "r"
              },
              "await": false,
              "body": {
                "type": "EmptyStatement",
                "start": 21,
                "end": 22
              }
            }
          ],
          "sourceType": "script"
        });
    });


    it('should parse for of array pattern var', () => {
      expect(parseScript(`for (var [p, q] of r);`, {
          ranges: true,
          raw: true,
          next: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 22,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 0,
            "end": 22,
            "left": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 15,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 9,
                  "end": 15,
                  "id": {
                    "type": "ArrayPattern",
                    "start": 9,
                    "end": 15,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "name": "p"
                      },
                      {
                        "type": "Identifier",
                        "start": 13,
                        "end": 14,
                        "name": "q"
                      }
                    ]
                  },
                  "init": null
                }
              ],
              "kind": "var"
            },
            "right": {
              "type": "Identifier",
              "start": 19,
              "end": 20,
              "name": "r"
            },
            "await": false,
            "body": {
              "type": "EmptyStatement",
              "start": 21,
              "end": 22
            }
          }
        ],
        "sourceType": "script"
      });
  });

  it('should parse for of array pattern', () => {
    expect(parseScript(`for ([p, q] of r);`, {
        ranges: true,
        raw: true,
        next: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 18,
      "body": [
        {
          "type": "ForOfStatement",
          "start": 0,
          "end": 18,
          "await": false,
          "left": {
            "type": "ArrayPattern",
            "start": 5,
            "end": 11,
            "elements": [
              {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "p"
              },
              {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "q"
              }
            ]
          },
          "right": {
            "type": "Identifier",
            "start": 15,
            "end": 16,
            "name": "r"
          },
          "body": {
            "type": "EmptyStatement",
            "start": 17,
            "end": 18
          }
        }
      ],
      "sourceType": "script"
    });
});

it('should parse for of let', () => {
  expect(parseScript(`for (x of let) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 17,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 17,
        "await": false,
        "left": {
          "type": "Identifier",
          "start": 5,
          "end": 6,
          "name": "x"
        },
        "right": {
          "type": "Identifier",
          "start": 10,
          "end": 13,
          "name": "let"
        },
        "body": {
          "type": "BlockStatement",
          "start": 15,
          "end": 17,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse object pattern var', () => {
  expect(parseScript(`for (var {x, y} of z);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 22,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 22,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 15,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 15,
              "id": {
                "type": "ObjectPattern",
                "start": 9,
                "end": 15,
                "properties": [
                  {
                    "type": "Property",
                    "start": 10,
                    "end": 11,
                    "method": false,
                    "shorthand": true,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "name": "x"
                    },
                    "kind": "init",
                    "value": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "name": "x"
                    }
                  },
                  {
                    "type": "Property",
                    "start": 13,
                    "end": 14,
                    "method": false,
                    "shorthand": true,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "y"
                    },
                    "kind": "init",
                    "value": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "y"
                    }
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "Identifier",
          "start": 19,
          "end": 20,
          "name": "z"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 21,
          "end": 22
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of object pattern', () => {
  expect(parseScript(`for ({x, y} of z);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 18,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 18,
        "await": false,
        "left": {
          "type": "ObjectPattern",
          "start": 5,
          "end": 11,
          "properties": [
            {
              "type": "Property",
              "start": 6,
              "end": 7,
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "x"
              },
              "kind": "init",
              "value": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "x"
              }
            },
            {
              "type": "Property",
              "start": 9,
              "end": 10,
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "y"
              },
              "kind": "init",
              "value": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "y"
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "start": 15,
          "end": 16,
          "name": "z"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 17,
          "end": 18
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of with const', () => {
  expect(parseScript(`for (const y of list);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 22,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 22,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 12,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 11,
              "end": 12,
              "id": {
                "type": "Identifier",
                "start": 11,
                "end": 12,
                "name": "y"
              },
              "init": null
            }
          ],
          "kind": "const"
        },
        "right": {
          "type": "Identifier",
          "start": 16,
          "end": 20,
          "name": "list"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 21,
          "end": 22
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of array pattern let', () => {
  expect(parseScript(`for (let z of list);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 20,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 20,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 10,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 10,
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "z"
              },
              "init": null
            }
          ],
          "kind": "let"
        },
        "right": {
          "type": "Identifier",
          "start": 14,
          "end": 18,
          "name": "list"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 19,
          "end": 20
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of with var', () => {
  expect(parseScript(`for (var x of list);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 20,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 20,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 10,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 10,
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "x"
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "Identifier",
          "start": 14,
          "end": 18,
          "name": "list"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 19,
          "end": 20
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of', () => {
  expect(parseScript(`for (p of q);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 13,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 13,
        "await": false,
        "left": {
          "type": "Identifier",
          "start": 5,
          "end": 6,
          "name": "p"
        },
        "right": {
          "type": "Identifier",
          "start": 10,
          "end": 11,
          "name": "q"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 12,
          "end": 13
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for let of of', () => {
  expect(parseScript(`for (let of of xyz);`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 20,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 20,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 11,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 11,
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 11,
                "name": "of"
              },
              "init": null
            }
          ],
          "kind": "let"
        },
        "right": {
          "type": "Identifier",
          "start": 15,
          "end": 18,
          "name": "xyz"
        },
        "body": {
          "type": "EmptyStatement",
          "start": 19,
          "end": 20
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse yield', () => {
  expect(parseScript(`(function*() {
    for (var x of dataIterator) {
      i++;
      yield;
      j++;
    }
  
    k++;
  })();`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 109,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 109,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 108,
          "callee": {
            "type": "FunctionExpression",
            "start": 1,
            "end": 105,
            "id": null,
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 13,
              "end": 105,
              "body": [
                {
                  "type": "ForOfStatement",
                  "start": 19,
                  "end": 89,
                  "await": false,
                  "left": {
                    "type": "VariableDeclaration",
                    "start": 24,
                    "end": 29,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 28,
                        "end": 29,
                        "id": {
                          "type": "Identifier",
                          "start": 28,
                          "end": 29,
                          "name": "x"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 33,
                    "end": 45,
                    "name": "dataIterator"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 47,
                    "end": 89,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 55,
                        "end": 59,
                        "expression": {
                          "type": "UpdateExpression",
                          "start": 55,
                          "end": 58,
                          "operator": "++",
                          "prefix": false,
                          "argument": {
                            "type": "Identifier",
                            "start": 55,
                            "end": 56,
                            "name": "i"
                          }
                        }
                      },
                      {
                        "type": "ExpressionStatement",
                        "start": 66,
                        "end": 72,
                        "expression": {
                          "type": "YieldExpression",
                          "start": 66,
                          "end": 71,
                          "delegate": false,
                          "argument": null
                        }
                      },
                      {
                        "type": "ExpressionStatement",
                        "start": 79,
                        "end": 83,
                        "expression": {
                          "type": "UpdateExpression",
                          "start": 79,
                          "end": 82,
                          "operator": "++",
                          "prefix": false,
                          "argument": {
                            "type": "Identifier",
                            "start": 79,
                            "end": 80,
                            "name": "j"
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "start": 97,
                  "end": 101,
                  "expression": {
                    "type": "UpdateExpression",
                    "start": 97,
                    "end": 100,
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                      "type": "Identifier",
                      "start": 97,
                      "end": 98,
                      "name": "k"
                    }
                  }
                }
              ]
            }
          },
          "arguments": []
        }
      }
    ],
    "sourceType": "script"
  });
});


it('should parse return', () => {
  expect(parseScript(`var result = (function() {
    for (var x of iterator) {
      i++;
      return 34;
    }
  })();`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 98,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 98,
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 4,
            "end": 97,
            "id": {
              "type": "Identifier",
              "start": 4,
              "end": 10,
              "name": "result"
            },
            "init": {
              "type": "CallExpression",
              "start": 13,
              "end": 97,
              "callee": {
                "type": "FunctionExpression",
                "start": 14,
                "end": 94,
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 94,
                  "body": [
                    {
                      "type": "ForOfStatement",
                      "start": 31,
                      "end": 90,
                      "await": false,
                      "left": {
                        "type": "VariableDeclaration",
                        "start": 36,
                        "end": 41,
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 40,
                            "end": 41,
                            "id": {
                              "type": "Identifier",
                              "start": 40,
                              "end": 41,
                              "name": "x"
                            },
                            "init": null
                          }
                        ],
                        "kind": "var"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 45,
                        "end": 53,
                        "name": "iterator"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 55,
                        "end": 90,
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 63,
                            "end": 67,
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 63,
                              "end": 66,
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 63,
                                "end": 64,
                                "name": "i"
                              }
                            }
                          },
                          {
                            "type": "ReturnStatement",
                            "start": 74,
                            "end": 84,
                            "argument": {
                              "type": "Literal",
                              "start": 81,
                              "end": 83,
                              "value": 34,
                              "raw": "34"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "arguments": []
            }
          }
        ],
        "kind": "var"
      }
    ],
    "sourceType": "script"
  });
});

it('should parse nested', () => {
  expect(parseScript(`for (var x of outerIterable) {
    i++;
    j = 0;
    for (var y of innerIterable) {
      j++;
    }
  }`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 106,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 106,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 10,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 10,
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 10,
                "name": "x"
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "Identifier",
          "start": 14,
          "end": 27,
          "name": "outerIterable"
        },
        "body": {
          "type": "BlockStatement",
          "start": 29,
          "end": 106,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 35,
              "end": 39,
              "expression": {
                "type": "UpdateExpression",
                "start": 35,
                "end": 38,
                "operator": "++",
                "prefix": false,
                "argument": {
                  "type": "Identifier",
                  "start": 35,
                  "end": 36,
                  "name": "i"
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 44,
              "end": 50,
              "expression": {
                "type": "AssignmentExpression",
                "start": 44,
                "end": 49,
                "operator": "=",
                "left": {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "name": "j"
                },
                "right": {
                  "type": "Literal",
                  "start": 48,
                  "end": 49,
                  "value": 0,
                  "raw": "0"
                }
              }
            },
            {
              "type": "ForOfStatement",
              "start": 55,
              "end": 102,
              "await": false,
              "left": {
                "type": "VariableDeclaration",
                "start": 60,
                "end": 65,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 64,
                    "end": 65,
                    "id": {
                      "type": "Identifier",
                      "start": 64,
                      "end": 65,
                      "name": "y"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              "right": {
                "type": "Identifier",
                "start": 69,
                "end": 82,
                "name": "innerIterable"
              },
              "body": {
                "type": "BlockStatement",
                "start": 84,
                "end": 102,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 92,
                    "end": 96,
                    "expression": {
                      "type": "UpdateExpression",
                      "start": 92,
                      "end": 95,
                      "operator": "++",
                      "prefix": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 92,
                        "end": 93,
                        "name": "j"
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

it('should parse object binding pattern with "nested" object binding pattern', () => {
  expect(parseScript(`for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {}`, {
      ranges: false,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ForOfStatement",
            "await": false,
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "w"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                }
                                            ]
                                        },
                                        "right": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 4,
                                                        "raw": "4"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 5,
                                                        "raw": "5"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 6,
                                                        "raw": "6"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                }
                                            ]
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "w"
                                },
                                "computed": false,
                                "value": {
                                    "type": "ObjectExpression",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "undefined"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "z"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Literal",
                                                "value": 7,
                                                "raw": "7"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                ]
            },
            "body": {
                "type": "BlockStatement",
                "body": []
            }
        }
    ],
    "sourceType": "script"
});
});

it('should parse rest element containing an elision ', () => {
  expect(parseScript(`for (var [...[,]] of [g()]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 30,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 30,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 17,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 17,
              "id": {
                "type": "ArrayPattern",
                "start": 9,
                "end": 17,
                "elements": [
                  {
                    "type": "RestElement",
                    "start": 10,
                    "end": 16,
                    "argument": {
                      "type": "ArrayPattern",
                      "start": 13,
                      "end": 16,
                      "elements": [
                        null
                      ]
                    }
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 21,
          "end": 26,
          "elements": [
            {
              "type": "CallExpression",
              "start": 22,
              "end": 25,
              "callee": {
                "type": "Identifier",
                "start": 22,
                "end": 23,
                "name": "g"
              },
              "arguments": []
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 28,
          "end": 30,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse for of array pattern let', () => {
  expect(parseScript(`for (var [[...x] = values] of [[]]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 38,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 38,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 26,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 26,
              "id": {
                "type": "ArrayPattern",
                "start": 9,
                "end": 26,
                "elements": [
                  {
                    "type": "AssignmentPattern",
                    "start": 10,
                    "end": 25,
                    "left": {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 16,
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 11,
                          "end": 15,
                          "argument": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "x"
                          }
                        }
                      ]
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 19,
                      "end": 25,
                      "name": "values"
                    }
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 30,
          "end": 34,
          "elements": [
            {
              "type": "ArrayExpression",
              "start": 31,
              "end": 33,
              "elements": []
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 36,
          "end": 38,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse bindingElement with array binding pattern and initializer', () => {
  expect(parseScript(`for (var [[] = function() { }()] of [[]]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 44,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 44,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 32,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 32,
              "id": {
                "type": "ArrayPattern",
                "start": 9,
                "end": 32,
                "elements": [
                  {
                    "type": "AssignmentPattern",
                    "start": 10,
                    "end": 31,
                    "left": {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 12,
                      "elements": []
                    },
                    "right": {
                      "type": "CallExpression",
                      "start": 15,
                      "end": 31,
                      "callee": {
                        "type": "FunctionExpression",
                        "start": 15,
                        "end": 29,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 26,
                          "end": 29,
                          "body": []
                        }
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "var"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 36,
          "end": 40,
          "elements": [
            {
              "type": "ArrayExpression",
              "start": 37,
              "end": 39,
              "elements": []
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 42,
          "end": 44,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse nested array null', () => {
  expect(parseScript(`for ({ x: [ x ] } of [{ x: null }]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 38,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 38,
        "left": {
          "type": "ObjectPattern",
          "start": 5,
          "end": 17,
          "properties": [
            {
              "type": "Property",
              "start": 7,
              "end": 15,
              "method": false,
              "shorthand": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 7,
                "end": 8,
                "name": "x"
              },
              "value": {
                "type": "ArrayPattern",
                "start": 10,
                "end": 15,
                "elements": [
                  {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "x"
                  }
                ]
              },
              "kind": "init"
            }
          ]
        },
        "right": {
          "type": "ArrayExpression",
          "start": 21,
          "end": 34,
          "elements": [
            {
              "type": "ObjectExpression",
              "start": 22,
              "end": 33,
              "properties": [
                {
                  "type": "Property",
                  "start": 24,
                  "end": 31,
                  "method": false,
                  "shorthand": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 24,
                    "end": 25,
                    "name": "x"
                  },
                  "value": {
                    "type": "Literal",
                    "start": 27,
                    "end": 31,
                    "value": null,
                    "raw": "null"
                  },
                  "kind": "init"
                }
              ]
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 36,
          "end": 38,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse object empty object', () => {
  expect(parseScript(`for ({} of [{}]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 19,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 19,
        "await": false,
        "left": {
          "type": "ObjectPattern",
          "start": 5,
          "end": 7,
          "properties": []
        },
        "right": {
          "type": "ArrayExpression",
          "start": 11,
          "end": 15,
          "elements": [
            {
              "type": "ObjectExpression",
              "start": 12,
              "end": 14,
              "properties": []
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 17,
          "end": 19,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse object empty numeric', () => {
  expect(parseScript(`for ({} of [0]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 18,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 18,
        "left": {
          "type": "ObjectPattern",
          "start": 5,
          "end": 7,
          "properties": []
        },
        "right": {
          "type": "ArrayExpression",
          "start": 11,
          "end": 14,
          "elements": [
            {
              "type": "Literal",
              "start": 12,
              "end": 13,
              "value": 0,
              "raw": "0"
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 16,
          "end": 18,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse object empty boolean', () => {
  expect(parseScript(`for ({} of [false]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 22,
    "body": [
      {
        "type": "ForOfStatement",
        "await": false,
        "start": 0,
        "end": 22,
        "left": {
          "type": "ObjectPattern",
          "start": 5,
          "end": 7,
          "properties": []
        },
        "right": {
          "type": "ArrayExpression",
          "start": 11,
          "end": 18,
          "elements": [
            {
              "type": "Literal",
              "start": 12,
              "end": 17,
              "value": false,
              "raw": "false"
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 20,
          "end": 22,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse binding as specified via property name and identifier', () => {
  expect(parseScript(`for (let { x: y } of [{ x: 23 }]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 36,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 36,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 17,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 17,
              "id": {
                "type": "ObjectPattern",
                "start": 9,
                "end": 17,
                "properties": [
                  {
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
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "let"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 21,
          "end": 32,
          "elements": [
            {
              "type": "ObjectExpression",
              "start": 22,
              "end": 31,
              "properties": [
                {
                  "type": "Property",
                  "start": 24,
                  "end": 29,
                  "method": false,
                  "shorthand": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 24,
                    "end": 25,
                    "name": "x"
                  },
                  "value": {
                    "type": "Literal",
                    "start": 27,
                    "end": 29,
                    "value": 23,
                    "raw": "23"
                  },
                  "kind": "init"
                }
              ]
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 34,
          "end": 36,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});

it('should parse lone rest element', () => {
  expect(parseScript(`for (let [...x] of [values]) {}`, {
      ranges: true,
      raw: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 31,
    "body": [
      {
        "type": "ForOfStatement",
        "start": 0,
        "end": 31,
        "await": false,
        "left": {
          "type": "VariableDeclaration",
          "start": 5,
          "end": 15,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 9,
              "end": 15,
              "id": {
                "type": "ArrayPattern",
                "start": 9,
                "end": 15,
                "elements": [
                  {
                    "type": "RestElement",
                    "start": 10,
                    "end": 14,
                    "argument": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "x"
                    }
                  }
                ]
              },
              "init": null
            }
          ],
          "kind": "let"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 19,
          "end": 27,
          "elements": [
            {
              "type": "Identifier",
              "start": 20,
              "end": 26,
              "name": "values"
            }
          ]
        },
        "body": {
          "type": "BlockStatement",
          "start": 29,
          "end": 31,
          "body": []
        }
      }
    ],
    "sourceType": "script"
  });
});
});