import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Try', () => {

        it(`should fail on Reset element (identifier) with initializer (try statement)"`, () => {
            expect(() => {
                parseScript(`try { throw [1, 2, 3]; } catch ([...x = []]) { }`)
            }).to.throw();
        });

        it(`should fail on Rest element (identifier)  followed by any element"`, () => {
            expect(() => {
                parseScript(`try { throw [1, 2, 3]; } catch ([...x, y]) { }`)
            }).to.throw();
        });

        it(`should fail on Rest element (identifier)  followed by any element"`, () => {
            expect(() => {
                parseScript(`try { throw [1, 2, 3]; } catch ([...[x], y]) { }'`)
            }).to.throw();
        });

        it(`should fail if BoundNames of CatchParameter contains any duplicate`, () => {
            expect(() => {
                parseScript(`try { } catch ([x, x]) {}`)
            }).to.not.throw();
        });

        it(`should fail on pure "try"`, () => {
            expect(() => {
                parseScript(`try`)
            }).to.throw();
        });

        it(`should fail on Catch: "catch (Identifier ) Block"`, () => {
            expect(() => {
                parseScript(`try{}
                catch(){}
                finally{}`)
            }).to.throw('');
        });

        it(`should fail on Catch: "catch (Identifier ) Block"`, () => {
            expect(() => {
                parseScript(`try{}
                catch(){}
                finally{}`)
            }).to.throw('');
        });
    
        it(`should fail on pure "try"`, () => {
            expect(() => {
                parseScript(`try`)
            }).to.throw();
        });
    
        it(`should fail on future reserved word in strict mode`, () => {
            expect(() => {
                parseModule(`try { } catch (eval) { }`)
            }).to.throw();
        });
    
        it(`should fail if pure "try" syntax construction passes`, () => {
            expect(() => {
                parseScript(`try`)
            }).to.throw();
        });
    
        it(`should fail on "Catch: Catch (Identifier ) Block"`, () => {
            expect(() => {
                parseScript(`try{}
    catch(){}
    finally{}`)
            }).to.throw();
        });
    
        it(`should fail on embedded "try" statements followed by two "catch" statements`, () => {
            expect(() => {
                parseScript(`try
    {
      try
      {
      }
    }
    catch(e1){}
    catch(e2){}`)
            }).to.throw();
        });
    
        it(`should fail if the identifier are not placed inside catch`, () => {
            expect(() => {
                parseScript(`try
    {
    }
    catch("22")
    {
    }`)
            }).to.throw();
        });
    
        it(`should fail if passing argument to "try" statement fails`, () => {
            expect(() => {
                parseScript(`try(e1){	
    }
    catch(e){}`)
            }).to.throw();
        });
    
        it(`should fail on a failing passing argument to "try" statement`, () => {
            expect(() => {
                parseScript(`try{	
    }
    finally(e){}`)
            }).to.throw();
        });
    
        it(`should fail if execution of "catch" with no "try" fails`, () => {
            expect(() => {
                parseScript(`catch`)
            }).to.throw();
        });
        it(`should fail if execution of "finally" with no "try" fails`, () => {
            expect(() => {
                parseScript(`finally`)
            }).to.throw();
        });
        it(`should fail if pure "try" syntax construction passes`, () => {
            expect(() => {
                parseScript(`try{}
    catch{}`)
            }).to.throw();
        });
    
        it(`should fail if execution of "catch(){} finally{}" fails`, () => {
            expect(() => {
                parseScript(`catch(){}
    finally{}`)
            }).to.throw();
        });
    
        it('should fail on "try {} catch (a) { for (var a of l) break;}"', () => {
            expect(() => {
                parseModule(`try {} catch (a) { for (var a of l) break;}`)
            }).to.not.throw();
        });
    
        it('should fail on "var foo; try {} catch (_) { let foo; }"', () => {
            expect(() => {
                parseModule(`var foo; try {} catch (_) { let foo; }`)
            }).to.throw();
        });
    
        it('should fail on "try {} catch (foo) { let foo; }"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) { let foo; }`)
            }).to.throw();
        });
        it('should fail on "try {} catch (foo) {} let foo;"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) {} let foo;`)
            }).to.not.throw();
        });
        it('should fail on "try {} catch (foo) { { let foo; } }"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) { { let foo; } }`)
            }).to.throw();
        });
        it('should fail on "try {} catch (foo) { function x() { var foo; } }"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) { function x() { var foo; } }`)
            }).to.not.throw();
        });
        it('should fail on "try {} catch (foo) { function x(foo) {} }"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) { function x(foo) {} }`)
            }).to.not.throw();
        });
    
        it('should fail on "try {} catch (foo) { function foo() {} }"', () => {
            expect(() => {
                parseModule(`try {} catch (foo) { function foo() {} }`)
            }).to.throw();
        });
        it('should fail on "let foo; try {} catch (foo) {} let foo;"', () => {
            expect(() => {
                parseModule(`let foo; try {} catch (foo) {} let foo;`)
            }).to.throw();
        });
        it('should fail on "try {} catch ({ a: foo, b: { c: [foo] } }) {}"', () => {
            expect(() => {
                parseModule(`try {} catch ({ a: foo, b: { c: [foo] } }) {}`)
            }).to.not.throw();
        });
        it('should fail on "try {} catch ([foo, foo]) {}"', () => {
            expect(() => {
                parseModule(`try {} catch ([foo, foo]) {}`)
            }).to.not.throw();
        });
    
        it('expect "3e-', () => {
            expect(() => {
                parseScript('3e-');
            }).not.to.throw();
        });

        it('expect "3e-', () => {
            expect(() => {
                parseScript('let undefined');
            }).to.throw();
        });
        
        it('expect "try { } catch (x) { let x; }', () => {
            expect(() => {
                parseScript('try { } catch (x) { let x; }');
            }).to.throw();
        });
    
        it('expect "try {} catch () {}', () => {
            expect(() => {
                parseScript('try {} catch () {}');
            }).to.throw();
        });

        
        it('should parse "try {} catch (a) { if(1) function a(){} }"', () => {
            expect(parseScript('try {} catch (a) { if(1) function a(){} }', {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "block": {
                        "body": [],
                        "end": 6,
                       "start": 4,
                        "type": "BlockStatement"
                      },
                      "end": 41,
                      "finalizer": null,
                     "handler": {
                        "body": {
                          "body": [
                            {
                              "alternate": null,
                              "consequent": {
                                "async": false,
                                "body": {
                                  "body": [],
                                  "end": 39,
                                  "start": 37,
                                  "type": "BlockStatement"
                                },
                               "end": 39,
                                "expression": false,
                                "generator": false,
                                "id": {
                                  "end": 35,
                                  "name": "a",
                                  "start": 34,
                                  "type": "Identifier"
                                },
                                "params": [],
                                "start": 25,
                                "type": "FunctionDeclaration",
                              },
                              "end": 39,
                              "start": 19,
                              "test": {
                                "end": 23,
                                "raw": "1",
                                "start": 22,
                                "type": "Literal",
                                "value": 1
                              },
                              "type": "IfStatement"
                            }
                          ],
                          "end": 41,
                          "start": 17,
                          "type": "BlockStatement"
                        },
                        "end": 41,
                        "param": {
                          "end": 15,
                          "name": "a",
                          "start": 14,
                          "type": "Identifier"
                        },
                        "start": 7,
                        "type": "CatchClause"
                      },
                      "start": 0,
                      "type": "TryStatement"
                    }
                  ],
                  "end": 41,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should parse "try { throw b||false; } catch (e) { }"', () => {
            expect(parseScript('"use strict"; let foo = function foo() {}', {
                ranges: true,
                raw: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 41,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 13,
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 12,
                      "value": "use strict",
                      "raw": "\"use strict\""
                    }
                  },
                  {
                    "type": "VariableDeclaration",
                    "start": 14,
                    "end": 41,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 18,
                        "end": 41,
                        "id": {
                          "type": "Identifier",
                          "start": 18,
                          "end": 21,
                          "name": "foo"
                        },
                        "init": {
                          "type": "FunctionExpression",
                          "start": 24,
                          "end": 41,
                          "id": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 36,
                            "name": "foo"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 39,
                            "end": 41,
                            "body": []
                          }
                        }
                      }
                    ],
                    "kind": "let"
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "try { throw b||false; } catch (e) { }"', () => {
            expect(parseScript('try { throw b||false; } catch (e) { }', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "block": {
                        "body": [{
                            "argument": {
                                "end": 20,
                                "left": {
                                    "end": 13,
                                    "name": "b",
                                    "start": 12,
                                    "type": "Identifier"
                                },
                                "operator": "||",
                                "right": {
                                    "end": 20,
                                    "raw": "false",
                                    "start": 15,
                                    "type": "Literal",
                                    "value": false,
                                },
                                "start": 12,
                                "type": "LogicalExpression"
                            },
                            "end": 21,
                            "start": 6,
                            "type": "ThrowStatement"
                        }],
                        "end": 23,
                        "start": 4,
                        "type": "BlockStatement"
                    },
                    "end": 37,
                    "finalizer": null,
                    "handler": {
                        "body": {
                            "body": [],
                            "end": 37,
                            "start": 34,
                            "type": "BlockStatement"
                        },
                        "end": 37,
                        "param": {
                            "end": 32,
                            "name": "e",
                            "start": 31,
                            "type": "Identifier"
                        },
                        "start": 24,
                        "type": "CatchClause"
                    },
                    "start": 0,
                    "type": "TryStatement"
                }],
                "end": 37,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "try { c1+=1; y; } catch (e) { c1*=2; }"', () => {
            expect(parseScript('try { c1+=1; y; } catch (e) { c1*=2; }', {
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
                    "type": "TryStatement",
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
                    "block": {
                      "type": "BlockStatement",
                      "start": 4,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 6,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "expression": {
                            "type": "AssignmentExpression",
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
                            "operator": "+=",
                            "left": {
                              "type": "Identifier",
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
                              "name": "c1"
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
                              "value": 1,
                              "raw": "1"
                            }
                          }
                        },
                        {
                          "type": "ExpressionStatement",
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
                          "expression": {
                            "type": "Identifier",
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
                            "name": "y"
                          }
                        }
                      ]
                    },
                    "handler": {
                      "type": "CatchClause",
                      "start": 18,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "param": {
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
                        "name": "e"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 28,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 30,
                            "end": 36,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 36
                              }
                            },
                            "expression": {
                              "type": "AssignmentExpression",
                              "start": 30,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 30
                                },
                                "end": {
                                  "line": 1,
                                  "column": 35
                                }
                              },
                              "operator": "*=",
                              "left": {
                                "type": "Identifier",
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
                                "name": "c1"
                              },
                              "right": {
                                "type": "Literal",
                                "start": 34,
                                "end": 35,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 34
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 35
                                  }
                                },
                                "value": 2,
                                "raw": "2"
                              }
                            }
                          }
                        ]
                      }
                    },
                    "finalizer": null
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "try { throw "ex2"; } catch (e) { if (er2!=="ex2")  throw "ex1"; }"', () => {
            expect(parseScript('try { throw "ex2"; } catch (e) { if (er2!=="ex2")  throw "ex1"; }', {
                raw: true,
                locations: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 65,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 65
                  }
                },
                "body": [
                  {
                    "type": "TryStatement",
                    "start": 0,
                    "end": 65,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 65
                      }
                    },
                    "block": {
                      "type": "BlockStatement",
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
                      "body": [
                        {
                          "type": "ThrowStatement",
                          "start": 6,
                          "end": 18,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 18
                            }
                          },
                          "argument": {
                            "type": "Literal",
                            "start": 12,
                            "end": 17,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 12
                              },
                              "end": {
                                "line": 1,
                                "column": 17
                              }
                            },
                            "value": "ex2",
                            "raw": "\"ex2\""
                          }
                        }
                      ]
                    },
                    "handler": {
                      "type": "CatchClause",
                      "start": 21,
                      "end": 65,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 65
                        }
                      },
                      "param": {
                        "type": "Identifier",
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
                        "name": "e"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 31,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 65
                          }
                        },
                        "body": [
                          {
                            "type": "IfStatement",
                            "start": 33,
                            "end": 63,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 63
                              }
                            },
                            "test": {
                              "type": "BinaryExpression",
                              "start": 37,
                              "end": 48,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 37
                                },
                                "end": {
                                  "line": 1,
                                  "column": 48
                                }
                              },
                              "left": {
                                "type": "Identifier",
                                "start": 37,
                                "end": 40,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 37
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 40
                                  }
                                },
                                "name": "er2"
                              },
                              "operator": "!==",
                              "right": {
                                "type": "Literal",
                                "start": 43,
                                "end": 48,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 48
                                  }
                                },
                                "value": "ex2",
                                "raw": "\"ex2\""
                              }
                            },
                            "consequent": {
                              "type": "ThrowStatement",
                              "start": 51,
                              "end": 63,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 51
                                },
                                "end": {
                                  "line": 1,
                                  "column": 63
                                }
                              },
                              "argument": {
                                "type": "Literal",
                                "start": 57,
                                "end": 62,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 57
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 62
                                  }
                                },
                                "value": "ex1",
                                "raw": "\"ex1\""
                              }
                            },
                            "alternate": null
                          }
                        ]
                      }
                    },
                    "finalizer": null
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "1; try { throw null; } catch (err) { }"', () => {
            expect(parseScript('1; try { throw null; } catch (err) { }', {
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
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 2,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 2
                      }
                    },
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 1,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 1
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    }
                  },
                  {
                    "type": "TryStatement",
                    "start": 3,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 3
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "block": {
                      "type": "BlockStatement",
                      "start": 7,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "body": [
                        {
                          "type": "ThrowStatement",
                          "start": 9,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "argument": {
                            "type": "Literal",
                            "start": 15,
                            "end": 19,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 19
                              }
                            },
                            "value": null,
                            "raw": "null"
                          }
                        }
                      ]
                    },
                    "handler": {
                      "type": "CatchClause",
                      "start": 23,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "param": {
                        "type": "Identifier",
                        "start": 30,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 30
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "name": "err"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 35,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 35
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "body": []
                      }
                    },
                    "finalizer": null
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "try { throw null; } catch (err) { 7; } finally { 8; }"', () => {
            expect(parseScript('try { throw null; } catch (err) { 7; } finally { 8; }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "Literal",
                                "value": null,
                                "raw": "null"
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "err"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": 7,
                                    "raw": "7"
                                }
                            }]
                        }
                    },
                    "finalizer": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": 8,
                                "raw": "8"
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { throw [,]; } catch ([x = 23]) { }"', () => {
            expect(parseScript('try { throw [,]; } catch ([x = 23]) { }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "ArrayExpression",
                                "elements": [
                                    null
                                ]
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 23,
                                    "raw": "23"
                                }
                            }]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { throw []; } catch ([fn = function () {}, xFn = function x() {}]) {}"', () => {
            expect(parseScript('try { throw []; } catch ([fn = function () {}, xFn = function x() {}]) { }', {
                raw: true,
                locations: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 74,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 74
                  }
                },
                "body": [
                  {
                    "type": "TryStatement",
                    "start": 0,
                    "end": 74,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 74
                      }
                    },
                    "block": {
                      "type": "BlockStatement",
                      "start": 4,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "body": [
                        {
                          "type": "ThrowStatement",
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
                          "argument": {
                            "type": "ArrayExpression",
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
                            "elements": []
                          }
                        }
                      ]
                    },
                    "handler": {
                      "type": "CatchClause",
                      "start": 18,
                      "end": 74,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 74
                        }
                      },
                      "param": {
                        "type": "ArrayPattern",
                        "start": 25,
                        "end": 69,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 69
                          }
                        },
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 26,
                            "end": 45,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 26
                              },
                              "end": {
                                "line": 1,
                                "column": 45
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 26,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 26
                                },
                                "end": {
                                  "line": 1,
                                  "column": 28
                                }
                              },
                              "name": "fn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 31,
                              "end": 45,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 45
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 43,
                                "end": 45,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 45
                                  }
                                },
                                "body": []
                              }
                            }
                          },
                          {
                            "type": "AssignmentPattern",
                            "start": 47,
                            "end": 68,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 47
                              },
                              "end": {
                                "line": 1,
                                "column": 68
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 47,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 47
                                },
                                "end": {
                                  "line": 1,
                                  "column": 50
                                }
                              },
                              "name": "xFn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 53,
                              "end": 68,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 53
                                },
                                "end": {
                                  "line": 1,
                                  "column": 68
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 62,
                                "end": 63,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 62
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 63
                                  }
                                },
                                "name": "x"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 66,
                                "end": 68,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 66
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 68
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        ]
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 71,
                        "end": 74,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 71
                          },
                          "end": {
                            "line": 1,
                            "column": 74
                          }
                        },
                        "body": []
                      }
                    },
                    "finalizer": null
                  }
                ],
                "sourceType": "script"
              } );
        });
    
        it('should parse "try { throw throw [null, 0, false, ""]; } catch ([w = counter(), x = counter(), y = counter(), z = counter()]) { }"', () => {
            expect(parseScript('try { throw [null, 0, false, ""]; } catch ([w = counter(), x = counter(), y = counter(), z = counter()]) { }', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 108,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 108
                  }
                },
                "body": [
                  {
                    "type": "TryStatement",
                    "start": 0,
                    "end": 108,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 108
                      }
                    },
                    "block": {
                      "type": "BlockStatement",
                      "start": 4,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "body": [
                        {
                          "type": "ThrowStatement",
                          "start": 6,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "argument": {
                            "type": "ArrayExpression",
                            "start": 12,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 12
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 13,
                                "end": 17,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 17
                                  }
                                },
                                "value": null,
                                "raw": "null"
                              },
                              {
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
                                "value": 0,
                                "raw": "0"
                              },
                              {
                                "type": "Literal",
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
                                "value": false,
                                "raw": "false"
                              },
                              {
                                "type": "Literal",
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
                                "value": "",
                                "raw": "\"\""
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "handler": {
                      "type": "CatchClause",
                      "start": 36,
                      "end": 108,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 36
                        },
                        "end": {
                          "line": 1,
                          "column": 108
                        }
                      },
                      "param": {
                        "type": "ArrayPattern",
                        "start": 43,
                        "end": 103,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 43
                          },
                          "end": {
                            "line": 1,
                            "column": 103
                          }
                        },
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 44,
                            "end": 57,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 44
                              },
                              "end": {
                                "line": 1,
                                "column": 57
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 44,
                              "end": 45,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 44
                                },
                                "end": {
                                  "line": 1,
                                  "column": 45
                                }
                              },
                              "name": "w"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 48,
                              "end": 57,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 48
                                },
                                "end": {
                                  "line": 1,
                                  "column": 57
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 48,
                                "end": 55,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 48
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 55
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          },
                          {
                            "type": "AssignmentPattern",
                            "start": 59,
                            "end": 72,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 59
                              },
                              "end": {
                                "line": 1,
                                "column": 72
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 59,
                              "end": 60,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 59
                                },
                                "end": {
                                  "line": 1,
                                  "column": 60
                                }
                              },
                              "name": "x"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 63,
                              "end": 72,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 63
                                },
                                "end": {
                                  "line": 1,
                                  "column": 72
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 63,
                                "end": 70,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 63
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 70
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          },
                          {
                            "type": "AssignmentPattern",
                            "start": 74,
                            "end": 87,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 74
                              },
                              "end": {
                                "line": 1,
                                "column": 87
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 74,
                              "end": 75,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 74
                                },
                                "end": {
                                  "line": 1,
                                  "column": 75
                                }
                              },
                              "name": "y"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 78,
                              "end": 87,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 78
                                },
                                "end": {
                                  "line": 1,
                                  "column": 87
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 78,
                                "end": 85,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 78
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 85
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          },
                          {
                            "type": "AssignmentPattern",
                            "start": 89,
                            "end": 102,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 89
                              },
                              "end": {
                                "line": 1,
                                "column": 102
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 89,
                              "end": 90,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 89
                                },
                                "end": {
                                  "line": 1,
                                  "column": 90
                                }
                              },
                              "name": "z"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 93,
                              "end": 102,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 93
                                },
                                "end": {
                                  "line": 1,
                                  "column": 102
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 93,
                                "end": 100,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 93
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 100
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 105,
                        "end": 108,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 105
                          },
                          "end": {
                            "line": 1,
                            "column": 108
                          }
                        },
                        "body": []
                      }
                    },
                    "finalizer": null
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "try { throw [undefined]; } catch ([x = 23]) { }"', () => {
            expect(parseScript('try { throw [undefined]; } catch ([x = 23]) { }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "ArrayExpression",
                                "elements": [{
                                    "type": "Identifier",
                                    "name": "undefined"
                                }]
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 23,
                                    "raw": "23"
                                }
                            }]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { throw g(); } catch ([...[,]]) { }"', () => {
            expect(parseScript('try { throw g(); } catch ([...[,]]) { }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "g"
                                },
                                "arguments": []
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null
                                    ]
                                }
                            }]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { throw [1, 2, 3]; } catch ([x, y, z]) { }"', () => {
            expect(parseScript('try { throw [1, 2, 3]; } catch ([x, y, z]) { }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "ArrayExpression",
                                "elements": [{
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2,
                                        "raw": "2"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3,
                                        "raw": "3"
                                    }
                                ]
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
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
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { } catch (e) { }"', () => {
    
            expect(parseScript('try { } catch (e) { }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse "try { } catch (eval) { }', () => {
    
            expect(parseScript('try { } catch (eval) { }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
        it('should parse "try { } catch (arguments) { }"', () => {
            expect(parseScript('try { } catch (arguments) { }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { } catch (e) { let a; }"', () => {
            expect(parseScript('try { } catch (e) { let a; }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "VariableDeclaration",
                                "declarations": [{
                                    "type": "VariableDeclarator",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "init": null
                                }],
                                "kind": "let"
                            }]
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try{}catch(a){}finally{}"', () => {
            expect(parseScript('try{}catch(a){}finally{}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
        it('should parse "try { throw []; } catch ([ x = unresolvableReference ]) {}"', () => {
            expect(parseScript('try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "doThat"
                                },
                                "arguments": []
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "say"
                                    },
                                    "arguments": [{
                                        "type": "Identifier",
                                        "name": "e"
                                    }]
                                }
                            }]
                        }
                    },
                    "finalizer": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "cleanup"
                                },
                                "arguments": [{
                                    "type": "Identifier",
                                    "name": "stuff"
                                }]
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse "try { throw []; } catch ([ x = unresolvableReference ]) {}"', () => {
    
            expect(parseScript('try { throw []; } catch ([ x = unresolvableReference ]) {}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }]
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "unresolvableReference"
                                }
                            }]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "try { } catch (e) { say(e) }"', () => {
            expect(parseScript('try { } catch (e) { say(e) }')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "say"
                                    },
                                    "arguments": [{
                                        "type": "Identifier",
                                        "name": "e",
                                    }]
                                }
                            }]
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    });