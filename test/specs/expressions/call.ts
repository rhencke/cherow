import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - Call', () => {

        it('should fail on "f(..a)"', () => {
            expect(() => {
                parseScript('f(..a')
            }).to.throw()
        });

        it('should fail on "f(....a)"', () => {
            expect(() => {
                parseScript('f(....a)')
            }).to.throw()
        });

        it('should fail on "f(... ... a)"', () => {
            expect(() => {
                parseScript('f(... ... a)')
            }).to.throw()
        });

        it('should parse spread multi literal"', () => {
            expect(parseScript('(function() {}(5, ...[6, 7, 8], 9));', {
                ranges: true,
                next: true,
                raw: true,
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
                  "type": "ExpressionStatement",
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
                  "expression": {
                    "type": "CallExpression",
                    "start": 1,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "callee": {
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 12,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "body": []
                      }
                    },
                    "arguments": [
                      {
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
                        "value": 5,
                        "raw": "5"
                      },
                      {
                        "type": "SpreadElement",
                        "start": 18,
                        "end": 30,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 30
                          }
                        },
                        "argument": {
                          "type": "ArrayExpression",
                          "start": 21,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 21
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "elements": [
                            {
                              "type": "Literal",
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
                              "value": 6,
                              "raw": "6"
                            },
                            {
                              "type": "Literal",
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
                              "value": 7,
                              "raw": "7"
                            },
                            {
                              "type": "Literal",
                              "start": 28,
                              "end": 29,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 28
                                },
                                "end": {
                                  "line": 1,
                                  "column": 29
                                }
                              },
                              "value": 8,
                              "raw": "8"
                            }
                          ]
                        }
                      },
                      {
                        "type": "Literal",
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
                        "value": 9,
                        "raw": "9"
                      }
                    ]
                  }
                }
              ],
              "sourceType": "script"
            });
        });

        it('should parse spread operator applied to assignment expression following other elements', () => {
            expect(parseScript('(function() {}(1, 2, ...target = source));', {
                ranges: true,
                next: true,
                raw: true,
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
                  "type": "ExpressionStatement",
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
                  "expression": {
                    "type": "CallExpression",
                    "start": 1,
                    "end": 40,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 40
                      }
                    },
                    "callee": {
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 12,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "body": []
                      }
                    },
                    "arguments": [
                      {
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
                      },
                      {
                        "type": "Literal",
                        "start": 18,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "value": 2,
                        "raw": "2"
                      },
                      {
                        "type": "SpreadElement",
                        "start": 21,
                        "end": 39,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 39
                          }
                        },
                        "argument": {
                          "type": "AssignmentExpression",
                          "start": 24,
                          "end": 39,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 39
                            }
                          },
                          "operator": "=",
                          "left": {
                            "type": "Identifier",
                            "start": 24,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "name": "target"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 39
                              }
                            },
                            "name": "source"
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
        
        it('should parse spread multi object undefined"', () => {
            expect(parseScript('(function(obj) { }({a: 1, b: 2, ...undefined}));', {
                ranges: true,
                next: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "arguments": [
                                {
                                    "type": "ObjectExpression",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 20,
                                                "end": 21
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "Literal",
                                                "value": 1,
                                                "start": 23,
                                                "end": 24,
                                                "raw": "1"
                                            },
                                            "start": 20,
                                            "end": 24
                                        },
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "b",
                                                "start": 26,
                                                "end": 27
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "Literal",
                                                "value": 2,
                                                "start": 29,
                                                "end": 30,
                                                "raw": "2"
                                            },
                                            "start": 26,
                                            "end": 30
                                        },
                                        {
                                            "type": "SpreadElement",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "undefined",
                                                "start": 35,
                                                "end": 44
                                            },
                                            "start": 32,
                                            "end": 44
                                        }
                                    ],
                                    "start": 19,
                                    "end": 45
                                }
                            ],
                            "callee": {
                                "type": "FunctionExpression",
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "obj",
                                        "start": 10,
                                        "end": 13
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 15,
                                    "end": 18
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 1,
                                "end": 18
                            },
                            "start": 1,
                            "end": 46
                        },
                        "start": 0,
                        "end": 48
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 48
            });
        });

        it('should parse async identifier and call', () => {
            expect(parseScript('async()', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 7,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 7,
                    "expression": {
                      "type": "CallExpression",
                      "start": 0,
                      "end": 7,
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

        it('should parse async identifier and call with one arg', () => {
            expect(parseScript('async (a)', {
                ranges: true
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

        it('should parse async identifier and call expression with async arrow arg', () => {
            expect(parseScript('async (a, async () => {})', {
                ranges: true
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
                      "type": "CallExpression",
                      "start": 0,
                      "end": 25,
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
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 24,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 22,
                            "end": 24,
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

        it('should parse async identifier and call expression with async arrow and non-async arrow as arg', () => {
            expect(parseScript('async (a, async () => {}, () => {})', {
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
                      "type": "CallExpression",
                      "start": 0,
                      "end": 35,
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
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 24,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 22,
                            "end": 24,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 26,
                          "end": 34,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 32,
                            "end": 34,
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

        it('should parse async identifier and call expression with async arrow and non-async arrow as arg', () => {
            expect(parseScript('async (a, async () => {}, foo => bar )', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 38,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 38,
                    "expression": {
                      "type": "CallExpression",
                      "start": 0,
                      "end": 38,
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
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 24,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 22,
                            "end": 24,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 26,
                          "end": 36,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 26,
                              "end": 29,
                              "name": "foo"
                            }
                          ],
                          "body": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 36,
                            "name": "bar"
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse async identifier and call expression with parenthesized and non-parentesized arrows as arg', () => {
            expect(parseScript('async (a, () => {}, async () => {})', {
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
                      "type": "CallExpression",
                      "start": 0,
                      "end": 35,
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
                          "type": "ArrowFunctionExpression",
                          "start": 10,
                          "end": 18,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 16,
                            "end": 18,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 20,
                          "end": 34,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 32,
                            "end": 34,
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

        it('should parse complex call with async and non-async arrows - parenthesized and not parenthesized', () => {
            expect(parseScript('async (foo, async () => {}, () => {}, async () => {}, a => {}, async () => {}, async a => {}, bar)', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 98,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 98,
                    "expression": {
                      "type": "CallExpression",
                      "start": 0,
                      "end": 98,
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
                          "end": 10,
                          "name": "foo"
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 12,
                          "end": 26,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 24,
                            "end": 26,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 28,
                          "end": 36,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 34,
                            "end": 36,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 38,
                          "end": 52,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 50,
                            "end": 52,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 54,
                          "end": 61,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 54,
                              "end": 55,
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 59,
                            "end": 61,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 63,
                          "end": 77,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 75,
                            "end": 77,
                            "body": []
                          }
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 79,
                          "end": 92,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": true,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 85,
                              "end": 86,
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 90,
                            "end": 92,
                            "body": []
                          }
                        },
                        {
                          "type": "Identifier",
                          "start": 94,
                          "end": 97,
                          "name": "bar"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse trailing comma', () => {
            expect(parseScript('foo(...[],);', {
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
                      "type": "CallExpression",
                      "start": 0,
                      "end": 11,
                      "callee": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 3,
                        "name": "foo"
                      },
                      "arguments": [
                        {
                          "type": "SpreadElement",
                          "start": 4,
                          "end": 9,
                          "argument": {
                            "type": "ArrayExpression",
                            "start": 7,
                            "end": 9,
                            "elements": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "a(b,c)"', () => {
            expect(parseScript('a(b,c)', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "arguments": [{
                                "end": 3,
                                "name": "b",
                                "start": 2,
                                "type": "Identifier"
                            },
                            {
                                "end": 5,
                                "name": "c",
                                "start": 4,
                                "type": "Identifier"
                            }
                        ],
                        "callee": {
                            "end": 1,
                            "name": "a",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "end": 6,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 6,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "(    foo  )()"', () => {
            expect(parseScript('(    foo  )()', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 13,
                    "expression": {
                        "arguments": [],
                        "callee": {
                            "end": 8,
                            "name": "foo",
                            "start": 5,
                            "type": "Identifier"
                        },
                        "end": 13,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 13,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "f(...a)"', () => {
            expect(parseScript('f(...a)', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 7,
                    "expression": {
                        "arguments": [{
                            "argument": {
                                "end": 6,
                                "name": "a",
                                "start": 5,
                                "type": "Identifier"
                            },
                            "end": 6,
                            "start": 2,
                            "type": "SpreadElement"
                        }],
                        "callee": {
                            "end": 1,
                            "name": "f",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "end": 7,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 7,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "f(...a, ...b)"', () => {
            expect(parseScript('f(...a, ...b)', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 13,
                    "expression": {
                        "arguments": [{
                                "argument": {
                                    "end": 6,
                                    "name": "a",
                                    "start": 5,
                                    "type": "Identifier"
                                },
                                "end": 6,
                                "start": 2,
                                "type": "SpreadElement"
                            },
                            {
                                "argument": {
                                    "end": 12,
                                    "name": "b",
                                    "start": 11,
                                    "type": "Identifier"
                                },
                                "end": 12,
                                "start": 8,
                                "type": "SpreadElement"
                            }
                        ],
                        "callee": {
                            "end": 1,
                            "name": "f",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "end": 13,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 13,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "f(a, ...b, c)"', () => {
            expect(parseScript('f(a, ...b, c)', {
                ranges: false
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [{
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "c"
                            }
                        ]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "f(...a, b, ...c)"', () => {
            expect(parseScript('f(...a, b, ...c)', {
                ranges: false
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "arguments": [{
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "b"
                            },
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "c"
                                }
                            }
                        ]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "f(.0)"', () => {
            expect(parseScript('f(.0)', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 5,
                    "expression": {
                        "arguments": [{
                            "end": 4,
                            "raw": ".0",
                            "start": 2,
                            "type": "Literal",
                            "value": 0,
                        }],
                        "callee": {
                            "end": 1,
                            "name": "f",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "end": 5,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 5,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    });