import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Const', () => {

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript('const x, y = 1;');
        }).to.throw();
    });

    it('should fail on const declarations without initialiser', () => {
        expect(() => {
            parseScript('const x;');
        }).to.throw();
    });

    it('should fail on |const let| split across two lines', () => {
        expect(() => {
            parseScript(`const
            let = "irrelevant initializer";`);
        }).to.throw();
    });

    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('do const x = 1; while (false)');
        }).to.throw();
    });

    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('for (;false;) const x = 1;');
        }).to.throw();
    });

    it('should fail on onst declarations with initialisers in statement positions - if statement', () => {
        expect(() => {
            parseScript('if (true) {} else const x = 1;');
        }).to.throw();
    });

    it('should fail on onst declarations with initialisers in statement positions - label statement', () => {
        expect(() => {
            parseScript('label: const x = 1;');
        }).to.throw();
    });

    it('should fail on onst declarations with initialisers in statement positions - while statement', () => {
        expect(() => {
            parseScript('while (false) const x;');
        }).to.throw();
    });

    it('should parse rest element containing an elision', () => {
        expect(parseScript('const [...[,]] = g();', {
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
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 6,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "id": {
                    "type": "ArrayPattern",
                    "start": 6,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "elements": [
                      {
                        "type": "RestElement",
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
                        "argument": {
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
                            null
                          ]
                        }
                      }
                    ]
                  },
                  "init": {
                    "type": "CallExpression",
                    "start": 17,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "callee": {
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
                      "name": "g"
                    },
                    "arguments": []
                  }
                }
              ],
              "kind": "const"
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse rest element containing a rest element', () => {
        expect(parseScript('const [...[...x]] = [1, 2, 3];', {
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
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 6,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "id": {
                    "type": "ArrayPattern",
                    "start": 6,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "elements": [
                      {
                        "type": "RestElement",
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
                        "argument": {
                          "type": "ArrayPattern",
                          "start": 10,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "elements": [
                            {
                              "type": "RestElement",
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
                              "argument": {
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
                              }
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "init": {
                    "type": "ArrayExpression",
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
                    "elements": [
                      {
                        "type": "Literal",
                        "start": 21,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      },
                      {
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
                        "value": 2,
                        "raw": "2"
                      },
                      {
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
                        "value": 3,
                        "raw": "3"
                      }
                    ]
                  }
                }
              ],
              "kind": "const"
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse rest element containing an object binding pattern', () => {
        expect(parseScript('const [...{ length }] = [1, 2, 3];', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ArrayExpression",
                                "elements": [
                                    {
                                        "type": "Literal",
                                        "value": 1,
                                        "start": 25,
                                        "end": 26,
                                        "raw": "1"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2,
                                        "start": 28,
                                        "end": 29,
                                        "raw": "2"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3,
                                        "start": 31,
                                        "end": 32,
                                        "raw": "3"
                                    }
                                ],
                                "start": 24,
                                "end": 33
                            },
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "kind": "init",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "length",
                                                        "start": 12,
                                                        "end": 18
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "length",
                                                        "start": 12,
                                                        "end": 18
                                                    },
                                                    "method": false,
                                                    "shorthand": true,
                                                    "start": 12,
                                                    "end": 18
                                                }
                                            ],
                                            "start": 10,
                                            "end": 20
                                        },
                                        "start": 7,
                                        "end": 20
                                    }
                                ],
                                "start": 6,
                                "end": 21
                            },
                            "start": 6,
                            "end": 33
                        }
                    ],
                    "kind": "const",
                    "start": 0,
                    "end": 34
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 34
        });
    });

    it('should parse lone rest element', () => {
        expect(parseScript('const {} = null;', {
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
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
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
                  "id": {
                    "type": "ObjectPattern",
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
                    "properties": []
                  },
                  "init": {
                    "type": "Literal",
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
                    "value": null,
                    "raw": "null"
                  }
                }
              ],
              "kind": "const"
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse single name binding assigns `name` to arrow functions', () => {
        expect(parseScript('const { arrow = () => {} } = {};', {
            ranges: true,
            raw: true,
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
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 6,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "id": {
                    "type": "ObjectPattern",
                    "start": 6,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 8,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
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
                          "name": "arrow"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 8,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "left": {
                            "type": "Identifier",
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
                            "name": "arrow"
                          },
                          "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 16,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 22,
                              "end": 24,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 22
                                },
                                "end": {
                                  "line": 1,
                                  "column": 24
                                }
                              },
                              "body": []
                            }
                          }
                        }
                      }
                    ]
                  },
                  "init": {
                    "type": "ObjectExpression",
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
                    "properties": []
                  }
                }
              ],
              "kind": "const"
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse object binding pattern with "nested" array binding pattern not using initializer (`const` statement)', () => {
        expect(parseScript('const { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };', {
            ranges: true,
            raw: true,
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 61,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 61,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 60,
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 32,
                            "left": {
                              "type": "ArrayPattern",
                              "start": 11,
                              "end": 20,
                              "elements": [
                                {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 13,
                                  "name": "x"
                                },
                                {
                                  "type": "Identifier",
                                  "start": 15,
                                  "end": 16,
                                  "name": "y"
                                },
                                {
                                  "type": "Identifier",
                                  "start": 18,
                                  "end": 19,
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
                              "start": 23,
                              "end": 32,
                              "elements": [
                                {
                                  "type": "Literal",
                                  "start": 24,
                                  "end": 25,
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
                                  "type": "Literal",
                                  "start": 27,
                                  "end": 28,
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
                                  "start": 30,
                                  "end": 31,
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 60,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 58,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 39,
                            "end": 40,
                            "name": "w"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 42,
                            "end": 58,
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 43,
                                "end": 44,
                                "value": 7,
                                "raw": "7"
                              },
                              {
                                "type": "Identifier",
                                "start": 46,
                                "end": 55,
                                "name": "undefined"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse when getter is called when obj is being deconstructed to a rest Object', () => {
        expect(parseScript('const {...x} = { get v() { count++; return 2; } };', {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "name": "v",
                                            "start": 21,
                                            "end": 22
                                        },
                                        "kind": "get",
                                        "method": false,
                                        "shorthand": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "UpdateExpression",
                                                            "argument": {
                                                                "type": "Identifier",
                                                                "name": "count",
                                                                "start": 27,
                                                                "end": 32
                                                            },
                                                            "operator": "++",
                                                            "prefix": false,
                                                            "start": 27,
                                                            "end": 34
                                                        },
                                                        "start": 27,
                                                        "end": 35
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Literal",
                                                            "value": 2,
                                                            "start": 43,
                                                            "end": 44,
                                                            "raw": "2"
                                                        },
                                                        "start": 36,
                                                        "end": 45
                                                    }
                                                ],
                                                "start": 25,
                                                "end": 47
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 22,
                                            "end": 47
                                        },
                                        "start": 17,
                                        "end": 47
                                    }
                                ],
                                "start": 15,
                                "end": 49
                            },
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 10,
                                            "end": 11
                                        },
                                        "start": 7,
                                        "end": 11
                                    }
                                ],
                                "start": 6,
                                "end": 12
                            },
                            "start": 6,
                            "end": 49
                        }
                    ],
                    "kind": "const",
                    "start": 0,
                    "end": 50
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 50
        });
    });

    it('should parse assignment of function `name` attribute (ArrowFunction)', () => {
        expect(parseScript('const arrow = () => {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 23,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 22,
                    "id": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 11,
                      "name": "arrow"
                    },
                    "init": {
                      "type": "ArrowFunctionExpression",
                      "start": 14,
                      "end": 22,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 20,
                        "end": 22,
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });
});