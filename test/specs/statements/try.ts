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
                raw: true
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
                raw: true
            })).to.eql({
                "body": [{
                    "block": {
                        "body": [{
                                "end": 12,
                                "expression": {
                                    "end": 11,
                                    "left": {
                                        "end": 8,
                                        "name": "c1",
                                        "start": 6,
                                        "type": "Identifier"
                                    },
                                    "operator": "+=",
                                    "right": {
                                        "end": 11,
                                        "raw": "1",
                                        "start": 10,
                                        "type": "Literal",
                                        "value": 1
                                    },
                                    "start": 6,
                                    "type": "AssignmentExpression"
                                },
                                "start": 6,
                                "type": "ExpressionStatement"
                            },
                            {
                                "end": 15,
                                "expression": {
                                    "end": 14,
                                    "name": "y",
                                    "start": 13,
                                    "type": "Identifier"
                                },
                                "start": 13,
                                "type": "ExpressionStatement"
                            }
                        ],
                        "end": 17,
                        "start": 4,
                        "type": "BlockStatement"
                    },
                    "end": 38,
                    "finalizer": null,
                    "handler": {
                        "body": {
                            "body": [{
                                "end": 36,
                                "expression": {
                                    "end": 35,
                                    "left": {
                                        "end": 32,
                                        "name": "c1",
                                        "start": 30,
                                        "type": "Identifier"
                                    },
                                    "operator": "*=",
                                    "right": {
                                        "end": 35,
                                        "raw": "2",
                                        "start": 34,
                                        "type": "Literal",
                                        "value": 2
                                    },
                                    "start": 30,
                                    "type": "AssignmentExpression"
                                },
                                "start": 30,
                                "type": "ExpressionStatement"
                            }],
                            "end": 38,
                            "start": 28,
                            "type": "BlockStatement"
                        },
                        "end": 38,
                        "param": {
                            "end": 26,
                            "name": "e",
                            "start": 25,
                            "type": "Identifier"
                        },
                        "start": 18,
                        "type": "CatchClause"
                    },
                    "start": 0,
                    "type": "TryStatement"
                }],
                "end": 38,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "try { throw "ex2"; } catch (e) { if (er2!=="ex2")  throw "ex1"; }"', () => {
            expect(parseScript('try { throw "ex2"; } catch (e) { if (er2!=="ex2")  throw "ex1"; }', {
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
                                "value": "ex2",
                                "raw": "\"ex2\""
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
                                "type": "IfStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "!==",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "er2"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": "ex2",
                                        "raw": "\"ex2\""
                                    }
                                },
                                "consequent": {
                                    "type": "ThrowStatement",
                                    "argument": {
                                        "type": "Literal",
                                        "value": "ex1",
                                        "raw": "\"ex1\""
                                    }
                                },
                                "alternate": null
                            }]
                        }
                    },
                    "finalizer": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "1; try { throw null; } catch (err) { }"', () => {
            expect(parseScript('1; try { throw null; } catch (err) { }', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                        "end": 2,
                        "expression": {
                            "end": 1,
                            "raw": "1",
                            "start": 0,
                            "type": "Literal",
                            "value": 1
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    },
                    {
                        "block": {
                            "body": [{
                                "argument": {
                                    "end": 19,
                                    "raw": "null",
                                    "start": 15,
                                    "type": "Literal",
                                    "value": null,
                                },
                                "end": 20,
                                "start": 9,
                                "type": "ThrowStatement"
                            }, ],
                            "end": 22,
                            "start": 7,
                            "type": "BlockStatement"
                        },
                        "end": 38,
                        "finalizer": null,
                        "handler": {
                            "body": {
                                "body": [],
                                "end": 38,
                                "start": 35,
                                "type": "BlockStatement"
                            },
                            "end": 38,
                            "param": {
                                "end": 33,
                                "name": "err",
                                "start": 30,
                                "type": "Identifier"
                            },
                            "start": 23,
                            "type": "CatchClause"
                        },
                        "start": 3,
                        "type": "TryStatement"
                    }
                ],
                "end": 38,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
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
                                        "name": "fn"
                                    },
                                    "right": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": []
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "xFn"
                                    },
                                    "right": {
                                        "type": "FunctionExpression",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "x"
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
    
        it('should parse "try { throw throw [null, 0, false, ""]; } catch ([w = counter(), x = counter(), y = counter(), z = counter()]) { }"', () => {
            expect(parseScript('try { throw [null, 0, false, ""]; } catch ([w = counter(), x = counter(), y = counter(), z = counter()]) { }', {
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
                                        "value": null,
                                        "raw": "null"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": false,
                                        "raw": "false"
                                    },
                                    {
                                        "type": "Literal",
                                        "value": "",
                                        "raw": "\"\""
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
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "w"
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "counter"
                                        },
                                        "arguments": []
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "counter"
                                        },
                                        "arguments": []
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "counter"
                                        },
                                        "arguments": []
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "counter"
                                        },
                                        "arguments": []
                                    }
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