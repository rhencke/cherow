import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - While statement', () => {
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 'hood' break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while '' break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while true break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 0 break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 1 break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while({1}){
                    break ;
                 };`)
                }).to.throw();
        });
    
        it('should fail on Lexical declaration (const) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) const x = null;`)
            }).to.throw();
        });

        it('should fail if Generator declaration in statement position', () => {
            expect(() => {
                parseScript(`while (false) function* g() {}`)
            }).to.throw();
        });

        it('should fail on Lexical declaration (const) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) const x = null;`)
            }).to.throw();
        });
    
        it('should fail on Lexical declaration (let) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });

        it('should throw if execution of "while 1 break" fails', () => {
            expect(() => {
                parseScript(`while 1 break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while 0 break" fails', () => {
            expect(() => {
                parseScript(`while 0 break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while true break" fails', () => {
            expect(() => {
                parseScript(`while true break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while false break" fails', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should throw if execution of while "" break" fails', () => {
            expect(() => {
                parseScript(`while '' break;`)
            }).to.throw();
        });
    
        it('should throw  in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 'hood' break;`)
            }).to.throw();
        });
    
        it('should throw if AsyncFunctionDeclaration is allowed in statement position', () => {
            expect(() => {
                parseScript(`while (false) async function f() {}`)
            }).to.throw();
        });
    
        it('should throw if execution of "while false break" fails', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while 1 break" fails', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it('should throw if Lexical declaration (let) are allowed in statement position (true)', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it('should throw if Lexical declaration (let) are allowed in statement position (false)', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"while (false) function f() {}", () => {
            expect(() => {
                parseScript(`while (false) function f() {}`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) let x;", () => {
            expect(() => {
                parseScript(`with ({}) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) let x;", () => {
            expect(() => {
                parseModule(`with ({}) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) const x = null;", () => {
            expect(() => {
                parseScript(`with ({}) const x = null;`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it('should fail on "while(true) function a(){}"', () => {
            expect(() => {
                parseModule(`while(true) function a(){}`);
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode', () => {
            expect(() => {
                parseModule('while (false) function g() {}');
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode - "if (true) {} else function g() {}"', () => {
            expect(() => {
                parseScript('"use strict";  if (true) {} else function g() {}');
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode - "if (true) {} else function g() {}"', () => {
            expect(() => {
                parseScript('"use strict"; if (true) {} else function g() {}');
            }).to.throw();
        });
    
        it('should parse "while (x < 10) { x++; y--; }"', () => {
            expect(parseScript('while (x < 10) { x++; y--; }', {
                ranges: true,
                raw: true,
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
                    "type": "WhileStatement",
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
                    "test": {
                      "type": "BinaryExpression",
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
                      "left": {
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
                        "name": "x"
                      },
                      "operator": "<",
                      "right": {
                        "type": "Literal",
                        "start": 11,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "value": 10,
                        "raw": "10"
                      }
                    },
                    "body": {
                      "type": "BlockStatement",
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
                      "body": [
                        {
                          "type": "ExpressionStatement",
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
                          "expression": {
                            "type": "UpdateExpression",
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
                            "operator": "++",
                            "prefix": false,
                            "argument": {
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
                              "name": "x"
                            }
                          }
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 22,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
                            },
                            "end": {
                              "line": 1,
                              "column": 26
                            }
                          },
                          "expression": {
                            "type": "UpdateExpression",
                            "start": 22,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "operator": "--",
                            "prefix": false,
                            "argument": {
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
                              "name": "y"
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
   
        it('should parse FunctionExpression within a "while" Expression', () => {
            expect(parseScript(`while(1===1) {
                if(__in__do__before__break)break;
                var __in__do__before__break="can't";
                while (1) {
                    var __in__do__IN__before__break="get";
                    break;
                    var __in__do__IN__after__break="no";
                } ;
                var __in__do__after__break="Satisfaction";
            } ;`, {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 383,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 10,
                    "column": 15
                  }
                },
                "body": [
                  {
                    "type": "WhileStatement",
                    "start": 0,
                    "end": 381,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 10,
                        "column": 13
                      }
                    },
                    "test": {
                      "type": "BinaryExpression",
                      "start": 6,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "left": {
                        "type": "Literal",
                        "start": 6,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      },
                      "operator": "===",
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
                        "value": 1,
                        "raw": "1"
                      }
                    },
                    "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 381,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 10,
                          "column": 13
                        }
                      },
                      "body": [
                        {
                          "type": "IfStatement",
                          "start": 31,
                          "end": 64,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 16
                            },
                            "end": {
                              "line": 2,
                              "column": 49
                            }
                          },
                          "test": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 57,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 19
                              },
                              "end": {
                                "line": 2,
                                "column": 42
                              }
                            },
                            "name": "__in__do__before__break"
                          },
                          "consequent": {
                            "type": "BreakStatement",
                            "start": 58,
                            "end": 64,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 43
                              },
                              "end": {
                                "line": 2,
                                "column": 49
                              }
                            },
                            "label": null
                          },
                          "alternate": null
                        },
                        {
                          "type": "VariableDeclaration",
                          "start": 81,
                          "end": 117,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 16
                            },
                            "end": {
                              "line": 3,
                              "column": 52
                            }
                          },
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 85,
                              "end": 116,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 20
                                },
                                "end": {
                                  "line": 3,
                                  "column": 51
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 85,
                                "end": 108,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 43
                                  }
                                },
                                "name": "__in__do__before__break"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 109,
                                "end": 116,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 44
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 51
                                  }
                                },
                                "value": "can't",
                                "raw": "\"can't\""
                              }
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "WhileStatement",
                          "start": 134,
                          "end": 306,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 16
                            },
                            "end": {
                              "line": 8,
                              "column": 17
                            }
                          },
                          "test": {
                            "type": "Literal",
                            "start": 141,
                            "end": 142,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 23
                              },
                              "end": {
                                "line": 4,
                                "column": 24
                              }
                            },
                            "value": 1,
                            "raw": "1"
                          },
                          "body": {
                            "type": "BlockStatement",
                            "start": 144,
                            "end": 306,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 26
                              },
                              "end": {
                                "line": 8,
                                "column": 17
                              }
                            },
                            "body": [
                              {
                                "type": "VariableDeclaration",
                                "start": 166,
                                "end": 204,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 58
                                  }
                                },
                                "declarations": [
                                  {
                                    "type": "VariableDeclarator",
                                    "start": 170,
                                    "end": 203,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 24
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 57
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 170,
                                      "end": 197,
                                      "loc": {
                                        "start": {
                                          "line": 5,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 5,
                                          "column": 51
                                        }
                                      },
                                      "name": "__in__do__IN__before__break"
                                    },
                                    "init": {
                                      "type": "Literal",
                                      "start": 198,
                                      "end": 203,
                                      "loc": {
                                        "start": {
                                          "line": 5,
                                          "column": 52
                                        },
                                        "end": {
                                          "line": 5,
                                          "column": 57
                                        }
                                      },
                                      "value": "get",
                                      "raw": "\"get\""
                                    }
                                  }
                                ],
                                "kind": "var"
                              },
                              {
                                "type": "BreakStatement",
                                "start": 225,
                                "end": 231,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 26
                                  }
                                },
                                "label": null
                              },
                              {
                                "type": "VariableDeclaration",
                                "start": 252,
                                "end": 288,
                                "loc": {
                                  "start": {
                                    "line": 7,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 7,
                                    "column": 56
                                  }
                                },
                                "declarations": [
                                  {
                                    "type": "VariableDeclarator",
                                    "start": 256,
                                    "end": 287,
                                    "loc": {
                                      "start": {
                                        "line": 7,
                                        "column": 24
                                      },
                                      "end": {
                                        "line": 7,
                                        "column": 55
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 256,
                                      "end": 282,
                                      "loc": {
                                        "start": {
                                          "line": 7,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 7,
                                          "column": 50
                                        }
                                      },
                                      "name": "__in__do__IN__after__break"
                                    },
                                    "init": {
                                      "type": "Literal",
                                      "start": 283,
                                      "end": 287,
                                      "loc": {
                                        "start": {
                                          "line": 7,
                                          "column": 51
                                        },
                                        "end": {
                                          "line": 7,
                                          "column": 55
                                        }
                                      },
                                      "value": "no",
                                      "raw": "\"no\""
                                    }
                                  }
                                ],
                                "kind": "var"
                              }
                            ]
                          }
                        },
                        {
                          "type": "EmptyStatement",
                          "start": 307,
                          "end": 308,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 18
                            },
                            "end": {
                              "line": 8,
                              "column": 19
                            }
                          }
                        },
                        {
                          "type": "VariableDeclaration",
                          "start": 325,
                          "end": 367,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 16
                            },
                            "end": {
                              "line": 9,
                              "column": 58
                            }
                          },
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 329,
                              "end": 366,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 20
                                },
                                "end": {
                                  "line": 9,
                                  "column": 57
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 329,
                                "end": 351,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 42
                                  }
                                },
                                "name": "__in__do__after__break"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 352,
                                "end": 366,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 57
                                  }
                                },
                                "value": "Satisfaction",
                                "raw": "\"Satisfaction\""
                              }
                            }
                          ],
                          "kind": "var"
                        }
                      ]
                    }
                  },
                  {
                    "type": "EmptyStatement",
                    "start": 382,
                    "end": 383,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 14
                      },
                      "end": {
                        "line": 10,
                        "column": 15
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse FunctionExpression within a "while" Expression', () => {
            expect(parseScript(`while(function __func(){return 0;}){
                var __reached = 1;
                break;
             };`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 110,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 15
                  }
                },
                "body": [
                  {
                    "type": "WhileStatement",
                    "start": 0,
                    "end": 109,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 4,
                        "column": 14
                      }
                    },
                    "test": {
                      "type": "FunctionExpression",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "name": "__func"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 23,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 23
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 24,
                            "end": 33,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 33
                              }
                            },
                            "argument": {
                              "type": "Literal",
                              "start": 31,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        ]
                      }
                    },
                    "body": {
                      "type": "BlockStatement",
                      "start": 35,
                      "end": 109,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 35
                        },
                        "end": {
                          "line": 4,
                          "column": 14
                        }
                      },
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 53,
                          "end": 71,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 16
                            },
                            "end": {
                              "line": 2,
                              "column": 34
                            }
                          },
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 57,
                              "end": 70,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 2,
                                  "column": 33
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 57,
                                "end": 66,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 29
                                  }
                                },
                                "name": "__reached"
                              },
                              "init": {
                                "type": "Literal",
                                "start": 69,
                                "end": 70,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 32
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 33
                                  }
                                },
                                "value": 1,
                                "raw": "1"
                              }
                            }
                          ],
                          "kind": "var"
                        },
                        {
                          "type": "BreakStatement",
                          "start": 88,
                          "end": 94,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 16
                            },
                            "end": {
                              "line": 3,
                              "column": 22
                            }
                          },
                          "label": null
                        }
                      ]
                    }
                  },
                  {
                    "type": "EmptyStatement",
                    "start": 109,
                    "end": 110,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 14
                      },
                      "end": {
                        "line": 4,
                        "column": 15
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "while(1);"', () => {
    
            expect(parseScript(`while(1);`)).to.eql({
                "body": [{
                    "body": {
                        "type": "EmptyStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": 1,
                    },
                    "type": "WhileStatement"
                }, ],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "while (true) {}"', () => {
            expect(parseScript(`while (true) {}`)).to.eql({
                "body": [{
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "type": "WhileStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "while (true) doSomething()"', () => {
    
            expect(parseScript(`while (true) doSomething()`)).to.eql({
                "body": [{
                    "body": {
                        "expression": {
                            "arguments": [],
                            "callee": {
                                "name": "doSomething",
                                "type": "Identifier"
                            },
                            "type": "CallExpression"
                        },
                        "type": "ExpressionStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "type": "WhileStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    });